var So,he,Th,Ni,pc,wh,Ah,Ch,Dl,La,Da,Zr={},Rh=[],Sf=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Mo=Array.isArray;function Kn(n,t){for(var e in t)n[e]=t[e];return n}function Ul(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function Mf(n,t,e){var i,r,s,o={};for(s in t)s=="key"?i=t[s]:s=="ref"?r=t[s]:o[s]=t[s];if(arguments.length>2&&(o.children=arguments.length>3?So.call(arguments,2):e),typeof n=="function"&&n.defaultProps!=null)for(s in n.defaultProps)o[s]===void 0&&(o[s]=n.defaultProps[s]);return Ks(n,o,i,r,null)}function Ks(n,t,e,i,r){var s={type:n,props:t,key:e,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++Th,__i:-1,__u:0};return r==null&&he.vnode!=null&&he.vnode(s),s}function we(n){return n.children}function Qs(n,t){this.props=n,this.context=t}function yr(n,t){if(t==null)return n.__?yr(n.__,n.__i+1):null;for(var e;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null)return e.__e;return typeof n.type=="function"?yr(n):null}function Ph(n){var t,e;if((n=n.__)!=null&&n.__c!=null){for(n.__e=n.__c.base=null,t=0;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null){n.__e=n.__c.base=e.__e;break}return Ph(n)}}function mc(n){(!n.__d&&(n.__d=!0)&&Ni.push(n)&&!uo.__r++||pc!=he.debounceRendering)&&((pc=he.debounceRendering)||wh)(uo)}function uo(){for(var n,t,e,i,r,s,o,a=1;Ni.length;)Ni.length>a&&Ni.sort(Ah),n=Ni.shift(),a=Ni.length,n.__d&&(e=void 0,r=(i=(t=n).__v).__e,s=[],o=[],t.__P&&((e=Kn({},i)).__v=i.__v+1,he.vnode&&he.vnode(e),Il(t.__P,e,i,t.__n,t.__P.namespaceURI,32&i.__u?[r]:null,s,r??yr(i),!!(32&i.__u),o),e.__v=i.__v,e.__.__k[e.__i]=e,Uh(s,e,o),e.__e!=r&&Ph(e)));uo.__r=0}function Lh(n,t,e,i,r,s,o,a,l,c,h){var u,f,d,g,_,m,p=i&&i.__k||Rh,M=t.length;for(l=Ef(e,t,p,l,M),u=0;u<M;u++)(d=e.__k[u])!=null&&(f=d.__i==-1?Zr:p[d.__i]||Zr,d.__i=u,m=Il(n,d,f,r,s,o,a,l,c,h),g=d.__e,d.ref&&f.ref!=d.ref&&(f.ref&&Ol(f.ref,null,d),h.push(d.ref,d.__c||g,d)),_==null&&g!=null&&(_=g),4&d.__u||f.__k===d.__k?l=Dh(d,l,n):typeof d.type=="function"&&m!==void 0?l=m:g&&(l=g.nextSibling),d.__u&=-7);return e.__e=_,l}function Ef(n,t,e,i,r){var s,o,a,l,c,h=e.length,u=h,f=0;for(n.__k=new Array(r),s=0;s<r;s++)(o=t[s])!=null&&typeof o!="boolean"&&typeof o!="function"?(l=s+f,(o=n.__k[s]=typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?Ks(null,o,null,null,null):Mo(o)?Ks(we,{children:o},null,null,null):o.constructor==null&&o.__b>0?Ks(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,a=null,(c=o.__i=bf(o,e,l,u))!=-1&&(u--,(a=e[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(r>h?f--:r<h&&f++),typeof o.type!="function"&&(o.__u|=4)):c!=l&&(c==l-1?f--:c==l+1?f++:(c>l?f--:f++,o.__u|=4))):n.__k[s]=null;if(u)for(s=0;s<h;s++)(a=e[s])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=yr(a)),Oh(a,a));return i}function Dh(n,t,e){var i,r;if(typeof n.type=="function"){for(i=n.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=n,t=Dh(i[r],t,e));return t}n.__e!=t&&(t&&n.type&&!e.contains(t)&&(t=yr(n)),e.insertBefore(n.__e,t||null),t=n.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function bf(n,t,e,i){var r,s,o=n.key,a=n.type,l=t[e];if(l===null&&n.key==null||l&&o==l.key&&a==l.type&&(2&l.__u)==0)return e;if(i>(l!=null&&(2&l.__u)==0?1:0))for(r=e-1,s=e+1;r>=0||s<t.length;){if(r>=0){if((l=t[r])&&(2&l.__u)==0&&o==l.key&&a==l.type)return r;r--}if(s<t.length){if((l=t[s])&&(2&l.__u)==0&&o==l.key&&a==l.type)return s;s++}}return-1}function gc(n,t,e){t[0]=="-"?n.setProperty(t,e??""):n[t]=e==null?"":typeof e!="number"||Sf.test(t)?e:e+"px"}function cs(n,t,e,i,r){var s,o;t:if(t=="style")if(typeof e=="string")n.style.cssText=e;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(t in i)e&&t in e||gc(n.style,t,"");if(e)for(t in e)i&&e[t]==i[t]||gc(n.style,t,e[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(Ch,"$1")),o=t.toLowerCase(),t=o in n||t=="onFocusOut"||t=="onFocusIn"?o.slice(2):t.slice(2),n.l||(n.l={}),n.l[t+s]=e,e?i?e.u=i.u:(e.u=Dl,n.addEventListener(t,s?Da:La,s)):n.removeEventListener(t,s?Da:La,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in n)try{n[t]=e??"";break t}catch{}typeof e=="function"||(e==null||e===!1&&t[4]!="-"?n.removeAttribute(t):n.setAttribute(t,t=="popover"&&e==1?"":e))}}function _c(n){return function(t){if(this.l){var e=this.l[t.type+n];if(t.t==null)t.t=Dl++;else if(t.t<e.u)return;return e(he.event?he.event(t):t)}}}function Il(n,t,e,i,r,s,o,a,l,c){var h,u,f,d,g,_,m,p,M,y,S,C,E,A,U,T,x,R=t.type;if(t.constructor!=null)return null;128&e.__u&&(l=!!(32&e.__u),s=[a=t.__e=e.__e]),(h=he.__b)&&h(t);t:if(typeof R=="function")try{if(p=t.props,M="prototype"in R&&R.prototype.render,y=(h=R.contextType)&&i[h.__c],S=h?y?y.props.value:h.__:i,e.__c?m=(u=t.__c=e.__c).__=u.__E:(M?t.__c=u=new R(p,S):(t.__c=u=new Qs(p,S),u.constructor=R,u.render=wf),y&&y.sub(u),u.props=p,u.state||(u.state={}),u.context=S,u.__n=i,f=u.__d=!0,u.__h=[],u._sb=[]),M&&u.__s==null&&(u.__s=u.state),M&&R.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=Kn({},u.__s)),Kn(u.__s,R.getDerivedStateFromProps(p,u.__s))),d=u.props,g=u.state,u.__v=t,f)M&&R.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),M&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(M&&R.getDerivedStateFromProps==null&&p!==d&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(p,S),!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(p,u.__s,S)===!1||t.__v==e.__v){for(t.__v!=e.__v&&(u.props=p,u.state=u.__s,u.__d=!1),t.__e=e.__e,t.__k=e.__k,t.__k.some(function(O){O&&(O.__=t)}),C=0;C<u._sb.length;C++)u.__h.push(u._sb[C]);u._sb=[],u.__h.length&&o.push(u);break t}u.componentWillUpdate!=null&&u.componentWillUpdate(p,u.__s,S),M&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(d,g,_)})}if(u.context=S,u.props=p,u.__P=n,u.__e=!1,E=he.__r,A=0,M){for(u.state=u.__s,u.__d=!1,E&&E(t),h=u.render(u.props,u.state,u.context),U=0;U<u._sb.length;U++)u.__h.push(u._sb[U]);u._sb=[]}else do u.__d=!1,E&&E(t),h=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++A<25);u.state=u.__s,u.getChildContext!=null&&(i=Kn(Kn({},i),u.getChildContext())),M&&!f&&u.getSnapshotBeforeUpdate!=null&&(_=u.getSnapshotBeforeUpdate(d,g)),T=h,h!=null&&h.type===we&&h.key==null&&(T=Ih(h.props.children)),a=Lh(n,Mo(T)?T:[T],t,e,i,r,s,o,a,l,c),u.base=t.__e,t.__u&=-161,u.__h.length&&o.push(u),m&&(u.__E=u.__=null)}catch(O){if(t.__v=null,l||s!=null)if(O.then){for(t.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;s[s.indexOf(a)]=null,t.__e=a}else for(x=s.length;x--;)Ul(s[x]);else t.__e=e.__e,t.__k=e.__k;he.__e(O,t,e)}else s==null&&t.__v==e.__v?(t.__k=e.__k,t.__e=e.__e):a=t.__e=Tf(e.__e,t,e,i,r,s,o,l,c);return(h=he.diffed)&&h(t),128&t.__u?void 0:a}function Uh(n,t,e){for(var i=0;i<e.length;i++)Ol(e[i],e[++i],e[++i]);he.__c&&he.__c(t,n),n.some(function(r){try{n=r.__h,r.__h=[],n.some(function(s){s.call(r)})}catch(s){he.__e(s,r.__v)}})}function Ih(n){return typeof n!="object"||n==null||n.__b&&n.__b>0?n:Mo(n)?n.map(Ih):Kn({},n)}function Tf(n,t,e,i,r,s,o,a,l){var c,h,u,f,d,g,_,m=e.props,p=t.props,M=t.type;if(M=="svg"?r="http://www.w3.org/2000/svg":M=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(c=0;c<s.length;c++)if((d=s[c])&&"setAttribute"in d==!!M&&(M?d.localName==M:d.nodeType==3)){n=d,s[c]=null;break}}if(n==null){if(M==null)return document.createTextNode(p);n=document.createElementNS(r,M,p.is&&p),a&&(he.__m&&he.__m(t,s),a=!1),s=null}if(M==null)m===p||a&&n.data==p||(n.data=p);else{if(s=s&&So.call(n.childNodes),m=e.props||Zr,!a&&s!=null)for(m={},c=0;c<n.attributes.length;c++)m[(d=n.attributes[c]).name]=d.value;for(c in m)if(d=m[c],c!="children"){if(c=="dangerouslySetInnerHTML")u=d;else if(!(c in p)){if(c=="value"&&"defaultValue"in p||c=="checked"&&"defaultChecked"in p)continue;cs(n,c,null,d,r)}}for(c in p)d=p[c],c=="children"?f=d:c=="dangerouslySetInnerHTML"?h=d:c=="value"?g=d:c=="checked"?_=d:a&&typeof d!="function"||m[c]===d||cs(n,c,d,m[c],r);if(h)a||u&&(h.__html==u.__html||h.__html==n.innerHTML)||(n.innerHTML=h.__html),t.__k=[];else if(u&&(n.innerHTML=""),Lh(t.type=="template"?n.content:n,Mo(f)?f:[f],t,e,i,M=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,o,s?s[0]:e.__k&&yr(e,0),a,l),s!=null)for(c=s.length;c--;)Ul(s[c]);a||(c="value",M=="progress"&&g==null?n.removeAttribute("value"):g!=null&&(g!==n[c]||M=="progress"&&!g||M=="option"&&g!=m[c])&&cs(n,c,g,m[c],r),c="checked",_!=null&&_!=n[c]&&cs(n,c,_,m[c],r))}return n}function Ol(n,t,e){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&t==null||(n.__u=n(t))}else n.current=t}catch(r){he.__e(r,e)}}function Oh(n,t,e){var i,r;if(he.unmount&&he.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||Ol(i,null,t)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(s){he.__e(s,t)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&Oh(i[r],t,e||typeof n.type!="function");e||Ul(n.__e),n.__c=n.__=n.__e=void 0}function wf(n,t,e){return this.constructor(n,e)}function Af(n,t,e){var i,r,s,o;t==document&&(t=document.documentElement),he.__&&he.__(n,t),r=(i=!1)?null:t.__k,s=[],o=[],Il(t,n=t.__k=Mf(we,null,[n]),r||Zr,Zr,t.namespaceURI,r?null:t.firstChild?So.call(t.childNodes):null,s,r?r.__e:t.firstChild,i,o),Uh(s,n,o)}So=Rh.slice,he={__e:function(n,t,e,i){for(var r,s,o;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(n)),o=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(n,i||{}),o=r.__d),o)return r.__E=r}catch(a){n=a}throw n}},Th=0,Qs.prototype.setState=function(n,t){var e;e=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Kn({},this.state),typeof n=="function"&&(n=n(Kn({},e),this.props)),n&&Kn(e,n),n!=null&&this.__v&&(t&&this._sb.push(t),mc(this))},Qs.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),mc(this))},Qs.prototype.render=we,Ni=[],wh=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ah=function(n,t){return n.__v.__b-t.__v.__b},uo.__r=0,Ch=/(PointerCapture)$|Capture$/i,Dl=0,La=_c(!1),Da=_c(!0);var Cf=0;function v(n,t,e,i,r,s){t||(t={});var o,a,l=t;if("ref"in l)for(a in l={},t)a=="ref"?o=t[a]:l[a]=t[a];var c={type:n,props:l,key:e,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Cf,__i:-1,__u:0,__source:r,__self:s};if(typeof n=="function"&&(o=n.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return he.vnode&&he.vnode(c),c}class Rf{constructor(t){this.token=t}embedded=!1;topics=new Map;async get(t){const e=t.includes("?")?"&":"?",i=this.token?`${t}${e}t=${encodeURIComponent(this.token)}`:t,r=await fetch(i,{credentials:"same-origin"});if(r.status===404)return null;if(!r.ok)throw new Error(`${t}: HTTP ${r.status}`);return await r.json()}async world(){const t=await this.get("/api/world");if(!t)throw new Error("no world");return t}topic(t){let e=this.topics.get(t);return e||(e=this.get(`/api/topic/${encodeURIComponent(t)}`),this.topics.set(t,e),e.catch(()=>this.topics.delete(t))),e}note(t){return this.get(`/api/note/${encodeURIComponent(t)}`)}async search(t){return t.trim()?(await this.get(`/api/search?q=${encodeURIComponent(t)}`))?.results??[]:[]}async health(){return await this.get("/api/health")??{counts:{},items:{}}}}class Pf{constructor(t){this.data=t}embedded=!0;async world(){return this.data.world}async topic(t){return this.data.topics[t]??null}async note(t){for(const e of Object.values(this.data.topics)){const i=e.nodes.find(r=>r.id===t);if(i)return{id:i.id,title:i.title,path:i.path,kind:i.kind,type:i.type,status:i.status,topic:i.topic,updated:i.updated,partial:!0}}return null}async search(t){const e=t.trim().toLowerCase();if(!e)return[];const i=[];for(const r of Object.values(this.data.topics))for(const s of r.nodes)if([s.title,...s.aliases].map(a=>a.toLowerCase()).some(a=>a.includes(e))&&(i.push({id:s.id,title:s.title,topic:s.topic,kind:s.kind}),i.length>=20))return i;return i}async health(){return this.data.health}}function Lf(){const n=document.getElementById("brain-data");if(n?.textContent)return new Pf(JSON.parse(n.textContent));const t=new URL(window.location.href);let e=t.searchParams.get("t");return e?(sessionStorage.setItem("brain-viz-token",e),t.searchParams.delete("t"),history.replaceState(history.state,"",t.pathname+t.search+t.hash)):e=sessionStorage.getItem("brain-viz-token"),new Rf(e)}const vc=100;class Df{entries;index;constructor(t){this.entries=t?.entries??[],this.index=t?Math.max(0,Math.min(t.index,this.entries.length-1)):-1}get current(){return this.entries[this.index]}visit(t){return this.current?.hash===t.hash?this.index:(this.entries=[...this.entries.slice(0,this.index+1),t],this.entries.length>vc&&(this.entries=this.entries.slice(this.entries.length-vc)),this.index=this.entries.length-1,this.index)}replace(t){return this.index<0?this.visit(t):(this.entries=this.entries.map((e,i)=>i===this.index?t:e),this.index)}moveTo(t){if(!(t<0||t>=this.entries.length))return this.index=t,this.current}setTitle(t,e){let i=!1;return this.entries=this.entries.map(r=>r.hash!==t||r.title===e?r:(i=!0,{...r,title:e})),i}get canBack(){return this.index>0}get canForward(){return this.index<this.entries.length-1}state(){return{entries:this.entries,index:this.index}}}const Uf=70,If=50,Of=16;function us(n,t,e,i){return t<=n?1/0:n/t*(e/2)/Math.tan(i*Math.PI/360)}function Ff(n,t,e=Of){const i=n.filter(r=>r.visible&&r.px>=(t.has(r.slug)?If:Uf)).sort((r,s)=>s.px-r.px||r.slug.localeCompare(s.slug));return new Set(i.slice(0,e).map(r=>r.slug))}function Fh(n){const t=new Float32Array(n.length),e=n.map(r=>r.flagged/Math.max(1,r.notes)),i=n.map((r,s)=>s).filter(r=>n[r].flagged>0).sort((r,s)=>e[r]-e[s]||r-s);return i.forEach((r,s)=>{t[r]=i.length===1?1:.15+.85*(s/(i.length-1))}),t}function Ua(n){return n.note?"note":n.topic?"topic":"overview"}function Wn(n){return n.note&&n.topic?`#/t/${encodeURIComponent(n.topic)}/n/${encodeURIComponent(n.note)}`:n.topic?`#/t/${encodeURIComponent(n.topic)}`:"#/"}function Nf(n){let t;try{t=n.replace(/^#\/?/,"").split("/").filter(Boolean).map(decodeURIComponent)}catch{return{}}if(t[0]==="t"&&t[1]){const e={topic:t[1]};return t[2]==="n"&&t[3]&&(e.note=t[3]),e}return{}}const xc=.3,yc=.2;function kf(n,t){const e=a=>t.chain.findIndex(l=>l.slug===a);let i=-1;t.chain.forEach((a,l)=>{a.size>=xc&&(i=l)});const r=t.chain[t.chain.length-1],s=Math.min(1,(r?.size??0)/xc)*.9;if(n.topic&&t.focusTopicSize>=yc){const a=e(n.topic);if(a>=0&&i<=a||i<0)return{focus:n,progress:n.note?2:1}}if(i>=0)return{focus:{topic:t.chain[i].slug},progress:1};const o=e(n.topic);for(let a=o-1;a>=0;a--)if(t.chain[a].size>=yc)return{focus:{topic:t.chain[a].slug},progress:1};return{focus:{},progress:s}}const zf=1664525,Bf=1013904223,Sc=4294967296;function Hf(){let n=1;return()=>(n=(zf*n+Bf)%Sc)/Sc}function Vf(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Gf(n,t){let e=n.length,i,r;for(;e;)r=t()*e--|0,i=n[e],n[e]=n[r],n[r]=i;return n}function Wf(n,t){for(var e=0,i=(n=Gf(Array.from(n),t)).length,r=[],s,o;e<i;)s=n[e],o&&Nh(o,s)?++e:(o=qf(r=Xf(r,s)),e=0);return o}function Xf(n,t){var e,i;if(Do(t,n))return[t];for(e=0;e<n.length;++e)if(hs(t,n[e])&&Do(Gr(n[e],t),n))return[n[e],t];for(e=0;e<n.length-1;++e)for(i=e+1;i<n.length;++i)if(hs(Gr(n[e],n[i]),t)&&hs(Gr(n[e],t),n[i])&&hs(Gr(n[i],t),n[e])&&Do(kh(n[e],n[i],t),n))return[n[e],n[i],t];throw new Error}function hs(n,t){var e=n.r-t.r,i=t.x-n.x,r=t.y-n.y;return e<0||e*e<i*i+r*r}function Nh(n,t){var e=n.r-t.r+Math.max(n.r,t.r,1)*1e-9,i=t.x-n.x,r=t.y-n.y;return e>0&&e*e>i*i+r*r}function Do(n,t){for(var e=0;e<t.length;++e)if(!Nh(n,t[e]))return!1;return!0}function qf(n){switch(n.length){case 1:return Yf(n[0]);case 2:return Gr(n[0],n[1]);case 3:return kh(n[0],n[1],n[2])}}function Yf(n){return{x:n.x,y:n.y,r:n.r}}function Gr(n,t){var e=n.x,i=n.y,r=n.r,s=t.x,o=t.y,a=t.r,l=s-e,c=o-i,h=a-r,u=Math.sqrt(l*l+c*c);return{x:(e+s+l/u*h)/2,y:(i+o+c/u*h)/2,r:(u+r+a)/2}}function kh(n,t,e){var i=n.x,r=n.y,s=n.r,o=t.x,a=t.y,l=t.r,c=e.x,h=e.y,u=e.r,f=i-o,d=i-c,g=r-a,_=r-h,m=l-s,p=u-s,M=i*i+r*r-s*s,y=M-o*o-a*a+l*l,S=M-c*c-h*h+u*u,C=d*g-f*_,E=(g*S-_*y)/(C*2)-i,A=(_*m-g*p)/C,U=(d*y-f*S)/(C*2)-r,T=(f*p-d*m)/C,x=A*A+T*T-1,R=2*(s+E*A+U*T),O=E*E+U*U-s*s,N=-(Math.abs(x)>1e-6?(R+Math.sqrt(R*R-4*x*O))/(2*x):O/R);return{x:i+E+A*N,y:r+U+T*N,r:N}}function Mc(n,t,e){var i=n.x-t.x,r,s,o=n.y-t.y,a,l,c=i*i+o*o;c?(s=t.r+e.r,s*=s,l=n.r+e.r,l*=l,s>l?(r=(c+l-s)/(2*c),a=Math.sqrt(Math.max(0,l/c-r*r)),e.x=n.x-r*i-a*o,e.y=n.y-r*o+a*i):(r=(c+s-l)/(2*c),a=Math.sqrt(Math.max(0,s/c-r*r)),e.x=t.x+r*i-a*o,e.y=t.y+r*o+a*i)):(e.x=t.x+e.r,e.y=t.y)}function Ec(n,t){var e=n.r+t.r-1e-6,i=t.x-n.x,r=t.y-n.y;return e>0&&e*e>i*i+r*r}function bc(n){var t=n._,e=n.next._,i=t.r+e.r,r=(t.x*e.r+e.x*t.r)/i,s=(t.y*e.r+e.y*t.r)/i;return r*r+s*s}function ds(n){this._=n,this.next=null,this.previous=null}function $f(n,t){if(!(s=(n=Vf(n)).length))return 0;var e,i,r,s,o,a,l,c,h,u,f;if(e=n[0],e.x=0,e.y=0,!(s>1))return e.r;if(i=n[1],e.x=-i.r,i.x=e.r,i.y=0,!(s>2))return e.r+i.r;Mc(i,e,r=n[2]),e=new ds(e),i=new ds(i),r=new ds(r),e.next=r.previous=i,i.next=e.previous=r,r.next=i.previous=e;t:for(l=3;l<s;++l){Mc(e._,i._,r=n[l]),r=new ds(r),c=i.next,h=e.previous,u=i._.r,f=e._.r;do if(u<=f){if(Ec(c._,r._)){i=c,e.next=i,i.previous=e,--l;continue t}u+=c._.r,c=c.next}else{if(Ec(h._,r._)){e=h,e.next=i,i.previous=e,--l;continue t}f+=h._.r,h=h.previous}while(c!==h.next);for(r.previous=e,r.next=i,e.next=i.previous=i=r,o=bc(e);(r=r.next)!==i;)(a=bc(r))<o&&(e=r,o=a);i=e.next}for(e=[i._],r=i;(r=r.next)!==i;)e.push(r._);for(r=Wf(e,t),l=0;l<s;++l)e=n[l],e.x-=r.x,e.y-=r.y;return r.r}function Zf(n){return $f(n,Hf()),n}const Ia=50*Math.PI/180,jf=[0,Math.cos(Ia),Math.sin(Ia)],fs=1e3,Tc=.75;function Kf(n){return-60*(1-Tc**n)/(1-Tc)}const mr=(n,t)=>n.localeCompare(t,void 0,{sensitivity:"base",numeric:!0}),Qf=900,Jf=10;function tp(n,t){const e=new Map,i=new Set(n.map(d=>d.slug));for(const d of n){const g=d.parent&&i.has(d.parent)?d.parent:null;e.set(g,[...e.get(g)??[],d])}const r=new Map,s=new Map,o=new Map,a=d=>{const g=(e.get(d)??[]).map(M=>{o.set(M.slug,Math.sqrt(M.chars+Qf));const y=a(M.slug);return s.set(M.slug,y),{t:M,r:y}});g.sort((M,y)=>y.r-M.r||mr(M.t.name,y.t.name)||M.t.slug.localeCompare(y.t.slug));const _=g.map(({t:M,r:y})=>({r:y+Jf,x:0,y:0,slug:M.slug})),m=d===null?0:o.get(d);if(!_.length)return m;Zf(_);let p=0;for(const M of _)r.set(M.slug,{x:M.x,y:M.y}),p=Math.max(p,Math.hypot(M.x,M.y)+M.r);return Math.hypot(m,p)},l=a(null)||1,c=fs/l,h={topics:new Map,inbox:{x:0,y:0,z:0,r:0},radius:fs},u=(d,g,_)=>{for(const m of e.get(d)??[]){const p=r.get(m.slug),M=g+p.x*c,y=_+p.y*c,S=m.depth??0;h.topics.set(m.slug,{x:M,y:Kf(S),z:y,r:s.get(m.slug)*c,ring:o.get(m.slug)*c,depth:S}),u(m.slug,M,y)}};u(null,0,0);const f=Math.min(70,24+3*Math.sqrt(t));return h.inbox={x:fs+f+80,y:0,z:fs*.35,r:f},h}const wc=60,ep=48,np=1.4*Math.PI/180,Ac=.22,Cc=1,ip=.18;function zh(n,t){return[Math.sin(n)*t,-Math.cos(n)*t]}function Rc(n){return n.path.slice(n.path.lastIndexOf("/")+1).replace(/\.md$/i,"")}function Bh(n,t){const e=n.nodes.find(p=>p.id===n.page&&p.kind!=="episode"),i=n.nodes.filter(p=>p.kind!=="episode"&&p.id!==n.page).sort((p,M)=>mr(Rc(p),Rc(M))||p.path.localeCompare(M.path)),r=i.map(p=>Math.max(wc,p.chars??0)),s=r.reduce((p,M)=>p+M,0),o=Math.max(wc,...r),a=r.map(p=>Math.max(2*Math.PI/ep,2*Math.PI*p/s)),l=[];let c=1/0;a.forEach((p,M)=>{c+p>2*Math.PI+1e-9&&(l.push([]),c=0),l[l.length-1].push(M),c+=p});const h=[],u=[];l.forEach((p,M)=>{const y=p.reduce((A,U)=>A+a[U],0),S=M<l.length-1?2*Math.PI/y:1,C=Ac+M*(Cc+ip);let E=0;for(const A of p){const U=a[A]*S,T=Math.min(np,U*.3),x=C+Cc*(.14+.86*Math.sqrt(r[A]/o));h.push({id:i[A].id,a0:E+T/2,a1:E+U-T/2,r0:C,r1:x}),u.push(zh(E+U/2,x)),E+=U}});const f=Math.max(Ac,...h.map(p=>p.r1)),d=t/f;for(const p of h)p.r0*=d,p.r1*=d;const g=[...e?[e.id]:[],...h.map(p=>p.id)],_=new Float32Array(g.length*3),m=e?1:0;return u.forEach(([p,M],y)=>_.set([p*d,0,M*d],(y+m)*3)),{ids:g,positions:_,slices:h,rings:l.length}}function Uo(n,t){if(n.note&&n.topic)return{topic:n.topic};if(n.topic){const e=t.topics.find(i=>i.slug===n.topic)?.parent;return e&&t.topics.some(i=>i.slug===e)?{topic:e}:{}}return null}function Pc(n,t,e){if(n.note)return[];const i=t.topics.filter(r=>n.topic?r.parent===n.topic:!r.parent||!t.topics.some(s=>s.slug===r.parent)).sort((r,s)=>s.tree_chars-r.tree_chars||r.title.localeCompare(s.title)).map(r=>({topic:r.slug}));return!n.topic||!e||e.slug!==n.topic?i:[...i,...Bh(e,1).ids.map(r=>({topic:n.topic,note:r}))]}/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */const xe={LEFT:1,RIGHT:2,MIDDLE:4},Y=Object.freeze({NONE:0,ROTATE:1,TRUCK:2,SCREEN_PAN:4,OFFSET:8,DOLLY:16,ZOOM:32,TOUCH_ROTATE:64,TOUCH_TRUCK:128,TOUCH_SCREEN_PAN:256,TOUCH_OFFSET:512,TOUCH_DOLLY:1024,TOUCH_ZOOM:2048,TOUCH_DOLLY_TRUCK:4096,TOUCH_DOLLY_SCREEN_PAN:8192,TOUCH_DOLLY_OFFSET:16384,TOUCH_DOLLY_ROTATE:32768,TOUCH_ZOOM_TRUCK:65536,TOUCH_ZOOM_OFFSET:131072,TOUCH_ZOOM_SCREEN_PAN:262144,TOUCH_ZOOM_ROTATE:524288}),ji={NONE:0,IN:1,OUT:-1};function wi(n){return n.isPerspectiveCamera}function pi(n){return n.isOrthographicCamera}const Ki=Math.PI*2,Lc=Math.PI/2,Hh=1e-5,Dr=Math.PI/180;function Cn(n,t,e){return Math.max(t,Math.min(e,n))}function pe(n,t=Hh){return Math.abs(n)<t}function ie(n,t,e=Hh){return pe(n-t,e)}function Dc(n,t){return Math.round(n/t)*t}function Ur(n){return isFinite(n)?n:n<0?-Number.MAX_VALUE:Number.MAX_VALUE}function Ir(n){return Math.abs(n)<Number.MAX_VALUE?n:n*(1/0)}function ps(n,t,e,i,r=1/0,s){i=Math.max(1e-4,i);const o=2/i,a=o*s,l=1/(1+a+.48*a*a+.235*a*a*a);let c=n-t;const h=t,u=r*i;c=Cn(c,-u,u),t=n-c;const f=(e.value+o*c)*s;e.value=(e.value-o*f)*l;let d=t+(c+f)*l;return h-n>0==d>h&&(d=h,e.value=(d-h)/s),d}function Uc(n,t,e,i,r=1/0,s,o){i=Math.max(1e-4,i);const a=2/i,l=a*s,c=1/(1+l+.48*l*l+.235*l*l*l);let h=t.x,u=t.y,f=t.z,d=n.x-h,g=n.y-u,_=n.z-f;const m=h,p=u,M=f,y=r*i,S=y*y,C=d*d+g*g+_*_;if(C>S){const X=Math.sqrt(C);d=d/X*y,g=g/X*y,_=_/X*y}h=n.x-d,u=n.y-g,f=n.z-_;const E=(e.x+a*d)*s,A=(e.y+a*g)*s,U=(e.z+a*_)*s;e.x=(e.x-a*E)*c,e.y=(e.y-a*A)*c,e.z=(e.z-a*U)*c,o.x=h+(d+E)*c,o.y=u+(g+A)*c,o.z=f+(_+U)*c;const T=m-n.x,x=p-n.y,R=M-n.z,O=o.x-m,N=o.y-p,W=o.z-M;return T*O+x*N+R*W>0&&(o.x=m,o.y=p,o.z=M,e.x=(o.x-m)/s,e.y=(o.y-p)/s,e.z=(o.z-M)/s),o}function Io(n,t){t.set(0,0),n.forEach(e=>{t.x+=e.clientX,t.y+=e.clientY}),t.x/=n.length,t.y/=n.length}function Oo(n,t){return pi(n)?(console.warn(`${t} is not supported in OrthographicCamera`),!0):!1}let rp=class{constructor(){this._listeners={}}addEventListener(t,e){const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}removeAllEventListeners(t){if(!t){this._listeners={};return}Array.isArray(this._listeners[t])&&(this._listeners[t].length=0)}dispatchEvent(t){const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t)}}};var Fo;const sp="2.10.1",ms=1/8,op=/Mac/.test((Fo=globalThis?.navigator)===null||Fo===void 0?void 0:Fo.platform);let Ot,Ic,gs,No,Ke,Ht,ee,Qi,Or,On,Fn,Ai,Oc,Fc,mn,Fr,Ji,Nc,ko,kc,zo,Bo,_s;class tn extends rp{static install(t){Ot=t.THREE,Ic=Object.freeze(new Ot.Vector3(0,0,0)),gs=Object.freeze(new Ot.Vector3(0,1,0)),No=Object.freeze(new Ot.Vector3(0,0,1)),Ke=new Ot.Vector2,Ht=new Ot.Vector3,ee=new Ot.Vector3,Qi=new Ot.Vector3,Or=new Ot.Vector3,On=new Ot.Vector3,Fn=new Ot.Vector3,Ai=new Ot.Vector3,Oc=new Ot.Vector3,Fc=new Ot.Vector3,mn=new Ot.Spherical,Fr=new Ot.Spherical,Ji=new Ot.Box3,Nc=new Ot.Box3,ko=new Ot.Sphere,kc=new Ot.Quaternion,zo=new Ot.Quaternion,Bo=new Ot.Matrix4,_s=new Ot.Raycaster}static get ACTION(){return Y}set verticalDragToForward(t){console.warn("camera-controls: `verticalDragToForward` was removed. Use `mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.")}constructor(t,e){super(),this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.minDistance=Number.EPSILON,this.maxDistance=1/0,this.infinityDolly=!1,this.minZoom=.01,this.maxZoom=1/0,this.smoothTime=.25,this.draggingSmoothTime=.125,this.maxSpeed=1/0,this.azimuthRotateSpeed=1,this.polarRotateSpeed=1,this.dollySpeed=1,this.dollyDragInverted=!1,this.truckSpeed=2,this.dollyToCursor=!1,this.dragToOffset=!1,this.boundaryFriction=0,this.restThreshold=.01,this.colliderMeshes=[],this.cancel=()=>{},this._enabled=!0,this._state=Y.NONE,this._viewport=null,this._changedDolly=0,this._changedZoom=0,this._hasRested=!0,this._boundaryEnclosesCamera=!1,this._needsUpdate=!0,this._updatedLastTime=!1,this._elementRect=new DOMRect,this._isDragging=!1,this._dragNeedsUpdate=!0,this._activePointers=[],this._lockedPointer=null,this._interactiveArea=new DOMRect(0,0,1,1),this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._isUserControllingOffset=!1,this._isUserControllingZoom=!1,this._lastDollyDirection=ji.NONE,this._thetaVelocity={value:0},this._phiVelocity={value:0},this._radiusVelocity={value:0},this._targetVelocity=new Ot.Vector3,this._focalOffsetVelocity=new Ot.Vector3,this._zoomVelocity={value:0},this._truckInternal=(p,M,y,S)=>{let C,E;if(wi(this._camera)){const A=Ht.copy(this._camera.position).sub(this._target),U=this._camera.getEffectiveFOV()*Dr,T=A.length()*Math.tan(U*.5);C=this.truckSpeed*p*T/this._elementRect.height,E=this.truckSpeed*M*T/this._elementRect.height}else if(pi(this._camera)){const A=this._camera;C=this.truckSpeed*p*(A.right-A.left)/A.zoom/this._elementRect.width,E=this.truckSpeed*M*(A.top-A.bottom)/A.zoom/this._elementRect.height}else return;S?(y?this.setFocalOffset(this._focalOffsetEnd.x+C,this._focalOffsetEnd.y,this._focalOffsetEnd.z,!0):this.truck(C,0,!0),this.forward(-E,!0)):y?this.setFocalOffset(this._focalOffsetEnd.x+C,this._focalOffsetEnd.y+E,this._focalOffsetEnd.z,!0):this.truck(C,E,!0)},this._rotateInternal=(p,M)=>{const y=Ki*this.azimuthRotateSpeed*p/this._elementRect.height,S=Ki*this.polarRotateSpeed*M/this._elementRect.height;this.rotate(y,S,!0)},this._dollyInternal=(p,M,y)=>{const S=Math.pow(.95,-p*this.dollySpeed),C=this._sphericalEnd.radius,E=this._sphericalEnd.radius*S,A=Cn(E,this.minDistance,this.maxDistance),U=A-E;this.infinityDolly&&this.dollyToCursor?this._dollyToNoClamp(E,!0):this.infinityDolly&&!this.dollyToCursor?(this.dollyInFixed(U,!0),this._dollyToNoClamp(A,!0)):this._dollyToNoClamp(A,!0),this.dollyToCursor&&(this._changedDolly+=(this.infinityDolly?E:A)-C,this._dollyControlCoord.set(M,y)),this._lastDollyDirection=Math.sign(-p)},this._zoomInternal=(p,M,y)=>{const S=Math.pow(.95,p*this.dollySpeed),C=this._zoom,E=this._zoom*S;this.zoomTo(E,!0),this.dollyToCursor&&(this._changedZoom+=E-C,this._dollyControlCoord.set(M,y))},typeof Ot>"u"&&console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."),this._camera=t,this._yAxisUpSpace=new Ot.Quaternion().setFromUnitVectors(this._camera.up,gs),this._yAxisUpSpaceInverse=this._yAxisUpSpace.clone().invert(),this._state=Y.NONE,this._target=new Ot.Vector3,this._targetEnd=this._target.clone(),this._focalOffset=new Ot.Vector3,this._focalOffsetEnd=this._focalOffset.clone(),this._spherical=new Ot.Spherical().setFromVector3(Ht.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)),this._sphericalEnd=this._spherical.clone(),this._lastDistance=this._spherical.radius,this._zoom=this._camera.zoom,this._zoomEnd=this._zoom,this._lastZoom=this._zoom,this._nearPlaneCorners=[new Ot.Vector3,new Ot.Vector3,new Ot.Vector3,new Ot.Vector3],this._updateNearPlaneCorners(),this._boundary=new Ot.Box3(new Ot.Vector3(-1/0,-1/0,-1/0),new Ot.Vector3(1/0,1/0,1/0)),this._cameraUp0=this._camera.up.clone(),this._target0=this._target.clone(),this._position0=this._camera.position.clone(),this._zoom0=this._zoom,this._focalOffset0=this._focalOffset.clone(),this._dollyControlCoord=new Ot.Vector2,this.mouseButtons={left:Y.ROTATE,middle:Y.DOLLY,right:Y.TRUCK,wheel:wi(this._camera)?Y.DOLLY:pi(this._camera)?Y.ZOOM:Y.NONE},this.touches={one:Y.TOUCH_ROTATE,two:wi(this._camera)?Y.TOUCH_DOLLY_TRUCK:pi(this._camera)?Y.TOUCH_ZOOM_TRUCK:Y.NONE,three:Y.TOUCH_TRUCK};const i=new Ot.Vector2,r=new Ot.Vector2,s=new Ot.Vector2,o=p=>{if(!this._enabled||!this._domElement)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const S=this._domElement.getBoundingClientRect(),C=p.clientX/S.width,E=p.clientY/S.height;if(C<this._interactiveArea.left||C>this._interactiveArea.right||E<this._interactiveArea.top||E>this._interactiveArea.bottom)return}const M=p.pointerType!=="mouse"?null:(p.buttons&xe.LEFT)===xe.LEFT?xe.LEFT:(p.buttons&xe.MIDDLE)===xe.MIDDLE?xe.MIDDLE:(p.buttons&xe.RIGHT)===xe.RIGHT?xe.RIGHT:null;if(M!==null){const S=this._findPointerByMouseButton(M);S&&this._disposePointer(S)}if((p.buttons&xe.LEFT)===xe.LEFT&&this._lockedPointer)return;const y={pointerId:p.pointerId,clientX:p.clientX,clientY:p.clientY,deltaX:0,deltaY:0,mouseButton:M};this._activePointers.push(y),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),this._isDragging=!0,f(p)},a=p=>{p.cancelable&&p.preventDefault();const M=p.pointerId,y=this._lockedPointer||this._findPointerById(M);if(y){if(y.clientX=p.clientX,y.clientY=p.clientY,y.deltaX=p.movementX,y.deltaY=p.movementY,this._state=0,p.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else(!this._isDragging&&this._lockedPointer||this._isDragging&&(p.buttons&xe.LEFT)===xe.LEFT)&&(this._state=this._state|this.mouseButtons.left),this._isDragging&&(p.buttons&xe.MIDDLE)===xe.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),this._isDragging&&(p.buttons&xe.RIGHT)===xe.RIGHT&&(this._state=this._state|this.mouseButtons.right);d()}},l=p=>{const M=this._findPointerById(p.pointerId);if(!(M&&M===this._lockedPointer)){if(M&&this._disposePointer(M),p.pointerType==="touch")switch(this._activePointers.length){case 0:this._state=Y.NONE;break;case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else this._state=Y.NONE;g()}};let c=-1;const h=p=>{if(!this._domElement||!this._enabled||this.mouseButtons.wheel===Y.NONE)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const E=this._domElement.getBoundingClientRect(),A=p.clientX/E.width,U=p.clientY/E.height;if(A<this._interactiveArea.left||A>this._interactiveArea.right||U<this._interactiveArea.top||U>this._interactiveArea.bottom)return}if(p.preventDefault(),this.dollyToCursor||this.mouseButtons.wheel===Y.ROTATE||this.mouseButtons.wheel===Y.TRUCK){const E=performance.now();c-E<1e3&&this._getClientRect(this._elementRect),c=E}const M=op?-1:-3,y=p.deltaMode===1||p.ctrlKey?p.deltaY/M:p.deltaY/(M*10),S=this.dollyToCursor?(p.clientX-this._elementRect.x)/this._elementRect.width*2-1:0,C=this.dollyToCursor?(p.clientY-this._elementRect.y)/this._elementRect.height*-2+1:0;switch(this.mouseButtons.wheel){case Y.ROTATE:{this._rotateInternal(p.deltaX,p.deltaY),this._isUserControllingRotate=!0;break}case Y.TRUCK:{this._truckInternal(p.deltaX,p.deltaY,!1,!1),this._isUserControllingTruck=!0;break}case Y.SCREEN_PAN:{this._truckInternal(p.deltaX,p.deltaY,!1,!0),this._isUserControllingTruck=!0;break}case Y.OFFSET:{this._truckInternal(p.deltaX,p.deltaY,!0,!1),this._isUserControllingOffset=!0;break}case Y.DOLLY:{this._dollyInternal(-y,S,C),this._isUserControllingDolly=!0;break}case Y.ZOOM:{this._zoomInternal(-y,S,C),this._isUserControllingZoom=!0;break}}this.dispatchEvent({type:"control"})},u=p=>{if(!(!this._domElement||!this._enabled)){if(this.mouseButtons.right===tn.ACTION.NONE){const M=p instanceof PointerEvent?p.pointerId:0,y=this._findPointerById(M);y&&this._disposePointer(y),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l);return}p.preventDefault()}},f=p=>{if(!this._enabled)return;if(Io(this._activePointers,Ke),this._getClientRect(this._elementRect),i.copy(Ke),r.copy(Ke),this._activePointers.length>=2){const y=Ke.x-this._activePointers[1].clientX,S=Ke.y-this._activePointers[1].clientY,C=Math.sqrt(y*y+S*S);s.set(0,C);const E=(this._activePointers[0].clientX+this._activePointers[1].clientX)*.5,A=(this._activePointers[0].clientY+this._activePointers[1].clientY)*.5;r.set(E,A)}if(this._state=0,!p)this._lockedPointer&&(this._state=this._state|this.mouseButtons.left);else if("pointerType"in p&&p.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else!this._lockedPointer&&(p.buttons&xe.LEFT)===xe.LEFT&&(this._state=this._state|this.mouseButtons.left),(p.buttons&xe.MIDDLE)===xe.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),(p.buttons&xe.RIGHT)===xe.RIGHT&&(this._state=this._state|this.mouseButtons.right);((this._state&Y.ROTATE)===Y.ROTATE||(this._state&Y.TOUCH_ROTATE)===Y.TOUCH_ROTATE||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE)&&(this._sphericalEnd.theta=this._spherical.theta,this._sphericalEnd.phi=this._spherical.phi,this._thetaVelocity.value=0,this._phiVelocity.value=0),((this._state&Y.TRUCK)===Y.TRUCK||(this._state&Y.SCREEN_PAN)===Y.SCREEN_PAN||(this._state&Y.TOUCH_TRUCK)===Y.TOUCH_TRUCK||(this._state&Y.TOUCH_SCREEN_PAN)===Y.TOUCH_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN)&&(this._targetEnd.copy(this._target),this._targetVelocity.set(0,0,0)),((this._state&Y.DOLLY)===Y.DOLLY||(this._state&Y.TOUCH_DOLLY)===Y.TOUCH_DOLLY||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE)&&(this._sphericalEnd.radius=this._spherical.radius,this._radiusVelocity.value=0),((this._state&Y.ZOOM)===Y.ZOOM||(this._state&Y.TOUCH_ZOOM)===Y.TOUCH_ZOOM||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_ZOOM_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE)&&(this._zoomEnd=this._zoom,this._zoomVelocity.value=0),((this._state&Y.OFFSET)===Y.OFFSET||(this._state&Y.TOUCH_OFFSET)===Y.TOUCH_OFFSET||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET)&&(this._focalOffsetEnd.copy(this._focalOffset),this._focalOffsetVelocity.set(0,0,0)),this.dispatchEvent({type:"controlstart"})},d=()=>{if(!this._enabled||!this._dragNeedsUpdate)return;this._dragNeedsUpdate=!1,Io(this._activePointers,Ke);const M=this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement?this._lockedPointer||this._activePointers[0]:null,y=M?-M.deltaX:r.x-Ke.x,S=M?-M.deltaY:r.y-Ke.y;if(r.copy(Ke),((this._state&Y.ROTATE)===Y.ROTATE||(this._state&Y.TOUCH_ROTATE)===Y.TOUCH_ROTATE||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE)&&(this._rotateInternal(y,S),this._isUserControllingRotate=!0),(this._state&Y.DOLLY)===Y.DOLLY||(this._state&Y.ZOOM)===Y.ZOOM){const C=this.dollyToCursor?(i.x-this._elementRect.x)/this._elementRect.width*2-1:0,E=this.dollyToCursor?(i.y-this._elementRect.y)/this._elementRect.height*-2+1:0,A=this.dollyDragInverted?-1:1;(this._state&Y.DOLLY)===Y.DOLLY?(this._dollyInternal(A*S*ms,C,E),this._isUserControllingDolly=!0):(this._zoomInternal(A*S*ms,C,E),this._isUserControllingZoom=!0)}if((this._state&Y.TOUCH_DOLLY)===Y.TOUCH_DOLLY||(this._state&Y.TOUCH_ZOOM)===Y.TOUCH_ZOOM||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_ZOOM_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE){const C=Ke.x-this._activePointers[1].clientX,E=Ke.y-this._activePointers[1].clientY,A=Math.sqrt(C*C+E*E),U=s.y-A;s.set(0,A);const T=this.dollyToCursor?(r.x-this._elementRect.x)/this._elementRect.width*2-1:0,x=this.dollyToCursor?(r.y-this._elementRect.y)/this._elementRect.height*-2+1:0;(this._state&Y.TOUCH_DOLLY)===Y.TOUCH_DOLLY||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET?(this._dollyInternal(U*ms,T,x),this._isUserControllingDolly=!0):(this._zoomInternal(U*ms,T,x),this._isUserControllingZoom=!0)}((this._state&Y.TRUCK)===Y.TRUCK||(this._state&Y.TOUCH_TRUCK)===Y.TOUCH_TRUCK||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK)&&(this._truckInternal(y,S,!1,!1),this._isUserControllingTruck=!0),((this._state&Y.SCREEN_PAN)===Y.SCREEN_PAN||(this._state&Y.TOUCH_SCREEN_PAN)===Y.TOUCH_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_ZOOM_SCREEN_PAN)&&(this._truckInternal(y,S,!1,!0),this._isUserControllingTruck=!0),((this._state&Y.OFFSET)===Y.OFFSET||(this._state&Y.TOUCH_OFFSET)===Y.TOUCH_OFFSET||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET)&&(this._truckInternal(y,S,!0,!1),this._isUserControllingOffset=!0),this.dispatchEvent({type:"control"})},g=()=>{Io(this._activePointers,Ke),r.copy(Ke),this._dragNeedsUpdate=!1,(this._activePointers.length===0||this._activePointers.length===1&&this._activePointers[0]===this._lockedPointer)&&(this._isDragging=!1),this._activePointers.length===0&&this._domElement&&(this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this.dispatchEvent({type:"controlend"}))};this.lockPointer=()=>{!this._enabled||!this._domElement||(this.cancel(),this._lockedPointer={pointerId:-1,clientX:0,clientY:0,deltaX:0,deltaY:0,mouseButton:null},this._activePointers.push(this._lockedPointer),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.requestPointerLock(),this._domElement.ownerDocument.addEventListener("pointerlockchange",_),this._domElement.ownerDocument.addEventListener("pointerlockerror",m),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),f())},this.unlockPointer=()=>{var p,M,y;this._lockedPointer!==null&&(this._disposePointer(this._lockedPointer),this._lockedPointer=null),(p=this._domElement)===null||p===void 0||p.ownerDocument.exitPointerLock(),(M=this._domElement)===null||M===void 0||M.ownerDocument.removeEventListener("pointerlockchange",_),(y=this._domElement)===null||y===void 0||y.ownerDocument.removeEventListener("pointerlockerror",m),this.cancel()};const _=()=>{this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement||this.unlockPointer()},m=()=>{this.unlockPointer()};this._addAllEventListeners=p=>{this._domElement=p,this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none",this._domElement.addEventListener("pointerdown",o),this._domElement.addEventListener("pointercancel",l),this._domElement.addEventListener("wheel",h,{passive:!1}),this._domElement.addEventListener("contextmenu",u)},this._removeAllEventListeners=()=>{this._domElement&&(this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect="",this._domElement.removeEventListener("pointerdown",o),this._domElement.removeEventListener("pointercancel",l),this._domElement.removeEventListener("wheel",h,{passive:!1}),this._domElement.removeEventListener("contextmenu",u),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.removeEventListener("pointerlockchange",_),this._domElement.ownerDocument.removeEventListener("pointerlockerror",m))},this.cancel=()=>{this._state!==Y.NONE&&(this._state=Y.NONE,this._activePointers.length=0,g())},e&&this.connect(e),this.update(0)}get camera(){return this._camera}set camera(t){this._camera=t,this.updateCameraUp(),this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0}get enabled(){return this._enabled}set enabled(t){this._enabled=t,this._domElement&&(t?(this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none"):(this.cancel(),this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect=""))}get active(){return!this._hasRested}get currentAction(){return this._state}get distance(){return this._spherical.radius}set distance(t){this._spherical.radius===t&&this._sphericalEnd.radius===t||(this._spherical.radius=t,this._sphericalEnd.radius=t,this._needsUpdate=!0)}get azimuthAngle(){return this._spherical.theta}set azimuthAngle(t){this._spherical.theta===t&&this._sphericalEnd.theta===t||(this._spherical.theta=t,this._sphericalEnd.theta=t,this._needsUpdate=!0)}get polarAngle(){return this._spherical.phi}set polarAngle(t){this._spherical.phi===t&&this._sphericalEnd.phi===t||(this._spherical.phi=t,this._sphericalEnd.phi=t,this._needsUpdate=!0)}get boundaryEnclosesCamera(){return this._boundaryEnclosesCamera}set boundaryEnclosesCamera(t){this._boundaryEnclosesCamera=t,this._needsUpdate=!0}set interactiveArea(t){this._interactiveArea.width=Cn(t.width,0,1),this._interactiveArea.height=Cn(t.height,0,1),this._interactiveArea.x=Cn(t.x,0,1-this._interactiveArea.width),this._interactiveArea.y=Cn(t.y,0,1-this._interactiveArea.height)}addEventListener(t,e){super.addEventListener(t,e)}removeEventListener(t,e){super.removeEventListener(t,e)}rotate(t,e,i=!1){return this.rotateTo(this._sphericalEnd.theta+t,this._sphericalEnd.phi+e,i)}rotateAzimuthTo(t,e=!1){return this.rotateTo(t,this._sphericalEnd.phi,e)}rotatePolarTo(t,e=!1){return this.rotateTo(this._sphericalEnd.theta,t,e)}rotateTo(t,e,i=!1){this._isUserControllingRotate=!1;const r=Cn(t,this.minAzimuthAngle,this.maxAzimuthAngle),s=Cn(e,this.minPolarAngle,this.maxPolarAngle);this._sphericalEnd.theta=r,this._sphericalEnd.phi=s,this._sphericalEnd.makeSafe(),this._needsUpdate=!0,i||(this._spherical.theta=this._sphericalEnd.theta,this._spherical.phi=this._sphericalEnd.phi);const o=!i||ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold);return this._createOnRestPromise(o)}dolly(t,e=!1){return this.dollyTo(this._sphericalEnd.radius-t,e)}dollyTo(t,e=!1){return this._isUserControllingDolly=!1,this._lastDollyDirection=ji.NONE,this._changedDolly=0,this._dollyToNoClamp(Cn(t,this.minDistance,this.maxDistance),e)}_dollyToNoClamp(t,e=!1){const i=this._sphericalEnd.radius;if(this.colliderMeshes.length>=1){const o=this._collisionTest(),a=ie(o,this._spherical.radius);if(!(i>t)&&a)return Promise.resolve();this._sphericalEnd.radius=Math.min(t,o)}else this._sphericalEnd.radius=t;this._needsUpdate=!0,e||(this._spherical.radius=this._sphericalEnd.radius);const s=!e||ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(s)}dollyInFixed(t,e=!1){this._targetEnd.add(this._getCameraDirection(Or).multiplyScalar(t)),e||this._target.copy(this._targetEnd);const i=!e||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(i)}zoom(t,e=!1){return this.zoomTo(this._zoomEnd+t,e)}zoomTo(t,e=!1){this._isUserControllingZoom=!1,this._zoomEnd=Cn(t,this.minZoom,this.maxZoom),this._needsUpdate=!0,e||(this._zoom=this._zoomEnd);const i=!e||ie(this._zoom,this._zoomEnd,this.restThreshold);return this._changedZoom=0,this._createOnRestPromise(i)}pan(t,e,i=!1){return console.warn("`pan` has been renamed to `truck`"),this.truck(t,e,i)}truck(t,e,i=!1){this._camera.updateMatrix(),On.setFromMatrixColumn(this._camera.matrix,0),Fn.setFromMatrixColumn(this._camera.matrix,1),On.multiplyScalar(t),Fn.multiplyScalar(-e);const r=Ht.copy(On).add(Fn),s=ee.copy(this._targetEnd).add(r);return this.moveTo(s.x,s.y,s.z,i)}forward(t,e=!1){Ht.setFromMatrixColumn(this._camera.matrix,0),Ht.crossVectors(this._camera.up,Ht),Ht.multiplyScalar(t);const i=ee.copy(this._targetEnd).add(Ht);return this.moveTo(i.x,i.y,i.z,e)}elevate(t,e=!1){return Ht.copy(this._camera.up).multiplyScalar(t),this.moveTo(this._targetEnd.x+Ht.x,this._targetEnd.y+Ht.y,this._targetEnd.z+Ht.z,e)}moveTo(t,e,i,r=!1){this._isUserControllingTruck=!1;const s=Ht.set(t,e,i).sub(this._targetEnd);this._encloseToBoundary(this._targetEnd,s,this.boundaryFriction),this._needsUpdate=!0,r||this._target.copy(this._targetEnd);const o=!r||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(o)}lookInDirectionOf(t,e,i,r=!1){const a=Ht.set(t,e,i).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);return this.setPosition(a.x,a.y,a.z,r)}fitToBox(t,e,{cover:i=!1,paddingLeft:r=0,paddingRight:s=0,paddingBottom:o=0,paddingTop:a=0}={}){const l=[],c=t.isBox3?Ji.copy(t):Ji.setFromObject(t);c.isEmpty()&&(console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"),Promise.resolve());const h=Dc(this._sphericalEnd.theta,Lc),u=Dc(this._sphericalEnd.phi,Lc);l.push(this.rotateTo(h,u,e));const f=Ht.setFromSpherical(this._sphericalEnd).normalize(),d=kc.setFromUnitVectors(f,No),g=ie(Math.abs(f.y),1);g&&d.multiply(zo.setFromAxisAngle(gs,h)),d.multiply(this._yAxisUpSpaceInverse);const _=Nc.makeEmpty();ee.copy(c.min).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setX(c.max.x).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setY(c.max.y).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setZ(c.min.z).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setZ(c.max.z).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setY(c.min.y).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setX(c.min.x).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).applyQuaternion(d),_.expandByPoint(ee),_.min.x-=r,_.min.y-=o,_.max.x+=s,_.max.y+=a,d.setFromUnitVectors(No,f),g&&d.premultiply(zo.invert()),d.premultiply(this._yAxisUpSpace);const m=_.getSize(Ht),p=_.getCenter(ee).applyQuaternion(d);if(wi(this._camera)){const M=this.getDistanceToFitBox(m.x,m.y,m.z,i);l.push(this.moveTo(p.x,p.y,p.z,e)),l.push(this.dollyTo(M,e)),l.push(this.setFocalOffset(0,0,0,e))}else if(pi(this._camera)){const M=this._camera,y=M.right-M.left,S=M.top-M.bottom,C=i?Math.max(y/m.x,S/m.y):Math.min(y/m.x,S/m.y);l.push(this.moveTo(p.x,p.y,p.z,e)),l.push(this.zoomTo(C,e)),l.push(this.setFocalOffset(0,0,0,e))}return Promise.all(l)}fitToSphere(t,e){const i=[],s="isObject3D"in t?tn.createBoundingSphere(t,ko):ko.copy(t);if(i.push(this.moveTo(s.center.x,s.center.y,s.center.z,e)),wi(this._camera)){const o=this.getDistanceToFitSphere(s.radius);i.push(this.dollyTo(o,e))}else if(pi(this._camera)){const o=this._camera.right-this._camera.left,a=this._camera.top-this._camera.bottom,l=2*s.radius,c=Math.min(o/l,a/l);i.push(this.zoomTo(c,e))}return i.push(this.setFocalOffset(0,0,0,e)),Promise.all(i)}setLookAt(t,e,i,r,s,o,a=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=ji.NONE,this._changedDolly=0;const l=ee.set(r,s,o),c=Ht.set(t,e,i);this._targetEnd.copy(l),this._sphericalEnd.setFromVector3(c.sub(l).applyQuaternion(this._yAxisUpSpace)),this.normalizeRotations(),this._needsUpdate=!0,a||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const h=!a||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(h)}lerpLookAt(t,e,i,r,s,o,a,l,c,h,u,f,d,g=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=ji.NONE,this._changedDolly=0;const _=Ht.set(r,s,o),m=ee.set(t,e,i);mn.setFromVector3(m.sub(_).applyQuaternion(this._yAxisUpSpace));const p=Qi.set(h,u,f),M=ee.set(a,l,c);Fr.setFromVector3(M.sub(p).applyQuaternion(this._yAxisUpSpace)),this._targetEnd.copy(_.lerp(p,d));const y=Fr.theta-mn.theta,S=Fr.phi-mn.phi,C=Fr.radius-mn.radius;this._sphericalEnd.set(mn.radius+C*d,mn.phi+S*d,mn.theta+y*d),this.normalizeRotations(),this._needsUpdate=!0,g||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const E=!g||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(E)}setPosition(t,e,i,r=!1){return this.setLookAt(t,e,i,this._targetEnd.x,this._targetEnd.y,this._targetEnd.z,r)}setTarget(t,e,i,r=!1){const s=this.getPosition(Ht),o=this.setLookAt(s.x,s.y,s.z,t,e,i,r);return this._sphericalEnd.phi=Cn(this._sphericalEnd.phi,this.minPolarAngle,this.maxPolarAngle),o}setFocalOffset(t,e,i,r=!1){this._isUserControllingOffset=!1,this._focalOffsetEnd.set(t,e,i),this._needsUpdate=!0,r||this._focalOffset.copy(this._focalOffsetEnd);const s=!r||ie(this._focalOffset.x,this._focalOffsetEnd.x,this.restThreshold)&&ie(this._focalOffset.y,this._focalOffsetEnd.y,this.restThreshold)&&ie(this._focalOffset.z,this._focalOffsetEnd.z,this.restThreshold);return this._createOnRestPromise(s)}setOrbitPoint(t,e,i){this._camera.updateMatrixWorld(),On.setFromMatrixColumn(this._camera.matrixWorldInverse,0),Fn.setFromMatrixColumn(this._camera.matrixWorldInverse,1),Ai.setFromMatrixColumn(this._camera.matrixWorldInverse,2);const r=Ht.set(t,e,i),s=r.distanceTo(this._camera.position),o=r.sub(this._camera.position);On.multiplyScalar(o.x),Fn.multiplyScalar(o.y),Ai.multiplyScalar(o.z),Ht.copy(On).add(Fn).add(Ai),Ht.z=Ht.z+s,this.dollyTo(s,!1),this.setFocalOffset(-Ht.x,Ht.y,-Ht.z,!1),this.moveTo(t,e,i,!1)}setBoundary(t){if(!t){this._boundary.min.set(-1/0,-1/0,-1/0),this._boundary.max.set(1/0,1/0,1/0),this._needsUpdate=!0;return}this._boundary.copy(t),this._boundary.clampPoint(this._targetEnd,this._targetEnd),this._needsUpdate=!0}setViewport(t,e,i,r){if(t===null){this._viewport=null;return}this._viewport=this._viewport||new Ot.Vector4,typeof t=="number"?this._viewport.set(t,e,i,r):this._viewport.copy(t)}getDistanceToFitBox(t,e,i,r=!1){if(Oo(this._camera,"getDistanceToFitBox"))return this._spherical.radius;const s=t/e,o=this._camera.getEffectiveFOV()*Dr,a=this._camera.aspect;return((r?s>a:s<a)?e:t/a)*.5/Math.tan(o*.5)+i*.5}getDistanceToFitSphere(t){if(Oo(this._camera,"getDistanceToFitSphere"))return this._spherical.radius;const e=this._camera.getEffectiveFOV()*Dr,i=Math.atan(Math.tan(e*.5)*this._camera.aspect)*2,r=1<this._camera.aspect?e:i;return t/Math.sin(r*.5)}getTarget(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._targetEnd:this._target)}getPosition(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).setFromSpherical(e?this._sphericalEnd:this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(e?this._targetEnd:this._target)}getSpherical(t,e=!0){return(t||new Ot.Spherical).copy(e?this._sphericalEnd:this._spherical)}getFocalOffset(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._focalOffsetEnd:this._focalOffset)}normalizeRotations(){this._sphericalEnd.theta=this._sphericalEnd.theta%Ki,this._sphericalEnd.theta<0&&(this._sphericalEnd.theta+=Ki),this._spherical.theta+=Ki*Math.round((this._sphericalEnd.theta-this._spherical.theta)/Ki)}stop(){this._focalOffset.copy(this._focalOffsetEnd),this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd),this._zoom=this._zoomEnd}reset(t=!1){if(!ie(this._camera.up.x,this._cameraUp0.x)||!ie(this._camera.up.y,this._cameraUp0.y)||!ie(this._camera.up.z,this._cameraUp0.z)){this._camera.up.copy(this._cameraUp0);const i=this.getPosition(Ht);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}const e=[this.setLookAt(this._position0.x,this._position0.y,this._position0.z,this._target0.x,this._target0.y,this._target0.z,t),this.setFocalOffset(this._focalOffset0.x,this._focalOffset0.y,this._focalOffset0.z,t),this.zoomTo(this._zoom0,t)];return Promise.all(e)}saveState(){this._cameraUp0.copy(this._camera.up),this.getTarget(this._target0),this.getPosition(this._position0),this._zoom0=this._zoom,this._focalOffset0.copy(this._focalOffset)}updateCameraUp(){this._yAxisUpSpace.setFromUnitVectors(this._camera.up,gs),this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert()}applyCameraUp(){const t=Ht.subVectors(this._target,this._camera.position).normalize(),e=ee.crossVectors(t,this._camera.up);this._camera.up.crossVectors(e,t).normalize(),this._camera.updateMatrixWorld();const i=this.getPosition(Ht);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}update(t){const e=this._sphericalEnd.theta-this._spherical.theta,i=this._sphericalEnd.phi-this._spherical.phi,r=this._sphericalEnd.radius-this._spherical.radius,s=Oc.subVectors(this._targetEnd,this._target),o=Fc.subVectors(this._focalOffsetEnd,this._focalOffset),a=this._zoomEnd-this._zoom;if(pe(e))this._thetaVelocity.value=0,this._spherical.theta=this._sphericalEnd.theta;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.theta=ps(this._spherical.theta,this._sphericalEnd.theta,this._thetaVelocity,u,1/0,t),this._needsUpdate=!0}if(pe(i))this._phiVelocity.value=0,this._spherical.phi=this._sphericalEnd.phi;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.phi=ps(this._spherical.phi,this._sphericalEnd.phi,this._phiVelocity,u,1/0,t),this._needsUpdate=!0}if(pe(r))this._radiusVelocity.value=0,this._spherical.radius=this._sphericalEnd.radius;else{const u=this._isUserControllingDolly?this.draggingSmoothTime:this.smoothTime;this._spherical.radius=ps(this._spherical.radius,this._sphericalEnd.radius,this._radiusVelocity,u,this.maxSpeed,t),this._needsUpdate=!0}if(pe(s.x)&&pe(s.y)&&pe(s.z))this._targetVelocity.set(0,0,0),this._target.copy(this._targetEnd);else{const u=this._isUserControllingTruck?this.draggingSmoothTime:this.smoothTime;Uc(this._target,this._targetEnd,this._targetVelocity,u,this.maxSpeed,t,this._target),this._needsUpdate=!0}if(pe(o.x)&&pe(o.y)&&pe(o.z))this._focalOffsetVelocity.set(0,0,0),this._focalOffset.copy(this._focalOffsetEnd);else{const u=this._isUserControllingOffset?this.draggingSmoothTime:this.smoothTime;Uc(this._focalOffset,this._focalOffsetEnd,this._focalOffsetVelocity,u,this.maxSpeed,t,this._focalOffset),this._needsUpdate=!0}if(pe(a))this._zoomVelocity.value=0,this._zoom=this._zoomEnd;else{const u=this._isUserControllingZoom?this.draggingSmoothTime:this.smoothTime;this._zoom=ps(this._zoom,this._zoomEnd,this._zoomVelocity,u,1/0,t)}if(this.dollyToCursor){if(wi(this._camera)&&this._changedDolly!==0){const u=this._spherical.radius-this._lastDistance,f=this._camera,d=this._getCameraDirection(Or),g=Ht.copy(d).cross(f.up).normalize();g.lengthSq()===0&&(g.x=1);const _=ee.crossVectors(g,d),m=this._sphericalEnd.radius*Math.tan(f.getEffectiveFOV()*Dr*.5),M=(this._sphericalEnd.radius-u-this._sphericalEnd.radius)/this._sphericalEnd.radius,y=Qi.copy(this._targetEnd).add(g.multiplyScalar(this._dollyControlCoord.x*m*f.aspect)).add(_.multiplyScalar(this._dollyControlCoord.y*m)),S=Ht.copy(this._targetEnd).lerp(y,M),C=this._lastDollyDirection===ji.IN&&this._spherical.radius<=this.minDistance,E=this._lastDollyDirection===ji.OUT&&this.maxDistance<=this._spherical.radius;if(this.infinityDolly&&(C||E)){this._sphericalEnd.radius-=u,this._spherical.radius-=u;const U=ee.copy(d).multiplyScalar(-u);S.add(U)}this._boundary.clampPoint(S,S);const A=ee.subVectors(S,this._targetEnd);this._targetEnd.copy(S),this._target.add(A),this._changedDolly-=u,pe(this._changedDolly)&&(this._changedDolly=0)}else if(pi(this._camera)&&this._changedZoom!==0){const u=this._zoom-this._lastZoom,f=this._camera,d=Ht.set(this._dollyControlCoord.x,this._dollyControlCoord.y,(f.near+f.far)/(f.near-f.far)).unproject(f),g=ee.set(0,0,-1).applyQuaternion(f.quaternion),_=Qi.copy(d).add(g.multiplyScalar(-d.dot(f.up))),p=-(this._zoom-u-this._zoom)/this._zoom,M=this._getCameraDirection(Or),y=this._targetEnd.dot(M),S=Ht.copy(this._targetEnd).lerp(_,p),C=S.dot(M),E=M.multiplyScalar(C-y);S.sub(E),this._boundary.clampPoint(S,S);const A=ee.subVectors(S,this._targetEnd);this._targetEnd.copy(S),this._target.add(A),this._changedZoom-=u,pe(this._changedZoom)&&(this._changedZoom=0)}}this._camera.zoom!==this._zoom&&(this._camera.zoom=this._zoom,this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0),this._dragNeedsUpdate=!0;const l=this._collisionTest();this._spherical.radius=Math.min(this._spherical.radius,l),this._spherical.makeSafe(),this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target),this._camera.lookAt(this._target),(!pe(this._focalOffset.x)||!pe(this._focalOffset.y)||!pe(this._focalOffset.z))&&(On.setFromMatrixColumn(this._camera.matrix,0),Fn.setFromMatrixColumn(this._camera.matrix,1),Ai.setFromMatrixColumn(this._camera.matrix,2),On.multiplyScalar(this._focalOffset.x),Fn.multiplyScalar(-this._focalOffset.y),Ai.multiplyScalar(this._focalOffset.z),Ht.copy(On).add(Fn).add(Ai),this._camera.position.add(Ht),this._camera.updateMatrixWorld()),this._boundaryEnclosesCamera&&this._encloseToBoundary(this._camera.position.copy(this._target),Ht.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse),1);const h=this._needsUpdate;return h&&!this._updatedLastTime?(this._hasRested=!1,this.dispatchEvent({type:"wake"}),this.dispatchEvent({type:"update"})):h?(this.dispatchEvent({type:"update"}),pe(e,this.restThreshold)&&pe(i,this.restThreshold)&&pe(r,this.restThreshold)&&pe(s.x,this.restThreshold)&&pe(s.y,this.restThreshold)&&pe(s.z,this.restThreshold)&&pe(o.x,this.restThreshold)&&pe(o.y,this.restThreshold)&&pe(o.z,this.restThreshold)&&pe(a,this.restThreshold)&&!this._hasRested&&(this._hasRested=!0,this.dispatchEvent({type:"rest"}))):!h&&this._updatedLastTime&&this.dispatchEvent({type:"sleep"}),this._lastDistance=this._spherical.radius,this._lastZoom=this._zoom,this._updatedLastTime=h,this._needsUpdate=!1,h}toJSON(){return JSON.stringify({enabled:this._enabled,minDistance:this.minDistance,maxDistance:Ur(this.maxDistance),minZoom:this.minZoom,maxZoom:Ur(this.maxZoom),minPolarAngle:this.minPolarAngle,maxPolarAngle:Ur(this.maxPolarAngle),minAzimuthAngle:Ur(this.minAzimuthAngle),maxAzimuthAngle:Ur(this.maxAzimuthAngle),smoothTime:this.smoothTime,draggingSmoothTime:this.draggingSmoothTime,dollySpeed:this.dollySpeed,truckSpeed:this.truckSpeed,dollyToCursor:this.dollyToCursor,target:this._targetEnd.toArray(),position:Ht.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),zoom:this._zoomEnd,focalOffset:this._focalOffsetEnd.toArray(),target0:this._target0.toArray(),position0:this._position0.toArray(),zoom0:this._zoom0,focalOffset0:this._focalOffset0.toArray()})}fromJSON(t,e=!1){const i=JSON.parse(t);this.enabled=i.enabled,this.minDistance=i.minDistance,this.maxDistance=Ir(i.maxDistance),this.minZoom=i.minZoom,this.maxZoom=Ir(i.maxZoom),this.minPolarAngle=i.minPolarAngle,this.maxPolarAngle=Ir(i.maxPolarAngle),this.minAzimuthAngle=Ir(i.minAzimuthAngle),this.maxAzimuthAngle=Ir(i.maxAzimuthAngle),this.smoothTime=i.smoothTime,this.draggingSmoothTime=i.draggingSmoothTime,this.dollySpeed=i.dollySpeed,this.truckSpeed=i.truckSpeed,this.dollyToCursor=i.dollyToCursor,this._target0.fromArray(i.target0),this._position0.fromArray(i.position0),this._zoom0=i.zoom0,this._focalOffset0.fromArray(i.focalOffset0),this.moveTo(i.target[0],i.target[1],i.target[2],e),mn.setFromVector3(Ht.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)),this.rotateTo(mn.theta,mn.phi,e),this.dollyTo(mn.radius,e),this.zoomTo(i.zoom,e),this.setFocalOffset(i.focalOffset[0],i.focalOffset[1],i.focalOffset[2],e),this._needsUpdate=!0}connect(t){if(this._domElement){console.warn("camera-controls is already connected.");return}t.setAttribute("data-camera-controls-version",sp),this._addAllEventListeners(t),this._getClientRect(this._elementRect)}disconnect(){this.cancel(),this._removeAllEventListeners(),this._domElement&&(this._domElement.removeAttribute("data-camera-controls-version"),this._domElement=void 0)}dispose(){this.removeAllEventListeners(),this.disconnect()}_getTargetDirection(t){return t.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse)}_getCameraDirection(t){return this._getTargetDirection(t).negate()}_findPointerById(t){return this._activePointers.find(e=>e.pointerId===t)}_findPointerByMouseButton(t){return this._activePointers.find(e=>e.mouseButton===t)}_disposePointer(t){this._activePointers.splice(this._activePointers.indexOf(t),1)}_encloseToBoundary(t,e,i){const r=e.lengthSq();if(r===0)return t;const s=ee.copy(e).add(t),a=this._boundary.clampPoint(s,Qi).sub(s),l=a.lengthSq();if(l===0)return t.add(e);if(l===r)return t;if(i===0)return t.add(e).add(a);{const c=1+i*l/e.dot(a);return t.add(ee.copy(e).multiplyScalar(c)).add(a.multiplyScalar(1-i))}}_updateNearPlaneCorners(){if(wi(this._camera)){const t=this._camera,e=t.near,i=t.getEffectiveFOV()*Dr,r=Math.tan(i*.5)*e,s=r*t.aspect;this._nearPlaneCorners[0].set(-s,-r,0),this._nearPlaneCorners[1].set(s,-r,0),this._nearPlaneCorners[2].set(s,r,0),this._nearPlaneCorners[3].set(-s,r,0)}else if(pi(this._camera)){const t=this._camera,e=1/t.zoom,i=t.left*e,r=t.right*e,s=t.top*e,o=t.bottom*e;this._nearPlaneCorners[0].set(i,s,0),this._nearPlaneCorners[1].set(r,s,0),this._nearPlaneCorners[2].set(r,o,0),this._nearPlaneCorners[3].set(i,o,0)}}_collisionTest(){let t=1/0;if(!(this.colliderMeshes.length>=1)||Oo(this._camera,"_collisionTest"))return t;const i=this._getTargetDirection(Or);Bo.lookAt(Ic,i,this._camera.up);for(let r=0;r<4;r++){const s=ee.copy(this._nearPlaneCorners[r]);s.applyMatrix4(Bo);const o=Qi.addVectors(this._target,s);_s.set(o,i),_s.far=this._spherical.radius+1;const a=_s.intersectObjects(this.colliderMeshes);a.length!==0&&a[0].distance<t&&(t=a[0].distance)}return t}_getClientRect(t){if(!this._domElement)return;const e=this._domElement.getBoundingClientRect();return t.x=e.left,t.y=e.top,this._viewport?(t.x+=this._viewport.x,t.y+=e.height-this._viewport.w-this._viewport.y,t.width=this._viewport.z,t.height=this._viewport.w):(t.width=e.width,t.height=e.height),t}_createOnRestPromise(t){return t?Promise.resolve():(this._hasRested=!1,this.dispatchEvent({type:"transitionstart"}),new Promise(e=>{const i=()=>{this.removeEventListener("rest",i),e()};this.addEventListener("rest",i)}))}_addAllEventListeners(t){}_removeAllEventListeners(){}get dampingFactor(){return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."),0}set dampingFactor(t){console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.")}get draggingDampingFactor(){return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."),0}set draggingDampingFactor(t){console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.")}static createBoundingSphere(t,e=new Ot.Sphere){const i=e,r=i.center;Ji.makeEmpty(),t.traverseVisible(o=>{o.isMesh&&Ji.expandByObject(o)}),Ji.getCenter(r);let s=0;return t.traverseVisible(o=>{if(!o.isMesh)return;const a=o;if(!a.geometry)return;const l=a.geometry.clone();l.applyMatrix4(a.matrixWorld);const h=l.attributes.position;for(let u=0,f=h.count;u<f;u++)Ht.fromBufferAttribute(h,u),s=Math.max(s,r.distanceToSquared(Ht))}),i.radius=Math.sqrt(s),i}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fl="177",ap=0,zc=1,lp=2,Vh=1,cp=2,jn=3,yi=0,rn=1,zn=2,Jn=0,_r=1,ho=2,Bc=3,Hc=4,Gh=5,mi=100,up=101,hp=102,dp=103,fp=104,pp=200,Oa=201,mp=202,gp=203,Fa=204,Na=205,_p=206,vp=207,xp=208,yp=209,Sp=210,Mp=211,Ep=212,bp=213,Tp=214,ka=0,za=1,Ba=2,Sr=3,Ha=4,Va=5,Ga=6,Wa=7,Wh=0,wp=1,Ap=2,xi=0,Xh=1,qh=2,Yh=3,Nl=4,$h=5,Zh=6,jh=7,Kh=300,Mr=301,Er=302,Xa=303,qa=304,Eo=306,Ya=1e3,zi=1001,$a=1002,$e=1003,Cp=1004,vs=1005,Hn=1006,Ho=1007,Bi=1008,ii=1009,Qh=1010,Jh=1011,jr=1012,kl=1013,Xi=1014,Dn=1015,ti=1016,zl=1017,Bl=1018,Kr=1020,td=35902,ed=1021,nd=1022,hn=1023,Qr=1026,Jr=1027,id=1028,Hl=1029,rd=1030,Vl=1031,Gl=1033,Js=33776,to=33777,eo=33778,no=33779,Za=35840,ja=35841,Ka=35842,Qa=35843,Ja=36196,tl=37492,el=37496,nl=37808,il=37809,rl=37810,sl=37811,ol=37812,al=37813,ll=37814,cl=37815,ul=37816,hl=37817,dl=37818,fl=37819,pl=37820,ml=37821,io=36492,gl=36494,_l=36495,sd=36283,vl=36284,xl=36285,yl=36286,Rp=3200,Pp=3201,Lp=0,Dp=1,gi="",_n="srgb",br="srgb-linear",fo="linear",ae="srgb",tr=7680,Vc=519,Up=512,Ip=513,Op=514,od=515,Fp=516,Np=517,kp=518,zp=519,Sl=35044,Gc=35048,Wc="300 es",Qn=2e3,po=2001;class Ar{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xc=1234567;const qr=Math.PI/180,ts=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[i&255]+Ve[i>>8&255]+Ve[i>>16&255]+Ve[i>>24&255]).toLowerCase()}function Gt(n,t,e){return Math.max(t,Math.min(e,n))}function Wl(n,t){return(n%t+t)%t}function Bp(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Hp(n,t,e){return n!==t?(e-n)/(t-n):0}function Yr(n,t,e){return(1-e)*n+e*t}function Vp(n,t,e,i){return Yr(n,t,1-Math.exp(-e*i))}function Gp(n,t=1){return t-Math.abs(Wl(n,t*2)-t)}function Wp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Xp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function qp(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Yp(n,t){return n+Math.random()*(t-n)}function $p(n){return n*(.5-Math.random())}function Zp(n){n!==void 0&&(Xc=n);let t=Xc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function jp(n){return n*qr}function Kp(n){return n*ts}function Qp(n){return(n&n-1)===0&&n!==0}function Jp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function tm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function em(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),h=o((t+i)/2),u=s((t-i)/2),f=o((t-i)/2),d=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":n.set(a*h,l*u,l*f,a*c);break;case"YZY":n.set(l*f,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*f,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Pn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function le(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const nm={DEG2RAD:qr,RAD2DEG:ts,generateUUID:ei,clamp:Gt,euclideanModulo:Wl,mapLinear:Bp,inverseLerp:Hp,lerp:Yr,damp:Vp,pingpong:Gp,smoothstep:Wp,smootherstep:Xp,randInt:qp,randFloat:Yp,randFloatSpread:$p,seededRandom:Zp,degToRad:jp,radToDeg:Kp,isPowerOfTwo:Qp,ceilPowerOfTwo:Jp,floorPowerOfTwo:tm,setQuaternionFromProperEuler:em,normalize:le,denormalize:Pn};class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Gt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Gt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Cr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let m=1-a;const p=l*f+c*d+h*g+u*_,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const C=Math.sqrt(y),E=Math.atan2(C,p*M);m=Math.sin(m*E)/C,a=Math.sin(a*E)/C}const S=a*M;if(l=l*m+f*S,c=c*m+d*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),f=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,i=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),h=2*(a*e-s*r),u=2*(s*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Gt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Vo.copy(this).projectOnVector(t),this.sub(Vo)}reflect(t){return this.sub(Vo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Gt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vo=new k,qc=new Cr;class Vt{constructor(t,e,i,r,s,o,a,l,c){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],M=r[1],y=r[4],S=r[7],C=r[2],E=r[5],A=r[8];return s[0]=o*_+a*M+l*C,s[3]=o*m+a*y+l*E,s[6]=o*p+a*S+l*A,s[1]=c*_+h*M+u*C,s[4]=c*m+h*y+u*E,s[7]=c*p+h*S+u*A,s[2]=f*_+d*M+g*C,s[5]=f*m+d*y+g*E,s[8]=f*p+d*S+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*s,d=c*s-o*l,g=e*u+i*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*c-h*i)*_,t[2]=(a*i-r*o)*_,t[3]=f*_,t[4]=(h*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Go.makeScale(t,e)),this}rotate(t){return this.premultiply(Go.makeRotation(-t)),this}translate(t,e){return this.premultiply(Go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Go=new Vt;function ad(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function mo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function im(){const n=mo("canvas");return n.style.display="block",n}const Yc={};function vr(n){n in Yc||(Yc[n]=!0,console.warn(n))}function rm(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function sm(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function om(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $c=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zc=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function am(){const n={enabled:!0,workingColorSpace:br,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ae&&(r.r=ni(r.r),r.g=ni(r.g),r.b=ni(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ae&&(r.r=xr(r.r),r.g=xr(r.g),r.b=xr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===gi?fo:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return vr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return vr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[br]:{primaries:t,whitePoint:i,transfer:fo,toXYZ:$c,fromXYZ:Zc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:_n},outputColorSpaceConfig:{drawingBufferColorSpace:_n}},[_n]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:$c,fromXYZ:Zc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:_n}}}),n}const Jt=am();function ni(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function xr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let er;class lm{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{er===void 0&&(er=mo("canvas")),er.width=t.width,er.height=t.height;const r=er.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=er}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=mo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ni(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ni(e[i]/255)*255):e[i]=ni(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let cm=0;class Xl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=ei(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Wo(r[o].image)):s.push(Wo(r[o]))}else s=Wo(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Wo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?lm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let um=0;const Xo=new k;class Ze extends Ar{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,i=zi,r=zi,s=Hn,o=Bi,a=hn,l=ii,c=Ze.DEFAULT_ANISOTROPY,h=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=ei(),this.name="",this.source=new Xl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Xo).x}get height(){return this.source.getSize(Xo).y}get depth(){return this.source.getSize(Xo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ya:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case $a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ya:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case $a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=Kh;Ze.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,i=0,r=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,S=(d+1)/2,C=(p+1)/2,E=(h+f)/4,A=(u+_)/4,U=(g+m)/4;return y>S&&y>C?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=E/i,s=A/i):S>C?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=U/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=U/s),this.set(i,r,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Gt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class hm extends Ar{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new Ze(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Xl(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Un extends hm{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ld extends Ze{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class dm extends Ze{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class si{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,bn):bn.fromBufferAttribute(s,o),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xs.copy(i.boundingBox)),xs.applyMatrix4(t.matrixWorld),this.union(xs)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Nr),ys.subVectors(this.max,Nr),nr.subVectors(t.a,Nr),ir.subVectors(t.b,Nr),rr.subVectors(t.c,Nr),ai.subVectors(ir,nr),li.subVectors(rr,ir),Ci.subVectors(nr,rr);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Ci.z,Ci.y,ai.z,0,-ai.x,li.z,0,-li.x,Ci.z,0,-Ci.x,-ai.y,ai.x,0,-li.y,li.x,0,-Ci.y,Ci.x,0];return!qo(e,nr,ir,rr,ys)||(e=[1,0,0,0,1,0,0,0,1],!qo(e,nr,ir,rr,ys))?!1:(Ss.crossVectors(ai,li),e=[Ss.x,Ss.y,Ss.z],qo(e,nr,ir,rr,ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Xn=[new k,new k,new k,new k,new k,new k,new k,new k],bn=new k,xs=new si,nr=new k,ir=new k,rr=new k,ai=new k,li=new k,Ci=new k,Nr=new k,ys=new k,Ss=new k,Ri=new k;function qo(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ri.fromArray(n,s);const a=r.x*Math.abs(Ri.x)+r.y*Math.abs(Ri.y)+r.z*Math.abs(Ri.z),l=t.dot(Ri),c=e.dot(Ri),h=i.dot(Ri);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const fm=new si,kr=new k,Yo=new k;class Mi{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):fm.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;kr.subVectors(t,this.center);const e=kr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(kr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(kr.copy(t.center).add(Yo)),this.expandByPoint(kr.copy(t.center).sub(Yo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const qn=new k,$o=new k,Ms=new k,ci=new k,Zo=new k,Es=new k,jo=new k;class ql{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){$o.copy(t).add(e).multiplyScalar(.5),Ms.copy(e).sub(t).normalize(),ci.copy(this.origin).sub($o);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Ms),a=ci.dot(this.direction),l=-ci.dot(Ms),c=ci.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy($o).addScaledVector(Ms,f),d}intersectSphere(t,e){qn.subVectors(t.center,this.origin);const i=qn.dot(this.direction),r=qn.dot(qn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,i,r,s){Zo.subVectors(e,t),Es.subVectors(i,t),jo.crossVectors(Zo,Es);let o=this.direction.dot(jo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,t);const l=a*this.direction.dot(Es.crossVectors(ci,Es));if(l<0)return null;const c=a*this.direction.dot(Zo.cross(ci));if(c<0||l+c>o)return null;const h=-a*ci.dot(jo);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,m){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,m)}set(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/sr.setFromMatrixColumn(t,0).length(),s=1/sr.setFromMatrixColumn(t,1).length(),o=1/sr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pm,t,mm)}lookAt(t,e,i){const r=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),ui.crossVectors(i,cn),ui.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),ui.crossVectors(i,cn)),ui.normalize(),bs.crossVectors(cn,ui),r[0]=ui.x,r[4]=bs.x,r[8]=cn.x,r[1]=ui.y,r[5]=bs.y,r[9]=cn.y,r[2]=ui.z,r[6]=bs.z,r[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],M=i[3],y=i[7],S=i[11],C=i[15],E=r[0],A=r[4],U=r[8],T=r[12],x=r[1],R=r[5],O=r[9],N=r[13],W=r[2],X=r[6],$=r[10],Q=r[14],Z=r[3],lt=r[7],P=r[11],_t=r[15];return s[0]=o*E+a*x+l*W+c*Z,s[4]=o*A+a*R+l*X+c*lt,s[8]=o*U+a*O+l*$+c*P,s[12]=o*T+a*N+l*Q+c*_t,s[1]=h*E+u*x+f*W+d*Z,s[5]=h*A+u*R+f*X+d*lt,s[9]=h*U+u*O+f*$+d*P,s[13]=h*T+u*N+f*Q+d*_t,s[2]=g*E+_*x+m*W+p*Z,s[6]=g*A+_*R+m*X+p*lt,s[10]=g*U+_*O+m*$+p*P,s[14]=g*T+_*N+m*Q+p*_t,s[3]=M*E+y*x+S*W+C*Z,s[7]=M*A+y*R+S*X+C*lt,s[11]=M*U+y*O+S*$+C*P,s[15]=M*T+y*N+S*Q+C*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*l*u-r*c*u-s*a*f+i*c*f+r*a*d-i*l*d)+_*(+e*l*d-e*c*f+s*o*f-r*o*d+r*c*h-s*l*h)+m*(+e*c*u-e*a*d-s*o*u+i*o*d+s*a*h-i*c*h)+p*(-r*a*h-e*l*u+e*a*f+r*o*u-i*o*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=u*m*c-_*f*c+_*l*d-a*m*d-u*l*p+a*f*p,y=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,S=h*_*c-g*u*c+g*a*d-o*_*d-h*a*p+o*u*p,C=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,E=e*M+i*y+r*S+s*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=M*A,t[1]=(_*f*s-u*m*s-_*r*d+i*m*d+u*r*p-i*f*p)*A,t[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*p+i*l*p)*A,t[3]=(u*l*s-a*f*s-u*r*c+i*f*c+a*r*d-i*l*d)*A,t[4]=y*A,t[5]=(h*m*s-g*f*s+g*r*d-e*m*d-h*r*p+e*f*p)*A,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*p-e*l*p)*A,t[7]=(o*f*s-h*l*s+h*r*c-e*f*c-o*r*d+e*l*d)*A,t[8]=S*A,t[9]=(g*u*s-h*_*s-g*i*d+e*_*d+h*i*p-e*u*p)*A,t[10]=(o*_*s-g*a*s+g*i*c-e*_*c-o*i*p+e*a*p)*A,t[11]=(h*a*s-o*u*s-h*i*c+e*u*c+o*i*d-e*a*d)*A,t[12]=C*A,t[13]=(h*_*r-g*u*r+g*i*f-e*_*f-h*i*m+e*u*m)*A,t[14]=(g*a*r-o*_*r-g*i*l+e*_*l+o*i*m-e*a*m)*A,t[15]=(o*u*r-h*a*r+h*i*l-e*u*l-o*i*f+e*a*f)*A,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,f=s*c,d=s*h,g=s*u,_=o*h,m=o*u,p=a*u,M=l*c,y=l*h,S=l*u,C=i.x,E=i.y,A=i.z;return r[0]=(1-(_+p))*C,r[1]=(d+S)*C,r[2]=(g-y)*C,r[3]=0,r[4]=(d-S)*E,r[5]=(1-(f+p))*E,r[6]=(m+M)*E,r[7]=0,r[8]=(g+y)*A,r[9]=(m-M)*A,r[10]=(1-(f+_))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=sr.set(r[0],r[1],r[2]).length();const o=sr.set(r[4],r[5],r[6]).length(),a=sr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Tn.copy(this);const c=1/s,h=1/o,u=1/a;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,e.setFromRotationMatrix(Tn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Qn){const l=this.elements,c=2*s/(e-t),h=2*s/(i-r),u=(e+t)/(e-t),f=(i+r)/(i-r);let d,g;if(a===Qn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===po)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Qn){const l=this.elements,c=1/(e-t),h=1/(i-r),u=1/(o-s),f=(e+t)*c,d=(i+r)*h;let g,_;if(a===Qn)g=(o+s)*u,_=-2*u;else if(a===po)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const sr=new k,Tn=new de,pm=new k(0,0,0),mm=new k(1,1,1),ui=new k,bs=new k,cn=new k,jc=new de,Kc=new Cr;class ri{constructor(t=0,e=0,i=0,r=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return jc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Kc.setFromEuler(this),this.setFromQuaternion(Kc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class Yl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let gm=0;const Qc=new k,or=new Cr,Yn=new de,Ts=new k,zr=new k,_m=new k,vm=new Cr,Jc=new k(1,0,0),tu=new k(0,1,0),eu=new k(0,0,1),nu={type:"added"},xm={type:"removed"},ar={type:"childadded",child:null},Ko={type:"childremoved",child:null};class sn extends Ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DEFAULT_UP.clone();const t=new k,e=new ri,i=new Cr,r=new k(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new de},normalMatrix:{value:new Vt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return or.setFromAxisAngle(t,e),this.quaternion.multiply(or),this}rotateOnWorldAxis(t,e){return or.setFromAxisAngle(t,e),this.quaternion.premultiply(or),this}rotateX(t){return this.rotateOnAxis(Jc,t)}rotateY(t){return this.rotateOnAxis(tu,t)}rotateZ(t){return this.rotateOnAxis(eu,t)}translateOnAxis(t,e){return Qc.copy(t).applyQuaternion(this.quaternion),this.position.add(Qc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jc,t)}translateY(t){return this.translateOnAxis(tu,t)}translateZ(t){return this.translateOnAxis(eu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ts.copy(t):Ts.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(zr,Ts,this.up):Yn.lookAt(Ts,zr,this.up),this.quaternion.setFromRotationMatrix(Yn),r&&(Yn.extractRotation(r.matrixWorld),or.setFromRotationMatrix(Yn),this.quaternion.premultiply(or.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nu),ar.child=t,this.dispatchEvent(ar),ar.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xm),Ko.child=t,this.dispatchEvent(Ko),Ko.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nu),ar.child=t,this.dispatchEvent(ar),ar.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,t,_m),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,vm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}sn.DEFAULT_UP=new k(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const wn=new k,$n=new k,Qo=new k,Zn=new k,lr=new k,cr=new k,iu=new k,Jo=new k,ta=new k,ea=new k,na=new ue,ia=new ue,ra=new ue;class Ln{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),wn.subVectors(t,e),r.cross(wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){wn.subVectors(r,e),$n.subVectors(i,e),Qo.subVectors(t,e);const o=wn.dot(wn),a=wn.dot($n),l=wn.dot(Qo),c=$n.dot($n),h=$n.dot(Qo),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,Zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Zn.x),l.addScaledVector(o,Zn.y),l.addScaledVector(a,Zn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return na.setScalar(0),ia.setScalar(0),ra.setScalar(0),na.fromBufferAttribute(t,e),ia.fromBufferAttribute(t,i),ra.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(na,s.x),o.addScaledVector(ia,s.y),o.addScaledVector(ra,s.z),o}static isFrontFacing(t,e,i,r){return wn.subVectors(i,e),$n.subVectors(t,e),wn.cross($n).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),wn.cross($n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return Ln.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return Ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;lr.subVectors(r,i),cr.subVectors(s,i),Jo.subVectors(t,i);const l=lr.dot(Jo),c=cr.dot(Jo);if(l<=0&&c<=0)return e.copy(i);ta.subVectors(t,r);const h=lr.dot(ta),u=cr.dot(ta);if(h>=0&&u<=h)return e.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(lr,o);ea.subVectors(t,s);const d=lr.dot(ea),g=cr.dot(ea);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(cr,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return iu.subVectors(s,r),a=(u-h)/(u-h+(d-g)),e.copy(r).addScaledVector(iu,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(i).addScaledVector(lr,o).addScaledVector(cr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},ws={h:0,s:0,l:0};function sa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=_n){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=Jt.workingColorSpace){if(t=Wl(t,1),e=Gt(e,0,1),i=Gt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=sa(o,s,t+1/3),this.g=sa(o,s,t),this.b=sa(o,s,t-1/3)}return Jt.colorSpaceToWorking(this,r),this}setStyle(t,e=_n){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=_n){const i=cd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=xr(t.r),this.g=xr(t.g),this.b=xr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=_n){return Jt.workingToColorSpace(Ge.copy(this),t),Math.round(Gt(Ge.r*255,0,255))*65536+Math.round(Gt(Ge.g*255,0,255))*256+Math.round(Gt(Ge.b*255,0,255))}getHexString(t=_n){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(Ge.copy(this),e);const i=Ge.r,r=Ge.g,s=Ge.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=_n){Jt.workingToColorSpace(Ge.copy(this),t);const e=Ge.r,i=Ge.g,r=Ge.b;return t!==_n?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(hi),this.setHSL(hi.h+t,hi.s+e,hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(hi),t.getHSL(ws);const i=Yr(hi.h,ws.h,e),r=Yr(hi.s,ws.s,e),s=Yr(hi.l,ws.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new jt;jt.NAMES=cd;let ym=0;class is extends Ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=_r,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fa,this.blendDst=Na,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=tr,this.stencilZFail=tr,this.stencilZPass=tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==_r&&(i.blending=this.blending),this.side!==yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fa&&(i.blendSrc=this.blendSrc),this.blendDst!==Na&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==tr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==tr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==tr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class $l extends is{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=Wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new k,As=new zt;let Sm=0;class Me{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Sl,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)As.fromBufferAttribute(this,e),As.applyMatrix3(t),this.setXY(e,As.x,As.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sl&&(t.usage=this.usage),t}}class ud extends Me{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class hd extends Me{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class He extends Me{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Mm=0;const gn=new de,oa=new sn,ur=new k,un=new si,Br=new si,Ie=new k;class on extends Ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ad(t)?hd:ud)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Vt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,i){return gn.makeTranslation(t,e,i),this.applyMatrix4(gn),this}scale(t,e,i){return gn.makeScale(t,e,i),this.applyMatrix4(gn),this}lookAt(t){return oa.lookAt(t),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ur).negate(),this.translate(ur.x,ur.y,ur.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new He(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Br.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(un.min,Br.min),un.expandByPoint(Ie),Ie.addVectors(un.max,Br.max),un.expandByPoint(Ie)):(un.expandByPoint(Br.min),un.expandByPoint(Br.max))}un.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Ie.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Ie));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ie.fromBufferAttribute(a,c),l&&(ur.fromBufferAttribute(t,c),Ie.add(ur)),r=Math.max(r,i.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new k,l[U]=new k;const c=new k,h=new k,u=new k,f=new zt,d=new zt,g=new zt,_=new k,m=new k;function p(U,T,x){c.fromBufferAttribute(i,U),h.fromBufferAttribute(i,T),u.fromBufferAttribute(i,x),f.fromBufferAttribute(s,U),d.fromBufferAttribute(s,T),g.fromBufferAttribute(s,x),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(R),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(R),a[U].add(_),a[T].add(_),a[x].add(_),l[U].add(m),l[T].add(m),l[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let U=0,T=M.length;U<T;++U){const x=M[U],R=x.start,O=x.count;for(let N=R,W=R+O;N<W;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const y=new k,S=new k,C=new k,E=new k;function A(U){C.fromBufferAttribute(r,U),E.copy(C);const T=a[U];y.copy(T),y.sub(C.multiplyScalar(C.dot(T))).normalize(),S.crossVectors(E,T);const R=S.dot(l[U])<0?-1:1;o.setXYZW(U,y.x,y.y,y.z,R)}for(let U=0,T=M.length;U<T;++U){const x=M[U],R=x.start,O=x.count;for(let N=R,W=R+O;N<W;N+=3)A(t.getX(N+0)),A(t.getX(N+1)),A(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new k,s=new k,o=new k,a=new k,l=new k,c=new k,h=new k,u=new k;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Me(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new on,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ru=new de,Pi=new ql,Cs=new Mi,su=new k,Rs=new k,Ps=new k,Ls=new k,aa=new k,Ds=new k,ou=new k,Us=new k;class yn extends sn{constructor(t=new on,e=new $l){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Ds.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(aa.fromBufferAttribute(u,t),o?Ds.addScaledVector(aa,h):Ds.addScaledVector(aa.sub(e),h))}e.add(Ds)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(s),Pi.copy(t.ray).recast(t.near),!(Cs.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Cs,su)===null||Pi.origin.distanceToSquared(su)>(t.far-t.near)**2))&&(ru.copy(s).invert(),Pi.copy(t.ray).applyMatrix4(ru),!(i.boundingBox!==null&&Pi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let S=M,C=y;S<C;S+=3){const E=a.getX(S),A=a.getX(S+1),U=a.getX(S+2);r=Is(this,p,t,i,c,h,u,E,A,U),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),y=a.getX(m+1),S=a.getX(m+2);r=Is(this,o,t,i,c,h,u,M,y,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=M,C=y;S<C;S+=3){const E=S,A=S+1,U=S+2;r=Is(this,p,t,i,c,h,u,E,A,U),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,S=m+2;r=Is(this,o,t,i,c,h,u,M,y,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Em(n,t,e,i,r,s,o,a){let l;if(t.side===rn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===yi,a),l===null)return null;Us.copy(a),Us.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Us);return c<e.near||c>e.far?null:{distance:c,point:Us.clone(),object:n}}function Is(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Rs),n.getVertexPosition(l,Ps),n.getVertexPosition(c,Ls);const h=Em(n,t,e,i,Rs,Ps,Ls,ou);if(h){const u=new k;Ln.getBarycoord(ou,Rs,Ps,Ls,u),r&&(h.uv=Ln.getInterpolatedAttribute(r,a,l,c,u,new zt)),s&&(h.uv1=Ln.getInterpolatedAttribute(s,a,l,c,u,new zt)),o&&(h.normal=Ln.getInterpolatedAttribute(o,a,l,c,u,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new k,materialIndex:0};Ln.getNormal(Rs,Ps,Ls,f.normal),h.face=f,h.barycoord=u}return h}class rs extends on{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(u,2));function g(_,m,p,M,y,S,C,E,A,U,T){const x=S/A,R=C/U,O=S/2,N=C/2,W=E/2,X=A+1,$=U+1;let Q=0,Z=0;const lt=new k;for(let P=0;P<$;P++){const _t=P*R-N;for(let Ut=0;Ut<X;Ut++){const I=Ut*x-O;lt[_]=I*M,lt[m]=_t*y,lt[p]=W,c.push(lt.x,lt.y,lt.z),lt[_]=0,lt[m]=0,lt[p]=E>0?1:-1,h.push(lt.x,lt.y,lt.z),u.push(Ut/A),u.push(1-P/U),Q+=1}}for(let P=0;P<U;P++)for(let _t=0;_t<A;_t++){const Ut=f+_t+X*P,I=f+_t+X*(P+1),J=f+(_t+1)+X*(P+1),at=f+(_t+1)+X*P;l.push(Ut,I,at),l.push(I,J,at),Z+=6}a.addGroup(d,Z,T),d+=Z,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Tr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function qe(n){const t={};for(let e=0;e<n.length;e++){const i=Tr(n[e]);for(const r in i)t[r]=i[r]}return t}function bm(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function dd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const qi={clone:Tr,merge:qe};var Tm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pe extends is{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tm,this.fragmentShader=wm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Tr(t.uniforms),this.uniformsGroups=bm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class fd extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=Qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const di=new k,au=new zt,lu=new zt;class vn extends fd{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ts*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ts*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(di.x,di.y).multiplyScalar(-t/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(di.x,di.y).multiplyScalar(-t/di.z)}getViewSize(t,e){return this.getViewBounds(t,au,lu),e.subVectors(lu,au)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qr*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const hr=-90,dr=1;class Am extends sn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new vn(hr,dr,t,e);r.layers=this.layers,this.add(r);const s=new vn(hr,dr,t,e);s.layers=this.layers,this.add(s);const o=new vn(hr,dr,t,e);o.layers=this.layers,this.add(o);const a=new vn(hr,dr,t,e);a.layers=this.layers,this.add(a);const l=new vn(hr,dr,t,e);l.layers=this.layers,this.add(l);const c=new vn(hr,dr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===po)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class pd extends Ze{constructor(t=[],e=Mr,i,r,s,o,a,l,c,h){super(t,e,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Cm extends Un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new pd(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new rs(5,5,5),s=new Pe({name:"CubemapFromEquirect",uniforms:Tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:Jn});s.uniforms.tEquirect.value=e;const o=new yn(r,s),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Hn),new Am(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class _i extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Rm={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _i,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _i,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _i,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Rm)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new _i;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Pm extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Sl,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xe=new k;class vi{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Pn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new vi(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class md extends Ze{constructor(t=null,e=1,i=1,r,s,o,a,l,c=$e,h=$e,u,f){super(null,o,a,l,c,h,r,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ca=new k,Dm=new k,Um=new Vt;class Oi{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=ca.subVectors(i,e).cross(Dm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ca),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Um.getNormalMatrix(t),r=this.coplanarPoint(ca).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Mi,Os=new k;class go{constructor(t=new Oi,e=new Oi,i=new Oi,r=new Oi,s=new Oi,o=new Oi){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Qn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],f=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],M=r[13],y=r[14],S=r[15];if(i[0].setComponents(l-s,f-c,m-d,S-p).normalize(),i[1].setComponents(l+s,f+c,m+d,S+p).normalize(),i[2].setComponents(l+o,f+h,m+g,S+M).normalize(),i[3].setComponents(l-o,f-h,m-g,S-M).normalize(),i[4].setComponents(l-a,f-u,m-_,S-y).normalize(),e===Qn)i[5].setComponents(l+a,f+u,m+_,S+y).normalize();else if(e===po)i[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Os.x=r.normal.x>0?t.max.x:t.min.x,Os.y=r.normal.y>0?t.max.y:t.min.y,Os.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Os)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Im extends is{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const cu=new de,Ml=new ql,Fs=new Mi,Ns=new k;class uu extends sn{constructor(t=new on,e=new Im){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fs.copy(i.boundingSphere),Fs.applyMatrix4(r),Fs.radius+=s,t.ray.intersectsSphere(Fs)===!1)return;cu.copy(r).invert(),Ml.copy(t.ray).applyMatrix4(cu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=c.getX(g);Ns.fromBufferAttribute(u,m),hu(Ns,m,l,r,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)Ns.fromBufferAttribute(u,g),hu(Ns,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hu(n,t,e,i,r,s,o){const a=Ml.distanceSqToPoint(n);if(a<e){const l=new k;Ml.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class gd extends Ze{constructor(t,e,i=Xi,r,s,o,a=$e,l=$e,c,h=Qr,u=1){if(h!==Qr&&h!==Jr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Om{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,d=(o-h)/f;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new zt:new k);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new k,r=[],s=[],o=[],a=new k,l=new de;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new k)}s[0]=new k,o[0]=new k;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Gt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(Gt(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function Fm(n,t){const e=1-n;return e*e*t}function Nm(n,t){return 2*(1-n)*n*t}function km(n,t){return n*n*t}function ua(n,t,e,i){return Fm(n,t)+Nm(n,e)+km(n,i)}class zm extends Om{constructor(t=new k,e=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new k){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(ua(t,r.x,s.x,o.x),ua(t,r.y,s.y,o.y),ua(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class bo extends on{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*f-o;for(let y=0;y<c;y++){const S=y*u-s;g.push(S,-M,0),_.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const y=M+c*p,S=M+c*(p+1),C=M+1+c*(p+1),E=M+1+c*p;d.push(y,S,E),d.push(S,C,E)}this.setIndex(d),this.setAttribute("position",new He(g,3)),this.setAttribute("normal",new He(_,3)),this.setAttribute("uv",new He(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bo(t.width,t.height,t.widthSegments,t.heightSegments)}}class Bm extends on{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,r=new k,s=new k;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],f=u.start,d=u.count;for(let g=f,_=f+d;g<_;g+=3)for(let m=0;m<3;m++){const p=a.getX(g+m),M=a.getX(g+(m+1)%3);r.fromBufferAttribute(o,p),s.fromBufferAttribute(o,M),du(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;r.fromBufferAttribute(o,h),s.fromBufferAttribute(o,u),du(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new He(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function du(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(r)===!0?!1:(e.add(i),e.add(r),!0)}class Hm extends Pe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Vm extends is{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Gm extends is{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class _d extends fd{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Wm extends on{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Xm extends vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class vd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=fu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function fu(){return performance.now()}class El extends Lm{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const pu=new de;class qm{constructor(t,e,i=0,r=1/0){this.ray=new ql(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new Yl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return pu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pu),this}intersectObject(t,e=!0,i=[]){return bl(t,this,i,e),i.sort(mu),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)bl(t[r],this,i,e);return i.sort(mu),i}}function mu(n,t){return n.distance-t.distance}function bl(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)bl(s[o],t,e,!0)}}class Ym{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Gt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Gt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const gu=new k,ks=new k;class $m{constructor(t=new k,e=new k){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){gu.subVectors(t,this.start),ks.subVectors(this.end,this.start);const i=ks.dot(ks);let s=ks.dot(gu)/i;return e&&(s=Gt(s,0,1)),s}closestPointToPoint(t,e,i){const r=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function _u(n,t,e,i){const r=Zm(i);switch(e){case ed:return n*t;case id:return n*t/r.components*r.byteLength;case Hl:return n*t/r.components*r.byteLength;case rd:return n*t*2/r.components*r.byteLength;case Vl:return n*t*2/r.components*r.byteLength;case nd:return n*t*3/r.components*r.byteLength;case hn:return n*t*4/r.components*r.byteLength;case Gl:return n*t*4/r.components*r.byteLength;case Js:case to:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case eo:case no:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ja:case Qa:return Math.max(n,16)*Math.max(t,8)/4;case Za:case Ka:return Math.max(n,8)*Math.max(t,8)/2;case Ja:case tl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case el:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case nl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case il:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case rl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case sl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ol:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case al:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ll:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case cl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ul:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case hl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case dl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case fl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case pl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ml:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case io:case gl:case _l:return Math.ceil(n/4)*Math.ceil(t/4)*16;case sd:case vl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xl:case yl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zm(n){switch(n){case ii:case Qh:return{byteLength:1,components:1};case jr:case Jh:case ti:return{byteLength:2,components:1};case zl:case Bl:return{byteLength:2,components:4};case Xi:case kl:case Dn:return{byteLength:4,components:1};case td:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xd(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function jm(n){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Km=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qm=`#ifdef USE_ALPHAHASH
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
#endif`,Jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ng=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ig=`#ifdef USE_AOMAP
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
#endif`,rg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sg=`#ifdef USE_BATCHING
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
#endif`,og=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ag=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ug=`#ifdef USE_IRIDESCENCE
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
#endif`,hg=`#ifdef USE_BUMPMAP
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
#endif`,dg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,fg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_g=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,yg=`#define PI 3.141592653589793
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
} // validated`,Sg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mg=`vec3 transformedNormal = objectNormal;
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
#endif`,Eg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ag="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Rg=`#ifdef USE_ENVMAP
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
#endif`,Pg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lg=`#ifdef USE_ENVMAP
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
#endif`,Dg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ug=`#ifdef USE_ENVMAP
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
#endif`,Ig=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Og=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ng=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kg=`#ifdef USE_GRADIENTMAP
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
}`,zg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vg=`uniform bool receiveShadow;
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
#endif`,Gg=`#ifdef USE_ENVMAP
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
#endif`,Wg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$g=`PhysicalMaterial material;
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
#endif`,Zg=`struct PhysicalMaterial {
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
}`,jg=`
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
#endif`,Kg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,t_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,n_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,i_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,r_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,o_=`#if defined( USE_POINTS_UV )
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
#endif`,a_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,l_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,c_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,u_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,d_=`#ifdef USE_MORPHTARGETS
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
#endif`,f_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,p_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,m_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,g_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,__=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,x_=`#ifdef USE_NORMALMAP
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
#endif`,y_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,S_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,E_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,T_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,w_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,A_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,C_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,R_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,P_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,L_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,D_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,U_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,I_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,O_=`float getShadowMask() {
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
}`,F_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N_=`#ifdef USE_SKINNING
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
#endif`,k_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,z_=`#ifdef USE_SKINNING
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
#endif`,B_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,H_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,V_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,G_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,W_=`#ifdef USE_TRANSMISSION
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
#endif`,X_=`#ifdef USE_TRANSMISSION
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
#endif`,q_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const j_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,K_=`uniform sampler2D t2D;
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
}`,Q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n0=`#include <common>
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
}`,i0=`#if DEPTH_PACKING == 3200
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
}`,r0=`#define DISTANCE
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
}`,s0=`#define DISTANCE
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
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l0=`uniform float scale;
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
}`,c0=`uniform vec3 diffuse;
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
}`,u0=`#include <common>
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
}`,h0=`uniform vec3 diffuse;
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
}`,d0=`#define LAMBERT
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
}`,f0=`#define LAMBERT
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
}`,p0=`#define MATCAP
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
}`,m0=`#define MATCAP
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
}`,g0=`#define NORMAL
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
}`,_0=`#define NORMAL
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
}`,v0=`#define PHONG
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
}`,x0=`#define PHONG
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
}`,y0=`#define STANDARD
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
}`,S0=`#define STANDARD
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
}`,M0=`#define TOON
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
}`,E0=`#define TOON
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
}`,b0=`uniform float size;
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
}`,T0=`uniform vec3 diffuse;
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
}`,w0=`#include <common>
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
}`,A0=`uniform vec3 color;
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
}`,C0=`uniform float rotation;
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
}`,R0=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:Km,alphahash_pars_fragment:Qm,alphamap_fragment:Jm,alphamap_pars_fragment:tg,alphatest_fragment:eg,alphatest_pars_fragment:ng,aomap_fragment:ig,aomap_pars_fragment:rg,batching_pars_vertex:sg,batching_vertex:og,begin_vertex:ag,beginnormal_vertex:lg,bsdfs:cg,iridescence_fragment:ug,bumpmap_pars_fragment:hg,clipping_planes_fragment:dg,clipping_planes_pars_fragment:fg,clipping_planes_pars_vertex:pg,clipping_planes_vertex:mg,color_fragment:gg,color_pars_fragment:_g,color_pars_vertex:vg,color_vertex:xg,common:yg,cube_uv_reflection_fragment:Sg,defaultnormal_vertex:Mg,displacementmap_pars_vertex:Eg,displacementmap_vertex:bg,emissivemap_fragment:Tg,emissivemap_pars_fragment:wg,colorspace_fragment:Ag,colorspace_pars_fragment:Cg,envmap_fragment:Rg,envmap_common_pars_fragment:Pg,envmap_pars_fragment:Lg,envmap_pars_vertex:Dg,envmap_physical_pars_fragment:Gg,envmap_vertex:Ug,fog_vertex:Ig,fog_pars_vertex:Og,fog_fragment:Fg,fog_pars_fragment:Ng,gradientmap_pars_fragment:kg,lightmap_pars_fragment:zg,lights_lambert_fragment:Bg,lights_lambert_pars_fragment:Hg,lights_pars_begin:Vg,lights_toon_fragment:Wg,lights_toon_pars_fragment:Xg,lights_phong_fragment:qg,lights_phong_pars_fragment:Yg,lights_physical_fragment:$g,lights_physical_pars_fragment:Zg,lights_fragment_begin:jg,lights_fragment_maps:Kg,lights_fragment_end:Qg,logdepthbuf_fragment:Jg,logdepthbuf_pars_fragment:t_,logdepthbuf_pars_vertex:e_,logdepthbuf_vertex:n_,map_fragment:i_,map_pars_fragment:r_,map_particle_fragment:s_,map_particle_pars_fragment:o_,metalnessmap_fragment:a_,metalnessmap_pars_fragment:l_,morphinstance_vertex:c_,morphcolor_vertex:u_,morphnormal_vertex:h_,morphtarget_pars_vertex:d_,morphtarget_vertex:f_,normal_fragment_begin:p_,normal_fragment_maps:m_,normal_pars_fragment:g_,normal_pars_vertex:__,normal_vertex:v_,normalmap_pars_fragment:x_,clearcoat_normal_fragment_begin:y_,clearcoat_normal_fragment_maps:S_,clearcoat_pars_fragment:M_,iridescence_pars_fragment:E_,opaque_fragment:b_,packing:T_,premultiplied_alpha_fragment:w_,project_vertex:A_,dithering_fragment:C_,dithering_pars_fragment:R_,roughnessmap_fragment:P_,roughnessmap_pars_fragment:L_,shadowmap_pars_fragment:D_,shadowmap_pars_vertex:U_,shadowmap_vertex:I_,shadowmask_pars_fragment:O_,skinbase_vertex:F_,skinning_pars_vertex:N_,skinning_vertex:k_,skinnormal_vertex:z_,specularmap_fragment:B_,specularmap_pars_fragment:H_,tonemapping_fragment:V_,tonemapping_pars_fragment:G_,transmission_fragment:W_,transmission_pars_fragment:X_,uv_pars_fragment:q_,uv_pars_vertex:Y_,uv_vertex:$_,worldpos_vertex:Z_,background_vert:j_,background_frag:K_,backgroundCube_vert:Q_,backgroundCube_frag:J_,cube_vert:t0,cube_frag:e0,depth_vert:n0,depth_frag:i0,distanceRGBA_vert:r0,distanceRGBA_frag:s0,equirect_vert:o0,equirect_frag:a0,linedashed_vert:l0,linedashed_frag:c0,meshbasic_vert:u0,meshbasic_frag:h0,meshlambert_vert:d0,meshlambert_frag:f0,meshmatcap_vert:p0,meshmatcap_frag:m0,meshnormal_vert:g0,meshnormal_frag:_0,meshphong_vert:v0,meshphong_frag:x0,meshphysical_vert:y0,meshphysical_frag:S0,meshtoon_vert:M0,meshtoon_frag:E0,points_vert:b0,points_frag:T0,shadow_vert:w0,shadow_frag:A0,sprite_vert:C0,sprite_frag:R0},ut={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},en={basic:{uniforms:qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:qe([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:qe([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:qe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:qe([ut.points,ut.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:qe([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:qe([ut.common,ut.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:qe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:qe([ut.sprite,ut.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:qe([ut.common,ut.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:qe([ut.lights,ut.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};en.physical={uniforms:qe([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const zs={r:0,b:0,g:0},Di=new ri,P0=new de;function L0(n,t,e,i,r,s,o){const a=new jt(0);let l=s===!0?0:1,c,h,u=null,f=0,d=null;function g(y){let S=y.isScene===!0?y.background:null;return S&&S.isTexture&&(S=(y.backgroundBlurriness>0?e:t).get(S)),S}function _(y){let S=!1;const C=g(y);C===null?p(a,l):C&&C.isColor&&(p(C,1),S=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,S){const C=g(S);C&&(C.isCubeTexture||C.mapping===Eo)?(h===void 0&&(h=new yn(new rs(1,1,1),new Pe({name:"BackgroundCubeMaterial",uniforms:Tr(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,A,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Di.copy(S.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(P0.makeRotationFromEuler(Di)),h.material.toneMapped=Jt.getTransfer(C.colorSpace)!==ae,(u!==C||f!==C.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=C,f=C.version,d=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new yn(new bo(2,2),new Pe({name:"BackgroundMaterial",uniforms:Tr(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(C.colorSpace)!==ae,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=C,f=C.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,S){y.getRGB(zs,dd(n)),i.buffers.color.setClear(zs.r,zs.g,zs.b,S,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),l=S,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m,dispose:M}}function D0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(x,R,O,N,W){let X=!1;const $=u(N,O,R);s!==$&&(s=$,c(s.object)),X=d(x,N,O,W),X&&g(x,N,O,W),W!==null&&t.update(W,n.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,S(x,R,O,N),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function h(x){return n.deleteVertexArray(x)}function u(x,R,O){const N=O.wireframe===!0;let W=i[x.id];W===void 0&&(W={},i[x.id]=W);let X=W[R.id];X===void 0&&(X={},W[R.id]=X);let $=X[N];return $===void 0&&($=f(l()),X[N]=$),$}function f(x){const R=[],O=[],N=[];for(let W=0;W<e;W++)R[W]=0,O[W]=0,N[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:O,attributeDivisors:N,object:x,attributes:{},index:null}}function d(x,R,O,N){const W=s.attributes,X=R.attributes;let $=0;const Q=O.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const P=W[Z];let _t=X[Z];if(_t===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(_t=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(_t=x.instanceColor)),P===void 0||P.attribute!==_t||_t&&P.data!==_t.data)return!0;$++}return s.attributesNum!==$||s.index!==N}function g(x,R,O,N){const W={},X=R.attributes;let $=0;const Q=O.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let P=X[Z];P===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(P=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(P=x.instanceColor));const _t={};_t.attribute=P,P&&P.data&&(_t.data=P.data),W[Z]=_t,$++}s.attributes=W,s.attributesNum=$,s.index=N}function _(){const x=s.newAttributes;for(let R=0,O=x.length;R<O;R++)x[R]=0}function m(x){p(x,0)}function p(x,R){const O=s.newAttributes,N=s.enabledAttributes,W=s.attributeDivisors;O[x]=1,N[x]===0&&(n.enableVertexAttribArray(x),N[x]=1),W[x]!==R&&(n.vertexAttribDivisor(x,R),W[x]=R)}function M(){const x=s.newAttributes,R=s.enabledAttributes;for(let O=0,N=R.length;O<N;O++)R[O]!==x[O]&&(n.disableVertexAttribArray(O),R[O]=0)}function y(x,R,O,N,W,X,$){$===!0?n.vertexAttribIPointer(x,R,O,W,X):n.vertexAttribPointer(x,R,O,N,W,X)}function S(x,R,O,N){_();const W=N.attributes,X=O.getAttributes(),$=R.defaultAttributeValues;for(const Q in X){const Z=X[Q];if(Z.location>=0){let lt=W[Q];if(lt===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(lt=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(lt=x.instanceColor)),lt!==void 0){const P=lt.normalized,_t=lt.itemSize,Ut=t.get(lt);if(Ut===void 0)continue;const I=Ut.buffer,J=Ut.type,at=Ut.bytesPerElement,dt=J===n.INT||J===n.UNSIGNED_INT||lt.gpuType===kl;if(lt.isInterleavedBufferAttribute){const ht=lt.data,St=ht.stride,Xt=lt.offset;if(ht.isInstancedInterleavedBuffer){for(let wt=0;wt<Z.locationSize;wt++)p(Z.location+wt,ht.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let wt=0;wt<Z.locationSize;wt++)m(Z.location+wt);n.bindBuffer(n.ARRAY_BUFFER,I);for(let wt=0;wt<Z.locationSize;wt++)y(Z.location+wt,_t/Z.locationSize,J,P,St*at,(Xt+_t/Z.locationSize*wt)*at,dt)}else{if(lt.isInstancedBufferAttribute){for(let ht=0;ht<Z.locationSize;ht++)p(Z.location+ht,lt.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let ht=0;ht<Z.locationSize;ht++)m(Z.location+ht);n.bindBuffer(n.ARRAY_BUFFER,I);for(let ht=0;ht<Z.locationSize;ht++)y(Z.location+ht,_t/Z.locationSize,J,P,_t*at,_t/Z.locationSize*ht*at,dt)}}else if($!==void 0){const P=$[Q];if(P!==void 0)switch(P.length){case 2:n.vertexAttrib2fv(Z.location,P);break;case 3:n.vertexAttrib3fv(Z.location,P);break;case 4:n.vertexAttrib4fv(Z.location,P);break;default:n.vertexAttrib1fv(Z.location,P)}}}}M()}function C(){U();for(const x in i){const R=i[x];for(const O in R){const N=R[O];for(const W in N)h(N[W].object),delete N[W];delete R[O]}delete i[x]}}function E(x){if(i[x.id]===void 0)return;const R=i[x.id];for(const O in R){const N=R[O];for(const W in N)h(N[W].object),delete N[W];delete R[O]}delete i[x.id]}function A(x){for(const R in i){const O=i[R];if(O[x.id]===void 0)continue;const N=O[x.id];for(const W in N)h(N[W].object),delete N[W];delete O[x.id]}}function U(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:T,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function U0(n,t,e){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function I0(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==hn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const U=A===ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ii&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Dn&&!U)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:C,maxSamples:E}}function O0(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Oi,a=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||r;return r=f,i=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const M=s?0:i,y=M*4;let S=p.clippingState||null;l.value=S,S=h(g,f,y,d);for(let C=0;C!==y;++C)S[C]=e[C];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,S=d;y!==_;++y,S+=4)o.copy(u[y]).applyMatrix4(M,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function F0(n){let t=new WeakMap;function e(o,a){return a===Xa?o.mapping=Mr:a===qa&&(o.mapping=Er),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Xa||a===qa)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Cm(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const gr=4,vu=[.125,.215,.35,.446,.526,.582],ki=20,ha=new _d,xu=new jt;let da=null,fa=0,pa=0,ma=!1;const Fi=(1+Math.sqrt(5))/2,fr=1/Fi,yu=[new k(-Fi,fr,0),new k(Fi,fr,0),new k(-fr,0,Fi),new k(fr,0,Fi),new k(0,Fi,-fr),new k(0,Fi,fr),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],N0=new k;class Su{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=N0}=s;da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(da,fa,pa),this._renderer.xr.enabled=ma,t.scissorTest=!1,Bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Mr||t.mapping===Er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:ti,format:hn,colorSpace:br,depthBuffer:!1},r=Mu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mu(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=k0(s)),this._blurMaterial=z0(s,t,e)}return r}_compileMaterial(t){const e=new yn(this._lodPlanes[0],t);this._renderer.compile(e,ha)}_sceneToCubeUV(t,e,i,r,s){const l=new vn(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(xu),u.toneMapping=xi,u.autoClear=!1;const g=new $l({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),_=new yn(new rs,g);let m=!1;const p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,m=!0):(g.color.copy(xu),m=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[M],s.y,s.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[M]));const S=this._cubeSize;Bs(r,y*S,M>2?S:0,S,S),u.setRenderTarget(r),m&&u.render(_,l),u.render(t,l)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Mr||t.mapping===Er;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new yn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Bs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ha)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=yu[(r-s-1)%yu.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new yn(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ki-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):ki;m>ki&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ki}`);const p=[];let M=0;for(let A=0;A<ki;++A){const U=A/_,T=Math.exp(-U*U/2);p.push(T),A===0?M+=T:A<m&&(M+=2*T)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-i;const S=this._sizeLods[r],C=3*S*(r>y-gr?r-y+gr:0),E=4*(this._cubeSize-S);Bs(e,C,E,3*S,2*S),l.setRenderTarget(e),l.render(u,ha)}}function k0(n){const t=[],e=[],i=[];let r=n;const s=n-gr+1+vu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-gr?l=vu[o-n+gr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),y=new Float32Array(m*g*d),S=new Float32Array(p*g*d);for(let E=0;E<d;E++){const A=E%3*2/3-1,U=E>2?0:-1,T=[A,U,0,A+2/3,U,0,A+2/3,U+1,0,A,U,0,A+2/3,U+1,0,A,U+1,0];M.set(T,_*g*E),y.set(f,m*g*E);const x=[E,E,E,E,E,E];S.set(x,p*g*E)}const C=new on;C.setAttribute("position",new Me(M,_)),C.setAttribute("uv",new Me(y,m)),C.setAttribute("faceIndex",new Me(S,p)),t.push(C),r>gr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Mu(n,t,e){const i=new Un(n,t,e);return i.texture.mapping=Eo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Bs(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function z0(n,t,e){const i=new Float32Array(ki),r=new k(0,1,0);return new Pe({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Eu(){return new Pe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function bu(){return new Pe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Zl(){return`

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
	`}function B0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Xa||l===qa,h=l===Mr||l===Er;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Su(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&r(d)?(e===null&&(e=new Su(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function H0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&vr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function V0(n,t,e,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let y=0,S=M.length;y<S;y+=3){const C=M[y+0],E=M[y+1],A=M[y+2];f.push(C,E,E,A,A,C)}}else if(g!==void 0){const M=g.array;_=g.version;for(let y=0,S=M.length/3-1;y<S;y+=3){const C=y+0,E=y+1,A=y+2;f.push(C,E,E,A,A,C)}}else return;const m=new(ad(f)?hd:ud)(f,1);m.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function G0(n,t,e){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*o),e.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,f*o,g),e.update(d,i,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];e.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function W0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function X0(n,t,e){const i=new WeakMap,r=new ue;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let x=function(){U.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let C=a.attributes.position.count*S,E=1;C>t.maxTextureSize&&(E=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const A=new Float32Array(C*E*4*u),U=new ld(A,C,E,u);U.type=Dn,U.needsUpdate=!0;const T=S*4;for(let R=0;R<u;R++){const O=p[R],N=M[R],W=y[R],X=C*E*4*R;for(let $=0;$<O.count;$++){const Q=$*T;g===!0&&(r.fromBufferAttribute(O,$),A[X+Q+0]=r.x,A[X+Q+1]=r.y,A[X+Q+2]=r.z,A[X+Q+3]=0),_===!0&&(r.fromBufferAttribute(N,$),A[X+Q+4]=r.x,A[X+Q+5]=r.y,A[X+Q+6]=r.z,A[X+Q+7]=0),m===!0&&(r.fromBufferAttribute(W,$),A[X+Q+8]=r.x,A[X+Q+9]=r.y,A[X+Q+10]=r.z,A[X+Q+11]=W.itemSize===4?r.w:1)}}f={count:u,texture:U,size:new zt(C,E)},i.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function q0(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const yd=new Ze,Tu=new gd(1,1),Sd=new ld,Md=new dm,Ed=new pd,wu=[],Au=[],Cu=new Float32Array(16),Ru=new Float32Array(9),Pu=new Float32Array(4);function Rr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=wu[r];if(s===void 0&&(s=new Float32Array(r),wu[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Le(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function De(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function To(n,t){let e=Au[t];e===void 0&&(e=new Int32Array(t),Au[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Y0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function $0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2fv(this.addr,t),De(e,t)}}function Z0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;n.uniform3fv(this.addr,t),De(e,t)}}function j0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4fv(this.addr,t),De(e,t)}}function K0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Pu.set(i),n.uniformMatrix2fv(this.addr,!1,Pu),De(e,i)}}function Q0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Ru.set(i),n.uniformMatrix3fv(this.addr,!1,Ru),De(e,i)}}function J0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Cu.set(i),n.uniformMatrix4fv(this.addr,!1,Cu),De(e,i)}}function tv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ev(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2iv(this.addr,t),De(e,t)}}function nv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3iv(this.addr,t),De(e,t)}}function iv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4iv(this.addr,t),De(e,t)}}function rv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function sv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2uiv(this.addr,t),De(e,t)}}function ov(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3uiv(this.addr,t),De(e,t)}}function av(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4uiv(this.addr,t),De(e,t)}}function lv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Tu.compareFunction=od,s=Tu):s=yd,e.setTexture2D(t||s,r)}function cv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Md,r)}function uv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Ed,r)}function hv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Sd,r)}function dv(n){switch(n){case 5126:return Y0;case 35664:return $0;case 35665:return Z0;case 35666:return j0;case 35674:return K0;case 35675:return Q0;case 35676:return J0;case 5124:case 35670:return tv;case 35667:case 35671:return ev;case 35668:case 35672:return nv;case 35669:case 35673:return iv;case 5125:return rv;case 36294:return sv;case 36295:return ov;case 36296:return av;case 35678:case 36198:case 36298:case 36306:case 35682:return lv;case 35679:case 36299:case 36307:return cv;case 35680:case 36300:case 36308:case 36293:return uv;case 36289:case 36303:case 36311:case 36292:return hv}}function fv(n,t){n.uniform1fv(this.addr,t)}function pv(n,t){const e=Rr(t,this.size,2);n.uniform2fv(this.addr,e)}function mv(n,t){const e=Rr(t,this.size,3);n.uniform3fv(this.addr,e)}function gv(n,t){const e=Rr(t,this.size,4);n.uniform4fv(this.addr,e)}function _v(n,t){const e=Rr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function vv(n,t){const e=Rr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function xv(n,t){const e=Rr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function yv(n,t){n.uniform1iv(this.addr,t)}function Sv(n,t){n.uniform2iv(this.addr,t)}function Mv(n,t){n.uniform3iv(this.addr,t)}function Ev(n,t){n.uniform4iv(this.addr,t)}function bv(n,t){n.uniform1uiv(this.addr,t)}function Tv(n,t){n.uniform2uiv(this.addr,t)}function wv(n,t){n.uniform3uiv(this.addr,t)}function Av(n,t){n.uniform4uiv(this.addr,t)}function Cv(n,t,e){const i=this.cache,r=t.length,s=To(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||yd,s[o])}function Rv(n,t,e){const i=this.cache,r=t.length,s=To(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Md,s[o])}function Pv(n,t,e){const i=this.cache,r=t.length,s=To(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Ed,s[o])}function Lv(n,t,e){const i=this.cache,r=t.length,s=To(e,r);Le(i,s)||(n.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Sd,s[o])}function Dv(n){switch(n){case 5126:return fv;case 35664:return pv;case 35665:return mv;case 35666:return gv;case 35674:return _v;case 35675:return vv;case 35676:return xv;case 5124:case 35670:return yv;case 35667:case 35671:return Sv;case 35668:case 35672:return Mv;case 35669:case 35673:return Ev;case 5125:return bv;case 36294:return Tv;case 36295:return wv;case 36296:return Av;case 35678:case 36198:case 36298:case 36306:case 35682:return Cv;case 35679:case 36299:case 36307:return Rv;case 35680:case 36300:case 36308:case 36293:return Pv;case 36289:case 36303:case 36311:case 36292:return Lv}}class Uv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=dv(e.type)}}class Iv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Dv(e.type)}}class Ov{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const ga=/(\w+)(\])?(\[|\.)?/g;function Lu(n,t){n.seq.push(t),n.map[t.id]=t}function Fv(n,t,e){const i=n.name,r=i.length;for(ga.lastIndex=0;;){const s=ga.exec(i),o=ga.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Lu(e,c===void 0?new Uv(a,n,t):new Iv(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new Ov(a),Lu(e,u)),e=u}}}class ro{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Fv(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Du(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Nv=37297;let kv=0;function zv(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Uu=new Vt;function Bv(n){Jt._getMatrix(Uu,Jt.workingColorSpace,n);const t=`mat3( ${Uu.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(n)){case fo:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Iu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+zv(n.getShaderSource(t),o)}else return r}function Hv(n,t){const e=Bv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Vv(n,t){let e;switch(t){case Xh:e="Linear";break;case qh:e="Reinhard";break;case Yh:e="Cineon";break;case Nl:e="ACESFilmic";break;case Zh:e="AgX";break;case jh:e="Neutral";break;case $h:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Hs=new k;function Gv(){Jt.getLuminanceCoefficients(Hs);const n=Hs.x.toFixed(4),t=Hs.y.toFixed(4),e=Hs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function Xv(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function qv(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Wr(n){return n!==""}function Ou(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tl(n){return n.replace(Yv,Zv)}const $v=new Map;function Zv(n,t){let e=Wt[t];if(e===void 0){const i=$v.get(t);if(i!==void 0)e=Wt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Tl(e)}const jv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nu(n){return n.replace(jv,Kv)}function Kv(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ku(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Qv(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Vh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===cp?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===jn&&(t="SHADOWMAP_TYPE_VSM"),t}function Jv(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Mr:case Er:t="ENVMAP_TYPE_CUBE";break;case Eo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function tx(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Er:t="ENVMAP_MODE_REFRACTION";break}return t}function ex(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wh:t="ENVMAP_BLENDING_MULTIPLY";break;case wp:t="ENVMAP_BLENDING_MIX";break;case Ap:t="ENVMAP_BLENDING_ADD";break}return t}function nx(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function ix(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Qv(e),c=Jv(e),h=tx(e),u=ex(e),f=nx(e),d=Wv(e),g=Xv(s),_=r.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Wr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Wr).join(`
`),p.length>0&&(p+=`
`)):(m=[ku(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),p=[ku(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?Wt.tonemapping_pars_fragment:"",e.toneMapping!==xi?Vv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Hv("linearToOutputTexel",e.outputColorSpace),Gv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Wr).join(`
`)),o=Tl(o),o=Ou(o,e),o=Fu(o,e),a=Tl(a),a=Ou(a,e),a=Fu(a,e),o=Nu(o),a=Nu(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+o,S=M+p+a,C=Du(r,r.VERTEX_SHADER,y),E=Du(r,r.FRAGMENT_SHADER,S);r.attachShader(_,C),r.attachShader(_,E),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(R){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),N=r.getShaderInfoLog(C).trim(),W=r.getShaderInfoLog(E).trim();let X=!0,$=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,C,E);else{const Q=Iu(r,C,"vertex"),Z=Iu(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+Q+`
`+Z)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(N===""||W==="")&&($=!1);$&&(R.diagnostics={runnable:X,programLog:O,vertexShader:{log:N,prefix:m},fragmentShader:{log:W,prefix:p}})}r.deleteShader(C),r.deleteShader(E),U=new ro(r,_),T=qv(r,_)}let U;this.getUniforms=function(){return U===void 0&&A(this),U};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,Nv)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=kv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=E,this}let rx=0;class sx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new ox(t),e.set(t,i)),i}}class ox{constructor(t){this.id=rx++,this.code=t,this.usedTimes=0}}function ax(n,t,e,i,r,s,o){const a=new Yl,l=new sx,c=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,x,R,O,N){const W=O.fog,X=N.geometry,$=T.isMeshStandardMaterial?O.environment:null,Q=(T.isMeshStandardMaterial?e:t).get(T.envMap||$),Z=Q&&Q.mapping===Eo?Q.image.height:null,lt=g[T.type];T.precision!==null&&(d=r.getMaxPrecision(T.precision),d!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",d,"instead."));const P=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,_t=P!==void 0?P.length:0;let Ut=0;X.morphAttributes.position!==void 0&&(Ut=1),X.morphAttributes.normal!==void 0&&(Ut=2),X.morphAttributes.color!==void 0&&(Ut=3);let I,J,at,dt;if(lt){const se=en[lt];I=se.vertexShader,J=se.fragmentShader}else I=T.vertexShader,J=T.fragmentShader,l.update(T),at=l.getVertexShaderID(T),dt=l.getFragmentShaderID(T);const ht=n.getRenderTarget(),St=n.state.buffers.depth.getReversed(),Xt=N.isInstancedMesh===!0,wt=N.isBatchedMesh===!0,ce=!!T.map,me=!!T.matcap,Qt=!!Q,F=!!T.aoMap,Ue=!!T.lightMap,Zt=!!T.bumpMap,re=!!T.normalMap,Tt=!!T.displacementMap,Yt=!!T.emissiveMap,At=!!T.metalnessMap,kt=!!T.roughnessMap,be=T.anisotropy>0,L=T.clearcoat>0,b=T.dispersion>0,q=T.iridescence>0,D=T.sheen>0,B=T.transmission>0,G=be&&!!T.anisotropyMap,rt=L&&!!T.clearcoatMap,nt=L&&!!T.clearcoatNormalMap,mt=L&&!!T.clearcoatRoughnessMap,xt=q&&!!T.iridescenceMap,tt=q&&!!T.iridescenceThicknessMap,gt=D&&!!T.sheenColorMap,Ct=D&&!!T.sheenRoughnessMap,yt=!!T.specularMap,ct=!!T.specularColorMap,Rt=!!T.specularIntensityMap,z=B&&!!T.transmissionMap,ft=B&&!!T.thicknessMap,it=!!T.gradientMap,Mt=!!T.alphaMap,st=T.alphaTest>0,et=!!T.alphaHash,Et=!!T.extensions;let Nt=xi;T.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Nt=n.toneMapping);const ge={shaderID:lt,shaderType:T.type,shaderName:T.name,vertexShader:I,fragmentShader:J,defines:T.defines,customVertexShaderID:at,customFragmentShaderID:dt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:d,batching:wt,batchingColor:wt&&N._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&N.instanceColor!==null,instancingMorph:Xt&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:br,alphaToCoverage:!!T.alphaToCoverage,map:ce,matcap:me,envMap:Qt,envMapMode:Qt&&Q.mapping,envMapCubeUVHeight:Z,aoMap:F,lightMap:Ue,bumpMap:Zt,normalMap:re,displacementMap:f&&Tt,emissiveMap:Yt,normalMapObjectSpace:re&&T.normalMapType===Dp,normalMapTangentSpace:re&&T.normalMapType===Lp,metalnessMap:At,roughnessMap:kt,anisotropy:be,anisotropyMap:G,clearcoat:L,clearcoatMap:rt,clearcoatNormalMap:nt,clearcoatRoughnessMap:mt,dispersion:b,iridescence:q,iridescenceMap:xt,iridescenceThicknessMap:tt,sheen:D,sheenColorMap:gt,sheenRoughnessMap:Ct,specularMap:yt,specularColorMap:ct,specularIntensityMap:Rt,transmission:B,transmissionMap:z,thicknessMap:ft,gradientMap:it,opaque:T.transparent===!1&&T.blending===_r&&T.alphaToCoverage===!1,alphaMap:Mt,alphaTest:st,alphaHash:et,combine:T.combine,mapUv:ce&&_(T.map.channel),aoMapUv:F&&_(T.aoMap.channel),lightMapUv:Ue&&_(T.lightMap.channel),bumpMapUv:Zt&&_(T.bumpMap.channel),normalMapUv:re&&_(T.normalMap.channel),displacementMapUv:Tt&&_(T.displacementMap.channel),emissiveMapUv:Yt&&_(T.emissiveMap.channel),metalnessMapUv:At&&_(T.metalnessMap.channel),roughnessMapUv:kt&&_(T.roughnessMap.channel),anisotropyMapUv:G&&_(T.anisotropyMap.channel),clearcoatMapUv:rt&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&_(T.sheenRoughnessMap.channel),specularMapUv:yt&&_(T.specularMap.channel),specularColorMapUv:ct&&_(T.specularColorMap.channel),specularIntensityMapUv:Rt&&_(T.specularIntensityMap.channel),transmissionMapUv:z&&_(T.transmissionMap.channel),thicknessMapUv:ft&&_(T.thicknessMap.channel),alphaMapUv:Mt&&_(T.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(re||be),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!X.attributes.uv&&(ce||Mt),fog:!!W,useFog:T.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:St,skinning:N.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Ut,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Nt,decodeVideoTexture:ce&&T.map.isVideoTexture===!0&&Jt.getTransfer(T.map.colorSpace)===ae,decodeVideoTextureEmissive:Yt&&T.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(T.emissiveMap.colorSpace)===ae,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===zn,flipSided:T.side===rn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Et&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&T.extensions.multiDraw===!0||wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function p(T){const x=[];if(T.shaderID?x.push(T.shaderID):(x.push(T.customVertexShaderID),x.push(T.customFragmentShaderID)),T.defines!==void 0)for(const R in T.defines)x.push(R),x.push(T.defines[R]);return T.isRawShaderMaterial===!1&&(M(x,T),y(x,T),x.push(n.outputColorSpace)),x.push(T.customProgramCacheKey),x.join()}function M(T,x){T.push(x.precision),T.push(x.outputColorSpace),T.push(x.envMapMode),T.push(x.envMapCubeUVHeight),T.push(x.mapUv),T.push(x.alphaMapUv),T.push(x.lightMapUv),T.push(x.aoMapUv),T.push(x.bumpMapUv),T.push(x.normalMapUv),T.push(x.displacementMapUv),T.push(x.emissiveMapUv),T.push(x.metalnessMapUv),T.push(x.roughnessMapUv),T.push(x.anisotropyMapUv),T.push(x.clearcoatMapUv),T.push(x.clearcoatNormalMapUv),T.push(x.clearcoatRoughnessMapUv),T.push(x.iridescenceMapUv),T.push(x.iridescenceThicknessMapUv),T.push(x.sheenColorMapUv),T.push(x.sheenRoughnessMapUv),T.push(x.specularMapUv),T.push(x.specularColorMapUv),T.push(x.specularIntensityMapUv),T.push(x.transmissionMapUv),T.push(x.thicknessMapUv),T.push(x.combine),T.push(x.fogExp2),T.push(x.sizeAttenuation),T.push(x.morphTargetsCount),T.push(x.morphAttributeCount),T.push(x.numDirLights),T.push(x.numPointLights),T.push(x.numSpotLights),T.push(x.numSpotLightMaps),T.push(x.numHemiLights),T.push(x.numRectAreaLights),T.push(x.numDirLightShadows),T.push(x.numPointLightShadows),T.push(x.numSpotLightShadows),T.push(x.numSpotLightShadowsWithMaps),T.push(x.numLightProbes),T.push(x.shadowMapType),T.push(x.toneMapping),T.push(x.numClippingPlanes),T.push(x.numClipIntersection),T.push(x.depthPacking)}function y(T,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),T.push(a.mask)}function S(T){const x=g[T.type];let R;if(x){const O=en[x];R=qi.clone(O.uniforms)}else R=T.uniforms;return R}function C(T,x){let R;for(let O=0,N=h.length;O<N;O++){const W=h[O];if(W.cacheKey===x){R=W,++R.usedTimes;break}}return R===void 0&&(R=new ix(n,x,T,s),h.push(R)),R}function E(T){if(--T.usedTimes===0){const x=h.indexOf(T);h[x]=h[h.length-1],h.pop(),T.destroy()}}function A(T){l.remove(T)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:U}}function lx(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function cx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function zu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Bu(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(u,f,d,g,_,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):e.push(p)}function l(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||cx),i.length>1&&i.sort(f||zu),r.length>1&&r.sort(f||zu)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function ux(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new Bu,n.set(i,[o])):r>=s.length?(o=new Bu,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function hx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new jt};break;case"SpotLight":e={position:new k,direction:new k,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function dx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let fx=0;function px(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function mx(n){const t=new hx,e=dx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new de,o=new de;function a(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,y=0,S=0,C=0,E=0,A=0;c.sort(px);for(let T=0,x=c.length;T<x;T++){const R=c[T],O=R.color,N=R.intensity,W=R.distance,X=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=O.r*N,u+=O.g*N,f+=O.b*N;else if(R.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(R.sh.coefficients[$],N);A++}else if(R.isDirectionalLight){const $=t.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Q=R.shadow,Z=e.get(R);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,i.directionalShadow[d]=Z,i.directionalShadowMap[d]=X,i.directionalShadowMatrix[d]=R.shadow.matrix,M++}i.directional[d]=$,d++}else if(R.isSpotLight){const $=t.get(R);$.position.setFromMatrixPosition(R.matrixWorld),$.color.copy(O).multiplyScalar(N),$.distance=W,$.coneCos=Math.cos(R.angle),$.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),$.decay=R.decay,i.spot[_]=$;const Q=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,Q.updateMatrices(R),R.castShadow&&E++),i.spotLightMatrix[_]=Q.matrix,R.castShadow){const Z=e.get(R);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,i.spotShadow[_]=Z,i.spotShadowMap[_]=X,S++}_++}else if(R.isRectAreaLight){const $=t.get(R);$.color.copy(O).multiplyScalar(N),$.halfWidth.set(R.width*.5,0,0),$.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=$,m++}else if(R.isPointLight){const $=t.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),$.distance=R.distance,$.decay=R.decay,R.castShadow){const Q=R.shadow,Z=e.get(R);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,Z.shadowCameraNear=Q.camera.near,Z.shadowCameraFar=Q.camera.far,i.pointShadow[g]=Z,i.pointShadowMap[g]=X,i.pointShadowMatrix[g]=R.shadow.matrix,y++}i.point[g]=$,g++}else if(R.isHemisphereLight){const $=t.get(R);$.skyColor.copy(R.color).multiplyScalar(N),$.groundColor.copy(R.groundColor).multiplyScalar(N),i.hemi[p]=$,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const U=i.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==M||U.numPointShadows!==y||U.numSpotShadows!==S||U.numSpotMaps!==C||U.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=S+C-E,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=A,U.directionalLength=d,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=M,U.numPointShadows=y,U.numSpotShadows=S,U.numSpotMaps=C,U.numLightProbes=A,i.version=fx++)}function l(c,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const y=c[p];if(y.isDirectionalLight){const S=i.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),u++}else if(y.isSpotLight){const S=i.spot[d];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const S=i.hemi[_];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Hu(n){const t=new mx(n),e=[],i=[];function r(h){c.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function gx(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Hu(n),t.set(r,[a])):s>=o.length?(a=new Hu(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const _x=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vx=`uniform sampler2D shadow_pass;
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
}`;function xx(n,t,e){let i=new go;const r=new zt,s=new zt,o=new ue,a=new Vm({depthPacking:Pp}),l=new Gm,c={},h=e.maxTextureSize,u={[yi]:rn,[rn]:yi,[zn]:zn},f=new Pe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:_x,fragmentShader:vx}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new on;g.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new yn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vh;let p=this.type;this.render=function(E,A,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const T=n.getRenderTarget(),x=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Jn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const N=p!==jn&&this.type===jn,W=p===jn&&this.type!==jn;for(let X=0,$=E.length;X<$;X++){const Q=E[X],Z=Q.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const lt=Z.getFrameExtents();if(r.multiply(lt),s.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/lt.x),r.x=s.x*lt.x,Z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/lt.y),r.y=s.y*lt.y,Z.mapSize.y=s.y)),Z.map===null||N===!0||W===!0){const _t=this.type!==jn?{minFilter:$e,magFilter:$e}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Un(r.x,r.y,_t),Z.map.texture.name=Q.name+".shadowMap",Z.camera.updateProjectionMatrix()}n.setRenderTarget(Z.map),n.clear();const P=Z.getViewportCount();for(let _t=0;_t<P;_t++){const Ut=Z.getViewport(_t);o.set(s.x*Ut.x,s.y*Ut.y,s.x*Ut.z,s.y*Ut.w),O.viewport(o),Z.updateMatrices(Q,_t),i=Z.getFrustum(),S(A,U,Z.camera,Q,this.type)}Z.isPointLightShadow!==!0&&this.type===jn&&M(Z,U),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(T,x,R)};function M(E,A){const U=t.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Un(r.x,r.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(A,null,U,f,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(A,null,U,d,_,null)}function y(E,A,U,T){let x=null;const R=U.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)x=R;else if(x=U.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const O=x.uuid,N=A.uuid;let W=c[O];W===void 0&&(W={},c[O]=W);let X=W[N];X===void 0&&(X=x.clone(),W[N]=X,A.addEventListener("dispose",C)),x=X}if(x.visible=A.visible,x.wireframe=A.wireframe,T===jn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const O=n.properties.get(x);O.light=U}return x}function S(E,A,U,T,x){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===jn)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,E.matrixWorld);const N=t.update(E),W=E.material;if(Array.isArray(W)){const X=N.groups;for(let $=0,Q=X.length;$<Q;$++){const Z=X[$],lt=W[Z.materialIndex];if(lt&&lt.visible){const P=y(E,lt,T,x);E.onBeforeShadow(n,E,A,U,N,P,Z),n.renderBufferDirect(U,null,N,P,E,Z),E.onAfterShadow(n,E,A,U,N,P,Z)}}}else if(W.visible){const X=y(E,W,T,x);E.onBeforeShadow(n,E,A,U,N,X,null),n.renderBufferDirect(U,null,N,X,E,null),E.onAfterShadow(n,E,A,U,N,X,null)}}const O=E.children;for(let N=0,W=O.length;N<W;N++)S(O[N],A,U,T,x)}function C(E){E.target.removeEventListener("dispose",C);for(const U in c){const T=c[U],x=E.target.uuid;x in T&&(T[x].dispose(),delete T[x])}}}const yx={[ka]:za,[Ba]:Ga,[Ha]:Wa,[Sr]:Va,[za]:ka,[Ga]:Ba,[Wa]:Ha,[Va]:Sr};function Sx(n,t){function e(){let z=!1;const ft=new ue;let it=null;const Mt=new ue(0,0,0,0);return{setMask:function(st){it!==st&&!z&&(n.colorMask(st,st,st,st),it=st)},setLocked:function(st){z=st},setClear:function(st,et,Et,Nt,ge){ge===!0&&(st*=Nt,et*=Nt,Et*=Nt),ft.set(st,et,Et,Nt),Mt.equals(ft)===!1&&(n.clearColor(st,et,Et,Nt),Mt.copy(ft))},reset:function(){z=!1,it=null,Mt.set(-1,0,0,0)}}}function i(){let z=!1,ft=!1,it=null,Mt=null,st=null;return{setReversed:function(et){if(ft!==et){const Et=t.get("EXT_clip_control");et?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),ft=et;const Nt=st;st=null,this.setClear(Nt)}},getReversed:function(){return ft},setTest:function(et){et?ht(n.DEPTH_TEST):St(n.DEPTH_TEST)},setMask:function(et){it!==et&&!z&&(n.depthMask(et),it=et)},setFunc:function(et){if(ft&&(et=yx[et]),Mt!==et){switch(et){case ka:n.depthFunc(n.NEVER);break;case za:n.depthFunc(n.ALWAYS);break;case Ba:n.depthFunc(n.LESS);break;case Sr:n.depthFunc(n.LEQUAL);break;case Ha:n.depthFunc(n.EQUAL);break;case Va:n.depthFunc(n.GEQUAL);break;case Ga:n.depthFunc(n.GREATER);break;case Wa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Mt=et}},setLocked:function(et){z=et},setClear:function(et){st!==et&&(ft&&(et=1-et),n.clearDepth(et),st=et)},reset:function(){z=!1,it=null,Mt=null,st=null,ft=!1}}}function r(){let z=!1,ft=null,it=null,Mt=null,st=null,et=null,Et=null,Nt=null,ge=null;return{setTest:function(se){z||(se?ht(n.STENCIL_TEST):St(n.STENCIL_TEST))},setMask:function(se){ft!==se&&!z&&(n.stencilMask(se),ft=se)},setFunc:function(se,Mn,Gn){(it!==se||Mt!==Mn||st!==Gn)&&(n.stencilFunc(se,Mn,Gn),it=se,Mt=Mn,st=Gn)},setOp:function(se,Mn,Gn){(et!==se||Et!==Mn||Nt!==Gn)&&(n.stencilOp(se,Mn,Gn),et=se,Et=Mn,Nt=Gn)},setLocked:function(se){z=se},setClear:function(se){ge!==se&&(n.clearStencil(se),ge=se)},reset:function(){z=!1,ft=null,it=null,Mt=null,st=null,et=null,Et=null,Nt=null,ge=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,y=null,S=null,C=null,E=null,A=new jt(0,0,0),U=0,T=!1,x=null,R=null,O=null,N=null,W=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,Q=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Z)[1]),$=Q>=1):Z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),$=Q>=2);let lt=null,P={};const _t=n.getParameter(n.SCISSOR_BOX),Ut=n.getParameter(n.VIEWPORT),I=new ue().fromArray(_t),J=new ue().fromArray(Ut);function at(z,ft,it,Mt){const st=new Uint8Array(4),et=n.createTexture();n.bindTexture(z,et),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Et=0;Et<it;Et++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,Mt,0,n.RGBA,n.UNSIGNED_BYTE,st):n.texImage2D(ft+Et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,st);return et}const dt={};dt[n.TEXTURE_2D]=at(n.TEXTURE_2D,n.TEXTURE_2D,1),dt[n.TEXTURE_CUBE_MAP]=at(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[n.TEXTURE_2D_ARRAY]=at(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),dt[n.TEXTURE_3D]=at(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(Sr),Zt(!1),re(zc),ht(n.CULL_FACE),F(Jn);function ht(z){h[z]!==!0&&(n.enable(z),h[z]=!0)}function St(z){h[z]!==!1&&(n.disable(z),h[z]=!1)}function Xt(z,ft){return u[z]!==ft?(n.bindFramebuffer(z,ft),u[z]=ft,z===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ft),z===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function wt(z,ft){let it=d,Mt=!1;if(z){it=f.get(ft),it===void 0&&(it=[],f.set(ft,it));const st=z.textures;if(it.length!==st.length||it[0]!==n.COLOR_ATTACHMENT0){for(let et=0,Et=st.length;et<Et;et++)it[et]=n.COLOR_ATTACHMENT0+et;it.length=st.length,Mt=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,Mt=!0);Mt&&n.drawBuffers(it)}function ce(z){return g!==z?(n.useProgram(z),g=z,!0):!1}const me={[mi]:n.FUNC_ADD,[up]:n.FUNC_SUBTRACT,[hp]:n.FUNC_REVERSE_SUBTRACT};me[dp]=n.MIN,me[fp]=n.MAX;const Qt={[pp]:n.ZERO,[Oa]:n.ONE,[mp]:n.SRC_COLOR,[Fa]:n.SRC_ALPHA,[Sp]:n.SRC_ALPHA_SATURATE,[xp]:n.DST_COLOR,[_p]:n.DST_ALPHA,[gp]:n.ONE_MINUS_SRC_COLOR,[Na]:n.ONE_MINUS_SRC_ALPHA,[yp]:n.ONE_MINUS_DST_COLOR,[vp]:n.ONE_MINUS_DST_ALPHA,[Mp]:n.CONSTANT_COLOR,[Ep]:n.ONE_MINUS_CONSTANT_COLOR,[bp]:n.CONSTANT_ALPHA,[Tp]:n.ONE_MINUS_CONSTANT_ALPHA};function F(z,ft,it,Mt,st,et,Et,Nt,ge,se){if(z===Jn){_===!0&&(St(n.BLEND),_=!1);return}if(_===!1&&(ht(n.BLEND),_=!0),z!==Gh){if(z!==m||se!==T){if((p!==mi||S!==mi)&&(n.blendEquation(n.FUNC_ADD),p=mi,S=mi),se)switch(z){case _r:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ho:n.blendFunc(n.ONE,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case _r:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ho:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}M=null,y=null,C=null,E=null,A.set(0,0,0),U=0,m=z,T=se}return}st=st||ft,et=et||it,Et=Et||Mt,(ft!==p||st!==S)&&(n.blendEquationSeparate(me[ft],me[st]),p=ft,S=st),(it!==M||Mt!==y||et!==C||Et!==E)&&(n.blendFuncSeparate(Qt[it],Qt[Mt],Qt[et],Qt[Et]),M=it,y=Mt,C=et,E=Et),(Nt.equals(A)===!1||ge!==U)&&(n.blendColor(Nt.r,Nt.g,Nt.b,ge),A.copy(Nt),U=ge),m=z,T=!1}function Ue(z,ft){z.side===zn?St(n.CULL_FACE):ht(n.CULL_FACE);let it=z.side===rn;ft&&(it=!it),Zt(it),z.blending===_r&&z.transparent===!1?F(Jn):F(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),s.setMask(z.colorWrite);const Mt=z.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Yt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):St(n.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(z){x!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),x=z)}function re(z){z!==ap?(ht(n.CULL_FACE),z!==R&&(z===zc?n.cullFace(n.BACK):z===lp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):St(n.CULL_FACE),R=z}function Tt(z){z!==O&&($&&n.lineWidth(z),O=z)}function Yt(z,ft,it){z?(ht(n.POLYGON_OFFSET_FILL),(N!==ft||W!==it)&&(n.polygonOffset(ft,it),N=ft,W=it)):St(n.POLYGON_OFFSET_FILL)}function At(z){z?ht(n.SCISSOR_TEST):St(n.SCISSOR_TEST)}function kt(z){z===void 0&&(z=n.TEXTURE0+X-1),lt!==z&&(n.activeTexture(z),lt=z)}function be(z,ft,it){it===void 0&&(lt===null?it=n.TEXTURE0+X-1:it=lt);let Mt=P[it];Mt===void 0&&(Mt={type:void 0,texture:void 0},P[it]=Mt),(Mt.type!==z||Mt.texture!==ft)&&(lt!==it&&(n.activeTexture(it),lt=it),n.bindTexture(z,ft||dt[z]),Mt.type=z,Mt.texture=ft)}function L(){const z=P[lt];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function q(){try{n.compressedTexImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function D(){try{n.texSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function B(){try{n.texSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function rt(){try{n.compressedTexSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function nt(){try{n.texStorage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function mt(){try{n.texStorage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function xt(){try{n.texImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function tt(){try{n.texImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function gt(z){I.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),I.copy(z))}function Ct(z){J.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),J.copy(z))}function yt(z,ft){let it=c.get(ft);it===void 0&&(it=new WeakMap,c.set(ft,it));let Mt=it.get(z);Mt===void 0&&(Mt=n.getUniformBlockIndex(ft,z.name),it.set(z,Mt))}function ct(z,ft){const Mt=c.get(ft).get(z);l.get(ft)!==Mt&&(n.uniformBlockBinding(ft,Mt,z.__bindingPointIndex),l.set(ft,Mt))}function Rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},lt=null,P={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,y=null,S=null,C=null,E=null,A=new jt(0,0,0),U=0,T=!1,x=null,R=null,O=null,N=null,W=null,I.set(0,0,n.canvas.width,n.canvas.height),J.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ht,disable:St,bindFramebuffer:Xt,drawBuffers:wt,useProgram:ce,setBlending:F,setMaterial:Ue,setFlipSided:Zt,setCullFace:re,setLineWidth:Tt,setPolygonOffset:Yt,setScissorTest:At,activeTexture:kt,bindTexture:be,unbindTexture:L,compressedTexImage2D:b,compressedTexImage3D:q,texImage2D:xt,texImage3D:tt,updateUBOMapping:yt,uniformBlockBinding:ct,texStorage2D:nt,texStorage3D:mt,texSubImage2D:D,texSubImage3D:B,compressedTexSubImage2D:G,compressedTexSubImage3D:rt,scissor:gt,viewport:Ct,reset:Rt}}function Mx(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,b){return d?new OffscreenCanvas(L,b):mo("canvas")}function _(L,b,q){let D=1;const B=be(L);if((B.width>q||B.height>q)&&(D=q/Math.max(B.width,B.height)),D<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const G=Math.floor(D*B.width),rt=Math.floor(D*B.height);u===void 0&&(u=g(G,rt));const nt=b?g(G,rt):u;return nt.width=G,nt.height=rt,nt.getContext("2d").drawImage(L,0,0,G,rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+G+"x"+rt+")."),nt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){n.generateMipmap(L)}function M(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(L,b,q,D,B=!1){if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let G=b;if(b===n.RED&&(q===n.FLOAT&&(G=n.R32F),q===n.HALF_FLOAT&&(G=n.R16F),q===n.UNSIGNED_BYTE&&(G=n.R8)),b===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.R8UI),q===n.UNSIGNED_SHORT&&(G=n.R16UI),q===n.UNSIGNED_INT&&(G=n.R32UI),q===n.BYTE&&(G=n.R8I),q===n.SHORT&&(G=n.R16I),q===n.INT&&(G=n.R32I)),b===n.RG&&(q===n.FLOAT&&(G=n.RG32F),q===n.HALF_FLOAT&&(G=n.RG16F),q===n.UNSIGNED_BYTE&&(G=n.RG8)),b===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.RG8UI),q===n.UNSIGNED_SHORT&&(G=n.RG16UI),q===n.UNSIGNED_INT&&(G=n.RG32UI),q===n.BYTE&&(G=n.RG8I),q===n.SHORT&&(G=n.RG16I),q===n.INT&&(G=n.RG32I)),b===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.RGB8UI),q===n.UNSIGNED_SHORT&&(G=n.RGB16UI),q===n.UNSIGNED_INT&&(G=n.RGB32UI),q===n.BYTE&&(G=n.RGB8I),q===n.SHORT&&(G=n.RGB16I),q===n.INT&&(G=n.RGB32I)),b===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),q===n.UNSIGNED_INT&&(G=n.RGBA32UI),q===n.BYTE&&(G=n.RGBA8I),q===n.SHORT&&(G=n.RGBA16I),q===n.INT&&(G=n.RGBA32I)),b===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),b===n.RGBA){const rt=B?fo:Jt.getTransfer(D);q===n.FLOAT&&(G=n.RGBA32F),q===n.HALF_FLOAT&&(G=n.RGBA16F),q===n.UNSIGNED_BYTE&&(G=rt===ae?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function S(L,b){let q;return L?b===null||b===Xi||b===Kr?q=n.DEPTH24_STENCIL8:b===Dn?q=n.DEPTH32F_STENCIL8:b===jr&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Xi||b===Kr?q=n.DEPTH_COMPONENT24:b===Dn?q=n.DEPTH_COMPONENT32F:b===jr&&(q=n.DEPTH_COMPONENT16),q}function C(L,b){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==$e&&L.minFilter!==Hn?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function E(L){const b=L.target;b.removeEventListener("dispose",E),U(b),b.isVideoTexture&&h.delete(b)}function A(L){const b=L.target;b.removeEventListener("dispose",A),x(b)}function U(L){const b=i.get(L);if(b.__webglInit===void 0)return;const q=L.source,D=f.get(q);if(D){const B=D[b.__cacheKey];B.usedTimes--,B.usedTimes===0&&T(L),Object.keys(D).length===0&&f.delete(q)}i.remove(L)}function T(L){const b=i.get(L);n.deleteTexture(b.__webglTexture);const q=L.source,D=f.get(q);delete D[b.__cacheKey],o.memory.textures--}function x(L){const b=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let D=0;D<6;D++){if(Array.isArray(b.__webglFramebuffer[D]))for(let B=0;B<b.__webglFramebuffer[D].length;B++)n.deleteFramebuffer(b.__webglFramebuffer[D][B]);else n.deleteFramebuffer(b.__webglFramebuffer[D]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[D])}else{if(Array.isArray(b.__webglFramebuffer))for(let D=0;D<b.__webglFramebuffer.length;D++)n.deleteFramebuffer(b.__webglFramebuffer[D]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let D=0;D<b.__webglColorRenderbuffer.length;D++)b.__webglColorRenderbuffer[D]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[D]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const q=L.textures;for(let D=0,B=q.length;D<B;D++){const G=i.get(q[D]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(q[D])}i.remove(L)}let R=0;function O(){R=0}function N(){const L=R;return L>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),R+=1,L}function W(L){const b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.colorSpace),b.join()}function X(L,b){const q=i.get(L);if(L.isVideoTexture&&At(L),L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){const D=L.image;if(D===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(D.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{dt(q,L,b);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+b)}function $(L,b){const q=i.get(L);if(L.version>0&&q.__version!==L.version){dt(q,L,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+b)}function Q(L,b){const q=i.get(L);if(L.version>0&&q.__version!==L.version){dt(q,L,b);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+b)}function Z(L,b){const q=i.get(L);if(L.version>0&&q.__version!==L.version){ht(q,L,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+b)}const lt={[Ya]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[$a]:n.MIRRORED_REPEAT},P={[$e]:n.NEAREST,[Cp]:n.NEAREST_MIPMAP_NEAREST,[vs]:n.NEAREST_MIPMAP_LINEAR,[Hn]:n.LINEAR,[Ho]:n.LINEAR_MIPMAP_NEAREST,[Bi]:n.LINEAR_MIPMAP_LINEAR},_t={[Up]:n.NEVER,[zp]:n.ALWAYS,[Ip]:n.LESS,[od]:n.LEQUAL,[Op]:n.EQUAL,[kp]:n.GEQUAL,[Fp]:n.GREATER,[Np]:n.NOTEQUAL};function Ut(L,b){if(b.type===Dn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Hn||b.magFilter===Ho||b.magFilter===vs||b.magFilter===Bi||b.minFilter===Hn||b.minFilter===Ho||b.minFilter===vs||b.minFilter===Bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,lt[b.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,lt[b.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,lt[b.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,P[b.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,P[b.minFilter]),b.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,_t[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===$e||b.minFilter!==vs&&b.minFilter!==Bi||b.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(L,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function I(L,b){let q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",E));const D=b.source;let B=f.get(D);B===void 0&&(B={},f.set(D,B));const G=W(b);if(G!==L.__cacheKey){B[G]===void 0&&(B[G]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),B[G].usedTimes++;const rt=B[L.__cacheKey];rt!==void 0&&(B[L.__cacheKey].usedTimes--,rt.usedTimes===0&&T(b)),L.__cacheKey=G,L.__webglTexture=B[G].texture}return q}function J(L,b,q){return Math.floor(Math.floor(L/q)/b)}function at(L,b,q,D){const G=L.updateRanges;if(G.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,q,D,b.data);else{G.sort((tt,gt)=>tt.start-gt.start);let rt=0;for(let tt=1;tt<G.length;tt++){const gt=G[rt],Ct=G[tt],yt=gt.start+gt.count,ct=J(Ct.start,b.width,4),Rt=J(gt.start,b.width,4);Ct.start<=yt+1&&ct===Rt&&J(Ct.start+Ct.count-1,b.width,4)===ct?gt.count=Math.max(gt.count,Ct.start+Ct.count-gt.start):(++rt,G[rt]=Ct)}G.length=rt+1;const nt=n.getParameter(n.UNPACK_ROW_LENGTH),mt=n.getParameter(n.UNPACK_SKIP_PIXELS),xt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let tt=0,gt=G.length;tt<gt;tt++){const Ct=G[tt],yt=Math.floor(Ct.start/4),ct=Math.ceil(Ct.count/4),Rt=yt%b.width,z=Math.floor(yt/b.width),ft=ct,it=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Rt),n.pixelStorei(n.UNPACK_SKIP_ROWS,z),e.texSubImage2D(n.TEXTURE_2D,0,Rt,z,ft,it,q,D,b.data)}L.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,nt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,mt),n.pixelStorei(n.UNPACK_SKIP_ROWS,xt)}}function dt(L,b,q){let D=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(D=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(D=n.TEXTURE_3D);const B=I(L,b),G=b.source;e.bindTexture(D,L.__webglTexture,n.TEXTURE0+q);const rt=i.get(G);if(G.version!==rt.__version||B===!0){e.activeTexture(n.TEXTURE0+q);const nt=Jt.getPrimaries(Jt.workingColorSpace),mt=b.colorSpace===gi?null:Jt.getPrimaries(b.colorSpace),xt=b.colorSpace===gi||nt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let tt=_(b.image,!1,r.maxTextureSize);tt=kt(b,tt);const gt=s.convert(b.format,b.colorSpace),Ct=s.convert(b.type);let yt=y(b.internalFormat,gt,Ct,b.colorSpace,b.isVideoTexture);Ut(D,b);let ct;const Rt=b.mipmaps,z=b.isVideoTexture!==!0,ft=rt.__version===void 0||B===!0,it=G.dataReady,Mt=C(b,tt);if(b.isDepthTexture)yt=S(b.format===Jr,b.type),ft&&(z?e.texStorage2D(n.TEXTURE_2D,1,yt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,gt,Ct,null));else if(b.isDataTexture)if(Rt.length>0){z&&ft&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],z?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,gt,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,gt,Ct,ct.data);b.generateMipmaps=!1}else z?(ft&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height),it&&at(b,tt,gt,Ct)):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,gt,Ct,tt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){z&&ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,Rt[0].width,Rt[0].height,tt.depth);for(let st=0,et=Rt.length;st<et;st++)if(ct=Rt[st],b.format!==hn)if(gt!==null)if(z){if(it)if(b.layerUpdates.size>0){const Et=_u(ct.width,ct.height,b.format,b.type);for(const Nt of b.layerUpdates){const ge=ct.data.subarray(Nt*Et/ct.data.BYTES_PER_ELEMENT,(Nt+1)*Et/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,Nt,ct.width,ct.height,1,gt,ge)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,ct.width,ct.height,tt.depth,gt,ct.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,st,yt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?it&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,ct.width,ct.height,tt.depth,gt,Ct,ct.data):e.texImage3D(n.TEXTURE_2D_ARRAY,st,yt,ct.width,ct.height,tt.depth,0,gt,Ct,ct.data)}else{z&&ft&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],b.format!==hn?gt!==null?z?it&&e.compressedTexSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,gt,ct.data):e.compressedTexImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,gt,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,gt,Ct,ct.data)}else if(b.isDataArrayTexture)if(z){if(ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,tt.width,tt.height,tt.depth),it)if(b.layerUpdates.size>0){const st=_u(tt.width,tt.height,b.format,b.type);for(const et of b.layerUpdates){const Et=tt.data.subarray(et*st/tt.data.BYTES_PER_ELEMENT,(et+1)*st/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,et,tt.width,tt.height,1,gt,Ct,Et)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,gt,Ct,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,yt,tt.width,tt.height,tt.depth,0,gt,Ct,tt.data);else if(b.isData3DTexture)z?(ft&&e.texStorage3D(n.TEXTURE_3D,Mt,yt,tt.width,tt.height,tt.depth),it&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,gt,Ct,tt.data)):e.texImage3D(n.TEXTURE_3D,0,yt,tt.width,tt.height,tt.depth,0,gt,Ct,tt.data);else if(b.isFramebufferTexture){if(ft)if(z)e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height);else{let st=tt.width,et=tt.height;for(let Et=0;Et<Mt;Et++)e.texImage2D(n.TEXTURE_2D,Et,yt,st,et,0,gt,Ct,null),st>>=1,et>>=1}}else if(Rt.length>0){if(z&&ft){const st=be(Rt[0]);e.texStorage2D(n.TEXTURE_2D,Mt,yt,st.width,st.height)}for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],z?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,gt,Ct,ct):e.texImage2D(n.TEXTURE_2D,st,yt,gt,Ct,ct);b.generateMipmaps=!1}else if(z){if(ft){const st=be(tt);e.texStorage2D(n.TEXTURE_2D,Mt,yt,st.width,st.height)}it&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt,Ct,tt)}else e.texImage2D(n.TEXTURE_2D,0,yt,gt,Ct,tt);m(b)&&p(D),rt.__version=G.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function ht(L,b,q){if(b.image.length!==6)return;const D=I(L,b),B=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+q);const G=i.get(B);if(B.version!==G.__version||D===!0){e.activeTexture(n.TEXTURE0+q);const rt=Jt.getPrimaries(Jt.workingColorSpace),nt=b.colorSpace===gi?null:Jt.getPrimaries(b.colorSpace),mt=b.colorSpace===gi||rt===nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const xt=b.isCompressedTexture||b.image[0].isCompressedTexture,tt=b.image[0]&&b.image[0].isDataTexture,gt=[];for(let et=0;et<6;et++)!xt&&!tt?gt[et]=_(b.image[et],!0,r.maxCubemapSize):gt[et]=tt?b.image[et].image:b.image[et],gt[et]=kt(b,gt[et]);const Ct=gt[0],yt=s.convert(b.format,b.colorSpace),ct=s.convert(b.type),Rt=y(b.internalFormat,yt,ct,b.colorSpace),z=b.isVideoTexture!==!0,ft=G.__version===void 0||D===!0,it=B.dataReady;let Mt=C(b,Ct);Ut(n.TEXTURE_CUBE_MAP,b);let st;if(xt){z&&ft&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,Ct.width,Ct.height);for(let et=0;et<6;et++){st=gt[et].mipmaps;for(let Et=0;Et<st.length;Et++){const Nt=st[Et];b.format!==hn?yt!==null?z?it&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,Nt.width,Nt.height,yt,Nt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,Nt.width,Nt.height,yt,ct,Nt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,Nt.width,Nt.height,0,yt,ct,Nt.data)}}}else{if(st=b.mipmaps,z&&ft){st.length>0&&Mt++;const et=be(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,et.width,et.height)}for(let et=0;et<6;et++)if(tt){z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,gt[et].width,gt[et].height,yt,ct,gt[et].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,gt[et].width,gt[et].height,0,yt,ct,gt[et].data);for(let Et=0;Et<st.length;Et++){const ge=st[Et].image[et].image;z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,ge.width,ge.height,yt,ct,ge.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,ge.width,ge.height,0,yt,ct,ge.data)}}else{z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,yt,ct,gt[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,yt,ct,gt[et]);for(let Et=0;Et<st.length;Et++){const Nt=st[Et];z?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,yt,ct,Nt.image[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,yt,ct,Nt.image[et])}}}m(b)&&p(n.TEXTURE_CUBE_MAP),G.__version=B.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function St(L,b,q,D,B,G){const rt=s.convert(q.format,q.colorSpace),nt=s.convert(q.type),mt=y(q.internalFormat,rt,nt,q.colorSpace),xt=i.get(b),tt=i.get(q);if(tt.__renderTarget=b,!xt.__hasExternalTextures){const gt=Math.max(1,b.width>>G),Ct=Math.max(1,b.height>>G);B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?e.texImage3D(B,G,mt,gt,Ct,b.depth,0,rt,nt,null):e.texImage2D(B,G,mt,gt,Ct,0,rt,nt,null)}e.bindFramebuffer(n.FRAMEBUFFER,L),Yt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,D,B,tt.__webglTexture,0,Tt(b)):(B===n.TEXTURE_2D||B>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&B<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,D,B,tt.__webglTexture,G),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Xt(L,b,q){if(n.bindRenderbuffer(n.RENDERBUFFER,L),b.depthBuffer){const D=b.depthTexture,B=D&&D.isDepthTexture?D.type:null,G=S(b.stencilBuffer,B),rt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=Tt(b);Yt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt,G,b.width,b.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt,G,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,G,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,L)}else{const D=b.textures;for(let B=0;B<D.length;B++){const G=D[B],rt=s.convert(G.format,G.colorSpace),nt=s.convert(G.type),mt=y(G.internalFormat,rt,nt,G.colorSpace),xt=Tt(b);q&&Yt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,mt,b.width,b.height):Yt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,mt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,mt,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function wt(L,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const D=i.get(b.depthTexture);D.__renderTarget=b,(!D.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X(b.depthTexture,0);const B=D.__webglTexture,G=Tt(b);if(b.depthTexture.format===Qr)Yt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,B,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,B,0);else if(b.depthTexture.format===Jr)Yt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,B,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,B,0);else throw new Error("Unknown depthTexture format")}function ce(L){const b=i.get(L),q=L.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==L.depthTexture){const D=L.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),D){const B=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,D.removeEventListener("dispose",B)};D.addEventListener("dispose",B),b.__depthDisposeCallback=B}b.__boundDepthTexture=D}if(L.depthTexture&&!b.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");const D=L.texture.mipmaps;D&&D.length>0?wt(b.__webglFramebuffer[0],L):wt(b.__webglFramebuffer,L)}else if(q){b.__webglDepthbuffer=[];for(let D=0;D<6;D++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[D]),b.__webglDepthbuffer[D]===void 0)b.__webglDepthbuffer[D]=n.createRenderbuffer(),Xt(b.__webglDepthbuffer[D],L,!1);else{const B=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=b.__webglDepthbuffer[D];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,G)}}else{const D=L.texture.mipmaps;if(D&&D.length>0?e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Xt(b.__webglDepthbuffer,L,!1);else{const B=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,G)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function me(L,b,q){const D=i.get(L);b!==void 0&&St(D.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&ce(L)}function Qt(L){const b=L.texture,q=i.get(L),D=i.get(b);L.addEventListener("dispose",A);const B=L.textures,G=L.isWebGLCubeRenderTarget===!0,rt=B.length>1;if(rt||(D.__webglTexture===void 0&&(D.__webglTexture=n.createTexture()),D.__version=b.version,o.memory.textures++),G){q.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer[nt]=[];for(let mt=0;mt<b.mipmaps.length;mt++)q.__webglFramebuffer[nt][mt]=n.createFramebuffer()}else q.__webglFramebuffer[nt]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer=[];for(let nt=0;nt<b.mipmaps.length;nt++)q.__webglFramebuffer[nt]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(rt)for(let nt=0,mt=B.length;nt<mt;nt++){const xt=i.get(B[nt]);xt.__webglTexture===void 0&&(xt.__webglTexture=n.createTexture(),o.memory.textures++)}if(L.samples>0&&Yt(L)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let nt=0;nt<B.length;nt++){const mt=B[nt];q.__webglColorRenderbuffer[nt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[nt]);const xt=s.convert(mt.format,mt.colorSpace),tt=s.convert(mt.type),gt=y(mt.internalFormat,xt,tt,mt.colorSpace,L.isXRRenderTarget===!0),Ct=Tt(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ct,gt,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.RENDERBUFFER,q.__webglColorRenderbuffer[nt])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),Xt(q.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture),Ut(n.TEXTURE_CUBE_MAP,b);for(let nt=0;nt<6;nt++)if(b.mipmaps&&b.mipmaps.length>0)for(let mt=0;mt<b.mipmaps.length;mt++)St(q.__webglFramebuffer[nt][mt],L,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,mt);else St(q.__webglFramebuffer[nt],L,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(b)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let nt=0,mt=B.length;nt<mt;nt++){const xt=B[nt],tt=i.get(xt);e.bindTexture(n.TEXTURE_2D,tt.__webglTexture),Ut(n.TEXTURE_2D,xt),St(q.__webglFramebuffer,L,xt,n.COLOR_ATTACHMENT0+nt,n.TEXTURE_2D,0),m(xt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let nt=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(nt=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(nt,D.__webglTexture),Ut(nt,b),b.mipmaps&&b.mipmaps.length>0)for(let mt=0;mt<b.mipmaps.length;mt++)St(q.__webglFramebuffer[mt],L,b,n.COLOR_ATTACHMENT0,nt,mt);else St(q.__webglFramebuffer,L,b,n.COLOR_ATTACHMENT0,nt,0);m(b)&&p(nt),e.unbindTexture()}L.depthBuffer&&ce(L)}function F(L){const b=L.textures;for(let q=0,D=b.length;q<D;q++){const B=b[q];if(m(B)){const G=M(L),rt=i.get(B).__webglTexture;e.bindTexture(G,rt),p(G),e.unbindTexture()}}}const Ue=[],Zt=[];function re(L){if(L.samples>0){if(Yt(L)===!1){const b=L.textures,q=L.width,D=L.height;let B=n.COLOR_BUFFER_BIT;const G=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=i.get(L),nt=b.length>1;if(nt)for(let xt=0;xt<b.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);const mt=L.texture.mipmaps;mt&&mt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let xt=0;xt<b.length;xt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(B|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(B|=n.STENCIL_BUFFER_BIT)),nt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,rt.__webglColorRenderbuffer[xt]);const tt=i.get(b[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,q,D,0,0,q,D,B,n.NEAREST),l===!0&&(Ue.length=0,Zt.length=0,Ue.push(n.COLOR_ATTACHMENT0+xt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Ue.push(G),Zt.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Zt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ue))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),nt)for(let xt=0;xt<b.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,rt.__webglColorRenderbuffer[xt]);const tt=i.get(b[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const b=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Tt(L){return Math.min(r.maxSamples,L.samples)}function Yt(L){const b=i.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function At(L){const b=o.render.frame;h.get(L)!==b&&(h.set(L,b),L.update())}function kt(L,b){const q=L.colorSpace,D=L.format,B=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||q!==br&&q!==gi&&(Jt.getTransfer(q)===ae?(D!==hn||B!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),b}function be(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=O,this.setTexture2D=X,this.setTexture2DArray=$,this.setTexture3D=Q,this.setTextureCube=Z,this.rebindTextures=me,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Yt}function Ex(n,t){function e(i,r=gi){let s;const o=Jt.getTransfer(r);if(i===ii)return n.UNSIGNED_BYTE;if(i===zl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Bl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===td)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qh)return n.BYTE;if(i===Jh)return n.SHORT;if(i===jr)return n.UNSIGNED_SHORT;if(i===kl)return n.INT;if(i===Xi)return n.UNSIGNED_INT;if(i===Dn)return n.FLOAT;if(i===ti)return n.HALF_FLOAT;if(i===ed)return n.ALPHA;if(i===nd)return n.RGB;if(i===hn)return n.RGBA;if(i===Qr)return n.DEPTH_COMPONENT;if(i===Jr)return n.DEPTH_STENCIL;if(i===id)return n.RED;if(i===Hl)return n.RED_INTEGER;if(i===rd)return n.RG;if(i===Vl)return n.RG_INTEGER;if(i===Gl)return n.RGBA_INTEGER;if(i===Js||i===to||i===eo||i===no)if(o===ae)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Js)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===to)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===eo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===no)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Js)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===to)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===eo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===no)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Za||i===ja||i===Ka||i===Qa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Za)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ja)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ka)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ja||i===tl||i===el)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ja||i===tl)return o===ae?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===el)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===nl||i===il||i===rl||i===sl||i===ol||i===al||i===ll||i===cl||i===ul||i===hl||i===dl||i===fl||i===pl||i===ml)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===nl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===il)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===rl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===sl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ol)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===al)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ll)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===cl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ul)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===hl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===dl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===fl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===pl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ml)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===io||i===gl||i===_l)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===io)return o===ae?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===gl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_l)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sd||i===vl||i===xl||i===yl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===io)return s.COMPRESSED_RED_RGTC1_EXT;if(i===vl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Kr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const bx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tx=`
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

}`;class wx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Ze,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Pe({vertexShader:bx,fragmentShader:Tx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new yn(new bo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ax extends Ar{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=new wx,m=e.getContextAttributes();let p=null,M=null;const y=[],S=[],C=new zt;let E=null;const A=new vn;A.viewport=new ue;const U=new vn;U.viewport=new ue;const T=[A,U],x=new Xm;let R=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let at=y[J];return at===void 0&&(at=new la,y[J]=at),at.getTargetRaySpace()},this.getControllerGrip=function(J){let at=y[J];return at===void 0&&(at=new la,y[J]=at),at.getGripSpace()},this.getHand=function(J){let at=y[J];return at===void 0&&(at=new la,y[J]=at),at.getHandSpace()};function N(J){const at=S.indexOf(J.inputSource);if(at===-1)return;const dt=y[at];dt!==void 0&&(dt.update(J.inputSource,J.frame,c||o),dt.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",X);for(let J=0;J<y.length;J++){const at=S[J];at!==null&&(S[J]=null,y[J].disconnect(at))}R=null,O=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,r=null,M=null,I.stop(),i.isPresenting=!1,t.setPixelRatio(E),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",W),r.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,ht=null,St=null;m.depth&&(St=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=m.stencil?Jr:Qr,ht=m.stencil?Kr:Xi);const Xt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:s};u=new XRWebGLBinding(r,e),f=u.createProjectionLayer(Xt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new Un(f.textureWidth,f.textureHeight,{format:hn,type:ii,depthTexture:new gd(f.textureWidth,f.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const dt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,dt),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Un(d.framebufferWidth,d.framebufferHeight,{format:hn,type:ii,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),I.setContext(r),I.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(J){for(let at=0;at<J.removed.length;at++){const dt=J.removed[at],ht=S.indexOf(dt);ht>=0&&(S[ht]=null,y[ht].disconnect(dt))}for(let at=0;at<J.added.length;at++){const dt=J.added[at];let ht=S.indexOf(dt);if(ht===-1){for(let Xt=0;Xt<y.length;Xt++)if(Xt>=S.length){S.push(dt),ht=Xt;break}else if(S[Xt]===null){S[Xt]=dt,ht=Xt;break}if(ht===-1)break}const St=y[ht];St&&St.connect(dt)}}const $=new k,Q=new k;function Z(J,at,dt){$.setFromMatrixPosition(at.matrixWorld),Q.setFromMatrixPosition(dt.matrixWorld);const ht=$.distanceTo(Q),St=at.projectionMatrix.elements,Xt=dt.projectionMatrix.elements,wt=St[14]/(St[10]-1),ce=St[14]/(St[10]+1),me=(St[9]+1)/St[5],Qt=(St[9]-1)/St[5],F=(St[8]-1)/St[0],Ue=(Xt[8]+1)/Xt[0],Zt=wt*F,re=wt*Ue,Tt=ht/(-F+Ue),Yt=Tt*-F;if(at.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Yt),J.translateZ(Tt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),St[10]===-1)J.projectionMatrix.copy(at.projectionMatrix),J.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const At=wt+Tt,kt=ce+Tt,be=Zt-Yt,L=re+(ht-Yt),b=me*ce/kt*At,q=Qt*ce/kt*At;J.projectionMatrix.makePerspective(be,L,b,q,At,kt),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function lt(J,at){at===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(at.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let at=J.near,dt=J.far;_.texture!==null&&(_.depthNear>0&&(at=_.depthNear),_.depthFar>0&&(dt=_.depthFar)),x.near=U.near=A.near=at,x.far=U.far=A.far=dt,(R!==x.near||O!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,O=x.far),A.layers.mask=J.layers.mask|2,U.layers.mask=J.layers.mask|4,x.layers.mask=A.layers.mask|U.layers.mask;const ht=J.parent,St=x.cameras;lt(x,ht);for(let Xt=0;Xt<St.length;Xt++)lt(St[Xt],ht);St.length===2?Z(x,A,U):x.projectionMatrix.copy(A.projectionMatrix),P(J,x,ht)};function P(J,at,dt){dt===null?J.matrix.copy(at.matrixWorld):(J.matrix.copy(dt.matrixWorld),J.matrix.invert(),J.matrix.multiply(at.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(at.projectionMatrix),J.projectionMatrixInverse.copy(at.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ts*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let _t=null;function Ut(J,at){if(h=at.getViewerPose(c||o),g=at,h!==null){const dt=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let ht=!1;dt.length!==x.cameras.length&&(x.cameras.length=0,ht=!0);for(let wt=0;wt<dt.length;wt++){const ce=dt[wt];let me=null;if(d!==null)me=d.getViewport(ce);else{const F=u.getViewSubImage(f,ce);me=F.viewport,wt===0&&(t.setRenderTargetTextures(M,F.colorTexture,F.depthStencilTexture),t.setRenderTarget(M))}let Qt=T[wt];Qt===void 0&&(Qt=new vn,Qt.layers.enable(wt),Qt.viewport=new ue,T[wt]=Qt),Qt.matrix.fromArray(ce.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(ce.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(me.x,me.y,me.width,me.height),wt===0&&(x.matrix.copy(Qt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ht===!0&&x.cameras.push(Qt)}const St=r.enabledFeatures;if(St&&St.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&u){const wt=u.getDepthInformation(dt[0]);wt&&wt.isValid&&wt.texture&&_.init(t,wt,r.renderState)}}for(let dt=0;dt<y.length;dt++){const ht=S[dt],St=y[dt];ht!==null&&St!==void 0&&St.update(ht,at,c||o)}_t&&_t(J,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),g=null}const I=new xd;I.setAnimationLoop(Ut),this.setAnimationLoop=function(J){_t=J},this.dispose=function(){}}}const Ui=new ri,Cx=new de;function Rx(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,dd(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,y,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),y=M.envMap,S=M.envMapRotation;y&&(m.envMap.value=y,Ui.copy(S),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),m.envMapRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(Ui)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Px(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const S=y.program;i.uniformBlockBinding(M,S)}function c(M,y){let S=r[M.id];S===void 0&&(g(M),S=h(M),r[M.id]=S,M.addEventListener("dispose",m));const C=y.program;i.updateUBOMapping(M,C);const E=t.render.frame;s[M.id]!==E&&(f(M),s[M.id]=E)}function h(M){const y=u();M.__bindingPointIndex=y;const S=n.createBuffer(),C=M.__size,E=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,S),S}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const y=r[M.id],S=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let E=0,A=S.length;E<A;E++){const U=Array.isArray(S[E])?S[E]:[S[E]];for(let T=0,x=U.length;T<x;T++){const R=U[T];if(d(R,E,T,C)===!0){const O=R.__offset,N=Array.isArray(R.value)?R.value:[R.value];let W=0;for(let X=0;X<N.length;X++){const $=N[X],Q=_($);typeof $=="number"||typeof $=="boolean"?(R.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,O+W,R.__data)):$.isMatrix3?(R.__data[0]=$.elements[0],R.__data[1]=$.elements[1],R.__data[2]=$.elements[2],R.__data[3]=0,R.__data[4]=$.elements[3],R.__data[5]=$.elements[4],R.__data[6]=$.elements[5],R.__data[7]=0,R.__data[8]=$.elements[6],R.__data[9]=$.elements[7],R.__data[10]=$.elements[8],R.__data[11]=0):($.toArray(R.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,y,S,C){const E=M.value,A=y+"_"+S;if(C[A]===void 0)return typeof E=="number"||typeof E=="boolean"?C[A]=E:C[A]=E.clone(),!0;{const U=C[A];if(typeof E=="number"||typeof E=="boolean"){if(U!==E)return C[A]=E,!0}else if(U.equals(E)===!1)return U.copy(E),!0}return!1}function g(M){const y=M.uniforms;let S=0;const C=16;for(let A=0,U=y.length;A<U;A++){const T=Array.isArray(y[A])?y[A]:[y[A]];for(let x=0,R=T.length;x<R;x++){const O=T[x],N=Array.isArray(O.value)?O.value:[O.value];for(let W=0,X=N.length;W<X;W++){const $=N[W],Q=_($),Z=S%C,lt=Z%Q.boundary,P=Z+lt;S+=lt,P!==0&&C-P<Q.storage&&(S+=C-P),O.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=Q.storage}}}const E=S%C;return E>0&&(S+=C-E),M.__size=S,M.__cache={},this}function _(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const S=o.indexOf(y.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function p(){for(const M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class Lx{constructor(t={}){const{canvas:e=im(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let C=!1;this._outputColorSpace=_n;let E=0,A=0,U=null,T=-1,x=null;const R=new ue,O=new ue;let N=null;const W=new jt(0);let X=0,$=e.width,Q=e.height,Z=1,lt=null,P=null;const _t=new ue(0,0,$,Q),Ut=new ue(0,0,$,Q);let I=!1;const J=new go;let at=!1,dt=!1;const ht=new de,St=new de,Xt=new k,wt=new ue,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Qt(){return U===null?Z:1}let F=i;function Ue(w,H){return e.getContext(w,H)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Fl}`),e.addEventListener("webglcontextlost",Mt,!1),e.addEventListener("webglcontextrestored",st,!1),e.addEventListener("webglcontextcreationerror",et,!1),F===null){const H="webgl2";if(F=Ue(H,w),F===null)throw Ue(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Zt,re,Tt,Yt,At,kt,be,L,b,q,D,B,G,rt,nt,mt,xt,tt,gt,Ct,yt,ct,Rt,z;function ft(){Zt=new H0(F),Zt.init(),ct=new Ex(F,Zt),re=new I0(F,Zt,t,ct),Tt=new Sx(F,Zt),re.reverseDepthBuffer&&f&&Tt.buffers.depth.setReversed(!0),Yt=new W0(F),At=new lx,kt=new Mx(F,Zt,Tt,At,re,ct,Yt),be=new F0(S),L=new B0(S),b=new jm(F),Rt=new D0(F,b),q=new V0(F,b,Yt,Rt),D=new q0(F,q,b,Yt),gt=new X0(F,re,kt),mt=new O0(At),B=new ax(S,be,L,Zt,re,Rt,mt),G=new Rx(S,At),rt=new ux,nt=new gx(Zt),tt=new L0(S,be,L,Tt,D,d,l),xt=new xx(S,D,re),z=new Px(F,Yt,re,Tt),Ct=new U0(F,Zt,Yt),yt=new G0(F,Zt,Yt),Yt.programs=B.programs,S.capabilities=re,S.extensions=Zt,S.properties=At,S.renderLists=rt,S.shadowMap=xt,S.state=Tt,S.info=Yt}ft();const it=new Ax(S,F);this.xr=it,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const w=Zt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Zt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(w){w!==void 0&&(Z=w,this.setSize($,Q,!1))},this.getSize=function(w){return w.set($,Q)},this.setSize=function(w,H,j=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=w,Q=H,e.width=Math.floor(w*Z),e.height=Math.floor(H*Z),j===!0&&(e.style.width=w+"px",e.style.height=H+"px"),this.setViewport(0,0,w,H)},this.getDrawingBufferSize=function(w){return w.set($*Z,Q*Z).floor()},this.setDrawingBufferSize=function(w,H,j){$=w,Q=H,Z=j,e.width=Math.floor(w*j),e.height=Math.floor(H*j),this.setViewport(0,0,w,H)},this.getCurrentViewport=function(w){return w.copy(R)},this.getViewport=function(w){return w.copy(_t)},this.setViewport=function(w,H,j,K){w.isVector4?_t.set(w.x,w.y,w.z,w.w):_t.set(w,H,j,K),Tt.viewport(R.copy(_t).multiplyScalar(Z).round())},this.getScissor=function(w){return w.copy(Ut)},this.setScissor=function(w,H,j,K){w.isVector4?Ut.set(w.x,w.y,w.z,w.w):Ut.set(w,H,j,K),Tt.scissor(O.copy(Ut).multiplyScalar(Z).round())},this.getScissorTest=function(){return I},this.setScissorTest=function(w){Tt.setScissorTest(I=w)},this.setOpaqueSort=function(w){lt=w},this.setTransparentSort=function(w){P=w},this.getClearColor=function(w){return w.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(w=!0,H=!0,j=!0){let K=0;if(w){let V=!1;if(U!==null){const ot=U.texture.format;V=ot===Gl||ot===Vl||ot===Hl}if(V){const ot=U.texture.type,pt=ot===ii||ot===Xi||ot===jr||ot===Kr||ot===zl||ot===Bl,bt=tt.getClearColor(),vt=tt.getClearAlpha(),It=bt.r,Ft=bt.g,Pt=bt.b;pt?(g[0]=It,g[1]=Ft,g[2]=Pt,g[3]=vt,F.clearBufferuiv(F.COLOR,0,g)):(_[0]=It,_[1]=Ft,_[2]=Pt,_[3]=vt,F.clearBufferiv(F.COLOR,0,_))}else K|=F.COLOR_BUFFER_BIT}H&&(K|=F.DEPTH_BUFFER_BIT),j&&(K|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Mt,!1),e.removeEventListener("webglcontextrestored",st,!1),e.removeEventListener("webglcontextcreationerror",et,!1),tt.dispose(),rt.dispose(),nt.dispose(),At.dispose(),be.dispose(),L.dispose(),D.dispose(),Rt.dispose(),z.dispose(),B.dispose(),it.dispose(),it.removeEventListener("sessionstart",ac),it.removeEventListener("sessionend",lc),bi.stop()};function Mt(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function st(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const w=Yt.autoReset,H=xt.enabled,j=xt.autoUpdate,K=xt.needsUpdate,V=xt.type;ft(),Yt.autoReset=w,xt.enabled=H,xt.autoUpdate=j,xt.needsUpdate=K,xt.type=V}function et(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Et(w){const H=w.target;H.removeEventListener("dispose",Et),Nt(H)}function Nt(w){ge(w),At.remove(w)}function ge(w){const H=At.get(w).programs;H!==void 0&&(H.forEach(function(j){B.releaseProgram(j)}),w.isShaderMaterial&&B.releaseShaderCache(w))}this.renderBufferDirect=function(w,H,j,K,V,ot){H===null&&(H=ce);const pt=V.isMesh&&V.matrixWorld.determinant()<0,bt=mf(w,H,j,K,V);Tt.setMaterial(K,pt);let vt=j.index,It=1;if(K.wireframe===!0){if(vt=q.getWireframeAttribute(j),vt===void 0)return;It=2}const Ft=j.drawRange,Pt=j.attributes.position;let $t=Ft.start*It,oe=(Ft.start+Ft.count)*It;ot!==null&&($t=Math.max($t,ot.start*It),oe=Math.min(oe,(ot.start+ot.count)*It)),vt!==null?($t=Math.max($t,0),oe=Math.min(oe,vt.count)):Pt!=null&&($t=Math.max($t,0),oe=Math.min(oe,Pt.count));const ve=oe-$t;if(ve<0||ve===1/0)return;Rt.setup(V,K,bt,j,vt);let Se,te=Ct;if(vt!==null&&(Se=b.get(vt),te=yt,te.setIndex(Se)),V.isMesh)K.wireframe===!0?(Tt.setLineWidth(K.wireframeLinewidth*Qt()),te.setMode(F.LINES)):te.setMode(F.TRIANGLES);else if(V.isLine){let Dt=K.linewidth;Dt===void 0&&(Dt=1),Tt.setLineWidth(Dt*Qt()),V.isLineSegments?te.setMode(F.LINES):V.isLineLoop?te.setMode(F.LINE_LOOP):te.setMode(F.LINE_STRIP)}else V.isPoints?te.setMode(F.POINTS):V.isSprite&&te.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)vr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),te.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))te.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Dt=V._multiDrawStarts,Ne=V._multiDrawCounts,ne=V._multiDrawCount,En=vt?b.get(vt).bytesPerElement:1,Zi=At.get(K).currentProgram.getUniforms();for(let ln=0;ln<ne;ln++)Zi.setValue(F,"_gl_DrawID",ln),te.render(Dt[ln]/En,Ne[ln])}else if(V.isInstancedMesh)te.renderInstances($t,ve,V.count);else if(j.isInstancedBufferGeometry){const Dt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ne=Math.min(j.instanceCount,Dt);te.renderInstances($t,ve,Ne)}else te.render($t,ve)};function se(w,H,j){w.transparent===!0&&w.side===zn&&w.forceSinglePass===!1?(w.side=rn,w.needsUpdate=!0,ls(w,H,j),w.side=yi,w.needsUpdate=!0,ls(w,H,j),w.side=zn):ls(w,H,j)}this.compile=function(w,H,j=null){j===null&&(j=w),p=nt.get(j),p.init(H),y.push(p),j.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),w!==j&&w.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const K=new Set;return w.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ot=V.material;if(ot)if(Array.isArray(ot))for(let pt=0;pt<ot.length;pt++){const bt=ot[pt];se(bt,j,V),K.add(bt)}else se(ot,j,V),K.add(ot)}),p=y.pop(),K},this.compileAsync=function(w,H,j=null){const K=this.compile(w,H,j);return new Promise(V=>{function ot(){if(K.forEach(function(pt){At.get(pt).currentProgram.isReady()&&K.delete(pt)}),K.size===0){V(w);return}setTimeout(ot,10)}Zt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Mn=null;function Gn(w){Mn&&Mn(w)}function ac(){bi.stop()}function lc(){bi.start()}const bi=new xd;bi.setAnimationLoop(Gn),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(w){Mn=w,it.setAnimationLoop(w),w===null?bi.stop():bi.start()},it.addEventListener("sessionstart",ac),it.addEventListener("sessionend",lc),this.render=function(w,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(H),H=it.getCamera()),w.isScene===!0&&w.onBeforeRender(S,w,H,U),p=nt.get(w,y.length),p.init(H),y.push(p),St.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),J.setFromProjectionMatrix(St),dt=this.localClippingEnabled,at=mt.init(this.clippingPlanes,dt),m=rt.get(w,M.length),m.init(),M.push(m),it.enabled===!0&&it.isPresenting===!0){const ot=S.xr.getDepthSensingMesh();ot!==null&&Po(ot,H,-1/0,S.sortObjects)}Po(w,H,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(lt,P),me=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,me&&tt.addToRenderList(m,w),this.info.render.frame++,at===!0&&mt.beginShadows();const j=p.state.shadowsArray;xt.render(j,w,H),at===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,V=m.transmissive;if(p.setupLights(),H.isArrayCamera){const ot=H.cameras;if(V.length>0)for(let pt=0,bt=ot.length;pt<bt;pt++){const vt=ot[pt];uc(K,V,w,vt)}me&&tt.render(w);for(let pt=0,bt=ot.length;pt<bt;pt++){const vt=ot[pt];cc(m,w,vt,vt.viewport)}}else V.length>0&&uc(K,V,w,H),me&&tt.render(w),cc(m,w,H);U!==null&&A===0&&(kt.updateMultisampleRenderTarget(U),kt.updateRenderTargetMipmap(U)),w.isScene===!0&&w.onAfterRender(S,w,H),Rt.resetDefaultState(),T=-1,x=null,y.pop(),y.length>0?(p=y[y.length-1],at===!0&&mt.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Po(w,H,j,K){if(w.visible===!1)return;if(w.layers.test(H.layers)){if(w.isGroup)j=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(H);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||J.intersectsSprite(w)){K&&wt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(St);const pt=D.update(w),bt=w.material;bt.visible&&m.push(w,pt,bt,j,wt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||J.intersectsObject(w))){const pt=D.update(w),bt=w.material;if(K&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),wt.copy(w.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),wt.copy(pt.boundingSphere.center)),wt.applyMatrix4(w.matrixWorld).applyMatrix4(St)),Array.isArray(bt)){const vt=pt.groups;for(let It=0,Ft=vt.length;It<Ft;It++){const Pt=vt[It],$t=bt[Pt.materialIndex];$t&&$t.visible&&m.push(w,pt,$t,j,wt.z,Pt)}}else bt.visible&&m.push(w,pt,bt,j,wt.z,null)}}const ot=w.children;for(let pt=0,bt=ot.length;pt<bt;pt++)Po(ot[pt],H,j,K)}function cc(w,H,j,K){const V=w.opaque,ot=w.transmissive,pt=w.transparent;p.setupLightsView(j),at===!0&&mt.setGlobalState(S.clippingPlanes,j),K&&Tt.viewport(R.copy(K)),V.length>0&&as(V,H,j),ot.length>0&&as(ot,H,j),pt.length>0&&as(pt,H,j),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function uc(w,H,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[K.id]===void 0&&(p.state.transmissionRenderTarget[K.id]=new Un(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?ti:ii,minFilter:Bi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const ot=p.state.transmissionRenderTarget[K.id],pt=K.viewport||R;ot.setSize(pt.z*S.transmissionResolutionScale,pt.w*S.transmissionResolutionScale);const bt=S.getRenderTarget();S.setRenderTarget(ot),S.getClearColor(W),X=S.getClearAlpha(),X<1&&S.setClearColor(16777215,.5),S.clear(),me&&tt.render(j);const vt=S.toneMapping;S.toneMapping=xi;const It=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),p.setupLightsView(K),at===!0&&mt.setGlobalState(S.clippingPlanes,K),as(w,j,K),kt.updateMultisampleRenderTarget(ot),kt.updateRenderTargetMipmap(ot),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let Pt=0,$t=H.length;Pt<$t;Pt++){const oe=H[Pt],ve=oe.object,Se=oe.geometry,te=oe.material,Dt=oe.group;if(te.side===zn&&ve.layers.test(K.layers)){const Ne=te.side;te.side=rn,te.needsUpdate=!0,hc(ve,j,K,Se,te,Dt),te.side=Ne,te.needsUpdate=!0,Ft=!0}}Ft===!0&&(kt.updateMultisampleRenderTarget(ot),kt.updateRenderTargetMipmap(ot))}S.setRenderTarget(bt),S.setClearColor(W,X),It!==void 0&&(K.viewport=It),S.toneMapping=vt}function as(w,H,j){const K=H.isScene===!0?H.overrideMaterial:null;for(let V=0,ot=w.length;V<ot;V++){const pt=w[V],bt=pt.object,vt=pt.geometry,It=pt.group;let Ft=pt.material;Ft.allowOverride===!0&&K!==null&&(Ft=K),bt.layers.test(j.layers)&&hc(bt,H,j,vt,Ft,It)}}function hc(w,H,j,K,V,ot){w.onBeforeRender(S,H,j,K,V,ot),w.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),V.onBeforeRender(S,H,j,K,w,ot),V.transparent===!0&&V.side===zn&&V.forceSinglePass===!1?(V.side=rn,V.needsUpdate=!0,S.renderBufferDirect(j,H,K,V,w,ot),V.side=yi,V.needsUpdate=!0,S.renderBufferDirect(j,H,K,V,w,ot),V.side=zn):S.renderBufferDirect(j,H,K,V,w,ot),w.onAfterRender(S,H,j,K,V,ot)}function ls(w,H,j){H.isScene!==!0&&(H=ce);const K=At.get(w),V=p.state.lights,ot=p.state.shadowsArray,pt=V.state.version,bt=B.getParameters(w,V.state,ot,H,j),vt=B.getProgramCacheKey(bt);let It=K.programs;K.environment=w.isMeshStandardMaterial?H.environment:null,K.fog=H.fog,K.envMap=(w.isMeshStandardMaterial?L:be).get(w.envMap||K.environment),K.envMapRotation=K.environment!==null&&w.envMap===null?H.environmentRotation:w.envMapRotation,It===void 0&&(w.addEventListener("dispose",Et),It=new Map,K.programs=It);let Ft=It.get(vt);if(Ft!==void 0){if(K.currentProgram===Ft&&K.lightsStateVersion===pt)return fc(w,bt),Ft}else bt.uniforms=B.getUniforms(w),w.onBeforeCompile(bt,S),Ft=B.acquireProgram(bt,vt),It.set(vt,Ft),K.uniforms=bt.uniforms;const Pt=K.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pt.clippingPlanes=mt.uniform),fc(w,bt),K.needsLights=_f(w),K.lightsStateVersion=pt,K.needsLights&&(Pt.ambientLightColor.value=V.state.ambient,Pt.lightProbe.value=V.state.probe,Pt.directionalLights.value=V.state.directional,Pt.directionalLightShadows.value=V.state.directionalShadow,Pt.spotLights.value=V.state.spot,Pt.spotLightShadows.value=V.state.spotShadow,Pt.rectAreaLights.value=V.state.rectArea,Pt.ltc_1.value=V.state.rectAreaLTC1,Pt.ltc_2.value=V.state.rectAreaLTC2,Pt.pointLights.value=V.state.point,Pt.pointLightShadows.value=V.state.pointShadow,Pt.hemisphereLights.value=V.state.hemi,Pt.directionalShadowMap.value=V.state.directionalShadowMap,Pt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pt.spotShadowMap.value=V.state.spotShadowMap,Pt.spotLightMatrix.value=V.state.spotLightMatrix,Pt.spotLightMap.value=V.state.spotLightMap,Pt.pointShadowMap.value=V.state.pointShadowMap,Pt.pointShadowMatrix.value=V.state.pointShadowMatrix),K.currentProgram=Ft,K.uniformsList=null,Ft}function dc(w){if(w.uniformsList===null){const H=w.currentProgram.getUniforms();w.uniformsList=ro.seqWithValue(H.seq,w.uniforms)}return w.uniformsList}function fc(w,H){const j=At.get(w);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function mf(w,H,j,K,V){H.isScene!==!0&&(H=ce),kt.resetTextureUnits();const ot=H.fog,pt=K.isMeshStandardMaterial?H.environment:null,bt=U===null?S.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:br,vt=(K.isMeshStandardMaterial?L:be).get(K.envMap||pt),It=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ft=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Pt=!!j.morphAttributes.position,$t=!!j.morphAttributes.normal,oe=!!j.morphAttributes.color;let ve=xi;K.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ve=S.toneMapping);const Se=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,te=Se!==void 0?Se.length:0,Dt=At.get(K),Ne=p.state.lights;if(at===!0&&(dt===!0||w!==x)){const We=w===x&&K.id===T;mt.setState(K,w,We)}let ne=!1;K.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==Ne.state.version||Dt.outputColorSpace!==bt||V.isBatchedMesh&&Dt.batching===!1||!V.isBatchedMesh&&Dt.batching===!0||V.isBatchedMesh&&Dt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Dt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Dt.instancing===!1||!V.isInstancedMesh&&Dt.instancing===!0||V.isSkinnedMesh&&Dt.skinning===!1||!V.isSkinnedMesh&&Dt.skinning===!0||V.isInstancedMesh&&Dt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Dt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Dt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Dt.instancingMorph===!1&&V.morphTexture!==null||Dt.envMap!==vt||K.fog===!0&&Dt.fog!==ot||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==mt.numPlanes||Dt.numIntersection!==mt.numIntersection)||Dt.vertexAlphas!==It||Dt.vertexTangents!==Ft||Dt.morphTargets!==Pt||Dt.morphNormals!==$t||Dt.morphColors!==oe||Dt.toneMapping!==ve||Dt.morphTargetsCount!==te)&&(ne=!0):(ne=!0,Dt.__version=K.version);let En=Dt.currentProgram;ne===!0&&(En=ls(K,H,V));let Zi=!1,ln=!1,Lr=!1;const _e=En.getUniforms(),fn=Dt.uniforms;if(Tt.useProgram(En.program)&&(Zi=!0,ln=!0,Lr=!0),K.id!==T&&(T=K.id,ln=!0),Zi||x!==w){Tt.buffers.depth.getReversed()?(ht.copy(w.projectionMatrix),sm(ht),om(ht),_e.setValue(F,"projectionMatrix",ht)):_e.setValue(F,"projectionMatrix",w.projectionMatrix),_e.setValue(F,"viewMatrix",w.matrixWorldInverse);const je=_e.map.cameraPosition;je!==void 0&&je.setValue(F,Xt.setFromMatrixPosition(w.matrixWorld)),re.logarithmicDepthBuffer&&_e.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&_e.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),x!==w&&(x=w,ln=!0,Lr=!0)}if(V.isSkinnedMesh){_e.setOptional(F,V,"bindMatrix"),_e.setOptional(F,V,"bindMatrixInverse");const We=V.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),_e.setValue(F,"boneTexture",We.boneTexture,kt))}V.isBatchedMesh&&(_e.setOptional(F,V,"batchingTexture"),_e.setValue(F,"batchingTexture",V._matricesTexture,kt),_e.setOptional(F,V,"batchingIdTexture"),_e.setValue(F,"batchingIdTexture",V._indirectTexture,kt),_e.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&_e.setValue(F,"batchingColorTexture",V._colorsTexture,kt));const pn=j.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&gt.update(V,j,En),(ln||Dt.receiveShadow!==V.receiveShadow)&&(Dt.receiveShadow=V.receiveShadow,_e.setValue(F,"receiveShadow",V.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(fn.envMap.value=vt,fn.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&H.environment!==null&&(fn.envMapIntensity.value=H.environmentIntensity),ln&&(_e.setValue(F,"toneMappingExposure",S.toneMappingExposure),Dt.needsLights&&gf(fn,Lr),ot&&K.fog===!0&&G.refreshFogUniforms(fn,ot),G.refreshMaterialUniforms(fn,K,Z,Q,p.state.transmissionRenderTarget[w.id]),ro.upload(F,dc(Dt),fn,kt)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ro.upload(F,dc(Dt),fn,kt),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&_e.setValue(F,"center",V.center),_e.setValue(F,"modelViewMatrix",V.modelViewMatrix),_e.setValue(F,"normalMatrix",V.normalMatrix),_e.setValue(F,"modelMatrix",V.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const We=K.uniformsGroups;for(let je=0,Lo=We.length;je<Lo;je++){const Ti=We[je];z.update(Ti,En),z.bind(Ti,En)}}return En}function gf(w,H){w.ambientLightColor.needsUpdate=H,w.lightProbe.needsUpdate=H,w.directionalLights.needsUpdate=H,w.directionalLightShadows.needsUpdate=H,w.pointLights.needsUpdate=H,w.pointLightShadows.needsUpdate=H,w.spotLights.needsUpdate=H,w.spotLightShadows.needsUpdate=H,w.rectAreaLights.needsUpdate=H,w.hemisphereLights.needsUpdate=H}function _f(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(w,H,j){const K=At.get(w);K.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),At.get(w.texture).__webglTexture=H,At.get(w.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:j,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,H){const j=At.get(w);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0};const vf=F.createFramebuffer();this.setRenderTarget=function(w,H=0,j=0){U=w,E=H,A=j;let K=!0,V=null,ot=!1,pt=!1;if(w){const vt=At.get(w);if(vt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(F.FRAMEBUFFER,null),K=!1;else if(vt.__webglFramebuffer===void 0)kt.setupRenderTarget(w);else if(vt.__hasExternalTextures)kt.rebindTextures(w,At.get(w.texture).__webglTexture,At.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Pt=w.depthTexture;if(vt.__boundDepthTexture!==Pt){if(Pt!==null&&At.has(Pt)&&(w.width!==Pt.image.width||w.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(w)}}const It=w.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(pt=!0);const Ft=At.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ft[H])?V=Ft[H][j]:V=Ft[H],ot=!0):w.samples>0&&kt.useMultisampledRTT(w)===!1?V=At.get(w).__webglMultisampledFramebuffer:Array.isArray(Ft)?V=Ft[j]:V=Ft,R.copy(w.viewport),O.copy(w.scissor),N=w.scissorTest}else R.copy(_t).multiplyScalar(Z).floor(),O.copy(Ut).multiplyScalar(Z).floor(),N=I;if(j!==0&&(V=vf),Tt.bindFramebuffer(F.FRAMEBUFFER,V)&&K&&Tt.drawBuffers(w,V),Tt.viewport(R),Tt.scissor(O),Tt.setScissorTest(N),ot){const vt=At.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,vt.__webglTexture,j)}else if(pt){const vt=At.get(w.texture),It=H;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,vt.__webglTexture,j,It)}else if(w!==null&&j!==0){const vt=At.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,vt.__webglTexture,j)}T=-1},this.readRenderTargetPixels=function(w,H,j,K,V,ot,pt,bt=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt){Tt.bindFramebuffer(F.FRAMEBUFFER,vt);try{const It=w.textures[bt],Ft=It.format,Pt=It.type;if(!re.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=w.width-K&&j>=0&&j<=w.height-V&&(w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt),F.readPixels(H,j,K,V,ct.convert(Ft),ct.convert(Pt),ot))}finally{const It=U!==null?At.get(U).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(w,H,j,K,V,ot,pt,bt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt)if(H>=0&&H<=w.width-K&&j>=0&&j<=w.height-V){Tt.bindFramebuffer(F.FRAMEBUFFER,vt);const It=w.textures[bt],Ft=It.format,Pt=It.type;if(!re.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,$t),F.bufferData(F.PIXEL_PACK_BUFFER,ot.byteLength,F.STREAM_READ),w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt),F.readPixels(H,j,K,V,ct.convert(Ft),ct.convert(Pt),0);const oe=U!==null?At.get(U).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,oe);const ve=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await rm(F,ve,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,$t),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ot),F.deleteBuffer($t),F.deleteSync(ve),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,H=null,j=0){const K=Math.pow(2,-j),V=Math.floor(w.image.width*K),ot=Math.floor(w.image.height*K),pt=H!==null?H.x:0,bt=H!==null?H.y:0;kt.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,j,0,0,pt,bt,V,ot),Tt.unbindTexture()};const xf=F.createFramebuffer(),yf=F.createFramebuffer();this.copyTextureToTexture=function(w,H,j=null,K=null,V=0,ot=null){ot===null&&(V!==0?(vr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ot=V,V=0):ot=0);let pt,bt,vt,It,Ft,Pt,$t,oe,ve;const Se=w.isCompressedTexture?w.mipmaps[ot]:w.image;if(j!==null)pt=j.max.x-j.min.x,bt=j.max.y-j.min.y,vt=j.isBox3?j.max.z-j.min.z:1,It=j.min.x,Ft=j.min.y,Pt=j.isBox3?j.min.z:0;else{const pn=Math.pow(2,-V);pt=Math.floor(Se.width*pn),bt=Math.floor(Se.height*pn),w.isDataArrayTexture?vt=Se.depth:w.isData3DTexture?vt=Math.floor(Se.depth*pn):vt=1,It=0,Ft=0,Pt=0}K!==null?($t=K.x,oe=K.y,ve=K.z):($t=0,oe=0,ve=0);const te=ct.convert(H.format),Dt=ct.convert(H.type);let Ne;H.isData3DTexture?(kt.setTexture3D(H,0),Ne=F.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(kt.setTexture2DArray(H,0),Ne=F.TEXTURE_2D_ARRAY):(kt.setTexture2D(H,0),Ne=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const ne=F.getParameter(F.UNPACK_ROW_LENGTH),En=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Zi=F.getParameter(F.UNPACK_SKIP_PIXELS),ln=F.getParameter(F.UNPACK_SKIP_ROWS),Lr=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Se.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Se.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,It),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ft),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Pt);const _e=w.isDataArrayTexture||w.isData3DTexture,fn=H.isDataArrayTexture||H.isData3DTexture;if(w.isDepthTexture){const pn=At.get(w),We=At.get(H),je=At.get(pn.__renderTarget),Lo=At.get(We.__renderTarget);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,je.__webglFramebuffer),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Lo.__webglFramebuffer);for(let Ti=0;Ti<vt;Ti++)_e&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(w).__webglTexture,V,Pt+Ti),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(H).__webglTexture,ot,ve+Ti)),F.blitFramebuffer(It,Ft,pt,bt,$t,oe,pt,bt,F.DEPTH_BUFFER_BIT,F.NEAREST);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||w.isRenderTargetTexture||At.has(w)){const pn=At.get(w),We=At.get(H);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,xf),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,yf);for(let je=0;je<vt;je++)_e?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,pn.__webglTexture,V,Pt+je):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pn.__webglTexture,V),fn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,We.__webglTexture,ot,ve+je):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,We.__webglTexture,ot),V!==0?F.blitFramebuffer(It,Ft,pt,bt,$t,oe,pt,bt,F.COLOR_BUFFER_BIT,F.NEAREST):fn?F.copyTexSubImage3D(Ne,ot,$t,oe,ve+je,It,Ft,pt,bt):F.copyTexSubImage2D(Ne,ot,$t,oe,It,Ft,pt,bt);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else fn?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(Ne,ot,$t,oe,ve,pt,bt,vt,te,Dt,Se.data):H.isCompressedArrayTexture?F.compressedTexSubImage3D(Ne,ot,$t,oe,ve,pt,bt,vt,te,Se.data):F.texSubImage3D(Ne,ot,$t,oe,ve,pt,bt,vt,te,Dt,Se):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ot,$t,oe,pt,bt,te,Dt,Se.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ot,$t,oe,Se.width,Se.height,te,Se.data):F.texSubImage2D(F.TEXTURE_2D,ot,$t,oe,pt,bt,te,Dt,Se);F.pixelStorei(F.UNPACK_ROW_LENGTH,ne),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,En),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Zi),F.pixelStorei(F.UNPACK_SKIP_ROWS,ln),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Lr),ot===0&&H.generateMipmaps&&F.generateMipmap(Ne),Tt.unbindTexture()},this.copyTextureToTexture3D=function(w,H,j=null,K=null,V=0){return vr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,H,j,K,V)},this.initRenderTarget=function(w){At.get(w).__webglFramebuffer===void 0&&kt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?kt.setTextureCube(w,0):w.isData3DTexture?kt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?kt.setTexture2DArray(w,0):kt.setTexture2D(w,0),Tt.unbindTexture()},this.resetState=function(){E=0,A=0,U=null,Tt.reset(),Rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new zt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};en.line={uniforms:qi.merge([ut.common,ut.fog,ut.line]),vertexShader:`
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
		`};class bd extends Pe{constructor(t){super({type:"LineMaterial",uniforms:qi.clone(en.line.uniforms),vertexShader:en.line.vertexShader,fragmentShader:en.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Vu=new si,Vs=new k;class Td extends Wm{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new He(t,3)),this.setAttribute("uv",new He(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new El(e,6,1);return this.setAttribute("instanceStart",new vi(i,3,0)),this.setAttribute("instanceEnd",new vi(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new El(e,6,1);return this.setAttribute("instanceColorStart",new vi(i,3,0)),this.setAttribute("instanceColorEnd",new vi(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Bm(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Vu.setFromBufferAttribute(e),this.boundingBox.union(Vu))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mi),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Vs.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Vs)),Vs.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Vs));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const _a=new ue,Gu=new k,Wu=new k,ke=new ue,ze=new ue,Nn=new ue,va=new k,xa=new de,Be=new $m,Xu=new k,Gs=new si,Ws=new Mi,kn=new ue;let Bn,Vi;function qu(n,t,e){return kn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),kn.multiplyScalar(1/kn.w),kn.x=Vi/e.width,kn.y=Vi/e.height,kn.applyMatrix4(n.projectionMatrixInverse),kn.multiplyScalar(1/kn.w),Math.abs(Math.max(kn.x,kn.y))}function Dx(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,l=o;a<l;a++){Be.start.fromBufferAttribute(r,a),Be.end.fromBufferAttribute(s,a),Be.applyMatrix4(e);const c=new k,h=new k;Bn.distanceSqToSegment(Be.start,Be.end,h,c),h.distanceTo(c)<Vi*.5&&t.push({point:h,pointOnLine:c,distance:Bn.origin.distanceTo(h),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function Ux(n,t,e){const i=t.projectionMatrix,s=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),u=-t.near;Bn.at(1,Nn),Nn.w=1,Nn.applyMatrix4(t.matrixWorldInverse),Nn.applyMatrix4(i),Nn.multiplyScalar(1/Nn.w),Nn.x*=s.x/2,Nn.y*=s.y/2,Nn.z=0,va.copy(Nn),xa.multiplyMatrices(t.matrixWorldInverse,o);for(let f=0,d=h;f<d;f++){if(ke.fromBufferAttribute(l,f),ze.fromBufferAttribute(c,f),ke.w=1,ze.w=1,ke.applyMatrix4(xa),ze.applyMatrix4(xa),ke.z>u&&ze.z>u)continue;if(ke.z>u){const y=ke.z-ze.z,S=(ke.z-u)/y;ke.lerp(ze,S)}else if(ze.z>u){const y=ze.z-ke.z,S=(ze.z-u)/y;ze.lerp(ke,S)}ke.applyMatrix4(i),ze.applyMatrix4(i),ke.multiplyScalar(1/ke.w),ze.multiplyScalar(1/ze.w),ke.x*=s.x/2,ke.y*=s.y/2,ze.x*=s.x/2,ze.y*=s.y/2,Be.start.copy(ke),Be.start.z=0,Be.end.copy(ze),Be.end.z=0;const _=Be.closestPointToPointParameter(va,!0);Be.at(_,Xu);const m=nm.lerp(ke.z,ze.z,_),p=m>=-1&&m<=1,M=va.distanceTo(Xu)<Vi*.5;if(p&&M){Be.start.fromBufferAttribute(l,f),Be.end.fromBufferAttribute(c,f),Be.start.applyMatrix4(o),Be.end.applyMatrix4(o);const y=new k,S=new k;Bn.distanceSqToSegment(Be.start,Be.end,S,y),e.push({point:S,pointOnLine:y,distance:Bn.origin.distanceTo(S),object:n,face:null,faceIndex:f,uv:null,uv1:null})}}}class Ix extends yn{constructor(t=new Td,e=new bd({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)Gu.fromBufferAttribute(e,o),Wu.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Gu.distanceTo(Wu);const s=new El(r,2,1);return t.setAttribute("instanceDistanceStart",new vi(s,1,0)),t.setAttribute("instanceDistanceEnd",new vi(s,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Bn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Vi=l.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),Ws.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=Vi*.5;else{const u=Math.max(r.near,Ws.distanceToPoint(Bn.origin));c=qu(r,u,l.resolution)}if(Ws.radius+=c,Bn.intersectsSphere(Ws)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Gs.copy(a.boundingBox).applyMatrix4(o);let h;if(i)h=Vi*.5;else{const u=Math.max(r.near,Gs.distanceToPoint(Bn.origin));h=qu(r,u,l.resolution)}Gs.expandByScalar(h),Bn.intersectsBox(Gs)!==!1&&(i?Dx(this,e):Ux(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(_a),this.material.uniforms.resolution.value.set(_a.z,_a.w))}}const so={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Pr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ox=new _d(-1,1,1,-1,0,1);class Fx extends on{constructor(){super(),this.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new He([0,2,0,0,2,0],2))}}const Nx=new Fx;class jl{constructor(t){this._mesh=new yn(Nx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ox)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class wd extends Pr{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Pe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=qi.clone(t.uniforms),this.material=new Pe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new jl(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Yu extends Pr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const r=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class kx extends Pr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class zx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new zt);this._width=i.width,this._height=i.height,e=new Un(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ti}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new wd(so),this.copyPass.material.blending=Jn,this.clock=new vd}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Yu!==void 0&&(o instanceof Yu?i=!0:o instanceof kx&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Xs={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Bx extends Pr{constructor(){super(),this.uniforms=qi.clone(Xs.uniforms),this.material=new Hm({name:Xs.name,uniforms:this.uniforms,vertexShader:Xs.vertexShader,fragmentShader:Xs.fragmentShader}),this._fsQuad=new jl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jt.getTransfer(this._outputColorSpace)===ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===qh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Yh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Nl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Zh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===jh?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===$h&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Hx extends Pr{constructor(t,e,i=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new jt}render(t,e,i){const r=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=r}}const Vx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new jt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class wr extends Pr{constructor(t,e=1,i,r){super(),this.strength=e,this.radius=i,this.threshold=r,this.resolution=t!==void 0?new zt(t.x,t.y):new zt(256,256),this.clearColor=new jt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Un(s,o,{type:ti}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new Un(s,o,{type:ti});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new Un(s,o,{type:ti});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const a=Vx;this.highPassUniforms=qi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Pe({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new zt(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=qi.clone(so.uniforms),this.blendMaterial=new Pe({uniforms:this.copyUniforms,vertexShader:so.vertexShader,fragmentShader:so.fragmentShader,blending:ho,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new jt,this._oldClearAlpha=1,this._basic=new $l,this._fsQuad=new jl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new zt(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(t,e,i,r,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=wr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=wr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Pe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new zt(.5,.5)},direction:{value:new zt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}}wr.BlurDirectionX=new zt(1,0);wr.BlurDirectionY=new zt(0,1);const Kl=["conflict","stale","superseded","orphan","lint_error"];function Ad(n=typeof navigator>"u"?void 0:navigator){const t=n?.userAgentData?.platform||n?.platform||n?.userAgent||"";return/mac|iphone|ipad|ipod/i.test(t)}function Gx(n=Ad()){return n?{alt:"⌥",mod:"⌘",history:"⌘",join:(t,e)=>`${t}${e}`}:{alt:"Alt",mod:"Ctrl",history:"Alt",join:(t,e)=>`${t}+${e}`}}function Wx(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function $u(n){let t=typeof n=="string"?Wx(n):n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ya(n){const t=Math.max(n(),1e-9);return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n())}const Xx={topic:7.2,folder:7,page:7.2,note:6.6,inbox:7.4},qx={topic:24,folder:22,page:24,note:20,inbox:24};class Yx{root;slots=[];v=new k;max=90;constructor(t){this.root=document.createElement("div"),this.root.className="labels",t.appendChild(this.root)}slot(t){let e=this.slots[t];if(!e){const i=document.createElement("div"),r=document.createElement("span");r.className="lbl-dot";const s=document.createElement("span");s.className="lbl-text";const o=document.createElement("span");o.className="lbl-sub",i.append(r,s,o),this.root.appendChild(i),e={el:i,text:s,sub:o,dot:r,key:"",shown:!1},this.slots[t]=e}return e}update(t,e,i,r){const s=[];t.sort((a,l)=>l.priority-a.priority);let o=0;for(const a of t){if(o>=this.max)break;if(this.v.copy(a.pos).project(e),this.v.z>1||this.v.z<-1)continue;const l=(this.v.x*.5+.5)*i,c=(-this.v.y*.5+.5)*r-(a.lift??0),h=a.text.length+(a.sub?a.sub.length+2:0),u=Math.min(360,h*Xx[a.kind]+30),f=qx[a.kind],d={x0:l-u/2,y0:c-f,x1:l+u/2,y1:c};if(d.x1<0||d.x0>i||d.y1<0||d.y0>r||s.some(_=>d.x0<_.x1&&d.x1>_.x0&&d.y0<_.y1&&d.y1>_.y0))continue;s.push(d);const g=this.slot(o++);g.key!==a.key?(g.key=a.key,g.el.className=`lbl lbl-${a.kind}${a.emphasis?" lbl-emph":""}`,g.text.textContent=a.text,g.sub.textContent=a.sub??"",g.dot.style.background=a.color??"transparent"):g.el.classList.contains("lbl-emph")!==!!a.emphasis&&g.el.classList.toggle("lbl-emph",!!a.emphasis),g.el.style.transform=`translate3d(${Math.round(l)}px, ${Math.round(c)}px, 0) translate(-50%, -100%)`,g.shown||(g.el.style.opacity="1",g.shown=!0)}for(let a=o;a<this.slots.length;a++){const l=this.slots[a];l.shown&&(l.el.style.opacity="0",l.shown=!1,l.key="")}}setVisible(t){this.root.style.display=t?"":"none"}}function Ql(n){return n.transparent=!0,n.depthWrite=!1,n.blending=Gh,n.blendEquation=mi,n.blendSrc=Oa,n.blendDst=Oa,n}function Zu(n,t){return Ql(new Pe({uniforms:{uScale:{value:500},uGroups:{value:n},uGroupCount:{value:t},uFalloff:{value:4},uMinPx:{value:0}},vertexShader:`
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
        }`}))}function $x(){const n=Ql(new Pe({uniforms:{uFade:{value:1},uHealth:{value:0}},vertexShader:`
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
        }`}));return n.side=zn,n}function Zx(){return Ql(new Pe({uniforms:{uScale:{value:500},uHealth:{value:0},uTime:{value:0},uMotion:{value:1},uFade:{value:1}},vertexShader:`
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
        }`}))}const jx={uniforms:{tDiffuse:{value:null},uStrength:{value:.55},uTime:{value:0}},vertexShader:`
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
    }`};function Kx(n,t,e,i,r,s){const o=n.distanceTo(t),a=Math.min(s,Math.max(r,o*i))/o,l=e.y<-1e-6?(t.y-n.y)/e.y:-1,c=l>0&&l<s*2?n.clone().addScaledVector(e,l):t.clone();return{pos:c.clone().addScaledVector(n.clone().sub(c),a),target:c.clone().addScaledVector(t.clone().sub(c),a)}}tn.install({THREE:{Vector2:zt,Vector3:k,Vector4:ue,Quaternion:Cr,Matrix4:de,Spherical:Ym,Box3:si,Sphere:Mi,Raycaster:qm}});const Gi=["supersedes","cites","conflicts","depends","parts"],Qx="#9a7bff",Oe={supersedes:"#ffb347",cites:"#6f7d99",conflicts:"#ff3b4f",depends:"#4f8dff",parts:"#38c7b0"},Sa={supersedes:{width:2,opacity:.85,dashed:!0},cites:{width:1,opacity:.2,dashed:!1},conflicts:{width:2.4,opacity:.95,dashed:!1},depends:{width:1.7,opacity:.75,dashed:!0},parts:{width:1.4,opacity:.6,dashed:!1}},ju={width:1,opacity:.5},Jx=78*Math.PI/180,ty=new k(...jf),ey=Ad();function qs(n){switch(n){case"superseded_by":return"supersedes";case"source":return"cites";case"conflicts_with":return"conflicts";case"depends_on":return"depends";case"part_of":return"parts";default:return null}}function Ma(n,t){if(!n)return .55;const e=Date.parse(n);if(Number.isNaN(e))return .55;const i=Math.max(0,(t-e)/864e5);return .45+.55*Math.exp(-i/75)}class ny{constructor(t){this.count=t;const e=Math.max(1,t);this.value=new Float32Array(e*4),this.target=new Float32Array(e*4);for(let i=0;i<e;i++)this.value[i*4]=this.target[i*4]=1;this.texture=new md(this.value,e,1,hn,Dn),this.texture.magFilter=$e,this.texture.minFilter=$e,this.texture.needsUpdate=!0}value;target;texture;set(t,e,i,r,s){this.target.set([e,i,r,s],t*4)}ease(t){let e=!1;for(let i=0;i<this.value.length;i++){const r=this.target[i]-this.value[i];Math.abs(r)>.001&&(this.value[i]+=r*t,e=!0)}e&&(this.texture.needsUpdate=!0)}}const Ys=new jt;function An(n,t=1){return Ys.set(n),[Ys.r*t,Ys.g*t,Ys.b*t]}class iy{constructor(t,e,i,r,s){this.container=t,this.world=e,this.source=i,this.events=r,this.qualityMode=s,s!=="auto"&&(this.quality=s),this.topics=e.topics,e.topics.forEach((a,l)=>{this.topicIndex.set(a.slug,l),this.topicBySlug.set(a.slug,a)});for(const a of e.topics)for(let l=a;l;l=this.parentOf(l.slug))this.treeNotes.set(l.slug,(this.treeNotes.get(l.slug)??0)+a.notes);this.layout=tp(e.topics,e.episodes.count),this.renderer=new Lx({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(197899,1),this.renderer.toneMapping=Nl,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.className="scene-canvas",t.appendChild(this.renderer.domElement);const o=this.layout.radius;this.camera=new vn(50,1,.5,o*30),this.controls=new tn(this.camera,this.renderer.domElement),this.controls.smoothTime=this.motion?.55:0,this.controls.draggingSmoothTime=.12,this.controls.minDistance=2,this.controls.maxDistance=o*7,this.controls.dollySpeed=.6,this.controls.minPolarAngle=.02,this.controls.maxPolarAngle=Jx,this.controls.mouseButtons.left=tn.ACTION.SCREEN_PAN,this.controls.mouseButtons.right=tn.ACTION.SCREEN_PAN,this.controls.mouseButtons.middle=tn.ACTION.DOLLY,this.controls.mouseButtons.wheel=tn.ACTION.NONE,this.controls.touches.one=tn.ACTION.TOUCH_SCREEN_PAN,this.controls.touches.two=tn.ACTION.TOUCH_DOLLY,this.controls.touches.three=tn.ACTION.NONE,t.addEventListener("pointerdown",this.chooseDrag,{capture:!0}),this.controls.addEventListener("controlstart",()=>{this.userDriven=!0}),this.renderer.domElement.addEventListener("wheel",this.wheel,{passive:!1}),this.groups=new ny(this.topics.length),this.severity=Fh(this.topics),this.computeAlpha(),this.buildStarfield(),this.buildCenters(),this.buildStems(),this.buildInbox(),this.scene.add(this.flowGroup),this.scene.add(this.crossLines),this.scene.add(this.focusLines),this.composer=new zx(this.renderer),this.composer.addPass(new Hx(this.scene,this.camera)),this.bloom=new wr(new zt(256,256),.95,.6,.08),this.composer.addPass(this.bloom),this.vignette=new wd(jx),this.composer.addPass(this.vignette),this.composer.addPass(new Bx),this.labels=new Yx(t),this.bindPointer(),this.resize(),window.addEventListener("resize",this.resize),this.flyTo({},!0),this.buildFlows(),this.refreshGroups(),this.renderer.setAnimationLoop(this.frame)}layout;camera;renderer;scene=new Pm;controls;composer;bloom;bloomTarget=.95;vignette;labels;clock=new vd;topics;topicIndex=new Map;topicBySlug=new Map;treeNotes=new Map;groups;glowMats=[];starMats=new Set;sliceMats=new Set;lineMats=new Map;stems=null;stemPairs=[];flowGroup=new _i;crossLines=new _i;crossHits=[];focusLines=new _i;revealed=new Map;pending=new Map;failed=new Map;topicPx=new Map;ringPx=new Map;alpha=new Map;focus={};neighborhood=new Map;run=null;layers=Object.fromEntries(Gi.map(t=>[t,!0]));health=!1;severity;motion=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;quality="high";qualityMode="auto";autoDecided=!1;autoFrom=1.5;autoSamples=[];frameTimes=[];lastLod=0;pointer={x:0,y:0,down:!1,dx:0,dy:0,moved:!1,dirty:!1,inside:!1};hovered=null;pinned=null;flowHits=[];focusHits=[];hoverLine=null;hoverEnds=new Set;hoverTopics=new Set;now=Date.now();disposed=!1;userDriven=!1;fps=0;parentOf(t){const e=this.topicBySlug.get(t)?.parent;return e?this.topicBySlug.get(e):void 0}ancestors(t){const e=[];for(let i=this.parentOf(t);i&&!e.includes(i.slug);i=this.parentOf(i.slug))e.push(i.slug);return e}rootOf(t){return this.ancestors(t).pop()??t}computeAlpha(){const t=this.focus.topic?this.topicBySlug.get(this.focus.topic):void 0,e=new Set(t?this.ancestors(t.slug):[]),i=t?.depth??0;for(const r of this.topics){let s=1;t&&r.slug!==t.slug&&!this.ancestors(r.slug).includes(t.slug)&&(s=e.has(r.slug)?.3:r.parent===t.parent?.8:.35),r.depth-i>2&&(s*=.08),this.alpha.set(r.slug,s)}}layerTarget(t){if(this.run?.topics[t])return 1;if(this.focus.topic&&this.ancestors(this.focus.topic).includes(t))return 0;const e=this.alpha.get(t)??1;return e<.15?0:e}points(t,e,i,r={}){const s={position:new Float32Array(t*3),aColor:new Float32Array(t*3),aSize:new Float32Array(t),aAlpha:new Float32Array(t),aGroup:new Float32Array(t)};for(const[l,c]of Object.entries(r))s[l]=new Float32Array(t*c);for(let l=0;l<t;l++)e(l,s);const o=new on;o.setAttribute("position",new Me(s.position,3)),o.setAttribute("aColor",new Me(s.aColor,3));for(const l of["aSize","aAlpha","aGroup"])o.setAttribute(l,new Me(s[l],1));for(const[l,c]of Object.entries(r))o.setAttribute(l,new Me(s[l],c));o.computeBoundingSphere();const a=new uu(o,i);return a.frustumCulled=!1,a}plainGlow(t=4){const e=new md(new Float32Array([1,0,0,1]),1,1,hn,Dn);e.needsUpdate=!0;const i=Zu(e,1);return i.uniforms.uFalloff.value=t,this.glowMats.push(i),i}buildStarfield(){const t=this.layout.radius,e=$u("starfield"),r=this.points(6500,(s,o)=>{const a=e()*2-1,l=e()*Math.PI*2,c=Math.sqrt(1-a*a),h=t*(3.2+e()*4);o.position.set([h*c*Math.cos(l),h*a,h*c*Math.sin(l)],s*3);const u=e();o.aColor.set(u<.15?[1,.85,.7]:u<.4?[.75,.85,1]:[.9,.93,1],s*3),o.aSize[s]=t*(.006+.012*e()**3),o.aAlpha[s]=.25+.6*e()},this.plainGlow(6));this.scene.add(r)}buildCenters(){const t=Zu(this.groups.texture,Math.max(1,this.topics.length));t.uniforms.uMinPx.value=3,this.glowMats.push(t);const e=this.points(this.topics.length*2,(i,r)=>{const s=i>>1,o=this.topics[s],a=this.layout.topics.get(o.slug),l=Ma(o.updated,this.now)*(1+Math.min(.4,o.recent/Math.max(1,o.notes)));r.aGroup[i]=s,r.position.set([a.x,a.y,a.z],i*3),i%2===0?(r.aColor.set(An(o.color,o.page?1.25:.85),i*3),r.aSize[i]=a.ring*(o.page?.45:.2),r.aAlpha[i]=(o.page?.8:.45)*l):(r.aColor.set(An(o.color,.8),i*3),r.aSize[i]=a.ring*2.2,r.aAlpha[i]=o.notes?.07*l:0)},t);this.scene.add(e)}buildStems(){if(this.stemPairs=this.topics.filter(e=>e.parent&&this.topicBySlug.has(e.parent)).map(e=>[e.slug,e.parent]),!this.stemPairs.length)return;const t=[];for(const[e,i]of this.stemPairs){const r=this.layout.topics.get(e),s=this.layout.topics.get(i);t.push(r.x,r.y,r.z,s.x,s.y,s.z)}this.stems=this.segments(t,this.stemColors(),this.lineMaterial("stem",ju.width,ju.opacity,!1)),this.scene.add(this.stems)}stemColors(){const t=[];for(const[e]of this.stemPairs){const i=this.alpha.get(e)??1,[r,s,o]=An(this.topicBySlug.get(e).color,i);t.push(r*.55,s*.55,o*.55,r,s,o)}return t}buildInbox(){const t=this.layout.inbox,e=Math.min(420,this.world.episodes.count)+1,i=$u("inbox"),r=this.points(e,(s,o)=>{if(s===0){o.position.set([t.x,t.y,t.z],0),o.aColor.set([1.2,1.05,.8],0),o.aSize[0]=t.r*1.6,o.aAlpha[0]=this.world.episodes.count?.85:.25;return}o.position.set([t.x+ya(i)*t.r*.45,t.y+ya(i)*t.r*.3,t.z+ya(i)*t.r*.45],s*3),o.aColor.set(i()<.5?[1,.86,.55]:[1,.95,.85],s*3),o.aSize[s]=2+3*i(),o.aAlpha[s]=.5+.5*i()},this.plainGlow(5));this.scene.add(r)}lineMaterial(t,e,i,r){let s=this.lineMats.get(t);return s||(s=new bd({color:16777215,linewidth:e,vertexColors:!0,transparent:!0,opacity:i,dashed:r,dashSize:2.5,gapSize:16,dashScale:1,worldUnits:!1}),s.depthWrite=!1,s.blending=ho,s.resolution.set(this.container.clientWidth,this.container.clientHeight),this.lineMats.set(t,s)),s}trail(t,e,i,r,s,o){const a=o&&this.motion,l=this.segments(t,e,this.lineMaterial(i,r,a?s*.55:s,!1));return a?[l,this.segments(t,e,this.lineMaterial(`${i}:pulse`,r+.8,Math.min(1,s+.2),!0))]:[l]}segments(t,e,i){const r=new Td;r.setPositions(t),r.setColors(e);const s=new Ix(r,i);return i.dashed&&s.computeLineDistances(),s.frustumCulled=!1,s}buildFlows(){for(const h of[...this.flowGroup.children])this.flowGroup.remove(h),h.geometry.dispose();this.flowHits=[];const t=new Map,e=new Map;for(const h of this.world.flows){const u=this.rootOf(h.a),f=this.rootOf(h.b);if(u===f||!this.layout.topics.has(u)||!this.layout.topics.has(f))continue;const d=u<f?`${u}|${f}`:`${f}|${u}`;t.set(d,(t.get(d)??0)+h.total);const g=e.get(d)??{};for(const[_,m]of Object.entries(h.rels))g[_]=(g[_]??0)+(m??0);e.set(d,g)}const i=this.run?new Set(Object.keys(this.run.topics).map(h=>this.rootOf(h))):null,r=this.focus.topic?this.rootOf(this.focus.topic):null,s=h=>{const u=this.layout.topics.get(h);return new k(u.x,u.y,u.z)},o=[...t].sort((h,u)=>u[1]-h[1]).slice(0,160).map(([h,u])=>{const[f,d]=h.split("|"),g=i?i.has(f)||i.has(d):!r||f===r||d===r;return{a:s(f),b:s(d),ca:this.topicBySlug.get(f).color,cb:this.topicBySlug.get(d).color,w:u,lit:g,ka:f,kb:d,rels:e.get(h)??{}}});if(o.length===0)return;const a=o.map(h=>h.w).sort((h,u)=>h-u),l=h=>a[Math.min(a.length-1,Math.floor(h*a.length))],c=[{max:l(.6),width:1.2,opacity:.22},{max:l(.9),width:2,opacity:.3},{max:1/0,width:3,opacity:.4}];c.forEach((h,u)=>{const f=[],d=[],g=u===0?-1/0:c[u-1].max;for(const _ of o){if(!(_.w>g&&_.w<=h.max))continue;const m=_.a.clone().add(_.b).multiplyScalar(.5);m.y+=_.a.distanceTo(_.b)*.22;const M=new zm(_.a,m,_.b).getPoints(14);this.flowHits.push({a:_.ka,b:_.kb,total:_.w,rels:_.rels,points:M});const[y,S,C]=An(_.ca),[E,A,U]=An(_.cb),T=_.lit?1:.15;for(let x=0;x<M.length-1;x++){const R=x/(M.length-1),O=(x+1)/(M.length-1);f.push(M[x].x,M[x].y,M[x].z,M[x+1].x,M[x+1].y,M[x+1].z);const N=(.35+.65*Math.abs(R-.5)*2)*T,W=(.35+.65*Math.abs(O-.5)*2)*T;d.push((y+(E-y)*R)*N,(S+(A-S)*R)*N,(C+(U-C)*R)*N,(y+(E-y)*O)*W,(S+(A-S)*O)*W,(C+(U-C)*O)*W)}}f.length&&this.flowGroup.add(this.segments(f,d,this.lineMaterial(`flow${u}`,h.width,h.opacity,!1)))}),this.dimFlows()}reveal(t){if(this.revealed.has(t)||(this.failed.get(t)?.until??0)>performance.now())return Promise.resolve();let e=this.pending.get(t);return e||(e=this.load(t).finally(()=>this.pending.delete(t)),this.pending.set(t,e)),e}async load(t){let e;try{e=await this.source.topic(t)}catch{const r=Math.min(6e4,(this.failed.get(t)?.wait??1e3)*2);this.failed.set(t,{until:performance.now()+r,wait:r}),this.events.unreachable();return}if(this.failed.delete(t),!e||this.disposed||this.revealed.has(t))return;const i=this.layout.topics.get(t);i&&(this.revealed.set(t,this.buildLayer(e,i)),this.focus.note&&this.buildNeighborhood(),this.refreshGroups(),this.refreshStates())}buildLayer(t,e){const i=Bh(t,e.ring),r=new k(e.x,e.y,e.z),s=new Map(t.nodes.map(O=>[O.id,O])),o=i.ids.map(O=>s.get(O)),a=new Map(i.ids.map((O,N)=>[O,N])),l=o.length,c=Zx();c.uniforms.uScale.value=this.pointScale(),c.uniforms.uHealth.value=this.health?1:0,c.uniforms.uMotion.value=this.motion?1:0,c.uniforms.uFade.value=0,this.starMats.add(c);const h=new on,u=new Float32Array(l*3),f=new Float32Array(l),d=new Float32Array(l),g=new Float32Array(l),_=new Float32Array(l),m=new Float32Array(l*3),[p,M,y]=An(t.color),S=Math.max(1,...o.map(O=>O.chars??0));o.forEach((O,N)=>{const W=O.id===t.page,X=O.status==="superseded"||O.status==="archived",$=W?.25:.55;u.set([p*(1-$)+$,M*(1-$)+$,y*(1-$)+$],N*3),X&&u.set([.55,.58,.66],N*3),f[N]=e.ring*(W?.2:.035+.045*Math.sqrt((O.chars??0)/S)),d[N]=(X?.32:1)*Ma(O.updated,this.now);const Q=Kl.findIndex(Z=>O.flags.includes(Z));g[N]=Q<0?0:Q+1,m[N*3]=i.positions[N*3]+r.x,m[N*3+1]=i.positions[N*3+1]+r.y,m[N*3+2]=i.positions[N*3+2]+r.z}),h.setAttribute("position",new Me(i.positions,3)),h.setAttribute("aColor",new Me(u,3)),h.setAttribute("aSize",new Me(f,1)),h.setAttribute("aAlpha",new Me(d,1)),h.setAttribute("aFlag",new Me(g,1));const C=new Me(_,1);C.setUsage(Gc),h.setAttribute("aState",C);const E=new uu(h,c);E.frustumCulled=!1;const A=new _i;A.position.copy(r);const U=this.sliceMesh(i.slices,s,t.color);U&&A.add(U.mesh),A.add(E);const T=O=>{const N=a.get(O);return N===void 0?null:[i.positions[N*3],i.positions[N*3+1],i.positions[N*3+2]]},x=new Map;for(const O of t.links){const N=qs(O.rel);if(!N)continue;const W=T(O.source),X=T(O.target);if(!W||!X||O.source===O.target)continue;let $=x.get(N);$||x.set(N,$={pos:[],colors:[]}),$.pos.push(...W,...X);const Q=An(Oe[N]);$.colors.push(Q[0]*.55,Q[1]*.55,Q[2]*.55,Q[0],Q[1],Q[2])}const R=new Map;for(const[O,N]of x){const W=Sa[O],X=this.trail(N.pos,N.colors,`fam:${O}`,W.width,W.opacity,W.dashed);for(const $ of X)$.visible=!1,A.add($);R.set(O,X)}return this.scene.add(A),{slug:t.slug,data:t,center:r,ring:e.ring,group:A,stars:E,material:c,state:C,sizes:f,ids:i.ids,index:a,nodes:o,world:m,slices:U,lines:R,fade:0,target:1}}sliceMesh(t,e,i){if(!t.length)return null;const r=[],s=[],o=[],a=[],l=[],c=[],h=new Map,u=An(i);for(const m of t){const p=e.get(m.id),M=p.status==="superseded"||p.status==="archived",y=Math.min(1,Math.max(.3,.5/(m.a1-m.a0))),S=(.045+.13*(Ma(p.updated,this.now)-.45)/.55)*(M?.5:1)*y,C=M?[.55,.58,.66]:u,E=Math.max(2,Math.ceil((m.a1-m.a0)/(Math.PI/40))),A=r.length/3;for(let U=0;U<=E;U++){const T=m.a0+(m.a1-m.a0)*U/E;for(const[x,R]of[[m.r0,0],[m.r1,1]]){const[O,N]=zh(T,x);r.push(O,0,N),s.push(...C),o.push(S),a.push(R),l.push(p.flags.length?1:0)}if(U){const x=A+(U-1)*2;c.push(x,x+1,x+2,x+1,x+3,x+2)}}h.set(m.id,[A,r.length/3-A])}const f=new on;f.setAttribute("position",new He(r,3)),f.setAttribute("aColor",new He(s,3)),f.setAttribute("aAlpha",new He(o,1)),f.setAttribute("aEdge",new He(a,1)),f.setAttribute("aFlag",new He(l,1));const d=new Me(new Float32Array(r.length/3),1);d.setUsage(Gc),f.setAttribute("aState",d),f.setIndex(c);const g=$x();g.uniforms.uHealth.value=this.health?1:0,g.uniforms.uFade.value=0,this.sliceMats.add(g);const _=new yn(f,g);return _.frustumCulled=!1,_.renderOrder=-1,{mesh:_,material:g,state:d,ranges:h}}disposeLayer(t){this.scene.remove(t.group),t.stars.geometry.dispose(),t.material.dispose(),this.starMats.delete(t.material),t.slices&&(t.slices.mesh.geometry.dispose(),t.slices.material.dispose(),this.sliceMats.delete(t.slices.material));for(const e of t.lines.values())for(const i of e)i.geometry.dispose()}buildCross(){for(const e of[...this.crossLines.children])this.crossLines.remove(e),e.geometry.dispose();this.crossHits=[];const t=new Map;for(const e of this.revealed.values())if(!(e.target<.3))for(const i of e.data.external){if(i.dir!=="out"||!i.topic)continue;const r=qs(i.rel),s=this.revealed.get(i.topic),o=e.index.get(i.source),a=s?.index.get(i.target);if(!r||!s||s.target<.3||o===void 0||a===void 0)continue;const l=[e.world[o*3],e.world[o*3+1],e.world[o*3+2]],c=[s.world[a*3],s.world[a*3+1],s.world[a*3+2]];this.crossHits.push({family:r,from:{id:i.source,title:e.nodes[o].title,topic:e.slug},to:{id:i.target,title:i.title,topic:s.slug},a:l,b:c});let h=t.get(r);h||t.set(r,h={pos:[],colors:[]}),h.pos.push(...l,...c);const u=An(Oe[r]);h.colors.push(u[0]*.55,u[1]*.55,u[2]*.55,u[0],u[1],u[2])}for(const[e,i]of t){const r=Sa[e];for(const s of this.trail(i.pos,i.colors,`fam:${e}`,r.width,r.opacity,r.dashed))s.userData.family=e,s.visible=this.layers[e],this.crossLines.add(s)}}setFocus(t,e=!0){const i=Ua(t)!==Ua(this.focus)||t.topic!==this.focus.topic;this.focus={...t},this.buildNeighborhood(),t.topic&&this.reveal(t.topic),i&&this.buildFlows(),this.refreshGroups(),this.refreshStates(),e&&this.flyTo(t)}buildNeighborhood(){this.neighborhood.clear(),this.focusHits=[];for(const h of[...this.focusLines.children])this.focusLines.remove(h),h.geometry.dispose();const t=this.focus,e=t.note&&t.topic?this.revealed.get(t.topic):void 0,i=e&&t.note?e.index.get(t.note):void 0;if(!e||i===void 0||!t.note)return;this.neighborhood.set(t.note,3);const r=[e.world[i*3],e.world[i*3+1],e.world[i*3+2]],s=(h,u)=>{for(const d of[e,u?this.revealed.get(u):void 0]){const g=d?.index.get(h);if(d&&g!==void 0)return[d.world[g*3],d.world[g*3+1],d.world[g*3+2]]}const f=u?this.layout.topics.get(u):void 0;return f?[f.x,f.y,f.z]:null},o=new Map,a={id:t.note,title:e.nodes[i].title,topic:e.slug},l=(h,u,f,d,g)=>{const _=qs(h),m=s(f,d);if(!_||!m)return;this.neighborhood.has(f)||this.neighborhood.set(f,2);const p=u===t.note,M={id:f,title:g,topic:d??e.slug};this.focusHits.push(p?{family:_,from:a,to:M,a:r,b:m}:{family:_,from:M,to:a,a:m,b:r});let y=o.get(_);y||o.set(_,y={pos:[],colors:[]}),y.pos.push(...p?r:m,...p?m:r);const S=An(Oe[_]);y.colors.push(S[0]*.5,S[1]*.5,S[2]*.5,S[0]*1.2,S[1]*1.2,S[2]*1.2)},c=h=>e.nodes[e.index.get(h)??-1]?.title??h;for(const h of e.data.links)h.source===t.note?l(h.rel,h.source,h.target,e.slug,c(h.target)):h.target===t.note&&l(h.rel,h.source,h.source,e.slug,c(h.source));for(const h of e.data.external)h.source===t.note?l(h.rel,h.source,h.target,h.topic,h.title):h.target===t.note&&l(h.rel,h.source,h.source,h.topic,h.title);for(const[h,u]of o){const f=Sa[h];for(const d of this.trail(u.pos,u.colors,`focus:${h}`,f.width+1,Math.min(1,f.opacity+.25),f.dashed))this.focusLines.add(d)}}setRun(t){this.run=t,this.buildFlows(),this.refreshGroups(),this.refreshStates()}setLayers(t){this.layers={...t};for(const e of this.revealed.values())for(const[i,r]of e.lines)for(const s of r)s.visible=this.layers[i]&&e.fade>.05;for(const e of this.crossLines.children)e.visible=this.layers[e.userData.family]}setHealth(t){this.health=t;for(const e of this.starMats)e.uniforms.uHealth.value=t?1:0;for(const e of this.sliceMats)e.uniforms.uHealth.value=t?1:0;this.dimFlows(),this.refreshGroups()}dimFlows(){for(const[t,e]of this.lineMats)t.startsWith("flow")&&(e.userData.base??=e.opacity,e.opacity=e.userData.base*(this.health?.3:1))}setLabels(t){this.labels.setVisible(t)}setQualityMode(t){if(this.qualityMode=t,t!=="auto"){this.quality=t;return}this.quality="high",this.autoDecided=!1,this.autoSamples=[],this.autoFrom=this.clock.elapsedTime+1.5}refreshGroups(){const t=this.focus,e=this.run?new Set(Object.keys(this.run.topics)):null;this.computeAlpha();for(const i of this.revealed.values())i.target=this.layerTarget(i.slug);this.topics.forEach((i,r)=>{let s=this.alpha.get(i.slug)??1,o=0;(this.revealed.get(i.slug)?.target??0)>0&&(s*=.25);const a=this.severity[r];this.health&&(s*=.3+.7*a),e&&(e.has(i.slug)?o=.45:s*=.12),this.groups.set(r,s,o,this.health?1:0,a)}),this.stems&&this.stems.geometry.setColors(this.stemColors()),this.buildCross(),this.bloomTarget=t.note?.45:t.topic?.5:.95}refreshStates(){const t=this.run?new Set(this.run.touched):null;for(const e of this.revealed.values()){const i=e.state.array,r=e.slices?.state.array;e.ids.forEach((s,o)=>{let a=0;this.neighborhood.size&&(a=this.neighborhood.get(s)??1),t&&(a=t.has(s)?Math.max(a,2):a||1),this.hoverEnds.has(s)&&(a=Math.max(a,2)),i[o]=a;const l=e.slices?.ranges.get(s);r&&l&&r.fill(a,l[0],l[0]+l[1])}),e.state.needsUpdate=!0,e.slices&&(e.slices.state.needsUpdate=!0)}}flyTo(t,e=!1){this.userDriven=!1;const i=!e&&this.motion,r=this.layout.radius,s=this.controls.getPosition(new k).sub(this.controls.getTarget(new k));s.lengthSq()<1e-6?s.copy(ty):s.normalize();const o=(l,c)=>{const h=l.clone().addScaledVector(s,c);this.controls.setLookAt(h.x,h.y,h.z,l.x,l.y,l.z,i)};if(t.note&&t.topic){const l=this.revealed.get(t.topic),c=l?.index.get(t.note);if(l&&c!==void 0){o(new k(l.world[c*3],l.world[c*3+1],l.world[c*3+2]),Math.max(24,l.ring*1.4));return}const h=t.topic,u=t.note;this.reveal(h).then(()=>{this.focus.note===u&&this.revealed.get(h)?.index.has(u)&&this.flyTo(this.focus)})}if(t.topic){const l=this.layout.topics.get(t.topic);l&&o(new k(l.x,l.y,l.z),l.r*2.4);return}const a=r/Math.sin(this.camera.fov*Math.PI/360)/Math.min(1,this.camera.aspect);o(new k(-r*.08,0,0),a*.86)}resetView(){this.flyTo({})}resetTurn(){const t=Math.round(this.controls.azimuthAngle/(2*Math.PI));this.controls.rotateTo(t*2*Math.PI,Ia,this.motion)}chooseDrag=t=>{this.controls.mouseButtons.left=t.shiftKey?tn.ACTION.ROTATE:tn.ACTION.SCREEN_PAN};wheel=t=>{t.preventDefault(),this.userDriven=!0;const e=ey?-1:-3,i=t.deltaMode===1||t.ctrlKey?t.deltaY/e:t.deltaY/(e*10),r=this.renderer.domElement.getBoundingClientRect(),s=(t.clientX-r.left)/r.width*2-1,o=-((t.clientY-r.top)/r.height)*2+1,a=new k(s,o,.5).unproject(this.camera).sub(this.camera.position).normalize(),l=Kx(this.controls.getPosition(new k),this.controls.getTarget(new k),a,Math.pow(.95,i*this.controls.dollySpeed),this.controls.minDistance,this.controls.maxDistance);this.controls.setLookAt(l.pos.x,l.pos.y,l.pos.z,l.target.x,l.target.y,l.target.z,this.motion)};view(){return{pos:this.camera.position.clone(),target:this.controls.getTarget(new k)}}pointScale(){return this.renderer.getDrawingBufferSize(new zt).y/(2*Math.tan(this.camera.fov*Math.PI/360))}resize=()=>{const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setSize(t,e,!1),this.composer.setSize(t,e),this.bloom.resolution.set(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();const i=this.pointScale();for(const r of this.glowMats)r.uniforms.uScale.value=i;for(const r of this.starMats)r.uniforms.uScale.value=i;for(const r of this.lineMats.values())r.resolution.set(t,e)};frame=()=>{if(this.disposed)return;const t=Math.min(.1,this.clock.getDelta()),e=this.clock.elapsedTime;this.controls.update(t),this.trackFps(t);const i=performance.now();i-this.lastLod>120&&(this.lastLod=i,this.updateLod()),this.animate(t,e),this.pointer.dirty&&(this.pointer.dirty=!1,this.hover()),this.updateLabels(),this.quality==="high"?(this.vignette.uniforms.uTime.value=e,this.composer.render(t)):this.renderer.render(this.scene,this.camera)};trackFps(t){this.frameTimes.push(t),this.frameTimes.length>60&&this.frameTimes.shift();const e=this.frameTimes.reduce((o,a)=>o+a,0)/this.frameTimes.length;if(this.fps=e>0?1/e:0,this.qualityMode!=="auto"||this.autoDecided)return;const i=this.clock.elapsedTime;if(i<this.autoFrom||(this.autoSamples.push(t),i<this.autoFrom+2.5||this.autoSamples.length<20))return;const r=[...this.autoSamples].sort((o,a)=>o-a),s=r[r.length>>1]>1/30?"low":"high";this.autoDecided=!0,this.autoSamples=[],this.quality=s,this.events.quality(s,!0)}animate(t,e){const i=1-Math.exp(-t*6);this.groups.ease(i),this.bloom.strength+=(this.bloomTarget-this.bloom.strength)*i;let r=!1;for(const[s,o]of[...this.revealed]){o.fade+=(o.target-o.fade)*i,o.material.uniforms.uFade.value=o.fade,o.material.uniforms.uTime.value=e,o.slices&&(o.slices.material.uniforms.uFade.value=o.fade),o.group.visible=o.fade>.02;for(const[a,l]of o.lines)for(const c of l)c.visible=this.layers[a]&&o.fade>.05;o.target===0&&o.fade<.03&&(this.disposeLayer(o),this.revealed.delete(s),r=!0)}if(r&&this.buildCross(),this.motion)for(const[s,o]of this.lineMats)o.dashed&&(o.dashOffset-=t*(s.includes("supersedes")?9:14))}viewSample(t){const e=this.controls.getTarget(new k,!1);return{chain:this.topics.filter(r=>{const s=this.layout.topics.get(r.slug);return Math.hypot(s.x-e.x,s.z-e.z)<s.r}).sort((r,s)=>r.depth-s.depth).map(r=>({slug:r.slug,size:(this.topicPx.get(r.slug)??0)/t})),focusTopicSize:this.focus.topic?(this.topicPx.get(this.focus.topic)??0)/t:0}}updateLod(){const t=this.container.clientHeight||1,e=new go().setFromProjectionMatrix(new de().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse)),i=new Mi,r=this.topics.map(l=>{const c=this.layout.topics.get(l.slug);i.center.set(c.x,c.y,c.z),i.radius=c.r;const h=this.camera.position.distanceTo(i.center);this.topicPx.set(l.slug,us(c.r,h,t,this.camera.fov));const u=us(c.ring,h,t,this.camera.fov);this.ringPx.set(l.slug,u);const f=(l.notes>0||!!l.page)&&this.layerTarget(l.slug)>0;return{slug:l.slug,px:u,visible:f&&e.intersectsSphere(i)}});this.events.view(this.viewSample(t),this.userDriven);const s=new Set([...this.revealed].filter(([,l])=>l.target>0).map(([l])=>l)),o=Ff(r,s);if(this.focus.topic&&this.layerTarget(this.focus.topic)>0&&o.add(this.focus.topic),this.run)for(const l of Object.keys(this.run.topics))(this.ringPx.get(l)??0)>20&&o.add(l);let a=!1;for(const l of o){const c=this.revealed.get(l);c?c.target===0&&(a=!0,c.target=this.layerTarget(l)):this.reveal(l)}for(const[l,c]of this.revealed)!o.has(l)&&c.target!==0&&(c.target=0,a=!0);a&&this.refreshGroups()}updateLabels(){const t=this.container.clientWidth,e=this.container.clientHeight,i=[],r=this.camera.position,s=e/2/Math.tan(this.camera.fov*Math.PI/360),o=this.layout.inbox,a=us(o.r,r.distanceTo(new k(o.x,o.y,o.z)),e,this.camera.fov);a>6&&i.push({key:"inbox",kind:"inbox",text:"Inbox",sub:Ea(this.world.episodes.count,"session capture"),color:"#ffd88a",pos:new k(o.x,o.y,o.z),priority:7e3,lift:Math.min(a,60)*.6});for(const h of this.topics){const u=this.topicPx.get(h.slug)??0,f=this.ringPx.get(h.slug)??0,d=this.alpha.get(h.slug)??1,g=this.focus.topic===h.slug;if(!g&&(d<.2||u<10))continue;const _=this.revealed.get(h.slug);if(_&&_.fade>.5&&h.page&&f>(g?140:260))continue;const m=this.layout.topics.get(h.slug),p=this.run?.topics[h.slug],M=this.treeNotes.get(h.slug)??h.notes;i.push({key:`t:${h.slug}`,kind:h.page?"topic":"folder",text:h.page?h.title:h.name,sub:p?`${p} changed`:h.flagged?`${Ea(M,"note")} · ${h.flagged} with issues`:Ea(M,"note"),color:h.color,pos:new k(m.x,m.y,m.z),priority:(g?9e3:3e3)+u*2*d-h.depth*200+(this.health&&h.flagged?600:0)+(p?5e3:0)+(this.hoverTopics.has(h.slug)?6e3:0),lift:Math.min(f,140)*.5+4,emphasis:g||!!p||this.hovered===`t:${h.slug}`||this.hoverTopics.has(h.slug)})}const l=new k,c=new go().setFromProjectionMatrix(new de().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse));for(const h of this.revealed.values())h.fade<.5||(this.ringPx.get(h.slug)??0)<120||h.nodes.forEach((u,f)=>{if(l.set(h.world[f*3],h.world[f*3+1],h.world[f*3+2]),!c.containsPoint(l))return;const d=r.distanceTo(l),g=h.sizes[f]*s/Math.max(d,1),_=this.hoverEnds.has(u.id),m=Math.max(this.neighborhood.get(u.id)??0,_?2:0),p=u.id===h.data.page;if(g<3.5&&m<2&&!p)return;const M=u.flags.length>0,y=_?12500:m===3?12e3:m===2?8500:p?6500:(M?2500:1e3)+u.degree*20+g*10;i.push({key:`n:${u.id}`,kind:p?"page":"note",text:u.title,sub:p?"topic page":void 0,color:M?"#ff6b7a":void 0,pos:l.clone(),priority:y,lift:g/2+6,emphasis:m>=2||this.hovered===`n:${u.id}`})});this.labels.update(i,this.camera,t,e)}bindPointer(){const t=this.renderer.domElement;t.addEventListener("pointermove",e=>{const i=t.getBoundingClientRect();this.pointer.x=e.clientX-i.left,this.pointer.y=e.clientY-i.top,this.pointer.inside=!0,this.pointer.down&&Math.hypot(e.clientX-this.pointer.dx,e.clientY-this.pointer.dy)>5&&(this.pointer.moved=!0),this.pointer.dirty=!0}),t.addEventListener("pointerleave",()=>{this.pointer.inside=!1,this.hovered=null,this.setHighlight(this.pinned),this.events.hover(null,0,0)}),t.addEventListener("pointerdown",e=>{this.pointer.down=!0,this.pointer.moved=!1,this.pointer.dx=e.clientX,this.pointer.dy=e.clientY}),t.addEventListener("pointerup",e=>{const i=this.pointer.down&&!this.pointer.moved&&e.button===0;if(this.pointer.down=!1,!i)return;const r=t.getBoundingClientRect(),s=this.pickDetailed(e.clientX-r.left,e.clientY-r.top);(s?.target.kind==="link"||s?.target.kind==="flow")&&(this.pinned=s),this.events.select(s?.target??null)}),t.addEventListener("contextmenu",e=>e.preventDefault())}hover(){if(!this.pointer.inside||this.pointer.down)return;const t=this.pickDetailed(this.pointer.x,this.pointer.y),e=t?.key??null;this.renderer.domElement.style.cursor=t?"pointer":"",e!==this.hovered&&(this.hovered=e,this.setHighlight(t??this.pinned)),this.events.hover(t?.target??null,this.pointer.x,this.pointer.y)}setHighlight(t){this.hoverLine&&(this.scene.remove(this.hoverLine),this.hoverLine.geometry.dispose(),this.hoverLine=null);const e=new Set,i=new Set,r=t?.target;if(r?.kind==="link"?e.add(r.from.id).add(r.to.id):r?.kind==="flow"&&i.add(r.a).add(r.b),t?.segments){const o=An(t.color??"#e8f0ff").map(l=>Math.min(1.8,l*1.6)),a=[];for(let l=0;l<t.segments.length/3;l++)a.push(o[0],o[1],o[2]);this.hoverLine=this.segments(t.segments,a,this.lineMaterial("hover",4.5,1,!1)),this.hoverLine.renderOrder=10,this.scene.add(this.hoverLine)}const s=e.size!==this.hoverEnds.size||[...e].some(o=>!this.hoverEnds.has(o));this.hoverEnds=e,this.hoverTopics=i,s&&this.refreshStates()}pick(t,e){return this.pickDetailed(t,e)?.target??null}pin(t){const e=i=>i.kind==="link"?`l:${i.family}:${i.from.id}>${i.to.id}`:i.kind==="flow"?`f:${i.a}|${i.b}`:"";t&&this.pinned&&e(this.pinned.target)===e(t)||(this.pinned=t&&(t.kind==="link"||t.kind==="flow")?{target:t,key:e(t),...this.linesOf(t)}:null),this.hovered||this.setHighlight(this.pinned)}linesOf(t){if(t.kind==="link"){const e=[...this.focusHits,...this.crossHits].find(i=>i.family===t.family&&i.from.id===t.from.id&&i.to.id===t.to.id);if(e)return{segments:[...e.a,...e.b],color:Oe[t.family]};for(const i of this.revealed.values()){const r=i.index.get(t.from.id),s=i.index.get(t.to.id);if(r===void 0||s===void 0)continue;const o=i.world;return{segments:[o[r*3],o[r*3+1],o[r*3+2],o[s*3],o[s*3+1],o[s*3+2]],color:Oe[t.family]}}}else if(t.kind==="flow"){const e=this.flowHits.find(i=>i.a===t.a&&i.b===t.b||i.a===t.b&&i.b===t.a);if(e){const i=[];for(let r=0;r<e.points.length-1;r++)i.push(...e.points[r].toArray(),...e.points[r+1].toArray());return{segments:i}}}return{}}pickLink(t,e,i){const r=(f,d,g,_)=>{const m=g-f,p=_-d,M=m*m+p*p,y=M?Math.max(0,Math.min(1,((t-f)*m+(e-d)*p)/M)):0;return Math.hypot(f+y*m-t,d+y*p-e)},s=(f,d,g)=>`l:${f}:${d.id}>${g.id}`,o=(f,d)=>{let g=null,_=d;for(const m of f){if(!this.layers[m.family])continue;const p=i(m.a[0],m.a[1],m.a[2]),M=i(m.b[0],m.b[1],m.b[2]);if(!p||!M)continue;const y=r(p[0],p[1],M[0],M[1]);y<_&&(_=y,g={target:{kind:"link",family:m.family,from:m.from,to:m.to},key:s(m.family,m.from,m.to),segments:[...m.a,...m.b],color:Oe[m.family]})}return g},a=o(this.focusHits,6);if(a)return a;const l=[];for(const f of this.revealed.values())if(!(f.fade<.5))for(const d of f.data.links){const g=qs(d.rel),_=f.index.get(d.source),m=f.index.get(d.target);if(!g||_===void 0||m===void 0||_===m)continue;const p=f.world;l.push({family:g,from:{id:d.source,title:f.nodes[_].title,topic:f.slug},to:{id:d.target,title:f.nodes[m].title,topic:f.slug},a:[p[_*3],p[_*3+1],p[_*3+2]],b:[p[m*3],p[m*3+1],p[m*3+2]]})}const c=o([...l,...this.crossHits],5);if(c)return c;let h=null,u=5;for(const f of this.flowHits){let d=i(f.points[0].x,f.points[0].y,f.points[0].z);for(let g=1;g<f.points.length;g++){const _=i(f.points[g].x,f.points[g].y,f.points[g].z);if(d&&_){const m=r(d[0],d[1],_[0],_[1]);if(m<u){u=m;const p=[];for(let M=0;M<f.points.length-1;M++)p.push(...f.points[M].toArray(),...f.points[M+1].toArray());h={target:{kind:"flow",level:"tree",a:f.a,b:f.b,total:f.total,rels:f.rels},key:`f:${f.a}|${f.b}`,segments:p}}}d=_}}return h}pickDetailed(t,e){const i=_=>_&&{target:_,key:_.kind==="topic"?`t:${_.slug}`:"inbox"},r=this.container.clientWidth,s=this.container.clientHeight,o=s/2/Math.tan(this.camera.fov*Math.PI/360),a=new k,l=(_,m,p)=>(a.set(_,m,p).project(this.camera),a.z>1?null:[(a.x*.5+.5)*r,(-a.y*.5+.5)*s]);let c=null,h=1/0;for(const _ of this.revealed.values())if(!(_.fade<.3))for(let m=0;m<_.ids.length;m++){const p=l(_.world[m*3],_.world[m*3+1],_.world[m*3+2]);if(!p)continue;const M=this.camera.position.distanceTo(a.set(_.world[m*3],_.world[m*3+1],_.world[m*3+2])),y=Math.max(7,_.sizes[m]*o/Math.max(M,1)*.5+3),S=Math.hypot(p[0]-t,p[1]-e);S<y&&S<h&&(h=S,c={kind:"note",id:_.ids[m],topic:_.slug})}if(c)return{target:c,key:`n:${c.id}`};const u=this.pickLink(t,e,l);if(u)return u;let f=1/0;for(const _ of this.topics){if((this.alpha.get(_.slug)??1)<.15&&this.focus.topic!==_.slug)continue;const m=this.layout.topics.get(_.slug),p=l(m.x,m.y,m.z);if(!p)continue;const M=Math.max(10,(this.ringPx.get(_.slug)??0)*.8),y=Math.hypot(p[0]-t,p[1]-e);y<M&&y/M<f&&(f=y/M,c={kind:"topic",slug:_.slug})}const d=this.layout.inbox,g=l(d.x,d.y,d.z);if(g){const _=Math.max(12,us(d.r,this.camera.position.distanceTo(a.set(d.x,d.y,d.z)),s,this.camera.fov)),m=Math.hypot(g[0]-t,g[1]-e);m<_&&m/_<f&&(c={kind:"inbox"})}return i(c)}screenOf(t){let e=null;if(t.kind==="topic"){const i=this.layout.topics.get(t.slug);i&&(e=new k(i.x,i.y,i.z))}else if(t.kind==="note"){const i=this.revealed.get(t.topic),r=i?.index.get(t.id);i&&r!==void 0&&(e=new k(i.world[r*3],i.world[r*3+1],i.world[r*3+2]))}else if(t.kind==="inbox"){const i=this.layout.inbox;e=new k(i.x,i.y,i.z)}return e?(e.project(this.camera),{x:(e.x*.5+.5)*this.container.clientWidth,y:(-e.y*.5+.5)*this.container.clientHeight}):null}noteTitle(t){for(const e of this.revealed.values()){const i=e.index.get(t);if(i!==void 0)return e.nodes[i].title}}revealedTopics(){return[...this.revealed].filter(([,t])=>t.target>0).map(([t])=>t)}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),window.removeEventListener("resize",this.resize),this.container.removeEventListener("pointerdown",this.chooseDrag,{capture:!0}),this.renderer.domElement.removeEventListener("wheel",this.wheel);for(const t of this.revealed.values())this.disposeLayer(t);this.controls.dispose(),this.renderer.dispose()}}function Ea(n,t){return`${n} ${t}${n===1?"":"s"}`}var es,Te,ba,Ku,ns=0,Cd=[],Ce=he,Qu=Ce.__b,Ju=Ce.__r,th=Ce.diffed,eh=Ce.__c,nh=Ce.unmount,ih=Ce.__;function Jl(n,t){Ce.__h&&Ce.__h(Te,n,ns||t),ns=0;var e=Te.__H||(Te.__H={__:[],__h:[]});return n>=e.__.length&&e.__.push({}),e.__[n]}function Sn(n){return ns=1,ry(Ld,n)}function ry(n,t,e){var i=Jl(es++,2);if(i.t=n,!i.__c&&(i.__=[Ld(void 0,t),function(a){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,a);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=Te,!Te.__f)){var r=function(a,l,c){if(!i.__c.__H)return!0;var h=i.__c.__H.__.filter(function(f){return!!f.__c});if(h.every(function(f){return!f.__N}))return!s||s.call(this,a,l,c);var u=i.__c.props!==a;return h.forEach(function(f){if(f.__N){var d=f.__[0];f.__=f.__N,f.__N=void 0,d!==f.__[0]&&(u=!0)}}),s&&s.call(this,a,l,c)||u};Te.__f=!0;var s=Te.shouldComponentUpdate,o=Te.componentWillUpdate;Te.componentWillUpdate=function(a,l,c){if(this.__e){var h=s;s=void 0,r(a,l,c),s=h}o&&o.call(this,a,l,c)},Te.shouldComponentUpdate=r}return i.__N||i.__}function Si(n,t){var e=Jl(es++,3);!Ce.__s&&Pd(e.__H,t)&&(e.__=n,e.u=t,Te.__H.__h.push(e))}function ss(n){return ns=5,an(function(){return{current:n}},[])}function an(n,t){var e=Jl(es++,7);return Pd(e.__H,t)&&(e.__=n(),e.__H=t,e.__h=n),e.__}function Rd(n,t){return ns=8,an(function(){return n},t)}function sy(){for(var n;n=Cd.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(oo),n.__H.__h.forEach(wl),n.__H.__h=[]}catch(t){n.__H.__h=[],Ce.__e(t,n.__v)}}Ce.__b=function(n){Te=null,Qu&&Qu(n)},Ce.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),ih&&ih(n,t)},Ce.__r=function(n){Ju&&Ju(n),es=0;var t=(Te=n.__c).__H;t&&(ba===Te?(t.__h=[],Te.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(oo),t.__h.forEach(wl),t.__h=[],es=0)),ba=Te},Ce.diffed=function(n){th&&th(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(Cd.push(t)!==1&&Ku===Ce.requestAnimationFrame||((Ku=Ce.requestAnimationFrame)||oy)(sy)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),ba=Te=null},Ce.__c=function(n,t){t.some(function(e){try{e.__h.forEach(oo),e.__h=e.__h.filter(function(i){return!i.__||wl(i)})}catch(i){t.some(function(r){r.__h&&(r.__h=[])}),t=[],Ce.__e(i,e.__v)}}),eh&&eh(n,t)},Ce.unmount=function(n){nh&&nh(n);var t,e=n.__c;e&&e.__H&&(e.__H.__.forEach(function(i){try{oo(i)}catch(r){t=r}}),e.__H=void 0,t&&Ce.__e(t,e.__v))};var rh=typeof requestAnimationFrame=="function";function oy(n){var t,e=function(){clearTimeout(i),rh&&cancelAnimationFrame(t),setTimeout(n)},i=setTimeout(e,35);rh&&(t=requestAnimationFrame(e))}function oo(n){var t=Te,e=n.__c;typeof e=="function"&&(n.__c=void 0,e()),Te=t}function wl(n){var t=Te;n.__c=n.__(),Te=t}function Pd(n,t){return!n||n.length!==t.length||t.some(function(e,i){return e!==n[i]})}function Ld(n,t){return typeof t=="function"?t(n):t}class ay{constructor(t){this.s=t}listeners=new Set;get state(){return this.s}set(t){this.s={...this.s,...t};for(const e of this.listeners)e()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}function Bt(n,t){const[e,i]=Sn(()=>t(n.state));return Si(()=>{const r=()=>i(()=>t(n.state));return r(),n.subscribe(r)},[n]),e}class ly{constructor(t,e){this.source=t,this.world=e,this.trail=new Df(cy(`brainviz.trail:${e.brain}:${location.pathname}`));const i=new URLSearchParams(location.search).get("quality"),r=Ud(i)?i:uy()??"low";this.store=new ay({world:e,focus:{},hover:null,connection:null,note:null,topicData:null,noteError:null,topicError:null,layers:Object.fromEntries(Gi.map(s=>[s,!0])),health:!1,labels:!0,quality:r==="low"?"low":"high",qualityMode:r,navOpen:!0,navTab:"atlas",paletteOpen:!1,helpOpen:!1,healthData:null,healthError:null,run:null,toast:null,embedded:t.embedded,sceneError:null,previewOpen:!1,trail:this.trail.state(),historyOpen:!1,zoom:0})}store;galaxy=null;toastTimer=0;unreachableAt=0;noteSeq=0;trail;mount(t){try{this.galaxy=new iy(t,this.world,this.source,{hover:(e,i,r)=>this.store.set({hover:e?{target:e,x:i,y:r}:null}),select:e=>this.select(e),view:(e,i)=>this.onView(e,i),quality:(e,i)=>{this.store.set({quality:e}),i&&e==="low"&&this.toast("Graphics set to Low: frames were slow on this GPU, so the glow is off. Change it in the ⋯ menu.")},unreachable:()=>{const e=Date.now();e-this.unreachableAt<3e4||(this.unreachableAt=e,this.toast("Lost the connection to brain viz. Is it still running?"))}},this.store.state.qualityMode),this.galaxy.setLayers(this.store.state.layers)}catch(e){t.replaceChildren(),this.store.set({sceneError:e instanceof Error?e.message:String(e)}),console.error("brain viz: the 3D scene could not start",e)}window.addEventListener("popstate",e=>this.onHistory(e.state)),window.addEventListener("hashchange",()=>this.onHistory(history.state)),this.onHistory(history.state),window.__brainViz={controller:this,galaxy:this.galaxy,ready:!0},document.body.dataset.ready="1"}onHistory(t){this.applyHash();const e=this.store.state.focus,i=Wn(e),r=t?.brainViz;if(typeof r=="number"&&this.trail.entries[r]?.hash===i)this.trail.moveTo(r);else{const s=this.trail.visit({hash:i,focus:e,title:this.titleOf(e)});history.replaceState({brainViz:s},"",i)}this.syncTrail()}back(){this.trail.canBack&&history.back()}forward(){this.trail.canForward&&history.forward()}jump(t){const e=t-this.trail.index;this.store.set({historyOpen:!1}),e&&history.go(e)}syncTrail(){this.store.set({trail:this.trail.state()});try{sessionStorage.setItem(this.trailKey(),JSON.stringify(this.trail.state()))}catch{}}trailKey(){return`brainviz.trail:${this.world.brain}:${location.pathname}`}titleOf(t){if(t.note)return this.galaxy?.noteTitle(t.note)??this.store?.state.topicData?.nodes.find(e=>e.id===t.note)?.title}applyHash(){const t=Nf(location.hash);Wn(t)!==Wn(this.store.state.focus)&&this.focus(t,"none")}focus(t,e="push",i=!0){e!=="replace"&&this.closeConnection();const r=this.store.state.focus;this.store.set({focus:t,hover:null}),this.galaxy?.setFocus(t,i);const s=Wn(t);if(e!=="none"&&s!==location.hash){const o={hash:s,focus:t,title:this.titleOf(t)};e==="push"?history.pushState({brainViz:this.trail.visit(o)},"",s):history.replaceState({brainViz:this.trail.replace(o)},"",s),this.syncTrail()}if(t.topic&&t.topic!==r.topic?(this.store.set({topicData:null,topicError:null}),this.source.topic(t.topic).then(o=>{this.store.state.focus.topic===t.topic&&this.store.set(o?{topicData:o}:{topicError:"This topic is no longer in the brain."})},o=>{this.store.state.focus.topic===t.topic&&this.store.set({topicError:Ta(o)})})):t.topic||this.store.set({topicData:null,topicError:null}),t.note){const o=++this.noteSeq;t.note!==r.note&&this.store.set({note:null,noteError:null}),this.source.note(t.note).then(a=>{o===this.noteSeq&&(this.store.set(a?{note:a}:{noteError:"This note is no longer in the brain."}),a&&this.trail.setTitle(Wn(t),a.title)&&this.syncTrail())},a=>{o===this.noteSeq&&this.store.set({noteError:Ta(a)})})}else this.store.set({note:null,noteError:null,previewOpen:!1})}up(){const t=this.store.state;if(t.paletteOpen)return this.store.set({paletteOpen:!1});if(t.historyOpen)return this.store.set({historyOpen:!1});if(t.helpOpen)return this.store.set({helpOpen:!1});if(t.previewOpen)return this.store.set({previewOpen:!1});if(t.connection)return this.closeConnection();if(t.run)return this.setRun(null);if(Ua(t.focus)==="overview")return this.galaxy?.resetView();this.levelUp()}climbed=[];levelUp(){const t=this.store.state.focus,e=Uo(t,this.world);e&&(this.climbed.push(t),this.focus(e))}async sibling(t){const e=this.store.state.focus,i=Uo(e,this.world);if(!i)return;const s=Pc(i,this.world,i.topic?await this.source.topic(i.topic):null).filter(c=>!!c.note==!!e.note),o=c=>c.note??c.topic??"",a=s.findIndex(c=>o(c)===o(e)),l=s[(a+t+s.length)%s.length];l&&o(l)!==o(e)&&this.focus(l)}async levelDown(){const t=this.store.state.focus,e=Wn(t),i=this.climbed.pop();if(i){const o=Uo(i,this.world);if(o&&Wn(o)===e)return this.focus(i);this.climbed=[]}const r=t.topic?await this.source.topic(t.topic):null,[s]=Pc(t,this.world,r);s?this.focus(s):this.toast("Nothing below this note.")}select(t){t&&(t.kind==="topic"?this.focus({topic:t.slug}):t.kind==="note"?this.openNote(t.id,t.topic):t.kind==="link"||t.kind==="flow"?this.showConnection(t):this.toast(`${this.world.episodes.count} session captures wait in the inbox. Ask your agent to consolidate them.`))}onView(t,e){const i=this.store.state.focus,{focus:r,progress:s}=kf(i,t);Math.abs(s-this.store.state.zoom)>.02&&this.store.set({zoom:s}),e&&Wn(r)!==Wn(i)&&this.focus(r,"replace",!1)}showConnection(t){this.store.set({connection:t,previewOpen:!1}),this.galaxy?.pin(t)}closeConnection(){this.store.state.connection&&(this.store.set({connection:null}),this.galaxy?.pin(null))}openNote(t,e){e&&(this.focus({topic:e,note:t}),this.store.set({previewOpen:!0}))}resetTurn(){this.galaxy?.resetTurn()}setLayer(t,e){const i={...this.store.state.layers,[t]:e};this.store.set({layers:i}),this.galaxy?.setLayers(i)}setHealth(t){this.store.set({health:t}),this.galaxy?.setHealth(t),t&&!this.store.state.healthData&&this.loadHealth()}setLabels(t){this.store.set({labels:t}),this.galaxy?.setLabels(t)}setQualityMode(t){this.store.set({qualityMode:t,...t==="auto"?{}:{quality:t}}),this.galaxy?.setQualityMode(t);try{localStorage.setItem(Dd,t)}catch{}}setRun(t){if(this.store.set({run:t}),this.galaxy?.setRun(t),t){let e=Object.entries(t.topics).sort((i,r)=>r[1]-i[1])[0]?.[0];for(let i=this.world.topics.find(r=>r.slug===e);i?.parent;i=this.world.topics.find(r=>r.slug===i.parent))e=i.parent;e&&this.focus({topic:e})}}async loadHealth(){this.store.set({healthError:null});try{const t=await this.source.health();this.store.set({healthData:t})}catch(t){this.store.set({healthError:Ta(t)})}}setNav(t){this.store.set({navTab:t,navOpen:!0}),t==="health"&&!this.store.state.healthData&&this.loadHealth()}search(t){return this.source.search(t)}toast(t){this.store.set({toast:t}),window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.store.set({toast:null}),4200)}}function cy(n){try{const t=sessionStorage.getItem(n),e=t?JSON.parse(t):void 0;return e&&Array.isArray(e.entries)&&typeof e.index=="number"?e:void 0}catch{return}}const Dd="brainviz.graphics";function Ud(n){return n==="auto"||n==="high"||n==="low"}function uy(){try{const n=localStorage.getItem(Dd);return Ud(n)?n:null}catch{return null}}function Ta(n){return n instanceof TypeError?"Could not reach brain viz. Is it still running?":`Could not load it (${n instanceof Error?n.message:String(n)}).`}const hy={};function dy(n,t){const e=hy,i=typeof e.includeImageAlt=="boolean"?e.includeImageAlt:!0,r=typeof e.includeHtml=="boolean"?e.includeHtml:!0;return Id(n,i,r)}function Id(n,t,e){if(fy(n)){if("value"in n)return n.type==="html"&&!e?"":n.value;if(t&&"alt"in n&&n.alt)return n.alt;if("children"in n)return sh(n.children,t,e)}return Array.isArray(n)?sh(n,t,e):""}function sh(n,t,e){const i=[];let r=-1;for(;++r<n.length;)i[r]=Id(n[r],t,e);return i.join("")}function fy(n){return!!(n&&typeof n=="object")}const oh=document.createElement("i");function tc(n){const t="&"+n+";";oh.innerHTML=t;const e=oh.textContent;return e.charCodeAt(e.length-1)===59&&n!=="semi"||e===t?!1:e}function dn(n,t,e,i){const r=n.length;let s=0,o;if(t<0?t=-t>r?0:r+t:t=t>r?r:t,e=e>0?e:0,i.length<1e4)o=Array.from(i),o.unshift(t,e),n.splice(...o);else for(e&&n.splice(t,e);s<i.length;)o=i.slice(s,s+1e4),o.unshift(t,0),n.splice(...o),s+=1e4,t+=1e4}function xn(n,t){return n.length>0?(dn(n,n.length,0,t),n):t}const ah={}.hasOwnProperty;function Od(n){const t={};let e=-1;for(;++e<n.length;)py(t,n[e]);return t}function py(n,t){let e;for(e in t){const r=(ah.call(n,e)?n[e]:void 0)||(n[e]={}),s=t[e];let o;if(s)for(o in s){ah.call(r,o)||(r[o]=[]);const a=s[o];my(r[o],Array.isArray(a)?a:a?[a]:[])}}}function my(n,t){let e=-1;const i=[];for(;++e<t.length;)(t[e].add==="after"?n:i).push(t[e]);dn(n,0,0,i)}function Fd(n,t){const e=Number.parseInt(n,t);return e<9||e===11||e>13&&e<32||e>126&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?"�":String.fromCodePoint(e)}function In(n){return n.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Ye=Ei(/[A-Za-z]/),nn=Ei(/[\dA-Za-z]/),gy=Ei(/[#-'*+\--9=?A-Z^-~]/);function _o(n){return n!==null&&(n<32||n===127)}const Al=Ei(/\d/),_y=Ei(/[\dA-Fa-f]/),vy=Ei(/[!-/:-@[-`{-~]/);function Lt(n){return n!==null&&n<-2}function fe(n){return n!==null&&(n<0||n===32)}function qt(n){return n===-2||n===-1||n===32}const wo=Ei(/\p{P}|\p{S}/u),Yi=Ei(/\s/);function Ei(n){return t;function t(e){return e!==null&&e>-1&&n.test(String.fromCharCode(e))}}function Kt(n,t,e,i){const r=i?i-1:Number.POSITIVE_INFINITY;let s=0;return o;function o(l){return qt(l)?(n.enter(e),a(l)):t(l)}function a(l){return qt(l)&&s++<r?(n.consume(l),a):(n.exit(e),t(l))}}const xy={tokenize:yy};function yy(n){const t=n.attempt(this.parser.constructs.contentInitial,i,r);let e;return t;function i(a){if(a===null){n.consume(a);return}return n.enter("lineEnding"),n.consume(a),n.exit("lineEnding"),Kt(n,t,"linePrefix")}function r(a){return n.enter("paragraph"),s(a)}function s(a){const l=n.enter("chunkText",{contentType:"text",previous:e});return e&&(e.next=l),e=l,o(a)}function o(a){if(a===null){n.exit("chunkText"),n.exit("paragraph"),n.consume(a);return}return Lt(a)?(n.consume(a),n.exit("chunkText"),s):(n.consume(a),o)}}const Sy={tokenize:My},lh={tokenize:Ey};function My(n){const t=this,e=[];let i=0,r,s,o;return a;function a(y){if(i<e.length){const S=e[i];return t.containerState=S[1],n.attempt(S[0].continuation,l,c)(y)}return c(y)}function l(y){if(i++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,r&&M();const S=t.events.length;let C=S,E;for(;C--;)if(t.events[C][0]==="exit"&&t.events[C][1].type==="chunkFlow"){E=t.events[C][1].end;break}p(i);let A=S;for(;A<t.events.length;)t.events[A][1].end={...E},A++;return dn(t.events,C+1,0,t.events.slice(S)),t.events.length=A,c(y)}return a(y)}function c(y){if(i===e.length){if(!r)return f(y);if(r.currentConstruct&&r.currentConstruct.concrete)return g(y);t.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return t.containerState={},n.check(lh,h,u)(y)}function h(y){return r&&M(),p(i),f(y)}function u(y){return t.parser.lazy[t.now().line]=i!==e.length,o=t.now().offset,g(y)}function f(y){return t.containerState={},n.attempt(lh,d,g)(y)}function d(y){return i++,e.push([t.currentConstruct,t.containerState]),f(y)}function g(y){if(y===null){r&&M(),p(0),n.consume(y);return}return r=r||t.parser.flow(t.now()),n.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:s}),_(y)}function _(y){if(y===null){m(n.exit("chunkFlow"),!0),p(0),n.consume(y);return}return Lt(y)?(n.consume(y),m(n.exit("chunkFlow")),i=0,t.interrupt=void 0,a):(n.consume(y),_)}function m(y,S){const C=t.sliceStream(y);if(S&&C.push(null),y.previous=s,s&&(s.next=y),s=y,r.defineSkip(y.start),r.write(C),t.parser.lazy[y.start.line]){let E=r.events.length;for(;E--;)if(r.events[E][1].start.offset<o&&(!r.events[E][1].end||r.events[E][1].end.offset>o))return;const A=t.events.length;let U=A,T,x;for(;U--;)if(t.events[U][0]==="exit"&&t.events[U][1].type==="chunkFlow"){if(T){x=t.events[U][1].end;break}T=!0}for(p(i),E=A;E<t.events.length;)t.events[E][1].end={...x},E++;dn(t.events,U+1,0,t.events.slice(A)),t.events.length=E}}function p(y){let S=e.length;for(;S-- >y;){const C=e[S];t.containerState=C[1],C[0].exit.call(t,n)}e.length=y}function M(){r.write([null]),s=void 0,r=void 0,t.containerState._closeFlow=void 0}}function Ey(n,t,e){return Kt(n,n.attempt(this.parser.constructs.document,t,e),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function vo(n){if(n===null||fe(n)||Yi(n))return 1;if(wo(n))return 2}function Ao(n,t,e){const i=[];let r=-1;for(;++r<n.length;){const s=n[r].resolveAll;s&&!i.includes(s)&&(t=s(t,e),i.push(s))}return t}const Cl={name:"attention",resolveAll:by,tokenize:Ty};function by(n,t){let e=-1,i,r,s,o,a,l,c,h;for(;++e<n.length;)if(n[e][0]==="enter"&&n[e][1].type==="attentionSequence"&&n[e][1]._close){for(i=e;i--;)if(n[i][0]==="exit"&&n[i][1].type==="attentionSequence"&&n[i][1]._open&&t.sliceSerialize(n[i][1]).charCodeAt(0)===t.sliceSerialize(n[e][1]).charCodeAt(0)){if((n[i][1]._close||n[e][1]._open)&&(n[e][1].end.offset-n[e][1].start.offset)%3&&!((n[i][1].end.offset-n[i][1].start.offset+n[e][1].end.offset-n[e][1].start.offset)%3))continue;l=n[i][1].end.offset-n[i][1].start.offset>1&&n[e][1].end.offset-n[e][1].start.offset>1?2:1;const u={...n[i][1].end},f={...n[e][1].start};ch(u,-l),ch(f,l),o={type:l>1?"strongSequence":"emphasisSequence",start:u,end:{...n[i][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...n[e][1].start},end:f},s={type:l>1?"strongText":"emphasisText",start:{...n[i][1].end},end:{...n[e][1].start}},r={type:l>1?"strong":"emphasis",start:{...o.start},end:{...a.end}},n[i][1].end={...o.start},n[e][1].start={...a.end},c=[],n[i][1].end.offset-n[i][1].start.offset&&(c=xn(c,[["enter",n[i][1],t],["exit",n[i][1],t]])),c=xn(c,[["enter",r,t],["enter",o,t],["exit",o,t],["enter",s,t]]),c=xn(c,Ao(t.parser.constructs.insideSpan.null,n.slice(i+1,e),t)),c=xn(c,[["exit",s,t],["enter",a,t],["exit",a,t],["exit",r,t]]),n[e][1].end.offset-n[e][1].start.offset?(h=2,c=xn(c,[["enter",n[e][1],t],["exit",n[e][1],t]])):h=0,dn(n,i-1,e-i+3,c),e=i+c.length-h-2;break}}for(e=-1;++e<n.length;)n[e][1].type==="attentionSequence"&&(n[e][1].type="data");return n}function Ty(n,t){const e=this.parser.constructs.attentionMarkers.null,i=this.previous,r=vo(i);let s;return o;function o(l){return s=l,n.enter("attentionSequence"),a(l)}function a(l){if(l===s)return n.consume(l),a;const c=n.exit("attentionSequence"),h=vo(l),u=!h||h===2&&r||e.includes(l),f=!r||r===2&&h||e.includes(i);return c._open=!!(s===42?u:u&&(r||!f)),c._close=!!(s===42?f:f&&(h||!u)),t(l)}}function ch(n,t){n.column+=t,n.offset+=t,n._bufferIndex+=t}const wy={name:"autolink",tokenize:Ay};function Ay(n,t,e){let i=0;return r;function r(d){return n.enter("autolink"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.enter("autolinkProtocol"),s}function s(d){return Ye(d)?(n.consume(d),o):d===64?e(d):c(d)}function o(d){return d===43||d===45||d===46||nn(d)?(i=1,a(d)):c(d)}function a(d){return d===58?(n.consume(d),i=0,l):(d===43||d===45||d===46||nn(d))&&i++<32?(n.consume(d),a):(i=0,c(d))}function l(d){return d===62?(n.exit("autolinkProtocol"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),t):d===null||d===32||d===60||_o(d)?e(d):(n.consume(d),l)}function c(d){return d===64?(n.consume(d),h):gy(d)?(n.consume(d),c):e(d)}function h(d){return nn(d)?u(d):e(d)}function u(d){return d===46?(n.consume(d),i=0,h):d===62?(n.exit("autolinkProtocol").type="autolinkEmail",n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),t):f(d)}function f(d){if((d===45||nn(d))&&i++<63){const g=d===45?f:u;return n.consume(d),g}return e(d)}}const os={partial:!0,tokenize:Cy};function Cy(n,t,e){return i;function i(s){return qt(s)?Kt(n,r,"linePrefix")(s):r(s)}function r(s){return s===null||Lt(s)?t(s):e(s)}}const Nd={continuation:{tokenize:Py},exit:Ly,name:"blockQuote",tokenize:Ry};function Ry(n,t,e){const i=this;return r;function r(o){if(o===62){const a=i.containerState;return a.open||(n.enter("blockQuote",{_container:!0}),a.open=!0),n.enter("blockQuotePrefix"),n.enter("blockQuoteMarker"),n.consume(o),n.exit("blockQuoteMarker"),s}return e(o)}function s(o){return qt(o)?(n.enter("blockQuotePrefixWhitespace"),n.consume(o),n.exit("blockQuotePrefixWhitespace"),n.exit("blockQuotePrefix"),t):(n.exit("blockQuotePrefix"),t(o))}}function Py(n,t,e){const i=this;return r;function r(o){return qt(o)?Kt(n,s,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):s(o)}function s(o){return n.attempt(Nd,t,e)(o)}}function Ly(n){n.exit("blockQuote")}const kd={name:"characterEscape",tokenize:Dy};function Dy(n,t,e){return i;function i(s){return n.enter("characterEscape"),n.enter("escapeMarker"),n.consume(s),n.exit("escapeMarker"),r}function r(s){return vy(s)?(n.enter("characterEscapeValue"),n.consume(s),n.exit("characterEscapeValue"),n.exit("characterEscape"),t):e(s)}}const zd={name:"characterReference",tokenize:Uy};function Uy(n,t,e){const i=this;let r=0,s,o;return a;function a(u){return n.enter("characterReference"),n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),l}function l(u){return u===35?(n.enter("characterReferenceMarkerNumeric"),n.consume(u),n.exit("characterReferenceMarkerNumeric"),c):(n.enter("characterReferenceValue"),s=31,o=nn,h(u))}function c(u){return u===88||u===120?(n.enter("characterReferenceMarkerHexadecimal"),n.consume(u),n.exit("characterReferenceMarkerHexadecimal"),n.enter("characterReferenceValue"),s=6,o=_y,h):(n.enter("characterReferenceValue"),s=7,o=Al,h(u))}function h(u){if(u===59&&r){const f=n.exit("characterReferenceValue");return o===nn&&!tc(i.sliceSerialize(f))?e(u):(n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),n.exit("characterReference"),t)}return o(u)&&r++<s?(n.consume(u),h):e(u)}}const uh={partial:!0,tokenize:Oy},hh={concrete:!0,name:"codeFenced",tokenize:Iy};function Iy(n,t,e){const i=this,r={partial:!0,tokenize:C};let s=0,o=0,a;return l;function l(E){return c(E)}function c(E){const A=i.events[i.events.length-1];return s=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,a=E,n.enter("codeFenced"),n.enter("codeFencedFence"),n.enter("codeFencedFenceSequence"),h(E)}function h(E){return E===a?(o++,n.consume(E),h):o<3?e(E):(n.exit("codeFencedFenceSequence"),qt(E)?Kt(n,u,"whitespace")(E):u(E))}function u(E){return E===null||Lt(E)?(n.exit("codeFencedFence"),i.interrupt?t(E):n.check(uh,_,S)(E)):(n.enter("codeFencedFenceInfo"),n.enter("chunkString",{contentType:"string"}),f(E))}function f(E){return E===null||Lt(E)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),u(E)):qt(E)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),Kt(n,d,"whitespace")(E)):E===96&&E===a?e(E):(n.consume(E),f)}function d(E){return E===null||Lt(E)?u(E):(n.enter("codeFencedFenceMeta"),n.enter("chunkString",{contentType:"string"}),g(E))}function g(E){return E===null||Lt(E)?(n.exit("chunkString"),n.exit("codeFencedFenceMeta"),u(E)):E===96&&E===a?e(E):(n.consume(E),g)}function _(E){return n.attempt(r,S,m)(E)}function m(E){return n.enter("lineEnding"),n.consume(E),n.exit("lineEnding"),p}function p(E){return s>0&&qt(E)?Kt(n,M,"linePrefix",s+1)(E):M(E)}function M(E){return E===null||Lt(E)?n.check(uh,_,S)(E):(n.enter("codeFlowValue"),y(E))}function y(E){return E===null||Lt(E)?(n.exit("codeFlowValue"),M(E)):(n.consume(E),y)}function S(E){return n.exit("codeFenced"),t(E)}function C(E,A,U){let T=0;return x;function x(X){return E.enter("lineEnding"),E.consume(X),E.exit("lineEnding"),R}function R(X){return E.enter("codeFencedFence"),qt(X)?Kt(E,O,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(X):O(X)}function O(X){return X===a?(E.enter("codeFencedFenceSequence"),N(X)):U(X)}function N(X){return X===a?(T++,E.consume(X),N):T>=o?(E.exit("codeFencedFenceSequence"),qt(X)?Kt(E,W,"whitespace")(X):W(X)):U(X)}function W(X){return X===null||Lt(X)?(E.exit("codeFencedFence"),A(X)):U(X)}}}function Oy(n,t,e){const i=this;return r;function r(o){return o===null?e(o):(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}const wa={name:"codeIndented",tokenize:Ny},Fy={partial:!0,tokenize:ky};function Ny(n,t,e){const i=this;return r;function r(c){return n.enter("codeIndented"),Kt(n,s,"linePrefix",5)(c)}function s(c){const h=i.events[i.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?o(c):e(c)}function o(c){return c===null?l(c):Lt(c)?n.attempt(Fy,o,l)(c):(n.enter("codeFlowValue"),a(c))}function a(c){return c===null||Lt(c)?(n.exit("codeFlowValue"),o(c)):(n.consume(c),a)}function l(c){return n.exit("codeIndented"),t(c)}}function ky(n,t,e){const i=this;return r;function r(o){return i.parser.lazy[i.now().line]?e(o):Lt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),r):Kt(n,s,"linePrefix",5)(o)}function s(o){const a=i.events[i.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):Lt(o)?r(o):e(o)}}const zy={name:"codeText",previous:Hy,resolve:By,tokenize:Vy};function By(n){let t=n.length-4,e=3,i,r;if((n[e][1].type==="lineEnding"||n[e][1].type==="space")&&(n[t][1].type==="lineEnding"||n[t][1].type==="space")){for(i=e;++i<t;)if(n[i][1].type==="codeTextData"){n[e][1].type="codeTextPadding",n[t][1].type="codeTextPadding",e+=2,t-=2;break}}for(i=e-1,t++;++i<=t;)r===void 0?i!==t&&n[i][1].type!=="lineEnding"&&(r=i):(i===t||n[i][1].type==="lineEnding")&&(n[r][1].type="codeTextData",i!==r+2&&(n[r][1].end=n[i-1][1].end,n.splice(r+2,i-r-2),t-=i-r-2,i=r+2),r=void 0);return n}function Hy(n){return n!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Vy(n,t,e){let i=0,r,s;return o;function o(u){return n.enter("codeText"),n.enter("codeTextSequence"),a(u)}function a(u){return u===96?(n.consume(u),i++,a):(n.exit("codeTextSequence"),l(u))}function l(u){return u===null?e(u):u===32?(n.enter("space"),n.consume(u),n.exit("space"),l):u===96?(s=n.enter("codeTextSequence"),r=0,h(u)):Lt(u)?(n.enter("lineEnding"),n.consume(u),n.exit("lineEnding"),l):(n.enter("codeTextData"),c(u))}function c(u){return u===null||u===32||u===96||Lt(u)?(n.exit("codeTextData"),l(u)):(n.consume(u),c)}function h(u){return u===96?(n.consume(u),r++,h):r===i?(n.exit("codeTextSequence"),n.exit("codeText"),t(u)):(s.type="codeTextData",c(u))}}class Gy{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,e){const i=e??Number.POSITIVE_INFINITY;return i<this.left.length?this.left.slice(t,i):t>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(t,e,i){const r=e||0;this.setCursor(Math.trunc(t));const s=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return i&&Hr(this.left,i),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Hr(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Hr(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const e=this.left.splice(t,Number.POSITIVE_INFINITY);Hr(this.right,e.reverse())}else{const e=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Hr(this.left,e.reverse())}}}function Hr(n,t){let e=0;if(t.length<1e4)n.push(...t);else for(;e<t.length;)n.push(...t.slice(e,e+1e4)),e+=1e4}function Bd(n){const t={};let e=-1,i,r,s,o,a,l,c;const h=new Gy(n);for(;++e<h.length;){for(;e in t;)e=t[e];if(i=h.get(e),e&&i[1].type==="chunkFlow"&&h.get(e-1)[1].type==="listItemPrefix"&&(l=i[1]._tokenizer.events,s=0,s<l.length&&l[s][1].type==="lineEndingBlank"&&(s+=2),s<l.length&&l[s][1].type==="content"))for(;++s<l.length&&l[s][1].type!=="content";)l[s][1].type==="chunkText"&&(l[s][1]._isInFirstContentOfListItem=!0,s++);if(i[0]==="enter")i[1].contentType&&(Object.assign(t,Wy(h,e)),e=t[e],c=!0);else if(i[1]._container){for(s=e,r=void 0;s--;)if(o=h.get(s),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(r&&(h.get(r)[1].type="lineEndingBlank"),o[1].type="lineEnding",r=s);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;r&&(i[1].end={...h.get(r)[1].start},a=h.slice(r,e),a.unshift(i),h.splice(r,e-r+1,a))}}return dn(n,0,Number.POSITIVE_INFINITY,h.slice(0)),!c}function Wy(n,t){const e=n.get(t)[1],i=n.get(t)[2];let r=t-1;const s=[];let o=e._tokenizer;o||(o=i.parser[e.contentType](e.start),e._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const a=o.events,l=[],c={};let h,u,f=-1,d=e,g=0,_=0;const m=[_];for(;d;){for(;n.get(++r)[1]!==d;);s.push(r),d._tokenizer||(h=i.sliceStream(d),d.next||h.push(null),u&&o.defineSkip(d.start),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(h),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),u=d,d=d.next}for(d=e;++f<a.length;)a[f][0]==="exit"&&a[f-1][0]==="enter"&&a[f][1].type===a[f-1][1].type&&a[f][1].start.line!==a[f][1].end.line&&(_=f+1,m.push(_),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(o.events=[],d?(d._tokenizer=void 0,d.previous=void 0):m.pop(),f=m.length;f--;){const p=a.slice(m[f],m[f+1]),M=s.pop();l.push([M,M+p.length-1]),n.splice(M,2,p)}for(l.reverse(),f=-1;++f<l.length;)c[g+l[f][0]]=g+l[f][1],g+=l[f][1]-l[f][0]-1;return c}const Xy={resolve:Yy,tokenize:$y},qy={partial:!0,tokenize:Zy};function Yy(n){return Bd(n),n}function $y(n,t){let e;return i;function i(a){return n.enter("content"),e=n.enter("chunkContent",{contentType:"content"}),r(a)}function r(a){return a===null?s(a):Lt(a)?n.check(qy,o,s)(a):(n.consume(a),r)}function s(a){return n.exit("chunkContent"),n.exit("content"),t(a)}function o(a){return n.consume(a),n.exit("chunkContent"),e.next=n.enter("chunkContent",{contentType:"content",previous:e}),e=e.next,r}}function Zy(n,t,e){const i=this;return r;function r(o){return n.exit("chunkContent"),n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),Kt(n,s,"linePrefix")}function s(o){if(o===null||Lt(o))return e(o);const a=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):n.interrupt(i.parser.constructs.flow,e,t)(o)}}function Hd(n,t,e,i,r,s,o,a,l){const c=l||Number.POSITIVE_INFINITY;let h=0;return u;function u(p){return p===60?(n.enter(i),n.enter(r),n.enter(s),n.consume(p),n.exit(s),f):p===null||p===32||p===41||_o(p)?e(p):(n.enter(i),n.enter(o),n.enter(a),n.enter("chunkString",{contentType:"string"}),_(p))}function f(p){return p===62?(n.enter(s),n.consume(p),n.exit(s),n.exit(r),n.exit(i),t):(n.enter(a),n.enter("chunkString",{contentType:"string"}),d(p))}function d(p){return p===62?(n.exit("chunkString"),n.exit(a),f(p)):p===null||p===60||Lt(p)?e(p):(n.consume(p),p===92?g:d)}function g(p){return p===60||p===62||p===92?(n.consume(p),d):d(p)}function _(p){return!h&&(p===null||p===41||fe(p))?(n.exit("chunkString"),n.exit(a),n.exit(o),n.exit(i),t(p)):h<c&&p===40?(n.consume(p),h++,_):p===41?(n.consume(p),h--,_):p===null||p===32||p===40||_o(p)?e(p):(n.consume(p),p===92?m:_)}function m(p){return p===40||p===41||p===92?(n.consume(p),_):_(p)}}function Vd(n,t,e,i,r,s){const o=this;let a=0,l;return c;function c(d){return n.enter(i),n.enter(r),n.consume(d),n.exit(r),n.enter(s),h}function h(d){return a>999||d===null||d===91||d===93&&!l||d===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?e(d):d===93?(n.exit(s),n.enter(r),n.consume(d),n.exit(r),n.exit(i),t):Lt(d)?(n.enter("lineEnding"),n.consume(d),n.exit("lineEnding"),h):(n.enter("chunkString",{contentType:"string"}),u(d))}function u(d){return d===null||d===91||d===93||Lt(d)||a++>999?(n.exit("chunkString"),h(d)):(n.consume(d),l||(l=!qt(d)),d===92?f:u)}function f(d){return d===91||d===92||d===93?(n.consume(d),a++,u):u(d)}}function Gd(n,t,e,i,r,s){let o;return a;function a(f){return f===34||f===39||f===40?(n.enter(i),n.enter(r),n.consume(f),n.exit(r),o=f===40?41:f,l):e(f)}function l(f){return f===o?(n.enter(r),n.consume(f),n.exit(r),n.exit(i),t):(n.enter(s),c(f))}function c(f){return f===o?(n.exit(s),l(o)):f===null?e(f):Lt(f)?(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),Kt(n,c,"linePrefix")):(n.enter("chunkString",{contentType:"string"}),h(f))}function h(f){return f===o||f===null||Lt(f)?(n.exit("chunkString"),c(f)):(n.consume(f),f===92?u:h)}function u(f){return f===o||f===92?(n.consume(f),h):h(f)}}function $r(n,t){let e;return i;function i(r){return Lt(r)?(n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),e=!0,i):qt(r)?Kt(n,i,e?"linePrefix":"lineSuffix")(r):t(r)}}const jy={name:"definition",tokenize:Qy},Ky={partial:!0,tokenize:Jy};function Qy(n,t,e){const i=this;let r;return s;function s(d){return n.enter("definition"),o(d)}function o(d){return Vd.call(i,n,a,e,"definitionLabel","definitionLabelMarker","definitionLabelString")(d)}function a(d){return r=In(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),d===58?(n.enter("definitionMarker"),n.consume(d),n.exit("definitionMarker"),l):e(d)}function l(d){return fe(d)?$r(n,c)(d):c(d)}function c(d){return Hd(n,h,e,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(d)}function h(d){return n.attempt(Ky,u,u)(d)}function u(d){return qt(d)?Kt(n,f,"whitespace")(d):f(d)}function f(d){return d===null||Lt(d)?(n.exit("definition"),i.parser.defined.push(r),t(d)):e(d)}}function Jy(n,t,e){return i;function i(a){return fe(a)?$r(n,r)(a):e(a)}function r(a){return Gd(n,s,e,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function s(a){return qt(a)?Kt(n,o,"whitespace")(a):o(a)}function o(a){return a===null||Lt(a)?t(a):e(a)}}const tS={name:"hardBreakEscape",tokenize:eS};function eS(n,t,e){return i;function i(s){return n.enter("hardBreakEscape"),n.consume(s),r}function r(s){return Lt(s)?(n.exit("hardBreakEscape"),t(s)):e(s)}}const nS={name:"headingAtx",resolve:iS,tokenize:rS};function iS(n,t){let e=n.length-2,i=3,r,s;return n[i][1].type==="whitespace"&&(i+=2),e-2>i&&n[e][1].type==="whitespace"&&(e-=2),n[e][1].type==="atxHeadingSequence"&&(i===e-1||e-4>i&&n[e-2][1].type==="whitespace")&&(e-=i+1===e?2:4),e>i&&(r={type:"atxHeadingText",start:n[i][1].start,end:n[e][1].end},s={type:"chunkText",start:n[i][1].start,end:n[e][1].end,contentType:"text"},dn(n,i,e-i+1,[["enter",r,t],["enter",s,t],["exit",s,t],["exit",r,t]])),n}function rS(n,t,e){let i=0;return r;function r(h){return n.enter("atxHeading"),s(h)}function s(h){return n.enter("atxHeadingSequence"),o(h)}function o(h){return h===35&&i++<6?(n.consume(h),o):h===null||fe(h)?(n.exit("atxHeadingSequence"),a(h)):e(h)}function a(h){return h===35?(n.enter("atxHeadingSequence"),l(h)):h===null||Lt(h)?(n.exit("atxHeading"),t(h)):qt(h)?Kt(n,a,"whitespace")(h):(n.enter("atxHeadingText"),c(h))}function l(h){return h===35?(n.consume(h),l):(n.exit("atxHeadingSequence"),a(h))}function c(h){return h===null||h===35||fe(h)?(n.exit("atxHeadingText"),a(h)):(n.consume(h),c)}}const sS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],dh=["pre","script","style","textarea"],oS={concrete:!0,name:"htmlFlow",resolveTo:cS,tokenize:uS},aS={partial:!0,tokenize:dS},lS={partial:!0,tokenize:hS};function cS(n){let t=n.length;for(;t--&&!(n[t][0]==="enter"&&n[t][1].type==="htmlFlow"););return t>1&&n[t-2][1].type==="linePrefix"&&(n[t][1].start=n[t-2][1].start,n[t+1][1].start=n[t-2][1].start,n.splice(t-2,2)),n}function uS(n,t,e){const i=this;let r,s,o,a,l;return c;function c(I){return h(I)}function h(I){return n.enter("htmlFlow"),n.enter("htmlFlowData"),n.consume(I),u}function u(I){return I===33?(n.consume(I),f):I===47?(n.consume(I),s=!0,_):I===63?(n.consume(I),r=3,i.interrupt?t:P):Ye(I)?(n.consume(I),o=String.fromCharCode(I),m):e(I)}function f(I){return I===45?(n.consume(I),r=2,d):I===91?(n.consume(I),r=5,a=0,g):Ye(I)?(n.consume(I),r=4,i.interrupt?t:P):e(I)}function d(I){return I===45?(n.consume(I),i.interrupt?t:P):e(I)}function g(I){const J="CDATA[";return I===J.charCodeAt(a++)?(n.consume(I),a===J.length?i.interrupt?t:O:g):e(I)}function _(I){return Ye(I)?(n.consume(I),o=String.fromCharCode(I),m):e(I)}function m(I){if(I===null||I===47||I===62||fe(I)){const J=I===47,at=o.toLowerCase();return!J&&!s&&dh.includes(at)?(r=1,i.interrupt?t(I):O(I)):sS.includes(o.toLowerCase())?(r=6,J?(n.consume(I),p):i.interrupt?t(I):O(I)):(r=7,i.interrupt&&!i.parser.lazy[i.now().line]?e(I):s?M(I):y(I))}return I===45||nn(I)?(n.consume(I),o+=String.fromCharCode(I),m):e(I)}function p(I){return I===62?(n.consume(I),i.interrupt?t:O):e(I)}function M(I){return qt(I)?(n.consume(I),M):x(I)}function y(I){return I===47?(n.consume(I),x):I===58||I===95||Ye(I)?(n.consume(I),S):qt(I)?(n.consume(I),y):x(I)}function S(I){return I===45||I===46||I===58||I===95||nn(I)?(n.consume(I),S):C(I)}function C(I){return I===61?(n.consume(I),E):qt(I)?(n.consume(I),C):y(I)}function E(I){return I===null||I===60||I===61||I===62||I===96?e(I):I===34||I===39?(n.consume(I),l=I,A):qt(I)?(n.consume(I),E):U(I)}function A(I){return I===l?(n.consume(I),l=null,T):I===null||Lt(I)?e(I):(n.consume(I),A)}function U(I){return I===null||I===34||I===39||I===47||I===60||I===61||I===62||I===96||fe(I)?C(I):(n.consume(I),U)}function T(I){return I===47||I===62||qt(I)?y(I):e(I)}function x(I){return I===62?(n.consume(I),R):e(I)}function R(I){return I===null||Lt(I)?O(I):qt(I)?(n.consume(I),R):e(I)}function O(I){return I===45&&r===2?(n.consume(I),$):I===60&&r===1?(n.consume(I),Q):I===62&&r===4?(n.consume(I),_t):I===63&&r===3?(n.consume(I),P):I===93&&r===5?(n.consume(I),lt):Lt(I)&&(r===6||r===7)?(n.exit("htmlFlowData"),n.check(aS,Ut,N)(I)):I===null||Lt(I)?(n.exit("htmlFlowData"),N(I)):(n.consume(I),O)}function N(I){return n.check(lS,W,Ut)(I)}function W(I){return n.enter("lineEnding"),n.consume(I),n.exit("lineEnding"),X}function X(I){return I===null||Lt(I)?N(I):(n.enter("htmlFlowData"),O(I))}function $(I){return I===45?(n.consume(I),P):O(I)}function Q(I){return I===47?(n.consume(I),o="",Z):O(I)}function Z(I){if(I===62){const J=o.toLowerCase();return dh.includes(J)?(n.consume(I),_t):O(I)}return Ye(I)&&o.length<8?(n.consume(I),o+=String.fromCharCode(I),Z):O(I)}function lt(I){return I===93?(n.consume(I),P):O(I)}function P(I){return I===62?(n.consume(I),_t):I===45&&r===2?(n.consume(I),P):O(I)}function _t(I){return I===null||Lt(I)?(n.exit("htmlFlowData"),Ut(I)):(n.consume(I),_t)}function Ut(I){return n.exit("htmlFlow"),t(I)}}function hS(n,t,e){const i=this;return r;function r(o){return Lt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s):e(o)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}function dS(n,t,e){return i;function i(r){return n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),n.attempt(os,t,e)}}const fS={name:"htmlText",tokenize:pS};function pS(n,t,e){const i=this;let r,s,o;return a;function a(P){return n.enter("htmlText"),n.enter("htmlTextData"),n.consume(P),l}function l(P){return P===33?(n.consume(P),c):P===47?(n.consume(P),C):P===63?(n.consume(P),y):Ye(P)?(n.consume(P),U):e(P)}function c(P){return P===45?(n.consume(P),h):P===91?(n.consume(P),s=0,g):Ye(P)?(n.consume(P),M):e(P)}function h(P){return P===45?(n.consume(P),d):e(P)}function u(P){return P===null?e(P):P===45?(n.consume(P),f):Lt(P)?(o=u,Q(P)):(n.consume(P),u)}function f(P){return P===45?(n.consume(P),d):u(P)}function d(P){return P===62?$(P):P===45?f(P):u(P)}function g(P){const _t="CDATA[";return P===_t.charCodeAt(s++)?(n.consume(P),s===_t.length?_:g):e(P)}function _(P){return P===null?e(P):P===93?(n.consume(P),m):Lt(P)?(o=_,Q(P)):(n.consume(P),_)}function m(P){return P===93?(n.consume(P),p):_(P)}function p(P){return P===62?$(P):P===93?(n.consume(P),p):_(P)}function M(P){return P===null||P===62?$(P):Lt(P)?(o=M,Q(P)):(n.consume(P),M)}function y(P){return P===null?e(P):P===63?(n.consume(P),S):Lt(P)?(o=y,Q(P)):(n.consume(P),y)}function S(P){return P===62?$(P):y(P)}function C(P){return Ye(P)?(n.consume(P),E):e(P)}function E(P){return P===45||nn(P)?(n.consume(P),E):A(P)}function A(P){return Lt(P)?(o=A,Q(P)):qt(P)?(n.consume(P),A):$(P)}function U(P){return P===45||nn(P)?(n.consume(P),U):P===47||P===62||fe(P)?T(P):e(P)}function T(P){return P===47?(n.consume(P),$):P===58||P===95||Ye(P)?(n.consume(P),x):Lt(P)?(o=T,Q(P)):qt(P)?(n.consume(P),T):$(P)}function x(P){return P===45||P===46||P===58||P===95||nn(P)?(n.consume(P),x):R(P)}function R(P){return P===61?(n.consume(P),O):Lt(P)?(o=R,Q(P)):qt(P)?(n.consume(P),R):T(P)}function O(P){return P===null||P===60||P===61||P===62||P===96?e(P):P===34||P===39?(n.consume(P),r=P,N):Lt(P)?(o=O,Q(P)):qt(P)?(n.consume(P),O):(n.consume(P),W)}function N(P){return P===r?(n.consume(P),r=void 0,X):P===null?e(P):Lt(P)?(o=N,Q(P)):(n.consume(P),N)}function W(P){return P===null||P===34||P===39||P===60||P===61||P===96?e(P):P===47||P===62||fe(P)?T(P):(n.consume(P),W)}function X(P){return P===47||P===62||fe(P)?T(P):e(P)}function $(P){return P===62?(n.consume(P),n.exit("htmlTextData"),n.exit("htmlText"),t):e(P)}function Q(P){return n.exit("htmlTextData"),n.enter("lineEnding"),n.consume(P),n.exit("lineEnding"),Z}function Z(P){return qt(P)?Kt(n,lt,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(P):lt(P)}function lt(P){return n.enter("htmlTextData"),o(P)}}const ec={name:"labelEnd",resolveAll:vS,resolveTo:xS,tokenize:yS},mS={tokenize:SS},gS={tokenize:MS},_S={tokenize:ES};function vS(n){let t=-1;const e=[];for(;++t<n.length;){const i=n[t][1];if(e.push(n[t]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){const r=i.type==="labelImage"?4:2;i.type="data",t+=r}}return n.length!==e.length&&dn(n,0,n.length,e),n}function xS(n,t){let e=n.length,i=0,r,s,o,a;for(;e--;)if(r=n[e][1],s){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;n[e][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(o){if(n[e][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(s=e,r.type!=="labelLink")){i=2;break}}else r.type==="labelEnd"&&(o=e);const l={type:n[s][1].type==="labelLink"?"link":"image",start:{...n[s][1].start},end:{...n[n.length-1][1].end}},c={type:"label",start:{...n[s][1].start},end:{...n[o][1].end}},h={type:"labelText",start:{...n[s+i+2][1].end},end:{...n[o-2][1].start}};return a=[["enter",l,t],["enter",c,t]],a=xn(a,n.slice(s+1,s+i+3)),a=xn(a,[["enter",h,t]]),a=xn(a,Ao(t.parser.constructs.insideSpan.null,n.slice(s+i+4,o-3),t)),a=xn(a,[["exit",h,t],n[o-2],n[o-1],["exit",c,t]]),a=xn(a,n.slice(o+1)),a=xn(a,[["exit",l,t]]),dn(n,s,n.length,a),n}function yS(n,t,e){const i=this;let r=i.events.length,s,o;for(;r--;)if((i.events[r][1].type==="labelImage"||i.events[r][1].type==="labelLink")&&!i.events[r][1]._balanced){s=i.events[r][1];break}return a;function a(f){return s?s._inactive?u(f):(o=i.parser.defined.includes(In(i.sliceSerialize({start:s.end,end:i.now()}))),n.enter("labelEnd"),n.enter("labelMarker"),n.consume(f),n.exit("labelMarker"),n.exit("labelEnd"),l):e(f)}function l(f){return f===40?n.attempt(mS,h,o?h:u)(f):f===91?n.attempt(gS,h,o?c:u)(f):o?h(f):u(f)}function c(f){return n.attempt(_S,h,u)(f)}function h(f){return t(f)}function u(f){return s._balanced=!0,e(f)}}function SS(n,t,e){return i;function i(u){return n.enter("resource"),n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),r}function r(u){return fe(u)?$r(n,s)(u):s(u)}function s(u){return u===41?h(u):Hd(n,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function o(u){return fe(u)?$r(n,l)(u):h(u)}function a(u){return e(u)}function l(u){return u===34||u===39||u===40?Gd(n,c,e,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):h(u)}function c(u){return fe(u)?$r(n,h)(u):h(u)}function h(u){return u===41?(n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),n.exit("resource"),t):e(u)}}function MS(n,t,e){const i=this;return r;function r(a){return Vd.call(i,n,s,o,"reference","referenceMarker","referenceString")(a)}function s(a){return i.parser.defined.includes(In(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?t(a):e(a)}function o(a){return e(a)}}function ES(n,t,e){return i;function i(s){return n.enter("reference"),n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),r}function r(s){return s===93?(n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),n.exit("reference"),t):e(s)}}const bS={name:"labelStartImage",resolveAll:ec.resolveAll,tokenize:TS};function TS(n,t,e){const i=this;return r;function r(a){return n.enter("labelImage"),n.enter("labelImageMarker"),n.consume(a),n.exit("labelImageMarker"),s}function s(a){return a===91?(n.enter("labelMarker"),n.consume(a),n.exit("labelMarker"),n.exit("labelImage"),o):e(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(a):t(a)}}const wS={name:"labelStartLink",resolveAll:ec.resolveAll,tokenize:AS};function AS(n,t,e){const i=this;return r;function r(o){return n.enter("labelLink"),n.enter("labelMarker"),n.consume(o),n.exit("labelMarker"),n.exit("labelLink"),s}function s(o){return o===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(o):t(o)}}const Aa={name:"lineEnding",tokenize:CS};function CS(n,t){return e;function e(i){return n.enter("lineEnding"),n.consume(i),n.exit("lineEnding"),Kt(n,t,"linePrefix")}}const ao={name:"thematicBreak",tokenize:RS};function RS(n,t,e){let i=0,r;return s;function s(c){return n.enter("thematicBreak"),o(c)}function o(c){return r=c,a(c)}function a(c){return c===r?(n.enter("thematicBreakSequence"),l(c)):i>=3&&(c===null||Lt(c))?(n.exit("thematicBreak"),t(c)):e(c)}function l(c){return c===r?(n.consume(c),i++,l):(n.exit("thematicBreakSequence"),qt(c)?Kt(n,a,"whitespace")(c):a(c))}}const Je={continuation:{tokenize:US},exit:OS,name:"list",tokenize:DS},PS={partial:!0,tokenize:FS},LS={partial:!0,tokenize:IS};function DS(n,t,e){const i=this,r=i.events[i.events.length-1];let s=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,o=0;return a;function a(d){const g=i.containerState.type||(d===42||d===43||d===45?"listUnordered":"listOrdered");if(g==="listUnordered"?!i.containerState.marker||d===i.containerState.marker:Al(d)){if(i.containerState.type||(i.containerState.type=g,n.enter(g,{_container:!0})),g==="listUnordered")return n.enter("listItemPrefix"),d===42||d===45?n.check(ao,e,c)(d):c(d);if(!i.interrupt||d===49)return n.enter("listItemPrefix"),n.enter("listItemValue"),l(d)}return e(d)}function l(d){return Al(d)&&++o<10?(n.consume(d),l):(!i.interrupt||o<2)&&(i.containerState.marker?d===i.containerState.marker:d===41||d===46)?(n.exit("listItemValue"),c(d)):e(d)}function c(d){return n.enter("listItemMarker"),n.consume(d),n.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||d,n.check(os,i.interrupt?e:h,n.attempt(PS,f,u))}function h(d){return i.containerState.initialBlankLine=!0,s++,f(d)}function u(d){return qt(d)?(n.enter("listItemPrefixWhitespace"),n.consume(d),n.exit("listItemPrefixWhitespace"),f):e(d)}function f(d){return i.containerState.size=s+i.sliceSerialize(n.exit("listItemPrefix"),!0).length,t(d)}}function US(n,t,e){const i=this;return i.containerState._closeFlow=void 0,n.check(os,r,s);function r(a){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,Kt(n,t,"listItemIndent",i.containerState.size+1)(a)}function s(a){return i.containerState.furtherBlankLines||!qt(a)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,o(a)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,n.attempt(LS,t,o)(a))}function o(a){return i.containerState._closeFlow=!0,i.interrupt=void 0,Kt(n,n.attempt(Je,t,e),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function IS(n,t,e){const i=this;return Kt(n,r,"listItemIndent",i.containerState.size+1);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===i.containerState.size?t(s):e(s)}}function OS(n){n.exit(this.containerState.type)}function FS(n,t,e){const i=this;return Kt(n,r,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(s){const o=i.events[i.events.length-1];return!qt(s)&&o&&o[1].type==="listItemPrefixWhitespace"?t(s):e(s)}}const fh={name:"setextUnderline",resolveTo:NS,tokenize:kS};function NS(n,t){let e=n.length,i,r,s;for(;e--;)if(n[e][0]==="enter"){if(n[e][1].type==="content"){i=e;break}n[e][1].type==="paragraph"&&(r=e)}else n[e][1].type==="content"&&n.splice(e,1),!s&&n[e][1].type==="definition"&&(s=e);const o={type:"setextHeading",start:{...n[i][1].start},end:{...n[n.length-1][1].end}};return n[r][1].type="setextHeadingText",s?(n.splice(r,0,["enter",o,t]),n.splice(s+1,0,["exit",n[i][1],t]),n[i][1].end={...n[s][1].end}):n[i][1]=o,n.push(["exit",o,t]),n}function kS(n,t,e){const i=this;let r;return s;function s(c){let h=i.events.length,u;for(;h--;)if(i.events[h][1].type!=="lineEnding"&&i.events[h][1].type!=="linePrefix"&&i.events[h][1].type!=="content"){u=i.events[h][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||u)?(n.enter("setextHeadingLine"),r=c,o(c)):e(c)}function o(c){return n.enter("setextHeadingLineSequence"),a(c)}function a(c){return c===r?(n.consume(c),a):(n.exit("setextHeadingLineSequence"),qt(c)?Kt(n,l,"lineSuffix")(c):l(c))}function l(c){return c===null||Lt(c)?(n.exit("setextHeadingLine"),t(c)):e(c)}}const zS={tokenize:BS};function BS(n){const t=this,e=n.attempt(os,i,n.attempt(this.parser.constructs.flowInitial,r,Kt(n,n.attempt(this.parser.constructs.flow,r,n.attempt(Xy,r)),"linePrefix")));return e;function i(s){if(s===null){n.consume(s);return}return n.enter("lineEndingBlank"),n.consume(s),n.exit("lineEndingBlank"),t.currentConstruct=void 0,e}function r(s){if(s===null){n.consume(s);return}return n.enter("lineEnding"),n.consume(s),n.exit("lineEnding"),t.currentConstruct=void 0,e}}const HS={resolveAll:Xd()},VS=Wd("string"),GS=Wd("text");function Wd(n){return{resolveAll:Xd(n==="text"?WS:void 0),tokenize:t};function t(e){const i=this,r=this.parser.constructs[n],s=e.attempt(r,o,a);return o;function o(h){return c(h)?s(h):a(h)}function a(h){if(h===null){e.consume(h);return}return e.enter("data"),e.consume(h),l}function l(h){return c(h)?(e.exit("data"),s(h)):(e.consume(h),l)}function c(h){if(h===null)return!0;const u=r[h];let f=-1;if(u)for(;++f<u.length;){const d=u[f];if(!d.previous||d.previous.call(i,i.previous))return!0}return!1}}}function Xd(n){return t;function t(e,i){let r=-1,s;for(;++r<=e.length;)s===void 0?e[r]&&e[r][1].type==="data"&&(s=r,r++):(!e[r]||e[r][1].type!=="data")&&(r!==s+2&&(e[s][1].end=e[r-1][1].end,e.splice(s+2,r-s-2),r=s+2),s=void 0);return n?n(e,i):e}}function WS(n,t){let e=0;for(;++e<=n.length;)if((e===n.length||n[e][1].type==="lineEnding")&&n[e-1][1].type==="data"){const i=n[e-1][1],r=t.sliceStream(i);let s=r.length,o=-1,a=0,l;for(;s--;){const c=r[s];if(typeof c=="string"){for(o=c.length;c.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(c===-2)l=!0,a++;else if(c!==-1){s++;break}}if(t._contentTypeTextTrailing&&e===n.length&&(a=0),a){const c={type:e===n.length||l||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?o:i.start._bufferIndex+o,_index:i.start._index+s,line:i.end.line,column:i.end.column-a,offset:i.end.offset-a},end:{...i.end}};i.end={...c.start},i.start.offset===i.end.offset?Object.assign(i,c):(n.splice(e,0,["enter",c,t],["exit",c,t]),e+=2)}e++}return n}const XS={42:Je,43:Je,45:Je,48:Je,49:Je,50:Je,51:Je,52:Je,53:Je,54:Je,55:Je,56:Je,57:Je,62:Nd},qS={91:jy},YS={[-2]:wa,[-1]:wa,32:wa},$S={35:nS,42:ao,45:[fh,ao],60:oS,61:fh,95:ao,96:hh,126:hh},ZS={38:zd,92:kd},jS={[-5]:Aa,[-4]:Aa,[-3]:Aa,33:bS,38:zd,42:Cl,60:[wy,fS],91:wS,92:[tS,kd],93:ec,95:Cl,96:zy},KS={null:[Cl,HS]},QS={null:[42,95]},JS={null:[]},tM=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:QS,contentInitial:qS,disable:JS,document:XS,flow:$S,flowInitial:YS,insideSpan:KS,string:ZS,text:jS},Symbol.toStringTag,{value:"Module"}));function eM(n,t,e){let i={_bufferIndex:-1,_index:0,line:e&&e.line||1,column:e&&e.column||1,offset:e&&e.offset||0};const r={},s=[];let o=[],a=[];const l={attempt:A(C),check:A(E),consume:M,enter:y,exit:S,interrupt:A(E,{interrupt:!0})},c={code:null,containerState:{},defineSkip:_,events:[],now:g,parser:n,previous:null,sliceSerialize:f,sliceStream:d,write:u};let h=t.tokenize.call(c,l);return t.resolveAll&&s.push(t),c;function u(R){return o=xn(o,R),m(),o[o.length-1]!==null?[]:(U(t,0),c.events=Ao(s,c.events,c),c.events)}function f(R,O){return iM(d(R),O)}function d(R){return nM(o,R)}function g(){const{_bufferIndex:R,_index:O,line:N,column:W,offset:X}=i;return{_bufferIndex:R,_index:O,line:N,column:W,offset:X}}function _(R){r[R.line]=R.column,x()}function m(){let R;for(;i._index<o.length;){const O=o[i._index];if(typeof O=="string")for(R=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===R&&i._bufferIndex<O.length;)p(O.charCodeAt(i._bufferIndex));else p(O)}}function p(R){h=h(R)}function M(R){Lt(R)?(i.line++,i.column=1,i.offset+=R===-3?2:1,x()):R!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===o[i._index].length&&(i._bufferIndex=-1,i._index++)),c.previous=R}function y(R,O){const N=O||{};return N.type=R,N.start=g(),c.events.push(["enter",N,c]),a.push(N),N}function S(R){const O=a.pop();return O.end=g(),c.events.push(["exit",O,c]),O}function C(R,O){U(R,O.from)}function E(R,O){O.restore()}function A(R,O){return N;function N(W,X,$){let Q,Z,lt,P;return Array.isArray(W)?Ut(W):"tokenize"in W?Ut([W]):_t(W);function _t(dt){return ht;function ht(St){const Xt=St!==null&&dt[St],wt=St!==null&&dt.null,ce=[...Array.isArray(Xt)?Xt:Xt?[Xt]:[],...Array.isArray(wt)?wt:wt?[wt]:[]];return Ut(ce)(St)}}function Ut(dt){return Q=dt,Z=0,dt.length===0?$:I(dt[Z])}function I(dt){return ht;function ht(St){return P=T(),lt=dt,dt.partial||(c.currentConstruct=dt),dt.name&&c.parser.constructs.disable.null.includes(dt.name)?at():dt.tokenize.call(O?Object.assign(Object.create(c),O):c,l,J,at)(St)}}function J(dt){return R(lt,P),X}function at(dt){return P.restore(),++Z<Q.length?I(Q[Z]):$}}}function U(R,O){R.resolveAll&&!s.includes(R)&&s.push(R),R.resolve&&dn(c.events,O,c.events.length-O,R.resolve(c.events.slice(O),c)),R.resolveTo&&(c.events=R.resolveTo(c.events,c))}function T(){const R=g(),O=c.previous,N=c.currentConstruct,W=c.events.length,X=Array.from(a);return{from:W,restore:$};function $(){i=R,c.previous=O,c.currentConstruct=N,c.events.length=W,a=X,x()}}function x(){i.line in r&&i.column<2&&(i.column=r[i.line],i.offset+=r[i.line]-1)}}function nM(n,t){const e=t.start._index,i=t.start._bufferIndex,r=t.end._index,s=t.end._bufferIndex;let o;if(e===r)o=[n[e].slice(i,s)];else{if(o=n.slice(e,r),i>-1){const a=o[0];typeof a=="string"?o[0]=a.slice(i):o.shift()}s>0&&o.push(n[r].slice(0,s))}return o}function iM(n,t){let e=-1;const i=[];let r;for(;++e<n.length;){const s=n[e];let o;if(typeof s=="string")o=s;else switch(s){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&r)continue;o=" ";break}default:o=String.fromCharCode(s)}r=s===-2,i.push(o)}return i.join("")}function rM(n){const i={constructs:Od([tM,...(n||{}).extensions||[]]),content:r(xy),defined:[],document:r(Sy),flow:r(zS),lazy:{},string:r(VS),text:r(GS)};return i;function r(s){return o;function o(a){return eM(i,s,a)}}}function sM(n){for(;!Bd(n););return n}const ph=/[\0\t\n\r]/g;function oM(){let n=1,t="",e=!0,i;return r;function r(s,o,a){const l=[];let c,h,u,f,d;for(s=t+(typeof s=="string"?s.toString():new TextDecoder(o||void 0).decode(s)),u=0,t="",e&&(s.charCodeAt(0)===65279&&u++,e=void 0);u<s.length;){if(ph.lastIndex=u,c=ph.exec(s),f=c&&c.index!==void 0?c.index:s.length,d=s.charCodeAt(f),!c){t=s.slice(u);break}if(d===10&&u===f&&i)l.push(-3),i=void 0;else switch(i&&(l.push(-5),i=void 0),u<f&&(l.push(s.slice(u,f)),n+=f-u),d){case 0:{l.push(65533),n++;break}case 9:{for(h=Math.ceil(n/4)*4,l.push(-2);n++<h;)l.push(-1);break}case 10:{l.push(-4),n=1;break}default:i=!0,n=1}u=f+1}return a&&(i&&l.push(-5),t&&l.push(t),l.push(null)),l}}const aM=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function lM(n){return n.replace(aM,cM)}function cM(n,t,e){if(t)return t;if(e.charCodeAt(0)===35){const r=e.charCodeAt(1),s=r===120||r===88;return Fd(e.slice(s?2:1),s?16:10)}return tc(e)||n}function lo(n){return!n||typeof n!="object"?"":"position"in n||"type"in n?mh(n.position):"start"in n||"end"in n?mh(n):"line"in n||"column"in n?Rl(n):""}function Rl(n){return gh(n&&n.line)+":"+gh(n&&n.column)}function mh(n){return Rl(n&&n.start)+"-"+Rl(n&&n.end)}function gh(n){return n&&typeof n=="number"?n:1}const qd={}.hasOwnProperty;function uM(n,t,e){return typeof t!="string"&&(e=t,t=void 0),hM(e)(sM(rM(e).document().write(oM()(n,t,!0))))}function hM(n){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(Yt),autolinkProtocol:T,autolinkEmail:T,atxHeading:s(Ue),blockQuote:s(wt),characterEscape:T,characterReference:T,codeFenced:s(ce),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:s(ce,o),codeText:s(me,o),codeTextData:T,data:T,codeFlowValue:T,definition:s(Qt),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:s(F),hardBreakEscape:s(Zt),hardBreakTrailing:s(Zt),htmlFlow:s(re,o),htmlFlowData:T,htmlText:s(re,o),htmlTextData:T,image:s(Tt),label:o,link:s(Yt),listItem:s(kt),listItemValue:f,listOrdered:s(At,u),listUnordered:s(At),paragraph:s(be),reference:I,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:s(Ue),strong:s(L),thematicBreak:s(q)},exit:{atxHeading:l(),atxHeadingSequence:C,autolink:l(),autolinkEmail:Xt,autolinkProtocol:St,blockQuote:l(),characterEscapeValue:x,characterReferenceMarkerHexadecimal:at,characterReferenceMarkerNumeric:at,characterReferenceValue:dt,characterReference:ht,codeFenced:l(m),codeFencedFence:_,codeFencedFenceInfo:d,codeFencedFenceMeta:g,codeFlowValue:x,codeIndented:l(p),codeText:l(X),codeTextData:x,data:x,definition:l(),definitionDestinationString:S,definitionLabelString:M,definitionTitleString:y,emphasis:l(),hardBreakEscape:l(O),hardBreakTrailing:l(O),htmlFlow:l(N),htmlFlowData:x,htmlText:l(W),htmlTextData:x,image:l(Q),label:lt,labelText:Z,lineEnding:R,link:l($),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:J,resourceDestinationString:P,resourceTitleString:_t,resource:Ut,setextHeading:l(U),setextHeadingLineSequence:A,setextHeadingText:E,strong:l(),thematicBreak:l()}};Yd(t,(n||{}).mdastExtensions||[]);const e={};return i;function i(D){let B={type:"root",children:[]};const G={stack:[B],tokenStack:[],config:t,enter:a,exit:c,buffer:o,resume:h,data:e},rt=[];let nt=-1;for(;++nt<D.length;)if(D[nt][1].type==="listOrdered"||D[nt][1].type==="listUnordered")if(D[nt][0]==="enter")rt.push(nt);else{const mt=rt.pop();nt=r(D,mt,nt)}for(nt=-1;++nt<D.length;){const mt=t[D[nt][0]];qd.call(mt,D[nt][1].type)&&mt[D[nt][1].type].call(Object.assign({sliceSerialize:D[nt][2].sliceSerialize},G),D[nt][1])}if(G.tokenStack.length>0){const mt=G.tokenStack[G.tokenStack.length-1];(mt[1]||_h).call(G,void 0,mt[0])}for(B.position={start:fi(D.length>0?D[0][1].start:{line:1,column:1,offset:0}),end:fi(D.length>0?D[D.length-2][1].end:{line:1,column:1,offset:0})},nt=-1;++nt<t.transforms.length;)B=t.transforms[nt](B)||B;return B}function r(D,B,G){let rt=B-1,nt=-1,mt=!1,xt,tt,gt,Ct;for(;++rt<=G;){const yt=D[rt];switch(yt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{yt[0]==="enter"?nt++:nt--,Ct=void 0;break}case"lineEndingBlank":{yt[0]==="enter"&&(xt&&!Ct&&!nt&&!gt&&(gt=rt),Ct=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Ct=void 0}if(!nt&&yt[0]==="enter"&&yt[1].type==="listItemPrefix"||nt===-1&&yt[0]==="exit"&&(yt[1].type==="listUnordered"||yt[1].type==="listOrdered")){if(xt){let ct=rt;for(tt=void 0;ct--;){const Rt=D[ct];if(Rt[1].type==="lineEnding"||Rt[1].type==="lineEndingBlank"){if(Rt[0]==="exit")continue;tt&&(D[tt][1].type="lineEndingBlank",mt=!0),Rt[1].type="lineEnding",tt=ct}else if(!(Rt[1].type==="linePrefix"||Rt[1].type==="blockQuotePrefix"||Rt[1].type==="blockQuotePrefixWhitespace"||Rt[1].type==="blockQuoteMarker"||Rt[1].type==="listItemIndent"))break}gt&&(!tt||gt<tt)&&(xt._spread=!0),xt.end=Object.assign({},tt?D[tt][1].start:yt[1].end),D.splice(tt||rt,0,["exit",xt,yt[2]]),rt++,G++}if(yt[1].type==="listItemPrefix"){const ct={type:"listItem",_spread:!1,start:Object.assign({},yt[1].start),end:void 0};xt=ct,D.splice(rt,0,["enter",ct,yt[2]]),rt++,G++,gt=void 0,Ct=!0}}}return D[B][1]._spread=mt,G}function s(D,B){return G;function G(rt){a.call(this,D(rt),rt),B&&B.call(this,rt)}}function o(){this.stack.push({type:"fragment",children:[]})}function a(D,B,G){this.stack[this.stack.length-1].children.push(D),this.stack.push(D),this.tokenStack.push([B,G||void 0]),D.position={start:fi(B.start),end:void 0}}function l(D){return B;function B(G){D&&D.call(this,G),c.call(this,G)}}function c(D,B){const G=this.stack.pop(),rt=this.tokenStack.pop();if(rt)rt[0].type!==D.type&&(B?B.call(this,D,rt[0]):(rt[1]||_h).call(this,D,rt[0]));else throw new Error("Cannot close `"+D.type+"` ("+lo({start:D.start,end:D.end})+"): it’s not open");G.position.end=fi(D.end)}function h(){return dy(this.stack.pop())}function u(){this.data.expectingFirstListItemValue=!0}function f(D){if(this.data.expectingFirstListItemValue){const B=this.stack[this.stack.length-2];B.start=Number.parseInt(this.sliceSerialize(D),10),this.data.expectingFirstListItemValue=void 0}}function d(){const D=this.resume(),B=this.stack[this.stack.length-1];B.lang=D}function g(){const D=this.resume(),B=this.stack[this.stack.length-1];B.meta=D}function _(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function m(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function p(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D.replace(/(\r?\n|\r)$/g,"")}function M(D){const B=this.resume(),G=this.stack[this.stack.length-1];G.label=B,G.identifier=In(this.sliceSerialize(D)).toLowerCase()}function y(){const D=this.resume(),B=this.stack[this.stack.length-1];B.title=D}function S(){const D=this.resume(),B=this.stack[this.stack.length-1];B.url=D}function C(D){const B=this.stack[this.stack.length-1];if(!B.depth){const G=this.sliceSerialize(D).length;B.depth=G}}function E(){this.data.setextHeadingSlurpLineEnding=!0}function A(D){const B=this.stack[this.stack.length-1];B.depth=this.sliceSerialize(D).codePointAt(0)===61?1:2}function U(){this.data.setextHeadingSlurpLineEnding=void 0}function T(D){const G=this.stack[this.stack.length-1].children;let rt=G[G.length-1];(!rt||rt.type!=="text")&&(rt=b(),rt.position={start:fi(D.start),end:void 0},G.push(rt)),this.stack.push(rt)}function x(D){const B=this.stack.pop();B.value+=this.sliceSerialize(D),B.position.end=fi(D.end)}function R(D){const B=this.stack[this.stack.length-1];if(this.data.atHardBreak){const G=B.children[B.children.length-1];G.position.end=fi(D.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(B.type)&&(T.call(this,D),x.call(this,D))}function O(){this.data.atHardBreak=!0}function N(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D}function W(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D}function X(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D}function $(){const D=this.stack[this.stack.length-1];if(this.data.inReference){const B=this.data.referenceType||"shortcut";D.type+="Reference",D.referenceType=B,delete D.url,delete D.title}else delete D.identifier,delete D.label;this.data.referenceType=void 0}function Q(){const D=this.stack[this.stack.length-1];if(this.data.inReference){const B=this.data.referenceType||"shortcut";D.type+="Reference",D.referenceType=B,delete D.url,delete D.title}else delete D.identifier,delete D.label;this.data.referenceType=void 0}function Z(D){const B=this.sliceSerialize(D),G=this.stack[this.stack.length-2];G.label=lM(B),G.identifier=In(B).toLowerCase()}function lt(){const D=this.stack[this.stack.length-1],B=this.resume(),G=this.stack[this.stack.length-1];if(this.data.inReference=!0,G.type==="link"){const rt=D.children;G.children=rt}else G.alt=B}function P(){const D=this.resume(),B=this.stack[this.stack.length-1];B.url=D}function _t(){const D=this.resume(),B=this.stack[this.stack.length-1];B.title=D}function Ut(){this.data.inReference=void 0}function I(){this.data.referenceType="collapsed"}function J(D){const B=this.resume(),G=this.stack[this.stack.length-1];G.label=B,G.identifier=In(this.sliceSerialize(D)).toLowerCase(),this.data.referenceType="full"}function at(D){this.data.characterReferenceType=D.type}function dt(D){const B=this.sliceSerialize(D),G=this.data.characterReferenceType;let rt;G?(rt=Fd(B,G==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):rt=tc(B);const nt=this.stack[this.stack.length-1];nt.value+=rt}function ht(D){const B=this.stack.pop();B.position.end=fi(D.end)}function St(D){x.call(this,D);const B=this.stack[this.stack.length-1];B.url=this.sliceSerialize(D)}function Xt(D){x.call(this,D);const B=this.stack[this.stack.length-1];B.url="mailto:"+this.sliceSerialize(D)}function wt(){return{type:"blockquote",children:[]}}function ce(){return{type:"code",lang:null,meta:null,value:""}}function me(){return{type:"inlineCode",value:""}}function Qt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function F(){return{type:"emphasis",children:[]}}function Ue(){return{type:"heading",depth:0,children:[]}}function Zt(){return{type:"break"}}function re(){return{type:"html",value:""}}function Tt(){return{type:"image",title:null,url:"",alt:null}}function Yt(){return{type:"link",title:null,url:"",children:[]}}function At(D){return{type:"list",ordered:D.type==="listOrdered",start:null,spread:D._spread,children:[]}}function kt(D){return{type:"listItem",spread:D._spread,checked:null,children:[]}}function be(){return{type:"paragraph",children:[]}}function L(){return{type:"strong",children:[]}}function b(){return{type:"text",value:""}}function q(){return{type:"thematicBreak"}}}function fi(n){return{line:n.line,column:n.column,offset:n.offset}}function Yd(n,t){let e=-1;for(;++e<t.length;){const i=t[e];Array.isArray(i)?Yd(n,i):dM(n,i)}}function dM(n,t){let e;for(e in t)if(qd.call(t,e))switch(e){case"canContainEols":{const i=t[e];i&&n[e].push(...i);break}case"transforms":{const i=t[e];i&&n[e].push(...i);break}case"enter":case"exit":{const i=t[e];i&&Object.assign(n[e],i);break}}}function _h(n,t){throw n?new Error("Cannot close `"+n.type+"` ("+lo({start:n.start,end:n.end})+"): a different token (`"+t.type+"`, "+lo({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+lo({start:t.start,end:t.end})+") is still open")}function vh(n,t){const e=String(n);if(typeof t!="string")throw new TypeError("Expected character");let i=0,r=e.indexOf(t);for(;r!==-1;)i++,r=e.indexOf(t,r+t.length);return i}function fM(n){if(typeof n!="string")throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}const nc=function(n){if(n==null)return _M;if(typeof n=="function")return Co(n);if(typeof n=="object")return Array.isArray(n)?pM(n):mM(n);if(typeof n=="string")return gM(n);throw new Error("Expected function, string, or object as test")};function pM(n){const t=[];let e=-1;for(;++e<n.length;)t[e]=nc(n[e]);return Co(i);function i(...r){let s=-1;for(;++s<t.length;)if(t[s].apply(this,r))return!0;return!1}}function mM(n){const t=n;return Co(e);function e(i){const r=i;let s;for(s in n)if(r[s]!==t[s])return!1;return!0}}function gM(n){return Co(t);function t(e){return e&&e.type===n}}function Co(n){return t;function t(e,i,r){return!!(vM(e)&&n.call(this,e,typeof i=="number"?i:void 0,r||void 0))}}function _M(){return!0}function vM(n){return n!==null&&typeof n=="object"&&"type"in n}const $d=[],xM=!0,xh=!1,yM="skip";function SM(n,t,e,i){let r;r=t;const s=nc(r),o=1;a(n,void 0,[])();function a(l,c,h){const u=l&&typeof l=="object"?l:{};if(typeof u.type=="string"){const d=typeof u.tagName=="string"?u.tagName:typeof u.name=="string"?u.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(l.type+(d?"<"+d+">":""))+")"})}return f;function f(){let d=$d,g,_,m;if(s(l,c,h[h.length-1]||void 0)&&(d=MM(e(l,h)),d[0]===xh))return d;if("children"in l&&l.children){const p=l;if(p.children&&d[0]!==yM)for(_=-1+o,m=h.concat(p);_>-1&&_<p.children.length;){const M=p.children[_];if(g=a(M,_,m)(),g[0]===xh)return g;_=typeof g[1]=="number"?g[1]:_+o}}return d}}}function MM(n){return Array.isArray(n)?n:typeof n=="number"?[xM,n]:n==null?$d:[n]}function EM(n,t,e){const r=nc((e||{}).ignore||[]),s=bM(t);let o=-1;for(;++o<s.length;)SM(n,"text",a);function a(c,h){let u=-1,f;for(;++u<h.length;){const d=h[u],g=f?f.children:void 0;if(r(d,g?g.indexOf(d):void 0,f))return;f=d}if(f)return l(c,h)}function l(c,h){const u=h[h.length-1],f=s[o][0],d=s[o][1];let g=0;const m=u.children.indexOf(c);let p=!1,M=[];f.lastIndex=0;let y=f.exec(c.value);for(;y;){const S=y.index,C={index:y.index,input:y.input,stack:[...h,c]};let E=d(...y,C);if(typeof E=="string"&&(E=E.length>0?{type:"text",value:E}:void 0),E===!1?f.lastIndex=S+1:(g!==S&&M.push({type:"text",value:c.value.slice(g,S)}),Array.isArray(E)?M.push(...E):E&&M.push(E),g=S+y[0].length,p=!0),!f.global)break;y=f.exec(c.value)}return p?(g<c.value.length&&M.push({type:"text",value:c.value.slice(g)}),u.children.splice(m,1,...M)):M=[c],m+M.length}}function bM(n){const t=[];if(!Array.isArray(n))throw new TypeError("Expected find and replace tuple or list of tuples");const e=!n[0]||Array.isArray(n[0])?n:[n];let i=-1;for(;++i<e.length;){const r=e[i];t.push([TM(r[0]),wM(r[1])])}return t}function TM(n){return typeof n=="string"?new RegExp(fM(n),"g"):n}function wM(n){return typeof n=="function"?n:function(){return n}}function AM(){return{transforms:[UM],enter:{literalAutolink:CM,literalAutolinkEmail:Ca,literalAutolinkHttp:Ca,literalAutolinkWww:Ca},exit:{literalAutolink:DM,literalAutolinkEmail:LM,literalAutolinkHttp:RM,literalAutolinkWww:PM}}}function CM(n){this.enter({type:"link",title:null,url:"",children:[]},n)}function Ca(n){this.config.enter.autolinkProtocol.call(this,n)}function RM(n){this.config.exit.autolinkProtocol.call(this,n)}function PM(n){this.config.exit.data.call(this,n);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(n)}function LM(n){this.config.exit.autolinkEmail.call(this,n)}function DM(n){this.exit(n)}function UM(n){EM(n,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,IM],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,OM]],{ignore:["link","linkReference"]})}function IM(n,t,e,i,r){let s="";if(!Zd(r)||(/^w/i.test(t)&&(e=t+e,t="",s="http://"),!FM(e)))return!1;const o=NM(e+i);if(!o[0])return!1;const a={type:"link",title:null,url:s+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function OM(n,t,e,i){return!Zd(i,!0)||/[-\d_]$/.test(e)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+e,children:[{type:"text",value:t+"@"+e}]}}function FM(n){const t=n.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function NM(n){const t=/[!"&'),.:;<>?\]}]+$/.exec(n);if(!t)return[n,void 0];n=n.slice(0,t.index);let e=t[0],i=e.indexOf(")");const r=vh(n,"(");let s=vh(n,")");for(;i!==-1&&r>s;)n+=e.slice(0,i+1),e=e.slice(i+1),i=e.indexOf(")"),s++;return[n,e]}function Zd(n,t){const e=n.input.charCodeAt(n.index-1);return(n.index===0||Yi(e)||wo(e))&&(!t||e!==47)}function kM(){this.buffer()}function zM(n){this.enter({type:"footnoteReference",identifier:"",label:""},n)}function BM(){this.buffer()}function HM(n){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},n)}function VM(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=In(this.sliceSerialize(n)).toLowerCase(),e.label=t}function GM(n){this.exit(n)}function WM(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=In(this.sliceSerialize(n)).toLowerCase(),e.label=t}function XM(n){this.exit(n)}function qM(){return{enter:{gfmFootnoteCallString:kM,gfmFootnoteCall:zM,gfmFootnoteDefinitionLabelString:BM,gfmFootnoteDefinition:HM},exit:{gfmFootnoteCallString:VM,gfmFootnoteCall:GM,gfmFootnoteDefinitionLabelString:WM,gfmFootnoteDefinition:XM}}}function YM(){return{canContainEols:["delete"],enter:{strikethrough:$M},exit:{strikethrough:ZM}}}function $M(n){this.enter({type:"delete",children:[]},n)}function ZM(n){this.exit(n)}function jM(){return{enter:{table:KM,tableData:yh,tableHeader:yh,tableRow:JM},exit:{codeText:tE,table:QM,tableData:Ra,tableHeader:Ra,tableRow:Ra}}}function KM(n){const t=n._align;this.enter({type:"table",align:t.map(function(e){return e==="none"?null:e}),children:[]},n),this.data.inTable=!0}function QM(n){this.exit(n),this.data.inTable=void 0}function JM(n){this.enter({type:"tableRow",children:[]},n)}function Ra(n){this.exit(n)}function yh(n){this.enter({type:"tableCell",children:[]},n)}function tE(n){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,eE));const e=this.stack[this.stack.length-1];e.type,e.value=t,this.exit(n)}function eE(n,t){return t==="|"?t:n}function nE(){return{exit:{taskListCheckValueChecked:Sh,taskListCheckValueUnchecked:Sh,paragraph:iE}}}function Sh(n){const t=this.stack[this.stack.length-2];t.type,t.checked=n.type==="taskListCheckValueChecked"}function iE(n){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const e=this.stack[this.stack.length-1];e.type;const i=e.children[0];if(i&&i.type==="text"){const r=t.children;let s=-1,o;for(;++s<r.length;){const a=r[s];if(a.type==="paragraph"){o=a;break}}o===e&&(i.value=i.value.slice(1),i.value.length===0?e.children.shift():e.position&&i.position&&typeof i.position.start.offset=="number"&&(i.position.start.column++,i.position.start.offset++,e.position.start=Object.assign({},i.position.start)))}}this.exit(n)}function rE(){return[AM(),qM(),YM(),jM(),nE()]}const sE={tokenize:hE,partial:!0},jd={tokenize:dE,partial:!0},Kd={tokenize:fE,partial:!0},Qd={tokenize:pE,partial:!0},oE={tokenize:mE,partial:!0},Jd={name:"wwwAutolink",tokenize:cE,previous:ef},tf={name:"protocolAutolink",tokenize:uE,previous:nf},oi={name:"emailAutolink",tokenize:lE,previous:rf},Vn={};function aE(){return{text:Vn}}let Ii=48;for(;Ii<123;)Vn[Ii]=oi,Ii++,Ii===58?Ii=65:Ii===91&&(Ii=97);Vn[43]=oi;Vn[45]=oi;Vn[46]=oi;Vn[95]=oi;Vn[72]=[oi,tf];Vn[104]=[oi,tf];Vn[87]=[oi,Jd];Vn[119]=[oi,Jd];function lE(n,t,e){const i=this;let r,s;return o;function o(u){return!Pl(u)||!rf.call(i,i.previous)||ic(i.events)?e(u):(n.enter("literalAutolink"),n.enter("literalAutolinkEmail"),a(u))}function a(u){return Pl(u)?(n.consume(u),a):u===64?(n.consume(u),l):e(u)}function l(u){return u===46?n.check(oE,h,c)(u):u===45||u===95||nn(u)?(s=!0,n.consume(u),l):h(u)}function c(u){return n.consume(u),r=!0,l}function h(u){return s&&r&&Ye(i.previous)?(n.exit("literalAutolinkEmail"),n.exit("literalAutolink"),t(u)):e(u)}}function cE(n,t,e){const i=this;return r;function r(o){return o!==87&&o!==119||!ef.call(i,i.previous)||ic(i.events)?e(o):(n.enter("literalAutolink"),n.enter("literalAutolinkWww"),n.check(sE,n.attempt(jd,n.attempt(Kd,s),e),e)(o))}function s(o){return n.exit("literalAutolinkWww"),n.exit("literalAutolink"),t(o)}}function uE(n,t,e){const i=this;let r="",s=!1;return o;function o(u){return(u===72||u===104)&&nf.call(i,i.previous)&&!ic(i.events)?(n.enter("literalAutolink"),n.enter("literalAutolinkHttp"),r+=String.fromCodePoint(u),n.consume(u),a):e(u)}function a(u){if(Ye(u)&&r.length<5)return r+=String.fromCodePoint(u),n.consume(u),a;if(u===58){const f=r.toLowerCase();if(f==="http"||f==="https")return n.consume(u),l}return e(u)}function l(u){return u===47?(n.consume(u),s?c:(s=!0,l)):e(u)}function c(u){return u===null||_o(u)||fe(u)||Yi(u)||wo(u)?e(u):n.attempt(jd,n.attempt(Kd,h),e)(u)}function h(u){return n.exit("literalAutolinkHttp"),n.exit("literalAutolink"),t(u)}}function hE(n,t,e){let i=0;return r;function r(o){return(o===87||o===119)&&i<3?(i++,n.consume(o),r):o===46&&i===3?(n.consume(o),s):e(o)}function s(o){return o===null?e(o):t(o)}}function dE(n,t,e){let i,r,s;return o;function o(c){return c===46||c===95?n.check(Qd,l,a)(c):c===null||fe(c)||Yi(c)||c!==45&&wo(c)?l(c):(s=!0,n.consume(c),o)}function a(c){return c===95?i=!0:(r=i,i=void 0),n.consume(c),o}function l(c){return r||i||!s?e(c):t(c)}}function fE(n,t){let e=0,i=0;return r;function r(o){return o===40?(e++,n.consume(o),r):o===41&&i<e?s(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?n.check(Qd,t,s)(o):o===null||fe(o)||Yi(o)?t(o):(n.consume(o),r)}function s(o){return o===41&&i++,n.consume(o),r}}function pE(n,t,e){return i;function i(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(n.consume(a),i):a===38?(n.consume(a),s):a===93?(n.consume(a),r):a===60||a===null||fe(a)||Yi(a)?t(a):e(a)}function r(a){return a===null||a===40||a===91||fe(a)||Yi(a)?t(a):i(a)}function s(a){return Ye(a)?o(a):e(a)}function o(a){return a===59?(n.consume(a),i):Ye(a)?(n.consume(a),o):e(a)}}function mE(n,t,e){return i;function i(s){return n.consume(s),r}function r(s){return nn(s)?e(s):t(s)}}function ef(n){return n===null||n===40||n===42||n===95||n===91||n===93||n===126||fe(n)}function nf(n){return!Ye(n)}function rf(n){return!(n===47||Pl(n))}function Pl(n){return n===43||n===45||n===46||n===95||nn(n)}function ic(n){let t=n.length,e=!1;for(;t--;){const i=n[t][1];if((i.type==="labelLink"||i.type==="labelImage")&&!i._balanced){e=!0;break}if(i._gfmAutolinkLiteralWalkedInto){e=!1;break}}return n.length>0&&!e&&(n[n.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),e}const gE={tokenize:bE,partial:!0};function _E(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:SE,continuation:{tokenize:ME},exit:EE}},text:{91:{name:"gfmFootnoteCall",tokenize:yE},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:vE,resolveTo:xE}}}}function vE(n,t,e){const i=this;let r=i.events.length;const s=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let o;for(;r--;){const l=i.events[r][1];if(l.type==="labelImage"){o=l;break}if(l.type==="gfmFootnoteCall"||l.type==="labelLink"||l.type==="label"||l.type==="image"||l.type==="link")break}return a;function a(l){if(!o||!o._balanced)return e(l);const c=In(i.sliceSerialize({start:o.end,end:i.now()}));return c.codePointAt(0)!==94||!s.includes(c.slice(1))?e(l):(n.enter("gfmFootnoteCallLabelMarker"),n.consume(l),n.exit("gfmFootnoteCallLabelMarker"),t(l))}}function xE(n,t){let e=n.length;for(;e--;)if(n[e][1].type==="labelImage"&&n[e][0]==="enter"){n[e][1];break}n[e+1][1].type="data",n[e+3][1].type="gfmFootnoteCallLabelMarker";const i={type:"gfmFootnoteCall",start:Object.assign({},n[e+3][1].start),end:Object.assign({},n[n.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},n[e+3][1].end),end:Object.assign({},n[e+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},n[n.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},a=[n[e+1],n[e+2],["enter",i,t],n[e+3],n[e+4],["enter",r,t],["exit",r,t],["enter",s,t],["enter",o,t],["exit",o,t],["exit",s,t],n[n.length-2],n[n.length-1],["exit",i,t]];return n.splice(e,n.length-e+1,...a),n}function yE(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s=0,o;return a;function a(u){return n.enter("gfmFootnoteCall"),n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),l}function l(u){return u!==94?e(u):(n.enter("gfmFootnoteCallMarker"),n.consume(u),n.exit("gfmFootnoteCallMarker"),n.enter("gfmFootnoteCallString"),n.enter("chunkString").contentType="string",c)}function c(u){if(s>999||u===93&&!o||u===null||u===91||fe(u))return e(u);if(u===93){n.exit("chunkString");const f=n.exit("gfmFootnoteCallString");return r.includes(In(i.sliceSerialize(f)))?(n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),n.exit("gfmFootnoteCall"),t):e(u)}return fe(u)||(o=!0),s++,n.consume(u),u===92?h:c}function h(u){return u===91||u===92||u===93?(n.consume(u),s++,c):c(u)}}function SE(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s,o=0,a;return l;function l(g){return n.enter("gfmFootnoteDefinition")._container=!0,n.enter("gfmFootnoteDefinitionLabel"),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionLabelMarker"),c}function c(g){return g===94?(n.enter("gfmFootnoteDefinitionMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionMarker"),n.enter("gfmFootnoteDefinitionLabelString"),n.enter("chunkString").contentType="string",h):e(g)}function h(g){if(o>999||g===93&&!a||g===null||g===91||fe(g))return e(g);if(g===93){n.exit("chunkString");const _=n.exit("gfmFootnoteDefinitionLabelString");return s=In(i.sliceSerialize(_)),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionLabelMarker"),n.exit("gfmFootnoteDefinitionLabel"),f}return fe(g)||(a=!0),o++,n.consume(g),g===92?u:h}function u(g){return g===91||g===92||g===93?(n.consume(g),o++,h):h(g)}function f(g){return g===58?(n.enter("definitionMarker"),n.consume(g),n.exit("definitionMarker"),r.includes(s)||r.push(s),Kt(n,d,"gfmFootnoteDefinitionWhitespace")):e(g)}function d(g){return t(g)}}function ME(n,t,e){return n.check(os,t,n.attempt(gE,t,e))}function EE(n){n.exit("gfmFootnoteDefinition")}function bE(n,t,e){const i=this;return Kt(n,r,"gfmFootnoteDefinitionIndent",5);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(s):e(s)}}function TE(n){let e={}.singleTilde;const i={name:"strikethrough",tokenize:s,resolveAll:r};return e==null&&(e=!0),{text:{126:i},insideSpan:{null:[i]},attentionMarkers:{null:[126]}};function r(o,a){let l=-1;for(;++l<o.length;)if(o[l][0]==="enter"&&o[l][1].type==="strikethroughSequenceTemporary"&&o[l][1]._close){let c=l;for(;c--;)if(o[c][0]==="exit"&&o[c][1].type==="strikethroughSequenceTemporary"&&o[c][1]._open&&o[l][1].end.offset-o[l][1].start.offset===o[c][1].end.offset-o[c][1].start.offset){o[l][1].type="strikethroughSequence",o[c][1].type="strikethroughSequence";const h={type:"strikethrough",start:Object.assign({},o[c][1].start),end:Object.assign({},o[l][1].end)},u={type:"strikethroughText",start:Object.assign({},o[c][1].end),end:Object.assign({},o[l][1].start)},f=[["enter",h,a],["enter",o[c][1],a],["exit",o[c][1],a],["enter",u,a]],d=a.parser.constructs.insideSpan.null;d&&dn(f,f.length,0,Ao(d,o.slice(c+1,l),a)),dn(f,f.length,0,[["exit",u,a],["enter",o[l][1],a],["exit",o[l][1],a],["exit",h,a]]),dn(o,c-1,l-c+3,f),l=c+f.length-2;break}}for(l=-1;++l<o.length;)o[l][1].type==="strikethroughSequenceTemporary"&&(o[l][1].type="data");return o}function s(o,a,l){const c=this.previous,h=this.events;let u=0;return f;function f(g){return c===126&&h[h.length-1][1].type!=="characterEscape"?l(g):(o.enter("strikethroughSequenceTemporary"),d(g))}function d(g){const _=vo(c);if(g===126)return u>1?l(g):(o.consume(g),u++,d);if(u<2&&!e)return l(g);const m=o.exit("strikethroughSequenceTemporary"),p=vo(g);return m._open=!p||p===2&&!!_,m._close=!_||_===2&&!!p,a(g)}}}class wE{constructor(){this.map=[]}add(t,e,i){AE(this,t,e,i)}consume(t){if(this.map.sort(function(s,o){return s[0]-o[0]}),this.map.length===0)return;let e=this.map.length;const i=[];for(;e>0;)e-=1,i.push(t.slice(this.map[e][0]+this.map[e][1]),this.map[e][2]),t.length=this.map[e][0];i.push(t.slice()),t.length=0;let r=i.pop();for(;r;){for(const s of r)t.push(s);r=i.pop()}this.map.length=0}}function AE(n,t,e,i){let r=0;if(!(e===0&&i.length===0)){for(;r<n.map.length;){if(n.map[r][0]===t){n.map[r][1]+=e,n.map[r][2].push(...i);return}r+=1}n.map.push([t,e,i])}}function CE(n,t){let e=!1;const i=[];for(;t<n.length;){const r=n[t];if(e){if(r[0]==="enter")r[1].type==="tableContent"&&i.push(n[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(n[t-1][1].type==="tableDelimiterMarker"){const s=i.length-1;i[s]=i[s]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(e=!0);t+=1}return i}function RE(){return{flow:{null:{name:"table",tokenize:PE,resolveAll:LE}}}}function PE(n,t,e){const i=this;let r=0,s=0,o;return a;function a(x){let R=i.events.length-1;for(;R>-1;){const W=i.events[R][1].type;if(W==="lineEnding"||W==="linePrefix")R--;else break}const O=R>-1?i.events[R][1].type:null,N=O==="tableHead"||O==="tableRow"?E:l;return N===E&&i.parser.lazy[i.now().line]?e(x):N(x)}function l(x){return n.enter("tableHead"),n.enter("tableRow"),c(x)}function c(x){return x===124||(o=!0,s+=1),h(x)}function h(x){return x===null?e(x):Lt(x)?s>1?(s=0,i.interrupt=!0,n.exit("tableRow"),n.enter("lineEnding"),n.consume(x),n.exit("lineEnding"),d):e(x):qt(x)?Kt(n,h,"whitespace")(x):(s+=1,o&&(o=!1,r+=1),x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),o=!0,h):(n.enter("data"),u(x)))}function u(x){return x===null||x===124||fe(x)?(n.exit("data"),h(x)):(n.consume(x),x===92?f:u)}function f(x){return x===92||x===124?(n.consume(x),u):u(x)}function d(x){return i.interrupt=!1,i.parser.lazy[i.now().line]?e(x):(n.enter("tableDelimiterRow"),o=!1,qt(x)?Kt(n,g,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):g(x))}function g(x){return x===45||x===58?m(x):x===124?(o=!0,n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),_):C(x)}function _(x){return qt(x)?Kt(n,m,"whitespace")(x):m(x)}function m(x){return x===58?(s+=1,o=!0,n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),p):x===45?(s+=1,p(x)):x===null||Lt(x)?S(x):C(x)}function p(x){return x===45?(n.enter("tableDelimiterFiller"),M(x)):C(x)}function M(x){return x===45?(n.consume(x),M):x===58?(o=!0,n.exit("tableDelimiterFiller"),n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),y):(n.exit("tableDelimiterFiller"),y(x))}function y(x){return qt(x)?Kt(n,S,"whitespace")(x):S(x)}function S(x){return x===124?g(x):x===null||Lt(x)?!o||r!==s?C(x):(n.exit("tableDelimiterRow"),n.exit("tableHead"),t(x)):C(x)}function C(x){return e(x)}function E(x){return n.enter("tableRow"),A(x)}function A(x){return x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),A):x===null||Lt(x)?(n.exit("tableRow"),t(x)):qt(x)?Kt(n,A,"whitespace")(x):(n.enter("data"),U(x))}function U(x){return x===null||x===124||fe(x)?(n.exit("data"),A(x)):(n.consume(x),x===92?T:U)}function T(x){return x===92||x===124?(n.consume(x),U):U(x)}}function LE(n,t){let e=-1,i=!0,r=0,s=[0,0,0,0],o=[0,0,0,0],a=!1,l=0,c,h,u;const f=new wE;for(;++e<n.length;){const d=n[e],g=d[1];d[0]==="enter"?g.type==="tableHead"?(a=!1,l!==0&&(Mh(f,t,l,c,h),h=void 0,l=0),c={type:"table",start:Object.assign({},g.start),end:Object.assign({},g.end)},f.add(e,0,[["enter",c,t]])):g.type==="tableRow"||g.type==="tableDelimiterRow"?(i=!0,u=void 0,s=[0,0,0,0],o=[0,e+1,0,0],a&&(a=!1,h={type:"tableBody",start:Object.assign({},g.start),end:Object.assign({},g.end)},f.add(e,0,[["enter",h,t]])),r=g.type==="tableDelimiterRow"?2:h?3:1):r&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")?(i=!1,o[2]===0&&(s[1]!==0&&(o[0]=o[1],u=$s(f,t,s,r,void 0,u),s=[0,0,0,0]),o[2]=e)):g.type==="tableCellDivider"&&(i?i=!1:(s[1]!==0&&(o[0]=o[1],u=$s(f,t,s,r,void 0,u)),s=o,o=[s[1],e,0,0])):g.type==="tableHead"?(a=!0,l=e):g.type==="tableRow"||g.type==="tableDelimiterRow"?(l=e,s[1]!==0?(o[0]=o[1],u=$s(f,t,s,r,e,u)):o[1]!==0&&(u=$s(f,t,o,r,e,u)),r=0):r&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")&&(o[3]=e)}for(l!==0&&Mh(f,t,l,c,h),f.consume(t.events),e=-1;++e<t.events.length;){const d=t.events[e];d[0]==="enter"&&d[1].type==="table"&&(d[1]._align=CE(t.events,e))}return n}function $s(n,t,e,i,r,s){const o=i===1?"tableHeader":i===2?"tableDelimiter":"tableData",a="tableContent";e[0]!==0&&(s.end=Object.assign({},pr(t.events,e[0])),n.add(e[0],0,[["exit",s,t]]));const l=pr(t.events,e[1]);if(s={type:o,start:Object.assign({},l),end:Object.assign({},l)},n.add(e[1],0,[["enter",s,t]]),e[2]!==0){const c=pr(t.events,e[2]),h=pr(t.events,e[3]),u={type:a,start:Object.assign({},c),end:Object.assign({},h)};if(n.add(e[2],0,[["enter",u,t]]),i!==2){const f=t.events[e[2]],d=t.events[e[3]];if(f[1].end=Object.assign({},d[1].end),f[1].type="chunkText",f[1].contentType="text",e[3]>e[2]+1){const g=e[2]+1,_=e[3]-e[2]-1;n.add(g,_,[])}}n.add(e[3]+1,0,[["exit",u,t]])}return r!==void 0&&(s.end=Object.assign({},pr(t.events,r)),n.add(r,0,[["exit",s,t]]),s=void 0),s}function Mh(n,t,e,i,r){const s=[],o=pr(t.events,e);r&&(r.end=Object.assign({},o),s.push(["exit",r,t])),i.end=Object.assign({},o),s.push(["exit",i,t]),n.add(e+1,0,s)}function pr(n,t){const e=n[t],i=e[0]==="enter"?"start":"end";return e[1][i]}const DE={name:"tasklistCheck",tokenize:IE};function UE(){return{text:{91:DE}}}function IE(n,t,e){const i=this;return r;function r(l){return i.previous!==null||!i._gfmTasklistFirstContentOfListItem?e(l):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),s)}function s(l){return fe(l)?(n.enter("taskListCheckValueUnchecked"),n.consume(l),n.exit("taskListCheckValueUnchecked"),o):l===88||l===120?(n.enter("taskListCheckValueChecked"),n.consume(l),n.exit("taskListCheckValueChecked"),o):e(l)}function o(l){return l===93?(n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),a):e(l)}function a(l){return Lt(l)?t(l):qt(l)?n.check({tokenize:OE},t,e)(l):e(l)}}function OE(n,t,e){return Kt(n,i,"whitespace");function i(r){return r===null?e(r):t(r)}}function FE(n){return Od([aE(),_E(),TE(),RE(),UE()])}function NE({text:n,links:t,onOpen:e}){return an(()=>kE(n,t,e),[n,t,e])}function kE(n,t,e){const i=uM(BE(n),{extensions:[FE()],mdastExtensions:[rE()]}),r=rc(t,e),s=i.children.filter(o=>o.type==="footnoteDefinition");return v("div",{class:"md",children:[xo(i.children,r),s.length>0&&v("section",{class:"md-footnotes",children:[v("hr",{}),v("ol",{children:s.map(o=>v("li",{id:`fn-${o.identifier}`,children:xo(o.children,r)},o.identifier))})]})]})}function rc(n,t){const e=new Map(Object.entries(n).map(([i,r])=>[i.toLowerCase(),r]));return{resolve:i=>n[i]??e.get(i.toLowerCase()),onOpen:t}}const zE=/(!?)\[\[([^[\]\n]+?)\]\]/g;function Ll(n,t){const e=[];let i=0;for(const r of n.matchAll(zE)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),e.push(of(r[2],r[1]==="!",t,s)),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function BE(n){return n.split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/m).map((t,e)=>e%2?t:t.replace(/%%[\s\S]*?%%/g,"")).join("")}const HE=/^\[!([A-Za-z-]+)\]([+-]?)[ \t]*(.*)$/,VE={note:"note",info:"info",todo:"info",abstract:"abstract",summary:"abstract",tldr:"abstract",tip:"tip",hint:"tip",important:"tip",success:"success",check:"success",done:"success",question:"question",help:"question",faq:"question",warning:"warning",caution:"warning",attention:"warning",failure:"danger",fail:"danger",missing:"danger",danger:"danger",error:"danger",bug:"danger",example:"example",quote:"quote",cite:"quote"};function xo(n,t){return n.map((e,i)=>sf(e,t,i))}function sf(n,t,e){switch(n.type){case"paragraph":return v("p",{children:Rn(n.children,t)},e);case"heading":return GE(n,t,e);case"thematicBreak":return v("hr",{},e);case"blockquote":return qE(n.children,t,e)??v("blockquote",{children:xo(n.children,t)},e);case"list":return WE(n,t,e);case"code":return v("pre",{class:"md-code","data-lang":n.lang??void 0,children:v("code",{children:n.value})},e);case"table":return XE(n,t,e);case"html":return af(n.value)?null:v("pre",{class:"md-raw",children:n.value},e);case"definition":case"footnoteDefinition":case"yaml":return null;default:return null}}function GE(n,t,e){const i=`h${n.depth}`;return v(i,{children:Rn(n.children,t)},e)}function WE(n,t,e){const i=n.children.map((r,s)=>v("li",{class:r.checked!=null?`task${r.checked?" done":""}`:void 0,children:[r.checked!=null&&v("input",{type:"checkbox",checked:r.checked,disabled:!0}),r.children.map((o,a)=>o.type==="paragraph"&&!n.spread?v("span",{children:Rn(o.children,t)},a):sf(o,t,a))]},s));return n.ordered?v("ol",{start:n.start??void 0,children:i},e):v("ul",{children:i},e)}function XE(n,t,e){const[i,...r]=n.children,s=o=>n.align?.[o]?{textAlign:n.align[o]}:void 0;return v("div",{class:"md-table",children:v("table",{children:[i&&v("thead",{children:v("tr",{children:i.children.map((o,a)=>v("th",{style:s(a),children:Rn(o.children,t)},a))})}),v("tbody",{children:r.map((o,a)=>v("tr",{children:o.children.map((l,c)=>v("td",{style:s(c),children:Rn(l.children,t)},c))},a))})]})},e)}function qE(n,t,e){const i=n[0];if(i?.type!=="paragraph"||i.children[0]?.type!=="text")return null;const r=i.children[0].value,s=r.indexOf(`
`),o=HE.exec(s<0?r:r.slice(0,s));if(!o)return null;const a=o[1].toLowerCase(),l=VE[a]??"note",c=o[3]||a.charAt(0).toUpperCase()+a.slice(1),h={...i,children:s<0?i.children.slice(1):[{type:"text",value:r.slice(s+1)},...i.children.slice(1)]},u=[...h.children.length?[h]:[],...n.slice(1)],f=u.length>0&&v("div",{class:"md-callout-body",children:xo(u,t)}),d=v("div",{class:"md-callout-title",children:c});return o[2]?v("details",{class:`md-callout ${l}`,open:o[2]==="+",children:[v("summary",{children:d}),f]},e):v("div",{class:`md-callout ${l}`,children:[d,f]},e)}function Rn(n,t){return n.map((e,i)=>YE(e,t,i))}function YE(n,t,e){switch(n.type){case"text":return v("span",{children:ZE(n.value,t)},e);case"emphasis":return v("em",{children:Rn(n.children,t)},e);case"strong":return v("strong",{children:Rn(n.children,t)},e);case"delete":return v("del",{children:Rn(n.children,t)},e);case"inlineCode":return v("code",{children:n.value},e);case"break":return v("br",{},e);case"link":return QE(n.url)?v("a",{class:"md-external",href:n.url,target:"_blank",rel:"noopener noreferrer",children:Rn(n.children,t)},e):v("span",{children:Rn(n.children,t)},e);case"image":return v("span",{class:"md-image",children:n.alt||"image"},e);case"footnoteReference":return v("sup",{class:"md-fnref",children:["[",n.label??n.identifier,"]"]},e);case"html":return af(n.value)?null:v("span",{class:"md-raw",children:n.value},e);case"linkReference":case"imageReference":return v("span",{children:"children"in n?Rn(n.children,t):n.alt},e);default:return null}}const $E=/(!?)\[\[([^[\]\n]+?)\]\]|==([^=\n]+?)==|(^|[\s(])#([\p{L}_][\p{L}\p{N}_/-]*)/gu;function ZE(n,t){const e=[];let i=0;for(const r of n.matchAll($E)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),r[2]!==void 0?e.push(of(r[2],r[1]==="!",t,s)):r[3]!==void 0?e.push(v("mark",{children:r[3]},s)):(e.push(r[4]),e.push(v("span",{class:"md-tag",children:["#",r[5]]},s))),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function of(n,t,e,i){const[r,s]=jE(n,"|"),[o,a]=KE(r,/[#^]/),l=e.resolve(o.trim()),c=s?.trim()||(l?l.title+(a?` › ${a.replace(/^[#^]/,"")}`:""):r.trim()),h=`md-internal${l?"":" unresolved"}${t?" embed":""}`;return l?v("a",{class:h,href:"#",onClick:u=>{u.preventDefault(),e.onOpen(l)},children:[t&&v("span",{class:"md-embed-mark",children:"↪ "}),c]},i):v("span",{class:h,title:"Not found, or not visible to this profile",children:c},i)}function jE(n,t){const e=n.indexOf(t);return e<0?[n,void 0]:[n.slice(0,e),n.slice(e+1)]}function KE(n,t){const e=t.exec(n);return e?[n.slice(0,e.index),n.slice(e.index)]:[n,void 0]}function QE(n){return/^(https?:|mailto:)/i.test(n.trim())}function af(n){return/^\s*<!--[\s\S]*-->\s*$/.test(n)}const Ro={conflict:"Conflicts",stale:"Stale links",superseded:"Superseded",orphan:"Orphans",lint_error:"Format problems"},$i={conflict:"#ff3b4f",stale:"#ffad38",superseded:"#bd85ff",orphan:"#9aa6c4",lint_error:"#ff6bc6"},JE={conflict:"Disagrees with another active note; read both",stale:"Rests on, or links to, a superseded or archived note it did not replace",superseded:"Replaced by a newer note",orphan:"No other note links here",lint_error:"The file has format problems"},sc={supersedes:"Replaces",cites:"Sources",conflicts:"Conflicts",depends:"Depends on",parts:"Part of"},lf={links_to:"links",superseded_by:"replaced",conflicts_with:"conflicts",depends_on:"dependencies",part_of:"part of",source:"citations"},cf={supersedes:{phrase:"supersedes",subject:"to",roles:["newer","older"]},cites:{phrase:"cites",subject:"from"},conflicts:{phrase:"conflicts with",subject:"from"},depends:{phrase:"depends on",subject:"from"},parts:{phrase:"is part of",subject:"from",roles:["part","whole"]}};function Fe({color:n,size:t=8}){return v("span",{class:"dot",style:{background:n,width:`${t}px`,height:`${t}px`,boxShadow:`0 0 10px ${n}`}})}function Zs({children:n,tone:t}){return v("span",{class:`chip${t?` chip-${t}`:""}`,children:n})}function Wi({children:n}){return v("kbd",{class:"kbd",children:n})}function Re(n){return n>=1e4?`${(n/1e3).toFixed(1)}k`:n.toLocaleString()}function Ee({name:n}){return v("svg",{class:"icon",viewBox:"0 0 24 24","aria-hidden":"true",children:v("path",{d:{search:"M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.2 4.2-1.4 1.4-4.2-4.2A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z",layers:"m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",health:"M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21Z",reset:"M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5",help:"M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-6v.01M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V13",labels:"M4 5h16M4 12h10M4 19h7",spark:"M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6 4 4m0-14-4 4m-6 6-4 4",close:"M6 6l12 12M18 6 6 18",chevron:"m9 6 6 6-6 6",back:"m15 6-6 6 6 6",forward:"m9 6 6 6-6 6",more:"M5.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M16.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",history:"M12 7v5l3 2M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4 4v4h4",copy:"M8 8h11v11H8zM5 16V5h11",open:"M14 4h6v6m0-6-9 9M10 6H5v13h13v-5",read:"M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z",folder:"M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}[n]})})}function tb(n){return(t,e)=>n==="health"?e.flagged/Math.max(1,e.notes)-t.flagged/Math.max(1,t.notes)||e.flagged-t.flagged||mr(t.title,e.title):n==="recent"?(e.updated??"").localeCompare(t.updated??"")||e.recent-t.recent||mr(t.title,e.title):n==="size"&&e.notes-t.notes||mr(t.title,e.title)}function ye(n){return n.page?n.title:n.name}function eb({c:n}){const t=n.world,e=Bt(n.store,S=>S.focus),[i,r]=Sn(""),[s,o]=Sn("name"),[a,l]=Sn({}),c=an(()=>new Map(t.topics.map(S=>[S.slug,S])),[t]),h=S=>{const C=[];for(let E=c.get(c.get(S)?.parent??"");E&&!C.includes(E.slug);E=c.get(E.parent??""))C.push(E.slug);return C},u=an(()=>{const S=new Map;for(const C of t.topics)for(const E of[C.slug,...h(C.slug)])S.set(E,(S.get(E)??0)+C.notes);return S},[t]),f=an(()=>new Set(t.topics.flatMap(S=>S.parent?[S.parent]:[])),[t]),d=new Set(e.topic?h(e.topic):[]),g=i.trim().toLowerCase(),_=new Set;for(const S of t.topics)if(!(g&&!ye(S).toLowerCase().includes(g)&&!S.slug.includes(g))&&(_.add(S.slug),g))for(const C of h(S.slug))_.add(C);const m=S=>!!g||(a[S]??d.has(S)),p=tb(s),M=nb(t.topics.filter(S=>_.has(S.slug)),(S,C)=>p({...S,title:ye(S),notes:u.get(S.slug)??S.notes},{...C,title:ye(C),notes:u.get(C.slug)??C.notes})).filter(({topic:S})=>h(S.slug).every(m)),y=Math.max(1,...t.topics.map(S=>u.get(S.slug)??0));return v("div",{class:"atlas",children:[v("div",{class:"nav-tools",children:[v("input",{class:"field",placeholder:"Filter topics",value:i,onInput:S=>r(S.target.value),"aria-label":"Filter topics"}),v("select",{class:"field select",value:s,onChange:S=>o(S.target.value),"aria-label":"Sort topics",children:[v("option",{value:"name",children:"Name"}),v("option",{value:"size",children:"Most notes"}),v("option",{value:"health",children:"Most issues"}),v("option",{value:"recent",children:"Recently changed"})]})]}),v("div",{class:"tree",role:"tree",children:[g&&M.length===0&&v("div",{class:"empty small",children:"No topic matches."}),M.map(({topic:S,depth:C})=>{const E=u.get(S.slug)??S.notes,A=m(S.slug);return v("div",{class:`tree-topic${e.topic===S.slug?" active":""}`,style:{paddingLeft:`${4+C*14}px`},role:"treeitem","aria-level":C+1,"aria-expanded":f.has(S.slug)?A:void 0,children:[f.has(S.slug)?v("button",{class:`chev${A?" open":""}`,onClick:()=>l({...a,[S.slug]:!A}),"aria-label":A?"Collapse":"Expand",title:A?"Collapse":"Expand",children:v(Ee,{name:"chevron"})}):v("span",{class:"chev-space"}),v("button",{class:"tree-topic-main",onClick:()=>n.focus({topic:S.slug}),children:[v(Fe,{color:S.color,size:7}),v("span",{class:`tree-title${S.page?"":" folder"}`,children:ye(S)}),S.flagged>0&&v("span",{class:"badge",title:`${S.flagged} ${S.flagged===1?"note":"notes"} with issues`,children:S.flagged}),v("span",{class:"tree-count",title:`${Re(E)} notes, with the topics under it`,children:[Re(E)," notes"]}),v("span",{class:"bar","aria-hidden":"true",children:v("span",{style:{width:`${Math.max(4,E/y*100)}%`,background:S.color}})})]})]},S.slug)})]})]})}function nb(n,t){const e=new Set(n.map(a=>a.slug)),i=new Map,r=[];for(const a of n)a.parent&&e.has(a.parent)?i.set(a.parent,[...i.get(a.parent)??[],a]):r.push(a);const s=[],o=(a,l)=>{s.push({topic:a,depth:l});for(const c of(i.get(a.slug)??[]).sort(t))o(c,l+1)};for(const a of r.sort(t))o(a,0);return s}function ib({c:n}){const t=Bt(n.store,l=>l.healthData),e=Bt(n.store,l=>l.healthError),i=Bt(n.store,l=>l.health),[r,s]=Sn("stale"),o=an(()=>new Map(n.world.topics.map(l=>[l.slug,l])),[n]);if(!t&&e)return v("div",{class:"empty",children:["Could not find notes with issues: ",e]});if(!t)return v("div",{class:"empty",children:"Finding notes with issues…"});const a=Kl.filter(l=>(t.counts[l]??0)>0);return v("div",{class:"health",children:[v("label",{class:"switch-row",children:[v("span",{children:"Highlight issues on the map: color each topic by its share of notes with issues, and ring each of those notes"}),v("input",{type:"checkbox",class:"switch",checked:i,onChange:l=>n.setHealth(l.target.checked)})]}),a.length===0&&v("div",{class:"empty",children:"No issues found."}),a.map(l=>v("div",{class:"flag-group",children:[v("button",{class:"flag-head",onClick:()=>s(r===l?null:l),"aria-expanded":r===l,title:JE[l],children:[v("span",{class:`chev${r===l?" open":""}`,children:v(Ee,{name:"chevron"})}),v(Fe,{color:$i[l]}),v("span",{class:"tree-title",children:Ro[l]}),v("span",{class:"flag-count",children:Re(t.counts[l]??0)})]}),r===l&&v("div",{class:"flag-items",children:[(t.items[l]??[]).map(c=>v("button",{class:"flag-item",onClick:()=>n.openNote(c.id,c.topic),children:[v("span",{class:"tree-title",children:c.title}),v("span",{class:"tree-meta",children:c.topic?o.get(c.topic)?.title??c.topic:""})]},c.id)),(t.counts[l]??0)>(t.items[l]?.length??0)&&v("div",{class:"more",children:["and ",Re((t.counts[l]??0)-(t.items[l]?.length??0))," more"]})]})]},l))]})}const rb={consolidate:"Merged captures",edit:"Agent edit","lint-fix":"Auto-fix",mv:"Moved",undo:"Undo",import:"Import",review:"Review",rule:"Rule"};function sb({c:n}){const t=Bt(n.store,r=>r.run),e=n.world.runs,i=an(()=>new Map(n.world.topics.map(r=>[r.slug,r])),[n]);return e.length===0?v("div",{class:"empty",children:"No activity recorded on this device yet."}):v("div",{class:"changes",children:[v("div",{class:"hint",children:"Select an entry to highlight the notes it changed."}),e.map(r=>{const s=Object.entries(r.topics).sort((a,l)=>l[1]-a[1]),o=r.at?new Date(r.at):null;return v("button",{class:`run${t?.id===r.id?" active":""}`,onClick:()=>n.setRun(t?.id===r.id?null:r),children:[v("div",{class:"run-top",children:[v("span",{class:`run-kind kind-${r.kind}`,children:rb[r.kind]??r.kind}),v("span",{class:"run-when",children:o?o.toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):""})]}),v("div",{class:"run-body",children:[r.episodes>0&&v("span",{children:[r.episodes," session captures · "]}),v("span",{children:[r.touched.length," notes changed"]})]}),s.length>0&&v("div",{class:"run-topics",children:s.slice(0,4).map(([a,l])=>{const c=i.get(a);return v("span",{class:"run-topic",children:[v(Fe,{color:c?.color??"#888",size:6})," ",c?.title??a," ",v("b",{children:l})]},a)})})]},r.id)})]})}function ob({c:n}){const t=Bt(n.store,r=>r.navTab),e=Bt(n.store,r=>r.navOpen),i=n.world.totals.flagged;return v("aside",{class:`panel nav${e?"":" collapsed"}`,"aria-label":"Topics, issues, and activity",children:[v("div",{class:"tabs",role:"tablist",children:[["atlas","health","changes"].map(r=>v("button",{role:"tab","aria-selected":t===r,class:`tab${t===r?" active":""}`,onClick:()=>n.setNav(r),children:[r==="atlas"?"Topics":r==="health"?"Issues":"Activity",r==="health"&&i>0&&v("span",{class:"tab-badge",children:Re(i)}),r==="changes"&&n.world.runs.length>0&&v("span",{class:"tab-badge dim",children:n.world.runs.length})]},r)),v("button",{class:"icon-btn",onClick:()=>n.store.set({navOpen:!e}),"aria-label":e?"Collapse the panel":"Expand the panel",title:e?"Collapse":"Expand",children:v(Ee,{name:e?"back":"chevron"})})]}),e&&v("div",{class:"nav-body",children:t==="atlas"?v(eb,{c:n}):t==="health"?v(ib,{c:n}):v(sb,{c:n})})]})}const ab=/!?\[\[([^[\]\n]+?)\]\]/g;function lb(n){const t=new Map(Object.entries(n).map(([e,i])=>[e.toLowerCase(),i.id]));return e=>{const i=e.split("|")[0].split("#")[0].trim();return n[i]?.id??t.get(i.toLowerCase())}}function cb(n,t,e){for(const i of n.matchAll(ab))if(t(i[1])===e)return!0;return!1}function ub(n,t,e){const i=lb(t);return(Array.isArray(n)?n:n==null?[]:[n]).map(String).filter(s=>cb(s,i,e))}const Eh={superseded_by:"supersedes",source:"cites",conflicts_with:"conflicts",depends_on:"depends",part_of:"parts"},hb={supersedes:"bw-superseded_by",cites:"bw-sources",conflicts:"bw-conflicts_with",depends:"bw-depends_on",parts:"bw-part_of"},db={linked_from:"also links back",cited_by:"also cites it",supersedes:"is replaced by it",conflicts_with:"also names the conflict",depended_on_by:"also depends on it"},Hi=30;function uf(n,t){const[e,i]=Sn({key:n,data:null,error:null});return Si(()=>{let r=!0;return i({key:n,data:null,error:null}),t().then(s=>r&&i({key:n,data:s,error:s?null:"Not found."}),s=>r&&i({key:n,data:null,error:s instanceof Error?s.message:String(s)})),()=>{r=!1}},[n]),e.key===n?e:{data:null,error:null}}function fb({c:n,t}){return t.kind==="link"?v(pb,{c:n,t}):v(gb,{c:n,t})}function bh({c:n,e:t,role:e}){const i=n.world.topics.find(r=>r.slug===t.topic);return v("button",{class:"conn-end",onClick:()=>n.openNote(t.id,t.topic),title:`Open ${t.title}`,children:[v("span",{class:"conn-end-title",children:t.title}),v("span",{class:"conn-end-meta",children:[v(Fe,{color:i?.color??"#9cc3ff",size:6})," ",i?.title??t.topic,e?` · ${e}`:""]})]})}function pb({c:n,t}){const e=cf[t.family],[i,r]=e.subject==="to"?[t.to,t.from]:[t.from,t.to],{data:s,error:o}=uf(`note:${t.from.id}`,()=>n.source.note(t.from.id)),a=Rd(d=>n.openNote(d.id,d.topic),[n]),l=s?.links??{},c=hb[t.family],h=s&&c?ub(s.properties?.[c],l,t.to.id):[],u=(s?.backlinks??[]).filter(d=>d.id===t.to.id),f=rc(l,a);return v(we,{children:[v("div",{class:"insp-kicker",children:[v("span",{class:"swatch",style:{background:Oe[t.family]}})," Connection · ",sc[t.family]]}),v("div",{class:"conn-ends",children:[v(bh,{c:n,e:i,role:e.roles?.[0]}),v("div",{class:"link-phrase conn-phrase",style:{color:Oe[t.family]},children:e.phrase}),v(bh,{c:n,e:r,role:e.roles?.[1]})]}),v("div",{class:"section-title",children:["Where ",t.from.title," says it"]}),!s&&v("div",{class:"empty small",children:o??"Reading the note…"}),s?.partial&&v("div",{class:"hint",children:"This exported file has the map only; serve the brain with brain viz to read the note."}),c&&h.map(d=>v("div",{class:"passage passage-prop",children:[v("span",{class:"passage-key",children:c})," ",Ll(d,f)]},d)),s&&!s.partial&&h.length===0&&v("div",{class:"hint",children:"The link is not in the note's text as it reads now; the map may be older than the file."}),s&&v("button",{class:"open-link",onClick:()=>n.openNote(t.from.id,t.from.topic),children:[v(Ee,{name:"read"})," Read the whole note ",v("span",{class:"row-meta",children:t.from.title})]}),u.length>0&&v(we,{children:[v("div",{class:"section-title",children:"Both ways"}),u.map(d=>v("div",{class:"hint",children:[t.to.title," ",db[d.relation]??d.relation.replace(/_/g," "),"."]},d.relation))]})]})}function mb(n,t){const e=s=>{const o=new Set([s]);if(t.level==="topic")return o;for(let a=!0;a;){a=!1;for(const l of n.world.topics)l.parent&&o.has(l.parent)&&!o.has(l.slug)&&(o.add(l.slug),a=!0)}return o},[i,r]=[e(t.a),e(t.b)];return n.world.flows.filter(s=>i.has(s.a)&&r.has(s.b)||r.has(s.a)&&i.has(s.b)).sort((s,o)=>o.total-s.total)}function gb({c:n,t}){const e=a=>{const l=n.world.topics.find(c=>c.slug===a);return l?ye(l):a},i=a=>n.world.topics.find(l=>l.slug===a)?.color??"#9cc3ff",r=Object.entries(t.rels).sort((a,l)=>l[1]-a[1]).map(([a,l])=>`${Re(l)} ${lf[a]??a.replace(/_/g," ")}`),s=mb(n,t),o=s.length===1&&[s[0].a,s[0].b].sort().join()===[t.a,t.b].sort().join();return v(we,{children:[v("div",{class:"insp-kicker",children:"Connection · links between topics"}),v("div",{class:"conn-ends",children:[t.a,t.b].map((a,l)=>v(we,{children:[l===1&&v("div",{class:"link-phrase conn-phrase",children:"and"}),v("button",{class:"conn-end",onClick:()=>n.focus({topic:a}),title:`Go to ${e(a)}`,children:[v("span",{class:"conn-end-title",children:e(a)}),v("span",{class:"conn-end-meta",children:[v(Fe,{color:i(a),size:6})," topic"]})]})]},a))}),v("div",{class:"hint",children:[Re(t.total)," ",t.total===1?"link":"links",r.length?`: ${r.join(" · ")}`:""]}),t.level==="topic"||o?v(_b,{c:n,t}):v(vb,{c:n,pairs:s})]})}function _b({c:n,t}){const{data:e,error:i}=uf(`topic:${t.a}`,()=>n.source.topic(t.a));if(!e)return v("div",{class:"empty small",children:i??"Loading the links…"});const r=new Map(e.nodes.map(o=>[o.id,o.title])),s=e.external.filter(o=>o.topic===t.b&&Eh[o.rel]).map(o=>{const a={id:o.dir==="out"?o.source:o.target,title:"",topic:t.a};a.title=r.get(a.id)??a.id;const l={id:o.dir==="out"?o.target:o.source,title:o.title,topic:t.b},[c,h]=o.dir==="out"?[a,l]:[l,a];return{family:Eh[o.rel],from:c,to:h}});return v(we,{children:[v("div",{class:"section-title",children:["Links ",v("span",{class:"section-count",children:s.length})]}),v("div",{class:"rows",children:[s.slice(0,Hi).map(o=>v("button",{class:"row",onClick:()=>n.showConnection({kind:"link",...o}),children:[v("span",{class:"swatch",style:{background:Oe[o.family]}}),v("span",{class:"row-title",children:[o.from.title," → ",o.to.title]})]},`${o.family}${o.from.id}>${o.to.id}`)),s.length>Hi&&v("div",{class:"more",children:["and ",s.length-Hi," more"]}),s.length<t.total&&s.length<=Hi&&v("div",{class:"more",children:["The map lists the first ",Re(s.length)," of ",Re(t.total),"."]})]})]})}function vb({c:n,pairs:t}){const e=i=>{const r=n.world.topics.find(s=>s.slug===i);return r?ye(r):i};return v(we,{children:[v("div",{class:"section-title",children:["Topic pairs ",v("span",{class:"section-count",children:t.length})]}),v("div",{class:"rows",children:[t.slice(0,Hi).map(i=>v("button",{class:"row",onClick:()=>n.showConnection({kind:"flow",level:"topic",a:i.a,b:i.b,total:i.total,rels:i.rels}),children:[v("span",{class:"row-title",children:[e(i.a)," ↔ ",e(i.b)]}),v("span",{class:"row-meta",children:i.total===1?"1 link":`${Re(i.total)} links`})]},`${i.a}|${i.b}`)),t.length>Hi&&v("div",{class:"more",children:["and ",t.length-Hi," more"]})]})]})}const oc={superseded_by:"Replaced by",conflicts_with:"Conflicts with",depends_on:"Depends on",part_of:"Part of",links_to:"Links to",cites:"Cites"},hf={supersedes:"replaced by this",conflicts_with:"conflicts with this",depended_on_by:"depends on this",linked_from:"links here",cited_by:"cites this"},df={superseded_by:"supersedes",conflicts_with:"conflicts",depends_on:"depends",part_of:"parts",links_to:null,cites:"cites"},ff={supersedes:"supersedes",conflicts_with:"conflicts",depended_on_by:"depends",linked_from:null,cited_by:"cites"},xb={superseded_by:"superseded_by",conflicts_with:"conflicts_with",depends_on:"depends_on",part_of:"part_of",links_to:"links_to",source:"cites"},yb={superseded_by:"supersedes",conflicts_with:"conflicts_with",depends_on:"depended_on_by",links_to:"linked_from",source:"cited_by"},yo=n=>n?Oe[n]:Qx,Sb=(n,t)=>n.title.localeCompare(t.title,void 0,{numeric:!0,sensitivity:"base"});function Mb(n){return n.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(t,e,i)=>i??e).replace(/(\*\*|__)(.+?)\1/g,"$2").replace(/`([^`]+)`/g,"$1")}function Eb(n){const t=new Map;if(!n)return t;for(const e of n.nodes)t.set(e.id,n.slug);for(const e of n.external)t.set(e.dir==="out"?e.target:e.source,e.topic);return t}function bb(n,t){const e={out:[],in:[],parts:[],partsTotal:0};if(!t)return e;const i=new Map(t.nodes.map(o=>[o.id,o.title])),r=new Set,s=(o,a,l,c,h)=>{const u=`${o}|${a}|${l}`;if(!(r.has(u)||l===n))if(r.add(u),o==="out"){const f=xb[a];e.out.push({relation:f,color:yo(df[f]),label:oc[f],id:l,title:c,topic:h})}else if(a==="part_of")e.parts.push({relation:"has_part",color:Oe.parts,label:"Parts",id:l,title:c,topic:h});else{const f=yb[a];e.in.push({relation:f,color:yo(ff[f]),label:hf[f],id:l,title:c,topic:h})}};for(const o of t.links)o.source===n?s("out",o.rel,o.target,i.get(o.target)??o.target,t.slug):o.target===n&&s("in",o.rel,o.source,i.get(o.source)??o.source,t.slug);for(const o of t.external)o.source===n?s("out",o.rel,o.target,o.title,o.topic):o.target===n&&s("in",o.rel,o.source,o.title,o.topic);return e.parts.sort(Sb),e.partsTotal=e.parts.length,e}function Tb(n,t){const e=(i,r)=>i?(r?n.links?.[r]?.topic:void 0)??t.get(i)??null:null;return{out:(n.outlinks??[]).map(i=>({relation:i.relation,color:yo(df[i.relation]),label:oc[i.relation]??i.relation,id:i.resolved?i.id:null,title:i.title??i.target,topic:e(i.resolved?i.id:null,i.target)})),in:(n.backlinks??[]).map(i=>({relation:i.relation,color:yo(ff[i.relation]),label:hf[i.relation]??i.relation.replace(/_/g," "),id:i.id,title:i.title,topic:e(i.id)})),parts:(n.parts??[]).map(i=>({relation:"has_part",color:Oe.parts,label:"Parts",id:i.id,title:i.title,topic:e(i.id)})),partsTotal:n.parts_total??n.parts?.length??0}}function js({label:n,value:t,tone:e}){return v("div",{class:`stat${e?` stat-${e}`:""}`,children:[v("div",{class:"stat-v",children:typeof t=="number"?Re(t):t}),v("div",{class:"stat-l",children:n})]})}function wb({n,c:t,topic:e}){return v("button",{class:"row",onClick:()=>t.openNote(n.id,e),children:[v("span",{class:"row-title",children:n.title}),n.flags.length>0&&v(Fe,{color:$i[n.flags[0]],size:6}),v("span",{class:"row-meta",children:n.degree===1?"1 link":`${Re(n.degree)} links`})]})}function Ab(n){return n===1?"1 note":`${Re(n)} notes`}function Cb({c:n,slug:t}){const e=Bt(n.store,u=>u.topicData),i=Bt(n.store,u=>u.topicError),r=n.world.topics.find(u=>u.slug===t),s=an(()=>n.world.flows.filter(u=>u.a===t||u.b===t).sort((u,f)=>f.total-u.total).slice(0,6),[n,t]);if(!r)return null;const o=new Map(n.world.topics.map(u=>[u.slug,u])),a=e?.slug===t?e:null,l=a?[...a.nodes].filter(u=>u.id!==a.page).sort((u,f)=>f.degree-u.degree).slice(0,8):[],c=a?.nodes.find(u=>u.id===a.page),h=n.world.topics.filter(u=>u.parent===t).sort((u,f)=>f.tree_chars-u.tree_chars);return v(we,{children:[v("div",{class:"insp-kicker",children:[v(Fe,{color:r.color})," ",r.page?"Topic":"Topic without a topic page"]}),v("h2",{class:"insp-title",children:ye(r)}),r.description&&v("p",{class:"insp-desc",children:r.description}),v("div",{class:"stats",children:[v(js,{label:"notes",value:r.notes}),v(js,{label:"changed 7d",value:r.recent}),v(js,{label:"with issues",value:r.flagged,tone:r.flagged?"warn":void 0}),v(js,{label:"last change",value:r.updated?r.updated.slice(5):"—"})]}),r.flagged>0&&v("div",{class:"flag-chips",children:Kl.filter(u=>r.flags[u]).map(u=>v("span",{class:"flag-chip",style:{borderColor:$i[u]},children:[v(Fe,{color:$i[u],size:6})," ",Ro[u]," ",v("b",{children:r.flags[u]})]},u))}),c&&v("button",{class:"open-link",onClick:()=>n.openNote(c.id,t),children:[v(Ee,{name:"spark"})," Open the topic page ",v("span",{class:"row-meta",children:c.title})]}),h.length>0&&v(we,{children:[v("div",{class:"section-title",children:["Sub-topics ",v("span",{class:"section-count",children:h.length})]}),v("div",{class:"rows",children:[h.slice(0,14).map(u=>v("button",{class:"row",onClick:()=>n.focus({topic:u.slug}),children:[v(Fe,{color:u.color,size:7}),v("span",{class:"row-title",children:ye(u)}),v("span",{class:"row-meta",children:Ab(u.notes)})]},u.slug)),h.length>14&&v("div",{class:"more",children:["and ",h.length-14," more in the Topics tab"]})]})]}),!a&&v("div",{class:"empty small",children:i??"Loading…"}),a&&a.nodes.length>5&&v(we,{children:[v("div",{class:"section-title",children:"Most connected"}),v("div",{class:"rows",children:l.map(u=>v(wb,{n:u,c:n,topic:t},u.id))})]}),s.length>0&&v(we,{children:[v("div",{class:"section-title",children:"Linked topics"}),v("div",{class:"rows",children:s.map(u=>{const f=o.get(u.a===t?u.b:u.a);return f?v("button",{class:"row",onClick:()=>n.focus({topic:f.slug}),children:[v(Fe,{color:f.color,size:7}),v("span",{class:"row-title",children:ye(f)}),v("span",{class:"row-meta",children:u.total===1?"1 link":`${Re(u.total)} links`})]},f.slug):null})})]})]})}function Rb({c:n,id:t,slug:e}){const i=Bt(n.store,y=>y.note),r=Bt(n.store,y=>y.noteError),s=Bt(n.store,y=>y.topicData),[o,a]=Sn(!1),l=n.world.topics.find(y=>y.slug===e),c=s?.nodes.find(y=>y.id===t),h=an(()=>{const y=s?.slug===e?s:null;return i&&!i.partial?Tb(i,Eb(y)):bb(t,y)},[t,i,s,e]),u=i?.title??c?.title??"…",f=i?.status??c?.status,d=new Map;for(const y of h.out)d.set(y.relation,[...d.get(y.relation)??[],y]);const g=Object.keys(oc),_=[...d].sort(([y],[S])=>g.indexOf(y)-g.indexOf(S)),m=(y,S)=>v("button",{class:"row",disabled:!y.id||!y.topic,title:y.id?y.topic?void 0:"Not in a topic on this map, such as an inbox episode":"No note by this name",onClick:()=>y.id&&n.openNote(y.id,y.topic),children:[v("span",{class:"row-title",children:y.title}),S&&v("span",{class:"row-meta",children:S}),!S&&y.topic&&y.topic!==e&&v("span",{class:"row-meta",children:n.world.topics.find(C=>C.slug===y.topic)?.title??y.topic}),!y.id&&v("span",{class:"row-meta",children:"not found"}),y.id&&!y.topic&&v("span",{class:"row-meta",children:"not on the map"})]},`${y.relation}${y.id??y.title}`),p=i?.path??c?.path,M=an(()=>{const y=[];for(let S=n.world.topics.find(C=>C.slug===l?.parent);S&&y.length<20;S=n.world.topics.find(C=>C.slug===S.parent))y.unshift(ye(S));return y},[n,l]);return v(we,{children:[v("div",{class:"insp-kicker",children:[v(Fe,{color:l?.color??"#888"})," ",v("button",{class:"link",onClick:()=>n.focus({topic:e}),children:l?ye(l):e})]}),v("h2",{class:"insp-title",children:u}),M.length>0&&v("div",{class:"insp-place",title:"Where this note lives",children:["In ",[...M,l?ye(l):e].join(" › ")]}),v("div",{class:"chips",children:[(i?.kind??c?.kind)&&v(Zs,{children:i?.kind??c?.kind}),(i?.type??c?.type)&&v(Zs,{children:i?.type??c?.type}),f&&v(Zs,{tone:f==="active"?"ok":"warn",children:f}),(i?.updated??c?.updated)&&v(Zs,{tone:"dim",children:["updated ",(i?.updated??c?.updated??"").slice(0,10)]})]}),c&&c.flags.length>0&&v("div",{class:"flag-chips",children:c.flags.map(y=>v("span",{class:"flag-chip",style:{borderColor:$i[y]},children:[v(Fe,{color:$i[y],size:6})," ",Ro[y]]},y))}),(i?.banners??[]).map(y=>v("div",{class:`banner${y.startsWith("⚠")?"":" banner-info"}`,children:y},y)),i?.summary&&v("p",{class:"insp-desc",children:Mb(i.summary)}),!i&&v("div",{class:"empty small",children:r??"Reading the note…"}),i?.partial&&v("div",{class:"hint",children:"This exported file has the map only; serve the brain with brain viz to read the note."}),_.length>0&&v("div",{class:"section-title",children:["Links ",v("span",{class:"section-count",children:h.out.length})]}),_.map(([y,S])=>v("div",{class:"rel-group",children:[v("div",{class:"rel-label",style:{color:S[0].color},children:S[0].label}),S.slice(0,12).map(C=>m(C)),S.length>12&&v("div",{class:"more",children:["and ",S.length-12," more"]})]},y)),h.parts.length>0&&v(we,{children:[v("div",{class:"section-title",style:{color:Oe.parts},children:["Parts ",v("span",{class:"section-count",children:h.partsTotal})]}),v("div",{class:"rows",children:[h.parts.slice(0,20).map(y=>m(y)),h.partsTotal>20&&v("div",{class:"more",children:["and ",h.partsTotal-20," more"]})]})]}),h.in.length>0&&v(we,{children:[v("div",{class:"section-title",children:["Linked from ",v("span",{class:"section-count",children:h.in.length})]}),v("div",{class:"rows",children:[h.in.slice(0,12).map(y=>m(y,y.label)),h.in.length>12&&v("div",{class:"more",children:["and ",h.in.length-12," more"]})]})]}),p&&v("div",{class:"path-row",children:[v("code",{class:"path",children:p}),v("button",{class:"icon-btn",title:"Read the note (P)",onClick:()=>n.store.set({previewOpen:!0}),children:v(Ee,{name:"read"})}),v("button",{class:"icon-btn",title:"Copy path",onClick:()=>{navigator.clipboard?.writeText(i?.abs_path??p),a(!0),window.setTimeout(()=>a(!1),1200)},children:v(Ee,{name:"copy"})}),i?.abs_path&&v("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(i.abs_path)}`,children:v(Ee,{name:"open"})}),o&&v("span",{class:"copied",children:"copied"})]})]})}function Pb({c:n}){const t=Bt(n.store,r=>r.focus),e=Bt(n.store,r=>r.connection),i=e?v(fb,{c:n,t:e}):t.note&&t.topic?v(Rb,{c:n,id:t.note,slug:t.topic}):t.topic?v(Cb,{c:n,slug:t.topic}):null;return v("aside",{class:`panel insp open${i?"":" idle"}`,"aria-label":"Details",children:[v("div",{class:"insp-head",children:[v("span",{children:"Details"}),e?v("button",{class:"icon-btn",onClick:()=>n.closeConnection(),title:"Close the connection (Esc)","aria-label":"Close the connection",children:v(Ee,{name:"close"})}):i&&v("button",{class:"icon-btn",onClick:()=>n.up(),title:"Up one level (Esc)","aria-label":"Up one level",children:v(Ee,{name:"close"})})]}),v("div",{class:"insp-body",children:i??v("div",{class:"empty small",children:"Click a topic, a star, or a link to see its details here."})})]})}const Qe=184;function Lb(n){const t=[[77,107,168],[255,158,41],[255,26,46]],[e,i,r]=n<.5?[t[0],t[1],n*2]:[t[1],t[2],(n-.5)*2];return`rgb(${e.map((s,o)=>Math.round(s+(i[o]-s)*r)).join(",")})`}function Db({c:n}){const t=ss(null),e=Bt(n.store,o=>o.focus),i=Bt(n.store,o=>o.health),r=an(()=>Fh(n.world.topics),[n]);Si(()=>{const o=t.current;if(!o)return;const a=Math.min(2,window.devicePixelRatio||1);o.width=Qe*a,o.height=Qe*a;const l=o.getContext("2d"),c=()=>{const u=n.galaxy;if(!u)return;const f=u.layout,d=(Qe/2-10)/f.radius,g=(W,X)=>[Qe/2+W*d,Qe/2+X*d];l.setTransform(a,0,0,a,0,0),l.clearRect(0,0,Qe,Qe);const _=new Map;for(const W of n.world.topics)_.set(W.slug,W.parent?_.get(W.parent)??W.slug:W.slug);const m=e.topic?_.get(e.topic):void 0;n.world.topics.forEach((W,X)=>{if(W.parent)return;const $=f.topics.get(W.slug),[Q,Z]=g($.x,$.z),lt=Math.max(2,$.r*d),P=i?Lb(r[X]):W.color,_t=l.createRadialGradient(Q,Z,0,Q,Z,lt);_t.addColorStop(0,P),_t.addColorStop(1,"rgba(0,0,0,0)"),l.globalAlpha=m&&m!==W.slug?.25:.5,l.fillStyle=_t,l.beginPath(),l.arc(Q,Z,lt,0,Math.PI*2),l.fill(),l.globalAlpha=.95,l.fillStyle=P,l.beginPath(),l.arc(Q,Z,Math.max(1,Math.min(2.6,$.ring*d)),0,Math.PI*2),l.fill()});const p=e.topic?f.topics.get(e.topic):void 0;if(p){const[W,X]=g(p.x,p.z);l.globalAlpha=1,l.strokeStyle="#fff",l.lineWidth=1.2,l.beginPath(),l.arc(W,X,Math.max(4,p.r*d),0,Math.PI*2),l.stroke()}l.globalAlpha=1;const M=f.inbox,[y,S]=g(M.x,M.z);l.fillStyle="#ffd88a",l.beginPath(),l.arc(y,S,2.5,0,Math.PI*2),l.fill();const C=u.view(),[E,A]=g(C.pos.x,C.pos.z),[U,T]=g(C.target.x,C.target.z),x=Math.atan2(T-A,U-E),R=Math.min(70,Math.max(16,Math.hypot(U-E,T-A))),O=.42,N=l.createLinearGradient(E,A,E+Math.cos(x)*R,A+Math.sin(x)*R);N.addColorStop(0,"rgba(140,180,255,0.42)"),N.addColorStop(1,"rgba(140,180,255,0)"),l.fillStyle=N,l.beginPath(),l.moveTo(E,A),l.lineTo(E+Math.cos(x-O)*R,A+Math.sin(x-O)*R),l.lineTo(E+Math.cos(x+O)*R,A+Math.sin(x+O)*R),l.closePath(),l.fill(),l.fillStyle="#cfe0ff",l.beginPath(),l.arc(Math.max(4,Math.min(Qe-4,E)),Math.max(4,Math.min(Qe-4,A)),2.6,0,Math.PI*2),l.fill()};c();const h=window.setInterval(c,200);return()=>window.clearInterval(h)},[e,i]);const s=o=>{const a=n.galaxy,l=t.current;if(!a||!l)return;const c=l.getBoundingClientRect(),h=(Qe/2-10)/a.layout.radius,u=(o.clientX-c.left-Qe/2)/h,f=(o.clientY-c.top-Qe/2)/h;let d=null,g=1/0;for(const _ of n.world.topics){if(_.parent)continue;const m=a.layout.topics.get(_.slug),p=Math.hypot(m.x-u,m.z-f)/m.r;p<g&&(g=p,d=_.slug)}d&&n.focus({topic:d})};return v("div",{class:"panel minimap","aria-label":"Minimap",children:[v("canvas",{ref:t,style:{width:`${Qe}px`,height:`${Qe}px`},onClick:s}),v("div",{class:"minimap-label",children:"MAP"})]})}function Ub({c:n}){const[t,e]=Sn(""),[i,r]=Sn([]),[s,o]=Sn(!1),[a,l]=Sn(0),c=ss(null),h=an(()=>new Map(n.world.topics.map(_=>[_.slug,_])),[n]);Si(()=>c.current?.focus(),[]),Si(()=>{const _=t.trim();if(!_){r([]);return}o(!0);const m=window.setTimeout(()=>{n.search(_).then(p=>r(p)).catch(()=>r([])).finally(()=>o(!1))},140);return()=>window.clearTimeout(m)},[t]);const u=()=>n.store.set({paletteOpen:!1}),f=t.trim().toLowerCase(),d=[];if(f){for(const _ of n.world.topics){if(ye(_).toLowerCase().includes(f)||_.slug.includes(f)){const m=h.get(_.parent??""),p=[m?`in ${ye(m)}`:null,`${_.notes} notes`].filter(Boolean).join(" · ");d.push({key:`t:${_.slug}`,kind:"topic",title:ye(_),sub:p,color:_.color,run:()=>n.focus({topic:_.slug})})}if(d.length>8)break}for(const _ of i){const m=_.topic?h.get(_.topic):void 0;d.push({key:`n:${_.id}`,kind:"note",title:_.title,sub:[m?ye(m):null,_.snippet].filter(Boolean).join(" · "),color:m?.color??"#8892b0",run:()=>n.openNote(_.id,_.topic)})}}else for(const _ of[...n.world.topics].sort((m,p)=>p.notes-m.notes).slice(0,8))d.push({key:`t:${_.slug}`,kind:"topic",title:ye(_),sub:`${_.notes} notes`,color:_.color,run:()=>n.focus({topic:_.slug})});const g=_=>{const m=d[_];m&&(u(),m.run())};return v("div",{class:"palette-scrim",onClick:_=>_.target===_.currentTarget&&u(),children:v("div",{class:"palette panel",role:"dialog","aria-label":"Search notes and topics",children:[v("div",{class:"palette-input",children:[v(Ee,{name:"search"}),v("input",{ref:c,value:t,placeholder:"Search notes and topics…","aria-label":"Search",onInput:_=>{e(_.target.value),l(0)},onKeyDown:_=>{_.key==="ArrowDown"?(_.preventDefault(),l(Math.min(d.length-1,a+1))):_.key==="ArrowUp"?(_.preventDefault(),l(Math.max(0,a-1))):_.key==="Enter"?(_.preventDefault(),g(a)):_.key==="Escape"&&(_.preventDefault(),_.stopPropagation(),u())}}),s&&v("span",{class:"spinner"}),v(Wi,{children:"Esc"})]}),v("div",{class:"palette-results",role:"listbox",children:[!f&&v("div",{class:"palette-section",children:"Largest topics"}),d.map((_,m)=>v("button",{role:"option","aria-selected":m===a,class:`palette-item${m===a?" sel":""}`,onMouseEnter:()=>l(m),onClick:()=>g(m),children:[v(Fe,{color:_.color,size:8}),v("span",{class:`palette-kind kind-${_.kind}`,children:_.kind}),v("span",{class:"palette-title",children:_.title}),v("span",{class:"palette-sub",children:_.sub})]},_.key)),f&&!s&&d.length===0&&v("div",{class:"empty",children:["Nothing matches “",t,"”."]})]})]})})}function Ib({c:n}){const t=Bt(n.store,l=>l.previewOpen),e=Bt(n.store,l=>l.focus),i=Bt(n.store,l=>l.note),r=Bt(n.store,l=>l.noteError),s=Rd(l=>n.openNote(l.id,l.topic),[n]);if(!t||!e.note)return null;const o=i&&i.id===e.note?i:null,a=n.world.topics.find(l=>l.slug===(o?.topic??e.topic));return v("aside",{class:"panel preview",role:"dialog","aria-label":"Note preview",children:[v("header",{class:"preview-head",children:[v("div",{class:"insp-kicker",children:[v(Fe,{color:a?.color??"#9cc3ff",size:7})," ",a?.title??"Note"]}),v("div",{class:"preview-actions",children:[o?.abs_path&&v("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(o.abs_path)}`,children:v(Ee,{name:"open"})}),v("button",{class:"icon-btn",title:"Close (Esc)","aria-label":"Close preview",onClick:()=>n.store.set({previewOpen:!1}),children:v(Ee,{name:"close"})})]})]}),v("div",{class:"preview-body",children:o?v(we,{children:[!/^\s*#\s+\S/.test(o.markdown??"")&&v("h1",{class:"md-inline-title",children:o.title}),o.properties&&v(Fb,{props:o.properties,links:o.links??{},onOpen:s}),o.markdown!=null?v(NE,{text:o.markdown,links:o.links??{},onOpen:s}):v("div",{class:"empty",children:["Exported maps do not include note text. Run ",v("code",{children:"brain viz"})," to read notes."]})]}):v("div",{class:"empty",children:r??"Loading…"})})]})}const Ob=new Set(["title"]);function Fb({props:n,links:t,onOpen:e}){const i=an(()=>rc(t,e),[t,e]),r=Object.entries(n).filter(([s,o])=>!Ob.has(s)&&o!==null&&o!=="");return r.length?v("details",{class:"md-props",open:!0,children:[v("summary",{children:"Properties"}),v("dl",{children:r.map(([s,o])=>v("div",{class:"md-prop",children:[v("dt",{children:s}),v("dd",{children:Nb(s,o,i)})]},s))})]}):null}function Nb(n,t,e){if(Array.isArray(t))return t.map((r,s)=>v("span",{class:n==="tags"?"md-tag":"md-chip",children:n==="tags"?`#${String(r)}`:Ll(String(r),e)},s));if(typeof t=="boolean")return v("input",{type:"checkbox",checked:t,disabled:!0});const i=typeof t=="object"?JSON.stringify(t):String(t);return/^https?:\/\//i.test(i)?v("a",{class:"md-external",href:i,target:"_blank",rel:"noopener noreferrer",children:i.replace(/^https?:\/\//,"")}):Ll(i,e)}const co=n=>!n.altKey&&!n.metaKey&&!n.ctrlKey,Vr=n=>t=>co(t)&&t.key.toLowerCase()===n;function kb(n){return[{section:"Move",keys:[[n.mod,"↑"],[n.mod,"↓"]],join:"pair",does:"Up or down one level: note, topic, parent topics, overview",match:t=>(t.metaKey||t.ctrlKey)&&!t.altKey&&(t.key==="ArrowUp"||t.key==="ArrowDown"),run:(t,e)=>e.key==="ArrowUp"?t.levelUp():void t.levelDown()},{section:"Move",keys:[["["],["]"]],join:"pair",does:"Previous or next place at the same level",match:t=>co(t)&&(t.key==="["||t.key==="]"),run:(t,e)=>void t.sibling(e.key==="]"?1:-1)},{section:"Move",keys:[["O"]],does:"Overview",match:Vr("o"),run:t=>t.focus({})},{section:"Move",keys:[["R"]],does:"Turn the view back: tilted, heading north",match:Vr("r"),run:t=>t.resetTurn()},{section:"Move",keys:[[n.history,"←"],[n.history,"→"]],join:"pair",does:"Back or forward through what you opened"},{section:"Move",keys:[["Esc"]],does:"Close what is open; otherwise up one level",match:t=>t.key==="Escape",run:t=>t.up(),whileTyping:!0},{section:"Show",keys:[["P"]],does:"Preview of the selected note",match:Vr("p"),run:t=>t.store.state.focus.note&&t.store.set({previewOpen:!t.store.state.previewOpen})},{section:"Show",keys:[["I"]],does:"Highlight issues",match:Vr("i"),run:t=>t.setHealth(!t.store.state.health)},{section:"Show",keys:[["L"]],does:"Labels",match:Vr("l"),run:t=>t.setLabels(!t.store.state.labels)},{section:"Show",keys:[["1"],[String(Gi.length)]],join:"range",does:"Show or hide a kind of line, in the order of the bar below",match:t=>co(t)&&/^[1-9]$/.test(t.key)&&Number(t.key)<=Gi.length,run:(t,e)=>{const i=Gi[Number(e.key)-1];t.setLayer(i,!t.store.state.layers[i])}},{section:"Find",keys:[["/"],[n.mod,"K"]],join:"or",does:"Search notes and topics",match:t=>t.key==="/"&&co(t)||t.key.toLowerCase()==="k"&&(t.metaKey||t.ctrlKey)&&!t.altKey,run:t=>t.store.set({paletteOpen:!0}),whileTyping:t=>t.metaKey||t.ctrlKey},{section:"Find",keys:[["?"]],does:"These shortcuts",match:t=>t.key==="?"&&!t.metaKey&&!t.ctrlKey,run:t=>t.store.set({helpOpen:!0})}]}function zb(n,t,e){return n.find(i=>i.match?.(t)?e?typeof i.whileTyping=="function"?i.whileTyping(t):!!i.whileTyping:!0:!1)}const Xr=Gx(),pf=kb(Xr),Bb={supersedes:"Replaces: pulses run from the old note to the one that replaced it",cites:"Sources: a note to the notes it cites as its sources",conflicts:"Conflicts: two notes that disagree; a search for either returns both",depends:"Depends on: pulses run from a note to the note it rests on",parts:"Part of: a note to the whole it belongs to, such as a project, a series, or a team"};function Hb(){return v("svg",{class:"logo",viewBox:"0 0 32 32","aria-hidden":"true",children:[v("defs",{children:v("radialGradient",{id:"lg",cx:"50%",cy:"50%",r:"50%",children:[v("stop",{offset:"0","stop-color":"#fff"}),v("stop",{offset:"0.35","stop-color":"#9cc3ff"}),v("stop",{offset:"1","stop-color":"#7a5cff","stop-opacity":"0"})]})}),v("circle",{cx:"16",cy:"16",r:"15",fill:"url(#lg)"}),v("ellipse",{cx:"16",cy:"16",rx:"14",ry:"5",fill:"none",stroke:"#9cc3ff","stroke-opacity":"0.6",transform:"rotate(-24 16 16)"})]})}function Vb({c:n}){const t=Bt(n.store,a=>a.focus),e=Bt(n.store,a=>a.note),i=Bt(n.store,a=>a.topicData),r=n.world.topics.find(a=>a.slug===t.topic),s=e?.title??i?.nodes.find(a=>a.id===t.note)?.title,o=[];if(o.push({label:"Overview",go:()=>n.focus({}),current:!t.topic}),r){const a=[];for(let l=n.world.topics.find(c=>c.slug===r.parent);l;l=n.world.topics.find(c=>c.slug===l.parent))a.unshift(l);for(const l of a)o.push({label:ye(l),color:l.color,go:()=>n.focus({topic:l.slug}),current:!1});o.push({label:ye(r),color:r.color,go:()=>n.focus({topic:r.slug}),current:!t.note})}return t.note&&o.push({label:s??"…",go:()=>{},current:!0}),v("nav",{class:"crumbs","aria-label":"Breadcrumb",children:o.map((a,l)=>v("span",{class:"crumb-wrap",children:[l>0&&v("span",{class:"crumb-sep",children:v(Ee,{name:"chevron"})}),v("button",{class:`crumb${a.current?" current":""}`,onClick:a.go,"aria-current":a.current?"page":void 0,children:[a.color&&v(Fe,{color:a.color,size:7}),v("span",{children:a.label})]})]},l))})}function Gb({c:n}){const t=Bt(n.store,c=>c.focus),e=Bt(n.store,c=>c.zoom),i=Bt(n.store,c=>c.note),r=n.world.topics.find(c=>c.slug===t.topic),s=t.note?2:t.topic?1:0,o=n.world.topics.filter(c=>!c.parent).length,a=[{level:0,name:"Overview",place:`${o} ${o===1?"topic":"topics"}`,go:()=>n.focus({})},{level:1,name:"Topic",place:r?ye(r):"",go:()=>r&&n.focus({topic:r.slug})},{level:2,name:"Note",place:t.note?i?.title??"":"",go:()=>{}}],l=Math.max(0,Math.min(1,e/2));return v("div",{class:"panel level-hud","aria-label":"Map level",children:[v("div",{class:"minimap-label",children:"ZOOM"}),v("div",{class:"level-track",children:[v("div",{class:"level-rail"}),v("div",{class:"level-marker",style:{top:`${l*100}%`}})]}),v("ol",{class:"level-rungs",children:a.map(c=>v("li",{class:`level-rung${c.level===s?" current":""}${c.level<s?" above":""}`,children:v("button",{disabled:c.level>=s,onClick:c.go,title:c.level<s?`Back to the ${c.name.toLowerCase()} level`:void 0,children:[v("span",{class:"level-name",children:c.name}),c.place&&c.level<=s&&v("span",{class:"level-place",children:c.place})]})},c.level))}),v("div",{class:"level-hint",children:s===0?"Scroll to zoom in":s===1?"Click a star to open a note":"Scroll out or press Esc to go back"})]})}function Pa(n,t){const e=t.focus,i=n.world.topics.find(r=>r.slug===e.topic);return e.note?{title:t.title??n.galaxy?.noteTitle(e.note)??"Note",kind:"note",color:i?.color,sub:i?.title}:i?{title:ye(i),kind:"topic",color:i.color}:{title:"Overview",kind:"overview"}}function Wb({c:n}){const t=Bt(n.store,o=>o.trail),e=Bt(n.store,o=>o.historyOpen),i=ss(null);Si(()=>{if(!e)return;const o=a=>{i.current?.contains(a.target)||n.store.set({historyOpen:!1})};return document.addEventListener("pointerdown",o),()=>document.removeEventListener("pointerdown",o)},[e]);const r=t.entries[t.index-1],s=t.entries[t.index+1];return v("div",{class:"nav-buttons",ref:i,children:[v("button",{class:"icon-btn",disabled:!r,onClick:()=>n.back(),"aria-label":"Back",title:r?`Back to ${Pa(n,r).title} (${Xr.join(Xr.history,"←")})`:"Back",children:v(Ee,{name:"back"})}),v("button",{class:"icon-btn",disabled:!s,onClick:()=>n.forward(),"aria-label":"Forward",title:s?`Forward to ${Pa(n,s).title} (${Xr.join(Xr.history,"→")})`:"Forward",children:v(Ee,{name:"forward"})}),v("button",{class:`icon-btn${e?" on":""}`,disabled:t.entries.length<2,onClick:()=>n.store.set({historyOpen:!e}),"aria-label":"History","aria-expanded":e,title:"Everything opened in this tab",children:v(Ee,{name:"history"})}),e&&v("div",{class:"panel history-pop",role:"menu","aria-label":"History",children:[v("div",{class:"section-title",children:"Opened in this tab"}),t.entries.map((o,a)=>({v:o,i:a})).reverse().map(({v:o,i:a})=>{const l=Pa(n,o);return v("button",{role:"menuitem",class:`row history-row${a===t.index?" current":""}`,onClick:()=>n.jump(a),children:[l.color?v(Fe,{color:l.color,size:7}):v("span",{class:"dot-space"}),v("span",{class:"row-title",children:l.title}),v("span",{class:"row-meta",children:l.sub??l.kind})]},`${a}${o.hash}`)})]})]})}function Xb({c:n}){const t=n.world,e=Bt(n.store,i=>i.embedded);return v("header",{class:"topbar",children:[v("div",{class:"panel brand",children:[v(Hb,{}),v("div",{class:"brand-text",children:[v("div",{class:"brand-name",children:t.brain}),v("div",{class:"brand-sub",children:["brain-wiki · ",t.profile==="owner"?"owner view":`as ${t.profile}`,e?" · exported":""]})]})]}),v("div",{class:"panel crumbs-panel",children:[v(Wb,{c:n}),v(Vb,{c:n})]}),v("button",{class:"panel search-btn",onClick:()=>n.store.set({paletteOpen:!0}),"aria-label":"Search",children:[v(Ee,{name:"search"}),v("span",{children:"Search notes and topics"}),v(Wi,{children:"/"})]}),v("div",{class:"panel totals","aria-label":"Totals",children:[v("div",{children:[v("b",{children:Re(t.totals.topics)}),v("span",{children:"topics"})]}),v("div",{children:[v("b",{children:Re(t.totals.notes)}),v("span",{children:"notes"})]}),v("div",{children:[v("b",{children:Re(t.totals.links)}),v("span",{children:"links"})]}),v("button",{class:`total${t.totals.flagged?" warn":""}`,onClick:()=>n.setNav("health"),title:"Notes with issues: open the Issues tab",children:[v("b",{children:Re(t.totals.flagged)}),v("span",{children:"with issues"})]}),v("button",{class:"total gold",onClick:()=>n.select({kind:"inbox"}),title:"Session captures waiting for consolidation: ask your agent to consolidate",children:[v("b",{children:Re(t.episodes.count)}),v("span",{children:"inbox"})]})]})]})}function qb({c:n}){const t=Bt(n.store,i=>i.layers),e=Bt(n.store,i=>i.health);return v("div",{class:"dock-wrap",children:v("div",{class:"panel dock",role:"toolbar","aria-label":"Layers",children:[v("div",{class:"dock-group",children:Gi.map(i=>v("button",{class:`layer fam${t[i]?" on":" off"}`,"aria-pressed":t[i],onClick:()=>n.setLayer(i,!t[i]),title:`${Bb[i]} (${t[i]?"shown":"hidden"}; press ${Gi.indexOf(i)+1} to toggle)`,children:[v("span",{class:"swatch",style:t[i]?{background:Oe[i],boxShadow:`0 0 10px ${Oe[i]}`}:{borderColor:Oe[i]}}),v("span",{children:sc[i]})]},i))}),v("div",{class:"dock-sep"}),v("div",{class:"dock-group",children:[v("button",{class:`layer${e?" on health":""}`,"aria-pressed":e,onClick:()=>n.setHealth(!e),title:"Color the map by notes with issues (I)",children:[v(Ee,{name:"health"})," ",v("span",{children:"Highlight issues"})]}),v(Yb,{c:n}),v("button",{class:"layer",onClick:()=>n.store.set({helpOpen:!0}),title:"Shortcuts (?)","aria-label":"Shortcuts",children:v(Ee,{name:"help"})})]})]})})}function Yb({c:n}){const t=Bt(n.store,a=>a.labels),e=Bt(n.store,a=>a.quality),i=Bt(n.store,a=>a.qualityMode),[r,s]=Sn(!1),o=ss(null);return Si(()=>{if(!r)return;const a=c=>{o.current?.contains(c.target)||s(!1)},l=c=>{c.key==="Escape"&&(c.stopPropagation(),s(!1))};return document.addEventListener("pointerdown",a),document.addEventListener("keydown",l,!0),()=>{document.removeEventListener("pointerdown",a),document.removeEventListener("keydown",l,!0)}},[r]),v("div",{class:"more",ref:o,children:[v("button",{class:`layer${r?" on":""}`,onClick:()=>s(!r),"aria-label":"More settings","aria-expanded":r,title:"More settings",children:v(Ee,{name:"more"})}),r&&v("div",{class:"panel more-pop",role:"menu",children:[v("label",{class:"more-row",children:[v("input",{type:"checkbox",checked:t,onChange:()=>n.setLabels(!t)}),v("span",{children:"Labels"}),v(Wi,{children:"L"})]}),v("div",{class:"more-row graphics",children:[v("span",{children:"Graphics"}),v("div",{class:"seg",role:"radiogroup","aria-label":"Graphics",children:["auto","high","low"].map(a=>v("button",{role:"radio","aria-checked":i===a,class:i===a?"on":"",onClick:()=>n.setQualityMode(a),children:a==="auto"?"Auto":a==="high"?"High":"Low"},a))})]}),v("p",{class:"more-note",children:["Now ",e==="high"?"High: glow, vignette and grain":"Low: no glow, for slower GPUs",".",i==="auto"?" Auto measures your GPU after loading.":""]})]})]})}function $b({c:n,target:t,left:e,top:i}){const r=cf[t.family],[s,o]=r.subject==="to"?[t.to,t.from]:[t.from,t.to],a=(l,c)=>{const h=n.world.topics.find(u=>u.slug===l.topic);return v("div",{class:"link-end",children:[v("div",{class:"hover-title",children:l.title}),v("div",{class:"hover-line",children:[v(Fe,{color:h?.color??"#9cc3ff",size:6})," ",h?.title??l.topic,c?` · ${c}`:""]})]})};return v("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[v("div",{class:"insp-kicker",children:[v("span",{class:"swatch",style:{background:Oe[t.family]}})," ",sc[t.family]]}),a(s,r.roles?.[0]),v("div",{class:"link-phrase",style:{color:Oe[t.family]},children:r.phrase}),a(o,r.roles?.[1]),v("div",{class:"hover-line link-hint",children:"Click to see where the link is written"})]})}function Zb({c:n,target:t,left:e,top:i}){const r=c=>{const h=n.world.topics.find(u=>u.slug===c);return h?ye(h):c},s=n.store.state.focus,[o,a]=s.topic===t.b?[t.b,t.a]:[t.a,t.b],l=Object.entries(t.rels).sort((c,h)=>h[1]-c[1]).map(([c,h])=>`${h} ${lf[c]??c.replace(/_/g," ")}`);return v("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[v("div",{class:"insp-kicker",children:"Links between topics"}),v("div",{class:"hover-title",children:[r(o)," ↔ ",r(a)]}),v("div",{class:"hover-line",children:[t.total," ",t.total===1?"link":"links",l.length?`: ${l.join(" · ")}`:""]}),v("div",{class:"hover-line link-hint",children:"Click to see these links"})]})}function jb({c:n}){const t=Bt(n.store,d=>d.hover),e=Bt(n.store,d=>d.topicData);if(!t)return null;const{target:i,x:r,y:s}=t;if(i.kind==="link"||i.kind==="flow"){const d=Math.min(window.innerWidth-310,r+18),g=Math.min(window.innerHeight-200,s+18);return i.kind==="link"?v($b,{c:n,target:i,left:d,top:g}):v(Zb,{c:n,target:i,left:d,top:g})}let o="",a="",l="#9cc3ff",c=[],h=[];if(i.kind==="topic"){const d=n.world.topics.find(_=>_.slug===i.slug);if(!d)return null;const g=n.world.topics.filter(_=>_.parent===d.slug).length;o=d.page?"Topic":"Topic without a topic page",a=ye(d),l=d.color,c=[`${d.notes} ${d.notes===1?"note":"notes"}${g?` · ${g} ${g===1?"sub-topic":"sub-topics"}`:""}${d.recent?` · ${d.recent} changed this week`:""}`,d.flagged?`${d.flagged} with issues`:"No issues"]}else if(i.kind==="note"){const d=n.world.topics.find(m=>m.slug===i.topic),_=(e?.slug===i.topic?e.nodes:void 0)?.find(m=>m.id===i.id);o=d?.title??"Note",l=d?.color??l,a=_?.title??"Note",_&&(c=[[_.kind==="topic"?"topic page":_.type,_.status!=="active"?_.status:null,`${_.degree} links`].filter(Boolean).join(" · ")],h=_.flags)}else o="Inbox",a=`${n.world.episodes.count} session captures`,l="#ffd88a",c=["Waiting to be merged into your notes automatically"];const u=Math.min(window.innerWidth-300,r+18),f=Math.min(window.innerHeight-140,s+18);return v("div",{class:"hovercard panel",style:{left:`${u}px`,top:`${f}px`},children:[v("div",{class:"insp-kicker",children:[v(Fe,{color:l,size:7})," ",o]}),v("div",{class:"hover-title",children:a}),c.map(d=>v("div",{class:"hover-line",children:d},d)),h.length>0&&v("div",{class:"hover-flags",children:h.map(d=>v("span",{style:{color:$i[d]},children:["● ",Ro[d]]},d))})]})}function Kb({b:n}){const[t,e]=n.keys;if(n.join==="pair"&&e&&t.length===e.length&&t.slice(0,-1).every((s,o)=>s===e[o]))return v("span",{class:"keys",children:[v("span",{class:"chord",children:t.map(s=>v(Wi,{children:s},s))}),v("span",{class:"keys-sep",children:"/"}),v(Wi,{children:e[e.length-1]})]});const r=n.join==="range"?"–":n.join==="or"?"or":"";return v("span",{class:"keys",children:n.keys.map((s,o)=>v(we,{children:[o>0&&r&&v("span",{class:"keys-sep",children:r}),v("span",{class:"chord",children:s.map(a=>v(Wi,{children:a},a))})]},o))})}const Qb=[{title:"Move",column:0},{title:"Show",column:1},{title:"Find",column:1}],Jb=[["Click","zoom to a topic; open a note"],["Scroll","zoom toward the pointer"],["Drag","pan"],["Shift+drag","turn the view"],["Hover a line","see the two notes it joins; click to go to the other end"]];function tT({c:n}){const t=[0,1].map(e=>Qb.filter(i=>i.column===e));return v("div",{class:"palette-scrim",onClick:e=>e.target===e.currentTarget&&n.store.set({helpOpen:!1}),children:v("div",{class:"panel help",role:"dialog","aria-label":"Shortcuts",children:[v("div",{class:"help-head",children:[v("h3",{children:"Shortcuts"}),v("button",{class:"icon-btn",onClick:()=>n.store.set({helpOpen:!1}),"aria-label":"Close",title:"Close (Esc)",children:v(Ee,{name:"close"})})]}),v("div",{class:"help-cols",children:t.map((e,i)=>v("div",{class:"help-col",children:e.map(r=>v(we,{children:[v("h4",{children:r.title}),pf.filter(s=>s.section===r.title).map(s=>v("div",{class:"help-row",children:[v(Kb,{b:s}),v("span",{children:s.does})]},s.does))]},r.title))},i))}),v("section",{class:"help-section help-wide",children:[v("h4",{children:"Mouse"}),v("p",{class:"help-list",children:Jb.map(([e,i],r)=>v(we,{children:[r>0&&v("span",{class:"help-dot",children:" · "}),v("b",{children:e})," ",i]},e))})]}),v("section",{class:"help-section help-wide",children:[v("h4",{children:"Reading the map"}),v("p",{class:"help-list",children:"A topic is a folder: its topic page at the center, its notes as slices around it, clockwise by file name, wider and longer for longer notes · each level of sub-folders sits on its own plane below, joined by a line to the topic above · brightness: how recently a note changed · a ring on a star: it has issues · pulses flow dependent → what it rests on (blue) and old → new (amber)"})]})]})})}function eT({c:n}){const t=ss(null),e=Bt(n.store,l=>l.paletteOpen),i=Bt(n.store,l=>l.helpOpen),r=Bt(n.store,l=>l.toast),s=Bt(n.store,l=>l.run),o=Bt(n.store,l=>l.health),a=Bt(n.store,l=>l.sceneError);return Si(()=>{t.current&&!n.galaxy&&n.mount(t.current);const l=c=>{const h=c.target,u=h.tagName==="INPUT"||h.tagName==="SELECT"||h.tagName==="TEXTAREA",f=zb(pf,c,u);f?.run&&(c.preventDefault(),u&&c.key==="Escape"&&h.blur(),f.run(n,c))};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[]),v("div",{class:"app",children:[v("div",{class:"stage",ref:t}),a&&v("div",{class:"panel scene-error",role:"alert",children:[v("h2",{children:"The 3D map could not start"}),v("p",{class:"scene-error-detail",children:a}),v("p",{children:["It needs WebGL2 with hardware acceleration. Turn on hardware acceleration in your browser settings, then check ",v("code",{children:"chrome://gpu"})," (or ",v("code",{children:"about:support"})," in Firefox) for WebGL2 marked hardware accelerated. Remote desktop sessions often have no GPU."]}),v("p",{children:"The topic list, search, and details panel still work."})]}),v(Xb,{c:n}),v(ob,{c:n}),v(Pb,{c:n}),v(Ib,{c:n}),!a&&v(Db,{c:n}),!a&&v(Gb,{c:n}),v(qb,{c:n}),v(jb,{c:n}),s&&v("div",{class:"panel run-banner",children:[v("span",{class:"run-kind",children:s.kind})," ",s.at?new Date(s.at).toLocaleString():""," · ",s.touched.length," notes lit",v("button",{class:"link",onClick:()=>n.setRun(null),children:"Clear"})]}),o&&v("div",{class:"panel health-legend",role:"note","aria-label":"Issue highlight legend",children:[v("span",{children:"Fewest issues"}),v("span",{class:"health-ramp"}),v("span",{children:"Most issues"}),v("span",{class:"dock-sep"}),v("span",{class:"ring"})," ",v("span",{children:"note with issues"}),v("span",{class:"dock-sep"}),v(Wi,{children:"I"})," ",v("span",{children:"exit"})]}),e&&v(Ub,{c:n}),i&&v(tT,{c:n}),r&&v("div",{class:"panel toast",role:"status",children:r})]})}async function nT(){const n=document.getElementById("app"),t=document.createElement("div");t.className="boot",t.textContent="Charting your brain…",n.appendChild(t);try{const e=Lf(),i=await e.world();t.remove(),Af(v(eT,{c:new ly(e,i)}),n)}catch(e){t.className="boot boot-error",t.textContent=iT(e)}}function iT(n){const t=n instanceof Error?n.message:String(n);return n instanceof TypeError?"Could not reach brain viz. Is `brain viz` still running?":/HTTP 40[13]\b/.test(t)?"This link's token is not valid. Open the link `brain viz` printed.":`Could not load the brain: ${t}`}nT();
