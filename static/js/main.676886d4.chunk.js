(this["webpackJsonpreact-drag-and-drop-react-beautiful-dnd"]=this["webpackJsonpreact-drag-and-drop-react-beautiful-dnd"]||[]).push([[0],{12:function(e,t,n){e.exports=n(23)},19:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(11),r=n(4),i=n(0),o=n.n(i),s=n(3),l=n.n(s),c=n(2);const d=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function g(e,t){navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const n=e.installing;null!=n&&(n.onstatechange=()=>{"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(e=>{console.error("Error during service worker registration:",e)})}var p=n(6);n(19);const u=(e,t=0)=>Array.from({length:e},(e,t)=>t).map(e=>({id:"item-".concat(e+t,"-").concat((new Date).getTime()),content:"".concat(e+1+t)}));var m=[];const f=(e,t)=>Object(a.a)({userSelect:"none",padding:5,margin:5,justifyContent:"center",border:"solid",background:e?"lightgreen":"white",fontWeight:"bold"},t),h=e=>({background:e?"lightblue":"lightgrey",padding:2,margin:2,width:"31%"}),b={margin:2,display:"flex",justifyContent:"center"},y={marginRight:12,marginLeft:12};function v(){const e=Object(i.useState)([u(4),u(4,4),u(4,8),u(6,12),u(7,18)]),t=Object(r.a)(e,2),n=t[0],a=t[1];function s(e){return o.a.createElement(p.a,{type:"text",onSave:t=>((e,t)=>{const r=[...n];r.forEach(n=>{var a=n.find(e=>e.id===t);a&&(a.content=e)}),a(r)})(t,e.id),value:e.content,editOnViewClick:!0,hideIcons:!0,submitOnUnfocus:!0,submitOnEnter:!0,viewProps:{style:{width:"4em",height:"1em"}},inputProps:{style:{fontSize:16}},editButtonClassName:"custom-edit-button-hidden",saveButtonClassName:"custom-edit-button-hidden",cancelButtonClassName:"custom-edit-button-hidden",viewContainerClassName:"view-container",validation:e=>e.length>0&&e.length<5,validationMessage:"1-4\u6587\u5b57\u3092\u8a31\u5bb9"})}var l=[];return[...Array(3)].map((e,t)=>l.push(o.a.createElement(c.c,{key:t,droppableId:"".concat(t)},(e,r)=>o.a.createElement("div",Object.assign({ref:e.innerRef,style:h(r.isDraggingOver)},e.droppableProps),"\u7b2c",t+1,"\u30b3\u30fc\u30c8",n[t].map((e,t)=>o.a.createElement(c.b,{key:e.id,draggableId:e.id,index:t},(t,n)=>o.a.createElement("div",Object.assign({ref:t.innerRef},t.draggableProps,t.dragHandleProps,{style:f(n.isDragging,t.draggableProps.style)}),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},s(e))))),e.placeholder,o.a.createElement("button",{type:"button",style:{height:40,width:"100%"},onClick:()=>(e=>{if(4!==n[e].length)return;const t=[];n.map(e=>t.push([].concat(e))),m.push(t);const r=n[e].slice(0,4),i=m.length%2,o=n[3].slice(n[3].length-(i+1),n[3].length),s=[...n];[...Array(i+1)].map(()=>s[3].pop()),s[3]=[...s[3],...r.slice(0,1)],s[3]=[...s[3],...r.slice(2,3)],s[3]=[...s[3],...o],s[3]=[...s[3],...r.slice(1,2)],s[3]=[...s[3],...r.slice(3,4)];const l=s[3].slice(0,4);s[e]=l,[...Array(4)].map(()=>s[3].shift()),a(s.filter(e=>e.length))})(t)},"\u7d42\u4e86"))))),o.a.createElement(c.a,{onDragEnd:function(e){const t=e.source,i=e.destination;if(!i)return;const o=+t.droppableId,s=+i.droppableId;if(o===s){const e=((e,t,n)=>{const a=Array.from(e),i=a.splice(t,1),o=Object(r.a)(i,1)[0];return a.splice(n,0,o),a})(n[o],t.index,i.index),s=[...n];s[o]=e,a(s)}else{const e=((e,t,n,a)=>{const i=Array.from(e),o=Array.from(t),s=i.splice(n.index,1),l=Object(r.a)(s,1)[0];o.splice(a.index,0,l);const c={};return c[n.droppableId]=i,c[a.droppableId]=o,c})(n[o],n[s],t,i),l=[...n];l[o]=e[o],l[s]=e[s],a(l.filter(e=>e.length))}}},o.a.createElement("div",null,o.a.createElement("div",{style:b},l),o.a.createElement("div",{style:b},o.a.createElement(c.c,{key:3,droppableId:"".concat(3)},(e,t)=>o.a.createElement("div",Object.assign({ref:e.innerRef,style:h(t.isDraggingOver)},e.droppableProps),"\u9806\u756a\u5f85\u3061",n[3].map((e,t)=>o.a.createElement(c.b,{key:e.id,draggableId:e.id,index:t},(t,n)=>o.a.createElement("div",Object.assign({ref:t.innerRef},t.draggableProps,t.dragHandleProps,{style:f(n.isDragging,t.draggableProps.style)}),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},s(e))))),e.placeholder)),o.a.createElement(c.c,{key:4,droppableId:"".concat(4)},(e,t)=>o.a.createElement("div",Object.assign({ref:e.innerRef,style:h(t.isDraggingOver)},e.droppableProps),"\u4f11\u307f",n[4].map((e,t)=>o.a.createElement(c.b,{key:e.id,draggableId:e.id,index:t},(t,n)=>o.a.createElement("div",Object.assign({ref:t.innerRef},t.draggableProps,t.dragHandleProps,{style:f(n.isDragging,t.draggableProps.style)}),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},s(e))))),e.placeholder))),o.a.createElement("div",{style:b},m.length,"\u30b2\u30fc\u30e0\u7d42\u4e86",o.a.createElement("button",{type:"button",onClick:function(){if(m.length<1)return;const e=m[m.length-1].slice();m.pop(),a(e)},style:y},"Ctrl+Z"),o.a.createElement("button",{type:"button",onClick:function(){sessionStorage.setItem("stateItem",JSON.stringify(n)),sessionStorage.setItem("stateItemList",JSON.stringify(m))},style:y},"Save"),o.a.createElement("button",{type:"button",onClick:function(){const e=JSON.parse(sessionStorage.getItem("stateItem")),t=JSON.parse(sessionStorage.getItem("stateItemList"));e&&t&&(a(e.filter(e=>e.length)),m=t)},style:y},"Load")),o.a.createElement("div",{style:b},o.a.createElement(p.a,{type:"textarea",inputProps:{rows:1,width:"3em"},viewProps:{style:{width:"6em"}},editOnViewClick:!0,hideIcons:!0,submitOnUnfocus:!0,submitOnEnter:!0,value:"",onSave:e=>{},saveButtonClassName:"custom-edit-button-hidden",cancelButtonClassName:"custom-edit-button-hidden",editButtonClassName:"custom-edit-button-all",viewContainerClassName:"view-container",editButtonContent:"\u4e00\u62ec\u7de8\u96c6"}))))}l.a.render(o.a.createElement(v,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/coat-app-dnd",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="".concat("/coat-app-dnd","/service-worker.js");d?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then(n=>{const a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):g(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):g(t,e)})}}()}},[[12,1,2]]]);
//# sourceMappingURL=main.676886d4.chunk.js.map