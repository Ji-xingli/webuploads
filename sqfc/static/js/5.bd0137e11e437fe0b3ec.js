webpackJsonp([5],{"77KB":function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"c",function(){return r}),a.d(e,"d",function(){return n}),a.d(e,"b",function(){return c});var s=a("Y8t/"),i=function(t){return Object(s.a)({url:"/sqfc/material/queryText",method:"get",params:t})},r=function(t){return Object(s.a)({url:"/sqfc/material/updateText",method:"get",params:t})},n=function(t){return Object(s.a)({url:"/sqfc/material/addText",method:"get",params:t})},c=function(t){return Object(s.a)({url:"/sqfc/material/deleteText",method:"get",params:{textId:t}})}},KmhS:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),r=(a("goGF"),a("cQy8")),n=a("77KB"),c=a("mAMQ"),o=a("IFmi"),l={data:function(){return{currentPage:1,pageSize:12,totalNo:0,totalPage:0,type:this.$route.query.type,areaType:this.$route.query.areaType,active:0,selNum:0,searchVal:"",readonly:!0,selList:[],listData:[]}},computed:{types:function(){return 1==this.$route.query.type?"视频":2==this.$route.query.type?"图片":"文字"}},mounted:function(){console.log("area",this.areaType),1==this.type?this.getVList(this.currentPage,this.pageSize):2==this.type?this.getPList(this.currentPage,this.pageSize):this.getTList(this.currentPage,this.pageSize)},methods:{timeFormat:function(t){return Object(o.b)(t)},loadMore:function(){this.currentPage+=1,1==this.type?this.getVList(this.currentPage,this.pageSize):2==this.type?this.getPList(this.currentPage,this.pageSize):this.getTList(this.currentPage,this.pageSize)},getVList:function(t,e){var a=this;this.currentPage=t;var s={pageNum:t,pageSize:e,title:this.searchVal};Object(r.d)(s).then(function(t){200==t.data.code?(a.listData=a.listData.concat(t.data.data.list),a.totalNo=t.data.data.total,a.totalPage=Math.ceil(a.totalNo/a.pageSize)):a.$message.error(t.msg)}).catch(function(t){console.log(t)})},getPList:function(t,e){var a=this;this.currentPage=t;var s={pageNum:t,pageSize:e,title:this.searchVal};Object(c.a)(s).then(function(t){200==t.data.code?(a.listData=a.listData.concat(t.data.data.list),a.totalNo=t.data.data.total,a.totalPage=Math.ceil(a.totalNo/a.pageSize)):a.$message.error(t.msg)}).catch(function(t){console.log(t)})},getTList:function(t,e){var a=this;this.currentPage=t;var s={pageNum:t,pageSize:e,title:this.searchVal};Object(n.a)(s).then(function(t){200==t.data.code?(a.listData=a.listData.concat(t.data.data.list),a.totalNo=t.data.data.total,a.totalPage=Math.ceil(a.totalNo/a.pageSize)):a.$message.error(t.msg)}).catch(function(t){console.log(t)})},handleNext:function(){var t=this;if(0==this.selNum)return this.$message.error("选择添加的文件"),!1;this.listData.forEach(function(e,a){e.checked&&t.selList.push(e)}),localStorage.setItem("addSelList",i()(this.selList)),this.$router.push({name:"progranEdit",query:{programId:this.$route.query.programId,modelId:this.$route.query.modelId,areaType:this.areaType,isSel:!0}})},goBack:function(){this.$router.go(-1)},itemChecked:function(t){this.listData[t].checked=!this.listData[t].checked;var e=0;this.listData.forEach(function(t,a){t.checked&&(e+=1)}),this.selNum=e}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap"},[s("div",{staticClass:"manage_box"},[s("div",{staticClass:"block_title"},[s("el-row",{staticClass:"title_box",attrs:{gutter:20}},[s("el-col",{attrs:{span:6}},[s("div",{staticClass:"title"},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/programManage"}}},[t._v("节目管理")]),t._v(" "),s("el-breadcrumb-item",[t._v("添加"+t._s(t.types))])],1)],1)]),t._v(" "),s("el-col",{attrs:{span:12,offset:6}},[s("div",{staticClass:"search"},[s("el-input",{attrs:{placeholder:"请输入名称搜索","prefix-icon":"el-icon-search",clearable:""},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)],1)])],1),t._v(" "),s("el-row",[s("el-col",{attrs:{span:6,offset:8}},[s("div",{staticClass:"step"},[s("el-steps",{attrs:{active:t.active,"finish-status":"success"}},[s("el-step"),t._v(" "),s("el-step")],1)],1)])],1),t._v(" "),s("el-row",[s("el-col",[s("div",{staticClass:"top_label"},[s("span",{staticClass:"label"},[t._v(t._s(t.types)+"("+t._s(t.selNum)+"/"+t._s(t.totalNo)+")")])])])],1),t._v(" "),s("div",{staticClass:"row_box"},t._l(t.listData,function(e,i){return s("dl",{key:i,staticClass:"dl flip-list-move"},[s("dt",[s("div",{staticClass:"img"},[2==t.type?s("img",{attrs:{src:e.materialUrl,alt:""}}):t._e(),t._v(" "),1==t.type?s("img",{attrs:{src:a("Uc3U"),alt:""}}):t._e(),t._v(" "),3==t.type?s("img",{attrs:{src:a("NGR+"),alt:""}}):t._e()]),t._v(" "),s("div",{staticClass:"text"},[s("div",{staticClass:"play_title"},[s("div",{staticClass:"sel",class:e.checked?"checked":"",on:{click:function(e){return t.itemChecked(i)}}})])])]),t._v(" "),s("dd",{staticClass:"total_times"},[s("span",{staticClass:"a_title"},[t._v(t._s(e.materialTitle))]),t._v(" "),1==t.type?s("span",[t._v("总时长："+t._s(t.timeFormat(e.materialTotalTime)[0])+"时"+t._s(t.timeFormat(e.materialTotalTime)[1])+"分"+t._s(t.timeFormat(e.materialTotalTime)[2])+"秒")]):t._e()]),t._v(" "),s("dd",{staticClass:"dd"},[t._v("\n            "+t._s(e.materialBrief)+"\n            ")])])}),0)],1),t._v(" "),t.currentPage<t.totalPage?s("div",{staticClass:"load_more",on:{click:t.loadMore}},[t._v("\n      点击加载更多\n    ")]):t._e(),t._v(" "),s("div",{staticClass:"bottom_btn"},[s("el-button",{on:{click:t.goBack}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.handleNext}},[t._v("下一步")])],1)])])},staticRenderFns:[]};var d=a("VU/8")(l,u,!1,function(t){a("d1P4")},"data-v-28966a7e",null);e.default=d.exports},cQy8:function(t,e,a){"use strict";a.d(e,"c",function(){return r}),a.d(e,"d",function(){return n}),a.d(e,"e",function(){return c}),a.d(e,"f",function(){return o}),a.d(e,"a",function(){return l}),a.d(e,"b",function(){return u});var s=a("Dd8w"),i=(a.n(s),a("Y8t/")),r=function(){return Object(i.a)({url:"/sqfc/material/queryNumber",method:"get",params:{}})},n=function(t){return Object(i.a)({url:"/sqfc/material/queryVideo",method:"get",params:t})},c=function(t){return Object(i.a)({url:"/sqfc/material/updateVideo",method:"post",data:t})},o=function(t){return Object(i.a)({url:"/sqfc/material/uploadVideo",method:"post",data:t})},l=function(t){return Object(i.a)({url:"/sqfc/material/findMaterialById",method:"get",params:{id:t}})},u=function(t){return Object(i.a)({url:"/sqfc/material/deleteVideo",method:"get",params:{videoId:t}})}},d1P4:function(t,e){},mAMQ:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"c",function(){return r}),a.d(e,"d",function(){return n}),a.d(e,"b",function(){return c});var s=a("Y8t/"),i=function(t){return Object(s.a)({url:"/sqfc/material/queryImage",method:"get",params:t})},r=function(t){return Object(s.a)({url:"/sqfc/material/updateImage",method:"post",data:t})},n=function(t){return Object(s.a)({url:"/sqfc/material/uploadImage",method:"post",data:t})},c=function(t){return Object(s.a)({url:"/sqfc/material/deleteImage",method:"get",params:{imageId:t}})}},mvHQ:function(t,e,a){t.exports={default:a("qkKv"),__esModule:!0}},qkKv:function(t,e,a){var s=a("FeBl"),i=s.JSON||(s.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}}});
//# sourceMappingURL=5.bd0137e11e437fe0b3ec.js.map