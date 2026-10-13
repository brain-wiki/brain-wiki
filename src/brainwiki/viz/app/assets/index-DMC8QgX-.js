var Ro,fe,Oh,Gi,bc,Nh,Fh,kh,Vl,za,Ba,as={},zh=[],Ud=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Po=Array.isArray;function ni(n,t){for(var e in t)n[e]=t[e];return n}function Gl(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function Id(n,t,e){var i,r,s,o={};for(s in t)s=="key"?i=t[s]:s=="ref"?r=t[s]:o[s]=t[s];if(arguments.length>2&&(o.children=arguments.length>3?Ro.call(arguments,2):e),typeof n=="function"&&n.defaultProps!=null)for(s in n.defaultProps)o[s]===void 0&&(o[s]=n.defaultProps[s]);return so(n,o,i,r,null)}function so(n,t,e,i,r){var s={type:n,props:t,key:e,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++Oh,__i:-1,__u:0};return r==null&&fe.vnode!=null&&fe.vnode(s),s}function en(n){return n.children}function oo(n,t){this.props=n,this.context=t}function Rr(n,t){if(t==null)return n.__?Rr(n.__,n.__i+1):null;for(var e;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null)return e.__e;return typeof n.type=="function"?Rr(n):null}function Bh(n){var t,e;if((n=n.__)!=null&&n.__c!=null){for(n.__e=n.__c.base=null,t=0;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null){n.__e=n.__c.base=e.__e;break}return Bh(n)}}function Tc(n){(!n.__d&&(n.__d=!0)&&Gi.push(n)&&!xo.__r++||bc!=fe.debounceRendering)&&((bc=fe.debounceRendering)||Nh)(xo)}function xo(){for(var n,t,e,i,r,s,o,a=1;Gi.length;)Gi.length>a&&Gi.sort(Fh),n=Gi.shift(),a=Gi.length,n.__d&&(e=void 0,r=(i=(t=n).__v).__e,s=[],o=[],t.__P&&((e=ni({},i)).__v=i.__v+1,fe.vnode&&fe.vnode(e),Wl(t.__P,e,i,t.__n,t.__P.namespaceURI,32&i.__u?[r]:null,s,r??Rr(i),!!(32&i.__u),o),e.__v=i.__v,e.__.__k[e.__i]=e,Gh(s,e,o),e.__e!=r&&Bh(e)));xo.__r=0}function Hh(n,t,e,i,r,s,o,a,l,c,h){var u,d,f,_,g,m,p=i&&i.__k||zh,v=t.length;for(l=Od(e,t,p,l,v),u=0;u<v;u++)(f=e.__k[u])!=null&&(d=f.__i==-1?as:p[f.__i]||as,f.__i=u,m=Wl(n,f,d,r,s,o,a,l,c,h),_=f.__e,f.ref&&d.ref!=f.ref&&(d.ref&&Xl(d.ref,null,f),h.push(f.ref,f.__c||_,f)),g==null&&_!=null&&(g=_),4&f.__u||d.__k===f.__k?l=Vh(f,l,n):typeof f.type=="function"&&m!==void 0?l=m:_&&(l=_.nextSibling),f.__u&=-7);return e.__e=g,l}function Od(n,t,e,i,r){var s,o,a,l,c,h=e.length,u=h,d=0;for(n.__k=new Array(r),s=0;s<r;s++)(o=t[s])!=null&&typeof o!="boolean"&&typeof o!="function"?(l=s+d,(o=n.__k[s]=typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?so(null,o,null,null,null):Po(o)?so(en,{children:o},null,null,null):o.constructor==null&&o.__b>0?so(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,a=null,(c=o.__i=Nd(o,e,l,u))!=-1&&(u--,(a=e[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(r>h?d--:r<h&&d++),typeof o.type!="function"&&(o.__u|=4)):c!=l&&(c==l-1?d--:c==l+1?d++:(c>l?d--:d++,o.__u|=4))):n.__k[s]=null;if(u)for(s=0;s<h;s++)(a=e[s])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=Rr(a)),Xh(a,a));return i}function Vh(n,t,e){var i,r;if(typeof n.type=="function"){for(i=n.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=n,t=Vh(i[r],t,e));return t}n.__e!=t&&(t&&n.type&&!e.contains(t)&&(t=Rr(n)),e.insertBefore(n.__e,t||null),t=n.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Nd(n,t,e,i){var r,s,o=n.key,a=n.type,l=t[e];if(l===null&&n.key==null||l&&o==l.key&&a==l.type&&(2&l.__u)==0)return e;if(i>(l!=null&&(2&l.__u)==0?1:0))for(r=e-1,s=e+1;r>=0||s<t.length;){if(r>=0){if((l=t[r])&&(2&l.__u)==0&&o==l.key&&a==l.type)return r;r--}if(s<t.length){if((l=t[s])&&(2&l.__u)==0&&o==l.key&&a==l.type)return s;s++}}return-1}function wc(n,t,e){t[0]=="-"?n.setProperty(t,e??""):n[t]=e==null?"":typeof e!="number"||Ud.test(t)?e:e+"px"}function Es(n,t,e,i,r){var s,o;t:if(t=="style")if(typeof e=="string")n.style.cssText=e;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(t in i)e&&t in e||wc(n.style,t,"");if(e)for(t in e)i&&e[t]==i[t]||wc(n.style,t,e[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(kh,"$1")),o=t.toLowerCase(),t=o in n||t=="onFocusOut"||t=="onFocusIn"?o.slice(2):t.slice(2),n.l||(n.l={}),n.l[t+s]=e,e?i?e.u=i.u:(e.u=Vl,n.addEventListener(t,s?Ba:za,s)):n.removeEventListener(t,s?Ba:za,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in n)try{n[t]=e??"";break t}catch{}typeof e=="function"||(e==null||e===!1&&t[4]!="-"?n.removeAttribute(t):n.setAttribute(t,t=="popover"&&e==1?"":e))}}function Ac(n){return function(t){if(this.l){var e=this.l[t.type+n];if(t.t==null)t.t=Vl++;else if(t.t<e.u)return;return e(fe.event?fe.event(t):t)}}}function Wl(n,t,e,i,r,s,o,a,l,c){var h,u,d,f,_,g,m,p,v,y,S,w,b,A,L,E,x,R=t.type;if(t.constructor!=null)return null;128&e.__u&&(l=!!(32&e.__u),s=[a=t.__e=e.__e]),(h=fe.__b)&&h(t);t:if(typeof R=="function")try{if(p=t.props,v="prototype"in R&&R.prototype.render,y=(h=R.contextType)&&i[h.__c],S=h?y?y.props.value:h.__:i,e.__c?m=(u=t.__c=e.__c).__=u.__E:(v?t.__c=u=new R(p,S):(t.__c=u=new oo(p,S),u.constructor=R,u.render=kd),y&&y.sub(u),u.props=p,u.state||(u.state={}),u.context=S,u.__n=i,d=u.__d=!0,u.__h=[],u._sb=[]),v&&u.__s==null&&(u.__s=u.state),v&&R.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=ni({},u.__s)),ni(u.__s,R.getDerivedStateFromProps(p,u.__s))),f=u.props,_=u.state,u.__v=t,d)v&&R.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),v&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(v&&R.getDerivedStateFromProps==null&&p!==f&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(p,S),!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(p,u.__s,S)===!1||t.__v==e.__v){for(t.__v!=e.__v&&(u.props=p,u.state=u.__s,u.__d=!1),t.__e=e.__e,t.__k=e.__k,t.__k.some(function(D){D&&(D.__=t)}),w=0;w<u._sb.length;w++)u.__h.push(u._sb[w]);u._sb=[],u.__h.length&&o.push(u);break t}u.componentWillUpdate!=null&&u.componentWillUpdate(p,u.__s,S),v&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(f,_,g)})}if(u.context=S,u.props=p,u.__P=n,u.__e=!1,b=fe.__r,A=0,v){for(u.state=u.__s,u.__d=!1,b&&b(t),h=u.render(u.props,u.state,u.context),L=0;L<u._sb.length;L++)u.__h.push(u._sb[L]);u._sb=[]}else do u.__d=!1,b&&b(t),h=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++A<25);u.state=u.__s,u.getChildContext!=null&&(i=ni(ni({},i),u.getChildContext())),v&&!d&&u.getSnapshotBeforeUpdate!=null&&(g=u.getSnapshotBeforeUpdate(f,_)),E=h,h!=null&&h.type===en&&h.key==null&&(E=Wh(h.props.children)),a=Hh(n,Po(E)?E:[E],t,e,i,r,s,o,a,l,c),u.base=t.__e,t.__u&=-161,u.__h.length&&o.push(u),m&&(u.__E=u.__=null)}catch(D){if(t.__v=null,l||s!=null)if(D.then){for(t.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;s[s.indexOf(a)]=null,t.__e=a}else for(x=s.length;x--;)Gl(s[x]);else t.__e=e.__e,t.__k=e.__k;fe.__e(D,t,e)}else s==null&&t.__v==e.__v?(t.__k=e.__k,t.__e=e.__e):a=t.__e=Fd(e.__e,t,e,i,r,s,o,l,c);return(h=fe.diffed)&&h(t),128&t.__u?void 0:a}function Gh(n,t,e){for(var i=0;i<e.length;i++)Xl(e[i],e[++i],e[++i]);fe.__c&&fe.__c(t,n),n.some(function(r){try{n=r.__h,r.__h=[],n.some(function(s){s.call(r)})}catch(s){fe.__e(s,r.__v)}})}function Wh(n){return typeof n!="object"||n==null||n.__b&&n.__b>0?n:Po(n)?n.map(Wh):ni({},n)}function Fd(n,t,e,i,r,s,o,a,l){var c,h,u,d,f,_,g,m=e.props,p=t.props,v=t.type;if(v=="svg"?r="http://www.w3.org/2000/svg":v=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(c=0;c<s.length;c++)if((f=s[c])&&"setAttribute"in f==!!v&&(v?f.localName==v:f.nodeType==3)){n=f,s[c]=null;break}}if(n==null){if(v==null)return document.createTextNode(p);n=document.createElementNS(r,v,p.is&&p),a&&(fe.__m&&fe.__m(t,s),a=!1),s=null}if(v==null)m===p||a&&n.data==p||(n.data=p);else{if(s=s&&Ro.call(n.childNodes),m=e.props||as,!a&&s!=null)for(m={},c=0;c<n.attributes.length;c++)m[(f=n.attributes[c]).name]=f.value;for(c in m)if(f=m[c],c!="children"){if(c=="dangerouslySetInnerHTML")u=f;else if(!(c in p)){if(c=="value"&&"defaultValue"in p||c=="checked"&&"defaultChecked"in p)continue;Es(n,c,null,f,r)}}for(c in p)f=p[c],c=="children"?d=f:c=="dangerouslySetInnerHTML"?h=f:c=="value"?_=f:c=="checked"?g=f:a&&typeof f!="function"||m[c]===f||Es(n,c,f,m[c],r);if(h)a||u&&(h.__html==u.__html||h.__html==n.innerHTML)||(n.innerHTML=h.__html),t.__k=[];else if(u&&(n.innerHTML=""),Hh(t.type=="template"?n.content:n,Po(d)?d:[d],t,e,i,v=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,o,s?s[0]:e.__k&&Rr(e,0),a,l),s!=null)for(c=s.length;c--;)Gl(s[c]);a||(c="value",v=="progress"&&_==null?n.removeAttribute("value"):_!=null&&(_!==n[c]||v=="progress"&&!_||v=="option"&&_!=m[c])&&Es(n,c,_,m[c],r),c="checked",g!=null&&g!=n[c]&&Es(n,c,g,m[c],r))}return n}function Xl(n,t,e){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&t==null||(n.__u=n(t))}else n.current=t}catch(r){fe.__e(r,e)}}function Xh(n,t,e){var i,r;if(fe.unmount&&fe.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||Xl(i,null,t)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(s){fe.__e(s,t)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&Xh(i[r],t,e||typeof n.type!="function");e||Gl(n.__e),n.__c=n.__=n.__e=void 0}function kd(n,t,e){return this.constructor(n,e)}function zd(n,t,e){var i,r,s,o;t==document&&(t=document.documentElement),fe.__&&fe.__(n,t),r=(i=!1)?null:t.__k,s=[],o=[],Wl(t,n=t.__k=Id(en,null,[n]),r||as,as,t.namespaceURI,r?null:t.firstChild?Ro.call(t.childNodes):null,s,r?r.__e:t.firstChild,i,o),Gh(s,n,o)}Ro=zh.slice,fe={__e:function(n,t,e,i){for(var r,s,o;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(n)),o=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(n,i||{}),o=r.__d),o)return r.__E=r}catch(a){n=a}throw n}},Oh=0,oo.prototype.setState=function(n,t){var e;e=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=ni({},this.state),typeof n=="function"&&(n=n(ni({},e),this.props)),n&&ni(e,n),n!=null&&this.__v&&(t&&this._sb.push(t),Tc(this))},oo.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),Tc(this))},oo.prototype.render=en,Gi=[],Nh=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Fh=function(n,t){return n.__v.__b-t.__v.__b},xo.__r=0,kh=/(PointerCapture)$|Capture$/i,Vl=0,za=Ac(!1),Ba=Ac(!0);var Bd=0;function M(n,t,e,i,r,s){t||(t={});var o,a,l=t;if("ref"in l)for(a in l={},t)a=="ref"?o=t[a]:l[a]=t[a];var c={type:n,props:l,key:e,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Bd,__i:-1,__u:0,__source:r,__self:s};if(typeof n=="function"&&(o=n.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return fe.vnode&&fe.vnode(c),c}class Hd{constructor(t){this.token=t}embedded=!1;topics=new Map;async get(t){const e=t.includes("?")?"&":"?",i=this.token?`${t}${e}t=${encodeURIComponent(this.token)}`:t,r=await fetch(i,{credentials:"same-origin"});if(r.status===404)return null;if(!r.ok)throw new Error(`${t}: HTTP ${r.status}`);return await r.json()}async world(){const t=await this.get("/api/world");if(!t)throw new Error("no world");return t}topic(t){let e=this.topics.get(t);return e||(e=this.get(`/api/topic/${encodeURIComponent(t)}`),this.topics.set(t,e),e.catch(()=>this.topics.delete(t))),e}note(t){return this.get(`/api/note/${encodeURIComponent(t)}`)}async search(t){return t.trim()?(await this.get(`/api/search?q=${encodeURIComponent(t)}`))?.results??[]:[]}async health(){return await this.get("/api/health")??{counts:{},items:{}}}}class Vd{constructor(t){this.data=t}embedded=!0;async world(){return this.data.world}async topic(t){return this.data.topics[t]??null}async note(t){for(const e of Object.values(this.data.topics)){const i=e.nodes.find(r=>r.id===t);if(i)return{id:i.id,title:i.title,path:i.path,kind:i.kind,type:i.type,status:i.status,topic:i.topic,updated:i.updated,partial:!0}}return null}async search(t){const e=t.trim().toLowerCase();if(!e)return[];const i=[];for(const r of Object.values(this.data.topics))for(const s of r.nodes)if([s.title,...s.aliases].map(a=>a.toLowerCase()).some(a=>a.includes(e))&&(i.push({id:s.id,title:s.title,topic:s.topic,kind:s.kind}),i.length>=20))return i;return i}async health(){return this.data.health}}function Gd(){const n=document.getElementById("brain-data");if(n?.textContent)return new Vd(JSON.parse(n.textContent));const t=new URL(window.location.href);let e=t.searchParams.get("t");return e?(sessionStorage.setItem("brain-viz-token",e),t.searchParams.delete("t"),history.replaceState(history.state,"",t.pathname+t.search+t.hash)):e=sessionStorage.getItem("brain-viz-token"),new Hd(e)}const Cc=100;class Wd{entries;index;constructor(t){this.entries=t?.entries??[],this.index=t?Math.max(0,Math.min(t.index,this.entries.length-1)):-1}get current(){return this.entries[this.index]}visit(t){return this.current?.hash===t.hash?this.index:(this.entries=[...this.entries.slice(0,this.index+1),t],this.entries.length>Cc&&(this.entries=this.entries.slice(this.entries.length-Cc)),this.index=this.entries.length-1,this.index)}replace(t){return this.index<0?this.visit(t):(this.entries=this.entries.map((e,i)=>i===this.index?t:e),this.index)}moveTo(t){if(!(t<0||t>=this.entries.length))return this.index=t,this.current}setTitle(t,e){let i=!1;return this.entries=this.entries.map(r=>r.hash!==t||r.title===e?r:(i=!0,{...r,title:e})),i}get canBack(){return this.index>0}get canForward(){return this.index<this.entries.length-1}state(){return{entries:this.entries,index:this.index}}}const Xd=110,qd=80,$d=12;function rr(n,t,e,i){return t<=n?1/0:n/t*(e/2)/Math.tan(i*Math.PI/360)}function Yd(n,t,e=$d){const i=n.filter(r=>r.visible&&r.px>=(t.has(r.slug)?qd:Xd)).sort((r,s)=>s.px-r.px||r.slug.localeCompare(s.slug));return new Set(i.slice(0,e).map(r=>r.slug))}function Ha(n){const t=new Float32Array(n.length),e=n.map(r=>r.flagged/Math.max(1,r.notes)),i=n.map((r,s)=>s).filter(r=>n[r].flagged>0).sort((r,s)=>e[r]-e[s]||r-s);return i.forEach((r,s)=>{t[r]=i.length===1?1:.15+.85*(s/(i.length-1))}),t}function Jr(n){return n.note?"note":n.topic?"topic":n.constellation?"constellation":"galaxy"}function Zd(n){return n.note?{constellation:n.constellation,topic:n.topic}:n.topic?{constellation:n.constellation}:{}}function Di(n){return n.note&&n.topic?`#/t/${encodeURIComponent(n.topic)}/n/${encodeURIComponent(n.note)}`:n.topic?`#/t/${encodeURIComponent(n.topic)}`:n.constellation?`#/c/${encodeURIComponent(n.constellation)}`:"#/"}function jd(n,t){const e=n.replace(/^#\/?/,"").split("/").filter(Boolean).map(decodeURIComponent);if(e[0]==="c"&&e[1])return{constellation:e[1]};if(e[0]==="t"&&e[1]){const i={constellation:t(e[1]),topic:e[1]};return e[2]==="n"&&e[3]&&(i.note=e[3]),i}return{}}const sr={constellation:.26,topic:.22},Vo={constellation:.17,topic:.14};function Kd(n,t){const e=t.nearTopic,i=t.nearConstellation,r=Math.min(1,(e?.size??0)/sr.topic)*.9,s=Math.min(1,(i?.size??0)/sr.constellation)*.9;return n.topic&&t.focusTopicSize>=Vo.topic&&(!e||e.slug===n.topic||e.size<sr.topic)?{focus:n,progress:n.note?3:2}:e&&e.size>=sr.topic?{focus:{constellation:e.constellation,topic:e.slug},progress:2}:n.constellation&&!n.topic&&t.focusConstellationSize>=Vo.constellation&&(!i||i.id===n.constellation||i.size<sr.constellation)?{focus:{constellation:n.constellation},progress:1+r}:n.topic&&n.constellation&&t.focusConstellationSize>=Vo.constellation?{focus:{constellation:n.constellation},progress:1+r}:i&&i.size>=sr.constellation?{focus:{constellation:i.id},progress:1+r}:t.multi?{focus:{},progress:s}:{focus:{constellation:t.only},progress:1+r}}/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */const ye={LEFT:1,RIGHT:2,MIDDLE:4},$=Object.freeze({NONE:0,ROTATE:1,TRUCK:2,SCREEN_PAN:4,OFFSET:8,DOLLY:16,ZOOM:32,TOUCH_ROTATE:64,TOUCH_TRUCK:128,TOUCH_SCREEN_PAN:256,TOUCH_OFFSET:512,TOUCH_DOLLY:1024,TOUCH_ZOOM:2048,TOUCH_DOLLY_TRUCK:4096,TOUCH_DOLLY_SCREEN_PAN:8192,TOUCH_DOLLY_OFFSET:16384,TOUCH_DOLLY_ROTATE:32768,TOUCH_ZOOM_TRUCK:65536,TOUCH_ZOOM_OFFSET:131072,TOUCH_ZOOM_SCREEN_PAN:262144,TOUCH_ZOOM_ROTATE:524288}),or={NONE:0,IN:1,OUT:-1};function Li(n){return n.isPerspectiveCamera}function yi(n){return n.isOrthographicCamera}const ar=Math.PI*2,Rc=Math.PI/2,qh=1e-5,Vr=Math.PI/180;function Cn(n,t,e){return Math.max(t,Math.min(e,n))}function pe(n,t=qh){return Math.abs(n)<t}function ie(n,t,e=qh){return pe(n-t,e)}function Pc(n,t){return Math.round(n/t)*t}function Gr(n){return isFinite(n)?n:n<0?-Number.MAX_VALUE:Number.MAX_VALUE}function Wr(n){return Math.abs(n)<Number.MAX_VALUE?n:n*(1/0)}function bs(n,t,e,i,r=1/0,s){i=Math.max(1e-4,i);const o=2/i,a=o*s,l=1/(1+a+.48*a*a+.235*a*a*a);let c=n-t;const h=t,u=r*i;c=Cn(c,-u,u),t=n-c;const d=(e.value+o*c)*s;e.value=(e.value-o*d)*l;let f=t+(c+d)*l;return h-n>0==f>h&&(f=h,e.value=(f-h)/s),f}function Dc(n,t,e,i,r=1/0,s,o){i=Math.max(1e-4,i);const a=2/i,l=a*s,c=1/(1+l+.48*l*l+.235*l*l*l);let h=t.x,u=t.y,d=t.z,f=n.x-h,_=n.y-u,g=n.z-d;const m=h,p=u,v=d,y=r*i,S=y*y,w=f*f+_*_+g*g;if(w>S){const G=Math.sqrt(w);f=f/G*y,_=_/G*y,g=g/G*y}h=n.x-f,u=n.y-_,d=n.z-g;const b=(e.x+a*f)*s,A=(e.y+a*_)*s,L=(e.z+a*g)*s;e.x=(e.x-a*b)*c,e.y=(e.y-a*A)*c,e.z=(e.z-a*L)*c,o.x=h+(f+b)*c,o.y=u+(_+A)*c,o.z=d+(g+L)*c;const E=m-n.x,x=p-n.y,R=v-n.z,D=o.x-m,N=o.y-p,X=o.z-v;return E*D+x*N+R*X>0&&(o.x=m,o.y=p,o.z=v,e.x=(o.x-m)/s,e.y=(o.y-p)/s,e.z=(o.z-v)/s),o}function Go(n,t){t.set(0,0),n.forEach(e=>{t.x+=e.clientX,t.y+=e.clientY}),t.x/=n.length,t.y/=n.length}function Wo(n,t){return yi(n)?(console.warn(`${t} is not supported in OrthographicCamera`),!0):!1}let Qd=class{constructor(){this._listeners={}}addEventListener(t,e){const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}removeAllEventListeners(t){if(!t){this._listeners={};return}Array.isArray(this._listeners[t])&&(this._listeners[t].length=0)}dispatchEvent(t){const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t)}}};var Xo;const Jd="2.10.1",Ts=1/8,tp=/Mac/.test((Xo=globalThis?.navigator)===null||Xo===void 0?void 0:Xo.platform);let Ot,Lc,ws,qo,Ke,Bt,ee,lr,Xr,Fn,kn,Ui,Uc,Ic,mn,qr,cr,Oc,$o,Nc,Yo,Zo,As;class gn extends Qd{static install(t){Ot=t.THREE,Lc=Object.freeze(new Ot.Vector3(0,0,0)),ws=Object.freeze(new Ot.Vector3(0,1,0)),qo=Object.freeze(new Ot.Vector3(0,0,1)),Ke=new Ot.Vector2,Bt=new Ot.Vector3,ee=new Ot.Vector3,lr=new Ot.Vector3,Xr=new Ot.Vector3,Fn=new Ot.Vector3,kn=new Ot.Vector3,Ui=new Ot.Vector3,Uc=new Ot.Vector3,Ic=new Ot.Vector3,mn=new Ot.Spherical,qr=new Ot.Spherical,cr=new Ot.Box3,Oc=new Ot.Box3,$o=new Ot.Sphere,Nc=new Ot.Quaternion,Yo=new Ot.Quaternion,Zo=new Ot.Matrix4,As=new Ot.Raycaster}static get ACTION(){return $}set verticalDragToForward(t){console.warn("camera-controls: `verticalDragToForward` was removed. Use `mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.")}constructor(t,e){super(),this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.minDistance=Number.EPSILON,this.maxDistance=1/0,this.infinityDolly=!1,this.minZoom=.01,this.maxZoom=1/0,this.smoothTime=.25,this.draggingSmoothTime=.125,this.maxSpeed=1/0,this.azimuthRotateSpeed=1,this.polarRotateSpeed=1,this.dollySpeed=1,this.dollyDragInverted=!1,this.truckSpeed=2,this.dollyToCursor=!1,this.dragToOffset=!1,this.boundaryFriction=0,this.restThreshold=.01,this.colliderMeshes=[],this.cancel=()=>{},this._enabled=!0,this._state=$.NONE,this._viewport=null,this._changedDolly=0,this._changedZoom=0,this._hasRested=!0,this._boundaryEnclosesCamera=!1,this._needsUpdate=!0,this._updatedLastTime=!1,this._elementRect=new DOMRect,this._isDragging=!1,this._dragNeedsUpdate=!0,this._activePointers=[],this._lockedPointer=null,this._interactiveArea=new DOMRect(0,0,1,1),this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._isUserControllingOffset=!1,this._isUserControllingZoom=!1,this._lastDollyDirection=or.NONE,this._thetaVelocity={value:0},this._phiVelocity={value:0},this._radiusVelocity={value:0},this._targetVelocity=new Ot.Vector3,this._focalOffsetVelocity=new Ot.Vector3,this._zoomVelocity={value:0},this._truckInternal=(p,v,y,S)=>{let w,b;if(Li(this._camera)){const A=Bt.copy(this._camera.position).sub(this._target),L=this._camera.getEffectiveFOV()*Vr,E=A.length()*Math.tan(L*.5);w=this.truckSpeed*p*E/this._elementRect.height,b=this.truckSpeed*v*E/this._elementRect.height}else if(yi(this._camera)){const A=this._camera;w=this.truckSpeed*p*(A.right-A.left)/A.zoom/this._elementRect.width,b=this.truckSpeed*v*(A.top-A.bottom)/A.zoom/this._elementRect.height}else return;S?(y?this.setFocalOffset(this._focalOffsetEnd.x+w,this._focalOffsetEnd.y,this._focalOffsetEnd.z,!0):this.truck(w,0,!0),this.forward(-b,!0)):y?this.setFocalOffset(this._focalOffsetEnd.x+w,this._focalOffsetEnd.y+b,this._focalOffsetEnd.z,!0):this.truck(w,b,!0)},this._rotateInternal=(p,v)=>{const y=ar*this.azimuthRotateSpeed*p/this._elementRect.height,S=ar*this.polarRotateSpeed*v/this._elementRect.height;this.rotate(y,S,!0)},this._dollyInternal=(p,v,y)=>{const S=Math.pow(.95,-p*this.dollySpeed),w=this._sphericalEnd.radius,b=this._sphericalEnd.radius*S,A=Cn(b,this.minDistance,this.maxDistance),L=A-b;this.infinityDolly&&this.dollyToCursor?this._dollyToNoClamp(b,!0):this.infinityDolly&&!this.dollyToCursor?(this.dollyInFixed(L,!0),this._dollyToNoClamp(A,!0)):this._dollyToNoClamp(A,!0),this.dollyToCursor&&(this._changedDolly+=(this.infinityDolly?b:A)-w,this._dollyControlCoord.set(v,y)),this._lastDollyDirection=Math.sign(-p)},this._zoomInternal=(p,v,y)=>{const S=Math.pow(.95,p*this.dollySpeed),w=this._zoom,b=this._zoom*S;this.zoomTo(b,!0),this.dollyToCursor&&(this._changedZoom+=b-w,this._dollyControlCoord.set(v,y))},typeof Ot>"u"&&console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."),this._camera=t,this._yAxisUpSpace=new Ot.Quaternion().setFromUnitVectors(this._camera.up,ws),this._yAxisUpSpaceInverse=this._yAxisUpSpace.clone().invert(),this._state=$.NONE,this._target=new Ot.Vector3,this._targetEnd=this._target.clone(),this._focalOffset=new Ot.Vector3,this._focalOffsetEnd=this._focalOffset.clone(),this._spherical=new Ot.Spherical().setFromVector3(Bt.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)),this._sphericalEnd=this._spherical.clone(),this._lastDistance=this._spherical.radius,this._zoom=this._camera.zoom,this._zoomEnd=this._zoom,this._lastZoom=this._zoom,this._nearPlaneCorners=[new Ot.Vector3,new Ot.Vector3,new Ot.Vector3,new Ot.Vector3],this._updateNearPlaneCorners(),this._boundary=new Ot.Box3(new Ot.Vector3(-1/0,-1/0,-1/0),new Ot.Vector3(1/0,1/0,1/0)),this._cameraUp0=this._camera.up.clone(),this._target0=this._target.clone(),this._position0=this._camera.position.clone(),this._zoom0=this._zoom,this._focalOffset0=this._focalOffset.clone(),this._dollyControlCoord=new Ot.Vector2,this.mouseButtons={left:$.ROTATE,middle:$.DOLLY,right:$.TRUCK,wheel:Li(this._camera)?$.DOLLY:yi(this._camera)?$.ZOOM:$.NONE},this.touches={one:$.TOUCH_ROTATE,two:Li(this._camera)?$.TOUCH_DOLLY_TRUCK:yi(this._camera)?$.TOUCH_ZOOM_TRUCK:$.NONE,three:$.TOUCH_TRUCK};const i=new Ot.Vector2,r=new Ot.Vector2,s=new Ot.Vector2,o=p=>{if(!this._enabled||!this._domElement)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const S=this._domElement.getBoundingClientRect(),w=p.clientX/S.width,b=p.clientY/S.height;if(w<this._interactiveArea.left||w>this._interactiveArea.right||b<this._interactiveArea.top||b>this._interactiveArea.bottom)return}const v=p.pointerType!=="mouse"?null:(p.buttons&ye.LEFT)===ye.LEFT?ye.LEFT:(p.buttons&ye.MIDDLE)===ye.MIDDLE?ye.MIDDLE:(p.buttons&ye.RIGHT)===ye.RIGHT?ye.RIGHT:null;if(v!==null){const S=this._findPointerByMouseButton(v);S&&this._disposePointer(S)}if((p.buttons&ye.LEFT)===ye.LEFT&&this._lockedPointer)return;const y={pointerId:p.pointerId,clientX:p.clientX,clientY:p.clientY,deltaX:0,deltaY:0,mouseButton:v};this._activePointers.push(y),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),this._isDragging=!0,d(p)},a=p=>{p.cancelable&&p.preventDefault();const v=p.pointerId,y=this._lockedPointer||this._findPointerById(v);if(y){if(y.clientX=p.clientX,y.clientY=p.clientY,y.deltaX=p.movementX,y.deltaY=p.movementY,this._state=0,p.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else(!this._isDragging&&this._lockedPointer||this._isDragging&&(p.buttons&ye.LEFT)===ye.LEFT)&&(this._state=this._state|this.mouseButtons.left),this._isDragging&&(p.buttons&ye.MIDDLE)===ye.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),this._isDragging&&(p.buttons&ye.RIGHT)===ye.RIGHT&&(this._state=this._state|this.mouseButtons.right);f()}},l=p=>{const v=this._findPointerById(p.pointerId);if(!(v&&v===this._lockedPointer)){if(v&&this._disposePointer(v),p.pointerType==="touch")switch(this._activePointers.length){case 0:this._state=$.NONE;break;case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else this._state=$.NONE;_()}};let c=-1;const h=p=>{if(!this._domElement||!this._enabled||this.mouseButtons.wheel===$.NONE)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const b=this._domElement.getBoundingClientRect(),A=p.clientX/b.width,L=p.clientY/b.height;if(A<this._interactiveArea.left||A>this._interactiveArea.right||L<this._interactiveArea.top||L>this._interactiveArea.bottom)return}if(p.preventDefault(),this.dollyToCursor||this.mouseButtons.wheel===$.ROTATE||this.mouseButtons.wheel===$.TRUCK){const b=performance.now();c-b<1e3&&this._getClientRect(this._elementRect),c=b}const v=tp?-1:-3,y=p.deltaMode===1||p.ctrlKey?p.deltaY/v:p.deltaY/(v*10),S=this.dollyToCursor?(p.clientX-this._elementRect.x)/this._elementRect.width*2-1:0,w=this.dollyToCursor?(p.clientY-this._elementRect.y)/this._elementRect.height*-2+1:0;switch(this.mouseButtons.wheel){case $.ROTATE:{this._rotateInternal(p.deltaX,p.deltaY),this._isUserControllingRotate=!0;break}case $.TRUCK:{this._truckInternal(p.deltaX,p.deltaY,!1,!1),this._isUserControllingTruck=!0;break}case $.SCREEN_PAN:{this._truckInternal(p.deltaX,p.deltaY,!1,!0),this._isUserControllingTruck=!0;break}case $.OFFSET:{this._truckInternal(p.deltaX,p.deltaY,!0,!1),this._isUserControllingOffset=!0;break}case $.DOLLY:{this._dollyInternal(-y,S,w),this._isUserControllingDolly=!0;break}case $.ZOOM:{this._zoomInternal(-y,S,w),this._isUserControllingZoom=!0;break}}this.dispatchEvent({type:"control"})},u=p=>{if(!(!this._domElement||!this._enabled)){if(this.mouseButtons.right===gn.ACTION.NONE){const v=p instanceof PointerEvent?p.pointerId:0,y=this._findPointerById(v);y&&this._disposePointer(y),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l);return}p.preventDefault()}},d=p=>{if(!this._enabled)return;if(Go(this._activePointers,Ke),this._getClientRect(this._elementRect),i.copy(Ke),r.copy(Ke),this._activePointers.length>=2){const y=Ke.x-this._activePointers[1].clientX,S=Ke.y-this._activePointers[1].clientY,w=Math.sqrt(y*y+S*S);s.set(0,w);const b=(this._activePointers[0].clientX+this._activePointers[1].clientX)*.5,A=(this._activePointers[0].clientY+this._activePointers[1].clientY)*.5;r.set(b,A)}if(this._state=0,!p)this._lockedPointer&&(this._state=this._state|this.mouseButtons.left);else if("pointerType"in p&&p.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else!this._lockedPointer&&(p.buttons&ye.LEFT)===ye.LEFT&&(this._state=this._state|this.mouseButtons.left),(p.buttons&ye.MIDDLE)===ye.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),(p.buttons&ye.RIGHT)===ye.RIGHT&&(this._state=this._state|this.mouseButtons.right);((this._state&$.ROTATE)===$.ROTATE||(this._state&$.TOUCH_ROTATE)===$.TOUCH_ROTATE||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE)&&(this._sphericalEnd.theta=this._spherical.theta,this._sphericalEnd.phi=this._spherical.phi,this._thetaVelocity.value=0,this._phiVelocity.value=0),((this._state&$.TRUCK)===$.TRUCK||(this._state&$.SCREEN_PAN)===$.SCREEN_PAN||(this._state&$.TOUCH_TRUCK)===$.TOUCH_TRUCK||(this._state&$.TOUCH_SCREEN_PAN)===$.TOUCH_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN)&&(this._targetEnd.copy(this._target),this._targetVelocity.set(0,0,0)),((this._state&$.DOLLY)===$.DOLLY||(this._state&$.TOUCH_DOLLY)===$.TOUCH_DOLLY||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE)&&(this._sphericalEnd.radius=this._spherical.radius,this._radiusVelocity.value=0),((this._state&$.ZOOM)===$.ZOOM||(this._state&$.TOUCH_ZOOM)===$.TOUCH_ZOOM||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_ZOOM_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE)&&(this._zoomEnd=this._zoom,this._zoomVelocity.value=0),((this._state&$.OFFSET)===$.OFFSET||(this._state&$.TOUCH_OFFSET)===$.TOUCH_OFFSET||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET)&&(this._focalOffsetEnd.copy(this._focalOffset),this._focalOffsetVelocity.set(0,0,0)),this.dispatchEvent({type:"controlstart"})},f=()=>{if(!this._enabled||!this._dragNeedsUpdate)return;this._dragNeedsUpdate=!1,Go(this._activePointers,Ke);const v=this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement?this._lockedPointer||this._activePointers[0]:null,y=v?-v.deltaX:r.x-Ke.x,S=v?-v.deltaY:r.y-Ke.y;if(r.copy(Ke),((this._state&$.ROTATE)===$.ROTATE||(this._state&$.TOUCH_ROTATE)===$.TOUCH_ROTATE||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE)&&(this._rotateInternal(y,S),this._isUserControllingRotate=!0),(this._state&$.DOLLY)===$.DOLLY||(this._state&$.ZOOM)===$.ZOOM){const w=this.dollyToCursor?(i.x-this._elementRect.x)/this._elementRect.width*2-1:0,b=this.dollyToCursor?(i.y-this._elementRect.y)/this._elementRect.height*-2+1:0,A=this.dollyDragInverted?-1:1;(this._state&$.DOLLY)===$.DOLLY?(this._dollyInternal(A*S*Ts,w,b),this._isUserControllingDolly=!0):(this._zoomInternal(A*S*Ts,w,b),this._isUserControllingZoom=!0)}if((this._state&$.TOUCH_DOLLY)===$.TOUCH_DOLLY||(this._state&$.TOUCH_ZOOM)===$.TOUCH_ZOOM||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_ZOOM_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE){const w=Ke.x-this._activePointers[1].clientX,b=Ke.y-this._activePointers[1].clientY,A=Math.sqrt(w*w+b*b),L=s.y-A;s.set(0,A);const E=this.dollyToCursor?(r.x-this._elementRect.x)/this._elementRect.width*2-1:0,x=this.dollyToCursor?(r.y-this._elementRect.y)/this._elementRect.height*-2+1:0;(this._state&$.TOUCH_DOLLY)===$.TOUCH_DOLLY||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET?(this._dollyInternal(L*Ts,E,x),this._isUserControllingDolly=!0):(this._zoomInternal(L*Ts,E,x),this._isUserControllingZoom=!0)}((this._state&$.TRUCK)===$.TRUCK||(this._state&$.TOUCH_TRUCK)===$.TOUCH_TRUCK||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK)&&(this._truckInternal(y,S,!1,!1),this._isUserControllingTruck=!0),((this._state&$.SCREEN_PAN)===$.SCREEN_PAN||(this._state&$.TOUCH_SCREEN_PAN)===$.TOUCH_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_ZOOM_SCREEN_PAN)&&(this._truckInternal(y,S,!1,!0),this._isUserControllingTruck=!0),((this._state&$.OFFSET)===$.OFFSET||(this._state&$.TOUCH_OFFSET)===$.TOUCH_OFFSET||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET)&&(this._truckInternal(y,S,!0,!1),this._isUserControllingOffset=!0),this.dispatchEvent({type:"control"})},_=()=>{Go(this._activePointers,Ke),r.copy(Ke),this._dragNeedsUpdate=!1,(this._activePointers.length===0||this._activePointers.length===1&&this._activePointers[0]===this._lockedPointer)&&(this._isDragging=!1),this._activePointers.length===0&&this._domElement&&(this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this.dispatchEvent({type:"controlend"}))};this.lockPointer=()=>{!this._enabled||!this._domElement||(this.cancel(),this._lockedPointer={pointerId:-1,clientX:0,clientY:0,deltaX:0,deltaY:0,mouseButton:null},this._activePointers.push(this._lockedPointer),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.requestPointerLock(),this._domElement.ownerDocument.addEventListener("pointerlockchange",g),this._domElement.ownerDocument.addEventListener("pointerlockerror",m),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),d())},this.unlockPointer=()=>{var p,v,y;this._lockedPointer!==null&&(this._disposePointer(this._lockedPointer),this._lockedPointer=null),(p=this._domElement)===null||p===void 0||p.ownerDocument.exitPointerLock(),(v=this._domElement)===null||v===void 0||v.ownerDocument.removeEventListener("pointerlockchange",g),(y=this._domElement)===null||y===void 0||y.ownerDocument.removeEventListener("pointerlockerror",m),this.cancel()};const g=()=>{this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement||this.unlockPointer()},m=()=>{this.unlockPointer()};this._addAllEventListeners=p=>{this._domElement=p,this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none",this._domElement.addEventListener("pointerdown",o),this._domElement.addEventListener("pointercancel",l),this._domElement.addEventListener("wheel",h,{passive:!1}),this._domElement.addEventListener("contextmenu",u)},this._removeAllEventListeners=()=>{this._domElement&&(this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect="",this._domElement.removeEventListener("pointerdown",o),this._domElement.removeEventListener("pointercancel",l),this._domElement.removeEventListener("wheel",h,{passive:!1}),this._domElement.removeEventListener("contextmenu",u),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.removeEventListener("pointerlockchange",g),this._domElement.ownerDocument.removeEventListener("pointerlockerror",m))},this.cancel=()=>{this._state!==$.NONE&&(this._state=$.NONE,this._activePointers.length=0,_())},e&&this.connect(e),this.update(0)}get camera(){return this._camera}set camera(t){this._camera=t,this.updateCameraUp(),this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0}get enabled(){return this._enabled}set enabled(t){this._enabled=t,this._domElement&&(t?(this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none"):(this.cancel(),this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect=""))}get active(){return!this._hasRested}get currentAction(){return this._state}get distance(){return this._spherical.radius}set distance(t){this._spherical.radius===t&&this._sphericalEnd.radius===t||(this._spherical.radius=t,this._sphericalEnd.radius=t,this._needsUpdate=!0)}get azimuthAngle(){return this._spherical.theta}set azimuthAngle(t){this._spherical.theta===t&&this._sphericalEnd.theta===t||(this._spherical.theta=t,this._sphericalEnd.theta=t,this._needsUpdate=!0)}get polarAngle(){return this._spherical.phi}set polarAngle(t){this._spherical.phi===t&&this._sphericalEnd.phi===t||(this._spherical.phi=t,this._sphericalEnd.phi=t,this._needsUpdate=!0)}get boundaryEnclosesCamera(){return this._boundaryEnclosesCamera}set boundaryEnclosesCamera(t){this._boundaryEnclosesCamera=t,this._needsUpdate=!0}set interactiveArea(t){this._interactiveArea.width=Cn(t.width,0,1),this._interactiveArea.height=Cn(t.height,0,1),this._interactiveArea.x=Cn(t.x,0,1-this._interactiveArea.width),this._interactiveArea.y=Cn(t.y,0,1-this._interactiveArea.height)}addEventListener(t,e){super.addEventListener(t,e)}removeEventListener(t,e){super.removeEventListener(t,e)}rotate(t,e,i=!1){return this.rotateTo(this._sphericalEnd.theta+t,this._sphericalEnd.phi+e,i)}rotateAzimuthTo(t,e=!1){return this.rotateTo(t,this._sphericalEnd.phi,e)}rotatePolarTo(t,e=!1){return this.rotateTo(this._sphericalEnd.theta,t,e)}rotateTo(t,e,i=!1){this._isUserControllingRotate=!1;const r=Cn(t,this.minAzimuthAngle,this.maxAzimuthAngle),s=Cn(e,this.minPolarAngle,this.maxPolarAngle);this._sphericalEnd.theta=r,this._sphericalEnd.phi=s,this._sphericalEnd.makeSafe(),this._needsUpdate=!0,i||(this._spherical.theta=this._sphericalEnd.theta,this._spherical.phi=this._sphericalEnd.phi);const o=!i||ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold);return this._createOnRestPromise(o)}dolly(t,e=!1){return this.dollyTo(this._sphericalEnd.radius-t,e)}dollyTo(t,e=!1){return this._isUserControllingDolly=!1,this._lastDollyDirection=or.NONE,this._changedDolly=0,this._dollyToNoClamp(Cn(t,this.minDistance,this.maxDistance),e)}_dollyToNoClamp(t,e=!1){const i=this._sphericalEnd.radius;if(this.colliderMeshes.length>=1){const o=this._collisionTest(),a=ie(o,this._spherical.radius);if(!(i>t)&&a)return Promise.resolve();this._sphericalEnd.radius=Math.min(t,o)}else this._sphericalEnd.radius=t;this._needsUpdate=!0,e||(this._spherical.radius=this._sphericalEnd.radius);const s=!e||ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(s)}dollyInFixed(t,e=!1){this._targetEnd.add(this._getCameraDirection(Xr).multiplyScalar(t)),e||this._target.copy(this._targetEnd);const i=!e||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(i)}zoom(t,e=!1){return this.zoomTo(this._zoomEnd+t,e)}zoomTo(t,e=!1){this._isUserControllingZoom=!1,this._zoomEnd=Cn(t,this.minZoom,this.maxZoom),this._needsUpdate=!0,e||(this._zoom=this._zoomEnd);const i=!e||ie(this._zoom,this._zoomEnd,this.restThreshold);return this._changedZoom=0,this._createOnRestPromise(i)}pan(t,e,i=!1){return console.warn("`pan` has been renamed to `truck`"),this.truck(t,e,i)}truck(t,e,i=!1){this._camera.updateMatrix(),Fn.setFromMatrixColumn(this._camera.matrix,0),kn.setFromMatrixColumn(this._camera.matrix,1),Fn.multiplyScalar(t),kn.multiplyScalar(-e);const r=Bt.copy(Fn).add(kn),s=ee.copy(this._targetEnd).add(r);return this.moveTo(s.x,s.y,s.z,i)}forward(t,e=!1){Bt.setFromMatrixColumn(this._camera.matrix,0),Bt.crossVectors(this._camera.up,Bt),Bt.multiplyScalar(t);const i=ee.copy(this._targetEnd).add(Bt);return this.moveTo(i.x,i.y,i.z,e)}elevate(t,e=!1){return Bt.copy(this._camera.up).multiplyScalar(t),this.moveTo(this._targetEnd.x+Bt.x,this._targetEnd.y+Bt.y,this._targetEnd.z+Bt.z,e)}moveTo(t,e,i,r=!1){this._isUserControllingTruck=!1;const s=Bt.set(t,e,i).sub(this._targetEnd);this._encloseToBoundary(this._targetEnd,s,this.boundaryFriction),this._needsUpdate=!0,r||this._target.copy(this._targetEnd);const o=!r||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(o)}lookInDirectionOf(t,e,i,r=!1){const a=Bt.set(t,e,i).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);return this.setPosition(a.x,a.y,a.z,r)}fitToBox(t,e,{cover:i=!1,paddingLeft:r=0,paddingRight:s=0,paddingBottom:o=0,paddingTop:a=0}={}){const l=[],c=t.isBox3?cr.copy(t):cr.setFromObject(t);c.isEmpty()&&(console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"),Promise.resolve());const h=Pc(this._sphericalEnd.theta,Rc),u=Pc(this._sphericalEnd.phi,Rc);l.push(this.rotateTo(h,u,e));const d=Bt.setFromSpherical(this._sphericalEnd).normalize(),f=Nc.setFromUnitVectors(d,qo),_=ie(Math.abs(d.y),1);_&&f.multiply(Yo.setFromAxisAngle(ws,h)),f.multiply(this._yAxisUpSpaceInverse);const g=Oc.makeEmpty();ee.copy(c.min).applyQuaternion(f),g.expandByPoint(ee),ee.copy(c.min).setX(c.max.x).applyQuaternion(f),g.expandByPoint(ee),ee.copy(c.min).setY(c.max.y).applyQuaternion(f),g.expandByPoint(ee),ee.copy(c.max).setZ(c.min.z).applyQuaternion(f),g.expandByPoint(ee),ee.copy(c.min).setZ(c.max.z).applyQuaternion(f),g.expandByPoint(ee),ee.copy(c.max).setY(c.min.y).applyQuaternion(f),g.expandByPoint(ee),ee.copy(c.max).setX(c.min.x).applyQuaternion(f),g.expandByPoint(ee),ee.copy(c.max).applyQuaternion(f),g.expandByPoint(ee),g.min.x-=r,g.min.y-=o,g.max.x+=s,g.max.y+=a,f.setFromUnitVectors(qo,d),_&&f.premultiply(Yo.invert()),f.premultiply(this._yAxisUpSpace);const m=g.getSize(Bt),p=g.getCenter(ee).applyQuaternion(f);if(Li(this._camera)){const v=this.getDistanceToFitBox(m.x,m.y,m.z,i);l.push(this.moveTo(p.x,p.y,p.z,e)),l.push(this.dollyTo(v,e)),l.push(this.setFocalOffset(0,0,0,e))}else if(yi(this._camera)){const v=this._camera,y=v.right-v.left,S=v.top-v.bottom,w=i?Math.max(y/m.x,S/m.y):Math.min(y/m.x,S/m.y);l.push(this.moveTo(p.x,p.y,p.z,e)),l.push(this.zoomTo(w,e)),l.push(this.setFocalOffset(0,0,0,e))}return Promise.all(l)}fitToSphere(t,e){const i=[],s="isObject3D"in t?gn.createBoundingSphere(t,$o):$o.copy(t);if(i.push(this.moveTo(s.center.x,s.center.y,s.center.z,e)),Li(this._camera)){const o=this.getDistanceToFitSphere(s.radius);i.push(this.dollyTo(o,e))}else if(yi(this._camera)){const o=this._camera.right-this._camera.left,a=this._camera.top-this._camera.bottom,l=2*s.radius,c=Math.min(o/l,a/l);i.push(this.zoomTo(c,e))}return i.push(this.setFocalOffset(0,0,0,e)),Promise.all(i)}setLookAt(t,e,i,r,s,o,a=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=or.NONE,this._changedDolly=0;const l=ee.set(r,s,o),c=Bt.set(t,e,i);this._targetEnd.copy(l),this._sphericalEnd.setFromVector3(c.sub(l).applyQuaternion(this._yAxisUpSpace)),this.normalizeRotations(),this._needsUpdate=!0,a||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const h=!a||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(h)}lerpLookAt(t,e,i,r,s,o,a,l,c,h,u,d,f,_=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=or.NONE,this._changedDolly=0;const g=Bt.set(r,s,o),m=ee.set(t,e,i);mn.setFromVector3(m.sub(g).applyQuaternion(this._yAxisUpSpace));const p=lr.set(h,u,d),v=ee.set(a,l,c);qr.setFromVector3(v.sub(p).applyQuaternion(this._yAxisUpSpace)),this._targetEnd.copy(g.lerp(p,f));const y=qr.theta-mn.theta,S=qr.phi-mn.phi,w=qr.radius-mn.radius;this._sphericalEnd.set(mn.radius+w*f,mn.phi+S*f,mn.theta+y*f),this.normalizeRotations(),this._needsUpdate=!0,_||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const b=!_||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(b)}setPosition(t,e,i,r=!1){return this.setLookAt(t,e,i,this._targetEnd.x,this._targetEnd.y,this._targetEnd.z,r)}setTarget(t,e,i,r=!1){const s=this.getPosition(Bt),o=this.setLookAt(s.x,s.y,s.z,t,e,i,r);return this._sphericalEnd.phi=Cn(this._sphericalEnd.phi,this.minPolarAngle,this.maxPolarAngle),o}setFocalOffset(t,e,i,r=!1){this._isUserControllingOffset=!1,this._focalOffsetEnd.set(t,e,i),this._needsUpdate=!0,r||this._focalOffset.copy(this._focalOffsetEnd);const s=!r||ie(this._focalOffset.x,this._focalOffsetEnd.x,this.restThreshold)&&ie(this._focalOffset.y,this._focalOffsetEnd.y,this.restThreshold)&&ie(this._focalOffset.z,this._focalOffsetEnd.z,this.restThreshold);return this._createOnRestPromise(s)}setOrbitPoint(t,e,i){this._camera.updateMatrixWorld(),Fn.setFromMatrixColumn(this._camera.matrixWorldInverse,0),kn.setFromMatrixColumn(this._camera.matrixWorldInverse,1),Ui.setFromMatrixColumn(this._camera.matrixWorldInverse,2);const r=Bt.set(t,e,i),s=r.distanceTo(this._camera.position),o=r.sub(this._camera.position);Fn.multiplyScalar(o.x),kn.multiplyScalar(o.y),Ui.multiplyScalar(o.z),Bt.copy(Fn).add(kn).add(Ui),Bt.z=Bt.z+s,this.dollyTo(s,!1),this.setFocalOffset(-Bt.x,Bt.y,-Bt.z,!1),this.moveTo(t,e,i,!1)}setBoundary(t){if(!t){this._boundary.min.set(-1/0,-1/0,-1/0),this._boundary.max.set(1/0,1/0,1/0),this._needsUpdate=!0;return}this._boundary.copy(t),this._boundary.clampPoint(this._targetEnd,this._targetEnd),this._needsUpdate=!0}setViewport(t,e,i,r){if(t===null){this._viewport=null;return}this._viewport=this._viewport||new Ot.Vector4,typeof t=="number"?this._viewport.set(t,e,i,r):this._viewport.copy(t)}getDistanceToFitBox(t,e,i,r=!1){if(Wo(this._camera,"getDistanceToFitBox"))return this._spherical.radius;const s=t/e,o=this._camera.getEffectiveFOV()*Vr,a=this._camera.aspect;return((r?s>a:s<a)?e:t/a)*.5/Math.tan(o*.5)+i*.5}getDistanceToFitSphere(t){if(Wo(this._camera,"getDistanceToFitSphere"))return this._spherical.radius;const e=this._camera.getEffectiveFOV()*Vr,i=Math.atan(Math.tan(e*.5)*this._camera.aspect)*2,r=1<this._camera.aspect?e:i;return t/Math.sin(r*.5)}getTarget(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._targetEnd:this._target)}getPosition(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).setFromSpherical(e?this._sphericalEnd:this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(e?this._targetEnd:this._target)}getSpherical(t,e=!0){return(t||new Ot.Spherical).copy(e?this._sphericalEnd:this._spherical)}getFocalOffset(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._focalOffsetEnd:this._focalOffset)}normalizeRotations(){this._sphericalEnd.theta=this._sphericalEnd.theta%ar,this._sphericalEnd.theta<0&&(this._sphericalEnd.theta+=ar),this._spherical.theta+=ar*Math.round((this._sphericalEnd.theta-this._spherical.theta)/ar)}stop(){this._focalOffset.copy(this._focalOffsetEnd),this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd),this._zoom=this._zoomEnd}reset(t=!1){if(!ie(this._camera.up.x,this._cameraUp0.x)||!ie(this._camera.up.y,this._cameraUp0.y)||!ie(this._camera.up.z,this._cameraUp0.z)){this._camera.up.copy(this._cameraUp0);const i=this.getPosition(Bt);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}const e=[this.setLookAt(this._position0.x,this._position0.y,this._position0.z,this._target0.x,this._target0.y,this._target0.z,t),this.setFocalOffset(this._focalOffset0.x,this._focalOffset0.y,this._focalOffset0.z,t),this.zoomTo(this._zoom0,t)];return Promise.all(e)}saveState(){this._cameraUp0.copy(this._camera.up),this.getTarget(this._target0),this.getPosition(this._position0),this._zoom0=this._zoom,this._focalOffset0.copy(this._focalOffset)}updateCameraUp(){this._yAxisUpSpace.setFromUnitVectors(this._camera.up,ws),this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert()}applyCameraUp(){const t=Bt.subVectors(this._target,this._camera.position).normalize(),e=ee.crossVectors(t,this._camera.up);this._camera.up.crossVectors(e,t).normalize(),this._camera.updateMatrixWorld();const i=this.getPosition(Bt);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}update(t){const e=this._sphericalEnd.theta-this._spherical.theta,i=this._sphericalEnd.phi-this._spherical.phi,r=this._sphericalEnd.radius-this._spherical.radius,s=Uc.subVectors(this._targetEnd,this._target),o=Ic.subVectors(this._focalOffsetEnd,this._focalOffset),a=this._zoomEnd-this._zoom;if(pe(e))this._thetaVelocity.value=0,this._spherical.theta=this._sphericalEnd.theta;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.theta=bs(this._spherical.theta,this._sphericalEnd.theta,this._thetaVelocity,u,1/0,t),this._needsUpdate=!0}if(pe(i))this._phiVelocity.value=0,this._spherical.phi=this._sphericalEnd.phi;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.phi=bs(this._spherical.phi,this._sphericalEnd.phi,this._phiVelocity,u,1/0,t),this._needsUpdate=!0}if(pe(r))this._radiusVelocity.value=0,this._spherical.radius=this._sphericalEnd.radius;else{const u=this._isUserControllingDolly?this.draggingSmoothTime:this.smoothTime;this._spherical.radius=bs(this._spherical.radius,this._sphericalEnd.radius,this._radiusVelocity,u,this.maxSpeed,t),this._needsUpdate=!0}if(pe(s.x)&&pe(s.y)&&pe(s.z))this._targetVelocity.set(0,0,0),this._target.copy(this._targetEnd);else{const u=this._isUserControllingTruck?this.draggingSmoothTime:this.smoothTime;Dc(this._target,this._targetEnd,this._targetVelocity,u,this.maxSpeed,t,this._target),this._needsUpdate=!0}if(pe(o.x)&&pe(o.y)&&pe(o.z))this._focalOffsetVelocity.set(0,0,0),this._focalOffset.copy(this._focalOffsetEnd);else{const u=this._isUserControllingOffset?this.draggingSmoothTime:this.smoothTime;Dc(this._focalOffset,this._focalOffsetEnd,this._focalOffsetVelocity,u,this.maxSpeed,t,this._focalOffset),this._needsUpdate=!0}if(pe(a))this._zoomVelocity.value=0,this._zoom=this._zoomEnd;else{const u=this._isUserControllingZoom?this.draggingSmoothTime:this.smoothTime;this._zoom=bs(this._zoom,this._zoomEnd,this._zoomVelocity,u,1/0,t)}if(this.dollyToCursor){if(Li(this._camera)&&this._changedDolly!==0){const u=this._spherical.radius-this._lastDistance,d=this._camera,f=this._getCameraDirection(Xr),_=Bt.copy(f).cross(d.up).normalize();_.lengthSq()===0&&(_.x=1);const g=ee.crossVectors(_,f),m=this._sphericalEnd.radius*Math.tan(d.getEffectiveFOV()*Vr*.5),v=(this._sphericalEnd.radius-u-this._sphericalEnd.radius)/this._sphericalEnd.radius,y=lr.copy(this._targetEnd).add(_.multiplyScalar(this._dollyControlCoord.x*m*d.aspect)).add(g.multiplyScalar(this._dollyControlCoord.y*m)),S=Bt.copy(this._targetEnd).lerp(y,v),w=this._lastDollyDirection===or.IN&&this._spherical.radius<=this.minDistance,b=this._lastDollyDirection===or.OUT&&this.maxDistance<=this._spherical.radius;if(this.infinityDolly&&(w||b)){this._sphericalEnd.radius-=u,this._spherical.radius-=u;const L=ee.copy(f).multiplyScalar(-u);S.add(L)}this._boundary.clampPoint(S,S);const A=ee.subVectors(S,this._targetEnd);this._targetEnd.copy(S),this._target.add(A),this._changedDolly-=u,pe(this._changedDolly)&&(this._changedDolly=0)}else if(yi(this._camera)&&this._changedZoom!==0){const u=this._zoom-this._lastZoom,d=this._camera,f=Bt.set(this._dollyControlCoord.x,this._dollyControlCoord.y,(d.near+d.far)/(d.near-d.far)).unproject(d),_=ee.set(0,0,-1).applyQuaternion(d.quaternion),g=lr.copy(f).add(_.multiplyScalar(-f.dot(d.up))),p=-(this._zoom-u-this._zoom)/this._zoom,v=this._getCameraDirection(Xr),y=this._targetEnd.dot(v),S=Bt.copy(this._targetEnd).lerp(g,p),w=S.dot(v),b=v.multiplyScalar(w-y);S.sub(b),this._boundary.clampPoint(S,S);const A=ee.subVectors(S,this._targetEnd);this._targetEnd.copy(S),this._target.add(A),this._changedZoom-=u,pe(this._changedZoom)&&(this._changedZoom=0)}}this._camera.zoom!==this._zoom&&(this._camera.zoom=this._zoom,this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0),this._dragNeedsUpdate=!0;const l=this._collisionTest();this._spherical.radius=Math.min(this._spherical.radius,l),this._spherical.makeSafe(),this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target),this._camera.lookAt(this._target),(!pe(this._focalOffset.x)||!pe(this._focalOffset.y)||!pe(this._focalOffset.z))&&(Fn.setFromMatrixColumn(this._camera.matrix,0),kn.setFromMatrixColumn(this._camera.matrix,1),Ui.setFromMatrixColumn(this._camera.matrix,2),Fn.multiplyScalar(this._focalOffset.x),kn.multiplyScalar(-this._focalOffset.y),Ui.multiplyScalar(this._focalOffset.z),Bt.copy(Fn).add(kn).add(Ui),this._camera.position.add(Bt),this._camera.updateMatrixWorld()),this._boundaryEnclosesCamera&&this._encloseToBoundary(this._camera.position.copy(this._target),Bt.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse),1);const h=this._needsUpdate;return h&&!this._updatedLastTime?(this._hasRested=!1,this.dispatchEvent({type:"wake"}),this.dispatchEvent({type:"update"})):h?(this.dispatchEvent({type:"update"}),pe(e,this.restThreshold)&&pe(i,this.restThreshold)&&pe(r,this.restThreshold)&&pe(s.x,this.restThreshold)&&pe(s.y,this.restThreshold)&&pe(s.z,this.restThreshold)&&pe(o.x,this.restThreshold)&&pe(o.y,this.restThreshold)&&pe(o.z,this.restThreshold)&&pe(a,this.restThreshold)&&!this._hasRested&&(this._hasRested=!0,this.dispatchEvent({type:"rest"}))):!h&&this._updatedLastTime&&this.dispatchEvent({type:"sleep"}),this._lastDistance=this._spherical.radius,this._lastZoom=this._zoom,this._updatedLastTime=h,this._needsUpdate=!1,h}toJSON(){return JSON.stringify({enabled:this._enabled,minDistance:this.minDistance,maxDistance:Gr(this.maxDistance),minZoom:this.minZoom,maxZoom:Gr(this.maxZoom),minPolarAngle:this.minPolarAngle,maxPolarAngle:Gr(this.maxPolarAngle),minAzimuthAngle:Gr(this.minAzimuthAngle),maxAzimuthAngle:Gr(this.maxAzimuthAngle),smoothTime:this.smoothTime,draggingSmoothTime:this.draggingSmoothTime,dollySpeed:this.dollySpeed,truckSpeed:this.truckSpeed,dollyToCursor:this.dollyToCursor,target:this._targetEnd.toArray(),position:Bt.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),zoom:this._zoomEnd,focalOffset:this._focalOffsetEnd.toArray(),target0:this._target0.toArray(),position0:this._position0.toArray(),zoom0:this._zoom0,focalOffset0:this._focalOffset0.toArray()})}fromJSON(t,e=!1){const i=JSON.parse(t);this.enabled=i.enabled,this.minDistance=i.minDistance,this.maxDistance=Wr(i.maxDistance),this.minZoom=i.minZoom,this.maxZoom=Wr(i.maxZoom),this.minPolarAngle=i.minPolarAngle,this.maxPolarAngle=Wr(i.maxPolarAngle),this.minAzimuthAngle=Wr(i.minAzimuthAngle),this.maxAzimuthAngle=Wr(i.maxAzimuthAngle),this.smoothTime=i.smoothTime,this.draggingSmoothTime=i.draggingSmoothTime,this.dollySpeed=i.dollySpeed,this.truckSpeed=i.truckSpeed,this.dollyToCursor=i.dollyToCursor,this._target0.fromArray(i.target0),this._position0.fromArray(i.position0),this._zoom0=i.zoom0,this._focalOffset0.fromArray(i.focalOffset0),this.moveTo(i.target[0],i.target[1],i.target[2],e),mn.setFromVector3(Bt.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)),this.rotateTo(mn.theta,mn.phi,e),this.dollyTo(mn.radius,e),this.zoomTo(i.zoom,e),this.setFocalOffset(i.focalOffset[0],i.focalOffset[1],i.focalOffset[2],e),this._needsUpdate=!0}connect(t){if(this._domElement){console.warn("camera-controls is already connected.");return}t.setAttribute("data-camera-controls-version",Jd),this._addAllEventListeners(t),this._getClientRect(this._elementRect)}disconnect(){this.cancel(),this._removeAllEventListeners(),this._domElement&&(this._domElement.removeAttribute("data-camera-controls-version"),this._domElement=void 0)}dispose(){this.removeAllEventListeners(),this.disconnect()}_getTargetDirection(t){return t.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse)}_getCameraDirection(t){return this._getTargetDirection(t).negate()}_findPointerById(t){return this._activePointers.find(e=>e.pointerId===t)}_findPointerByMouseButton(t){return this._activePointers.find(e=>e.mouseButton===t)}_disposePointer(t){this._activePointers.splice(this._activePointers.indexOf(t),1)}_encloseToBoundary(t,e,i){const r=e.lengthSq();if(r===0)return t;const s=ee.copy(e).add(t),a=this._boundary.clampPoint(s,lr).sub(s),l=a.lengthSq();if(l===0)return t.add(e);if(l===r)return t;if(i===0)return t.add(e).add(a);{const c=1+i*l/e.dot(a);return t.add(ee.copy(e).multiplyScalar(c)).add(a.multiplyScalar(1-i))}}_updateNearPlaneCorners(){if(Li(this._camera)){const t=this._camera,e=t.near,i=t.getEffectiveFOV()*Vr,r=Math.tan(i*.5)*e,s=r*t.aspect;this._nearPlaneCorners[0].set(-s,-r,0),this._nearPlaneCorners[1].set(s,-r,0),this._nearPlaneCorners[2].set(s,r,0),this._nearPlaneCorners[3].set(-s,r,0)}else if(yi(this._camera)){const t=this._camera,e=1/t.zoom,i=t.left*e,r=t.right*e,s=t.top*e,o=t.bottom*e;this._nearPlaneCorners[0].set(i,s,0),this._nearPlaneCorners[1].set(r,s,0),this._nearPlaneCorners[2].set(r,o,0),this._nearPlaneCorners[3].set(i,o,0)}}_collisionTest(){let t=1/0;if(!(this.colliderMeshes.length>=1)||Wo(this._camera,"_collisionTest"))return t;const i=this._getTargetDirection(Xr);Zo.lookAt(Lc,i,this._camera.up);for(let r=0;r<4;r++){const s=ee.copy(this._nearPlaneCorners[r]);s.applyMatrix4(Zo);const o=lr.addVectors(this._target,s);As.set(o,i),As.far=this._spherical.radius+1;const a=As.intersectObjects(this.colliderMeshes);a.length!==0&&a[0].distance<t&&(t=a[0].distance)}return t}_getClientRect(t){if(!this._domElement)return;const e=this._domElement.getBoundingClientRect();return t.x=e.left,t.y=e.top,this._viewport?(t.x+=this._viewport.x,t.y+=e.height-this._viewport.w-this._viewport.y,t.width=this._viewport.z,t.height=this._viewport.w):(t.width=e.width,t.height=e.height),t}_createOnRestPromise(t){return t?Promise.resolve():(this._hasRested=!1,this.dispatchEvent({type:"transitionstart"}),new Promise(e=>{const i=()=>{this.removeEventListener("rest",i),e()};this.addEventListener("rest",i)}))}_addAllEventListeners(t){}_removeAllEventListeners(){}get dampingFactor(){return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."),0}set dampingFactor(t){console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.")}get draggingDampingFactor(){return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."),0}set draggingDampingFactor(t){console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.")}static createBoundingSphere(t,e=new Ot.Sphere){const i=e,r=i.center;cr.makeEmpty(),t.traverseVisible(o=>{o.isMesh&&cr.expandByObject(o)}),cr.getCenter(r);let s=0;return t.traverseVisible(o=>{if(!o.isMesh)return;const a=o;if(!a.geometry)return;const l=a.geometry.clone();l.applyMatrix4(a.matrixWorld);const h=l.attributes.position;for(let u=0,d=h.count;u<d;u++)Bt.fromBufferAttribute(h,u),s=Math.max(s,r.distanceToSquared(Bt))}),i.radius=Math.sqrt(s),i}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ql="177",ep=0,Fc=1,np=2,$h=1,ip=2,Jn=3,wi=0,rn=1,ei=2,ri=0,wr=1,yo=2,kc=3,zc=4,Yh=5,Si=100,rp=101,sp=102,op=103,ap=104,lp=200,Va=201,cp=202,up=203,Ga=204,Wa=205,hp=206,fp=207,dp=208,pp=209,mp=210,_p=211,gp=212,vp=213,xp=214,Xa=0,qa=1,$a=2,Pr=3,Ya=4,Za=5,ja=6,Ka=7,Zh=0,yp=1,Sp=2,Ti=0,jh=1,Kh=2,Qh=3,$l=4,Jh=5,tf=6,ef=7,nf=300,Dr=301,Lr=302,Qa=303,Ja=304,Do=306,tl=1e3,Xi=1001,el=1002,$e=1003,Mp=1004,Cs=1005,Vn=1006,jo=1007,qi=1008,ci=1009,rf=1010,sf=1011,ls=1012,Yl=1013,ji=1014,Ln=1015,si=1016,Zl=1017,jl=1018,cs=1020,of=35902,af=1021,lf=1022,un=1023,us=1026,hs=1027,cf=1028,Kl=1029,uf=1030,Ql=1031,Jl=1033,ao=33776,lo=33777,co=33778,uo=33779,nl=35840,il=35841,rl=35842,sl=35843,ol=36196,al=37492,ll=37496,cl=37808,ul=37809,hl=37810,fl=37811,dl=37812,pl=37813,ml=37814,_l=37815,gl=37816,vl=37817,xl=37818,yl=37819,Sl=37820,Ml=37821,ho=36492,El=36494,bl=36495,hf=36283,Tl=36284,wl=36285,Al=36286,Ep=3200,bp=3201,Tp=0,wp=1,Mi="",vn="srgb",Ur="srgb-linear",So="linear",ae="srgb",ur=7680,Bc=519,Ap=512,Cp=513,Rp=514,ff=515,Pp=516,Dp=517,Lp=518,Up=519,Cl=35044,Ip=35048,Hc="300 es",ii=2e3,Mo=2001;class Fr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vc=1234567;const is=Math.PI/180,fs=180/Math.PI;function oi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]).toLowerCase()}function Vt(n,t,e){return Math.max(t,Math.min(e,n))}function tc(n,t){return(n%t+t)%t}function Op(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Np(n,t,e){return n!==t?(e-n)/(t-n):0}function rs(n,t,e){return(1-e)*n+e*t}function Fp(n,t,e,i){return rs(n,t,1-Math.exp(-e*i))}function kp(n,t=1){return t-Math.abs(tc(n,t*2)-t)}function zp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Bp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Hp(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Vp(n,t){return n+Math.random()*(t-n)}function Gp(n){return n*(.5-Math.random())}function Wp(n){n!==void 0&&(Vc=n);let t=Vc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xp(n){return n*is}function qp(n){return n*fs}function $p(n){return(n&n-1)===0&&n!==0}function Yp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zp(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function jp(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),h=o((t+i)/2),u=s((t-i)/2),d=o((t-i)/2),f=s((i-t)/2),_=o((i-t)/2);switch(r){case"XYX":n.set(a*h,l*u,l*d,a*c);break;case"YZY":n.set(l*d,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*d,a*h,a*c);break;case"XZX":n.set(a*h,l*_,l*f,a*c);break;case"YXY":n.set(l*f,a*h,l*_,a*c);break;case"ZYZ":n.set(l*_,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Pn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function le(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Kp={DEG2RAD:is,RAD2DEG:fs,generateUUID:oi,clamp:Vt,euclideanModulo:tc,mapLinear:Op,inverseLerp:Np,lerp:rs,damp:Fp,pingpong:kp,smoothstep:zp,smootherstep:Bp,randInt:Hp,randFloat:Vp,randFloatSpread:Gp,seededRandom:Wp,degToRad:Xp,radToDeg:qp,isPowerOfTwo:$p,ceilPowerOfTwo:Yp,floorPowerOfTwo:Zp,setQuaternionFromProperEuler:jp,normalize:le,denormalize:Pn};class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Vt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const d=s[o+0],f=s[o+1],_=s[o+2],g=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=_,t[e+3]=g;return}if(u!==g||l!==d||c!==f||h!==_){let m=1-a;const p=l*d+c*f+h*_+u*g,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const w=Math.sqrt(y),b=Math.atan2(w,p*v);m=Math.sin(m*b)/w,a=Math.sin(a*b)/w}const S=a*v;if(l=l*m+d*S,c=c*m+f*S,h=h*m+_*S,u=u*m+g*S,m===1-a){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],d=s[o+1],f=s[o+2],_=s[o+3];return t[e]=a*_+h*u+l*f-c*d,t[e+1]=l*_+h*d+c*u-a*f,t[e+2]=c*_+h*f+a*d-l*u,t[e+3]=h*_-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),d=l(i/2),f=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"YXZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"ZXY":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"ZYX":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"YZX":this._x=d*h*u+c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u-d*f*_;break;case"XZY":this._x=d*h*u-c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>u){const f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-i-u);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,i=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),h=2*(a*e-s*r),u=2*(s*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ko.copy(this).projectOnVector(t),this.sub(Ko)}reflect(t){return this.sub(Ko.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Vt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ko=new k,Gc=new kr;class Ht{constructor(t,e,i,r,s,o,a,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],_=i[8],g=r[0],m=r[3],p=r[6],v=r[1],y=r[4],S=r[7],w=r[2],b=r[5],A=r[8];return s[0]=o*g+a*v+l*w,s[3]=o*m+a*y+l*b,s[6]=o*p+a*S+l*A,s[1]=c*g+h*v+u*w,s[4]=c*m+h*y+u*b,s[7]=c*p+h*S+u*A,s[2]=d*g+f*v+_*w,s[5]=d*m+f*y+_*b,s[8]=d*p+f*S+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,_=e*u+i*d+r*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(r*c-h*i)*g,t[2]=(a*i-r*o)*g,t[3]=d*g,t[4]=(h*e-r*l)*g,t[5]=(r*s-a*e)*g,t[6]=f*g,t[7]=(i*l-c*e)*g,t[8]=(o*e-i*s)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Qo.makeScale(t,e)),this}rotate(t){return this.premultiply(Qo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Qo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Qo=new Ht;function df(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Eo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qp(){const n=Eo("canvas");return n.style.display="block",n}const Wc={};function Ar(n){n in Wc||(Wc[n]=!0,console.warn(n))}function Jp(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function tm(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function em(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Xc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nm(){const n={enabled:!0,workingColorSpace:Ur,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ae&&(r.r=ai(r.r),r.g=ai(r.g),r.b=ai(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ae&&(r.r=Cr(r.r),r.g=Cr(r.g),r.b=Cr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Mi?So:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ar("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ar("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ur]:{primaries:t,whitePoint:i,transfer:So,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:vn},outputColorSpaceConfig:{drawingBufferColorSpace:vn}},[vn]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:vn}}}),n}const Jt=nm();function ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Cr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let hr;class im{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{hr===void 0&&(hr=Eo("canvas")),hr.width=t.width,hr.height=t.height;const r=hr.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=hr}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Eo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ai(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ai(e[i]/255)*255):e[i]=ai(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rm=0;class ec{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=oi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Jo(r[o].image)):s.push(Jo(r[o]))}else s=Jo(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Jo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?im.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sm=0;const ta=new k;class Ye extends Fr{constructor(t=Ye.DEFAULT_IMAGE,e=Ye.DEFAULT_MAPPING,i=Xi,r=Xi,s=Vn,o=qi,a=un,l=ci,c=Ye.DEFAULT_ANISOTROPY,h=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=oi(),this.name="",this.source=new ec(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ta).x}get height(){return this.source.getSize(ta).y}get depth(){return this.source.getSize(ta).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case tl:t.x=t.x-Math.floor(t.x);break;case Xi:t.x=t.x<0?0:1;break;case el:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case tl:t.y=t.y-Math.floor(t.y);break;case Xi:t.y=t.y<0?0:1;break;case el:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=nf;Ye.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,i=0,r=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,S=(f+1)/2,w=(p+1)/2,b=(h+d)/4,A=(u+g)/4,L=(_+m)/4;return y>S&&y>w?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=b/i,s=A/i):S>w?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=b/r,s=L/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=L/s),this.set(i,r,s,e),this}let v=Math.sqrt((m-_)*(m-_)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(u-g)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class om extends Fr{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new Ye(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Vn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new ec(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class On extends om{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class pf extends Ye{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class am extends Ye{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hi{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Tn):Tn.fromBufferAttribute(s,o),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Rs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Rs.copy(i.boundingBox)),Rs.applyMatrix4(t.matrixWorld),this.union(Rs)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($r),Ps.subVectors(this.max,$r),fr.subVectors(t.a,$r),dr.subVectors(t.b,$r),pr.subVectors(t.c,$r),di.subVectors(dr,fr),pi.subVectors(pr,dr),Ii.subVectors(fr,pr);let e=[0,-di.z,di.y,0,-pi.z,pi.y,0,-Ii.z,Ii.y,di.z,0,-di.x,pi.z,0,-pi.x,Ii.z,0,-Ii.x,-di.y,di.x,0,-pi.y,pi.x,0,-Ii.y,Ii.x,0];return!ea(e,fr,dr,pr,Ps)||(e=[1,0,0,0,1,0,0,0,1],!ea(e,fr,dr,pr,Ps))?!1:(Ds.crossVectors(di,pi),e=[Ds.x,Ds.y,Ds.z],ea(e,fr,dr,pr,Ps))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const qn=[new k,new k,new k,new k,new k,new k,new k,new k],Tn=new k,Rs=new hi,fr=new k,dr=new k,pr=new k,di=new k,pi=new k,Ii=new k,$r=new k,Ps=new k,Ds=new k,Oi=new k;function ea(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Oi.fromArray(n,s);const a=r.x*Math.abs(Oi.x)+r.y*Math.abs(Oi.y)+r.z*Math.abs(Oi.z),l=t.dot(Oi),c=e.dot(Oi),h=i.dot(Oi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const lm=new hi,Yr=new k,na=new k;class Ai{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):lm.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yr.subVectors(t,this.center);const e=Yr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Yr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(na.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yr.copy(t.center).add(na)),this.expandByPoint(Yr.copy(t.center).sub(na))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const $n=new k,ia=new k,Ls=new k,mi=new k,ra=new k,Us=new k,sa=new k;class nc{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,$n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=$n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):($n.copy(this.origin).addScaledVector(this.direction,e),$n.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){ia.copy(t).add(e).multiplyScalar(.5),Ls.copy(e).sub(t).normalize(),mi.copy(this.origin).sub(ia);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Ls),a=mi.dot(this.direction),l=-mi.dot(Ls),c=mi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,_;if(h>0)if(u=o*l-a,d=o*a-l,_=s*h,u>=0)if(d>=-_)if(d<=_){const g=1/h;u*=g,d*=g,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ia).addScaledVector(Ls,d),f}intersectSphere(t,e){$n.subVectors(t.center,this.origin);const i=$n.dot(this.direction),r=$n.dot($n)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,$n)!==null}intersectTriangle(t,e,i,r,s){ra.subVectors(e,t),Us.subVectors(i,t),sa.crossVectors(ra,Us);let o=this.direction.dot(sa),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,t);const l=a*this.direction.dot(Us.crossVectors(mi,Us));if(l<0)return null;const c=a*this.direction.dot(ra.cross(mi));if(c<0||l+c>o)return null;const h=-a*mi.dot(sa);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,e,i,r,s,o,a,l,c,h,u,d,f,_,g,m){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,h,u,d,f,_,g,m)}set(t,e,i,r,s,o,a,l,c,h,u,d,f,_,g,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/mr.setFromMatrixColumn(t,0).length(),s=1/mr.setFromMatrixColumn(t,1).length(),o=1/mr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,f=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+_*c,e[5]=d-g*c,e[9]=-a*l,e[2]=g-d*c,e[6]=_+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,_=c*h,g=c*u;e[0]=d+g*a,e[4]=_*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-_,e[6]=g+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,_=c*h,g=c*u;e[0]=d-g*a,e[4]=-o*u,e[8]=_+f*a,e[1]=f+_*a,e[5]=o*h,e[9]=g-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=_*c-f,e[8]=d*c+g,e[1]=l*u,e[5]=g*c+d,e[9]=f*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=g-d*u,e[8]=_*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+_,e[10]=d-g*u}else if(t.order==="XZY"){const d=o*l,f=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+g,e[5]=o*h,e[9]=f*u-_,e[2]=_*u-f,e[6]=a*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cm,t,um)}lookAt(t,e,i){const r=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),_i.crossVectors(i,ln),_i.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),_i.crossVectors(i,ln)),_i.normalize(),Is.crossVectors(ln,_i),r[0]=_i.x,r[4]=Is.x,r[8]=ln.x,r[1]=_i.y,r[5]=Is.y,r[9]=ln.y,r[2]=_i.z,r[6]=Is.z,r[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],_=i[2],g=i[6],m=i[10],p=i[14],v=i[3],y=i[7],S=i[11],w=i[15],b=r[0],A=r[4],L=r[8],E=r[12],x=r[1],R=r[5],D=r[9],N=r[13],X=r[2],G=r[6],Y=r[10],Q=r[14],Z=r[3],at=r[7],P=r[11],gt=r[15];return s[0]=o*b+a*x+l*X+c*Z,s[4]=o*A+a*R+l*G+c*at,s[8]=o*L+a*D+l*Y+c*P,s[12]=o*E+a*N+l*Q+c*gt,s[1]=h*b+u*x+d*X+f*Z,s[5]=h*A+u*R+d*G+f*at,s[9]=h*L+u*D+d*Y+f*P,s[13]=h*E+u*N+d*Q+f*gt,s[2]=_*b+g*x+m*X+p*Z,s[6]=_*A+g*R+m*G+p*at,s[10]=_*L+g*D+m*Y+p*P,s[14]=_*E+g*N+m*Q+p*gt,s[3]=v*b+y*x+S*X+w*Z,s[7]=v*A+y*R+S*G+w*at,s[11]=v*L+y*D+S*Y+w*P,s[15]=v*E+y*N+S*Q+w*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],_=t[3],g=t[7],m=t[11],p=t[15];return _*(+s*l*u-r*c*u-s*a*d+i*c*d+r*a*f-i*l*f)+g*(+e*l*f-e*c*d+s*o*d-r*o*f+r*c*h-s*l*h)+m*(+e*c*u-e*a*f-s*o*u+i*o*f+s*a*h-i*c*h)+p*(-r*a*h-e*l*u+e*a*d+r*o*u-i*o*d+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],_=t[12],g=t[13],m=t[14],p=t[15],v=u*m*c-g*d*c+g*l*f-a*m*f-u*l*p+a*d*p,y=_*d*c-h*m*c-_*l*f+o*m*f+h*l*p-o*d*p,S=h*g*c-_*u*c+_*a*f-o*g*f-h*a*p+o*u*p,w=_*u*l-h*g*l-_*a*d+o*g*d+h*a*m-o*u*m,b=e*v+i*y+r*S+s*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return t[0]=v*A,t[1]=(g*d*s-u*m*s-g*r*f+i*m*f+u*r*p-i*d*p)*A,t[2]=(a*m*s-g*l*s+g*r*c-i*m*c-a*r*p+i*l*p)*A,t[3]=(u*l*s-a*d*s-u*r*c+i*d*c+a*r*f-i*l*f)*A,t[4]=y*A,t[5]=(h*m*s-_*d*s+_*r*f-e*m*f-h*r*p+e*d*p)*A,t[6]=(_*l*s-o*m*s-_*r*c+e*m*c+o*r*p-e*l*p)*A,t[7]=(o*d*s-h*l*s+h*r*c-e*d*c-o*r*f+e*l*f)*A,t[8]=S*A,t[9]=(_*u*s-h*g*s-_*i*f+e*g*f+h*i*p-e*u*p)*A,t[10]=(o*g*s-_*a*s+_*i*c-e*g*c-o*i*p+e*a*p)*A,t[11]=(h*a*s-o*u*s-h*i*c+e*u*c+o*i*f-e*a*f)*A,t[12]=w*A,t[13]=(h*g*r-_*u*r+_*i*d-e*g*d-h*i*m+e*u*m)*A,t[14]=(_*a*r-o*g*r-_*i*l+e*g*l+o*i*m-e*a*m)*A,t[15]=(o*u*r-h*a*r+h*i*l-e*u*l-o*i*d+e*a*d)*A,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,_=s*u,g=o*h,m=o*u,p=a*u,v=l*c,y=l*h,S=l*u,w=i.x,b=i.y,A=i.z;return r[0]=(1-(g+p))*w,r[1]=(f+S)*w,r[2]=(_-y)*w,r[3]=0,r[4]=(f-S)*b,r[5]=(1-(d+p))*b,r[6]=(m+v)*b,r[7]=0,r[8]=(_+y)*A,r[9]=(m-v)*A,r[10]=(1-(d+g))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=mr.set(r[0],r[1],r[2]).length();const o=mr.set(r[4],r[5],r[6]).length(),a=mr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],wn.copy(this);const c=1/s,h=1/o,u=1/a;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=u,wn.elements[9]*=u,wn.elements[10]*=u,e.setFromRotationMatrix(wn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=ii){const l=this.elements,c=2*s/(e-t),h=2*s/(i-r),u=(e+t)/(e-t),d=(i+r)/(i-r);let f,_;if(a===ii)f=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Mo)f=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=ii){const l=this.elements,c=1/(e-t),h=1/(i-r),u=1/(o-s),d=(e+t)*c,f=(i+r)*h;let _,g;if(a===ii)_=(o+s)*u,g=-2*u;else if(a===Mo)_=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const mr=new k,wn=new me,cm=new k(0,0,0),um=new k(1,1,1),_i=new k,Is=new k,ln=new k,$c=new me,Yc=new kr;class ui{constructor(t=0,e=0,i=0,r=ui.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return $c.makeRotationFromQuaternion(t),this.setFromRotationMatrix($c,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yc.setFromEuler(this),this.setFromQuaternion(Yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ui.DEFAULT_ORDER="XYZ";class ic{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hm=0;const Zc=new k,_r=new kr,Yn=new me,Os=new k,Zr=new k,fm=new k,dm=new kr,jc=new k(1,0,0),Kc=new k(0,1,0),Qc=new k(0,0,1),Jc={type:"added"},pm={type:"removed"},gr={type:"childadded",child:null},oa={type:"childremoved",child:null};class sn extends Fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DEFAULT_UP.clone();const t=new k,e=new ui,i=new kr,r=new k(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new me},normalMatrix:{value:new Ht}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _r.setFromAxisAngle(t,e),this.quaternion.multiply(_r),this}rotateOnWorldAxis(t,e){return _r.setFromAxisAngle(t,e),this.quaternion.premultiply(_r),this}rotateX(t){return this.rotateOnAxis(jc,t)}rotateY(t){return this.rotateOnAxis(Kc,t)}rotateZ(t){return this.rotateOnAxis(Qc,t)}translateOnAxis(t,e){return Zc.copy(t).applyQuaternion(this.quaternion),this.position.add(Zc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jc,t)}translateY(t){return this.translateOnAxis(Kc,t)}translateZ(t){return this.translateOnAxis(Qc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Os.copy(t):Os.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Zr,Os,this.up):Yn.lookAt(Os,Zr,this.up),this.quaternion.setFromRotationMatrix(Yn),r&&(Yn.extractRotation(r.matrixWorld),_r.setFromRotationMatrix(Yn),this.quaternion.premultiply(_r.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jc),gr.child=t,this.dispatchEvent(gr),gr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pm),oa.child=t,this.dispatchEvent(oa),oa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jc),gr.child=t,this.dispatchEvent(gr),gr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,t,fm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,dm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}sn.DEFAULT_UP=new k(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new k,Zn=new k,aa=new k,jn=new k,vr=new k,xr=new k,tu=new k,la=new k,ca=new k,ua=new k,ha=new he,fa=new he,da=new he;class Dn{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),An.subVectors(t,e),r.cross(An);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){An.subVectors(r,e),Zn.subVectors(i,e),aa.subVectors(t,e);const o=An.dot(An),a=An.dot(Zn),l=An.dot(aa),c=Zn.dot(Zn),h=Zn.dot(aa),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,_=(o*h-a*l)*d;return s.set(1-f-_,_,f)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,jn.x),l.addScaledVector(o,jn.y),l.addScaledVector(a,jn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return ha.setScalar(0),fa.setScalar(0),da.setScalar(0),ha.fromBufferAttribute(t,e),fa.fromBufferAttribute(t,i),da.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ha,s.x),o.addScaledVector(fa,s.y),o.addScaledVector(da,s.z),o}static isFrontFacing(t,e,i,r){return An.subVectors(i,e),Zn.subVectors(t,e),An.cross(Zn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),An.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return Dn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return Dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;vr.subVectors(r,i),xr.subVectors(s,i),la.subVectors(t,i);const l=vr.dot(la),c=xr.dot(la);if(l<=0&&c<=0)return e.copy(i);ca.subVectors(t,r);const h=vr.dot(ca),u=xr.dot(ca);if(h>=0&&u<=h)return e.copy(r);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(vr,o);ua.subVectors(t,s);const f=vr.dot(ua),_=xr.dot(ua);if(_>=0&&f<=_)return e.copy(s);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(i).addScaledVector(xr,a);const m=h*_-f*u;if(m<=0&&u-h>=0&&f-_>=0)return tu.subVectors(s,r),a=(u-h)/(u-h+(f-_)),e.copy(r).addScaledVector(tu,a);const p=1/(m+g+d);return o=g*p,a=d*p,e.copy(i).addScaledVector(vr,o).addScaledVector(xr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Ns={h:0,s:0,l:0};function pa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=vn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=Jt.workingColorSpace){if(t=tc(t,1),e=Vt(e,0,1),i=Vt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=pa(o,s,t+1/3),this.g=pa(o,s,t),this.b=pa(o,s,t-1/3)}return Jt.colorSpaceToWorking(this,r),this}setStyle(t,e=vn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=vn){const i=mf[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ai(t.r),this.g=ai(t.g),this.b=ai(t.b),this}copyLinearToSRGB(t){return this.r=Cr(t.r),this.g=Cr(t.g),this.b=Cr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=vn){return Jt.workingToColorSpace(ze.copy(this),t),Math.round(Vt(ze.r*255,0,255))*65536+Math.round(Vt(ze.g*255,0,255))*256+Math.round(Vt(ze.b*255,0,255))}getHexString(t=vn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(ze.copy(this),e);const i=ze.r,r=ze.g,s=ze.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=vn){Jt.workingToColorSpace(ze.copy(this),t);const e=ze.r,i=ze.g,r=ze.b;return t!==vn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(gi),this.setHSL(gi.h+t,gi.s+e,gi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(gi),t.getHSL(Ns);const i=rs(gi.h,Ns.h,e),r=rs(gi.s,Ns.s,e),s=rs(gi.l,Ns.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new jt;jt.NAMES=mf;let mm=0;class _s extends Fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=wr,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ga,this.blendDst=Wa,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==wr&&(i.blending=this.blending),this.side!==wi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ga&&(i.blendSrc=this.blendSrc),this.blendDst!==Wa&&(i.blendDst=this.blendDst),this.blendEquation!==Si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Pr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class rc extends _s{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Zh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new k,Fs=new zt;let _m=0;class Ee{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_m++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Cl,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Fs.fromBufferAttribute(this,e),Fs.applyMatrix3(t),this.setXY(e,Fs.x,Fs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cl&&(t.usage=this.usage),t}}class _f extends Ee{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class gf extends Ee{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Sn extends Ee{constructor(t,e,i){super(new Float32Array(t),e,i)}}let gm=0;const _n=new me,ma=new sn,yr=new k,cn=new hi,jr=new hi,Le=new k;class fn extends Fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(df(t)?gf:_f)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ht().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,i){return _n.makeTranslation(t,e,i),this.applyMatrix4(_n),this}scale(t,e,i){return _n.makeScale(t,e,i),this.applyMatrix4(_n),this}lookAt(t){return ma.lookAt(t),ma.updateMatrix(),this.applyMatrix4(ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Sn(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];jr.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(cn.min,jr.min),cn.expandByPoint(Le),Le.addVectors(cn.max,jr.max),cn.expandByPoint(Le)):(cn.expandByPoint(jr.min),cn.expandByPoint(jr.max))}cn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Le.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Le));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Le.fromBufferAttribute(a,c),l&&(yr.fromBufferAttribute(t,c),Le.add(yr)),r=Math.max(r,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ee(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new k,l[L]=new k;const c=new k,h=new k,u=new k,d=new zt,f=new zt,_=new zt,g=new k,m=new k;function p(L,E,x){c.fromBufferAttribute(i,L),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,x),d.fromBufferAttribute(s,L),f.fromBufferAttribute(s,E),_.fromBufferAttribute(s,x),h.sub(c),u.sub(c),f.sub(d),_.sub(d);const R=1/(f.x*_.y-_.x*f.y);isFinite(R)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(u,-f.y).multiplyScalar(R),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(R),a[L].add(g),a[E].add(g),a[x].add(g),l[L].add(m),l[E].add(m),l[x].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let L=0,E=v.length;L<E;++L){const x=v[L],R=x.start,D=x.count;for(let N=R,X=R+D;N<X;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const y=new k,S=new k,w=new k,b=new k;function A(L){w.fromBufferAttribute(r,L),b.copy(w);const E=a[L];y.copy(E),y.sub(w.multiplyScalar(w.dot(E))).normalize(),S.crossVectors(b,E);const R=S.dot(l[L])<0?-1:1;o.setXYZW(L,y.x,y.y,y.z,R)}for(let L=0,E=v.length;L<E;++L){const x=v[L],R=x.start,D=x.count;for(let N=R,X=R+D;N<X;N+=3)A(t.getX(N+0)),A(t.getX(N+1)),A(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const r=new k,s=new k,o=new k,a=new k,l=new k,c=new k,h=new k,u=new k;if(t)for(let d=0,f=t.count;d<f;d+=3){const _=t.getX(d+0),g=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*h;for(let p=0;p<h;p++)d[_++]=c[f++]}return new Ee(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eu=new me,Ni=new nc,ks=new Ai,nu=new k,zs=new k,Bs=new k,Hs=new k,_a=new k,Vs=new k,iu=new k,Gs=new k;class Un extends sn{constructor(t=new fn,e=new rc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Vs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(_a.fromBufferAttribute(u,t),o?Vs.addScaledVector(_a,h):Vs.addScaledVector(_a.sub(e),h))}e.add(Vs)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(s),Ni.copy(t.ray).recast(t.near),!(ks.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(ks,nu)===null||Ni.origin.distanceToSquared(nu)>(t.far-t.near)**2))&&(eu.copy(s).invert(),Ni.copy(t.ray).applyMatrix4(eu),!(i.boundingBox!==null&&Ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const m=d[_],p=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,w=y;S<w;S+=3){const b=a.getX(S),A=a.getX(S+1),L=a.getX(S+2);r=Ws(this,p,t,i,c,h,u,b,A,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const v=a.getX(m),y=a.getX(m+1),S=a.getX(m+2);r=Ws(this,o,t,i,c,h,u,v,y,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const m=d[_],p=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,w=y;S<w;S+=3){const b=S,A=S+1,L=S+2;r=Ws(this,p,t,i,c,h,u,b,A,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const v=m,y=m+1,S=m+2;r=Ws(this,o,t,i,c,h,u,v,y,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function vm(n,t,e,i,r,s,o,a){let l;if(t.side===rn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===wi,a),l===null)return null;Gs.copy(a),Gs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Gs);return c<e.near||c>e.far?null:{distance:c,point:Gs.clone(),object:n}}function Ws(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,zs),n.getVertexPosition(l,Bs),n.getVertexPosition(c,Hs);const h=vm(n,t,e,i,zs,Bs,Hs,iu);if(h){const u=new k;Dn.getBarycoord(iu,zs,Bs,Hs,u),r&&(h.uv=Dn.getInterpolatedAttribute(r,a,l,c,u,new zt)),s&&(h.uv1=Dn.getInterpolatedAttribute(s,a,l,c,u,new zt)),o&&(h.normal=Dn.getInterpolatedAttribute(o,a,l,c,u,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new k,materialIndex:0};Dn.getNormal(zs,Bs,Hs,d.normal),h.face=d,h.barycoord=u}return h}class gs extends fn{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;_("z","y","x",-1,-1,i,e,t,o,s,0),_("z","y","x",1,-1,i,e,-t,o,s,1),_("x","z","y",1,1,t,i,e,r,o,2),_("x","z","y",1,-1,t,i,-e,r,o,3),_("x","y","z",1,-1,t,e,i,r,s,4),_("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Sn(c,3)),this.setAttribute("normal",new Sn(h,3)),this.setAttribute("uv",new Sn(u,2));function _(g,m,p,v,y,S,w,b,A,L,E){const x=S/A,R=w/L,D=S/2,N=w/2,X=b/2,G=A+1,Y=L+1;let Q=0,Z=0;const at=new k;for(let P=0;P<Y;P++){const gt=P*R-N;for(let Ut=0;Ut<G;Ut++){const O=Ut*x-D;at[g]=O*v,at[m]=gt*y,at[p]=X,c.push(at.x,at.y,at.z),at[g]=0,at[m]=0,at[p]=b>0?1:-1,h.push(at.x,at.y,at.z),u.push(Ut/A),u.push(1-P/L),Q+=1}}for(let P=0;P<L;P++)for(let gt=0;gt<A;gt++){const Ut=d+gt+G*P,O=d+gt+G*(P+1),J=d+(gt+1)+G*(P+1),lt=d+(gt+1)+G*P;l.push(Ut,O,lt),l.push(O,J,lt),Z+=6}a.addGroup(f,Z,E),f+=Z,d+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ir(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Ge(n){const t={};for(let e=0;e<n.length;e++){const i=Ir(n[e]);for(const r in i)t[r]=i[r]}return t}function xm(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function vf(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Ki={clone:Ir,merge:Ge};var ym=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ue extends _s{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ym,this.fragmentShader=Sm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ir(t.uniforms),this.uniformsGroups=xm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class xf extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=ii}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new k,ru=new zt,su=new zt;class xn extends xf{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(is*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fs*2*Math.atan(Math.tan(is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(vi.x,vi.y).multiplyScalar(-t/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vi.x,vi.y).multiplyScalar(-t/vi.z)}getViewSize(t,e){return this.getViewBounds(t,ru,su),e.subVectors(su,ru)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(is*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Sr=-90,Mr=1;class Mm extends sn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new xn(Sr,Mr,t,e);r.layers=this.layers,this.add(r);const s=new xn(Sr,Mr,t,e);s.layers=this.layers,this.add(s);const o=new xn(Sr,Mr,t,e);o.layers=this.layers,this.add(o);const a=new xn(Sr,Mr,t,e);a.layers=this.layers,this.add(a);const l=new xn(Sr,Mr,t,e);l.layers=this.layers,this.add(l);const c=new xn(Sr,Mr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===ii)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Mo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,r),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class yf extends Ye{constructor(t=[],e=Dr,i,r,s,o,a,l,c,h){super(t,e,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Em extends On{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new yf(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new gs(5,5,5),s=new Ue({name:"CubemapFromEquirect",uniforms:Ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:ri});s.uniforms.tEquirect.value=e;const o=new Un(r,s),a=e.minFilter;return e.minFilter===qi&&(e.minFilter=Vn),new Mm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class $i extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bm={type:"move"};class ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $i,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $i,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $i,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,i),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,_=.005;c.inputState.pinching&&d>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bm)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new $i;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Tm extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class wm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Cl,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ve=new k;class Ei{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Pn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new Ee(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ei(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Sf extends Ye{constructor(t=null,e=1,i=1,r,s,o,a,l,c=$e,h=$e,u,d){super(null,o,a,l,c,h,r,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const va=new k,Am=new k,Cm=new Ht;class Hi{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=va.subVectors(i,e).cross(Am.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(va),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Cm.getNormalMatrix(t),r=this.coplanarPoint(va).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fi=new Ai,Xs=new k;class sc{constructor(t=new Hi,e=new Hi,i=new Hi,r=new Hi,s=new Hi,o=new Hi){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ii){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],d=r[7],f=r[8],_=r[9],g=r[10],m=r[11],p=r[12],v=r[13],y=r[14],S=r[15];if(i[0].setComponents(l-s,d-c,m-f,S-p).normalize(),i[1].setComponents(l+s,d+c,m+f,S+p).normalize(),i[2].setComponents(l+o,d+h,m+_,S+v).normalize(),i[3].setComponents(l-o,d-h,m-_,S-v).normalize(),i[4].setComponents(l-a,d-u,m-g,S-y).normalize(),e===ii)i[5].setComponents(l+a,d+u,m+g,S+y).normalize();else if(e===Mo)i[5].setComponents(a,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(t){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Xs.x=r.normal.x>0?t.max.x:t.min.x,Xs.y=r.normal.y>0?t.max.y:t.min.y,Xs.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Xs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rm extends _s{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ou=new me,Rl=new nc,qs=new Ai,$s=new k;class au extends sn{constructor(t=new fn,e=new Rm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere),qs.applyMatrix4(r),qs.radius+=s,t.ray.intersectsSphere(qs)===!1)return;ou.copy(r).invert(),Rl.copy(t.ray).applyMatrix4(ou);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let _=d,g=f;_<g;_++){const m=c.getX(_);$s.fromBufferAttribute(u,m),lu($s,m,l,r,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let _=d,g=f;_<g;_++)$s.fromBufferAttribute(u,_),lu($s,_,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function lu(n,t,e,i,r,s,o){const a=Rl.distanceSqToPoint(n);if(a<e){const l=new k;Rl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Mf extends Ye{constructor(t,e,i=ji,r,s,o,a=$e,l=$e,c,h=us,u=1){if(h!==us&&h!==hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ec(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Pm{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],d=i[r+1]-h,f=(o-h)/d;return(r+f)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new zt:new k);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new k,r=[],s=[],o=[],a=new k,l=new me;for(let f=0;f<=t;f++){const _=f/t;r[f]=this.getTangentAt(_,new k)}s[0]=new k,o[0]=new k;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Vt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,_))}o[f].crossVectors(r[f],s[f])}if(e===!0){let f=Math.acos(Vt(s[0].dot(s[t]),-1,1));f/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let _=1;_<=t;_++)s[_].applyMatrix4(l.makeRotationAxis(r[_],f*_)),o[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function Dm(n,t){const e=1-n;return e*e*t}function Lm(n,t){return 2*(1-n)*n*t}function Um(n,t){return n*n*t}function xa(n,t,e,i){return Dm(n,t)+Lm(n,e)+Um(n,i)}class Im extends Pm{constructor(t=new k,e=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new k){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(xa(t,r.x,s.x,o.x),xa(t,r.y,s.y,o.y),xa(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lo extends fn{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=t/a,d=e/l,f=[],_=[],g=[],m=[];for(let p=0;p<h;p++){const v=p*d-o;for(let y=0;y<c;y++){const S=y*u-s;_.push(S,-v,0),g.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const y=v+c*p,S=v+c*(p+1),w=v+1+c*(p+1),b=v+1+c*p;f.push(y,S,b),f.push(S,w,b)}this.setIndex(f),this.setAttribute("position",new Sn(_,3)),this.setAttribute("normal",new Sn(g,3)),this.setAttribute("uv",new Sn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lo(t.width,t.height,t.widthSegments,t.heightSegments)}}class Om extends fn{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,r=new k,s=new k;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let _=d,g=d+f;_<g;_+=3)for(let m=0;m<3;m++){const p=a.getX(_+m),v=a.getX(_+(m+1)%3);r.fromBufferAttribute(o,p),s.fromBufferAttribute(o,v),cu(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;r.fromBufferAttribute(o,h),s.fromBufferAttribute(o,u),cu(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new Sn(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function cu(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(r)===!0?!1:(e.add(i),e.add(r),!0)}class Nm extends Ue{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Fm extends _s{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ep,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class km extends _s{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ef extends xf{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class zm extends fn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Bm extends xn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class bf{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=uu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=uu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function uu(){return performance.now()}class Pl extends wm{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const hu=new me;class Hm{constructor(t,e,i=0,r=1/0){this.ray=new nc(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new ic,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return hu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hu),this}intersectObject(t,e=!0,i=[]){return Dl(t,this,i,e),i.sort(fu),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)Dl(t[r],this,i,e);return i.sort(fu),i}}function fu(n,t){return n.distance-t.distance}function Dl(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Dl(s[o],t,e,!0)}}class Vm{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Vt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Vt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const du=new k,Ys=new k;class Gm{constructor(t=new k,e=new k){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){du.subVectors(t,this.start),Ys.subVectors(this.end,this.start);const i=Ys.dot(Ys);let s=Ys.dot(du)/i;return e&&(s=Vt(s,0,1)),s}closestPointToPoint(t,e,i){const r=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function pu(n,t,e,i){const r=Wm(i);switch(e){case af:return n*t;case cf:return n*t/r.components*r.byteLength;case Kl:return n*t/r.components*r.byteLength;case uf:return n*t*2/r.components*r.byteLength;case Ql:return n*t*2/r.components*r.byteLength;case lf:return n*t*3/r.components*r.byteLength;case un:return n*t*4/r.components*r.byteLength;case Jl:return n*t*4/r.components*r.byteLength;case ao:case lo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case co:case uo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case il:case sl:return Math.max(n,16)*Math.max(t,8)/4;case nl:case rl:return Math.max(n,8)*Math.max(t,8)/2;case ol:case al:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ll:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case cl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ul:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case hl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case fl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case dl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case pl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ml:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case _l:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case gl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case vl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case xl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case yl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Sl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ml:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ho:case El:case bl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case hf:case Tl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case wl:case Al:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Wm(n){switch(n){case ci:case rf:return{byteLength:1,components:1};case ls:case sf:case si:return{byteLength:2,components:1};case Zl:case jl:return{byteLength:2,components:4};case ji:case Yl:case Ln:return{byteLength:4,components:1};case of:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ql}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ql);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Tf(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function Xm(n){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,_)=>f.start-_.start);let d=0;for(let f=1;f<u.length;f++){const _=u[d],g=u[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++d,u[d]=g)}u.length=d+1;for(let f=0,_=u.length;f<_;f++){const g=u[f];n.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var qm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$m=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ym=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,e_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,n_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,i_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,r_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,s_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,o_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,a_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,l_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,u_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,h_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,f_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,d_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,p_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,m_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,__=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,g_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,v_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,x_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,y_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,M_="gl_FragColor = linearToOutputTexel( gl_FragColor );",E_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,b_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,T_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,w_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,A_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,C_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,R_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,L_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,I_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,N_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,F_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,k_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,z_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,B_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,H_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,V_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,G_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,W_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,X_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,q_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Y_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Z_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Q_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,J_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,eg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ng=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ig=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,og=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ag=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ug=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_g=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Eg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Dg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ug=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ig=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ng=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Wg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,t0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,e0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,n0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,o0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,u0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,f0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,d0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,S0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,E0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:qm,alphahash_pars_fragment:$m,alphamap_fragment:Ym,alphamap_pars_fragment:Zm,alphatest_fragment:jm,alphatest_pars_fragment:Km,aomap_fragment:Qm,aomap_pars_fragment:Jm,batching_pars_vertex:t_,batching_vertex:e_,begin_vertex:n_,beginnormal_vertex:i_,bsdfs:r_,iridescence_fragment:s_,bumpmap_pars_fragment:o_,clipping_planes_fragment:a_,clipping_planes_pars_fragment:l_,clipping_planes_pars_vertex:c_,clipping_planes_vertex:u_,color_fragment:h_,color_pars_fragment:f_,color_pars_vertex:d_,color_vertex:p_,common:m_,cube_uv_reflection_fragment:__,defaultnormal_vertex:g_,displacementmap_pars_vertex:v_,displacementmap_vertex:x_,emissivemap_fragment:y_,emissivemap_pars_fragment:S_,colorspace_fragment:M_,colorspace_pars_fragment:E_,envmap_fragment:b_,envmap_common_pars_fragment:T_,envmap_pars_fragment:w_,envmap_pars_vertex:A_,envmap_physical_pars_fragment:k_,envmap_vertex:C_,fog_vertex:R_,fog_pars_vertex:P_,fog_fragment:D_,fog_pars_fragment:L_,gradientmap_pars_fragment:U_,lightmap_pars_fragment:I_,lights_lambert_fragment:O_,lights_lambert_pars_fragment:N_,lights_pars_begin:F_,lights_toon_fragment:z_,lights_toon_pars_fragment:B_,lights_phong_fragment:H_,lights_phong_pars_fragment:V_,lights_physical_fragment:G_,lights_physical_pars_fragment:W_,lights_fragment_begin:X_,lights_fragment_maps:q_,lights_fragment_end:$_,logdepthbuf_fragment:Y_,logdepthbuf_pars_fragment:Z_,logdepthbuf_pars_vertex:j_,logdepthbuf_vertex:K_,map_fragment:Q_,map_pars_fragment:J_,map_particle_fragment:tg,map_particle_pars_fragment:eg,metalnessmap_fragment:ng,metalnessmap_pars_fragment:ig,morphinstance_vertex:rg,morphcolor_vertex:sg,morphnormal_vertex:og,morphtarget_pars_vertex:ag,morphtarget_vertex:lg,normal_fragment_begin:cg,normal_fragment_maps:ug,normal_pars_fragment:hg,normal_pars_vertex:fg,normal_vertex:dg,normalmap_pars_fragment:pg,clearcoat_normal_fragment_begin:mg,clearcoat_normal_fragment_maps:_g,clearcoat_pars_fragment:gg,iridescence_pars_fragment:vg,opaque_fragment:xg,packing:yg,premultiplied_alpha_fragment:Sg,project_vertex:Mg,dithering_fragment:Eg,dithering_pars_fragment:bg,roughnessmap_fragment:Tg,roughnessmap_pars_fragment:wg,shadowmap_pars_fragment:Ag,shadowmap_pars_vertex:Cg,shadowmap_vertex:Rg,shadowmask_pars_fragment:Pg,skinbase_vertex:Dg,skinning_pars_vertex:Lg,skinning_vertex:Ug,skinnormal_vertex:Ig,specularmap_fragment:Og,specularmap_pars_fragment:Ng,tonemapping_fragment:Fg,tonemapping_pars_fragment:kg,transmission_fragment:zg,transmission_pars_fragment:Bg,uv_pars_fragment:Hg,uv_pars_vertex:Vg,uv_vertex:Gg,worldpos_vertex:Wg,background_vert:Xg,background_frag:qg,backgroundCube_vert:$g,backgroundCube_frag:Yg,cube_vert:Zg,cube_frag:jg,depth_vert:Kg,depth_frag:Qg,distanceRGBA_vert:Jg,distanceRGBA_frag:t0,equirect_vert:e0,equirect_frag:n0,linedashed_vert:i0,linedashed_frag:r0,meshbasic_vert:s0,meshbasic_frag:o0,meshlambert_vert:a0,meshlambert_frag:l0,meshmatcap_vert:c0,meshmatcap_frag:u0,meshnormal_vert:h0,meshnormal_frag:f0,meshphong_vert:d0,meshphong_frag:p0,meshphysical_vert:m0,meshphysical_frag:_0,meshtoon_vert:g0,meshtoon_frag:v0,points_vert:x0,points_frag:y0,shadow_vert:S0,shadow_frag:M0,sprite_vert:E0,sprite_frag:b0},ut={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},tn={basic:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Ge([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Ge([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Ge([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Ge([ut.points,ut.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Ge([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Ge([ut.common,ut.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Ge([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Ge([ut.sprite,ut.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:Ge([ut.common,ut.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:Ge([ut.lights,ut.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};tn.physical={uniforms:Ge([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Zs={r:0,b:0,g:0},ki=new ui,T0=new me;function w0(n,t,e,i,r,s,o){const a=new jt(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function _(y){let S=y.isScene===!0?y.background:null;return S&&S.isTexture&&(S=(y.backgroundBlurriness>0?e:t).get(S)),S}function g(y){let S=!1;const w=_(y);w===null?p(a,l):w&&w.isColor&&(p(w,1),S=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,S){const w=_(S);w&&(w.isCubeTexture||w.mapping===Do)?(h===void 0&&(h=new Un(new gs(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:Ir(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,A,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),ki.copy(S.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(T0.makeRotationFromEuler(ki)),h.material.toneMapped=Jt.getTransfer(w.colorSpace)!==ae,(u!==w||d!==w.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Un(new Lo(2,2),new Ue({name:"BackgroundMaterial",uniforms:Ir(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(w.colorSpace)!==ae,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,d=w.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,S){y.getRGB(Zs,vf(n)),i.buffers.color.setClear(Zs.r,Zs.g,Zs.b,S,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),l=S,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:g,addToRenderList:m,dispose:v}}function A0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(x,R,D,N,X){let G=!1;const Y=u(N,D,R);s!==Y&&(s=Y,c(s.object)),G=f(x,N,D,X),G&&_(x,N,D,X),X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,S(x,R,D,N),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function h(x){return n.deleteVertexArray(x)}function u(x,R,D){const N=D.wireframe===!0;let X=i[x.id];X===void 0&&(X={},i[x.id]=X);let G=X[R.id];G===void 0&&(G={},X[R.id]=G);let Y=G[N];return Y===void 0&&(Y=d(l()),G[N]=Y),Y}function d(x){const R=[],D=[],N=[];for(let X=0;X<e;X++)R[X]=0,D[X]=0,N[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:N,object:x,attributes:{},index:null}}function f(x,R,D,N){const X=s.attributes,G=R.attributes;let Y=0;const Q=D.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const P=X[Z];let gt=G[Z];if(gt===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(gt=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(gt=x.instanceColor)),P===void 0||P.attribute!==gt||gt&&P.data!==gt.data)return!0;Y++}return s.attributesNum!==Y||s.index!==N}function _(x,R,D,N){const X={},G=R.attributes;let Y=0;const Q=D.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let P=G[Z];P===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(P=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(P=x.instanceColor));const gt={};gt.attribute=P,P&&P.data&&(gt.data=P.data),X[Z]=gt,Y++}s.attributes=X,s.attributesNum=Y,s.index=N}function g(){const x=s.newAttributes;for(let R=0,D=x.length;R<D;R++)x[R]=0}function m(x){p(x,0)}function p(x,R){const D=s.newAttributes,N=s.enabledAttributes,X=s.attributeDivisors;D[x]=1,N[x]===0&&(n.enableVertexAttribArray(x),N[x]=1),X[x]!==R&&(n.vertexAttribDivisor(x,R),X[x]=R)}function v(){const x=s.newAttributes,R=s.enabledAttributes;for(let D=0,N=R.length;D<N;D++)R[D]!==x[D]&&(n.disableVertexAttribArray(D),R[D]=0)}function y(x,R,D,N,X,G,Y){Y===!0?n.vertexAttribIPointer(x,R,D,X,G):n.vertexAttribPointer(x,R,D,N,X,G)}function S(x,R,D,N){g();const X=N.attributes,G=D.getAttributes(),Y=R.defaultAttributeValues;for(const Q in G){const Z=G[Q];if(Z.location>=0){let at=X[Q];if(at===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(at=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(at=x.instanceColor)),at!==void 0){const P=at.normalized,gt=at.itemSize,Ut=t.get(at);if(Ut===void 0)continue;const O=Ut.buffer,J=Ut.type,lt=Ut.bytesPerElement,ft=J===n.INT||J===n.UNSIGNED_INT||at.gpuType===Yl;if(at.isInterleavedBufferAttribute){const ht=at.data,St=ht.stride,Wt=at.offset;if(ht.isInstancedInterleavedBuffer){for(let wt=0;wt<Z.locationSize;wt++)p(Z.location+wt,ht.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let wt=0;wt<Z.locationSize;wt++)m(Z.location+wt);n.bindBuffer(n.ARRAY_BUFFER,O);for(let wt=0;wt<Z.locationSize;wt++)y(Z.location+wt,gt/Z.locationSize,J,P,St*lt,(Wt+gt/Z.locationSize*wt)*lt,ft)}else{if(at.isInstancedBufferAttribute){for(let ht=0;ht<Z.locationSize;ht++)p(Z.location+ht,at.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ht=0;ht<Z.locationSize;ht++)m(Z.location+ht);n.bindBuffer(n.ARRAY_BUFFER,O);for(let ht=0;ht<Z.locationSize;ht++)y(Z.location+ht,gt/Z.locationSize,J,P,gt*lt,gt/Z.locationSize*ht*lt,ft)}}else if(Y!==void 0){const P=Y[Q];if(P!==void 0)switch(P.length){case 2:n.vertexAttrib2fv(Z.location,P);break;case 3:n.vertexAttrib3fv(Z.location,P);break;case 4:n.vertexAttrib4fv(Z.location,P);break;default:n.vertexAttrib1fv(Z.location,P)}}}}v()}function w(){L();for(const x in i){const R=i[x];for(const D in R){const N=R[D];for(const X in N)h(N[X].object),delete N[X];delete R[D]}delete i[x]}}function b(x){if(i[x.id]===void 0)return;const R=i[x.id];for(const D in R){const N=R[D];for(const X in N)h(N[X].object),delete N[X];delete R[D]}delete i[x.id]}function A(x){for(const R in i){const D=i[R];if(D[x.id]===void 0)continue;const N=D[x.id];for(const X in N)h(N[X].object),delete N[X];delete D[x.id]}}function L(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:E,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:v}}function C0(n,t,e){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let _=0;_<u;_++)f+=h[_];e.update(f,i,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)o(c[_],h[_],d[_]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let _=0;for(let g=0;g<u;g++)_+=h[g]*d[g];e.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function R0(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==un&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const L=A===si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ci&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ln&&!L)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=_>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:w,maxSamples:b}}function P0(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Hi,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||r;return r=d,i=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const _=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!r||_===null||_.length===0||s&&!m)s?h(null):c();else{const v=s?0:i,y=v*4;let S=p.clippingState||null;l.value=S,S=h(_,d,y,f);for(let w=0;w!==y;++w)S[w]=e[w];p.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,_){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=f+g*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,S=f;y!==g;++y,S+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function D0(n){let t=new WeakMap;function e(o,a){return a===Qa?o.mapping=Dr:a===Ja&&(o.mapping=Lr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Qa||a===Ja)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Em(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const Tr=4,mu=[.125,.215,.35,.446,.526,.582],Wi=20,ya=new Ef,_u=new jt;let Sa=null,Ma=0,Ea=0,ba=!1;const Vi=(1+Math.sqrt(5))/2,Er=1/Vi,gu=[new k(-Vi,Er,0),new k(Vi,Er,0),new k(-Er,0,Vi),new k(Er,0,Vi),new k(0,Vi,-Er),new k(0,Vi,Er),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],L0=new k;class vu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=L0}=s;Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Su(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Sa,Ma,Ea),this._renderer.xr.enabled=ba,t.scissorTest=!1,js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Dr||t.mapping===Lr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:si,format:un,colorSpace:Ur,depthBuffer:!1},r=xu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xu(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=U0(s)),this._blurMaterial=I0(s,t,e)}return r}_compileMaterial(t){const e=new Un(this._lodPlanes[0],t);this._renderer.compile(e,ya)}_sceneToCubeUV(t,e,i,r,s){const l=new xn(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(_u),u.toneMapping=Ti,u.autoClear=!1;const _=new rc({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),g=new Un(new gs,_);let m=!1;const p=t.background;p?p.isColor&&(_.color.copy(p),t.background=null,m=!0):(_.color.copy(_u),m=!0);for(let v=0;v<6;v++){const y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[v],s.y,s.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[v]));const S=this._cubeSize;js(r,y*S,v>2?S:0,S,S),u.setRenderTarget(r),m&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Dr||t.mapping===Lr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Su()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Un(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;js(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ya)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=gu[(r-s-1)%gu.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Un(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Wi-1),g=s/_,m=isFinite(s)?1+Math.floor(h*g):Wi;m>Wi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wi}`);const p=[];let v=0;for(let A=0;A<Wi;++A){const L=A/g,E=Math.exp(-L*L/2);p.push(E),A===0?v+=E:A<m&&(v+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=_,d.mipInt.value=y-i;const S=this._sizeLods[r],w=3*S*(r>y-Tr?r-y+Tr:0),b=4*(this._cubeSize-S);js(e,w,b,3*S,2*S),l.setRenderTarget(e),l.render(u,ya)}}function U0(n){const t=[],e=[],i=[];let r=n;const s=n-Tr+1+mu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-Tr?l=mu[o-n+Tr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,_=6,g=3,m=2,p=1,v=new Float32Array(g*_*f),y=new Float32Array(m*_*f),S=new Float32Array(p*_*f);for(let b=0;b<f;b++){const A=b%3*2/3-1,L=b>2?0:-1,E=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];v.set(E,g*_*b),y.set(d,m*_*b);const x=[b,b,b,b,b,b];S.set(x,p*_*b)}const w=new fn;w.setAttribute("position",new Ee(v,g)),w.setAttribute("uv",new Ee(y,m)),w.setAttribute("faceIndex",new Ee(S,p)),t.push(w),r>Tr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function xu(n,t,e){const i=new On(n,t,e);return i.texture.mapping=Do,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function js(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function I0(n,t,e){const i=new Float32Array(Wi),r=new k(0,1,0);return new Ue({name:"SphericalGaussianBlur",defines:{n:Wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function yu(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Su(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function oc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function O0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Qa||l===Ja,h=l===Dr||l===Lr;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new vu(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&r(f)?(e===null&&(e=new vu(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function N0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Ar("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function F0(n,t,e,i){const r={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete r[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],n.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,_=u.attributes.position;let g=0;if(f!==null){const v=f.array;g=f.version;for(let y=0,S=v.length;y<S;y+=3){const w=v[y+0],b=v[y+1],A=v[y+2];d.push(w,b,b,A,A,w)}}else if(_!==void 0){const v=_.array;g=_.version;for(let y=0,S=v.length/3-1;y<S;y+=3){const w=y+0,b=y+1,A=y+2;d.push(w,b,b,A,A,w)}}else return;const m=new(df(d)?gf:_f)(d,1);m.version=g;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function k0(n,t,e){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){n.drawElements(i,f,s,d*o),e.update(f,i,1)}function c(d,f,_){_!==0&&(n.drawElementsInstanced(i,f,s,d*o,_),e.update(f,i,_))}function h(d,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];e.update(m,i,1)}function u(d,f,_,g){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,g,0,_);let p=0;for(let v=0;v<_;v++)p+=f[v]*g[v];e.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function z0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function B0(n,t,e){const i=new WeakMap,r=new he;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(a);if(d===void 0||d.count!==u){let x=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var f=x;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let S=0;_===!0&&(S=1),g===!0&&(S=2),m===!0&&(S=3);let w=a.attributes.position.count*S,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const A=new Float32Array(w*b*4*u),L=new pf(A,w,b,u);L.type=Ln,L.needsUpdate=!0;const E=S*4;for(let R=0;R<u;R++){const D=p[R],N=v[R],X=y[R],G=w*b*4*R;for(let Y=0;Y<D.count;Y++){const Q=Y*E;_===!0&&(r.fromBufferAttribute(D,Y),A[G+Q+0]=r.x,A[G+Q+1]=r.y,A[G+Q+2]=r.z,A[G+Q+3]=0),g===!0&&(r.fromBufferAttribute(N,Y),A[G+Q+4]=r.x,A[G+Q+5]=r.y,A[G+Q+6]=r.z,A[G+Q+7]=0),m===!0&&(r.fromBufferAttribute(X,Y),A[G+Q+8]=r.x,A[G+Q+9]=r.y,A[G+Q+10]=r.z,A[G+Q+11]=X.itemSize===4?r.w:1)}}d={count:u,texture:L,size:new zt(w,b)},i.set(a,d),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function H0(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const wf=new Ye,Mu=new Mf(1,1),Af=new pf,Cf=new am,Rf=new yf,Eu=[],bu=[],Tu=new Float32Array(16),wu=new Float32Array(9),Au=new Float32Array(4);function zr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Eu[r];if(s===void 0&&(s=new Float32Array(r),Eu[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Re(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Pe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Uo(n,t){let e=bu[t];e===void 0&&(e=new Int32Array(t),bu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function V0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function G0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2fv(this.addr,t),Pe(e,t)}}function W0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;n.uniform3fv(this.addr,t),Pe(e,t)}}function X0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4fv(this.addr,t),Pe(e,t)}}function q0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,i))return;Au.set(i),n.uniformMatrix2fv(this.addr,!1,Au),Pe(e,i)}}function $0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,i))return;wu.set(i),n.uniformMatrix3fv(this.addr,!1,wu),Pe(e,i)}}function Y0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,i))return;Tu.set(i),n.uniformMatrix4fv(this.addr,!1,Tu),Pe(e,i)}}function Z0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function j0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2iv(this.addr,t),Pe(e,t)}}function K0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3iv(this.addr,t),Pe(e,t)}}function Q0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4iv(this.addr,t),Pe(e,t)}}function J0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function tv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2uiv(this.addr,t),Pe(e,t)}}function ev(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3uiv(this.addr,t),Pe(e,t)}}function nv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4uiv(this.addr,t),Pe(e,t)}}function iv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Mu.compareFunction=ff,s=Mu):s=wf,e.setTexture2D(t||s,r)}function rv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Cf,r)}function sv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Rf,r)}function ov(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Af,r)}function av(n){switch(n){case 5126:return V0;case 35664:return G0;case 35665:return W0;case 35666:return X0;case 35674:return q0;case 35675:return $0;case 35676:return Y0;case 5124:case 35670:return Z0;case 35667:case 35671:return j0;case 35668:case 35672:return K0;case 35669:case 35673:return Q0;case 5125:return J0;case 36294:return tv;case 36295:return ev;case 36296:return nv;case 35678:case 36198:case 36298:case 36306:case 35682:return iv;case 35679:case 36299:case 36307:return rv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return ov}}function lv(n,t){n.uniform1fv(this.addr,t)}function cv(n,t){const e=zr(t,this.size,2);n.uniform2fv(this.addr,e)}function uv(n,t){const e=zr(t,this.size,3);n.uniform3fv(this.addr,e)}function hv(n,t){const e=zr(t,this.size,4);n.uniform4fv(this.addr,e)}function fv(n,t){const e=zr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function dv(n,t){const e=zr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function pv(n,t){const e=zr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function mv(n,t){n.uniform1iv(this.addr,t)}function _v(n,t){n.uniform2iv(this.addr,t)}function gv(n,t){n.uniform3iv(this.addr,t)}function vv(n,t){n.uniform4iv(this.addr,t)}function xv(n,t){n.uniform1uiv(this.addr,t)}function yv(n,t){n.uniform2uiv(this.addr,t)}function Sv(n,t){n.uniform3uiv(this.addr,t)}function Mv(n,t){n.uniform4uiv(this.addr,t)}function Ev(n,t,e){const i=this.cache,r=t.length,s=Uo(e,r);Re(i,s)||(n.uniform1iv(this.addr,s),Pe(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||wf,s[o])}function bv(n,t,e){const i=this.cache,r=t.length,s=Uo(e,r);Re(i,s)||(n.uniform1iv(this.addr,s),Pe(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Cf,s[o])}function Tv(n,t,e){const i=this.cache,r=t.length,s=Uo(e,r);Re(i,s)||(n.uniform1iv(this.addr,s),Pe(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Rf,s[o])}function wv(n,t,e){const i=this.cache,r=t.length,s=Uo(e,r);Re(i,s)||(n.uniform1iv(this.addr,s),Pe(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Af,s[o])}function Av(n){switch(n){case 5126:return lv;case 35664:return cv;case 35665:return uv;case 35666:return hv;case 35674:return fv;case 35675:return dv;case 35676:return pv;case 5124:case 35670:return mv;case 35667:case 35671:return _v;case 35668:case 35672:return gv;case 35669:case 35673:return vv;case 5125:return xv;case 36294:return yv;case 36295:return Sv;case 36296:return Mv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return bv;case 35680:case 36300:case 36308:case 36293:return Tv;case 36289:case 36303:case 36311:case 36292:return wv}}class Cv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=av(e.type)}}class Rv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Av(e.type)}}class Pv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function Cu(n,t){n.seq.push(t),n.map[t.id]=t}function Dv(n,t,e){const i=n.name,r=i.length;for(Ta.lastIndex=0;;){const s=Ta.exec(i),o=Ta.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Cu(e,c===void 0?new Cv(a,n,t):new Rv(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new Pv(a),Cu(e,u)),e=u}}}class fo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Dv(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Ru(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Lv=37297;let Uv=0;function Iv(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Pu=new Ht;function Ov(n){Jt._getMatrix(Pu,Jt.workingColorSpace,n);const t=`mat3( ${Pu.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(n)){case So:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Du(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Iv(n.getShaderSource(t),o)}else return r}function Nv(n,t){const e=Ov(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Fv(n,t){let e;switch(t){case jh:e="Linear";break;case Kh:e="Reinhard";break;case Qh:e="Cineon";break;case $l:e="ACESFilmic";break;case tf:e="AgX";break;case ef:e="Neutral";break;case Jh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ks=new k;function kv(){Jt.getLuminanceCoefficients(Ks);const n=Ks.x.toFixed(4),t=Ks.y.toFixed(4),e=Ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ts).join(`
`)}function Bv(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Hv(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ts(n){return n!==""}function Lu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ll(n){return n.replace(Vv,Wv)}const Gv=new Map;function Wv(n,t){let e=Gt[t];if(e===void 0){const i=Gv.get(t);if(i!==void 0)e=Gt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ll(e)}const Xv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Iu(n){return n.replace(Xv,qv)}function qv(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ou(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $v(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===$h?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ip?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(t="SHADOWMAP_TYPE_VSM"),t}function Yv(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Dr:case Lr:t="ENVMAP_TYPE_CUBE";break;case Do:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Zv(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Lr:t="ENVMAP_MODE_REFRACTION";break}return t}function jv(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Zh:t="ENVMAP_BLENDING_MULTIPLY";break;case yp:t="ENVMAP_BLENDING_MIX";break;case Sp:t="ENVMAP_BLENDING_ADD";break}return t}function Kv(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Qv(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=$v(e),c=Yv(e),h=Zv(e),u=jv(e),d=Kv(e),f=zv(e),_=Bv(s),g=r.createProgram();let m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ts).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ts).join(`
`),p.length>0&&(p+=`
`)):(m=[Ou(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),p=[Ou(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ti?"#define TONE_MAPPING":"",e.toneMapping!==Ti?Gt.tonemapping_pars_fragment:"",e.toneMapping!==Ti?Fv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,Nv("linearToOutputTexel",e.outputColorSpace),kv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ts).join(`
`)),o=Ll(o),o=Lu(o,e),o=Uu(o,e),a=Ll(a),a=Lu(a,e),a=Uu(a,e),o=Iu(o),a=Iu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+m+o,S=v+p+a,w=Ru(r,r.VERTEX_SHADER,y),b=Ru(r,r.FRAGMENT_SHADER,S);r.attachShader(g,w),r.attachShader(g,b),e.index0AttributeName!==void 0?r.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function A(R){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(g).trim(),N=r.getShaderInfoLog(w).trim(),X=r.getShaderInfoLog(b).trim();let G=!0,Y=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,w,b);else{const Q=Du(r,w,"vertex"),Z=Du(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+D+`
`+Q+`
`+Z)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(N===""||X==="")&&(Y=!1);Y&&(R.diagnostics={runnable:G,programLog:D,vertexShader:{log:N,prefix:m},fragmentShader:{log:X,prefix:p}})}r.deleteShader(w),r.deleteShader(b),L=new fo(r,g),E=Hv(r,g)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(g,Lv)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Uv++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=b,this}let Jv=0;class tx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new ex(t),e.set(t,i)),i}}class ex{constructor(t){this.id=Jv++,this.code=t,this.usedTimes=0}}function nx(n,t,e,i,r,s,o){const a=new ic,l=new tx,c=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let f=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,x,R,D,N){const X=D.fog,G=N.geometry,Y=E.isMeshStandardMaterial?D.environment:null,Q=(E.isMeshStandardMaterial?e:t).get(E.envMap||Y),Z=Q&&Q.mapping===Do?Q.image.height:null,at=_[E.type];E.precision!==null&&(f=r.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const P=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,gt=P!==void 0?P.length:0;let Ut=0;G.morphAttributes.position!==void 0&&(Ut=1),G.morphAttributes.normal!==void 0&&(Ut=2),G.morphAttributes.color!==void 0&&(Ut=3);let O,J,lt,ft;if(at){const se=tn[at];O=se.vertexShader,J=se.fragmentShader}else O=E.vertexShader,J=E.fragmentShader,l.update(E),lt=l.getVertexShaderID(E),ft=l.getFragmentShaderID(E);const ht=n.getRenderTarget(),St=n.state.buffers.depth.getReversed(),Wt=N.isInstancedMesh===!0,wt=N.isBatchedMesh===!0,ce=!!E.map,_e=!!E.matcap,Qt=!!Q,F=!!E.aoMap,De=!!E.lightMap,Zt=!!E.bumpMap,re=!!E.normalMap,Tt=!!E.displacementMap,$t=!!E.emissiveMap,At=!!E.metalnessMap,kt=!!E.roughnessMap,Me=E.anisotropy>0,U=E.clearcoat>0,T=E.dispersion>0,q=E.iridescence>0,I=E.sheen>0,B=E.transmission>0,W=Me&&!!E.anisotropyMap,rt=U&&!!E.clearcoatMap,nt=U&&!!E.clearcoatNormalMap,mt=U&&!!E.clearcoatRoughnessMap,xt=q&&!!E.iridescenceMap,tt=q&&!!E.iridescenceThicknessMap,_t=I&&!!E.sheenColorMap,Ct=I&&!!E.sheenRoughnessMap,yt=!!E.specularMap,ct=!!E.specularColorMap,Rt=!!E.specularIntensityMap,z=B&&!!E.transmissionMap,dt=B&&!!E.thicknessMap,it=!!E.gradientMap,Mt=!!E.alphaMap,st=E.alphaTest>0,et=!!E.alphaHash,Et=!!E.extensions;let Ft=Ti;E.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Ft=n.toneMapping);const ge={shaderID:at,shaderType:E.type,shaderName:E.name,vertexShader:O,fragmentShader:J,defines:E.defines,customVertexShaderID:lt,customFragmentShaderID:ft,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:wt,batchingColor:wt&&N._colorsTexture!==null,instancing:Wt,instancingColor:Wt&&N.instanceColor!==null,instancingMorph:Wt&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Ur,alphaToCoverage:!!E.alphaToCoverage,map:ce,matcap:_e,envMap:Qt,envMapMode:Qt&&Q.mapping,envMapCubeUVHeight:Z,aoMap:F,lightMap:De,bumpMap:Zt,normalMap:re,displacementMap:d&&Tt,emissiveMap:$t,normalMapObjectSpace:re&&E.normalMapType===wp,normalMapTangentSpace:re&&E.normalMapType===Tp,metalnessMap:At,roughnessMap:kt,anisotropy:Me,anisotropyMap:W,clearcoat:U,clearcoatMap:rt,clearcoatNormalMap:nt,clearcoatRoughnessMap:mt,dispersion:T,iridescence:q,iridescenceMap:xt,iridescenceThicknessMap:tt,sheen:I,sheenColorMap:_t,sheenRoughnessMap:Ct,specularMap:yt,specularColorMap:ct,specularIntensityMap:Rt,transmission:B,transmissionMap:z,thicknessMap:dt,gradientMap:it,opaque:E.transparent===!1&&E.blending===wr&&E.alphaToCoverage===!1,alphaMap:Mt,alphaTest:st,alphaHash:et,combine:E.combine,mapUv:ce&&g(E.map.channel),aoMapUv:F&&g(E.aoMap.channel),lightMapUv:De&&g(E.lightMap.channel),bumpMapUv:Zt&&g(E.bumpMap.channel),normalMapUv:re&&g(E.normalMap.channel),displacementMapUv:Tt&&g(E.displacementMap.channel),emissiveMapUv:$t&&g(E.emissiveMap.channel),metalnessMapUv:At&&g(E.metalnessMap.channel),roughnessMapUv:kt&&g(E.roughnessMap.channel),anisotropyMapUv:W&&g(E.anisotropyMap.channel),clearcoatMapUv:rt&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:nt&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&g(E.sheenRoughnessMap.channel),specularMapUv:yt&&g(E.specularMap.channel),specularColorMapUv:ct&&g(E.specularColorMap.channel),specularIntensityMapUv:Rt&&g(E.specularIntensityMap.channel),transmissionMapUv:z&&g(E.transmissionMap.channel),thicknessMapUv:dt&&g(E.thicknessMap.channel),alphaMapUv:Mt&&g(E.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(re||Me),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!G.attributes.uv&&(ce||Mt),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:St,skinning:N.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:Ut,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ft,decodeVideoTexture:ce&&E.map.isVideoTexture===!0&&Jt.getTransfer(E.map.colorSpace)===ae,decodeVideoTextureEmissive:$t&&E.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(E.emissiveMap.colorSpace)===ae,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ei,flipSided:E.side===rn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Et&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&E.extensions.multiDraw===!0||wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function p(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)x.push(R),x.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(v(x,E),y(x,E),x.push(n.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function v(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function y(E,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),E.push(a.mask)}function S(E){const x=_[E.type];let R;if(x){const D=tn[x];R=Ki.clone(D.uniforms)}else R=E.uniforms;return R}function w(E,x){let R;for(let D=0,N=h.length;D<N;D++){const X=h[D];if(X.cacheKey===x){R=X,++R.usedTimes;break}}return R===void 0&&(R=new Qv(n,x,E,s),h.push(R)),R}function b(E){if(--E.usedTimes===0){const x=h.indexOf(E);h[x]=h[h.length-1],h.pop(),E.destroy()}}function A(E){l.remove(E)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:w,releaseProgram:b,releaseShaderCache:A,programs:h,dispose:L}}function ix(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function rx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Nu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Fu(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(u,d,f,_,g,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=g,p.group=m),t++,p}function a(u,d,f,_,g,m){const p=o(u,d,f,_,g,m);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):e.push(p)}function l(u,d,f,_,g,m){const p=o(u,d,f,_,g,m);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||rx),i.length>1&&i.sort(d||Nu),r.length>1&&r.sort(d||Nu)}function h(){for(let u=t,d=n.length;u<d;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function sx(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new Fu,n.set(i,[o])):r>=s.length?(o=new Fu,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function ox(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new jt};break;case"SpotLight":e={position:new k,direction:new k,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function ax(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let lx=0;function cx(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function ux(n){const t=new ox,e=ax(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new me,o=new me;function a(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,_=0,g=0,m=0,p=0,v=0,y=0,S=0,w=0,b=0,A=0;c.sort(cx);for(let E=0,x=c.length;E<x;E++){const R=c[E],D=R.color,N=R.intensity,X=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=D.r*N,u+=D.g*N,d+=D.b*N;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(R.sh.coefficients[Y],N);A++}else if(R.isDirectionalLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Q=R.shadow,Z=e.get(R);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,i.directionalShadow[f]=Z,i.directionalShadowMap[f]=G,i.directionalShadowMatrix[f]=R.shadow.matrix,v++}i.directional[f]=Y,f++}else if(R.isSpotLight){const Y=t.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(D).multiplyScalar(N),Y.distance=X,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,i.spot[g]=Y;const Q=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,Q.updateMatrices(R),R.castShadow&&b++),i.spotLightMatrix[g]=Q.matrix,R.castShadow){const Z=e.get(R);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,i.spotShadow[g]=Z,i.spotShadowMap[g]=G,S++}g++}else if(R.isRectAreaLight){const Y=t.get(R);Y.color.copy(D).multiplyScalar(N),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=Y,m++}else if(R.isPointLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const Q=R.shadow,Z=e.get(R);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,Z.shadowCameraNear=Q.camera.near,Z.shadowCameraFar=Q.camera.far,i.pointShadow[_]=Z,i.pointShadowMap[_]=G,i.pointShadowMatrix[_]=R.shadow.matrix,y++}i.point[_]=Y,_++}else if(R.isHemisphereLight){const Y=t.get(R);Y.skyColor.copy(R.color).multiplyScalar(N),Y.groundColor.copy(R.groundColor).multiplyScalar(N),i.hemi[p]=Y,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const L=i.hash;(L.directionalLength!==f||L.pointLength!==_||L.spotLength!==g||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==v||L.numPointShadows!==y||L.numSpotShadows!==S||L.numSpotMaps!==w||L.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=S+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,L.directionalLength=f,L.pointLength=_,L.spotLength=g,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=v,L.numPointShadows=y,L.numSpotShadows=S,L.numSpotMaps=w,L.numLightProbes=A,i.version=lx++)}function l(c,h){let u=0,d=0,f=0,_=0,g=0;const m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const y=c[p];if(y.isDirectionalLight){const S=i.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),u++}else if(y.isSpotLight){const S=i.spot[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const S=i.hemi[g];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:i}}function ku(n){const t=new ux(n),e=[],i=[];function r(h){c.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function hx(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new ku(n),t.set(r,[a])):s>=o.length?(a=new ku(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const fx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function px(n,t,e){let i=new sc;const r=new zt,s=new zt,o=new he,a=new Fm({depthPacking:bp}),l=new km,c={},h=e.maxTextureSize,u={[wi]:rn,[rn]:wi,[ei]:ei},d=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:fx,fragmentShader:dx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new fn;_.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Un(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$h;let p=this.type;this.render=function(b,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const E=n.getRenderTarget(),x=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),D=n.state;D.setBlending(ri),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const N=p!==Jn&&this.type===Jn,X=p===Jn&&this.type!==Jn;for(let G=0,Y=b.length;G<Y;G++){const Q=b[G],Z=Q.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const at=Z.getFrameExtents();if(r.multiply(at),s.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/at.x),r.x=s.x*at.x,Z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/at.y),r.y=s.y*at.y,Z.mapSize.y=s.y)),Z.map===null||N===!0||X===!0){const gt=this.type!==Jn?{minFilter:$e,magFilter:$e}:{};Z.map!==null&&Z.map.dispose(),Z.map=new On(r.x,r.y,gt),Z.map.texture.name=Q.name+".shadowMap",Z.camera.updateProjectionMatrix()}n.setRenderTarget(Z.map),n.clear();const P=Z.getViewportCount();for(let gt=0;gt<P;gt++){const Ut=Z.getViewport(gt);o.set(s.x*Ut.x,s.y*Ut.y,s.x*Ut.z,s.y*Ut.w),D.viewport(o),Z.updateMatrices(Q,gt),i=Z.getFrustum(),S(A,L,Z.camera,Q,this.type)}Z.isPointLightShadow!==!0&&this.type===Jn&&v(Z,L),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,x,R)};function v(b,A){const L=t.update(g);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new On(r.x,r.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,L,d,g,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,L,f,g,null)}function y(b,A,L,E){let x=null;const R=L.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)x=R;else if(x=L.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=x.uuid,N=A.uuid;let X=c[D];X===void 0&&(X={},c[D]=X);let G=X[N];G===void 0&&(G=x.clone(),X[N]=G,A.addEventListener("dispose",w)),x=G}if(x.visible=A.visible,x.wireframe=A.wireframe,E===Jn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,L.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const D=n.properties.get(x);D.light=L}return x}function S(b,A,L,E,x){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&x===Jn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,b.matrixWorld);const N=t.update(b),X=b.material;if(Array.isArray(X)){const G=N.groups;for(let Y=0,Q=G.length;Y<Q;Y++){const Z=G[Y],at=X[Z.materialIndex];if(at&&at.visible){const P=y(b,at,E,x);b.onBeforeShadow(n,b,A,L,N,P,Z),n.renderBufferDirect(L,null,N,P,b,Z),b.onAfterShadow(n,b,A,L,N,P,Z)}}}else if(X.visible){const G=y(b,X,E,x);b.onBeforeShadow(n,b,A,L,N,G,null),n.renderBufferDirect(L,null,N,G,b,null),b.onAfterShadow(n,b,A,L,N,G,null)}}const D=b.children;for(let N=0,X=D.length;N<X;N++)S(D[N],A,L,E,x)}function w(b){b.target.removeEventListener("dispose",w);for(const L in c){const E=c[L],x=b.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}const mx={[Xa]:qa,[$a]:ja,[Ya]:Ka,[Pr]:Za,[qa]:Xa,[ja]:$a,[Ka]:Ya,[Za]:Pr};function _x(n,t){function e(){let z=!1;const dt=new he;let it=null;const Mt=new he(0,0,0,0);return{setMask:function(st){it!==st&&!z&&(n.colorMask(st,st,st,st),it=st)},setLocked:function(st){z=st},setClear:function(st,et,Et,Ft,ge){ge===!0&&(st*=Ft,et*=Ft,Et*=Ft),dt.set(st,et,Et,Ft),Mt.equals(dt)===!1&&(n.clearColor(st,et,Et,Ft),Mt.copy(dt))},reset:function(){z=!1,it=null,Mt.set(-1,0,0,0)}}}function i(){let z=!1,dt=!1,it=null,Mt=null,st=null;return{setReversed:function(et){if(dt!==et){const Et=t.get("EXT_clip_control");et?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),dt=et;const Ft=st;st=null,this.setClear(Ft)}},getReversed:function(){return dt},setTest:function(et){et?ht(n.DEPTH_TEST):St(n.DEPTH_TEST)},setMask:function(et){it!==et&&!z&&(n.depthMask(et),it=et)},setFunc:function(et){if(dt&&(et=mx[et]),Mt!==et){switch(et){case Xa:n.depthFunc(n.NEVER);break;case qa:n.depthFunc(n.ALWAYS);break;case $a:n.depthFunc(n.LESS);break;case Pr:n.depthFunc(n.LEQUAL);break;case Ya:n.depthFunc(n.EQUAL);break;case Za:n.depthFunc(n.GEQUAL);break;case ja:n.depthFunc(n.GREATER);break;case Ka:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Mt=et}},setLocked:function(et){z=et},setClear:function(et){st!==et&&(dt&&(et=1-et),n.clearDepth(et),st=et)},reset:function(){z=!1,it=null,Mt=null,st=null,dt=!1}}}function r(){let z=!1,dt=null,it=null,Mt=null,st=null,et=null,Et=null,Ft=null,ge=null;return{setTest:function(se){z||(se?ht(n.STENCIL_TEST):St(n.STENCIL_TEST))},setMask:function(se){dt!==se&&!z&&(n.stencilMask(se),dt=se)},setFunc:function(se,En,Xn){(it!==se||Mt!==En||st!==Xn)&&(n.stencilFunc(se,En,Xn),it=se,Mt=En,st=Xn)},setOp:function(se,En,Xn){(et!==se||Et!==En||Ft!==Xn)&&(n.stencilOp(se,En,Xn),et=se,Et=En,Ft=Xn)},setLocked:function(se){z=se},setClear:function(se){ge!==se&&(n.clearStencil(se),ge=se)},reset:function(){z=!1,dt=null,it=null,Mt=null,st=null,et=null,Et=null,Ft=null,ge=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],_=null,g=!1,m=null,p=null,v=null,y=null,S=null,w=null,b=null,A=new jt(0,0,0),L=0,E=!1,x=null,R=null,D=null,N=null,X=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,Q=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Y=Q>=1):Z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Y=Q>=2);let at=null,P={};const gt=n.getParameter(n.SCISSOR_BOX),Ut=n.getParameter(n.VIEWPORT),O=new he().fromArray(gt),J=new he().fromArray(Ut);function lt(z,dt,it,Mt){const st=new Uint8Array(4),et=n.createTexture();n.bindTexture(z,et),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Et=0;Et<it;Et++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(dt,0,n.RGBA,1,1,Mt,0,n.RGBA,n.UNSIGNED_BYTE,st):n.texImage2D(dt+Et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,st);return et}const ft={};ft[n.TEXTURE_2D]=lt(n.TEXTURE_2D,n.TEXTURE_2D,1),ft[n.TEXTURE_CUBE_MAP]=lt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[n.TEXTURE_2D_ARRAY]=lt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ft[n.TEXTURE_3D]=lt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(Pr),Zt(!1),re(Fc),ht(n.CULL_FACE),F(ri);function ht(z){h[z]!==!0&&(n.enable(z),h[z]=!0)}function St(z){h[z]!==!1&&(n.disable(z),h[z]=!1)}function Wt(z,dt){return u[z]!==dt?(n.bindFramebuffer(z,dt),u[z]=dt,z===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=dt),z===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=dt),!0):!1}function wt(z,dt){let it=f,Mt=!1;if(z){it=d.get(dt),it===void 0&&(it=[],d.set(dt,it));const st=z.textures;if(it.length!==st.length||it[0]!==n.COLOR_ATTACHMENT0){for(let et=0,Et=st.length;et<Et;et++)it[et]=n.COLOR_ATTACHMENT0+et;it.length=st.length,Mt=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,Mt=!0);Mt&&n.drawBuffers(it)}function ce(z){return _!==z?(n.useProgram(z),_=z,!0):!1}const _e={[Si]:n.FUNC_ADD,[rp]:n.FUNC_SUBTRACT,[sp]:n.FUNC_REVERSE_SUBTRACT};_e[op]=n.MIN,_e[ap]=n.MAX;const Qt={[lp]:n.ZERO,[Va]:n.ONE,[cp]:n.SRC_COLOR,[Ga]:n.SRC_ALPHA,[mp]:n.SRC_ALPHA_SATURATE,[dp]:n.DST_COLOR,[hp]:n.DST_ALPHA,[up]:n.ONE_MINUS_SRC_COLOR,[Wa]:n.ONE_MINUS_SRC_ALPHA,[pp]:n.ONE_MINUS_DST_COLOR,[fp]:n.ONE_MINUS_DST_ALPHA,[_p]:n.CONSTANT_COLOR,[gp]:n.ONE_MINUS_CONSTANT_COLOR,[vp]:n.CONSTANT_ALPHA,[xp]:n.ONE_MINUS_CONSTANT_ALPHA};function F(z,dt,it,Mt,st,et,Et,Ft,ge,se){if(z===ri){g===!0&&(St(n.BLEND),g=!1);return}if(g===!1&&(ht(n.BLEND),g=!0),z!==Yh){if(z!==m||se!==E){if((p!==Si||S!==Si)&&(n.blendEquation(n.FUNC_ADD),p=Si,S=Si),se)switch(z){case wr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yo:n.blendFunc(n.ONE,n.ONE);break;case kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case wr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yo:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}v=null,y=null,w=null,b=null,A.set(0,0,0),L=0,m=z,E=se}return}st=st||dt,et=et||it,Et=Et||Mt,(dt!==p||st!==S)&&(n.blendEquationSeparate(_e[dt],_e[st]),p=dt,S=st),(it!==v||Mt!==y||et!==w||Et!==b)&&(n.blendFuncSeparate(Qt[it],Qt[Mt],Qt[et],Qt[Et]),v=it,y=Mt,w=et,b=Et),(Ft.equals(A)===!1||ge!==L)&&(n.blendColor(Ft.r,Ft.g,Ft.b,ge),A.copy(Ft),L=ge),m=z,E=!1}function De(z,dt){z.side===ei?St(n.CULL_FACE):ht(n.CULL_FACE);let it=z.side===rn;dt&&(it=!it),Zt(it),z.blending===wr&&z.transparent===!1?F(ri):F(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),s.setMask(z.colorWrite);const Mt=z.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),$t(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):St(n.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(z){x!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),x=z)}function re(z){z!==ep?(ht(n.CULL_FACE),z!==R&&(z===Fc?n.cullFace(n.BACK):z===np?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):St(n.CULL_FACE),R=z}function Tt(z){z!==D&&(Y&&n.lineWidth(z),D=z)}function $t(z,dt,it){z?(ht(n.POLYGON_OFFSET_FILL),(N!==dt||X!==it)&&(n.polygonOffset(dt,it),N=dt,X=it)):St(n.POLYGON_OFFSET_FILL)}function At(z){z?ht(n.SCISSOR_TEST):St(n.SCISSOR_TEST)}function kt(z){z===void 0&&(z=n.TEXTURE0+G-1),at!==z&&(n.activeTexture(z),at=z)}function Me(z,dt,it){it===void 0&&(at===null?it=n.TEXTURE0+G-1:it=at);let Mt=P[it];Mt===void 0&&(Mt={type:void 0,texture:void 0},P[it]=Mt),(Mt.type!==z||Mt.texture!==dt)&&(at!==it&&(n.activeTexture(it),at=it),n.bindTexture(z,dt||ft[z]),Mt.type=z,Mt.texture=dt)}function U(){const z=P[at];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function T(){try{n.compressedTexImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function q(){try{n.compressedTexImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function I(){try{n.texSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function B(){try{n.texSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function rt(){try{n.compressedTexSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function nt(){try{n.texStorage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function mt(){try{n.texStorage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function xt(){try{n.texImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function tt(){try{n.texImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function _t(z){O.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),O.copy(z))}function Ct(z){J.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),J.copy(z))}function yt(z,dt){let it=c.get(dt);it===void 0&&(it=new WeakMap,c.set(dt,it));let Mt=it.get(z);Mt===void 0&&(Mt=n.getUniformBlockIndex(dt,z.name),it.set(z,Mt))}function ct(z,dt){const Mt=c.get(dt).get(z);l.get(dt)!==Mt&&(n.uniformBlockBinding(dt,Mt,z.__bindingPointIndex),l.set(dt,Mt))}function Rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},at=null,P={},u={},d=new WeakMap,f=[],_=null,g=!1,m=null,p=null,v=null,y=null,S=null,w=null,b=null,A=new jt(0,0,0),L=0,E=!1,x=null,R=null,D=null,N=null,X=null,O.set(0,0,n.canvas.width,n.canvas.height),J.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ht,disable:St,bindFramebuffer:Wt,drawBuffers:wt,useProgram:ce,setBlending:F,setMaterial:De,setFlipSided:Zt,setCullFace:re,setLineWidth:Tt,setPolygonOffset:$t,setScissorTest:At,activeTexture:kt,bindTexture:Me,unbindTexture:U,compressedTexImage2D:T,compressedTexImage3D:q,texImage2D:xt,texImage3D:tt,updateUBOMapping:yt,uniformBlockBinding:ct,texStorage2D:nt,texStorage3D:mt,texSubImage2D:I,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:rt,scissor:_t,viewport:Ct,reset:Rt}}function gx(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(U,T){return f?new OffscreenCanvas(U,T):Eo("canvas")}function g(U,T,q){let I=1;const B=Me(U);if((B.width>q||B.height>q)&&(I=q/Math.max(B.width,B.height)),I<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const W=Math.floor(I*B.width),rt=Math.floor(I*B.height);u===void 0&&(u=_(W,rt));const nt=T?_(W,rt):u;return nt.width=W,nt.height=rt,nt.getContext("2d").drawImage(U,0,0,W,rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+W+"x"+rt+")."),nt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),U;return U}function m(U){return U.generateMipmaps}function p(U){n.generateMipmap(U)}function v(U){return U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?n.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(U,T,q,I,B=!1){if(U!==null){if(n[U]!==void 0)return n[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let W=T;if(T===n.RED&&(q===n.FLOAT&&(W=n.R32F),q===n.HALF_FLOAT&&(W=n.R16F),q===n.UNSIGNED_BYTE&&(W=n.R8)),T===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(W=n.R8UI),q===n.UNSIGNED_SHORT&&(W=n.R16UI),q===n.UNSIGNED_INT&&(W=n.R32UI),q===n.BYTE&&(W=n.R8I),q===n.SHORT&&(W=n.R16I),q===n.INT&&(W=n.R32I)),T===n.RG&&(q===n.FLOAT&&(W=n.RG32F),q===n.HALF_FLOAT&&(W=n.RG16F),q===n.UNSIGNED_BYTE&&(W=n.RG8)),T===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(W=n.RG8UI),q===n.UNSIGNED_SHORT&&(W=n.RG16UI),q===n.UNSIGNED_INT&&(W=n.RG32UI),q===n.BYTE&&(W=n.RG8I),q===n.SHORT&&(W=n.RG16I),q===n.INT&&(W=n.RG32I)),T===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(W=n.RGB8UI),q===n.UNSIGNED_SHORT&&(W=n.RGB16UI),q===n.UNSIGNED_INT&&(W=n.RGB32UI),q===n.BYTE&&(W=n.RGB8I),q===n.SHORT&&(W=n.RGB16I),q===n.INT&&(W=n.RGB32I)),T===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),q===n.UNSIGNED_INT&&(W=n.RGBA32UI),q===n.BYTE&&(W=n.RGBA8I),q===n.SHORT&&(W=n.RGBA16I),q===n.INT&&(W=n.RGBA32I)),T===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),T===n.RGBA){const rt=B?So:Jt.getTransfer(I);q===n.FLOAT&&(W=n.RGBA32F),q===n.HALF_FLOAT&&(W=n.RGBA16F),q===n.UNSIGNED_BYTE&&(W=rt===ae?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function S(U,T){let q;return U?T===null||T===ji||T===cs?q=n.DEPTH24_STENCIL8:T===Ln?q=n.DEPTH32F_STENCIL8:T===ls&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ji||T===cs?q=n.DEPTH_COMPONENT24:T===Ln?q=n.DEPTH_COMPONENT32F:T===ls&&(q=n.DEPTH_COMPONENT16),q}function w(U,T){return m(U)===!0||U.isFramebufferTexture&&U.minFilter!==$e&&U.minFilter!==Vn?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function b(U){const T=U.target;T.removeEventListener("dispose",b),L(T),T.isVideoTexture&&h.delete(T)}function A(U){const T=U.target;T.removeEventListener("dispose",A),x(T)}function L(U){const T=i.get(U);if(T.__webglInit===void 0)return;const q=U.source,I=d.get(q);if(I){const B=I[T.__cacheKey];B.usedTimes--,B.usedTimes===0&&E(U),Object.keys(I).length===0&&d.delete(q)}i.remove(U)}function E(U){const T=i.get(U);n.deleteTexture(T.__webglTexture);const q=U.source,I=d.get(q);delete I[T.__cacheKey],o.memory.textures--}function x(U){const T=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(T.__webglFramebuffer[I]))for(let B=0;B<T.__webglFramebuffer[I].length;B++)n.deleteFramebuffer(T.__webglFramebuffer[I][B]);else n.deleteFramebuffer(T.__webglFramebuffer[I]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[I])}else{if(Array.isArray(T.__webglFramebuffer))for(let I=0;I<T.__webglFramebuffer.length;I++)n.deleteFramebuffer(T.__webglFramebuffer[I]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let I=0;I<T.__webglColorRenderbuffer.length;I++)T.__webglColorRenderbuffer[I]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[I]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const q=U.textures;for(let I=0,B=q.length;I<B;I++){const W=i.get(q[I]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(q[I])}i.remove(U)}let R=0;function D(){R=0}function N(){const U=R;return U>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+r.maxTextures),R+=1,U}function X(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function G(U,T){const q=i.get(U);if(U.isVideoTexture&&At(U),U.isRenderTargetTexture===!1&&U.version>0&&q.__version!==U.version){const I=U.image;if(I===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(I.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ft(q,U,T);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+T)}function Y(U,T){const q=i.get(U);if(U.version>0&&q.__version!==U.version){ft(q,U,T);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+T)}function Q(U,T){const q=i.get(U);if(U.version>0&&q.__version!==U.version){ft(q,U,T);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+T)}function Z(U,T){const q=i.get(U);if(U.version>0&&q.__version!==U.version){ht(q,U,T);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+T)}const at={[tl]:n.REPEAT,[Xi]:n.CLAMP_TO_EDGE,[el]:n.MIRRORED_REPEAT},P={[$e]:n.NEAREST,[Mp]:n.NEAREST_MIPMAP_NEAREST,[Cs]:n.NEAREST_MIPMAP_LINEAR,[Vn]:n.LINEAR,[jo]:n.LINEAR_MIPMAP_NEAREST,[qi]:n.LINEAR_MIPMAP_LINEAR},gt={[Ap]:n.NEVER,[Up]:n.ALWAYS,[Cp]:n.LESS,[ff]:n.LEQUAL,[Rp]:n.EQUAL,[Lp]:n.GEQUAL,[Pp]:n.GREATER,[Dp]:n.NOTEQUAL};function Ut(U,T){if(T.type===Ln&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Vn||T.magFilter===jo||T.magFilter===Cs||T.magFilter===qi||T.minFilter===Vn||T.minFilter===jo||T.minFilter===Cs||T.minFilter===qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,at[T.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,at[T.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,at[T.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,P[T.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,P[T.minFilter]),T.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,gt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===$e||T.minFilter!==Cs&&T.minFilter!==qi||T.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(U,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function O(U,T){let q=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",b));const I=T.source;let B=d.get(I);B===void 0&&(B={},d.set(I,B));const W=X(T);if(W!==U.__cacheKey){B[W]===void 0&&(B[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),B[W].usedTimes++;const rt=B[U.__cacheKey];rt!==void 0&&(B[U.__cacheKey].usedTimes--,rt.usedTimes===0&&E(T)),U.__cacheKey=W,U.__webglTexture=B[W].texture}return q}function J(U,T,q){return Math.floor(Math.floor(U/q)/T)}function lt(U,T,q,I){const W=U.updateRanges;if(W.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,T.width,T.height,q,I,T.data);else{W.sort((tt,_t)=>tt.start-_t.start);let rt=0;for(let tt=1;tt<W.length;tt++){const _t=W[rt],Ct=W[tt],yt=_t.start+_t.count,ct=J(Ct.start,T.width,4),Rt=J(_t.start,T.width,4);Ct.start<=yt+1&&ct===Rt&&J(Ct.start+Ct.count-1,T.width,4)===ct?_t.count=Math.max(_t.count,Ct.start+Ct.count-_t.start):(++rt,W[rt]=Ct)}W.length=rt+1;const nt=n.getParameter(n.UNPACK_ROW_LENGTH),mt=n.getParameter(n.UNPACK_SKIP_PIXELS),xt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,T.width);for(let tt=0,_t=W.length;tt<_t;tt++){const Ct=W[tt],yt=Math.floor(Ct.start/4),ct=Math.ceil(Ct.count/4),Rt=yt%T.width,z=Math.floor(yt/T.width),dt=ct,it=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Rt),n.pixelStorei(n.UNPACK_SKIP_ROWS,z),e.texSubImage2D(n.TEXTURE_2D,0,Rt,z,dt,it,q,I,T.data)}U.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,nt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,mt),n.pixelStorei(n.UNPACK_SKIP_ROWS,xt)}}function ft(U,T,q){let I=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(I=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(I=n.TEXTURE_3D);const B=O(U,T),W=T.source;e.bindTexture(I,U.__webglTexture,n.TEXTURE0+q);const rt=i.get(W);if(W.version!==rt.__version||B===!0){e.activeTexture(n.TEXTURE0+q);const nt=Jt.getPrimaries(Jt.workingColorSpace),mt=T.colorSpace===Mi?null:Jt.getPrimaries(T.colorSpace),xt=T.colorSpace===Mi||nt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let tt=g(T.image,!1,r.maxTextureSize);tt=kt(T,tt);const _t=s.convert(T.format,T.colorSpace),Ct=s.convert(T.type);let yt=y(T.internalFormat,_t,Ct,T.colorSpace,T.isVideoTexture);Ut(I,T);let ct;const Rt=T.mipmaps,z=T.isVideoTexture!==!0,dt=rt.__version===void 0||B===!0,it=W.dataReady,Mt=w(T,tt);if(T.isDepthTexture)yt=S(T.format===hs,T.type),dt&&(z?e.texStorage2D(n.TEXTURE_2D,1,yt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,_t,Ct,null));else if(T.isDataTexture)if(Rt.length>0){z&&dt&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],z?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,_t,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,_t,Ct,ct.data);T.generateMipmaps=!1}else z?(dt&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height),it&&lt(T,tt,_t,Ct)):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,_t,Ct,tt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){z&&dt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,Rt[0].width,Rt[0].height,tt.depth);for(let st=0,et=Rt.length;st<et;st++)if(ct=Rt[st],T.format!==un)if(_t!==null)if(z){if(it)if(T.layerUpdates.size>0){const Et=pu(ct.width,ct.height,T.format,T.type);for(const Ft of T.layerUpdates){const ge=ct.data.subarray(Ft*Et/ct.data.BYTES_PER_ELEMENT,(Ft+1)*Et/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,Ft,ct.width,ct.height,1,_t,ge)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,ct.width,ct.height,tt.depth,_t,ct.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,st,yt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?it&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,ct.width,ct.height,tt.depth,_t,Ct,ct.data):e.texImage3D(n.TEXTURE_2D_ARRAY,st,yt,ct.width,ct.height,tt.depth,0,_t,Ct,ct.data)}else{z&&dt&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],T.format!==un?_t!==null?z?it&&e.compressedTexSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,_t,ct.data):e.compressedTexImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,_t,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,_t,Ct,ct.data)}else if(T.isDataArrayTexture)if(z){if(dt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,tt.width,tt.height,tt.depth),it)if(T.layerUpdates.size>0){const st=pu(tt.width,tt.height,T.format,T.type);for(const et of T.layerUpdates){const Et=tt.data.subarray(et*st/tt.data.BYTES_PER_ELEMENT,(et+1)*st/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,et,tt.width,tt.height,1,_t,Ct,Et)}T.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,_t,Ct,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,yt,tt.width,tt.height,tt.depth,0,_t,Ct,tt.data);else if(T.isData3DTexture)z?(dt&&e.texStorage3D(n.TEXTURE_3D,Mt,yt,tt.width,tt.height,tt.depth),it&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,_t,Ct,tt.data)):e.texImage3D(n.TEXTURE_3D,0,yt,tt.width,tt.height,tt.depth,0,_t,Ct,tt.data);else if(T.isFramebufferTexture){if(dt)if(z)e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height);else{let st=tt.width,et=tt.height;for(let Et=0;Et<Mt;Et++)e.texImage2D(n.TEXTURE_2D,Et,yt,st,et,0,_t,Ct,null),st>>=1,et>>=1}}else if(Rt.length>0){if(z&&dt){const st=Me(Rt[0]);e.texStorage2D(n.TEXTURE_2D,Mt,yt,st.width,st.height)}for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],z?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,_t,Ct,ct):e.texImage2D(n.TEXTURE_2D,st,yt,_t,Ct,ct);T.generateMipmaps=!1}else if(z){if(dt){const st=Me(tt);e.texStorage2D(n.TEXTURE_2D,Mt,yt,st.width,st.height)}it&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Ct,tt)}else e.texImage2D(n.TEXTURE_2D,0,yt,_t,Ct,tt);m(T)&&p(I),rt.__version=W.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function ht(U,T,q){if(T.image.length!==6)return;const I=O(U,T),B=T.source;e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+q);const W=i.get(B);if(B.version!==W.__version||I===!0){e.activeTexture(n.TEXTURE0+q);const rt=Jt.getPrimaries(Jt.workingColorSpace),nt=T.colorSpace===Mi?null:Jt.getPrimaries(T.colorSpace),mt=T.colorSpace===Mi||rt===nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const xt=T.isCompressedTexture||T.image[0].isCompressedTexture,tt=T.image[0]&&T.image[0].isDataTexture,_t=[];for(let et=0;et<6;et++)!xt&&!tt?_t[et]=g(T.image[et],!0,r.maxCubemapSize):_t[et]=tt?T.image[et].image:T.image[et],_t[et]=kt(T,_t[et]);const Ct=_t[0],yt=s.convert(T.format,T.colorSpace),ct=s.convert(T.type),Rt=y(T.internalFormat,yt,ct,T.colorSpace),z=T.isVideoTexture!==!0,dt=W.__version===void 0||I===!0,it=B.dataReady;let Mt=w(T,Ct);Ut(n.TEXTURE_CUBE_MAP,T);let st;if(xt){z&&dt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,Ct.width,Ct.height);for(let et=0;et<6;et++){st=_t[et].mipmaps;for(let Et=0;Et<st.length;Et++){const Ft=st[Et];T.format!==un?yt!==null?z?it&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,Ft.width,Ft.height,yt,Ft.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,Ft.width,Ft.height,yt,ct,Ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,Ft.width,Ft.height,0,yt,ct,Ft.data)}}}else{if(st=T.mipmaps,z&&dt){st.length>0&&Mt++;const et=Me(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,et.width,et.height)}for(let et=0;et<6;et++)if(tt){z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,_t[et].width,_t[et].height,yt,ct,_t[et].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,_t[et].width,_t[et].height,0,yt,ct,_t[et].data);for(let Et=0;Et<st.length;Et++){const ge=st[Et].image[et].image;z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,ge.width,ge.height,yt,ct,ge.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,ge.width,ge.height,0,yt,ct,ge.data)}}else{z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,yt,ct,_t[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,yt,ct,_t[et]);for(let Et=0;Et<st.length;Et++){const Ft=st[Et];z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,yt,ct,Ft.image[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,yt,ct,Ft.image[et])}}}m(T)&&p(n.TEXTURE_CUBE_MAP),W.__version=B.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function St(U,T,q,I,B,W){const rt=s.convert(q.format,q.colorSpace),nt=s.convert(q.type),mt=y(q.internalFormat,rt,nt,q.colorSpace),xt=i.get(T),tt=i.get(q);if(tt.__renderTarget=T,!xt.__hasExternalTextures){const _t=Math.max(1,T.width>>W),Ct=Math.max(1,T.height>>W);B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?e.texImage3D(B,W,mt,_t,Ct,T.depth,0,rt,nt,null):e.texImage2D(B,W,mt,_t,Ct,0,rt,nt,null)}e.bindFramebuffer(n.FRAMEBUFFER,U),$t(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,I,B,tt.__webglTexture,0,Tt(T)):(B===n.TEXTURE_2D||B>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&B<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,I,B,tt.__webglTexture,W),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Wt(U,T,q){if(n.bindRenderbuffer(n.RENDERBUFFER,U),T.depthBuffer){const I=T.depthTexture,B=I&&I.isDepthTexture?I.type:null,W=S(T.stencilBuffer,B),rt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=Tt(T);$t(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt,W,T.width,T.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt,W,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,W,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,U)}else{const I=T.textures;for(let B=0;B<I.length;B++){const W=I[B],rt=s.convert(W.format,W.colorSpace),nt=s.convert(W.type),mt=y(W.internalFormat,rt,nt,W.colorSpace),xt=Tt(T);q&&$t(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,mt,T.width,T.height):$t(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,mt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,mt,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function wt(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const I=i.get(T.depthTexture);I.__renderTarget=T,(!I.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),G(T.depthTexture,0);const B=I.__webglTexture,W=Tt(T);if(T.depthTexture.format===us)$t(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,B,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,B,0);else if(T.depthTexture.format===hs)$t(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,B,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,B,0);else throw new Error("Unknown depthTexture format")}function ce(U){const T=i.get(U),q=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const I=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),I){const B=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,I.removeEventListener("dispose",B)};I.addEventListener("dispose",B),T.__depthDisposeCallback=B}T.__boundDepthTexture=I}if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");const I=U.texture.mipmaps;I&&I.length>0?wt(T.__webglFramebuffer[0],U):wt(T.__webglFramebuffer,U)}else if(q){T.__webglDepthbuffer=[];for(let I=0;I<6;I++)if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[I]),T.__webglDepthbuffer[I]===void 0)T.__webglDepthbuffer[I]=n.createRenderbuffer(),Wt(T.__webglDepthbuffer[I],U,!1);else{const B=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=T.__webglDepthbuffer[I];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,W)}}else{const I=U.texture.mipmaps;if(I&&I.length>0?e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),Wt(T.__webglDepthbuffer,U,!1);else{const B=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,W)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function _e(U,T,q){const I=i.get(U);T!==void 0&&St(I.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&ce(U)}function Qt(U){const T=U.texture,q=i.get(U),I=i.get(T);U.addEventListener("dispose",A);const B=U.textures,W=U.isWebGLCubeRenderTarget===!0,rt=B.length>1;if(rt||(I.__webglTexture===void 0&&(I.__webglTexture=n.createTexture()),I.__version=T.version,o.memory.textures++),W){q.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer[nt]=[];for(let mt=0;mt<T.mipmaps.length;mt++)q.__webglFramebuffer[nt][mt]=n.createFramebuffer()}else q.__webglFramebuffer[nt]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer=[];for(let nt=0;nt<T.mipmaps.length;nt++)q.__webglFramebuffer[nt]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(rt)for(let nt=0,mt=B.length;nt<mt;nt++){const xt=i.get(B[nt]);xt.__webglTexture===void 0&&(xt.__webglTexture=n.createTexture(),o.memory.textures++)}if(U.samples>0&&$t(U)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let nt=0;nt<B.length;nt++){const mt=B[nt];q.__webglColorRenderbuffer[nt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[nt]);const xt=s.convert(mt.format,mt.colorSpace),tt=s.convert(mt.type),_t=y(mt.internalFormat,xt,tt,mt.colorSpace,U.isXRRenderTarget===!0),Ct=Tt(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ct,_t,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.RENDERBUFFER,q.__webglColorRenderbuffer[nt])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),Wt(q.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){e.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture),Ut(n.TEXTURE_CUBE_MAP,T);for(let nt=0;nt<6;nt++)if(T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)St(q.__webglFramebuffer[nt][mt],U,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,mt);else St(q.__webglFramebuffer[nt],U,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(T)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let nt=0,mt=B.length;nt<mt;nt++){const xt=B[nt],tt=i.get(xt);e.bindTexture(n.TEXTURE_2D,tt.__webglTexture),Ut(n.TEXTURE_2D,xt),St(q.__webglFramebuffer,U,xt,n.COLOR_ATTACHMENT0+nt,n.TEXTURE_2D,0),m(xt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let nt=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(nt=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(nt,I.__webglTexture),Ut(nt,T),T.mipmaps&&T.mipmaps.length>0)for(let mt=0;mt<T.mipmaps.length;mt++)St(q.__webglFramebuffer[mt],U,T,n.COLOR_ATTACHMENT0,nt,mt);else St(q.__webglFramebuffer,U,T,n.COLOR_ATTACHMENT0,nt,0);m(T)&&p(nt),e.unbindTexture()}U.depthBuffer&&ce(U)}function F(U){const T=U.textures;for(let q=0,I=T.length;q<I;q++){const B=T[q];if(m(B)){const W=v(U),rt=i.get(B).__webglTexture;e.bindTexture(W,rt),p(W),e.unbindTexture()}}}const De=[],Zt=[];function re(U){if(U.samples>0){if($t(U)===!1){const T=U.textures,q=U.width,I=U.height;let B=n.COLOR_BUFFER_BIT;const W=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=i.get(U),nt=T.length>1;if(nt)for(let xt=0;xt<T.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);const mt=U.texture.mipmaps;mt&&mt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let xt=0;xt<T.length;xt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(B|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(B|=n.STENCIL_BUFFER_BIT)),nt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,rt.__webglColorRenderbuffer[xt]);const tt=i.get(T[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,q,I,0,0,q,I,B,n.NEAREST),l===!0&&(De.length=0,Zt.length=0,De.push(n.COLOR_ATTACHMENT0+xt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(De.push(W),Zt.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Zt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,De))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),nt)for(let xt=0;xt<T.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,rt.__webglColorRenderbuffer[xt]);const tt=i.get(T[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){const T=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function Tt(U){return Math.min(r.maxSamples,U.samples)}function $t(U){const T=i.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function At(U){const T=o.render.frame;h.get(U)!==T&&(h.set(U,T),U.update())}function kt(U,T){const q=U.colorSpace,I=U.format,B=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||q!==Ur&&q!==Mi&&(Jt.getTransfer(q)===ae?(I!==un||B!==ci)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),T}function Me(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=D,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=Q,this.setTextureCube=Z,this.rebindTextures=_e,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=St,this.useMultisampledRTT=$t}function vx(n,t){function e(i,r=Mi){let s;const o=Jt.getTransfer(r);if(i===ci)return n.UNSIGNED_BYTE;if(i===Zl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===jl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===of)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===rf)return n.BYTE;if(i===sf)return n.SHORT;if(i===ls)return n.UNSIGNED_SHORT;if(i===Yl)return n.INT;if(i===ji)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===si)return n.HALF_FLOAT;if(i===af)return n.ALPHA;if(i===lf)return n.RGB;if(i===un)return n.RGBA;if(i===us)return n.DEPTH_COMPONENT;if(i===hs)return n.DEPTH_STENCIL;if(i===cf)return n.RED;if(i===Kl)return n.RED_INTEGER;if(i===uf)return n.RG;if(i===Ql)return n.RG_INTEGER;if(i===Jl)return n.RGBA_INTEGER;if(i===ao||i===lo||i===co||i===uo)if(o===ae)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ao)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===lo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ao)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===lo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===co)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===uo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nl||i===il||i===rl||i===sl)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===nl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===il)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ol||i===al||i===ll)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ol||i===al)return o===ae?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ll)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===cl||i===ul||i===hl||i===fl||i===dl||i===pl||i===ml||i===_l||i===gl||i===vl||i===xl||i===yl||i===Sl||i===Ml)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===cl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ul)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===fl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===dl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===pl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ml)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_l)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===vl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===xl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Sl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ml)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ho||i===El||i===bl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ho)return o===ae?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===El)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hf||i===Tl||i===wl||i===Al)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===ho)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Tl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Al)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const xx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Sx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Ye,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ue({vertexShader:xx,fragmentShader:yx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Un(new Lo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Mx extends Fr{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,_=null;const g=new Sx,m=e.getContextAttributes();let p=null,v=null;const y=[],S=[],w=new zt;let b=null;const A=new xn;A.viewport=new he;const L=new xn;L.viewport=new he;const E=[A,L],x=new Bm;let R=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let lt=y[J];return lt===void 0&&(lt=new ga,y[J]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function(J){let lt=y[J];return lt===void 0&&(lt=new ga,y[J]=lt),lt.getGripSpace()},this.getHand=function(J){let lt=y[J];return lt===void 0&&(lt=new ga,y[J]=lt),lt.getHandSpace()};function N(J){const lt=S.indexOf(J.inputSource);if(lt===-1)return;const ft=y[lt];ft!==void 0&&(ft.update(J.inputSource,J.frame,c||o),ft.dispatchEvent({type:J.type,data:J.inputSource}))}function X(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",G);for(let J=0;J<y.length;J++){const lt=S[J];lt!==null&&(S[J]=null,y[J].disconnect(lt))}R=null,D=null,g.reset(),t.setRenderTarget(p),f=null,d=null,u=null,r=null,v=null,O.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",X),r.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,ht=null,St=null;m.depth&&(St=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=m.stencil?hs:us,ht=m.stencil?cs:ji);const Wt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:s};u=new XRWebGLBinding(r,e),d=u.createProjectionLayer(Wt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new On(d.textureWidth,d.textureHeight,{format:un,type:ci,depthTexture:new Mf(d.textureWidth,d.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ft={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,ft),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new On(f.framebufferWidth,f.framebufferHeight,{format:un,type:ci,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),O.setContext(r),O.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(J){for(let lt=0;lt<J.removed.length;lt++){const ft=J.removed[lt],ht=S.indexOf(ft);ht>=0&&(S[ht]=null,y[ht].disconnect(ft))}for(let lt=0;lt<J.added.length;lt++){const ft=J.added[lt];let ht=S.indexOf(ft);if(ht===-1){for(let Wt=0;Wt<y.length;Wt++)if(Wt>=S.length){S.push(ft),ht=Wt;break}else if(S[Wt]===null){S[Wt]=ft,ht=Wt;break}if(ht===-1)break}const St=y[ht];St&&St.connect(ft)}}const Y=new k,Q=new k;function Z(J,lt,ft){Y.setFromMatrixPosition(lt.matrixWorld),Q.setFromMatrixPosition(ft.matrixWorld);const ht=Y.distanceTo(Q),St=lt.projectionMatrix.elements,Wt=ft.projectionMatrix.elements,wt=St[14]/(St[10]-1),ce=St[14]/(St[10]+1),_e=(St[9]+1)/St[5],Qt=(St[9]-1)/St[5],F=(St[8]-1)/St[0],De=(Wt[8]+1)/Wt[0],Zt=wt*F,re=wt*De,Tt=ht/(-F+De),$t=Tt*-F;if(lt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX($t),J.translateZ(Tt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),St[10]===-1)J.projectionMatrix.copy(lt.projectionMatrix),J.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{const At=wt+Tt,kt=ce+Tt,Me=Zt-$t,U=re+(ht-$t),T=_e*ce/kt*At,q=Qt*ce/kt*At;J.projectionMatrix.makePerspective(Me,U,T,q,At,kt),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function at(J,lt){lt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(lt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let lt=J.near,ft=J.far;g.texture!==null&&(g.depthNear>0&&(lt=g.depthNear),g.depthFar>0&&(ft=g.depthFar)),x.near=L.near=A.near=lt,x.far=L.far=A.far=ft,(R!==x.near||D!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,D=x.far),A.layers.mask=J.layers.mask|2,L.layers.mask=J.layers.mask|4,x.layers.mask=A.layers.mask|L.layers.mask;const ht=J.parent,St=x.cameras;at(x,ht);for(let Wt=0;Wt<St.length;Wt++)at(St[Wt],ht);St.length===2?Z(x,A,L):x.projectionMatrix.copy(A.projectionMatrix),P(J,x,ht)};function P(J,lt,ft){ft===null?J.matrix.copy(lt.matrixWorld):(J.matrix.copy(ft.matrixWorld),J.matrix.invert(),J.matrix.multiply(lt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(lt.projectionMatrix),J.projectionMatrixInverse.copy(lt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=fs*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let gt=null;function Ut(J,lt){if(h=lt.getViewerPose(c||o),_=lt,h!==null){const ft=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let ht=!1;ft.length!==x.cameras.length&&(x.cameras.length=0,ht=!0);for(let wt=0;wt<ft.length;wt++){const ce=ft[wt];let _e=null;if(f!==null)_e=f.getViewport(ce);else{const F=u.getViewSubImage(d,ce);_e=F.viewport,wt===0&&(t.setRenderTargetTextures(v,F.colorTexture,F.depthStencilTexture),t.setRenderTarget(v))}let Qt=E[wt];Qt===void 0&&(Qt=new xn,Qt.layers.enable(wt),Qt.viewport=new he,E[wt]=Qt),Qt.matrix.fromArray(ce.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(ce.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(_e.x,_e.y,_e.width,_e.height),wt===0&&(x.matrix.copy(Qt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ht===!0&&x.cameras.push(Qt)}const St=r.enabledFeatures;if(St&&St.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&u){const wt=u.getDepthInformation(ft[0]);wt&&wt.isValid&&wt.texture&&g.init(t,wt,r.renderState)}}for(let ft=0;ft<y.length;ft++){const ht=S[ft],St=y[ft];ht!==null&&St!==void 0&&St.update(ht,lt,c||o)}gt&&gt(J,lt),lt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:lt}),_=null}const O=new Tf;O.setAnimationLoop(Ut),this.setAnimationLoop=function(J){gt=J},this.dispose=function(){}}}const zi=new ui,Ex=new me;function bx(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,vf(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,v,y,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p),y=v.envMap,S=v.envMapRotation;y&&(m.envMap.value=y,zi.copy(S),zi.x*=-1,zi.y*=-1,zi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),m.envMapRotation.value.setFromMatrix4(Ex.makeRotationFromEuler(zi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Tx(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const S=y.program;i.uniformBlockBinding(v,S)}function c(v,y){let S=r[v.id];S===void 0&&(_(v),S=h(v),r[v.id]=S,v.addEventListener("dispose",m));const w=y.program;i.updateUBOMapping(v,w);const b=t.render.frame;s[v.id]!==b&&(d(v),s[v.id]=b)}function h(v){const y=u();v.__bindingPointIndex=y;const S=n.createBuffer(),w=v.__size,b=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,w,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,S),S}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=r[v.id],S=v.uniforms,w=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let b=0,A=S.length;b<A;b++){const L=Array.isArray(S[b])?S[b]:[S[b]];for(let E=0,x=L.length;E<x;E++){const R=L[E];if(f(R,b,E,w)===!0){const D=R.__offset,N=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let G=0;G<N.length;G++){const Y=N[G],Q=g(Y);typeof Y=="number"||typeof Y=="boolean"?(R.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,D+X,R.__data)):Y.isMatrix3?(R.__data[0]=Y.elements[0],R.__data[1]=Y.elements[1],R.__data[2]=Y.elements[2],R.__data[3]=0,R.__data[4]=Y.elements[3],R.__data[5]=Y.elements[4],R.__data[6]=Y.elements[5],R.__data[7]=0,R.__data[8]=Y.elements[6],R.__data[9]=Y.elements[7],R.__data[10]=Y.elements[8],R.__data[11]=0):(Y.toArray(R.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,y,S,w){const b=v.value,A=y+"_"+S;if(w[A]===void 0)return typeof b=="number"||typeof b=="boolean"?w[A]=b:w[A]=b.clone(),!0;{const L=w[A];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return w[A]=b,!0}else if(L.equals(b)===!1)return L.copy(b),!0}return!1}function _(v){const y=v.uniforms;let S=0;const w=16;for(let A=0,L=y.length;A<L;A++){const E=Array.isArray(y[A])?y[A]:[y[A]];for(let x=0,R=E.length;x<R;x++){const D=E[x],N=Array.isArray(D.value)?D.value:[D.value];for(let X=0,G=N.length;X<G;X++){const Y=N[X],Q=g(Y),Z=S%w,at=Z%Q.boundary,P=Z+at;S+=at,P!==0&&w-P<Q.storage&&(S+=w-P),D.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=Q.storage}}}const b=S%w;return b>0&&(S+=w-b),v.__size=S,v.__cache={},this}function g(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){const y=v.target;y.removeEventListener("dispose",m);const S=o.indexOf(y.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function p(){for(const v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class wx{constructor(t={}){const{canvas:e=Qp(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let w=!1;this._outputColorSpace=vn;let b=0,A=0,L=null,E=-1,x=null;const R=new he,D=new he;let N=null;const X=new jt(0);let G=0,Y=e.width,Q=e.height,Z=1,at=null,P=null;const gt=new he(0,0,Y,Q),Ut=new he(0,0,Y,Q);let O=!1;const J=new sc;let lt=!1,ft=!1;const ht=new me,St=new me,Wt=new k,wt=new he,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _e=!1;function Qt(){return L===null?Z:1}let F=i;function De(C,H){return e.getContext(C,H)}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ql}`),e.addEventListener("webglcontextlost",Mt,!1),e.addEventListener("webglcontextrestored",st,!1),e.addEventListener("webglcontextcreationerror",et,!1),F===null){const H="webgl2";if(F=De(H,C),F===null)throw De(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Zt,re,Tt,$t,At,kt,Me,U,T,q,I,B,W,rt,nt,mt,xt,tt,_t,Ct,yt,ct,Rt,z;function dt(){Zt=new N0(F),Zt.init(),ct=new vx(F,Zt),re=new R0(F,Zt,t,ct),Tt=new _x(F,Zt),re.reverseDepthBuffer&&d&&Tt.buffers.depth.setReversed(!0),$t=new z0(F),At=new ix,kt=new gx(F,Zt,Tt,At,re,ct,$t),Me=new D0(S),U=new O0(S),T=new Xm(F),Rt=new A0(F,T),q=new F0(F,T,$t,Rt),I=new H0(F,q,T,$t),_t=new B0(F,re,kt),mt=new P0(At),B=new nx(S,Me,U,Zt,re,Rt,mt),W=new bx(S,At),rt=new sx,nt=new hx(Zt),tt=new w0(S,Me,U,Tt,I,f,l),xt=new px(S,I,re),z=new Tx(F,$t,re,Tt),Ct=new C0(F,Zt,$t),yt=new k0(F,Zt,$t),$t.programs=B.programs,S.capabilities=re,S.extensions=Zt,S.properties=At,S.renderLists=rt,S.shadowMap=xt,S.state=Tt,S.info=$t}dt();const it=new Mx(S,F);this.xr=it,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const C=Zt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Zt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(C){C!==void 0&&(Z=C,this.setSize(Y,Q,!1))},this.getSize=function(C){return C.set(Y,Q)},this.setSize=function(C,H,j=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=C,Q=H,e.width=Math.floor(C*Z),e.height=Math.floor(H*Z),j===!0&&(e.style.width=C+"px",e.style.height=H+"px"),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(Y*Z,Q*Z).floor()},this.setDrawingBufferSize=function(C,H,j){Y=C,Q=H,Z=j,e.width=Math.floor(C*j),e.height=Math.floor(H*j),this.setViewport(0,0,C,H)},this.getCurrentViewport=function(C){return C.copy(R)},this.getViewport=function(C){return C.copy(gt)},this.setViewport=function(C,H,j,K){C.isVector4?gt.set(C.x,C.y,C.z,C.w):gt.set(C,H,j,K),Tt.viewport(R.copy(gt).multiplyScalar(Z).round())},this.getScissor=function(C){return C.copy(Ut)},this.setScissor=function(C,H,j,K){C.isVector4?Ut.set(C.x,C.y,C.z,C.w):Ut.set(C,H,j,K),Tt.scissor(D.copy(Ut).multiplyScalar(Z).round())},this.getScissorTest=function(){return O},this.setScissorTest=function(C){Tt.setScissorTest(O=C)},this.setOpaqueSort=function(C){at=C},this.setTransparentSort=function(C){P=C},this.getClearColor=function(C){return C.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(C=!0,H=!0,j=!0){let K=0;if(C){let V=!1;if(L!==null){const ot=L.texture.format;V=ot===Jl||ot===Ql||ot===Kl}if(V){const ot=L.texture.type,pt=ot===ci||ot===ji||ot===ls||ot===cs||ot===Zl||ot===jl,bt=tt.getClearColor(),vt=tt.getClearAlpha(),It=bt.r,Nt=bt.g,Pt=bt.b;pt?(_[0]=It,_[1]=Nt,_[2]=Pt,_[3]=vt,F.clearBufferuiv(F.COLOR,0,_)):(g[0]=It,g[1]=Nt,g[2]=Pt,g[3]=vt,F.clearBufferiv(F.COLOR,0,g))}else K|=F.COLOR_BUFFER_BIT}H&&(K|=F.DEPTH_BUFFER_BIT),j&&(K|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Mt,!1),e.removeEventListener("webglcontextrestored",st,!1),e.removeEventListener("webglcontextcreationerror",et,!1),tt.dispose(),rt.dispose(),nt.dispose(),At.dispose(),Me.dispose(),U.dispose(),I.dispose(),Rt.dispose(),z.dispose(),B.dispose(),it.dispose(),it.removeEventListener("sessionstart",gc),it.removeEventListener("sessionend",vc),Ri.stop()};function Mt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function st(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const C=$t.autoReset,H=xt.enabled,j=xt.autoUpdate,K=xt.needsUpdate,V=xt.type;dt(),$t.autoReset=C,xt.enabled=H,xt.autoUpdate=j,xt.needsUpdate=K,xt.type=V}function et(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Et(C){const H=C.target;H.removeEventListener("dispose",Et),Ft(H)}function Ft(C){ge(C),At.remove(C)}function ge(C){const H=At.get(C).programs;H!==void 0&&(H.forEach(function(j){B.releaseProgram(j)}),C.isShaderMaterial&&B.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,j,K,V,ot){H===null&&(H=ce);const pt=V.isMesh&&V.matrixWorld.determinant()<0,bt=Ad(C,H,j,K,V);Tt.setMaterial(K,pt);let vt=j.index,It=1;if(K.wireframe===!0){if(vt=q.getWireframeAttribute(j),vt===void 0)return;It=2}const Nt=j.drawRange,Pt=j.attributes.position;let Yt=Nt.start*It,oe=(Nt.start+Nt.count)*It;ot!==null&&(Yt=Math.max(Yt,ot.start*It),oe=Math.min(oe,(ot.start+ot.count)*It)),vt!==null?(Yt=Math.max(Yt,0),oe=Math.min(oe,vt.count)):Pt!=null&&(Yt=Math.max(Yt,0),oe=Math.min(oe,Pt.count));const xe=oe-Yt;if(xe<0||xe===1/0)return;Rt.setup(V,K,bt,j,vt);let Se,te=Ct;if(vt!==null&&(Se=T.get(vt),te=yt,te.setIndex(Se)),V.isMesh)K.wireframe===!0?(Tt.setLineWidth(K.wireframeLinewidth*Qt()),te.setMode(F.LINES)):te.setMode(F.TRIANGLES);else if(V.isLine){let Lt=K.linewidth;Lt===void 0&&(Lt=1),Tt.setLineWidth(Lt*Qt()),V.isLineSegments?te.setMode(F.LINES):V.isLineLoop?te.setMode(F.LINE_LOOP):te.setMode(F.LINE_STRIP)}else V.isPoints?te.setMode(F.POINTS):V.isSprite&&te.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Ar("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),te.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))te.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Lt=V._multiDrawStarts,Ie=V._multiDrawCounts,ne=V._multiDrawCount,bn=vt?T.get(vt).bytesPerElement:1,ir=At.get(K).currentProgram.getUniforms();for(let an=0;an<ne;an++)ir.setValue(F,"_gl_DrawID",an),te.render(Lt[an]/bn,Ie[an])}else if(V.isInstancedMesh)te.renderInstances(Yt,xe,V.count);else if(j.isInstancedBufferGeometry){const Lt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ie=Math.min(j.instanceCount,Lt);te.renderInstances(Yt,xe,Ie)}else te.render(Yt,xe)};function se(C,H,j){C.transparent===!0&&C.side===ei&&C.forceSinglePass===!1?(C.side=rn,C.needsUpdate=!0,Ms(C,H,j),C.side=wi,C.needsUpdate=!0,Ms(C,H,j),C.side=ei):Ms(C,H,j)}this.compile=function(C,H,j=null){j===null&&(j=C),p=nt.get(j),p.init(H),y.push(p),j.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),C!==j&&C.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const K=new Set;return C.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ot=V.material;if(ot)if(Array.isArray(ot))for(let pt=0;pt<ot.length;pt++){const bt=ot[pt];se(bt,j,V),K.add(bt)}else se(ot,j,V),K.add(ot)}),p=y.pop(),K},this.compileAsync=function(C,H,j=null){const K=this.compile(C,H,j);return new Promise(V=>{function ot(){if(K.forEach(function(pt){At.get(pt).currentProgram.isReady()&&K.delete(pt)}),K.size===0){V(C);return}setTimeout(ot,10)}Zt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let En=null;function Xn(C){En&&En(C)}function gc(){Ri.stop()}function vc(){Ri.start()}const Ri=new Tf;Ri.setAnimationLoop(Xn),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(C){En=C,it.setAnimationLoop(C),C===null?Ri.stop():Ri.start()},it.addEventListener("sessionstart",gc),it.addEventListener("sessionend",vc),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(H),H=it.getCamera()),C.isScene===!0&&C.onBeforeRender(S,C,H,L),p=nt.get(C,y.length),p.init(H),y.push(p),St.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),J.setFromProjectionMatrix(St),ft=this.localClippingEnabled,lt=mt.init(this.clippingPlanes,ft),m=rt.get(C,v.length),m.init(),v.push(m),it.enabled===!0&&it.isPresenting===!0){const ot=S.xr.getDepthSensingMesh();ot!==null&&Bo(ot,H,-1/0,S.sortObjects)}Bo(C,H,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(at,P),_e=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,_e&&tt.addToRenderList(m,C),this.info.render.frame++,lt===!0&&mt.beginShadows();const j=p.state.shadowsArray;xt.render(j,C,H),lt===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,V=m.transmissive;if(p.setupLights(),H.isArrayCamera){const ot=H.cameras;if(V.length>0)for(let pt=0,bt=ot.length;pt<bt;pt++){const vt=ot[pt];yc(K,V,C,vt)}_e&&tt.render(C);for(let pt=0,bt=ot.length;pt<bt;pt++){const vt=ot[pt];xc(m,C,vt,vt.viewport)}}else V.length>0&&yc(K,V,C,H),_e&&tt.render(C),xc(m,C,H);L!==null&&A===0&&(kt.updateMultisampleRenderTarget(L),kt.updateRenderTargetMipmap(L)),C.isScene===!0&&C.onAfterRender(S,C,H),Rt.resetDefaultState(),E=-1,x=null,y.pop(),y.length>0?(p=y[y.length-1],lt===!0&&mt.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Bo(C,H,j,K){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)j=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||J.intersectsSprite(C)){K&&wt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(St);const pt=I.update(C),bt=C.material;bt.visible&&m.push(C,pt,bt,j,wt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||J.intersectsObject(C))){const pt=I.update(C),bt=C.material;if(K&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),wt.copy(C.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),wt.copy(pt.boundingSphere.center)),wt.applyMatrix4(C.matrixWorld).applyMatrix4(St)),Array.isArray(bt)){const vt=pt.groups;for(let It=0,Nt=vt.length;It<Nt;It++){const Pt=vt[It],Yt=bt[Pt.materialIndex];Yt&&Yt.visible&&m.push(C,pt,Yt,j,wt.z,Pt)}}else bt.visible&&m.push(C,pt,bt,j,wt.z,null)}}const ot=C.children;for(let pt=0,bt=ot.length;pt<bt;pt++)Bo(ot[pt],H,j,K)}function xc(C,H,j,K){const V=C.opaque,ot=C.transmissive,pt=C.transparent;p.setupLightsView(j),lt===!0&&mt.setGlobalState(S.clippingPlanes,j),K&&Tt.viewport(R.copy(K)),V.length>0&&Ss(V,H,j),ot.length>0&&Ss(ot,H,j),pt.length>0&&Ss(pt,H,j),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function yc(C,H,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[K.id]===void 0&&(p.state.transmissionRenderTarget[K.id]=new On(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?si:ci,minFilter:qi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const ot=p.state.transmissionRenderTarget[K.id],pt=K.viewport||R;ot.setSize(pt.z*S.transmissionResolutionScale,pt.w*S.transmissionResolutionScale);const bt=S.getRenderTarget();S.setRenderTarget(ot),S.getClearColor(X),G=S.getClearAlpha(),G<1&&S.setClearColor(16777215,.5),S.clear(),_e&&tt.render(j);const vt=S.toneMapping;S.toneMapping=Ti;const It=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),p.setupLightsView(K),lt===!0&&mt.setGlobalState(S.clippingPlanes,K),Ss(C,j,K),kt.updateMultisampleRenderTarget(ot),kt.updateRenderTargetMipmap(ot),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let Pt=0,Yt=H.length;Pt<Yt;Pt++){const oe=H[Pt],xe=oe.object,Se=oe.geometry,te=oe.material,Lt=oe.group;if(te.side===ei&&xe.layers.test(K.layers)){const Ie=te.side;te.side=rn,te.needsUpdate=!0,Sc(xe,j,K,Se,te,Lt),te.side=Ie,te.needsUpdate=!0,Nt=!0}}Nt===!0&&(kt.updateMultisampleRenderTarget(ot),kt.updateRenderTargetMipmap(ot))}S.setRenderTarget(bt),S.setClearColor(X,G),It!==void 0&&(K.viewport=It),S.toneMapping=vt}function Ss(C,H,j){const K=H.isScene===!0?H.overrideMaterial:null;for(let V=0,ot=C.length;V<ot;V++){const pt=C[V],bt=pt.object,vt=pt.geometry,It=pt.group;let Nt=pt.material;Nt.allowOverride===!0&&K!==null&&(Nt=K),bt.layers.test(j.layers)&&Sc(bt,H,j,vt,Nt,It)}}function Sc(C,H,j,K,V,ot){C.onBeforeRender(S,H,j,K,V,ot),C.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),V.onBeforeRender(S,H,j,K,C,ot),V.transparent===!0&&V.side===ei&&V.forceSinglePass===!1?(V.side=rn,V.needsUpdate=!0,S.renderBufferDirect(j,H,K,V,C,ot),V.side=wi,V.needsUpdate=!0,S.renderBufferDirect(j,H,K,V,C,ot),V.side=ei):S.renderBufferDirect(j,H,K,V,C,ot),C.onAfterRender(S,H,j,K,V,ot)}function Ms(C,H,j){H.isScene!==!0&&(H=ce);const K=At.get(C),V=p.state.lights,ot=p.state.shadowsArray,pt=V.state.version,bt=B.getParameters(C,V.state,ot,H,j),vt=B.getProgramCacheKey(bt);let It=K.programs;K.environment=C.isMeshStandardMaterial?H.environment:null,K.fog=H.fog,K.envMap=(C.isMeshStandardMaterial?U:Me).get(C.envMap||K.environment),K.envMapRotation=K.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,It===void 0&&(C.addEventListener("dispose",Et),It=new Map,K.programs=It);let Nt=It.get(vt);if(Nt!==void 0){if(K.currentProgram===Nt&&K.lightsStateVersion===pt)return Ec(C,bt),Nt}else bt.uniforms=B.getUniforms(C),C.onBeforeCompile(bt,S),Nt=B.acquireProgram(bt,vt),It.set(vt,Nt),K.uniforms=bt.uniforms;const Pt=K.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Pt.clippingPlanes=mt.uniform),Ec(C,bt),K.needsLights=Rd(C),K.lightsStateVersion=pt,K.needsLights&&(Pt.ambientLightColor.value=V.state.ambient,Pt.lightProbe.value=V.state.probe,Pt.directionalLights.value=V.state.directional,Pt.directionalLightShadows.value=V.state.directionalShadow,Pt.spotLights.value=V.state.spot,Pt.spotLightShadows.value=V.state.spotShadow,Pt.rectAreaLights.value=V.state.rectArea,Pt.ltc_1.value=V.state.rectAreaLTC1,Pt.ltc_2.value=V.state.rectAreaLTC2,Pt.pointLights.value=V.state.point,Pt.pointLightShadows.value=V.state.pointShadow,Pt.hemisphereLights.value=V.state.hemi,Pt.directionalShadowMap.value=V.state.directionalShadowMap,Pt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pt.spotShadowMap.value=V.state.spotShadowMap,Pt.spotLightMatrix.value=V.state.spotLightMatrix,Pt.spotLightMap.value=V.state.spotLightMap,Pt.pointShadowMap.value=V.state.pointShadowMap,Pt.pointShadowMatrix.value=V.state.pointShadowMatrix),K.currentProgram=Nt,K.uniformsList=null,Nt}function Mc(C){if(C.uniformsList===null){const H=C.currentProgram.getUniforms();C.uniformsList=fo.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function Ec(C,H){const j=At.get(C);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function Ad(C,H,j,K,V){H.isScene!==!0&&(H=ce),kt.resetTextureUnits();const ot=H.fog,pt=K.isMeshStandardMaterial?H.environment:null,bt=L===null?S.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Ur,vt=(K.isMeshStandardMaterial?U:Me).get(K.envMap||pt),It=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Nt=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Pt=!!j.morphAttributes.position,Yt=!!j.morphAttributes.normal,oe=!!j.morphAttributes.color;let xe=Ti;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(xe=S.toneMapping);const Se=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,te=Se!==void 0?Se.length:0,Lt=At.get(K),Ie=p.state.lights;if(lt===!0&&(ft===!0||C!==x)){const He=C===x&&K.id===E;mt.setState(K,C,He)}let ne=!1;K.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Ie.state.version||Lt.outputColorSpace!==bt||V.isBatchedMesh&&Lt.batching===!1||!V.isBatchedMesh&&Lt.batching===!0||V.isBatchedMesh&&Lt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Lt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Lt.instancing===!1||!V.isInstancedMesh&&Lt.instancing===!0||V.isSkinnedMesh&&Lt.skinning===!1||!V.isSkinnedMesh&&Lt.skinning===!0||V.isInstancedMesh&&Lt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Lt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Lt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Lt.instancingMorph===!1&&V.morphTexture!==null||Lt.envMap!==vt||K.fog===!0&&Lt.fog!==ot||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==mt.numPlanes||Lt.numIntersection!==mt.numIntersection)||Lt.vertexAlphas!==It||Lt.vertexTangents!==Nt||Lt.morphTargets!==Pt||Lt.morphNormals!==Yt||Lt.morphColors!==oe||Lt.toneMapping!==xe||Lt.morphTargetsCount!==te)&&(ne=!0):(ne=!0,Lt.__version=K.version);let bn=Lt.currentProgram;ne===!0&&(bn=Ms(K,H,V));let ir=!1,an=!1,Hr=!1;const ve=bn.getUniforms(),dn=Lt.uniforms;if(Tt.useProgram(bn.program)&&(ir=!0,an=!0,Hr=!0),K.id!==E&&(E=K.id,an=!0),ir||x!==C){Tt.buffers.depth.getReversed()?(ht.copy(C.projectionMatrix),tm(ht),em(ht),ve.setValue(F,"projectionMatrix",ht)):ve.setValue(F,"projectionMatrix",C.projectionMatrix),ve.setValue(F,"viewMatrix",C.matrixWorldInverse);const je=ve.map.cameraPosition;je!==void 0&&je.setValue(F,Wt.setFromMatrixPosition(C.matrixWorld)),re.logarithmicDepthBuffer&&ve.setValue(F,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ve.setValue(F,"isOrthographic",C.isOrthographicCamera===!0),x!==C&&(x=C,an=!0,Hr=!0)}if(V.isSkinnedMesh){ve.setOptional(F,V,"bindMatrix"),ve.setOptional(F,V,"bindMatrixInverse");const He=V.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),ve.setValue(F,"boneTexture",He.boneTexture,kt))}V.isBatchedMesh&&(ve.setOptional(F,V,"batchingTexture"),ve.setValue(F,"batchingTexture",V._matricesTexture,kt),ve.setOptional(F,V,"batchingIdTexture"),ve.setValue(F,"batchingIdTexture",V._indirectTexture,kt),ve.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&ve.setValue(F,"batchingColorTexture",V._colorsTexture,kt));const pn=j.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&_t.update(V,j,bn),(an||Lt.receiveShadow!==V.receiveShadow)&&(Lt.receiveShadow=V.receiveShadow,ve.setValue(F,"receiveShadow",V.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(dn.envMap.value=vt,dn.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&H.environment!==null&&(dn.envMapIntensity.value=H.environmentIntensity),an&&(ve.setValue(F,"toneMappingExposure",S.toneMappingExposure),Lt.needsLights&&Cd(dn,Hr),ot&&K.fog===!0&&W.refreshFogUniforms(dn,ot),W.refreshMaterialUniforms(dn,K,Z,Q,p.state.transmissionRenderTarget[C.id]),fo.upload(F,Mc(Lt),dn,kt)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(fo.upload(F,Mc(Lt),dn,kt),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ve.setValue(F,"center",V.center),ve.setValue(F,"modelViewMatrix",V.modelViewMatrix),ve.setValue(F,"normalMatrix",V.normalMatrix),ve.setValue(F,"modelMatrix",V.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const He=K.uniformsGroups;for(let je=0,Ho=He.length;je<Ho;je++){const Pi=He[je];z.update(Pi,bn),z.bind(Pi,bn)}}return bn}function Cd(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function Rd(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(C,H,j){const K=At.get(C);K.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),At.get(C.texture).__webglTexture=H,At.get(C.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:j,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,H){const j=At.get(C);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0};const Pd=F.createFramebuffer();this.setRenderTarget=function(C,H=0,j=0){L=C,b=H,A=j;let K=!0,V=null,ot=!1,pt=!1;if(C){const vt=At.get(C);if(vt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(F.FRAMEBUFFER,null),K=!1;else if(vt.__webglFramebuffer===void 0)kt.setupRenderTarget(C);else if(vt.__hasExternalTextures)kt.rebindTextures(C,At.get(C.texture).__webglTexture,At.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Pt=C.depthTexture;if(vt.__boundDepthTexture!==Pt){if(Pt!==null&&At.has(Pt)&&(C.width!==Pt.image.width||C.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(C)}}const It=C.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(pt=!0);const Nt=At.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Nt[H])?V=Nt[H][j]:V=Nt[H],ot=!0):C.samples>0&&kt.useMultisampledRTT(C)===!1?V=At.get(C).__webglMultisampledFramebuffer:Array.isArray(Nt)?V=Nt[j]:V=Nt,R.copy(C.viewport),D.copy(C.scissor),N=C.scissorTest}else R.copy(gt).multiplyScalar(Z).floor(),D.copy(Ut).multiplyScalar(Z).floor(),N=O;if(j!==0&&(V=Pd),Tt.bindFramebuffer(F.FRAMEBUFFER,V)&&K&&Tt.drawBuffers(C,V),Tt.viewport(R),Tt.scissor(D),Tt.setScissorTest(N),ot){const vt=At.get(C.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,vt.__webglTexture,j)}else if(pt){const vt=At.get(C.texture),It=H;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,vt.__webglTexture,j,It)}else if(C!==null&&j!==0){const vt=At.get(C.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,vt.__webglTexture,j)}E=-1},this.readRenderTargetPixels=function(C,H,j,K,V,ot,pt,bt=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=At.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt){Tt.bindFramebuffer(F.FRAMEBUFFER,vt);try{const It=C.textures[bt],Nt=It.format,Pt=It.type;if(!re.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-K&&j>=0&&j<=C.height-V&&(C.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt),F.readPixels(H,j,K,V,ct.convert(Nt),ct.convert(Pt),ot))}finally{const It=L!==null?At.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(C,H,j,K,V,ot,pt,bt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=At.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt)if(H>=0&&H<=C.width-K&&j>=0&&j<=C.height-V){Tt.bindFramebuffer(F.FRAMEBUFFER,vt);const It=C.textures[bt],Nt=It.format,Pt=It.type;if(!re.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Yt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Yt),F.bufferData(F.PIXEL_PACK_BUFFER,ot.byteLength,F.STREAM_READ),C.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt),F.readPixels(H,j,K,V,ct.convert(Nt),ct.convert(Pt),0);const oe=L!==null?At.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,oe);const xe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Jp(F,xe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Yt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ot),F.deleteBuffer(Yt),F.deleteSync(xe),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,H=null,j=0){const K=Math.pow(2,-j),V=Math.floor(C.image.width*K),ot=Math.floor(C.image.height*K),pt=H!==null?H.x:0,bt=H!==null?H.y:0;kt.setTexture2D(C,0),F.copyTexSubImage2D(F.TEXTURE_2D,j,0,0,pt,bt,V,ot),Tt.unbindTexture()};const Dd=F.createFramebuffer(),Ld=F.createFramebuffer();this.copyTextureToTexture=function(C,H,j=null,K=null,V=0,ot=null){ot===null&&(V!==0?(Ar("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ot=V,V=0):ot=0);let pt,bt,vt,It,Nt,Pt,Yt,oe,xe;const Se=C.isCompressedTexture?C.mipmaps[ot]:C.image;if(j!==null)pt=j.max.x-j.min.x,bt=j.max.y-j.min.y,vt=j.isBox3?j.max.z-j.min.z:1,It=j.min.x,Nt=j.min.y,Pt=j.isBox3?j.min.z:0;else{const pn=Math.pow(2,-V);pt=Math.floor(Se.width*pn),bt=Math.floor(Se.height*pn),C.isDataArrayTexture?vt=Se.depth:C.isData3DTexture?vt=Math.floor(Se.depth*pn):vt=1,It=0,Nt=0,Pt=0}K!==null?(Yt=K.x,oe=K.y,xe=K.z):(Yt=0,oe=0,xe=0);const te=ct.convert(H.format),Lt=ct.convert(H.type);let Ie;H.isData3DTexture?(kt.setTexture3D(H,0),Ie=F.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(kt.setTexture2DArray(H,0),Ie=F.TEXTURE_2D_ARRAY):(kt.setTexture2D(H,0),Ie=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const ne=F.getParameter(F.UNPACK_ROW_LENGTH),bn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),ir=F.getParameter(F.UNPACK_SKIP_PIXELS),an=F.getParameter(F.UNPACK_SKIP_ROWS),Hr=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Se.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Se.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,It),F.pixelStorei(F.UNPACK_SKIP_ROWS,Nt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Pt);const ve=C.isDataArrayTexture||C.isData3DTexture,dn=H.isDataArrayTexture||H.isData3DTexture;if(C.isDepthTexture){const pn=At.get(C),He=At.get(H),je=At.get(pn.__renderTarget),Ho=At.get(He.__renderTarget);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,je.__webglFramebuffer),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ho.__webglFramebuffer);for(let Pi=0;Pi<vt;Pi++)ve&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(C).__webglTexture,V,Pt+Pi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(H).__webglTexture,ot,xe+Pi)),F.blitFramebuffer(It,Nt,pt,bt,Yt,oe,pt,bt,F.DEPTH_BUFFER_BIT,F.NEAREST);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||C.isRenderTargetTexture||At.has(C)){const pn=At.get(C),He=At.get(H);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,Dd),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ld);for(let je=0;je<vt;je++)ve?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,pn.__webglTexture,V,Pt+je):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pn.__webglTexture,V),dn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,He.__webglTexture,ot,xe+je):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,He.__webglTexture,ot),V!==0?F.blitFramebuffer(It,Nt,pt,bt,Yt,oe,pt,bt,F.COLOR_BUFFER_BIT,F.NEAREST):dn?F.copyTexSubImage3D(Ie,ot,Yt,oe,xe+je,It,Nt,pt,bt):F.copyTexSubImage2D(Ie,ot,Yt,oe,It,Nt,pt,bt);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else dn?C.isDataTexture||C.isData3DTexture?F.texSubImage3D(Ie,ot,Yt,oe,xe,pt,bt,vt,te,Lt,Se.data):H.isCompressedArrayTexture?F.compressedTexSubImage3D(Ie,ot,Yt,oe,xe,pt,bt,vt,te,Se.data):F.texSubImage3D(Ie,ot,Yt,oe,xe,pt,bt,vt,te,Lt,Se):C.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ot,Yt,oe,pt,bt,te,Lt,Se.data):C.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ot,Yt,oe,Se.width,Se.height,te,Se.data):F.texSubImage2D(F.TEXTURE_2D,ot,Yt,oe,pt,bt,te,Lt,Se);F.pixelStorei(F.UNPACK_ROW_LENGTH,ne),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,bn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ir),F.pixelStorei(F.UNPACK_SKIP_ROWS,an),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Hr),ot===0&&H.generateMipmaps&&F.generateMipmap(Ie),Tt.unbindTexture()},this.copyTextureToTexture3D=function(C,H,j=null,K=null,V=0){return Ar('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,H,j,K,V)},this.initRenderTarget=function(C){At.get(C).__webglFramebuffer===void 0&&kt.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?kt.setTextureCube(C,0):C.isData3DTexture?kt.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?kt.setTexture2DArray(C,0):kt.setTexture2D(C,0),Tt.unbindTexture()},this.resetState=function(){b=0,A=0,L=null,Tt.reset(),Rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new zt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};tn.line={uniforms:Ki.merge([ut.common,ut.fog,ut.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Pf extends Ue{constructor(t){super({type:"LineMaterial",uniforms:Ki.clone(tn.line.uniforms),vertexShader:tn.line.vertexShader,fragmentShader:tn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const zu=new hi,Qs=new k;class Df extends zm{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Sn(t,3)),this.setAttribute("uv",new Sn(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Pl(e,6,1);return this.setAttribute("instanceStart",new Ei(i,3,0)),this.setAttribute("instanceEnd",new Ei(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Pl(e,6,1);return this.setAttribute("instanceColorStart",new Ei(i,3,0)),this.setAttribute("instanceColorEnd",new Ei(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Om(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),zu.setFromBufferAttribute(e),this.boundingBox.union(zu))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Qs.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Qs)),Qs.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Qs));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const wa=new he,Bu=new k,Hu=new k,Oe=new he,Ne=new he,zn=new he,Aa=new k,Ca=new me,Fe=new Gm,Vu=new k,Js=new hi,to=new Ai,Bn=new he;let Hn,Zi;function Gu(n,t,e){return Bn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),Bn.multiplyScalar(1/Bn.w),Bn.x=Zi/e.width,Bn.y=Zi/e.height,Bn.applyMatrix4(n.projectionMatrixInverse),Bn.multiplyScalar(1/Bn.w),Math.abs(Math.max(Bn.x,Bn.y))}function Ax(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,l=o;a<l;a++){Fe.start.fromBufferAttribute(r,a),Fe.end.fromBufferAttribute(s,a),Fe.applyMatrix4(e);const c=new k,h=new k;Hn.distanceSqToSegment(Fe.start,Fe.end,h,c),h.distanceTo(c)<Zi*.5&&t.push({point:h,pointOnLine:c,distance:Hn.origin.distanceTo(h),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function Cx(n,t,e){const i=t.projectionMatrix,s=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),u=-t.near;Hn.at(1,zn),zn.w=1,zn.applyMatrix4(t.matrixWorldInverse),zn.applyMatrix4(i),zn.multiplyScalar(1/zn.w),zn.x*=s.x/2,zn.y*=s.y/2,zn.z=0,Aa.copy(zn),Ca.multiplyMatrices(t.matrixWorldInverse,o);for(let d=0,f=h;d<f;d++){if(Oe.fromBufferAttribute(l,d),Ne.fromBufferAttribute(c,d),Oe.w=1,Ne.w=1,Oe.applyMatrix4(Ca),Ne.applyMatrix4(Ca),Oe.z>u&&Ne.z>u)continue;if(Oe.z>u){const y=Oe.z-Ne.z,S=(Oe.z-u)/y;Oe.lerp(Ne,S)}else if(Ne.z>u){const y=Ne.z-Oe.z,S=(Ne.z-u)/y;Ne.lerp(Oe,S)}Oe.applyMatrix4(i),Ne.applyMatrix4(i),Oe.multiplyScalar(1/Oe.w),Ne.multiplyScalar(1/Ne.w),Oe.x*=s.x/2,Oe.y*=s.y/2,Ne.x*=s.x/2,Ne.y*=s.y/2,Fe.start.copy(Oe),Fe.start.z=0,Fe.end.copy(Ne),Fe.end.z=0;const g=Fe.closestPointToPointParameter(Aa,!0);Fe.at(g,Vu);const m=Kp.lerp(Oe.z,Ne.z,g),p=m>=-1&&m<=1,v=Aa.distanceTo(Vu)<Zi*.5;if(p&&v){Fe.start.fromBufferAttribute(l,d),Fe.end.fromBufferAttribute(c,d),Fe.start.applyMatrix4(o),Fe.end.applyMatrix4(o);const y=new k,S=new k;Hn.distanceSqToSegment(Fe.start,Fe.end,S,y),e.push({point:S,pointOnLine:y,distance:Hn.origin.distanceTo(S),object:n,face:null,faceIndex:d,uv:null,uv1:null})}}}class Rx extends Un{constructor(t=new Df,e=new Pf({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)Bu.fromBufferAttribute(e,o),Hu.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Bu.distanceTo(Hu);const s=new Pl(r,2,1);return t.setAttribute("instanceDistanceStart",new Ei(s,1,0)),t.setAttribute("instanceDistanceEnd",new Ei(s,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Hn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Zi=l.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),to.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=Zi*.5;else{const u=Math.max(r.near,to.distanceToPoint(Hn.origin));c=Gu(r,u,l.resolution)}if(to.radius+=c,Hn.intersectsSphere(to)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Js.copy(a.boundingBox).applyMatrix4(o);let h;if(i)h=Zi*.5;else{const u=Math.max(r.near,Js.distanceToPoint(Hn.origin));h=Gu(r,u,l.resolution)}Js.expandByScalar(h),Hn.intersectsBox(Js)!==!1&&(i?Ax(this,e):Cx(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(wa),this.material.uniforms.resolution.value.set(wa.z,wa.w))}}const po={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Br{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Px=new Ef(-1,1,1,-1,0,1);class Dx extends fn{constructor(){super(),this.setAttribute("position",new Sn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Sn([0,2,0,0,2,0],2))}}const Lx=new Dx;class ac{constructor(t){this._mesh=new Un(Lx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Px)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Lf extends Br{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Ue?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ki.clone(t.uniforms),this.material=new Ue({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new ac(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Wu extends Br{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const r=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class Ux extends Br{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Ix{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new zt);this._width=i.width,this._height=i.height,e=new On(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:si}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Lf(po),this.copyPass.material.blending=ri,this.clock=new bf}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Wu!==void 0&&(o instanceof Wu?i=!0:o instanceof Ux&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const eo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Ox extends Br{constructor(){super(),this.uniforms=Ki.clone(eo.uniforms),this.material=new Nm({name:eo.name,uniforms:this.uniforms,vertexShader:eo.vertexShader,fragmentShader:eo.fragmentShader}),this._fsQuad=new ac(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jt.getTransfer(this._outputColorSpace)===ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===jh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Kh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Qh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===$l?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===tf?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ef?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Jh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Nx extends Br{constructor(t,e,i=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new jt}render(t,e,i){const r=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=r}}const Fx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new jt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Or extends Br{constructor(t,e=1,i,r){super(),this.strength=e,this.radius=i,this.threshold=r,this.resolution=t!==void 0?new zt(t.x,t.y):new zt(256,256),this.clearColor=new jt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new On(s,o,{type:si}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new On(s,o,{type:si});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new On(s,o,{type:si});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),o=Math.round(o/2)}const a=Fx;this.highPassUniforms=Ki.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ue({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new zt(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ki.clone(po.uniforms),this.blendMaterial=new Ue({uniforms:this.copyUniforms,vertexShader:po.vertexShader,fragmentShader:po.fragmentShader,blending:yo,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new jt,this._oldClearAlpha=1,this._basic=new rc,this._fsQuad=new ac(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new zt(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(t,e,i,r,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Or.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Or.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Ue({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new zt(.5,.5)},direction:{value:new zt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new Ue({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Or.BlurDirectionX=new zt(1,0);Or.BlurDirectionY=new zt(0,1);function kx(n){var t=+this._x.call(null,n);return Uf(this.cover(t),t,n)}function Uf(n,t,e){if(isNaN(t))return n;var i,r=n._root,s={data:e},o=n._x0,a=n._x1,l,c,h,u,d;if(!r)return n._root=s,n;for(;r.length;)if((h=t>=(l=(o+a)/2))?o=l:a=l,i=r,!(r=r[u=+h]))return i[u]=s,n;if(c=+n._x.call(null,r.data),t===c)return s.next=r,i?i[u]=s:n._root=s,n;do i=i?i[u]=new Array(2):n._root=new Array(2),(h=t>=(l=(o+a)/2))?o=l:a=l;while((u=+h)==(d=+(c>=l)));return i[d]=r,i[u]=s,n}function zx(n){var t,e=n.length,i,r=new Array(e),s=1/0,o=-1/0;for(t=0;t<e;++t)isNaN(i=+this._x.call(null,n[t]))||(r[t]=i,i<s&&(s=i),i>o&&(o=i));if(s>o)return this;for(this.cover(s).cover(o),t=0;t<e;++t)Uf(this,r[t],n[t]);return this}function Bx(n){if(isNaN(n=+n))return this;var t=this._x0,e=this._x1;if(isNaN(t))e=(t=Math.floor(n))+1;else{for(var i=e-t||1,r=this._root,s,o;t>n||n>=e;)switch(o=+(n<t),s=new Array(2),s[o]=r,r=s,i*=2,o){case 0:e=t+i;break;case 1:t=e-i;break}this._root&&this._root.length&&(this._root=r)}return this._x0=t,this._x1=e,this}function Hx(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function Vx(n){return arguments.length?this.cover(+n[0][0]).cover(+n[1][0]):isNaN(this._x0)?void 0:[[this._x0],[this._x1]]}function li(n,t,e){this.node=n,this.x0=t,this.x1=e}function Gx(n,t){var e,i=this._x0,r,s,o=this._x1,a=[],l=this._root,c,h;for(l&&a.push(new li(l,i,o)),t==null?t=1/0:(i=n-t,o=n+t);c=a.pop();)if(!(!(l=c.node)||(r=c.x0)>o||(s=c.x1)<i))if(l.length){var u=(r+s)/2;a.push(new li(l[1],u,s),new li(l[0],r,u)),(h=+(n>=u))&&(c=a[a.length-1],a[a.length-1]=a[a.length-1-h],a[a.length-1-h]=c)}else{var d=Math.abs(n-+this._x.call(null,l.data));d<t&&(t=d,i=n-d,o=n+d,e=l.data)}return e}function Wx(n){if(isNaN(l=+this._x.call(null,n)))return this;var t,e=this._root,i,r,s,o=this._x0,a=this._x1,l,c,h,u,d;if(!e)return this;if(e.length)for(;;){if((h=l>=(c=(o+a)/2))?o=c:a=c,t=e,!(e=e[u=+h]))return this;if(!e.length)break;t[u+1&1]&&(i=t,d=u)}for(;e.data!==n;)if(r=e,!(e=e.next))return this;return(s=e.next)&&delete e.next,r?(s?r.next=s:delete r.next,this):t?(s?t[u]=s:delete t[u],(e=t[0]||t[1])&&e===(t[1]||t[0])&&!e.length&&(i?i[d]=e:this._root=e),this):(this._root=s,this)}function Xx(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function qx(){return this._root}function $x(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function Yx(n){var t=[],e,i=this._root,r,s,o;for(i&&t.push(new li(i,this._x0,this._x1));e=t.pop();)if(!n(i=e.node,s=e.x0,o=e.x1)&&i.length){var a=(s+o)/2;(r=i[1])&&t.push(new li(r,a,o)),(r=i[0])&&t.push(new li(r,s,a))}return this}function Zx(n){var t=[],e=[],i;for(this._root&&t.push(new li(this._root,this._x0,this._x1));i=t.pop();){var r=i.node;if(r.length){var s,o=i.x0,a=i.x1,l=(o+a)/2;(s=r[0])&&t.push(new li(s,o,l)),(s=r[1])&&t.push(new li(s,l,a))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.x1);return this}function jx(n){return n[0]}function Kx(n){return arguments.length?(this._x=n,this):this._x}function If(n,t){var e=new lc(t??jx,NaN,NaN);return n==null?e:e.addAll(n)}function lc(n,t,e){this._x=n,this._x0=t,this._x1=e,this._root=void 0}function Xu(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var on=If.prototype=lc.prototype;on.copy=function(){var n=new lc(this._x,this._x0,this._x1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=Xu(t),n;for(e=[{source:t,target:n._root=new Array(2)}];t=e.pop();)for(var r=0;r<2;++r)(i=t.source[r])&&(i.length?e.push({source:i,target:t.target[r]=new Array(2)}):t.target[r]=Xu(i));return n};on.add=kx;on.addAll=zx;on.cover=Bx;on.data=Hx;on.extent=Vx;on.find=Gx;on.remove=Wx;on.removeAll=Xx;on.root=qx;on.size=$x;on.visit=Yx;on.visitAfter=Zx;on.x=Kx;function Qx(n){const t=+this._x.call(null,n),e=+this._y.call(null,n);return Of(this.cover(t,e),t,e,n)}function Of(n,t,e,i){if(isNaN(t)||isNaN(e))return n;var r,s=n._root,o={data:i},a=n._x0,l=n._y0,c=n._x1,h=n._y1,u,d,f,_,g,m,p,v;if(!s)return n._root=o,n;for(;s.length;)if((g=t>=(u=(a+c)/2))?a=u:c=u,(m=e>=(d=(l+h)/2))?l=d:h=d,r=s,!(s=s[p=m<<1|g]))return r[p]=o,n;if(f=+n._x.call(null,s.data),_=+n._y.call(null,s.data),t===f&&e===_)return o.next=s,r?r[p]=o:n._root=o,n;do r=r?r[p]=new Array(4):n._root=new Array(4),(g=t>=(u=(a+c)/2))?a=u:c=u,(m=e>=(d=(l+h)/2))?l=d:h=d;while((p=m<<1|g)===(v=(_>=d)<<1|f>=u));return r[v]=s,r[p]=o,n}function Jx(n){var t,e,i=n.length,r,s,o=new Array(i),a=new Array(i),l=1/0,c=1/0,h=-1/0,u=-1/0;for(e=0;e<i;++e)isNaN(r=+this._x.call(null,t=n[e]))||isNaN(s=+this._y.call(null,t))||(o[e]=r,a[e]=s,r<l&&(l=r),r>h&&(h=r),s<c&&(c=s),s>u&&(u=s));if(l>h||c>u)return this;for(this.cover(l,c).cover(h,u),e=0;e<i;++e)Of(this,o[e],a[e],n[e]);return this}function ty(n,t){if(isNaN(n=+n)||isNaN(t=+t))return this;var e=this._x0,i=this._y0,r=this._x1,s=this._y1;if(isNaN(e))r=(e=Math.floor(n))+1,s=(i=Math.floor(t))+1;else{for(var o=r-e||1,a=this._root,l,c;e>n||n>=r||i>t||t>=s;)switch(c=(t<i)<<1|n<e,l=new Array(4),l[c]=a,a=l,o*=2,c){case 0:r=e+o,s=i+o;break;case 1:e=r-o,s=i+o;break;case 2:r=e+o,i=s-o;break;case 3:e=r-o,i=s-o;break}this._root&&this._root.length&&(this._root=a)}return this._x0=e,this._y0=i,this._x1=r,this._y1=s,this}function ey(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function ny(n){return arguments.length?this.cover(+n[0][0],+n[0][1]).cover(+n[1][0],+n[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function We(n,t,e,i,r){this.node=n,this.x0=t,this.y0=e,this.x1=i,this.y1=r}function iy(n,t,e){var i,r=this._x0,s=this._y0,o,a,l,c,h=this._x1,u=this._y1,d=[],f=this._root,_,g;for(f&&d.push(new We(f,r,s,h,u)),e==null?e=1/0:(r=n-e,s=t-e,h=n+e,u=t+e,e*=e);_=d.pop();)if(!(!(f=_.node)||(o=_.x0)>h||(a=_.y0)>u||(l=_.x1)<r||(c=_.y1)<s))if(f.length){var m=(o+l)/2,p=(a+c)/2;d.push(new We(f[3],m,p,l,c),new We(f[2],o,p,m,c),new We(f[1],m,a,l,p),new We(f[0],o,a,m,p)),(g=(t>=p)<<1|n>=m)&&(_=d[d.length-1],d[d.length-1]=d[d.length-1-g],d[d.length-1-g]=_)}else{var v=n-+this._x.call(null,f.data),y=t-+this._y.call(null,f.data),S=v*v+y*y;if(S<e){var w=Math.sqrt(e=S);r=n-w,s=t-w,h=n+w,u=t+w,i=f.data}}return i}function ry(n){if(isNaN(h=+this._x.call(null,n))||isNaN(u=+this._y.call(null,n)))return this;var t,e=this._root,i,r,s,o=this._x0,a=this._y0,l=this._x1,c=this._y1,h,u,d,f,_,g,m,p;if(!e)return this;if(e.length)for(;;){if((_=h>=(d=(o+l)/2))?o=d:l=d,(g=u>=(f=(a+c)/2))?a=f:c=f,t=e,!(e=e[m=g<<1|_]))return this;if(!e.length)break;(t[m+1&3]||t[m+2&3]||t[m+3&3])&&(i=t,p=m)}for(;e.data!==n;)if(r=e,!(e=e.next))return this;return(s=e.next)&&delete e.next,r?(s?r.next=s:delete r.next,this):t?(s?t[m]=s:delete t[m],(e=t[0]||t[1]||t[2]||t[3])&&e===(t[3]||t[2]||t[1]||t[0])&&!e.length&&(i?i[p]=e:this._root=e),this):(this._root=s,this)}function sy(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function oy(){return this._root}function ay(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function ly(n){var t=[],e,i=this._root,r,s,o,a,l;for(i&&t.push(new We(i,this._x0,this._y0,this._x1,this._y1));e=t.pop();)if(!n(i=e.node,s=e.x0,o=e.y0,a=e.x1,l=e.y1)&&i.length){var c=(s+a)/2,h=(o+l)/2;(r=i[3])&&t.push(new We(r,c,h,a,l)),(r=i[2])&&t.push(new We(r,s,h,c,l)),(r=i[1])&&t.push(new We(r,c,o,a,h)),(r=i[0])&&t.push(new We(r,s,o,c,h))}return this}function cy(n){var t=[],e=[],i;for(this._root&&t.push(new We(this._root,this._x0,this._y0,this._x1,this._y1));i=t.pop();){var r=i.node;if(r.length){var s,o=i.x0,a=i.y0,l=i.x1,c=i.y1,h=(o+l)/2,u=(a+c)/2;(s=r[0])&&t.push(new We(s,o,a,h,u)),(s=r[1])&&t.push(new We(s,h,a,l,u)),(s=r[2])&&t.push(new We(s,o,u,h,c)),(s=r[3])&&t.push(new We(s,h,u,l,c))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.y0,i.x1,i.y1);return this}function uy(n){return n[0]}function hy(n){return arguments.length?(this._x=n,this):this._x}function fy(n){return n[1]}function dy(n){return arguments.length?(this._y=n,this):this._y}function Nf(n,t,e){var i=new cc(t??uy,e??fy,NaN,NaN,NaN,NaN);return n==null?i:i.addAll(n)}function cc(n,t,e,i,r,s){this._x=n,this._y=t,this._x0=e,this._y0=i,this._x1=r,this._y1=s,this._root=void 0}function qu(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var Ze=Nf.prototype=cc.prototype;Ze.copy=function(){var n=new cc(this._x,this._y,this._x0,this._y0,this._x1,this._y1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=qu(t),n;for(e=[{source:t,target:n._root=new Array(4)}];t=e.pop();)for(var r=0;r<4;++r)(i=t.source[r])&&(i.length?e.push({source:i,target:t.target[r]=new Array(4)}):t.target[r]=qu(i));return n};Ze.add=Qx;Ze.addAll=Jx;Ze.cover=ty;Ze.data=ey;Ze.extent=ny;Ze.find=iy;Ze.remove=ry;Ze.removeAll=sy;Ze.root=oy;Ze.size=ay;Ze.visit=ly;Ze.visitAfter=cy;Ze.x=hy;Ze.y=dy;function py(n){var t=+this._x.call(null,n),e=+this._y.call(null,n),i=+this._z.call(null,n);return Ff(this.cover(t,e,i),t,e,i,n)}function Ff(n,t,e,i,r){if(isNaN(t)||isNaN(e)||isNaN(i))return n;var s,o=n._root,a={data:r},l=n._x0,c=n._y0,h=n._z0,u=n._x1,d=n._y1,f=n._z1,_,g,m,p,v,y,S,w,b,A,L;if(!o)return n._root=a,n;for(;o.length;)if((S=t>=(_=(l+u)/2))?l=_:u=_,(w=e>=(g=(c+d)/2))?c=g:d=g,(b=i>=(m=(h+f)/2))?h=m:f=m,s=o,!(o=o[A=b<<2|w<<1|S]))return s[A]=a,n;if(p=+n._x.call(null,o.data),v=+n._y.call(null,o.data),y=+n._z.call(null,o.data),t===p&&e===v&&i===y)return a.next=o,s?s[A]=a:n._root=a,n;do s=s?s[A]=new Array(8):n._root=new Array(8),(S=t>=(_=(l+u)/2))?l=_:u=_,(w=e>=(g=(c+d)/2))?c=g:d=g,(b=i>=(m=(h+f)/2))?h=m:f=m;while((A=b<<2|w<<1|S)===(L=(y>=m)<<2|(v>=g)<<1|p>=_));return s[L]=o,s[A]=a,n}function my(n){var t,e,i=n.length,r,s,o,a=new Array(i),l=new Array(i),c=new Array(i),h=1/0,u=1/0,d=1/0,f=-1/0,_=-1/0,g=-1/0;for(e=0;e<i;++e)isNaN(r=+this._x.call(null,t=n[e]))||isNaN(s=+this._y.call(null,t))||isNaN(o=+this._z.call(null,t))||(a[e]=r,l[e]=s,c[e]=o,r<h&&(h=r),r>f&&(f=r),s<u&&(u=s),s>_&&(_=s),o<d&&(d=o),o>g&&(g=o));if(h>f||u>_||d>g)return this;for(this.cover(h,u,d).cover(f,_,g),e=0;e<i;++e)Ff(this,a[e],l[e],c[e],n[e]);return this}function _y(n,t,e){if(isNaN(n=+n)||isNaN(t=+t)||isNaN(e=+e))return this;var i=this._x0,r=this._y0,s=this._z0,o=this._x1,a=this._y1,l=this._z1;if(isNaN(i))o=(i=Math.floor(n))+1,a=(r=Math.floor(t))+1,l=(s=Math.floor(e))+1;else{for(var c=o-i||1,h=this._root,u,d;i>n||n>=o||r>t||t>=a||s>e||e>=l;)switch(d=(e<s)<<2|(t<r)<<1|n<i,u=new Array(8),u[d]=h,h=u,c*=2,d){case 0:o=i+c,a=r+c,l=s+c;break;case 1:i=o-c,a=r+c,l=s+c;break;case 2:o=i+c,r=a-c,l=s+c;break;case 3:i=o-c,r=a-c,l=s+c;break;case 4:o=i+c,a=r+c,s=l-c;break;case 5:i=o-c,a=r+c,s=l-c;break;case 6:o=i+c,r=a-c,s=l-c;break;case 7:i=o-c,r=a-c,s=l-c;break}this._root&&this._root.length&&(this._root=h)}return this._x0=i,this._y0=r,this._z0=s,this._x1=o,this._y1=a,this._z1=l,this}function gy(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function vy(n){return arguments.length?this.cover(+n[0][0],+n[0][1],+n[0][2]).cover(+n[1][0],+n[1][1],+n[1][2]):isNaN(this._x0)?void 0:[[this._x0,this._y0,this._z0],[this._x1,this._y1,this._z1]]}function ue(n,t,e,i,r,s,o){this.node=n,this.x0=t,this.y0=e,this.z0=i,this.x1=r,this.y1=s,this.z1=o}function xy(n,t,e,i){var r,s=this._x0,o=this._y0,a=this._z0,l,c,h,u,d,f,_=this._x1,g=this._y1,m=this._z1,p=[],v=this._root,y,S;for(v&&p.push(new ue(v,s,o,a,_,g,m)),i==null?i=1/0:(s=n-i,o=t-i,a=e-i,_=n+i,g=t+i,m=e+i,i*=i);y=p.pop();)if(!(!(v=y.node)||(l=y.x0)>_||(c=y.y0)>g||(h=y.z0)>m||(u=y.x1)<s||(d=y.y1)<o||(f=y.z1)<a))if(v.length){var w=(l+u)/2,b=(c+d)/2,A=(h+f)/2;p.push(new ue(v[7],w,b,A,u,d,f),new ue(v[6],l,b,A,w,d,f),new ue(v[5],w,c,A,u,b,f),new ue(v[4],l,c,A,w,b,f),new ue(v[3],w,b,h,u,d,A),new ue(v[2],l,b,h,w,d,A),new ue(v[1],w,c,h,u,b,A),new ue(v[0],l,c,h,w,b,A)),(S=(e>=A)<<2|(t>=b)<<1|n>=w)&&(y=p[p.length-1],p[p.length-1]=p[p.length-1-S],p[p.length-1-S]=y)}else{var L=n-+this._x.call(null,v.data),E=t-+this._y.call(null,v.data),x=e-+this._z.call(null,v.data),R=L*L+E*E+x*x;if(R<i){var D=Math.sqrt(i=R);s=n-D,o=t-D,a=e-D,_=n+D,g=t+D,m=e+D,r=v.data}}return r}function yy(n){if(isNaN(d=+this._x.call(null,n))||isNaN(f=+this._y.call(null,n))||isNaN(_=+this._z.call(null,n)))return this;var t,e=this._root,i,r,s,o=this._x0,a=this._y0,l=this._z0,c=this._x1,h=this._y1,u=this._z1,d,f,_,g,m,p,v,y,S,w,b;if(!e)return this;if(e.length)for(;;){if((v=d>=(g=(o+c)/2))?o=g:c=g,(y=f>=(m=(a+h)/2))?a=m:h=m,(S=_>=(p=(l+u)/2))?l=p:u=p,t=e,!(e=e[w=S<<2|y<<1|v]))return this;if(!e.length)break;(t[w+1&7]||t[w+2&7]||t[w+3&7]||t[w+4&7]||t[w+5&7]||t[w+6&7]||t[w+7&7])&&(i=t,b=w)}for(;e.data!==n;)if(r=e,!(e=e.next))return this;return(s=e.next)&&delete e.next,r?(s?r.next=s:delete r.next,this):t?(s?t[w]=s:delete t[w],(e=t[0]||t[1]||t[2]||t[3]||t[4]||t[5]||t[6]||t[7])&&e===(t[7]||t[6]||t[5]||t[4]||t[3]||t[2]||t[1]||t[0])&&!e.length&&(i?i[b]=e:this._root=e),this):(this._root=s,this)}function Sy(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function My(){return this._root}function Ey(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function by(n){var t=[],e,i=this._root,r,s,o,a,l,c,h;for(i&&t.push(new ue(i,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));e=t.pop();)if(!n(i=e.node,s=e.x0,o=e.y0,a=e.z0,l=e.x1,c=e.y1,h=e.z1)&&i.length){var u=(s+l)/2,d=(o+c)/2,f=(a+h)/2;(r=i[7])&&t.push(new ue(r,u,d,f,l,c,h)),(r=i[6])&&t.push(new ue(r,s,d,f,u,c,h)),(r=i[5])&&t.push(new ue(r,u,o,f,l,d,h)),(r=i[4])&&t.push(new ue(r,s,o,f,u,d,h)),(r=i[3])&&t.push(new ue(r,u,d,a,l,c,f)),(r=i[2])&&t.push(new ue(r,s,d,a,u,c,f)),(r=i[1])&&t.push(new ue(r,u,o,a,l,d,f)),(r=i[0])&&t.push(new ue(r,s,o,a,u,d,f))}return this}function Ty(n){var t=[],e=[],i;for(this._root&&t.push(new ue(this._root,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));i=t.pop();){var r=i.node;if(r.length){var s,o=i.x0,a=i.y0,l=i.z0,c=i.x1,h=i.y1,u=i.z1,d=(o+c)/2,f=(a+h)/2,_=(l+u)/2;(s=r[0])&&t.push(new ue(s,o,a,l,d,f,_)),(s=r[1])&&t.push(new ue(s,d,a,l,c,f,_)),(s=r[2])&&t.push(new ue(s,o,f,l,d,h,_)),(s=r[3])&&t.push(new ue(s,d,f,l,c,h,_)),(s=r[4])&&t.push(new ue(s,o,a,_,d,f,u)),(s=r[5])&&t.push(new ue(s,d,a,_,c,f,u)),(s=r[6])&&t.push(new ue(s,o,f,_,d,h,u)),(s=r[7])&&t.push(new ue(s,d,f,_,c,h,u))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.y0,i.z0,i.x1,i.y1,i.z1);return this}function wy(n){return n[0]}function Ay(n){return arguments.length?(this._x=n,this):this._x}function Cy(n){return n[1]}function Ry(n){return arguments.length?(this._y=n,this):this._y}function Py(n){return n[2]}function Dy(n){return arguments.length?(this._z=n,this):this._z}function kf(n,t,e,i){var r=new uc(t??wy,e??Cy,i??Py,NaN,NaN,NaN,NaN,NaN,NaN);return n==null?r:r.addAll(n)}function uc(n,t,e,i,r,s,o,a,l){this._x=n,this._y=t,this._z=e,this._x0=i,this._y0=r,this._z0=s,this._x1=o,this._y1=a,this._z1=l,this._root=void 0}function $u(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var Be=kf.prototype=uc.prototype;Be.copy=function(){var n=new uc(this._x,this._y,this._z,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=$u(t),n;for(e=[{source:t,target:n._root=new Array(8)}];t=e.pop();)for(var r=0;r<8;++r)(i=t.source[r])&&(i.length?e.push({source:i,target:t.target[r]=new Array(8)}):t.target[r]=$u(i));return n};Be.add=py;Be.addAll=my;Be.cover=_y;Be.data=gy;Be.extent=vy;Be.find=xy;Be.remove=yy;Be.removeAll=Sy;Be.root=My;Be.size=Ey;Be.visit=by;Be.visitAfter=Ty;Be.x=Ay;Be.y=Ry;Be.z=Dy;function ss(n){return function(){return n}}function ti(n){return(n()-.5)*1e-6}function Ly(n){return n.index}function Yu(n,t){var e=n.get(t);if(!e)throw new Error("node not found: "+t);return e}function Uy(n){var t=Ly,e=d,i,r=ss(30),s,o,a,l,c,h,u=1;n==null&&(n=[]);function d(p){return 1/Math.min(l[p.source.index],l[p.target.index])}function f(p){for(var v=0,y=n.length;v<u;++v)for(var S=0,w,b,A,L=0,E=0,x=0,R,D;S<y;++S)w=n[S],b=w.source,A=w.target,L=A.x+A.vx-b.x-b.vx||ti(h),a>1&&(E=A.y+A.vy-b.y-b.vy||ti(h)),a>2&&(x=A.z+A.vz-b.z-b.vz||ti(h)),R=Math.sqrt(L*L+E*E+x*x),R=(R-s[S])/R*p*i[S],L*=R,E*=R,x*=R,A.vx-=L*(D=c[S]),a>1&&(A.vy-=E*D),a>2&&(A.vz-=x*D),b.vx+=L*(D=1-D),a>1&&(b.vy+=E*D),a>2&&(b.vz+=x*D)}function _(){if(o){var p,v=o.length,y=n.length,S=new Map(o.map((b,A)=>[t(b,A,o),b])),w;for(p=0,l=new Array(v);p<y;++p)w=n[p],w.index=p,typeof w.source!="object"&&(w.source=Yu(S,w.source)),typeof w.target!="object"&&(w.target=Yu(S,w.target)),l[w.source.index]=(l[w.source.index]||0)+1,l[w.target.index]=(l[w.target.index]||0)+1;for(p=0,c=new Array(y);p<y;++p)w=n[p],c[p]=l[w.source.index]/(l[w.source.index]+l[w.target.index]);i=new Array(y),g(),s=new Array(y),m()}}function g(){if(o)for(var p=0,v=n.length;p<v;++p)i[p]=+e(n[p],p,n)}function m(){if(o)for(var p=0,v=n.length;p<v;++p)s[p]=+r(n[p],p,n)}return f.initialize=function(p,...v){o=p,h=v.find(y=>typeof y=="function")||Math.random,a=v.find(y=>[1,2,3].includes(y))||2,_()},f.links=function(p){return arguments.length?(n=p,_(),f):n},f.id=function(p){return arguments.length?(t=p,f):t},f.iterations=function(p){return arguments.length?(u=+p,f):u},f.strength=function(p){return arguments.length?(e=typeof p=="function"?p:ss(+p),g(),f):e},f.distance=function(p){return arguments.length?(r=typeof p=="function"?p:ss(+p),m(),f):r},f}var Iy={value:()=>{}};function zf(){for(var n=0,t=arguments.length,e={},i;n<t;++n){if(!(i=arguments[n]+"")||i in e||/[\s.]/.test(i))throw new Error("illegal type: "+i);e[i]=[]}return new mo(e)}function mo(n){this._=n}function Oy(n,t){return n.trim().split(/^|\s+/).map(function(e){var i="",r=e.indexOf(".");if(r>=0&&(i=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:i}})}mo.prototype=zf.prototype={constructor:mo,on:function(n,t){var e=this._,i=Oy(n+"",e),r,s=-1,o=i.length;if(arguments.length<2){for(;++s<o;)if((r=(n=i[s]).type)&&(r=Ny(e[r],n.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<o;)if(r=(n=i[s]).type)e[r]=Zu(e[r],n.name,t);else if(t==null)for(r in e)e[r]=Zu(e[r],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new mo(n)},call:function(n,t){if((r=arguments.length-2)>0)for(var e=new Array(r),i=0,r,s;i<r;++i)e[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],i=0,r=s.length;i<r;++i)s[i].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],r=0,s=i.length;r<s;++r)i[r].value.apply(t,e)}};function Ny(n,t){for(var e=0,i=n.length,r;e<i;++e)if((r=n[e]).name===t)return r.value}function Zu(n,t,e){for(var i=0,r=n.length;i<r;++i)if(n[i].name===t){n[i]=Iy,n=n.slice(0,i).concat(n.slice(i+1));break}return e!=null&&n.push({name:t,value:e}),n}var Nr=0,es=0,Kr=0,Bf=1e3,bo,ns,To=0,Qi=0,Io=0,ds=typeof performance=="object"&&performance.now?performance:Date,Hf=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function Vf(){return Qi||(Hf(Fy),Qi=ds.now()+Io)}function Fy(){Qi=0}function Ul(){this._call=this._time=this._next=null}Ul.prototype=Gf.prototype={constructor:Ul,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?Vf():+e)+(t==null?0:+t),!this._next&&ns!==this&&(ns?ns._next=this:bo=this,ns=this),this._call=n,this._time=e,Il()},stop:function(){this._call&&(this._call=null,this._time=1/0,Il())}};function Gf(n,t,e){var i=new Ul;return i.restart(n,t,e),i}function ky(){Vf(),++Nr;for(var n=bo,t;n;)(t=Qi-n._time)>=0&&n._call.call(null,t),n=n._next;--Nr}function ju(){Qi=(To=ds.now())+Io,Nr=es=0;try{ky()}finally{Nr=0,By(),Qi=0}}function zy(){var n=ds.now(),t=n-To;t>Bf&&(Io-=t,To=n)}function By(){for(var n,t=bo,e,i=1/0;t;)t._call?(i>t._time&&(i=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:bo=e);ns=n,Il(i)}function Il(n){if(!Nr){es&&(es=clearTimeout(es));var t=n-Qi;t>24?(n<1/0&&(es=setTimeout(ju,n-ds.now()-Io)),Kr&&(Kr=clearInterval(Kr))):(Kr||(To=ds.now(),Kr=setInterval(zy,Bf)),Nr=1,Hf(ju))}}const Hy=1664525,Vy=1013904223,Ku=4294967296;function Gy(){let n=1;return()=>(n=(Hy*n+Vy)%Ku)/Ku}var Qu=3;function Ra(n){return n.x}function Ju(n){return n.y}function Wy(n){return n.z}var Xy=10,qy=Math.PI*(3-Math.sqrt(5)),$y=Math.PI*20/(9+Math.sqrt(221));function Yy(n,t){t=t||2;var e=Math.min(Qu,Math.max(1,Math.round(t))),i,r=1,s=.001,o=1-Math.pow(s,1/300),a=0,l=.6,c=new Map,h=Gf(f),u=zf("tick","end"),d=Gy();n==null&&(n=[]);function f(){_(),u.call("tick",i),r<s&&(h.stop(),u.call("end",i))}function _(p){var v,y=n.length,S;p===void 0&&(p=1);for(var w=0;w<p;++w)for(r+=(a-r)*o,c.forEach(function(b){b(r)}),v=0;v<y;++v)S=n[v],S.fx==null?S.x+=S.vx*=l:(S.x=S.fx,S.vx=0),e>1&&(S.fy==null?S.y+=S.vy*=l:(S.y=S.fy,S.vy=0)),e>2&&(S.fz==null?S.z+=S.vz*=l:(S.z=S.fz,S.vz=0));return i}function g(){for(var p=0,v=n.length,y;p<v;++p){if(y=n[p],y.index=p,y.fx!=null&&(y.x=y.fx),y.fy!=null&&(y.y=y.fy),y.fz!=null&&(y.z=y.fz),isNaN(y.x)||e>1&&isNaN(y.y)||e>2&&isNaN(y.z)){var S=Xy*(e>2?Math.cbrt(.5+p):e>1?Math.sqrt(.5+p):p),w=p*qy,b=p*$y;e===1?y.x=S:e===2?(y.x=S*Math.cos(w),y.y=S*Math.sin(w)):(y.x=S*Math.sin(w)*Math.cos(b),y.y=S*Math.cos(w),y.z=S*Math.sin(w)*Math.sin(b))}(isNaN(y.vx)||e>1&&isNaN(y.vy)||e>2&&isNaN(y.vz))&&(y.vx=0,e>1&&(y.vy=0),e>2&&(y.vz=0))}}function m(p){return p.initialize&&p.initialize(n,d,e),p}return g(),i={tick:_,restart:function(){return h.restart(f),i},stop:function(){return h.stop(),i},numDimensions:function(p){return arguments.length?(e=Math.min(Qu,Math.max(1,Math.round(p))),c.forEach(m),i):e},nodes:function(p){return arguments.length?(n=p,g(),c.forEach(m),i):n},alpha:function(p){return arguments.length?(r=+p,i):r},alphaMin:function(p){return arguments.length?(s=+p,i):s},alphaDecay:function(p){return arguments.length?(o=+p,i):+o},alphaTarget:function(p){return arguments.length?(a=+p,i):a},velocityDecay:function(p){return arguments.length?(l=1-p,i):1-l},randomSource:function(p){return arguments.length?(d=p,c.forEach(m),i):d},force:function(p,v){return arguments.length>1?(v==null?c.delete(p):c.set(p,m(v)),i):c.get(p)},find:function(){var p=Array.prototype.slice.call(arguments),v=p.shift()||0,y=(e>1?p.shift():null)||0,S=(e>2?p.shift():null)||0,w=p.shift()||1/0,b=0,A=n.length,L,E,x,R,D,N;for(w*=w,b=0;b<A;++b)D=n[b],L=v-D.x,E=y-(D.y||0),x=S-(D.z||0),R=L*L+E*E+x*x,R<w&&(N=D,w=R);return N},on:function(p,v){return arguments.length>1?(u.on(p,v),i):u.on(p)}}}function Zy(){var n,t,e,i,r,s=ss(-30),o,a=1,l=1/0,c=.81;function h(_){var g,m=n.length,p=(t===1?If(n,Ra):t===2?Nf(n,Ra,Ju):t===3?kf(n,Ra,Ju,Wy):null).visitAfter(d);for(r=_,g=0;g<m;++g)e=n[g],p.visit(f)}function u(){if(n){var _,g=n.length,m;for(o=new Array(g),_=0;_<g;++_)m=n[_],o[m.index]=+s(m,_,n)}}function d(_){var g=0,m,p,v=0,y,S,w,b,A=_.length;if(A){for(y=S=w=b=0;b<A;++b)(m=_[b])&&(p=Math.abs(m.value))&&(g+=m.value,v+=p,y+=p*(m.x||0),S+=p*(m.y||0),w+=p*(m.z||0));g*=Math.sqrt(4/A),_.x=y/v,t>1&&(_.y=S/v),t>2&&(_.z=w/v)}else{m=_,m.x=m.data.x,t>1&&(m.y=m.data.y),t>2&&(m.z=m.data.z);do g+=o[m.data.index];while(m=m.next)}_.value=g}function f(_,g,m,p,v){if(!_.value)return!0;var y=[m,p,v][t-1],S=_.x-e.x,w=t>1?_.y-e.y:0,b=t>2?_.z-e.z:0,A=y-g,L=S*S+w*w+b*b;if(A*A/c<L)return L<l&&(S===0&&(S=ti(i),L+=S*S),t>1&&w===0&&(w=ti(i),L+=w*w),t>2&&b===0&&(b=ti(i),L+=b*b),L<a&&(L=Math.sqrt(a*L)),e.vx+=S*_.value*r/L,t>1&&(e.vy+=w*_.value*r/L),t>2&&(e.vz+=b*_.value*r/L)),!0;if(_.length||L>=l)return;(_.data!==e||_.next)&&(S===0&&(S=ti(i),L+=S*S),t>1&&w===0&&(w=ti(i),L+=w*w),t>2&&b===0&&(b=ti(i),L+=b*b),L<a&&(L=Math.sqrt(a*L)));do _.data!==e&&(A=o[_.data.index]*r/L,e.vx+=S*A,t>1&&(e.vy+=w*A),t>2&&(e.vz+=b*A));while(_=_.next)}return h.initialize=function(_,...g){n=_,i=g.find(m=>typeof m=="function")||Math.random,t=g.find(m=>[1,2,3].includes(m))||2,u()},h.strength=function(_){return arguments.length?(s=typeof _=="function"?_:ss(+_),u(),h):s},h.distanceMin=function(_){return arguments.length?(a=_*_,h):Math.sqrt(a)},h.distanceMax=function(_){return arguments.length?(l=_*_,h):Math.sqrt(l)},h.theta=function(_){return arguments.length?(c=_*_,h):Math.sqrt(c)},h}function jy(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Yi(n){let t=typeof n=="string"?jy(n):n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Kn(n){const t=Math.max(n(),1e-9);return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n())}const Wf=Math.PI*(3-Math.sqrt(5));function Ky(n){return 14+5.5*Math.sqrt(Math.max(1,n))}function th(n,t,e=0){if(n.length===0)return[];const r=2*(n.reduce((o,a)=>o+a.r,0)/n.length)+t,s=n.map((o,a)=>{const l=a===0&&e===0?0:e+r*Math.sqrt(a+(e?.6:0)),c=a*Wf;return{id:o.id,r:o.r,x:l*Math.cos(c),z:l*Math.sin(c)}});for(let o=0;o<80;o++){let a=!1;for(let l=0;l<s.length;l++){for(let c=l+1;c<s.length;c++){const h=s[l],u=s[c];let d=u.x-h.x,f=u.z-h.z,_=Math.hypot(d,f);const g=h.r+u.r+t;if(_<g){_<1e-6&&(d=1,f=0,_=1);const m=(g-_)/2;h.x-=d/_*m,h.z-=f/_*m,u.x+=d/_*m,u.z+=f/_*m,a=!0}}if(e){const c=s[l],h=Math.hypot(c.x,c.z)||1,u=e+c.r;h<u&&(c.x*=u/h,c.z*=u/h,a=!0)}}if(!a)break}return s}function Qy(n,t,e){const i=new Map(t.map(h=>[h.slug,h])),r=new Map,s=new Map;for(const h of n){const u=h.topics.map(v=>i.get(v)).filter(v=>!!v),d=new Set(u.map(v=>v.slug)),f=u.filter(v=>!v.parent||!d.has(v.parent)),_=u.length>1&&f.length===1?f[0].slug:null,g=u.sort((v,y)=>+(y.slug===_)-+(v.slug===_)||y.notes-v.notes||v.slug.localeCompare(y.slug)).map(v=>({id:v.slug,r:Ky(v.notes)})),m=th(g,18),p=Math.max(60,...m.map(v=>Math.hypot(v.x,v.z)+v.r))+24;r.set(h.id,m),s.set(h.id,p)}const o={x:0,y:0,z:0,r:26+4*Math.sqrt(e)},a=n.length<=1,l=th(n.map(h=>({id:h.id,r:s.get(h.id)??60})),a?0:70,a?0:o.r+90),c={constellations:new Map,topics:new Map,inbox:o,radius:0};for(const h of l){const u=Yi(`c:${h.id}`),d=a?0:(u()-.5)*.3*h.r;c.constellations.set(h.id,{x:h.x,y:d,z:h.z,r:h.r});const f=(u()-.5)*.7,_=u()*Math.PI*2,g=Math.cos(_),m=Math.sin(_);for(const p of r.get(h.id)??[]){const v=Yi(`t:${p.id}`),y=p.x*g-p.z*m,S=p.x*m+p.z*g,w=Math.sin(f)*y+(v()-.5)*.35*p.r;c.topics.set(p.id,{x:h.x+y*Math.cos(f),y:d+w,z:h.z+S,r:p.r})}c.radius=Math.max(c.radius,Math.hypot(h.x,h.z)+h.r)}if(c.radius=Math.max(c.radius,o.r*3),a){const h=[...c.constellations.values()][0];h&&(o.x=h.x+h.r+o.r+60,c.radius=Math.max(c.radius,h.r+2*o.r+60))}return c}const Jy=new Set(["index","_index","readme"]);function tS(n){if(n.path)return n.path;const t=s=>s.slice(0,Math.max(0,s.lastIndexOf("/"))),e=n.nodes.find(s=>s.id===n.hub);if(e)return t(e.path);const i=n.nodes.map(s=>t(s.path).split("/"));if(!i.length)return"";const r=[];for(let s=0;i.every(o=>o[s]!==void 0&&o[s]===i[0][s]);s++)r.push(i[0][s]);return r.join("/")}function Oo(n){const t=tS(n),e=t?`${t}/`:"",i=new Map;i.set("",{key:"",parent:null,title:n.title,note:n.hub,depth:0,count:0});const r=a=>{let l=i.get(a);if(!l){const c=a.lastIndexOf("/"),h=c<0?"":a.slice(0,c),u=r(h),d=a.slice(c+1);l={key:a,parent:h,title:d,note:null,depth:u.depth+1,count:0},i.set(a,l)}return l},s=new Map,o=[...n.nodes].filter(a=>a.kind!=="episode").sort((a,l)=>a.path.localeCompare(l.path));for(const a of o){const l=a.path.startsWith(e)?a.path.slice(e.length):a.path,c=l.lastIndexOf("/"),h=c<0?"":l.slice(0,c),u=r(h),d=l.slice(c+1).replace(/\.md$/i,"").toLowerCase(),f=h.slice(h.lastIndexOf("/")+1).toLowerCase();h&&!u.note&&(d===f||Jy.has(d))&&(u.note=a.id,u.title=a.title),s.set(a.id,h)}for(const a of s.values())for(let l=i.get(a);l;l=l.parent===null?void 0:i.get(l.parent))l.count++;return{branches:i,folderOf:s}}function eS(n,t){const e=Yi(`n:${n.slug}`),{branches:i,folderOf:r}=Oo(n),s=Math.max(1,i.get("").count),o=E=>i.get(E).note??`branch:${E}`,a=new Map,l=()=>{const E=e()*2-1,x=e()*Math.PI*2,R=Math.sqrt(1-E*E);return[R*Math.cos(x),E*.6,R*Math.sin(x)]},c=E=>t*(.14+.32*Math.sqrt(E.count/s))*Math.pow(.8,E.depth-1),h=E=>E.key===""?t*.45:t*(.05+.12*Math.sqrt(E.count/s)),u=[...i.values()].sort((E,x)=>E.depth-x.depth||E.key.localeCompare(x.key)),d=new Map([["",[0,0,0]]]),f=u.filter(E=>E.depth===1).sort((E,x)=>x.count-E.count||E.key.localeCompare(x.key));f.forEach((E,x)=>{const R=1-2*(x+.5)/f.length,D=Math.sqrt(1-R*R),N=x*Wf;d.set(E.key,[D*Math.cos(N),R*.6,D*Math.sin(N)])});for(const E of u){if(E.key===""){const G=o("");a.set(G,{id:G,note:E.note!==null,x:0,y:0,z:0,fx:0,fy:0,fz:0});continue}const x=i.get(E.parent),R=a.get(o(x.key)),D=E.depth===1?d.get(E.key):l(),N=c(E),X=o(E.key);a.set(X,{id:X,note:E.note!==null,x:(R.x??0)+D[0]*N,y:(R.y??0)+D[1]*N,z:(R.z??0)+D[2]*N})}const _=[];for(const E of u)E.key!==""&&_.push({source:o(E.key),target:o(E.parent),distance:c(E),strength:.9});for(const[E,x]of r){if(a.has(E))continue;const R=i.get(x),D=a.get(o(x)),N=l(),X=h(R)*(.6+.6*e());a.set(E,{id:E,note:!0,x:(D.x??0)+N[0]*X,y:(D.y??0)+N[1]*X,z:(D.z??0)+N[2]*X}),_.push({source:E,target:o(x),distance:h(R),strength:x===""?.08:.7})}const g=[...a.values()],m=n.links.filter(E=>E.rel!=="links_to"&&E.rel!=="part_of"&&E.rel!=="has_part").filter(E=>a.has(E.source)&&a.has(E.target)&&E.source!==E.target).map(E=>({source:E.source,target:E.target,distance:t*.3,strength:.04}));if(g.length>1){const E=[..._,...m];Yy(g,3).force("charge",Zy().strength(-t*.3).distanceMax(t*.8)).force("link",Uy(E).id(R=>R.id).distance(R=>R.distance).strength(R=>R.strength)).stop().tick(g.length<=150?220:g.length<=600?150:90)}let p=1e-6;for(const E of g)p=Math.max(p,Math.hypot(E.x??0,(E.y??0)/.65,E.z??0));const v=t*.85/p,y=E=>[(E.x??0)*v,(E.y??0)*v*.65,(E.z??0)*v],S=[...r.keys()].filter(E=>a.has(E)).sort((E,x)=>+(x===n.hub)-+(E===n.hub)),w=new Float32Array(S.length*3);S.forEach((E,x)=>w.set(y(a.get(E)),x*3));const b=E=>y(a.get(E)),A=[];for(const E of u)E.key!==""&&A.push(...b(o(E.key)),...b(o(E.parent)));for(const[E,x]of r)x!==""&&E!==i.get(x).note&&A.push(...b(E),...b(o(x)));const L=u.filter(E=>E.key!=="").map(E=>({...E,position:b(o(E.key))}));return{ids:S,positions:w,branches:L,skeleton:new Float32Array(A)}}const hc=["conflict","stale","unverified","orphan","lint_error"],nS={constellation:11,topic:7.2,hub:7.2,branch:7,note:6.6,inbox:7.4},iS={constellation:26,topic:24,hub:24,branch:22,note:20,inbox:24};class rS{root;slots=[];v=new k;max=90;constructor(t){this.root=document.createElement("div"),this.root.className="labels",t.appendChild(this.root)}slot(t){let e=this.slots[t];if(!e){const i=document.createElement("div"),r=document.createElement("span");r.className="lbl-dot";const s=document.createElement("span");s.className="lbl-text";const o=document.createElement("span");o.className="lbl-sub",i.append(r,s,o),this.root.appendChild(i),e={el:i,text:s,sub:o,dot:r,key:"",shown:!1},this.slots[t]=e}return e}update(t,e,i,r){const s=[];t.sort((a,l)=>l.priority-a.priority);let o=0;for(const a of t){if(o>=this.max)break;if(this.v.copy(a.pos).project(e),this.v.z>1||this.v.z<-1)continue;const l=(this.v.x*.5+.5)*i,c=(-this.v.y*.5+.5)*r-(a.lift??0),h=a.text.length+(a.sub?a.sub.length+2:0),u=Math.min(360,h*nS[a.kind]+30),d=iS[a.kind],f={x0:l-u/2,y0:c-d,x1:l+u/2,y1:c};if(f.x1<0||f.x0>i||f.y1<0||f.y0>r||s.some(g=>f.x0<g.x1&&f.x1>g.x0&&f.y0<g.y1&&f.y1>g.y0))continue;s.push(f);const _=this.slot(o++);_.key!==a.key?(_.key=a.key,_.el.className=`lbl lbl-${a.kind}${a.emphasis?" lbl-emph":""}`,_.text.textContent=a.text,_.sub.textContent=a.sub??"",_.dot.style.background=a.color??"transparent"):_.el.classList.contains("lbl-emph")!==!!a.emphasis&&_.el.classList.toggle("lbl-emph",!!a.emphasis),_.el.style.transform=`translate3d(${Math.round(l)}px, ${Math.round(c)}px, 0) translate(-50%, -100%)`,_.shown||(_.el.style.opacity="1",_.shown=!0)}for(let a=o;a<this.slots.length;a++){const l=this.slots[a];l.shown&&(l.el.style.opacity="0",l.shown=!1,l.key="")}}setVisible(t){this.root.style.display=t?"":"none"}}function Xf(n){return n.transparent=!0,n.depthWrite=!1,n.blending=Yh,n.blendEquation=Si,n.blendSrc=Va,n.blendDst=Va,n}function Pa(n,t){return Xf(new Ue({uniforms:{uScale:{value:500},uGroups:{value:n},uGroupCount:{value:t},uFalloff:{value:4}},vertexShader:`
        uniform float uScale;
        uniform sampler2D uGroups;
        uniform float uGroupCount;
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        attribute float aGroup;
        varying vec3 vColor;
        varying float vAlpha;
        // Health mode colour: cool grey-blue for the healthiest flagged topics, amber, then red.
        vec3 healthRamp(float s) {
          vec3 cool = vec3(0.3, 0.42, 0.66);
          vec3 amber = vec3(1.0, 0.62, 0.16);
          vec3 red = vec3(1.0, 0.1, 0.18);
          // Dimmer than the topic colours: dense clusters would otherwise clip to white.
          return 0.55 * (s < 0.5 ? mix(cool, amber, s * 2.0) : mix(amber, red, (s - 0.5) * 2.0));
        }
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec4 g = texture2D(uGroups, vec2((aGroup + 0.5) / uGroupCount, 0.5));
          float px = aSize * uScale / max(-mv.z, 1.0);
          gl_PointSize = clamp(px, 0.0, 640.0);
          float lum = max(aColor.r, max(aColor.g, aColor.b));
          vColor = mix(aColor, healthRamp(g.a) * lum, g.b) * (1.0 + g.g);
          // Sub-pixel points fade out instead of shimmering.
          vAlpha = aAlpha * g.r * smoothstep(0.0, 2.0, px);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform float uFalloff;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 p = gl_PointCoord * 2.0 - 1.0;
          float d = dot(p, p);
          if (d > 1.0) discard;
          float a = exp(-d * uFalloff) * vAlpha;
          gl_FragColor = vec4(vColor * a, a);
        }`}))}function sS(){return Xf(new Ue({uniforms:{uScale:{value:500},uHealth:{value:0},uTime:{value:0},uMotion:{value:1},uFade:{value:1}},vertexShader:`
        uniform float uScale;
        uniform float uHealth;
        uniform float uFade;
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        attribute float aFlag;
        attribute float aState;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFlag;
        varying float vState;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float s = aSize;
          float a = aAlpha * uFade;
          if (aState > 2.5) s *= 1.7;            // selected
          else if (aState > 1.5) s *= 1.3;       // neighbour or highlighted
          else if (aState > 0.5) a *= 0.16;      // dimmed by focus
          if (uHealth > 0.5 && aFlag < 0.5) a *= 0.14;
          float px = s * uScale / max(-mv.z, 1.0);
          gl_PointSize = clamp(px, 0.0, aState > 2.5 ? 96.0 : 64.0);
          vColor = aColor;
          vAlpha = a * smoothstep(0.0, 1.5, px);
          vFlag = aFlag;
          vState = aState;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform float uHealth;
        uniform float uTime;
        uniform float uMotion;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vFlag;
        varying float vState;
        vec3 flagColor(float f) {
          if (f < 1.5) return vec3(1.0, 0.22, 0.28);   // conflict
          if (f < 2.5) return vec3(1.0, 0.68, 0.22);   // stale
          if (f < 3.5) return vec3(0.74, 0.52, 1.0);   // unverified
          if (f < 4.5) return vec3(0.62, 0.68, 0.8);   // orphan
          return vec3(1.0, 0.42, 0.78);                // lint error
        }
        void main() {
          vec2 p = gl_PointCoord * 2.0 - 1.0;
          float d = length(p);
          if (d > 1.0) discard;
          float core = exp(-d * d * 14.0);
          float halo = exp(-d * d * 3.2) * 0.42;
          vec3 c = vColor * (core * 1.8 + halo) + vec3(core * 0.35);
          float a = core + halo;
          if (vFlag > 0.5 && (uHealth > 0.5 || vState > 1.5)) {
            float ring = smoothstep(0.09, 0.0, abs(d - 0.76));
            ring *= 0.8 + 0.2 * sin(uTime * 2.2) * uMotion;
            c += flagColor(vFlag) * ring * 1.5;
            a += ring;
          }
          if (vState > 2.5) {
            float sel = smoothstep(0.07, 0.0, abs(d - 0.93));
            c += vec3(0.9, 0.95, 1.0) * sel * 1.2;
            a += sel;
          }
          gl_FragColor = vec4(c * vAlpha, a * vAlpha);
        }`}))}const oS={uniforms:{tDiffuse:{value:null},uStrength:{value:.55},uTime:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uStrength;
    uniform float uTime;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 q = vUv - 0.5;
      float v = smoothstep(0.85, 0.2, length(q) * 1.15);
      c.rgb *= mix(1.0 - uStrength, 1.0, v);
      c.rgb += (hash(vUv * 1024.0 + uTime) - 0.5) * 0.012;
      gl_FragColor = c;
    }`};gn.install({THREE:{Vector2:zt,Vector3:k,Vector4:he,Quaternion:kr,Matrix4:me,Spherical:Vm,Box3:hi,Sphere:Ai,Raycaster:Hm}});const qf=["part_of","depends_on","conflicts_with","supersedes","related_to","links_to"],Gn={part_of:"#5d6b8a",depends_on:"#4f8dff",conflicts_with:"#ff3b4f",supersedes:"#ffb347",related_to:"#9a7bff",links_to:"#7f8aa3"},Da={part_of:{width:1,opacity:.32,dashed:!1},depends_on:{width:1.7,opacity:.75,dashed:!0},conflicts_with:{width:2.4,opacity:.95,dashed:!1},supersedes:{width:2,opacity:.85,dashed:!0},related_to:{width:1.2,opacity:.38,dashed:!1},links_to:{width:1,opacity:.22,dashed:!1}},Ol=.68,aS=new k(0,Math.cos(Ol),Math.sin(Ol));function La(n,t,e){switch(n){case"part_of":return["part_of",t,e];case"has_part":return["part_of",e,t];case"depends_on":return["depends_on",e,t];case"enables":return["depends_on",t,e];case"supersedes":return["supersedes",e,t];case"superseded_by":return["supersedes",t,e];case"conflicts_with":return["conflicts_with",t,e];case"related_to":return["related_to",t,e];case"links_to":return["links_to",t,e];default:return null}}function eh(n,t){if(!n)return .55;const e=Date.parse(n);if(Number.isNaN(e))return .55;const i=Math.max(0,(t-e)/864e5);return .45+.55*Math.exp(-i/75)}function Ji(n){return n.split(" · ")[0]}class nh{constructor(t){this.count=t;const e=Math.max(1,t);this.value=new Float32Array(e*4),this.target=new Float32Array(e*4);for(let i=0;i<e;i++)this.value[i*4]=this.target[i*4]=1;this.texture=new Sf(this.value,e,1,un,Ln),this.texture.magFilter=$e,this.texture.minFilter=$e,this.texture.needsUpdate=!0}value;target;texture;set(t,e,i,r,s){this.target.set([e,i,r,s],t*4)}ease(t){let e=!1;for(let i=0;i<this.value.length;i++){const r=this.target[i]-this.value[i];Math.abs(r)>.001&&(this.value[i]+=r*t,e=!0)}e&&(this.texture.needsUpdate=!0)}}const no=new jt;function Qn(n,t=1){return no.set(n),[no.r*t,no.g*t,no.b*t]}class lS{constructor(t,e,i,r,s){this.container=t,this.world=e,this.source=i,this.events=r,this.qualityMode=s,s!=="auto"&&(this.quality=s),this.topics=e.topics,e.topics.forEach((a,l)=>{this.topicIndex.set(a.slug,l),this.topicBySlug.set(a.slug,a)}),this.layout=Qy(e.constellations,e.topics,e.episodes.count),this.renderer=new wx({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(197899,1),this.renderer.toneMapping=$l,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.className="scene-canvas",t.appendChild(this.renderer.domElement);const o=this.layout.radius;this.camera=new xn(50,1,.5,o*30),this.controls=new gn(this.camera,this.renderer.domElement),this.controls.dollyToCursor=!0,this.controls.smoothTime=this.motion?.55:0,this.controls.draggingSmoothTime=.12,this.controls.minDistance=4,this.controls.maxDistance=o*7,this.controls.dollySpeed=.6,this.controls.minPolarAngle=this.controls.maxPolarAngle=Ol,this.controls.minAzimuthAngle=this.controls.maxAzimuthAngle=0,this.controls.mouseButtons.left=gn.ACTION.SCREEN_PAN,this.controls.mouseButtons.right=gn.ACTION.SCREEN_PAN,this.controls.mouseButtons.middle=gn.ACTION.DOLLY,this.controls.mouseButtons.wheel=gn.ACTION.DOLLY,this.controls.touches.one=gn.ACTION.TOUCH_SCREEN_PAN,this.controls.touches.two=gn.ACTION.TOUCH_DOLLY,this.controls.touches.three=gn.ACTION.NONE,this.controls.addEventListener("controlstart",()=>{this.userDriven=!0}),this.renderer.domElement.addEventListener("wheel",()=>{this.userDriven=!0},{passive:!0}),this.groups=new nh(this.topics.length),this.dustGroups=new nh(e.constellations.length),this.severity=Ha(this.topics),this.dustSeverity=Ha(e.constellations.map(a=>{const l=a.topics.map(c=>this.topicBySlug.get(c)).filter(c=>!!c);return{notes:l.reduce((c,h)=>c+h.notes,0),flagged:l.reduce((c,h)=>c+h.flagged,0)}})),this.buildStarfield(),this.buildDust(),this.buildNebulae(),this.buildInbox(),this.scene.add(this.flowGroup),this.scene.add(this.focusLines),this.composer=new Ix(this.renderer),this.composer.addPass(new Nx(this.scene,this.camera)),this.bloom=new Or(new zt(256,256),.95,.6,.08),this.composer.addPass(this.bloom),this.vignette=new Lf(oS),this.composer.addPass(this.vignette),this.composer.addPass(new Ox),this.labels=new rS(t),this.bindPointer(),this.resize(),window.addEventListener("resize",this.resize),this.flyTo({},!0),this.buildFlows(),this.renderer.setAnimationLoop(this.frame)}layout;camera;renderer;scene=new Tm;controls;composer;bloom;bloomTarget=.95;vignette;labels;clock=new bf;topics;topicIndex=new Map;topicBySlug=new Map;groups;dustGroups;glowMats=[];starMats=new Set;lineMats=new Map;flowGroup=new $i;focusLines=new $i;revealed=new Map;pending=new Map;topicPx=new Map;focus={};neighborhood=new Map;run=null;layers={part_of:!0,depends_on:!0,conflicts_with:!0,supersedes:!0,related_to:!0,links_to:!1};health=!1;severity;dustSeverity;motion=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;quality="high";qualityMode="auto";autoDecided=!1;autoFrom=1.5;autoSamples=[];frameTimes=[];lastLod=0;pointer={x:0,y:0,down:!1,dx:0,dy:0,moved:!1,dirty:!1,inside:!1};hovered=null;flowHits=[];focusHits=[];hoverLine=null;hoverEnds=new Set;hoverTopics=new Set;now=Date.now();disposed=!1;userDriven=!1;fps=0;points(t,e,i,r={}){const s={position:new Float32Array(t*3),aColor:new Float32Array(t*3),aSize:new Float32Array(t),aAlpha:new Float32Array(t),aGroup:new Float32Array(t)};for(const[l,c]of Object.entries(r))s[l]=new Float32Array(t*c);for(let l=0;l<t;l++)e(l,s);const o=new fn;o.setAttribute("position",new Ee(s.position,3)),o.setAttribute("aColor",new Ee(s.aColor,3));for(const l of["aSize","aAlpha","aGroup"])o.setAttribute(l,new Ee(s[l],1));for(const[l,c]of Object.entries(r))o.setAttribute(l,new Ee(s[l],c));o.computeBoundingSphere();const a=new au(o,i);return a.frustumCulled=!1,a}plainGlow(t=4){const e=new Sf(new Float32Array([1,0,0,1]),1,1,un,Ln);e.needsUpdate=!0;const i=Pa(e,1);return i.uniforms.uFalloff.value=t,this.glowMats.push(i),i}buildStarfield(){const t=this.layout.radius,e=Yi("starfield"),r=this.points(6500,(s,o)=>{const a=e()*2-1,l=e()*Math.PI*2,c=Math.sqrt(1-a*a),h=t*(3.2+e()*4);o.position.set([h*c*Math.cos(l),h*a,h*c*Math.sin(l)],s*3);const u=e();o.aColor.set(u<.15?[1,.85,.7]:u<.4?[.75,.85,1]:[.9,.93,1],s*3),o.aSize[s]=t*(.006+.012*e()**3),o.aAlpha[s]=.25+.6*e()},this.plainGlow(6));this.scene.add(r)}buildDust(){const e=this.world.constellations,i=Pa(this.dustGroups.texture,Math.max(1,e.length));i.uniforms.uFalloff.value=2.5,this.glowMats.push(i);const r=this.points(e.length*70,(s,o)=>{const a=Math.floor(s/70),l=e[a],c=this.layout.constellations.get(l.id),h=Yi(`dust:${l.id}:${s%70}`);o.position.set([c.x+Kn(h)*c.r*.55,c.y+Kn(h)*c.r*.12,c.z+Kn(h)*c.r*.55],s*3),o.aColor.set(Qn(l.color,.9),s*3),o.aSize[s]=c.r*(.5+.6*h()),o.aAlpha[s]=.018+.03*h(),o.aGroup[s]=a},i);this.scene.add(r)}buildNebulae(){const t=[];this.topics.forEach(r=>{const s=Math.max(10,Math.min(80,Math.round(10+r.notes*.55)));t.push({slug:r.slug,i:0,kind:"core"});for(let a=0;a<s;a++)t.push({slug:r.slug,i:a,kind:"cloud"});const o=Math.min(6,r.flags.conflict??0);for(let a=0;a<o;a++)t.push({slug:r.slug,i:a,kind:"conflict"})});const e=Pa(this.groups.texture,Math.max(1,this.topics.length));this.glowMats.push(e);const i=this.points(t.length,(r,s)=>{const o=t[r],a=this.topicBySlug.get(o.slug),l=this.layout.topics.get(o.slug),c=this.topicIndex.get(o.slug),h=eh(a.updated,this.now)*(1+Math.min(.4,a.recent/Math.max(1,a.notes)));if(s.aGroup[r]=c,o.kind==="core"){s.position.set([l.x,l.y,l.z],r*3),s.aColor.set(Qn(a.color,1.25),r*3),s.aSize[r]=l.r*.95,s.aAlpha[r]=.75*h;return}const u=Yi(`neb:${o.slug}:${o.kind}:${o.i}`),d=o.kind==="conflict"?.3:.42;if(s.position.set([l.x+Kn(u)*l.r*d,l.y+Kn(u)*l.r*d*.5,l.z+Kn(u)*l.r*d],r*3),o.kind==="conflict")s.aColor.set([1,.2,.26],r*3),s.aSize[r]=l.r*.38,s.aAlpha[r]=.35;else{const[f,_,g]=Qn(a.color),m=.75+.5*u();s.aColor.set([f*m,_*m,g*m],r*3),s.aSize[r]=l.r*(.3+.45*u()),s.aAlpha[r]=(.08+.1*u())*h}},e);this.scene.add(i)}buildInbox(){const t=this.layout.inbox,e=Math.min(420,this.world.episodes.count)+1,i=Yi("inbox"),r=this.points(e,(s,o)=>{if(s===0){o.position.set([t.x,t.y,t.z],0),o.aColor.set([1.2,1.05,.8],0),o.aSize[0]=t.r*1.6,o.aAlpha[0]=this.world.episodes.count?.85:.25;return}o.position.set([t.x+Kn(i)*t.r*.45,t.y+Kn(i)*t.r*.3,t.z+Kn(i)*t.r*.45],s*3),o.aColor.set(i()<.5?[1,.86,.55]:[1,.95,.85],s*3),o.aSize[s]=2+3*i(),o.aAlpha[s]=.5+.5*i()},this.plainGlow(5));this.scene.add(r)}lineMaterial(t,e,i,r){let s=this.lineMats.get(t);return s||(s=new Pf({color:16777215,linewidth:e,vertexColors:!0,transparent:!0,opacity:i,dashed:r,dashSize:2.5,gapSize:16,dashScale:1,worldUnits:!1}),s.depthWrite=!1,s.blending=yo,s.resolution.set(this.container.clientWidth,this.container.clientHeight),this.lineMats.set(t,s)),s}trail(t,e,i,r,s,o){const a=o&&this.motion,l=this.segments(t,e,this.lineMaterial(i,r,a?s*.55:s,!1));return a?[l,this.segments(t,e,this.lineMaterial(`${i}:pulse`,r+.8,Math.min(1,s+.2),!0))]:[l]}segments(t,e,i){const r=new Df;r.setPositions(t),r.setColors(e);const s=new Rx(r,i);return i.dashed&&s.computeLineDistances(),s.frustumCulled=!1,s}buildFlows(){for(const d of[...this.flowGroup.children])this.flowGroup.remove(d),d.geometry.dispose();const t=Jr(this.focus),e=[];this.flowHits=[];const i=d=>this.topicBySlug.get(d)?.constellation,r=this.run?new Set(Object.keys(this.run.topics)):null,s=r?new Set([...r].map(i)):null,o=d=>{const f=this.layout.topics.get(d);return new k(f.x,f.y,f.z)},a=d=>{const f=this.layout.constellations.get(d);return new k(f.x,f.y,f.z)},l=new Map(this.world.constellations.map(d=>[d.id,d.color]));if(t==="galaxy"&&this.world.constellations.length>1){const d=new Map,f=new Map;for(const _ of this.world.flows){const g=i(_.a),m=i(_.b);if(!g||!m||g===m)continue;const p=g<m?`${g}|${m}`:`${m}|${g}`;d.set(p,(d.get(p)??0)+_.total);const v=f.get(p)??{};for(const[y,S]of Object.entries(_.rels))v[y]=(v[y]??0)+S;f.set(p,v)}[...d.entries()].sort((_,g)=>g[1]-_[1]).slice(0,70).forEach(([_,g])=>{const[m,p]=_.split("|");e.push({a:a(m),b:a(p),ca:l.get(m),cb:l.get(p),w:g,lit:!s||s.has(m)||s.has(p),ka:m,kb:p,rels:f.get(_)??{}})})}else{const d=g=>!this.focus.constellation||i(g)===this.focus.constellation,f=this.focus.topic;this.world.flows.filter(g=>f?g.a===f||g.b===f:d(g.a)&&d(g.b)).sort((g,m)=>m.total-g.total).slice(0,f?24:160).forEach(g=>{e.push({a:o(g.a),b:o(g.b),ca:this.topicBySlug.get(g.a).color,cb:this.topicBySlug.get(g.b).color,w:g.total,lit:!r||r.has(g.a)||r.has(g.b),ka:g.a,kb:g.b,rels:g.rels})})}if(e.length===0)return;const c=e.map(d=>d.w).sort((d,f)=>d-f),h=d=>c[Math.min(c.length-1,Math.floor(d*c.length))],u=[{max:h(.6),width:1,opacity:.14},{max:h(.9),width:1.8,opacity:.22},{max:1/0,width:2.8,opacity:.32}];u.forEach((d,f)=>{const _=[],g=[],m=f===0?-1/0:u[f-1].max;for(const p of e){if(!(p.w>m&&p.w<=d.max))continue;const v=p.a.clone().add(p.b).multiplyScalar(.5);v.y+=p.a.distanceTo(p.b)*.22;const S=new Im(p.a,v,p.b).getPoints(14);this.flowHits.push({level:t==="galaxy"&&this.world.constellations.length>1?"constellation":"topic",a:p.ka,b:p.kb,total:p.w,rels:p.rels,points:S});const[w,b,A]=Qn(p.ca),[L,E,x]=Qn(p.cb),R=p.lit?1:.15;for(let D=0;D<S.length-1;D++){const N=D/(S.length-1),X=(D+1)/(S.length-1);_.push(S[D].x,S[D].y,S[D].z,S[D+1].x,S[D+1].y,S[D+1].z);const G=(.35+.65*Math.abs(N-.5)*2)*R,Y=(.35+.65*Math.abs(X-.5)*2)*R;g.push((w+(L-w)*N)*G,(b+(E-b)*N)*G,(A+(x-A)*N)*G,(w+(L-w)*X)*Y,(b+(E-b)*X)*Y,(A+(x-A)*X)*Y)}}_.length&&this.flowGroup.add(this.segments(_,g,this.lineMaterial(`flow${f}`,d.width,d.opacity,!1)))}),this.dimFlows()}reveal(t){if(this.revealed.has(t))return Promise.resolve();let e=this.pending.get(t);return e||(e=this.load(t).finally(()=>this.pending.delete(t)),this.pending.set(t,e)),e}async load(t){const e=await this.source.topic(t);if(!e||this.disposed)return;const i=this.layout.topics.get(t);i&&(this.revealed.set(t,this.buildLayer(e,i)),this.focus.note&&this.buildNeighborhood(),this.refreshStates(),this.refreshGroups())}buildLayer(t,e){const i=eS(t,e.r),r=new k(e.x,e.y,e.z),s=new Map(t.nodes.map(D=>[D.id,D])),o=i.ids.map(D=>s.get(D)),a=new Map(i.ids.map((D,N)=>[D,N])),l=o.length,c=sS();c.uniforms.uScale.value=this.pointScale(),c.uniforms.uHealth.value=this.health?1:0,c.uniforms.uMotion.value=this.motion?1:0,c.uniforms.uFade.value=0,this.starMats.add(c);const h=new fn,u=new Float32Array(l*3),d=new Float32Array(l),f=new Float32Array(l),_=new Float32Array(l),g=new Float32Array(l),m=new Float32Array(l*3),[p,v,y]=Qn(t.color),S=new Map(i.branches.filter(D=>D.note).map(D=>[D.note,D.count]));o.forEach((D,N)=>{const X=D.id===t.hub,G=D.status==="superseded"||D.status==="archived",Y=X?.25:.55;u.set([p*(1-Y)+Y,v*(1-Y)+Y,y*(1-Y)+Y],N*3),G&&u.set([.55,.58,.66],N*3),d[N]=X?8:Math.min(6.5,1.8+1.1*Math.sqrt(D.degree));const Q=S.get(D.id);Q&&(d[N]=Math.max(d[N],Math.min(7,3+.5*Math.sqrt(Q)))),f[N]=(G?.32:1)*eh(D.updated,this.now);const Z=hc.findIndex(at=>D.flags.includes(at));_[N]=Z<0?0:Z+1,m[N*3]=i.positions[N*3]+r.x,m[N*3+1]=i.positions[N*3+1]+r.y,m[N*3+2]=i.positions[N*3+2]+r.z}),h.setAttribute("position",new Ee(i.positions,3)),h.setAttribute("aColor",new Ee(u,3)),h.setAttribute("aSize",new Ee(d,1)),h.setAttribute("aAlpha",new Ee(f,1)),h.setAttribute("aFlag",new Ee(_,1));const w=new Ee(g,1);w.setUsage(Ip),h.setAttribute("aState",w);const b=new au(h,c);b.frustumCulled=!1;const A=new $i;A.position.copy(r),A.add(b);const L=D=>{const N=a.get(D);return N===void 0?null:[i.positions[N*3],i.positions[N*3+1],i.positions[N*3+2]]},E=new Map;for(const D of t.links){const N=La(D.rel,D.source,D.target);if(!N)continue;const[X,G,Y]=N;if(X==="part_of")continue;const Q=L(G),Z=L(Y);if(!Q||!Z||G===Y)continue;let at=E.get(X);at||E.set(X,at={pos:[],colors:[]}),at.pos.push(...Q,...Z);const P=Qn(Gn[X]);at.colors.push(P[0]*.55,P[1]*.55,P[2]*.55,P[0],P[1],P[2])}const x=new Map;for(const[D,N]of E){const X=Da[D],G=this.trail(N.pos,N.colors,`fam:${D}`,X.width,X.opacity,X.dashed);for(const Y of G)Y.visible=!1,A.add(Y);x.set(D,G)}if(i.skeleton.length){const D=[];for(let G=0;G<i.skeleton.length/6;G++)D.push(p*.5,v*.5,y*.5,p*.8,v*.8,y*.8);const N=Da.part_of,X=this.trail([...i.skeleton],D,"fam:part_of",N.width,N.opacity,!1);for(const G of X)G.visible=!1,A.add(G);x.set("part_of",X)}this.scene.add(A);const R=new Set(i.branches.flatMap(D=>D.note?[D.note]:[]));return{slug:t.slug,data:t,center:r,radius:e.r,group:A,stars:b,material:c,state:w,sizes:d,ids:i.ids,index:a,nodes:o,world:m,lines:x,branches:i.branches,branchNotes:R,fade:0,target:1}}disposeLayer(t){this.scene.remove(t.group),t.stars.geometry.dispose(),t.material.dispose(),this.starMats.delete(t.material);for(const e of t.lines.values())for(const i of e)i.geometry.dispose()}setFocus(t,e=!0){const i=Jr(t)!==Jr(this.focus)||t.constellation!==this.focus.constellation||t.topic!==this.focus.topic;this.focus={...t},this.buildNeighborhood(),t.topic&&this.reveal(t.topic),i&&this.buildFlows(),this.refreshGroups(),this.refreshStates(),e&&this.flyTo(t)}buildNeighborhood(){this.neighborhood.clear(),this.focusHits=[];for(const h of[...this.focusLines.children])this.focusLines.remove(h),h.geometry.dispose();const t=this.focus,e=t.note&&t.topic?this.revealed.get(t.topic):void 0,i=e&&t.note?e.index.get(t.note):void 0;if(!e||i===void 0||!t.note)return;this.neighborhood.set(t.note,3);const r=[e.world[i*3],e.world[i*3+1],e.world[i*3+2]],s=(h,u)=>{for(const f of[e,u?this.revealed.get(u):void 0]){const _=f?.index.get(h);if(f&&_!==void 0)return[f.world[_*3],f.world[_*3+1],f.world[_*3+2]]}const d=u?this.layout.topics.get(u):void 0;return d?[d.x,d.y,d.z]:null},o=new Map,a={id:t.note,title:e.nodes[i].title,topic:e.slug},l=(h,u,d,f,_,g)=>{if(h==="links_to")return;const m=La(h,u,d),p=s(f,_);if(!m||!p)return;this.neighborhood.has(f)||this.neighborhood.set(f,2);const[v,y]=m,S=y===t.note,w={id:f,title:g,topic:_??e.slug};this.focusHits.push(S?{family:v,from:a,to:w,a:r,b:p}:{family:v,from:w,to:a,a:p,b:r});let b=o.get(v);b||o.set(v,b={pos:[],colors:[]}),b.pos.push(...S?r:p,...S?p:r);const A=Qn(Gn[v]);b.colors.push(A[0]*.5,A[1]*.5,A[2]*.5,A[0]*1.2,A[1]*1.2,A[2]*1.2)},c=h=>e.nodes[e.index.get(h)??-1]?.title??h;for(const h of e.data.links)h.source===t.note?l(h.rel,h.source,h.target,h.target,e.slug,c(h.target)):h.target===t.note&&l(h.rel,h.source,h.target,h.source,e.slug,c(h.source));for(const h of e.data.external)h.source===t.note?l(h.rel,h.source,h.target,h.target,h.topic,h.title):h.target===t.note&&l(h.rel,h.source,h.target,h.source,h.topic,h.title);for(const[h,u]of o){const d=Da[h];for(const f of this.trail(u.pos,u.colors,`focus:${h}`,d.width+1,Math.min(1,d.opacity+.25),d.dashed))this.focusLines.add(f)}}setRun(t){this.run=t,this.buildFlows(),this.refreshGroups(),this.refreshStates()}setLayers(t){this.layers={...t};for(const e of this.revealed.values())for(const[i,r]of e.lines)for(const s of r)s.visible=this.layers[i]&&e.fade>.05}setHealth(t){this.health=t;for(const e of this.starMats)e.uniforms.uHealth.value=t?1:0;this.dimFlows(),this.refreshGroups()}dimFlows(){for(const[t,e]of this.lineMats)t.startsWith("flow")&&(e.userData.base??=e.opacity,e.opacity=e.userData.base*(this.health?.3:1))}setLabels(t){this.labels.setVisible(t)}setQualityMode(t){if(this.qualityMode=t,t!=="auto"){this.quality=t;return}this.quality="high",this.autoDecided=!1,this.autoSamples=[],this.autoFrom=this.clock.elapsedTime+1.5}refreshGroups(){const t=this.focus,e=this.run?new Set(Object.keys(this.run.topics)):null;this.topics.forEach((i,r)=>{let s=1,o=0;t.topic?s=i.slug===t.topic?t.note?.05:.1:.22:t.constellation&&(s=i.constellation===t.constellation?1:.3),this.revealed.has(i.slug)&&i.slug!==t.topic&&(s*=.45);const a=this.severity[r];this.health&&(s*=.3+.7*a),e&&(e.has(i.slug)?o=.45:s*=.12),this.groups.set(r,s,o,this.health?1:0,a)}),this.world.constellations.forEach((i,r)=>{const s=this.dustSeverity[r];let o=t.note?.3:t.topic||t.constellation?.4:1;this.health&&(o*=.35+.65*s),this.dustGroups.set(r,o,0,this.health?1:0,s)});for(const i of this.revealed.values())i.target=!t.topic||i.slug===t.topic||this.run?.topics[i.slug]?1:.3;this.bloomTarget=t.note?.45:t.topic?.5:.95}refreshStates(){const t=this.run?new Set(this.run.touched):null;for(const e of this.revealed.values()){const i=e.state.array;e.ids.forEach((r,s)=>{let o=0;this.neighborhood.size&&(o=this.neighborhood.get(r)??1),t&&(o=t.has(r)?Math.max(o,2):o||1),this.hoverEnds.has(r)&&(o=Math.max(o,2)),i[s]=o}),e.state.needsUpdate=!0}}flyTo(t,e=!1){this.userDriven=!1;const i=!e&&this.motion,r=this.layout.radius,s=(l,c)=>{const h=l.clone().addScaledVector(aS,c);this.controls.setLookAt(h.x,h.y,h.z,l.x,l.y,l.z,i)};if(t.note&&t.topic){const l=this.revealed.get(t.topic),c=l?.index.get(t.note);if(l&&c!==void 0){const d=new k(l.world[c*3],l.world[c*3+1],l.world[c*3+2]);s(d,Math.max(48,l.radius*1.1));return}const h=t.topic,u=t.note;this.reveal(h).then(()=>{this.focus.note===u&&this.revealed.get(h)?.index.has(u)&&this.flyTo(this.focus)})}if(t.topic){const l=this.layout.topics.get(t.topic);l&&s(new k(l.x,l.y,l.z),l.r*3.1);return}const o=t.constellation?this.layout.constellations.get(t.constellation):this.world.constellations.length===1?this.layout.constellations.get(this.world.constellations[0].id):void 0;if(o){s(new k(o.x,o.y,o.z),o.r*2.4);return}const a=r/Math.sin(this.camera.fov*Math.PI/360)/Math.min(1,this.camera.aspect);s(new k(-r*.08,0,0),a*.86)}resetView(){this.flyTo({})}view(){return{pos:this.camera.position.clone(),target:this.controls.getTarget(new k)}}pointScale(){return this.renderer.getDrawingBufferSize(new zt).y/(2*Math.tan(this.camera.fov*Math.PI/360))}resize=()=>{const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setSize(t,e,!1),this.composer.setSize(t,e),this.bloom.resolution.set(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();const i=this.pointScale();for(const r of this.glowMats)r.uniforms.uScale.value=i;for(const r of this.starMats)r.uniforms.uScale.value=i;for(const r of this.lineMats.values())r.resolution.set(t,e)};frame=()=>{if(this.disposed)return;const t=Math.min(.1,this.clock.getDelta()),e=this.clock.elapsedTime;this.controls.update(t),this.trackFps(t);const i=performance.now();i-this.lastLod>120&&(this.lastLod=i,this.updateLod()),this.animate(t,e),this.pointer.dirty&&(this.pointer.dirty=!1,this.hover()),this.updateLabels(),this.quality==="high"?(this.vignette.uniforms.uTime.value=e,this.composer.render(t)):this.renderer.render(this.scene,this.camera)};trackFps(t){this.frameTimes.push(t),this.frameTimes.length>60&&this.frameTimes.shift();const e=this.frameTimes.reduce((o,a)=>o+a,0)/this.frameTimes.length;if(this.fps=e>0?1/e:0,this.qualityMode!=="auto"||this.autoDecided)return;const i=this.clock.elapsedTime;if(i<this.autoFrom||(this.autoSamples.push(t),i<this.autoFrom+2.5||this.autoSamples.length<20))return;const r=[...this.autoSamples].sort((o,a)=>o-a),s=r[r.length>>1]>1/30?"low":"high";this.autoDecided=!0,this.autoSamples=[],this.quality=s,this.events.quality(s,!0)}animate(t,e){const i=1-Math.exp(-t*6);this.groups.ease(i),this.dustGroups.ease(i),this.bloom.strength+=(this.bloomTarget-this.bloom.strength)*i;for(const[r,s]of[...this.revealed]){s.fade+=(s.target-s.fade)*i,s.material.uniforms.uFade.value=s.fade,s.material.uniforms.uTime.value=e,s.group.visible=s.fade>.02;for(const[o,a]of s.lines)for(const l of a)l.visible=this.layers[o]&&s.fade>.05;s.target===0&&s.fade<.03&&(this.disposeLayer(s),this.revealed.delete(r))}if(this.motion)for(const[r,s]of this.lineMats)s.dashed&&(s.dashOffset-=t*(r.includes("supersedes")?9:14))}viewSample(t){const e=this.controls.getTarget(new k,!1),i=this.camera.position,r=(c,h)=>Math.hypot(c-e.x,h-e.z);let s=null,o=1.6;for(const c of this.topics){const h=this.layout.topics.get(c.slug),u=r(h.x,h.z)/h.r;u<o&&(o=u,s={slug:c.slug,constellation:c.constellation,size:(this.topicPx.get(c.slug)??0)/t})}const a=c=>{const h=this.layout.constellations.get(c);return h?rr(h.r,i.distanceTo(new k(h.x,h.y,h.z)),t,this.camera.fov)/t:0};let l=null;o=1.3;for(const c of this.world.constellations){const h=this.layout.constellations.get(c.id),u=r(h.x,h.z)/h.r;u<o&&(o=u,l={id:c.id,size:a(c.id)})}return{nearTopic:s,nearConstellation:l,focusTopicSize:this.focus.topic?(this.topicPx.get(this.focus.topic)??0)/t:0,focusConstellationSize:this.focus.constellation?a(this.focus.constellation):0,multi:this.world.constellations.length>1,only:this.world.constellations.length===1?this.world.constellations[0].id:void 0}}updateLod(){const t=this.container.clientHeight||1,e=new sc().setFromProjectionMatrix(new me().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse)),i=new Ai,r=this.topics.map(l=>{const c=this.layout.topics.get(l.slug);i.center.set(c.x,c.y,c.z),i.radius=c.r;const h=rr(c.r,this.camera.position.distanceTo(i.center),t,this.camera.fov);return this.topicPx.set(l.slug,h),{slug:l.slug,px:h,visible:e.intersectsSphere(i)}});this.events.view(this.viewSample(t),this.userDriven);const s=new Set([...this.revealed].filter(([,l])=>l.target>0).map(([l])=>l)),o=Yd(r,s);if(this.focus.topic&&o.add(this.focus.topic),this.run)for(const l of Object.keys(this.run.topics))(this.topicPx.get(l)??0)>40&&o.add(l);let a=!1;for(const l of o){const c=this.revealed.get(l);c?c.target===0&&(a=!0,c.target=1):this.reveal(l)}for(const[l,c]of this.revealed)!o.has(l)&&c.target!==0&&(c.target=0,a=!0);a&&this.refreshGroups()}updateLabels(){const t=this.container.clientWidth,e=this.container.clientHeight,i=[],r=this.camera.position,s=Jr(this.focus),o=e/2/Math.tan(this.camera.fov*Math.PI/360),a=this.layout.inbox,l=rr(a.r,r.distanceTo(new k(a.x,a.y,a.z)),e,this.camera.fov);if(l>6&&i.push({key:"inbox",kind:"inbox",text:"Inbox",sub:`${this.world.episodes.count} pending`,color:"#ffd88a",pos:new k(a.x,a.y,a.z),priority:7e3,lift:Math.min(l,60)*.6}),this.world.constellations.length>1)for(const h of this.world.constellations){if(this.focus.constellation===h.id&&s!=="galaxy")continue;const u=this.layout.constellations.get(h.id),d=new k(u.x,u.y,u.z),f=rr(u.r,r.distanceTo(d),e,this.camera.fov);f<16||f>1500||i.push({key:`c:${h.id}`,kind:"constellation",text:Ji(h.title),sub:`${h.topics.length} topics`,color:h.color,pos:d,priority:6e3+f,lift:Math.min(f*.55,120),emphasis:this.hoverTopics.has(h.id)})}for(const h of this.topics){const u=this.topicPx.get(h.slug)??0,d=this.focus.topic===h.slug,f=this.revealed.get(h.slug);if(u<(s==="galaxy"&&this.world.constellations.length>1?15:8)&&!d||f&&f.fade>.5&&u>(d?220:520))continue;const _=this.layout.topics.get(h.slug),g=!this.focus.constellation||h.constellation===this.focus.constellation,m=this.run?.topics[h.slug];i.push({key:`t:${h.slug}`,kind:"topic",text:h.title,sub:m?`${m} changed`:h.flagged?`${h.notes} · ${h.flagged}⚑`:`${h.notes}`,color:h.color,pos:new k(_.x,_.y,_.z),priority:(d?9e3:3e3)+u*2+(g?400:0)+(this.health&&h.flagged?600:0)+(m?5e3:0)+(this.hoverTopics.has(h.slug)?6e3:0),lift:Math.min(u,140)*.62,emphasis:d||!!m||this.hovered===`t:${h.slug}`||this.hoverTopics.has(h.slug)})}const c=new k;for(const h of this.revealed.values()){if(h.fade<.5||(this.topicPx.get(h.slug)??0)<200)continue;const u=h.nodes.map((d,f)=>({nd:d,i:f})).sort((d,f)=>f.nd.degree-d.nd.degree).slice(0,140);for(const d of h.branches){const f=d.note?Math.max(this.neighborhood.get(d.note)??0,this.hoverEnds.has(d.note)?2:0):0,_=!!d.note&&this.hovered===`n:${d.note}`;i.push({key:`b:${h.slug}:${d.key}`,kind:"branch",text:d.title,sub:`${d.count}`,pos:new k(d.position[0]+h.center.x,d.position[1]+h.center.y,d.position[2]+h.center.z),priority:f>=2||_?12e3:5200+d.count*8-d.depth*300,lift:10,emphasis:f>=2||_})}for(const{nd:d,i:f}of u){if(h.branchNotes.has(d.id))continue;c.set(h.world[f*3],h.world[f*3+1],h.world[f*3+2]);const _=r.distanceTo(c),g=h.sizes[f]*o/Math.max(_,1),m=this.hoverEnds.has(d.id),p=Math.max(this.neighborhood.get(d.id)??0,m?2:0),v=d.id===h.data.hub;if(g<3.5&&p<2&&!v)continue;const y=d.flags.length>0,S=m?12500:p===3?12e3:p===2?8500:v?6500:(y?2500:1e3)+d.degree*20+g*10;i.push({key:`n:${d.id}`,kind:v?"hub":"note",text:d.title,sub:v?"index":void 0,color:y?"#ff6b7a":void 0,pos:c.clone(),priority:S,lift:g/2+6,emphasis:p>=2||this.hovered===`n:${d.id}`})}}this.labels.update(i,this.camera,t,e)}bindPointer(){const t=this.renderer.domElement;t.addEventListener("pointermove",e=>{const i=t.getBoundingClientRect();this.pointer.x=e.clientX-i.left,this.pointer.y=e.clientY-i.top,this.pointer.inside=!0,this.pointer.down&&Math.hypot(e.clientX-this.pointer.dx,e.clientY-this.pointer.dy)>5&&(this.pointer.moved=!0),this.pointer.dirty=!0}),t.addEventListener("pointerleave",()=>{this.pointer.inside=!1,this.hovered=null,this.events.hover(null,0,0)}),t.addEventListener("pointerdown",e=>{this.pointer.down=!0,this.pointer.moved=!1,this.pointer.dx=e.clientX,this.pointer.dy=e.clientY}),t.addEventListener("pointerup",e=>{const i=this.pointer.down&&!this.pointer.moved&&e.button===0;if(this.pointer.down=!1,!i)return;const r=t.getBoundingClientRect();this.events.select(this.pick(e.clientX-r.left,e.clientY-r.top))}),t.addEventListener("contextmenu",e=>e.preventDefault())}hover(){if(!this.pointer.inside||this.pointer.down)return;const t=this.pickDetailed(this.pointer.x,this.pointer.y),e=t?.key??null;this.renderer.domElement.style.cursor=t?"pointer":"",e!==this.hovered&&(this.hovered=e,this.setHighlight(t)),this.events.hover(t?.target??null,this.pointer.x,this.pointer.y)}setHighlight(t){this.hoverLine&&(this.scene.remove(this.hoverLine),this.hoverLine.geometry.dispose(),this.hoverLine=null);const e=new Set,i=new Set,r=t?.target;if(r?.kind==="link"?e.add(r.from.id).add(r.to.id):r?.kind==="flow"&&i.add(r.a).add(r.b),t?.segments){const o=Qn(t.color??"#e8f0ff").map(l=>Math.min(1.8,l*1.6)),a=[];for(let l=0;l<t.segments.length/3;l++)a.push(o[0],o[1],o[2]);this.hoverLine=this.segments(t.segments,a,this.lineMaterial("hover",4.5,1,!1)),this.hoverLine.renderOrder=10,this.scene.add(this.hoverLine)}const s=e.size!==this.hoverEnds.size||[...e].some(o=>!this.hoverEnds.has(o));this.hoverEnds=e,this.hoverTopics=i,s&&this.refreshStates()}pick(t,e){return this.pickDetailed(t,e)?.target??null}pickLink(t,e,i){const r=(l,c,h,u)=>{const d=h-l,f=u-c,_=d*d+f*f,g=_?Math.max(0,Math.min(1,((t-l)*d+(e-c)*f)/_)):0;return Math.hypot(l+g*d-t,c+g*f-e)},s=(l,c,h)=>`l:${l}:${c.id}>${h.id}`;let o=null,a=6;for(const l of this.focusHits){if(!this.layers[l.family])continue;const c=i(l.a[0],l.a[1],l.a[2]),h=i(l.b[0],l.b[1],l.b[2]);if(!c||!h)continue;const u=r(c[0],c[1],h[0],h[1]);u<a&&(a=u,o={target:{kind:"link",family:l.family,from:l.from,to:l.to},key:s(l.family,l.from,l.to),segments:[...l.a,...l.b],color:Gn[l.family]})}if(o)return o;a=5;for(const l of this.revealed.values()){if(l.fade<.5)continue;const c=l.ids.map((h,u)=>i(l.world[u*3],l.world[u*3+1],l.world[u*3+2]));for(const h of l.data.links){const u=La(h.rel,h.source,h.target);if(!u||u[0]==="part_of"||!this.layers[u[0]])continue;const d=l.index.get(u[1]),f=l.index.get(u[2]);if(d===void 0||f===void 0||d===f)continue;const _=c[d],g=c[f];if(!_||!g)continue;const m=r(_[0],_[1],g[0],g[1]);if(m<a){a=m;const p={id:u[1],title:l.nodes[d].title,topic:l.slug},v={id:u[2],title:l.nodes[f].title,topic:l.slug},y=l.world;o={target:{kind:"link",family:u[0],from:p,to:v},key:s(u[0],p,v),segments:[y[d*3],y[d*3+1],y[d*3+2],y[f*3],y[f*3+1],y[f*3+2]],color:Gn[u[0]]}}}}if(o)return o;a=5;for(const l of this.flowHits){let c=i(l.points[0].x,l.points[0].y,l.points[0].z);for(let h=1;h<l.points.length;h++){const u=i(l.points[h].x,l.points[h].y,l.points[h].z);if(c&&u){const d=r(c[0],c[1],u[0],u[1]);if(d<a){a=d;const f=[];for(let _=0;_<l.points.length-1;_++)f.push(...l.points[_].toArray(),...l.points[_+1].toArray());o={target:{kind:"flow",level:l.level,a:l.a,b:l.b,total:l.total,rels:l.rels},key:`f:${l.a}|${l.b}`,segments:f}}}c=u}}return o}pickDetailed(t,e){const i=g=>g&&{target:g,key:g.kind==="topic"?`t:${g.slug}`:g.kind==="constellation"?`c:${g.id}`:"inbox"},r=this.container.clientWidth,s=this.container.clientHeight,o=s/2/Math.tan(this.camera.fov*Math.PI/360),a=new k,l=(g,m,p)=>(a.set(g,m,p).project(this.camera),a.z>1?null:[(a.x*.5+.5)*r,(-a.y*.5+.5)*s]);let c=null,h=1/0;for(const g of this.revealed.values())if(!(g.fade<.3))for(let m=0;m<g.ids.length;m++){const p=l(g.world[m*3],g.world[m*3+1],g.world[m*3+2]);if(!p)continue;const v=this.camera.position.distanceTo(a.set(g.world[m*3],g.world[m*3+1],g.world[m*3+2])),y=Math.max(7,g.sizes[m]*o/Math.max(v,1)*.5+3),S=Math.hypot(p[0]-t,p[1]-e);S<y&&S<h&&(h=S,c={kind:"note",id:g.ids[m],topic:g.slug})}if(c)return{target:c,key:`n:${c.id}`};const u=this.pickLink(t,e,l);if(u)return u;let d=1/0;for(const g of this.topics){const m=this.layout.topics.get(g.slug),p=l(m.x,m.y,m.z);if(!p)continue;const v=Math.max(10,(this.topicPx.get(g.slug)??0)*.7),y=Math.hypot(p[0]-t,p[1]-e);y<v&&y/v<d&&(d=y/v,c={kind:"topic",slug:g.slug})}const f=this.layout.inbox,_=l(f.x,f.y,f.z);if(_){const g=Math.max(12,rr(f.r,this.camera.position.distanceTo(a.set(f.x,f.y,f.z)),s,this.camera.fov)),m=Math.hypot(_[0]-t,_[1]-e);m<g&&m/g<d&&(d=m/g,c={kind:"inbox"})}if(c)return i(c);if(this.world.constellations.length>1)for(const g of this.world.constellations){const m=this.layout.constellations.get(g.id),p=l(m.x,m.y,m.z);if(!p)continue;const v=rr(m.r,this.camera.position.distanceTo(a.set(m.x,m.y,m.z)),s,this.camera.fov)*.8,y=Math.hypot(p[0]-t,p[1]-e);y<v&&y/v<d&&(d=y/v,c={kind:"constellation",id:g.id})}return i(c)}screenOf(t){let e=null;if(t.kind==="topic"){const i=this.layout.topics.get(t.slug);i&&(e=new k(i.x,i.y,i.z))}else if(t.kind==="constellation"){const i=this.layout.constellations.get(t.id);i&&(e=new k(i.x,i.y,i.z))}else if(t.kind==="note"){const i=this.revealed.get(t.topic),r=i?.index.get(t.id);i&&r!==void 0&&(e=new k(i.world[r*3],i.world[r*3+1],i.world[r*3+2]))}else if(t.kind==="inbox"){const i=this.layout.inbox;e=new k(i.x,i.y,i.z)}return e?(e.project(this.camera),{x:(e.x*.5+.5)*this.container.clientWidth,y:(-e.y*.5+.5)*this.container.clientHeight}):null}noteTitle(t){for(const e of this.revealed.values()){const i=e.index.get(t);if(i!==void 0)return e.nodes[i].title}}revealedTopics(){return[...this.revealed].filter(([,t])=>t.target>0).map(([t])=>t)}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),window.removeEventListener("resize",this.resize);for(const t of this.revealed.values())this.disposeLayer(t);this.controls.dispose(),this.renderer.dispose()}}var ps,be,Ua,ih,ms=0,$f=[],we=fe,rh=we.__b,sh=we.__r,oh=we.diffed,ah=we.__c,lh=we.unmount,ch=we.__;function fc(n,t){we.__h&&we.__h(be,n,ms||t),ms=0;var e=be.__H||(be.__H={__:[],__h:[]});return n>=e.__.length&&e.__.push({}),e.__[n]}function In(n){return ms=1,cS(Zf,n)}function cS(n,t,e){var i=fc(ps++,2);if(i.t=n,!i.__c&&(i.__=[Zf(void 0,t),function(a){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,a);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=be,!be.__f)){var r=function(a,l,c){if(!i.__c.__H)return!0;var h=i.__c.__H.__.filter(function(d){return!!d.__c});if(h.every(function(d){return!d.__N}))return!s||s.call(this,a,l,c);var u=i.__c.props!==a;return h.forEach(function(d){if(d.__N){var f=d.__[0];d.__=d.__N,d.__N=void 0,f!==d.__[0]&&(u=!0)}}),s&&s.call(this,a,l,c)||u};be.__f=!0;var s=be.shouldComponentUpdate,o=be.componentWillUpdate;be.componentWillUpdate=function(a,l,c){if(this.__e){var h=s;s=void 0,r(a,l,c),s=h}o&&o.call(this,a,l,c)},be.shouldComponentUpdate=r}return i.__N||i.__}function tr(n,t){var e=fc(ps++,3);!we.__s&&Yf(e.__H,t)&&(e.__=n,e.u=t,be.__H.__h.push(e))}function vs(n){return ms=5,Mn(function(){return{current:n}},[])}function Mn(n,t){var e=fc(ps++,7);return Yf(e.__H,t)&&(e.__=n(),e.__H=t,e.__h=n),e.__}function uS(n,t){return ms=8,Mn(function(){return n},t)}function hS(){for(var n;n=$f.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(_o),n.__H.__h.forEach(Nl),n.__H.__h=[]}catch(t){n.__H.__h=[],we.__e(t,n.__v)}}we.__b=function(n){be=null,rh&&rh(n)},we.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),ch&&ch(n,t)},we.__r=function(n){sh&&sh(n),ps=0;var t=(be=n.__c).__H;t&&(Ua===be?(t.__h=[],be.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(_o),t.__h.forEach(Nl),t.__h=[],ps=0)),Ua=be},we.diffed=function(n){oh&&oh(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&($f.push(t)!==1&&ih===we.requestAnimationFrame||((ih=we.requestAnimationFrame)||fS)(hS)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),Ua=be=null},we.__c=function(n,t){t.some(function(e){try{e.__h.forEach(_o),e.__h=e.__h.filter(function(i){return!i.__||Nl(i)})}catch(i){t.some(function(r){r.__h&&(r.__h=[])}),t=[],we.__e(i,e.__v)}}),ah&&ah(n,t)},we.unmount=function(n){lh&&lh(n);var t,e=n.__c;e&&e.__H&&(e.__H.__.forEach(function(i){try{_o(i)}catch(r){t=r}}),e.__H=void 0,t&&we.__e(t,e.__v))};var uh=typeof requestAnimationFrame=="function";function fS(n){var t,e=function(){clearTimeout(i),uh&&cancelAnimationFrame(t),setTimeout(n)},i=setTimeout(e,35);uh&&(t=requestAnimationFrame(e))}function _o(n){var t=be,e=n.__c;typeof e=="function"&&(n.__c=void 0,e()),be=t}function Nl(n){var t=be;n.__c=n.__(),be=t}function Yf(n,t){return!n||n.length!==t.length||t.some(function(e,i){return e!==n[i]})}function Zf(n,t){return typeof t=="function"?t(n):t}class dS{constructor(t){this.s=t}listeners=new Set;get state(){return this.s}set(t){this.s={...this.s,...t};for(const e of this.listeners)e()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}function Xt(n,t){const[e,i]=In(()=>t(n.state));return tr(()=>{const r=()=>i(()=>t(n.state));return r(),n.subscribe(r)},[n]),e}class pS{constructor(t,e){this.source=t,this.world=e,this.constellationOf=new Map(e.topics.map(s=>[s.slug,s.constellation])),this.trail=new Wd(mS(`brainviz.trail:${e.brain}:${location.pathname}`));const i=new URLSearchParams(location.search).get("quality"),r=Kf(i)?i:_S()??"low";this.store=new dS({world:e,focus:{},hover:null,note:null,topicData:null,layers:Object.fromEntries(qf.map(s=>[s,s!=="links_to"])),health:!1,labels:!0,quality:r==="low"?"low":"high",qualityMode:r,navOpen:!0,navTab:"atlas",paletteOpen:!1,helpOpen:!1,healthData:null,run:null,toast:null,embedded:t.embedded,sceneError:null,previewOpen:!1,trail:this.trail.state(),historyOpen:!1,zoom:0})}store;galaxy=null;toastTimer=0;noteSeq=0;constellationOf;trail;mount(t){try{this.galaxy=new lS(t,this.world,this.source,{hover:(e,i,r)=>this.store.set({hover:e?{target:e,x:i,y:r}:null}),select:e=>this.select(e),view:(e,i)=>this.onView(e,i),quality:(e,i)=>{this.store.set({quality:e}),i&&e==="low"&&this.toast("Graphics set to Low: frames were slow on this GPU, so the glow is off. Change it in the ⋯ menu.")}},this.store.state.qualityMode),this.galaxy.setLayers(this.store.state.layers)}catch(e){t.replaceChildren(),this.store.set({sceneError:e instanceof Error?e.message:String(e)}),console.error("brain viz: the 3D scene could not start",e)}window.addEventListener("popstate",e=>this.onHistory(e.state)),window.addEventListener("hashchange",()=>this.onHistory(history.state)),this.onHistory(history.state),window.__brainViz={controller:this,galaxy:this.galaxy,ready:!0},document.body.dataset.ready="1"}onHistory(t){this.applyHash();const e=this.store.state.focus,i=Di(e),r=t?.brainViz;if(typeof r=="number"&&this.trail.entries[r]?.hash===i)this.trail.moveTo(r);else{const s=this.trail.visit({hash:i,focus:e,title:this.titleOf(e)});history.replaceState({brainViz:s},"",i)}this.syncTrail()}back(){this.trail.canBack&&history.back()}forward(){this.trail.canForward&&history.forward()}jump(t){const e=t-this.trail.index;this.store.set({historyOpen:!1}),e&&history.go(e)}syncTrail(){this.store.set({trail:this.trail.state()});try{sessionStorage.setItem(this.trailKey(),JSON.stringify(this.trail.state()))}catch{}}trailKey(){return`brainviz.trail:${this.world.brain}:${location.pathname}`}titleOf(t){if(t.note)return this.galaxy?.noteTitle(t.note)??this.store?.state.topicData?.nodes.find(e=>e.id===t.note)?.title}applyHash(){const t=jd(location.hash,e=>this.constellationOf.get(e));(Di(t)!==Di(this.store.state.focus)||!this.store.state.focus.constellation)&&this.focus(t,"none")}focus(t,e="push",i=!0){t.topic&&!t.constellation&&(t={...t,constellation:this.constellationOf.get(t.topic)});const r=this.store.state.focus;this.store.set({focus:t,hover:null}),this.galaxy?.setFocus(t,i);const s=Di(t);if(e!=="none"&&s!==location.hash){const o={hash:s,focus:t,title:this.titleOf(t)};e==="push"?history.pushState({brainViz:this.trail.visit(o)},"",s):history.replaceState({brainViz:this.trail.replace(o)},"",s),this.syncTrail()}if(t.topic&&t.topic!==r.topic?(this.store.set({topicData:null}),this.source.topic(t.topic).then(o=>{this.store.state.focus.topic===t.topic&&this.store.set({topicData:o})})):t.topic||this.store.set({topicData:null}),t.note){const o=++this.noteSeq;t.note!==r.note&&this.store.set({note:null}),this.source.note(t.note).then(a=>{o===this.noteSeq&&this.store.set({note:a}),a&&this.trail.setTitle(Di(t),a.title)&&this.syncTrail()})}else this.store.set({note:null,previewOpen:!1})}up(){const t=this.store.state;if(t.paletteOpen)return this.store.set({paletteOpen:!1});if(t.historyOpen)return this.store.set({historyOpen:!1});if(t.helpOpen)return this.store.set({helpOpen:!1});if(t.previewOpen)return this.store.set({previewOpen:!1});if(t.run)return this.setRun(null);if(Jr(t.focus)==="galaxy")return this.galaxy?.resetView();this.focus(Zd(t.focus))}select(t){if(t)if(t.kind==="constellation")this.focus({constellation:t.id});else if(t.kind==="topic")this.focus({topic:t.slug});else if(t.kind==="note")this.openNote(t.id,t.topic);else if(t.kind==="link"){const e=this.store.state.focus.note===t.to.id?t.from:t.to;this.focus({topic:e.topic,note:e.id})}else if(t.kind==="flow"){const e=this.store.state.focus;t.level==="constellation"?this.focus({constellation:e.constellation===t.b?t.a:t.b}):this.focus({topic:e.topic===t.b?t.a:t.b})}else this.toast(`${this.world.episodes.count} episodes wait in the inbox. Ask your agent to consolidate them, or run brain consolidate.`)}onView(t,e){const i=this.store.state.focus,{focus:r,progress:s}=Kd(i,t);Math.abs(s-this.store.state.zoom)>.02&&this.store.set({zoom:s}),e&&Di(r)!==Di(i)&&this.focus(r,"replace",!1)}openNote(t,e){e&&(this.focus({topic:e,note:t}),this.store.set({previewOpen:!0}))}setLayer(t,e){const i={...this.store.state.layers,[t]:e};this.store.set({layers:i}),this.galaxy?.setLayers(i)}setHealth(t){this.store.set({health:t}),this.galaxy?.setHealth(t),t&&!this.store.state.healthData&&this.loadHealth()}setLabels(t){this.store.set({labels:t}),this.galaxy?.setLabels(t)}setQualityMode(t){this.store.set({qualityMode:t,...t==="auto"?{}:{quality:t}}),this.galaxy?.setQualityMode(t);try{localStorage.setItem(jf,t)}catch{}}setRun(t){if(this.store.set({run:t}),this.galaxy?.setRun(t),t){const e=Object.entries(t.topics).sort((i,r)=>r[1]-i[1])[0];e&&this.focus({constellation:this.constellationOf.get(e[0])})}}async loadHealth(){const t=await this.source.health();this.store.set({healthData:t})}setNav(t){this.store.set({navTab:t,navOpen:!0}),t==="health"&&!this.store.state.healthData&&this.loadHealth()}search(t){return this.source.search(t)}toast(t){this.store.set({toast:t}),window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.store.set({toast:null}),4200)}}function mS(n){try{const t=sessionStorage.getItem(n),e=t?JSON.parse(t):void 0;return e&&Array.isArray(e.entries)&&typeof e.index=="number"?e:void 0}catch{return}}const jf="brainviz.graphics";function Kf(n){return n==="auto"||n==="high"||n==="low"}function _S(){try{const n=localStorage.getItem(jf);return Kf(n)?n:null}catch{return null}}const No={conflict:"Conflicts",stale:"May be outdated",unverified:"Unverified facts",orphan:"Orphans",lint_error:"Format problems"},er={conflict:"#ff3b4f",stale:"#ffad38",unverified:"#bd85ff",orphan:"#9aa6c4",lint_error:"#ff6bc6"};function Ce({color:n,size:t=8}){return M("span",{class:"dot",style:{background:n,width:`${t}px`,height:`${t}px`,boxShadow:`0 0 10px ${n}`}})}function io({children:n,tone:t}){return M("span",{class:`chip${t?` chip-${t}`:""}`,children:n})}function xs({children:n}){return M("kbd",{class:"kbd",children:n})}function Xe(n){return n>=1e4?`${(n/1e3).toFixed(1)}k`:n.toLocaleString()}function Ae({name:n}){return M("svg",{class:"icon",viewBox:"0 0 24 24","aria-hidden":"true",children:M("path",{d:{search:"M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.2 4.2-1.4 1.4-4.2-4.2A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z",layers:"m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",health:"M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21Z",reset:"M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5",help:"M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-6v.01M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V13",labels:"M4 5h16M4 12h10M4 19h7",spark:"M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6 4 4m0-14-4 4m-6 6-4 4",close:"M6 6l12 12M18 6 6 18",chevron:"m9 6 6 6-6 6",back:"m15 6-6 6 6 6",forward:"m9 6 6 6-6 6",more:"M5.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M16.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",history:"M12 7v5l3 2M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4 4v4h4",copy:"M8 8h11v11H8zM5 16V5h11",open:"M14 4h6v6m0-6-9 9M10 6H5v13h13v-5",read:"M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z",folder:"M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}[n]})})}const hh={part_of:"Part of",has_part:"Contains",depends_on:"Depends on",enables:"Enables",conflicts_with:"Conflicts with",supersedes:"Replaces",superseded_by:"Replaced by",related_to:"Related to",links_to:"Links to"};function fh(n){return n.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(t,e,i)=>i??e).replace(/(\*\*|__)(.+?)\1/g,"$2").replace(/`([^`]+)`/g,"$1")}const gS={part_of:"part_of",has_part:"part_of",depends_on:"depends_on",enables:"depends_on",conflicts_with:"conflicts_with",supersedes:"supersedes",superseded_by:"supersedes",related_to:"related_to",links_to:"links_to"},dh={part_of:"has_part",has_part:"part_of",depends_on:"enables",enables:"depends_on",supersedes:"superseded_by",superseded_by:"supersedes"},ph=["superseded_by","supersedes","conflicts_with","depends_on","enables","part_of","has_part","related_to","links_to"];function vS(n,t){if(!t)return[];const e=new Map(t.nodes.map(o=>[o.id,o.title])),i=[],r=new Set,s=(o,a,l,c)=>{const h=`${o}|${a}`;r.has(h)||a===n||(r.add(h),i.push({rel:o,id:a,title:l,topic:c}))};for(const o of t.links)o.source===n?s(o.rel,o.target,e.get(o.target)??o.target,t.slug):o.target===n&&s(o.rel==="conflicts_with"||o.rel==="related_to"||o.rel==="links_to"?o.rel:dh[o.rel]??o.rel,o.source,e.get(o.source)??o.source,t.slug);for(const o of t.external)o.source===n?s(o.rel,o.target,o.title,o.topic):o.target===n&&s(o.rel==="conflicts_with"||o.rel==="related_to"||o.rel==="links_to"?o.rel:dh[o.rel]??o.rel,o.source,o.title,o.topic);return i.sort((o,a)=>ph.indexOf(o.rel)-ph.indexOf(a.rel)||o.title.localeCompare(a.title))}function bi({label:n,value:t,tone:e}){return M("div",{class:`stat${e?` stat-${e}`:""}`,children:[M("div",{class:"stat-v",children:typeof t=="number"?Xe(t):t}),M("div",{class:"stat-l",children:n})]})}function xS({n,c:t,topic:e}){return M("button",{class:"row",onClick:()=>t.openNote(n.id,e),children:[M("span",{class:"row-title",children:n.title}),n.flags.length>0&&M(Ce,{color:er[n.flags[0]],size:6}),M("span",{class:"row-meta",children:n.degree===1?"1 link":`${Xe(n.degree)} links`})]})}function Fl(n){return n===1?"1 note":`${Xe(n)} notes`}function yS({c:n,id:t}){const e=n.world.constellations.find(a=>a.id===t);if(!e)return null;const i=n.world.topics.filter(a=>a.constellation===t).sort((a,l)=>l.notes-a.notes),r=i.reduce((a,l)=>a+l.notes,0),s=i.reduce((a,l)=>a+l.flagged,0),o=i.reduce((a,l)=>a+l.recent,0);return M(en,{children:[M("div",{class:"insp-kicker",children:[M(Ce,{color:e.color})," Group of topics"]}),M("h2",{class:"insp-title",children:e.title}),M("div",{class:"stats",children:[M(bi,{label:"topics",value:i.length}),M(bi,{label:"notes",value:r}),M(bi,{label:"changed 7d",value:o}),M(bi,{label:"with issues",value:s,tone:s?"warn":void 0})]}),M("div",{class:"section-title",children:"Topics"}),M("div",{class:"rows",children:[i.slice(0,14).map(a=>M("button",{class:"row",onClick:()=>n.focus({topic:a.slug}),children:[M(Ce,{color:a.color,size:7}),M("span",{class:"row-title",children:a.title}),a.flagged>0&&M("span",{class:"badge",children:a.flagged}),M("span",{class:"row-meta",children:Fl(a.notes)})]},a.slug)),i.length>14&&M("div",{class:"more",children:["and ",i.length-14," more in the Topics tab"]})]})]})}function SS({c:n,slug:t}){const e=Xt(n.store,u=>u.topicData),i=n.world.topics.find(u=>u.slug===t),r=Mn(()=>n.world.flows.filter(u=>u.a===t||u.b===t).sort((u,d)=>d.total-u.total).slice(0,6),[n,t]);if(!i)return null;const s=new Map(n.world.topics.map(u=>[u.slug,u])),o=e?.slug===t?e:null,a=o?[...o.nodes].filter(u=>u.id!==o.hub).sort((u,d)=>d.degree-u.degree).slice(0,8):[],l=o?.nodes.find(u=>u.id===o.hub),c=n.world.topics.filter(u=>u.parent===t).sort((u,d)=>d.notes-u.notes),h=o?[...Oo(o).branches.values()].filter(u=>u.depth===1).sort((u,d)=>d.count-u.count||u.title.localeCompare(d.title)):[];return M(en,{children:[M("div",{class:"insp-kicker",children:[M(Ce,{color:i.color})," Topic"]}),M("h2",{class:"insp-title",children:i.title}),i.description&&M("p",{class:"insp-desc",children:i.description}),M("div",{class:"stats",children:[M(bi,{label:"notes",value:i.notes}),M(bi,{label:"changed 7d",value:i.recent}),M(bi,{label:"with issues",value:i.flagged,tone:i.flagged?"warn":void 0}),M(bi,{label:"last change",value:i.updated?i.updated.slice(5):"—"})]}),i.flagged>0&&M("div",{class:"flag-chips",children:hc.filter(u=>i.flags[u]).map(u=>M("span",{class:"flag-chip",style:{borderColor:er[u]},children:[M(Ce,{color:er[u],size:6})," ",No[u]," ",M("b",{children:i.flags[u]})]},u))}),l&&M("button",{class:"hub-link",onClick:()=>n.openNote(l.id,t),children:[M(Ae,{name:"spark"})," Open the topic index ",M("span",{class:"row-meta",children:l.title})]}),c.length>0&&M(en,{children:[M("div",{class:"section-title",children:["Sub-topics ",M("span",{class:"section-count",children:c.length})]}),M("div",{class:"rows",children:[c.slice(0,14).map(u=>M("button",{class:"row",onClick:()=>n.focus({topic:u.slug}),children:[M(Ce,{color:u.color,size:7}),M("span",{class:"row-title",children:u.title}),M("span",{class:"row-meta",children:Fl(u.notes)})]},u.slug)),c.length>14&&M("div",{class:"more",children:["and ",c.length-14," more in the Topics tab"]})]})]}),h.length>0&&M(en,{children:[M("div",{class:"section-title",children:["Folders ",M("span",{class:"section-count",children:h.length})]}),M("div",{class:"rows",children:[h.slice(0,12).map(u=>M("button",{class:"row",disabled:!u.note,title:u.note?void 0:"This folder has no folder note",onClick:()=>u.note&&n.openNote(u.note,t),children:[M(Ae,{name:"folder"}),M("span",{class:"row-title",children:u.title}),M("span",{class:"row-meta",children:Fl(u.count)})]},u.key)),h.length>12&&M("div",{class:"more",children:["and ",h.length-12," more"]})]})]}),!o&&M("div",{class:"empty small",children:"Loading…"}),o&&o.nodes.length>5&&M(en,{children:[M("div",{class:"section-title",children:"Most connected"}),M("div",{class:"rows",children:a.map(u=>M(xS,{n:u,c:n,topic:t},u.id))})]}),r.length>0&&M(en,{children:[M("div",{class:"section-title",children:"Linked topics"}),M("div",{class:"rows",children:r.map(u=>{const d=s.get(u.a===t?u.b:u.a);return d?M("button",{class:"row",onClick:()=>n.focus({topic:d.slug}),children:[M(Ce,{color:d.color,size:7}),M("span",{class:"row-title",children:d.title}),M("span",{class:"row-meta",children:u.total===1?"1 link":`${Xe(u.total)} links`})]},d.slug):null})})]})]})}function MS({c:n,id:t,slug:e}){const i=Xt(n.store,m=>m.note),r=Xt(n.store,m=>m.topicData),[s,o]=In(!1),a=n.world.topics.find(m=>m.slug===e),l=r?.nodes.find(m=>m.id===t),c=Mn(()=>vS(t,r?.slug===e?r:null),[t,r,e]),h=i?.title??l?.title??"…",u=i?.status??l?.status,d=new Map((r?.nodes??[]).map(m=>[m.path,m])),f=new Map;for(const m of c)f.set(m.rel,[...f.get(m.rel)??[],m]);const _=i?.path??l?.path,g=Mn(()=>{if(r?.slug!==e)return[];const{branches:m,folderOf:p}=Oo(r),v=[];for(let y=m.get(p.get(t)??"");y&&y.key!=="";y=y.parent===null?void 0:m.get(y.parent))y.note!==t&&v.unshift(y);return v},[r,e,t]);return M(en,{children:[M("div",{class:"insp-kicker",children:[M(Ce,{color:a?.color??"#888"})," ",M("button",{class:"link",onClick:()=>n.focus({topic:e}),children:a?.title??e})]}),M("h2",{class:"insp-title",children:h}),g.length>0&&M("div",{class:"insp-place",title:"Where this note lives",children:["In ",[a?.title??e,...g.map(m=>m.title)].join(" › ")]}),M("div",{class:"chips",children:[(i?.kind??l?.kind)&&M(io,{children:i?.kind??l?.kind}),(i?.type??l?.type)&&M(io,{children:i?.type??l?.type}),u&&M(io,{tone:u==="active"?"ok":"warn",children:u}),(i?.updated??l?.updated)&&M(io,{tone:"dim",children:["updated ",(i?.updated??l?.updated??"").slice(0,10)]})]}),l&&l.flags.length>0&&M("div",{class:"flag-chips",children:l.flags.map(m=>M("span",{class:"flag-chip",style:{borderColor:er[m]},children:[M(Ce,{color:er[m],size:6})," ",No[m]]},m))}),(i?.banners??[]).map(m=>M("div",{class:`banner${/conflict/i.test(m)?" banner-red":""}`,children:m},m)),i?.summary&&M("p",{class:"insp-desc",children:fh(i.summary)}),!i&&M("div",{class:"empty small",children:"Reading the note…"}),i?.partial&&M("div",{class:"hint",children:"This exported file has no claim text."}),(i?.claims?.length??0)>0&&M(en,{children:[M("div",{class:"section-title",children:["Facts ",M("span",{class:"section-count",children:i.claims.length})]}),M("ul",{class:"claims",children:i.claims.map((m,p)=>M("li",{class:`claim claim-${m.status}${m.taint==="true"||m.taint==="unknown"?" claim-unverified":""}`,children:fh(m.text)},m.id??p))})]}),f.size>0&&M("div",{class:"section-title",children:["Relations ",M("span",{class:"section-count",children:c.length})]}),[...f].map(([m,p])=>M("div",{class:"rel-group",children:[M("div",{class:"rel-label",style:{color:Gn[gS[m]]},children:hh[m]}),p.slice(0,12).map(v=>M("button",{class:"row",onClick:()=>n.openNote(v.id,v.topic),children:[M("span",{class:"row-title",children:v.title}),v.topic&&v.topic!==e&&M("span",{class:"row-meta",children:n.world.topics.find(y=>y.slug===v.topic)?.title??v.topic})]},`${m}${v.id}`)),p.length>12&&M("div",{class:"more",children:["and ",p.length-12," more"]})]},m)),(i?.backlinks?.length??0)>0&&M(en,{children:[M("div",{class:"section-title",children:["Linked from ",M("span",{class:"section-count",children:i.backlinks.length})]}),M("div",{class:"rows",children:i.backlinks.slice(0,12).map(m=>{const p=d.get(m.path);return M("button",{class:"row",disabled:!p,onClick:()=>p&&n.openNote(p.id,e),children:[M("span",{class:"row-title",children:m.title}),M("span",{class:"row-meta",children:(hh[m.relation]??m.relation.replace("_"," ")).toLowerCase()})]},m.path+m.relation)})})]}),_&&M("div",{class:"path-row",children:[M("code",{class:"path",children:_}),M("button",{class:"icon-btn",title:"Read the note (P)",onClick:()=>n.store.set({previewOpen:!0}),children:M(Ae,{name:"read"})}),M("button",{class:"icon-btn",title:"Copy path",onClick:()=>{navigator.clipboard?.writeText(i?.abs_path??_),o(!0),window.setTimeout(()=>o(!1),1200)},children:M(Ae,{name:"copy"})}),i?.abs_path&&M("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(i.abs_path)}`,children:M(Ae,{name:"open"})}),s&&M("span",{class:"copied",children:"copied"})]})]})}function ES({c:n}){const t=Xt(n.store,i=>i.focus),e=t.note&&t.topic?M(MS,{c:n,id:t.note,slug:t.topic}):t.topic?M(SS,{c:n,slug:t.topic}):t.constellation&&n.world.constellations.length>1?M(yS,{c:n,id:t.constellation}):null;return M("aside",{class:`panel insp open${e?"":" idle"}`,"aria-label":"Details",children:[M("div",{class:"insp-head",children:[M("span",{children:"Details"}),e&&M("button",{class:"icon-btn",onClick:()=>n.up(),title:"Up one level (Esc)","aria-label":"Up one level",children:M(Ae,{name:"close"})})]}),M("div",{class:"insp-body",children:e??M("div",{class:"empty small",children:"Click a topic or a star to see its details here."})})]})}const Qe=184;function bS(n){const t=[[77,107,168],[255,158,41],[255,26,46]],[e,i,r]=n<.5?[t[0],t[1],n*2]:[t[1],t[2],(n-.5)*2];return`rgb(${e.map((s,o)=>Math.round(s+(i[o]-s)*r)).join(",")})`}function TS({c:n}){const t=vs(null),e=Xt(n.store,o=>o.focus),i=Xt(n.store,o=>o.health),r=Mn(()=>Ha(n.world.topics),[n]);tr(()=>{const o=t.current,a=n.galaxy;if(!o||!a)return;const l=Math.min(2,window.devicePixelRatio||1);o.width=Qe*l,o.height=Qe*l;const c=o.getContext("2d"),h=a.layout,u=(Qe/2-10)/h.radius,d=(g,m)=>[Qe/2+g*u,Qe/2+m*u],f=()=>{c.setTransform(l,0,0,l,0,0),c.clearRect(0,0,Qe,Qe);for(const R of n.world.constellations){const D=h.constellations.get(R.id),[N,X]=d(D.x,D.z),G=Math.max(4,D.r*u),Y=c.createRadialGradient(N,X,0,N,X,G),Q=i?"#8a94b0":R.color;Y.addColorStop(0,`${Q}${i?"30":"55"}`),Y.addColorStop(1,`${Q}00`),c.fillStyle=Y,c.beginPath(),c.arc(N,X,G,0,Math.PI*2),c.fill(),e.constellation===R.id&&!e.topic&&(c.strokeStyle="rgba(220,230,255,0.7)",c.lineWidth=1,c.stroke())}n.world.topics.forEach((R,D)=>{const N=h.topics.get(R.slug),[X,G]=d(N.x,N.z);c.fillStyle=i?bS(r[D]):R.color,c.globalAlpha=e.topic&&e.topic!==R.slug?.45:.9,c.beginPath(),c.arc(X,G,Math.max(1,Math.min(3.2,N.r*u*.6)),0,Math.PI*2),c.fill(),e.topic===R.slug&&(c.globalAlpha=1,c.strokeStyle="#fff",c.lineWidth=1.2,c.beginPath(),c.arc(X,G,5,0,Math.PI*2),c.stroke())}),c.globalAlpha=1;const g=h.inbox,[m,p]=d(g.x,g.z);c.fillStyle="#ffd88a",c.beginPath(),c.arc(m,p,2.5,0,Math.PI*2),c.fill();const v=a.view(),[y,S]=d(v.pos.x,v.pos.z),[w,b]=d(v.target.x,v.target.z),A=Math.atan2(b-S,w-y),L=Math.min(70,Math.max(16,Math.hypot(w-y,b-S))),E=.42,x=c.createLinearGradient(y,S,y+Math.cos(A)*L,S+Math.sin(A)*L);x.addColorStop(0,"rgba(140,180,255,0.42)"),x.addColorStop(1,"rgba(140,180,255,0)"),c.fillStyle=x,c.beginPath(),c.moveTo(y,S),c.lineTo(y+Math.cos(A-E)*L,S+Math.sin(A-E)*L),c.lineTo(y+Math.cos(A+E)*L,S+Math.sin(A+E)*L),c.closePath(),c.fill(),c.fillStyle="#cfe0ff",c.beginPath(),c.arc(Math.max(4,Math.min(Qe-4,y)),Math.max(4,Math.min(Qe-4,S)),2.6,0,Math.PI*2),c.fill()};f();const _=window.setInterval(f,200);return()=>window.clearInterval(_)},[n.galaxy,e,i]);const s=o=>{const a=n.galaxy,l=t.current;if(!a||!l)return;const c=l.getBoundingClientRect(),h=(Qe/2-10)/a.layout.radius,u=(o.clientX-c.left-Qe/2)/h,d=(o.clientY-c.top-Qe/2)/h;let f=null,_=1/0;for(const g of n.world.topics){const m=a.layout.topics.get(g.slug),p=Math.hypot(m.x-u,m.z-d)/m.r;p<_&&(_=p,f=g.slug)}f&&n.focus({topic:f})};return M("div",{class:"panel minimap","aria-label":"Minimap",children:[M("canvas",{ref:t,style:{width:`${Qe}px`,height:`${Qe}px`},onClick:s}),M("div",{class:"minimap-label",children:"MAP"})]})}function wS(n){return(t,e)=>n==="health"?e.flagged/Math.max(1,e.notes)-t.flagged/Math.max(1,t.notes)||e.flagged-t.flagged:n==="recent"?(e.updated??"").localeCompare(t.updated??"")||e.recent-t.recent:n==="name"?t.title.localeCompare(e.title):e.notes-t.notes||t.title.localeCompare(e.title)}function AS({c:n}){const t=n.world,e=Xt(n.store,f=>f.focus),[i,r]=In(""),[s,o]=In("size"),[a,l]=In({}),c=Mn(()=>new Map(t.topics.map(f=>[f.slug,f])),[t]),h=Math.max(1,...t.topics.map(f=>f.notes)),u=i.trim().toLowerCase(),d=t.constellations.length===1;return M("div",{class:"atlas",children:[M("div",{class:"nav-tools",children:[M("input",{class:"field",placeholder:"Filter topics",value:i,onInput:f=>r(f.target.value),"aria-label":"Filter topics"}),M("select",{class:"field select",value:s,onChange:f=>o(f.target.value),"aria-label":"Sort topics",children:[M("option",{value:"size",children:"Most notes"}),M("option",{value:"health",children:"Most issues"}),M("option",{value:"recent",children:"Recently changed"}),M("option",{value:"name",children:"Name"})]})]}),M("div",{class:"tree",role:"tree",children:t.constellations.map(f=>{const _=CS(f.topics.map(v=>c.get(v)).filter(v=>!!v&&(!u||v.title.toLowerCase().includes(u)||v.slug.includes(u))),wS(s));if(u&&_.length===0)return null;const g=d||!!u||a[f.id]||e.constellation===f.id,m=_.reduce((v,{topic:y})=>v+y.notes,0),p=_.reduce((v,{topic:y})=>v+y.flagged,0);return M("div",{class:"tree-group",children:[!d&&M("button",{class:`tree-con${e.constellation===f.id?" active":""}`,onClick:()=>{l({...a,[f.id]:!g||e.constellation!==f.id}),n.focus({constellation:f.id})},role:"treeitem","aria-expanded":g,children:[M("span",{class:`chev${g?" open":""}`,children:M(Ae,{name:"chevron"})}),M(Ce,{color:f.color,size:9}),M("span",{class:"tree-title",title:f.title,children:[Ji(f.title),f.topics.length>1?M("span",{class:"tree-more",children:[" +",f.topics.length-1]}):null]}),M("span",{class:"tree-meta",children:[f.topics.length," topics · ",Xe(m)," notes",p?M("span",{class:"warn",children:[" · ",p,"⚑"]}):null]})]}),g&&M("div",{class:"tree-topics",children:_.map(({topic:v,depth:y})=>M("button",{class:`tree-topic${e.topic===v.slug?" active":""}`,style:y?{paddingLeft:`${8+y*14}px`}:void 0,onClick:()=>n.focus({topic:v.slug}),role:"treeitem","aria-level":y+1,children:[M(Ce,{color:v.color,size:7}),M("span",{class:"tree-title",children:v.title}),v.flagged>0&&M("span",{class:"badge",title:`${v.flagged} flagged notes`,children:v.flagged}),M("span",{class:"tree-count",title:`${Xe(v.notes)} notes`,children:[Xe(v.notes)," notes"]}),M("span",{class:"bar","aria-hidden":"true",children:M("span",{style:{width:`${Math.max(4,v.notes/h*100)}%`,background:v.color}})})]},v.slug))})]},f.id)})})]})}function CS(n,t){const e=new Set(n.map(a=>a.slug)),i=new Map,r=[];for(const a of n)a.parent&&e.has(a.parent)?i.set(a.parent,[...i.get(a.parent)??[],a]):r.push(a);const s=[],o=(a,l)=>{s.push({topic:a,depth:l});for(const c of(i.get(a.slug)??[]).sort(t))o(c,l+1)};for(const a of r.sort(t))o(a,0);return s}function RS({c:n}){const t=Xt(n.store,a=>a.healthData),e=Xt(n.store,a=>a.health),[i,r]=In("conflict"),s=Mn(()=>new Map(n.world.topics.map(a=>[a.slug,a])),[n]);if(!t)return M("div",{class:"empty",children:"Reading health…"});const o=hc.filter(a=>(t.counts[a]??0)>0);return M("div",{class:"health",children:[M("label",{class:"switch-row",children:[M("span",{children:"Highlight issues on the map: color each topic by its share of notes with issues, and ring each of those notes"}),M("input",{type:"checkbox",class:"switch",checked:e,onChange:a=>n.setHealth(a.target.checked)})]}),o.length===0&&M("div",{class:"empty",children:"No issues found."}),o.map(a=>M("div",{class:"flag-group",children:[M("button",{class:"flag-head",onClick:()=>r(i===a?null:a),"aria-expanded":i===a,children:[M("span",{class:`chev${i===a?" open":""}`,children:M(Ae,{name:"chevron"})}),M(Ce,{color:er[a]}),M("span",{class:"tree-title",children:No[a]}),M("span",{class:"flag-count",children:Xe(t.counts[a]??0)})]}),i===a&&M("div",{class:"flag-items",children:[(t.items[a]??[]).map(l=>M("button",{class:"flag-item",onClick:()=>n.openNote(l.id,l.topic),children:[M("span",{class:"tree-title",children:l.title}),M("span",{class:"tree-meta",children:l.topic?s.get(l.topic)?.title??l.topic:""})]},l.id)),(t.counts[a]??0)>(t.items[a]?.length??0)&&M("div",{class:"more",children:["and ",Xe((t.counts[a]??0)-(t.items[a]?.length??0))," more"]})]})]},a))]})}const PS={consolidate:"Merged captures",edit:"Agent edit","lint-fix":"Auto-fix",mv:"Moved",undo:"Undo",import:"Import",review:"Review",rule:"Rule"};function DS({c:n}){const t=Xt(n.store,r=>r.run),e=n.world.runs,i=Mn(()=>new Map(n.world.topics.map(r=>[r.slug,r])),[n]);return e.length===0?M("div",{class:"empty",children:"No activity recorded on this device yet."}):M("div",{class:"changes",children:[M("div",{class:"hint",children:"Select an entry to highlight the notes it changed."}),e.map(r=>{const s=Object.entries(r.topics).sort((a,l)=>l[1]-a[1]),o=r.at?new Date(r.at):null;return M("button",{class:`run${t?.id===r.id?" active":""}`,onClick:()=>n.setRun(t?.id===r.id?null:r),children:[M("div",{class:"run-top",children:[M("span",{class:`run-kind kind-${r.kind}`,children:PS[r.kind]??r.kind}),M("span",{class:"run-when",children:o?o.toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):""})]}),M("div",{class:"run-body",children:[r.episodes>0&&M("span",{children:[r.episodes," session captures · "]}),M("span",{children:[r.touched.length," notes changed"]})]}),s.length>0&&M("div",{class:"run-topics",children:s.slice(0,4).map(([a,l])=>{const c=i.get(a);return M("span",{class:"run-topic",children:[M(Ce,{color:c?.color??"#888",size:6})," ",c?.title??a," ",M("b",{children:l})]},a)})})]},r.id)})]})}function LS({c:n}){const t=Xt(n.store,r=>r.navTab),e=Xt(n.store,r=>r.navOpen),i=n.world.totals.flagged;return M("aside",{class:`panel nav${e?"":" collapsed"}`,"aria-label":"Topics, issues, and activity",children:[M("div",{class:"tabs",role:"tablist",children:[["atlas","health","changes"].map(r=>M("button",{role:"tab","aria-selected":t===r,class:`tab${t===r?" active":""}`,onClick:()=>n.setNav(r),children:[r==="atlas"?"Topics":r==="health"?"Issues":"Activity",r==="health"&&i>0&&M("span",{class:"tab-badge",children:Xe(i)}),r==="changes"&&n.world.runs.length>0&&M("span",{class:"tab-badge dim",children:n.world.runs.length})]},r)),M("button",{class:"icon-btn",onClick:()=>n.store.set({navOpen:!e}),"aria-label":e?"Collapse the panel":"Expand the panel",title:e?"Collapse":"Expand",children:M(Ae,{name:e?"back":"chevron"})})]}),e&&M("div",{class:"nav-body",children:t==="atlas"?M(AS,{c:n}):t==="health"?M(RS,{c:n}):M(DS,{c:n})})]})}function US({c:n}){const[t,e]=In(""),[i,r]=In([]),[s,o]=In(!1),[a,l]=In(0),c=vs(null),h=Mn(()=>new Map(n.world.topics.map(g=>[g.slug,g])),[n]);tr(()=>c.current?.focus(),[]),tr(()=>{const g=t.trim();if(!g){r([]);return}o(!0);const m=window.setTimeout(()=>{n.search(g).then(p=>r(p)).catch(()=>r([])).finally(()=>o(!1))},140);return()=>window.clearTimeout(m)},[t]);const u=()=>n.store.set({paletteOpen:!1}),d=t.trim().toLowerCase(),f=[];if(d){for(const g of n.world.constellations)n.world.constellations.length>1&&g.title.toLowerCase().includes(d)&&f.push({key:`c:${g.id}`,kind:"constellation",title:g.title,sub:`${g.topics.length} topics`,color:g.color,run:()=>n.focus({constellation:g.id})});for(const g of n.world.topics)if((g.title.toLowerCase().includes(d)||g.slug.includes(d))&&f.push({key:`t:${g.slug}`,kind:"topic",title:g.title,sub:`${g.notes} notes`,color:g.color,run:()=>n.focus({topic:g.slug})}),f.length>8)break;for(const g of i){const m=g.topic?h.get(g.topic):void 0;f.push({key:`n:${g.id}`,kind:"note",title:g.title,sub:[m?.title,g.snippet].filter(Boolean).join(" · "),color:m?.color??"#8892b0",run:()=>n.openNote(g.id,g.topic)})}}else for(const g of[...n.world.topics].sort((m,p)=>p.notes-m.notes).slice(0,8))f.push({key:`t:${g.slug}`,kind:"topic",title:g.title,sub:`${g.notes} notes`,color:g.color,run:()=>n.focus({topic:g.slug})});const _=g=>{const m=f[g];m&&(u(),m.run())};return M("div",{class:"palette-scrim",onClick:g=>g.target===g.currentTarget&&u(),children:M("div",{class:"palette panel",role:"dialog","aria-label":"Search notes and topics",children:[M("div",{class:"palette-input",children:[M(Ae,{name:"search"}),M("input",{ref:c,value:t,placeholder:"Search notes and topics…","aria-label":"Search",onInput:g=>{e(g.target.value),l(0)},onKeyDown:g=>{g.key==="ArrowDown"?(g.preventDefault(),l(Math.min(f.length-1,a+1))):g.key==="ArrowUp"?(g.preventDefault(),l(Math.max(0,a-1))):g.key==="Enter"?(g.preventDefault(),_(a)):g.key==="Escape"&&(g.preventDefault(),u())}}),s&&M("span",{class:"spinner"}),M(xs,{children:"esc"})]}),M("div",{class:"palette-results",role:"listbox",children:[!d&&M("div",{class:"palette-section",children:"Largest topics"}),f.map((g,m)=>M("button",{role:"option","aria-selected":m===a,class:`palette-item${m===a?" sel":""}`,onMouseEnter:()=>l(m),onClick:()=>_(m),children:[M(Ce,{color:g.color,size:8}),M("span",{class:`palette-kind kind-${g.kind}`,children:g.kind==="constellation"?"group":g.kind}),M("span",{class:"palette-title",children:g.title}),M("span",{class:"palette-sub",children:g.sub})]},g.key)),d&&!s&&f.length===0&&M("div",{class:"empty",children:["Nothing matches “",t,"”."]})]})]})})}const IS={};function OS(n,t){const e=IS,i=typeof e.includeImageAlt=="boolean"?e.includeImageAlt:!0,r=typeof e.includeHtml=="boolean"?e.includeHtml:!0;return Qf(n,i,r)}function Qf(n,t,e){if(NS(n)){if("value"in n)return n.type==="html"&&!e?"":n.value;if(t&&"alt"in n&&n.alt)return n.alt;if("children"in n)return mh(n.children,t,e)}return Array.isArray(n)?mh(n,t,e):""}function mh(n,t,e){const i=[];let r=-1;for(;++r<n.length;)i[r]=Qf(n[r],t,e);return i.join("")}function NS(n){return!!(n&&typeof n=="object")}const _h=document.createElement("i");function dc(n){const t="&"+n+";";_h.innerHTML=t;const e=_h.textContent;return e.charCodeAt(e.length-1)===59&&n!=="semi"||e===t?!1:e}function hn(n,t,e,i){const r=n.length;let s=0,o;if(t<0?t=-t>r?0:r+t:t=t>r?r:t,e=e>0?e:0,i.length<1e4)o=Array.from(i),o.unshift(t,e),n.splice(...o);else for(e&&n.splice(t,e);s<i.length;)o=i.slice(s,s+1e4),o.unshift(t,0),n.splice(...o),s+=1e4,t+=1e4}function yn(n,t){return n.length>0?(hn(n,n.length,0,t),n):t}const gh={}.hasOwnProperty;function Jf(n){const t={};let e=-1;for(;++e<n.length;)FS(t,n[e]);return t}function FS(n,t){let e;for(e in t){const r=(gh.call(n,e)?n[e]:void 0)||(n[e]={}),s=t[e];let o;if(s)for(o in s){gh.call(r,o)||(r[o]=[]);const a=s[o];kS(r[o],Array.isArray(a)?a:a?[a]:[])}}}function kS(n,t){let e=-1;const i=[];for(;++e<t.length;)(t[e].add==="after"?n:i).push(t[e]);hn(n,0,0,i)}function td(n,t){const e=Number.parseInt(n,t);return e<9||e===11||e>13&&e<32||e>126&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?"�":String.fromCodePoint(e)}function Nn(n){return n.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const qe=Ci(/[A-Za-z]/),nn=Ci(/[\dA-Za-z]/),zS=Ci(/[#-'*+\--9=?A-Z^-~]/);function wo(n){return n!==null&&(n<32||n===127)}const kl=Ci(/\d/),BS=Ci(/[\dA-Fa-f]/),HS=Ci(/[!-/:-@[-`{-~]/);function Dt(n){return n!==null&&n<-2}function de(n){return n!==null&&(n<0||n===32)}function qt(n){return n===-2||n===-1||n===32}const Fo=Ci(/\p{P}|\p{S}/u),nr=Ci(/\s/);function Ci(n){return t;function t(e){return e!==null&&e>-1&&n.test(String.fromCharCode(e))}}function Kt(n,t,e,i){const r=i?i-1:Number.POSITIVE_INFINITY;let s=0;return o;function o(l){return qt(l)?(n.enter(e),a(l)):t(l)}function a(l){return qt(l)&&s++<r?(n.consume(l),a):(n.exit(e),t(l))}}const VS={tokenize:GS};function GS(n){const t=n.attempt(this.parser.constructs.contentInitial,i,r);let e;return t;function i(a){if(a===null){n.consume(a);return}return n.enter("lineEnding"),n.consume(a),n.exit("lineEnding"),Kt(n,t,"linePrefix")}function r(a){return n.enter("paragraph"),s(a)}function s(a){const l=n.enter("chunkText",{contentType:"text",previous:e});return e&&(e.next=l),e=l,o(a)}function o(a){if(a===null){n.exit("chunkText"),n.exit("paragraph"),n.consume(a);return}return Dt(a)?(n.consume(a),n.exit("chunkText"),s):(n.consume(a),o)}}const WS={tokenize:XS},vh={tokenize:qS};function XS(n){const t=this,e=[];let i=0,r,s,o;return a;function a(y){if(i<e.length){const S=e[i];return t.containerState=S[1],n.attempt(S[0].continuation,l,c)(y)}return c(y)}function l(y){if(i++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,r&&v();const S=t.events.length;let w=S,b;for(;w--;)if(t.events[w][0]==="exit"&&t.events[w][1].type==="chunkFlow"){b=t.events[w][1].end;break}p(i);let A=S;for(;A<t.events.length;)t.events[A][1].end={...b},A++;return hn(t.events,w+1,0,t.events.slice(S)),t.events.length=A,c(y)}return a(y)}function c(y){if(i===e.length){if(!r)return d(y);if(r.currentConstruct&&r.currentConstruct.concrete)return _(y);t.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return t.containerState={},n.check(vh,h,u)(y)}function h(y){return r&&v(),p(i),d(y)}function u(y){return t.parser.lazy[t.now().line]=i!==e.length,o=t.now().offset,_(y)}function d(y){return t.containerState={},n.attempt(vh,f,_)(y)}function f(y){return i++,e.push([t.currentConstruct,t.containerState]),d(y)}function _(y){if(y===null){r&&v(),p(0),n.consume(y);return}return r=r||t.parser.flow(t.now()),n.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:s}),g(y)}function g(y){if(y===null){m(n.exit("chunkFlow"),!0),p(0),n.consume(y);return}return Dt(y)?(n.consume(y),m(n.exit("chunkFlow")),i=0,t.interrupt=void 0,a):(n.consume(y),g)}function m(y,S){const w=t.sliceStream(y);if(S&&w.push(null),y.previous=s,s&&(s.next=y),s=y,r.defineSkip(y.start),r.write(w),t.parser.lazy[y.start.line]){let b=r.events.length;for(;b--;)if(r.events[b][1].start.offset<o&&(!r.events[b][1].end||r.events[b][1].end.offset>o))return;const A=t.events.length;let L=A,E,x;for(;L--;)if(t.events[L][0]==="exit"&&t.events[L][1].type==="chunkFlow"){if(E){x=t.events[L][1].end;break}E=!0}for(p(i),b=A;b<t.events.length;)t.events[b][1].end={...x},b++;hn(t.events,L+1,0,t.events.slice(A)),t.events.length=b}}function p(y){let S=e.length;for(;S-- >y;){const w=e[S];t.containerState=w[1],w[0].exit.call(t,n)}e.length=y}function v(){r.write([null]),s=void 0,r=void 0,t.containerState._closeFlow=void 0}}function qS(n,t,e){return Kt(n,n.attempt(this.parser.constructs.document,t,e),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Ao(n){if(n===null||de(n)||nr(n))return 1;if(Fo(n))return 2}function ko(n,t,e){const i=[];let r=-1;for(;++r<n.length;){const s=n[r].resolveAll;s&&!i.includes(s)&&(t=s(t,e),i.push(s))}return t}const zl={name:"attention",resolveAll:$S,tokenize:YS};function $S(n,t){let e=-1,i,r,s,o,a,l,c,h;for(;++e<n.length;)if(n[e][0]==="enter"&&n[e][1].type==="attentionSequence"&&n[e][1]._close){for(i=e;i--;)if(n[i][0]==="exit"&&n[i][1].type==="attentionSequence"&&n[i][1]._open&&t.sliceSerialize(n[i][1]).charCodeAt(0)===t.sliceSerialize(n[e][1]).charCodeAt(0)){if((n[i][1]._close||n[e][1]._open)&&(n[e][1].end.offset-n[e][1].start.offset)%3&&!((n[i][1].end.offset-n[i][1].start.offset+n[e][1].end.offset-n[e][1].start.offset)%3))continue;l=n[i][1].end.offset-n[i][1].start.offset>1&&n[e][1].end.offset-n[e][1].start.offset>1?2:1;const u={...n[i][1].end},d={...n[e][1].start};xh(u,-l),xh(d,l),o={type:l>1?"strongSequence":"emphasisSequence",start:u,end:{...n[i][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...n[e][1].start},end:d},s={type:l>1?"strongText":"emphasisText",start:{...n[i][1].end},end:{...n[e][1].start}},r={type:l>1?"strong":"emphasis",start:{...o.start},end:{...a.end}},n[i][1].end={...o.start},n[e][1].start={...a.end},c=[],n[i][1].end.offset-n[i][1].start.offset&&(c=yn(c,[["enter",n[i][1],t],["exit",n[i][1],t]])),c=yn(c,[["enter",r,t],["enter",o,t],["exit",o,t],["enter",s,t]]),c=yn(c,ko(t.parser.constructs.insideSpan.null,n.slice(i+1,e),t)),c=yn(c,[["exit",s,t],["enter",a,t],["exit",a,t],["exit",r,t]]),n[e][1].end.offset-n[e][1].start.offset?(h=2,c=yn(c,[["enter",n[e][1],t],["exit",n[e][1],t]])):h=0,hn(n,i-1,e-i+3,c),e=i+c.length-h-2;break}}for(e=-1;++e<n.length;)n[e][1].type==="attentionSequence"&&(n[e][1].type="data");return n}function YS(n,t){const e=this.parser.constructs.attentionMarkers.null,i=this.previous,r=Ao(i);let s;return o;function o(l){return s=l,n.enter("attentionSequence"),a(l)}function a(l){if(l===s)return n.consume(l),a;const c=n.exit("attentionSequence"),h=Ao(l),u=!h||h===2&&r||e.includes(l),d=!r||r===2&&h||e.includes(i);return c._open=!!(s===42?u:u&&(r||!d)),c._close=!!(s===42?d:d&&(h||!u)),t(l)}}function xh(n,t){n.column+=t,n.offset+=t,n._bufferIndex+=t}const ZS={name:"autolink",tokenize:jS};function jS(n,t,e){let i=0;return r;function r(f){return n.enter("autolink"),n.enter("autolinkMarker"),n.consume(f),n.exit("autolinkMarker"),n.enter("autolinkProtocol"),s}function s(f){return qe(f)?(n.consume(f),o):f===64?e(f):c(f)}function o(f){return f===43||f===45||f===46||nn(f)?(i=1,a(f)):c(f)}function a(f){return f===58?(n.consume(f),i=0,l):(f===43||f===45||f===46||nn(f))&&i++<32?(n.consume(f),a):(i=0,c(f))}function l(f){return f===62?(n.exit("autolinkProtocol"),n.enter("autolinkMarker"),n.consume(f),n.exit("autolinkMarker"),n.exit("autolink"),t):f===null||f===32||f===60||wo(f)?e(f):(n.consume(f),l)}function c(f){return f===64?(n.consume(f),h):zS(f)?(n.consume(f),c):e(f)}function h(f){return nn(f)?u(f):e(f)}function u(f){return f===46?(n.consume(f),i=0,h):f===62?(n.exit("autolinkProtocol").type="autolinkEmail",n.enter("autolinkMarker"),n.consume(f),n.exit("autolinkMarker"),n.exit("autolink"),t):d(f)}function d(f){if((f===45||nn(f))&&i++<63){const _=f===45?d:u;return n.consume(f),_}return e(f)}}const ys={partial:!0,tokenize:KS};function KS(n,t,e){return i;function i(s){return qt(s)?Kt(n,r,"linePrefix")(s):r(s)}function r(s){return s===null||Dt(s)?t(s):e(s)}}const ed={continuation:{tokenize:JS},exit:tM,name:"blockQuote",tokenize:QS};function QS(n,t,e){const i=this;return r;function r(o){if(o===62){const a=i.containerState;return a.open||(n.enter("blockQuote",{_container:!0}),a.open=!0),n.enter("blockQuotePrefix"),n.enter("blockQuoteMarker"),n.consume(o),n.exit("blockQuoteMarker"),s}return e(o)}function s(o){return qt(o)?(n.enter("blockQuotePrefixWhitespace"),n.consume(o),n.exit("blockQuotePrefixWhitespace"),n.exit("blockQuotePrefix"),t):(n.exit("blockQuotePrefix"),t(o))}}function JS(n,t,e){const i=this;return r;function r(o){return qt(o)?Kt(n,s,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):s(o)}function s(o){return n.attempt(ed,t,e)(o)}}function tM(n){n.exit("blockQuote")}const nd={name:"characterEscape",tokenize:eM};function eM(n,t,e){return i;function i(s){return n.enter("characterEscape"),n.enter("escapeMarker"),n.consume(s),n.exit("escapeMarker"),r}function r(s){return HS(s)?(n.enter("characterEscapeValue"),n.consume(s),n.exit("characterEscapeValue"),n.exit("characterEscape"),t):e(s)}}const id={name:"characterReference",tokenize:nM};function nM(n,t,e){const i=this;let r=0,s,o;return a;function a(u){return n.enter("characterReference"),n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),l}function l(u){return u===35?(n.enter("characterReferenceMarkerNumeric"),n.consume(u),n.exit("characterReferenceMarkerNumeric"),c):(n.enter("characterReferenceValue"),s=31,o=nn,h(u))}function c(u){return u===88||u===120?(n.enter("characterReferenceMarkerHexadecimal"),n.consume(u),n.exit("characterReferenceMarkerHexadecimal"),n.enter("characterReferenceValue"),s=6,o=BS,h):(n.enter("characterReferenceValue"),s=7,o=kl,h(u))}function h(u){if(u===59&&r){const d=n.exit("characterReferenceValue");return o===nn&&!dc(i.sliceSerialize(d))?e(u):(n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),n.exit("characterReference"),t)}return o(u)&&r++<s?(n.consume(u),h):e(u)}}const yh={partial:!0,tokenize:rM},Sh={concrete:!0,name:"codeFenced",tokenize:iM};function iM(n,t,e){const i=this,r={partial:!0,tokenize:w};let s=0,o=0,a;return l;function l(b){return c(b)}function c(b){const A=i.events[i.events.length-1];return s=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,a=b,n.enter("codeFenced"),n.enter("codeFencedFence"),n.enter("codeFencedFenceSequence"),h(b)}function h(b){return b===a?(o++,n.consume(b),h):o<3?e(b):(n.exit("codeFencedFenceSequence"),qt(b)?Kt(n,u,"whitespace")(b):u(b))}function u(b){return b===null||Dt(b)?(n.exit("codeFencedFence"),i.interrupt?t(b):n.check(yh,g,S)(b)):(n.enter("codeFencedFenceInfo"),n.enter("chunkString",{contentType:"string"}),d(b))}function d(b){return b===null||Dt(b)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),u(b)):qt(b)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),Kt(n,f,"whitespace")(b)):b===96&&b===a?e(b):(n.consume(b),d)}function f(b){return b===null||Dt(b)?u(b):(n.enter("codeFencedFenceMeta"),n.enter("chunkString",{contentType:"string"}),_(b))}function _(b){return b===null||Dt(b)?(n.exit("chunkString"),n.exit("codeFencedFenceMeta"),u(b)):b===96&&b===a?e(b):(n.consume(b),_)}function g(b){return n.attempt(r,S,m)(b)}function m(b){return n.enter("lineEnding"),n.consume(b),n.exit("lineEnding"),p}function p(b){return s>0&&qt(b)?Kt(n,v,"linePrefix",s+1)(b):v(b)}function v(b){return b===null||Dt(b)?n.check(yh,g,S)(b):(n.enter("codeFlowValue"),y(b))}function y(b){return b===null||Dt(b)?(n.exit("codeFlowValue"),v(b)):(n.consume(b),y)}function S(b){return n.exit("codeFenced"),t(b)}function w(b,A,L){let E=0;return x;function x(G){return b.enter("lineEnding"),b.consume(G),b.exit("lineEnding"),R}function R(G){return b.enter("codeFencedFence"),qt(G)?Kt(b,D,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(G):D(G)}function D(G){return G===a?(b.enter("codeFencedFenceSequence"),N(G)):L(G)}function N(G){return G===a?(E++,b.consume(G),N):E>=o?(b.exit("codeFencedFenceSequence"),qt(G)?Kt(b,X,"whitespace")(G):X(G)):L(G)}function X(G){return G===null||Dt(G)?(b.exit("codeFencedFence"),A(G)):L(G)}}}function rM(n,t,e){const i=this;return r;function r(o){return o===null?e(o):(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}const Ia={name:"codeIndented",tokenize:oM},sM={partial:!0,tokenize:aM};function oM(n,t,e){const i=this;return r;function r(c){return n.enter("codeIndented"),Kt(n,s,"linePrefix",5)(c)}function s(c){const h=i.events[i.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?o(c):e(c)}function o(c){return c===null?l(c):Dt(c)?n.attempt(sM,o,l)(c):(n.enter("codeFlowValue"),a(c))}function a(c){return c===null||Dt(c)?(n.exit("codeFlowValue"),o(c)):(n.consume(c),a)}function l(c){return n.exit("codeIndented"),t(c)}}function aM(n,t,e){const i=this;return r;function r(o){return i.parser.lazy[i.now().line]?e(o):Dt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),r):Kt(n,s,"linePrefix",5)(o)}function s(o){const a=i.events[i.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):Dt(o)?r(o):e(o)}}const lM={name:"codeText",previous:uM,resolve:cM,tokenize:hM};function cM(n){let t=n.length-4,e=3,i,r;if((n[e][1].type==="lineEnding"||n[e][1].type==="space")&&(n[t][1].type==="lineEnding"||n[t][1].type==="space")){for(i=e;++i<t;)if(n[i][1].type==="codeTextData"){n[e][1].type="codeTextPadding",n[t][1].type="codeTextPadding",e+=2,t-=2;break}}for(i=e-1,t++;++i<=t;)r===void 0?i!==t&&n[i][1].type!=="lineEnding"&&(r=i):(i===t||n[i][1].type==="lineEnding")&&(n[r][1].type="codeTextData",i!==r+2&&(n[r][1].end=n[i-1][1].end,n.splice(r+2,i-r-2),t-=i-r-2,i=r+2),r=void 0);return n}function uM(n){return n!==96||this.events[this.events.length-1][1].type==="characterEscape"}function hM(n,t,e){let i=0,r,s;return o;function o(u){return n.enter("codeText"),n.enter("codeTextSequence"),a(u)}function a(u){return u===96?(n.consume(u),i++,a):(n.exit("codeTextSequence"),l(u))}function l(u){return u===null?e(u):u===32?(n.enter("space"),n.consume(u),n.exit("space"),l):u===96?(s=n.enter("codeTextSequence"),r=0,h(u)):Dt(u)?(n.enter("lineEnding"),n.consume(u),n.exit("lineEnding"),l):(n.enter("codeTextData"),c(u))}function c(u){return u===null||u===32||u===96||Dt(u)?(n.exit("codeTextData"),l(u)):(n.consume(u),c)}function h(u){return u===96?(n.consume(u),r++,h):r===i?(n.exit("codeTextSequence"),n.exit("codeText"),t(u)):(s.type="codeTextData",c(u))}}class fM{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,e){const i=e??Number.POSITIVE_INFINITY;return i<this.left.length?this.left.slice(t,i):t>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(t,e,i){const r=e||0;this.setCursor(Math.trunc(t));const s=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return i&&Qr(this.left,i),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Qr(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Qr(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const e=this.left.splice(t,Number.POSITIVE_INFINITY);Qr(this.right,e.reverse())}else{const e=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Qr(this.left,e.reverse())}}}function Qr(n,t){let e=0;if(t.length<1e4)n.push(...t);else for(;e<t.length;)n.push(...t.slice(e,e+1e4)),e+=1e4}function rd(n){const t={};let e=-1,i,r,s,o,a,l,c;const h=new fM(n);for(;++e<h.length;){for(;e in t;)e=t[e];if(i=h.get(e),e&&i[1].type==="chunkFlow"&&h.get(e-1)[1].type==="listItemPrefix"&&(l=i[1]._tokenizer.events,s=0,s<l.length&&l[s][1].type==="lineEndingBlank"&&(s+=2),s<l.length&&l[s][1].type==="content"))for(;++s<l.length&&l[s][1].type!=="content";)l[s][1].type==="chunkText"&&(l[s][1]._isInFirstContentOfListItem=!0,s++);if(i[0]==="enter")i[1].contentType&&(Object.assign(t,dM(h,e)),e=t[e],c=!0);else if(i[1]._container){for(s=e,r=void 0;s--;)if(o=h.get(s),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(r&&(h.get(r)[1].type="lineEndingBlank"),o[1].type="lineEnding",r=s);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;r&&(i[1].end={...h.get(r)[1].start},a=h.slice(r,e),a.unshift(i),h.splice(r,e-r+1,a))}}return hn(n,0,Number.POSITIVE_INFINITY,h.slice(0)),!c}function dM(n,t){const e=n.get(t)[1],i=n.get(t)[2];let r=t-1;const s=[];let o=e._tokenizer;o||(o=i.parser[e.contentType](e.start),e._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const a=o.events,l=[],c={};let h,u,d=-1,f=e,_=0,g=0;const m=[g];for(;f;){for(;n.get(++r)[1]!==f;);s.push(r),f._tokenizer||(h=i.sliceStream(f),f.next||h.push(null),u&&o.defineSkip(f.start),f._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(h),f._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),u=f,f=f.next}for(f=e;++d<a.length;)a[d][0]==="exit"&&a[d-1][0]==="enter"&&a[d][1].type===a[d-1][1].type&&a[d][1].start.line!==a[d][1].end.line&&(g=d+1,m.push(g),f._tokenizer=void 0,f.previous=void 0,f=f.next);for(o.events=[],f?(f._tokenizer=void 0,f.previous=void 0):m.pop(),d=m.length;d--;){const p=a.slice(m[d],m[d+1]),v=s.pop();l.push([v,v+p.length-1]),n.splice(v,2,p)}for(l.reverse(),d=-1;++d<l.length;)c[_+l[d][0]]=_+l[d][1],_+=l[d][1]-l[d][0]-1;return c}const pM={resolve:_M,tokenize:gM},mM={partial:!0,tokenize:vM};function _M(n){return rd(n),n}function gM(n,t){let e;return i;function i(a){return n.enter("content"),e=n.enter("chunkContent",{contentType:"content"}),r(a)}function r(a){return a===null?s(a):Dt(a)?n.check(mM,o,s)(a):(n.consume(a),r)}function s(a){return n.exit("chunkContent"),n.exit("content"),t(a)}function o(a){return n.consume(a),n.exit("chunkContent"),e.next=n.enter("chunkContent",{contentType:"content",previous:e}),e=e.next,r}}function vM(n,t,e){const i=this;return r;function r(o){return n.exit("chunkContent"),n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),Kt(n,s,"linePrefix")}function s(o){if(o===null||Dt(o))return e(o);const a=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):n.interrupt(i.parser.constructs.flow,e,t)(o)}}function sd(n,t,e,i,r,s,o,a,l){const c=l||Number.POSITIVE_INFINITY;let h=0;return u;function u(p){return p===60?(n.enter(i),n.enter(r),n.enter(s),n.consume(p),n.exit(s),d):p===null||p===32||p===41||wo(p)?e(p):(n.enter(i),n.enter(o),n.enter(a),n.enter("chunkString",{contentType:"string"}),g(p))}function d(p){return p===62?(n.enter(s),n.consume(p),n.exit(s),n.exit(r),n.exit(i),t):(n.enter(a),n.enter("chunkString",{contentType:"string"}),f(p))}function f(p){return p===62?(n.exit("chunkString"),n.exit(a),d(p)):p===null||p===60||Dt(p)?e(p):(n.consume(p),p===92?_:f)}function _(p){return p===60||p===62||p===92?(n.consume(p),f):f(p)}function g(p){return!h&&(p===null||p===41||de(p))?(n.exit("chunkString"),n.exit(a),n.exit(o),n.exit(i),t(p)):h<c&&p===40?(n.consume(p),h++,g):p===41?(n.consume(p),h--,g):p===null||p===32||p===40||wo(p)?e(p):(n.consume(p),p===92?m:g)}function m(p){return p===40||p===41||p===92?(n.consume(p),g):g(p)}}function od(n,t,e,i,r,s){const o=this;let a=0,l;return c;function c(f){return n.enter(i),n.enter(r),n.consume(f),n.exit(r),n.enter(s),h}function h(f){return a>999||f===null||f===91||f===93&&!l||f===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?e(f):f===93?(n.exit(s),n.enter(r),n.consume(f),n.exit(r),n.exit(i),t):Dt(f)?(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),h):(n.enter("chunkString",{contentType:"string"}),u(f))}function u(f){return f===null||f===91||f===93||Dt(f)||a++>999?(n.exit("chunkString"),h(f)):(n.consume(f),l||(l=!qt(f)),f===92?d:u)}function d(f){return f===91||f===92||f===93?(n.consume(f),a++,u):u(f)}}function ad(n,t,e,i,r,s){let o;return a;function a(d){return d===34||d===39||d===40?(n.enter(i),n.enter(r),n.consume(d),n.exit(r),o=d===40?41:d,l):e(d)}function l(d){return d===o?(n.enter(r),n.consume(d),n.exit(r),n.exit(i),t):(n.enter(s),c(d))}function c(d){return d===o?(n.exit(s),l(o)):d===null?e(d):Dt(d)?(n.enter("lineEnding"),n.consume(d),n.exit("lineEnding"),Kt(n,c,"linePrefix")):(n.enter("chunkString",{contentType:"string"}),h(d))}function h(d){return d===o||d===null||Dt(d)?(n.exit("chunkString"),c(d)):(n.consume(d),d===92?u:h)}function u(d){return d===o||d===92?(n.consume(d),h):h(d)}}function os(n,t){let e;return i;function i(r){return Dt(r)?(n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),e=!0,i):qt(r)?Kt(n,i,e?"linePrefix":"lineSuffix")(r):t(r)}}const xM={name:"definition",tokenize:SM},yM={partial:!0,tokenize:MM};function SM(n,t,e){const i=this;let r;return s;function s(f){return n.enter("definition"),o(f)}function o(f){return od.call(i,n,a,e,"definitionLabel","definitionLabelMarker","definitionLabelString")(f)}function a(f){return r=Nn(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),f===58?(n.enter("definitionMarker"),n.consume(f),n.exit("definitionMarker"),l):e(f)}function l(f){return de(f)?os(n,c)(f):c(f)}function c(f){return sd(n,h,e,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(f)}function h(f){return n.attempt(yM,u,u)(f)}function u(f){return qt(f)?Kt(n,d,"whitespace")(f):d(f)}function d(f){return f===null||Dt(f)?(n.exit("definition"),i.parser.defined.push(r),t(f)):e(f)}}function MM(n,t,e){return i;function i(a){return de(a)?os(n,r)(a):e(a)}function r(a){return ad(n,s,e,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function s(a){return qt(a)?Kt(n,o,"whitespace")(a):o(a)}function o(a){return a===null||Dt(a)?t(a):e(a)}}const EM={name:"hardBreakEscape",tokenize:bM};function bM(n,t,e){return i;function i(s){return n.enter("hardBreakEscape"),n.consume(s),r}function r(s){return Dt(s)?(n.exit("hardBreakEscape"),t(s)):e(s)}}const TM={name:"headingAtx",resolve:wM,tokenize:AM};function wM(n,t){let e=n.length-2,i=3,r,s;return n[i][1].type==="whitespace"&&(i+=2),e-2>i&&n[e][1].type==="whitespace"&&(e-=2),n[e][1].type==="atxHeadingSequence"&&(i===e-1||e-4>i&&n[e-2][1].type==="whitespace")&&(e-=i+1===e?2:4),e>i&&(r={type:"atxHeadingText",start:n[i][1].start,end:n[e][1].end},s={type:"chunkText",start:n[i][1].start,end:n[e][1].end,contentType:"text"},hn(n,i,e-i+1,[["enter",r,t],["enter",s,t],["exit",s,t],["exit",r,t]])),n}function AM(n,t,e){let i=0;return r;function r(h){return n.enter("atxHeading"),s(h)}function s(h){return n.enter("atxHeadingSequence"),o(h)}function o(h){return h===35&&i++<6?(n.consume(h),o):h===null||de(h)?(n.exit("atxHeadingSequence"),a(h)):e(h)}function a(h){return h===35?(n.enter("atxHeadingSequence"),l(h)):h===null||Dt(h)?(n.exit("atxHeading"),t(h)):qt(h)?Kt(n,a,"whitespace")(h):(n.enter("atxHeadingText"),c(h))}function l(h){return h===35?(n.consume(h),l):(n.exit("atxHeadingSequence"),a(h))}function c(h){return h===null||h===35||de(h)?(n.exit("atxHeadingText"),a(h)):(n.consume(h),c)}}const CM=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Mh=["pre","script","style","textarea"],RM={concrete:!0,name:"htmlFlow",resolveTo:LM,tokenize:UM},PM={partial:!0,tokenize:OM},DM={partial:!0,tokenize:IM};function LM(n){let t=n.length;for(;t--&&!(n[t][0]==="enter"&&n[t][1].type==="htmlFlow"););return t>1&&n[t-2][1].type==="linePrefix"&&(n[t][1].start=n[t-2][1].start,n[t+1][1].start=n[t-2][1].start,n.splice(t-2,2)),n}function UM(n,t,e){const i=this;let r,s,o,a,l;return c;function c(O){return h(O)}function h(O){return n.enter("htmlFlow"),n.enter("htmlFlowData"),n.consume(O),u}function u(O){return O===33?(n.consume(O),d):O===47?(n.consume(O),s=!0,g):O===63?(n.consume(O),r=3,i.interrupt?t:P):qe(O)?(n.consume(O),o=String.fromCharCode(O),m):e(O)}function d(O){return O===45?(n.consume(O),r=2,f):O===91?(n.consume(O),r=5,a=0,_):qe(O)?(n.consume(O),r=4,i.interrupt?t:P):e(O)}function f(O){return O===45?(n.consume(O),i.interrupt?t:P):e(O)}function _(O){const J="CDATA[";return O===J.charCodeAt(a++)?(n.consume(O),a===J.length?i.interrupt?t:D:_):e(O)}function g(O){return qe(O)?(n.consume(O),o=String.fromCharCode(O),m):e(O)}function m(O){if(O===null||O===47||O===62||de(O)){const J=O===47,lt=o.toLowerCase();return!J&&!s&&Mh.includes(lt)?(r=1,i.interrupt?t(O):D(O)):CM.includes(o.toLowerCase())?(r=6,J?(n.consume(O),p):i.interrupt?t(O):D(O)):(r=7,i.interrupt&&!i.parser.lazy[i.now().line]?e(O):s?v(O):y(O))}return O===45||nn(O)?(n.consume(O),o+=String.fromCharCode(O),m):e(O)}function p(O){return O===62?(n.consume(O),i.interrupt?t:D):e(O)}function v(O){return qt(O)?(n.consume(O),v):x(O)}function y(O){return O===47?(n.consume(O),x):O===58||O===95||qe(O)?(n.consume(O),S):qt(O)?(n.consume(O),y):x(O)}function S(O){return O===45||O===46||O===58||O===95||nn(O)?(n.consume(O),S):w(O)}function w(O){return O===61?(n.consume(O),b):qt(O)?(n.consume(O),w):y(O)}function b(O){return O===null||O===60||O===61||O===62||O===96?e(O):O===34||O===39?(n.consume(O),l=O,A):qt(O)?(n.consume(O),b):L(O)}function A(O){return O===l?(n.consume(O),l=null,E):O===null||Dt(O)?e(O):(n.consume(O),A)}function L(O){return O===null||O===34||O===39||O===47||O===60||O===61||O===62||O===96||de(O)?w(O):(n.consume(O),L)}function E(O){return O===47||O===62||qt(O)?y(O):e(O)}function x(O){return O===62?(n.consume(O),R):e(O)}function R(O){return O===null||Dt(O)?D(O):qt(O)?(n.consume(O),R):e(O)}function D(O){return O===45&&r===2?(n.consume(O),Y):O===60&&r===1?(n.consume(O),Q):O===62&&r===4?(n.consume(O),gt):O===63&&r===3?(n.consume(O),P):O===93&&r===5?(n.consume(O),at):Dt(O)&&(r===6||r===7)?(n.exit("htmlFlowData"),n.check(PM,Ut,N)(O)):O===null||Dt(O)?(n.exit("htmlFlowData"),N(O)):(n.consume(O),D)}function N(O){return n.check(DM,X,Ut)(O)}function X(O){return n.enter("lineEnding"),n.consume(O),n.exit("lineEnding"),G}function G(O){return O===null||Dt(O)?N(O):(n.enter("htmlFlowData"),D(O))}function Y(O){return O===45?(n.consume(O),P):D(O)}function Q(O){return O===47?(n.consume(O),o="",Z):D(O)}function Z(O){if(O===62){const J=o.toLowerCase();return Mh.includes(J)?(n.consume(O),gt):D(O)}return qe(O)&&o.length<8?(n.consume(O),o+=String.fromCharCode(O),Z):D(O)}function at(O){return O===93?(n.consume(O),P):D(O)}function P(O){return O===62?(n.consume(O),gt):O===45&&r===2?(n.consume(O),P):D(O)}function gt(O){return O===null||Dt(O)?(n.exit("htmlFlowData"),Ut(O)):(n.consume(O),gt)}function Ut(O){return n.exit("htmlFlow"),t(O)}}function IM(n,t,e){const i=this;return r;function r(o){return Dt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s):e(o)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}function OM(n,t,e){return i;function i(r){return n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),n.attempt(ys,t,e)}}const NM={name:"htmlText",tokenize:FM};function FM(n,t,e){const i=this;let r,s,o;return a;function a(P){return n.enter("htmlText"),n.enter("htmlTextData"),n.consume(P),l}function l(P){return P===33?(n.consume(P),c):P===47?(n.consume(P),w):P===63?(n.consume(P),y):qe(P)?(n.consume(P),L):e(P)}function c(P){return P===45?(n.consume(P),h):P===91?(n.consume(P),s=0,_):qe(P)?(n.consume(P),v):e(P)}function h(P){return P===45?(n.consume(P),f):e(P)}function u(P){return P===null?e(P):P===45?(n.consume(P),d):Dt(P)?(o=u,Q(P)):(n.consume(P),u)}function d(P){return P===45?(n.consume(P),f):u(P)}function f(P){return P===62?Y(P):P===45?d(P):u(P)}function _(P){const gt="CDATA[";return P===gt.charCodeAt(s++)?(n.consume(P),s===gt.length?g:_):e(P)}function g(P){return P===null?e(P):P===93?(n.consume(P),m):Dt(P)?(o=g,Q(P)):(n.consume(P),g)}function m(P){return P===93?(n.consume(P),p):g(P)}function p(P){return P===62?Y(P):P===93?(n.consume(P),p):g(P)}function v(P){return P===null||P===62?Y(P):Dt(P)?(o=v,Q(P)):(n.consume(P),v)}function y(P){return P===null?e(P):P===63?(n.consume(P),S):Dt(P)?(o=y,Q(P)):(n.consume(P),y)}function S(P){return P===62?Y(P):y(P)}function w(P){return qe(P)?(n.consume(P),b):e(P)}function b(P){return P===45||nn(P)?(n.consume(P),b):A(P)}function A(P){return Dt(P)?(o=A,Q(P)):qt(P)?(n.consume(P),A):Y(P)}function L(P){return P===45||nn(P)?(n.consume(P),L):P===47||P===62||de(P)?E(P):e(P)}function E(P){return P===47?(n.consume(P),Y):P===58||P===95||qe(P)?(n.consume(P),x):Dt(P)?(o=E,Q(P)):qt(P)?(n.consume(P),E):Y(P)}function x(P){return P===45||P===46||P===58||P===95||nn(P)?(n.consume(P),x):R(P)}function R(P){return P===61?(n.consume(P),D):Dt(P)?(o=R,Q(P)):qt(P)?(n.consume(P),R):E(P)}function D(P){return P===null||P===60||P===61||P===62||P===96?e(P):P===34||P===39?(n.consume(P),r=P,N):Dt(P)?(o=D,Q(P)):qt(P)?(n.consume(P),D):(n.consume(P),X)}function N(P){return P===r?(n.consume(P),r=void 0,G):P===null?e(P):Dt(P)?(o=N,Q(P)):(n.consume(P),N)}function X(P){return P===null||P===34||P===39||P===60||P===61||P===96?e(P):P===47||P===62||de(P)?E(P):(n.consume(P),X)}function G(P){return P===47||P===62||de(P)?E(P):e(P)}function Y(P){return P===62?(n.consume(P),n.exit("htmlTextData"),n.exit("htmlText"),t):e(P)}function Q(P){return n.exit("htmlTextData"),n.enter("lineEnding"),n.consume(P),n.exit("lineEnding"),Z}function Z(P){return qt(P)?Kt(n,at,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(P):at(P)}function at(P){return n.enter("htmlTextData"),o(P)}}const pc={name:"labelEnd",resolveAll:HM,resolveTo:VM,tokenize:GM},kM={tokenize:WM},zM={tokenize:XM},BM={tokenize:qM};function HM(n){let t=-1;const e=[];for(;++t<n.length;){const i=n[t][1];if(e.push(n[t]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){const r=i.type==="labelImage"?4:2;i.type="data",t+=r}}return n.length!==e.length&&hn(n,0,n.length,e),n}function VM(n,t){let e=n.length,i=0,r,s,o,a;for(;e--;)if(r=n[e][1],s){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;n[e][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(o){if(n[e][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(s=e,r.type!=="labelLink")){i=2;break}}else r.type==="labelEnd"&&(o=e);const l={type:n[s][1].type==="labelLink"?"link":"image",start:{...n[s][1].start},end:{...n[n.length-1][1].end}},c={type:"label",start:{...n[s][1].start},end:{...n[o][1].end}},h={type:"labelText",start:{...n[s+i+2][1].end},end:{...n[o-2][1].start}};return a=[["enter",l,t],["enter",c,t]],a=yn(a,n.slice(s+1,s+i+3)),a=yn(a,[["enter",h,t]]),a=yn(a,ko(t.parser.constructs.insideSpan.null,n.slice(s+i+4,o-3),t)),a=yn(a,[["exit",h,t],n[o-2],n[o-1],["exit",c,t]]),a=yn(a,n.slice(o+1)),a=yn(a,[["exit",l,t]]),hn(n,s,n.length,a),n}function GM(n,t,e){const i=this;let r=i.events.length,s,o;for(;r--;)if((i.events[r][1].type==="labelImage"||i.events[r][1].type==="labelLink")&&!i.events[r][1]._balanced){s=i.events[r][1];break}return a;function a(d){return s?s._inactive?u(d):(o=i.parser.defined.includes(Nn(i.sliceSerialize({start:s.end,end:i.now()}))),n.enter("labelEnd"),n.enter("labelMarker"),n.consume(d),n.exit("labelMarker"),n.exit("labelEnd"),l):e(d)}function l(d){return d===40?n.attempt(kM,h,o?h:u)(d):d===91?n.attempt(zM,h,o?c:u)(d):o?h(d):u(d)}function c(d){return n.attempt(BM,h,u)(d)}function h(d){return t(d)}function u(d){return s._balanced=!0,e(d)}}function WM(n,t,e){return i;function i(u){return n.enter("resource"),n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),r}function r(u){return de(u)?os(n,s)(u):s(u)}function s(u){return u===41?h(u):sd(n,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function o(u){return de(u)?os(n,l)(u):h(u)}function a(u){return e(u)}function l(u){return u===34||u===39||u===40?ad(n,c,e,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):h(u)}function c(u){return de(u)?os(n,h)(u):h(u)}function h(u){return u===41?(n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),n.exit("resource"),t):e(u)}}function XM(n,t,e){const i=this;return r;function r(a){return od.call(i,n,s,o,"reference","referenceMarker","referenceString")(a)}function s(a){return i.parser.defined.includes(Nn(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?t(a):e(a)}function o(a){return e(a)}}function qM(n,t,e){return i;function i(s){return n.enter("reference"),n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),r}function r(s){return s===93?(n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),n.exit("reference"),t):e(s)}}const $M={name:"labelStartImage",resolveAll:pc.resolveAll,tokenize:YM};function YM(n,t,e){const i=this;return r;function r(a){return n.enter("labelImage"),n.enter("labelImageMarker"),n.consume(a),n.exit("labelImageMarker"),s}function s(a){return a===91?(n.enter("labelMarker"),n.consume(a),n.exit("labelMarker"),n.exit("labelImage"),o):e(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(a):t(a)}}const ZM={name:"labelStartLink",resolveAll:pc.resolveAll,tokenize:jM};function jM(n,t,e){const i=this;return r;function r(o){return n.enter("labelLink"),n.enter("labelMarker"),n.consume(o),n.exit("labelMarker"),n.exit("labelLink"),s}function s(o){return o===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(o):t(o)}}const Oa={name:"lineEnding",tokenize:KM};function KM(n,t){return e;function e(i){return n.enter("lineEnding"),n.consume(i),n.exit("lineEnding"),Kt(n,t,"linePrefix")}}const go={name:"thematicBreak",tokenize:QM};function QM(n,t,e){let i=0,r;return s;function s(c){return n.enter("thematicBreak"),o(c)}function o(c){return r=c,a(c)}function a(c){return c===r?(n.enter("thematicBreakSequence"),l(c)):i>=3&&(c===null||Dt(c))?(n.exit("thematicBreak"),t(c)):e(c)}function l(c){return c===r?(n.consume(c),i++,l):(n.exit("thematicBreakSequence"),qt(c)?Kt(n,a,"whitespace")(c):a(c))}}const Je={continuation:{tokenize:nE},exit:rE,name:"list",tokenize:eE},JM={partial:!0,tokenize:sE},tE={partial:!0,tokenize:iE};function eE(n,t,e){const i=this,r=i.events[i.events.length-1];let s=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,o=0;return a;function a(f){const _=i.containerState.type||(f===42||f===43||f===45?"listUnordered":"listOrdered");if(_==="listUnordered"?!i.containerState.marker||f===i.containerState.marker:kl(f)){if(i.containerState.type||(i.containerState.type=_,n.enter(_,{_container:!0})),_==="listUnordered")return n.enter("listItemPrefix"),f===42||f===45?n.check(go,e,c)(f):c(f);if(!i.interrupt||f===49)return n.enter("listItemPrefix"),n.enter("listItemValue"),l(f)}return e(f)}function l(f){return kl(f)&&++o<10?(n.consume(f),l):(!i.interrupt||o<2)&&(i.containerState.marker?f===i.containerState.marker:f===41||f===46)?(n.exit("listItemValue"),c(f)):e(f)}function c(f){return n.enter("listItemMarker"),n.consume(f),n.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||f,n.check(ys,i.interrupt?e:h,n.attempt(JM,d,u))}function h(f){return i.containerState.initialBlankLine=!0,s++,d(f)}function u(f){return qt(f)?(n.enter("listItemPrefixWhitespace"),n.consume(f),n.exit("listItemPrefixWhitespace"),d):e(f)}function d(f){return i.containerState.size=s+i.sliceSerialize(n.exit("listItemPrefix"),!0).length,t(f)}}function nE(n,t,e){const i=this;return i.containerState._closeFlow=void 0,n.check(ys,r,s);function r(a){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,Kt(n,t,"listItemIndent",i.containerState.size+1)(a)}function s(a){return i.containerState.furtherBlankLines||!qt(a)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,o(a)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,n.attempt(tE,t,o)(a))}function o(a){return i.containerState._closeFlow=!0,i.interrupt=void 0,Kt(n,n.attempt(Je,t,e),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function iE(n,t,e){const i=this;return Kt(n,r,"listItemIndent",i.containerState.size+1);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===i.containerState.size?t(s):e(s)}}function rE(n){n.exit(this.containerState.type)}function sE(n,t,e){const i=this;return Kt(n,r,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(s){const o=i.events[i.events.length-1];return!qt(s)&&o&&o[1].type==="listItemPrefixWhitespace"?t(s):e(s)}}const Eh={name:"setextUnderline",resolveTo:oE,tokenize:aE};function oE(n,t){let e=n.length,i,r,s;for(;e--;)if(n[e][0]==="enter"){if(n[e][1].type==="content"){i=e;break}n[e][1].type==="paragraph"&&(r=e)}else n[e][1].type==="content"&&n.splice(e,1),!s&&n[e][1].type==="definition"&&(s=e);const o={type:"setextHeading",start:{...n[i][1].start},end:{...n[n.length-1][1].end}};return n[r][1].type="setextHeadingText",s?(n.splice(r,0,["enter",o,t]),n.splice(s+1,0,["exit",n[i][1],t]),n[i][1].end={...n[s][1].end}):n[i][1]=o,n.push(["exit",o,t]),n}function aE(n,t,e){const i=this;let r;return s;function s(c){let h=i.events.length,u;for(;h--;)if(i.events[h][1].type!=="lineEnding"&&i.events[h][1].type!=="linePrefix"&&i.events[h][1].type!=="content"){u=i.events[h][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||u)?(n.enter("setextHeadingLine"),r=c,o(c)):e(c)}function o(c){return n.enter("setextHeadingLineSequence"),a(c)}function a(c){return c===r?(n.consume(c),a):(n.exit("setextHeadingLineSequence"),qt(c)?Kt(n,l,"lineSuffix")(c):l(c))}function l(c){return c===null||Dt(c)?(n.exit("setextHeadingLine"),t(c)):e(c)}}const lE={tokenize:cE};function cE(n){const t=this,e=n.attempt(ys,i,n.attempt(this.parser.constructs.flowInitial,r,Kt(n,n.attempt(this.parser.constructs.flow,r,n.attempt(pM,r)),"linePrefix")));return e;function i(s){if(s===null){n.consume(s);return}return n.enter("lineEndingBlank"),n.consume(s),n.exit("lineEndingBlank"),t.currentConstruct=void 0,e}function r(s){if(s===null){n.consume(s);return}return n.enter("lineEnding"),n.consume(s),n.exit("lineEnding"),t.currentConstruct=void 0,e}}const uE={resolveAll:cd()},hE=ld("string"),fE=ld("text");function ld(n){return{resolveAll:cd(n==="text"?dE:void 0),tokenize:t};function t(e){const i=this,r=this.parser.constructs[n],s=e.attempt(r,o,a);return o;function o(h){return c(h)?s(h):a(h)}function a(h){if(h===null){e.consume(h);return}return e.enter("data"),e.consume(h),l}function l(h){return c(h)?(e.exit("data"),s(h)):(e.consume(h),l)}function c(h){if(h===null)return!0;const u=r[h];let d=-1;if(u)for(;++d<u.length;){const f=u[d];if(!f.previous||f.previous.call(i,i.previous))return!0}return!1}}}function cd(n){return t;function t(e,i){let r=-1,s;for(;++r<=e.length;)s===void 0?e[r]&&e[r][1].type==="data"&&(s=r,r++):(!e[r]||e[r][1].type!=="data")&&(r!==s+2&&(e[s][1].end=e[r-1][1].end,e.splice(s+2,r-s-2),r=s+2),s=void 0);return n?n(e,i):e}}function dE(n,t){let e=0;for(;++e<=n.length;)if((e===n.length||n[e][1].type==="lineEnding")&&n[e-1][1].type==="data"){const i=n[e-1][1],r=t.sliceStream(i);let s=r.length,o=-1,a=0,l;for(;s--;){const c=r[s];if(typeof c=="string"){for(o=c.length;c.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(c===-2)l=!0,a++;else if(c!==-1){s++;break}}if(t._contentTypeTextTrailing&&e===n.length&&(a=0),a){const c={type:e===n.length||l||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?o:i.start._bufferIndex+o,_index:i.start._index+s,line:i.end.line,column:i.end.column-a,offset:i.end.offset-a},end:{...i.end}};i.end={...c.start},i.start.offset===i.end.offset?Object.assign(i,c):(n.splice(e,0,["enter",c,t],["exit",c,t]),e+=2)}e++}return n}const pE={42:Je,43:Je,45:Je,48:Je,49:Je,50:Je,51:Je,52:Je,53:Je,54:Je,55:Je,56:Je,57:Je,62:ed},mE={91:xM},_E={[-2]:Ia,[-1]:Ia,32:Ia},gE={35:TM,42:go,45:[Eh,go],60:RM,61:Eh,95:go,96:Sh,126:Sh},vE={38:id,92:nd},xE={[-5]:Oa,[-4]:Oa,[-3]:Oa,33:$M,38:id,42:zl,60:[ZS,NM],91:ZM,92:[EM,nd],93:pc,95:zl,96:lM},yE={null:[zl,uE]},SE={null:[42,95]},ME={null:[]},EE=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:SE,contentInitial:mE,disable:ME,document:pE,flow:gE,flowInitial:_E,insideSpan:yE,string:vE,text:xE},Symbol.toStringTag,{value:"Module"}));function bE(n,t,e){let i={_bufferIndex:-1,_index:0,line:e&&e.line||1,column:e&&e.column||1,offset:e&&e.offset||0};const r={},s=[];let o=[],a=[];const l={attempt:A(w),check:A(b),consume:v,enter:y,exit:S,interrupt:A(b,{interrupt:!0})},c={code:null,containerState:{},defineSkip:g,events:[],now:_,parser:n,previous:null,sliceSerialize:d,sliceStream:f,write:u};let h=t.tokenize.call(c,l);return t.resolveAll&&s.push(t),c;function u(R){return o=yn(o,R),m(),o[o.length-1]!==null?[]:(L(t,0),c.events=ko(s,c.events,c),c.events)}function d(R,D){return wE(f(R),D)}function f(R){return TE(o,R)}function _(){const{_bufferIndex:R,_index:D,line:N,column:X,offset:G}=i;return{_bufferIndex:R,_index:D,line:N,column:X,offset:G}}function g(R){r[R.line]=R.column,x()}function m(){let R;for(;i._index<o.length;){const D=o[i._index];if(typeof D=="string")for(R=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===R&&i._bufferIndex<D.length;)p(D.charCodeAt(i._bufferIndex));else p(D)}}function p(R){h=h(R)}function v(R){Dt(R)?(i.line++,i.column=1,i.offset+=R===-3?2:1,x()):R!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===o[i._index].length&&(i._bufferIndex=-1,i._index++)),c.previous=R}function y(R,D){const N=D||{};return N.type=R,N.start=_(),c.events.push(["enter",N,c]),a.push(N),N}function S(R){const D=a.pop();return D.end=_(),c.events.push(["exit",D,c]),D}function w(R,D){L(R,D.from)}function b(R,D){D.restore()}function A(R,D){return N;function N(X,G,Y){let Q,Z,at,P;return Array.isArray(X)?Ut(X):"tokenize"in X?Ut([X]):gt(X);function gt(ft){return ht;function ht(St){const Wt=St!==null&&ft[St],wt=St!==null&&ft.null,ce=[...Array.isArray(Wt)?Wt:Wt?[Wt]:[],...Array.isArray(wt)?wt:wt?[wt]:[]];return Ut(ce)(St)}}function Ut(ft){return Q=ft,Z=0,ft.length===0?Y:O(ft[Z])}function O(ft){return ht;function ht(St){return P=E(),at=ft,ft.partial||(c.currentConstruct=ft),ft.name&&c.parser.constructs.disable.null.includes(ft.name)?lt():ft.tokenize.call(D?Object.assign(Object.create(c),D):c,l,J,lt)(St)}}function J(ft){return R(at,P),G}function lt(ft){return P.restore(),++Z<Q.length?O(Q[Z]):Y}}}function L(R,D){R.resolveAll&&!s.includes(R)&&s.push(R),R.resolve&&hn(c.events,D,c.events.length-D,R.resolve(c.events.slice(D),c)),R.resolveTo&&(c.events=R.resolveTo(c.events,c))}function E(){const R=_(),D=c.previous,N=c.currentConstruct,X=c.events.length,G=Array.from(a);return{from:X,restore:Y};function Y(){i=R,c.previous=D,c.currentConstruct=N,c.events.length=X,a=G,x()}}function x(){i.line in r&&i.column<2&&(i.column=r[i.line],i.offset+=r[i.line]-1)}}function TE(n,t){const e=t.start._index,i=t.start._bufferIndex,r=t.end._index,s=t.end._bufferIndex;let o;if(e===r)o=[n[e].slice(i,s)];else{if(o=n.slice(e,r),i>-1){const a=o[0];typeof a=="string"?o[0]=a.slice(i):o.shift()}s>0&&o.push(n[r].slice(0,s))}return o}function wE(n,t){let e=-1;const i=[];let r;for(;++e<n.length;){const s=n[e];let o;if(typeof s=="string")o=s;else switch(s){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&r)continue;o=" ";break}default:o=String.fromCharCode(s)}r=s===-2,i.push(o)}return i.join("")}function AE(n){const i={constructs:Jf([EE,...(n||{}).extensions||[]]),content:r(VS),defined:[],document:r(WS),flow:r(lE),lazy:{},string:r(hE),text:r(fE)};return i;function r(s){return o;function o(a){return bE(i,s,a)}}}function CE(n){for(;!rd(n););return n}const bh=/[\0\t\n\r]/g;function RE(){let n=1,t="",e=!0,i;return r;function r(s,o,a){const l=[];let c,h,u,d,f;for(s=t+(typeof s=="string"?s.toString():new TextDecoder(o||void 0).decode(s)),u=0,t="",e&&(s.charCodeAt(0)===65279&&u++,e=void 0);u<s.length;){if(bh.lastIndex=u,c=bh.exec(s),d=c&&c.index!==void 0?c.index:s.length,f=s.charCodeAt(d),!c){t=s.slice(u);break}if(f===10&&u===d&&i)l.push(-3),i=void 0;else switch(i&&(l.push(-5),i=void 0),u<d&&(l.push(s.slice(u,d)),n+=d-u),f){case 0:{l.push(65533),n++;break}case 9:{for(h=Math.ceil(n/4)*4,l.push(-2);n++<h;)l.push(-1);break}case 10:{l.push(-4),n=1;break}default:i=!0,n=1}u=d+1}return a&&(i&&l.push(-5),t&&l.push(t),l.push(null)),l}}const PE=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function DE(n){return n.replace(PE,LE)}function LE(n,t,e){if(t)return t;if(e.charCodeAt(0)===35){const r=e.charCodeAt(1),s=r===120||r===88;return td(e.slice(s?2:1),s?16:10)}return dc(e)||n}function vo(n){return!n||typeof n!="object"?"":"position"in n||"type"in n?Th(n.position):"start"in n||"end"in n?Th(n):"line"in n||"column"in n?Bl(n):""}function Bl(n){return wh(n&&n.line)+":"+wh(n&&n.column)}function Th(n){return Bl(n&&n.start)+"-"+Bl(n&&n.end)}function wh(n){return n&&typeof n=="number"?n:1}const ud={}.hasOwnProperty;function UE(n,t,e){return typeof t!="string"&&(e=t,t=void 0),IE(e)(CE(AE(e).document().write(RE()(n,t,!0))))}function IE(n){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s($t),autolinkProtocol:E,autolinkEmail:E,atxHeading:s(De),blockQuote:s(wt),characterEscape:E,characterReference:E,codeFenced:s(ce),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:s(ce,o),codeText:s(_e,o),codeTextData:E,data:E,codeFlowValue:E,definition:s(Qt),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:s(F),hardBreakEscape:s(Zt),hardBreakTrailing:s(Zt),htmlFlow:s(re,o),htmlFlowData:E,htmlText:s(re,o),htmlTextData:E,image:s(Tt),label:o,link:s($t),listItem:s(kt),listItemValue:d,listOrdered:s(At,u),listUnordered:s(At),paragraph:s(Me),reference:O,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:s(De),strong:s(U),thematicBreak:s(q)},exit:{atxHeading:l(),atxHeadingSequence:w,autolink:l(),autolinkEmail:Wt,autolinkProtocol:St,blockQuote:l(),characterEscapeValue:x,characterReferenceMarkerHexadecimal:lt,characterReferenceMarkerNumeric:lt,characterReferenceValue:ft,characterReference:ht,codeFenced:l(m),codeFencedFence:g,codeFencedFenceInfo:f,codeFencedFenceMeta:_,codeFlowValue:x,codeIndented:l(p),codeText:l(G),codeTextData:x,data:x,definition:l(),definitionDestinationString:S,definitionLabelString:v,definitionTitleString:y,emphasis:l(),hardBreakEscape:l(D),hardBreakTrailing:l(D),htmlFlow:l(N),htmlFlowData:x,htmlText:l(X),htmlTextData:x,image:l(Q),label:at,labelText:Z,lineEnding:R,link:l(Y),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:J,resourceDestinationString:P,resourceTitleString:gt,resource:Ut,setextHeading:l(L),setextHeadingLineSequence:A,setextHeadingText:b,strong:l(),thematicBreak:l()}};hd(t,(n||{}).mdastExtensions||[]);const e={};return i;function i(I){let B={type:"root",children:[]};const W={stack:[B],tokenStack:[],config:t,enter:a,exit:c,buffer:o,resume:h,data:e},rt=[];let nt=-1;for(;++nt<I.length;)if(I[nt][1].type==="listOrdered"||I[nt][1].type==="listUnordered")if(I[nt][0]==="enter")rt.push(nt);else{const mt=rt.pop();nt=r(I,mt,nt)}for(nt=-1;++nt<I.length;){const mt=t[I[nt][0]];ud.call(mt,I[nt][1].type)&&mt[I[nt][1].type].call(Object.assign({sliceSerialize:I[nt][2].sliceSerialize},W),I[nt][1])}if(W.tokenStack.length>0){const mt=W.tokenStack[W.tokenStack.length-1];(mt[1]||Ah).call(W,void 0,mt[0])}for(B.position={start:xi(I.length>0?I[0][1].start:{line:1,column:1,offset:0}),end:xi(I.length>0?I[I.length-2][1].end:{line:1,column:1,offset:0})},nt=-1;++nt<t.transforms.length;)B=t.transforms[nt](B)||B;return B}function r(I,B,W){let rt=B-1,nt=-1,mt=!1,xt,tt,_t,Ct;for(;++rt<=W;){const yt=I[rt];switch(yt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{yt[0]==="enter"?nt++:nt--,Ct=void 0;break}case"lineEndingBlank":{yt[0]==="enter"&&(xt&&!Ct&&!nt&&!_t&&(_t=rt),Ct=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Ct=void 0}if(!nt&&yt[0]==="enter"&&yt[1].type==="listItemPrefix"||nt===-1&&yt[0]==="exit"&&(yt[1].type==="listUnordered"||yt[1].type==="listOrdered")){if(xt){let ct=rt;for(tt=void 0;ct--;){const Rt=I[ct];if(Rt[1].type==="lineEnding"||Rt[1].type==="lineEndingBlank"){if(Rt[0]==="exit")continue;tt&&(I[tt][1].type="lineEndingBlank",mt=!0),Rt[1].type="lineEnding",tt=ct}else if(!(Rt[1].type==="linePrefix"||Rt[1].type==="blockQuotePrefix"||Rt[1].type==="blockQuotePrefixWhitespace"||Rt[1].type==="blockQuoteMarker"||Rt[1].type==="listItemIndent"))break}_t&&(!tt||_t<tt)&&(xt._spread=!0),xt.end=Object.assign({},tt?I[tt][1].start:yt[1].end),I.splice(tt||rt,0,["exit",xt,yt[2]]),rt++,W++}if(yt[1].type==="listItemPrefix"){const ct={type:"listItem",_spread:!1,start:Object.assign({},yt[1].start),end:void 0};xt=ct,I.splice(rt,0,["enter",ct,yt[2]]),rt++,W++,_t=void 0,Ct=!0}}}return I[B][1]._spread=mt,W}function s(I,B){return W;function W(rt){a.call(this,I(rt),rt),B&&B.call(this,rt)}}function o(){this.stack.push({type:"fragment",children:[]})}function a(I,B,W){this.stack[this.stack.length-1].children.push(I),this.stack.push(I),this.tokenStack.push([B,W||void 0]),I.position={start:xi(B.start),end:void 0}}function l(I){return B;function B(W){I&&I.call(this,W),c.call(this,W)}}function c(I,B){const W=this.stack.pop(),rt=this.tokenStack.pop();if(rt)rt[0].type!==I.type&&(B?B.call(this,I,rt[0]):(rt[1]||Ah).call(this,I,rt[0]));else throw new Error("Cannot close `"+I.type+"` ("+vo({start:I.start,end:I.end})+"): it’s not open");W.position.end=xi(I.end)}function h(){return OS(this.stack.pop())}function u(){this.data.expectingFirstListItemValue=!0}function d(I){if(this.data.expectingFirstListItemValue){const B=this.stack[this.stack.length-2];B.start=Number.parseInt(this.sliceSerialize(I),10),this.data.expectingFirstListItemValue=void 0}}function f(){const I=this.resume(),B=this.stack[this.stack.length-1];B.lang=I}function _(){const I=this.resume(),B=this.stack[this.stack.length-1];B.meta=I}function g(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function m(){const I=this.resume(),B=this.stack[this.stack.length-1];B.value=I.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function p(){const I=this.resume(),B=this.stack[this.stack.length-1];B.value=I.replace(/(\r?\n|\r)$/g,"")}function v(I){const B=this.resume(),W=this.stack[this.stack.length-1];W.label=B,W.identifier=Nn(this.sliceSerialize(I)).toLowerCase()}function y(){const I=this.resume(),B=this.stack[this.stack.length-1];B.title=I}function S(){const I=this.resume(),B=this.stack[this.stack.length-1];B.url=I}function w(I){const B=this.stack[this.stack.length-1];if(!B.depth){const W=this.sliceSerialize(I).length;B.depth=W}}function b(){this.data.setextHeadingSlurpLineEnding=!0}function A(I){const B=this.stack[this.stack.length-1];B.depth=this.sliceSerialize(I).codePointAt(0)===61?1:2}function L(){this.data.setextHeadingSlurpLineEnding=void 0}function E(I){const W=this.stack[this.stack.length-1].children;let rt=W[W.length-1];(!rt||rt.type!=="text")&&(rt=T(),rt.position={start:xi(I.start),end:void 0},W.push(rt)),this.stack.push(rt)}function x(I){const B=this.stack.pop();B.value+=this.sliceSerialize(I),B.position.end=xi(I.end)}function R(I){const B=this.stack[this.stack.length-1];if(this.data.atHardBreak){const W=B.children[B.children.length-1];W.position.end=xi(I.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(B.type)&&(E.call(this,I),x.call(this,I))}function D(){this.data.atHardBreak=!0}function N(){const I=this.resume(),B=this.stack[this.stack.length-1];B.value=I}function X(){const I=this.resume(),B=this.stack[this.stack.length-1];B.value=I}function G(){const I=this.resume(),B=this.stack[this.stack.length-1];B.value=I}function Y(){const I=this.stack[this.stack.length-1];if(this.data.inReference){const B=this.data.referenceType||"shortcut";I.type+="Reference",I.referenceType=B,delete I.url,delete I.title}else delete I.identifier,delete I.label;this.data.referenceType=void 0}function Q(){const I=this.stack[this.stack.length-1];if(this.data.inReference){const B=this.data.referenceType||"shortcut";I.type+="Reference",I.referenceType=B,delete I.url,delete I.title}else delete I.identifier,delete I.label;this.data.referenceType=void 0}function Z(I){const B=this.sliceSerialize(I),W=this.stack[this.stack.length-2];W.label=DE(B),W.identifier=Nn(B).toLowerCase()}function at(){const I=this.stack[this.stack.length-1],B=this.resume(),W=this.stack[this.stack.length-1];if(this.data.inReference=!0,W.type==="link"){const rt=I.children;W.children=rt}else W.alt=B}function P(){const I=this.resume(),B=this.stack[this.stack.length-1];B.url=I}function gt(){const I=this.resume(),B=this.stack[this.stack.length-1];B.title=I}function Ut(){this.data.inReference=void 0}function O(){this.data.referenceType="collapsed"}function J(I){const B=this.resume(),W=this.stack[this.stack.length-1];W.label=B,W.identifier=Nn(this.sliceSerialize(I)).toLowerCase(),this.data.referenceType="full"}function lt(I){this.data.characterReferenceType=I.type}function ft(I){const B=this.sliceSerialize(I),W=this.data.characterReferenceType;let rt;W?(rt=td(B,W==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):rt=dc(B);const nt=this.stack[this.stack.length-1];nt.value+=rt}function ht(I){const B=this.stack.pop();B.position.end=xi(I.end)}function St(I){x.call(this,I);const B=this.stack[this.stack.length-1];B.url=this.sliceSerialize(I)}function Wt(I){x.call(this,I);const B=this.stack[this.stack.length-1];B.url="mailto:"+this.sliceSerialize(I)}function wt(){return{type:"blockquote",children:[]}}function ce(){return{type:"code",lang:null,meta:null,value:""}}function _e(){return{type:"inlineCode",value:""}}function Qt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function F(){return{type:"emphasis",children:[]}}function De(){return{type:"heading",depth:0,children:[]}}function Zt(){return{type:"break"}}function re(){return{type:"html",value:""}}function Tt(){return{type:"image",title:null,url:"",alt:null}}function $t(){return{type:"link",title:null,url:"",children:[]}}function At(I){return{type:"list",ordered:I.type==="listOrdered",start:null,spread:I._spread,children:[]}}function kt(I){return{type:"listItem",spread:I._spread,checked:null,children:[]}}function Me(){return{type:"paragraph",children:[]}}function U(){return{type:"strong",children:[]}}function T(){return{type:"text",value:""}}function q(){return{type:"thematicBreak"}}}function xi(n){return{line:n.line,column:n.column,offset:n.offset}}function hd(n,t){let e=-1;for(;++e<t.length;){const i=t[e];Array.isArray(i)?hd(n,i):OE(n,i)}}function OE(n,t){let e;for(e in t)if(ud.call(t,e))switch(e){case"canContainEols":{const i=t[e];i&&n[e].push(...i);break}case"transforms":{const i=t[e];i&&n[e].push(...i);break}case"enter":case"exit":{const i=t[e];i&&Object.assign(n[e],i);break}}}function Ah(n,t){throw n?new Error("Cannot close `"+n.type+"` ("+vo({start:n.start,end:n.end})+"): a different token (`"+t.type+"`, "+vo({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+vo({start:t.start,end:t.end})+") is still open")}function Ch(n,t){const e=String(n);if(typeof t!="string")throw new TypeError("Expected character");let i=0,r=e.indexOf(t);for(;r!==-1;)i++,r=e.indexOf(t,r+t.length);return i}function NE(n){if(typeof n!="string")throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}const mc=function(n){if(n==null)return BE;if(typeof n=="function")return zo(n);if(typeof n=="object")return Array.isArray(n)?FE(n):kE(n);if(typeof n=="string")return zE(n);throw new Error("Expected function, string, or object as test")};function FE(n){const t=[];let e=-1;for(;++e<n.length;)t[e]=mc(n[e]);return zo(i);function i(...r){let s=-1;for(;++s<t.length;)if(t[s].apply(this,r))return!0;return!1}}function kE(n){const t=n;return zo(e);function e(i){const r=i;let s;for(s in n)if(r[s]!==t[s])return!1;return!0}}function zE(n){return zo(t);function t(e){return e&&e.type===n}}function zo(n){return t;function t(e,i,r){return!!(HE(e)&&n.call(this,e,typeof i=="number"?i:void 0,r||void 0))}}function BE(){return!0}function HE(n){return n!==null&&typeof n=="object"&&"type"in n}const fd=[],VE=!0,Rh=!1,GE="skip";function WE(n,t,e,i){let r;r=t;const s=mc(r),o=1;a(n,void 0,[])();function a(l,c,h){const u=l&&typeof l=="object"?l:{};if(typeof u.type=="string"){const f=typeof u.tagName=="string"?u.tagName:typeof u.name=="string"?u.name:void 0;Object.defineProperty(d,"name",{value:"node ("+(l.type+(f?"<"+f+">":""))+")"})}return d;function d(){let f=fd,_,g,m;if(s(l,c,h[h.length-1]||void 0)&&(f=XE(e(l,h)),f[0]===Rh))return f;if("children"in l&&l.children){const p=l;if(p.children&&f[0]!==GE)for(g=-1+o,m=h.concat(p);g>-1&&g<p.children.length;){const v=p.children[g];if(_=a(v,g,m)(),_[0]===Rh)return _;g=typeof _[1]=="number"?_[1]:g+o}}return f}}}function XE(n){return Array.isArray(n)?n:typeof n=="number"?[VE,n]:n==null?fd:[n]}function qE(n,t,e){const r=mc((e||{}).ignore||[]),s=$E(t);let o=-1;for(;++o<s.length;)WE(n,"text",a);function a(c,h){let u=-1,d;for(;++u<h.length;){const f=h[u],_=d?d.children:void 0;if(r(f,_?_.indexOf(f):void 0,d))return;d=f}if(d)return l(c,h)}function l(c,h){const u=h[h.length-1],d=s[o][0],f=s[o][1];let _=0;const m=u.children.indexOf(c);let p=!1,v=[];d.lastIndex=0;let y=d.exec(c.value);for(;y;){const S=y.index,w={index:y.index,input:y.input,stack:[...h,c]};let b=f(...y,w);if(typeof b=="string"&&(b=b.length>0?{type:"text",value:b}:void 0),b===!1?d.lastIndex=S+1:(_!==S&&v.push({type:"text",value:c.value.slice(_,S)}),Array.isArray(b)?v.push(...b):b&&v.push(b),_=S+y[0].length,p=!0),!d.global)break;y=d.exec(c.value)}return p?(_<c.value.length&&v.push({type:"text",value:c.value.slice(_)}),u.children.splice(m,1,...v)):v=[c],m+v.length}}function $E(n){const t=[];if(!Array.isArray(n))throw new TypeError("Expected find and replace tuple or list of tuples");const e=!n[0]||Array.isArray(n[0])?n:[n];let i=-1;for(;++i<e.length;){const r=e[i];t.push([YE(r[0]),ZE(r[1])])}return t}function YE(n){return typeof n=="string"?new RegExp(NE(n),"g"):n}function ZE(n){return typeof n=="function"?n:function(){return n}}function jE(){return{transforms:[nb],enter:{literalAutolink:KE,literalAutolinkEmail:Na,literalAutolinkHttp:Na,literalAutolinkWww:Na},exit:{literalAutolink:eb,literalAutolinkEmail:tb,literalAutolinkHttp:QE,literalAutolinkWww:JE}}}function KE(n){this.enter({type:"link",title:null,url:"",children:[]},n)}function Na(n){this.config.enter.autolinkProtocol.call(this,n)}function QE(n){this.config.exit.autolinkProtocol.call(this,n)}function JE(n){this.config.exit.data.call(this,n);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(n)}function tb(n){this.config.exit.autolinkEmail.call(this,n)}function eb(n){this.exit(n)}function nb(n){qE(n,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,ib],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,rb]],{ignore:["link","linkReference"]})}function ib(n,t,e,i,r){let s="";if(!dd(r)||(/^w/i.test(t)&&(e=t+e,t="",s="http://"),!sb(e)))return!1;const o=ob(e+i);if(!o[0])return!1;const a={type:"link",title:null,url:s+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function rb(n,t,e,i){return!dd(i,!0)||/[-\d_]$/.test(e)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+e,children:[{type:"text",value:t+"@"+e}]}}function sb(n){const t=n.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function ob(n){const t=/[!"&'),.:;<>?\]}]+$/.exec(n);if(!t)return[n,void 0];n=n.slice(0,t.index);let e=t[0],i=e.indexOf(")");const r=Ch(n,"(");let s=Ch(n,")");for(;i!==-1&&r>s;)n+=e.slice(0,i+1),e=e.slice(i+1),i=e.indexOf(")"),s++;return[n,e]}function dd(n,t){const e=n.input.charCodeAt(n.index-1);return(n.index===0||nr(e)||Fo(e))&&(!t||e!==47)}function ab(){this.buffer()}function lb(n){this.enter({type:"footnoteReference",identifier:"",label:""},n)}function cb(){this.buffer()}function ub(n){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},n)}function hb(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Nn(this.sliceSerialize(n)).toLowerCase(),e.label=t}function fb(n){this.exit(n)}function db(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Nn(this.sliceSerialize(n)).toLowerCase(),e.label=t}function pb(n){this.exit(n)}function mb(){return{enter:{gfmFootnoteCallString:ab,gfmFootnoteCall:lb,gfmFootnoteDefinitionLabelString:cb,gfmFootnoteDefinition:ub},exit:{gfmFootnoteCallString:hb,gfmFootnoteCall:fb,gfmFootnoteDefinitionLabelString:db,gfmFootnoteDefinition:pb}}}function _b(){return{canContainEols:["delete"],enter:{strikethrough:gb},exit:{strikethrough:vb}}}function gb(n){this.enter({type:"delete",children:[]},n)}function vb(n){this.exit(n)}function xb(){return{enter:{table:yb,tableData:Ph,tableHeader:Ph,tableRow:Mb},exit:{codeText:Eb,table:Sb,tableData:Fa,tableHeader:Fa,tableRow:Fa}}}function yb(n){const t=n._align;this.enter({type:"table",align:t.map(function(e){return e==="none"?null:e}),children:[]},n),this.data.inTable=!0}function Sb(n){this.exit(n),this.data.inTable=void 0}function Mb(n){this.enter({type:"tableRow",children:[]},n)}function Fa(n){this.exit(n)}function Ph(n){this.enter({type:"tableCell",children:[]},n)}function Eb(n){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,bb));const e=this.stack[this.stack.length-1];e.type,e.value=t,this.exit(n)}function bb(n,t){return t==="|"?t:n}function Tb(){return{exit:{taskListCheckValueChecked:Dh,taskListCheckValueUnchecked:Dh,paragraph:wb}}}function Dh(n){const t=this.stack[this.stack.length-2];t.type,t.checked=n.type==="taskListCheckValueChecked"}function wb(n){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const e=this.stack[this.stack.length-1];e.type;const i=e.children[0];if(i&&i.type==="text"){const r=t.children;let s=-1,o;for(;++s<r.length;){const a=r[s];if(a.type==="paragraph"){o=a;break}}o===e&&(i.value=i.value.slice(1),i.value.length===0?e.children.shift():e.position&&i.position&&typeof i.position.start.offset=="number"&&(i.position.start.column++,i.position.start.offset++,e.position.start=Object.assign({},i.position.start)))}}this.exit(n)}function Ab(){return[jE(),mb(),_b(),xb(),Tb()]}const Cb={tokenize:Ib,partial:!0},pd={tokenize:Ob,partial:!0},md={tokenize:Nb,partial:!0},_d={tokenize:Fb,partial:!0},Rb={tokenize:kb,partial:!0},gd={name:"wwwAutolink",tokenize:Lb,previous:xd},vd={name:"protocolAutolink",tokenize:Ub,previous:yd},fi={name:"emailAutolink",tokenize:Db,previous:Sd},Wn={};function Pb(){return{text:Wn}}let Bi=48;for(;Bi<123;)Wn[Bi]=fi,Bi++,Bi===58?Bi=65:Bi===91&&(Bi=97);Wn[43]=fi;Wn[45]=fi;Wn[46]=fi;Wn[95]=fi;Wn[72]=[fi,vd];Wn[104]=[fi,vd];Wn[87]=[fi,gd];Wn[119]=[fi,gd];function Db(n,t,e){const i=this;let r,s;return o;function o(u){return!Hl(u)||!Sd.call(i,i.previous)||_c(i.events)?e(u):(n.enter("literalAutolink"),n.enter("literalAutolinkEmail"),a(u))}function a(u){return Hl(u)?(n.consume(u),a):u===64?(n.consume(u),l):e(u)}function l(u){return u===46?n.check(Rb,h,c)(u):u===45||u===95||nn(u)?(s=!0,n.consume(u),l):h(u)}function c(u){return n.consume(u),r=!0,l}function h(u){return s&&r&&qe(i.previous)?(n.exit("literalAutolinkEmail"),n.exit("literalAutolink"),t(u)):e(u)}}function Lb(n,t,e){const i=this;return r;function r(o){return o!==87&&o!==119||!xd.call(i,i.previous)||_c(i.events)?e(o):(n.enter("literalAutolink"),n.enter("literalAutolinkWww"),n.check(Cb,n.attempt(pd,n.attempt(md,s),e),e)(o))}function s(o){return n.exit("literalAutolinkWww"),n.exit("literalAutolink"),t(o)}}function Ub(n,t,e){const i=this;let r="",s=!1;return o;function o(u){return(u===72||u===104)&&yd.call(i,i.previous)&&!_c(i.events)?(n.enter("literalAutolink"),n.enter("literalAutolinkHttp"),r+=String.fromCodePoint(u),n.consume(u),a):e(u)}function a(u){if(qe(u)&&r.length<5)return r+=String.fromCodePoint(u),n.consume(u),a;if(u===58){const d=r.toLowerCase();if(d==="http"||d==="https")return n.consume(u),l}return e(u)}function l(u){return u===47?(n.consume(u),s?c:(s=!0,l)):e(u)}function c(u){return u===null||wo(u)||de(u)||nr(u)||Fo(u)?e(u):n.attempt(pd,n.attempt(md,h),e)(u)}function h(u){return n.exit("literalAutolinkHttp"),n.exit("literalAutolink"),t(u)}}function Ib(n,t,e){let i=0;return r;function r(o){return(o===87||o===119)&&i<3?(i++,n.consume(o),r):o===46&&i===3?(n.consume(o),s):e(o)}function s(o){return o===null?e(o):t(o)}}function Ob(n,t,e){let i,r,s;return o;function o(c){return c===46||c===95?n.check(_d,l,a)(c):c===null||de(c)||nr(c)||c!==45&&Fo(c)?l(c):(s=!0,n.consume(c),o)}function a(c){return c===95?i=!0:(r=i,i=void 0),n.consume(c),o}function l(c){return r||i||!s?e(c):t(c)}}function Nb(n,t){let e=0,i=0;return r;function r(o){return o===40?(e++,n.consume(o),r):o===41&&i<e?s(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?n.check(_d,t,s)(o):o===null||de(o)||nr(o)?t(o):(n.consume(o),r)}function s(o){return o===41&&i++,n.consume(o),r}}function Fb(n,t,e){return i;function i(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(n.consume(a),i):a===38?(n.consume(a),s):a===93?(n.consume(a),r):a===60||a===null||de(a)||nr(a)?t(a):e(a)}function r(a){return a===null||a===40||a===91||de(a)||nr(a)?t(a):i(a)}function s(a){return qe(a)?o(a):e(a)}function o(a){return a===59?(n.consume(a),i):qe(a)?(n.consume(a),o):e(a)}}function kb(n,t,e){return i;function i(s){return n.consume(s),r}function r(s){return nn(s)?e(s):t(s)}}function xd(n){return n===null||n===40||n===42||n===95||n===91||n===93||n===126||de(n)}function yd(n){return!qe(n)}function Sd(n){return!(n===47||Hl(n))}function Hl(n){return n===43||n===45||n===46||n===95||nn(n)}function _c(n){let t=n.length,e=!1;for(;t--;){const i=n[t][1];if((i.type==="labelLink"||i.type==="labelImage")&&!i._balanced){e=!0;break}if(i._gfmAutolinkLiteralWalkedInto){e=!1;break}}return n.length>0&&!e&&(n[n.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),e}const zb={tokenize:$b,partial:!0};function Bb(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:Wb,continuation:{tokenize:Xb},exit:qb}},text:{91:{name:"gfmFootnoteCall",tokenize:Gb},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:Hb,resolveTo:Vb}}}}function Hb(n,t,e){const i=this;let r=i.events.length;const s=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let o;for(;r--;){const l=i.events[r][1];if(l.type==="labelImage"){o=l;break}if(l.type==="gfmFootnoteCall"||l.type==="labelLink"||l.type==="label"||l.type==="image"||l.type==="link")break}return a;function a(l){if(!o||!o._balanced)return e(l);const c=Nn(i.sliceSerialize({start:o.end,end:i.now()}));return c.codePointAt(0)!==94||!s.includes(c.slice(1))?e(l):(n.enter("gfmFootnoteCallLabelMarker"),n.consume(l),n.exit("gfmFootnoteCallLabelMarker"),t(l))}}function Vb(n,t){let e=n.length;for(;e--;)if(n[e][1].type==="labelImage"&&n[e][0]==="enter"){n[e][1];break}n[e+1][1].type="data",n[e+3][1].type="gfmFootnoteCallLabelMarker";const i={type:"gfmFootnoteCall",start:Object.assign({},n[e+3][1].start),end:Object.assign({},n[n.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},n[e+3][1].end),end:Object.assign({},n[e+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},n[n.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},a=[n[e+1],n[e+2],["enter",i,t],n[e+3],n[e+4],["enter",r,t],["exit",r,t],["enter",s,t],["enter",o,t],["exit",o,t],["exit",s,t],n[n.length-2],n[n.length-1],["exit",i,t]];return n.splice(e,n.length-e+1,...a),n}function Gb(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s=0,o;return a;function a(u){return n.enter("gfmFootnoteCall"),n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),l}function l(u){return u!==94?e(u):(n.enter("gfmFootnoteCallMarker"),n.consume(u),n.exit("gfmFootnoteCallMarker"),n.enter("gfmFootnoteCallString"),n.enter("chunkString").contentType="string",c)}function c(u){if(s>999||u===93&&!o||u===null||u===91||de(u))return e(u);if(u===93){n.exit("chunkString");const d=n.exit("gfmFootnoteCallString");return r.includes(Nn(i.sliceSerialize(d)))?(n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),n.exit("gfmFootnoteCall"),t):e(u)}return de(u)||(o=!0),s++,n.consume(u),u===92?h:c}function h(u){return u===91||u===92||u===93?(n.consume(u),s++,c):c(u)}}function Wb(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s,o=0,a;return l;function l(_){return n.enter("gfmFootnoteDefinition")._container=!0,n.enter("gfmFootnoteDefinitionLabel"),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(_),n.exit("gfmFootnoteDefinitionLabelMarker"),c}function c(_){return _===94?(n.enter("gfmFootnoteDefinitionMarker"),n.consume(_),n.exit("gfmFootnoteDefinitionMarker"),n.enter("gfmFootnoteDefinitionLabelString"),n.enter("chunkString").contentType="string",h):e(_)}function h(_){if(o>999||_===93&&!a||_===null||_===91||de(_))return e(_);if(_===93){n.exit("chunkString");const g=n.exit("gfmFootnoteDefinitionLabelString");return s=Nn(i.sliceSerialize(g)),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(_),n.exit("gfmFootnoteDefinitionLabelMarker"),n.exit("gfmFootnoteDefinitionLabel"),d}return de(_)||(a=!0),o++,n.consume(_),_===92?u:h}function u(_){return _===91||_===92||_===93?(n.consume(_),o++,h):h(_)}function d(_){return _===58?(n.enter("definitionMarker"),n.consume(_),n.exit("definitionMarker"),r.includes(s)||r.push(s),Kt(n,f,"gfmFootnoteDefinitionWhitespace")):e(_)}function f(_){return t(_)}}function Xb(n,t,e){return n.check(ys,t,n.attempt(zb,t,e))}function qb(n){n.exit("gfmFootnoteDefinition")}function $b(n,t,e){const i=this;return Kt(n,r,"gfmFootnoteDefinitionIndent",5);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(s):e(s)}}function Yb(n){let e={}.singleTilde;const i={name:"strikethrough",tokenize:s,resolveAll:r};return e==null&&(e=!0),{text:{126:i},insideSpan:{null:[i]},attentionMarkers:{null:[126]}};function r(o,a){let l=-1;for(;++l<o.length;)if(o[l][0]==="enter"&&o[l][1].type==="strikethroughSequenceTemporary"&&o[l][1]._close){let c=l;for(;c--;)if(o[c][0]==="exit"&&o[c][1].type==="strikethroughSequenceTemporary"&&o[c][1]._open&&o[l][1].end.offset-o[l][1].start.offset===o[c][1].end.offset-o[c][1].start.offset){o[l][1].type="strikethroughSequence",o[c][1].type="strikethroughSequence";const h={type:"strikethrough",start:Object.assign({},o[c][1].start),end:Object.assign({},o[l][1].end)},u={type:"strikethroughText",start:Object.assign({},o[c][1].end),end:Object.assign({},o[l][1].start)},d=[["enter",h,a],["enter",o[c][1],a],["exit",o[c][1],a],["enter",u,a]],f=a.parser.constructs.insideSpan.null;f&&hn(d,d.length,0,ko(f,o.slice(c+1,l),a)),hn(d,d.length,0,[["exit",u,a],["enter",o[l][1],a],["exit",o[l][1],a],["exit",h,a]]),hn(o,c-1,l-c+3,d),l=c+d.length-2;break}}for(l=-1;++l<o.length;)o[l][1].type==="strikethroughSequenceTemporary"&&(o[l][1].type="data");return o}function s(o,a,l){const c=this.previous,h=this.events;let u=0;return d;function d(_){return c===126&&h[h.length-1][1].type!=="characterEscape"?l(_):(o.enter("strikethroughSequenceTemporary"),f(_))}function f(_){const g=Ao(c);if(_===126)return u>1?l(_):(o.consume(_),u++,f);if(u<2&&!e)return l(_);const m=o.exit("strikethroughSequenceTemporary"),p=Ao(_);return m._open=!p||p===2&&!!g,m._close=!g||g===2&&!!p,a(_)}}}class Zb{constructor(){this.map=[]}add(t,e,i){jb(this,t,e,i)}consume(t){if(this.map.sort(function(s,o){return s[0]-o[0]}),this.map.length===0)return;let e=this.map.length;const i=[];for(;e>0;)e-=1,i.push(t.slice(this.map[e][0]+this.map[e][1]),this.map[e][2]),t.length=this.map[e][0];i.push(t.slice()),t.length=0;let r=i.pop();for(;r;){for(const s of r)t.push(s);r=i.pop()}this.map.length=0}}function jb(n,t,e,i){let r=0;if(!(e===0&&i.length===0)){for(;r<n.map.length;){if(n.map[r][0]===t){n.map[r][1]+=e,n.map[r][2].push(...i);return}r+=1}n.map.push([t,e,i])}}function Kb(n,t){let e=!1;const i=[];for(;t<n.length;){const r=n[t];if(e){if(r[0]==="enter")r[1].type==="tableContent"&&i.push(n[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(n[t-1][1].type==="tableDelimiterMarker"){const s=i.length-1;i[s]=i[s]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(e=!0);t+=1}return i}function Qb(){return{flow:{null:{name:"table",tokenize:Jb,resolveAll:tT}}}}function Jb(n,t,e){const i=this;let r=0,s=0,o;return a;function a(x){let R=i.events.length-1;for(;R>-1;){const X=i.events[R][1].type;if(X==="lineEnding"||X==="linePrefix")R--;else break}const D=R>-1?i.events[R][1].type:null,N=D==="tableHead"||D==="tableRow"?b:l;return N===b&&i.parser.lazy[i.now().line]?e(x):N(x)}function l(x){return n.enter("tableHead"),n.enter("tableRow"),c(x)}function c(x){return x===124||(o=!0,s+=1),h(x)}function h(x){return x===null?e(x):Dt(x)?s>1?(s=0,i.interrupt=!0,n.exit("tableRow"),n.enter("lineEnding"),n.consume(x),n.exit("lineEnding"),f):e(x):qt(x)?Kt(n,h,"whitespace")(x):(s+=1,o&&(o=!1,r+=1),x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),o=!0,h):(n.enter("data"),u(x)))}function u(x){return x===null||x===124||de(x)?(n.exit("data"),h(x)):(n.consume(x),x===92?d:u)}function d(x){return x===92||x===124?(n.consume(x),u):u(x)}function f(x){return i.interrupt=!1,i.parser.lazy[i.now().line]?e(x):(n.enter("tableDelimiterRow"),o=!1,qt(x)?Kt(n,_,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):_(x))}function _(x){return x===45||x===58?m(x):x===124?(o=!0,n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),g):w(x)}function g(x){return qt(x)?Kt(n,m,"whitespace")(x):m(x)}function m(x){return x===58?(s+=1,o=!0,n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),p):x===45?(s+=1,p(x)):x===null||Dt(x)?S(x):w(x)}function p(x){return x===45?(n.enter("tableDelimiterFiller"),v(x)):w(x)}function v(x){return x===45?(n.consume(x),v):x===58?(o=!0,n.exit("tableDelimiterFiller"),n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),y):(n.exit("tableDelimiterFiller"),y(x))}function y(x){return qt(x)?Kt(n,S,"whitespace")(x):S(x)}function S(x){return x===124?_(x):x===null||Dt(x)?!o||r!==s?w(x):(n.exit("tableDelimiterRow"),n.exit("tableHead"),t(x)):w(x)}function w(x){return e(x)}function b(x){return n.enter("tableRow"),A(x)}function A(x){return x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),A):x===null||Dt(x)?(n.exit("tableRow"),t(x)):qt(x)?Kt(n,A,"whitespace")(x):(n.enter("data"),L(x))}function L(x){return x===null||x===124||de(x)?(n.exit("data"),A(x)):(n.consume(x),x===92?E:L)}function E(x){return x===92||x===124?(n.consume(x),L):L(x)}}function tT(n,t){let e=-1,i=!0,r=0,s=[0,0,0,0],o=[0,0,0,0],a=!1,l=0,c,h,u;const d=new Zb;for(;++e<n.length;){const f=n[e],_=f[1];f[0]==="enter"?_.type==="tableHead"?(a=!1,l!==0&&(Lh(d,t,l,c,h),h=void 0,l=0),c={type:"table",start:Object.assign({},_.start),end:Object.assign({},_.end)},d.add(e,0,[["enter",c,t]])):_.type==="tableRow"||_.type==="tableDelimiterRow"?(i=!0,u=void 0,s=[0,0,0,0],o=[0,e+1,0,0],a&&(a=!1,h={type:"tableBody",start:Object.assign({},_.start),end:Object.assign({},_.end)},d.add(e,0,[["enter",h,t]])),r=_.type==="tableDelimiterRow"?2:h?3:1):r&&(_.type==="data"||_.type==="tableDelimiterMarker"||_.type==="tableDelimiterFiller")?(i=!1,o[2]===0&&(s[1]!==0&&(o[0]=o[1],u=ro(d,t,s,r,void 0,u),s=[0,0,0,0]),o[2]=e)):_.type==="tableCellDivider"&&(i?i=!1:(s[1]!==0&&(o[0]=o[1],u=ro(d,t,s,r,void 0,u)),s=o,o=[s[1],e,0,0])):_.type==="tableHead"?(a=!0,l=e):_.type==="tableRow"||_.type==="tableDelimiterRow"?(l=e,s[1]!==0?(o[0]=o[1],u=ro(d,t,s,r,e,u)):o[1]!==0&&(u=ro(d,t,o,r,e,u)),r=0):r&&(_.type==="data"||_.type==="tableDelimiterMarker"||_.type==="tableDelimiterFiller")&&(o[3]=e)}for(l!==0&&Lh(d,t,l,c,h),d.consume(t.events),e=-1;++e<t.events.length;){const f=t.events[e];f[0]==="enter"&&f[1].type==="table"&&(f[1]._align=Kb(t.events,e))}return n}function ro(n,t,e,i,r,s){const o=i===1?"tableHeader":i===2?"tableDelimiter":"tableData",a="tableContent";e[0]!==0&&(s.end=Object.assign({},br(t.events,e[0])),n.add(e[0],0,[["exit",s,t]]));const l=br(t.events,e[1]);if(s={type:o,start:Object.assign({},l),end:Object.assign({},l)},n.add(e[1],0,[["enter",s,t]]),e[2]!==0){const c=br(t.events,e[2]),h=br(t.events,e[3]),u={type:a,start:Object.assign({},c),end:Object.assign({},h)};if(n.add(e[2],0,[["enter",u,t]]),i!==2){const d=t.events[e[2]],f=t.events[e[3]];if(d[1].end=Object.assign({},f[1].end),d[1].type="chunkText",d[1].contentType="text",e[3]>e[2]+1){const _=e[2]+1,g=e[3]-e[2]-1;n.add(_,g,[])}}n.add(e[3]+1,0,[["exit",u,t]])}return r!==void 0&&(s.end=Object.assign({},br(t.events,r)),n.add(r,0,[["exit",s,t]]),s=void 0),s}function Lh(n,t,e,i,r){const s=[],o=br(t.events,e);r&&(r.end=Object.assign({},o),s.push(["exit",r,t])),i.end=Object.assign({},o),s.push(["exit",i,t]),n.add(e+1,0,s)}function br(n,t){const e=n[t],i=e[0]==="enter"?"start":"end";return e[1][i]}const eT={name:"tasklistCheck",tokenize:iT};function nT(){return{text:{91:eT}}}function iT(n,t,e){const i=this;return r;function r(l){return i.previous!==null||!i._gfmTasklistFirstContentOfListItem?e(l):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),s)}function s(l){return de(l)?(n.enter("taskListCheckValueUnchecked"),n.consume(l),n.exit("taskListCheckValueUnchecked"),o):l===88||l===120?(n.enter("taskListCheckValueChecked"),n.consume(l),n.exit("taskListCheckValueChecked"),o):e(l)}function o(l){return l===93?(n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),a):e(l)}function a(l){return Dt(l)?t(l):qt(l)?n.check({tokenize:rT},t,e)(l):e(l)}}function rT(n,t,e){return Kt(n,i,"whitespace");function i(r){return r===null?e(r):t(r)}}function sT(n){return Jf([Pb(),Bb(),Yb(),Qb(),nT()])}function oT({text:n,links:t,onOpen:e}){return Mn(()=>aT(n,t,e),[n,t,e])}function aT(n,t,e){const i=UE(cT(n),{extensions:[sT()],mdastExtensions:[Ab()]}),r=Md(t,e),s=i.children.filter(o=>o.type==="footnoteDefinition");return M("div",{class:"md",children:[Co(i.children,r),s.length>0&&M("section",{class:"md-footnotes",children:[M("hr",{}),M("ol",{children:s.map(o=>M("li",{id:`fn-${o.identifier}`,children:Co(o.children,r)},o.identifier))})]})]})}function Md(n,t){const e=new Map(Object.entries(n).map(([i,r])=>[i.toLowerCase(),r]));return{resolve:i=>n[i]??e.get(i.toLowerCase()),onOpen:t}}const lT=/(!?)\[\[([^[\]\n]+?)\]\]/g;function Uh(n,t){const e=[];let i=0;for(const r of n.matchAll(lT)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),e.push(bd(r[2],r[1]==="!",t,s)),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function cT(n){return n.split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/m).map((t,e)=>e%2?t:t.replace(/%%[\s\S]*?%%/g,"")).join("")}const uT=/^\[!([A-Za-z-]+)\]([+-]?)[ \t]*(.*)$/,hT={note:"note",info:"info",todo:"info",abstract:"abstract",summary:"abstract",tldr:"abstract",tip:"tip",hint:"tip",important:"tip",success:"success",check:"success",done:"success",question:"question",help:"question",faq:"question",warning:"warning",caution:"warning",attention:"warning",failure:"danger",fail:"danger",missing:"danger",danger:"danger",error:"danger",bug:"danger",example:"example",quote:"quote",cite:"quote"};function Co(n,t){return n.map((e,i)=>Ed(e,t,i))}function Ed(n,t,e){switch(n.type){case"paragraph":return M("p",{children:Rn(n.children,t)},e);case"heading":return fT(n,t,e);case"thematicBreak":return M("hr",{},e);case"blockquote":return mT(n.children,t,e)??M("blockquote",{children:Co(n.children,t)},e);case"list":return dT(n,t,e);case"code":return M("pre",{class:"md-code","data-lang":n.lang??void 0,children:M("code",{children:n.value})},e);case"table":return pT(n,t,e);case"html":return Td(n.value)?null:M("pre",{class:"md-raw",children:n.value},e);case"definition":case"footnoteDefinition":case"yaml":return null;default:return null}}function fT(n,t,e){const i=`h${n.depth}`;return M(i,{children:Rn(n.children,t)},e)}function dT(n,t,e){const i=n.children.map((r,s)=>M("li",{class:r.checked!=null?`task${r.checked?" done":""}`:void 0,children:[r.checked!=null&&M("input",{type:"checkbox",checked:r.checked,disabled:!0}),r.children.map((o,a)=>o.type==="paragraph"&&!n.spread?M("span",{children:Rn(o.children,t)},a):Ed(o,t,a))]},s));return n.ordered?M("ol",{start:n.start??void 0,children:i},e):M("ul",{children:i},e)}function pT(n,t,e){const[i,...r]=n.children,s=o=>n.align?.[o]?{textAlign:n.align[o]}:void 0;return M("div",{class:"md-table",children:M("table",{children:[i&&M("thead",{children:M("tr",{children:i.children.map((o,a)=>M("th",{style:s(a),children:Rn(o.children,t)},a))})}),M("tbody",{children:r.map((o,a)=>M("tr",{children:o.children.map((l,c)=>M("td",{style:s(c),children:Rn(l.children,t)},c))},a))})]})},e)}function mT(n,t,e){const i=n[0];if(i?.type!=="paragraph"||i.children[0]?.type!=="text")return null;const r=i.children[0].value,s=r.indexOf(`
`),o=uT.exec(s<0?r:r.slice(0,s));if(!o)return null;const a=o[1].toLowerCase(),l=hT[a]??"note",c=o[3]||a.charAt(0).toUpperCase()+a.slice(1),h={...i,children:s<0?i.children.slice(1):[{type:"text",value:r.slice(s+1)},...i.children.slice(1)]},u=[...h.children.length?[h]:[],...n.slice(1)],d=u.length>0&&M("div",{class:"md-callout-body",children:Co(u,t)}),f=M("div",{class:"md-callout-title",children:c});return o[2]?M("details",{class:`md-callout ${l}`,open:o[2]==="+",children:[M("summary",{children:f}),d]},e):M("div",{class:`md-callout ${l}`,children:[f,d]},e)}function Rn(n,t){return n.map((e,i)=>_T(e,t,i))}function _T(n,t,e){switch(n.type){case"text":return M("span",{children:vT(n.value,t)},e);case"emphasis":return M("em",{children:Rn(n.children,t)},e);case"strong":return M("strong",{children:Rn(n.children,t)},e);case"delete":return M("del",{children:Rn(n.children,t)},e);case"inlineCode":return M("code",{children:n.value},e);case"break":return M("br",{},e);case"link":return ST(n.url)?M("a",{class:"md-external",href:n.url,target:"_blank",rel:"noopener noreferrer",children:Rn(n.children,t)},e):M("span",{children:Rn(n.children,t)},e);case"image":return M("span",{class:"md-image",children:n.alt||"image"},e);case"footnoteReference":return M("sup",{class:"md-fnref",children:["[",n.label??n.identifier,"]"]},e);case"html":return Td(n.value)?null:M("span",{class:"md-raw",children:n.value},e);case"linkReference":case"imageReference":return M("span",{children:"children"in n?Rn(n.children,t):n.alt},e);default:return null}}const gT=/(!?)\[\[([^[\]\n]+?)\]\]|==([^=\n]+?)==|(^|[\s(])#([\p{L}_][\p{L}\p{N}_/-]*)/gu;function vT(n,t){const e=[];let i=0;for(const r of n.matchAll(gT)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),r[2]!==void 0?e.push(bd(r[2],r[1]==="!",t,s)):r[3]!==void 0?e.push(M("mark",{children:r[3]},s)):(e.push(r[4]),e.push(M("span",{class:"md-tag",children:["#",r[5]]},s))),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function bd(n,t,e,i){const[r,s]=xT(n,"|"),[o,a]=yT(r,/[#^]/),l=e.resolve(o.trim()),c=s?.trim()||(l?l.title+(a?` › ${a.replace(/^[#^]/,"")}`:""):r.trim()),h=`md-internal${l?"":" unresolved"}${t?" embed":""}`;return l?M("a",{class:h,href:"#",onClick:u=>{u.preventDefault(),e.onOpen(l)},children:[t&&M("span",{class:"md-embed-mark",children:"↪ "}),c]},i):M("span",{class:h,title:"Not found, or not visible to this profile",children:c},i)}function xT(n,t){const e=n.indexOf(t);return e<0?[n,void 0]:[n.slice(0,e),n.slice(e+1)]}function yT(n,t){const e=t.exec(n);return e?[n.slice(0,e.index),n.slice(e.index)]:[n,void 0]}function ST(n){return/^(https?:|mailto:)/i.test(n.trim())}function Td(n){return/^\s*<!--[\s\S]*-->\s*$/.test(n)}function MT({c:n}){const t=Xt(n.store,a=>a.previewOpen),e=Xt(n.store,a=>a.focus),i=Xt(n.store,a=>a.note),r=uS(a=>n.openNote(a.id,a.topic),[n]);if(!t||!e.note)return null;const s=i&&i.id===e.note?i:null,o=n.world.topics.find(a=>a.slug===(s?.topic??e.topic));return M("aside",{class:"panel preview",role:"dialog","aria-label":"Note preview",children:[M("header",{class:"preview-head",children:[M("div",{class:"insp-kicker",children:[M(Ce,{color:o?.color??"#9cc3ff",size:7})," ",o?.title??"Note"]}),M("div",{class:"preview-actions",children:[s?.abs_path&&M("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(s.abs_path)}`,children:M(Ae,{name:"open"})}),M("button",{class:"icon-btn",title:"Close (Esc)","aria-label":"Close preview",onClick:()=>n.store.set({previewOpen:!1}),children:M(Ae,{name:"close"})})]})]}),M("div",{class:"preview-body",children:s?M(en,{children:[!/^\s*#\s+\S/.test(s.markdown??"")&&M("h1",{class:"md-inline-title",children:s.title}),s.properties&&M(wT,{props:s.properties,links:s.links??{},onOpen:r}),s.markdown!=null?M(oT,{text:s.markdown,links:s.links??{},onOpen:r}):M("div",{class:"empty",children:["Exported maps do not include note text. Run ",M("code",{children:"brain viz"})," to read notes."]})]}):M("div",{class:"empty",children:"Loading…"})})]})}const ET=new Set(["title"]),bT=new Set(["bw-claims","bw-claims-superseded"]),TT=/\s*\{([^{}]*)\}\s*$/;function wT({props:n,links:t,onOpen:e}){const i=Mn(()=>Md(t,e),[t,e]),r=Object.entries(n).filter(([s,o])=>!ET.has(s)&&o!==null&&o!=="");return r.length?M("details",{class:"md-props",open:!0,children:[M("summary",{children:"Properties"}),M("dl",{children:r.map(([s,o])=>M("div",{class:"md-prop",children:[M("dt",{children:s}),M("dd",{children:AT(s,o,i)})]},s))})]}):null}function AT(n,t,e){if(Array.isArray(t))return t.map((r,s)=>M("span",{class:n==="tags"?"md-tag":"md-chip",children:n==="tags"?`#${String(r)}`:Ih(n,String(r),e)},s));if(typeof t=="boolean")return M("input",{type:"checkbox",checked:t,disabled:!0});const i=typeof t=="object"?JSON.stringify(t):String(t);return/^https?:\/\//i.test(i)?M("a",{class:"md-external",href:i,target:"_blank",rel:"noopener noreferrer",children:i.replace(/^https?:\/\//,"")}):Ih(n,i,e)}function Ih(n,t,e){const i=bT.has(n)?TT.exec(t):null;if(!i)return Uh(t,e);const r=Uh(t.slice(0,i.index),e);return M("span",{title:i[1],children:n==="bw-claims-superseded"?M("s",{children:r}):r})}const wd={part_of:"Folders",depends_on:"Depends on",conflicts_with:"Conflicts",supersedes:"Replaces",related_to:"Related",links_to:"Wikilinks"},CT={part_of:"Folders: each note to its folder's note, and each folder to the one above it",depends_on:"Depends on: pulses run from the prerequisite to what depends on it",conflicts_with:"Conflicts: two notes contradict each other",supersedes:"Replaces: pulses run from the old note to the one that replaced it",related_to:"Related: a loose association, no direction",links_to:"Wikilinks: links written inside note text"};function RT(){return M("svg",{class:"logo",viewBox:"0 0 32 32","aria-hidden":"true",children:[M("defs",{children:M("radialGradient",{id:"lg",cx:"50%",cy:"50%",r:"50%",children:[M("stop",{offset:"0","stop-color":"#fff"}),M("stop",{offset:"0.35","stop-color":"#9cc3ff"}),M("stop",{offset:"1","stop-color":"#7a5cff","stop-opacity":"0"})]})}),M("circle",{cx:"16",cy:"16",r:"15",fill:"url(#lg)"}),M("ellipse",{cx:"16",cy:"16",rx:"14",ry:"5",fill:"none",stroke:"#9cc3ff","stroke-opacity":"0.6",transform:"rotate(-24 16 16)"})]})}function PT({c:n}){const t=Xt(n.store,c=>c.focus),e=Xt(n.store,c=>c.note),i=Xt(n.store,c=>c.topicData),r=n.world.constellations.find(c=>c.id===t.constellation),s=n.world.topics.find(c=>c.slug===t.topic),o=e?.title??i?.nodes.find(c=>c.id===t.note)?.title,a=[],l=n.world.constellations.length>1;if(a.push({label:l?"Overview":n.world.brain,go:()=>n.focus({}),current:!t.constellation&&!t.topic}),r&&l&&a.push({label:`${Ji(r.title)}${r.topics.length>1?` +${r.topics.length-1}`:""}`,color:r.color,go:()=>n.focus({constellation:r.id}),current:!t.topic}),s){const c=[];for(let h=n.world.topics.find(u=>u.slug===s.parent);h;h=n.world.topics.find(u=>u.slug===h.parent))c.unshift(h);for(const h of c)!h.parent&&r&&Ji(r.title)===h.title||a.push({label:h.title,color:h.color,go:()=>n.focus({topic:h.slug}),current:!1});a.push({label:s.title,color:s.color,go:()=>n.focus({topic:s.slug}),current:!t.note})}if(t.note&&i&&i.slug===t.topic){const{branches:c,folderOf:h}=Oo(i),u=[];for(let d=c.get(h.get(t.note)??"");d&&d.key!=="";d=d.parent===null?void 0:c.get(d.parent))u.unshift(d);for(const d of u)d.note!==t.note&&a.push({label:d.title,go:()=>d.note?n.focus({topic:i.slug,note:d.note}):void 0,current:!1})}return t.note&&a.push({label:o??"…",go:()=>{},current:!0}),M("nav",{class:"crumbs","aria-label":"Breadcrumb",children:a.map((c,h)=>M("span",{class:"crumb-wrap",children:[h>0&&M("span",{class:"crumb-sep",children:M(Ae,{name:"chevron"})}),M("button",{class:`crumb${c.current?" current":""}`,onClick:c.go,"aria-current":c.current?"page":void 0,children:[c.color&&M(Ce,{color:c.color,size:7}),M("span",{children:c.label})]})]},h))})}function DT({c:n}){const t=Xt(n.store,d=>d.focus),e=Xt(n.store,d=>d.zoom),i=Xt(n.store,d=>d.note),r=n.world.constellations.length>1,s=n.world.constellations.find(d=>d.id===t.constellation),o=n.world.topics.find(d=>d.slug===t.topic),a=t.note?3:t.topic?2:t.constellation&&r?1:r?0:1,l=[{level:0,name:"Overview",place:r?`${n.world.constellations.length} groups`:"",go:()=>n.focus({})},{level:1,name:"Group",place:s?Ji(s.title):"",go:()=>s&&n.focus({constellation:s.id})},{level:2,name:"Topic",place:o?.title??"",go:()=>o&&n.focus({topic:o.slug})},{level:3,name:"Note",place:t.note?i?.title??"":"",go:()=>{}}].filter(d=>r||d.level>0),c=l[0].level,h=3-c,u=Math.max(0,Math.min(1,(Math.max(e,c)-c)/h));return M("div",{class:"panel level-hud","aria-label":"Map level",children:[M("div",{class:"minimap-label",children:"ZOOM"}),M("div",{class:"level-track",children:[M("div",{class:"level-rail"}),M("div",{class:"level-marker",style:{top:`${u*100}%`}})]}),M("ol",{class:"level-rungs",children:l.map(d=>M("li",{class:`level-rung${d.level===a?" current":""}${d.level<a?" above":""}`,children:M("button",{disabled:d.level>=a,onClick:d.go,title:d.level<a?`Back to the ${d.name.toLowerCase()} level`:void 0,children:[M("span",{class:"level-name",children:d.name}),d.place&&d.level<=a&&M("span",{class:"level-place",children:d.place})]})},d.level))}),M("div",{class:"level-hint",children:a<2?"Scroll to zoom in":a===2?"Click a star to open a note":"Scroll out or press Esc to go back"})]})}function ka(n,t){const e=t.focus,i=n.world.topics.find(s=>s.slug===e.topic);if(e.note)return{title:t.title??n.galaxy?.noteTitle(e.note)??"Note",kind:"note",color:i?.color,sub:i?.title};if(i)return{title:i.title,kind:"topic",color:i.color};const r=n.world.constellations.find(s=>s.id===e.constellation);return r?{title:Ji(r.title),kind:"group",color:r.color}:{title:n.world.constellations.length>1?"Overview":n.world.brain,kind:"overview"}}function LT({c:n}){const t=Xt(n.store,o=>o.trail),e=Xt(n.store,o=>o.historyOpen),i=vs(null);tr(()=>{if(!e)return;const o=a=>{i.current?.contains(a.target)||n.store.set({historyOpen:!1})};return document.addEventListener("pointerdown",o),()=>document.removeEventListener("pointerdown",o)},[e]);const r=t.entries[t.index-1],s=t.entries[t.index+1];return M("div",{class:"nav-buttons",ref:i,children:[M("button",{class:"icon-btn",disabled:!r,onClick:()=>n.back(),"aria-label":"Back",title:r?`Back to ${ka(n,r).title} (Alt+←)`:"Back",children:M(Ae,{name:"back"})}),M("button",{class:"icon-btn",disabled:!s,onClick:()=>n.forward(),"aria-label":"Forward",title:s?`Forward to ${ka(n,s).title} (Alt+→)`:"Forward",children:M(Ae,{name:"forward"})}),M("button",{class:`icon-btn${e?" on":""}`,disabled:t.entries.length<2,onClick:()=>n.store.set({historyOpen:!e}),"aria-label":"History","aria-expanded":e,title:"Everything opened in this tab",children:M(Ae,{name:"history"})}),e&&M("div",{class:"panel history-pop",role:"menu","aria-label":"History",children:[M("div",{class:"section-title",children:"Opened in this tab"}),t.entries.map((o,a)=>({v:o,i:a})).reverse().map(({v:o,i:a})=>{const l=ka(n,o);return M("button",{role:"menuitem",class:`row history-row${a===t.index?" current":""}`,onClick:()=>n.jump(a),children:[l.color?M(Ce,{color:l.color,size:7}):M("span",{class:"dot-space"}),M("span",{class:"row-title",children:l.title}),M("span",{class:"row-meta",children:l.sub??l.kind})]},`${a}${o.hash}`)})]})]})}function UT({c:n}){const t=n.world,e=Xt(n.store,i=>i.embedded);return M("header",{class:"topbar",children:[M("div",{class:"panel brand",children:[M(RT,{}),M("div",{class:"brand-text",children:[M("div",{class:"brand-name",children:t.brain}),M("div",{class:"brand-sub",children:["brain-wiki · ",t.profile==="owner"?"owner view":`as ${t.profile}`,e?" · exported":""]})]})]}),M("div",{class:"panel crumbs-panel",children:[M(LT,{c:n}),M(PT,{c:n})]}),M("button",{class:"panel search-btn",onClick:()=>n.store.set({paletteOpen:!0}),"aria-label":"Search",children:[M(Ae,{name:"search"}),M("span",{children:"Search notes and topics"}),M(xs,{children:"/"})]}),M("div",{class:"panel totals","aria-label":"Totals",children:[M("div",{children:[M("b",{children:Xe(t.totals.topics)}),M("span",{children:"topics"})]}),M("div",{children:[M("b",{children:Xe(t.totals.notes)}),M("span",{children:"notes"})]}),M("div",{children:[M("b",{children:Xe(t.totals.links)}),M("span",{children:"links"})]}),M("button",{class:`total${t.totals.flagged?" warn":""}`,onClick:()=>n.setNav("health"),title:"Notes with issues: open the Issues tab",children:[M("b",{children:Xe(t.totals.flagged)}),M("span",{children:"with issues"})]}),M("button",{class:"total gold",onClick:()=>n.select({kind:"inbox"}),title:"Session captures waiting to be merged automatically",children:[M("b",{children:Xe(t.episodes.count)}),M("span",{children:"inbox"})]})]})]})}function IT({c:n}){const t=Xt(n.store,i=>i.layers),e=Xt(n.store,i=>i.health);return M("div",{class:"dock-wrap",children:M("div",{class:"panel dock",role:"toolbar","aria-label":"Layers",children:[M("div",{class:"dock-group",children:qf.map(i=>M("button",{class:`layer fam${t[i]?" on":" off"}`,"aria-pressed":t[i],onClick:()=>n.setLayer(i,!t[i]),title:`${CT[i]} (${t[i]?"shown":"hidden"})`,children:[M("span",{class:"swatch",style:t[i]?{background:Gn[i],boxShadow:`0 0 10px ${Gn[i]}`}:{borderColor:Gn[i]}}),M("span",{children:wd[i]})]},i))}),M("div",{class:"dock-sep"}),M("div",{class:"dock-group",children:[M("button",{class:`layer${e?" on health":""}`,"aria-pressed":e,onClick:()=>n.setHealth(!e),title:"Color the map by notes with issues (H)",children:[M(Ae,{name:"health"})," ",M("span",{children:"Highlight issues"})]}),M(OT,{c:n}),M("button",{class:"layer",onClick:()=>n.store.set({helpOpen:!0}),title:"Shortcuts (?)","aria-label":"Shortcuts",children:M(Ae,{name:"help"})})]})]})})}function OT({c:n}){const t=Xt(n.store,a=>a.labels),e=Xt(n.store,a=>a.quality),i=Xt(n.store,a=>a.qualityMode),[r,s]=In(!1),o=vs(null);return tr(()=>{if(!r)return;const a=c=>{o.current?.contains(c.target)||s(!1)},l=c=>c.key==="Escape"&&s(!1);return document.addEventListener("pointerdown",a),document.addEventListener("keydown",l,!0),()=>{document.removeEventListener("pointerdown",a),document.removeEventListener("keydown",l,!0)}},[r]),M("div",{class:"more",ref:o,children:[M("button",{class:`layer${r?" on":""}`,onClick:()=>s(!r),"aria-label":"More settings","aria-expanded":r,title:"More settings",children:M(Ae,{name:"more"})}),r&&M("div",{class:"panel more-pop",role:"menu",children:[M("label",{class:"more-row",children:[M("input",{type:"checkbox",checked:t,onChange:()=>n.setLabels(!t)}),M("span",{children:"Labels"}),M(xs,{children:"L"})]}),M("div",{class:"more-row graphics",children:[M("span",{children:"Graphics"}),M("div",{class:"seg",role:"radiogroup","aria-label":"Graphics",children:["auto","high","low"].map(a=>M("button",{role:"radio","aria-checked":i===a,class:i===a?"on":"",onClick:()=>n.setQualityMode(a),children:a==="auto"?"Auto":a==="high"?"High":"Low"},a))})]}),M("p",{class:"more-note",children:["Now ",e==="high"?"High: glow, vignette and grain":"Low: no glow, for slower GPUs",".",i==="auto"?" Auto measures your GPU after loading.":""]})]})]})}const NT={depends_on:{verb:"depends on",subject:"to",roles:["dependent","prerequisite"]},supersedes:{verb:"supersedes",subject:"to",roles:["newer","older"]},conflicts_with:{verb:"conflicts with",subject:"from"},related_to:{verb:"is related to",subject:"from"},links_to:{verb:"links to",subject:"from"},part_of:{verb:"is part of",subject:"from"}};function FT({c:n,target:t,left:e,top:i}){const r=NT[t.family],[s,o]=r.subject==="to"?[t.to,t.from]:[t.from,t.to],a=(h,u)=>{const d=n.world.topics.find(f=>f.slug===h.topic);return M("div",{class:"link-end",children:[M("div",{class:"hover-title",children:h.title}),M("div",{class:"hover-line",children:[M(Ce,{color:d?.color??"#9cc3ff",size:6})," ",d?.title??h.topic,u?` · ${u}`:""]})]})},c=n.store.state.focus.note===t.to.id?t.from:t.to;return M("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[M("div",{class:"insp-kicker",children:[M("span",{class:"swatch",style:{background:Gn[t.family]}})," ",wd[t.family]]}),a(s,r.roles?.[0]),M("div",{class:"link-verb",style:{color:Gn[t.family]},children:r.verb}),a(o,r.roles?.[1]),M("div",{class:"hover-line link-hint",children:["Click to go to ",c.title]})]})}function kT({c:n,target:t,left:e,top:i}){const r=c=>t.level==="constellation"?Ji(n.world.constellations.find(h=>h.id===c)?.title??c):n.world.topics.find(h=>h.slug===c)?.title??c,s=n.store.state.focus,[o,a]=s.topic===t.b||s.constellation===t.b?[t.b,t.a]:[t.a,t.b],l=Object.entries(t.rels).sort((c,h)=>h[1]-c[1]).map(([c,h])=>`${h} ${c.replace(/_/g," ")}`);return M("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[M("div",{class:"insp-kicker",children:["Links between ",t.level==="constellation"?"groups":"topics"]}),M("div",{class:"hover-title",children:[r(o)," ↔ ",r(a)]}),M("div",{class:"hover-line",children:[t.total," typed links",l.length?`: ${l.join(" · ")}`:""]}),M("div",{class:"hover-line link-hint",children:["Click to fly to ",r(a)]})]})}function zT({c:n}){const t=Xt(n.store,f=>f.hover),e=Xt(n.store,f=>f.topicData);if(!t)return null;const{target:i,x:r,y:s}=t;if(i.kind==="link"||i.kind==="flow"){const f=Math.min(window.innerWidth-310,r+18),_=Math.min(window.innerHeight-200,s+18);return i.kind==="link"?M(FT,{c:n,target:i,left:f,top:_}):M(kT,{c:n,target:i,left:f,top:_})}let o="",a="",l="#9cc3ff",c=[],h=[];if(i.kind==="constellation"){const f=n.world.constellations.find(_=>_.id===i.id);if(!f)return null;o="Group of topics",a=f.title,l=f.color,c=[`${f.topics.length} topics`,"Click to zoom in"]}else if(i.kind==="topic"){const f=n.world.topics.find(_=>_.slug===i.slug);if(!f)return null;o="Topic",a=f.title,l=f.color,c=[`${f.notes} notes${f.recent?` · ${f.recent} changed this week`:""}`,f.flagged?`${f.flagged} with issues`:"No issues"]}else if(i.kind==="note"){const f=n.world.topics.find(m=>m.slug===i.topic),g=(e?.slug===i.topic?e.nodes:void 0)?.find(m=>m.id===i.id);o=f?.title??"Note",l=f?.color??l,a=g?.title??"Note",g&&(c=[[g.kind==="hub"?"topic index":g.type,g.status!=="active"?g.status:null,`${g.degree} links`].filter(Boolean).join(" · ")],h=g.flags)}else o="Inbox",a=`${n.world.episodes.count} session captures`,l="#ffd88a",c=["Waiting to be merged into your notes automatically"];const u=Math.min(window.innerWidth-300,r+18),d=Math.min(window.innerHeight-140,s+18);return M("div",{class:"hovercard panel",style:{left:`${u}px`,top:`${d}px`},children:[M("div",{class:"insp-kicker",children:[M(Ce,{color:l,size:7})," ",o]}),M("div",{class:"hover-title",children:a}),c.map(f=>M("div",{class:"hover-line",children:f},f)),h.length>0&&M("div",{class:"hover-flags",children:h.map(f=>M("span",{style:{color:er[f]},children:["● ",No[f]]},f))})]})}function BT({c:n}){return M("div",{class:"palette-scrim",onClick:e=>e.target===e.currentTarget&&n.store.set({helpOpen:!1}),children:M("div",{class:"panel help",role:"dialog","aria-label":"Shortcuts",children:[M("h3",{children:"Shortcuts"}),[["/  or  Ctrl/⌘ K","Search notes and topics"],["Click","Zoom to a group or topic; open a note"],["P","Show or hide the selected note's preview"],["Scroll","Zoom toward the cursor; detail appears as you get closer"],["Drag","Pan across the map"],["Moving pulses","Direction: prerequisite → dependent (blue), old → new (amber)"],["Hover a trail","See the two notes it connects; click to go to the other end"],["Esc","Up one level, or close"],["Alt ←  ·  Alt →","Back and forward through what you opened (or the buttons by the breadcrumb)"],["H","Highlight issues"],["L","Labels"],["R","Back to the overview"],["[  ]","Previous or next topic in the group"]].map(([e,i])=>M("div",{class:"help-row",children:[M(xs,{children:e}),M("span",{children:i})]},e)),M("p",{class:"hint",children:"Star size shows how connected a note is, brightness how recently it changed. Rings mark notes with issues."})]})})}function HT({c:n}){const t=vs(null),e=Xt(n.store,l=>l.paletteOpen),i=Xt(n.store,l=>l.helpOpen),r=Xt(n.store,l=>l.toast),s=Xt(n.store,l=>l.run),o=Xt(n.store,l=>l.health),a=Xt(n.store,l=>l.sceneError);return tr(()=>{t.current&&!n.galaxy&&n.mount(t.current);const l=c=>{const h=c.target,u=h.tagName==="INPUT"||h.tagName==="SELECT"||h.tagName==="TEXTAREA";if(c.key==="k"&&(c.metaKey||c.ctrlKey)||c.key==="/"&&!u){c.preventDefault(),n.store.set({paletteOpen:!0});return}if(c.key==="Escape"){u&&h.blur(),n.up();return}if(!(u||c.metaKey||c.ctrlKey||c.altKey)){if(c.key==="h"||c.key==="H")n.setHealth(!n.store.state.health);else if((c.key==="p"||c.key==="P")&&n.store.state.focus.note)n.store.set({previewOpen:!n.store.state.previewOpen});else if(c.key==="l"||c.key==="L")n.setLabels(!n.store.state.labels);else if(c.key==="r"||c.key==="R")n.focus({});else if(c.key==="?")n.store.set({helpOpen:!0});else if(c.key==="["||c.key==="]"){const d=n.store.state.focus,f=n.world.constellations.find(p=>p.id===d.constellation)??n.world.constellations[0];if(!f)return;const _=f.topics,g=d.topic?_.indexOf(d.topic):-1,m=_[(g+(c.key==="]"?1:-1)+_.length)%_.length];m&&n.focus({topic:m})}}};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[]),M("div",{class:"app",children:[M("div",{class:"stage",ref:t}),a&&M("div",{class:"panel scene-error",role:"alert",children:[M("h2",{children:"The 3D map could not start"}),M("p",{class:"scene-error-detail",children:a}),M("p",{children:["It needs WebGL2 with hardware acceleration. Turn on hardware acceleration in your browser settings, then check ",M("code",{children:"chrome://gpu"})," (or ",M("code",{children:"about:support"})," in Firefox) for WebGL2 marked hardware accelerated. Remote desktop sessions often have no GPU."]}),M("p",{children:"The topic list, search, and details panel still work."})]}),M(UT,{c:n}),M(LS,{c:n}),M(ES,{c:n}),M(MT,{c:n}),!a&&M(TS,{c:n}),!a&&M(DT,{c:n}),M(IT,{c:n}),M(zT,{c:n}),s&&M("div",{class:"panel run-banner",children:[M("span",{class:"run-kind",children:s.kind})," ",s.at?new Date(s.at).toLocaleString():""," · ",s.touched.length," notes lit",M("button",{class:"link",onClick:()=>n.setRun(null),children:"clear"})]}),o&&M("div",{class:"panel health-legend",role:"note","aria-label":"Health mode legend",children:[M("span",{children:"Fewest issues"}),M("span",{class:"health-ramp"}),M("span",{children:"Most issues"}),M("span",{class:"dock-sep"}),M("span",{class:"ring"})," ",M("span",{children:"note with issues"}),M("span",{class:"dock-sep"}),M(xs,{children:"H"})," ",M("span",{children:"exit"})]}),e&&M(US,{c:n}),i&&M(BT,{c:n}),r&&M("div",{class:"panel toast",role:"status",children:r})]})}async function VT(){const n=document.getElementById("app"),t=document.createElement("div");t.className="boot",t.textContent="Charting your brain…",n.appendChild(t);try{const e=Gd(),i=await e.world();t.remove(),zd(M(HT,{c:new pS(e,i)}),n)}catch(e){t.className="boot boot-error",t.textContent=`Could not load the brain: ${e instanceof Error?e.message:String(e)}`}}VT();
