webpackJsonp([1],{131:function(t,e){},132:function(t,e){},138:function(t,e,n){n(131);var i=n(58)(n(79),n(140),null,null);t.exports=i.exports},139:function(t,e,n){n(132);var i=n(58)(n(80),n(141),null,null);t.exports=i.exports},140:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"ve-container"},[n("h3",[t._v("vue rich editor example")]),t._v(" "),n("vue-rich-editor",{attrs:{id:"editor",useCustomImageHandler:""},on:{imageAdded:t.uplaodImage},model:{value:t.editorContent,callback:function(e){t.editorContent=e},expression:"editorContent"}}),t._v(" "),n("div",{staticClass:"ve-button-area"},[n("button",{staticClass:"ve-button",on:{click:function(e){t.saveContent(t.editorContent)}}},[t._v("\n        save content\n      ")]),t._v(" "),n("button",{staticClass:"ve-button",on:{click:function(e){t.setEditor(t.setEditorDemo)}}},[t._v("\n        set editor\n      ")])])],1)])},staticRenderFns:[]}},141:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"quill-wrapper"},[n("div",{ref:"quillContainer",attrs:{id:t.id}}),t._v(" "),t.useCustomImageHandler?n("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{id:"file-upload",type:"file"},on:{change:function(e){t.emitImageInfo(e)}}}):t._e()])},staticRenderFns:[]}},143:function(t,e,n){t.exports=n(59)},59:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(142),o=n(138),r=n.n(o);new i.a({el:"#app",render:function(t){return t(r.a)}})},78:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={URL:{UPLOAD_IMAGE:"https://sm.ms/api/upload"},imageFileName:"smfile"}},79:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(81),o=n(60),r=n.n(o),a=n(78);e.default={components:{VueRichEditor:i.a},data:function(){return{editorContent:'demo string<img src="http://www.w3school.com.cn/ui2017/compatible_safari.png" />',setEditorDemo:"<h1>hahahah</h1>",showPreview:!0,editor1IsDisabled:!1}},methods:{setEditor:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"demo";this.editorContent=t},saveContent:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";console.log(t)},uplaodImage:function(t,e,n){var i=new FormData;i.append(a.a.imageFileName,t),r()({url:a.a.URL.UPLOAD_IMAGE,method:"POST",data:i}).then(function(t){console.log(t);var i=t.data.data.url;e.insertEmbed(n,"image",i)}).catch(function(t){console.log(t)})}}}},80:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(13),o=n.n(i),r=n(129),a=(n.n(r),n(130)),l=(n.n(a),n(82)),s=n(83),u=n(85),c=n(84);o.a.register({"formats/bold":l.a,"formats/italic":s.a,"formats/underline":u.a},!0),o.a.register(c.a,!0);var d={container:[[{link:"assas"}],["bold","italic","underline"],[{color:[]}],[{list:"bullet"},{list:"ordered"}],["image"],[{size:["32px","24px","18px","16px","13px","12px",!1]}],["clean"]]};e.default={name:"vue-rich-editor",props:{value:String,id:{type:String,default:"quill-container"},disabled:Boolean,editorToolbar:Array,useCustomImageHandler:{type:Boolean,default:!1}},data:function(){return{quill:null,editor:null,toolbar:this.editorToolbar?this.editorToolbar:d,placeholder:this.placeholder?this.placeholder:"请输入"}},mounted:function(){this.initializeVue2Editor(),this.handleUpdatedEditor()},watch:{value:function(t){t==this.editor.innerHTML||this.quill.hasFocus()||(this.editor.innerHTML=t)},disabled:function(t){this.quill.enable(!t)}},methods:{initializeVue2Editor:function(){this.setQuillElement(),this.setEditorElement(),this.checkForInitialContent()},setQuillElement:function(){this.quill=new o.a(this.$refs.quillContainer,{modules:{toolbar:this.toolbar},placeholder:this.placeholder,theme:"snow",readOnly:!!this.disabled&&this.disabled}),this.checkForCustomImageHandler()},setEditorElement:function(){this.editor=document.querySelector("#"+this.id+" .ql-editor")},checkForInitialContent:function(){this.editor.innerHTML=this.value||""},checkForCustomImageHandler:function(){!0===this.useCustomImageHandler&&this.setupCustomImageHandler()},setupCustomImageHandler:function(){this.quill.getModule("toolbar").addHandler("image",this.customImageHandler)},handleUpdatedEditor:function(){var t=this;this.quill.on("text-change",function(){t.$emit("input",t.editor.innerHTML)})},customImageHandler:function(t,e){this.$refs.fileInput.click()},emitImageInfo:function(t){var e=t.target.files[0],n=this.quill,i=n.getSelection(),o=i.index;this.$emit("imageAdded",e,n,o)}}}},81:function(t,e,n){"use strict";var i=n(139),o=n.n(i);n.d(e,"a",function(){return o.a});o.a},82:function(t,e,n){"use strict";var i=n(14),o=n.n(i),r=n(18),a=n.n(r),l=n(19),s=n.n(l),u=n(22),c=n.n(u),d=n(20),p=n.n(d),h=n(21),f=n.n(h),m=n(13),v=n.n(m),_=n(38),g=n.n(_),y=v.a.import("parchment"),b=function(t){function e(){return a()(this,e),c()(this,(e.__proto__||o()(e)).apply(this,arguments))}return f()(e,t),s()(e,[{key:"value",value:function(t){return p()(e.prototype.__proto__||o()(e.prototype),"value",this).call(this,t)}},{key:"add",value:function(t,e){return g()(t).css("font-weight","bold"),!0}},{key:"remove",value:function(t){g()(t).css("font-weight","normal")}}]),e}(y.Attributor.Style),I=new b("bold","font-weight",{scope:y.Scope.INLINE,whitelist:[!0,!1]});e.a=I},83:function(t,e,n){"use strict";var i=n(14),o=n.n(i),r=n(18),a=n.n(r),l=n(19),s=n.n(l),u=n(22),c=n.n(u),d=n(20),p=n.n(d),h=n(21),f=n.n(h),m=n(13),v=n.n(m),_=n(38),g=n.n(_),y=v.a.import("parchment"),b=function(t){function e(){return a()(this,e),c()(this,(e.__proto__||o()(e)).apply(this,arguments))}return f()(e,t),s()(e,[{key:"value",value:function(t){return p()(e.prototype.__proto__||o()(e.prototype),"value",this).call(this,t)}},{key:"add",value:function(t,e){return g()(t).css("font-style","italic"),!0}},{key:"remove",value:function(t){g()(t).css("font-style","normal")}}]),e}(y.Attributor.Style),I=new b("italic","font-style",{scope:y.Scope.INLINE,whitelist:[!0,!1]});e.a=I},84:function(t,e,n){"use strict";var i=n(13),o=n.n(i),r=o.a.import("attributors/style/size");r.whitelist=["32px","24px","18px","16px","13px","12px",!1],e.a=r},85:function(t,e,n){"use strict";var i=n(14),o=n.n(i),r=n(18),a=n.n(r),l=n(19),s=n.n(l),u=n(22),c=n.n(u),d=n(20),p=n.n(d),h=n(21),f=n.n(h),m=n(13),v=n.n(m),_=n(38),g=n.n(_),y=v.a.import("parchment"),b=function(t){function e(){return a()(this,e),c()(this,(e.__proto__||o()(e)).apply(this,arguments))}return f()(e,t),s()(e,[{key:"value",value:function(t){return p()(e.prototype.__proto__||o()(e.prototype),"value",this).call(this,t)}},{key:"add",value:function(t,e){return g()(t).css("text-decoration","underline"),!0}},{key:"remove",value:function(t){g()(t).css("text-decoration","none")}}]),e}(y.Attributor.Style),I=new b("underline","text-decoration",{scope:y.Scope.INLINE,whitelist:[!0,!1]});e.a=I}},[143]);
//# sourceMappingURL=client.js.map