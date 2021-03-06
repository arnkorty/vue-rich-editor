<template>
  <div class="quill-wrapper">
    <div
       ref="quillContainer"
       class="vre-editor-sign-only"
       :id="id">
    </div>
    <input
       ref="fileInput"
       id="file-upload"
       type="file"
       accept="image/*"
       style="display:none"
       v-if="useCustomImageHandler"
       @change="emitImageInfo($event)"
       />
  </div>
</template>

<script>
import Quill from 'quill';
  import _ from './extend/util';

  import quillTable from 'quill-table';
  Quill.register(quillTable.TableCell);
  Quill.register(quillTable.TableRow);
  Quill.register(quillTable.Table);
  Quill.register(quillTable.Contain);
  Quill.register('modules/table', quillTable.TableModule);

  import Config from './config';

  const Embed = Quill.import('blots/block/embed');
  class Hr extends Embed {
    static create(value) {
      let node = super.create(value);
      // give it some margin
      node.setAttribute('style', "height:1px; margin-top:5px; margin-bottom:5px;");
      return node;
    }
  }

  Hr.blotName = 'hr'; //now you can use .ql-hr classname in your toolbar
  Hr.className = 'quill-hr';
  Hr.tagName = 'hr';

  Quill.register({
    'formats/hr': Hr
  });

  export default {
    name: 'vue-rich-editor',
    props: {
      value: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        required: true,
        default: 'quill-container'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      editorContainer: {
        type: Array,
        default: () => []
      },
      useCustomImageHandler: {
        type: Boolean,
        default: false
      },
      quillRegisterKeys: {
        type: Array,
        default: () => null
      },
      placeholder: {
        type: String,
        default: ''
      },
      linkPlaceholder: {
        type: String,
        default: '请输入链接'
      },
      imageLinkTitle: {
        type: String,
        default: '请输入图片地址：'
      },
      imageLinkPlaceholder: {
        type: String,
        default: 'https://'
      }
    },

    data() {
      return {
        quill: null,
        editor: null,
        toolbarContainer: ((_.typeOf(this.editorContainer) === 'array')
          && this.editorContainer.length)
        ? this.editorContainer
        : Config.defaultEditorContainer,
        toolbarHandlers: {
          'hr': () => {
            const range = this.quill.getSelection();
            if (range) {
              // insert the <hr> where the cursor is
              this.quill.insertEmbed(range.index,"hr","null")
            }
          },
          'image-link': () => {
            const Editor = this.quill;
            const range = Editor.getSelection();
            const cursorLocation = range.index;
            let type = '';

            const url = prompt(this.imageLinkTitle, this.imageLinkPlaceholder);

            type = url === null
              ? 'cancel'
              : 'ok';

            const options = {
              url,
              Editor,
              range,
              cursorLocation
            };

            this.$emit('reImageLink', type, options);
          }
        }
      };
    },

    mounted() {
      this.initRegisterModules();
      this.initializeVueRichEditor();
      this.handleUpdatedEditor();
      this.listenStateChangeEditor();
    },

    created() {
      //
    },

    watch: {
      value(val) {
        if(val != this.editor.innerHTML && !this.quill.hasFocus()) {
          this.editor.innerHTML = val;
        }
      },
      disabled(status) {
        this.quill.enable(!status);
      }
    },

    methods: {
      initRegisterModules() {
        if(!this.quillRegisterKeys
          || (this.quillRegisterKeys
            && this.quillRegisterKeys.length)) {
          const _keys = (this.quillRegisterKeys
            && this.quillRegisterKeys.length)
            ? this.quillRegisterKeys
            : Config.defaultQuillRegisterKeys;

          let _modules = {};

          _keys.forEach(item => {
            if(Config.ENUM_MAP[item]) {
              Config.ENUM_MAP[item].forEach(that => {
                _modules[that.key] = that.value;
              });
            }
          });

          Quill.register(_modules, true);
        }
      },

      initializeVueRichEditor() {
        this.setQuillElement();
        this.setEditorElement();
        this.checkForInitialContent();
      },

      setQuillElement() {
        const _modulesConf = {
          toolbar: {
            container: this.toolbarContainer,
            handlers: this.toolbarHandlers
          },
          clipboard: {
            matchVisual: false
          },
          table: true,
          imageLink: true
        };

        if((this.quillRegisterKeys &&
          this.quillRegisterKeys.length &&
          this.quillRegisterKeys.indexOf('imageResize') != -1) ||
          !this.quillRegisterKeys) {
          _modulesConf.blotFormatter = {
            specs: [Config.MyImageSpec]
          };
        }

        console.log('modules', _modulesConf)

        this.quill = new Quill(this.$refs.quillContainer, {
          theme: 'snow',
          bounds: `#${this.id}`,
          formats: Config.defaultClipboardFormats,
          modules: _modulesConf,
          placeholder: this.placeholder,
          readOnly: this.disabled ? this.disabled : false
        });

        const tooltip = this.quill.theme.tooltip;
        const input = tooltip.root.querySelector('input[data-link]');
        input.dataset.link = this.linkPlaceholder;

        this.checkForCustomImageHandler();
      },

      setEditorElement() {
        this.editor = document.querySelector(`#${this.id} .ql-editor`);
      },

      checkForInitialContent() {
        this.editor.innerHTML = this.value || '';
      },

      checkForCustomImageHandler() {
        this.useCustomImageHandler === true
          ? this.setupCustomImageHandler()
          : '';
      },

      setupCustomImageHandler() {
        const toolbar = this.quill.getModule('toolbar');
        toolbar.addHandler('image', this.customImageHandler);
      },

      handleUpdatedEditor() {
        const self = this;
        this.quill.on('text-change', () => {
          self.$emit('input', this.editor.innerHTML);
        });
      },

      listenStateChangeEditor() {
        const self = this;

        this.quill.on('selection-change', (range, oldRange, source) => {
          if(range) {
            if(range.length == 0) {
              self.$emit('reFocus', range);
            } else {
              const text = self.quill.getText(range.index, range.length);
              self.$emit('reHighlighted', text, range);
            }
          } else {
            self.$emit('reBlur', source);
          }
        });
      },

      customImageHandler() {
        this.$refs.fileInput.click();
      },
      emitImageInfo($event) {
        const file = $event.target.files[0];
        const Editor = this.quill;
        const range = Editor.getSelection();
        const cursorLocation = range.index;

        const options = {
          file,
          Editor,
          range,
          cursorLocation
        };

        this.$emit('reImageAdded', options);
      }
    }
  };
</script>

<style lang='scss'>
@import './../../node_modules/quill/dist/quill.core.css';
@import './../../node_modules/quill/dist/quill.snow.css';
@import './index.scss';
@import './custom-modules/image-link/index.scss';
</style>
