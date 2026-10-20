var To,he,Oh,Ni,yc,Fh,Nh,kh,Fl,Ua,Oa,Jr={},zh=[],Vf=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,wo=Array.isArray;function Kn(n,t){for(var e in t)n[e]=t[e];return n}function Nl(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function Gf(n,t,e){var i,r,s,o={};for(s in t)s=="key"?i=t[s]:s=="ref"?r=t[s]:o[s]=t[s];if(arguments.length>2&&(o.children=arguments.length>3?To.call(arguments,2):e),typeof n=="function"&&n.defaultProps!=null)for(s in n.defaultProps)o[s]===void 0&&(o[s]=n.defaultProps[s]);return Js(n,o,i,r,null)}function Js(n,t,e,i,r){var s={type:n,props:t,key:e,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++Oh,__i:-1,__u:0};return r==null&&he.vnode!=null&&he.vnode(s),s}function xe(n){return n.children}function to(n,t){this.props=n,this.context=t}function br(n,t){if(t==null)return n.__?br(n.__,n.__i+1):null;for(var e;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null)return e.__e;return typeof n.type=="function"?br(n):null}function Bh(n){var t,e;if((n=n.__)!=null&&n.__c!=null){for(n.__e=n.__c.base=null,t=0;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null){n.__e=n.__c.base=e.__e;break}return Bh(n)}}function Sc(n){(!n.__d&&(n.__d=!0)&&Ni.push(n)&&!mo.__r++||yc!=he.debounceRendering)&&((yc=he.debounceRendering)||Fh)(mo)}function mo(){for(var n,t,e,i,r,s,o,a=1;Ni.length;)Ni.length>a&&Ni.sort(Nh),n=Ni.shift(),a=Ni.length,n.__d&&(e=void 0,r=(i=(t=n).__v).__e,s=[],o=[],t.__P&&((e=Kn({},i)).__v=i.__v+1,he.vnode&&he.vnode(e),kl(t.__P,e,i,t.__n,t.__P.namespaceURI,32&i.__u?[r]:null,s,r??br(i),!!(32&i.__u),o),e.__v=i.__v,e.__.__k[e.__i]=e,Gh(s,e,o),e.__e!=r&&Bh(e)));mo.__r=0}function Hh(n,t,e,i,r,s,o,a,l,c,h){var u,p,d,g,_,m,f=i&&i.__k||zh,M=t.length;for(l=Wf(e,t,f,l,M),u=0;u<M;u++)(d=e.__k[u])!=null&&(p=d.__i==-1?Jr:f[d.__i]||Jr,d.__i=u,m=kl(n,d,p,r,s,o,a,l,c,h),g=d.__e,d.ref&&p.ref!=d.ref&&(p.ref&&zl(p.ref,null,d),h.push(d.ref,d.__c||g,d)),_==null&&g!=null&&(_=g),4&d.__u||p.__k===d.__k?l=Vh(d,l,n):typeof d.type=="function"&&m!==void 0?l=m:g&&(l=g.nextSibling),d.__u&=-7);return e.__e=_,l}function Wf(n,t,e,i,r){var s,o,a,l,c,h=e.length,u=h,p=0;for(n.__k=new Array(r),s=0;s<r;s++)(o=t[s])!=null&&typeof o!="boolean"&&typeof o!="function"?(l=s+p,(o=n.__k[s]=typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?Js(null,o,null,null,null):wo(o)?Js(xe,{children:o},null,null,null):o.constructor==null&&o.__b>0?Js(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,a=null,(c=o.__i=Xf(o,e,l,u))!=-1&&(u--,(a=e[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(r>h?p--:r<h&&p++),typeof o.type!="function"&&(o.__u|=4)):c!=l&&(c==l-1?p--:c==l+1?p++:(c>l?p--:p++,o.__u|=4))):n.__k[s]=null;if(u)for(s=0;s<h;s++)(a=e[s])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=br(a)),Xh(a,a));return i}function Vh(n,t,e){var i,r;if(typeof n.type=="function"){for(i=n.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=n,t=Vh(i[r],t,e));return t}n.__e!=t&&(t&&n.type&&!e.contains(t)&&(t=br(n)),e.insertBefore(n.__e,t||null),t=n.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Xf(n,t,e,i){var r,s,o=n.key,a=n.type,l=t[e];if(l===null&&n.key==null||l&&o==l.key&&a==l.type&&(2&l.__u)==0)return e;if(i>(l!=null&&(2&l.__u)==0?1:0))for(r=e-1,s=e+1;r>=0||s<t.length;){if(r>=0){if((l=t[r])&&(2&l.__u)==0&&o==l.key&&a==l.type)return r;r--}if(s<t.length){if((l=t[s])&&(2&l.__u)==0&&o==l.key&&a==l.type)return s;s++}}return-1}function Mc(n,t,e){t[0]=="-"?n.setProperty(t,e??""):n[t]=e==null?"":typeof e!="number"||Vf.test(t)?e:e+"px"}function ds(n,t,e,i,r){var s,o;t:if(t=="style")if(typeof e=="string")n.style.cssText=e;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(t in i)e&&t in e||Mc(n.style,t,"");if(e)for(t in e)i&&e[t]==i[t]||Mc(n.style,t,e[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(kh,"$1")),o=t.toLowerCase(),t=o in n||t=="onFocusOut"||t=="onFocusIn"?o.slice(2):t.slice(2),n.l||(n.l={}),n.l[t+s]=e,e?i?e.u=i.u:(e.u=Fl,n.addEventListener(t,s?Oa:Ua,s)):n.removeEventListener(t,s?Oa:Ua,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in n)try{n[t]=e??"";break t}catch{}typeof e=="function"||(e==null||e===!1&&t[4]!="-"?n.removeAttribute(t):n.setAttribute(t,t=="popover"&&e==1?"":e))}}function Ec(n){return function(t){if(this.l){var e=this.l[t.type+n];if(t.t==null)t.t=Fl++;else if(t.t<e.u)return;return e(he.event?he.event(t):t)}}}function kl(n,t,e,i,r,s,o,a,l,c){var h,u,p,d,g,_,m,f,M,E,y,R,S,b,L,w,x,C=t.type;if(t.constructor!=null)return null;128&e.__u&&(l=!!(32&e.__u),s=[a=t.__e=e.__e]),(h=he.__b)&&h(t);t:if(typeof C=="function")try{if(f=t.props,M="prototype"in C&&C.prototype.render,E=(h=C.contextType)&&i[h.__c],y=h?E?E.props.value:h.__:i,e.__c?m=(u=t.__c=e.__c).__=u.__E:(M?t.__c=u=new C(f,y):(t.__c=u=new to(f,y),u.constructor=C,u.render=Yf),E&&E.sub(u),u.props=f,u.state||(u.state={}),u.context=y,u.__n=i,p=u.__d=!0,u.__h=[],u._sb=[]),M&&u.__s==null&&(u.__s=u.state),M&&C.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=Kn({},u.__s)),Kn(u.__s,C.getDerivedStateFromProps(f,u.__s))),d=u.props,g=u.state,u.__v=t,p)M&&C.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),M&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(M&&C.getDerivedStateFromProps==null&&f!==d&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(f,y),!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(f,u.__s,y)===!1||t.__v==e.__v){for(t.__v!=e.__v&&(u.props=f,u.state=u.__s,u.__d=!1),t.__e=e.__e,t.__k=e.__k,t.__k.some(function(F){F&&(F.__=t)}),R=0;R<u._sb.length;R++)u.__h.push(u._sb[R]);u._sb=[],u.__h.length&&o.push(u);break t}u.componentWillUpdate!=null&&u.componentWillUpdate(f,u.__s,y),M&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(d,g,_)})}if(u.context=y,u.props=f,u.__P=n,u.__e=!1,S=he.__r,b=0,M){for(u.state=u.__s,u.__d=!1,S&&S(t),h=u.render(u.props,u.state,u.context),L=0;L<u._sb.length;L++)u.__h.push(u._sb[L]);u._sb=[]}else do u.__d=!1,S&&S(t),h=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++b<25);u.state=u.__s,u.getChildContext!=null&&(i=Kn(Kn({},i),u.getChildContext())),M&&!p&&u.getSnapshotBeforeUpdate!=null&&(_=u.getSnapshotBeforeUpdate(d,g)),w=h,h!=null&&h.type===xe&&h.key==null&&(w=Wh(h.props.children)),a=Hh(n,wo(w)?w:[w],t,e,i,r,s,o,a,l,c),u.base=t.__e,t.__u&=-161,u.__h.length&&o.push(u),m&&(u.__E=u.__=null)}catch(F){if(t.__v=null,l||s!=null)if(F.then){for(t.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;s[s.indexOf(a)]=null,t.__e=a}else for(x=s.length;x--;)Nl(s[x]);else t.__e=e.__e,t.__k=e.__k;he.__e(F,t,e)}else s==null&&t.__v==e.__v?(t.__k=e.__k,t.__e=e.__e):a=t.__e=qf(e.__e,t,e,i,r,s,o,l,c);return(h=he.diffed)&&h(t),128&t.__u?void 0:a}function Gh(n,t,e){for(var i=0;i<e.length;i++)zl(e[i],e[++i],e[++i]);he.__c&&he.__c(t,n),n.some(function(r){try{n=r.__h,r.__h=[],n.some(function(s){s.call(r)})}catch(s){he.__e(s,r.__v)}})}function Wh(n){return typeof n!="object"||n==null||n.__b&&n.__b>0?n:wo(n)?n.map(Wh):Kn({},n)}function qf(n,t,e,i,r,s,o,a,l){var c,h,u,p,d,g,_,m=e.props,f=t.props,M=t.type;if(M=="svg"?r="http://www.w3.org/2000/svg":M=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(c=0;c<s.length;c++)if((d=s[c])&&"setAttribute"in d==!!M&&(M?d.localName==M:d.nodeType==3)){n=d,s[c]=null;break}}if(n==null){if(M==null)return document.createTextNode(f);n=document.createElementNS(r,M,f.is&&f),a&&(he.__m&&he.__m(t,s),a=!1),s=null}if(M==null)m===f||a&&n.data==f||(n.data=f);else{if(s=s&&To.call(n.childNodes),m=e.props||Jr,!a&&s!=null)for(m={},c=0;c<n.attributes.length;c++)m[(d=n.attributes[c]).name]=d.value;for(c in m)if(d=m[c],c!="children"){if(c=="dangerouslySetInnerHTML")u=d;else if(!(c in f)){if(c=="value"&&"defaultValue"in f||c=="checked"&&"defaultChecked"in f)continue;ds(n,c,null,d,r)}}for(c in f)d=f[c],c=="children"?p=d:c=="dangerouslySetInnerHTML"?h=d:c=="value"?g=d:c=="checked"?_=d:a&&typeof d!="function"||m[c]===d||ds(n,c,d,m[c],r);if(h)a||u&&(h.__html==u.__html||h.__html==n.innerHTML)||(n.innerHTML=h.__html),t.__k=[];else if(u&&(n.innerHTML=""),Hh(t.type=="template"?n.content:n,wo(p)?p:[p],t,e,i,M=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,o,s?s[0]:e.__k&&br(e,0),a,l),s!=null)for(c=s.length;c--;)Nl(s[c]);a||(c="value",M=="progress"&&g==null?n.removeAttribute("value"):g!=null&&(g!==n[c]||M=="progress"&&!g||M=="option"&&g!=m[c])&&ds(n,c,g,m[c],r),c="checked",_!=null&&_!=n[c]&&ds(n,c,_,m[c],r))}return n}function zl(n,t,e){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&t==null||(n.__u=n(t))}else n.current=t}catch(r){he.__e(r,e)}}function Xh(n,t,e){var i,r;if(he.unmount&&he.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||zl(i,null,t)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(s){he.__e(s,t)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&Xh(i[r],t,e||typeof n.type!="function");e||Nl(n.__e),n.__c=n.__=n.__e=void 0}function Yf(n,t,e){return this.constructor(n,e)}function $f(n,t,e){var i,r,s,o;t==document&&(t=document.documentElement),he.__&&he.__(n,t),r=(i=!1)?null:t.__k,s=[],o=[],kl(t,n=t.__k=Gf(xe,null,[n]),r||Jr,Jr,t.namespaceURI,r?null:t.firstChild?To.call(t.childNodes):null,s,r?r.__e:t.firstChild,i,o),Gh(s,n,o)}To=zh.slice,he={__e:function(n,t,e,i){for(var r,s,o;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(n)),o=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(n,i||{}),o=r.__d),o)return r.__E=r}catch(a){n=a}throw n}},Oh=0,to.prototype.setState=function(n,t){var e;e=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Kn({},this.state),typeof n=="function"&&(n=n(Kn({},e),this.props)),n&&Kn(e,n),n!=null&&this.__v&&(t&&this._sb.push(t),Sc(this))},to.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),Sc(this))},to.prototype.render=xe,Ni=[],Fh=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Nh=function(n,t){return n.__v.__b-t.__v.__b},mo.__r=0,kh=/(PointerCapture)$|Capture$/i,Fl=0,Ua=Ec(!1),Oa=Ec(!0);var Zf=0;function v(n,t,e,i,r,s){t||(t={});var o,a,l=t;if("ref"in l)for(a in l={},t)a=="ref"?o=t[a]:l[a]=t[a];var c={type:n,props:l,key:e,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Zf,__i:-1,__u:0,__source:r,__self:s};if(typeof n=="function"&&(o=n.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return he.vnode&&he.vnode(c),c}class jf{constructor(t){this.token=t}embedded=!1;topics=new Map;async get(t){const e=t.includes("?")?"&":"?",i=this.token?`${t}${e}t=${encodeURIComponent(this.token)}`:t,r=await fetch(i,{credentials:"same-origin"});if(r.status===404)return null;if(!r.ok)throw new Error(`${t}: HTTP ${r.status}`);return await r.json()}async world(){const t=await this.get("/api/world");if(!t)throw new Error("no world");return t}topic(t){let e=this.topics.get(t);return e||(e=this.get(`/api/topic/${encodeURIComponent(t)}`),this.topics.set(t,e),e.catch(()=>this.topics.delete(t))),e}note(t){return this.get(`/api/note/${encodeURIComponent(t)}`)}async search(t){return t.trim()?(await this.get(`/api/search?q=${encodeURIComponent(t)}`))?.results??[]:[]}async health(){return await this.get("/api/health")??{counts:{},items:{}}}}class Kf{constructor(t){this.data=t}embedded=!0;async world(){return this.data.world}async topic(t){return this.data.topics[t]??null}async note(t){for(const e of Object.values(this.data.topics)){const i=e.nodes.find(r=>r.id===t);if(i)return{id:i.id,title:i.title,path:i.path,kind:i.kind,type:i.type,status:i.status,topic:i.topic,updated:i.updated,partial:!0}}return null}async search(t){const e=t.trim().toLowerCase();if(!e)return[];const i=[];for(const r of Object.values(this.data.topics))for(const s of r.nodes)if([s.title,...s.aliases].map(a=>a.toLowerCase()).some(a=>a.includes(e))&&(i.push({id:s.id,title:s.title,topic:s.topic,kind:s.kind}),i.length>=20))return i;return i}async health(){return this.data.health}}function Qf(){const n=document.getElementById("brain-data");if(n?.textContent)return new Kf(JSON.parse(n.textContent));const t=new URL(window.location.href);let e=t.searchParams.get("t");return e?(sessionStorage.setItem("brain-viz-token",e),t.searchParams.delete("t"),history.replaceState(history.state,"",t.pathname+t.search+t.hash)):e=sessionStorage.getItem("brain-viz-token"),new jf(e)}const bc=100;class Jf{entries;index;constructor(t){this.entries=t?.entries??[],this.index=t?Math.max(0,Math.min(t.index,this.entries.length-1)):-1}get current(){return this.entries[this.index]}visit(t){return this.current?.hash===t.hash?this.index:(this.entries=[...this.entries.slice(0,this.index+1),t],this.entries.length>bc&&(this.entries=this.entries.slice(this.entries.length-bc)),this.index=this.entries.length-1,this.index)}replace(t){return this.index<0?this.visit(t):(this.entries=this.entries.map((e,i)=>i===this.index?t:e),this.index)}moveTo(t){if(!(t<0||t>=this.entries.length))return this.index=t,this.current}setTitle(t,e){let i=!1;return this.entries=this.entries.map(r=>r.hash!==t||r.title===e?r:(i=!0,{...r,title:e})),i}get canBack(){return this.index>0}get canForward(){return this.index<this.entries.length-1}state(){return{entries:this.entries,index:this.index}}}const tp=140,ep=100,np=16;function fs(n,t,e,i){return t<=n?1/0:n/t*(e/2)/Math.tan(i*Math.PI/360)}function ip(n,t,e=np){const i=n.filter(r=>r.visible&&r.px>=(t.has(r.slug)?ep:tp)).sort((r,s)=>s.px-r.px||r.slug.localeCompare(s.slug));return new Set(i.slice(0,e).map(r=>r.slug))}function qh(n){const t=new Float32Array(n.length),e=n.map(r=>r.flagged/Math.max(1,r.notes)),i=n.map((r,s)=>s).filter(r=>n[r].flagged>0).sort((r,s)=>e[r]-e[s]||r-s);return i.forEach((r,s)=>{t[r]=i.length===1?1:.15+.85*(s/(i.length-1))}),t}function Tc(n,t){return n.note&&n.topic&&t.find(e=>e.slug===n.topic)?.page===n.note?{topic:n.topic}:n}function Fa(n){return n.note?"note":n.topic?"topic":"overview"}function Wn(n){return n.note&&n.topic?`#/t/${encodeURIComponent(n.topic)}/n/${encodeURIComponent(n.note)}`:n.topic?`#/t/${encodeURIComponent(n.topic)}`:"#/"}function rp(n){let t;try{t=n.replace(/^#\/?/,"").split("/").filter(Boolean).map(decodeURIComponent)}catch{return{}}if(t[0]==="t"&&t[1]){const e={topic:t[1]};return t[2]==="n"&&t[3]&&(e.note=t[3]),e}return{}}const wc=.3,Ac=.2;function sp(n,t){const e=a=>t.chain.findIndex(l=>l.slug===a);let i=-1;t.chain.forEach((a,l)=>{a.size>=wc&&(i=l)});const r=t.chain[t.chain.length-1],s=Math.min(1,(r?.size??0)/wc)*.9;if(n.topic&&t.focusTopicSize>=Ac){const a=e(n.topic);if(a>=0&&i<=a||i<0)return{focus:n,progress:n.note?2:1}}if(i>=0)return{focus:{topic:t.chain[i].slug},progress:1};const o=e(n.topic);for(let a=o-1;a>=0;a--)if(t.chain[a].size>=Ac)return{focus:{topic:t.chain[a].slug},progress:1};return{focus:{},progress:s}}const op=1664525,ap=1013904223,Cc=4294967296;function Yh(){let n=1;return()=>(n=(op*n+ap)%Cc)/Cc}function lp(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function cp(n,t){let e=n.length,i,r;for(;e;)r=t()*e--|0,i=n[e],n[e]=n[r],n[r]=i;return n}function up(n){return $h(n,Yh())}function $h(n,t){for(var e=0,i=(n=cp(Array.from(n),t)).length,r=[],s,o;e<i;)s=n[e],o&&Zh(o,s)?++e:(o=dp(r=hp(r,s)),e=0);return o}function hp(n,t){var e,i;if(Fo(t,n))return[t];for(e=0;e<n.length;++e)if(ps(t,n[e])&&Fo(qr(n[e],t),n))return[n[e],t];for(e=0;e<n.length-1;++e)for(i=e+1;i<n.length;++i)if(ps(qr(n[e],n[i]),t)&&ps(qr(n[e],t),n[i])&&ps(qr(n[i],t),n[e])&&Fo(jh(n[e],n[i],t),n))return[n[e],n[i],t];throw new Error}function ps(n,t){var e=n.r-t.r,i=t.x-n.x,r=t.y-n.y;return e<0||e*e<i*i+r*r}function Zh(n,t){var e=n.r-t.r+Math.max(n.r,t.r,1)*1e-9,i=t.x-n.x,r=t.y-n.y;return e>0&&e*e>i*i+r*r}function Fo(n,t){for(var e=0;e<t.length;++e)if(!Zh(n,t[e]))return!1;return!0}function dp(n){switch(n.length){case 1:return fp(n[0]);case 2:return qr(n[0],n[1]);case 3:return jh(n[0],n[1],n[2])}}function fp(n){return{x:n.x,y:n.y,r:n.r}}function qr(n,t){var e=n.x,i=n.y,r=n.r,s=t.x,o=t.y,a=t.r,l=s-e,c=o-i,h=a-r,u=Math.sqrt(l*l+c*c);return{x:(e+s+l/u*h)/2,y:(i+o+c/u*h)/2,r:(u+r+a)/2}}function jh(n,t,e){var i=n.x,r=n.y,s=n.r,o=t.x,a=t.y,l=t.r,c=e.x,h=e.y,u=e.r,p=i-o,d=i-c,g=r-a,_=r-h,m=l-s,f=u-s,M=i*i+r*r-s*s,E=M-o*o-a*a+l*l,y=M-c*c-h*h+u*u,R=d*g-p*_,S=(g*y-_*E)/(R*2)-i,b=(_*m-g*f)/R,L=(d*E-p*y)/(R*2)-r,w=(p*f-d*m)/R,x=b*b+w*w-1,C=2*(s+S*b+L*w),F=S*S+L*L-s*s,z=-(Math.abs(x)>1e-6?(C+Math.sqrt(C*C-4*x*F))/(2*x):F/C);return{x:i+S+b*z,y:r+L+w*z,r:z}}function Rc(n,t,e){var i=n.x-t.x,r,s,o=n.y-t.y,a,l,c=i*i+o*o;c?(s=t.r+e.r,s*=s,l=n.r+e.r,l*=l,s>l?(r=(c+l-s)/(2*c),a=Math.sqrt(Math.max(0,l/c-r*r)),e.x=n.x-r*i-a*o,e.y=n.y-r*o+a*i):(r=(c+s-l)/(2*c),a=Math.sqrt(Math.max(0,s/c-r*r)),e.x=t.x+r*i-a*o,e.y=t.y+r*o+a*i)):(e.x=t.x+e.r,e.y=t.y)}function Pc(n,t){var e=n.r+t.r-1e-6,i=t.x-n.x,r=t.y-n.y;return e>0&&e*e>i*i+r*r}function Lc(n){var t=n._,e=n.next._,i=t.r+e.r,r=(t.x*e.r+e.x*t.r)/i,s=(t.y*e.r+e.y*t.r)/i;return r*r+s*s}function ms(n){this._=n,this.next=null,this.previous=null}function pp(n,t){if(!(s=(n=lp(n)).length))return 0;var e,i,r,s,o,a,l,c,h,u,p;if(e=n[0],e.x=0,e.y=0,!(s>1))return e.r;if(i=n[1],e.x=-i.r,i.x=e.r,i.y=0,!(s>2))return e.r+i.r;Rc(i,e,r=n[2]),e=new ms(e),i=new ms(i),r=new ms(r),e.next=r.previous=i,i.next=e.previous=r,r.next=i.previous=e;t:for(l=3;l<s;++l){Rc(e._,i._,r=n[l]),r=new ms(r),c=i.next,h=e.previous,u=i._.r,p=e._.r;do if(u<=p){if(Pc(c._,r._)){i=c,e.next=i,i.previous=e,--l;continue t}u+=c._.r,c=c.next}else{if(Pc(h._,r._)){e=h,e.next=i,i.previous=e,--l;continue t}p+=h._.r,h=h.previous}while(c!==h.next);for(r.previous=e,r.next=i,e.next=i.previous=i=r,o=Lc(e);(r=r.next)!==i;)(a=Lc(r))<o&&(e=r,o=a);i=e.next}for(e=[i._],r=i;(r=r.next)!==i;)e.push(r._);for(r=$h(e,t),l=0;l<s;++l)e=n[l],e.x-=r.x,e.y-=r.y;return r.r}function mp(n){return pp(n,Yh()),n}const Na=50*Math.PI/180,gp=[0,Math.cos(Na),Math.sin(Na)],gs=1e3,Dc=.75;function _p(n){return-60*(1-Dc**n)/(1-Dc)}const zi=(n,t)=>n.localeCompare(t,void 0,{sensitivity:"base",numeric:!0}),vp=900,eo=10;function xp(n,t,e){const i=t.length;if(!i)return{at:[],free:null};const r=e?[...t,0]:t,s=(m,f)=>Math.max(n+eo+m,f),o=(m,f)=>2*Math.asin(Math.min(1,(m+eo/2)/s(m,f))),a=m=>r.reduce((f,M)=>f+o(M,m),0);let l=0;if(a(0)>2*Math.PI){let[m,f]=[0,r.reduce((M,E)=>M+E+eo/2,0)];for(let M=0;M<40;M++){const E=(m+f)/2;a(E)>2*Math.PI?m=E:f=E}l=f}const c=t.map((m,f)=>f).sort((m,f)=>t[f]-t[m]||m-f),h=[];c.forEach((m,f)=>f%2?h.push(m):h.unshift(m)),e&&h.push(i);const u=(2*Math.PI-a(l))/r.length,p=new Array(r.length);let d=0;for(const m of h){const f=o(r[m],l);p[m]=d+f/2,d+=f+u}const g=p[c[0]];return{at:t.map((m,f)=>{const M=s(m,l);return[M*Math.cos(p[f]-g),M*Math.sin(p[f]-g)]}),free:e?p[i]-g:null}}const Ic=([n,t],e)=>[n*Math.cos(e)-t*Math.sin(e),n*Math.sin(e)+t*Math.cos(e)];function yp(n,t){const e=new Map,i=new Set(n.map(d=>d.slug));for(const d of n){const g=d.parent&&i.has(d.parent)?d.parent:null;e.set(g,[...e.get(g)??[],d])}const r=d=>[...e.get(d)??[]].sort((g,_)=>zi(g.name,_.name)||g.slug.localeCompare(_.slug)),s=(d,g)=>{const _=Math.sqrt(d.chars+vp),m=r(d.slug).map(R=>s(R,!0)),f=d.depth??0;if(!m.length)return{slug:d.slug,depth:f,r:_,ring:_,core:[0,0],subs:[],free:null};const{at:M,free:E}=xp(_,m.map(R=>R.r),g),y=up([{x:0,y:0,r:_},...m.map((R,S)=>({x:M[S][0],y:M[S][1],r:R.r}))]);return{slug:d.slug,depth:f,r:y.r,ring:_,core:[-y.x,-y.y],subs:m.map((R,S)=>({body:R,x:M[S][0],y:M[S][1]})),free:E}},a=r(null).map(d=>s(d,!1)).map(d=>({r:d.r+eo,x:0,y:0,body:d})).sort((d,g)=>g.r-d.r);a.length&&mp(a);const l=Math.max(1,...a.map(d=>Math.hypot(d.x,d.y)+d.r)),c=gs/l,h={topics:new Map,inbox:{x:0,y:0,z:0,r:0},radius:gs},u=(d,g,_,m)=>{let f=0;if(m&&d.free!==null){const[S,b]=d.core,[L,w]=[Math.cos(d.free),Math.sin(d.free)],[x,C]=[m[0]-g,m[1]-_],F=S*L+b*w,z=-F+Math.sqrt(Math.max(0,F*F-S*S-b*b+x*x+C*C));f=Math.atan2(C,x)-Math.atan2(b+z*w,S+z*L)}const[M,E]=Ic(d.core,f),[y,R]=[g+M,_+E];h.topics.set(d.slug,{x:y*c,y:_p(d.depth),z:R*c,r:d.r*c,ring:d.ring*c,fx:g*c,fz:_*c,depth:d.depth});for(const S of d.subs){const[b,L]=Ic([S.x,S.y],f);u(S.body,y+b,R+L,[y,R])}};for(const d of a)u(d.body,d.x,d.y,null);const p=Math.min(70,24+3*Math.sqrt(t));return h.inbox={x:gs+p+80,y:0,z:gs*.35,r:p},h}const Uc=60,Sp=48,Mp=1.4*Math.PI/180,Oc=.22,Fc=1,Ep=.18;function Zr(n,t){return[Math.sin(n)*t,-Math.cos(n)*t]}function Nc(n){return n.path.slice(n.path.lastIndexOf("/")+1).replace(/\.md$/i,"")}function Bl(n,t){const e=n.nodes.find(f=>f.id===n.page&&f.kind!=="episode"),i=n.nodes.filter(f=>f.kind!=="episode"&&f.id!==n.page).sort((f,M)=>zi(Nc(f),Nc(M))||f.path.localeCompare(M.path)),r=i.map(f=>Math.max(Uc,f.chars??0)),s=r.reduce((f,M)=>f+M,0),o=Math.max(Uc,...r),a=r.map(f=>Math.max(2*Math.PI/Sp,2*Math.PI*f/s)),l=[];let c=1/0;if(a.forEach((f,M)=>{c+f>2*Math.PI+1e-9&&(l.push([]),c=0),l[l.length-1].push(M),c+=f}),l.length>1)return wp(e,i,r,o,t);const h=[],u=[];l.forEach((f,M)=>{const E=f.reduce((b,L)=>b+a[L],0),y=M<l.length-1?2*Math.PI/E:1,R=Oc+M*(Fc+Ep);let S=0;for(const b of f){const L=a[b]*y,w=Math.min(Mp,L*.3),x=R+Fc*(.14+.86*Math.sqrt(r[b]/o));h.push({id:i[b].id,a0:S+w/2,a1:S+L-w/2,r0:R,r1:x}),u.push(Zr(S+L/2,x)),S+=L}});const p=Math.max(Oc,...h.map(f=>f.r1)),d=t/p;for(const f of h)f.r0*=d,f.r1*=d;const g=[...e?[e.id]:[],...h.map(f=>f.id)],_=new Float32Array(g.length*3),m=e?1:0;return u.forEach(([f,M],E)=>_.set([f*d,0,M*d],(E+m)*3)),{ids:g,positions:_,slices:h,rings:l.length}}const bp=14*Math.PI/180,Tp=1.4;function wp(n,t,e,i,r){const s=t.length,o=s>=150?4:s>=80?3:2,a=Math.tan(bp),l=2*Math.PI*Tp,c=Math.exp(2*Math.PI*a/o)-1,h=[...e].sort((S,b)=>S-b)[e.length>>1],u=e.map(S=>Math.max(S,h*.4)),p=S=>Math.exp(a*S),d=[];for(let S=0;S<o;S++){const b=t.map((C,F)=>F).filter(C=>C%o===S),L=b.reduce((C,F)=>C+u[F],0),w=2*Math.PI*S/o;let x=0;for(const C of b){const F=l*u[C]/L,z=Math.min(F*.25,.02),B=c*.7*(.3+.7*Math.sqrt(e[C]/i)),[V,Z]=[x+z/2,x+F-z/2],Q=Math.max(2,Math.ceil((Z-V)/(Math.PI/40))),q=[];for(let dt=0;dt<=Q;dt++){const Lt=V+(Z-V)*dt/Q;q.push(...Zr(w+Lt,p(Lt)),...Zr(w+Lt,p(Lt)*(1+B)))}const it=x+F/2,P={id:t[C].id,a0:w+V,a1:w+Z,r0:p(it),r1:p(it)*(1+B),strip:q};d.push({i:C,slice:P,tip:Zr(w+it,p(it)*(1+B)),size:p(it)}),x+=F}}d.sort((S,b)=>S.i-b.i);let g=0;for(const{slice:S}of d)for(let b=0;b<S.strip.length;b+=2)g=Math.max(g,Math.hypot(S.strip[b],S.strip[b+1]));const _=r/g,m=Math.max(...d.map(S=>S.size));for(const{slice:S}of d)S.r0*=_,S.r1*=_,S.strip=S.strip.map(b=>b*_);const f=d.map(S=>S.slice),M=[...n?[n.id]:[],...f.map(S=>S.id)],E=n?1:0,y=new Float32Array(M.length*3),R=new Float32Array(M.length).fill(1);return d.forEach((S,b)=>{y.set([S.tip[0]*_,0,S.tip[1]*_],(b+E)*3),R[b+E]=.35+.65*(S.size/m)}),{ids:M,positions:y,slices:f,rings:o,scale:R}}function No(n,t){if(n.note&&n.topic)return{topic:n.topic};if(n.topic){const e=t.topics.find(i=>i.slug===n.topic)?.parent;return e&&t.topics.some(i=>i.slug===e)?{topic:e}:{}}return null}function kc(n,t,e){if(n.note)return[];const i=t.topics.filter(r=>n.topic?r.parent===n.topic:!r.parent||!t.topics.some(s=>s.slug===r.parent)).sort((r,s)=>s.tree_chars-r.tree_chars||r.title.localeCompare(s.title)).map(r=>({topic:r.slug}));return!n.topic||!e||e.slug!==n.topic?i:[...i,...Bl(e,1).ids.filter(r=>r!==e.page).map(r=>({topic:n.topic,note:r}))]}/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */const Se={LEFT:1,RIGHT:2,MIDDLE:4},$=Object.freeze({NONE:0,ROTATE:1,TRUCK:2,SCREEN_PAN:4,OFFSET:8,DOLLY:16,ZOOM:32,TOUCH_ROTATE:64,TOUCH_TRUCK:128,TOUCH_SCREEN_PAN:256,TOUCH_OFFSET:512,TOUCH_DOLLY:1024,TOUCH_ZOOM:2048,TOUCH_DOLLY_TRUCK:4096,TOUCH_DOLLY_SCREEN_PAN:8192,TOUCH_DOLLY_OFFSET:16384,TOUCH_DOLLY_ROTATE:32768,TOUCH_ZOOM_TRUCK:65536,TOUCH_ZOOM_OFFSET:131072,TOUCH_ZOOM_SCREEN_PAN:262144,TOUCH_ZOOM_ROTATE:524288}),Qi={NONE:0,IN:1,OUT:-1};function wi(n){return n.isPerspectiveCamera}function pi(n){return n.isOrthographicCamera}const Ji=Math.PI*2,zc=Math.PI/2,Kh=1e-5,Fr=Math.PI/180;function Cn(n,t,e){return Math.max(t,Math.min(e,n))}function fe(n,t=Kh){return Math.abs(n)<t}function ie(n,t,e=Kh){return fe(n-t,e)}function Bc(n,t){return Math.round(n/t)*t}function Nr(n){return isFinite(n)?n:n<0?-Number.MAX_VALUE:Number.MAX_VALUE}function kr(n){return Math.abs(n)<Number.MAX_VALUE?n:n*(1/0)}function _s(n,t,e,i,r=1/0,s){i=Math.max(1e-4,i);const o=2/i,a=o*s,l=1/(1+a+.48*a*a+.235*a*a*a);let c=n-t;const h=t,u=r*i;c=Cn(c,-u,u),t=n-c;const p=(e.value+o*c)*s;e.value=(e.value-o*p)*l;let d=t+(c+p)*l;return h-n>0==d>h&&(d=h,e.value=(d-h)/s),d}function Hc(n,t,e,i,r=1/0,s,o){i=Math.max(1e-4,i);const a=2/i,l=a*s,c=1/(1+l+.48*l*l+.235*l*l*l);let h=t.x,u=t.y,p=t.z,d=n.x-h,g=n.y-u,_=n.z-p;const m=h,f=u,M=p,E=r*i,y=E*E,R=d*d+g*g+_*_;if(R>y){const V=Math.sqrt(R);d=d/V*E,g=g/V*E,_=_/V*E}h=n.x-d,u=n.y-g,p=n.z-_;const S=(e.x+a*d)*s,b=(e.y+a*g)*s,L=(e.z+a*_)*s;e.x=(e.x-a*S)*c,e.y=(e.y-a*b)*c,e.z=(e.z-a*L)*c,o.x=h+(d+S)*c,o.y=u+(g+b)*c,o.z=p+(_+L)*c;const w=m-n.x,x=f-n.y,C=M-n.z,F=o.x-m,z=o.y-f,B=o.z-M;return w*F+x*z+C*B>0&&(o.x=m,o.y=f,o.z=M,e.x=(o.x-m)/s,e.y=(o.y-f)/s,e.z=(o.z-M)/s),o}function ko(n,t){t.set(0,0),n.forEach(e=>{t.x+=e.clientX,t.y+=e.clientY}),t.x/=n.length,t.y/=n.length}function zo(n,t){return pi(n)?(console.warn(`${t} is not supported in OrthographicCamera`),!0):!1}let Ap=class{constructor(){this._listeners={}}addEventListener(t,e){const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}removeAllEventListeners(t){if(!t){this._listeners={};return}Array.isArray(this._listeners[t])&&(this._listeners[t].length=0)}dispatchEvent(t){const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t)}}};var Bo;const Cp="2.10.1",vs=1/8,Rp=/Mac/.test((Bo=globalThis?.navigator)===null||Bo===void 0?void 0:Bo.platform);let Ot,Vc,xs,Ho,Qe,Bt,ee,tr,zr,On,Fn,Ai,Gc,Wc,gn,Br,er,Xc,Vo,qc,Go,Wo,ys;class en extends Ap{static install(t){Ot=t.THREE,Vc=Object.freeze(new Ot.Vector3(0,0,0)),xs=Object.freeze(new Ot.Vector3(0,1,0)),Ho=Object.freeze(new Ot.Vector3(0,0,1)),Qe=new Ot.Vector2,Bt=new Ot.Vector3,ee=new Ot.Vector3,tr=new Ot.Vector3,zr=new Ot.Vector3,On=new Ot.Vector3,Fn=new Ot.Vector3,Ai=new Ot.Vector3,Gc=new Ot.Vector3,Wc=new Ot.Vector3,gn=new Ot.Spherical,Br=new Ot.Spherical,er=new Ot.Box3,Xc=new Ot.Box3,Vo=new Ot.Sphere,qc=new Ot.Quaternion,Go=new Ot.Quaternion,Wo=new Ot.Matrix4,ys=new Ot.Raycaster}static get ACTION(){return $}set verticalDragToForward(t){console.warn("camera-controls: `verticalDragToForward` was removed. Use `mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.")}constructor(t,e){super(),this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.minDistance=Number.EPSILON,this.maxDistance=1/0,this.infinityDolly=!1,this.minZoom=.01,this.maxZoom=1/0,this.smoothTime=.25,this.draggingSmoothTime=.125,this.maxSpeed=1/0,this.azimuthRotateSpeed=1,this.polarRotateSpeed=1,this.dollySpeed=1,this.dollyDragInverted=!1,this.truckSpeed=2,this.dollyToCursor=!1,this.dragToOffset=!1,this.boundaryFriction=0,this.restThreshold=.01,this.colliderMeshes=[],this.cancel=()=>{},this._enabled=!0,this._state=$.NONE,this._viewport=null,this._changedDolly=0,this._changedZoom=0,this._hasRested=!0,this._boundaryEnclosesCamera=!1,this._needsUpdate=!0,this._updatedLastTime=!1,this._elementRect=new DOMRect,this._isDragging=!1,this._dragNeedsUpdate=!0,this._activePointers=[],this._lockedPointer=null,this._interactiveArea=new DOMRect(0,0,1,1),this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._isUserControllingOffset=!1,this._isUserControllingZoom=!1,this._lastDollyDirection=Qi.NONE,this._thetaVelocity={value:0},this._phiVelocity={value:0},this._radiusVelocity={value:0},this._targetVelocity=new Ot.Vector3,this._focalOffsetVelocity=new Ot.Vector3,this._zoomVelocity={value:0},this._truckInternal=(f,M,E,y)=>{let R,S;if(wi(this._camera)){const b=Bt.copy(this._camera.position).sub(this._target),L=this._camera.getEffectiveFOV()*Fr,w=b.length()*Math.tan(L*.5);R=this.truckSpeed*f*w/this._elementRect.height,S=this.truckSpeed*M*w/this._elementRect.height}else if(pi(this._camera)){const b=this._camera;R=this.truckSpeed*f*(b.right-b.left)/b.zoom/this._elementRect.width,S=this.truckSpeed*M*(b.top-b.bottom)/b.zoom/this._elementRect.height}else return;y?(E?this.setFocalOffset(this._focalOffsetEnd.x+R,this._focalOffsetEnd.y,this._focalOffsetEnd.z,!0):this.truck(R,0,!0),this.forward(-S,!0)):E?this.setFocalOffset(this._focalOffsetEnd.x+R,this._focalOffsetEnd.y+S,this._focalOffsetEnd.z,!0):this.truck(R,S,!0)},this._rotateInternal=(f,M)=>{const E=Ji*this.azimuthRotateSpeed*f/this._elementRect.height,y=Ji*this.polarRotateSpeed*M/this._elementRect.height;this.rotate(E,y,!0)},this._dollyInternal=(f,M,E)=>{const y=Math.pow(.95,-f*this.dollySpeed),R=this._sphericalEnd.radius,S=this._sphericalEnd.radius*y,b=Cn(S,this.minDistance,this.maxDistance),L=b-S;this.infinityDolly&&this.dollyToCursor?this._dollyToNoClamp(S,!0):this.infinityDolly&&!this.dollyToCursor?(this.dollyInFixed(L,!0),this._dollyToNoClamp(b,!0)):this._dollyToNoClamp(b,!0),this.dollyToCursor&&(this._changedDolly+=(this.infinityDolly?S:b)-R,this._dollyControlCoord.set(M,E)),this._lastDollyDirection=Math.sign(-f)},this._zoomInternal=(f,M,E)=>{const y=Math.pow(.95,f*this.dollySpeed),R=this._zoom,S=this._zoom*y;this.zoomTo(S,!0),this.dollyToCursor&&(this._changedZoom+=S-R,this._dollyControlCoord.set(M,E))},typeof Ot>"u"&&console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."),this._camera=t,this._yAxisUpSpace=new Ot.Quaternion().setFromUnitVectors(this._camera.up,xs),this._yAxisUpSpaceInverse=this._yAxisUpSpace.clone().invert(),this._state=$.NONE,this._target=new Ot.Vector3,this._targetEnd=this._target.clone(),this._focalOffset=new Ot.Vector3,this._focalOffsetEnd=this._focalOffset.clone(),this._spherical=new Ot.Spherical().setFromVector3(Bt.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)),this._sphericalEnd=this._spherical.clone(),this._lastDistance=this._spherical.radius,this._zoom=this._camera.zoom,this._zoomEnd=this._zoom,this._lastZoom=this._zoom,this._nearPlaneCorners=[new Ot.Vector3,new Ot.Vector3,new Ot.Vector3,new Ot.Vector3],this._updateNearPlaneCorners(),this._boundary=new Ot.Box3(new Ot.Vector3(-1/0,-1/0,-1/0),new Ot.Vector3(1/0,1/0,1/0)),this._cameraUp0=this._camera.up.clone(),this._target0=this._target.clone(),this._position0=this._camera.position.clone(),this._zoom0=this._zoom,this._focalOffset0=this._focalOffset.clone(),this._dollyControlCoord=new Ot.Vector2,this.mouseButtons={left:$.ROTATE,middle:$.DOLLY,right:$.TRUCK,wheel:wi(this._camera)?$.DOLLY:pi(this._camera)?$.ZOOM:$.NONE},this.touches={one:$.TOUCH_ROTATE,two:wi(this._camera)?$.TOUCH_DOLLY_TRUCK:pi(this._camera)?$.TOUCH_ZOOM_TRUCK:$.NONE,three:$.TOUCH_TRUCK};const i=new Ot.Vector2,r=new Ot.Vector2,s=new Ot.Vector2,o=f=>{if(!this._enabled||!this._domElement)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const y=this._domElement.getBoundingClientRect(),R=f.clientX/y.width,S=f.clientY/y.height;if(R<this._interactiveArea.left||R>this._interactiveArea.right||S<this._interactiveArea.top||S>this._interactiveArea.bottom)return}const M=f.pointerType!=="mouse"?null:(f.buttons&Se.LEFT)===Se.LEFT?Se.LEFT:(f.buttons&Se.MIDDLE)===Se.MIDDLE?Se.MIDDLE:(f.buttons&Se.RIGHT)===Se.RIGHT?Se.RIGHT:null;if(M!==null){const y=this._findPointerByMouseButton(M);y&&this._disposePointer(y)}if((f.buttons&Se.LEFT)===Se.LEFT&&this._lockedPointer)return;const E={pointerId:f.pointerId,clientX:f.clientX,clientY:f.clientY,deltaX:0,deltaY:0,mouseButton:M};this._activePointers.push(E),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),this._isDragging=!0,p(f)},a=f=>{f.cancelable&&f.preventDefault();const M=f.pointerId,E=this._lockedPointer||this._findPointerById(M);if(E){if(E.clientX=f.clientX,E.clientY=f.clientY,E.deltaX=f.movementX,E.deltaY=f.movementY,this._state=0,f.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else(!this._isDragging&&this._lockedPointer||this._isDragging&&(f.buttons&Se.LEFT)===Se.LEFT)&&(this._state=this._state|this.mouseButtons.left),this._isDragging&&(f.buttons&Se.MIDDLE)===Se.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),this._isDragging&&(f.buttons&Se.RIGHT)===Se.RIGHT&&(this._state=this._state|this.mouseButtons.right);d()}},l=f=>{const M=this._findPointerById(f.pointerId);if(!(M&&M===this._lockedPointer)){if(M&&this._disposePointer(M),f.pointerType==="touch")switch(this._activePointers.length){case 0:this._state=$.NONE;break;case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else this._state=$.NONE;g()}};let c=-1;const h=f=>{if(!this._domElement||!this._enabled||this.mouseButtons.wheel===$.NONE)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const S=this._domElement.getBoundingClientRect(),b=f.clientX/S.width,L=f.clientY/S.height;if(b<this._interactiveArea.left||b>this._interactiveArea.right||L<this._interactiveArea.top||L>this._interactiveArea.bottom)return}if(f.preventDefault(),this.dollyToCursor||this.mouseButtons.wheel===$.ROTATE||this.mouseButtons.wheel===$.TRUCK){const S=performance.now();c-S<1e3&&this._getClientRect(this._elementRect),c=S}const M=Rp?-1:-3,E=f.deltaMode===1||f.ctrlKey?f.deltaY/M:f.deltaY/(M*10),y=this.dollyToCursor?(f.clientX-this._elementRect.x)/this._elementRect.width*2-1:0,R=this.dollyToCursor?(f.clientY-this._elementRect.y)/this._elementRect.height*-2+1:0;switch(this.mouseButtons.wheel){case $.ROTATE:{this._rotateInternal(f.deltaX,f.deltaY),this._isUserControllingRotate=!0;break}case $.TRUCK:{this._truckInternal(f.deltaX,f.deltaY,!1,!1),this._isUserControllingTruck=!0;break}case $.SCREEN_PAN:{this._truckInternal(f.deltaX,f.deltaY,!1,!0),this._isUserControllingTruck=!0;break}case $.OFFSET:{this._truckInternal(f.deltaX,f.deltaY,!0,!1),this._isUserControllingOffset=!0;break}case $.DOLLY:{this._dollyInternal(-E,y,R),this._isUserControllingDolly=!0;break}case $.ZOOM:{this._zoomInternal(-E,y,R),this._isUserControllingZoom=!0;break}}this.dispatchEvent({type:"control"})},u=f=>{if(!(!this._domElement||!this._enabled)){if(this.mouseButtons.right===en.ACTION.NONE){const M=f instanceof PointerEvent?f.pointerId:0,E=this._findPointerById(M);E&&this._disposePointer(E),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l);return}f.preventDefault()}},p=f=>{if(!this._enabled)return;if(ko(this._activePointers,Qe),this._getClientRect(this._elementRect),i.copy(Qe),r.copy(Qe),this._activePointers.length>=2){const E=Qe.x-this._activePointers[1].clientX,y=Qe.y-this._activePointers[1].clientY,R=Math.sqrt(E*E+y*y);s.set(0,R);const S=(this._activePointers[0].clientX+this._activePointers[1].clientX)*.5,b=(this._activePointers[0].clientY+this._activePointers[1].clientY)*.5;r.set(S,b)}if(this._state=0,!f)this._lockedPointer&&(this._state=this._state|this.mouseButtons.left);else if("pointerType"in f&&f.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else!this._lockedPointer&&(f.buttons&Se.LEFT)===Se.LEFT&&(this._state=this._state|this.mouseButtons.left),(f.buttons&Se.MIDDLE)===Se.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),(f.buttons&Se.RIGHT)===Se.RIGHT&&(this._state=this._state|this.mouseButtons.right);((this._state&$.ROTATE)===$.ROTATE||(this._state&$.TOUCH_ROTATE)===$.TOUCH_ROTATE||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE)&&(this._sphericalEnd.theta=this._spherical.theta,this._sphericalEnd.phi=this._spherical.phi,this._thetaVelocity.value=0,this._phiVelocity.value=0),((this._state&$.TRUCK)===$.TRUCK||(this._state&$.SCREEN_PAN)===$.SCREEN_PAN||(this._state&$.TOUCH_TRUCK)===$.TOUCH_TRUCK||(this._state&$.TOUCH_SCREEN_PAN)===$.TOUCH_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN)&&(this._targetEnd.copy(this._target),this._targetVelocity.set(0,0,0)),((this._state&$.DOLLY)===$.DOLLY||(this._state&$.TOUCH_DOLLY)===$.TOUCH_DOLLY||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE)&&(this._sphericalEnd.radius=this._spherical.radius,this._radiusVelocity.value=0),((this._state&$.ZOOM)===$.ZOOM||(this._state&$.TOUCH_ZOOM)===$.TOUCH_ZOOM||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_ZOOM_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE)&&(this._zoomEnd=this._zoom,this._zoomVelocity.value=0),((this._state&$.OFFSET)===$.OFFSET||(this._state&$.TOUCH_OFFSET)===$.TOUCH_OFFSET||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET)&&(this._focalOffsetEnd.copy(this._focalOffset),this._focalOffsetVelocity.set(0,0,0)),this.dispatchEvent({type:"controlstart"})},d=()=>{if(!this._enabled||!this._dragNeedsUpdate)return;this._dragNeedsUpdate=!1,ko(this._activePointers,Qe);const M=this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement?this._lockedPointer||this._activePointers[0]:null,E=M?-M.deltaX:r.x-Qe.x,y=M?-M.deltaY:r.y-Qe.y;if(r.copy(Qe),((this._state&$.ROTATE)===$.ROTATE||(this._state&$.TOUCH_ROTATE)===$.TOUCH_ROTATE||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE)&&(this._rotateInternal(E,y),this._isUserControllingRotate=!0),(this._state&$.DOLLY)===$.DOLLY||(this._state&$.ZOOM)===$.ZOOM){const R=this.dollyToCursor?(i.x-this._elementRect.x)/this._elementRect.width*2-1:0,S=this.dollyToCursor?(i.y-this._elementRect.y)/this._elementRect.height*-2+1:0,b=this.dollyDragInverted?-1:1;(this._state&$.DOLLY)===$.DOLLY?(this._dollyInternal(b*y*vs,R,S),this._isUserControllingDolly=!0):(this._zoomInternal(b*y*vs,R,S),this._isUserControllingZoom=!0)}if((this._state&$.TOUCH_DOLLY)===$.TOUCH_DOLLY||(this._state&$.TOUCH_ZOOM)===$.TOUCH_ZOOM||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_ZOOM_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_ZOOM_ROTATE)===$.TOUCH_ZOOM_ROTATE){const R=Qe.x-this._activePointers[1].clientX,S=Qe.y-this._activePointers[1].clientY,b=Math.sqrt(R*R+S*S),L=s.y-b;s.set(0,b);const w=this.dollyToCursor?(r.x-this._elementRect.x)/this._elementRect.width*2-1:0,x=this.dollyToCursor?(r.y-this._elementRect.y)/this._elementRect.height*-2+1:0;(this._state&$.TOUCH_DOLLY)===$.TOUCH_DOLLY||(this._state&$.TOUCH_DOLLY_ROTATE)===$.TOUCH_DOLLY_ROTATE||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET?(this._dollyInternal(L*vs,w,x),this._isUserControllingDolly=!0):(this._zoomInternal(L*vs,w,x),this._isUserControllingZoom=!0)}((this._state&$.TRUCK)===$.TRUCK||(this._state&$.TOUCH_TRUCK)===$.TOUCH_TRUCK||(this._state&$.TOUCH_DOLLY_TRUCK)===$.TOUCH_DOLLY_TRUCK||(this._state&$.TOUCH_ZOOM_TRUCK)===$.TOUCH_ZOOM_TRUCK)&&(this._truckInternal(E,y,!1,!1),this._isUserControllingTruck=!0),((this._state&$.SCREEN_PAN)===$.SCREEN_PAN||(this._state&$.TOUCH_SCREEN_PAN)===$.TOUCH_SCREEN_PAN||(this._state&$.TOUCH_DOLLY_SCREEN_PAN)===$.TOUCH_DOLLY_SCREEN_PAN||(this._state&$.TOUCH_ZOOM_SCREEN_PAN)===$.TOUCH_ZOOM_SCREEN_PAN)&&(this._truckInternal(E,y,!1,!0),this._isUserControllingTruck=!0),((this._state&$.OFFSET)===$.OFFSET||(this._state&$.TOUCH_OFFSET)===$.TOUCH_OFFSET||(this._state&$.TOUCH_DOLLY_OFFSET)===$.TOUCH_DOLLY_OFFSET||(this._state&$.TOUCH_ZOOM_OFFSET)===$.TOUCH_ZOOM_OFFSET)&&(this._truckInternal(E,y,!0,!1),this._isUserControllingOffset=!0),this.dispatchEvent({type:"control"})},g=()=>{ko(this._activePointers,Qe),r.copy(Qe),this._dragNeedsUpdate=!1,(this._activePointers.length===0||this._activePointers.length===1&&this._activePointers[0]===this._lockedPointer)&&(this._isDragging=!1),this._activePointers.length===0&&this._domElement&&(this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this.dispatchEvent({type:"controlend"}))};this.lockPointer=()=>{!this._enabled||!this._domElement||(this.cancel(),this._lockedPointer={pointerId:-1,clientX:0,clientY:0,deltaX:0,deltaY:0,mouseButton:null},this._activePointers.push(this._lockedPointer),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.requestPointerLock(),this._domElement.ownerDocument.addEventListener("pointerlockchange",_),this._domElement.ownerDocument.addEventListener("pointerlockerror",m),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),p())},this.unlockPointer=()=>{var f,M,E;this._lockedPointer!==null&&(this._disposePointer(this._lockedPointer),this._lockedPointer=null),(f=this._domElement)===null||f===void 0||f.ownerDocument.exitPointerLock(),(M=this._domElement)===null||M===void 0||M.ownerDocument.removeEventListener("pointerlockchange",_),(E=this._domElement)===null||E===void 0||E.ownerDocument.removeEventListener("pointerlockerror",m),this.cancel()};const _=()=>{this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement||this.unlockPointer()},m=()=>{this.unlockPointer()};this._addAllEventListeners=f=>{this._domElement=f,this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none",this._domElement.addEventListener("pointerdown",o),this._domElement.addEventListener("pointercancel",l),this._domElement.addEventListener("wheel",h,{passive:!1}),this._domElement.addEventListener("contextmenu",u)},this._removeAllEventListeners=()=>{this._domElement&&(this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect="",this._domElement.removeEventListener("pointerdown",o),this._domElement.removeEventListener("pointercancel",l),this._domElement.removeEventListener("wheel",h,{passive:!1}),this._domElement.removeEventListener("contextmenu",u),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.removeEventListener("pointerlockchange",_),this._domElement.ownerDocument.removeEventListener("pointerlockerror",m))},this.cancel=()=>{this._state!==$.NONE&&(this._state=$.NONE,this._activePointers.length=0,g())},e&&this.connect(e),this.update(0)}get camera(){return this._camera}set camera(t){this._camera=t,this.updateCameraUp(),this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0}get enabled(){return this._enabled}set enabled(t){this._enabled=t,this._domElement&&(t?(this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none"):(this.cancel(),this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect=""))}get active(){return!this._hasRested}get currentAction(){return this._state}get distance(){return this._spherical.radius}set distance(t){this._spherical.radius===t&&this._sphericalEnd.radius===t||(this._spherical.radius=t,this._sphericalEnd.radius=t,this._needsUpdate=!0)}get azimuthAngle(){return this._spherical.theta}set azimuthAngle(t){this._spherical.theta===t&&this._sphericalEnd.theta===t||(this._spherical.theta=t,this._sphericalEnd.theta=t,this._needsUpdate=!0)}get polarAngle(){return this._spherical.phi}set polarAngle(t){this._spherical.phi===t&&this._sphericalEnd.phi===t||(this._spherical.phi=t,this._sphericalEnd.phi=t,this._needsUpdate=!0)}get boundaryEnclosesCamera(){return this._boundaryEnclosesCamera}set boundaryEnclosesCamera(t){this._boundaryEnclosesCamera=t,this._needsUpdate=!0}set interactiveArea(t){this._interactiveArea.width=Cn(t.width,0,1),this._interactiveArea.height=Cn(t.height,0,1),this._interactiveArea.x=Cn(t.x,0,1-this._interactiveArea.width),this._interactiveArea.y=Cn(t.y,0,1-this._interactiveArea.height)}addEventListener(t,e){super.addEventListener(t,e)}removeEventListener(t,e){super.removeEventListener(t,e)}rotate(t,e,i=!1){return this.rotateTo(this._sphericalEnd.theta+t,this._sphericalEnd.phi+e,i)}rotateAzimuthTo(t,e=!1){return this.rotateTo(t,this._sphericalEnd.phi,e)}rotatePolarTo(t,e=!1){return this.rotateTo(this._sphericalEnd.theta,t,e)}rotateTo(t,e,i=!1){this._isUserControllingRotate=!1;const r=Cn(t,this.minAzimuthAngle,this.maxAzimuthAngle),s=Cn(e,this.minPolarAngle,this.maxPolarAngle);this._sphericalEnd.theta=r,this._sphericalEnd.phi=s,this._sphericalEnd.makeSafe(),this._needsUpdate=!0,i||(this._spherical.theta=this._sphericalEnd.theta,this._spherical.phi=this._sphericalEnd.phi);const o=!i||ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold);return this._createOnRestPromise(o)}dolly(t,e=!1){return this.dollyTo(this._sphericalEnd.radius-t,e)}dollyTo(t,e=!1){return this._isUserControllingDolly=!1,this._lastDollyDirection=Qi.NONE,this._changedDolly=0,this._dollyToNoClamp(Cn(t,this.minDistance,this.maxDistance),e)}_dollyToNoClamp(t,e=!1){const i=this._sphericalEnd.radius;if(this.colliderMeshes.length>=1){const o=this._collisionTest(),a=ie(o,this._spherical.radius);if(!(i>t)&&a)return Promise.resolve();this._sphericalEnd.radius=Math.min(t,o)}else this._sphericalEnd.radius=t;this._needsUpdate=!0,e||(this._spherical.radius=this._sphericalEnd.radius);const s=!e||ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(s)}dollyInFixed(t,e=!1){this._targetEnd.add(this._getCameraDirection(zr).multiplyScalar(t)),e||this._target.copy(this._targetEnd);const i=!e||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(i)}zoom(t,e=!1){return this.zoomTo(this._zoomEnd+t,e)}zoomTo(t,e=!1){this._isUserControllingZoom=!1,this._zoomEnd=Cn(t,this.minZoom,this.maxZoom),this._needsUpdate=!0,e||(this._zoom=this._zoomEnd);const i=!e||ie(this._zoom,this._zoomEnd,this.restThreshold);return this._changedZoom=0,this._createOnRestPromise(i)}pan(t,e,i=!1){return console.warn("`pan` has been renamed to `truck`"),this.truck(t,e,i)}truck(t,e,i=!1){this._camera.updateMatrix(),On.setFromMatrixColumn(this._camera.matrix,0),Fn.setFromMatrixColumn(this._camera.matrix,1),On.multiplyScalar(t),Fn.multiplyScalar(-e);const r=Bt.copy(On).add(Fn),s=ee.copy(this._targetEnd).add(r);return this.moveTo(s.x,s.y,s.z,i)}forward(t,e=!1){Bt.setFromMatrixColumn(this._camera.matrix,0),Bt.crossVectors(this._camera.up,Bt),Bt.multiplyScalar(t);const i=ee.copy(this._targetEnd).add(Bt);return this.moveTo(i.x,i.y,i.z,e)}elevate(t,e=!1){return Bt.copy(this._camera.up).multiplyScalar(t),this.moveTo(this._targetEnd.x+Bt.x,this._targetEnd.y+Bt.y,this._targetEnd.z+Bt.z,e)}moveTo(t,e,i,r=!1){this._isUserControllingTruck=!1;const s=Bt.set(t,e,i).sub(this._targetEnd);this._encloseToBoundary(this._targetEnd,s,this.boundaryFriction),this._needsUpdate=!0,r||this._target.copy(this._targetEnd);const o=!r||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(o)}lookInDirectionOf(t,e,i,r=!1){const a=Bt.set(t,e,i).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);return this.setPosition(a.x,a.y,a.z,r)}fitToBox(t,e,{cover:i=!1,paddingLeft:r=0,paddingRight:s=0,paddingBottom:o=0,paddingTop:a=0}={}){const l=[],c=t.isBox3?er.copy(t):er.setFromObject(t);c.isEmpty()&&(console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"),Promise.resolve());const h=Bc(this._sphericalEnd.theta,zc),u=Bc(this._sphericalEnd.phi,zc);l.push(this.rotateTo(h,u,e));const p=Bt.setFromSpherical(this._sphericalEnd).normalize(),d=qc.setFromUnitVectors(p,Ho),g=ie(Math.abs(p.y),1);g&&d.multiply(Go.setFromAxisAngle(xs,h)),d.multiply(this._yAxisUpSpaceInverse);const _=Xc.makeEmpty();ee.copy(c.min).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setX(c.max.x).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setY(c.max.y).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setZ(c.min.z).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setZ(c.max.z).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setY(c.min.y).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setX(c.min.x).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).applyQuaternion(d),_.expandByPoint(ee),_.min.x-=r,_.min.y-=o,_.max.x+=s,_.max.y+=a,d.setFromUnitVectors(Ho,p),g&&d.premultiply(Go.invert()),d.premultiply(this._yAxisUpSpace);const m=_.getSize(Bt),f=_.getCenter(ee).applyQuaternion(d);if(wi(this._camera)){const M=this.getDistanceToFitBox(m.x,m.y,m.z,i);l.push(this.moveTo(f.x,f.y,f.z,e)),l.push(this.dollyTo(M,e)),l.push(this.setFocalOffset(0,0,0,e))}else if(pi(this._camera)){const M=this._camera,E=M.right-M.left,y=M.top-M.bottom,R=i?Math.max(E/m.x,y/m.y):Math.min(E/m.x,y/m.y);l.push(this.moveTo(f.x,f.y,f.z,e)),l.push(this.zoomTo(R,e)),l.push(this.setFocalOffset(0,0,0,e))}return Promise.all(l)}fitToSphere(t,e){const i=[],s="isObject3D"in t?en.createBoundingSphere(t,Vo):Vo.copy(t);if(i.push(this.moveTo(s.center.x,s.center.y,s.center.z,e)),wi(this._camera)){const o=this.getDistanceToFitSphere(s.radius);i.push(this.dollyTo(o,e))}else if(pi(this._camera)){const o=this._camera.right-this._camera.left,a=this._camera.top-this._camera.bottom,l=2*s.radius,c=Math.min(o/l,a/l);i.push(this.zoomTo(c,e))}return i.push(this.setFocalOffset(0,0,0,e)),Promise.all(i)}setLookAt(t,e,i,r,s,o,a=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=Qi.NONE,this._changedDolly=0;const l=ee.set(r,s,o),c=Bt.set(t,e,i);this._targetEnd.copy(l),this._sphericalEnd.setFromVector3(c.sub(l).applyQuaternion(this._yAxisUpSpace)),this.normalizeRotations(),this._needsUpdate=!0,a||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const h=!a||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(h)}lerpLookAt(t,e,i,r,s,o,a,l,c,h,u,p,d,g=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=Qi.NONE,this._changedDolly=0;const _=Bt.set(r,s,o),m=ee.set(t,e,i);gn.setFromVector3(m.sub(_).applyQuaternion(this._yAxisUpSpace));const f=tr.set(h,u,p),M=ee.set(a,l,c);Br.setFromVector3(M.sub(f).applyQuaternion(this._yAxisUpSpace)),this._targetEnd.copy(_.lerp(f,d));const E=Br.theta-gn.theta,y=Br.phi-gn.phi,R=Br.radius-gn.radius;this._sphericalEnd.set(gn.radius+R*d,gn.phi+y*d,gn.theta+E*d),this.normalizeRotations(),this._needsUpdate=!0,g||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const S=!g||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(S)}setPosition(t,e,i,r=!1){return this.setLookAt(t,e,i,this._targetEnd.x,this._targetEnd.y,this._targetEnd.z,r)}setTarget(t,e,i,r=!1){const s=this.getPosition(Bt),o=this.setLookAt(s.x,s.y,s.z,t,e,i,r);return this._sphericalEnd.phi=Cn(this._sphericalEnd.phi,this.minPolarAngle,this.maxPolarAngle),o}setFocalOffset(t,e,i,r=!1){this._isUserControllingOffset=!1,this._focalOffsetEnd.set(t,e,i),this._needsUpdate=!0,r||this._focalOffset.copy(this._focalOffsetEnd);const s=!r||ie(this._focalOffset.x,this._focalOffsetEnd.x,this.restThreshold)&&ie(this._focalOffset.y,this._focalOffsetEnd.y,this.restThreshold)&&ie(this._focalOffset.z,this._focalOffsetEnd.z,this.restThreshold);return this._createOnRestPromise(s)}setOrbitPoint(t,e,i){this._camera.updateMatrixWorld(),On.setFromMatrixColumn(this._camera.matrixWorldInverse,0),Fn.setFromMatrixColumn(this._camera.matrixWorldInverse,1),Ai.setFromMatrixColumn(this._camera.matrixWorldInverse,2);const r=Bt.set(t,e,i),s=r.distanceTo(this._camera.position),o=r.sub(this._camera.position);On.multiplyScalar(o.x),Fn.multiplyScalar(o.y),Ai.multiplyScalar(o.z),Bt.copy(On).add(Fn).add(Ai),Bt.z=Bt.z+s,this.dollyTo(s,!1),this.setFocalOffset(-Bt.x,Bt.y,-Bt.z,!1),this.moveTo(t,e,i,!1)}setBoundary(t){if(!t){this._boundary.min.set(-1/0,-1/0,-1/0),this._boundary.max.set(1/0,1/0,1/0),this._needsUpdate=!0;return}this._boundary.copy(t),this._boundary.clampPoint(this._targetEnd,this._targetEnd),this._needsUpdate=!0}setViewport(t,e,i,r){if(t===null){this._viewport=null;return}this._viewport=this._viewport||new Ot.Vector4,typeof t=="number"?this._viewport.set(t,e,i,r):this._viewport.copy(t)}getDistanceToFitBox(t,e,i,r=!1){if(zo(this._camera,"getDistanceToFitBox"))return this._spherical.radius;const s=t/e,o=this._camera.getEffectiveFOV()*Fr,a=this._camera.aspect;return((r?s>a:s<a)?e:t/a)*.5/Math.tan(o*.5)+i*.5}getDistanceToFitSphere(t){if(zo(this._camera,"getDistanceToFitSphere"))return this._spherical.radius;const e=this._camera.getEffectiveFOV()*Fr,i=Math.atan(Math.tan(e*.5)*this._camera.aspect)*2,r=1<this._camera.aspect?e:i;return t/Math.sin(r*.5)}getTarget(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._targetEnd:this._target)}getPosition(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).setFromSpherical(e?this._sphericalEnd:this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(e?this._targetEnd:this._target)}getSpherical(t,e=!0){return(t||new Ot.Spherical).copy(e?this._sphericalEnd:this._spherical)}getFocalOffset(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._focalOffsetEnd:this._focalOffset)}normalizeRotations(){this._sphericalEnd.theta=this._sphericalEnd.theta%Ji,this._sphericalEnd.theta<0&&(this._sphericalEnd.theta+=Ji),this._spherical.theta+=Ji*Math.round((this._sphericalEnd.theta-this._spherical.theta)/Ji)}stop(){this._focalOffset.copy(this._focalOffsetEnd),this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd),this._zoom=this._zoomEnd}reset(t=!1){if(!ie(this._camera.up.x,this._cameraUp0.x)||!ie(this._camera.up.y,this._cameraUp0.y)||!ie(this._camera.up.z,this._cameraUp0.z)){this._camera.up.copy(this._cameraUp0);const i=this.getPosition(Bt);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}const e=[this.setLookAt(this._position0.x,this._position0.y,this._position0.z,this._target0.x,this._target0.y,this._target0.z,t),this.setFocalOffset(this._focalOffset0.x,this._focalOffset0.y,this._focalOffset0.z,t),this.zoomTo(this._zoom0,t)];return Promise.all(e)}saveState(){this._cameraUp0.copy(this._camera.up),this.getTarget(this._target0),this.getPosition(this._position0),this._zoom0=this._zoom,this._focalOffset0.copy(this._focalOffset)}updateCameraUp(){this._yAxisUpSpace.setFromUnitVectors(this._camera.up,xs),this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert()}applyCameraUp(){const t=Bt.subVectors(this._target,this._camera.position).normalize(),e=ee.crossVectors(t,this._camera.up);this._camera.up.crossVectors(e,t).normalize(),this._camera.updateMatrixWorld();const i=this.getPosition(Bt);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}update(t){const e=this._sphericalEnd.theta-this._spherical.theta,i=this._sphericalEnd.phi-this._spherical.phi,r=this._sphericalEnd.radius-this._spherical.radius,s=Gc.subVectors(this._targetEnd,this._target),o=Wc.subVectors(this._focalOffsetEnd,this._focalOffset),a=this._zoomEnd-this._zoom;if(fe(e))this._thetaVelocity.value=0,this._spherical.theta=this._sphericalEnd.theta;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.theta=_s(this._spherical.theta,this._sphericalEnd.theta,this._thetaVelocity,u,1/0,t),this._needsUpdate=!0}if(fe(i))this._phiVelocity.value=0,this._spherical.phi=this._sphericalEnd.phi;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.phi=_s(this._spherical.phi,this._sphericalEnd.phi,this._phiVelocity,u,1/0,t),this._needsUpdate=!0}if(fe(r))this._radiusVelocity.value=0,this._spherical.radius=this._sphericalEnd.radius;else{const u=this._isUserControllingDolly?this.draggingSmoothTime:this.smoothTime;this._spherical.radius=_s(this._spherical.radius,this._sphericalEnd.radius,this._radiusVelocity,u,this.maxSpeed,t),this._needsUpdate=!0}if(fe(s.x)&&fe(s.y)&&fe(s.z))this._targetVelocity.set(0,0,0),this._target.copy(this._targetEnd);else{const u=this._isUserControllingTruck?this.draggingSmoothTime:this.smoothTime;Hc(this._target,this._targetEnd,this._targetVelocity,u,this.maxSpeed,t,this._target),this._needsUpdate=!0}if(fe(o.x)&&fe(o.y)&&fe(o.z))this._focalOffsetVelocity.set(0,0,0),this._focalOffset.copy(this._focalOffsetEnd);else{const u=this._isUserControllingOffset?this.draggingSmoothTime:this.smoothTime;Hc(this._focalOffset,this._focalOffsetEnd,this._focalOffsetVelocity,u,this.maxSpeed,t,this._focalOffset),this._needsUpdate=!0}if(fe(a))this._zoomVelocity.value=0,this._zoom=this._zoomEnd;else{const u=this._isUserControllingZoom?this.draggingSmoothTime:this.smoothTime;this._zoom=_s(this._zoom,this._zoomEnd,this._zoomVelocity,u,1/0,t)}if(this.dollyToCursor){if(wi(this._camera)&&this._changedDolly!==0){const u=this._spherical.radius-this._lastDistance,p=this._camera,d=this._getCameraDirection(zr),g=Bt.copy(d).cross(p.up).normalize();g.lengthSq()===0&&(g.x=1);const _=ee.crossVectors(g,d),m=this._sphericalEnd.radius*Math.tan(p.getEffectiveFOV()*Fr*.5),M=(this._sphericalEnd.radius-u-this._sphericalEnd.radius)/this._sphericalEnd.radius,E=tr.copy(this._targetEnd).add(g.multiplyScalar(this._dollyControlCoord.x*m*p.aspect)).add(_.multiplyScalar(this._dollyControlCoord.y*m)),y=Bt.copy(this._targetEnd).lerp(E,M),R=this._lastDollyDirection===Qi.IN&&this._spherical.radius<=this.minDistance,S=this._lastDollyDirection===Qi.OUT&&this.maxDistance<=this._spherical.radius;if(this.infinityDolly&&(R||S)){this._sphericalEnd.radius-=u,this._spherical.radius-=u;const L=ee.copy(d).multiplyScalar(-u);y.add(L)}this._boundary.clampPoint(y,y);const b=ee.subVectors(y,this._targetEnd);this._targetEnd.copy(y),this._target.add(b),this._changedDolly-=u,fe(this._changedDolly)&&(this._changedDolly=0)}else if(pi(this._camera)&&this._changedZoom!==0){const u=this._zoom-this._lastZoom,p=this._camera,d=Bt.set(this._dollyControlCoord.x,this._dollyControlCoord.y,(p.near+p.far)/(p.near-p.far)).unproject(p),g=ee.set(0,0,-1).applyQuaternion(p.quaternion),_=tr.copy(d).add(g.multiplyScalar(-d.dot(p.up))),f=-(this._zoom-u-this._zoom)/this._zoom,M=this._getCameraDirection(zr),E=this._targetEnd.dot(M),y=Bt.copy(this._targetEnd).lerp(_,f),R=y.dot(M),S=M.multiplyScalar(R-E);y.sub(S),this._boundary.clampPoint(y,y);const b=ee.subVectors(y,this._targetEnd);this._targetEnd.copy(y),this._target.add(b),this._changedZoom-=u,fe(this._changedZoom)&&(this._changedZoom=0)}}this._camera.zoom!==this._zoom&&(this._camera.zoom=this._zoom,this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0),this._dragNeedsUpdate=!0;const l=this._collisionTest();this._spherical.radius=Math.min(this._spherical.radius,l),this._spherical.makeSafe(),this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target),this._camera.lookAt(this._target),(!fe(this._focalOffset.x)||!fe(this._focalOffset.y)||!fe(this._focalOffset.z))&&(On.setFromMatrixColumn(this._camera.matrix,0),Fn.setFromMatrixColumn(this._camera.matrix,1),Ai.setFromMatrixColumn(this._camera.matrix,2),On.multiplyScalar(this._focalOffset.x),Fn.multiplyScalar(-this._focalOffset.y),Ai.multiplyScalar(this._focalOffset.z),Bt.copy(On).add(Fn).add(Ai),this._camera.position.add(Bt),this._camera.updateMatrixWorld()),this._boundaryEnclosesCamera&&this._encloseToBoundary(this._camera.position.copy(this._target),Bt.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse),1);const h=this._needsUpdate;return h&&!this._updatedLastTime?(this._hasRested=!1,this.dispatchEvent({type:"wake"}),this.dispatchEvent({type:"update"})):h?(this.dispatchEvent({type:"update"}),fe(e,this.restThreshold)&&fe(i,this.restThreshold)&&fe(r,this.restThreshold)&&fe(s.x,this.restThreshold)&&fe(s.y,this.restThreshold)&&fe(s.z,this.restThreshold)&&fe(o.x,this.restThreshold)&&fe(o.y,this.restThreshold)&&fe(o.z,this.restThreshold)&&fe(a,this.restThreshold)&&!this._hasRested&&(this._hasRested=!0,this.dispatchEvent({type:"rest"}))):!h&&this._updatedLastTime&&this.dispatchEvent({type:"sleep"}),this._lastDistance=this._spherical.radius,this._lastZoom=this._zoom,this._updatedLastTime=h,this._needsUpdate=!1,h}toJSON(){return JSON.stringify({enabled:this._enabled,minDistance:this.minDistance,maxDistance:Nr(this.maxDistance),minZoom:this.minZoom,maxZoom:Nr(this.maxZoom),minPolarAngle:this.minPolarAngle,maxPolarAngle:Nr(this.maxPolarAngle),minAzimuthAngle:Nr(this.minAzimuthAngle),maxAzimuthAngle:Nr(this.maxAzimuthAngle),smoothTime:this.smoothTime,draggingSmoothTime:this.draggingSmoothTime,dollySpeed:this.dollySpeed,truckSpeed:this.truckSpeed,dollyToCursor:this.dollyToCursor,target:this._targetEnd.toArray(),position:Bt.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),zoom:this._zoomEnd,focalOffset:this._focalOffsetEnd.toArray(),target0:this._target0.toArray(),position0:this._position0.toArray(),zoom0:this._zoom0,focalOffset0:this._focalOffset0.toArray()})}fromJSON(t,e=!1){const i=JSON.parse(t);this.enabled=i.enabled,this.minDistance=i.minDistance,this.maxDistance=kr(i.maxDistance),this.minZoom=i.minZoom,this.maxZoom=kr(i.maxZoom),this.minPolarAngle=i.minPolarAngle,this.maxPolarAngle=kr(i.maxPolarAngle),this.minAzimuthAngle=kr(i.minAzimuthAngle),this.maxAzimuthAngle=kr(i.maxAzimuthAngle),this.smoothTime=i.smoothTime,this.draggingSmoothTime=i.draggingSmoothTime,this.dollySpeed=i.dollySpeed,this.truckSpeed=i.truckSpeed,this.dollyToCursor=i.dollyToCursor,this._target0.fromArray(i.target0),this._position0.fromArray(i.position0),this._zoom0=i.zoom0,this._focalOffset0.fromArray(i.focalOffset0),this.moveTo(i.target[0],i.target[1],i.target[2],e),gn.setFromVector3(Bt.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)),this.rotateTo(gn.theta,gn.phi,e),this.dollyTo(gn.radius,e),this.zoomTo(i.zoom,e),this.setFocalOffset(i.focalOffset[0],i.focalOffset[1],i.focalOffset[2],e),this._needsUpdate=!0}connect(t){if(this._domElement){console.warn("camera-controls is already connected.");return}t.setAttribute("data-camera-controls-version",Cp),this._addAllEventListeners(t),this._getClientRect(this._elementRect)}disconnect(){this.cancel(),this._removeAllEventListeners(),this._domElement&&(this._domElement.removeAttribute("data-camera-controls-version"),this._domElement=void 0)}dispose(){this.removeAllEventListeners(),this.disconnect()}_getTargetDirection(t){return t.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse)}_getCameraDirection(t){return this._getTargetDirection(t).negate()}_findPointerById(t){return this._activePointers.find(e=>e.pointerId===t)}_findPointerByMouseButton(t){return this._activePointers.find(e=>e.mouseButton===t)}_disposePointer(t){this._activePointers.splice(this._activePointers.indexOf(t),1)}_encloseToBoundary(t,e,i){const r=e.lengthSq();if(r===0)return t;const s=ee.copy(e).add(t),a=this._boundary.clampPoint(s,tr).sub(s),l=a.lengthSq();if(l===0)return t.add(e);if(l===r)return t;if(i===0)return t.add(e).add(a);{const c=1+i*l/e.dot(a);return t.add(ee.copy(e).multiplyScalar(c)).add(a.multiplyScalar(1-i))}}_updateNearPlaneCorners(){if(wi(this._camera)){const t=this._camera,e=t.near,i=t.getEffectiveFOV()*Fr,r=Math.tan(i*.5)*e,s=r*t.aspect;this._nearPlaneCorners[0].set(-s,-r,0),this._nearPlaneCorners[1].set(s,-r,0),this._nearPlaneCorners[2].set(s,r,0),this._nearPlaneCorners[3].set(-s,r,0)}else if(pi(this._camera)){const t=this._camera,e=1/t.zoom,i=t.left*e,r=t.right*e,s=t.top*e,o=t.bottom*e;this._nearPlaneCorners[0].set(i,s,0),this._nearPlaneCorners[1].set(r,s,0),this._nearPlaneCorners[2].set(r,o,0),this._nearPlaneCorners[3].set(i,o,0)}}_collisionTest(){let t=1/0;if(!(this.colliderMeshes.length>=1)||zo(this._camera,"_collisionTest"))return t;const i=this._getTargetDirection(zr);Wo.lookAt(Vc,i,this._camera.up);for(let r=0;r<4;r++){const s=ee.copy(this._nearPlaneCorners[r]);s.applyMatrix4(Wo);const o=tr.addVectors(this._target,s);ys.set(o,i),ys.far=this._spherical.radius+1;const a=ys.intersectObjects(this.colliderMeshes);a.length!==0&&a[0].distance<t&&(t=a[0].distance)}return t}_getClientRect(t){if(!this._domElement)return;const e=this._domElement.getBoundingClientRect();return t.x=e.left,t.y=e.top,this._viewport?(t.x+=this._viewport.x,t.y+=e.height-this._viewport.w-this._viewport.y,t.width=this._viewport.z,t.height=this._viewport.w):(t.width=e.width,t.height=e.height),t}_createOnRestPromise(t){return t?Promise.resolve():(this._hasRested=!1,this.dispatchEvent({type:"transitionstart"}),new Promise(e=>{const i=()=>{this.removeEventListener("rest",i),e()};this.addEventListener("rest",i)}))}_addAllEventListeners(t){}_removeAllEventListeners(){}get dampingFactor(){return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."),0}set dampingFactor(t){console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.")}get draggingDampingFactor(){return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."),0}set draggingDampingFactor(t){console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.")}static createBoundingSphere(t,e=new Ot.Sphere){const i=e,r=i.center;er.makeEmpty(),t.traverseVisible(o=>{o.isMesh&&er.expandByObject(o)}),er.getCenter(r);let s=0;return t.traverseVisible(o=>{if(!o.isMesh)return;const a=o;if(!a.geometry)return;const l=a.geometry.clone();l.applyMatrix4(a.matrixWorld);const h=l.attributes.position;for(let u=0,p=h.count;u<p;u++)Bt.fromBufferAttribute(h,u),s=Math.max(s,r.distanceToSquared(Bt))}),i.radius=Math.sqrt(s),i}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hl="177",Pp=0,Yc=1,Lp=2,Qh=1,Dp=2,jn=3,yi=0,on=1,zn=2,Jn=0,Sr=1,go=2,$c=3,Zc=4,Jh=5,mi=100,Ip=101,Up=102,Op=103,Fp=104,Np=200,ka=201,kp=202,zp=203,za=204,Ba=205,Bp=206,Hp=207,Vp=208,Gp=209,Wp=210,Xp=211,qp=212,Yp=213,$p=214,Ha=0,Va=1,Ga=2,Tr=3,Wa=4,Xa=5,qa=6,Ya=7,td=0,Zp=1,jp=2,xi=0,ed=1,nd=2,id=3,Vl=4,rd=5,sd=6,od=7,ad=300,wr=301,Ar=302,$a=303,Za=304,Ao=306,ja=1e3,Bi=1001,Ka=1002,$e=1003,Kp=1004,Ss=1005,Hn=1006,Xo=1007,Hi=1008,ii=1009,ld=1010,cd=1011,ts=1012,Gl=1013,qi=1014,Dn=1015,ti=1016,Wl=1017,Xl=1018,es=1020,ud=35902,hd=1021,dd=1022,dn=1023,ns=1026,is=1027,fd=1028,ql=1029,pd=1030,Yl=1031,$l=1033,no=33776,io=33777,ro=33778,so=33779,Qa=35840,Ja=35841,tl=35842,el=35843,nl=36196,il=37492,rl=37496,sl=37808,ol=37809,al=37810,ll=37811,cl=37812,ul=37813,hl=37814,dl=37815,fl=37816,pl=37817,ml=37818,gl=37819,_l=37820,vl=37821,oo=36492,xl=36494,yl=36495,md=36283,Sl=36284,Ml=36285,El=36286,Qp=3200,Jp=3201,tm=0,em=1,gi="",vn="srgb",Cr="srgb-linear",_o="linear",ae="srgb",nr=7680,jc=519,nm=512,im=513,rm=514,gd=515,sm=516,om=517,am=518,lm=519,bl=35044,Kc=35048,Qc="300 es",Qn=2e3,vo=2001;class Lr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jc=1234567;const jr=Math.PI/180,rs=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[i&255]+Ve[i>>8&255]+Ve[i>>16&255]+Ve[i>>24&255]).toLowerCase()}function Wt(n,t,e){return Math.max(t,Math.min(e,n))}function Zl(n,t){return(n%t+t)%t}function cm(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function um(n,t,e){return n!==t?(e-n)/(t-n):0}function Kr(n,t,e){return(1-e)*n+e*t}function hm(n,t,e,i){return Kr(n,t,1-Math.exp(-e*i))}function dm(n,t=1){return t-Math.abs(Zl(n,t*2)-t)}function fm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function pm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function mm(n,t){return n+Math.floor(Math.random()*(t-n+1))}function gm(n,t){return n+Math.random()*(t-n)}function _m(n){return n*(.5-Math.random())}function vm(n){n!==void 0&&(Jc=n);let t=Jc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xm(n){return n*jr}function ym(n){return n*rs}function Sm(n){return(n&n-1)===0&&n!==0}function Mm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Em(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function bm(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),h=o((t+i)/2),u=s((t-i)/2),p=o((t-i)/2),d=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":n.set(a*h,l*u,l*p,a*c);break;case"YZY":n.set(l*p,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*p,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Pn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function le(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Tm={DEG2RAD:jr,RAD2DEG:rs,generateUUID:ei,clamp:Wt,euclideanModulo:Zl,mapLinear:cm,inverseLerp:um,lerp:Kr,damp:hm,pingpong:dm,smoothstep:fm,smootherstep:pm,randInt:mm,randFloat:gm,randFloatSpread:_m,seededRandom:vm,degToRad:xm,radToDeg:ym,isPowerOfTwo:Sm,ceilPowerOfTwo:Mm,floorPowerOfTwo:Em,setQuaternionFromProperEuler:bm,normalize:le,denormalize:Pn};class Vt{constructor(t=0,e=0){Vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const p=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=p,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==p||c!==d||h!==g){let m=1-a;const f=l*p+c*d+h*g+u*_,M=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){const R=Math.sqrt(E),S=Math.atan2(R,f*M);m=Math.sin(m*S)/R,a=Math.sin(a*S)/R}const y=a*M;if(l=l*m+p*y,c=c*m+d*y,h=h*m+g*y,u=u*m+_*y,m===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],p=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*d-c*p,t[e+1]=l*g+h*p+c*u-a*d,t[e+2]=c*g+h*d+a*p-l*u,t[e+3]=h*g-a*u-l*p-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),p=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=p*h*u+c*d*g,this._y=c*d*u-p*h*g,this._z=c*h*g+p*d*u,this._w=c*h*u-p*d*g;break;case"YXZ":this._x=p*h*u+c*d*g,this._y=c*d*u-p*h*g,this._z=c*h*g-p*d*u,this._w=c*h*u+p*d*g;break;case"ZXY":this._x=p*h*u-c*d*g,this._y=c*d*u+p*h*g,this._z=c*h*g+p*d*u,this._w=c*h*u-p*d*g;break;case"ZYX":this._x=p*h*u-c*d*g,this._y=c*d*u+p*h*g,this._z=c*h*g-p*d*u,this._w=c*h*u+p*d*g;break;case"YZX":this._x=p*h*u+c*d*g,this._y=c*d*u+p*h*g,this._z=c*h*g-p*d*u,this._w=c*h*u-p*d*g;break;case"XZY":this._x=p*h*u-c*d*g,this._y=c*d*u-p*h*g,this._z=c*h*g+p*d*u,this._w=c*h*u+p*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],p=i+a+u;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=o*u+this._w*p,this._x=i*u+this._x*p,this._y=r*u+this._y*p,this._z=s*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,i=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),h=2*(a*e-s*r),u=2*(s*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return qo.copy(this).projectOnVector(t),this.sub(qo)}reflect(t){return this.sub(qo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qo=new k,tu=new Dr;class Ht{constructor(t,e,i,r,s,o,a,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],p=i[2],d=i[5],g=i[8],_=r[0],m=r[3],f=r[6],M=r[1],E=r[4],y=r[7],R=r[2],S=r[5],b=r[8];return s[0]=o*_+a*M+l*R,s[3]=o*m+a*E+l*S,s[6]=o*f+a*y+l*b,s[1]=c*_+h*M+u*R,s[4]=c*m+h*E+u*S,s[7]=c*f+h*y+u*b,s[2]=p*_+d*M+g*R,s[5]=p*m+d*E+g*S,s[8]=p*f+d*y+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,p=a*l-h*s,d=c*s-o*l,g=e*u+i*p+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*c-h*i)*_,t[2]=(a*i-r*o)*_,t[3]=p*_,t[4]=(h*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yo.makeScale(t,e)),this}rotate(t){return this.premultiply(Yo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yo=new Ht;function _d(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function xo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function wm(){const n=xo("canvas");return n.style.display="block",n}const eu={};function Mr(n){n in eu||(eu[n]=!0,console.warn(n))}function Am(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function Cm(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Rm(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const nu=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),iu=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pm(){const n={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ae&&(r.r=ni(r.r),r.g=ni(r.g),r.b=ni(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ae&&(r.r=Er(r.r),r.g=Er(r.g),r.b=Er(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===gi?_o:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Mr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Mr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Cr]:{primaries:t,whitePoint:i,transfer:_o,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:vn},outputColorSpaceConfig:{drawingBufferColorSpace:vn}},[vn]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:vn}}}),n}const Jt=Pm();function ni(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Er(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ir;class Lm{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ir===void 0&&(ir=xo("canvas")),ir.width=t.width,ir.height=t.height;const r=ir.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=ir}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ni(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ni(e[i]/255)*255):e[i]=ni(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Dm=0;class jl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=ei(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push($o(r[o].image)):s.push($o(r[o]))}else s=$o(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function $o(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Lm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Im=0;const Zo=new k;class Ze extends Lr{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,i=Bi,r=Bi,s=Hn,o=Hi,a=dn,l=ii,c=Ze.DEFAULT_ANISOTROPY,h=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=ei(),this.name="",this.source=new jl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Zo).x}get height(){return this.source.getSize(Zo).y}get depth(){return this.source.getSize(Zo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ad)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ja:t.x=t.x-Math.floor(t.x);break;case Bi:t.x=t.x<0?0:1;break;case Ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ja:t.y=t.y-Math.floor(t.y);break;case Bi:t.y=t.y<0?0:1;break;case Ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=ad;Ze.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,i=0,r=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],h=l[4],u=l[8],p=l[1],d=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,y=(d+1)/2,R=(f+1)/2,S=(h+p)/4,b=(u+_)/4,L=(g+m)/4;return E>y&&E>R?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=S/i,s=b/i):y>R?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=S/r,s=L/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=b/s,r=L/s),this.set(i,r,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(p-h)*(p-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(p-h)/M,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Um extends Lr{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new Ze(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new jl(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class In extends Um{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class vd extends Ze{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Om extends Ze{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class si{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,bn):bn.fromBufferAttribute(s,o),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ms.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ms.copy(i.boundingBox)),Ms.applyMatrix4(t.matrixWorld),this.union(Ms)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hr),Es.subVectors(this.max,Hr),rr.subVectors(t.a,Hr),sr.subVectors(t.b,Hr),or.subVectors(t.c,Hr),ai.subVectors(sr,rr),li.subVectors(or,sr),Ci.subVectors(rr,or);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Ci.z,Ci.y,ai.z,0,-ai.x,li.z,0,-li.x,Ci.z,0,-Ci.x,-ai.y,ai.x,0,-li.y,li.x,0,-Ci.y,Ci.x,0];return!jo(e,rr,sr,or,Es)||(e=[1,0,0,0,1,0,0,0,1],!jo(e,rr,sr,or,Es))?!1:(bs.crossVectors(ai,li),e=[bs.x,bs.y,bs.z],jo(e,rr,sr,or,Es))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Xn=[new k,new k,new k,new k,new k,new k,new k,new k],bn=new k,Ms=new si,rr=new k,sr=new k,or=new k,ai=new k,li=new k,Ci=new k,Hr=new k,Es=new k,bs=new k,Ri=new k;function jo(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ri.fromArray(n,s);const a=r.x*Math.abs(Ri.x)+r.y*Math.abs(Ri.y)+r.z*Math.abs(Ri.z),l=t.dot(Ri),c=e.dot(Ri),h=i.dot(Ri);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Fm=new si,Vr=new k,Ko=new k;class Mi{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Fm.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vr.subVectors(t,this.center);const e=Vr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Vr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ko.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vr.copy(t.center).add(Ko)),this.expandByPoint(Vr.copy(t.center).sub(Ko))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const qn=new k,Qo=new k,Ts=new k,ci=new k,Jo=new k,ws=new k,ta=new k;class Kl{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Qo.copy(t).add(e).multiplyScalar(.5),Ts.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(Qo);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Ts),a=ci.dot(this.direction),l=-ci.dot(Ts),c=ci.lengthSq(),h=Math.abs(1-o*o);let u,p,d,g;if(h>0)if(u=o*l-a,p=o*a-l,g=s*h,u>=0)if(p>=-g)if(p<=g){const _=1/h;u*=_,p*=_,d=u*(u+o*p+2*a)+p*(o*u+p+2*l)+c}else p=s,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*l)+c;else p=-s,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*l)+c;else p<=-g?(u=Math.max(0,-(-o*s+a)),p=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c):p<=g?(u=0,p=Math.min(Math.max(-s,-l),s),d=p*(p+2*l)+c):(u=Math.max(0,-(o*s+a)),p=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+p*(p+2*l)+c);else p=o>0?-s:s,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Qo).addScaledVector(Ts,p),d}intersectSphere(t,e){qn.subVectors(t.center,this.origin);const i=qn.dot(this.direction),r=qn.dot(qn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(i=(t.min.x-p.x)*c,r=(t.max.x-p.x)*c):(i=(t.max.x-p.x)*c,r=(t.min.x-p.x)*c),h>=0?(s=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(s=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-p.z)*u,l=(t.max.z-p.z)*u):(a=(t.max.z-p.z)*u,l=(t.min.z-p.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,i,r,s){Jo.subVectors(e,t),ws.subVectors(i,t),ta.crossVectors(Jo,ws);let o=this.direction.dot(ta),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,t);const l=a*this.direction.dot(ws.crossVectors(ci,ws));if(l<0)return null;const c=a*this.direction.dot(Jo.cross(ci));if(c<0||l+c>o)return null;const h=-a*ci.dot(ta);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,i,r,s,o,a,l,c,h,u,p,d,g,_,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,h,u,p,d,g,_,m)}set(t,e,i,r,s,o,a,l,c,h,u,p,d,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=p,f[3]=d,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/ar.setFromMatrixColumn(t,0).length(),s=1/ar.setFromMatrixColumn(t,1).length(),o=1/ar.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const p=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=p-_*c,e[9]=-a*l,e[2]=_-p*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*h,d=l*u,g=c*h,_=c*u;e[0]=p+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*h,d=l*u,g=c*h,_=c*u;e[0]=p-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=p*c+_,e[1]=l*u,e[5]=_*c+p,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-p*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=p-_*u}else if(t.order==="XZY"){const p=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=p*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Nm,t,km)}lookAt(t,e,i){const r=this.elements;return un.subVectors(t,e),un.lengthSq()===0&&(un.z=1),un.normalize(),ui.crossVectors(i,un),ui.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),ui.crossVectors(i,un)),ui.normalize(),As.crossVectors(un,ui),r[0]=ui.x,r[4]=As.x,r[8]=un.x,r[1]=ui.y,r[5]=As.y,r[9]=un.y,r[2]=ui.z,r[6]=As.z,r[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],p=i[9],d=i[13],g=i[2],_=i[6],m=i[10],f=i[14],M=i[3],E=i[7],y=i[11],R=i[15],S=r[0],b=r[4],L=r[8],w=r[12],x=r[1],C=r[5],F=r[9],z=r[13],B=r[2],V=r[6],Z=r[10],Q=r[14],q=r[3],it=r[7],P=r[11],dt=r[15];return s[0]=o*S+a*x+l*B+c*q,s[4]=o*b+a*C+l*V+c*it,s[8]=o*L+a*F+l*Z+c*P,s[12]=o*w+a*z+l*Q+c*dt,s[1]=h*S+u*x+p*B+d*q,s[5]=h*b+u*C+p*V+d*it,s[9]=h*L+u*F+p*Z+d*P,s[13]=h*w+u*z+p*Q+d*dt,s[2]=g*S+_*x+m*B+f*q,s[6]=g*b+_*C+m*V+f*it,s[10]=g*L+_*F+m*Z+f*P,s[14]=g*w+_*z+m*Q+f*dt,s[3]=M*S+E*x+y*B+R*q,s[7]=M*b+E*C+y*V+R*it,s[11]=M*L+E*F+y*Z+R*P,s[15]=M*w+E*z+y*Q+R*dt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],p=t[10],d=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+s*l*u-r*c*u-s*a*p+i*c*p+r*a*d-i*l*d)+_*(+e*l*d-e*c*p+s*o*p-r*o*d+r*c*h-s*l*h)+m*(+e*c*u-e*a*d-s*o*u+i*o*d+s*a*h-i*c*h)+f*(-r*a*h-e*l*u+e*a*p+r*o*u-i*o*p+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],p=t[10],d=t[11],g=t[12],_=t[13],m=t[14],f=t[15],M=u*m*c-_*p*c+_*l*d-a*m*d-u*l*f+a*p*f,E=g*p*c-h*m*c-g*l*d+o*m*d+h*l*f-o*p*f,y=h*_*c-g*u*c+g*a*d-o*_*d-h*a*f+o*u*f,R=g*u*l-h*_*l-g*a*p+o*_*p+h*a*m-o*u*m,S=e*M+i*E+r*y+s*R;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/S;return t[0]=M*b,t[1]=(_*p*s-u*m*s-_*r*d+i*m*d+u*r*f-i*p*f)*b,t[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*f+i*l*f)*b,t[3]=(u*l*s-a*p*s-u*r*c+i*p*c+a*r*d-i*l*d)*b,t[4]=E*b,t[5]=(h*m*s-g*p*s+g*r*d-e*m*d-h*r*f+e*p*f)*b,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*f-e*l*f)*b,t[7]=(o*p*s-h*l*s+h*r*c-e*p*c-o*r*d+e*l*d)*b,t[8]=y*b,t[9]=(g*u*s-h*_*s-g*i*d+e*_*d+h*i*f-e*u*f)*b,t[10]=(o*_*s-g*a*s+g*i*c-e*_*c-o*i*f+e*a*f)*b,t[11]=(h*a*s-o*u*s-h*i*c+e*u*c+o*i*d-e*a*d)*b,t[12]=R*b,t[13]=(h*_*r-g*u*r+g*i*p-e*_*p-h*i*m+e*u*m)*b,t[14]=(g*a*r-o*_*r-g*i*l+e*_*l+o*i*m-e*a*m)*b,t[15]=(o*u*r-h*a*r+h*i*l-e*u*l-o*i*p+e*a*p)*b,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,p=s*c,d=s*h,g=s*u,_=o*h,m=o*u,f=a*u,M=l*c,E=l*h,y=l*u,R=i.x,S=i.y,b=i.z;return r[0]=(1-(_+f))*R,r[1]=(d+y)*R,r[2]=(g-E)*R,r[3]=0,r[4]=(d-y)*S,r[5]=(1-(p+f))*S,r[6]=(m+M)*S,r[7]=0,r[8]=(g+E)*b,r[9]=(m-M)*b,r[10]=(1-(p+_))*b,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=ar.set(r[0],r[1],r[2]).length();const o=ar.set(r[4],r[5],r[6]).length(),a=ar.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Tn.copy(this);const c=1/s,h=1/o,u=1/a;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,e.setFromRotationMatrix(Tn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Qn){const l=this.elements,c=2*s/(e-t),h=2*s/(i-r),u=(e+t)/(e-t),p=(i+r)/(i-r);let d,g;if(a===Qn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===vo)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Qn){const l=this.elements,c=1/(e-t),h=1/(i-r),u=1/(o-s),p=(e+t)*c,d=(i+r)*h;let g,_;if(a===Qn)g=(o+s)*u,_=-2*u;else if(a===vo)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ar=new k,Tn=new pe,Nm=new k(0,0,0),km=new k(1,1,1),ui=new k,As=new k,un=new k,ru=new pe,su=new Dr;class ri{constructor(t=0,e=0,i=0,r=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],p=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Wt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ru.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ru,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return su.setFromEuler(this),this.setFromQuaternion(su,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class Ql{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let zm=0;const ou=new k,lr=new Dr,Yn=new pe,Cs=new k,Gr=new k,Bm=new k,Hm=new Dr,au=new k(1,0,0),lu=new k(0,1,0),cu=new k(0,0,1),uu={type:"added"},Vm={type:"removed"},cr={type:"childadded",child:null},ea={type:"childremoved",child:null};class an extends Lr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zm++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=an.DEFAULT_UP.clone();const t=new k,e=new ri,i=new Dr,r=new k(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pe},normalMatrix:{value:new Ht}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=an.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ql,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return lr.setFromAxisAngle(t,e),this.quaternion.multiply(lr),this}rotateOnWorldAxis(t,e){return lr.setFromAxisAngle(t,e),this.quaternion.premultiply(lr),this}rotateX(t){return this.rotateOnAxis(au,t)}rotateY(t){return this.rotateOnAxis(lu,t)}rotateZ(t){return this.rotateOnAxis(cu,t)}translateOnAxis(t,e){return ou.copy(t).applyQuaternion(this.quaternion),this.position.add(ou.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(au,t)}translateY(t){return this.translateOnAxis(lu,t)}translateZ(t){return this.translateOnAxis(cu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Cs.copy(t):Cs.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Gr,Cs,this.up):Yn.lookAt(Cs,Gr,this.up),this.quaternion.setFromRotationMatrix(Yn),r&&(Yn.extractRotation(r.matrixWorld),lr.setFromRotationMatrix(Yn),this.quaternion.premultiply(lr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(uu),cr.child=t,this.dispatchEvent(cr),cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Vm),ea.child=t,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(uu),cr.child=t,this.dispatchEvent(cr),cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,t,Bm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,Hm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),p=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),p.length>0&&(i.skeletons=p),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}an.DEFAULT_UP=new k(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const wn=new k,$n=new k,na=new k,Zn=new k,ur=new k,hr=new k,hu=new k,ia=new k,ra=new k,sa=new k,oa=new ue,aa=new ue,la=new ue;class Ln{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),wn.subVectors(t,e),r.cross(wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){wn.subVectors(r,e),$n.subVectors(i,e),na.subVectors(t,e);const o=wn.dot(wn),a=wn.dot($n),l=wn.dot(na),c=$n.dot($n),h=$n.dot(na),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const p=1/u,d=(c*l-a*h)*p,g=(o*h-a*l)*p;return s.set(1-d-g,g,d)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,Zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Zn.x),l.addScaledVector(o,Zn.y),l.addScaledVector(a,Zn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return oa.setScalar(0),aa.setScalar(0),la.setScalar(0),oa.fromBufferAttribute(t,e),aa.fromBufferAttribute(t,i),la.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(oa,s.x),o.addScaledVector(aa,s.y),o.addScaledVector(la,s.z),o}static isFrontFacing(t,e,i,r){return wn.subVectors(i,e),$n.subVectors(t,e),wn.cross($n).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),wn.cross($n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return Ln.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return Ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;ur.subVectors(r,i),hr.subVectors(s,i),ia.subVectors(t,i);const l=ur.dot(ia),c=hr.dot(ia);if(l<=0&&c<=0)return e.copy(i);ra.subVectors(t,r);const h=ur.dot(ra),u=hr.dot(ra);if(h>=0&&u<=h)return e.copy(r);const p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(ur,o);sa.subVectors(t,s);const d=ur.dot(sa),g=hr.dot(sa);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(hr,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return hu.subVectors(s,r),a=(u-h)/(u-h+(d-g)),e.copy(r).addScaledVector(hu,a);const f=1/(m+_+p);return o=_*f,a=p*f,e.copy(i).addScaledVector(ur,o).addScaledVector(hr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function ca(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=vn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=Jt.workingColorSpace){if(t=Zl(t,1),e=Wt(e,0,1),i=Wt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=ca(o,s,t+1/3),this.g=ca(o,s,t),this.b=ca(o,s,t-1/3)}return Jt.colorSpaceToWorking(this,r),this}setStyle(t,e=vn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=vn){const i=xd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=Er(t.r),this.g=Er(t.g),this.b=Er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=vn){return Jt.workingToColorSpace(Ge.copy(this),t),Math.round(Wt(Ge.r*255,0,255))*65536+Math.round(Wt(Ge.g*255,0,255))*256+Math.round(Wt(Ge.b*255,0,255))}getHexString(t=vn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(Ge.copy(this),e);const i=Ge.r,r=Ge.g,s=Ge.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=vn){Jt.workingToColorSpace(Ge.copy(this),t);const e=Ge.r,i=Ge.g,r=Ge.b;return t!==vn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(hi),this.setHSL(hi.h+t,hi.s+e,hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(hi),t.getHSL(Rs);const i=Kr(hi.h,Rs.h,e),r=Kr(hi.s,Rs.s,e),s=Kr(hi.l,Rs.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new jt;jt.NAMES=xd;let Gm=0;class as extends Lr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Sr,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=za,this.blendDst=Ba,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nr,this.stencilZFail=nr,this.stencilZPass=nr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Sr&&(i.blending=this.blending),this.side!==yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==za&&(i.blendSrc=this.blendSrc),this.blendDst!==Ba&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Tr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==nr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==nr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==nr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Jl extends as{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=td,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ce=new k,Ps=new Vt;let Wm=0;class Ee{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=bl,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ps.fromBufferAttribute(this,e),Ps.applyMatrix3(t),this.setXY(e,Ps.x,Ps.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix3(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==bl&&(t.usage=this.usage),t}}class yd extends Ee{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Sd extends Ee{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Be extends Ee{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Xm=0;const _n=new pe,ua=new an,dr=new k,hn=new si,Wr=new si,Ue=new k;class ln extends Lr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_d(t)?Sd:yd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ht().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,i){return _n.makeTranslation(t,e,i),this.applyMatrix4(_n),this}scale(t,e,i){return _n.makeScale(t,e,i),this.applyMatrix4(_n),this}lookAt(t){return ua.lookAt(t),ua.updateMatrix(),this.applyMatrix4(ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Be(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];hn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const i=this.boundingSphere.center;if(hn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Wr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(hn.min,Wr.min),hn.expandByPoint(Ue),Ue.addVectors(hn.max,Wr.max),hn.expandByPoint(Ue)):(hn.expandByPoint(Wr.min),hn.expandByPoint(Wr.max))}hn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Ue.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Ue));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ue.fromBufferAttribute(a,c),l&&(dr.fromBufferAttribute(t,c),Ue.add(dr)),r=Math.max(r,i.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ee(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new k,l[L]=new k;const c=new k,h=new k,u=new k,p=new Vt,d=new Vt,g=new Vt,_=new k,m=new k;function f(L,w,x){c.fromBufferAttribute(i,L),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,x),p.fromBufferAttribute(s,L),d.fromBufferAttribute(s,w),g.fromBufferAttribute(s,x),h.sub(c),u.sub(c),d.sub(p),g.sub(p);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(C),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),a[L].add(_),a[w].add(_),a[x].add(_),l[L].add(m),l[w].add(m),l[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,w=M.length;L<w;++L){const x=M[L],C=x.start,F=x.count;for(let z=C,B=C+F;z<B;z+=3)f(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const E=new k,y=new k,R=new k,S=new k;function b(L){R.fromBufferAttribute(r,L),S.copy(R);const w=a[L];E.copy(w),E.sub(R.multiplyScalar(R.dot(w))).normalize(),y.crossVectors(S,w);const C=y.dot(l[L])<0?-1:1;o.setXYZW(L,E.x,E.y,E.z,C)}for(let L=0,w=M.length;L<w;++L){const x=M[L],C=x.start,F=x.count;for(let z=C,B=C+F;z<B;z+=3)b(t.getX(z+0)),b(t.getX(z+1)),b(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let p=0,d=i.count;p<d;p++)i.setXYZ(p,0,0,0);const r=new k,s=new k,o=new k,a=new k,l=new k,c=new k,h=new k,u=new k;if(t)for(let p=0,d=t.count;p<d;p+=3){const g=t.getX(p+0),_=t.getX(p+1),m=t.getX(p+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,d=e.count;p<d;p+=3)r.fromBufferAttribute(e,p+0),s.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(p+0,h.x,h.y,h.z),i.setXYZ(p+1,h.x,h.y,h.z),i.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,p=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let f=0;f<h;f++)p[g++]=c[d++]}return new Ee(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ln,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const p=c[h],d=t(p,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const du=new pe,Pi=new Kl,Ls=new Mi,fu=new k,Ds=new k,Is=new k,Us=new k,ha=new k,Os=new k,pu=new k,Fs=new k;class Sn extends an{constructor(t=new ln,e=new Jl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Os.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(ha.fromBufferAttribute(u,t),o?Os.addScaledVector(ha,h):Os.addScaledVector(ha.sub(e),h))}e.add(Os)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(s),Pi.copy(t.ray).recast(t.near),!(Ls.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Ls,fu)===null||Pi.origin.distanceToSquared(fu)>(t.far-t.near)**2))&&(du.copy(s).invert(),Pi.copy(t.ray).applyMatrix4(du),!(i.boundingBox!==null&&Pi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,p=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const m=p[g],f=o[m.materialIndex],M=Math.max(m.start,d.start),E=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,R=E;y<R;y+=3){const S=a.getX(y),b=a.getX(y+1),L=a.getX(y+2);r=Ns(this,f,t,i,c,h,u,S,b,L),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,f=_;m<f;m+=3){const M=a.getX(m),E=a.getX(m+1),y=a.getX(m+2);r=Ns(this,o,t,i,c,h,u,M,E,y),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const m=p[g],f=o[m.materialIndex],M=Math.max(m.start,d.start),E=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,R=E;y<R;y+=3){const S=y,b=y+1,L=y+2;r=Ns(this,f,t,i,c,h,u,S,b,L),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,f=_;m<f;m+=3){const M=m,E=m+1,y=m+2;r=Ns(this,o,t,i,c,h,u,M,E,y),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function qm(n,t,e,i,r,s,o,a){let l;if(t.side===on?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===yi,a),l===null)return null;Fs.copy(a),Fs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Fs);return c<e.near||c>e.far?null:{distance:c,point:Fs.clone(),object:n}}function Ns(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Ds),n.getVertexPosition(l,Is),n.getVertexPosition(c,Us);const h=qm(n,t,e,i,Ds,Is,Us,pu);if(h){const u=new k;Ln.getBarycoord(pu,Ds,Is,Us,u),r&&(h.uv=Ln.getInterpolatedAttribute(r,a,l,c,u,new Vt)),s&&(h.uv1=Ln.getInterpolatedAttribute(s,a,l,c,u,new Vt)),o&&(h.normal=Ln.getInterpolatedAttribute(o,a,l,c,u,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new k,materialIndex:0};Ln.getNormal(Ds,Is,Us,p.normal),h.face=p,h.barycoord=u}return h}class ls extends ln{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let p=0,d=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Be(c,3)),this.setAttribute("normal",new Be(h,3)),this.setAttribute("uv",new Be(u,2));function g(_,m,f,M,E,y,R,S,b,L,w){const x=y/b,C=R/L,F=y/2,z=R/2,B=S/2,V=b+1,Z=L+1;let Q=0,q=0;const it=new k;for(let P=0;P<Z;P++){const dt=P*C-z;for(let Lt=0;Lt<V;Lt++){const U=Lt*x-F;it[_]=U*M,it[m]=dt*E,it[f]=B,c.push(it.x,it.y,it.z),it[_]=0,it[m]=0,it[f]=S>0?1:-1,h.push(it.x,it.y,it.z),u.push(Lt/b),u.push(1-P/L),Q+=1}}for(let P=0;P<L;P++)for(let dt=0;dt<b;dt++){const Lt=p+dt+V*P,U=p+dt+V*(P+1),J=p+(dt+1)+V*(P+1),lt=p+(dt+1)+V*P;l.push(Lt,U,lt),l.push(U,J,lt),q+=6}a.addGroup(d,q,w),d+=q,p+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Rr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function qe(n){const t={};for(let e=0;e<n.length;e++){const i=Rr(n[e]);for(const r in i)t[r]=i[r]}return t}function Ym(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Md(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Yi={clone:Rr,merge:qe};var $m=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pe extends as{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$m,this.fragmentShader=Zm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rr(t.uniforms),this.uniformsGroups=Ym(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Ed extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const di=new k,mu=new Vt,gu=new Vt;class xn extends Ed{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(di.x,di.y).multiplyScalar(-t/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(di.x,di.y).multiplyScalar(-t/di.z)}getViewSize(t,e){return this.getViewBounds(t,mu,gu),e.subVectors(gu,mu)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(jr*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const fr=-90,pr=1;class jm extends an{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new xn(fr,pr,t,e);r.layers=this.layers,this.add(r);const s=new xn(fr,pr,t,e);s.layers=this.layers,this.add(s);const o=new xn(fr,pr,t,e);o.layers=this.layers,this.add(o);const a=new xn(fr,pr,t,e);a.layers=this.layers,this.add(a);const l=new xn(fr,pr,t,e);l.layers=this.layers,this.add(l);const c=new xn(fr,pr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===vo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,h),t.setRenderTarget(u,p,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class bd extends Ze{constructor(t=[],e=wr,i,r,s,o,a,l,c,h){super(t,e,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Km extends In{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new bd(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ls(5,5,5),s=new Pe({name:"CubemapFromEquirect",uniforms:Rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:Jn});s.uniforms.tEquirect.value=e;const o=new Sn(r,s),a=e.minFilter;return e.minFilter===Hi&&(e.minFilter=Hn),new jm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class _i extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _i,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _i,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _i,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&p>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new _i;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Jm extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class tg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=bl,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xe=new k;class vi{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Pn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new Ee(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new vi(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Td extends Ze{constructor(t=null,e=1,i=1,r,s,o,a,l,c=$e,h=$e,u,p){super(null,o,a,l,c,h,r,s,u,p),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fa=new k,eg=new k,ng=new Ht;class Oi{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=fa.subVectors(i,e).cross(eg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(fa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||ng.getNormalMatrix(t),r=this.coplanarPoint(fa).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Mi,ks=new k;class yo{constructor(t=new Oi,e=new Oi,i=new Oi,r=new Oi,s=new Oi,o=new Oi){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Qn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],p=r[7],d=r[8],g=r[9],_=r[10],m=r[11],f=r[12],M=r[13],E=r[14],y=r[15];if(i[0].setComponents(l-s,p-c,m-d,y-f).normalize(),i[1].setComponents(l+s,p+c,m+d,y+f).normalize(),i[2].setComponents(l+o,p+h,m+g,y+M).normalize(),i[3].setComponents(l-o,p-h,m-g,y-M).normalize(),i[4].setComponents(l-a,p-u,m-_,y-E).normalize(),e===Qn)i[5].setComponents(l+a,p+u,m+_,y+E).normalize();else if(e===vo)i[5].setComponents(a,u,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(ks.x=r.normal.x>0?t.max.x:t.min.x,ks.y=r.normal.y>0?t.max.y:t.min.y,ks.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ig extends as{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const _u=new pe,Tl=new Kl,zs=new Mi,Bs=new k;class vu extends an{constructor(t=new ln,e=new ig){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(r),zs.radius+=s,t.ray.intersectsSphere(zs)===!1)return;_u.copy(r).invert(),Tl.copy(t.ray).applyMatrix4(_u);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const p=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=p,_=d;g<_;g++){const m=c.getX(g);Bs.fromBufferAttribute(u,m),xu(Bs,m,l,r,t,e,this)}}else{const p=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=p,_=d;g<_;g++)Bs.fromBufferAttribute(u,g),xu(Bs,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function xu(n,t,e,i,r,s,o){const a=Tl.distanceSqToPoint(n);if(a<e){const l=new k;Tl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class wd extends Ze{constructor(t,e,i=qi,r,s,o,a=$e,l=$e,c,h=ns,u=1){if(h!==ns&&h!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:u};super(p,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new jl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Co extends ln{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=t/a,p=e/l,d=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const M=f*p-o;for(let E=0;E<c;E++){const y=E*u-s;g.push(y,-M,0),_.push(0,0,1),m.push(E/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){const E=M+c*f,y=M+c*(f+1),R=M+1+c*(f+1),S=M+1+c*f;d.push(E,y,S),d.push(y,R,S)}this.setIndex(d),this.setAttribute("position",new Be(g,3)),this.setAttribute("normal",new Be(_,3)),this.setAttribute("uv",new Be(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.width,t.height,t.widthSegments,t.heightSegments)}}class rg extends ln{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,r=new k,s=new k;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],p=u.start,d=u.count;for(let g=p,_=p+d;g<_;g+=3)for(let m=0;m<3;m++){const f=a.getX(g+m),M=a.getX(g+(m+1)%3);r.fromBufferAttribute(o,f),s.fromBufferAttribute(o,M),yu(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;r.fromBufferAttribute(o,h),s.fromBufferAttribute(o,u),yu(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new Be(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function yu(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(r)===!0?!1:(e.add(i),e.add(r),!0)}class sg extends Pe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class og extends as{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ag extends as{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ad extends Ed{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class lg extends ln{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class cg extends xn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Cd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Su(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Su();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Su(){return performance.now()}class wl extends tg{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Mu=new pe;class ug{constructor(t,e,i=0,r=1/0){this.ray=new Kl(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new Ql,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Mu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mu),this}intersectObject(t,e=!0,i=[]){return Al(t,this,i,e),i.sort(Eu),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)Al(t[r],this,i,e);return i.sort(Eu),i}}function Eu(n,t){return n.distance-t.distance}function Al(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Al(s[o],t,e,!0)}}class hg{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Wt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Wt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const bu=new k,Hs=new k;class dg{constructor(t=new k,e=new k){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){bu.subVectors(t,this.start),Hs.subVectors(this.end,this.start);const i=Hs.dot(Hs);let s=Hs.dot(bu)/i;return e&&(s=Wt(s,0,1)),s}closestPointToPoint(t,e,i){const r=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Tu(n,t,e,i){const r=fg(i);switch(e){case hd:return n*t;case fd:return n*t/r.components*r.byteLength;case ql:return n*t/r.components*r.byteLength;case pd:return n*t*2/r.components*r.byteLength;case Yl:return n*t*2/r.components*r.byteLength;case dd:return n*t*3/r.components*r.byteLength;case dn:return n*t*4/r.components*r.byteLength;case $l:return n*t*4/r.components*r.byteLength;case no:case io:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ro:case so:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ja:case el:return Math.max(n,16)*Math.max(t,8)/4;case Qa:case tl:return Math.max(n,8)*Math.max(t,8)/2;case nl:case il:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case rl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ol:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ll:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case cl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ul:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case hl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case dl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case fl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case pl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ml:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case gl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case _l:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case vl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case oo:case xl:case yl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case md:case Sl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ml:case El:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function fg(n){switch(n){case ii:case ld:return{byteLength:1,components:1};case ts:case cd:case ti:return{byteLength:2,components:1};case Wl:case Xl:return{byteLength:2,components:4};case qi:case Gl:case Dn:return{byteLength:4,components:1};case ud:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Rd(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function pg(n){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let p=0;for(let d=1;d<u.length;d++){const g=u[p],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,u[p]=_)}u.length=p+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gg=`#ifdef USE_ALPHAHASH
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
#endif`,_g=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sg=`#ifdef USE_AOMAP
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
#endif`,Mg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eg=`#ifdef USE_BATCHING
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
#endif`,bg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ag=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cg=`#ifdef USE_IRIDESCENCE
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
#endif`,Rg=`#ifdef USE_BUMPMAP
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
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ug=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ng=`#if defined( USE_COLOR_ALPHA )
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
#endif`,kg=`#define PI 3.141592653589793
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
} // validated`,zg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bg=`vec3 transformedNormal = objectNormal;
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
#endif`,Hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xg="gl_FragColor = linearToOutputTexel( gl_FragColor );",qg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yg=`#ifdef USE_ENVMAP
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
#endif`,$g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zg=`#ifdef USE_ENVMAP
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
#endif`,jg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kg=`#ifdef USE_ENVMAP
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
#endif`,Qg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,t_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n_=`#ifdef USE_GRADIENTMAP
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
}`,i_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,r_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,s_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o_=`uniform bool receiveShadow;
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
#endif`,a_=`#ifdef USE_ENVMAP
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
#endif`,l_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,u_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,h_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,d_=`PhysicalMaterial material;
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
#endif`,f_=`struct PhysicalMaterial {
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
}`,p_=`
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
#endif`,m_=`#if defined( RE_IndirectDiffuse )
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
#endif`,g_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,__=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,v_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,S_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,M_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,b_=`#if defined( USE_POINTS_UV )
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
#endif`,T_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,w_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,P_=`#ifdef USE_MORPHTARGETS
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
#endif`,L_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,I_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,U_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,N_=`#ifdef USE_NORMALMAP
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
#endif`,k_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,z_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,B_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,V_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,W_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,q_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Y_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Z_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,j_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,J_=`float getShadowMask() {
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
}`,t0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e0=`#ifdef USE_SKINNING
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
#endif`,n0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i0=`#ifdef USE_SKINNING
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
#endif`,r0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,s0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,o0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,a0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,l0=`#ifdef USE_TRANSMISSION
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
#endif`,c0=`#ifdef USE_TRANSMISSION
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
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const p0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m0=`uniform sampler2D t2D;
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
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`#include <common>
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
}`,S0=`#if DEPTH_PACKING == 3200
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
}`,M0=`#define DISTANCE
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
}`,E0=`#define DISTANCE
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
}`,b0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,T0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`uniform float scale;
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
}`,A0=`uniform vec3 diffuse;
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
}`,C0=`#include <common>
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
}`,R0=`uniform vec3 diffuse;
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
}`,P0=`#define LAMBERT
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
}`,L0=`#define LAMBERT
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
}`,D0=`#define MATCAP
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
}`,I0=`#define MATCAP
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
}`,U0=`#define NORMAL
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
}`,O0=`#define NORMAL
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
}`,F0=`#define PHONG
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
}`,N0=`#define PHONG
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
}`,k0=`#define STANDARD
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
}`,z0=`#define STANDARD
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
}`,B0=`#define TOON
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
}`,H0=`#define TOON
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
}`,V0=`uniform float size;
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
}`,G0=`uniform vec3 diffuse;
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
}`,W0=`#include <common>
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
}`,X0=`uniform vec3 color;
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
}`,q0=`uniform float rotation;
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
}`,Y0=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:mg,alphahash_pars_fragment:gg,alphamap_fragment:_g,alphamap_pars_fragment:vg,alphatest_fragment:xg,alphatest_pars_fragment:yg,aomap_fragment:Sg,aomap_pars_fragment:Mg,batching_pars_vertex:Eg,batching_vertex:bg,begin_vertex:Tg,beginnormal_vertex:wg,bsdfs:Ag,iridescence_fragment:Cg,bumpmap_pars_fragment:Rg,clipping_planes_fragment:Pg,clipping_planes_pars_fragment:Lg,clipping_planes_pars_vertex:Dg,clipping_planes_vertex:Ig,color_fragment:Ug,color_pars_fragment:Og,color_pars_vertex:Fg,color_vertex:Ng,common:kg,cube_uv_reflection_fragment:zg,defaultnormal_vertex:Bg,displacementmap_pars_vertex:Hg,displacementmap_vertex:Vg,emissivemap_fragment:Gg,emissivemap_pars_fragment:Wg,colorspace_fragment:Xg,colorspace_pars_fragment:qg,envmap_fragment:Yg,envmap_common_pars_fragment:$g,envmap_pars_fragment:Zg,envmap_pars_vertex:jg,envmap_physical_pars_fragment:a_,envmap_vertex:Kg,fog_vertex:Qg,fog_pars_vertex:Jg,fog_fragment:t_,fog_pars_fragment:e_,gradientmap_pars_fragment:n_,lightmap_pars_fragment:i_,lights_lambert_fragment:r_,lights_lambert_pars_fragment:s_,lights_pars_begin:o_,lights_toon_fragment:l_,lights_toon_pars_fragment:c_,lights_phong_fragment:u_,lights_phong_pars_fragment:h_,lights_physical_fragment:d_,lights_physical_pars_fragment:f_,lights_fragment_begin:p_,lights_fragment_maps:m_,lights_fragment_end:g_,logdepthbuf_fragment:__,logdepthbuf_pars_fragment:v_,logdepthbuf_pars_vertex:x_,logdepthbuf_vertex:y_,map_fragment:S_,map_pars_fragment:M_,map_particle_fragment:E_,map_particle_pars_fragment:b_,metalnessmap_fragment:T_,metalnessmap_pars_fragment:w_,morphinstance_vertex:A_,morphcolor_vertex:C_,morphnormal_vertex:R_,morphtarget_pars_vertex:P_,morphtarget_vertex:L_,normal_fragment_begin:D_,normal_fragment_maps:I_,normal_pars_fragment:U_,normal_pars_vertex:O_,normal_vertex:F_,normalmap_pars_fragment:N_,clearcoat_normal_fragment_begin:k_,clearcoat_normal_fragment_maps:z_,clearcoat_pars_fragment:B_,iridescence_pars_fragment:H_,opaque_fragment:V_,packing:G_,premultiplied_alpha_fragment:W_,project_vertex:X_,dithering_fragment:q_,dithering_pars_fragment:Y_,roughnessmap_fragment:$_,roughnessmap_pars_fragment:Z_,shadowmap_pars_fragment:j_,shadowmap_pars_vertex:K_,shadowmap_vertex:Q_,shadowmask_pars_fragment:J_,skinbase_vertex:t0,skinning_pars_vertex:e0,skinning_vertex:n0,skinnormal_vertex:i0,specularmap_fragment:r0,specularmap_pars_fragment:s0,tonemapping_fragment:o0,tonemapping_pars_fragment:a0,transmission_fragment:l0,transmission_pars_fragment:c0,uv_pars_fragment:u0,uv_pars_vertex:h0,uv_vertex:d0,worldpos_vertex:f0,background_vert:p0,background_frag:m0,backgroundCube_vert:g0,backgroundCube_frag:_0,cube_vert:v0,cube_frag:x0,depth_vert:y0,depth_frag:S0,distanceRGBA_vert:M0,distanceRGBA_frag:E0,equirect_vert:b0,equirect_frag:T0,linedashed_vert:w0,linedashed_frag:A0,meshbasic_vert:C0,meshbasic_frag:R0,meshlambert_vert:P0,meshlambert_frag:L0,meshmatcap_vert:D0,meshmatcap_frag:I0,meshnormal_vert:U0,meshnormal_frag:O0,meshphong_vert:F0,meshphong_frag:N0,meshphysical_vert:k0,meshphysical_frag:z0,meshtoon_vert:B0,meshtoon_frag:H0,points_vert:V0,points_frag:G0,shadow_vert:W0,shadow_frag:X0,sprite_vert:q0,sprite_frag:Y0},ut={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},nn={basic:{uniforms:qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:qe([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:qe([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:qe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:qe([ut.points,ut.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:qe([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:qe([ut.common,ut.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:qe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:qe([ut.sprite,ut.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:qe([ut.common,ut.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:qe([ut.lights,ut.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};nn.physical={uniforms:qe([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Vs={r:0,b:0,g:0},Di=new ri,$0=new pe;function Z0(n,t,e,i,r,s,o){const a=new jt(0);let l=s===!0?0:1,c,h,u=null,p=0,d=null;function g(E){let y=E.isScene===!0?E.background:null;return y&&y.isTexture&&(y=(E.backgroundBlurriness>0?e:t).get(y)),y}function _(E){let y=!1;const R=g(E);R===null?f(a,l):R&&R.isColor&&(f(R,1),y=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,y){const R=g(y);R&&(R.isCubeTexture||R.mapping===Ao)?(h===void 0&&(h=new Sn(new ls(1,1,1),new Pe({name:"BackgroundCubeMaterial",uniforms:Rr(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,b,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Di.copy(y.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($0.makeRotationFromEuler(Di)),h.material.toneMapped=Jt.getTransfer(R.colorSpace)!==ae,(u!==R||p!==R.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=R,p=R.version,d=n.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Sn(new Co(2,2),new Pe({name:"BackgroundMaterial",uniforms:Rr(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(R.colorSpace)!==ae,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||p!==R.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=R,p=R.version,d=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function f(E,y){E.getRGB(Vs,Md(n)),i.buffers.color.setClear(Vs.r,Vs.g,Vs.b,y,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,y=1){a.set(E),l=y,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,f(a,l)},render:_,addToRenderList:m,dispose:M}}function j0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=p(null);let s=r,o=!1;function a(x,C,F,z,B){let V=!1;const Z=u(z,F,C);s!==Z&&(s=Z,c(s.object)),V=d(x,z,F,B),V&&g(x,z,F,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,y(x,C,F,z),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function h(x){return n.deleteVertexArray(x)}function u(x,C,F){const z=F.wireframe===!0;let B=i[x.id];B===void 0&&(B={},i[x.id]=B);let V=B[C.id];V===void 0&&(V={},B[C.id]=V);let Z=V[z];return Z===void 0&&(Z=p(l()),V[z]=Z),Z}function p(x){const C=[],F=[],z=[];for(let B=0;B<e;B++)C[B]=0,F[B]=0,z[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:F,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,C,F,z){const B=s.attributes,V=C.attributes;let Z=0;const Q=F.getAttributes();for(const q in Q)if(Q[q].location>=0){const P=B[q];let dt=V[q];if(dt===void 0&&(q==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),q==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor)),P===void 0||P.attribute!==dt||dt&&P.data!==dt.data)return!0;Z++}return s.attributesNum!==Z||s.index!==z}function g(x,C,F,z){const B={},V=C.attributes;let Z=0;const Q=F.getAttributes();for(const q in Q)if(Q[q].location>=0){let P=V[q];P===void 0&&(q==="instanceMatrix"&&x.instanceMatrix&&(P=x.instanceMatrix),q==="instanceColor"&&x.instanceColor&&(P=x.instanceColor));const dt={};dt.attribute=P,P&&P.data&&(dt.data=P.data),B[q]=dt,Z++}s.attributes=B,s.attributesNum=Z,s.index=z}function _(){const x=s.newAttributes;for(let C=0,F=x.length;C<F;C++)x[C]=0}function m(x){f(x,0)}function f(x,C){const F=s.newAttributes,z=s.enabledAttributes,B=s.attributeDivisors;F[x]=1,z[x]===0&&(n.enableVertexAttribArray(x),z[x]=1),B[x]!==C&&(n.vertexAttribDivisor(x,C),B[x]=C)}function M(){const x=s.newAttributes,C=s.enabledAttributes;for(let F=0,z=C.length;F<z;F++)C[F]!==x[F]&&(n.disableVertexAttribArray(F),C[F]=0)}function E(x,C,F,z,B,V,Z){Z===!0?n.vertexAttribIPointer(x,C,F,B,V):n.vertexAttribPointer(x,C,F,z,B,V)}function y(x,C,F,z){_();const B=z.attributes,V=F.getAttributes(),Z=C.defaultAttributeValues;for(const Q in V){const q=V[Q];if(q.location>=0){let it=B[Q];if(it===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(it=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(it=x.instanceColor)),it!==void 0){const P=it.normalized,dt=it.itemSize,Lt=t.get(it);if(Lt===void 0)continue;const U=Lt.buffer,J=Lt.type,lt=Lt.bytesPerElement,ft=J===n.INT||J===n.UNSIGNED_INT||it.gpuType===Gl;if(it.isInterleavedBufferAttribute){const ht=it.data,St=ht.stride,Xt=it.offset;if(ht.isInstancedInterleavedBuffer){for(let wt=0;wt<q.locationSize;wt++)f(q.location+wt,ht.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let wt=0;wt<q.locationSize;wt++)m(q.location+wt);n.bindBuffer(n.ARRAY_BUFFER,U);for(let wt=0;wt<q.locationSize;wt++)E(q.location+wt,dt/q.locationSize,J,P,St*lt,(Xt+dt/q.locationSize*wt)*lt,ft)}else{if(it.isInstancedBufferAttribute){for(let ht=0;ht<q.locationSize;ht++)f(q.location+ht,it.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let ht=0;ht<q.locationSize;ht++)m(q.location+ht);n.bindBuffer(n.ARRAY_BUFFER,U);for(let ht=0;ht<q.locationSize;ht++)E(q.location+ht,dt/q.locationSize,J,P,dt*lt,dt/q.locationSize*ht*lt,ft)}}else if(Z!==void 0){const P=Z[Q];if(P!==void 0)switch(P.length){case 2:n.vertexAttrib2fv(q.location,P);break;case 3:n.vertexAttrib3fv(q.location,P);break;case 4:n.vertexAttrib4fv(q.location,P);break;default:n.vertexAttrib1fv(q.location,P)}}}}M()}function R(){L();for(const x in i){const C=i[x];for(const F in C){const z=C[F];for(const B in z)h(z[B].object),delete z[B];delete C[F]}delete i[x]}}function S(x){if(i[x.id]===void 0)return;const C=i[x.id];for(const F in C){const z=C[F];for(const B in z)h(z[B].object),delete z[B];delete C[F]}delete i[x.id]}function b(x){for(const C in i){const F=i[C];if(F[x.id]===void 0)continue;const z=F[x.id];for(const B in z)h(z[B].object),delete z[B];delete F[x.id]}}function L(){w(),o=!0,s!==r&&(s=r,c(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:S,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function K0(n,t,e){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function l(c,h,u,p){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],p[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,p,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*p[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Q0(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(b){return!(b!==dn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const L=b===ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==ii&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Dn&&!L)}function l(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:p,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:y,vertexTextures:R,maxSamples:S}}function J0(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Oi,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const d=u.length!==0||p||i!==0||r;return r=p,i=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,p){e=h(u,p,0)},this.setState=function(u,p,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const M=s?0:i,E=M*4;let y=f.clippingState||null;l.value=y,y=h(g,p,E,d);for(let R=0;R!==E;++R)y[R]=e[R];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,p,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=d+_*4,M=p.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,y=d;E!==_;++E,y+=4)o.copy(u[E]).applyMatrix4(M,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function tv(n){let t=new WeakMap;function e(o,a){return a===$a?o.mapping=wr:a===Za&&(o.mapping=Ar),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===$a||a===Za)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Km(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const xr=4,wu=[.125,.215,.35,.446,.526,.582],ki=20,pa=new Ad,Au=new jt;let ma=null,ga=0,_a=0,va=!1;const Fi=(1+Math.sqrt(5))/2,mr=1/Fi,Cu=[new k(-Fi,mr,0),new k(Fi,mr,0),new k(-mr,0,Fi),new k(mr,0,Fi),new k(0,Fi,-mr),new k(0,Fi,mr),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],ev=new k;class Ru{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=ev}=s;ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Du(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ma,ga,_a),this._renderer.xr.enabled=va,t.scissorTest=!1,Gs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wr||t.mapping===Ar?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:ti,format:dn,colorSpace:Cr,depthBuffer:!1},r=Pu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pu(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nv(s)),this._blurMaterial=iv(s,t,e)}return r}_compileMaterial(t){const e=new Sn(this._lodPlanes[0],t);this._renderer.compile(e,pa)}_sceneToCubeUV(t,e,i,r,s){const l=new xn(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,d=u.toneMapping;u.getClearColor(Au),u.toneMapping=xi,u.autoClear=!1;const g=new Jl({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),_=new Sn(new ls,g);let m=!1;const f=t.background;f?f.isColor&&(g.color.copy(f),t.background=null,m=!0):(g.color.copy(Au),m=!0);for(let M=0;M<6;M++){const E=M%3;E===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[M],s.y,s.z)):E===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[M]));const y=this._cubeSize;Gs(r,E*y,M>2?y:0,y,y),u.setRenderTarget(r),m&&u.render(_,l),u.render(t,l)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=p,t.background=f}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===wr||t.mapping===Ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Du()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Sn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Gs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,pa)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Cu[(r-s-1)%Cu.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Sn(this._lodPlanes[r],c),p=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ki-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):ki;m>ki&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ki}`);const f=[];let M=0;for(let b=0;b<ki;++b){const L=b/_,w=Math.exp(-L*L/2);f.push(w),b===0?M+=w:b<m&&(M+=2*w)}for(let b=0;b<f.length;b++)f[b]=f[b]/M;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:E}=this;p.dTheta.value=g,p.mipInt.value=E-i;const y=this._sizeLods[r],R=3*y*(r>E-xr?r-E+xr:0),S=4*(this._cubeSize-y);Gs(e,R,S,3*y,2*y),l.setRenderTarget(e),l.render(u,pa)}}function nv(n){const t=[],e=[],i=[];let r=n;const s=n-xr+1+wu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-xr?l=wu[o-n+xr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,f=1,M=new Float32Array(_*g*d),E=new Float32Array(m*g*d),y=new Float32Array(f*g*d);for(let S=0;S<d;S++){const b=S%3*2/3-1,L=S>2?0:-1,w=[b,L,0,b+2/3,L,0,b+2/3,L+1,0,b,L,0,b+2/3,L+1,0,b,L+1,0];M.set(w,_*g*S),E.set(p,m*g*S);const x=[S,S,S,S,S,S];y.set(x,f*g*S)}const R=new ln;R.setAttribute("position",new Ee(M,_)),R.setAttribute("uv",new Ee(E,m)),R.setAttribute("faceIndex",new Ee(y,f)),t.push(R),r>xr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Pu(n,t,e){const i=new In(n,t,e);return i.texture.mapping=Ao,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Gs(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function iv(n,t,e){const i=new Float32Array(ki),r=new k(0,1,0);return new Pe({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:tc(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Lu(){return new Pe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Du(){return new Pe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function tc(){return`

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
	`}function rv(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===$a||l===Za,h=l===wr||l===Ar;if(c||h){let u=t.get(a);const p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new Ru(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&r(d)?(e===null&&(e=new Ru(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function sv(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Mr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function ov(n,t,e,i){const r={},s=new WeakMap;function o(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete r[p.id];const d=s.get(p);d&&(t.remove(d),s.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(u,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,e.memory.geometries++),p}function l(u){const p=u.attributes;for(const d in p)t.update(p[d],n.ARRAY_BUFFER)}function c(u){const p=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let E=0,y=M.length;E<y;E+=3){const R=M[E+0],S=M[E+1],b=M[E+2];p.push(R,S,S,b,b,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let E=0,y=M.length/3-1;E<y;E+=3){const R=E+0,S=E+1,b=E+2;p.push(R,S,S,b,b,R)}}else return;const m=new(_d(p)?Sd:yd)(p,1);m.version=_;const f=s.get(u);f&&t.remove(f),s.set(u,m)}function h(u){const p=s.get(u);if(p){const d=u.index;d!==null&&p.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function av(n,t,e){let i;function r(p){i=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,d){n.drawElements(i,d,s,p*o),e.update(d,i,1)}function c(p,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,p*o,g),e.update(d,i,g))}function h(p,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,p,0,g);let m=0;for(let f=0;f<g;f++)m+=d[f];e.update(m,i,1)}function u(p,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<p.length;f++)c(p[f]/o,d[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,p,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=d[M]*_[M];e.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function lv(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function cv(n,t,e){const i=new WeakMap,r=new ue;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let p=i.get(a);if(p===void 0||p.count!==u){let x=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var d=x;p!==void 0&&p.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let R=a.attributes.position.count*y,S=1;R>t.maxTextureSize&&(S=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const b=new Float32Array(R*S*4*u),L=new vd(b,R,S,u);L.type=Dn,L.needsUpdate=!0;const w=y*4;for(let C=0;C<u;C++){const F=f[C],z=M[C],B=E[C],V=R*S*4*C;for(let Z=0;Z<F.count;Z++){const Q=Z*w;g===!0&&(r.fromBufferAttribute(F,Z),b[V+Q+0]=r.x,b[V+Q+1]=r.y,b[V+Q+2]=r.z,b[V+Q+3]=0),_===!0&&(r.fromBufferAttribute(z,Z),b[V+Q+4]=r.x,b[V+Q+5]=r.y,b[V+Q+6]=r.z,b[V+Q+7]=0),m===!0&&(r.fromBufferAttribute(B,Z),b[V+Q+8]=r.x,b[V+Q+9]=r.y,b[V+Q+10]=r.z,b[V+Q+11]=B.itemSize===4?r.w:1)}}p={count:u,texture:L,size:new Vt(R,S)},i.set(a,p),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:s}}function uv(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const Pd=new Ze,Iu=new wd(1,1),Ld=new vd,Dd=new Om,Id=new bd,Uu=[],Ou=[],Fu=new Float32Array(16),Nu=new Float32Array(9),ku=new Float32Array(4);function Ir(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Uu[r];if(s===void 0&&(s=new Float32Array(r),Uu[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Le(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function De(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ro(n,t){let e=Ou[t];e===void 0&&(e=new Int32Array(t),Ou[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function hv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function dv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2fv(this.addr,t),De(e,t)}}function fv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;n.uniform3fv(this.addr,t),De(e,t)}}function pv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4fv(this.addr,t),De(e,t)}}function mv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;ku.set(i),n.uniformMatrix2fv(this.addr,!1,ku),De(e,i)}}function gv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Nu.set(i),n.uniformMatrix3fv(this.addr,!1,Nu),De(e,i)}}function _v(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Fu.set(i),n.uniformMatrix4fv(this.addr,!1,Fu),De(e,i)}}function vv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function xv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2iv(this.addr,t),De(e,t)}}function yv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3iv(this.addr,t),De(e,t)}}function Sv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4iv(this.addr,t),De(e,t)}}function Mv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Ev(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2uiv(this.addr,t),De(e,t)}}function bv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3uiv(this.addr,t),De(e,t)}}function Tv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4uiv(this.addr,t),De(e,t)}}function wv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Iu.compareFunction=gd,s=Iu):s=Pd,e.setTexture2D(t||s,r)}function Av(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Dd,r)}function Cv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Id,r)}function Rv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Ld,r)}function Pv(n){switch(n){case 5126:return hv;case 35664:return dv;case 35665:return fv;case 35666:return pv;case 35674:return mv;case 35675:return gv;case 35676:return _v;case 5124:case 35670:return vv;case 35667:case 35671:return xv;case 35668:case 35672:return yv;case 35669:case 35673:return Sv;case 5125:return Mv;case 36294:return Ev;case 36295:return bv;case 36296:return Tv;case 35678:case 36198:case 36298:case 36306:case 35682:return wv;case 35679:case 36299:case 36307:return Av;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Rv}}function Lv(n,t){n.uniform1fv(this.addr,t)}function Dv(n,t){const e=Ir(t,this.size,2);n.uniform2fv(this.addr,e)}function Iv(n,t){const e=Ir(t,this.size,3);n.uniform3fv(this.addr,e)}function Uv(n,t){const e=Ir(t,this.size,4);n.uniform4fv(this.addr,e)}function Ov(n,t){const e=Ir(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Fv(n,t){const e=Ir(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Nv(n,t){const e=Ir(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function kv(n,t){n.uniform1iv(this.addr,t)}function zv(n,t){n.uniform2iv(this.addr,t)}function Bv(n,t){n.uniform3iv(this.addr,t)}function Hv(n,t){n.uniform4iv(this.addr,t)}function Vv(n,t){n.uniform1uiv(this.addr,t)}function Gv(n,t){n.uniform2uiv(this.addr,t)}function Wv(n,t){n.uniform3uiv(this.addr,t)}function Xv(n,t){n.uniform4uiv(this.addr,t)}function qv(n,t,e){const i=this.cache,r=t.length,s=Ro(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Pd,s[o])}function Yv(n,t,e){const i=this.cache,r=t.length,s=Ro(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Dd,s[o])}function $v(n,t,e){const i=this.cache,r=t.length,s=Ro(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Id,s[o])}function Zv(n,t,e){const i=this.cache,r=t.length,s=Ro(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Ld,s[o])}function jv(n){switch(n){case 5126:return Lv;case 35664:return Dv;case 35665:return Iv;case 35666:return Uv;case 35674:return Ov;case 35675:return Fv;case 35676:return Nv;case 5124:case 35670:return kv;case 35667:case 35671:return zv;case 35668:case 35672:return Bv;case 35669:case 35673:return Hv;case 5125:return Vv;case 36294:return Gv;case 36295:return Wv;case 36296:return Xv;case 35678:case 36198:case 36298:case 36306:case 35682:return qv;case 35679:case 36299:case 36307:return Yv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Zv}}class Kv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Pv(e.type)}}class Qv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jv(e.type)}}class Jv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function zu(n,t){n.seq.push(t),n.map[t.id]=t}function tx(n,t,e){const i=n.name,r=i.length;for(xa.lastIndex=0;;){const s=xa.exec(i),o=xa.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){zu(e,c===void 0?new Kv(a,n,t):new Qv(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new Jv(a),zu(e,u)),e=u}}}class ao{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);tx(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Bu(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const ex=37297;let nx=0;function ix(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Hu=new Ht;function rx(n){Jt._getMatrix(Hu,Jt.workingColorSpace,n);const t=`mat3( ${Hu.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(n)){case _o:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Vu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+ix(n.getShaderSource(t),o)}else return r}function sx(n,t){const e=rx(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ox(n,t){let e;switch(t){case ed:e="Linear";break;case nd:e="Reinhard";break;case id:e="Cineon";break;case Vl:e="ACESFilmic";break;case sd:e="AgX";break;case od:e="Neutral";break;case rd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ws=new k;function ax(){Jt.getLuminanceCoefficients(Ws);const n=Ws.x.toFixed(4),t=Ws.y.toFixed(4),e=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yr).join(`
`)}function cx(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function ux(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Yr(n){return n!==""}function Gu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(n){return n.replace(hx,fx)}const dx=new Map;function fx(n,t){let e=Gt[t];if(e===void 0){const i=dx.get(t);if(i!==void 0)e=Gt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Cl(e)}const px=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xu(n){return n.replace(px,mx)}function mx(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function qu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function gx(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Qh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Dp?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===jn&&(t="SHADOWMAP_TYPE_VSM"),t}function _x(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case wr:case Ar:t="ENVMAP_TYPE_CUBE";break;case Ao:t="ENVMAP_TYPE_CUBE_UV";break}return t}function vx(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ar:t="ENVMAP_MODE_REFRACTION";break}return t}function xx(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case td:t="ENVMAP_BLENDING_MULTIPLY";break;case Zp:t="ENVMAP_BLENDING_MIX";break;case jp:t="ENVMAP_BLENDING_ADD";break}return t}function yx(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Sx(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=gx(e),c=_x(e),h=vx(e),u=xx(e),p=yx(e),d=lx(e),g=cx(s),_=r.createProgram();let m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yr).join(`
`),f.length>0&&(f+=`
`)):(m=[qu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yr).join(`
`),f=[qu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?Gt.tonemapping_pars_fragment:"",e.toneMapping!==xi?ox("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,sx("linearToOutputTexel",e.outputColorSpace),ax(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yr).join(`
`)),o=Cl(o),o=Gu(o,e),o=Wu(o,e),a=Cl(a),a=Gu(a,e),a=Wu(a,e),o=Xu(o),a=Xu(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=M+m+o,y=M+f+a,R=Bu(r,r.VERTEX_SHADER,E),S=Bu(r,r.FRAGMENT_SHADER,y);r.attachShader(_,R),r.attachShader(_,S),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function b(C){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(_).trim(),z=r.getShaderInfoLog(R).trim(),B=r.getShaderInfoLog(S).trim();let V=!0,Z=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,R,S);else{const Q=Vu(r,R,"vertex"),q=Vu(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+Q+`
`+q)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(z===""||B==="")&&(Z=!1);Z&&(C.diagnostics={runnable:V,programLog:F,vertexShader:{log:z,prefix:m},fragmentShader:{log:B,prefix:f}})}r.deleteShader(R),r.deleteShader(S),L=new ao(r,_),w=ux(r,_)}let L;this.getUniforms=function(){return L===void 0&&b(this),L};let w;this.getAttributes=function(){return w===void 0&&b(this),w};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,ex)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=nx++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=S,this}let Mx=0;class Ex{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new bx(t),e.set(t,i)),i}}class bx{constructor(t){this.id=Mx++,this.code=t,this.usedTimes=0}}function Tx(n,t,e,i,r,s,o){const a=new Ql,l=new Ex,c=new Set,h=[],u=r.logarithmicDepthBuffer,p=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,x,C,F,z){const B=F.fog,V=z.geometry,Z=w.isMeshStandardMaterial?F.environment:null,Q=(w.isMeshStandardMaterial?e:t).get(w.envMap||Z),q=Q&&Q.mapping===Ao?Q.image.height:null,it=g[w.type];w.precision!==null&&(d=r.getMaxPrecision(w.precision),d!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",d,"instead."));const P=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,dt=P!==void 0?P.length:0;let Lt=0;V.morphAttributes.position!==void 0&&(Lt=1),V.morphAttributes.normal!==void 0&&(Lt=2),V.morphAttributes.color!==void 0&&(Lt=3);let U,J,lt,ft;if(it){const se=nn[it];U=se.vertexShader,J=se.fragmentShader}else U=w.vertexShader,J=w.fragmentShader,l.update(w),lt=l.getVertexShaderID(w),ft=l.getFragmentShaderID(w);const ht=n.getRenderTarget(),St=n.state.buffers.depth.getReversed(),Xt=z.isInstancedMesh===!0,wt=z.isBatchedMesh===!0,ce=!!w.map,me=!!w.matcap,Qt=!!Q,O=!!w.aoMap,Ie=!!w.lightMap,Zt=!!w.bumpMap,re=!!w.normalMap,Tt=!!w.displacementMap,Yt=!!w.emissiveMap,At=!!w.metalnessMap,zt=!!w.roughnessMap,we=w.anisotropy>0,D=w.clearcoat>0,T=w.dispersion>0,Y=w.iridescence>0,I=w.sheen>0,H=w.transmission>0,X=we&&!!w.anisotropyMap,st=D&&!!w.clearcoatMap,nt=D&&!!w.clearcoatNormalMap,gt=D&&!!w.clearcoatRoughnessMap,xt=Y&&!!w.iridescenceMap,tt=Y&&!!w.iridescenceThicknessMap,_t=I&&!!w.sheenColorMap,Ct=I&&!!w.sheenRoughnessMap,yt=!!w.specularMap,ct=!!w.specularColorMap,Rt=!!w.specularIntensityMap,N=H&&!!w.transmissionMap,pt=H&&!!w.thicknessMap,rt=!!w.gradientMap,Mt=!!w.alphaMap,ot=w.alphaTest>0,et=!!w.alphaHash,Et=!!w.extensions;let kt=xi;w.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(kt=n.toneMapping);const ge={shaderID:it,shaderType:w.type,shaderName:w.name,vertexShader:U,fragmentShader:J,defines:w.defines,customVertexShaderID:lt,customFragmentShaderID:ft,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:d,batching:wt,batchingColor:wt&&z._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&z.instanceColor!==null,instancingMorph:Xt&&z.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Cr,alphaToCoverage:!!w.alphaToCoverage,map:ce,matcap:me,envMap:Qt,envMapMode:Qt&&Q.mapping,envMapCubeUVHeight:q,aoMap:O,lightMap:Ie,bumpMap:Zt,normalMap:re,displacementMap:p&&Tt,emissiveMap:Yt,normalMapObjectSpace:re&&w.normalMapType===em,normalMapTangentSpace:re&&w.normalMapType===tm,metalnessMap:At,roughnessMap:zt,anisotropy:we,anisotropyMap:X,clearcoat:D,clearcoatMap:st,clearcoatNormalMap:nt,clearcoatRoughnessMap:gt,dispersion:T,iridescence:Y,iridescenceMap:xt,iridescenceThicknessMap:tt,sheen:I,sheenColorMap:_t,sheenRoughnessMap:Ct,specularMap:yt,specularColorMap:ct,specularIntensityMap:Rt,transmission:H,transmissionMap:N,thicknessMap:pt,gradientMap:rt,opaque:w.transparent===!1&&w.blending===Sr&&w.alphaToCoverage===!1,alphaMap:Mt,alphaTest:ot,alphaHash:et,combine:w.combine,mapUv:ce&&_(w.map.channel),aoMapUv:O&&_(w.aoMap.channel),lightMapUv:Ie&&_(w.lightMap.channel),bumpMapUv:Zt&&_(w.bumpMap.channel),normalMapUv:re&&_(w.normalMap.channel),displacementMapUv:Tt&&_(w.displacementMap.channel),emissiveMapUv:Yt&&_(w.emissiveMap.channel),metalnessMapUv:At&&_(w.metalnessMap.channel),roughnessMapUv:zt&&_(w.roughnessMap.channel),anisotropyMapUv:X&&_(w.anisotropyMap.channel),clearcoatMapUv:st&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&_(w.sheenRoughnessMap.channel),specularMapUv:yt&&_(w.specularMap.channel),specularColorMapUv:ct&&_(w.specularColorMap.channel),specularIntensityMapUv:Rt&&_(w.specularIntensityMap.channel),transmissionMapUv:N&&_(w.transmissionMap.channel),thicknessMapUv:pt&&_(w.thicknessMap.channel),alphaMapUv:Mt&&_(w.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(re||we),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!V.attributes.uv&&(ce||Mt),fog:!!B,useFog:w.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:St,skinning:z.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:Lt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:kt,decodeVideoTexture:ce&&w.map.isVideoTexture===!0&&Jt.getTransfer(w.map.colorSpace)===ae,decodeVideoTextureEmissive:Yt&&w.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(w.emissiveMap.colorSpace)===ae,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===zn,flipSided:w.side===on,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Et&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&w.extensions.multiDraw===!0||wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function f(w){const x=[];if(w.shaderID?x.push(w.shaderID):(x.push(w.customVertexShaderID),x.push(w.customFragmentShaderID)),w.defines!==void 0)for(const C in w.defines)x.push(C),x.push(w.defines[C]);return w.isRawShaderMaterial===!1&&(M(x,w),E(x,w),x.push(n.outputColorSpace)),x.push(w.customProgramCacheKey),x.join()}function M(w,x){w.push(x.precision),w.push(x.outputColorSpace),w.push(x.envMapMode),w.push(x.envMapCubeUVHeight),w.push(x.mapUv),w.push(x.alphaMapUv),w.push(x.lightMapUv),w.push(x.aoMapUv),w.push(x.bumpMapUv),w.push(x.normalMapUv),w.push(x.displacementMapUv),w.push(x.emissiveMapUv),w.push(x.metalnessMapUv),w.push(x.roughnessMapUv),w.push(x.anisotropyMapUv),w.push(x.clearcoatMapUv),w.push(x.clearcoatNormalMapUv),w.push(x.clearcoatRoughnessMapUv),w.push(x.iridescenceMapUv),w.push(x.iridescenceThicknessMapUv),w.push(x.sheenColorMapUv),w.push(x.sheenRoughnessMapUv),w.push(x.specularMapUv),w.push(x.specularColorMapUv),w.push(x.specularIntensityMapUv),w.push(x.transmissionMapUv),w.push(x.thicknessMapUv),w.push(x.combine),w.push(x.fogExp2),w.push(x.sizeAttenuation),w.push(x.morphTargetsCount),w.push(x.morphAttributeCount),w.push(x.numDirLights),w.push(x.numPointLights),w.push(x.numSpotLights),w.push(x.numSpotLightMaps),w.push(x.numHemiLights),w.push(x.numRectAreaLights),w.push(x.numDirLightShadows),w.push(x.numPointLightShadows),w.push(x.numSpotLightShadows),w.push(x.numSpotLightShadowsWithMaps),w.push(x.numLightProbes),w.push(x.shadowMapType),w.push(x.toneMapping),w.push(x.numClippingPlanes),w.push(x.numClipIntersection),w.push(x.depthPacking)}function E(w,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),w.push(a.mask)}function y(w){const x=g[w.type];let C;if(x){const F=nn[x];C=Yi.clone(F.uniforms)}else C=w.uniforms;return C}function R(w,x){let C;for(let F=0,z=h.length;F<z;F++){const B=h[F];if(B.cacheKey===x){C=B,++C.usedTimes;break}}return C===void 0&&(C=new Sx(n,x,w,s),h.push(C)),C}function S(w){if(--w.usedTimes===0){const x=h.indexOf(w);h[x]=h[h.length-1],h.pop(),w.destroy()}}function b(w){l.remove(w)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:R,releaseProgram:S,releaseShaderCache:b,programs:h,dispose:L}}function wx(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function Ax(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Yu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function $u(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(u,p,d,g,_,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:p,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=p,f.material=d,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function a(u,p,d,g,_,m){const f=o(u,p,d,g,_,m);d.transmission>0?i.push(f):d.transparent===!0?r.push(f):e.push(f)}function l(u,p,d,g,_,m){const f=o(u,p,d,g,_,m);d.transmission>0?i.unshift(f):d.transparent===!0?r.unshift(f):e.unshift(f)}function c(u,p){e.length>1&&e.sort(u||Ax),i.length>1&&i.sort(p||Yu),r.length>1&&r.sort(p||Yu)}function h(){for(let u=t,p=n.length;u<p;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Cx(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new $u,n.set(i,[o])):r>=s.length?(o=new $u,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Rx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new jt};break;case"SpotLight":e={position:new k,direction:new k,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function Px(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Lx=0;function Dx(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Ix(n){const t=new Rx,e=Px(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new pe,o=new pe;function a(c){let h=0,u=0,p=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let d=0,g=0,_=0,m=0,f=0,M=0,E=0,y=0,R=0,S=0,b=0;c.sort(Dx);for(let w=0,x=c.length;w<x;w++){const C=c[w],F=C.color,z=C.intensity,B=C.distance,V=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=F.r*z,u+=F.g*z,p+=F.b*z;else if(C.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(C.sh.coefficients[Z],z);b++}else if(C.isDirectionalLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,q=e.get(C);q.shadowIntensity=Q.intensity,q.shadowBias=Q.bias,q.shadowNormalBias=Q.normalBias,q.shadowRadius=Q.radius,q.shadowMapSize=Q.mapSize,i.directionalShadow[d]=q,i.directionalShadowMap[d]=V,i.directionalShadowMatrix[d]=C.shadow.matrix,M++}i.directional[d]=Z,d++}else if(C.isSpotLight){const Z=t.get(C);Z.position.setFromMatrixPosition(C.matrixWorld),Z.color.copy(F).multiplyScalar(z),Z.distance=B,Z.coneCos=Math.cos(C.angle),Z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Z.decay=C.decay,i.spot[_]=Z;const Q=C.shadow;if(C.map&&(i.spotLightMap[R]=C.map,R++,Q.updateMatrices(C),C.castShadow&&S++),i.spotLightMatrix[_]=Q.matrix,C.castShadow){const q=e.get(C);q.shadowIntensity=Q.intensity,q.shadowBias=Q.bias,q.shadowNormalBias=Q.normalBias,q.shadowRadius=Q.radius,q.shadowMapSize=Q.mapSize,i.spotShadow[_]=q,i.spotShadowMap[_]=V,y++}_++}else if(C.isRectAreaLight){const Z=t.get(C);Z.color.copy(F).multiplyScalar(z),Z.halfWidth.set(C.width*.5,0,0),Z.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=Z,m++}else if(C.isPointLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),Z.distance=C.distance,Z.decay=C.decay,C.castShadow){const Q=C.shadow,q=e.get(C);q.shadowIntensity=Q.intensity,q.shadowBias=Q.bias,q.shadowNormalBias=Q.normalBias,q.shadowRadius=Q.radius,q.shadowMapSize=Q.mapSize,q.shadowCameraNear=Q.camera.near,q.shadowCameraFar=Q.camera.far,i.pointShadow[g]=q,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=C.shadow.matrix,E++}i.point[g]=Z,g++}else if(C.isHemisphereLight){const Z=t.get(C);Z.skyColor.copy(C.color).multiplyScalar(z),Z.groundColor.copy(C.groundColor).multiplyScalar(z),i.hemi[f]=Z,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=p;const L=i.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==f||L.numDirectionalShadows!==M||L.numPointShadows!==E||L.numSpotShadows!==y||L.numSpotMaps!==R||L.numLightProbes!==b)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=y+R-S,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=b,L.directionalLength=d,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=f,L.numDirectionalShadows=M,L.numPointShadows=E,L.numSpotShadows=y,L.numSpotMaps=R,L.numLightProbes=b,i.version=Lx++)}function l(c,h){let u=0,p=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const E=c[f];if(E.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),u++}else if(E.isSpotLight){const y=i.spot[d];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),d++}else if(E.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const y=i.point[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),p++}else if(E.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Zu(n){const t=new Ix(n),e=[],i=[];function r(h){c.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Ux(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Zu(n),t.set(r,[a])):s>=o.length?(a=new Zu(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const Ox=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fx=`uniform sampler2D shadow_pass;
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
}`;function Nx(n,t,e){let i=new yo;const r=new Vt,s=new Vt,o=new ue,a=new og({depthPacking:Jp}),l=new ag,c={},h=e.maxTextureSize,u={[yi]:on,[on]:yi,[zn]:zn},p=new Pe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:Ox,fragmentShader:Fx}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const g=new ln;g.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Sn(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qh;let f=this.type;this.render=function(S,b,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const w=n.getRenderTarget(),x=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Jn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=f!==jn&&this.type===jn,B=f===jn&&this.type!==jn;for(let V=0,Z=S.length;V<Z;V++){const Q=S[V],q=Q.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const it=q.getFrameExtents();if(r.multiply(it),s.copy(q.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/it.x),r.x=s.x*it.x,q.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/it.y),r.y=s.y*it.y,q.mapSize.y=s.y)),q.map===null||z===!0||B===!0){const dt=this.type!==jn?{minFilter:$e,magFilter:$e}:{};q.map!==null&&q.map.dispose(),q.map=new In(r.x,r.y,dt),q.map.texture.name=Q.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const P=q.getViewportCount();for(let dt=0;dt<P;dt++){const Lt=q.getViewport(dt);o.set(s.x*Lt.x,s.y*Lt.y,s.x*Lt.z,s.y*Lt.w),F.viewport(o),q.updateMatrices(Q,dt),i=q.getFrustum(),y(b,L,q.camera,Q,this.type)}q.isPointLightShadow!==!0&&this.type===jn&&M(q,L),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,x,C)};function M(S,b){const L=t.update(_);p.defines.VSM_SAMPLES!==S.blurSamples&&(p.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new In(r.x,r.y)),p.uniforms.shadow_pass.value=S.map.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(b,null,L,p,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(b,null,L,d,_,null)}function E(S,b,L,w){let x=null;const C=L.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)x=C;else if(x=L.isPointLight===!0?l:a,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const F=x.uuid,z=b.uuid;let B=c[F];B===void 0&&(B={},c[F]=B);let V=B[z];V===void 0&&(V=x.clone(),B[z]=V,b.addEventListener("dispose",R)),x=V}if(x.visible=b.visible,x.wireframe=b.wireframe,w===jn?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:u[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,L.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const F=n.properties.get(x);F.light=L}return x}function y(S,b,L,w,x){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&x===jn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,S.matrixWorld);const z=t.update(S),B=S.material;if(Array.isArray(B)){const V=z.groups;for(let Z=0,Q=V.length;Z<Q;Z++){const q=V[Z],it=B[q.materialIndex];if(it&&it.visible){const P=E(S,it,w,x);S.onBeforeShadow(n,S,b,L,z,P,q),n.renderBufferDirect(L,null,z,P,S,q),S.onAfterShadow(n,S,b,L,z,P,q)}}}else if(B.visible){const V=E(S,B,w,x);S.onBeforeShadow(n,S,b,L,z,V,null),n.renderBufferDirect(L,null,z,V,S,null),S.onAfterShadow(n,S,b,L,z,V,null)}}const F=S.children;for(let z=0,B=F.length;z<B;z++)y(F[z],b,L,w,x)}function R(S){S.target.removeEventListener("dispose",R);for(const L in c){const w=c[L],x=S.target.uuid;x in w&&(w[x].dispose(),delete w[x])}}}const kx={[Ha]:Va,[Ga]:qa,[Wa]:Ya,[Tr]:Xa,[Va]:Ha,[qa]:Ga,[Ya]:Wa,[Xa]:Tr};function zx(n,t){function e(){let N=!1;const pt=new ue;let rt=null;const Mt=new ue(0,0,0,0);return{setMask:function(ot){rt!==ot&&!N&&(n.colorMask(ot,ot,ot,ot),rt=ot)},setLocked:function(ot){N=ot},setClear:function(ot,et,Et,kt,ge){ge===!0&&(ot*=kt,et*=kt,Et*=kt),pt.set(ot,et,Et,kt),Mt.equals(pt)===!1&&(n.clearColor(ot,et,Et,kt),Mt.copy(pt))},reset:function(){N=!1,rt=null,Mt.set(-1,0,0,0)}}}function i(){let N=!1,pt=!1,rt=null,Mt=null,ot=null;return{setReversed:function(et){if(pt!==et){const Et=t.get("EXT_clip_control");et?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),pt=et;const kt=ot;ot=null,this.setClear(kt)}},getReversed:function(){return pt},setTest:function(et){et?ht(n.DEPTH_TEST):St(n.DEPTH_TEST)},setMask:function(et){rt!==et&&!N&&(n.depthMask(et),rt=et)},setFunc:function(et){if(pt&&(et=kx[et]),Mt!==et){switch(et){case Ha:n.depthFunc(n.NEVER);break;case Va:n.depthFunc(n.ALWAYS);break;case Ga:n.depthFunc(n.LESS);break;case Tr:n.depthFunc(n.LEQUAL);break;case Wa:n.depthFunc(n.EQUAL);break;case Xa:n.depthFunc(n.GEQUAL);break;case qa:n.depthFunc(n.GREATER);break;case Ya:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Mt=et}},setLocked:function(et){N=et},setClear:function(et){ot!==et&&(pt&&(et=1-et),n.clearDepth(et),ot=et)},reset:function(){N=!1,rt=null,Mt=null,ot=null,pt=!1}}}function r(){let N=!1,pt=null,rt=null,Mt=null,ot=null,et=null,Et=null,kt=null,ge=null;return{setTest:function(se){N||(se?ht(n.STENCIL_TEST):St(n.STENCIL_TEST))},setMask:function(se){pt!==se&&!N&&(n.stencilMask(se),pt=se)},setFunc:function(se,Mn,Gn){(rt!==se||Mt!==Mn||ot!==Gn)&&(n.stencilFunc(se,Mn,Gn),rt=se,Mt=Mn,ot=Gn)},setOp:function(se,Mn,Gn){(et!==se||Et!==Mn||kt!==Gn)&&(n.stencilOp(se,Mn,Gn),et=se,Et=Mn,kt=Gn)},setLocked:function(se){N=se},setClear:function(se){ge!==se&&(n.clearStencil(se),ge=se)},reset:function(){N=!1,pt=null,rt=null,Mt=null,ot=null,et=null,Et=null,kt=null,ge=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},u={},p=new WeakMap,d=[],g=null,_=!1,m=null,f=null,M=null,E=null,y=null,R=null,S=null,b=new jt(0,0,0),L=0,w=!1,x=null,C=null,F=null,z=null,B=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,Q=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(q)[1]),Z=Q>=1):q.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),Z=Q>=2);let it=null,P={};const dt=n.getParameter(n.SCISSOR_BOX),Lt=n.getParameter(n.VIEWPORT),U=new ue().fromArray(dt),J=new ue().fromArray(Lt);function lt(N,pt,rt,Mt){const ot=new Uint8Array(4),et=n.createTexture();n.bindTexture(N,et),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Et=0;Et<rt;Et++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(pt,0,n.RGBA,1,1,Mt,0,n.RGBA,n.UNSIGNED_BYTE,ot):n.texImage2D(pt+Et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ot);return et}const ft={};ft[n.TEXTURE_2D]=lt(n.TEXTURE_2D,n.TEXTURE_2D,1),ft[n.TEXTURE_CUBE_MAP]=lt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[n.TEXTURE_2D_ARRAY]=lt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ft[n.TEXTURE_3D]=lt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(Tr),Zt(!1),re(Yc),ht(n.CULL_FACE),O(Jn);function ht(N){h[N]!==!0&&(n.enable(N),h[N]=!0)}function St(N){h[N]!==!1&&(n.disable(N),h[N]=!1)}function Xt(N,pt){return u[N]!==pt?(n.bindFramebuffer(N,pt),u[N]=pt,N===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=pt),N===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=pt),!0):!1}function wt(N,pt){let rt=d,Mt=!1;if(N){rt=p.get(pt),rt===void 0&&(rt=[],p.set(pt,rt));const ot=N.textures;if(rt.length!==ot.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let et=0,Et=ot.length;et<Et;et++)rt[et]=n.COLOR_ATTACHMENT0+et;rt.length=ot.length,Mt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,Mt=!0);Mt&&n.drawBuffers(rt)}function ce(N){return g!==N?(n.useProgram(N),g=N,!0):!1}const me={[mi]:n.FUNC_ADD,[Ip]:n.FUNC_SUBTRACT,[Up]:n.FUNC_REVERSE_SUBTRACT};me[Op]=n.MIN,me[Fp]=n.MAX;const Qt={[Np]:n.ZERO,[ka]:n.ONE,[kp]:n.SRC_COLOR,[za]:n.SRC_ALPHA,[Wp]:n.SRC_ALPHA_SATURATE,[Vp]:n.DST_COLOR,[Bp]:n.DST_ALPHA,[zp]:n.ONE_MINUS_SRC_COLOR,[Ba]:n.ONE_MINUS_SRC_ALPHA,[Gp]:n.ONE_MINUS_DST_COLOR,[Hp]:n.ONE_MINUS_DST_ALPHA,[Xp]:n.CONSTANT_COLOR,[qp]:n.ONE_MINUS_CONSTANT_COLOR,[Yp]:n.CONSTANT_ALPHA,[$p]:n.ONE_MINUS_CONSTANT_ALPHA};function O(N,pt,rt,Mt,ot,et,Et,kt,ge,se){if(N===Jn){_===!0&&(St(n.BLEND),_=!1);return}if(_===!1&&(ht(n.BLEND),_=!0),N!==Jh){if(N!==m||se!==w){if((f!==mi||y!==mi)&&(n.blendEquation(n.FUNC_ADD),f=mi,y=mi),se)switch(N){case Sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case go:n.blendFunc(n.ONE,n.ONE);break;case $c:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case go:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case $c:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,E=null,R=null,S=null,b.set(0,0,0),L=0,m=N,w=se}return}ot=ot||pt,et=et||rt,Et=Et||Mt,(pt!==f||ot!==y)&&(n.blendEquationSeparate(me[pt],me[ot]),f=pt,y=ot),(rt!==M||Mt!==E||et!==R||Et!==S)&&(n.blendFuncSeparate(Qt[rt],Qt[Mt],Qt[et],Qt[Et]),M=rt,E=Mt,R=et,S=Et),(kt.equals(b)===!1||ge!==L)&&(n.blendColor(kt.r,kt.g,kt.b,ge),b.copy(kt),L=ge),m=N,w=!1}function Ie(N,pt){N.side===zn?St(n.CULL_FACE):ht(n.CULL_FACE);let rt=N.side===on;pt&&(rt=!rt),Zt(rt),N.blending===Sr&&N.transparent===!1?O(Jn):O(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Mt=N.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Yt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):St(n.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(N){x!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),x=N)}function re(N){N!==Pp?(ht(n.CULL_FACE),N!==C&&(N===Yc?n.cullFace(n.BACK):N===Lp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):St(n.CULL_FACE),C=N}function Tt(N){N!==F&&(Z&&n.lineWidth(N),F=N)}function Yt(N,pt,rt){N?(ht(n.POLYGON_OFFSET_FILL),(z!==pt||B!==rt)&&(n.polygonOffset(pt,rt),z=pt,B=rt)):St(n.POLYGON_OFFSET_FILL)}function At(N){N?ht(n.SCISSOR_TEST):St(n.SCISSOR_TEST)}function zt(N){N===void 0&&(N=n.TEXTURE0+V-1),it!==N&&(n.activeTexture(N),it=N)}function we(N,pt,rt){rt===void 0&&(it===null?rt=n.TEXTURE0+V-1:rt=it);let Mt=P[rt];Mt===void 0&&(Mt={type:void 0,texture:void 0},P[rt]=Mt),(Mt.type!==N||Mt.texture!==pt)&&(it!==rt&&(n.activeTexture(rt),it=rt),n.bindTexture(N,pt||ft[N]),Mt.type=N,Mt.texture=pt)}function D(){const N=P[it];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function T(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function I(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function H(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function gt(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(N){U.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),U.copy(N))}function Ct(N){J.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),J.copy(N))}function yt(N,pt){let rt=c.get(pt);rt===void 0&&(rt=new WeakMap,c.set(pt,rt));let Mt=rt.get(N);Mt===void 0&&(Mt=n.getUniformBlockIndex(pt,N.name),rt.set(N,Mt))}function ct(N,pt){const Mt=c.get(pt).get(N);l.get(pt)!==Mt&&(n.uniformBlockBinding(pt,Mt,N.__bindingPointIndex),l.set(pt,Mt))}function Rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},it=null,P={},u={},p=new WeakMap,d=[],g=null,_=!1,m=null,f=null,M=null,E=null,y=null,R=null,S=null,b=new jt(0,0,0),L=0,w=!1,x=null,C=null,F=null,z=null,B=null,U.set(0,0,n.canvas.width,n.canvas.height),J.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ht,disable:St,bindFramebuffer:Xt,drawBuffers:wt,useProgram:ce,setBlending:O,setMaterial:Ie,setFlipSided:Zt,setCullFace:re,setLineWidth:Tt,setPolygonOffset:Yt,setScissorTest:At,activeTexture:zt,bindTexture:we,unbindTexture:D,compressedTexImage2D:T,compressedTexImage3D:Y,texImage2D:xt,texImage3D:tt,updateUBOMapping:yt,uniformBlockBinding:ct,texStorage2D:nt,texStorage3D:gt,texSubImage2D:I,texSubImage3D:H,compressedTexSubImage2D:X,compressedTexSubImage3D:st,scissor:_t,viewport:Ct,reset:Rt}}function Bx(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vt,h=new WeakMap;let u;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,T){return d?new OffscreenCanvas(D,T):xo("canvas")}function _(D,T,Y){let I=1;const H=we(D);if((H.width>Y||H.height>Y)&&(I=Y/Math.max(H.width,H.height)),I<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const X=Math.floor(I*H.width),st=Math.floor(I*H.height);u===void 0&&(u=g(X,st));const nt=T?g(X,st):u;return nt.width=X,nt.height=st,nt.getContext("2d").drawImage(D,0,0,X,st),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+X+"x"+st+")."),nt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),D;return D}function m(D){return D.generateMipmaps}function f(D){n.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(D,T,Y,I,H=!1){if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let X=T;if(T===n.RED&&(Y===n.FLOAT&&(X=n.R32F),Y===n.HALF_FLOAT&&(X=n.R16F),Y===n.UNSIGNED_BYTE&&(X=n.R8)),T===n.RED_INTEGER&&(Y===n.UNSIGNED_BYTE&&(X=n.R8UI),Y===n.UNSIGNED_SHORT&&(X=n.R16UI),Y===n.UNSIGNED_INT&&(X=n.R32UI),Y===n.BYTE&&(X=n.R8I),Y===n.SHORT&&(X=n.R16I),Y===n.INT&&(X=n.R32I)),T===n.RG&&(Y===n.FLOAT&&(X=n.RG32F),Y===n.HALF_FLOAT&&(X=n.RG16F),Y===n.UNSIGNED_BYTE&&(X=n.RG8)),T===n.RG_INTEGER&&(Y===n.UNSIGNED_BYTE&&(X=n.RG8UI),Y===n.UNSIGNED_SHORT&&(X=n.RG16UI),Y===n.UNSIGNED_INT&&(X=n.RG32UI),Y===n.BYTE&&(X=n.RG8I),Y===n.SHORT&&(X=n.RG16I),Y===n.INT&&(X=n.RG32I)),T===n.RGB_INTEGER&&(Y===n.UNSIGNED_BYTE&&(X=n.RGB8UI),Y===n.UNSIGNED_SHORT&&(X=n.RGB16UI),Y===n.UNSIGNED_INT&&(X=n.RGB32UI),Y===n.BYTE&&(X=n.RGB8I),Y===n.SHORT&&(X=n.RGB16I),Y===n.INT&&(X=n.RGB32I)),T===n.RGBA_INTEGER&&(Y===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),Y===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),Y===n.UNSIGNED_INT&&(X=n.RGBA32UI),Y===n.BYTE&&(X=n.RGBA8I),Y===n.SHORT&&(X=n.RGBA16I),Y===n.INT&&(X=n.RGBA32I)),T===n.RGB&&Y===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),T===n.RGBA){const st=H?_o:Jt.getTransfer(I);Y===n.FLOAT&&(X=n.RGBA32F),Y===n.HALF_FLOAT&&(X=n.RGBA16F),Y===n.UNSIGNED_BYTE&&(X=st===ae?n.SRGB8_ALPHA8:n.RGBA8),Y===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),Y===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(D,T){let Y;return D?T===null||T===qi||T===es?Y=n.DEPTH24_STENCIL8:T===Dn?Y=n.DEPTH32F_STENCIL8:T===ts&&(Y=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===qi||T===es?Y=n.DEPTH_COMPONENT24:T===Dn?Y=n.DEPTH_COMPONENT32F:T===ts&&(Y=n.DEPTH_COMPONENT16),Y}function R(D,T){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==$e&&D.minFilter!==Hn?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function S(D){const T=D.target;T.removeEventListener("dispose",S),L(T),T.isVideoTexture&&h.delete(T)}function b(D){const T=D.target;T.removeEventListener("dispose",b),x(T)}function L(D){const T=i.get(D);if(T.__webglInit===void 0)return;const Y=D.source,I=p.get(Y);if(I){const H=I[T.__cacheKey];H.usedTimes--,H.usedTimes===0&&w(D),Object.keys(I).length===0&&p.delete(Y)}i.remove(D)}function w(D){const T=i.get(D);n.deleteTexture(T.__webglTexture);const Y=D.source,I=p.get(Y);delete I[T.__cacheKey],o.memory.textures--}function x(D){const T=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(T.__webglFramebuffer[I]))for(let H=0;H<T.__webglFramebuffer[I].length;H++)n.deleteFramebuffer(T.__webglFramebuffer[I][H]);else n.deleteFramebuffer(T.__webglFramebuffer[I]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[I])}else{if(Array.isArray(T.__webglFramebuffer))for(let I=0;I<T.__webglFramebuffer.length;I++)n.deleteFramebuffer(T.__webglFramebuffer[I]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let I=0;I<T.__webglColorRenderbuffer.length;I++)T.__webglColorRenderbuffer[I]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[I]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Y=D.textures;for(let I=0,H=Y.length;I<H;I++){const X=i.get(Y[I]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),o.memory.textures--),i.remove(Y[I])}i.remove(D)}let C=0;function F(){C=0}function z(){const D=C;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),C+=1,D}function B(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function V(D,T){const Y=i.get(D);if(D.isVideoTexture&&At(D),D.isRenderTargetTexture===!1&&D.version>0&&Y.__version!==D.version){const I=D.image;if(I===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(I.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ft(Y,D,T);return}}e.bindTexture(n.TEXTURE_2D,Y.__webglTexture,n.TEXTURE0+T)}function Z(D,T){const Y=i.get(D);if(D.version>0&&Y.__version!==D.version){ft(Y,D,T);return}e.bindTexture(n.TEXTURE_2D_ARRAY,Y.__webglTexture,n.TEXTURE0+T)}function Q(D,T){const Y=i.get(D);if(D.version>0&&Y.__version!==D.version){ft(Y,D,T);return}e.bindTexture(n.TEXTURE_3D,Y.__webglTexture,n.TEXTURE0+T)}function q(D,T){const Y=i.get(D);if(D.version>0&&Y.__version!==D.version){ht(Y,D,T);return}e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture,n.TEXTURE0+T)}const it={[ja]:n.REPEAT,[Bi]:n.CLAMP_TO_EDGE,[Ka]:n.MIRRORED_REPEAT},P={[$e]:n.NEAREST,[Kp]:n.NEAREST_MIPMAP_NEAREST,[Ss]:n.NEAREST_MIPMAP_LINEAR,[Hn]:n.LINEAR,[Xo]:n.LINEAR_MIPMAP_NEAREST,[Hi]:n.LINEAR_MIPMAP_LINEAR},dt={[nm]:n.NEVER,[lm]:n.ALWAYS,[im]:n.LESS,[gd]:n.LEQUAL,[rm]:n.EQUAL,[am]:n.GEQUAL,[sm]:n.GREATER,[om]:n.NOTEQUAL};function Lt(D,T){if(T.type===Dn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Hn||T.magFilter===Xo||T.magFilter===Ss||T.magFilter===Hi||T.minFilter===Hn||T.minFilter===Xo||T.minFilter===Ss||T.minFilter===Hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,it[T.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,it[T.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,it[T.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,P[T.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,P[T.minFilter]),T.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,dt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===$e||T.minFilter!==Ss&&T.minFilter!==Hi||T.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");n.texParameterf(D,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function U(D,T){let Y=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",S));const I=T.source;let H=p.get(I);H===void 0&&(H={},p.set(I,H));const X=B(T);if(X!==D.__cacheKey){H[X]===void 0&&(H[X]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),H[X].usedTimes++;const st=H[D.__cacheKey];st!==void 0&&(H[D.__cacheKey].usedTimes--,st.usedTimes===0&&w(T)),D.__cacheKey=X,D.__webglTexture=H[X].texture}return Y}function J(D,T,Y){return Math.floor(Math.floor(D/Y)/T)}function lt(D,T,Y,I){const X=D.updateRanges;if(X.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,T.width,T.height,Y,I,T.data);else{X.sort((tt,_t)=>tt.start-_t.start);let st=0;for(let tt=1;tt<X.length;tt++){const _t=X[st],Ct=X[tt],yt=_t.start+_t.count,ct=J(Ct.start,T.width,4),Rt=J(_t.start,T.width,4);Ct.start<=yt+1&&ct===Rt&&J(Ct.start+Ct.count-1,T.width,4)===ct?_t.count=Math.max(_t.count,Ct.start+Ct.count-_t.start):(++st,X[st]=Ct)}X.length=st+1;const nt=n.getParameter(n.UNPACK_ROW_LENGTH),gt=n.getParameter(n.UNPACK_SKIP_PIXELS),xt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,T.width);for(let tt=0,_t=X.length;tt<_t;tt++){const Ct=X[tt],yt=Math.floor(Ct.start/4),ct=Math.ceil(Ct.count/4),Rt=yt%T.width,N=Math.floor(yt/T.width),pt=ct,rt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Rt),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),e.texSubImage2D(n.TEXTURE_2D,0,Rt,N,pt,rt,Y,I,T.data)}D.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,nt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,gt),n.pixelStorei(n.UNPACK_SKIP_ROWS,xt)}}function ft(D,T,Y){let I=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(I=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(I=n.TEXTURE_3D);const H=U(D,T),X=T.source;e.bindTexture(I,D.__webglTexture,n.TEXTURE0+Y);const st=i.get(X);if(X.version!==st.__version||H===!0){e.activeTexture(n.TEXTURE0+Y);const nt=Jt.getPrimaries(Jt.workingColorSpace),gt=T.colorSpace===gi?null:Jt.getPrimaries(T.colorSpace),xt=T.colorSpace===gi||nt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let tt=_(T.image,!1,r.maxTextureSize);tt=zt(T,tt);const _t=s.convert(T.format,T.colorSpace),Ct=s.convert(T.type);let yt=E(T.internalFormat,_t,Ct,T.colorSpace,T.isVideoTexture);Lt(I,T);let ct;const Rt=T.mipmaps,N=T.isVideoTexture!==!0,pt=st.__version===void 0||H===!0,rt=X.dataReady,Mt=R(T,tt);if(T.isDepthTexture)yt=y(T.format===is,T.type),pt&&(N?e.texStorage2D(n.TEXTURE_2D,1,yt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,_t,Ct,null));else if(T.isDataTexture)if(Rt.length>0){N&&pt&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let ot=0,et=Rt.length;ot<et;ot++)ct=Rt[ot],N?rt&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,ct.width,ct.height,_t,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,ot,yt,ct.width,ct.height,0,_t,Ct,ct.data);T.generateMipmaps=!1}else N?(pt&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height),rt&&lt(T,tt,_t,Ct)):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,_t,Ct,tt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){N&&pt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,Rt[0].width,Rt[0].height,tt.depth);for(let ot=0,et=Rt.length;ot<et;ot++)if(ct=Rt[ot],T.format!==dn)if(_t!==null)if(N){if(rt)if(T.layerUpdates.size>0){const Et=Tu(ct.width,ct.height,T.format,T.type);for(const kt of T.layerUpdates){const ge=ct.data.subarray(kt*Et/ct.data.BYTES_PER_ELEMENT,(kt+1)*Et/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,kt,ct.width,ct.height,1,_t,ge)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,ct.width,ct.height,tt.depth,_t,ct.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,yt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?rt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,ct.width,ct.height,tt.depth,_t,Ct,ct.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,yt,ct.width,ct.height,tt.depth,0,_t,Ct,ct.data)}else{N&&pt&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let ot=0,et=Rt.length;ot<et;ot++)ct=Rt[ot],T.format!==dn?_t!==null?N?rt&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,ct.width,ct.height,_t,ct.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,yt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?rt&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,ct.width,ct.height,_t,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,ot,yt,ct.width,ct.height,0,_t,Ct,ct.data)}else if(T.isDataArrayTexture)if(N){if(pt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,tt.width,tt.height,tt.depth),rt)if(T.layerUpdates.size>0){const ot=Tu(tt.width,tt.height,T.format,T.type);for(const et of T.layerUpdates){const Et=tt.data.subarray(et*ot/tt.data.BYTES_PER_ELEMENT,(et+1)*ot/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,et,tt.width,tt.height,1,_t,Ct,Et)}T.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,_t,Ct,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,yt,tt.width,tt.height,tt.depth,0,_t,Ct,tt.data);else if(T.isData3DTexture)N?(pt&&e.texStorage3D(n.TEXTURE_3D,Mt,yt,tt.width,tt.height,tt.depth),rt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,_t,Ct,tt.data)):e.texImage3D(n.TEXTURE_3D,0,yt,tt.width,tt.height,tt.depth,0,_t,Ct,tt.data);else if(T.isFramebufferTexture){if(pt)if(N)e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height);else{let ot=tt.width,et=tt.height;for(let Et=0;Et<Mt;Et++)e.texImage2D(n.TEXTURE_2D,Et,yt,ot,et,0,_t,Ct,null),ot>>=1,et>>=1}}else if(Rt.length>0){if(N&&pt){const ot=we(Rt[0]);e.texStorage2D(n.TEXTURE_2D,Mt,yt,ot.width,ot.height)}for(let ot=0,et=Rt.length;ot<et;ot++)ct=Rt[ot],N?rt&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,_t,Ct,ct):e.texImage2D(n.TEXTURE_2D,ot,yt,_t,Ct,ct);T.generateMipmaps=!1}else if(N){if(pt){const ot=we(tt);e.texStorage2D(n.TEXTURE_2D,Mt,yt,ot.width,ot.height)}rt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Ct,tt)}else e.texImage2D(n.TEXTURE_2D,0,yt,_t,Ct,tt);m(T)&&f(I),st.__version=X.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function ht(D,T,Y){if(T.image.length!==6)return;const I=U(D,T),H=T.source;e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+Y);const X=i.get(H);if(H.version!==X.__version||I===!0){e.activeTexture(n.TEXTURE0+Y);const st=Jt.getPrimaries(Jt.workingColorSpace),nt=T.colorSpace===gi?null:Jt.getPrimaries(T.colorSpace),gt=T.colorSpace===gi||st===nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const xt=T.isCompressedTexture||T.image[0].isCompressedTexture,tt=T.image[0]&&T.image[0].isDataTexture,_t=[];for(let et=0;et<6;et++)!xt&&!tt?_t[et]=_(T.image[et],!0,r.maxCubemapSize):_t[et]=tt?T.image[et].image:T.image[et],_t[et]=zt(T,_t[et]);const Ct=_t[0],yt=s.convert(T.format,T.colorSpace),ct=s.convert(T.type),Rt=E(T.internalFormat,yt,ct,T.colorSpace),N=T.isVideoTexture!==!0,pt=X.__version===void 0||I===!0,rt=H.dataReady;let Mt=R(T,Ct);Lt(n.TEXTURE_CUBE_MAP,T);let ot;if(xt){N&&pt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,Ct.width,Ct.height);for(let et=0;et<6;et++){ot=_t[et].mipmaps;for(let Et=0;Et<ot.length;Et++){const kt=ot[Et];T.format!==dn?yt!==null?N?rt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,kt.width,kt.height,yt,kt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,kt.width,kt.height,0,kt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,kt.width,kt.height,yt,ct,kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,kt.width,kt.height,0,yt,ct,kt.data)}}}else{if(ot=T.mipmaps,N&&pt){ot.length>0&&Mt++;const et=we(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,et.width,et.height)}for(let et=0;et<6;et++)if(tt){N?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,_t[et].width,_t[et].height,yt,ct,_t[et].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,_t[et].width,_t[et].height,0,yt,ct,_t[et].data);for(let Et=0;Et<ot.length;Et++){const ge=ot[Et].image[et].image;N?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,ge.width,ge.height,yt,ct,ge.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,ge.width,ge.height,0,yt,ct,ge.data)}}else{N?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,yt,ct,_t[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,yt,ct,_t[et]);for(let Et=0;Et<ot.length;Et++){const kt=ot[Et];N?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,yt,ct,kt.image[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,yt,ct,kt.image[et])}}}m(T)&&f(n.TEXTURE_CUBE_MAP),X.__version=H.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function St(D,T,Y,I,H,X){const st=s.convert(Y.format,Y.colorSpace),nt=s.convert(Y.type),gt=E(Y.internalFormat,st,nt,Y.colorSpace),xt=i.get(T),tt=i.get(Y);if(tt.__renderTarget=T,!xt.__hasExternalTextures){const _t=Math.max(1,T.width>>X),Ct=Math.max(1,T.height>>X);H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?e.texImage3D(H,X,gt,_t,Ct,T.depth,0,st,nt,null):e.texImage2D(H,X,gt,_t,Ct,0,st,nt,null)}e.bindFramebuffer(n.FRAMEBUFFER,D),Yt(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,I,H,tt.__webglTexture,0,Tt(T)):(H===n.TEXTURE_2D||H>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,I,H,tt.__webglTexture,X),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Xt(D,T,Y){if(n.bindRenderbuffer(n.RENDERBUFFER,D),T.depthBuffer){const I=T.depthTexture,H=I&&I.isDepthTexture?I.type:null,X=y(T.stencilBuffer,H),st=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=Tt(T);Yt(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt,X,T.width,T.height):Y?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt,X,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,X,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,D)}else{const I=T.textures;for(let H=0;H<I.length;H++){const X=I[H],st=s.convert(X.format,X.colorSpace),nt=s.convert(X.type),gt=E(X.internalFormat,st,nt,X.colorSpace),xt=Tt(T);Y&&Yt(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,gt,T.width,T.height):Yt(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,gt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,gt,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function wt(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const I=i.get(T.depthTexture);I.__renderTarget=T,(!I.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),V(T.depthTexture,0);const H=I.__webglTexture,X=Tt(T);if(T.depthTexture.format===ns)Yt(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,H,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,H,0);else if(T.depthTexture.format===is)Yt(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,H,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,H,0);else throw new Error("Unknown depthTexture format")}function ce(D){const T=i.get(D),Y=D.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==D.depthTexture){const I=D.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),I){const H=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,I.removeEventListener("dispose",H)};I.addEventListener("dispose",H),T.__depthDisposeCallback=H}T.__boundDepthTexture=I}if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");const I=D.texture.mipmaps;I&&I.length>0?wt(T.__webglFramebuffer[0],D):wt(T.__webglFramebuffer,D)}else if(Y){T.__webglDepthbuffer=[];for(let I=0;I<6;I++)if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[I]),T.__webglDepthbuffer[I]===void 0)T.__webglDepthbuffer[I]=n.createRenderbuffer(),Xt(T.__webglDepthbuffer[I],D,!1);else{const H=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=T.__webglDepthbuffer[I];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,H,n.RENDERBUFFER,X)}}else{const I=D.texture.mipmaps;if(I&&I.length>0?e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),Xt(T.__webglDepthbuffer,D,!1);else{const H=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,H,n.RENDERBUFFER,X)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function me(D,T,Y){const I=i.get(D);T!==void 0&&St(I.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Y!==void 0&&ce(D)}function Qt(D){const T=D.texture,Y=i.get(D),I=i.get(T);D.addEventListener("dispose",b);const H=D.textures,X=D.isWebGLCubeRenderTarget===!0,st=H.length>1;if(st||(I.__webglTexture===void 0&&(I.__webglTexture=n.createTexture()),I.__version=T.version,o.memory.textures++),X){Y.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer[nt]=[];for(let gt=0;gt<T.mipmaps.length;gt++)Y.__webglFramebuffer[nt][gt]=n.createFramebuffer()}else Y.__webglFramebuffer[nt]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer=[];for(let nt=0;nt<T.mipmaps.length;nt++)Y.__webglFramebuffer[nt]=n.createFramebuffer()}else Y.__webglFramebuffer=n.createFramebuffer();if(st)for(let nt=0,gt=H.length;nt<gt;nt++){const xt=i.get(H[nt]);xt.__webglTexture===void 0&&(xt.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Yt(D)===!1){Y.__webglMultisampledFramebuffer=n.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let nt=0;nt<H.length;nt++){const gt=H[nt];Y.__webglColorRenderbuffer[nt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Y.__webglColorRenderbuffer[nt]);const xt=s.convert(gt.format,gt.colorSpace),tt=s.convert(gt.type),_t=E(gt.internalFormat,xt,tt,gt.colorSpace,D.isXRRenderTarget===!0),Ct=Tt(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ct,_t,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.RENDERBUFFER,Y.__webglColorRenderbuffer[nt])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(Y.__webglDepthRenderbuffer=n.createRenderbuffer(),Xt(Y.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){e.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture),Lt(n.TEXTURE_CUBE_MAP,T);for(let nt=0;nt<6;nt++)if(T.mipmaps&&T.mipmaps.length>0)for(let gt=0;gt<T.mipmaps.length;gt++)St(Y.__webglFramebuffer[nt][gt],D,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt);else St(Y.__webglFramebuffer[nt],D,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(T)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let nt=0,gt=H.length;nt<gt;nt++){const xt=H[nt],tt=i.get(xt);e.bindTexture(n.TEXTURE_2D,tt.__webglTexture),Lt(n.TEXTURE_2D,xt),St(Y.__webglFramebuffer,D,xt,n.COLOR_ATTACHMENT0+nt,n.TEXTURE_2D,0),m(xt)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let nt=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(nt=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(nt,I.__webglTexture),Lt(nt,T),T.mipmaps&&T.mipmaps.length>0)for(let gt=0;gt<T.mipmaps.length;gt++)St(Y.__webglFramebuffer[gt],D,T,n.COLOR_ATTACHMENT0,nt,gt);else St(Y.__webglFramebuffer,D,T,n.COLOR_ATTACHMENT0,nt,0);m(T)&&f(nt),e.unbindTexture()}D.depthBuffer&&ce(D)}function O(D){const T=D.textures;for(let Y=0,I=T.length;Y<I;Y++){const H=T[Y];if(m(H)){const X=M(D),st=i.get(H).__webglTexture;e.bindTexture(X,st),f(X),e.unbindTexture()}}}const Ie=[],Zt=[];function re(D){if(D.samples>0){if(Yt(D)===!1){const T=D.textures,Y=D.width,I=D.height;let H=n.COLOR_BUFFER_BIT;const X=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=i.get(D),nt=T.length>1;if(nt)for(let xt=0;xt<T.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,st.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,st.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer);const gt=D.texture.mipmaps;gt&&gt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,st.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let xt=0;xt<T.length;xt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(H|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(H|=n.STENCIL_BUFFER_BIT)),nt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,st.__webglColorRenderbuffer[xt]);const tt=i.get(T[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,Y,I,0,0,Y,I,H,n.NEAREST),l===!0&&(Ie.length=0,Zt.length=0,Ie.push(n.COLOR_ATTACHMENT0+xt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ie.push(X),Zt.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Zt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ie))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),nt)for(let xt=0;xt<T.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,st.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,st.__webglColorRenderbuffer[xt]);const tt=i.get(T[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,st.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const T=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function Tt(D){return Math.min(r.maxSamples,D.samples)}function Yt(D){const T=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function At(D){const T=o.render.frame;h.get(D)!==T&&(h.set(D,T),D.update())}function zt(D,T){const Y=D.colorSpace,I=D.format,H=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||Y!==Cr&&Y!==gi&&(Jt.getTransfer(Y)===ae?(I!==dn||H!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),T}function we(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=Z,this.setTexture3D=Q,this.setTextureCube=q,this.rebindTextures=me,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Yt}function Hx(n,t){function e(i,r=gi){let s;const o=Jt.getTransfer(r);if(i===ii)return n.UNSIGNED_BYTE;if(i===Wl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Xl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ud)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ld)return n.BYTE;if(i===cd)return n.SHORT;if(i===ts)return n.UNSIGNED_SHORT;if(i===Gl)return n.INT;if(i===qi)return n.UNSIGNED_INT;if(i===Dn)return n.FLOAT;if(i===ti)return n.HALF_FLOAT;if(i===hd)return n.ALPHA;if(i===dd)return n.RGB;if(i===dn)return n.RGBA;if(i===ns)return n.DEPTH_COMPONENT;if(i===is)return n.DEPTH_STENCIL;if(i===fd)return n.RED;if(i===ql)return n.RED_INTEGER;if(i===pd)return n.RG;if(i===Yl)return n.RG_INTEGER;if(i===$l)return n.RGBA_INTEGER;if(i===no||i===io||i===ro||i===so)if(o===ae)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===no)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===so)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===no)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===io)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===so)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Qa||i===Ja||i===tl||i===el)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Qa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ja)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===tl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===el)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===nl||i===il||i===rl)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===nl||i===il)return o===ae?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===rl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===sl||i===ol||i===al||i===ll||i===cl||i===ul||i===hl||i===dl||i===fl||i===pl||i===ml||i===gl||i===_l||i===vl)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===sl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ol)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===al)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ll)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ul)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===hl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ml)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===gl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_l)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===oo||i===xl||i===yl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===oo)return o===ae?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===yl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===md||i===Sl||i===Ml||i===El)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===oo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Sl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ml)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===El)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===es?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const Vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gx=`
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

}`;class Wx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Ze,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Pe({vertexShader:Vx,fragmentShader:Gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Sn(new Co(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xx extends Lr{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,p=null,d=null,g=null;const _=new Wx,m=e.getContextAttributes();let f=null,M=null;const E=[],y=[],R=new Vt;let S=null;const b=new xn;b.viewport=new ue;const L=new xn;L.viewport=new ue;const w=[b,L],x=new cg;let C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let lt=E[J];return lt===void 0&&(lt=new da,E[J]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function(J){let lt=E[J];return lt===void 0&&(lt=new da,E[J]=lt),lt.getGripSpace()},this.getHand=function(J){let lt=E[J];return lt===void 0&&(lt=new da,E[J]=lt),lt.getHandSpace()};function z(J){const lt=y.indexOf(J.inputSource);if(lt===-1)return;const ft=E[lt];ft!==void 0&&(ft.update(J.inputSource,J.frame,c||o),ft.dispatchEvent({type:J.type,data:J.inputSource}))}function B(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",V);for(let J=0;J<E.length;J++){const lt=y[J];lt!==null&&(y[J]=null,E[J].disconnect(lt))}C=null,F=null,_.reset(),t.setRenderTarget(f),d=null,p=null,u=null,r=null,M=null,U.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(f=t.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",B),r.addEventListener("inputsourceschange",V),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(R),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,ht=null,St=null;m.depth&&(St=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=m.stencil?is:ns,ht=m.stencil?es:qi);const Xt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:s};u=new XRWebGLBinding(r,e),p=u.createProjectionLayer(Xt),r.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),M=new In(p.textureWidth,p.textureHeight,{format:dn,type:ii,depthTexture:new wd(p.textureWidth,p.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ft={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,ft),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new In(d.framebufferWidth,d.framebufferHeight,{format:dn,type:ii,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),U.setContext(r),U.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function V(J){for(let lt=0;lt<J.removed.length;lt++){const ft=J.removed[lt],ht=y.indexOf(ft);ht>=0&&(y[ht]=null,E[ht].disconnect(ft))}for(let lt=0;lt<J.added.length;lt++){const ft=J.added[lt];let ht=y.indexOf(ft);if(ht===-1){for(let Xt=0;Xt<E.length;Xt++)if(Xt>=y.length){y.push(ft),ht=Xt;break}else if(y[Xt]===null){y[Xt]=ft,ht=Xt;break}if(ht===-1)break}const St=E[ht];St&&St.connect(ft)}}const Z=new k,Q=new k;function q(J,lt,ft){Z.setFromMatrixPosition(lt.matrixWorld),Q.setFromMatrixPosition(ft.matrixWorld);const ht=Z.distanceTo(Q),St=lt.projectionMatrix.elements,Xt=ft.projectionMatrix.elements,wt=St[14]/(St[10]-1),ce=St[14]/(St[10]+1),me=(St[9]+1)/St[5],Qt=(St[9]-1)/St[5],O=(St[8]-1)/St[0],Ie=(Xt[8]+1)/Xt[0],Zt=wt*O,re=wt*Ie,Tt=ht/(-O+Ie),Yt=Tt*-O;if(lt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Yt),J.translateZ(Tt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),St[10]===-1)J.projectionMatrix.copy(lt.projectionMatrix),J.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{const At=wt+Tt,zt=ce+Tt,we=Zt-Yt,D=re+(ht-Yt),T=me*ce/zt*At,Y=Qt*ce/zt*At;J.projectionMatrix.makePerspective(we,D,T,Y,At,zt),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function it(J,lt){lt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(lt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let lt=J.near,ft=J.far;_.texture!==null&&(_.depthNear>0&&(lt=_.depthNear),_.depthFar>0&&(ft=_.depthFar)),x.near=L.near=b.near=lt,x.far=L.far=b.far=ft,(C!==x.near||F!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,F=x.far),b.layers.mask=J.layers.mask|2,L.layers.mask=J.layers.mask|4,x.layers.mask=b.layers.mask|L.layers.mask;const ht=J.parent,St=x.cameras;it(x,ht);for(let Xt=0;Xt<St.length;Xt++)it(St[Xt],ht);St.length===2?q(x,b,L):x.projectionMatrix.copy(b.projectionMatrix),P(J,x,ht)};function P(J,lt,ft){ft===null?J.matrix.copy(lt.matrixWorld):(J.matrix.copy(ft.matrixWorld),J.matrix.invert(),J.matrix.multiply(lt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(lt.projectionMatrix),J.projectionMatrixInverse.copy(lt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=rs*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(p===null&&d===null))return l},this.setFoveation=function(J){l=J,p!==null&&(p.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let dt=null;function Lt(J,lt){if(h=lt.getViewerPose(c||o),g=lt,h!==null){const ft=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let ht=!1;ft.length!==x.cameras.length&&(x.cameras.length=0,ht=!0);for(let wt=0;wt<ft.length;wt++){const ce=ft[wt];let me=null;if(d!==null)me=d.getViewport(ce);else{const O=u.getViewSubImage(p,ce);me=O.viewport,wt===0&&(t.setRenderTargetTextures(M,O.colorTexture,O.depthStencilTexture),t.setRenderTarget(M))}let Qt=w[wt];Qt===void 0&&(Qt=new xn,Qt.layers.enable(wt),Qt.viewport=new ue,w[wt]=Qt),Qt.matrix.fromArray(ce.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(ce.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(me.x,me.y,me.width,me.height),wt===0&&(x.matrix.copy(Qt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ht===!0&&x.cameras.push(Qt)}const St=r.enabledFeatures;if(St&&St.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&u){const wt=u.getDepthInformation(ft[0]);wt&&wt.isValid&&wt.texture&&_.init(t,wt,r.renderState)}}for(let ft=0;ft<E.length;ft++){const ht=y[ft],St=E[ft];ht!==null&&St!==void 0&&St.update(ht,lt,c||o)}dt&&dt(J,lt),lt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:lt}),g=null}const U=new Rd;U.setAnimationLoop(Lt),this.setAnimationLoop=function(J){dt=J},this.dispose=function(){}}}const Ii=new ri,qx=new pe;function Yx(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Md(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,M,E,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),p(m,f),f.isMeshPhysicalMaterial&&d(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,M,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===on&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===on&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=t.get(f),E=M.envMap,y=M.envMapRotation;E&&(m.envMap.value=E,Ii.copy(y),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),m.envMapRotation.value.setFromMatrix4(qx.makeRotationFromEuler(Ii)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=E*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===on&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function $x(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){const y=E.program;i.uniformBlockBinding(M,y)}function c(M,E){let y=r[M.id];y===void 0&&(g(M),y=h(M),r[M.id]=y,M.addEventListener("dispose",m));const R=E.program;i.updateUBOMapping(M,R);const S=t.render.frame;s[M.id]!==S&&(p(M),s[M.id]=S)}function h(M){const E=u();M.__bindingPointIndex=E;const y=n.createBuffer(),R=M.__size,S=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,R,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,y),y}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(M){const E=r[M.id],y=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let S=0,b=y.length;S<b;S++){const L=Array.isArray(y[S])?y[S]:[y[S]];for(let w=0,x=L.length;w<x;w++){const C=L[w];if(d(C,S,w,R)===!0){const F=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let B=0;for(let V=0;V<z.length;V++){const Z=z[V],Q=_(Z);typeof Z=="number"||typeof Z=="boolean"?(C.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,F+B,C.__data)):Z.isMatrix3?(C.__data[0]=Z.elements[0],C.__data[1]=Z.elements[1],C.__data[2]=Z.elements[2],C.__data[3]=0,C.__data[4]=Z.elements[3],C.__data[5]=Z.elements[4],C.__data[6]=Z.elements[5],C.__data[7]=0,C.__data[8]=Z.elements[6],C.__data[9]=Z.elements[7],C.__data[10]=Z.elements[8],C.__data[11]=0):(Z.toArray(C.__data,B),B+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,E,y,R){const S=M.value,b=E+"_"+y;if(R[b]===void 0)return typeof S=="number"||typeof S=="boolean"?R[b]=S:R[b]=S.clone(),!0;{const L=R[b];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return R[b]=S,!0}else if(L.equals(S)===!1)return L.copy(S),!0}return!1}function g(M){const E=M.uniforms;let y=0;const R=16;for(let b=0,L=E.length;b<L;b++){const w=Array.isArray(E[b])?E[b]:[E[b]];for(let x=0,C=w.length;x<C;x++){const F=w[x],z=Array.isArray(F.value)?F.value:[F.value];for(let B=0,V=z.length;B<V;B++){const Z=z[B],Q=_(Z),q=y%R,it=q%Q.boundary,P=q+it;y+=it,P!==0&&R-P<Q.storage&&(y+=R-P),F.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=Q.storage}}}const S=y%R;return S>0&&(y+=R-S),M.__size=y,M.__cache={},this}function _(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function m(M){const E=M.target;E.removeEventListener("dispose",m);const y=o.indexOf(E.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function f(){for(const M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Zx{constructor(t={}){const{canvas:e=wm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const M=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let R=!1;this._outputColorSpace=vn;let S=0,b=0,L=null,w=-1,x=null;const C=new ue,F=new ue;let z=null;const B=new jt(0);let V=0,Z=e.width,Q=e.height,q=1,it=null,P=null;const dt=new ue(0,0,Z,Q),Lt=new ue(0,0,Z,Q);let U=!1;const J=new yo;let lt=!1,ft=!1;const ht=new pe,St=new pe,Xt=new k,wt=new ue,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Qt(){return L===null?q:1}let O=i;function Ie(A,G){return e.getContext(A,G)}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Hl}`),e.addEventListener("webglcontextlost",Mt,!1),e.addEventListener("webglcontextrestored",ot,!1),e.addEventListener("webglcontextcreationerror",et,!1),O===null){const G="webgl2";if(O=Ie(G,A),O===null)throw Ie(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Zt,re,Tt,Yt,At,zt,we,D,T,Y,I,H,X,st,nt,gt,xt,tt,_t,Ct,yt,ct,Rt,N;function pt(){Zt=new sv(O),Zt.init(),ct=new Hx(O,Zt),re=new Q0(O,Zt,t,ct),Tt=new zx(O,Zt),re.reverseDepthBuffer&&p&&Tt.buffers.depth.setReversed(!0),Yt=new lv(O),At=new wx,zt=new Bx(O,Zt,Tt,At,re,ct,Yt),we=new tv(y),D=new rv(y),T=new pg(O),Rt=new j0(O,T),Y=new ov(O,T,Yt,Rt),I=new uv(O,Y,T,Yt),_t=new cv(O,re,zt),gt=new J0(At),H=new Tx(y,we,D,Zt,re,Rt,gt),X=new Yx(y,At),st=new Cx,nt=new Ux(Zt),tt=new Z0(y,we,D,Tt,I,d,l),xt=new Nx(y,I,re),N=new $x(O,Yt,re,Tt),Ct=new K0(O,Zt,Yt),yt=new av(O,Zt,Yt),Yt.programs=H.programs,y.capabilities=re,y.extensions=Zt,y.properties=At,y.renderLists=st,y.shadowMap=xt,y.state=Tt,y.info=Yt}pt();const rt=new Xx(y,O);this.xr=rt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const A=Zt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Zt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(A){A!==void 0&&(q=A,this.setSize(Z,Q,!1))},this.getSize=function(A){return A.set(Z,Q)},this.setSize=function(A,G,j=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=A,Q=G,e.width=Math.floor(A*q),e.height=Math.floor(G*q),j===!0&&(e.style.width=A+"px",e.style.height=G+"px"),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(Z*q,Q*q).floor()},this.setDrawingBufferSize=function(A,G,j){Z=A,Q=G,q=j,e.width=Math.floor(A*j),e.height=Math.floor(G*j),this.setViewport(0,0,A,G)},this.getCurrentViewport=function(A){return A.copy(C)},this.getViewport=function(A){return A.copy(dt)},this.setViewport=function(A,G,j,K){A.isVector4?dt.set(A.x,A.y,A.z,A.w):dt.set(A,G,j,K),Tt.viewport(C.copy(dt).multiplyScalar(q).round())},this.getScissor=function(A){return A.copy(Lt)},this.setScissor=function(A,G,j,K){A.isVector4?Lt.set(A.x,A.y,A.z,A.w):Lt.set(A,G,j,K),Tt.scissor(F.copy(Lt).multiplyScalar(q).round())},this.getScissorTest=function(){return U},this.setScissorTest=function(A){Tt.setScissorTest(U=A)},this.setOpaqueSort=function(A){it=A},this.setTransparentSort=function(A){P=A},this.getClearColor=function(A){return A.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,j=!0){let K=0;if(A){let W=!1;if(L!==null){const at=L.texture.format;W=at===$l||at===Yl||at===ql}if(W){const at=L.texture.type,mt=at===ii||at===qi||at===ts||at===es||at===Wl||at===Xl,bt=tt.getClearColor(),vt=tt.getClearAlpha(),Ut=bt.r,Ft=bt.g,Pt=bt.b;mt?(g[0]=Ut,g[1]=Ft,g[2]=Pt,g[3]=vt,O.clearBufferuiv(O.COLOR,0,g)):(_[0]=Ut,_[1]=Ft,_[2]=Pt,_[3]=vt,O.clearBufferiv(O.COLOR,0,_))}else K|=O.COLOR_BUFFER_BIT}G&&(K|=O.DEPTH_BUFFER_BIT),j&&(K|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Mt,!1),e.removeEventListener("webglcontextrestored",ot,!1),e.removeEventListener("webglcontextcreationerror",et,!1),tt.dispose(),st.dispose(),nt.dispose(),At.dispose(),we.dispose(),D.dispose(),I.dispose(),Rt.dispose(),N.dispose(),H.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",fc),rt.removeEventListener("sessionend",pc),bi.stop()};function Mt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ot(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const A=Yt.autoReset,G=xt.enabled,j=xt.autoUpdate,K=xt.needsUpdate,W=xt.type;pt(),Yt.autoReset=A,xt.enabled=G,xt.autoUpdate=j,xt.needsUpdate=K,xt.type=W}function et(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Et(A){const G=A.target;G.removeEventListener("dispose",Et),kt(G)}function kt(A){ge(A),At.remove(A)}function ge(A){const G=At.get(A).programs;G!==void 0&&(G.forEach(function(j){H.releaseProgram(j)}),A.isShaderMaterial&&H.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,j,K,W,at){G===null&&(G=ce);const mt=W.isMesh&&W.matrixWorld.determinant()<0,bt=Ff(A,G,j,K,W);Tt.setMaterial(K,mt);let vt=j.index,Ut=1;if(K.wireframe===!0){if(vt=Y.getWireframeAttribute(j),vt===void 0)return;Ut=2}const Ft=j.drawRange,Pt=j.attributes.position;let $t=Ft.start*Ut,oe=(Ft.start+Ft.count)*Ut;at!==null&&($t=Math.max($t,at.start*Ut),oe=Math.min(oe,(at.start+at.count)*Ut)),vt!==null?($t=Math.max($t,0),oe=Math.min(oe,vt.count)):Pt!=null&&($t=Math.max($t,0),oe=Math.min(oe,Pt.count));const ye=oe-$t;if(ye<0||ye===1/0)return;Rt.setup(W,K,bt,j,vt);let Me,te=Ct;if(vt!==null&&(Me=T.get(vt),te=yt,te.setIndex(Me)),W.isMesh)K.wireframe===!0?(Tt.setLineWidth(K.wireframeLinewidth*Qt()),te.setMode(O.LINES)):te.setMode(O.TRIANGLES);else if(W.isLine){let It=K.linewidth;It===void 0&&(It=1),Tt.setLineWidth(It*Qt()),W.isLineSegments?te.setMode(O.LINES):W.isLineLoop?te.setMode(O.LINE_LOOP):te.setMode(O.LINE_STRIP)}else W.isPoints?te.setMode(O.POINTS):W.isSprite&&te.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Mr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),te.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))te.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const It=W._multiDrawStarts,Fe=W._multiDrawCounts,ne=W._multiDrawCount,En=vt?T.get(vt).bytesPerElement:1,Ki=At.get(K).currentProgram.getUniforms();for(let cn=0;cn<ne;cn++)Ki.setValue(O,"_gl_DrawID",cn),te.render(It[cn]/En,Fe[cn])}else if(W.isInstancedMesh)te.renderInstances($t,ye,W.count);else if(j.isInstancedBufferGeometry){const It=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Fe=Math.min(j.instanceCount,It);te.renderInstances($t,ye,Fe)}else te.render($t,ye)};function se(A,G,j){A.transparent===!0&&A.side===zn&&A.forceSinglePass===!1?(A.side=on,A.needsUpdate=!0,hs(A,G,j),A.side=yi,A.needsUpdate=!0,hs(A,G,j),A.side=zn):hs(A,G,j)}this.compile=function(A,G,j=null){j===null&&(j=A),f=nt.get(j),f.init(G),E.push(f),j.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(f.pushLight(W),W.castShadow&&f.pushShadow(W))}),A!==j&&A.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(f.pushLight(W),W.castShadow&&f.pushShadow(W))}),f.setupLights();const K=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const at=W.material;if(at)if(Array.isArray(at))for(let mt=0;mt<at.length;mt++){const bt=at[mt];se(bt,j,W),K.add(bt)}else se(at,j,W),K.add(at)}),f=E.pop(),K},this.compileAsync=function(A,G,j=null){const K=this.compile(A,G,j);return new Promise(W=>{function at(){if(K.forEach(function(mt){At.get(mt).currentProgram.isReady()&&K.delete(mt)}),K.size===0){W(A);return}setTimeout(at,10)}Zt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Mn=null;function Gn(A){Mn&&Mn(A)}function fc(){bi.stop()}function pc(){bi.start()}const bi=new Rd;bi.setAnimationLoop(Gn),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(A){Mn=A,rt.setAnimationLoop(A),A===null?bi.stop():bi.start()},rt.addEventListener("sessionstart",fc),rt.addEventListener("sessionend",pc),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(G),G=rt.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,G,L),f=nt.get(A,E.length),f.init(G),E.push(f),St.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),J.setFromProjectionMatrix(St),ft=this.localClippingEnabled,lt=gt.init(this.clippingPlanes,ft),m=st.get(A,M.length),m.init(),M.push(m),rt.enabled===!0&&rt.isPresenting===!0){const at=y.xr.getDepthSensingMesh();at!==null&&Uo(at,G,-1/0,y.sortObjects)}Uo(A,G,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(it,P),me=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,me&&tt.addToRenderList(m,A),this.info.render.frame++,lt===!0&&gt.beginShadows();const j=f.state.shadowsArray;xt.render(j,A,G),lt===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,W=m.transmissive;if(f.setupLights(),G.isArrayCamera){const at=G.cameras;if(W.length>0)for(let mt=0,bt=at.length;mt<bt;mt++){const vt=at[mt];gc(K,W,A,vt)}me&&tt.render(A);for(let mt=0,bt=at.length;mt<bt;mt++){const vt=at[mt];mc(m,A,vt,vt.viewport)}}else W.length>0&&gc(K,W,A,G),me&&tt.render(A),mc(m,A,G);L!==null&&b===0&&(zt.updateMultisampleRenderTarget(L),zt.updateRenderTargetMipmap(L)),A.isScene===!0&&A.onAfterRender(y,A,G),Rt.resetDefaultState(),w=-1,x=null,E.pop(),E.length>0?(f=E[E.length-1],lt===!0&&gt.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Uo(A,G,j,K){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||J.intersectsSprite(A)){K&&wt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(St);const mt=I.update(A),bt=A.material;bt.visible&&m.push(A,mt,bt,j,wt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||J.intersectsObject(A))){const mt=I.update(A),bt=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),wt.copy(A.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),wt.copy(mt.boundingSphere.center)),wt.applyMatrix4(A.matrixWorld).applyMatrix4(St)),Array.isArray(bt)){const vt=mt.groups;for(let Ut=0,Ft=vt.length;Ut<Ft;Ut++){const Pt=vt[Ut],$t=bt[Pt.materialIndex];$t&&$t.visible&&m.push(A,mt,$t,j,wt.z,Pt)}}else bt.visible&&m.push(A,mt,bt,j,wt.z,null)}}const at=A.children;for(let mt=0,bt=at.length;mt<bt;mt++)Uo(at[mt],G,j,K)}function mc(A,G,j,K){const W=A.opaque,at=A.transmissive,mt=A.transparent;f.setupLightsView(j),lt===!0&&gt.setGlobalState(y.clippingPlanes,j),K&&Tt.viewport(C.copy(K)),W.length>0&&us(W,G,j),at.length>0&&us(at,G,j),mt.length>0&&us(mt,G,j),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function gc(A,G,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[K.id]===void 0&&(f.state.transmissionRenderTarget[K.id]=new In(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?ti:ii,minFilter:Hi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const at=f.state.transmissionRenderTarget[K.id],mt=K.viewport||C;at.setSize(mt.z*y.transmissionResolutionScale,mt.w*y.transmissionResolutionScale);const bt=y.getRenderTarget();y.setRenderTarget(at),y.getClearColor(B),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear(),me&&tt.render(j);const vt=y.toneMapping;y.toneMapping=xi;const Ut=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),f.setupLightsView(K),lt===!0&&gt.setGlobalState(y.clippingPlanes,K),us(A,j,K),zt.updateMultisampleRenderTarget(at),zt.updateRenderTargetMipmap(at),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let Pt=0,$t=G.length;Pt<$t;Pt++){const oe=G[Pt],ye=oe.object,Me=oe.geometry,te=oe.material,It=oe.group;if(te.side===zn&&ye.layers.test(K.layers)){const Fe=te.side;te.side=on,te.needsUpdate=!0,_c(ye,j,K,Me,te,It),te.side=Fe,te.needsUpdate=!0,Ft=!0}}Ft===!0&&(zt.updateMultisampleRenderTarget(at),zt.updateRenderTargetMipmap(at))}y.setRenderTarget(bt),y.setClearColor(B,V),Ut!==void 0&&(K.viewport=Ut),y.toneMapping=vt}function us(A,G,j){const K=G.isScene===!0?G.overrideMaterial:null;for(let W=0,at=A.length;W<at;W++){const mt=A[W],bt=mt.object,vt=mt.geometry,Ut=mt.group;let Ft=mt.material;Ft.allowOverride===!0&&K!==null&&(Ft=K),bt.layers.test(j.layers)&&_c(bt,G,j,vt,Ft,Ut)}}function _c(A,G,j,K,W,at){A.onBeforeRender(y,G,j,K,W,at),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(y,G,j,K,A,at),W.transparent===!0&&W.side===zn&&W.forceSinglePass===!1?(W.side=on,W.needsUpdate=!0,y.renderBufferDirect(j,G,K,W,A,at),W.side=yi,W.needsUpdate=!0,y.renderBufferDirect(j,G,K,W,A,at),W.side=zn):y.renderBufferDirect(j,G,K,W,A,at),A.onAfterRender(y,G,j,K,W,at)}function hs(A,G,j){G.isScene!==!0&&(G=ce);const K=At.get(A),W=f.state.lights,at=f.state.shadowsArray,mt=W.state.version,bt=H.getParameters(A,W.state,at,G,j),vt=H.getProgramCacheKey(bt);let Ut=K.programs;K.environment=A.isMeshStandardMaterial?G.environment:null,K.fog=G.fog,K.envMap=(A.isMeshStandardMaterial?D:we).get(A.envMap||K.environment),K.envMapRotation=K.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Ut===void 0&&(A.addEventListener("dispose",Et),Ut=new Map,K.programs=Ut);let Ft=Ut.get(vt);if(Ft!==void 0){if(K.currentProgram===Ft&&K.lightsStateVersion===mt)return xc(A,bt),Ft}else bt.uniforms=H.getUniforms(A),A.onBeforeCompile(bt,y),Ft=H.acquireProgram(bt,vt),Ut.set(vt,Ft),K.uniforms=bt.uniforms;const Pt=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pt.clippingPlanes=gt.uniform),xc(A,bt),K.needsLights=kf(A),K.lightsStateVersion=mt,K.needsLights&&(Pt.ambientLightColor.value=W.state.ambient,Pt.lightProbe.value=W.state.probe,Pt.directionalLights.value=W.state.directional,Pt.directionalLightShadows.value=W.state.directionalShadow,Pt.spotLights.value=W.state.spot,Pt.spotLightShadows.value=W.state.spotShadow,Pt.rectAreaLights.value=W.state.rectArea,Pt.ltc_1.value=W.state.rectAreaLTC1,Pt.ltc_2.value=W.state.rectAreaLTC2,Pt.pointLights.value=W.state.point,Pt.pointLightShadows.value=W.state.pointShadow,Pt.hemisphereLights.value=W.state.hemi,Pt.directionalShadowMap.value=W.state.directionalShadowMap,Pt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Pt.spotShadowMap.value=W.state.spotShadowMap,Pt.spotLightMatrix.value=W.state.spotLightMatrix,Pt.spotLightMap.value=W.state.spotLightMap,Pt.pointShadowMap.value=W.state.pointShadowMap,Pt.pointShadowMatrix.value=W.state.pointShadowMatrix),K.currentProgram=Ft,K.uniformsList=null,Ft}function vc(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=ao.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function xc(A,G){const j=At.get(A);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.batchingColor=G.batchingColor,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.instancingMorph=G.instancingMorph,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function Ff(A,G,j,K,W){G.isScene!==!0&&(G=ce),zt.resetTextureUnits();const at=G.fog,mt=K.isMeshStandardMaterial?G.environment:null,bt=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Cr,vt=(K.isMeshStandardMaterial?D:we).get(K.envMap||mt),Ut=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ft=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Pt=!!j.morphAttributes.position,$t=!!j.morphAttributes.normal,oe=!!j.morphAttributes.color;let ye=xi;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ye=y.toneMapping);const Me=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,te=Me!==void 0?Me.length:0,It=At.get(K),Fe=f.state.lights;if(lt===!0&&(ft===!0||A!==x)){const We=A===x&&K.id===w;gt.setState(K,A,We)}let ne=!1;K.version===It.__version?(It.needsLights&&It.lightsStateVersion!==Fe.state.version||It.outputColorSpace!==bt||W.isBatchedMesh&&It.batching===!1||!W.isBatchedMesh&&It.batching===!0||W.isBatchedMesh&&It.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&It.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&It.instancing===!1||!W.isInstancedMesh&&It.instancing===!0||W.isSkinnedMesh&&It.skinning===!1||!W.isSkinnedMesh&&It.skinning===!0||W.isInstancedMesh&&It.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&It.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&It.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&It.instancingMorph===!1&&W.morphTexture!==null||It.envMap!==vt||K.fog===!0&&It.fog!==at||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==gt.numPlanes||It.numIntersection!==gt.numIntersection)||It.vertexAlphas!==Ut||It.vertexTangents!==Ft||It.morphTargets!==Pt||It.morphNormals!==$t||It.morphColors!==oe||It.toneMapping!==ye||It.morphTargetsCount!==te)&&(ne=!0):(ne=!0,It.__version=K.version);let En=It.currentProgram;ne===!0&&(En=hs(K,G,W));let Ki=!1,cn=!1,Or=!1;const ve=En.getUniforms(),pn=It.uniforms;if(Tt.useProgram(En.program)&&(Ki=!0,cn=!0,Or=!0),K.id!==w&&(w=K.id,cn=!0),Ki||x!==A){Tt.buffers.depth.getReversed()?(ht.copy(A.projectionMatrix),Cm(ht),Rm(ht),ve.setValue(O,"projectionMatrix",ht)):ve.setValue(O,"projectionMatrix",A.projectionMatrix),ve.setValue(O,"viewMatrix",A.matrixWorldInverse);const Ke=ve.map.cameraPosition;Ke!==void 0&&Ke.setValue(O,Xt.setFromMatrixPosition(A.matrixWorld)),re.logarithmicDepthBuffer&&ve.setValue(O,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ve.setValue(O,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,cn=!0,Or=!0)}if(W.isSkinnedMesh){ve.setOptional(O,W,"bindMatrix"),ve.setOptional(O,W,"bindMatrixInverse");const We=W.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),ve.setValue(O,"boneTexture",We.boneTexture,zt))}W.isBatchedMesh&&(ve.setOptional(O,W,"batchingTexture"),ve.setValue(O,"batchingTexture",W._matricesTexture,zt),ve.setOptional(O,W,"batchingIdTexture"),ve.setValue(O,"batchingIdTexture",W._indirectTexture,zt),ve.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&ve.setValue(O,"batchingColorTexture",W._colorsTexture,zt));const mn=j.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&_t.update(W,j,En),(cn||It.receiveShadow!==W.receiveShadow)&&(It.receiveShadow=W.receiveShadow,ve.setValue(O,"receiveShadow",W.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(pn.envMap.value=vt,pn.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&G.environment!==null&&(pn.envMapIntensity.value=G.environmentIntensity),cn&&(ve.setValue(O,"toneMappingExposure",y.toneMappingExposure),It.needsLights&&Nf(pn,Or),at&&K.fog===!0&&X.refreshFogUniforms(pn,at),X.refreshMaterialUniforms(pn,K,q,Q,f.state.transmissionRenderTarget[A.id]),ao.upload(O,vc(It),pn,zt)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ao.upload(O,vc(It),pn,zt),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ve.setValue(O,"center",W.center),ve.setValue(O,"modelViewMatrix",W.modelViewMatrix),ve.setValue(O,"normalMatrix",W.normalMatrix),ve.setValue(O,"modelMatrix",W.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const We=K.uniformsGroups;for(let Ke=0,Oo=We.length;Ke<Oo;Ke++){const Ti=We[Ke];N.update(Ti,En),N.bind(Ti,En)}}return En}function Nf(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function kf(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,G,j){const K=At.get(A);K.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),At.get(A.texture).__webglTexture=G,At.get(A.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:j,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const j=At.get(A);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0};const zf=O.createFramebuffer();this.setRenderTarget=function(A,G=0,j=0){L=A,S=G,b=j;let K=!0,W=null,at=!1,mt=!1;if(A){const vt=At.get(A);if(vt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(O.FRAMEBUFFER,null),K=!1;else if(vt.__webglFramebuffer===void 0)zt.setupRenderTarget(A);else if(vt.__hasExternalTextures)zt.rebindTextures(A,At.get(A.texture).__webglTexture,At.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Pt=A.depthTexture;if(vt.__boundDepthTexture!==Pt){if(Pt!==null&&At.has(Pt)&&(A.width!==Pt.image.width||A.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");zt.setupDepthRenderbuffer(A)}}const Ut=A.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(mt=!0);const Ft=At.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ft[G])?W=Ft[G][j]:W=Ft[G],at=!0):A.samples>0&&zt.useMultisampledRTT(A)===!1?W=At.get(A).__webglMultisampledFramebuffer:Array.isArray(Ft)?W=Ft[j]:W=Ft,C.copy(A.viewport),F.copy(A.scissor),z=A.scissorTest}else C.copy(dt).multiplyScalar(q).floor(),F.copy(Lt).multiplyScalar(q).floor(),z=U;if(j!==0&&(W=zf),Tt.bindFramebuffer(O.FRAMEBUFFER,W)&&K&&Tt.drawBuffers(A,W),Tt.viewport(C),Tt.scissor(F),Tt.setScissorTest(z),at){const vt=At.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+G,vt.__webglTexture,j)}else if(mt){const vt=At.get(A.texture),Ut=G;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,vt.__webglTexture,j,Ut)}else if(A!==null&&j!==0){const vt=At.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,vt.__webglTexture,j)}w=-1},this.readRenderTargetPixels=function(A,G,j,K,W,at,mt,bt=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=At.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&mt!==void 0&&(vt=vt[mt]),vt){Tt.bindFramebuffer(O.FRAMEBUFFER,vt);try{const Ut=A.textures[bt],Ft=Ut.format,Pt=Ut.type;if(!re.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-K&&j>=0&&j<=A.height-W&&(A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+bt),O.readPixels(G,j,K,W,ct.convert(Ft),ct.convert(Pt),at))}finally{const Ut=L!==null?At.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(O.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(A,G,j,K,W,at,mt,bt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=At.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&mt!==void 0&&(vt=vt[mt]),vt)if(G>=0&&G<=A.width-K&&j>=0&&j<=A.height-W){Tt.bindFramebuffer(O.FRAMEBUFFER,vt);const Ut=A.textures[bt],Ft=Ut.format,Pt=Ut.type;if(!re.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,$t),O.bufferData(O.PIXEL_PACK_BUFFER,at.byteLength,O.STREAM_READ),A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+bt),O.readPixels(G,j,K,W,ct.convert(Ft),ct.convert(Pt),0);const oe=L!==null?At.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(O.FRAMEBUFFER,oe);const ye=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Am(O,ye,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,$t),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,at),O.deleteBuffer($t),O.deleteSync(ye),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,j=0){const K=Math.pow(2,-j),W=Math.floor(A.image.width*K),at=Math.floor(A.image.height*K),mt=G!==null?G.x:0,bt=G!==null?G.y:0;zt.setTexture2D(A,0),O.copyTexSubImage2D(O.TEXTURE_2D,j,0,0,mt,bt,W,at),Tt.unbindTexture()};const Bf=O.createFramebuffer(),Hf=O.createFramebuffer();this.copyTextureToTexture=function(A,G,j=null,K=null,W=0,at=null){at===null&&(W!==0?(Mr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=W,W=0):at=0);let mt,bt,vt,Ut,Ft,Pt,$t,oe,ye;const Me=A.isCompressedTexture?A.mipmaps[at]:A.image;if(j!==null)mt=j.max.x-j.min.x,bt=j.max.y-j.min.y,vt=j.isBox3?j.max.z-j.min.z:1,Ut=j.min.x,Ft=j.min.y,Pt=j.isBox3?j.min.z:0;else{const mn=Math.pow(2,-W);mt=Math.floor(Me.width*mn),bt=Math.floor(Me.height*mn),A.isDataArrayTexture?vt=Me.depth:A.isData3DTexture?vt=Math.floor(Me.depth*mn):vt=1,Ut=0,Ft=0,Pt=0}K!==null?($t=K.x,oe=K.y,ye=K.z):($t=0,oe=0,ye=0);const te=ct.convert(G.format),It=ct.convert(G.type);let Fe;G.isData3DTexture?(zt.setTexture3D(G,0),Fe=O.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(zt.setTexture2DArray(G,0),Fe=O.TEXTURE_2D_ARRAY):(zt.setTexture2D(G,0),Fe=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment);const ne=O.getParameter(O.UNPACK_ROW_LENGTH),En=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ki=O.getParameter(O.UNPACK_SKIP_PIXELS),cn=O.getParameter(O.UNPACK_SKIP_ROWS),Or=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Me.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Me.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ut),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ft),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Pt);const ve=A.isDataArrayTexture||A.isData3DTexture,pn=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const mn=At.get(A),We=At.get(G),Ke=At.get(mn.__renderTarget),Oo=At.get(We.__renderTarget);Tt.bindFramebuffer(O.READ_FRAMEBUFFER,Ke.__webglFramebuffer),Tt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Oo.__webglFramebuffer);for(let Ti=0;Ti<vt;Ti++)ve&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,At.get(A).__webglTexture,W,Pt+Ti),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,At.get(G).__webglTexture,at,ye+Ti)),O.blitFramebuffer(Ut,Ft,mt,bt,$t,oe,mt,bt,O.DEPTH_BUFFER_BIT,O.NEAREST);Tt.bindFramebuffer(O.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||At.has(A)){const mn=At.get(A),We=At.get(G);Tt.bindFramebuffer(O.READ_FRAMEBUFFER,Bf),Tt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Hf);for(let Ke=0;Ke<vt;Ke++)ve?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,mn.__webglTexture,W,Pt+Ke):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,mn.__webglTexture,W),pn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,We.__webglTexture,at,ye+Ke):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,We.__webglTexture,at),W!==0?O.blitFramebuffer(Ut,Ft,mt,bt,$t,oe,mt,bt,O.COLOR_BUFFER_BIT,O.NEAREST):pn?O.copyTexSubImage3D(Fe,at,$t,oe,ye+Ke,Ut,Ft,mt,bt):O.copyTexSubImage2D(Fe,at,$t,oe,Ut,Ft,mt,bt);Tt.bindFramebuffer(O.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else pn?A.isDataTexture||A.isData3DTexture?O.texSubImage3D(Fe,at,$t,oe,ye,mt,bt,vt,te,It,Me.data):G.isCompressedArrayTexture?O.compressedTexSubImage3D(Fe,at,$t,oe,ye,mt,bt,vt,te,Me.data):O.texSubImage3D(Fe,at,$t,oe,ye,mt,bt,vt,te,It,Me):A.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,at,$t,oe,mt,bt,te,It,Me.data):A.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,at,$t,oe,Me.width,Me.height,te,Me.data):O.texSubImage2D(O.TEXTURE_2D,at,$t,oe,mt,bt,te,It,Me);O.pixelStorei(O.UNPACK_ROW_LENGTH,ne),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,En),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ki),O.pixelStorei(O.UNPACK_SKIP_ROWS,cn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Or),at===0&&G.generateMipmaps&&O.generateMipmap(Fe),Tt.unbindTexture()},this.copyTextureToTexture3D=function(A,G,j=null,K=null,W=0){return Mr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,G,j,K,W)},this.initRenderTarget=function(A){At.get(A).__webglFramebuffer===void 0&&zt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?zt.setTextureCube(A,0):A.isData3DTexture?zt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?zt.setTexture2DArray(A,0):zt.setTexture2D(A,0),Tt.unbindTexture()},this.resetState=function(){S=0,b=0,L=null,Tt.reset(),Rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Vt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};nn.line={uniforms:Yi.merge([ut.common,ut.fog,ut.line]),vertexShader:`
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
		`};class Ud extends Pe{constructor(t){super({type:"LineMaterial",uniforms:Yi.clone(nn.line.uniforms),vertexShader:nn.line.vertexShader,fragmentShader:nn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const ju=new si,Xs=new k;class Od extends lg{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Be(t,3)),this.setAttribute("uv",new Be(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new wl(e,6,1);return this.setAttribute("instanceStart",new vi(i,3,0)),this.setAttribute("instanceEnd",new vi(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new wl(e,6,1);return this.setAttribute("instanceColorStart",new vi(i,3,0)),this.setAttribute("instanceColorEnd",new vi(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new rg(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ju.setFromBufferAttribute(e),this.boundingBox.union(ju))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mi),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Xs.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Xs)),Xs.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Xs));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const ya=new ue,Ku=new k,Qu=new k,Ne=new ue,ke=new ue,Nn=new ue,Sa=new k,Ma=new pe,ze=new dg,Ju=new k,qs=new si,Ys=new Mi,kn=new ue;let Bn,Gi;function th(n,t,e){return kn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),kn.multiplyScalar(1/kn.w),kn.x=Gi/e.width,kn.y=Gi/e.height,kn.applyMatrix4(n.projectionMatrixInverse),kn.multiplyScalar(1/kn.w),Math.abs(Math.max(kn.x,kn.y))}function jx(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,l=o;a<l;a++){ze.start.fromBufferAttribute(r,a),ze.end.fromBufferAttribute(s,a),ze.applyMatrix4(e);const c=new k,h=new k;Bn.distanceSqToSegment(ze.start,ze.end,h,c),h.distanceTo(c)<Gi*.5&&t.push({point:h,pointOnLine:c,distance:Bn.origin.distanceTo(h),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function Kx(n,t,e){const i=t.projectionMatrix,s=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),u=-t.near;Bn.at(1,Nn),Nn.w=1,Nn.applyMatrix4(t.matrixWorldInverse),Nn.applyMatrix4(i),Nn.multiplyScalar(1/Nn.w),Nn.x*=s.x/2,Nn.y*=s.y/2,Nn.z=0,Sa.copy(Nn),Ma.multiplyMatrices(t.matrixWorldInverse,o);for(let p=0,d=h;p<d;p++){if(Ne.fromBufferAttribute(l,p),ke.fromBufferAttribute(c,p),Ne.w=1,ke.w=1,Ne.applyMatrix4(Ma),ke.applyMatrix4(Ma),Ne.z>u&&ke.z>u)continue;if(Ne.z>u){const E=Ne.z-ke.z,y=(Ne.z-u)/E;Ne.lerp(ke,y)}else if(ke.z>u){const E=ke.z-Ne.z,y=(ke.z-u)/E;ke.lerp(Ne,y)}Ne.applyMatrix4(i),ke.applyMatrix4(i),Ne.multiplyScalar(1/Ne.w),ke.multiplyScalar(1/ke.w),Ne.x*=s.x/2,Ne.y*=s.y/2,ke.x*=s.x/2,ke.y*=s.y/2,ze.start.copy(Ne),ze.start.z=0,ze.end.copy(ke),ze.end.z=0;const _=ze.closestPointToPointParameter(Sa,!0);ze.at(_,Ju);const m=Tm.lerp(Ne.z,ke.z,_),f=m>=-1&&m<=1,M=Sa.distanceTo(Ju)<Gi*.5;if(f&&M){ze.start.fromBufferAttribute(l,p),ze.end.fromBufferAttribute(c,p),ze.start.applyMatrix4(o),ze.end.applyMatrix4(o);const E=new k,y=new k;Bn.distanceSqToSegment(ze.start,ze.end,y,E),e.push({point:y,pointOnLine:E,distance:Bn.origin.distanceTo(y),object:n,face:null,faceIndex:p,uv:null,uv1:null})}}}class Qx extends Sn{constructor(t=new Od,e=new Ud({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)Ku.fromBufferAttribute(e,o),Qu.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Ku.distanceTo(Qu);const s=new wl(r,2,1);return t.setAttribute("instanceDistanceStart",new vi(s,1,0)),t.setAttribute("instanceDistanceEnd",new vi(s,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Bn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Gi=l.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),Ys.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=Gi*.5;else{const u=Math.max(r.near,Ys.distanceToPoint(Bn.origin));c=th(r,u,l.resolution)}if(Ys.radius+=c,Bn.intersectsSphere(Ys)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),qs.copy(a.boundingBox).applyMatrix4(o);let h;if(i)h=Gi*.5;else{const u=Math.max(r.near,qs.distanceToPoint(Bn.origin));h=th(r,u,l.resolution)}qs.expandByScalar(h),Bn.intersectsBox(qs)!==!1&&(i?jx(this,e):Kx(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(ya),this.material.uniforms.resolution.value.set(ya.z,ya.w))}}const lo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ur{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Jx=new Ad(-1,1,1,-1,0,1);class ty extends ln{constructor(){super(),this.setAttribute("position",new Be([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Be([0,2,0,0,2,0],2))}}const ey=new ty;class ec{constructor(t){this._mesh=new Sn(ey,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Jx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Fd extends Ur{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Pe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Yi.clone(t.uniforms),this.material=new Pe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new ec(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class eh extends Ur{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const r=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class ny extends Ur{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class iy{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Vt);this._width=i.width,this._height=i.height,e=new In(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ti}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fd(lo),this.copyPass.material.blending=Jn,this.clock=new Cd}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}eh!==void 0&&(o instanceof eh?i=!0:o instanceof ny&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Vt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const $s={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class ry extends Ur{constructor(){super(),this.uniforms=Yi.clone($s.uniforms),this.material=new sg({name:$s.name,uniforms:this.uniforms,vertexShader:$s.vertexShader,fragmentShader:$s.fragmentShader}),this._fsQuad=new ec(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jt.getTransfer(this._outputColorSpace)===ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ed?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===nd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===id?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===sd?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===od?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===rd&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class sy extends Ur{constructor(t,e,i=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new jt}render(t,e,i){const r=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=r}}const oy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new jt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Pr extends Ur{constructor(t,e=1,i,r){super(),this.strength=e,this.radius=i,this.threshold=r,this.resolution=t!==void 0?new Vt(t.x,t.y):new Vt(256,256),this.clearColor=new jt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new In(s,o,{type:ti}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new In(s,o,{type:ti});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const p=new In(s,o,{type:ti});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),o=Math.round(o/2)}const a=oy;this.highPassUniforms=Yi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Pe({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Vt(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Yi.clone(lo.uniforms),this.blendMaterial=new Pe({uniforms:this.copyUniforms,vertexShader:lo.vertexShader,fragmentShader:lo.fragmentShader,blending:go,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new jt,this._oldClearAlpha=1,this._basic=new Jl,this._fsQuad=new ec(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Vt(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(t,e,i,r,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Pr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Pr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Pe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Vt(.5,.5)},direction:{value:new Vt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(t){return new Pe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Pr.BlurDirectionX=new Vt(1,0);Pr.BlurDirectionY=new Vt(0,1);const nc=["conflict","stale","superseded","orphan","lint_error"];function Nd(n=typeof navigator>"u"?void 0:navigator){const t=n?.userAgentData?.platform||n?.platform||n?.userAgent||"";return/mac|iphone|ipad|ipod/i.test(t)}function ay(n=Nd()){return n?{alt:"⌥",mod:"⌘",history:"⌘",join:(t,e)=>`${t}${e}`}:{alt:"Alt",mod:"Ctrl",history:"Alt",join:(t,e)=>`${t}+${e}`}}function ly(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function nh(n){let t=typeof n=="string"?ly(n):n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ea(n){const t=Math.max(n(),1e-9);return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n())}const co=12,kd=10;function zd(n,t){const e=s=>{let o=n.map(a=>[a[0],a[1],a[2]]);for(;o.length>1;)o=o.slice(1).map((a,l)=>a.map((c,h)=>o[l][h]+(c-o[l][h])*s));return o[0]},i=[];let r=e(0);for(let s=1;s<=t;s++){const o=e(s/t);i.push(...r,...o),r=o}return i}function gr(n,t,e=.22,i=co){const r=Math.hypot(t[0]-n[0],t[1]-n[1],t[2]-n[2]),s=[(n[0]+t[0])/2,(n[1]+t[1])/2+r*e,(n[2]+t[2])/2];return zd([n,s,t],i)}function cy(n,t,e=kd){const i=(n[1]-t[1])/2;return zd([n,[n[0],n[1]-i,n[2]],[t[0],t[1]+i,t[2]],t],e)}function Zs(n,t,e,i){const r=[];for(let s=0;s<t;s++)for(const o of[s/t,(s+1)/t]){const a=e+(i-e)*o;r.push(n[0]*a,n[1]*a,n[2]*a)}return r}const uy={topic:7.2,folder:7,page:7.2,note:6.6,inbox:7.4},hy={topic:24,folder:22,page:24,note:20,inbox:24};class dy{root;slots=[];v=new k;max=90;constructor(t){this.root=document.createElement("div"),this.root.className="labels",t.appendChild(this.root)}slot(t){let e=this.slots[t];if(!e){const i=document.createElement("div"),r=document.createElement("span");r.className="lbl-dot";const s=document.createElement("span");s.className="lbl-text";const o=document.createElement("span");o.className="lbl-sub",i.append(r,s,o),this.root.appendChild(i),e={el:i,text:s,sub:o,dot:r,key:"",shown:!1},this.slots[t]=e}return e}update(t,e,i,r){const s=[];t.sort((a,l)=>l.priority-a.priority);let o=0;for(const a of t){if(o>=this.max)break;if(this.v.copy(a.pos).project(e),this.v.z>1||this.v.z<-1)continue;const l=(this.v.x*.5+.5)*i,c=(-this.v.y*.5+.5)*r-(a.lift??0),h=a.text.length+(a.sub?a.sub.length+2:0),u=Math.min(360,h*uy[a.kind]+30),p=hy[a.kind],d={x0:l-u/2,y0:c-p,x1:l+u/2,y1:c};if(d.x1<0||d.x0>i||d.y1<0||d.y0>r||s.some(_=>d.x0<_.x1&&d.x1>_.x0&&d.y0<_.y1&&d.y1>_.y0))continue;s.push(d);const g=this.slot(o++);g.key!==a.key?(g.key=a.key,g.el.className=`lbl lbl-${a.kind}${a.emphasis?" lbl-emph":""}`,g.text.textContent=a.text,g.sub.textContent=a.sub??"",g.dot.style.background=a.color??"transparent"):g.el.classList.contains("lbl-emph")!==!!a.emphasis&&g.el.classList.toggle("lbl-emph",!!a.emphasis),g.el.style.transform=`translate3d(${Math.round(l)}px, ${Math.round(c)}px, 0) translate(-50%, -100%)`,g.shown||(g.el.style.opacity="1",g.shown=!0)}for(let a=o;a<this.slots.length;a++){const l=this.slots[a];l.shown&&(l.el.style.opacity="0",l.shown=!1,l.key="")}}setVisible(t){this.root.style.display=t?"":"none"}}function ic(n){return n.transparent=!0,n.depthWrite=!1,n.blending=Jh,n.blendEquation=mi,n.blendSrc=ka,n.blendDst=ka,n}function ih(n,t){return ic(new Pe({uniforms:{uScale:{value:500},uGroups:{value:n},uGroupCount:{value:t},uFalloff:{value:4},uMinPx:{value:0}},vertexShader:`
        uniform float uScale;
        uniform sampler2D uGroups;
        uniform float uGroupCount;
        uniform float uMinPx;
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
          // A floor in pixels keeps far, small markers on screen.
          float px = max(aSize * uScale / max(-mv.z, 1.0), uMinPx);
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
        }`}))}function fy(){const n=ic(new Pe({uniforms:{uFade:{value:1},uHealth:{value:0}},vertexShader:`
        uniform float uFade;
        uniform float uHealth;
        attribute vec3 aColor;
        attribute float aAlpha;
        attribute float aEdge;
        attribute float aState;
        attribute float aFlag;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float a = aAlpha * uFade * (0.5 + 0.5 * aEdge);
          if (aState > 2.5) a *= 1.9;            // selected
          else if (aState > 1.5) a *= 1.5;       // neighbour or highlighted
          else if (aState > 0.5) a *= 0.3;       // dimmed by focus
          if (uHealth > 0.5 && aFlag < 0.5) a *= 0.2;
          vColor = aColor;
          vAlpha = a;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(vColor * vAlpha, vAlpha);
        }`}));return n.side=zn,n}function py(){return ic(new Pe({uniforms:{uScale:{value:500},uHealth:{value:0},uTime:{value:0},uMotion:{value:1},uFade:{value:1}},vertexShader:`
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
          // Indexed by FLAGS (types.ts) + 1; keep in step with FLAG_COLOR (hud/ui.tsx).
          if (f < 1.5) return vec3(1.0, 0.23, 0.31);   // conflict
          if (f < 2.5) return vec3(1.0, 0.68, 0.22);   // stale
          if (f < 3.5) return vec3(0.74, 0.52, 1.0);   // superseded
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
        }`}))}const my={uniforms:{tDiffuse:{value:null},uStrength:{value:.55},uTime:{value:0}},vertexShader:`
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
    }`};function gy(n,t,e,i,r,s){const o=n.distanceTo(t),a=Math.min(s,Math.max(r,o*i))/o,l=e.y<-1e-6?(t.y-n.y)/e.y:-1,c=l>0&&l<s*2?n.clone().addScaledVector(e,l):t.clone();return{pos:c.clone().addScaledVector(n.clone().sub(c),a),target:c.clone().addScaledVector(t.clone().sub(c),a)}}function _y(n,t){const e=n.shiftKey&&Math.abs(n.deltaX)>Math.abs(n.deltaY)?n.deltaX:n.deltaY,i=t?-1:-3;return n.deltaMode===1||n.ctrlKey?e/i:e/(i*10)}en.install({THREE:{Vector2:Vt,Vector3:k,Vector4:ue,Quaternion:Dr,Matrix4:pe,Spherical:hg,Box3:si,Sphere:Mi,Raycaster:ug}});const Wi=["supersedes","cites","conflicts","depends","parts"],vy="#9a7bff",He={supersedes:"#ffb347",cites:"#6f7d99",conflicts:"#ff3b4f",depends:"#4f8dff",parts:"#38c7b0"},ba={supersedes:{width:2,opacity:.85,dashed:!0},cites:{width:1,opacity:.2,dashed:!1},conflicts:{width:2.4,opacity:.95,dashed:!1},depends:{width:1.7,opacity:.75,dashed:!0},parts:{width:1.4,opacity:.6,dashed:!1}},rh={width:1,opacity:.3},xy=78*Math.PI/180,yy=new k(...gp),Sy=Nd();function Ta(n){switch(n){case"superseded_by":return"supersedes";case"source":return"cites";case"conflicts_with":return"conflicts";case"depends_on":return"depends";case"part_of":return"parts";default:return null}}function wa(n,t){if(!n)return .55;const e=Date.parse(n);if(Number.isNaN(e))return .55;const i=Math.max(0,(t-e)/864e5);return .45+.55*Math.exp(-i/75)}class My{constructor(t){this.count=t;const e=Math.max(1,t);this.value=new Float32Array(e*4),this.target=new Float32Array(e*4);for(let i=0;i<e;i++)this.value[i*4]=this.target[i*4]=1;this.texture=new Td(this.value,e,1,dn,Dn),this.texture.magFilter=$e,this.texture.minFilter=$e,this.texture.needsUpdate=!0}value;target;texture;set(t,e,i,r,s){this.target.set([e,i,r,s],t*4)}ease(t){let e=!1;for(let i=0;i<this.value.length;i++){const r=this.target[i]-this.value[i];Math.abs(r)>.001&&(this.value[i]+=r*t,e=!0)}e&&(this.texture.needsUpdate=!0)}}const js=new jt;function An(n,t=1){return js.set(n),[js.r*t,js.g*t,js.b*t]}class Ey{constructor(t,e,i,r,s){this.container=t,this.world=e,this.source=i,this.events=r,this.qualityMode=s,s!=="auto"&&(this.quality=s),this.topics=e.topics,e.topics.forEach((a,l)=>{this.topicIndex.set(a.slug,l),this.topicBySlug.set(a.slug,a)});for(const a of e.topics)for(let l=a;l;l=this.parentOf(l.slug))this.treeNotes.set(l.slug,(this.treeNotes.get(l.slug)??0)+a.notes);this.layout=yp(e.topics,e.episodes.count),this.renderer=new Zx({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(197899,1),this.renderer.toneMapping=Vl,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.className="scene-canvas",t.appendChild(this.renderer.domElement);const o=this.layout.radius;this.camera=new xn(50,1,.5,o*30),this.controls=new en(this.camera,this.renderer.domElement),this.controls.smoothTime=this.motion?.55:0,this.controls.draggingSmoothTime=.12,this.controls.minDistance=2,this.controls.maxDistance=o*7,this.controls.dollySpeed=.6,this.controls.minPolarAngle=.02,this.controls.maxPolarAngle=xy,this.controls.mouseButtons.left=en.ACTION.SCREEN_PAN,this.controls.mouseButtons.right=en.ACTION.SCREEN_PAN,this.controls.mouseButtons.middle=en.ACTION.DOLLY,this.controls.mouseButtons.wheel=en.ACTION.NONE,this.controls.touches.one=en.ACTION.TOUCH_SCREEN_PAN,this.controls.touches.two=en.ACTION.TOUCH_DOLLY,this.controls.touches.three=en.ACTION.NONE,t.addEventListener("pointerdown",this.chooseDrag,{capture:!0}),this.controls.addEventListener("controlstart",()=>{this.userDriven=!0,this.moving=!0}),this.controls.addEventListener("transitionstart",()=>{this.moving=!0});for(const a of["rest","sleep"])this.controls.addEventListener(a,()=>{this.moving=!1,this.seatTarget()});this.renderer.domElement.addEventListener("wheel",this.wheel,{passive:!1}),this.groups=new My(this.topics.length),this.severity=qh(this.topics),this.computeAlpha(),this.buildStarfield(),this.buildCenters(),this.buildStems(),this.buildInbox(),this.scene.add(this.flowGroup),this.scene.add(this.crossLines),this.scene.add(this.focusLines),this.composer=new iy(this.renderer),this.composer.addPass(new sy(this.scene,this.camera)),this.bloom=new Pr(new Vt(256,256),.95,.6,.08),this.composer.addPass(this.bloom),this.vignette=new Fd(my),this.composer.addPass(this.vignette),this.composer.addPass(new ry),this.labels=new dy(t),this.bindPointer(),this.resize(),window.addEventListener("resize",this.resize),this.flyTo({},!0),this.buildFlows(),this.refreshGroups(),this.renderer.setAnimationLoop(this.frame)}layout;camera;renderer;scene=new Jm;controls;composer;bloom;bloomTarget=.95;vignette;labels;clock=new Cd;topics;topicIndex=new Map;topicBySlug=new Map;treeNotes=new Map;groups;glowMats=[];starMats=new Set;sliceMats=new Set;lineMats=new Map;stems=null;stemPairs=[];flowGroup=new _i;crossLines=new _i;crossHits=[];focusLines=new _i;revealed=new Map;pending=new Map;failed=new Map;topicPx=new Map;ringPx=new Map;alpha=new Map;focus={};neighborhood=new Map;run=null;layers=Object.fromEntries(Wi.map(t=>[t,!0]));health=!1;severity;motion=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;quality="high";qualityMode="auto";autoDecided=!1;autoFrom=1.5;autoSamples=[];frameTimes=[];lastLod=0;pointer={x:0,y:0,down:!1,dx:0,dy:0,moved:!1,dirty:!1,inside:!1};hovered=null;pinned=null;flowHits=[];focusHits=[];hoverLine=null;hoverEnds=new Set;hoverTopics=new Set;now=Date.now();disposed=!1;moving=!1;userDriven=!1;fps=0;parentOf(t){const e=this.topicBySlug.get(t)?.parent;return e?this.topicBySlug.get(e):void 0}ancestors(t){const e=[];for(let i=this.parentOf(t);i&&!e.includes(i.slug);i=this.parentOf(i.slug))e.push(i.slug);return e}rootOf(t){return this.ancestors(t).pop()??t}computeAlpha(){const t=this.focus.topic?this.topicBySlug.get(this.focus.topic):void 0,e=new Set(t?this.ancestors(t.slug):[]),i=t?.depth??0;for(const r of this.topics){let s=1;t&&r.slug!==t.slug&&!this.ancestors(r.slug).includes(t.slug)&&(s=e.has(r.slug)?.3:r.parent===t.parent?.8:.35),r.depth-i>2&&(s*=.08),this.alpha.set(r.slug,s)}}layerTarget(t){if(this.run?.topics[t])return 1;if(this.focus.topic&&this.ancestors(this.focus.topic).includes(t))return 0;const e=this.alpha.get(t)??1;return e<.15?0:e}points(t,e,i,r={}){const s={position:new Float32Array(t*3),aColor:new Float32Array(t*3),aSize:new Float32Array(t),aAlpha:new Float32Array(t),aGroup:new Float32Array(t)};for(const[l,c]of Object.entries(r))s[l]=new Float32Array(t*c);for(let l=0;l<t;l++)e(l,s);const o=new ln;o.setAttribute("position",new Ee(s.position,3)),o.setAttribute("aColor",new Ee(s.aColor,3));for(const l of["aSize","aAlpha","aGroup"])o.setAttribute(l,new Ee(s[l],1));for(const[l,c]of Object.entries(r))o.setAttribute(l,new Ee(s[l],c));o.computeBoundingSphere();const a=new vu(o,i);return a.frustumCulled=!1,a}plainGlow(t=4){const e=new Td(new Float32Array([1,0,0,1]),1,1,dn,Dn);e.needsUpdate=!0;const i=ih(e,1);return i.uniforms.uFalloff.value=t,this.glowMats.push(i),i}buildStarfield(){const t=this.layout.radius,e=nh("starfield"),r=this.points(6500,(s,o)=>{const a=e()*2-1,l=e()*Math.PI*2,c=Math.sqrt(1-a*a),h=t*(3.2+e()*4);o.position.set([h*c*Math.cos(l),h*a,h*c*Math.sin(l)],s*3);const u=e();o.aColor.set(u<.15?[1,.85,.7]:u<.4?[.75,.85,1]:[.9,.93,1],s*3),o.aSize[s]=t*(.006+.012*e()**3),o.aAlpha[s]=.25+.6*e()},this.plainGlow(6));this.scene.add(r)}buildCenters(){const t=ih(this.groups.texture,Math.max(1,this.topics.length));t.uniforms.uMinPx.value=6,t.uniforms.uFalloff.value=7,this.glowMats.push(t);const e=this.points(this.topics.length*2,(i,r)=>{const s=i>>1,o=this.topics[s],a=this.layout.topics.get(o.slug),l=wa(o.updated,this.now)*(1+Math.min(.4,o.recent/Math.max(1,o.notes)));r.aGroup[i]=s,r.position.set([a.x,a.y,a.z],i*3),i%2===0?(r.aColor.set(An(o.color,o.page?1.3:.9),i*3),r.aSize[i]=Math.max(a.ring*.45,a.r*(o.page?.07:.04)),r.aAlpha[i]=(o.page?.95:.55)*l):(r.aColor.set(An(o.color,.8),i*3),r.aSize[i]=a.ring*2.2,r.aAlpha[i]=o.notes?.05*l:0)},t);this.scene.add(e)}buildStems(){if(this.stemPairs=this.topics.filter(e=>e.parent&&this.topicBySlug.has(e.parent)).map(e=>[e.slug,e.parent]),!this.stemPairs.length)return;const t=[];for(const[e,i]of this.stemPairs){const r=this.layout.topics.get(e),s=this.layout.topics.get(i);t.push(...cy([s.x,s.y,s.z],[r.x,r.y,r.z]))}this.stems=this.segments(t,this.stemColors(),this.lineMaterial("stem",rh.width,rh.opacity,!1)),this.scene.add(this.stems)}stemColors(){const t=[];for(const[e]of this.stemPairs){const i=this.alpha.get(e)??1;t.push(...Zs(An(this.topicBySlug.get(e).color,i),kd,1,.55))}return t}buildInbox(){const t=this.layout.inbox,e=Math.min(420,this.world.episodes.count)+1,i=nh("inbox"),r=this.points(e,(s,o)=>{if(s===0){o.position.set([t.x,t.y,t.z],0),o.aColor.set([1.2,1.05,.8],0),o.aSize[0]=t.r*1.6,o.aAlpha[0]=this.world.episodes.count?.85:.25;return}o.position.set([t.x+Ea(i)*t.r*.45,t.y+Ea(i)*t.r*.3,t.z+Ea(i)*t.r*.45],s*3),o.aColor.set(i()<.5?[1,.86,.55]:[1,.95,.85],s*3),o.aSize[s]=2+3*i(),o.aAlpha[s]=.5+.5*i()},this.plainGlow(5));this.scene.add(r)}lineMaterial(t,e,i,r){let s=this.lineMats.get(t);return s||(s=new Ud({color:16777215,linewidth:e,vertexColors:!0,transparent:!0,opacity:i,dashed:r,dashSize:2.5,gapSize:16,dashScale:1,worldUnits:!1}),s.depthWrite=!1,s.blending=go,s.resolution.set(this.container.clientWidth,this.container.clientHeight),this.lineMats.set(t,s)),s}trail(t,e,i,r,s,o){const a=o&&this.motion,l=this.segments(t,e,this.lineMaterial(i,r,a?s*.55:s,!1));return a?[l,this.segments(t,e,this.lineMaterial(`${i}:pulse`,r+.8,Math.min(1,s+.2),!0))]:[l]}segments(t,e,i){const r=new Od;r.setPositions(t),r.setColors(e);const s=new Qx(r,i);return i.dashed&&s.computeLineDistances(),s.frustumCulled=!1,s}buildFlows(){for(const h of[...this.flowGroup.children])this.flowGroup.remove(h),h.geometry.dispose();this.flowHits=[];const t=new Map,e=new Map;for(const h of this.world.flows){const u=this.rootOf(h.a),p=this.rootOf(h.b);if(u===p||!this.layout.topics.has(u)||!this.layout.topics.has(p))continue;const d=u<p?`${u}|${p}`:`${p}|${u}`;t.set(d,(t.get(d)??0)+h.total);const g=e.get(d)??{};for(const[_,m]of Object.entries(h.rels))g[_]=(g[_]??0)+(m??0);e.set(d,g)}const i=this.run?new Set(Object.keys(this.run.topics).map(h=>this.rootOf(h))):null,r=this.focus.topic?this.rootOf(this.focus.topic):null,s=h=>{const u=this.layout.topics.get(h);return new k(u.x,u.y,u.z)},o=[...t].sort((h,u)=>u[1]-h[1]).slice(0,160).map(([h,u])=>{const[p,d]=h.split("|"),g=i?i.has(p)||i.has(d):!r||p===r||d===r;return{a:s(p),b:s(d),ca:this.topicBySlug.get(p).color,cb:this.topicBySlug.get(d).color,w:u,lit:g,ka:p,kb:d,rels:e.get(h)??{}}});if(o.length===0)return;const a=o.map(h=>h.w).sort((h,u)=>h-u),l=h=>a[Math.min(a.length-1,Math.floor(h*a.length))],c=[{max:l(.6),width:1.2,opacity:.22},{max:l(.9),width:2,opacity:.3},{max:1/0,width:3,opacity:.4}];c.forEach((h,u)=>{const p=[],d=[],g=u===0?-1/0:c[u-1].max;for(const _ of o){if(!(_.w>g&&_.w<=h.max))continue;const m=gr(_.a.toArray(),_.b.toArray(),.22,14);this.flowHits.push({a:_.ka,b:_.kb,total:_.w,rels:_.rels,path:m}),p.push(...m);const[f,M,E]=An(_.ca),[y,R,S]=An(_.cb),b=_.lit?1:.15,L=m.length/6;for(let w=0;w<L;w++){const x=w/L,C=(w+1)/L,F=(.35+.65*Math.abs(x-.5)*2)*b,z=(.35+.65*Math.abs(C-.5)*2)*b;d.push((f+(y-f)*x)*F,(M+(R-M)*x)*F,(E+(S-E)*x)*F,(f+(y-f)*C)*z,(M+(R-M)*C)*z,(E+(S-E)*C)*z)}}p.length&&this.flowGroup.add(this.segments(p,d,this.lineMaterial(`flow${u}`,h.width,h.opacity,!1)))}),this.dimFlows()}reveal(t){if(this.revealed.has(t)||(this.failed.get(t)?.until??0)>performance.now())return Promise.resolve();let e=this.pending.get(t);return e||(e=this.load(t).finally(()=>this.pending.delete(t)),this.pending.set(t,e)),e}async load(t){let e;try{e=await this.source.topic(t)}catch{const r=Math.min(6e4,(this.failed.get(t)?.wait??1e3)*2);this.failed.set(t,{until:performance.now()+r,wait:r}),this.events.unreachable();return}if(this.failed.delete(t),!e||this.disposed||this.revealed.has(t))return;const i=this.layout.topics.get(t);i&&(this.revealed.set(t,this.buildLayer(e,i)),this.focus.note&&this.buildNeighborhood(),this.refreshGroups(),this.refreshStates())}buildLayer(t,e){const i=Bl(t,e.ring),r=new k(e.x,e.y,e.z),s=new Map(t.nodes.map(B=>[B.id,B])),o=i.ids.map(B=>s.get(B)),a=new Map(i.ids.map((B,V)=>[B,V])),l=o.length,c=py();c.uniforms.uScale.value=this.pointScale(),c.uniforms.uHealth.value=this.health?1:0,c.uniforms.uMotion.value=this.motion?1:0,c.uniforms.uFade.value=0,this.starMats.add(c);const h=new ln,u=new Float32Array(l*3),p=new Float32Array(l),d=new Float32Array(l),g=new Float32Array(l),_=new Float32Array(l),m=new Float32Array(l*3),[f,M,E]=An(t.color),y=Math.max(1,...o.map(B=>B.chars??0));o.forEach((B,V)=>{const Z=B.id===t.page,Q=B.status==="superseded"||B.status==="archived",q=Z?.25:.55;u.set([f*(1-q)+q,M*(1-q)+q,E*(1-q)+q],V*3),Q&&u.set([.55,.58,.66],V*3),p[V]=e.ring*(Z?.2:(.035+.045*Math.sqrt((B.chars??0)/y))*(i.scale?.[V]??1)),d[V]=(Q?.32:1)*wa(B.updated,this.now);const it=nc.findIndex(P=>B.flags.includes(P));g[V]=it<0?0:it+1,m[V*3]=i.positions[V*3]+r.x,m[V*3+1]=i.positions[V*3+1]+r.y,m[V*3+2]=i.positions[V*3+2]+r.z}),h.setAttribute("position",new Ee(i.positions,3)),h.setAttribute("aColor",new Ee(u,3)),h.setAttribute("aSize",new Ee(p,1)),h.setAttribute("aAlpha",new Ee(d,1)),h.setAttribute("aFlag",new Ee(g,1));const R=new Ee(_,1);R.setUsage(Kc),h.setAttribute("aState",R);const S=new vu(h,c);S.frustumCulled=!1;const b=new _i;b.position.copy(r);const L=this.sliceMesh(i.slices,s,t.color);L&&b.add(L.mesh),b.add(S);const w=B=>{const V=a.get(B);return V===void 0?null:[i.positions[V*3],i.positions[V*3+1],i.positions[V*3+2]]},x=new Map,C=[],F=B=>[B[0]+r.x,B[1]+r.y,B[2]+r.z];for(const B of t.links){const V=Ta(B.rel);if(!V)continue;const Z=w(B.source),Q=w(B.target);if(!Z||!Q||B.source===B.target)continue;let q=x.get(V);q||x.set(V,q={pos:[],colors:[]}),q.pos.push(...gr(Z,Q)),q.colors.push(...Zs(An(He[V]),co,.55,1));const it=P=>o[a.get(P)].title;C.push({family:V,from:{id:B.source,title:it(B.source),topic:t.slug},to:{id:B.target,title:it(B.target),topic:t.slug},path:gr(F(Z),F(Q))})}const z=new Map;for(const[B,V]of x){const Z=ba[B],Q=this.trail(V.pos,V.colors,`fam:${B}`,Z.width,Z.opacity,Z.dashed);for(const q of Q)q.visible=!1,b.add(q);z.set(B,Q)}return this.scene.add(b),{slug:t.slug,data:t,center:r,ring:e.ring,group:b,stars:S,material:c,state:R,sizes:p,ids:i.ids,index:a,nodes:o,world:m,slices:L,lines:z,hits:C,fade:0,target:1}}sliceMesh(t,e,i){if(!t.length)return null;const r=[],s=[],o=[],a=[],l=[],c=[],h=new Map,u=An(i);for(const m of t){const f=e.get(m.id),M=f.status==="superseded"||f.status==="archived",E=Math.min(1,Math.max(.3,.5/(m.a1-m.a0))),y=(.045+.13*(wa(f.updated,this.now)-.45)/.55)*(M?.5:1)*E,R=M?[.55,.58,.66]:u,S=m.strip?m.strip.length/4-1:Math.max(2,Math.ceil((m.a1-m.a0)/(Math.PI/40))),b=r.length/3;for(let L=0;L<=S;L++){const w=m.a0+(m.a1-m.a0)*L/S;for(const[x,C]of[[m.r0,0],[m.r1,1]]){const[F,z]=m.strip?[m.strip[L*4+C*2],m.strip[L*4+C*2+1]]:Zr(w,x);r.push(F,0,z),s.push(...R),o.push(y),a.push(C),l.push(f.flags.length?1:0)}if(L){const x=b+(L-1)*2;c.push(x,x+1,x+2,x+1,x+3,x+2)}}h.set(m.id,[b,r.length/3-b])}const p=new ln;p.setAttribute("position",new Be(r,3)),p.setAttribute("aColor",new Be(s,3)),p.setAttribute("aAlpha",new Be(o,1)),p.setAttribute("aEdge",new Be(a,1)),p.setAttribute("aFlag",new Be(l,1));const d=new Ee(new Float32Array(r.length/3),1);d.setUsage(Kc),p.setAttribute("aState",d),p.setIndex(c);const g=fy();g.uniforms.uHealth.value=this.health?1:0,g.uniforms.uFade.value=0,this.sliceMats.add(g);const _=new Sn(p,g);return _.frustumCulled=!1,_.renderOrder=-1,{mesh:_,material:g,state:d,ranges:h}}disposeLayer(t){this.scene.remove(t.group),t.stars.geometry.dispose(),t.material.dispose(),this.starMats.delete(t.material),t.slices&&(t.slices.mesh.geometry.dispose(),t.slices.material.dispose(),this.sliceMats.delete(t.slices.material));for(const e of t.lines.values())for(const i of e)i.geometry.dispose()}buildCross(){for(const e of[...this.crossLines.children])this.crossLines.remove(e),e.geometry.dispose();this.crossHits=[];const t=new Map;for(const e of this.revealed.values())if(!(e.target<.3))for(const i of e.data.external){if(i.dir!=="out"||!i.topic)continue;const r=Ta(i.rel),s=this.revealed.get(i.topic),o=e.index.get(i.source),a=s?.index.get(i.target);if(!r||!s||s.target<.3||o===void 0||a===void 0)continue;const l=[e.world[o*3],e.world[o*3+1],e.world[o*3+2]],c=[s.world[a*3],s.world[a*3+1],s.world[a*3+2]],h=gr(l,c);this.crossHits.push({family:r,from:{id:i.source,title:e.nodes[o].title,topic:e.slug},to:{id:i.target,title:i.title,topic:s.slug},path:h});let u=t.get(r);u||t.set(r,u={pos:[],colors:[]}),u.pos.push(...h),u.colors.push(...Zs(An(He[r]),co,.55,1))}for(const[e,i]of t){const r=ba[e];for(const s of this.trail(i.pos,i.colors,`fam:${e}`,r.width,r.opacity,r.dashed))s.userData.family=e,s.visible=this.layers[e],this.crossLines.add(s)}}setFocus(t,e=!0){const i=Fa(t)!==Fa(this.focus)||t.topic!==this.focus.topic;this.focus={...t},this.buildNeighborhood(),t.topic&&this.reveal(t.topic),i&&this.buildFlows(),this.refreshGroups(),this.refreshStates(),e&&this.flyTo(t)}buildNeighborhood(){this.neighborhood.clear(),this.focusHits=[];for(const h of[...this.focusLines.children])this.focusLines.remove(h),h.geometry.dispose();const t=this.focus,e=t.note&&t.topic?this.revealed.get(t.topic):void 0,i=e&&t.note?e.index.get(t.note):void 0;if(!e||i===void 0||!t.note)return;this.neighborhood.set(t.note,3);const r=[e.world[i*3],e.world[i*3+1],e.world[i*3+2]],s=(h,u)=>{for(const d of[e,u?this.revealed.get(u):void 0]){const g=d?.index.get(h);if(d&&g!==void 0)return[d.world[g*3],d.world[g*3+1],d.world[g*3+2]]}const p=u?this.layout.topics.get(u):void 0;return p?[p.x,p.y,p.z]:null},o=new Map,a={id:t.note,title:e.nodes[i].title,topic:e.slug},l=(h,u,p,d,g)=>{const _=Ta(h),m=s(p,d);if(!_||!m)return;this.neighborhood.has(p)||this.neighborhood.set(p,2);const f=u===t.note,M={id:p,title:g,topic:d??e.slug},E=f?gr(r,m):gr(m,r);this.focusHits.push(f?{family:_,from:a,to:M,path:E}:{family:_,from:M,to:a,path:E});let y=o.get(_);y||o.set(_,y={pos:[],colors:[]}),y.pos.push(...E),y.colors.push(...Zs(An(He[_]),co,.5,1.2))},c=h=>e.nodes[e.index.get(h)??-1]?.title??h;for(const h of e.data.links)h.source===t.note?l(h.rel,h.source,h.target,e.slug,c(h.target)):h.target===t.note&&l(h.rel,h.source,h.source,e.slug,c(h.source));for(const h of e.data.external)h.source===t.note?l(h.rel,h.source,h.target,h.topic,h.title):h.target===t.note&&l(h.rel,h.source,h.source,h.topic,h.title);for(const[h,u]of o){const p=ba[h];for(const d of this.trail(u.pos,u.colors,`focus:${h}`,p.width+1,Math.min(1,p.opacity+.25),p.dashed))this.focusLines.add(d)}}setRun(t){this.run=t,this.buildFlows(),this.refreshGroups(),this.refreshStates()}setLayers(t){this.layers={...t};for(const e of this.revealed.values())for(const[i,r]of e.lines)for(const s of r)s.visible=this.layers[i]&&e.fade>.05;for(const e of this.crossLines.children)e.visible=this.layers[e.userData.family]}setHealth(t){this.health=t;for(const e of this.starMats)e.uniforms.uHealth.value=t?1:0;for(const e of this.sliceMats)e.uniforms.uHealth.value=t?1:0;this.dimFlows(),this.refreshGroups()}dimFlows(){for(const[t,e]of this.lineMats)t.startsWith("flow")&&(e.userData.base??=e.opacity,e.opacity=e.userData.base*(this.health?.3:1))}setLabels(t){this.labels.setVisible(t)}setQualityMode(t){if(this.qualityMode=t,t!=="auto"){this.quality=t;return}this.quality="high",this.autoDecided=!1,this.autoSamples=[],this.autoFrom=this.clock.elapsedTime+1.5}refreshGroups(){const t=this.focus,e=this.run?new Set(Object.keys(this.run.topics)):null;this.computeAlpha();for(const i of this.revealed.values())i.target=this.layerTarget(i.slug);this.topics.forEach((i,r)=>{let s=this.alpha.get(i.slug)??1,o=0;(this.revealed.get(i.slug)?.target??0)>0&&(s*=.25);const a=this.severity[r];this.health&&(s*=.3+.7*a),e&&(e.has(i.slug)?o=.45:s*=.12),this.groups.set(r,s,o,this.health?1:0,a)}),this.stems&&this.stems.geometry.setColors(this.stemColors()),this.buildCross(),this.bloomTarget=t.note?.45:t.topic?.5:.95}refreshStates(){const t=this.run?new Set(this.run.touched):null;for(const e of this.revealed.values()){const i=e.state.array,r=e.slices?.state.array;e.ids.forEach((s,o)=>{let a=0;this.neighborhood.size&&(a=this.neighborhood.get(s)??1),t&&(a=t.has(s)?Math.max(a,2):a||1),this.hoverEnds.has(s)&&(a=Math.max(a,2)),i[o]=a;const l=e.slices?.ranges.get(s);r&&l&&r.fill(a,l[0],l[0]+l[1])}),e.state.needsUpdate=!0,e.slices&&(e.slices.state.needsUpdate=!0)}}flyTo(t,e=!1){this.userDriven=!1;const i=!e&&this.motion,r=this.layout.radius,s=this.controls.getPosition(new k).sub(this.controls.getTarget(new k));s.lengthSq()<1e-6?s.copy(yy):s.normalize();const o=(l,c)=>{const h=l.clone().addScaledVector(s,c);this.controls.setLookAt(h.x,h.y,h.z,l.x,l.y,l.z,i)};if(t.note&&t.topic){const l=this.revealed.get(t.topic),c=l?.index.get(t.note);if(l&&c!==void 0){o(new k(l.world[c*3],l.world[c*3+1],l.world[c*3+2]),Math.max(24,l.ring*1.4));return}const h=t.topic,u=t.note;this.reveal(h).then(()=>{this.focus.note===u&&this.revealed.get(h)?.index.has(u)&&this.flyTo(this.focus)})}if(t.topic){const l=this.layout.topics.get(t.topic);l&&o(new k(l.x,l.y,l.z),(Math.hypot(l.x-l.fx,l.z-l.fz)+l.r)*2.4);return}const a=r/Math.sin(this.camera.fov*Math.PI/360)/Math.min(1,this.camera.aspect);o(new k(-r*.08,0,0),a*.86)}resetView(){this.flyTo({})}resetTurn(){const t=Math.round(this.controls.azimuthAngle/(2*Math.PI));this.controls.rotateTo(t*2*Math.PI,Na,this.motion)}chooseDrag=t=>{if(this.controls.mouseButtons.left=t.shiftKey?en.ACTION.ROTATE:en.ACTION.SCREEN_PAN,this.moving){const e=this.controls.getPosition(new k,!1),i=this.controls.getTarget(new k,!1);this.controls.setLookAt(e.x,e.y,e.z,i.x,i.y,i.z,!1),this.moving=!1}this.seatTarget()};seatTarget(){if(this.moving||this.pointer.down)return;const t=this.focus.topic?this.layout.topics.get(this.focus.topic)?.y??0:0,e=this.controls.getTarget(new k);if(Math.abs(e.y-t)<.001)return;const i=this.controls.getPosition(new k),r=e.sub(i);if(r.y>-1e-6)return;const s=(t-i.y)/r.y;if(s<=0)return;const o=i.addScaledVector(r,s);this.controls.setOrbitPoint(o.x,o.y,o.z)}wheel=t=>{t.preventDefault(),this.userDriven=!0;const e=_y(t,Sy),i=this.renderer.domElement.getBoundingClientRect(),r=(t.clientX-i.left)/i.width*2-1,s=-((t.clientY-i.top)/i.height)*2+1,o=new k(r,s,.5).unproject(this.camera).sub(this.camera.position).normalize(),a=gy(this.controls.getPosition(new k),this.controls.getTarget(new k),o,Math.pow(.95,e*this.controls.dollySpeed),this.controls.minDistance,this.controls.maxDistance);this.controls.setLookAt(a.pos.x,a.pos.y,a.pos.z,a.target.x,a.target.y,a.target.z,this.motion)};view(){return{pos:this.camera.position.clone(),target:this.controls.getTarget(new k)}}pointScale(){return this.renderer.getDrawingBufferSize(new Vt).y/(2*Math.tan(this.camera.fov*Math.PI/360))}resize=()=>{const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setSize(t,e,!1),this.composer.setSize(t,e),this.bloom.resolution.set(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();const i=this.pointScale();for(const r of this.glowMats)r.uniforms.uScale.value=i;for(const r of this.starMats)r.uniforms.uScale.value=i;for(const r of this.lineMats.values())r.resolution.set(t,e)};frame=()=>{if(this.disposed)return;const t=Math.min(.1,this.clock.getDelta()),e=this.clock.elapsedTime;this.controls.update(t),this.trackFps(t);const i=performance.now();i-this.lastLod>120&&(this.lastLod=i,this.updateLod()),this.animate(t,e),this.pointer.dirty&&(this.pointer.dirty=!1,this.hover()),this.updateLabels(),this.quality==="high"?(this.vignette.uniforms.uTime.value=e,this.composer.render(t)):this.renderer.render(this.scene,this.camera)};trackFps(t){this.frameTimes.push(t),this.frameTimes.length>60&&this.frameTimes.shift();const e=this.frameTimes.reduce((o,a)=>o+a,0)/this.frameTimes.length;if(this.fps=e>0?1/e:0,this.qualityMode!=="auto"||this.autoDecided)return;const i=this.clock.elapsedTime;if(i<this.autoFrom||(this.autoSamples.push(t),i<this.autoFrom+2.5||this.autoSamples.length<20))return;const r=[...this.autoSamples].sort((o,a)=>o-a),s=r[r.length>>1]>1/30?"low":"high";this.autoDecided=!0,this.autoSamples=[],this.quality=s,this.events.quality(s,!0)}animate(t,e){const i=1-Math.exp(-t*6);this.groups.ease(i),this.bloom.strength+=(this.bloomTarget-this.bloom.strength)*i;let r=!1;for(const[s,o]of[...this.revealed]){o.fade+=(o.target-o.fade)*i,o.material.uniforms.uFade.value=o.fade,o.material.uniforms.uTime.value=e,o.slices&&(o.slices.material.uniforms.uFade.value=o.fade),o.group.visible=o.fade>.02;for(const[a,l]of o.lines)for(const c of l)c.visible=this.layers[a]&&o.fade>.05;o.target===0&&o.fade<.03&&(this.disposeLayer(o),this.revealed.delete(s),r=!0)}if(r&&this.buildCross(),this.motion)for(const[s,o]of this.lineMats)o.dashed&&(o.dashOffset-=t*(s.includes("supersedes")?9:14))}viewSample(t){const e=this.controls.getTarget(new k,!1);return{chain:this.topics.filter(r=>{const s=this.layout.topics.get(r.slug);return Math.hypot(s.fx-e.x,s.fz-e.z)<s.r}).sort((r,s)=>r.depth-s.depth).map(r=>({slug:r.slug,size:(this.topicPx.get(r.slug)??0)/t})),focusTopicSize:this.focus.topic?(this.topicPx.get(this.focus.topic)??0)/t:0}}updateLod(){const t=this.container.clientHeight||1,e=new yo().setFromProjectionMatrix(new pe().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse)),i=new Mi,r=new k,s=this.topics.map(c=>{const h=this.layout.topics.get(c.slug);i.center.set(h.fx,h.y,h.fz),i.radius=h.r,this.topicPx.set(c.slug,fs(h.r,this.camera.position.distanceTo(i.center),t,this.camera.fov));const u=fs(h.ring,this.camera.position.distanceTo(r.set(h.x,h.y,h.z)),t,this.camera.fov);this.ringPx.set(c.slug,u);const p=(c.notes>0||!!c.page)&&this.layerTarget(c.slug)>0;return{slug:c.slug,px:u,visible:p&&e.intersectsSphere(i)}});this.events.view(this.viewSample(t),this.userDriven),this.seatTarget();const o=new Set([...this.revealed].filter(([,c])=>c.target>0).map(([c])=>c)),a=ip(s,o);if(this.focus.topic&&this.layerTarget(this.focus.topic)>0&&a.add(this.focus.topic),this.run)for(const c of Object.keys(this.run.topics))(this.ringPx.get(c)??0)>20&&a.add(c);let l=!1;for(const c of a){const h=this.revealed.get(c);h?h.target===0&&(l=!0,h.target=this.layerTarget(c)):this.reveal(c)}for(const[c,h]of this.revealed)!a.has(c)&&h.target!==0&&(h.target=0,l=!0);l&&this.refreshGroups()}updateLabels(){const t=this.container.clientWidth,e=this.container.clientHeight,i=[],r=this.camera.position,s=e/2/Math.tan(this.camera.fov*Math.PI/360),o=this.layout.inbox,a=fs(o.r,r.distanceTo(new k(o.x,o.y,o.z)),e,this.camera.fov);a>6&&i.push({key:"inbox",kind:"inbox",text:"Inbox",sub:Aa(this.world.episodes.count,"session capture"),color:"#ffd88a",pos:new k(o.x,o.y,o.z),priority:7e3,lift:Math.min(a,60)*.6});for(const h of this.topics){const u=this.topicPx.get(h.slug)??0,p=this.ringPx.get(h.slug)??0,d=this.alpha.get(h.slug)??1,g=this.focus.topic===h.slug;if(!g&&(d<.2||u<10))continue;const _=this.revealed.get(h.slug);if(_&&_.fade>.5&&h.page&&p>(g?140:260))continue;const m=this.layout.topics.get(h.slug),f=this.run?.topics[h.slug],M=this.treeNotes.get(h.slug)??h.notes;i.push({key:`t:${h.slug}`,kind:h.page?"topic":"folder",text:h.page?h.title:h.name,sub:f?`${f} changed`:h.flagged?`${Aa(M,"note")} · ${h.flagged} with issues`:Aa(M,"note"),color:h.color,pos:new k(m.x,m.y,m.z),priority:(g?9e3:3e3)+u*2*d-h.depth*200+(this.health&&h.flagged?600:0)+(f?5e3:0)+(this.hoverTopics.has(h.slug)?6e3:0),lift:Math.min(p,140)*.5+4,emphasis:g||!!f||this.hovered===`t:${h.slug}`||this.hoverTopics.has(h.slug)})}const l=new k,c=new yo().setFromProjectionMatrix(new pe().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse));for(const h of this.revealed.values())h.fade<.5||(this.ringPx.get(h.slug)??0)<120||h.nodes.forEach((u,p)=>{if(l.set(h.world[p*3],h.world[p*3+1],h.world[p*3+2]),!c.containsPoint(l))return;const d=r.distanceTo(l),g=h.sizes[p]*s/Math.max(d,1),_=this.hoverEnds.has(u.id),m=Math.max(this.neighborhood.get(u.id)??0,_?2:0),f=u.id===h.data.page;if(g<3.5&&m<2&&!f)return;const M=u.flags.length>0,E=_?12500:m===3?12e3:m===2?8500:f?6500:(M?2500:1e3)+u.degree*20+g*10;i.push({key:`n:${u.id}`,kind:f?"page":"note",text:u.title,sub:f?"topic page":void 0,color:M?"#ff6b7a":void 0,pos:l.clone(),priority:E,lift:g/2+6,emphasis:m>=2||this.hovered===`n:${u.id}`})});this.labels.update(i,this.camera,t,e)}bindPointer(){const t=this.renderer.domElement;t.addEventListener("pointermove",e=>{const i=t.getBoundingClientRect();this.pointer.x=e.clientX-i.left,this.pointer.y=e.clientY-i.top,this.pointer.inside=!0,this.pointer.down&&Math.hypot(e.clientX-this.pointer.dx,e.clientY-this.pointer.dy)>5&&(this.pointer.moved=!0),this.pointer.dirty=!0}),t.addEventListener("pointerleave",()=>{this.pointer.inside=!1,this.hovered=null,this.setHighlight(this.pinned),this.events.hover(null,0,0)}),t.addEventListener("pointerdown",e=>{this.pointer.down=!0,this.pointer.moved=!1,this.pointer.dx=e.clientX,this.pointer.dy=e.clientY}),t.addEventListener("pointerup",e=>{const i=this.pointer.down&&!this.pointer.moved&&e.button===0;if(this.pointer.down=!1,!i)return;const r=t.getBoundingClientRect(),s=this.pickDetailed(e.clientX-r.left,e.clientY-r.top);(s?.target.kind==="link"||s?.target.kind==="flow")&&(this.pinned=s),this.events.select(s?.target??null)}),t.addEventListener("contextmenu",e=>e.preventDefault())}hover(){if(!this.pointer.inside||this.pointer.down)return;const t=this.pickDetailed(this.pointer.x,this.pointer.y),e=t?.key??null;this.renderer.domElement.style.cursor=t?"pointer":"",e!==this.hovered&&(this.hovered=e,this.setHighlight(t??this.pinned)),this.events.hover(t?.target??null,this.pointer.x,this.pointer.y)}setHighlight(t){this.hoverLine&&(this.scene.remove(this.hoverLine),this.hoverLine.geometry.dispose(),this.hoverLine=null);const e=new Set,i=new Set,r=t?.target;if(r?.kind==="link"?e.add(r.from.id).add(r.to.id):r?.kind==="flow"&&i.add(r.a).add(r.b),t?.segments){const o=An(t.color??"#e8f0ff").map(l=>Math.min(1.8,l*1.6)),a=[];for(let l=0;l<t.segments.length/3;l++)a.push(o[0],o[1],o[2]);this.hoverLine=this.segments(t.segments,a,this.lineMaterial("hover",4.5,1,!1)),this.hoverLine.renderOrder=10,this.scene.add(this.hoverLine)}const s=e.size!==this.hoverEnds.size||[...e].some(o=>!this.hoverEnds.has(o));this.hoverEnds=e,this.hoverTopics=i,s&&this.refreshStates()}pick(t,e){return this.pickDetailed(t,e)?.target??null}pin(t){const e=i=>i.kind==="link"?`l:${i.family}:${i.from.id}>${i.to.id}`:i.kind==="flow"?`f:${i.a}|${i.b}`:"";t&&this.pinned&&e(this.pinned.target)===e(t)||(this.pinned=t&&(t.kind==="link"||t.kind==="flow")?{target:t,key:e(t),...this.linesOf(t)}:null),this.hovered||this.setHighlight(this.pinned)}linesOf(t){if(t.kind==="link"){const i=[...this.focusHits,...this.crossHits,...[...this.revealed.values()].flatMap(r=>r.hits)].find(r=>r.family===t.family&&r.from.id===t.from.id&&r.to.id===t.to.id);if(i)return{segments:i.path,color:He[t.family]}}else if(t.kind==="flow"){const e=this.flowHits.find(i=>i.a===t.a&&i.b===t.b||i.a===t.b&&i.b===t.a);if(e)return{segments:e.path}}return{}}pickLink(t,e,i){const r=(d,g,_,m)=>{const f=_-d,M=m-g,E=f*f+M*M,y=E?Math.max(0,Math.min(1,((t-d)*f+(e-g)*M)/E)):0;return Math.hypot(d+y*f-t,g+y*M-e)},s=d=>{let g=1/0;for(let _=0;_<d.length;_+=6){const m=i(d[_],d[_+1],d[_+2]),f=i(d[_+3],d[_+4],d[_+5]);m&&f&&(g=Math.min(g,r(m[0],m[1],f[0],f[1])))}return g},o=(d,g,_)=>`l:${d}:${g.id}>${_.id}`,a=(d,g)=>{let _=null,m=g;for(const f of d){if(!this.layers[f.family])continue;const M=s(f.path);M<m&&(m=M,_={target:{kind:"link",family:f.family,from:f.from,to:f.to},key:o(f.family,f.from,f.to),segments:f.path,color:He[f.family]})}return _},l=a(this.focusHits,6);if(l)return l;const c=[...this.revealed.values()].filter(d=>d.fade>=.5).flatMap(d=>d.hits),h=a([...c,...this.crossHits],5);if(h)return h;let u=null,p=5;for(const d of this.flowHits){const g=s(d.path);g<p&&(p=g,u={target:{kind:"flow",level:"tree",a:d.a,b:d.b,total:d.total,rels:d.rels},key:`f:${d.a}|${d.b}`,segments:d.path})}return u}pickDetailed(t,e){const i=_=>_&&{target:_,key:_.kind==="topic"?`t:${_.slug}`:"inbox"},r=this.container.clientWidth,s=this.container.clientHeight,o=s/2/Math.tan(this.camera.fov*Math.PI/360),a=new k,l=(_,m,f)=>(a.set(_,m,f).project(this.camera),a.z>1?null:[(a.x*.5+.5)*r,(-a.y*.5+.5)*s]);let c=null,h=1/0;for(const _ of this.revealed.values())if(!(_.fade<.3))for(let m=0;m<_.ids.length;m++){const f=l(_.world[m*3],_.world[m*3+1],_.world[m*3+2]);if(!f)continue;const M=this.camera.position.distanceTo(a.set(_.world[m*3],_.world[m*3+1],_.world[m*3+2])),E=Math.max(7,_.sizes[m]*o/Math.max(M,1)*.5+3),y=Math.hypot(f[0]-t,f[1]-e);y<E&&y<h&&(h=y,c={kind:"note",id:_.ids[m],topic:_.slug})}if(c)return{target:c,key:`n:${c.id}`};const u=this.pickLink(t,e,l);if(u)return u;let p=1/0;for(const _ of this.topics){if((this.alpha.get(_.slug)??1)<.15&&this.focus.topic!==_.slug)continue;const m=this.layout.topics.get(_.slug),f=l(m.x,m.y,m.z);if(!f)continue;const M=Math.max(10,(this.ringPx.get(_.slug)??0)*.8),E=Math.hypot(f[0]-t,f[1]-e);E<M&&E/M<p&&(p=E/M,c={kind:"topic",slug:_.slug})}const d=this.layout.inbox,g=l(d.x,d.y,d.z);if(g){const _=Math.max(12,fs(d.r,this.camera.position.distanceTo(a.set(d.x,d.y,d.z)),s,this.camera.fov)),m=Math.hypot(g[0]-t,g[1]-e);m<_&&m/_<p&&(c={kind:"inbox"})}return i(c)}screenOf(t){let e=null;if(t.kind==="topic"){const i=this.layout.topics.get(t.slug);i&&(e=new k(i.x,i.y,i.z))}else if(t.kind==="note"){const i=this.revealed.get(t.topic),r=i?.index.get(t.id);i&&r!==void 0&&(e=new k(i.world[r*3],i.world[r*3+1],i.world[r*3+2]))}else if(t.kind==="inbox"){const i=this.layout.inbox;e=new k(i.x,i.y,i.z)}return e?(e.project(this.camera),{x:(e.x*.5+.5)*this.container.clientWidth,y:(-e.y*.5+.5)*this.container.clientHeight}):null}noteTitle(t){for(const e of this.revealed.values()){const i=e.index.get(t);if(i!==void 0)return e.nodes[i].title}}revealedTopics(){return[...this.revealed].filter(([,t])=>t.target>0).map(([t])=>t)}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),window.removeEventListener("resize",this.resize),this.container.removeEventListener("pointerdown",this.chooseDrag,{capture:!0}),this.renderer.domElement.removeEventListener("wheel",this.wheel);for(const t of this.revealed.values())this.disposeLayer(t);this.controls.dispose(),this.renderer.dispose()}}function Aa(n,t){return`${n} ${t}${n===1?"":"s"}`}var ss,Ae,Ca,sh,os=0,Bd=[],Re=he,oh=Re.__b,ah=Re.__r,lh=Re.diffed,ch=Re.__c,uh=Re.unmount,hh=Re.__;function rc(n,t){Re.__h&&Re.__h(Ae,n,os||t),os=0;var e=Ae.__H||(Ae.__H={__:[],__h:[]});return n>=e.__.length&&e.__.push({}),e.__[n]}function rn(n){return os=1,by(Vd,n)}function by(n,t,e){var i=rc(ss++,2);if(i.t=n,!i.__c&&(i.__=[Vd(void 0,t),function(a){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,a);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=Ae,!Ae.__f)){var r=function(a,l,c){if(!i.__c.__H)return!0;var h=i.__c.__H.__.filter(function(p){return!!p.__c});if(h.every(function(p){return!p.__N}))return!s||s.call(this,a,l,c);var u=i.__c.props!==a;return h.forEach(function(p){if(p.__N){var d=p.__[0];p.__=p.__N,p.__N=void 0,d!==p.__[0]&&(u=!0)}}),s&&s.call(this,a,l,c)||u};Ae.__f=!0;var s=Ae.shouldComponentUpdate,o=Ae.componentWillUpdate;Ae.componentWillUpdate=function(a,l,c){if(this.__e){var h=s;s=void 0,r(a,l,c),s=h}o&&o.call(this,a,l,c)},Ae.shouldComponentUpdate=r}return i.__N||i.__}function Si(n,t){var e=rc(ss++,3);!Re.__s&&Hd(e.__H,t)&&(e.__=n,e.u=t,Ae.__H.__h.push(e))}function $i(n){return os=5,je(function(){return{current:n}},[])}function je(n,t){var e=rc(ss++,7);return Hd(e.__H,t)&&(e.__=n(),e.__H=t,e.__h=n),e.__}function sc(n,t){return os=8,je(function(){return n},t)}function Ty(){for(var n;n=Bd.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(uo),n.__H.__h.forEach(Rl),n.__H.__h=[]}catch(t){n.__H.__h=[],Re.__e(t,n.__v)}}Re.__b=function(n){Ae=null,oh&&oh(n)},Re.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),hh&&hh(n,t)},Re.__r=function(n){ah&&ah(n),ss=0;var t=(Ae=n.__c).__H;t&&(Ca===Ae?(t.__h=[],Ae.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(uo),t.__h.forEach(Rl),t.__h=[],ss=0)),Ca=Ae},Re.diffed=function(n){lh&&lh(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(Bd.push(t)!==1&&sh===Re.requestAnimationFrame||((sh=Re.requestAnimationFrame)||wy)(Ty)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),Ca=Ae=null},Re.__c=function(n,t){t.some(function(e){try{e.__h.forEach(uo),e.__h=e.__h.filter(function(i){return!i.__||Rl(i)})}catch(i){t.some(function(r){r.__h&&(r.__h=[])}),t=[],Re.__e(i,e.__v)}}),ch&&ch(n,t)},Re.unmount=function(n){uh&&uh(n);var t,e=n.__c;e&&e.__H&&(e.__H.__.forEach(function(i){try{uo(i)}catch(r){t=r}}),e.__H=void 0,t&&Re.__e(t,e.__v))};var dh=typeof requestAnimationFrame=="function";function wy(n){var t,e=function(){clearTimeout(i),dh&&cancelAnimationFrame(t),setTimeout(n)},i=setTimeout(e,35);dh&&(t=requestAnimationFrame(e))}function uo(n){var t=Ae,e=n.__c;typeof e=="function"&&(n.__c=void 0,e()),Ae=t}function Rl(n){var t=Ae;n.__c=n.__(),Ae=t}function Hd(n,t){return!n||n.length!==t.length||t.some(function(e,i){return e!==n[i]})}function Vd(n,t){return typeof t=="function"?t(n):t}class Ay{constructor(t){this.s=t}listeners=new Set;get state(){return this.s}set(t){this.s={...this.s,...t};for(const e of this.listeners)e()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}function Nt(n,t){const[e,i]=rn(()=>t(n.state));return Si(()=>{const r=()=>i(()=>t(n.state));return r(),n.subscribe(r)},[n]),e}class Cy{constructor(t,e){this.source=t,this.world=e,this.trail=new Jf(Ry(`brainviz.trail:${e.brain}:${location.pathname}`));const i=new URLSearchParams(location.search).get("quality"),r=Xd(i)?i:Ly()??"low";this.store=new Ay({world:e,focus:{},hover:null,connection:null,note:null,topicData:null,page:null,noteError:null,topicError:null,pageError:null,layers:Object.fromEntries(Wi.map(s=>[s,!0])),health:!1,labels:!0,quality:r==="low"?"low":"high",qualityMode:r,navOpen:!0,navTab:"atlas",paletteOpen:!1,helpOpen:!1,healthData:null,healthError:null,run:null,toast:null,embedded:t.embedded,sceneError:null,previewOpen:!1,wide:Py(),trail:this.trail.state(),historyOpen:!1,zoom:0})}store;galaxy=null;toastTimer=0;unreachableAt=0;noteSeq=0;trail;mount(t){try{this.galaxy=new Ey(t,this.world,this.source,{hover:(e,i,r)=>this.store.set({hover:e?{target:e,x:i,y:r}:null}),select:e=>this.select(e),view:(e,i)=>this.onView(e,i),quality:(e,i)=>{this.store.set({quality:e}),i&&e==="low"&&this.toast("Graphics set to Low: frames were slow on this GPU, so the glow is off. Change it in the ⋯ menu.")},unreachable:()=>{const e=Date.now();e-this.unreachableAt<3e4||(this.unreachableAt=e,this.toast("Lost the connection to brain viz. Is it still running?"))}},this.store.state.qualityMode),this.galaxy.setLayers(this.store.state.layers)}catch(e){t.replaceChildren(),this.store.set({sceneError:e instanceof Error?e.message:String(e)}),console.error("brain viz: the 3D scene could not start",e)}window.addEventListener("popstate",e=>this.onHistory(e.state)),window.addEventListener("hashchange",()=>this.onHistory(history.state)),this.onHistory(history.state),window.__brainViz={controller:this,galaxy:this.galaxy,ready:!0},document.body.dataset.ready="1"}onHistory(t){this.applyHash();const e=this.store.state.focus,i=Wn(e),r=t?.brainViz;if(typeof r=="number"&&this.trail.entries[r]?.hash===i)this.trail.moveTo(r);else{const s=this.trail.visit({hash:i,focus:e,title:this.titleOf(e)});history.replaceState({brainViz:s},"",i)}this.syncTrail()}back(){this.trail.canBack&&history.back()}forward(){this.trail.canForward&&history.forward()}jump(t){const e=t-this.trail.index;this.store.set({historyOpen:!1}),e&&history.go(e)}syncTrail(){this.store.set({trail:this.trail.state()});try{sessionStorage.setItem(this.trailKey(),JSON.stringify(this.trail.state()))}catch{}}trailKey(){return`brainviz.trail:${this.world.brain}:${location.pathname}`}titleOf(t){if(t.note)return this.galaxy?.noteTitle(t.note)??this.store?.state.topicData?.nodes.find(e=>e.id===t.note)?.title}applyHash(){const t=rp(location.hash);Wn(t)!==Wn(this.store.state.focus)&&this.focus(t,"none")}focus(t,e="push",i=!0){t=Tc(t,this.world.topics),e!=="replace"&&this.closeConnection();const r=this.store.state.focus;this.store.set({focus:t,hover:null}),this.galaxy?.setFocus(t,i);const s=Wn(t);if(e!=="none"&&s!==location.hash){const o={hash:s,focus:t,title:this.titleOf(t)};e==="push"?history.pushState({brainViz:this.trail.visit(o)},"",s):history.replaceState({brainViz:this.trail.replace(o)},"",s),this.syncTrail()}if(t.topic&&t.topic!==r.topic){this.store.set({topicData:null,topicError:null,page:null,pageError:null}),this.source.topic(t.topic).then(a=>{this.store.state.focus.topic===t.topic&&this.store.set(a?{topicData:a}:{topicError:"This topic is no longer in the brain."})},a=>{this.store.state.focus.topic===t.topic&&this.store.set({topicError:Ks(a)})});const o=this.world.topics.find(a=>a.slug===t.topic)?.page;o&&this.source.note(o).then(a=>{this.store.state.focus.topic===t.topic&&this.store.set(a?{page:a}:{pageError:"This topic page is no longer in the brain."})},a=>{this.store.state.focus.topic===t.topic&&this.store.set({pageError:Ks(a)})})}else t.topic||this.store.set({topicData:null,topicError:null,page:null,pageError:null});if(t.note){const o=++this.noteSeq;t.note!==r.note&&this.store.set({note:null,noteError:null}),this.source.note(t.note).then(a=>{o===this.noteSeq&&(this.store.set(a?{note:a}:{noteError:"This note is no longer in the brain."}),a&&this.trail.setTitle(Wn(t),a.title)&&this.syncTrail())},a=>{o===this.noteSeq&&this.store.set({noteError:Ks(a)})})}else this.store.set({note:null,noteError:null,previewOpen:!1})}up(){const t=this.store.state;if(t.paletteOpen)return this.store.set({paletteOpen:!1});if(t.historyOpen)return this.store.set({historyOpen:!1});if(t.helpOpen)return this.store.set({helpOpen:!1});if(t.previewOpen)return this.store.set({previewOpen:!1});if(t.connection)return this.closeConnection();if(t.run)return this.setRun(null);if(Fa(t.focus)==="overview")return this.galaxy?.resetView();this.levelUp()}climbed=[];levelUp(){const t=this.store.state.focus,e=No(t,this.world);e&&(this.climbed.push(t),this.focus(e))}async sibling(t){const e=this.store.state.focus,i=No(e,this.world);if(!i)return;const s=kc(i,this.world,i.topic?await this.source.topic(i.topic):null).filter(c=>!!c.note==!!e.note),o=c=>c.note??c.topic??"",a=s.findIndex(c=>o(c)===o(e)),l=s[(a+t+s.length)%s.length];l&&o(l)!==o(e)&&this.focus(l)}async levelDown(){const t=this.store.state.focus,e=Wn(t),i=this.climbed.pop();if(i){const o=No(i,this.world);if(o&&Wn(o)===e)return this.focus(i);this.climbed=[]}const r=t.topic?await this.source.topic(t.topic):null,[s]=kc(t,this.world,r);s?this.focus(s):this.toast("Nothing below this note.")}select(t){t&&(t.kind==="topic"?this.focus({topic:t.slug}):t.kind==="note"?this.openNote(t.id,t.topic):t.kind==="link"||t.kind==="flow"?this.showConnection(t):this.toast(`${this.world.episodes.count} session captures wait in the inbox. Ask your agent to consolidate them.`))}onView(t,e){const i=this.store.state.focus,{focus:r,progress:s}=sp(i,t);Math.abs(s-this.store.state.zoom)>.02&&this.store.set({zoom:s}),e&&Wn(r)!==Wn(i)&&this.focus(r,"replace",!1)}showConnection(t){this.store.set({connection:t,previewOpen:!1}),this.galaxy?.pin(t)}closeConnection(){this.store.state.connection&&(this.store.set({connection:null}),this.galaxy?.pin(null))}openNote(t,e){if(!e)return;const i=Tc({topic:e,note:t},this.world.topics);this.focus(i),i.note&&this.store.set({previewOpen:!0})}resetTurn(){this.galaxy?.resetTurn()}setLayer(t,e){const i={...this.store.state.layers,[t]:e};this.store.set({layers:i}),this.galaxy?.setLayers(i)}setHealth(t){this.store.set({health:t}),this.galaxy?.setHealth(t),t&&!this.store.state.healthData&&this.loadHealth()}setLabels(t){this.store.set({labels:t}),this.galaxy?.setLabels(t)}setQualityMode(t){this.store.set({qualityMode:t,...t==="auto"?{}:{quality:t}}),this.galaxy?.setQualityMode(t);try{localStorage.setItem(Gd,t)}catch{}}setWide(t){this.store.set({wide:t});try{localStorage.setItem(Wd,t?"1":"0")}catch{}}setRun(t){if(this.store.set({run:t}),this.galaxy?.setRun(t),t){let e=Object.entries(t.topics).sort((i,r)=>r[1]-i[1])[0]?.[0];for(let i=this.world.topics.find(r=>r.slug===e);i?.parent;i=this.world.topics.find(r=>r.slug===i.parent))e=i.parent;e&&this.focus({topic:e})}}async loadHealth(){this.store.set({healthError:null});try{const t=await this.source.health();this.store.set({healthData:t})}catch(t){this.store.set({healthError:Ks(t)})}}setNav(t){this.store.set({navTab:t,navOpen:!0}),t==="health"&&!this.store.state.healthData&&this.loadHealth()}search(t){return this.source.search(t)}toast(t){this.store.set({toast:t}),window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.store.set({toast:null}),4200)}}function Ry(n){try{const t=sessionStorage.getItem(n),e=t?JSON.parse(t):void 0;return e&&Array.isArray(e.entries)&&typeof e.index=="number"?e:void 0}catch{return}}const Gd="brainviz.graphics",Wd="brainviz.wide";function Py(){try{return localStorage.getItem(Wd)==="1"}catch{return!1}}function Xd(n){return n==="auto"||n==="high"||n==="low"}function Ly(){try{const n=localStorage.getItem(Gd);return Xd(n)?n:null}catch{return null}}function Ks(n){return n instanceof TypeError?"Could not reach brain viz. Is it still running?":`Could not load it (${n instanceof Error?n.message:String(n)}).`}const Dy={};function Iy(n,t){const e=Dy,i=typeof e.includeImageAlt=="boolean"?e.includeImageAlt:!0,r=typeof e.includeHtml=="boolean"?e.includeHtml:!0;return qd(n,i,r)}function qd(n,t,e){if(Uy(n)){if("value"in n)return n.type==="html"&&!e?"":n.value;if(t&&"alt"in n&&n.alt)return n.alt;if("children"in n)return fh(n.children,t,e)}return Array.isArray(n)?fh(n,t,e):""}function fh(n,t,e){const i=[];let r=-1;for(;++r<n.length;)i[r]=qd(n[r],t,e);return i.join("")}function Uy(n){return!!(n&&typeof n=="object")}const ph=document.createElement("i");function oc(n){const t="&"+n+";";ph.innerHTML=t;const e=ph.textContent;return e.charCodeAt(e.length-1)===59&&n!=="semi"||e===t?!1:e}function fn(n,t,e,i){const r=n.length;let s=0,o;if(t<0?t=-t>r?0:r+t:t=t>r?r:t,e=e>0?e:0,i.length<1e4)o=Array.from(i),o.unshift(t,e),n.splice(...o);else for(e&&n.splice(t,e);s<i.length;)o=i.slice(s,s+1e4),o.unshift(t,0),n.splice(...o),s+=1e4,t+=1e4}function yn(n,t){return n.length>0?(fn(n,n.length,0,t),n):t}const mh={}.hasOwnProperty;function Yd(n){const t={};let e=-1;for(;++e<n.length;)Oy(t,n[e]);return t}function Oy(n,t){let e;for(e in t){const r=(mh.call(n,e)?n[e]:void 0)||(n[e]={}),s=t[e];let o;if(s)for(o in s){mh.call(r,o)||(r[o]=[]);const a=s[o];Fy(r[o],Array.isArray(a)?a:a?[a]:[])}}}function Fy(n,t){let e=-1;const i=[];for(;++e<t.length;)(t[e].add==="after"?n:i).push(t[e]);fn(n,0,0,i)}function $d(n,t){const e=Number.parseInt(n,t);return e<9||e===11||e>13&&e<32||e>126&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?"�":String.fromCodePoint(e)}function Un(n){return n.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Ye=Ei(/[A-Za-z]/),sn=Ei(/[\dA-Za-z]/),Ny=Ei(/[#-'*+\--9=?A-Z^-~]/);function So(n){return n!==null&&(n<32||n===127)}const Pl=Ei(/\d/),ky=Ei(/[\dA-Fa-f]/),zy=Ei(/[!-/:-@[-`{-~]/);function Dt(n){return n!==null&&n<-2}function de(n){return n!==null&&(n<0||n===32)}function qt(n){return n===-2||n===-1||n===32}const Po=Ei(/\p{P}|\p{S}/u),Zi=Ei(/\s/);function Ei(n){return t;function t(e){return e!==null&&e>-1&&n.test(String.fromCharCode(e))}}function Kt(n,t,e,i){const r=i?i-1:Number.POSITIVE_INFINITY;let s=0;return o;function o(l){return qt(l)?(n.enter(e),a(l)):t(l)}function a(l){return qt(l)&&s++<r?(n.consume(l),a):(n.exit(e),t(l))}}const By={tokenize:Hy};function Hy(n){const t=n.attempt(this.parser.constructs.contentInitial,i,r);let e;return t;function i(a){if(a===null){n.consume(a);return}return n.enter("lineEnding"),n.consume(a),n.exit("lineEnding"),Kt(n,t,"linePrefix")}function r(a){return n.enter("paragraph"),s(a)}function s(a){const l=n.enter("chunkText",{contentType:"text",previous:e});return e&&(e.next=l),e=l,o(a)}function o(a){if(a===null){n.exit("chunkText"),n.exit("paragraph"),n.consume(a);return}return Dt(a)?(n.consume(a),n.exit("chunkText"),s):(n.consume(a),o)}}const Vy={tokenize:Gy},gh={tokenize:Wy};function Gy(n){const t=this,e=[];let i=0,r,s,o;return a;function a(E){if(i<e.length){const y=e[i];return t.containerState=y[1],n.attempt(y[0].continuation,l,c)(E)}return c(E)}function l(E){if(i++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,r&&M();const y=t.events.length;let R=y,S;for(;R--;)if(t.events[R][0]==="exit"&&t.events[R][1].type==="chunkFlow"){S=t.events[R][1].end;break}f(i);let b=y;for(;b<t.events.length;)t.events[b][1].end={...S},b++;return fn(t.events,R+1,0,t.events.slice(y)),t.events.length=b,c(E)}return a(E)}function c(E){if(i===e.length){if(!r)return p(E);if(r.currentConstruct&&r.currentConstruct.concrete)return g(E);t.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return t.containerState={},n.check(gh,h,u)(E)}function h(E){return r&&M(),f(i),p(E)}function u(E){return t.parser.lazy[t.now().line]=i!==e.length,o=t.now().offset,g(E)}function p(E){return t.containerState={},n.attempt(gh,d,g)(E)}function d(E){return i++,e.push([t.currentConstruct,t.containerState]),p(E)}function g(E){if(E===null){r&&M(),f(0),n.consume(E);return}return r=r||t.parser.flow(t.now()),n.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:s}),_(E)}function _(E){if(E===null){m(n.exit("chunkFlow"),!0),f(0),n.consume(E);return}return Dt(E)?(n.consume(E),m(n.exit("chunkFlow")),i=0,t.interrupt=void 0,a):(n.consume(E),_)}function m(E,y){const R=t.sliceStream(E);if(y&&R.push(null),E.previous=s,s&&(s.next=E),s=E,r.defineSkip(E.start),r.write(R),t.parser.lazy[E.start.line]){let S=r.events.length;for(;S--;)if(r.events[S][1].start.offset<o&&(!r.events[S][1].end||r.events[S][1].end.offset>o))return;const b=t.events.length;let L=b,w,x;for(;L--;)if(t.events[L][0]==="exit"&&t.events[L][1].type==="chunkFlow"){if(w){x=t.events[L][1].end;break}w=!0}for(f(i),S=b;S<t.events.length;)t.events[S][1].end={...x},S++;fn(t.events,L+1,0,t.events.slice(b)),t.events.length=S}}function f(E){let y=e.length;for(;y-- >E;){const R=e[y];t.containerState=R[1],R[0].exit.call(t,n)}e.length=E}function M(){r.write([null]),s=void 0,r=void 0,t.containerState._closeFlow=void 0}}function Wy(n,t,e){return Kt(n,n.attempt(this.parser.constructs.document,t,e),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Mo(n){if(n===null||de(n)||Zi(n))return 1;if(Po(n))return 2}function Lo(n,t,e){const i=[];let r=-1;for(;++r<n.length;){const s=n[r].resolveAll;s&&!i.includes(s)&&(t=s(t,e),i.push(s))}return t}const Ll={name:"attention",resolveAll:Xy,tokenize:qy};function Xy(n,t){let e=-1,i,r,s,o,a,l,c,h;for(;++e<n.length;)if(n[e][0]==="enter"&&n[e][1].type==="attentionSequence"&&n[e][1]._close){for(i=e;i--;)if(n[i][0]==="exit"&&n[i][1].type==="attentionSequence"&&n[i][1]._open&&t.sliceSerialize(n[i][1]).charCodeAt(0)===t.sliceSerialize(n[e][1]).charCodeAt(0)){if((n[i][1]._close||n[e][1]._open)&&(n[e][1].end.offset-n[e][1].start.offset)%3&&!((n[i][1].end.offset-n[i][1].start.offset+n[e][1].end.offset-n[e][1].start.offset)%3))continue;l=n[i][1].end.offset-n[i][1].start.offset>1&&n[e][1].end.offset-n[e][1].start.offset>1?2:1;const u={...n[i][1].end},p={...n[e][1].start};_h(u,-l),_h(p,l),o={type:l>1?"strongSequence":"emphasisSequence",start:u,end:{...n[i][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...n[e][1].start},end:p},s={type:l>1?"strongText":"emphasisText",start:{...n[i][1].end},end:{...n[e][1].start}},r={type:l>1?"strong":"emphasis",start:{...o.start},end:{...a.end}},n[i][1].end={...o.start},n[e][1].start={...a.end},c=[],n[i][1].end.offset-n[i][1].start.offset&&(c=yn(c,[["enter",n[i][1],t],["exit",n[i][1],t]])),c=yn(c,[["enter",r,t],["enter",o,t],["exit",o,t],["enter",s,t]]),c=yn(c,Lo(t.parser.constructs.insideSpan.null,n.slice(i+1,e),t)),c=yn(c,[["exit",s,t],["enter",a,t],["exit",a,t],["exit",r,t]]),n[e][1].end.offset-n[e][1].start.offset?(h=2,c=yn(c,[["enter",n[e][1],t],["exit",n[e][1],t]])):h=0,fn(n,i-1,e-i+3,c),e=i+c.length-h-2;break}}for(e=-1;++e<n.length;)n[e][1].type==="attentionSequence"&&(n[e][1].type="data");return n}function qy(n,t){const e=this.parser.constructs.attentionMarkers.null,i=this.previous,r=Mo(i);let s;return o;function o(l){return s=l,n.enter("attentionSequence"),a(l)}function a(l){if(l===s)return n.consume(l),a;const c=n.exit("attentionSequence"),h=Mo(l),u=!h||h===2&&r||e.includes(l),p=!r||r===2&&h||e.includes(i);return c._open=!!(s===42?u:u&&(r||!p)),c._close=!!(s===42?p:p&&(h||!u)),t(l)}}function _h(n,t){n.column+=t,n.offset+=t,n._bufferIndex+=t}const Yy={name:"autolink",tokenize:$y};function $y(n,t,e){let i=0;return r;function r(d){return n.enter("autolink"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.enter("autolinkProtocol"),s}function s(d){return Ye(d)?(n.consume(d),o):d===64?e(d):c(d)}function o(d){return d===43||d===45||d===46||sn(d)?(i=1,a(d)):c(d)}function a(d){return d===58?(n.consume(d),i=0,l):(d===43||d===45||d===46||sn(d))&&i++<32?(n.consume(d),a):(i=0,c(d))}function l(d){return d===62?(n.exit("autolinkProtocol"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),t):d===null||d===32||d===60||So(d)?e(d):(n.consume(d),l)}function c(d){return d===64?(n.consume(d),h):Ny(d)?(n.consume(d),c):e(d)}function h(d){return sn(d)?u(d):e(d)}function u(d){return d===46?(n.consume(d),i=0,h):d===62?(n.exit("autolinkProtocol").type="autolinkEmail",n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),t):p(d)}function p(d){if((d===45||sn(d))&&i++<63){const g=d===45?p:u;return n.consume(d),g}return e(d)}}const cs={partial:!0,tokenize:Zy};function Zy(n,t,e){return i;function i(s){return qt(s)?Kt(n,r,"linePrefix")(s):r(s)}function r(s){return s===null||Dt(s)?t(s):e(s)}}const Zd={continuation:{tokenize:Ky},exit:Qy,name:"blockQuote",tokenize:jy};function jy(n,t,e){const i=this;return r;function r(o){if(o===62){const a=i.containerState;return a.open||(n.enter("blockQuote",{_container:!0}),a.open=!0),n.enter("blockQuotePrefix"),n.enter("blockQuoteMarker"),n.consume(o),n.exit("blockQuoteMarker"),s}return e(o)}function s(o){return qt(o)?(n.enter("blockQuotePrefixWhitespace"),n.consume(o),n.exit("blockQuotePrefixWhitespace"),n.exit("blockQuotePrefix"),t):(n.exit("blockQuotePrefix"),t(o))}}function Ky(n,t,e){const i=this;return r;function r(o){return qt(o)?Kt(n,s,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):s(o)}function s(o){return n.attempt(Zd,t,e)(o)}}function Qy(n){n.exit("blockQuote")}const jd={name:"characterEscape",tokenize:Jy};function Jy(n,t,e){return i;function i(s){return n.enter("characterEscape"),n.enter("escapeMarker"),n.consume(s),n.exit("escapeMarker"),r}function r(s){return zy(s)?(n.enter("characterEscapeValue"),n.consume(s),n.exit("characterEscapeValue"),n.exit("characterEscape"),t):e(s)}}const Kd={name:"characterReference",tokenize:tS};function tS(n,t,e){const i=this;let r=0,s,o;return a;function a(u){return n.enter("characterReference"),n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),l}function l(u){return u===35?(n.enter("characterReferenceMarkerNumeric"),n.consume(u),n.exit("characterReferenceMarkerNumeric"),c):(n.enter("characterReferenceValue"),s=31,o=sn,h(u))}function c(u){return u===88||u===120?(n.enter("characterReferenceMarkerHexadecimal"),n.consume(u),n.exit("characterReferenceMarkerHexadecimal"),n.enter("characterReferenceValue"),s=6,o=ky,h):(n.enter("characterReferenceValue"),s=7,o=Pl,h(u))}function h(u){if(u===59&&r){const p=n.exit("characterReferenceValue");return o===sn&&!oc(i.sliceSerialize(p))?e(u):(n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),n.exit("characterReference"),t)}return o(u)&&r++<s?(n.consume(u),h):e(u)}}const vh={partial:!0,tokenize:nS},xh={concrete:!0,name:"codeFenced",tokenize:eS};function eS(n,t,e){const i=this,r={partial:!0,tokenize:R};let s=0,o=0,a;return l;function l(S){return c(S)}function c(S){const b=i.events[i.events.length-1];return s=b&&b[1].type==="linePrefix"?b[2].sliceSerialize(b[1],!0).length:0,a=S,n.enter("codeFenced"),n.enter("codeFencedFence"),n.enter("codeFencedFenceSequence"),h(S)}function h(S){return S===a?(o++,n.consume(S),h):o<3?e(S):(n.exit("codeFencedFenceSequence"),qt(S)?Kt(n,u,"whitespace")(S):u(S))}function u(S){return S===null||Dt(S)?(n.exit("codeFencedFence"),i.interrupt?t(S):n.check(vh,_,y)(S)):(n.enter("codeFencedFenceInfo"),n.enter("chunkString",{contentType:"string"}),p(S))}function p(S){return S===null||Dt(S)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),u(S)):qt(S)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),Kt(n,d,"whitespace")(S)):S===96&&S===a?e(S):(n.consume(S),p)}function d(S){return S===null||Dt(S)?u(S):(n.enter("codeFencedFenceMeta"),n.enter("chunkString",{contentType:"string"}),g(S))}function g(S){return S===null||Dt(S)?(n.exit("chunkString"),n.exit("codeFencedFenceMeta"),u(S)):S===96&&S===a?e(S):(n.consume(S),g)}function _(S){return n.attempt(r,y,m)(S)}function m(S){return n.enter("lineEnding"),n.consume(S),n.exit("lineEnding"),f}function f(S){return s>0&&qt(S)?Kt(n,M,"linePrefix",s+1)(S):M(S)}function M(S){return S===null||Dt(S)?n.check(vh,_,y)(S):(n.enter("codeFlowValue"),E(S))}function E(S){return S===null||Dt(S)?(n.exit("codeFlowValue"),M(S)):(n.consume(S),E)}function y(S){return n.exit("codeFenced"),t(S)}function R(S,b,L){let w=0;return x;function x(V){return S.enter("lineEnding"),S.consume(V),S.exit("lineEnding"),C}function C(V){return S.enter("codeFencedFence"),qt(V)?Kt(S,F,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(V):F(V)}function F(V){return V===a?(S.enter("codeFencedFenceSequence"),z(V)):L(V)}function z(V){return V===a?(w++,S.consume(V),z):w>=o?(S.exit("codeFencedFenceSequence"),qt(V)?Kt(S,B,"whitespace")(V):B(V)):L(V)}function B(V){return V===null||Dt(V)?(S.exit("codeFencedFence"),b(V)):L(V)}}}function nS(n,t,e){const i=this;return r;function r(o){return o===null?e(o):(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}const Ra={name:"codeIndented",tokenize:rS},iS={partial:!0,tokenize:sS};function rS(n,t,e){const i=this;return r;function r(c){return n.enter("codeIndented"),Kt(n,s,"linePrefix",5)(c)}function s(c){const h=i.events[i.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?o(c):e(c)}function o(c){return c===null?l(c):Dt(c)?n.attempt(iS,o,l)(c):(n.enter("codeFlowValue"),a(c))}function a(c){return c===null||Dt(c)?(n.exit("codeFlowValue"),o(c)):(n.consume(c),a)}function l(c){return n.exit("codeIndented"),t(c)}}function sS(n,t,e){const i=this;return r;function r(o){return i.parser.lazy[i.now().line]?e(o):Dt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),r):Kt(n,s,"linePrefix",5)(o)}function s(o){const a=i.events[i.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):Dt(o)?r(o):e(o)}}const oS={name:"codeText",previous:lS,resolve:aS,tokenize:cS};function aS(n){let t=n.length-4,e=3,i,r;if((n[e][1].type==="lineEnding"||n[e][1].type==="space")&&(n[t][1].type==="lineEnding"||n[t][1].type==="space")){for(i=e;++i<t;)if(n[i][1].type==="codeTextData"){n[e][1].type="codeTextPadding",n[t][1].type="codeTextPadding",e+=2,t-=2;break}}for(i=e-1,t++;++i<=t;)r===void 0?i!==t&&n[i][1].type!=="lineEnding"&&(r=i):(i===t||n[i][1].type==="lineEnding")&&(n[r][1].type="codeTextData",i!==r+2&&(n[r][1].end=n[i-1][1].end,n.splice(r+2,i-r-2),t-=i-r-2,i=r+2),r=void 0);return n}function lS(n){return n!==96||this.events[this.events.length-1][1].type==="characterEscape"}function cS(n,t,e){let i=0,r,s;return o;function o(u){return n.enter("codeText"),n.enter("codeTextSequence"),a(u)}function a(u){return u===96?(n.consume(u),i++,a):(n.exit("codeTextSequence"),l(u))}function l(u){return u===null?e(u):u===32?(n.enter("space"),n.consume(u),n.exit("space"),l):u===96?(s=n.enter("codeTextSequence"),r=0,h(u)):Dt(u)?(n.enter("lineEnding"),n.consume(u),n.exit("lineEnding"),l):(n.enter("codeTextData"),c(u))}function c(u){return u===null||u===32||u===96||Dt(u)?(n.exit("codeTextData"),l(u)):(n.consume(u),c)}function h(u){return u===96?(n.consume(u),r++,h):r===i?(n.exit("codeTextSequence"),n.exit("codeText"),t(u)):(s.type="codeTextData",c(u))}}class uS{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,e){const i=e??Number.POSITIVE_INFINITY;return i<this.left.length?this.left.slice(t,i):t>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(t,e,i){const r=e||0;this.setCursor(Math.trunc(t));const s=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return i&&Xr(this.left,i),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Xr(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Xr(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const e=this.left.splice(t,Number.POSITIVE_INFINITY);Xr(this.right,e.reverse())}else{const e=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Xr(this.left,e.reverse())}}}function Xr(n,t){let e=0;if(t.length<1e4)n.push(...t);else for(;e<t.length;)n.push(...t.slice(e,e+1e4)),e+=1e4}function Qd(n){const t={};let e=-1,i,r,s,o,a,l,c;const h=new uS(n);for(;++e<h.length;){for(;e in t;)e=t[e];if(i=h.get(e),e&&i[1].type==="chunkFlow"&&h.get(e-1)[1].type==="listItemPrefix"&&(l=i[1]._tokenizer.events,s=0,s<l.length&&l[s][1].type==="lineEndingBlank"&&(s+=2),s<l.length&&l[s][1].type==="content"))for(;++s<l.length&&l[s][1].type!=="content";)l[s][1].type==="chunkText"&&(l[s][1]._isInFirstContentOfListItem=!0,s++);if(i[0]==="enter")i[1].contentType&&(Object.assign(t,hS(h,e)),e=t[e],c=!0);else if(i[1]._container){for(s=e,r=void 0;s--;)if(o=h.get(s),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(r&&(h.get(r)[1].type="lineEndingBlank"),o[1].type="lineEnding",r=s);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;r&&(i[1].end={...h.get(r)[1].start},a=h.slice(r,e),a.unshift(i),h.splice(r,e-r+1,a))}}return fn(n,0,Number.POSITIVE_INFINITY,h.slice(0)),!c}function hS(n,t){const e=n.get(t)[1],i=n.get(t)[2];let r=t-1;const s=[];let o=e._tokenizer;o||(o=i.parser[e.contentType](e.start),e._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const a=o.events,l=[],c={};let h,u,p=-1,d=e,g=0,_=0;const m=[_];for(;d;){for(;n.get(++r)[1]!==d;);s.push(r),d._tokenizer||(h=i.sliceStream(d),d.next||h.push(null),u&&o.defineSkip(d.start),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(h),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),u=d,d=d.next}for(d=e;++p<a.length;)a[p][0]==="exit"&&a[p-1][0]==="enter"&&a[p][1].type===a[p-1][1].type&&a[p][1].start.line!==a[p][1].end.line&&(_=p+1,m.push(_),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(o.events=[],d?(d._tokenizer=void 0,d.previous=void 0):m.pop(),p=m.length;p--;){const f=a.slice(m[p],m[p+1]),M=s.pop();l.push([M,M+f.length-1]),n.splice(M,2,f)}for(l.reverse(),p=-1;++p<l.length;)c[g+l[p][0]]=g+l[p][1],g+=l[p][1]-l[p][0]-1;return c}const dS={resolve:pS,tokenize:mS},fS={partial:!0,tokenize:gS};function pS(n){return Qd(n),n}function mS(n,t){let e;return i;function i(a){return n.enter("content"),e=n.enter("chunkContent",{contentType:"content"}),r(a)}function r(a){return a===null?s(a):Dt(a)?n.check(fS,o,s)(a):(n.consume(a),r)}function s(a){return n.exit("chunkContent"),n.exit("content"),t(a)}function o(a){return n.consume(a),n.exit("chunkContent"),e.next=n.enter("chunkContent",{contentType:"content",previous:e}),e=e.next,r}}function gS(n,t,e){const i=this;return r;function r(o){return n.exit("chunkContent"),n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),Kt(n,s,"linePrefix")}function s(o){if(o===null||Dt(o))return e(o);const a=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):n.interrupt(i.parser.constructs.flow,e,t)(o)}}function Jd(n,t,e,i,r,s,o,a,l){const c=l||Number.POSITIVE_INFINITY;let h=0;return u;function u(f){return f===60?(n.enter(i),n.enter(r),n.enter(s),n.consume(f),n.exit(s),p):f===null||f===32||f===41||So(f)?e(f):(n.enter(i),n.enter(o),n.enter(a),n.enter("chunkString",{contentType:"string"}),_(f))}function p(f){return f===62?(n.enter(s),n.consume(f),n.exit(s),n.exit(r),n.exit(i),t):(n.enter(a),n.enter("chunkString",{contentType:"string"}),d(f))}function d(f){return f===62?(n.exit("chunkString"),n.exit(a),p(f)):f===null||f===60||Dt(f)?e(f):(n.consume(f),f===92?g:d)}function g(f){return f===60||f===62||f===92?(n.consume(f),d):d(f)}function _(f){return!h&&(f===null||f===41||de(f))?(n.exit("chunkString"),n.exit(a),n.exit(o),n.exit(i),t(f)):h<c&&f===40?(n.consume(f),h++,_):f===41?(n.consume(f),h--,_):f===null||f===32||f===40||So(f)?e(f):(n.consume(f),f===92?m:_)}function m(f){return f===40||f===41||f===92?(n.consume(f),_):_(f)}}function tf(n,t,e,i,r,s){const o=this;let a=0,l;return c;function c(d){return n.enter(i),n.enter(r),n.consume(d),n.exit(r),n.enter(s),h}function h(d){return a>999||d===null||d===91||d===93&&!l||d===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?e(d):d===93?(n.exit(s),n.enter(r),n.consume(d),n.exit(r),n.exit(i),t):Dt(d)?(n.enter("lineEnding"),n.consume(d),n.exit("lineEnding"),h):(n.enter("chunkString",{contentType:"string"}),u(d))}function u(d){return d===null||d===91||d===93||Dt(d)||a++>999?(n.exit("chunkString"),h(d)):(n.consume(d),l||(l=!qt(d)),d===92?p:u)}function p(d){return d===91||d===92||d===93?(n.consume(d),a++,u):u(d)}}function ef(n,t,e,i,r,s){let o;return a;function a(p){return p===34||p===39||p===40?(n.enter(i),n.enter(r),n.consume(p),n.exit(r),o=p===40?41:p,l):e(p)}function l(p){return p===o?(n.enter(r),n.consume(p),n.exit(r),n.exit(i),t):(n.enter(s),c(p))}function c(p){return p===o?(n.exit(s),l(o)):p===null?e(p):Dt(p)?(n.enter("lineEnding"),n.consume(p),n.exit("lineEnding"),Kt(n,c,"linePrefix")):(n.enter("chunkString",{contentType:"string"}),h(p))}function h(p){return p===o||p===null||Dt(p)?(n.exit("chunkString"),c(p)):(n.consume(p),p===92?u:h)}function u(p){return p===o||p===92?(n.consume(p),h):h(p)}}function Qr(n,t){let e;return i;function i(r){return Dt(r)?(n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),e=!0,i):qt(r)?Kt(n,i,e?"linePrefix":"lineSuffix")(r):t(r)}}const _S={name:"definition",tokenize:xS},vS={partial:!0,tokenize:yS};function xS(n,t,e){const i=this;let r;return s;function s(d){return n.enter("definition"),o(d)}function o(d){return tf.call(i,n,a,e,"definitionLabel","definitionLabelMarker","definitionLabelString")(d)}function a(d){return r=Un(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),d===58?(n.enter("definitionMarker"),n.consume(d),n.exit("definitionMarker"),l):e(d)}function l(d){return de(d)?Qr(n,c)(d):c(d)}function c(d){return Jd(n,h,e,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(d)}function h(d){return n.attempt(vS,u,u)(d)}function u(d){return qt(d)?Kt(n,p,"whitespace")(d):p(d)}function p(d){return d===null||Dt(d)?(n.exit("definition"),i.parser.defined.push(r),t(d)):e(d)}}function yS(n,t,e){return i;function i(a){return de(a)?Qr(n,r)(a):e(a)}function r(a){return ef(n,s,e,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function s(a){return qt(a)?Kt(n,o,"whitespace")(a):o(a)}function o(a){return a===null||Dt(a)?t(a):e(a)}}const SS={name:"hardBreakEscape",tokenize:MS};function MS(n,t,e){return i;function i(s){return n.enter("hardBreakEscape"),n.consume(s),r}function r(s){return Dt(s)?(n.exit("hardBreakEscape"),t(s)):e(s)}}const ES={name:"headingAtx",resolve:bS,tokenize:TS};function bS(n,t){let e=n.length-2,i=3,r,s;return n[i][1].type==="whitespace"&&(i+=2),e-2>i&&n[e][1].type==="whitespace"&&(e-=2),n[e][1].type==="atxHeadingSequence"&&(i===e-1||e-4>i&&n[e-2][1].type==="whitespace")&&(e-=i+1===e?2:4),e>i&&(r={type:"atxHeadingText",start:n[i][1].start,end:n[e][1].end},s={type:"chunkText",start:n[i][1].start,end:n[e][1].end,contentType:"text"},fn(n,i,e-i+1,[["enter",r,t],["enter",s,t],["exit",s,t],["exit",r,t]])),n}function TS(n,t,e){let i=0;return r;function r(h){return n.enter("atxHeading"),s(h)}function s(h){return n.enter("atxHeadingSequence"),o(h)}function o(h){return h===35&&i++<6?(n.consume(h),o):h===null||de(h)?(n.exit("atxHeadingSequence"),a(h)):e(h)}function a(h){return h===35?(n.enter("atxHeadingSequence"),l(h)):h===null||Dt(h)?(n.exit("atxHeading"),t(h)):qt(h)?Kt(n,a,"whitespace")(h):(n.enter("atxHeadingText"),c(h))}function l(h){return h===35?(n.consume(h),l):(n.exit("atxHeadingSequence"),a(h))}function c(h){return h===null||h===35||de(h)?(n.exit("atxHeadingText"),a(h)):(n.consume(h),c)}}const wS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],yh=["pre","script","style","textarea"],AS={concrete:!0,name:"htmlFlow",resolveTo:PS,tokenize:LS},CS={partial:!0,tokenize:IS},RS={partial:!0,tokenize:DS};function PS(n){let t=n.length;for(;t--&&!(n[t][0]==="enter"&&n[t][1].type==="htmlFlow"););return t>1&&n[t-2][1].type==="linePrefix"&&(n[t][1].start=n[t-2][1].start,n[t+1][1].start=n[t-2][1].start,n.splice(t-2,2)),n}function LS(n,t,e){const i=this;let r,s,o,a,l;return c;function c(U){return h(U)}function h(U){return n.enter("htmlFlow"),n.enter("htmlFlowData"),n.consume(U),u}function u(U){return U===33?(n.consume(U),p):U===47?(n.consume(U),s=!0,_):U===63?(n.consume(U),r=3,i.interrupt?t:P):Ye(U)?(n.consume(U),o=String.fromCharCode(U),m):e(U)}function p(U){return U===45?(n.consume(U),r=2,d):U===91?(n.consume(U),r=5,a=0,g):Ye(U)?(n.consume(U),r=4,i.interrupt?t:P):e(U)}function d(U){return U===45?(n.consume(U),i.interrupt?t:P):e(U)}function g(U){const J="CDATA[";return U===J.charCodeAt(a++)?(n.consume(U),a===J.length?i.interrupt?t:F:g):e(U)}function _(U){return Ye(U)?(n.consume(U),o=String.fromCharCode(U),m):e(U)}function m(U){if(U===null||U===47||U===62||de(U)){const J=U===47,lt=o.toLowerCase();return!J&&!s&&yh.includes(lt)?(r=1,i.interrupt?t(U):F(U)):wS.includes(o.toLowerCase())?(r=6,J?(n.consume(U),f):i.interrupt?t(U):F(U)):(r=7,i.interrupt&&!i.parser.lazy[i.now().line]?e(U):s?M(U):E(U))}return U===45||sn(U)?(n.consume(U),o+=String.fromCharCode(U),m):e(U)}function f(U){return U===62?(n.consume(U),i.interrupt?t:F):e(U)}function M(U){return qt(U)?(n.consume(U),M):x(U)}function E(U){return U===47?(n.consume(U),x):U===58||U===95||Ye(U)?(n.consume(U),y):qt(U)?(n.consume(U),E):x(U)}function y(U){return U===45||U===46||U===58||U===95||sn(U)?(n.consume(U),y):R(U)}function R(U){return U===61?(n.consume(U),S):qt(U)?(n.consume(U),R):E(U)}function S(U){return U===null||U===60||U===61||U===62||U===96?e(U):U===34||U===39?(n.consume(U),l=U,b):qt(U)?(n.consume(U),S):L(U)}function b(U){return U===l?(n.consume(U),l=null,w):U===null||Dt(U)?e(U):(n.consume(U),b)}function L(U){return U===null||U===34||U===39||U===47||U===60||U===61||U===62||U===96||de(U)?R(U):(n.consume(U),L)}function w(U){return U===47||U===62||qt(U)?E(U):e(U)}function x(U){return U===62?(n.consume(U),C):e(U)}function C(U){return U===null||Dt(U)?F(U):qt(U)?(n.consume(U),C):e(U)}function F(U){return U===45&&r===2?(n.consume(U),Z):U===60&&r===1?(n.consume(U),Q):U===62&&r===4?(n.consume(U),dt):U===63&&r===3?(n.consume(U),P):U===93&&r===5?(n.consume(U),it):Dt(U)&&(r===6||r===7)?(n.exit("htmlFlowData"),n.check(CS,Lt,z)(U)):U===null||Dt(U)?(n.exit("htmlFlowData"),z(U)):(n.consume(U),F)}function z(U){return n.check(RS,B,Lt)(U)}function B(U){return n.enter("lineEnding"),n.consume(U),n.exit("lineEnding"),V}function V(U){return U===null||Dt(U)?z(U):(n.enter("htmlFlowData"),F(U))}function Z(U){return U===45?(n.consume(U),P):F(U)}function Q(U){return U===47?(n.consume(U),o="",q):F(U)}function q(U){if(U===62){const J=o.toLowerCase();return yh.includes(J)?(n.consume(U),dt):F(U)}return Ye(U)&&o.length<8?(n.consume(U),o+=String.fromCharCode(U),q):F(U)}function it(U){return U===93?(n.consume(U),P):F(U)}function P(U){return U===62?(n.consume(U),dt):U===45&&r===2?(n.consume(U),P):F(U)}function dt(U){return U===null||Dt(U)?(n.exit("htmlFlowData"),Lt(U)):(n.consume(U),dt)}function Lt(U){return n.exit("htmlFlow"),t(U)}}function DS(n,t,e){const i=this;return r;function r(o){return Dt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s):e(o)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}function IS(n,t,e){return i;function i(r){return n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),n.attempt(cs,t,e)}}const US={name:"htmlText",tokenize:OS};function OS(n,t,e){const i=this;let r,s,o;return a;function a(P){return n.enter("htmlText"),n.enter("htmlTextData"),n.consume(P),l}function l(P){return P===33?(n.consume(P),c):P===47?(n.consume(P),R):P===63?(n.consume(P),E):Ye(P)?(n.consume(P),L):e(P)}function c(P){return P===45?(n.consume(P),h):P===91?(n.consume(P),s=0,g):Ye(P)?(n.consume(P),M):e(P)}function h(P){return P===45?(n.consume(P),d):e(P)}function u(P){return P===null?e(P):P===45?(n.consume(P),p):Dt(P)?(o=u,Q(P)):(n.consume(P),u)}function p(P){return P===45?(n.consume(P),d):u(P)}function d(P){return P===62?Z(P):P===45?p(P):u(P)}function g(P){const dt="CDATA[";return P===dt.charCodeAt(s++)?(n.consume(P),s===dt.length?_:g):e(P)}function _(P){return P===null?e(P):P===93?(n.consume(P),m):Dt(P)?(o=_,Q(P)):(n.consume(P),_)}function m(P){return P===93?(n.consume(P),f):_(P)}function f(P){return P===62?Z(P):P===93?(n.consume(P),f):_(P)}function M(P){return P===null||P===62?Z(P):Dt(P)?(o=M,Q(P)):(n.consume(P),M)}function E(P){return P===null?e(P):P===63?(n.consume(P),y):Dt(P)?(o=E,Q(P)):(n.consume(P),E)}function y(P){return P===62?Z(P):E(P)}function R(P){return Ye(P)?(n.consume(P),S):e(P)}function S(P){return P===45||sn(P)?(n.consume(P),S):b(P)}function b(P){return Dt(P)?(o=b,Q(P)):qt(P)?(n.consume(P),b):Z(P)}function L(P){return P===45||sn(P)?(n.consume(P),L):P===47||P===62||de(P)?w(P):e(P)}function w(P){return P===47?(n.consume(P),Z):P===58||P===95||Ye(P)?(n.consume(P),x):Dt(P)?(o=w,Q(P)):qt(P)?(n.consume(P),w):Z(P)}function x(P){return P===45||P===46||P===58||P===95||sn(P)?(n.consume(P),x):C(P)}function C(P){return P===61?(n.consume(P),F):Dt(P)?(o=C,Q(P)):qt(P)?(n.consume(P),C):w(P)}function F(P){return P===null||P===60||P===61||P===62||P===96?e(P):P===34||P===39?(n.consume(P),r=P,z):Dt(P)?(o=F,Q(P)):qt(P)?(n.consume(P),F):(n.consume(P),B)}function z(P){return P===r?(n.consume(P),r=void 0,V):P===null?e(P):Dt(P)?(o=z,Q(P)):(n.consume(P),z)}function B(P){return P===null||P===34||P===39||P===60||P===61||P===96?e(P):P===47||P===62||de(P)?w(P):(n.consume(P),B)}function V(P){return P===47||P===62||de(P)?w(P):e(P)}function Z(P){return P===62?(n.consume(P),n.exit("htmlTextData"),n.exit("htmlText"),t):e(P)}function Q(P){return n.exit("htmlTextData"),n.enter("lineEnding"),n.consume(P),n.exit("lineEnding"),q}function q(P){return qt(P)?Kt(n,it,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(P):it(P)}function it(P){return n.enter("htmlTextData"),o(P)}}const ac={name:"labelEnd",resolveAll:zS,resolveTo:BS,tokenize:HS},FS={tokenize:VS},NS={tokenize:GS},kS={tokenize:WS};function zS(n){let t=-1;const e=[];for(;++t<n.length;){const i=n[t][1];if(e.push(n[t]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){const r=i.type==="labelImage"?4:2;i.type="data",t+=r}}return n.length!==e.length&&fn(n,0,n.length,e),n}function BS(n,t){let e=n.length,i=0,r,s,o,a;for(;e--;)if(r=n[e][1],s){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;n[e][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(o){if(n[e][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(s=e,r.type!=="labelLink")){i=2;break}}else r.type==="labelEnd"&&(o=e);const l={type:n[s][1].type==="labelLink"?"link":"image",start:{...n[s][1].start},end:{...n[n.length-1][1].end}},c={type:"label",start:{...n[s][1].start},end:{...n[o][1].end}},h={type:"labelText",start:{...n[s+i+2][1].end},end:{...n[o-2][1].start}};return a=[["enter",l,t],["enter",c,t]],a=yn(a,n.slice(s+1,s+i+3)),a=yn(a,[["enter",h,t]]),a=yn(a,Lo(t.parser.constructs.insideSpan.null,n.slice(s+i+4,o-3),t)),a=yn(a,[["exit",h,t],n[o-2],n[o-1],["exit",c,t]]),a=yn(a,n.slice(o+1)),a=yn(a,[["exit",l,t]]),fn(n,s,n.length,a),n}function HS(n,t,e){const i=this;let r=i.events.length,s,o;for(;r--;)if((i.events[r][1].type==="labelImage"||i.events[r][1].type==="labelLink")&&!i.events[r][1]._balanced){s=i.events[r][1];break}return a;function a(p){return s?s._inactive?u(p):(o=i.parser.defined.includes(Un(i.sliceSerialize({start:s.end,end:i.now()}))),n.enter("labelEnd"),n.enter("labelMarker"),n.consume(p),n.exit("labelMarker"),n.exit("labelEnd"),l):e(p)}function l(p){return p===40?n.attempt(FS,h,o?h:u)(p):p===91?n.attempt(NS,h,o?c:u)(p):o?h(p):u(p)}function c(p){return n.attempt(kS,h,u)(p)}function h(p){return t(p)}function u(p){return s._balanced=!0,e(p)}}function VS(n,t,e){return i;function i(u){return n.enter("resource"),n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),r}function r(u){return de(u)?Qr(n,s)(u):s(u)}function s(u){return u===41?h(u):Jd(n,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function o(u){return de(u)?Qr(n,l)(u):h(u)}function a(u){return e(u)}function l(u){return u===34||u===39||u===40?ef(n,c,e,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):h(u)}function c(u){return de(u)?Qr(n,h)(u):h(u)}function h(u){return u===41?(n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),n.exit("resource"),t):e(u)}}function GS(n,t,e){const i=this;return r;function r(a){return tf.call(i,n,s,o,"reference","referenceMarker","referenceString")(a)}function s(a){return i.parser.defined.includes(Un(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?t(a):e(a)}function o(a){return e(a)}}function WS(n,t,e){return i;function i(s){return n.enter("reference"),n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),r}function r(s){return s===93?(n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),n.exit("reference"),t):e(s)}}const XS={name:"labelStartImage",resolveAll:ac.resolveAll,tokenize:qS};function qS(n,t,e){const i=this;return r;function r(a){return n.enter("labelImage"),n.enter("labelImageMarker"),n.consume(a),n.exit("labelImageMarker"),s}function s(a){return a===91?(n.enter("labelMarker"),n.consume(a),n.exit("labelMarker"),n.exit("labelImage"),o):e(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(a):t(a)}}const YS={name:"labelStartLink",resolveAll:ac.resolveAll,tokenize:$S};function $S(n,t,e){const i=this;return r;function r(o){return n.enter("labelLink"),n.enter("labelMarker"),n.consume(o),n.exit("labelMarker"),n.exit("labelLink"),s}function s(o){return o===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(o):t(o)}}const Pa={name:"lineEnding",tokenize:ZS};function ZS(n,t){return e;function e(i){return n.enter("lineEnding"),n.consume(i),n.exit("lineEnding"),Kt(n,t,"linePrefix")}}const ho={name:"thematicBreak",tokenize:jS};function jS(n,t,e){let i=0,r;return s;function s(c){return n.enter("thematicBreak"),o(c)}function o(c){return r=c,a(c)}function a(c){return c===r?(n.enter("thematicBreakSequence"),l(c)):i>=3&&(c===null||Dt(c))?(n.exit("thematicBreak"),t(c)):e(c)}function l(c){return c===r?(n.consume(c),i++,l):(n.exit("thematicBreakSequence"),qt(c)?Kt(n,a,"whitespace")(c):a(c))}}const tn={continuation:{tokenize:tM},exit:nM,name:"list",tokenize:JS},KS={partial:!0,tokenize:iM},QS={partial:!0,tokenize:eM};function JS(n,t,e){const i=this,r=i.events[i.events.length-1];let s=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,o=0;return a;function a(d){const g=i.containerState.type||(d===42||d===43||d===45?"listUnordered":"listOrdered");if(g==="listUnordered"?!i.containerState.marker||d===i.containerState.marker:Pl(d)){if(i.containerState.type||(i.containerState.type=g,n.enter(g,{_container:!0})),g==="listUnordered")return n.enter("listItemPrefix"),d===42||d===45?n.check(ho,e,c)(d):c(d);if(!i.interrupt||d===49)return n.enter("listItemPrefix"),n.enter("listItemValue"),l(d)}return e(d)}function l(d){return Pl(d)&&++o<10?(n.consume(d),l):(!i.interrupt||o<2)&&(i.containerState.marker?d===i.containerState.marker:d===41||d===46)?(n.exit("listItemValue"),c(d)):e(d)}function c(d){return n.enter("listItemMarker"),n.consume(d),n.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||d,n.check(cs,i.interrupt?e:h,n.attempt(KS,p,u))}function h(d){return i.containerState.initialBlankLine=!0,s++,p(d)}function u(d){return qt(d)?(n.enter("listItemPrefixWhitespace"),n.consume(d),n.exit("listItemPrefixWhitespace"),p):e(d)}function p(d){return i.containerState.size=s+i.sliceSerialize(n.exit("listItemPrefix"),!0).length,t(d)}}function tM(n,t,e){const i=this;return i.containerState._closeFlow=void 0,n.check(cs,r,s);function r(a){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,Kt(n,t,"listItemIndent",i.containerState.size+1)(a)}function s(a){return i.containerState.furtherBlankLines||!qt(a)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,o(a)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,n.attempt(QS,t,o)(a))}function o(a){return i.containerState._closeFlow=!0,i.interrupt=void 0,Kt(n,n.attempt(tn,t,e),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function eM(n,t,e){const i=this;return Kt(n,r,"listItemIndent",i.containerState.size+1);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===i.containerState.size?t(s):e(s)}}function nM(n){n.exit(this.containerState.type)}function iM(n,t,e){const i=this;return Kt(n,r,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(s){const o=i.events[i.events.length-1];return!qt(s)&&o&&o[1].type==="listItemPrefixWhitespace"?t(s):e(s)}}const Sh={name:"setextUnderline",resolveTo:rM,tokenize:sM};function rM(n,t){let e=n.length,i,r,s;for(;e--;)if(n[e][0]==="enter"){if(n[e][1].type==="content"){i=e;break}n[e][1].type==="paragraph"&&(r=e)}else n[e][1].type==="content"&&n.splice(e,1),!s&&n[e][1].type==="definition"&&(s=e);const o={type:"setextHeading",start:{...n[i][1].start},end:{...n[n.length-1][1].end}};return n[r][1].type="setextHeadingText",s?(n.splice(r,0,["enter",o,t]),n.splice(s+1,0,["exit",n[i][1],t]),n[i][1].end={...n[s][1].end}):n[i][1]=o,n.push(["exit",o,t]),n}function sM(n,t,e){const i=this;let r;return s;function s(c){let h=i.events.length,u;for(;h--;)if(i.events[h][1].type!=="lineEnding"&&i.events[h][1].type!=="linePrefix"&&i.events[h][1].type!=="content"){u=i.events[h][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||u)?(n.enter("setextHeadingLine"),r=c,o(c)):e(c)}function o(c){return n.enter("setextHeadingLineSequence"),a(c)}function a(c){return c===r?(n.consume(c),a):(n.exit("setextHeadingLineSequence"),qt(c)?Kt(n,l,"lineSuffix")(c):l(c))}function l(c){return c===null||Dt(c)?(n.exit("setextHeadingLine"),t(c)):e(c)}}const oM={tokenize:aM};function aM(n){const t=this,e=n.attempt(cs,i,n.attempt(this.parser.constructs.flowInitial,r,Kt(n,n.attempt(this.parser.constructs.flow,r,n.attempt(dS,r)),"linePrefix")));return e;function i(s){if(s===null){n.consume(s);return}return n.enter("lineEndingBlank"),n.consume(s),n.exit("lineEndingBlank"),t.currentConstruct=void 0,e}function r(s){if(s===null){n.consume(s);return}return n.enter("lineEnding"),n.consume(s),n.exit("lineEnding"),t.currentConstruct=void 0,e}}const lM={resolveAll:rf()},cM=nf("string"),uM=nf("text");function nf(n){return{resolveAll:rf(n==="text"?hM:void 0),tokenize:t};function t(e){const i=this,r=this.parser.constructs[n],s=e.attempt(r,o,a);return o;function o(h){return c(h)?s(h):a(h)}function a(h){if(h===null){e.consume(h);return}return e.enter("data"),e.consume(h),l}function l(h){return c(h)?(e.exit("data"),s(h)):(e.consume(h),l)}function c(h){if(h===null)return!0;const u=r[h];let p=-1;if(u)for(;++p<u.length;){const d=u[p];if(!d.previous||d.previous.call(i,i.previous))return!0}return!1}}}function rf(n){return t;function t(e,i){let r=-1,s;for(;++r<=e.length;)s===void 0?e[r]&&e[r][1].type==="data"&&(s=r,r++):(!e[r]||e[r][1].type!=="data")&&(r!==s+2&&(e[s][1].end=e[r-1][1].end,e.splice(s+2,r-s-2),r=s+2),s=void 0);return n?n(e,i):e}}function hM(n,t){let e=0;for(;++e<=n.length;)if((e===n.length||n[e][1].type==="lineEnding")&&n[e-1][1].type==="data"){const i=n[e-1][1],r=t.sliceStream(i);let s=r.length,o=-1,a=0,l;for(;s--;){const c=r[s];if(typeof c=="string"){for(o=c.length;c.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(c===-2)l=!0,a++;else if(c!==-1){s++;break}}if(t._contentTypeTextTrailing&&e===n.length&&(a=0),a){const c={type:e===n.length||l||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?o:i.start._bufferIndex+o,_index:i.start._index+s,line:i.end.line,column:i.end.column-a,offset:i.end.offset-a},end:{...i.end}};i.end={...c.start},i.start.offset===i.end.offset?Object.assign(i,c):(n.splice(e,0,["enter",c,t],["exit",c,t]),e+=2)}e++}return n}const dM={42:tn,43:tn,45:tn,48:tn,49:tn,50:tn,51:tn,52:tn,53:tn,54:tn,55:tn,56:tn,57:tn,62:Zd},fM={91:_S},pM={[-2]:Ra,[-1]:Ra,32:Ra},mM={35:ES,42:ho,45:[Sh,ho],60:AS,61:Sh,95:ho,96:xh,126:xh},gM={38:Kd,92:jd},_M={[-5]:Pa,[-4]:Pa,[-3]:Pa,33:XS,38:Kd,42:Ll,60:[Yy,US],91:YS,92:[SS,jd],93:ac,95:Ll,96:oS},vM={null:[Ll,lM]},xM={null:[42,95]},yM={null:[]},SM=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:xM,contentInitial:fM,disable:yM,document:dM,flow:mM,flowInitial:pM,insideSpan:vM,string:gM,text:_M},Symbol.toStringTag,{value:"Module"}));function MM(n,t,e){let i={_bufferIndex:-1,_index:0,line:e&&e.line||1,column:e&&e.column||1,offset:e&&e.offset||0};const r={},s=[];let o=[],a=[];const l={attempt:b(R),check:b(S),consume:M,enter:E,exit:y,interrupt:b(S,{interrupt:!0})},c={code:null,containerState:{},defineSkip:_,events:[],now:g,parser:n,previous:null,sliceSerialize:p,sliceStream:d,write:u};let h=t.tokenize.call(c,l);return t.resolveAll&&s.push(t),c;function u(C){return o=yn(o,C),m(),o[o.length-1]!==null?[]:(L(t,0),c.events=Lo(s,c.events,c),c.events)}function p(C,F){return bM(d(C),F)}function d(C){return EM(o,C)}function g(){const{_bufferIndex:C,_index:F,line:z,column:B,offset:V}=i;return{_bufferIndex:C,_index:F,line:z,column:B,offset:V}}function _(C){r[C.line]=C.column,x()}function m(){let C;for(;i._index<o.length;){const F=o[i._index];if(typeof F=="string")for(C=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===C&&i._bufferIndex<F.length;)f(F.charCodeAt(i._bufferIndex));else f(F)}}function f(C){h=h(C)}function M(C){Dt(C)?(i.line++,i.column=1,i.offset+=C===-3?2:1,x()):C!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===o[i._index].length&&(i._bufferIndex=-1,i._index++)),c.previous=C}function E(C,F){const z=F||{};return z.type=C,z.start=g(),c.events.push(["enter",z,c]),a.push(z),z}function y(C){const F=a.pop();return F.end=g(),c.events.push(["exit",F,c]),F}function R(C,F){L(C,F.from)}function S(C,F){F.restore()}function b(C,F){return z;function z(B,V,Z){let Q,q,it,P;return Array.isArray(B)?Lt(B):"tokenize"in B?Lt([B]):dt(B);function dt(ft){return ht;function ht(St){const Xt=St!==null&&ft[St],wt=St!==null&&ft.null,ce=[...Array.isArray(Xt)?Xt:Xt?[Xt]:[],...Array.isArray(wt)?wt:wt?[wt]:[]];return Lt(ce)(St)}}function Lt(ft){return Q=ft,q=0,ft.length===0?Z:U(ft[q])}function U(ft){return ht;function ht(St){return P=w(),it=ft,ft.partial||(c.currentConstruct=ft),ft.name&&c.parser.constructs.disable.null.includes(ft.name)?lt():ft.tokenize.call(F?Object.assign(Object.create(c),F):c,l,J,lt)(St)}}function J(ft){return C(it,P),V}function lt(ft){return P.restore(),++q<Q.length?U(Q[q]):Z}}}function L(C,F){C.resolveAll&&!s.includes(C)&&s.push(C),C.resolve&&fn(c.events,F,c.events.length-F,C.resolve(c.events.slice(F),c)),C.resolveTo&&(c.events=C.resolveTo(c.events,c))}function w(){const C=g(),F=c.previous,z=c.currentConstruct,B=c.events.length,V=Array.from(a);return{from:B,restore:Z};function Z(){i=C,c.previous=F,c.currentConstruct=z,c.events.length=B,a=V,x()}}function x(){i.line in r&&i.column<2&&(i.column=r[i.line],i.offset+=r[i.line]-1)}}function EM(n,t){const e=t.start._index,i=t.start._bufferIndex,r=t.end._index,s=t.end._bufferIndex;let o;if(e===r)o=[n[e].slice(i,s)];else{if(o=n.slice(e,r),i>-1){const a=o[0];typeof a=="string"?o[0]=a.slice(i):o.shift()}s>0&&o.push(n[r].slice(0,s))}return o}function bM(n,t){let e=-1;const i=[];let r;for(;++e<n.length;){const s=n[e];let o;if(typeof s=="string")o=s;else switch(s){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&r)continue;o=" ";break}default:o=String.fromCharCode(s)}r=s===-2,i.push(o)}return i.join("")}function TM(n){const i={constructs:Yd([SM,...(n||{}).extensions||[]]),content:r(By),defined:[],document:r(Vy),flow:r(oM),lazy:{},string:r(cM),text:r(uM)};return i;function r(s){return o;function o(a){return MM(i,s,a)}}}function wM(n){for(;!Qd(n););return n}const Mh=/[\0\t\n\r]/g;function AM(){let n=1,t="",e=!0,i;return r;function r(s,o,a){const l=[];let c,h,u,p,d;for(s=t+(typeof s=="string"?s.toString():new TextDecoder(o||void 0).decode(s)),u=0,t="",e&&(s.charCodeAt(0)===65279&&u++,e=void 0);u<s.length;){if(Mh.lastIndex=u,c=Mh.exec(s),p=c&&c.index!==void 0?c.index:s.length,d=s.charCodeAt(p),!c){t=s.slice(u);break}if(d===10&&u===p&&i)l.push(-3),i=void 0;else switch(i&&(l.push(-5),i=void 0),u<p&&(l.push(s.slice(u,p)),n+=p-u),d){case 0:{l.push(65533),n++;break}case 9:{for(h=Math.ceil(n/4)*4,l.push(-2);n++<h;)l.push(-1);break}case 10:{l.push(-4),n=1;break}default:i=!0,n=1}u=p+1}return a&&(i&&l.push(-5),t&&l.push(t),l.push(null)),l}}const CM=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function RM(n){return n.replace(CM,PM)}function PM(n,t,e){if(t)return t;if(e.charCodeAt(0)===35){const r=e.charCodeAt(1),s=r===120||r===88;return $d(e.slice(s?2:1),s?16:10)}return oc(e)||n}function fo(n){return!n||typeof n!="object"?"":"position"in n||"type"in n?Eh(n.position):"start"in n||"end"in n?Eh(n):"line"in n||"column"in n?Dl(n):""}function Dl(n){return bh(n&&n.line)+":"+bh(n&&n.column)}function Eh(n){return Dl(n&&n.start)+"-"+Dl(n&&n.end)}function bh(n){return n&&typeof n=="number"?n:1}const sf={}.hasOwnProperty;function LM(n,t,e){return typeof t!="string"&&(e=t,t=void 0),DM(e)(wM(TM(e).document().write(AM()(n,t,!0))))}function DM(n){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(Yt),autolinkProtocol:w,autolinkEmail:w,atxHeading:s(Ie),blockQuote:s(wt),characterEscape:w,characterReference:w,codeFenced:s(ce),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:s(ce,o),codeText:s(me,o),codeTextData:w,data:w,codeFlowValue:w,definition:s(Qt),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:s(O),hardBreakEscape:s(Zt),hardBreakTrailing:s(Zt),htmlFlow:s(re,o),htmlFlowData:w,htmlText:s(re,o),htmlTextData:w,image:s(Tt),label:o,link:s(Yt),listItem:s(zt),listItemValue:p,listOrdered:s(At,u),listUnordered:s(At),paragraph:s(we),reference:U,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:s(Ie),strong:s(D),thematicBreak:s(Y)},exit:{atxHeading:l(),atxHeadingSequence:R,autolink:l(),autolinkEmail:Xt,autolinkProtocol:St,blockQuote:l(),characterEscapeValue:x,characterReferenceMarkerHexadecimal:lt,characterReferenceMarkerNumeric:lt,characterReferenceValue:ft,characterReference:ht,codeFenced:l(m),codeFencedFence:_,codeFencedFenceInfo:d,codeFencedFenceMeta:g,codeFlowValue:x,codeIndented:l(f),codeText:l(V),codeTextData:x,data:x,definition:l(),definitionDestinationString:y,definitionLabelString:M,definitionTitleString:E,emphasis:l(),hardBreakEscape:l(F),hardBreakTrailing:l(F),htmlFlow:l(z),htmlFlowData:x,htmlText:l(B),htmlTextData:x,image:l(Q),label:it,labelText:q,lineEnding:C,link:l(Z),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:J,resourceDestinationString:P,resourceTitleString:dt,resource:Lt,setextHeading:l(L),setextHeadingLineSequence:b,setextHeadingText:S,strong:l(),thematicBreak:l()}};of(t,(n||{}).mdastExtensions||[]);const e={};return i;function i(I){let H={type:"root",children:[]};const X={stack:[H],tokenStack:[],config:t,enter:a,exit:c,buffer:o,resume:h,data:e},st=[];let nt=-1;for(;++nt<I.length;)if(I[nt][1].type==="listOrdered"||I[nt][1].type==="listUnordered")if(I[nt][0]==="enter")st.push(nt);else{const gt=st.pop();nt=r(I,gt,nt)}for(nt=-1;++nt<I.length;){const gt=t[I[nt][0]];sf.call(gt,I[nt][1].type)&&gt[I[nt][1].type].call(Object.assign({sliceSerialize:I[nt][2].sliceSerialize},X),I[nt][1])}if(X.tokenStack.length>0){const gt=X.tokenStack[X.tokenStack.length-1];(gt[1]||Th).call(X,void 0,gt[0])}for(H.position={start:fi(I.length>0?I[0][1].start:{line:1,column:1,offset:0}),end:fi(I.length>0?I[I.length-2][1].end:{line:1,column:1,offset:0})},nt=-1;++nt<t.transforms.length;)H=t.transforms[nt](H)||H;return H}function r(I,H,X){let st=H-1,nt=-1,gt=!1,xt,tt,_t,Ct;for(;++st<=X;){const yt=I[st];switch(yt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{yt[0]==="enter"?nt++:nt--,Ct=void 0;break}case"lineEndingBlank":{yt[0]==="enter"&&(xt&&!Ct&&!nt&&!_t&&(_t=st),Ct=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Ct=void 0}if(!nt&&yt[0]==="enter"&&yt[1].type==="listItemPrefix"||nt===-1&&yt[0]==="exit"&&(yt[1].type==="listUnordered"||yt[1].type==="listOrdered")){if(xt){let ct=st;for(tt=void 0;ct--;){const Rt=I[ct];if(Rt[1].type==="lineEnding"||Rt[1].type==="lineEndingBlank"){if(Rt[0]==="exit")continue;tt&&(I[tt][1].type="lineEndingBlank",gt=!0),Rt[1].type="lineEnding",tt=ct}else if(!(Rt[1].type==="linePrefix"||Rt[1].type==="blockQuotePrefix"||Rt[1].type==="blockQuotePrefixWhitespace"||Rt[1].type==="blockQuoteMarker"||Rt[1].type==="listItemIndent"))break}_t&&(!tt||_t<tt)&&(xt._spread=!0),xt.end=Object.assign({},tt?I[tt][1].start:yt[1].end),I.splice(tt||st,0,["exit",xt,yt[2]]),st++,X++}if(yt[1].type==="listItemPrefix"){const ct={type:"listItem",_spread:!1,start:Object.assign({},yt[1].start),end:void 0};xt=ct,I.splice(st,0,["enter",ct,yt[2]]),st++,X++,_t=void 0,Ct=!0}}}return I[H][1]._spread=gt,X}function s(I,H){return X;function X(st){a.call(this,I(st),st),H&&H.call(this,st)}}function o(){this.stack.push({type:"fragment",children:[]})}function a(I,H,X){this.stack[this.stack.length-1].children.push(I),this.stack.push(I),this.tokenStack.push([H,X||void 0]),I.position={start:fi(H.start),end:void 0}}function l(I){return H;function H(X){I&&I.call(this,X),c.call(this,X)}}function c(I,H){const X=this.stack.pop(),st=this.tokenStack.pop();if(st)st[0].type!==I.type&&(H?H.call(this,I,st[0]):(st[1]||Th).call(this,I,st[0]));else throw new Error("Cannot close `"+I.type+"` ("+fo({start:I.start,end:I.end})+"): it’s not open");X.position.end=fi(I.end)}function h(){return Iy(this.stack.pop())}function u(){this.data.expectingFirstListItemValue=!0}function p(I){if(this.data.expectingFirstListItemValue){const H=this.stack[this.stack.length-2];H.start=Number.parseInt(this.sliceSerialize(I),10),this.data.expectingFirstListItemValue=void 0}}function d(){const I=this.resume(),H=this.stack[this.stack.length-1];H.lang=I}function g(){const I=this.resume(),H=this.stack[this.stack.length-1];H.meta=I}function _(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function m(){const I=this.resume(),H=this.stack[this.stack.length-1];H.value=I.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function f(){const I=this.resume(),H=this.stack[this.stack.length-1];H.value=I.replace(/(\r?\n|\r)$/g,"")}function M(I){const H=this.resume(),X=this.stack[this.stack.length-1];X.label=H,X.identifier=Un(this.sliceSerialize(I)).toLowerCase()}function E(){const I=this.resume(),H=this.stack[this.stack.length-1];H.title=I}function y(){const I=this.resume(),H=this.stack[this.stack.length-1];H.url=I}function R(I){const H=this.stack[this.stack.length-1];if(!H.depth){const X=this.sliceSerialize(I).length;H.depth=X}}function S(){this.data.setextHeadingSlurpLineEnding=!0}function b(I){const H=this.stack[this.stack.length-1];H.depth=this.sliceSerialize(I).codePointAt(0)===61?1:2}function L(){this.data.setextHeadingSlurpLineEnding=void 0}function w(I){const X=this.stack[this.stack.length-1].children;let st=X[X.length-1];(!st||st.type!=="text")&&(st=T(),st.position={start:fi(I.start),end:void 0},X.push(st)),this.stack.push(st)}function x(I){const H=this.stack.pop();H.value+=this.sliceSerialize(I),H.position.end=fi(I.end)}function C(I){const H=this.stack[this.stack.length-1];if(this.data.atHardBreak){const X=H.children[H.children.length-1];X.position.end=fi(I.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(H.type)&&(w.call(this,I),x.call(this,I))}function F(){this.data.atHardBreak=!0}function z(){const I=this.resume(),H=this.stack[this.stack.length-1];H.value=I}function B(){const I=this.resume(),H=this.stack[this.stack.length-1];H.value=I}function V(){const I=this.resume(),H=this.stack[this.stack.length-1];H.value=I}function Z(){const I=this.stack[this.stack.length-1];if(this.data.inReference){const H=this.data.referenceType||"shortcut";I.type+="Reference",I.referenceType=H,delete I.url,delete I.title}else delete I.identifier,delete I.label;this.data.referenceType=void 0}function Q(){const I=this.stack[this.stack.length-1];if(this.data.inReference){const H=this.data.referenceType||"shortcut";I.type+="Reference",I.referenceType=H,delete I.url,delete I.title}else delete I.identifier,delete I.label;this.data.referenceType=void 0}function q(I){const H=this.sliceSerialize(I),X=this.stack[this.stack.length-2];X.label=RM(H),X.identifier=Un(H).toLowerCase()}function it(){const I=this.stack[this.stack.length-1],H=this.resume(),X=this.stack[this.stack.length-1];if(this.data.inReference=!0,X.type==="link"){const st=I.children;X.children=st}else X.alt=H}function P(){const I=this.resume(),H=this.stack[this.stack.length-1];H.url=I}function dt(){const I=this.resume(),H=this.stack[this.stack.length-1];H.title=I}function Lt(){this.data.inReference=void 0}function U(){this.data.referenceType="collapsed"}function J(I){const H=this.resume(),X=this.stack[this.stack.length-1];X.label=H,X.identifier=Un(this.sliceSerialize(I)).toLowerCase(),this.data.referenceType="full"}function lt(I){this.data.characterReferenceType=I.type}function ft(I){const H=this.sliceSerialize(I),X=this.data.characterReferenceType;let st;X?(st=$d(H,X==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):st=oc(H);const nt=this.stack[this.stack.length-1];nt.value+=st}function ht(I){const H=this.stack.pop();H.position.end=fi(I.end)}function St(I){x.call(this,I);const H=this.stack[this.stack.length-1];H.url=this.sliceSerialize(I)}function Xt(I){x.call(this,I);const H=this.stack[this.stack.length-1];H.url="mailto:"+this.sliceSerialize(I)}function wt(){return{type:"blockquote",children:[]}}function ce(){return{type:"code",lang:null,meta:null,value:""}}function me(){return{type:"inlineCode",value:""}}function Qt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function O(){return{type:"emphasis",children:[]}}function Ie(){return{type:"heading",depth:0,children:[]}}function Zt(){return{type:"break"}}function re(){return{type:"html",value:""}}function Tt(){return{type:"image",title:null,url:"",alt:null}}function Yt(){return{type:"link",title:null,url:"",children:[]}}function At(I){return{type:"list",ordered:I.type==="listOrdered",start:null,spread:I._spread,children:[]}}function zt(I){return{type:"listItem",spread:I._spread,checked:null,children:[]}}function we(){return{type:"paragraph",children:[]}}function D(){return{type:"strong",children:[]}}function T(){return{type:"text",value:""}}function Y(){return{type:"thematicBreak"}}}function fi(n){return{line:n.line,column:n.column,offset:n.offset}}function of(n,t){let e=-1;for(;++e<t.length;){const i=t[e];Array.isArray(i)?of(n,i):IM(n,i)}}function IM(n,t){let e;for(e in t)if(sf.call(t,e))switch(e){case"canContainEols":{const i=t[e];i&&n[e].push(...i);break}case"transforms":{const i=t[e];i&&n[e].push(...i);break}case"enter":case"exit":{const i=t[e];i&&Object.assign(n[e],i);break}}}function Th(n,t){throw n?new Error("Cannot close `"+n.type+"` ("+fo({start:n.start,end:n.end})+"): a different token (`"+t.type+"`, "+fo({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+fo({start:t.start,end:t.end})+") is still open")}function wh(n,t){const e=String(n);if(typeof t!="string")throw new TypeError("Expected character");let i=0,r=e.indexOf(t);for(;r!==-1;)i++,r=e.indexOf(t,r+t.length);return i}function UM(n){if(typeof n!="string")throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}const lc=function(n){if(n==null)return kM;if(typeof n=="function")return Do(n);if(typeof n=="object")return Array.isArray(n)?OM(n):FM(n);if(typeof n=="string")return NM(n);throw new Error("Expected function, string, or object as test")};function OM(n){const t=[];let e=-1;for(;++e<n.length;)t[e]=lc(n[e]);return Do(i);function i(...r){let s=-1;for(;++s<t.length;)if(t[s].apply(this,r))return!0;return!1}}function FM(n){const t=n;return Do(e);function e(i){const r=i;let s;for(s in n)if(r[s]!==t[s])return!1;return!0}}function NM(n){return Do(t);function t(e){return e&&e.type===n}}function Do(n){return t;function t(e,i,r){return!!(zM(e)&&n.call(this,e,typeof i=="number"?i:void 0,r||void 0))}}function kM(){return!0}function zM(n){return n!==null&&typeof n=="object"&&"type"in n}const af=[],BM=!0,Ah=!1,HM="skip";function VM(n,t,e,i){let r;r=t;const s=lc(r),o=1;a(n,void 0,[])();function a(l,c,h){const u=l&&typeof l=="object"?l:{};if(typeof u.type=="string"){const d=typeof u.tagName=="string"?u.tagName:typeof u.name=="string"?u.name:void 0;Object.defineProperty(p,"name",{value:"node ("+(l.type+(d?"<"+d+">":""))+")"})}return p;function p(){let d=af,g,_,m;if(s(l,c,h[h.length-1]||void 0)&&(d=GM(e(l,h)),d[0]===Ah))return d;if("children"in l&&l.children){const f=l;if(f.children&&d[0]!==HM)for(_=-1+o,m=h.concat(f);_>-1&&_<f.children.length;){const M=f.children[_];if(g=a(M,_,m)(),g[0]===Ah)return g;_=typeof g[1]=="number"?g[1]:_+o}}return d}}}function GM(n){return Array.isArray(n)?n:typeof n=="number"?[BM,n]:n==null?af:[n]}function WM(n,t,e){const r=lc((e||{}).ignore||[]),s=XM(t);let o=-1;for(;++o<s.length;)VM(n,"text",a);function a(c,h){let u=-1,p;for(;++u<h.length;){const d=h[u],g=p?p.children:void 0;if(r(d,g?g.indexOf(d):void 0,p))return;p=d}if(p)return l(c,h)}function l(c,h){const u=h[h.length-1],p=s[o][0],d=s[o][1];let g=0;const m=u.children.indexOf(c);let f=!1,M=[];p.lastIndex=0;let E=p.exec(c.value);for(;E;){const y=E.index,R={index:E.index,input:E.input,stack:[...h,c]};let S=d(...E,R);if(typeof S=="string"&&(S=S.length>0?{type:"text",value:S}:void 0),S===!1?p.lastIndex=y+1:(g!==y&&M.push({type:"text",value:c.value.slice(g,y)}),Array.isArray(S)?M.push(...S):S&&M.push(S),g=y+E[0].length,f=!0),!p.global)break;E=p.exec(c.value)}return f?(g<c.value.length&&M.push({type:"text",value:c.value.slice(g)}),u.children.splice(m,1,...M)):M=[c],m+M.length}}function XM(n){const t=[];if(!Array.isArray(n))throw new TypeError("Expected find and replace tuple or list of tuples");const e=!n[0]||Array.isArray(n[0])?n:[n];let i=-1;for(;++i<e.length;){const r=e[i];t.push([qM(r[0]),YM(r[1])])}return t}function qM(n){return typeof n=="string"?new RegExp(UM(n),"g"):n}function YM(n){return typeof n=="function"?n:function(){return n}}function $M(){return{transforms:[tE],enter:{literalAutolink:ZM,literalAutolinkEmail:La,literalAutolinkHttp:La,literalAutolinkWww:La},exit:{literalAutolink:JM,literalAutolinkEmail:QM,literalAutolinkHttp:jM,literalAutolinkWww:KM}}}function ZM(n){this.enter({type:"link",title:null,url:"",children:[]},n)}function La(n){this.config.enter.autolinkProtocol.call(this,n)}function jM(n){this.config.exit.autolinkProtocol.call(this,n)}function KM(n){this.config.exit.data.call(this,n);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(n)}function QM(n){this.config.exit.autolinkEmail.call(this,n)}function JM(n){this.exit(n)}function tE(n){WM(n,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,eE],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,nE]],{ignore:["link","linkReference"]})}function eE(n,t,e,i,r){let s="";if(!lf(r)||(/^w/i.test(t)&&(e=t+e,t="",s="http://"),!iE(e)))return!1;const o=rE(e+i);if(!o[0])return!1;const a={type:"link",title:null,url:s+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function nE(n,t,e,i){return!lf(i,!0)||/[-\d_]$/.test(e)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+e,children:[{type:"text",value:t+"@"+e}]}}function iE(n){const t=n.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function rE(n){const t=/[!"&'),.:;<>?\]}]+$/.exec(n);if(!t)return[n,void 0];n=n.slice(0,t.index);let e=t[0],i=e.indexOf(")");const r=wh(n,"(");let s=wh(n,")");for(;i!==-1&&r>s;)n+=e.slice(0,i+1),e=e.slice(i+1),i=e.indexOf(")"),s++;return[n,e]}function lf(n,t){const e=n.input.charCodeAt(n.index-1);return(n.index===0||Zi(e)||Po(e))&&(!t||e!==47)}function sE(){this.buffer()}function oE(n){this.enter({type:"footnoteReference",identifier:"",label:""},n)}function aE(){this.buffer()}function lE(n){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},n)}function cE(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Un(this.sliceSerialize(n)).toLowerCase(),e.label=t}function uE(n){this.exit(n)}function hE(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Un(this.sliceSerialize(n)).toLowerCase(),e.label=t}function dE(n){this.exit(n)}function fE(){return{enter:{gfmFootnoteCallString:sE,gfmFootnoteCall:oE,gfmFootnoteDefinitionLabelString:aE,gfmFootnoteDefinition:lE},exit:{gfmFootnoteCallString:cE,gfmFootnoteCall:uE,gfmFootnoteDefinitionLabelString:hE,gfmFootnoteDefinition:dE}}}function pE(){return{canContainEols:["delete"],enter:{strikethrough:mE},exit:{strikethrough:gE}}}function mE(n){this.enter({type:"delete",children:[]},n)}function gE(n){this.exit(n)}function _E(){return{enter:{table:vE,tableData:Ch,tableHeader:Ch,tableRow:yE},exit:{codeText:SE,table:xE,tableData:Da,tableHeader:Da,tableRow:Da}}}function vE(n){const t=n._align;this.enter({type:"table",align:t.map(function(e){return e==="none"?null:e}),children:[]},n),this.data.inTable=!0}function xE(n){this.exit(n),this.data.inTable=void 0}function yE(n){this.enter({type:"tableRow",children:[]},n)}function Da(n){this.exit(n)}function Ch(n){this.enter({type:"tableCell",children:[]},n)}function SE(n){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,ME));const e=this.stack[this.stack.length-1];e.type,e.value=t,this.exit(n)}function ME(n,t){return t==="|"?t:n}function EE(){return{exit:{taskListCheckValueChecked:Rh,taskListCheckValueUnchecked:Rh,paragraph:bE}}}function Rh(n){const t=this.stack[this.stack.length-2];t.type,t.checked=n.type==="taskListCheckValueChecked"}function bE(n){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const e=this.stack[this.stack.length-1];e.type;const i=e.children[0];if(i&&i.type==="text"){const r=t.children;let s=-1,o;for(;++s<r.length;){const a=r[s];if(a.type==="paragraph"){o=a;break}}o===e&&(i.value=i.value.slice(1),i.value.length===0?e.children.shift():e.position&&i.position&&typeof i.position.start.offset=="number"&&(i.position.start.column++,i.position.start.offset++,e.position.start=Object.assign({},i.position.start)))}}this.exit(n)}function TE(){return[$M(),fE(),pE(),_E(),EE()]}const wE={tokenize:DE,partial:!0},cf={tokenize:IE,partial:!0},uf={tokenize:UE,partial:!0},hf={tokenize:OE,partial:!0},AE={tokenize:FE,partial:!0},df={name:"wwwAutolink",tokenize:PE,previous:pf},ff={name:"protocolAutolink",tokenize:LE,previous:mf},oi={name:"emailAutolink",tokenize:RE,previous:gf},Vn={};function CE(){return{text:Vn}}let Ui=48;for(;Ui<123;)Vn[Ui]=oi,Ui++,Ui===58?Ui=65:Ui===91&&(Ui=97);Vn[43]=oi;Vn[45]=oi;Vn[46]=oi;Vn[95]=oi;Vn[72]=[oi,ff];Vn[104]=[oi,ff];Vn[87]=[oi,df];Vn[119]=[oi,df];function RE(n,t,e){const i=this;let r,s;return o;function o(u){return!Il(u)||!gf.call(i,i.previous)||cc(i.events)?e(u):(n.enter("literalAutolink"),n.enter("literalAutolinkEmail"),a(u))}function a(u){return Il(u)?(n.consume(u),a):u===64?(n.consume(u),l):e(u)}function l(u){return u===46?n.check(AE,h,c)(u):u===45||u===95||sn(u)?(s=!0,n.consume(u),l):h(u)}function c(u){return n.consume(u),r=!0,l}function h(u){return s&&r&&Ye(i.previous)?(n.exit("literalAutolinkEmail"),n.exit("literalAutolink"),t(u)):e(u)}}function PE(n,t,e){const i=this;return r;function r(o){return o!==87&&o!==119||!pf.call(i,i.previous)||cc(i.events)?e(o):(n.enter("literalAutolink"),n.enter("literalAutolinkWww"),n.check(wE,n.attempt(cf,n.attempt(uf,s),e),e)(o))}function s(o){return n.exit("literalAutolinkWww"),n.exit("literalAutolink"),t(o)}}function LE(n,t,e){const i=this;let r="",s=!1;return o;function o(u){return(u===72||u===104)&&mf.call(i,i.previous)&&!cc(i.events)?(n.enter("literalAutolink"),n.enter("literalAutolinkHttp"),r+=String.fromCodePoint(u),n.consume(u),a):e(u)}function a(u){if(Ye(u)&&r.length<5)return r+=String.fromCodePoint(u),n.consume(u),a;if(u===58){const p=r.toLowerCase();if(p==="http"||p==="https")return n.consume(u),l}return e(u)}function l(u){return u===47?(n.consume(u),s?c:(s=!0,l)):e(u)}function c(u){return u===null||So(u)||de(u)||Zi(u)||Po(u)?e(u):n.attempt(cf,n.attempt(uf,h),e)(u)}function h(u){return n.exit("literalAutolinkHttp"),n.exit("literalAutolink"),t(u)}}function DE(n,t,e){let i=0;return r;function r(o){return(o===87||o===119)&&i<3?(i++,n.consume(o),r):o===46&&i===3?(n.consume(o),s):e(o)}function s(o){return o===null?e(o):t(o)}}function IE(n,t,e){let i,r,s;return o;function o(c){return c===46||c===95?n.check(hf,l,a)(c):c===null||de(c)||Zi(c)||c!==45&&Po(c)?l(c):(s=!0,n.consume(c),o)}function a(c){return c===95?i=!0:(r=i,i=void 0),n.consume(c),o}function l(c){return r||i||!s?e(c):t(c)}}function UE(n,t){let e=0,i=0;return r;function r(o){return o===40?(e++,n.consume(o),r):o===41&&i<e?s(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?n.check(hf,t,s)(o):o===null||de(o)||Zi(o)?t(o):(n.consume(o),r)}function s(o){return o===41&&i++,n.consume(o),r}}function OE(n,t,e){return i;function i(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(n.consume(a),i):a===38?(n.consume(a),s):a===93?(n.consume(a),r):a===60||a===null||de(a)||Zi(a)?t(a):e(a)}function r(a){return a===null||a===40||a===91||de(a)||Zi(a)?t(a):i(a)}function s(a){return Ye(a)?o(a):e(a)}function o(a){return a===59?(n.consume(a),i):Ye(a)?(n.consume(a),o):e(a)}}function FE(n,t,e){return i;function i(s){return n.consume(s),r}function r(s){return sn(s)?e(s):t(s)}}function pf(n){return n===null||n===40||n===42||n===95||n===91||n===93||n===126||de(n)}function mf(n){return!Ye(n)}function gf(n){return!(n===47||Il(n))}function Il(n){return n===43||n===45||n===46||n===95||sn(n)}function cc(n){let t=n.length,e=!1;for(;t--;){const i=n[t][1];if((i.type==="labelLink"||i.type==="labelImage")&&!i._balanced){e=!0;break}if(i._gfmAutolinkLiteralWalkedInto){e=!1;break}}return n.length>0&&!e&&(n[n.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),e}const NE={tokenize:XE,partial:!0};function kE(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:VE,continuation:{tokenize:GE},exit:WE}},text:{91:{name:"gfmFootnoteCall",tokenize:HE},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:zE,resolveTo:BE}}}}function zE(n,t,e){const i=this;let r=i.events.length;const s=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let o;for(;r--;){const l=i.events[r][1];if(l.type==="labelImage"){o=l;break}if(l.type==="gfmFootnoteCall"||l.type==="labelLink"||l.type==="label"||l.type==="image"||l.type==="link")break}return a;function a(l){if(!o||!o._balanced)return e(l);const c=Un(i.sliceSerialize({start:o.end,end:i.now()}));return c.codePointAt(0)!==94||!s.includes(c.slice(1))?e(l):(n.enter("gfmFootnoteCallLabelMarker"),n.consume(l),n.exit("gfmFootnoteCallLabelMarker"),t(l))}}function BE(n,t){let e=n.length;for(;e--;)if(n[e][1].type==="labelImage"&&n[e][0]==="enter"){n[e][1];break}n[e+1][1].type="data",n[e+3][1].type="gfmFootnoteCallLabelMarker";const i={type:"gfmFootnoteCall",start:Object.assign({},n[e+3][1].start),end:Object.assign({},n[n.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},n[e+3][1].end),end:Object.assign({},n[e+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},n[n.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},a=[n[e+1],n[e+2],["enter",i,t],n[e+3],n[e+4],["enter",r,t],["exit",r,t],["enter",s,t],["enter",o,t],["exit",o,t],["exit",s,t],n[n.length-2],n[n.length-1],["exit",i,t]];return n.splice(e,n.length-e+1,...a),n}function HE(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s=0,o;return a;function a(u){return n.enter("gfmFootnoteCall"),n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),l}function l(u){return u!==94?e(u):(n.enter("gfmFootnoteCallMarker"),n.consume(u),n.exit("gfmFootnoteCallMarker"),n.enter("gfmFootnoteCallString"),n.enter("chunkString").contentType="string",c)}function c(u){if(s>999||u===93&&!o||u===null||u===91||de(u))return e(u);if(u===93){n.exit("chunkString");const p=n.exit("gfmFootnoteCallString");return r.includes(Un(i.sliceSerialize(p)))?(n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),n.exit("gfmFootnoteCall"),t):e(u)}return de(u)||(o=!0),s++,n.consume(u),u===92?h:c}function h(u){return u===91||u===92||u===93?(n.consume(u),s++,c):c(u)}}function VE(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s,o=0,a;return l;function l(g){return n.enter("gfmFootnoteDefinition")._container=!0,n.enter("gfmFootnoteDefinitionLabel"),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionLabelMarker"),c}function c(g){return g===94?(n.enter("gfmFootnoteDefinitionMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionMarker"),n.enter("gfmFootnoteDefinitionLabelString"),n.enter("chunkString").contentType="string",h):e(g)}function h(g){if(o>999||g===93&&!a||g===null||g===91||de(g))return e(g);if(g===93){n.exit("chunkString");const _=n.exit("gfmFootnoteDefinitionLabelString");return s=Un(i.sliceSerialize(_)),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionLabelMarker"),n.exit("gfmFootnoteDefinitionLabel"),p}return de(g)||(a=!0),o++,n.consume(g),g===92?u:h}function u(g){return g===91||g===92||g===93?(n.consume(g),o++,h):h(g)}function p(g){return g===58?(n.enter("definitionMarker"),n.consume(g),n.exit("definitionMarker"),r.includes(s)||r.push(s),Kt(n,d,"gfmFootnoteDefinitionWhitespace")):e(g)}function d(g){return t(g)}}function GE(n,t,e){return n.check(cs,t,n.attempt(NE,t,e))}function WE(n){n.exit("gfmFootnoteDefinition")}function XE(n,t,e){const i=this;return Kt(n,r,"gfmFootnoteDefinitionIndent",5);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(s):e(s)}}function qE(n){let e={}.singleTilde;const i={name:"strikethrough",tokenize:s,resolveAll:r};return e==null&&(e=!0),{text:{126:i},insideSpan:{null:[i]},attentionMarkers:{null:[126]}};function r(o,a){let l=-1;for(;++l<o.length;)if(o[l][0]==="enter"&&o[l][1].type==="strikethroughSequenceTemporary"&&o[l][1]._close){let c=l;for(;c--;)if(o[c][0]==="exit"&&o[c][1].type==="strikethroughSequenceTemporary"&&o[c][1]._open&&o[l][1].end.offset-o[l][1].start.offset===o[c][1].end.offset-o[c][1].start.offset){o[l][1].type="strikethroughSequence",o[c][1].type="strikethroughSequence";const h={type:"strikethrough",start:Object.assign({},o[c][1].start),end:Object.assign({},o[l][1].end)},u={type:"strikethroughText",start:Object.assign({},o[c][1].end),end:Object.assign({},o[l][1].start)},p=[["enter",h,a],["enter",o[c][1],a],["exit",o[c][1],a],["enter",u,a]],d=a.parser.constructs.insideSpan.null;d&&fn(p,p.length,0,Lo(d,o.slice(c+1,l),a)),fn(p,p.length,0,[["exit",u,a],["enter",o[l][1],a],["exit",o[l][1],a],["exit",h,a]]),fn(o,c-1,l-c+3,p),l=c+p.length-2;break}}for(l=-1;++l<o.length;)o[l][1].type==="strikethroughSequenceTemporary"&&(o[l][1].type="data");return o}function s(o,a,l){const c=this.previous,h=this.events;let u=0;return p;function p(g){return c===126&&h[h.length-1][1].type!=="characterEscape"?l(g):(o.enter("strikethroughSequenceTemporary"),d(g))}function d(g){const _=Mo(c);if(g===126)return u>1?l(g):(o.consume(g),u++,d);if(u<2&&!e)return l(g);const m=o.exit("strikethroughSequenceTemporary"),f=Mo(g);return m._open=!f||f===2&&!!_,m._close=!_||_===2&&!!f,a(g)}}}class YE{constructor(){this.map=[]}add(t,e,i){$E(this,t,e,i)}consume(t){if(this.map.sort(function(s,o){return s[0]-o[0]}),this.map.length===0)return;let e=this.map.length;const i=[];for(;e>0;)e-=1,i.push(t.slice(this.map[e][0]+this.map[e][1]),this.map[e][2]),t.length=this.map[e][0];i.push(t.slice()),t.length=0;let r=i.pop();for(;r;){for(const s of r)t.push(s);r=i.pop()}this.map.length=0}}function $E(n,t,e,i){let r=0;if(!(e===0&&i.length===0)){for(;r<n.map.length;){if(n.map[r][0]===t){n.map[r][1]+=e,n.map[r][2].push(...i);return}r+=1}n.map.push([t,e,i])}}function ZE(n,t){let e=!1;const i=[];for(;t<n.length;){const r=n[t];if(e){if(r[0]==="enter")r[1].type==="tableContent"&&i.push(n[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(n[t-1][1].type==="tableDelimiterMarker"){const s=i.length-1;i[s]=i[s]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(e=!0);t+=1}return i}function jE(){return{flow:{null:{name:"table",tokenize:KE,resolveAll:QE}}}}function KE(n,t,e){const i=this;let r=0,s=0,o;return a;function a(x){let C=i.events.length-1;for(;C>-1;){const B=i.events[C][1].type;if(B==="lineEnding"||B==="linePrefix")C--;else break}const F=C>-1?i.events[C][1].type:null,z=F==="tableHead"||F==="tableRow"?S:l;return z===S&&i.parser.lazy[i.now().line]?e(x):z(x)}function l(x){return n.enter("tableHead"),n.enter("tableRow"),c(x)}function c(x){return x===124||(o=!0,s+=1),h(x)}function h(x){return x===null?e(x):Dt(x)?s>1?(s=0,i.interrupt=!0,n.exit("tableRow"),n.enter("lineEnding"),n.consume(x),n.exit("lineEnding"),d):e(x):qt(x)?Kt(n,h,"whitespace")(x):(s+=1,o&&(o=!1,r+=1),x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),o=!0,h):(n.enter("data"),u(x)))}function u(x){return x===null||x===124||de(x)?(n.exit("data"),h(x)):(n.consume(x),x===92?p:u)}function p(x){return x===92||x===124?(n.consume(x),u):u(x)}function d(x){return i.interrupt=!1,i.parser.lazy[i.now().line]?e(x):(n.enter("tableDelimiterRow"),o=!1,qt(x)?Kt(n,g,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):g(x))}function g(x){return x===45||x===58?m(x):x===124?(o=!0,n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),_):R(x)}function _(x){return qt(x)?Kt(n,m,"whitespace")(x):m(x)}function m(x){return x===58?(s+=1,o=!0,n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),f):x===45?(s+=1,f(x)):x===null||Dt(x)?y(x):R(x)}function f(x){return x===45?(n.enter("tableDelimiterFiller"),M(x)):R(x)}function M(x){return x===45?(n.consume(x),M):x===58?(o=!0,n.exit("tableDelimiterFiller"),n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),E):(n.exit("tableDelimiterFiller"),E(x))}function E(x){return qt(x)?Kt(n,y,"whitespace")(x):y(x)}function y(x){return x===124?g(x):x===null||Dt(x)?!o||r!==s?R(x):(n.exit("tableDelimiterRow"),n.exit("tableHead"),t(x)):R(x)}function R(x){return e(x)}function S(x){return n.enter("tableRow"),b(x)}function b(x){return x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),b):x===null||Dt(x)?(n.exit("tableRow"),t(x)):qt(x)?Kt(n,b,"whitespace")(x):(n.enter("data"),L(x))}function L(x){return x===null||x===124||de(x)?(n.exit("data"),b(x)):(n.consume(x),x===92?w:L)}function w(x){return x===92||x===124?(n.consume(x),L):L(x)}}function QE(n,t){let e=-1,i=!0,r=0,s=[0,0,0,0],o=[0,0,0,0],a=!1,l=0,c,h,u;const p=new YE;for(;++e<n.length;){const d=n[e],g=d[1];d[0]==="enter"?g.type==="tableHead"?(a=!1,l!==0&&(Ph(p,t,l,c,h),h=void 0,l=0),c={type:"table",start:Object.assign({},g.start),end:Object.assign({},g.end)},p.add(e,0,[["enter",c,t]])):g.type==="tableRow"||g.type==="tableDelimiterRow"?(i=!0,u=void 0,s=[0,0,0,0],o=[0,e+1,0,0],a&&(a=!1,h={type:"tableBody",start:Object.assign({},g.start),end:Object.assign({},g.end)},p.add(e,0,[["enter",h,t]])),r=g.type==="tableDelimiterRow"?2:h?3:1):r&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")?(i=!1,o[2]===0&&(s[1]!==0&&(o[0]=o[1],u=Qs(p,t,s,r,void 0,u),s=[0,0,0,0]),o[2]=e)):g.type==="tableCellDivider"&&(i?i=!1:(s[1]!==0&&(o[0]=o[1],u=Qs(p,t,s,r,void 0,u)),s=o,o=[s[1],e,0,0])):g.type==="tableHead"?(a=!0,l=e):g.type==="tableRow"||g.type==="tableDelimiterRow"?(l=e,s[1]!==0?(o[0]=o[1],u=Qs(p,t,s,r,e,u)):o[1]!==0&&(u=Qs(p,t,o,r,e,u)),r=0):r&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")&&(o[3]=e)}for(l!==0&&Ph(p,t,l,c,h),p.consume(t.events),e=-1;++e<t.events.length;){const d=t.events[e];d[0]==="enter"&&d[1].type==="table"&&(d[1]._align=ZE(t.events,e))}return n}function Qs(n,t,e,i,r,s){const o=i===1?"tableHeader":i===2?"tableDelimiter":"tableData",a="tableContent";e[0]!==0&&(s.end=Object.assign({},vr(t.events,e[0])),n.add(e[0],0,[["exit",s,t]]));const l=vr(t.events,e[1]);if(s={type:o,start:Object.assign({},l),end:Object.assign({},l)},n.add(e[1],0,[["enter",s,t]]),e[2]!==0){const c=vr(t.events,e[2]),h=vr(t.events,e[3]),u={type:a,start:Object.assign({},c),end:Object.assign({},h)};if(n.add(e[2],0,[["enter",u,t]]),i!==2){const p=t.events[e[2]],d=t.events[e[3]];if(p[1].end=Object.assign({},d[1].end),p[1].type="chunkText",p[1].contentType="text",e[3]>e[2]+1){const g=e[2]+1,_=e[3]-e[2]-1;n.add(g,_,[])}}n.add(e[3]+1,0,[["exit",u,t]])}return r!==void 0&&(s.end=Object.assign({},vr(t.events,r)),n.add(r,0,[["exit",s,t]]),s=void 0),s}function Ph(n,t,e,i,r){const s=[],o=vr(t.events,e);r&&(r.end=Object.assign({},o),s.push(["exit",r,t])),i.end=Object.assign({},o),s.push(["exit",i,t]),n.add(e+1,0,s)}function vr(n,t){const e=n[t],i=e[0]==="enter"?"start":"end";return e[1][i]}const JE={name:"tasklistCheck",tokenize:eb};function tb(){return{text:{91:JE}}}function eb(n,t,e){const i=this;return r;function r(l){return i.previous!==null||!i._gfmTasklistFirstContentOfListItem?e(l):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),s)}function s(l){return de(l)?(n.enter("taskListCheckValueUnchecked"),n.consume(l),n.exit("taskListCheckValueUnchecked"),o):l===88||l===120?(n.enter("taskListCheckValueChecked"),n.consume(l),n.exit("taskListCheckValueChecked"),o):e(l)}function o(l){return l===93?(n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),a):e(l)}function a(l){return Dt(l)?t(l):qt(l)?n.check({tokenize:nb},t,e)(l):e(l)}}function nb(n,t,e){return Kt(n,i,"whitespace");function i(r){return r===null?e(r):t(r)}}function ib(n){return Yd([CE(),kE(),qE(),jE(),tb()])}function _f({text:n,links:t,onOpen:e}){return je(()=>sb(n,t,e),[n,t,e])}function rb(n,t){const e=/^\s*#[ \t]+(.+?)[ \t#]*(?:\r?\n|$)/.exec(n),i=r=>r.replace(/[*_`]/g,"").trim().toLowerCase();return e&&i(e[1])===i(t)?n.slice(e[0].length):n}function sb(n,t,e){const i=LM(ab(n),{extensions:[ib()],mdastExtensions:[TE()]}),r=uc(t,e),s=i.children.filter(o=>o.type==="footnoteDefinition");return v("div",{class:"md",children:[Eo(i.children,r),s.length>0&&v("section",{class:"md-footnotes",children:[v("hr",{}),v("ol",{children:s.map(o=>v("li",{id:`fn-${o.identifier}`,children:Eo(o.children,r)},o.identifier))})]})]})}function uc(n,t){const e=new Map(Object.entries(n).map(([i,r])=>[i.toLowerCase(),r]));return{resolve:i=>n[i]??e.get(i.toLowerCase()),onOpen:t}}const ob=/(!?)\[\[([^[\]\n]+?)\]\]/g;function Ul(n,t){const e=[];let i=0;for(const r of n.matchAll(ob)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),e.push(xf(r[2],r[1]==="!",t,s)),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function ab(n){return n.split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/m).map((t,e)=>e%2?t:t.replace(/%%[\s\S]*?%%/g,"")).join("")}const lb=/^\[!([A-Za-z-]+)\]([+-]?)[ \t]*(.*)$/,cb={note:"note",info:"info",todo:"info",abstract:"abstract",summary:"abstract",tldr:"abstract",tip:"tip",hint:"tip",important:"tip",success:"success",check:"success",done:"success",question:"question",help:"question",faq:"question",warning:"warning",caution:"warning",attention:"warning",failure:"danger",fail:"danger",missing:"danger",danger:"danger",error:"danger",bug:"danger",example:"example",quote:"quote",cite:"quote"};function Eo(n,t){return n.map((e,i)=>vf(e,t,i))}function vf(n,t,e){switch(n.type){case"paragraph":return v("p",{children:Rn(n.children,t)},e);case"heading":return ub(n,t,e);case"thematicBreak":return v("hr",{},e);case"blockquote":return fb(n.children,t,e)??v("blockquote",{children:Eo(n.children,t)},e);case"list":return hb(n,t,e);case"code":return v("pre",{class:"md-code","data-lang":n.lang??void 0,children:v("code",{children:n.value})},e);case"table":return db(n,t,e);case"html":return yf(n.value)?null:v("pre",{class:"md-raw",children:n.value},e);case"definition":case"footnoteDefinition":case"yaml":return null;default:return null}}function ub(n,t,e){const i=`h${n.depth}`;return v(i,{children:Rn(n.children,t)},e)}function hb(n,t,e){const i=n.children.map((r,s)=>v("li",{class:r.checked!=null?`task${r.checked?" done":""}`:void 0,children:[r.checked!=null&&v("input",{type:"checkbox",checked:r.checked,disabled:!0}),r.children.map((o,a)=>o.type==="paragraph"&&!n.spread?v("span",{children:Rn(o.children,t)},a):vf(o,t,a))]},s));return n.ordered?v("ol",{start:n.start??void 0,children:i},e):v("ul",{children:i},e)}function db(n,t,e){const[i,...r]=n.children,s=o=>n.align?.[o]?{textAlign:n.align[o]}:void 0;return v("div",{class:"md-table",children:v("table",{children:[i&&v("thead",{children:v("tr",{children:i.children.map((o,a)=>v("th",{style:s(a),children:Rn(o.children,t)},a))})}),v("tbody",{children:r.map((o,a)=>v("tr",{children:o.children.map((l,c)=>v("td",{style:s(c),children:Rn(l.children,t)},c))},a))})]})},e)}function fb(n,t,e){const i=n[0];if(i?.type!=="paragraph"||i.children[0]?.type!=="text")return null;const r=i.children[0].value,s=r.indexOf(`
`),o=lb.exec(s<0?r:r.slice(0,s));if(!o)return null;const a=o[1].toLowerCase(),l=cb[a]??"note",c=o[3]||a.charAt(0).toUpperCase()+a.slice(1),h={...i,children:s<0?i.children.slice(1):[{type:"text",value:r.slice(s+1)},...i.children.slice(1)]},u=[...h.children.length?[h]:[],...n.slice(1)],p=u.length>0&&v("div",{class:"md-callout-body",children:Eo(u,t)}),d=v("div",{class:"md-callout-title",children:c});return o[2]?v("details",{class:`md-callout ${l}`,open:o[2]==="+",children:[v("summary",{children:d}),p]},e):v("div",{class:`md-callout ${l}`,children:[d,p]},e)}function Rn(n,t){return n.map((e,i)=>pb(e,t,i))}function pb(n,t,e){switch(n.type){case"text":return v("span",{children:gb(n.value,t)},e);case"emphasis":return v("em",{children:Rn(n.children,t)},e);case"strong":return v("strong",{children:Rn(n.children,t)},e);case"delete":return v("del",{children:Rn(n.children,t)},e);case"inlineCode":return v("code",{children:n.value},e);case"break":return v("br",{},e);case"link":return xb(n.url)?v("a",{class:"md-external",href:n.url,target:"_blank",rel:"noopener noreferrer",children:Rn(n.children,t)},e):v("span",{children:Rn(n.children,t)},e);case"image":return v("span",{class:"md-image",children:n.alt||"image"},e);case"footnoteReference":return v("sup",{class:"md-fnref",children:["[",n.label??n.identifier,"]"]},e);case"html":return yf(n.value)?null:v("span",{class:"md-raw",children:n.value},e);case"linkReference":case"imageReference":return v("span",{children:"children"in n?Rn(n.children,t):n.alt},e);default:return null}}const mb=/(!?)\[\[([^[\]\n]+?)\]\]|==([^=\n]+?)==|(^|[\s(])#([\p{L}_][\p{L}\p{N}_/-]*)/gu;function gb(n,t){const e=[];let i=0;for(const r of n.matchAll(mb)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),r[2]!==void 0?e.push(xf(r[2],r[1]==="!",t,s)):r[3]!==void 0?e.push(v("mark",{children:r[3]},s)):(e.push(r[4]),e.push(v("span",{class:"md-tag",children:["#",r[5]]},s))),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function xf(n,t,e,i){const[r,s]=_b(n,"|"),[o,a]=vb(r,/[#^]/),l=e.resolve(o.trim()),c=s?.trim()||(l?l.title+(a?` › ${a.replace(/^[#^]/,"")}`:""):r.trim()),h=`md-internal${l?"":" unresolved"}${t?" embed":""}`;return l?v("a",{class:h,href:"#",onClick:u=>{u.preventDefault(),e.onOpen(l)},children:[t&&v("span",{class:"md-embed-mark",children:"↪ "}),c]},i):v("span",{class:h,title:"Not found, or not visible to this profile",children:c},i)}function _b(n,t){const e=n.indexOf(t);return e<0?[n,void 0]:[n.slice(0,e),n.slice(e+1)]}function vb(n,t){const e=t.exec(n);return e?[n.slice(0,e.index),n.slice(e.index)]:[n,void 0]}function xb(n){return/^(https?:|mailto:)/i.test(n.trim())}function yf(n){return/^\s*<!--[\s\S]*-->\s*$/.test(n)}const Io={conflict:"Conflicts",stale:"Stale links",superseded:"Superseded",orphan:"Orphans",lint_error:"Format problems"},ji={conflict:"#ff3b4f",stale:"#ffad38",superseded:"#bd85ff",orphan:"#9aa6c4",lint_error:"#ff6bc6"},yb={conflict:"Disagrees with another active note; read both",stale:"Rests on, or links to, a superseded or archived note it did not replace",superseded:"Replaced by a newer note",orphan:"No other note links here",lint_error:"The file has format problems"},hc={supersedes:"Replaces",cites:"Sources",conflicts:"Conflicts",depends:"Depends on",parts:"Part of"},Sf={links_to:"links",superseded_by:"replaced",conflicts_with:"conflicts",depends_on:"dependencies",part_of:"part of",source:"citations"},Mf={supersedes:{phrase:"supersedes",subject:"to",roles:["newer","older"]},cites:{phrase:"cites",subject:"from"},conflicts:{phrase:"conflicts with",subject:"from"},depends:{phrase:"depends on",subject:"from"},parts:{phrase:"is part of",subject:"from",roles:["part","whole"]}};function Oe({color:n,size:t=8}){return v("span",{class:"dot",style:{background:n,width:`${t}px`,height:`${t}px`,boxShadow:`0 0 10px ${n}`}})}function yr({children:n,tone:t}){return v("span",{class:`chip${t?` chip-${t}`:""}`,children:n})}function Xi({children:n}){return v("kbd",{class:"kbd",children:n})}function be(n){return n>=1e4?`${(n/1e3).toFixed(1)}k`:n.toLocaleString()}function Ef({wide:n,onToggle:t}){const e=n?"Narrow the panel (W)":"Widen the panel (W)";return v("button",{class:"icon-btn",title:e,"aria-label":e,"aria-pressed":n,onClick:t,children:v(Te,{name:n?"narrow":"widen"})})}function Te({name:n}){return v("svg",{class:"icon",viewBox:"0 0 24 24","aria-hidden":"true",children:v("path",{d:{search:"M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.2 4.2-1.4 1.4-4.2-4.2A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z",layers:"m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",health:"M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21Z",reset:"M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5",help:"M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-6v.01M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V13",labels:"M4 5h16M4 12h10M4 19h7",spark:"M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6 4 4m0-14-4 4m-6 6-4 4",close:"M6 6l12 12M18 6 6 18",chevron:"m9 6 6 6-6 6",back:"m15 6-6 6 6 6",forward:"m9 6 6 6-6 6",more:"M5.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M16.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",history:"M12 7v5l3 2M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4 4v4h4",copy:"M8 8h11v11H8zM5 16V5h11",open:"M14 4h6v6m0-6-9 9M10 6H5v13h13v-5",read:"M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z",folder:"M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",widen:"M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7",narrow:"M20 10h-6V4M4 14h6v6M14 10l6-6M10 14l-6 6"}[n]})})}function Sb(n){return(t,e)=>n==="health"?e.flagged/Math.max(1,e.notes)-t.flagged/Math.max(1,t.notes)||e.flagged-t.flagged||zi(t.title,e.title):n==="recent"?(e.updated??"").localeCompare(t.updated??"")||e.recent-t.recent||zi(t.title,e.title):n==="size"&&e.notes-t.notes||zi(t.title,e.title)}function _e(n){return n.page?n.title:n.name}function Mb({c:n}){const t=n.world,e=Nt(n.store,y=>y.focus),[i,r]=rn(""),[s,o]=rn("name"),[a,l]=rn({}),c=je(()=>new Map(t.topics.map(y=>[y.slug,y])),[t]),h=y=>{const R=[];for(let S=c.get(c.get(y)?.parent??"");S&&!R.includes(S.slug);S=c.get(S.parent??""))R.push(S.slug);return R},u=je(()=>{const y=new Map;for(const R of t.topics)for(const S of[R.slug,...h(R.slug)])y.set(S,(y.get(S)??0)+R.notes);return y},[t]),p=je(()=>new Set(t.topics.flatMap(y=>y.parent?[y.parent]:[])),[t]),d=new Set(e.topic?h(e.topic):[]),g=i.trim().toLowerCase(),_=new Set;for(const y of t.topics)if(!(g&&!_e(y).toLowerCase().includes(g)&&!y.slug.includes(g))&&(_.add(y.slug),g))for(const R of h(y.slug))_.add(R);const m=y=>!!g||(a[y]??d.has(y)),f=Sb(s),M=Eb(t.topics.filter(y=>_.has(y.slug)),(y,R)=>f({...y,title:_e(y),notes:u.get(y.slug)??y.notes},{...R,title:_e(R),notes:u.get(R.slug)??R.notes})).filter(({topic:y})=>h(y.slug).every(m)),E=Math.max(1,...t.topics.map(y=>u.get(y.slug)??0));return v("div",{class:"atlas",children:[v("div",{class:"nav-tools",children:[v("input",{class:"field",placeholder:"Filter topics",value:i,onInput:y=>r(y.target.value),"aria-label":"Filter topics"}),v("select",{class:"field select",value:s,onChange:y=>o(y.target.value),"aria-label":"Sort topics",children:[v("option",{value:"name",children:"Name"}),v("option",{value:"size",children:"Most notes"}),v("option",{value:"health",children:"Most issues"}),v("option",{value:"recent",children:"Recently changed"})]})]}),v("div",{class:"tree",role:"tree",children:[g&&M.length===0&&v("div",{class:"empty small",children:"No topic matches."}),M.map(({topic:y,depth:R})=>{const S=u.get(y.slug)??y.notes,b=m(y.slug);return v("div",{class:`tree-topic${e.topic===y.slug?" active":""}`,style:{paddingLeft:`${4+R*14}px`},role:"treeitem","aria-level":R+1,"aria-expanded":p.has(y.slug)?b:void 0,children:[p.has(y.slug)?v("button",{class:`chev${b?" open":""}`,onClick:()=>l({...a,[y.slug]:!b}),"aria-label":b?"Collapse":"Expand",title:b?"Collapse":"Expand",children:v(Te,{name:"chevron"})}):v("span",{class:"chev-space"}),v("button",{class:"tree-topic-main",onClick:()=>n.focus({topic:y.slug}),children:[v(Oe,{color:y.color,size:7}),v("span",{class:`tree-title${y.page?"":" folder"}`,children:_e(y)}),y.flagged>0&&v("span",{class:"badge",title:`${y.flagged} ${y.flagged===1?"note":"notes"} with issues`,children:y.flagged}),v("span",{class:"tree-count",title:`${be(S)} notes, with the topics under it`,children:[be(S)," notes"]}),v("span",{class:"bar","aria-hidden":"true",children:v("span",{style:{width:`${Math.max(4,S/E*100)}%`,background:y.color}})})]})]},y.slug)})]})]})}function Eb(n,t){const e=new Set(n.map(a=>a.slug)),i=new Map,r=[];for(const a of n)a.parent&&e.has(a.parent)?i.set(a.parent,[...i.get(a.parent)??[],a]):r.push(a);const s=[],o=(a,l)=>{s.push({topic:a,depth:l});for(const c of(i.get(a.slug)??[]).sort(t))o(c,l+1)};for(const a of r.sort(t))o(a,0);return s}function bb({c:n}){const t=Nt(n.store,l=>l.healthData),e=Nt(n.store,l=>l.healthError),i=Nt(n.store,l=>l.health),[r,s]=rn("stale"),o=je(()=>new Map(n.world.topics.map(l=>[l.slug,l])),[n]);if(!t&&e)return v("div",{class:"empty",children:["Could not find notes with issues: ",e]});if(!t)return v("div",{class:"empty",children:"Finding notes with issues…"});const a=nc.filter(l=>(t.counts[l]??0)>0);return v("div",{class:"health",children:[v("label",{class:"switch-row",children:[v("span",{children:"Highlight issues on the map: color each topic by its share of notes with issues, and ring each of those notes"}),v("input",{type:"checkbox",class:"switch",checked:i,onChange:l=>n.setHealth(l.target.checked)})]}),a.length===0&&v("div",{class:"empty",children:"No issues found."}),a.map(l=>v("div",{class:"flag-group",children:[v("button",{class:"flag-head",onClick:()=>s(r===l?null:l),"aria-expanded":r===l,title:yb[l],children:[v("span",{class:`chev${r===l?" open":""}`,children:v(Te,{name:"chevron"})}),v(Oe,{color:ji[l]}),v("span",{class:"tree-title",children:Io[l]}),v("span",{class:"flag-count",children:be(t.counts[l]??0)})]}),r===l&&v("div",{class:"flag-items",children:[(t.items[l]??[]).map(c=>v("button",{class:"flag-item",onClick:()=>n.openNote(c.id,c.topic),children:[v("span",{class:"tree-title",children:c.title}),v("span",{class:"tree-meta",children:c.topic?o.get(c.topic)?.title??c.topic:""})]},c.id)),(t.counts[l]??0)>(t.items[l]?.length??0)&&v("div",{class:"more",children:["and ",be((t.counts[l]??0)-(t.items[l]?.length??0))," more"]})]})]},l))]})}const Tb={consolidate:"Merged captures",edit:"Agent edit","lint-fix":"Auto-fix",mv:"Moved",undo:"Undo",import:"Import",review:"Review",rule:"Rule"};function wb({c:n}){const t=Nt(n.store,r=>r.run),e=n.world.runs,i=je(()=>new Map(n.world.topics.map(r=>[r.slug,r])),[n]);return e.length===0?v("div",{class:"empty",children:"No activity recorded on this device yet."}):v("div",{class:"changes",children:[v("div",{class:"hint",children:"Select an entry to highlight the notes it changed."}),e.map(r=>{const s=Object.entries(r.topics).sort((a,l)=>l[1]-a[1]),o=r.at?new Date(r.at):null;return v("button",{class:`run${t?.id===r.id?" active":""}`,onClick:()=>n.setRun(t?.id===r.id?null:r),children:[v("div",{class:"run-top",children:[v("span",{class:`run-kind kind-${r.kind}`,children:Tb[r.kind]??r.kind}),v("span",{class:"run-when",children:o?o.toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):""})]}),v("div",{class:"run-body",children:[r.episodes>0&&v("span",{children:[r.episodes," session captures · "]}),v("span",{children:[r.touched.length," notes changed"]})]}),s.length>0&&v("div",{class:"run-topics",children:s.slice(0,4).map(([a,l])=>{const c=i.get(a);return v("span",{class:"run-topic",children:[v(Oe,{color:c?.color??"#888",size:6})," ",c?.title??a," ",v("b",{children:l})]},a)})})]},r.id)})]})}function Ab({c:n}){const t=Nt(n.store,r=>r.navTab),e=Nt(n.store,r=>r.navOpen),i=n.world.totals.flagged;return v("aside",{class:`panel nav${e?"":" collapsed"}`,"aria-label":"Topics, issues, and activity",children:[v("div",{class:"tabs",role:"tablist",children:[["atlas","health","changes"].map(r=>v("button",{role:"tab","aria-selected":t===r,class:`tab${t===r?" active":""}`,onClick:()=>n.setNav(r),children:[r==="atlas"?"Topics":r==="health"?"Issues":"Activity",r==="health"&&i>0&&v("span",{class:"tab-badge",children:be(i)}),r==="changes"&&n.world.runs.length>0&&v("span",{class:"tab-badge dim",children:n.world.runs.length})]},r)),v("button",{class:"icon-btn",onClick:()=>n.store.set({navOpen:!e}),"aria-label":e?"Collapse the panel":"Expand the panel",title:e?"Collapse":"Expand",children:v(Te,{name:e?"back":"chevron"})})]}),e&&v("div",{class:"nav-body",children:t==="atlas"?v(Mb,{c:n}):t==="health"?v(bb,{c:n}):v(wb,{c:n})})]})}const Cb=/!?\[\[([^[\]\n]+?)\]\]/g;function Rb(n){const t=new Map(Object.entries(n).map(([e,i])=>[e.toLowerCase(),i.id]));return e=>{const i=e.split("|")[0].split("#")[0].trim();return n[i]?.id??t.get(i.toLowerCase())}}function Pb(n,t,e){for(const i of n.matchAll(Cb))if(t(i[1])===e)return!0;return!1}function Lb(n,t,e){const i=Rb(t);return(Array.isArray(n)?n:n==null?[]:[n]).map(String).filter(s=>Pb(s,i,e))}const Lh={superseded_by:"supersedes",source:"cites",conflicts_with:"conflicts",depends_on:"depends",part_of:"parts"},Db={supersedes:"bw-superseded_by",cites:"bw-sources",conflicts:"bw-conflicts_with",depends:"bw-depends_on",parts:"bw-part_of"},Ib={linked_from:"also links back",cited_by:"also cites it",supersedes:"is replaced by it",conflicts_with:"also names the conflict",depended_on_by:"also depends on it"},Vi=30;function bf(n,t){const[e,i]=rn({key:n,data:null,error:null});return Si(()=>{let r=!0;return i({key:n,data:null,error:null}),t().then(s=>r&&i({key:n,data:s,error:s?null:"Not found."}),s=>r&&i({key:n,data:null,error:s instanceof Error?s.message:String(s)})),()=>{r=!1}},[n]),e.key===n?e:{data:null,error:null}}function Ub({c:n,t}){return t.kind==="link"?v(Ob,{c:n,t}):v(Nb,{c:n,t})}function Dh({c:n,e:t,role:e}){const i=n.world.topics.find(r=>r.slug===t.topic);return v("button",{class:"conn-end",onClick:()=>n.openNote(t.id,t.topic),title:`Open ${t.title}`,children:[v("span",{class:"conn-end-title",children:t.title}),v("span",{class:"conn-end-meta",children:[v(Oe,{color:i?.color??"#9cc3ff",size:6})," ",i?.title??t.topic,e?` · ${e}`:""]})]})}function Ob({c:n,t}){const e=Mf[t.family],[i,r]=e.subject==="to"?[t.to,t.from]:[t.from,t.to],{data:s,error:o}=bf(`note:${t.from.id}`,()=>n.source.note(t.from.id)),a=sc(d=>n.openNote(d.id,d.topic),[n]),l=s?.links??{},c=Db[t.family],h=s&&c?Lb(s.properties?.[c],l,t.to.id):[],u=(s?.backlinks??[]).filter(d=>d.id===t.to.id),p=uc(l,a);return v(xe,{children:[v("div",{class:"insp-kicker",children:[v("span",{class:"swatch",style:{background:He[t.family]}})," Connection · ",hc[t.family]]}),v("div",{class:"conn-ends",children:[v(Dh,{c:n,e:i,role:e.roles?.[0]}),v("div",{class:"link-phrase conn-phrase",style:{color:He[t.family]},children:e.phrase}),v(Dh,{c:n,e:r,role:e.roles?.[1]})]}),v("div",{class:"section-title",children:["Where ",t.from.title," says it"]}),!s&&v("div",{class:"empty small",children:o??"Reading the note…"}),s?.partial&&v("div",{class:"hint",children:"This exported file has the map only; serve the brain with brain viz to read the note."}),c&&h.map(d=>v("div",{class:"passage passage-prop",children:[v("span",{class:"passage-key",children:c})," ",Ul(d,p)]},d)),s&&!s.partial&&h.length===0&&v("div",{class:"hint",children:"The link is not in the note's text as it reads now; the map may be older than the file."}),s&&v("button",{class:"open-link",onClick:()=>n.openNote(t.from.id,t.from.topic),children:[v(Te,{name:"read"})," Read the whole note ",v("span",{class:"row-meta",children:t.from.title})]}),u.length>0&&v(xe,{children:[v("div",{class:"section-title",children:"Both ways"}),u.map(d=>v("div",{class:"hint",children:[t.to.title," ",Ib[d.relation]??d.relation.replace(/_/g," "),"."]},d.relation))]})]})}function Fb(n,t){const e=s=>{const o=new Set([s]);if(t.level==="topic")return o;for(let a=!0;a;){a=!1;for(const l of n.world.topics)l.parent&&o.has(l.parent)&&!o.has(l.slug)&&(o.add(l.slug),a=!0)}return o},[i,r]=[e(t.a),e(t.b)];return n.world.flows.filter(s=>i.has(s.a)&&r.has(s.b)||r.has(s.a)&&i.has(s.b)).sort((s,o)=>o.total-s.total)}function Nb({c:n,t}){const e=a=>{const l=n.world.topics.find(c=>c.slug===a);return l?_e(l):a},i=a=>n.world.topics.find(l=>l.slug===a)?.color??"#9cc3ff",r=Object.entries(t.rels).sort((a,l)=>l[1]-a[1]).map(([a,l])=>`${be(l)} ${Sf[a]??a.replace(/_/g," ")}`),s=Fb(n,t),o=s.length===1&&[s[0].a,s[0].b].sort().join()===[t.a,t.b].sort().join();return v(xe,{children:[v("div",{class:"insp-kicker",children:"Connection · links between topics"}),v("div",{class:"conn-ends",children:[t.a,t.b].map((a,l)=>v(xe,{children:[l===1&&v("div",{class:"link-phrase conn-phrase",children:"and"}),v("button",{class:"conn-end",onClick:()=>n.focus({topic:a}),title:`Go to ${e(a)}`,children:[v("span",{class:"conn-end-title",children:e(a)}),v("span",{class:"conn-end-meta",children:[v(Oe,{color:i(a),size:6})," topic"]})]})]},a))}),v("div",{class:"hint",children:[be(t.total)," ",t.total===1?"link":"links",r.length?`: ${r.join(" · ")}`:""]}),t.level==="topic"||o?v(kb,{c:n,t}):v(zb,{c:n,pairs:s})]})}function kb({c:n,t}){const{data:e,error:i}=bf(`topic:${t.a}`,()=>n.source.topic(t.a));if(!e)return v("div",{class:"empty small",children:i??"Loading the links…"});const r=new Map(e.nodes.map(o=>[o.id,o.title])),s=e.external.filter(o=>o.topic===t.b&&Lh[o.rel]).map(o=>{const a={id:o.dir==="out"?o.source:o.target,title:"",topic:t.a};a.title=r.get(a.id)??a.id;const l={id:o.dir==="out"?o.target:o.source,title:o.title,topic:t.b},[c,h]=o.dir==="out"?[a,l]:[l,a];return{family:Lh[o.rel],from:c,to:h}});return v(xe,{children:[v("div",{class:"section-title",children:["Links ",v("span",{class:"section-count",children:s.length})]}),v("div",{class:"rows",children:[s.slice(0,Vi).map(o=>v("button",{class:"row",onClick:()=>n.showConnection({kind:"link",...o}),children:[v("span",{class:"swatch",style:{background:He[o.family]}}),v("span",{class:"row-title",children:[o.from.title," → ",o.to.title]})]},`${o.family}${o.from.id}>${o.to.id}`)),s.length>Vi&&v("div",{class:"more",children:["and ",s.length-Vi," more"]}),s.length<t.total&&s.length<=Vi&&v("div",{class:"more",children:["The map lists the first ",be(s.length)," of ",be(t.total),"."]})]})]})}function zb({c:n,pairs:t}){const e=i=>{const r=n.world.topics.find(s=>s.slug===i);return r?_e(r):i};return v(xe,{children:[v("div",{class:"section-title",children:["Topic pairs ",v("span",{class:"section-count",children:t.length})]}),v("div",{class:"rows",children:[t.slice(0,Vi).map(i=>v("button",{class:"row",onClick:()=>n.showConnection({kind:"flow",level:"topic",a:i.a,b:i.b,total:i.total,rels:i.rels}),children:[v("span",{class:"row-title",children:[e(i.a)," ↔ ",e(i.b)]}),v("span",{class:"row-meta",children:i.total===1?"1 link":`${be(i.total)} links`})]},`${i.a}|${i.b}`)),t.length>Vi&&v("div",{class:"more",children:["and ",t.length-Vi," more"]})]})]})}function Bb({c:n}){const t=Nt(n.store,c=>c.previewOpen),e=Nt(n.store,c=>c.focus),i=Nt(n.store,c=>c.note),r=Nt(n.store,c=>c.noteError),s=Nt(n.store,c=>c.wide),o=sc(c=>n.openNote(c.id,c.topic),[n]);if(!t||!e.note)return null;const a=i&&i.id===e.note?i:null,l=n.world.topics.find(c=>c.slug===(a?.topic??e.topic));return v("aside",{class:`panel preview${s?" wide":""}`,role:"dialog","aria-label":"Note preview",children:[v("header",{class:"preview-head",children:[v("div",{class:"insp-kicker",children:[v(Oe,{color:l?.color??"#9cc3ff",size:7})," ",l?.title??"Note"]}),v("div",{class:"preview-actions",children:[v(Ef,{wide:s,onToggle:()=>n.setWide(!s)}),a?.abs_path&&v("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(a.abs_path)}`,children:v(Te,{name:"open"})}),v("button",{class:"icon-btn",title:"Close (Esc)","aria-label":"Close preview",onClick:()=>n.store.set({previewOpen:!1}),children:v(Te,{name:"close"})})]})]}),v("div",{class:"preview-body",children:a?v(xe,{children:[!/^\s*#\s+\S/.test(a.markdown??"")&&v("h1",{class:"md-inline-title",children:a.title}),a.properties&&v(Tf,{props:a.properties,links:a.links??{},onOpen:o}),a.markdown!=null?v(_f,{text:a.markdown,links:a.links??{},onOpen:o}):v("div",{class:"empty",children:["Exported maps do not include note text. Run ",v("code",{children:"brain viz"})," to read notes."]})]}):v("div",{class:"empty",children:r??"Loading…"})})]})}const Hb=new Set(["title"]);function Tf({props:n,links:t,onOpen:e,open:i=!0}){const r=je(()=>uc(t,e),[t,e]),s=Object.entries(n).filter(([o,a])=>!Hb.has(o)&&a!==null&&a!=="");return s.length?v("details",{class:"md-props",open:i,children:[v("summary",{children:"Properties"}),v("dl",{children:s.map(([o,a])=>v("div",{class:"md-prop",children:[v("dt",{children:o}),v("dd",{children:Vb(o,a,r)})]},o))})]}):null}function Vb(n,t,e){if(Array.isArray(t))return t.map((r,s)=>v("span",{class:n==="tags"?"md-tag":"md-chip",children:n==="tags"?`#${String(r)}`:Ul(String(r),e)},s));if(typeof t=="boolean")return v("input",{type:"checkbox",checked:t,disabled:!0});const i=typeof t=="object"?JSON.stringify(t):String(t);return/^https?:\/\//i.test(i)?v("a",{class:"md-external",href:i,target:"_blank",rel:"noopener noreferrer",children:i.replace(/^https?:\/\//,"")}):Ul(i,e)}const dc={superseded_by:"Replaced by",conflicts_with:"Conflicts with",depends_on:"Depends on",part_of:"Part of",links_to:"Links to",cites:"Cites"},wf={supersedes:"replaced by this",conflicts_with:"conflicts with this",depended_on_by:"depends on this",linked_from:"links here",cited_by:"cites this"},Af={superseded_by:"supersedes",conflicts_with:"conflicts",depends_on:"depends",part_of:"parts",links_to:null,cites:"cites"},Cf={supersedes:"supersedes",conflicts_with:"conflicts",depended_on_by:"depends",linked_from:null,cited_by:"cites"},Gb={superseded_by:"superseded_by",conflicts_with:"conflicts_with",depends_on:"depends_on",part_of:"part_of",links_to:"links_to",source:"cites"},Wb={superseded_by:"supersedes",conflicts_with:"conflicts_with",depends_on:"depended_on_by",links_to:"linked_from",source:"cited_by"},bo=n=>n?He[n]:vy,Xb=(n,t)=>n.title.localeCompare(t.title,void 0,{numeric:!0,sensitivity:"base"});function qb(n){return n.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(t,e,i)=>i??e).replace(/(\*\*|__)(.+?)\1/g,"$2").replace(/`([^`]+)`/g,"$1")}function Rf(n){const t=new Map;if(!n)return t;for(const e of n.nodes)t.set(e.id,n.slug);for(const e of n.external)t.set(e.dir==="out"?e.target:e.source,e.topic);return t}function Pf(n,t){const e={out:[],in:[],parts:[],partsTotal:0};if(!t)return e;const i=new Map(t.nodes.map(o=>[o.id,o.title])),r=new Set,s=(o,a,l,c,h)=>{const u=`${o}|${a}|${l}`;if(!(r.has(u)||l===n))if(r.add(u),o==="out"){const p=Gb[a];e.out.push({relation:p,color:bo(Af[p]),label:dc[p],id:l,title:c,topic:h})}else if(a==="part_of")e.parts.push({relation:"has_part",color:He.parts,label:"Parts",id:l,title:c,topic:h});else{const p=Wb[a];e.in.push({relation:p,color:bo(Cf[p]),label:wf[p],id:l,title:c,topic:h})}};for(const o of t.links)o.source===n?s("out",o.rel,o.target,i.get(o.target)??o.target,t.slug):o.target===n&&s("in",o.rel,o.source,i.get(o.source)??o.source,t.slug);for(const o of t.external)o.source===n?s("out",o.rel,o.target,o.title,o.topic):o.target===n&&s("in",o.rel,o.source,o.title,o.topic);return e.parts.sort(Xb),e.partsTotal=e.parts.length,e}function Lf(n,t){const e=(i,r)=>i?(r?n.links?.[r]?.topic:void 0)??t.get(i)??null:null;return{out:(n.outlinks??[]).map(i=>({relation:i.relation,color:bo(Af[i.relation]),label:dc[i.relation]??i.relation,id:i.resolved?i.id:null,title:i.title??i.target,topic:e(i.resolved?i.id:null,i.target)})),in:(n.backlinks??[]).map(i=>({relation:i.relation,color:bo(Cf[i.relation]),label:wf[i.relation]??i.relation.replace(/_/g," "),id:i.id,title:i.title,topic:e(i.id)})),parts:(n.parts??[]).map(i=>({relation:"has_part",color:He.parts,label:"Parts",id:i.id,title:i.title,topic:e(i.id)})),partsTotal:n.parts_total??n.parts?.length??0}}function Yb({n,c:t,topic:e}){return v("button",{class:"row",onClick:()=>t.openNote(n.id,e),children:[v("span",{class:"row-title",children:n.title}),n.flags.length>0&&v(Oe,{color:ji[n.flags[0]],size:6}),v("span",{class:"row-meta",children:n.degree===1?"1 link":`${be(n.degree)} links`})]})}function Ih(n){return n===1?"1 note":`${be(n)} notes`}function Df(n,t){const e=[],i=r=>n.world.topics.find(s=>s.slug===r);for(let r=i(i(t)?.parent);r&&e.length<20;r=i(r.parent))e.unshift(_e(r));return e}const Ol=12;function Uh({total:n,noun:t,onShow:e}){return n>Ol?v("button",{class:"show-all",onClick:e,children:["Show all ",be(n)," ",t]}):null}function $b({c:n,slug:t}){const e=Nt(n.store,b=>b.topicData),i=Nt(n.store,b=>b.topicError),r=Nt(n.store,b=>b.page),s=Nt(n.store,b=>b.pageError),[o,a]=rn(!1),[l,c]=rn(!1),h=$i(null),u=$i(null),p=sc(b=>n.openNote(b.id,b.topic),[n]),d=n.world.topics.find(b=>b.slug===t),g=je(()=>n.world.flows.filter(b=>b.a===t||b.b===t).sort((b,L)=>L.total-b.total).slice(0,6),[n,t]),_=e?.slug===t?e:null,m=r&&d?.page===r.id?r:null,f=je(()=>m?m.partial?Pf(m.id,_):Lf(m,Rf(_)):null,[m,_]),M=je(()=>{if(!_)return[];const b=new Map(_.nodes.map(L=>[L.id,L]));return Bl(_,1).ids.filter(L=>L!==_.page).map(L=>b.get(L))},[_]);if(!d)return null;const E=new Map(n.world.topics.map(b=>[b.slug,b])),y=n.world.topics.filter(b=>b.parent===t).sort((b,L)=>zi(_e(b),_e(L))),R=Df(n,t),S=b=>()=>b.current?.scrollIntoView({block:"start"});return v(xe,{children:[v("div",{class:"insp-kicker",children:[v(Oe,{color:d.color})," ",d.page?"Topic":"Topic without a topic page"]}),v("h2",{class:"insp-title",children:_e(d)}),R.length>0&&v("div",{class:"insp-place",title:"Where this topic lives",children:["In ",R.join(" › ")]}),v("div",{class:"chips",children:[d.notes>0&&v("button",{class:"chip chip-link",onClick:S(h),children:Ih(d.notes)}),y.length>0&&v("button",{class:"chip chip-link",onClick:S(u),children:y.length===1?"1 sub-topic":`${be(y.length)} sub-topics`}),d.recent>0&&v(yr,{tone:"dim",children:[be(d.recent)," changed in 7 days"]}),d.updated&&v(yr,{tone:"dim",children:["updated ",d.updated.slice(0,10)]})]}),d.flagged>0&&v("div",{class:"flag-chips",children:nc.filter(b=>d.flags[b]).map(b=>v("span",{class:"flag-chip",style:{borderColor:ji[b]},children:[v(Oe,{color:ji[b],size:6})," ",Io[b]," ",v("b",{children:d.flags[b]})]},b))}),d.page?m?v("div",{class:"topic-page",children:[(m.banners??[]).map(b=>v("div",{class:`banner${b.startsWith("⚠")?"":" banner-info"}`,children:b},b)),m.markdown!=null?v(xe,{children:[m.properties&&v(Tf,{props:m.properties,links:m.links??{},onOpen:p,open:!1}),v(_f,{text:rb(m.markdown,m.title),links:m.links??{},onOpen:p})]}):v(xe,{children:[d.description&&v("p",{class:"insp-desc",children:d.description}),v("div",{class:"hint",children:"This exported file has the map only; serve the brain with brain viz to read the topic page."})]})]}):v("div",{class:"empty small",children:s??"Reading the topic page…"}):d.description&&v("p",{class:"insp-desc",children:d.description}),d.notes>0&&v(xe,{children:[v("div",{class:"section-title",ref:h,children:["Notes ",v("span",{class:"section-count",children:be(d.notes)})]}),_?v("div",{class:"rows",children:[(o?M:M.slice(0,Ol)).map(b=>v(Yb,{n:b,c:n,topic:t},b.id)),!o&&v(Uh,{total:M.length,noun:"notes",onShow:()=>a(!0)})]}):v("div",{class:"empty small",children:i??"Loading…"})]}),y.length>0&&v(xe,{children:[v("div",{class:"section-title",ref:u,children:["Sub-topics ",v("span",{class:"section-count",children:y.length})]}),v("div",{class:"rows",children:[(l?y:y.slice(0,Ol)).map(b=>v("button",{class:"row",onClick:()=>n.focus({topic:b.slug}),children:[v(Oe,{color:b.color,size:7}),v("span",{class:"row-title",children:_e(b)}),v("span",{class:"row-meta",children:Ih(b.notes)})]},b.slug)),!l&&v(Uh,{total:y.length,noun:"sub-topics",onShow:()=>c(!0)})]})]}),f&&v(If,{c:n,links:f,slug:t,skip:"links_to"}),g.length>0&&v(xe,{children:[v("div",{class:"section-title",children:"Linked topics"}),v("div",{class:"rows",children:g.map(b=>{const L=E.get(b.a===t?b.b:b.a);return L?v("button",{class:"row",onClick:()=>n.focus({topic:L.slug}),children:[v(Oe,{color:L.color,size:7}),v("span",{class:"row-title",children:_e(L)}),v("span",{class:"row-meta",children:b.total===1?"1 link":`${be(b.total)} links`})]},L.slug):null})})]}),m&&v(Uf,{path:m.path,absPath:m.abs_path})]})}function If({c:n,links:t,slug:e,skip:i}){const r=i?t.out.filter(c=>c.relation!==i):t.out,s=new Map;for(const c of r)s.set(c.relation,[...s.get(c.relation)??[],c]);const o=Object.keys(dc),a=[...s].sort(([c],[h])=>o.indexOf(c)-o.indexOf(h)),l=(c,h)=>v("button",{class:"row",disabled:!c.id||!c.topic,title:c.id?c.topic?void 0:"Not in a topic on this map, such as an inbox episode":"No note by this name",onClick:()=>c.id&&n.openNote(c.id,c.topic),children:[v("span",{class:"row-title",children:c.title}),h&&v("span",{class:"row-meta",children:h}),!h&&c.topic&&c.topic!==e&&v("span",{class:"row-meta",children:n.world.topics.find(u=>u.slug===c.topic)?.title??c.topic}),!c.id&&v("span",{class:"row-meta",children:"not found"}),c.id&&!c.topic&&v("span",{class:"row-meta",children:"not on the map"})]},`${c.relation}${c.id??c.title}`);return v(xe,{children:[a.length>0&&v("div",{class:"section-title",children:["Links ",v("span",{class:"section-count",children:r.length})]}),a.map(([c,h])=>v("div",{class:"rel-group",children:[v("div",{class:"rel-label",style:{color:h[0].color},children:h[0].label}),h.slice(0,12).map(u=>l(u)),h.length>12&&v("div",{class:"more",children:["and ",h.length-12," more"]})]},c)),t.parts.length>0&&v(xe,{children:[v("div",{class:"section-title",style:{color:He.parts},children:["Parts ",v("span",{class:"section-count",children:t.partsTotal})]}),v("div",{class:"rows",children:[t.parts.slice(0,20).map(c=>l(c)),t.partsTotal>20&&v("div",{class:"more",children:["and ",t.partsTotal-20," more"]})]})]}),t.in.length>0&&v(xe,{children:[v("div",{class:"section-title",children:["Linked from ",v("span",{class:"section-count",children:t.in.length})]}),v("div",{class:"rows",children:[t.in.slice(0,12).map(c=>l(c,c.label)),t.in.length>12&&v("div",{class:"more",children:["and ",t.in.length-12," more"]})]})]})]})}function Uf({path:n,absPath:t,onRead:e}){const[i,r]=rn(!1);return v("div",{class:"path-row",children:[v("code",{class:"path",children:n}),e&&v("button",{class:"icon-btn",title:"Read the note (P)",onClick:e,children:v(Te,{name:"read"})}),v("button",{class:"icon-btn",title:"Copy path",onClick:()=>{navigator.clipboard?.writeText(t??n),r(!0),window.setTimeout(()=>r(!1),1200)},children:v(Te,{name:"copy"})}),t&&v("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(t)}`,children:v(Te,{name:"open"})}),i&&v("span",{class:"copied",children:"copied"})]})}function Zb({c:n,id:t,slug:e}){const i=Nt(n.store,d=>d.note),r=Nt(n.store,d=>d.noteError),s=Nt(n.store,d=>d.topicData),o=n.world.topics.find(d=>d.slug===e),a=s?.nodes.find(d=>d.id===t),l=je(()=>{const d=s?.slug===e?s:null;return i&&!i.partial?Lf(i,Rf(d)):Pf(t,d)},[t,i,s,e]),c=i?.title??a?.title??"…",h=i?.status??a?.status,u=i?.path??a?.path,p=Df(n,e);return v(xe,{children:[v("div",{class:"insp-kicker",children:[v(Oe,{color:o?.color??"#888"})," ",v("button",{class:"link",onClick:()=>n.focus({topic:e}),children:o?_e(o):e})]}),v("h2",{class:"insp-title",children:c}),p.length>0&&v("div",{class:"insp-place",title:"Where this note lives",children:["In ",[...p,o?_e(o):e].join(" › ")]}),v("div",{class:"chips",children:[(i?.kind??a?.kind)&&v(yr,{children:i?.kind??a?.kind}),(i?.type??a?.type)&&v(yr,{children:i?.type??a?.type}),h&&v(yr,{tone:h==="active"?"ok":"warn",children:h}),(i?.updated??a?.updated)&&v(yr,{tone:"dim",children:["updated ",(i?.updated??a?.updated??"").slice(0,10)]})]}),a&&a.flags.length>0&&v("div",{class:"flag-chips",children:a.flags.map(d=>v("span",{class:"flag-chip",style:{borderColor:ji[d]},children:[v(Oe,{color:ji[d],size:6})," ",Io[d]]},d))}),(i?.banners??[]).map(d=>v("div",{class:`banner${d.startsWith("⚠")?"":" banner-info"}`,children:d},d)),i?.summary&&v("p",{class:"insp-desc",children:qb(i.summary)}),!i&&v("div",{class:"empty small",children:r??"Reading the note…"}),i?.partial&&v("div",{class:"hint",children:"This exported file has the map only; serve the brain with brain viz to read the note."}),v(If,{c:n,links:l,slug:e}),u&&v(Uf,{path:u,absPath:i?.abs_path,onRead:()=>n.store.set({previewOpen:!0})})]})}function jb({c:n}){const t=Nt(n.store,s=>s.focus),e=Nt(n.store,s=>s.connection),i=Nt(n.store,s=>s.wide),r=e?v(Ub,{c:n,t:e}):t.note&&t.topic?v(Zb,{c:n,id:t.note,slug:t.topic}):t.topic?v($b,{c:n,slug:t.topic},t.topic):null;return v("aside",{class:`panel insp open${r?i?" wide":"":" idle"}`,"aria-label":"Details",children:[v("div",{class:"insp-head",children:[v("span",{children:"Details"}),r&&v("div",{class:"insp-actions",children:[v(Ef,{wide:i,onToggle:()=>n.setWide(!i)}),e?v("button",{class:"icon-btn",onClick:()=>n.closeConnection(),title:"Close the connection (Esc)","aria-label":"Close the connection",children:v(Te,{name:"close"})}):v("button",{class:"icon-btn",onClick:()=>n.up(),title:"Up one level (Esc)","aria-label":"Up one level",children:v(Te,{name:"close"})})]})]}),v("div",{class:"insp-body",children:r??v("div",{class:"empty small",children:"Click a topic, a star, or a link to see its details here."})})]})}const Je=184;function Kb(n){const t=[[77,107,168],[255,158,41],[255,26,46]],[e,i,r]=n<.5?[t[0],t[1],n*2]:[t[1],t[2],(n-.5)*2];return`rgb(${e.map((s,o)=>Math.round(s+(i[o]-s)*r)).join(",")})`}function Qb({c:n}){const t=$i(null),e=Nt(n.store,o=>o.focus),i=Nt(n.store,o=>o.health),r=je(()=>qh(n.world.topics),[n]);Si(()=>{const o=t.current;if(!o)return;const a=Math.min(2,window.devicePixelRatio||1);o.width=Je*a,o.height=Je*a;const l=o.getContext("2d"),c=()=>{const u=n.galaxy;if(!u)return;const p=u.layout,d=(Je/2-10)/p.radius,g=(B,V)=>[Je/2+B*d,Je/2+V*d];l.setTransform(a,0,0,a,0,0),l.clearRect(0,0,Je,Je);const _=new Map;for(const B of n.world.topics)_.set(B.slug,B.parent?_.get(B.parent)??B.slug:B.slug);const m=e.topic?_.get(e.topic):void 0;n.world.topics.forEach((B,V)=>{if(B.parent)return;const Z=p.topics.get(B.slug),[Q,q]=g(Z.fx,Z.fz),it=Math.max(2,Z.r*d),P=i?Kb(r[V]):B.color,dt=l.createRadialGradient(Q,q,0,Q,q,it);dt.addColorStop(0,P),dt.addColorStop(1,"rgba(0,0,0,0)"),l.globalAlpha=m&&m!==B.slug?.25:.5,l.fillStyle=dt,l.beginPath(),l.arc(Q,q,it,0,Math.PI*2),l.fill(),l.globalAlpha=.95,l.fillStyle=P,l.beginPath(),l.arc(...g(Z.x,Z.z),Math.max(1,Math.min(2.6,Z.ring*d)),0,Math.PI*2),l.fill()});const f=e.topic?p.topics.get(e.topic):void 0;if(f){const[B,V]=g(f.fx,f.fz);l.globalAlpha=1,l.strokeStyle="#fff",l.lineWidth=1.2,l.beginPath(),l.arc(B,V,Math.max(4,f.r*d),0,Math.PI*2),l.stroke()}l.globalAlpha=1;const M=p.inbox,[E,y]=g(M.x,M.z);l.fillStyle="#ffd88a",l.beginPath(),l.arc(E,y,2.5,0,Math.PI*2),l.fill();const R=u.view(),[S,b]=g(R.pos.x,R.pos.z),[L,w]=g(R.target.x,R.target.z),x=Math.atan2(w-b,L-S),C=Math.min(70,Math.max(16,Math.hypot(L-S,w-b))),F=.42,z=l.createLinearGradient(S,b,S+Math.cos(x)*C,b+Math.sin(x)*C);z.addColorStop(0,"rgba(140,180,255,0.42)"),z.addColorStop(1,"rgba(140,180,255,0)"),l.fillStyle=z,l.beginPath(),l.moveTo(S,b),l.lineTo(S+Math.cos(x-F)*C,b+Math.sin(x-F)*C),l.lineTo(S+Math.cos(x+F)*C,b+Math.sin(x+F)*C),l.closePath(),l.fill(),l.fillStyle="#cfe0ff",l.beginPath(),l.arc(Math.max(4,Math.min(Je-4,S)),Math.max(4,Math.min(Je-4,b)),2.6,0,Math.PI*2),l.fill()};c();const h=window.setInterval(c,200);return()=>window.clearInterval(h)},[e,i]);const s=o=>{const a=n.galaxy,l=t.current;if(!a||!l)return;const c=l.getBoundingClientRect(),h=(Je/2-10)/a.layout.radius,u=(o.clientX-c.left-Je/2)/h,p=(o.clientY-c.top-Je/2)/h;let d=null,g=1/0;for(const _ of n.world.topics){if(_.parent)continue;const m=a.layout.topics.get(_.slug),f=Math.hypot(m.fx-u,m.fz-p)/m.r;f<g&&(g=f,d=_.slug)}d&&n.focus({topic:d})};return v("div",{class:"panel minimap","aria-label":"Minimap",children:[v("canvas",{ref:t,style:{width:`${Je}px`,height:`${Je}px`},onClick:s}),v("div",{class:"minimap-label",children:"MAP"})]})}function Jb({c:n}){const[t,e]=rn(""),[i,r]=rn([]),[s,o]=rn(!1),[a,l]=rn(0),c=$i(null),h=je(()=>new Map(n.world.topics.map(_=>[_.slug,_])),[n]);Si(()=>c.current?.focus(),[]),Si(()=>{const _=t.trim();if(!_){r([]);return}o(!0);const m=window.setTimeout(()=>{n.search(_).then(f=>r(f)).catch(()=>r([])).finally(()=>o(!1))},140);return()=>window.clearTimeout(m)},[t]);const u=()=>n.store.set({paletteOpen:!1}),p=t.trim().toLowerCase(),d=[];if(p){for(const _ of n.world.topics){if(_e(_).toLowerCase().includes(p)||_.slug.includes(p)){const m=h.get(_.parent??""),f=[m?`in ${_e(m)}`:null,`${_.notes} notes`].filter(Boolean).join(" · ");d.push({key:`t:${_.slug}`,kind:"topic",title:_e(_),sub:f,color:_.color,run:()=>n.focus({topic:_.slug})})}if(d.length>8)break}for(const _ of i){const m=_.topic?h.get(_.topic):void 0;d.push({key:`n:${_.id}`,kind:"note",title:_.title,sub:[m?_e(m):null,_.snippet].filter(Boolean).join(" · "),color:m?.color??"#8892b0",run:()=>n.openNote(_.id,_.topic)})}}else for(const _ of[...n.world.topics].sort((m,f)=>f.notes-m.notes).slice(0,8))d.push({key:`t:${_.slug}`,kind:"topic",title:_e(_),sub:`${_.notes} notes`,color:_.color,run:()=>n.focus({topic:_.slug})});const g=_=>{const m=d[_];m&&(u(),m.run())};return v("div",{class:"palette-scrim",onClick:_=>_.target===_.currentTarget&&u(),children:v("div",{class:"palette panel",role:"dialog","aria-label":"Search notes and topics",children:[v("div",{class:"palette-input",children:[v(Te,{name:"search"}),v("input",{ref:c,value:t,placeholder:"Search notes and topics…","aria-label":"Search",onInput:_=>{e(_.target.value),l(0)},onKeyDown:_=>{_.key==="ArrowDown"?(_.preventDefault(),l(Math.min(d.length-1,a+1))):_.key==="ArrowUp"?(_.preventDefault(),l(Math.max(0,a-1))):_.key==="Enter"?(_.preventDefault(),g(a)):_.key==="Escape"&&(_.preventDefault(),_.stopPropagation(),u())}}),s&&v("span",{class:"spinner"}),v(Xi,{children:"Esc"})]}),v("div",{class:"palette-results",role:"listbox",children:[!p&&v("div",{class:"palette-section",children:"Largest topics"}),d.map((_,m)=>v("button",{role:"option","aria-selected":m===a,class:`palette-item${m===a?" sel":""}`,onMouseEnter:()=>l(m),onClick:()=>g(m),children:[v(Oe,{color:_.color,size:8}),v("span",{class:`palette-kind kind-${_.kind}`,children:_.kind}),v("span",{class:"palette-title",children:_.title}),v("span",{class:"palette-sub",children:_.sub})]},_.key)),p&&!s&&d.length===0&&v("div",{class:"empty",children:["Nothing matches “",t,"”."]})]})]})})}const po=n=>!n.altKey&&!n.metaKey&&!n.ctrlKey,_r=n=>t=>po(t)&&t.key.toLowerCase()===n;function tT(n){return[{section:"Move",keys:[[n.mod,"↑"],[n.mod,"↓"]],join:"pair",does:"Up or down one level: note, topic, parent topics, overview",match:t=>(t.metaKey||t.ctrlKey)&&!t.altKey&&(t.key==="ArrowUp"||t.key==="ArrowDown"),run:(t,e)=>e.key==="ArrowUp"?t.levelUp():void t.levelDown()},{section:"Move",keys:[["["],["]"]],join:"pair",does:"Previous or next place at the same level",match:t=>po(t)&&(t.key==="["||t.key==="]"),run:(t,e)=>void t.sibling(e.key==="]"?1:-1)},{section:"Move",keys:[["O"]],does:"Overview",match:_r("o"),run:t=>t.focus({})},{section:"Move",keys:[["R"]],does:"Turn the view back: tilted, heading north",match:_r("r"),run:t=>t.resetTurn()},{section:"Move",keys:[[n.history,"←"],[n.history,"→"]],join:"pair",does:"Back or forward through what you opened"},{section:"Move",keys:[["Esc"]],does:"Close what is open; otherwise up one level",match:t=>t.key==="Escape",run:t=>t.up(),whileTyping:!0},{section:"Show",keys:[["P"]],does:"Preview of the selected note",match:_r("p"),run:t=>t.store.state.focus.note&&t.store.set({previewOpen:!t.store.state.previewOpen})},{section:"Show",keys:[["W"]],does:"Widen or narrow the Details panel and the preview",match:_r("w"),run:t=>t.setWide(!t.store.state.wide)},{section:"Show",keys:[["I"]],does:"Highlight issues",match:_r("i"),run:t=>t.setHealth(!t.store.state.health)},{section:"Show",keys:[["L"]],does:"Labels",match:_r("l"),run:t=>t.setLabels(!t.store.state.labels)},{section:"Show",keys:[["1"],[String(Wi.length)]],join:"range",does:"Show or hide a kind of line, in the order of the bar below",match:t=>po(t)&&/^[1-9]$/.test(t.key)&&Number(t.key)<=Wi.length,run:(t,e)=>{const i=Wi[Number(e.key)-1];t.setLayer(i,!t.store.state.layers[i])}},{section:"Find",keys:[["/"],[n.mod,"K"]],join:"or",does:"Search notes and topics",match:t=>t.key==="/"&&po(t)||t.key.toLowerCase()==="k"&&(t.metaKey||t.ctrlKey)&&!t.altKey,run:t=>t.store.set({paletteOpen:!0}),whileTyping:t=>t.metaKey||t.ctrlKey},{section:"Find",keys:[["?"]],does:"These shortcuts",match:t=>t.key==="?"&&!t.metaKey&&!t.ctrlKey,run:t=>t.store.set({helpOpen:!0})}]}function eT(n,t,e){return n.find(i=>i.match?.(t)?e?typeof i.whileTyping=="function"?i.whileTyping(t):!!i.whileTyping:!0:!1)}const $r=ay(),Of=tT($r),nT={supersedes:"Replaces: pulses run from the old note to the one that replaced it",cites:"Sources: a note to the notes it cites as its sources",conflicts:"Conflicts: two notes that disagree; a search for either returns both",depends:"Depends on: pulses run from a note to the note it rests on",parts:"Part of: a note to the whole it belongs to, such as a project, a series, or a team"};function iT(){return v("svg",{class:"logo",viewBox:"0 0 32 32","aria-hidden":"true",children:[v("defs",{children:v("radialGradient",{id:"lg",cx:"50%",cy:"50%",r:"50%",children:[v("stop",{offset:"0","stop-color":"#fff"}),v("stop",{offset:"0.35","stop-color":"#9cc3ff"}),v("stop",{offset:"1","stop-color":"#7a5cff","stop-opacity":"0"})]})}),v("circle",{cx:"16",cy:"16",r:"15",fill:"url(#lg)"}),v("ellipse",{cx:"16",cy:"16",rx:"14",ry:"5",fill:"none",stroke:"#9cc3ff","stroke-opacity":"0.6",transform:"rotate(-24 16 16)"})]})}function rT({c:n}){const t=Nt(n.store,a=>a.focus),e=Nt(n.store,a=>a.note),i=Nt(n.store,a=>a.topicData),r=n.world.topics.find(a=>a.slug===t.topic),s=e?.title??i?.nodes.find(a=>a.id===t.note)?.title,o=[];if(o.push({label:"Overview",go:()=>n.focus({}),current:!t.topic}),r){const a=[];for(let l=n.world.topics.find(c=>c.slug===r.parent);l;l=n.world.topics.find(c=>c.slug===l.parent))a.unshift(l);for(const l of a)o.push({label:_e(l),color:l.color,go:()=>n.focus({topic:l.slug}),current:!1});o.push({label:_e(r),color:r.color,go:()=>n.focus({topic:r.slug}),current:!t.note})}return t.note&&o.push({label:s??"…",go:()=>{},current:!0}),v("nav",{class:"crumbs","aria-label":"Breadcrumb",children:o.map((a,l)=>v("span",{class:"crumb-wrap",children:[l>0&&v("span",{class:"crumb-sep",children:v(Te,{name:"chevron"})}),v("button",{class:`crumb${a.current?" current":""}`,onClick:a.go,"aria-current":a.current?"page":void 0,children:[a.color&&v(Oe,{color:a.color,size:7}),v("span",{children:a.label})]})]},l))})}function sT({c:n}){const t=Nt(n.store,c=>c.focus),e=Nt(n.store,c=>c.zoom),i=Nt(n.store,c=>c.note),r=n.world.topics.find(c=>c.slug===t.topic),s=t.note?2:t.topic?1:0,o=n.world.topics.filter(c=>!c.parent).length,a=[{level:0,name:"Overview",place:`${o} ${o===1?"topic":"topics"}`,go:()=>n.focus({})},{level:1,name:"Topic",place:r?_e(r):"",go:()=>r&&n.focus({topic:r.slug})},{level:2,name:"Note",place:t.note?i?.title??"":"",go:()=>{}}],l=Math.max(0,Math.min(1,e/2));return v("div",{class:"panel level-hud","aria-label":"Map level",children:[v("div",{class:"minimap-label",children:"ZOOM"}),v("div",{class:"level-track",children:[v("div",{class:"level-rail"}),v("div",{class:"level-marker",style:{top:`${l*100}%`}})]}),v("ol",{class:"level-rungs",children:a.map(c=>v("li",{class:`level-rung${c.level===s?" current":""}${c.level<s?" above":""}`,children:v("button",{disabled:c.level>=s,onClick:c.go,title:c.level<s?`Back to the ${c.name.toLowerCase()} level`:void 0,children:[v("span",{class:"level-name",children:c.name}),c.place&&c.level<=s&&v("span",{class:"level-place",children:c.place})]})},c.level))}),v("div",{class:"level-hint",children:s===0?"Scroll to zoom in":s===1?"Click a star to open a note":"Scroll out or press Esc to go back"})]})}function Ia(n,t){const e=t.focus,i=n.world.topics.find(r=>r.slug===e.topic);return e.note?{title:t.title??n.galaxy?.noteTitle(e.note)??"Note",kind:"note",color:i?.color,sub:i?.title}:i?{title:_e(i),kind:"topic",color:i.color}:{title:"Overview",kind:"overview"}}function oT({c:n}){const t=Nt(n.store,o=>o.trail),e=Nt(n.store,o=>o.historyOpen),i=$i(null);Si(()=>{if(!e)return;const o=a=>{i.current?.contains(a.target)||n.store.set({historyOpen:!1})};return document.addEventListener("pointerdown",o),()=>document.removeEventListener("pointerdown",o)},[e]);const r=t.entries[t.index-1],s=t.entries[t.index+1];return v("div",{class:"nav-buttons",ref:i,children:[v("button",{class:"icon-btn",disabled:!r,onClick:()=>n.back(),"aria-label":"Back",title:r?`Back to ${Ia(n,r).title} (${$r.join($r.history,"←")})`:"Back",children:v(Te,{name:"back"})}),v("button",{class:"icon-btn",disabled:!s,onClick:()=>n.forward(),"aria-label":"Forward",title:s?`Forward to ${Ia(n,s).title} (${$r.join($r.history,"→")})`:"Forward",children:v(Te,{name:"forward"})}),v("button",{class:`icon-btn${e?" on":""}`,disabled:t.entries.length<2,onClick:()=>n.store.set({historyOpen:!e}),"aria-label":"History","aria-expanded":e,title:"Everything opened in this tab",children:v(Te,{name:"history"})}),e&&v("div",{class:"panel history-pop",role:"menu","aria-label":"History",children:[v("div",{class:"section-title",children:"Opened in this tab"}),t.entries.map((o,a)=>({v:o,i:a})).reverse().map(({v:o,i:a})=>{const l=Ia(n,o);return v("button",{role:"menuitem",class:`row history-row${a===t.index?" current":""}`,onClick:()=>n.jump(a),children:[l.color?v(Oe,{color:l.color,size:7}):v("span",{class:"dot-space"}),v("span",{class:"row-title",children:l.title}),v("span",{class:"row-meta",children:l.sub??l.kind})]},`${a}${o.hash}`)})]})]})}function aT({c:n}){const t=n.world,e=Nt(n.store,i=>i.embedded);return v("header",{class:"topbar",children:[v("div",{class:"panel brand",children:[v(iT,{}),v("div",{class:"brand-text",children:[v("div",{class:"brand-name",children:t.brain}),v("div",{class:"brand-sub",children:["brain-wiki · ",t.profile==="owner"?"owner view":`as ${t.profile}`,e?" · exported":""]})]})]}),v("div",{class:"panel crumbs-panel",children:[v(oT,{c:n}),v(rT,{c:n})]}),v("button",{class:"panel search-btn",onClick:()=>n.store.set({paletteOpen:!0}),"aria-label":"Search",children:[v(Te,{name:"search"}),v("span",{children:"Search notes and topics"}),v(Xi,{children:"/"})]}),v("div",{class:"panel totals","aria-label":"Totals",children:[v("div",{children:[v("b",{children:be(t.totals.topics)}),v("span",{children:"topics"})]}),v("div",{children:[v("b",{children:be(t.totals.notes)}),v("span",{children:"notes"})]}),v("div",{children:[v("b",{children:be(t.totals.links)}),v("span",{children:"links"})]}),v("button",{class:`total${t.totals.flagged?" warn":""}`,onClick:()=>n.setNav("health"),title:"Notes with issues: open the Issues tab",children:[v("b",{children:be(t.totals.flagged)}),v("span",{children:"with issues"})]}),v("button",{class:"total gold",onClick:()=>n.select({kind:"inbox"}),title:"Session captures waiting for consolidation: ask your agent to consolidate",children:[v("b",{children:be(t.episodes.count)}),v("span",{children:"inbox"})]})]})]})}function lT({c:n}){const t=Nt(n.store,i=>i.layers),e=Nt(n.store,i=>i.health);return v("div",{class:"dock-wrap",children:v("div",{class:"panel dock",role:"toolbar","aria-label":"Layers",children:[v("div",{class:"dock-group",children:Wi.map(i=>v("button",{class:`layer fam${t[i]?" on":" off"}`,"aria-pressed":t[i],onClick:()=>n.setLayer(i,!t[i]),title:`${nT[i]} (${t[i]?"shown":"hidden"}; press ${Wi.indexOf(i)+1} to toggle)`,children:[v("span",{class:"swatch",style:t[i]?{background:He[i],boxShadow:`0 0 10px ${He[i]}`}:{borderColor:He[i]}}),v("span",{children:hc[i]})]},i))}),v("div",{class:"dock-sep"}),v("div",{class:"dock-group",children:[v("button",{class:`layer${e?" on health":""}`,"aria-pressed":e,onClick:()=>n.setHealth(!e),title:"Color the map by notes with issues (I)",children:[v(Te,{name:"health"})," ",v("span",{children:"Highlight issues"})]}),v(cT,{c:n}),v("button",{class:"layer",onClick:()=>n.store.set({helpOpen:!0}),title:"Shortcuts (?)","aria-label":"Shortcuts",children:v(Te,{name:"help"})})]})]})})}function cT({c:n}){const t=Nt(n.store,a=>a.labels),e=Nt(n.store,a=>a.quality),i=Nt(n.store,a=>a.qualityMode),[r,s]=rn(!1),o=$i(null);return Si(()=>{if(!r)return;const a=c=>{o.current?.contains(c.target)||s(!1)},l=c=>{c.key==="Escape"&&(c.stopPropagation(),s(!1))};return document.addEventListener("pointerdown",a),document.addEventListener("keydown",l,!0),()=>{document.removeEventListener("pointerdown",a),document.removeEventListener("keydown",l,!0)}},[r]),v("div",{class:"more",ref:o,children:[v("button",{class:`layer${r?" on":""}`,onClick:()=>s(!r),"aria-label":"More settings","aria-expanded":r,title:"More settings",children:v(Te,{name:"more"})}),r&&v("div",{class:"panel more-pop",role:"menu",children:[v("label",{class:"more-row",children:[v("input",{type:"checkbox",checked:t,onChange:()=>n.setLabels(!t)}),v("span",{children:"Labels"}),v(Xi,{children:"L"})]}),v("div",{class:"more-row graphics",children:[v("span",{children:"Graphics"}),v("div",{class:"seg",role:"radiogroup","aria-label":"Graphics",children:["auto","high","low"].map(a=>v("button",{role:"radio","aria-checked":i===a,class:i===a?"on":"",onClick:()=>n.setQualityMode(a),children:a==="auto"?"Auto":a==="high"?"High":"Low"},a))})]}),v("p",{class:"more-note",children:["Now ",e==="high"?"High: glow, vignette and grain":"Low: no glow, for slower GPUs",".",i==="auto"?" Auto measures your GPU after loading.":""]})]})]})}function uT({c:n,target:t,left:e,top:i}){const r=Mf[t.family],[s,o]=r.subject==="to"?[t.to,t.from]:[t.from,t.to],a=(l,c)=>{const h=n.world.topics.find(u=>u.slug===l.topic);return v("div",{class:"link-end",children:[v("div",{class:"hover-title",children:l.title}),v("div",{class:"hover-line",children:[v(Oe,{color:h?.color??"#9cc3ff",size:6})," ",h?.title??l.topic,c?` · ${c}`:""]})]})};return v("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[v("div",{class:"insp-kicker",children:[v("span",{class:"swatch",style:{background:He[t.family]}})," ",hc[t.family]]}),a(s,r.roles?.[0]),v("div",{class:"link-phrase",style:{color:He[t.family]},children:r.phrase}),a(o,r.roles?.[1]),v("div",{class:"hover-line link-hint",children:"Click to see where the link is written"})]})}function hT({c:n,target:t,left:e,top:i}){const r=c=>{const h=n.world.topics.find(u=>u.slug===c);return h?_e(h):c},s=n.store.state.focus,[o,a]=s.topic===t.b?[t.b,t.a]:[t.a,t.b],l=Object.entries(t.rels).sort((c,h)=>h[1]-c[1]).map(([c,h])=>`${h} ${Sf[c]??c.replace(/_/g," ")}`);return v("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[v("div",{class:"insp-kicker",children:"Links between topics"}),v("div",{class:"hover-title",children:[r(o)," ↔ ",r(a)]}),v("div",{class:"hover-line",children:[t.total," ",t.total===1?"link":"links",l.length?`: ${l.join(" · ")}`:""]}),v("div",{class:"hover-line link-hint",children:"Click to see these links"})]})}function dT({c:n}){const t=Nt(n.store,d=>d.hover),e=Nt(n.store,d=>d.topicData);if(!t)return null;const{target:i,x:r,y:s}=t;if(i.kind==="link"||i.kind==="flow"){const d=Math.min(window.innerWidth-310,r+18),g=Math.min(window.innerHeight-200,s+18);return i.kind==="link"?v(uT,{c:n,target:i,left:d,top:g}):v(hT,{c:n,target:i,left:d,top:g})}let o="",a="",l="#9cc3ff",c=[],h=[];if(i.kind==="topic"){const d=n.world.topics.find(_=>_.slug===i.slug);if(!d)return null;const g=n.world.topics.filter(_=>_.parent===d.slug).length;o=d.page?"Topic":"Topic without a topic page",a=_e(d),l=d.color,c=[`${d.notes} ${d.notes===1?"note":"notes"}${g?` · ${g} ${g===1?"sub-topic":"sub-topics"}`:""}${d.recent?` · ${d.recent} changed this week`:""}`,d.flagged?`${d.flagged} with issues`:"No issues"]}else if(i.kind==="note"){const d=n.world.topics.find(m=>m.slug===i.topic),_=(e?.slug===i.topic?e.nodes:void 0)?.find(m=>m.id===i.id);o=d?.title??"Note",l=d?.color??l,a=_?.title??"Note",_&&(c=[[_.kind==="topic"?"topic page":_.type,_.status!=="active"?_.status:null,`${_.degree} links`].filter(Boolean).join(" · ")],h=_.flags)}else o="Inbox",a=`${n.world.episodes.count} session captures`,l="#ffd88a",c=["Waiting to be merged into your notes automatically"];const u=Math.min(window.innerWidth-300,r+18),p=Math.min(window.innerHeight-140,s+18);return v("div",{class:"hovercard panel",style:{left:`${u}px`,top:`${p}px`},children:[v("div",{class:"insp-kicker",children:[v(Oe,{color:l,size:7})," ",o]}),v("div",{class:"hover-title",children:a}),c.map(d=>v("div",{class:"hover-line",children:d},d)),h.length>0&&v("div",{class:"hover-flags",children:h.map(d=>v("span",{style:{color:ji[d]},children:["● ",Io[d]]},d))})]})}function fT({b:n}){const[t,e]=n.keys;if(n.join==="pair"&&e&&t.length===e.length&&t.slice(0,-1).every((s,o)=>s===e[o]))return v("span",{class:"keys",children:[v("span",{class:"chord",children:t.map(s=>v(Xi,{children:s},s))}),v("span",{class:"keys-sep",children:"/"}),v(Xi,{children:e[e.length-1]})]});const r=n.join==="range"?"–":n.join==="or"?"or":"";return v("span",{class:"keys",children:n.keys.map((s,o)=>v(xe,{children:[o>0&&r&&v("span",{class:"keys-sep",children:r}),v("span",{class:"chord",children:s.map(a=>v(Xi,{children:a},a))})]},o))})}const pT=[{title:"Move",column:0},{title:"Show",column:1},{title:"Find",column:1}],mT=[["Click","zoom to a topic; open a note"],["Scroll","zoom toward the pointer"],["Drag","pan"],["Shift+drag","turn the view"],["Hover a line","see the two notes it joins; click to go to the other end"]];function gT({c:n}){const t=[0,1].map(e=>pT.filter(i=>i.column===e));return v("div",{class:"palette-scrim",onClick:e=>e.target===e.currentTarget&&n.store.set({helpOpen:!1}),children:v("div",{class:"panel help",role:"dialog","aria-label":"Shortcuts",children:[v("div",{class:"help-head",children:[v("h3",{children:"Shortcuts"}),v("button",{class:"icon-btn",onClick:()=>n.store.set({helpOpen:!1}),"aria-label":"Close",title:"Close (Esc)",children:v(Te,{name:"close"})})]}),v("div",{class:"help-cols",children:t.map((e,i)=>v("div",{class:"help-col",children:e.map(r=>v(xe,{children:[v("h4",{children:r.title}),Of.filter(s=>s.section===r.title).map(s=>v("div",{class:"help-row",children:[v(fT,{b:s}),v("span",{children:s.does})]},s.does))]},r.title))},i))}),v("section",{class:"help-section help-wide",children:[v("h4",{children:"Mouse"}),v("p",{class:"help-list",children:mT.map(([e,i],r)=>v(xe,{children:[r>0&&v("span",{class:"help-dot",children:" · "}),v("b",{children:e})," ",i]},e))})]}),v("section",{class:"help-section help-wide",children:[v("h4",{children:"Reading the map"}),v("p",{class:"help-list",children:"A topic is a folder: its topic page at the center, its notes as slices around it, clockwise by file name, wider and longer for longer notes, or as spiral arms when there are too many for one ring · each level of sub-folders sits on its own plane below, joined by a line to the topic above · brightness: how recently a note changed · a ring on a star: it has issues · pulses flow dependent → what it rests on (blue) and old → new (amber)"})]})]})})}function _T({c:n}){const t=$i(null),e=Nt(n.store,l=>l.paletteOpen),i=Nt(n.store,l=>l.helpOpen),r=Nt(n.store,l=>l.toast),s=Nt(n.store,l=>l.run),o=Nt(n.store,l=>l.health),a=Nt(n.store,l=>l.sceneError);return Si(()=>{t.current&&!n.galaxy&&n.mount(t.current);const l=c=>{const h=c.target,u=h.tagName==="INPUT"||h.tagName==="SELECT"||h.tagName==="TEXTAREA",p=eT(Of,c,u);p?.run&&(c.preventDefault(),u&&c.key==="Escape"&&h.blur(),p.run(n,c))};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[]),v("div",{class:"app",children:[v("div",{class:"stage",ref:t}),a&&v("div",{class:"panel scene-error",role:"alert",children:[v("h2",{children:"The 3D map could not start"}),v("p",{class:"scene-error-detail",children:a}),v("p",{children:["It needs WebGL2 with hardware acceleration. Turn on hardware acceleration in your browser settings, then check ",v("code",{children:"chrome://gpu"})," (or ",v("code",{children:"about:support"})," in Firefox) for WebGL2 marked hardware accelerated. Remote desktop sessions often have no GPU."]}),v("p",{children:"The topic list, search, and details panel still work."})]}),v(aT,{c:n}),v(Ab,{c:n}),v(jb,{c:n}),v(Bb,{c:n}),!a&&v(Qb,{c:n}),!a&&v(sT,{c:n}),v(lT,{c:n}),v(dT,{c:n}),s&&v("div",{class:"panel run-banner",children:[v("span",{class:"run-kind",children:s.kind})," ",s.at?new Date(s.at).toLocaleString():""," · ",s.touched.length," notes lit",v("button",{class:"link",onClick:()=>n.setRun(null),children:"Clear"})]}),o&&v("div",{class:"panel health-legend",role:"note","aria-label":"Issue highlight legend",children:[v("span",{children:"Fewest issues"}),v("span",{class:"health-ramp"}),v("span",{children:"Most issues"}),v("span",{class:"dock-sep"}),v("span",{class:"ring"})," ",v("span",{children:"note with issues"}),v("span",{class:"dock-sep"}),v(Xi,{children:"I"})," ",v("span",{children:"exit"})]}),e&&v(Jb,{c:n}),i&&v(gT,{c:n}),r&&v("div",{class:"panel toast",role:"status",children:r})]})}async function vT(){const n=document.getElementById("app"),t=document.createElement("div");t.className="boot",t.textContent="Charting your brain…",n.appendChild(t);try{const e=Qf(),i=await e.world();t.remove(),$f(v(_T,{c:new Cy(e,i)}),n)}catch(e){t.className="boot boot-error",t.textContent=xT(e)}}function xT(n){const t=n instanceof Error?n.message:String(n);return n instanceof TypeError?"Could not reach brain viz. Is `brain viz` still running?":/HTTP 40[13]\b/.test(t)?"This link's token is not valid. Open the link `brain viz` printed.":`Could not load the brain: ${t}`}vT();
