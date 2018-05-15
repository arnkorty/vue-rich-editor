import MyBold from './rewrite/set-style-method/bold';
import MyItalic from './rewrite/set-style-method/italic';
import MyUnderline from './rewrite/set-style-method/underline';
import MySizeStyle from './rewrite/set-style-method/size';

import BlotFormatter from 'n-quill-blot-formatter';
import ImageSpec from 'n-quill-blot-formatter/dist/specs/ImageSpec';
import ResizeAction from 'n-quill-blot-formatter/dist/actions/ResizeAction';
import DeleteAction from 'n-quill-blot-formatter/dist/actions/DeleteAction';

import ImageLink from './custom-modules/image-link/index';

const config = {};
const maxRows = 10;
const maxCols = 5;
const tableOptions = [];
for (let r = 1; r <= maxRows; r++) {
  for (let c = 1; c <= maxCols; c++) {
    tableOptions.push('newtable_' + r + '_' + c);
  }
}

config.defaultEditorContainer = [
  [{table: tableOptions}, {table: 'append-row'}, {table: 'append-col'}],
  ['link', 'bold', 'italic', 'underline', {'hr': 'hr'}],
  [{ color: []},{ background: [] }, { 'indent': '-1' }, { 'indent': '+1' }],
  [
    { list: 'bullet' },
    { list: 'ordered' }
  ],
  ['blockquote', 'code-block'],
  ['image', 'image-link'],
  [
    {
      size: ['32px', '24px', '18px', '16px', '13px', '12px', false]
    }
  ],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['clean']
];

config.defaultClipboardFormats = [
  'link', 'bold', 'italic', 'underline', 'hr',
  'align', 'background', 'link', 'video', 'blockquote', 'code-block',
  'color', 'list', 'image', 'table', 'indent',
  'width', 'height', 'size', 'header'
];

config.defaultQuillRegisterKeys = [
  'inline',
  'size',
  'background',
  'blockquote',
  'code-block',
  'align',
  'indent',
  'header',
  'imageResize',
  'imageLink'
];

config.ENUM_MAP = {
  inline: [
    {
      key: 'formats/bold',
      value: MyBold
    },
    {
      key: 'formats/italic',
      value: MyItalic
    },
    {
      key: 'formats/underline',
      value: MyUnderline
    }
  ],
  size: [
    {
      key: 'formats/size',
      value: MySizeStyle
    }
  ],
  imageResize: [
    {
      key: 'modules/blotFormatter',
      value: BlotFormatter
    }
  ],
  imageLink: [
    {
      key: 'modules/imageLink',
      value: ImageLink
    }
  ]
};

class MyResizeAction extends ResizeAction {
  onUpdate() {
    //
  }
}

class MyImageSpec extends ImageSpec {
  getActions() {
    return [MyResizeAction, DeleteAction];
  }
}

config.MyImageSpec = MyImageSpec;

export default config;
