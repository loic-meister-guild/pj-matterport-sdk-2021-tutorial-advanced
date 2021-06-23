/*! For license information please see mattertag.postMessage.js.LICENSE.txt */
(()=>{var e={277:(e,t,s)=>{var n,r,i;i=function(){var e,t,s=document,n=s.getElementsByTagName("head")[0],r={},i={},o={},c={};function a(e,t){for(var s=0,n=e.length;s<n;++s)if(!t(e[s]))return!1;return 1}function d(e,t){a(e,(function(e){return t(e),1}))}function h(t,s,n){t=t.push?t:[t];var l=s&&s.call,u=l?s:n,v=l?t.join(""):s,m=t.length;function f(e){return e.call?e():r[e]}function p(){if(!--m)for(var e in r[v]=1,u&&u(),o)a(e.split("|"),f)&&!d(o[e],f)&&(o[e]=[])}return setTimeout((function(){d(t,(function t(s,n){return null===s?p():(n||/^https?:\/\//.test(s)||!e||(s=-1===s.indexOf(".js")?e+s+".js":e+s),c[s]?(v&&(i[v]=1),2==c[s]?p():setTimeout((function(){t(s,!0)}),0)):(c[s]=1,v&&(i[v]=1),void g(s,p)))}))}),0),h}function g(e,r){var i,o=s.createElement("script");o.onload=o.onerror=o.onreadystatechange=function(){o.readyState&&!/^c|loade/.test(o.readyState)||i||(o.onload=o.onreadystatechange=null,i=1,c[e]=2,r())},o.async=1,o.src=t?e+(-1===e.indexOf("?")?"?":"&")+t:e,n.insertBefore(o,n.lastChild)}return h.get=g,h.order=function(e,t,s){!function n(r){r=e.shift(),e.length?h(r,n):h(r,t,s)}()},h.path=function(t){e=t},h.urlArgs=function(e){t=e},h.ready=function(e,t,s){e=e.push?e:[e];var n,i=[];return!d(e,(function(e){r[e]||i.push(e)}))&&a(e,(function(e){return r[e]}))?t():(n=e.join("|"),o[n]=o[n]||[],o[n].push(t),s&&s(i)),h},h.done=function(e){h([null],e)},h},e.exports?e.exports=i():void 0===(r="function"==typeof(n=i)?n.call(t,s,t,e):n)||(e.exports=r)}},t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{"use strict";var e;!function(e){e.LOADED="inject.loaded",e.SETUP="inject.setup",e.RESOLVE="inject.resolve"}(e||(e={}));var t,n,r,i,o=s(277);class c{constructor(e){this.messageReceiver=e}notify(e){this.messageReceiver.onMessageReceived(e)}}class a{constructor(){this.values={}}add(e,t){this.getValuesAtKey(e).push(t)}remove(e,t){const s=this.values[e];if(s){const e=s.indexOf(t);e>-1&&s.splice(e,1)}}getValuesAtKey(e){const t=this.values[e]||[];return this.values[e]=t,t}valuesPerKey(e){return this.getValuesAtKey(e).length}get keys(){return Object.keys(this.values)}}class d{constructor(e,t){this.sourceId=e,this.listenerBridge=t,this.observers=new a}init(){const e=new class{constructor(e){this.messenger=e}onMessageReceived(e){this.messenger.onMessageReceived(e)}}(this),t=new c(e);this.listenerBridge.listen(t)}dispose(){this.listenerBridge.stopListening()}addObserver(e){this.observers.add(e.messageType,e)}removeObserver(e){this.observers.remove(e.messageType,e)}send(e,t,s){s.send(Object.assign(Object.assign({},e),{fromId:this.sourceId,toId:t,timestamp:Date.now()}))}onMessageReceived(e){const t=e.type,s=this.observers.getValuesAtKey(t);if(s)for(const t of s)t.notify(e.payload,e.timestamp)}}class h{constructor(e){this.sourceWindow=e,this.messageObserver=null,this.onMessage=e=>{this.messageObserver&&this.messageObserver.notify(e.data)}}listen(e){this.messageObserver||(this.messageObserver=e,this.sourceWindow.addEventListener("message",this.onMessage))}stopListening(){this.sourceWindow.removeEventListener("message",this.onMessage),this.messageObserver=null}}class g{constructor(e,t="*"){this.targetWindow=e,this.targetOrigin=t}send(e){this.targetWindow.postMessage(e,this.targetOrigin)}}class l{constructor(e,t,s){this.sourceId=e,this.targetId=t,this.messageBridge=s,this.observers=new a}init(){const e=new class{constructor(e){this.messenger=e}onMessageReceived(e){this.messenger.onMessageReceived(e)}}(this),t=new c(e);this.messageBridge.listen(t)}dispose(){this.messageBridge.stopListening()}addObserver(e){this.observers.add(e.messageType,e)}removeObserver(e){this.observers.remove(e.messageType,e)}send(e){const t=this.sourceId,s=this.targetId;this.messageBridge.send(Object.assign(Object.assign({},e),{fromId:t,toId:s,timestamp:Date.now()}))}onMessageReceived(e){if(!this.filterMessageId(e))return;const t=e.type,s=this.observers.getValuesAtKey(t);if(s)for(const t of s)t.notify(e.payload,e.timestamp)}filterMessageId(e){const t=e.toId,s=e.fromId;return t instanceof Array?t.indexOf(this.sourceId)>-1:t===this.sourceId&&s===this.targetId}}class u{constructor(e,t,s="*"){this.listener=new h(e),this.sender=new g(t,s)}listen(e){this.listener.listen(e)}stopListening(){this.listener.stopListening()}send(e){this.sender.send(e)}}class v{constructor(e,t,s,n,r="*"){this.sourceId=e,this.sourceWindow=t,this.targetId=s,this.targetWindow=n,this.targetOrigin=r}createMessenger(){const e=new u(this.sourceWindow,this.targetWindow,this.targetOrigin);return new l(this.sourceId,this.targetId,e)}}!function(e){e.CONNECT="postmessage.connect"}(t||(t={})),function(e){e.HANDSHAKE="postmessage.handshake",e.ACCEPT="postmessage.accept",e.REJECT="postmessage.reject"}(n||(n={}));class m{constructor(e){this.type=t.CONNECT,this.payload={applicationKey:e}}}class f{constructor(e){this.receiver=e,this.messageType=n.HANDSHAKE}notify(e){this.receiver.handshake()}}class p{constructor(e){this.receiver=e,this.messageType=n.ACCEPT}notify(e){const{scriptUrl:t,warning:s,targetId:n,targetOrigin:r}=e,i=e.interface;this.receiver.accept(t,i,n,r,s)}}class w{constructor(e){this.receiver=e,this.messageType=n.REJECT}notify(e){this.receiver.reject(e.reason)}}!function(e){e[e.IDLE=0]="IDLE",e[e.CONNECTING=1]="CONNECTING",e[e.HANDSHAKE=2]="HANDSHAKE",e[e.CONNECTED=3]="CONNECTED",e[e.REJECTED=4]="REJECTED"}(r||(r={}));class O{constructor(e,t){this.messenger=e,this.target=t,this.connectionState=r.IDLE,this.connectionPoll=void 0;const s=new class{constructor(e){this.connector=e}handshake(){this.connector.handshake()}accept(e,t,s,n,r){this.connector.accept(e,t,s,n,r)}reject(e){this.connector.reject(e)}}(this);this.handshakeObserver=new f(s),this.acceptObserver=new p(s),this.rejectObserver=new w(s),this.connectionPromise=new Promise(((e,t)=>{this.resolveConnection=e,this.rejectConnection=t}))}connect(e){return this.connectionState===r.IDLE&&(this.connectionState=r.CONNECTING,this.messenger.addObserver(this.handshakeObserver),this.messenger.addObserver(this.acceptObserver),this.messenger.addObserver(this.rejectObserver),this.connectionPoll=window.setInterval((()=>{this.messenger.send(new m(e),-1,this.target)}),500)),this.connectionPromise}cancelConnecting(){this.connectionState<r.CONNECTED&&(this.stopConnectPolling(),this.rejectConnection("User manually cancelled connection"))}handshake(){this.connectionState<r.HANDSHAKE&&(this.connectionState=r.HANDSHAKE,this.stopConnectPolling(),this.messenger.removeObserver(this.handshakeObserver))}accept(e,t,s,n,i){this.connectionState<r.CONNECTED&&(this.connectionState=r.CONNECTED,this.messenger.removeObserver(this.handshakeObserver),this.messenger.removeObserver(this.acceptObserver),this.messenger.removeObserver(this.rejectObserver),this.stopConnectPolling(),this.resolveConnection({targetId:s,targetOrigin:n,scriptUrl:e,serializedInterface:t,warning:i}))}reject(e){this.connectionState<r.CONNECTED&&(this.connectionState=r.REJECTED,this.messenger.removeObserver(this.handshakeObserver),this.messenger.removeObserver(this.acceptObserver),this.messenger.removeObserver(this.rejectObserver),this.stopConnectPolling(),this.rejectConnection(e))}stopConnectPolling(){clearInterval(this.connectionPoll),this.connectionPoll=void 0}}!function(e){e.connect=async function(e,s){if("string"!=typeof s)return Promise.reject("invalid key");const n=(r=e)instanceof Window?r:r.contentWindow?r.contentWindow:null;var r;if(!n)return Promise.reject("invalid window");const i=Math.floor(1e6*Math.random()),c=new h(window),a=new g(n),l=new d(i,c);l.init();const u=new O(l,a);let m;try{m=await u.connect(s)}catch(e){throw Error(`${s}@${window.location.href} - ${e}`)}finally{u.cancelConnecting(),l.dispose()}return f=await async function(e){if(!e)throw new Error("Unabled to load the sdk");const s=t[e];if(s)return s;const n=new Promise(((t,s)=>{try{o(e,(function(){const e=window["sdk-client"];delete window["sdk-client"],e&&e.SdkBuilder&&"function"==typeof e.SdkBuilder&&t(e.SdkBuilder)}))}catch(t){s(`Could not load the sdk from ${e}`)}}));return t[e]=n,n}(m.scriptUrl),p=new v(i,window,m.targetId,n,m.targetOrigin),w=m.serializedInterface,new f(p).build(w);var f,p,w};const t={}}(i||(i={}));class E{constructor(e,t,s){this.sourceId=e,this.targetId=t,this.target=s,this.messageHandlers=new a,this.onMessage=e=>{const{type:t,fromId:s,toId:n}=e.data;if(s!==this.targetId&&n!==this.sourceId)return;const r=this.messageHandlers.getValuesAtKey(t);for(const t of r)t(...e.data.payload)},window.addEventListener("message",this.onMessage)}updateTarget(e){this.target=e}facade(){const e=this;return new class{dispose(){e.dispose()}on(t,s){e.on(t,s)}off(t,s){e.off(t,s)}send(t,...s){e.send(t,...s)}}}dispose(){window.removeEventListener("message",this.onMessage),this.messageHandlers=new a}on(e,t){this.messageHandlers.add(e,t)}off(e,t){this.messageHandlers.remove(e,t)}send(e,...t){this.target.postMessage({toId:this.targetId,fromId:this.sourceId,type:e,payload:t},"*")}}function y(e,t,s){for(;t.childNodes.length;){const n=t.childNodes[0];if("SCRIPT"===n.nodeName){const e=document.createElement("script"),r=n;r.src?e.setAttribute("src",r.src):e.innerHTML=r.innerHTML||"",t.removeChild(n),s.push(e)}else e.append(n)}}window.addEventListener("message",(function t(s){if(s.source===window.parent&&s.data.type===e.SETUP){const n=s.data.windowPath,r=Function("return window.parent"+n)();window.removeEventListener("message",t),function(e,t){const s=new E(e.id,e.targetId,t).facade(),n=e.messageFcnMapping;window[n.send]=(e,...t)=>s.send(e,...t),window[n.on]=(e,t)=>s.on(e,t),window[n.off]=(e,t)=>s.off(e,t)}(s.data,r);const i=(new DOMParser).parseFromString(s.data.customHTML,"text/html"),o=[];y(document.head,i.head,o),y(document.body,i.body,o),function e(t){const s=t[0];s&&(s.onload=function(){t.shift(),e(t)},document.head.appendChild(s))}(o),r.postMessage({type:e.RESOLVE,fromId:s.data.id,toId:s.data.targetId},"*")}}))})()})();