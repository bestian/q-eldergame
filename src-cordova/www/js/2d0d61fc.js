(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0d61fc"],{"70e2":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("q-list",{attrs:{bordered:"",separator:""}},[a("q-item",[a("div",{staticClass:"upload-btn-wrapper"},[[a("image-uploader",{attrs:{debug:1,maxWidth:200,quality:.7,autoRotate:!0,outputFormat:"verbose",preview:!1,className:["fileinput",{"fileinput--loaded":e.hasImage}],accept:"image/*",doNotResize:"['gif', 'svg']"},on:{input:e.setImage}})],a("q-avatar",[a("img",{directives:[{name:"show",rawName:"v-show",value:e.url,expression:"url"}],attrs:{src:e.url}})])],2)]),a("q-item",[a("q-item-section",[a("q-input",{attrs:{label:e.$t("insert_name")},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("q-item-section",[a("q-btn",{attrs:{color:"green",disable:!e.name||!e.url},on:{click:function(t){e.addCard(e.url,e.name),e.url="",e.name=""}}},[e._v("\n          "+e._s(e.$t("add"))+"\n        ")])],1)],1),e._l(e.card_list,function(t,i){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:i,attrs:{clickable:"",active:t.hide}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",[a("img",{attrs:{src:t.img}})])],1),a("q-item-section",[e._v(e._s(t.name))]),a("q-item-section",[a("q-btn",{attrs:{color:"red"},on:{click:function(t){return e.removeCard(i)}}},[e._v("\n          "+e._s(e.$t("delete"))+"\n        ")])],1),a("q-item-section",[e._v("\n        "+e._s(e.$t("hide"))+"\n        "),a("q-toggle",{model:{value:t.hide,callback:function(a){e.$set(t,"hide",a)},expression:"c.hide"}})],1)],1)}),a("q-item",[a("q-item-section",[e._v("\n        "+e._s(e.$t("importJSON"))+"\n      ")]),a("q-item-section",[a("input",{attrs:{type:"file",name:"json",id:"json",accept:"application/json"},on:{change:e.importJSON}})])],1)],2)],1)},n=[],r={name:"Edit",props:["card_list"],data:function(){return{url:"",hasImage:!1,name:"",my_card_list:[]}},methods:{addCard:function(e,t){this.$emit("addCard",e,t)},removeCard:function(e){this.$emit("removeCard",e)},hideShow:function(e,t){this.$emit("hideShow",e,t)},setImage:function(e){this.hasImage=!0,this.url=e.dataUrl},previewImage:function(e){var t=this,a=e.target;if(a.files&&a.files[0]){var i=new FileReader;i.onload=function(e){t.url=e.target.result},i.readAsDataURL(a.files[0])}},exportCards:function(){var e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(this.card_list)),t=document.getElementById("downloadAnchorElem");t.setAttribute("href",e),t.setAttribute("download","card_list.json"),t.click()},importJSON:function(e){var t=this,a=e.target;if(a.files&&a.files[0]){var i=new FileReader;i.onload=function(e){t.my_card_list=t.card_list.concat(JSON.parse(e.target.result)),t.$emit("saveCards",t.my_card_list)},i.readAsText(a.files[0])}}}},s=r,o=a("2877"),l=Object(o["a"])(s,i,n,!1,null,null,null);t["default"]=l.exports}}]);