(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"0ac2":function(t,s,i){"use strict";var a=i("861b"),e=i.n(a);e.a},"1a25":function(t,s,i){"use strict";var a=i("4b96"),e=i.n(a);e.a},"317a":function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("q-page",{attrs:{padding:""}},[a("q-toolbar",[a("q-toolbar-title",[t._v("\n      "+t._s(t.$t("write_note"))+"\n    ")])],1),t.human_vs_bot?a("q-toolbar",[a("q-avatar",[a("img",{attrs:{src:i("b9c9")}})]),a("q-linear-progress",{staticClass:"q-mt-md",staticStyle:{height:"25px"},attrs:{stripe:"",rounded:"",value:t.progress,color:t.progress>.62?"red":"blue"}})],1):t._e(),a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-card",{staticClass:"text-white my-card",staticStyle:{background:"radial-gradient(circle, #35a2ff 0%, #014a88 100%)"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.hard,expression:"!hard"}],staticClass:"content"},[a("span",{staticClass:"big header"},[t._v(t._s(t.fishs1[Math.floor(t.a)%t.fishs1.length].name))])])])],1),a("div",{staticClass:"col"},[a("q-card",{staticClass:"text-white my-card"},[a("div",{staticClass:"content"},[a("q-input",{staticClass:"big header",attrs:{type:"text",name:"ans",clearable:"",outlined:"",autofocus:!0},model:{value:t.ans,callback:function(s){t.ans=s},expression:"ans"}})],1)])],1)])]),a("q-select",{attrs:{color:"purple-12",options:t.options,label:t.$t("speed")},model:{value:t.speed,callback:function(s){t.speed=s},expression:"speed"}}),a("win",{directives:[{name:"show",rawName:"v-show",value:t.winning,expression:"winning"}]}),a("john-win",{directives:[{name:"show",rawName:"v-show",value:t.loosing,expression:"loosing"}]})],1)},e=[],n=(i("1a43"),i("7d56")),o=i("7c0a"),r={name:"pair",props:["card_list","human_vs_bot","bot_level"],components:{win:n["a"],johnWin:o["a"]},data:function(){return{fishs1:[],ans:"",loosing:!1,progress:.1,a:0,winning:!0,speed:.25,hard:!1,record:!1,good:0,bad:0,options:[.1,.25,.5,1]}},methods:{go:function(){if(!this.winning){this.progress+=this.bot_level/200;var t=Math.floor(this.a)%this.fishs1.length;this.progress>=1&&this.fishs1[t].name===this.fishs1[this.b].name&&this.human_vs_bot&&this.loose()}},check:function(){var t=Math.floor(this.a)%this.fishs1.length;this.fishs1[t].name===this.ans?(this.ans="",this.win()):this.bad++},reset:function(){this.fishs1=this.card_list.filter((function(t){return t&&!t.hide})).slice().sort((function(){return Math.random()-.5})).slice(0,4),this.b=Math.floor(Math.random()*this.fishs1.length),this.winning=!1,this.loosing=!1,this.progress=0,this.$emit("johnSay","Be relexed...")},win:function(){this.winning++,this.good++,this.$emit("johnSay","You win!"),setTimeout(this.reset,2e3)},loose:function(){this.loosing=!0,this.$emit("johnSay","I win!"),setTimeout(this.reset,2e3)}},mounted:function(){setInterval(this.go,500),this.reset()},watch:{ans:function(t){this.check()}}},c=r,l=(i("1a25"),i("2877")),h=Object(l["a"])(c,a,e,!1,null,null,null);s["default"]=h.exports},"4b96":function(t,s,i){},"7c0a":function(t,s,i){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"page"},[a("div",{staticClass:"ui image card"},[a("img",{attrs:{src:i("a5aa")}}),a("h4",{staticClass:"text-white shadow"},[t._v(t._s(t.$t("john wins!")))])])])])},e=[],n={name:"win",data:function(){return{}}},o=n,r=(i("0ac2"),i("2877")),c=Object(r["a"])(o,a,e,!1,null,"22f9480a",null);s["a"]=c.exports},"7d56":function(t,s,i){"use strict";var a=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"page"},[a("div",{staticClass:"ui image card"},[a("img",{attrs:{src:i("984c")}})])])])}],n={name:"win",data:function(){return{}}},o=n,r=(i("de97"),i("2877")),c=Object(r["a"])(o,a,e,!1,null,"7a959078",null);s["a"]=c.exports},"861b":function(t,s,i){},8870:function(t,s,i){},"984c":function(t,s,i){t.exports=i.p+"img/th.3a8e4839.jpg"},a5aa:function(t,s,i){t.exports=i.p+"img/john_1.27fa62a0.jpg"},b9c9:function(t,s,i){t.exports=i.p+"img/john.ef08aeac.png"},de97:function(t,s,i){"use strict";var a=i("8870"),e=i.n(a);e.a}}]);