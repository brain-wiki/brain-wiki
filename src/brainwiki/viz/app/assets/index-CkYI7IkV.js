var bo,he,Ah,ki,mc,Ch,Rh,Ph,Ol,Oa,Fa,Jr={},Lh=[],gf=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,To=Array.isArray;function Kn(n,t){for(var e in t)n[e]=t[e];return n}function Fl(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function _f(n,t,e){var i,r,s,o={};for(s in t)s=="key"?i=t[s]:s=="ref"?r=t[s]:o[s]=t[s];if(arguments.length>2&&(o.children=arguments.length>3?bo.call(arguments,2):e),typeof n=="function"&&n.defaultProps!=null)for(s in n.defaultProps)o[s]===void 0&&(o[s]=n.defaultProps[s]);return to(n,o,i,r,null)}function to(n,t,e,i,r){var s={type:n,props:t,key:e,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++Ah,__i:-1,__u:0};return r==null&&he.vnode!=null&&he.vnode(s),s}function Ne(n){return n.children}function eo(n,t){this.props=n,this.context=t}function Er(n,t){if(t==null)return n.__?Er(n.__,n.__i+1):null;for(var e;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null)return e.__e;return typeof n.type=="function"?Er(n):null}function Dh(n){var t,e;if((n=n.__)!=null&&n.__c!=null){for(n.__e=n.__c.base=null,t=0;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null){n.__e=n.__c.base=e.__e;break}return Dh(n)}}function gc(n){(!n.__d&&(n.__d=!0)&&ki.push(n)&&!mo.__r++||mc!=he.debounceRendering)&&((mc=he.debounceRendering)||Ch)(mo)}function mo(){for(var n,t,e,i,r,s,o,a=1;ki.length;)ki.length>a&&ki.sort(Rh),n=ki.shift(),a=ki.length,n.__d&&(e=void 0,r=(i=(t=n).__v).__e,s=[],o=[],t.__P&&((e=Kn({},i)).__v=i.__v+1,he.vnode&&he.vnode(e),Nl(t.__P,e,i,t.__n,t.__P.namespaceURI,32&i.__u?[r]:null,s,r??Er(i),!!(32&i.__u),o),e.__v=i.__v,e.__.__k[e.__i]=e,Oh(s,e,o),e.__e!=r&&Dh(e)));mo.__r=0}function Uh(n,t,e,i,r,s,o,a,l,c,h){var u,f,d,g,_,m,p=i&&i.__k||Lh,y=t.length;for(l=vf(e,t,p,l,y),u=0;u<y;u++)(d=e.__k[u])!=null&&(f=d.__i==-1?Jr:p[d.__i]||Jr,d.__i=u,m=Nl(n,d,f,r,s,o,a,l,c,h),g=d.__e,d.ref&&f.ref!=d.ref&&(f.ref&&kl(f.ref,null,d),h.push(d.ref,d.__c||g,d)),_==null&&g!=null&&(_=g),4&d.__u||f.__k===d.__k?l=Ih(d,l,n):typeof d.type=="function"&&m!==void 0?l=m:g&&(l=g.nextSibling),d.__u&=-7);return e.__e=_,l}function vf(n,t,e,i,r){var s,o,a,l,c,h=e.length,u=h,f=0;for(n.__k=new Array(r),s=0;s<r;s++)(o=t[s])!=null&&typeof o!="boolean"&&typeof o!="function"?(l=s+f,(o=n.__k[s]=typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?to(null,o,null,null,null):To(o)?to(Ne,{children:o},null,null,null):o.constructor==null&&o.__b>0?to(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,a=null,(c=o.__i=xf(o,e,l,u))!=-1&&(u--,(a=e[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(r>h?f--:r<h&&f++),typeof o.type!="function"&&(o.__u|=4)):c!=l&&(c==l-1?f--:c==l+1?f++:(c>l?f--:f++,o.__u|=4))):n.__k[s]=null;if(u)for(s=0;s<h;s++)(a=e[s])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=Er(a)),Nh(a,a));return i}function Ih(n,t,e){var i,r;if(typeof n.type=="function"){for(i=n.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=n,t=Ih(i[r],t,e));return t}n.__e!=t&&(t&&n.type&&!e.contains(t)&&(t=Er(n)),e.insertBefore(n.__e,t||null),t=n.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function xf(n,t,e,i){var r,s,o=n.key,a=n.type,l=t[e];if(l===null&&n.key==null||l&&o==l.key&&a==l.type&&(2&l.__u)==0)return e;if(i>(l!=null&&(2&l.__u)==0?1:0))for(r=e-1,s=e+1;r>=0||s<t.length;){if(r>=0){if((l=t[r])&&(2&l.__u)==0&&o==l.key&&a==l.type)return r;r--}if(s<t.length){if((l=t[s])&&(2&l.__u)==0&&o==l.key&&a==l.type)return s;s++}}return-1}function _c(n,t,e){t[0]=="-"?n.setProperty(t,e??""):n[t]=e==null?"":typeof e!="number"||gf.test(t)?e:e+"px"}function ps(n,t,e,i,r){var s,o;t:if(t=="style")if(typeof e=="string")n.style.cssText=e;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(t in i)e&&t in e||_c(n.style,t,"");if(e)for(t in e)i&&e[t]==i[t]||_c(n.style,t,e[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(Ph,"$1")),o=t.toLowerCase(),t=o in n||t=="onFocusOut"||t=="onFocusIn"?o.slice(2):t.slice(2),n.l||(n.l={}),n.l[t+s]=e,e?i?e.u=i.u:(e.u=Ol,n.addEventListener(t,s?Fa:Oa,s)):n.removeEventListener(t,s?Fa:Oa,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in n)try{n[t]=e??"";break t}catch{}typeof e=="function"||(e==null||e===!1&&t[4]!="-"?n.removeAttribute(t):n.setAttribute(t,t=="popover"&&e==1?"":e))}}function vc(n){return function(t){if(this.l){var e=this.l[t.type+n];if(t.t==null)t.t=Ol++;else if(t.t<e.u)return;return e(he.event?he.event(t):t)}}}function Nl(n,t,e,i,r,s,o,a,l,c){var h,u,f,d,g,_,m,p,y,M,E,P,S,w,U,T,x,C=t.type;if(t.constructor!=null)return null;128&e.__u&&(l=!!(32&e.__u),s=[a=t.__e=e.__e]),(h=he.__b)&&h(t);t:if(typeof C=="function")try{if(p=t.props,y="prototype"in C&&C.prototype.render,M=(h=C.contextType)&&i[h.__c],E=h?M?M.props.value:h.__:i,e.__c?m=(u=t.__c=e.__c).__=u.__E:(y?t.__c=u=new C(p,E):(t.__c=u=new eo(p,E),u.constructor=C,u.render=Sf),M&&M.sub(u),u.props=p,u.state||(u.state={}),u.context=E,u.__n=i,f=u.__d=!0,u.__h=[],u._sb=[]),y&&u.__s==null&&(u.__s=u.state),y&&C.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=Kn({},u.__s)),Kn(u.__s,C.getDerivedStateFromProps(p,u.__s))),d=u.props,g=u.state,u.__v=t,f)y&&C.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),y&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(y&&C.getDerivedStateFromProps==null&&p!==d&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(p,E),!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(p,u.__s,E)===!1||t.__v==e.__v){for(t.__v!=e.__v&&(u.props=p,u.state=u.__s,u.__d=!1),t.__e=e.__e,t.__k=e.__k,t.__k.some(function(O){O&&(O.__=t)}),P=0;P<u._sb.length;P++)u.__h.push(u._sb[P]);u._sb=[],u.__h.length&&o.push(u);break t}u.componentWillUpdate!=null&&u.componentWillUpdate(p,u.__s,E),y&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(d,g,_)})}if(u.context=E,u.props=p,u.__P=n,u.__e=!1,S=he.__r,w=0,y){for(u.state=u.__s,u.__d=!1,S&&S(t),h=u.render(u.props,u.state,u.context),U=0;U<u._sb.length;U++)u.__h.push(u._sb[U]);u._sb=[]}else do u.__d=!1,S&&S(t),h=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++w<25);u.state=u.__s,u.getChildContext!=null&&(i=Kn(Kn({},i),u.getChildContext())),y&&!f&&u.getSnapshotBeforeUpdate!=null&&(_=u.getSnapshotBeforeUpdate(d,g)),T=h,h!=null&&h.type===Ne&&h.key==null&&(T=Fh(h.props.children)),a=Uh(n,To(T)?T:[T],t,e,i,r,s,o,a,l,c),u.base=t.__e,t.__u&=-161,u.__h.length&&o.push(u),m&&(u.__E=u.__=null)}catch(O){if(t.__v=null,l||s!=null)if(O.then){for(t.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;s[s.indexOf(a)]=null,t.__e=a}else for(x=s.length;x--;)Fl(s[x]);else t.__e=e.__e,t.__k=e.__k;he.__e(O,t,e)}else s==null&&t.__v==e.__v?(t.__k=e.__k,t.__e=e.__e):a=t.__e=yf(e.__e,t,e,i,r,s,o,l,c);return(h=he.diffed)&&h(t),128&t.__u?void 0:a}function Oh(n,t,e){for(var i=0;i<e.length;i++)kl(e[i],e[++i],e[++i]);he.__c&&he.__c(t,n),n.some(function(r){try{n=r.__h,r.__h=[],n.some(function(s){s.call(r)})}catch(s){he.__e(s,r.__v)}})}function Fh(n){return typeof n!="object"||n==null||n.__b&&n.__b>0?n:To(n)?n.map(Fh):Kn({},n)}function yf(n,t,e,i,r,s,o,a,l){var c,h,u,f,d,g,_,m=e.props,p=t.props,y=t.type;if(y=="svg"?r="http://www.w3.org/2000/svg":y=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(c=0;c<s.length;c++)if((d=s[c])&&"setAttribute"in d==!!y&&(y?d.localName==y:d.nodeType==3)){n=d,s[c]=null;break}}if(n==null){if(y==null)return document.createTextNode(p);n=document.createElementNS(r,y,p.is&&p),a&&(he.__m&&he.__m(t,s),a=!1),s=null}if(y==null)m===p||a&&n.data==p||(n.data=p);else{if(s=s&&bo.call(n.childNodes),m=e.props||Jr,!a&&s!=null)for(m={},c=0;c<n.attributes.length;c++)m[(d=n.attributes[c]).name]=d.value;for(c in m)if(d=m[c],c!="children"){if(c=="dangerouslySetInnerHTML")u=d;else if(!(c in p)){if(c=="value"&&"defaultValue"in p||c=="checked"&&"defaultChecked"in p)continue;ps(n,c,null,d,r)}}for(c in p)d=p[c],c=="children"?f=d:c=="dangerouslySetInnerHTML"?h=d:c=="value"?g=d:c=="checked"?_=d:a&&typeof d!="function"||m[c]===d||ps(n,c,d,m[c],r);if(h)a||u&&(h.__html==u.__html||h.__html==n.innerHTML)||(n.innerHTML=h.__html),t.__k=[];else if(u&&(n.innerHTML=""),Uh(t.type=="template"?n.content:n,To(f)?f:[f],t,e,i,y=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,o,s?s[0]:e.__k&&Er(e,0),a,l),s!=null)for(c=s.length;c--;)Fl(s[c]);a||(c="value",y=="progress"&&g==null?n.removeAttribute("value"):g!=null&&(g!==n[c]||y=="progress"&&!g||y=="option"&&g!=m[c])&&ps(n,c,g,m[c],r),c="checked",_!=null&&_!=n[c]&&ps(n,c,_,m[c],r))}return n}function kl(n,t,e){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&t==null||(n.__u=n(t))}else n.current=t}catch(r){he.__e(r,e)}}function Nh(n,t,e){var i,r;if(he.unmount&&he.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||kl(i,null,t)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(s){he.__e(s,t)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&Nh(i[r],t,e||typeof n.type!="function");e||Fl(n.__e),n.__c=n.__=n.__e=void 0}function Sf(n,t,e){return this.constructor(n,e)}function Mf(n,t,e){var i,r,s,o;t==document&&(t=document.documentElement),he.__&&he.__(n,t),r=(i=!1)?null:t.__k,s=[],o=[],Nl(t,n=t.__k=_f(Ne,null,[n]),r||Jr,Jr,t.namespaceURI,r?null:t.firstChild?bo.call(t.childNodes):null,s,r?r.__e:t.firstChild,i,o),Oh(s,n,o)}bo=Lh.slice,he={__e:function(n,t,e,i){for(var r,s,o;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(n)),o=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(n,i||{}),o=r.__d),o)return r.__E=r}catch(a){n=a}throw n}},Ah=0,eo.prototype.setState=function(n,t){var e;e=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Kn({},this.state),typeof n=="function"&&(n=n(Kn({},e),this.props)),n&&Kn(e,n),n!=null&&this.__v&&(t&&this._sb.push(t),gc(this))},eo.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),gc(this))},eo.prototype.render=Ne,ki=[],Ch=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Rh=function(n,t){return n.__v.__b-t.__v.__b},mo.__r=0,Ph=/(PointerCapture)$|Capture$/i,Ol=0,Oa=vc(!1),Fa=vc(!0);var Ef=0;function v(n,t,e,i,r,s){t||(t={});var o,a,l=t;if("ref"in l)for(a in l={},t)a=="ref"?o=t[a]:l[a]=t[a];var c={type:n,props:l,key:e,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ef,__i:-1,__u:0,__source:r,__self:s};if(typeof n=="function"&&(o=n.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return he.vnode&&he.vnode(c),c}class bf{constructor(t){this.token=t}embedded=!1;topics=new Map;async get(t){const e=t.includes("?")?"&":"?",i=this.token?`${t}${e}t=${encodeURIComponent(this.token)}`:t,r=await fetch(i,{credentials:"same-origin"});if(r.status===404)return null;if(!r.ok)throw new Error(`${t}: HTTP ${r.status}`);return await r.json()}async world(){const t=await this.get("/api/world");if(!t)throw new Error("no world");return t}topic(t){let e=this.topics.get(t);return e||(e=this.get(`/api/topic/${encodeURIComponent(t)}`),this.topics.set(t,e),e.catch(()=>this.topics.delete(t))),e}note(t){return this.get(`/api/note/${encodeURIComponent(t)}`)}async search(t){return t.trim()?(await this.get(`/api/search?q=${encodeURIComponent(t)}`))?.results??[]:[]}async health(){return await this.get("/api/health")??{counts:{},items:{}}}}class Tf{constructor(t){this.data=t}embedded=!0;async world(){return this.data.world}async topic(t){return this.data.topics[t]??null}async note(t){for(const e of Object.values(this.data.topics)){const i=e.nodes.find(r=>r.id===t);if(i)return{id:i.id,title:i.title,path:i.path,kind:i.kind,type:i.type,status:i.status,topic:i.topic,updated:i.updated,partial:!0}}return null}async search(t){const e=t.trim().toLowerCase();if(!e)return[];const i=[];for(const r of Object.values(this.data.topics))for(const s of r.nodes)if([s.title,...s.aliases].map(a=>a.toLowerCase()).some(a=>a.includes(e))&&(i.push({id:s.id,title:s.title,topic:s.topic,kind:s.kind}),i.length>=20))return i;return i}async health(){return this.data.health}}function wf(){const n=document.getElementById("brain-data");if(n?.textContent)return new Tf(JSON.parse(n.textContent));const t=new URL(window.location.href);let e=t.searchParams.get("t");return e?(sessionStorage.setItem("brain-viz-token",e),t.searchParams.delete("t"),history.replaceState(history.state,"",t.pathname+t.search+t.hash)):e=sessionStorage.getItem("brain-viz-token"),new bf(e)}const xc=100;class Af{entries;index;constructor(t){this.entries=t?.entries??[],this.index=t?Math.max(0,Math.min(t.index,this.entries.length-1)):-1}get current(){return this.entries[this.index]}visit(t){return this.current?.hash===t.hash?this.index:(this.entries=[...this.entries.slice(0,this.index+1),t],this.entries.length>xc&&(this.entries=this.entries.slice(this.entries.length-xc)),this.index=this.entries.length-1,this.index)}replace(t){return this.index<0?this.visit(t):(this.entries=this.entries.map((e,i)=>i===this.index?t:e),this.index)}moveTo(t){if(!(t<0||t>=this.entries.length))return this.index=t,this.current}setTitle(t,e){let i=!1;return this.entries=this.entries.map(r=>r.hash!==t||r.title===e?r:(i=!0,{...r,title:e})),i}get canBack(){return this.index>0}get canForward(){return this.index<this.entries.length-1}state(){return{entries:this.entries,index:this.index}}}const Cf=110,Rf=80,Pf=12;function ji(n,t,e,i){return t<=n?1/0:n/t*(e/2)/Math.tan(i*Math.PI/360)}function Lf(n,t,e=Pf){const i=n.filter(r=>r.visible&&r.px>=(t.has(r.slug)?Rf:Cf)).sort((r,s)=>s.px-r.px||r.slug.localeCompare(s.slug));return new Set(i.slice(0,e).map(r=>r.slug))}function Na(n){const t=new Float32Array(n.length),e=n.map(r=>r.flagged/Math.max(1,r.notes)),i=n.map((r,s)=>s).filter(r=>n[r].flagged>0).sort((r,s)=>e[r]-e[s]||r-s);return i.forEach((r,s)=>{t[r]=i.length===1?1:.15+.85*(s/(i.length-1))}),t}function qr(n){return n.note?"note":n.topic?"topic":n.constellation?"constellation":"galaxy"}function Hn(n){return n.note&&n.topic?`#/t/${encodeURIComponent(n.topic)}/n/${encodeURIComponent(n.note)}`:n.topic?`#/t/${encodeURIComponent(n.topic)}`:n.constellation?`#/c/${encodeURIComponent(n.constellation)}`:"#/"}function Df(n,t){const e=n.replace(/^#\/?/,"").split("/").filter(Boolean).map(decodeURIComponent);if(e[0]==="c"&&e[1])return{constellation:e[1]};if(e[0]==="t"&&e[1]){const i={constellation:t(e[1]),topic:e[1]};return e[2]==="n"&&e[3]&&(i.note=e[3]),i}return{}}const Ki={constellation:.26,topic:.22},Oo={constellation:.17,topic:.14};function Uf(n,t){const e=t.nearTopic,i=t.nearConstellation,r=Math.min(1,(e?.size??0)/Ki.topic)*.9,s=Math.min(1,(i?.size??0)/Ki.constellation)*.9;return n.topic&&t.focusTopicSize>=Oo.topic&&(!e||e.slug===n.topic||e.size<Ki.topic)?{focus:n,progress:n.note?3:2}:e&&e.size>=Ki.topic?{focus:{constellation:e.constellation,topic:e.slug},progress:2}:n.constellation&&!n.topic&&t.focusConstellationSize>=Oo.constellation&&(!i||i.id===n.constellation||i.size<Ki.constellation)?{focus:{constellation:n.constellation},progress:1+r}:n.topic&&n.constellation&&t.focusConstellationSize>=Oo.constellation?{focus:{constellation:n.constellation},progress:1+r}:i&&i.size>=Ki.constellation?{focus:{constellation:i.id},progress:1+r}:t.multi?{focus:{},progress:s}:{focus:{constellation:t.only},progress:1+r}}function If(n){var t=0,e=n.children,i=e&&e.length;if(!i)t=1;else for(;--i>=0;)t+=e[i].value;n.value=t}function Of(){return this.eachAfter(If)}function Ff(n,t){let e=-1;for(const i of this)n.call(t,i,++e,this);return this}function Nf(n,t){for(var e=this,i=[e],r,s,o=-1;e=i.pop();)if(n.call(t,e,++o,this),r=e.children)for(s=r.length-1;s>=0;--s)i.push(r[s]);return this}function kf(n,t){for(var e=this,i=[e],r=[],s,o,a,l=-1;e=i.pop();)if(r.push(e),s=e.children)for(o=0,a=s.length;o<a;++o)i.push(s[o]);for(;e=r.pop();)n.call(t,e,++l,this);return this}function zf(n,t){let e=-1;for(const i of this)if(n.call(t,i,++e,this))return i}function Bf(n){return this.eachAfter(function(t){for(var e=+n(t.data)||0,i=t.children,r=i&&i.length;--r>=0;)e+=i[r].value;t.value=e})}function Hf(n){return this.eachBefore(function(t){t.children&&t.children.sort(n)})}function Vf(n){for(var t=this,e=Gf(t,n),i=[t];t!==e;)t=t.parent,i.push(t);for(var r=i.length;n!==e;)i.splice(r,0,n),n=n.parent;return i}function Gf(n,t){if(n===t)return n;var e=n.ancestors(),i=t.ancestors(),r=null;for(n=e.pop(),t=i.pop();n===t;)r=n,n=e.pop(),t=i.pop();return r}function Wf(){for(var n=this,t=[n];n=n.parent;)t.push(n);return t}function Xf(){return Array.from(this)}function qf(){var n=[];return this.eachBefore(function(t){t.children||n.push(t)}),n}function Yf(){var n=this,t=[];return n.each(function(e){e!==n&&t.push({source:e.parent,target:e})}),t}function*$f(){var n=this,t,e=[n],i,r,s;do for(t=e.reverse(),e=[];n=t.pop();)if(yield n,i=n.children)for(r=0,s=i.length;r<s;++r)e.push(i[r]);while(e.length)}function zl(n,t){n instanceof Map?(n=[void 0,n],t===void 0&&(t=Kf)):t===void 0&&(t=jf);for(var e=new go(n),i,r=[e],s,o,a,l;i=r.pop();)if((o=t(i.data))&&(l=(o=Array.from(o)).length))for(i.children=o,a=l-1;a>=0;--a)r.push(s=o[a]=new go(o[a])),s.parent=i,s.depth=i.depth+1;return e.eachBefore(Jf)}function Zf(){return zl(this).eachBefore(Qf)}function jf(n){return n.children}function Kf(n){return Array.isArray(n)?n[1]:null}function Qf(n){n.data.value!==void 0&&(n.value=n.data.value),n.data=n.data.data}function Jf(n){var t=0;do n.height=t;while((n=n.parent)&&n.height<++t)}function go(n){this.data=n,this.depth=this.height=0,this.parent=null}go.prototype=zl.prototype={constructor:go,count:Of,each:Ff,eachAfter:kf,eachBefore:Nf,find:zf,sum:Bf,sort:Hf,path:Vf,ancestors:Wf,descendants:Xf,leaves:qf,links:Yf,copy:Zf,[Symbol.iterator]:$f};function tp(n){return n==null?null:ep(n)}function ep(n){if(typeof n!="function")throw new Error;return n}function yc(){return 0}function np(n){return function(){return n}}const ip=1664525,rp=1013904223,Sc=4294967296;function sp(){let n=1;return()=>(n=(ip*n+rp)%Sc)/Sc}function op(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function ap(n,t){let e=n.length,i,r;for(;e;)r=t()*e--|0,i=n[e],n[e]=n[r],n[r]=i;return n}function lp(n,t){for(var e=0,i=(n=ap(Array.from(n),t)).length,r=[],s,o;e<i;)s=n[e],o&&kh(o,s)?++e:(o=up(r=cp(r,s)),e=0);return o}function cp(n,t){var e,i;if(Fo(t,n))return[t];for(e=0;e<n.length;++e)if(ms(t,n[e])&&Fo(Yr(n[e],t),n))return[n[e],t];for(e=0;e<n.length-1;++e)for(i=e+1;i<n.length;++i)if(ms(Yr(n[e],n[i]),t)&&ms(Yr(n[e],t),n[i])&&ms(Yr(n[i],t),n[e])&&Fo(zh(n[e],n[i],t),n))return[n[e],n[i],t];throw new Error}function ms(n,t){var e=n.r-t.r,i=t.x-n.x,r=t.y-n.y;return e<0||e*e<i*i+r*r}function kh(n,t){var e=n.r-t.r+Math.max(n.r,t.r,1)*1e-9,i=t.x-n.x,r=t.y-n.y;return e>0&&e*e>i*i+r*r}function Fo(n,t){for(var e=0;e<t.length;++e)if(!kh(n,t[e]))return!1;return!0}function up(n){switch(n.length){case 1:return hp(n[0]);case 2:return Yr(n[0],n[1]);case 3:return zh(n[0],n[1],n[2])}}function hp(n){return{x:n.x,y:n.y,r:n.r}}function Yr(n,t){var e=n.x,i=n.y,r=n.r,s=t.x,o=t.y,a=t.r,l=s-e,c=o-i,h=a-r,u=Math.sqrt(l*l+c*c);return{x:(e+s+l/u*h)/2,y:(i+o+c/u*h)/2,r:(u+r+a)/2}}function zh(n,t,e){var i=n.x,r=n.y,s=n.r,o=t.x,a=t.y,l=t.r,c=e.x,h=e.y,u=e.r,f=i-o,d=i-c,g=r-a,_=r-h,m=l-s,p=u-s,y=i*i+r*r-s*s,M=y-o*o-a*a+l*l,E=y-c*c-h*h+u*u,P=d*g-f*_,S=(g*E-_*M)/(P*2)-i,w=(_*m-g*p)/P,U=(d*M-f*E)/(P*2)-r,T=(f*p-d*m)/P,x=w*w+T*T-1,C=2*(s+S*w+U*T),O=S*S+U*U-s*s,z=-(Math.abs(x)>1e-6?(C+Math.sqrt(C*C-4*x*O))/(2*x):O/C);return{x:i+S+w*z,y:r+U+T*z,r:z}}function Mc(n,t,e){var i=n.x-t.x,r,s,o=n.y-t.y,a,l,c=i*i+o*o;c?(s=t.r+e.r,s*=s,l=n.r+e.r,l*=l,s>l?(r=(c+l-s)/(2*c),a=Math.sqrt(Math.max(0,l/c-r*r)),e.x=n.x-r*i-a*o,e.y=n.y-r*o+a*i):(r=(c+s-l)/(2*c),a=Math.sqrt(Math.max(0,s/c-r*r)),e.x=t.x+r*i-a*o,e.y=t.y+r*o+a*i)):(e.x=t.x+e.r,e.y=t.y)}function Ec(n,t){var e=n.r+t.r-1e-6,i=t.x-n.x,r=t.y-n.y;return e>0&&e*e>i*i+r*r}function bc(n){var t=n._,e=n.next._,i=t.r+e.r,r=(t.x*e.r+e.x*t.r)/i,s=(t.y*e.r+e.y*t.r)/i;return r*r+s*s}function gs(n){this._=n,this.next=null,this.previous=null}function dp(n,t){if(!(s=(n=op(n)).length))return 0;var e,i,r,s,o,a,l,c,h,u,f;if(e=n[0],e.x=0,e.y=0,!(s>1))return e.r;if(i=n[1],e.x=-i.r,i.x=e.r,i.y=0,!(s>2))return e.r+i.r;Mc(i,e,r=n[2]),e=new gs(e),i=new gs(i),r=new gs(r),e.next=r.previous=i,i.next=e.previous=r,r.next=i.previous=e;t:for(l=3;l<s;++l){Mc(e._,i._,r=n[l]),r=new gs(r),c=i.next,h=e.previous,u=i._.r,f=e._.r;do if(u<=f){if(Ec(c._,r._)){i=c,e.next=i,i.previous=e,--l;continue t}u+=c._.r,c=c.next}else{if(Ec(h._,r._)){e=h,e.next=i,i.previous=e,--l;continue t}f+=h._.r,h=h.previous}while(c!==h.next);for(r.previous=e,r.next=i,e.next=i.previous=i=r,o=bc(e);(r=r.next)!==i;)(a=bc(r))<o&&(e=r,o=a);i=e.next}for(e=[i._],r=i;(r=r.next)!==i;)e.push(r._);for(r=lp(e,t),l=0;l<s;++l)e=n[l],e.x-=r.x,e.y-=r.y;return r.r}function fp(n){return Math.sqrt(n.value)}function pp(){var n=null,t=1,e=1,i=yc;function r(s){const o=sp();return s.x=t/2,s.y=e/2,n?s.eachBefore(Tc(n)).eachAfter(No(i,.5,o)).eachBefore(wc(1)):s.eachBefore(Tc(fp)).eachAfter(No(yc,1,o)).eachAfter(No(i,s.r/Math.min(t,e),o)).eachBefore(wc(Math.min(t,e)/(2*s.r))),s}return r.radius=function(s){return arguments.length?(n=tp(s),r):n},r.size=function(s){return arguments.length?(t=+s[0],e=+s[1],r):[t,e]},r.padding=function(s){return arguments.length?(i=typeof s=="function"?s:np(+s),r):i},r}function Tc(n){return function(t){t.children||(t.r=Math.max(0,+n(t)||0))}}function No(n,t,e){return function(i){if(r=i.children){var r,s,o=r.length,a=n(i)*t||0,l;if(a)for(s=0;s<o;++s)r[s].r+=a;if(l=dp(r,e),a)for(s=0;s<o;++s)r[s].r-=a;i.r=l+a}}}function wc(n){return function(t){var e=t.parent;t.r*=n,e&&(t.x=e.x+n*t.x,t.y=e.y+n*t.y)}}function mp(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function _r(n){let t=typeof n=="string"?mp(n):n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Vn(n){const t=Math.max(n(),1e-9);return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n())}const gp=Math.PI*(3-Math.sqrt(5)),ts=.68,no=[0,Math.cos(ts),Math.sin(ts)],Ac=[0,Math.sin(ts),-Math.cos(ts)];function _p(n){return 14+5.5*Math.sqrt(Math.max(1,n))}function Cc(n,t,e=0){if(n.length===0)return[];const r=2*(n.reduce((o,a)=>o+a.r,0)/n.length)+t,s=n.map((o,a)=>{const l=a===0&&e===0?0:e+r*Math.sqrt(a+(e?.6:0)),c=a*gp;return{id:o.id,r:o.r,x:l*Math.cos(c),z:l*Math.sin(c)}});for(let o=0;o<80;o++){let a=!1;for(let l=0;l<s.length;l++){for(let c=l+1;c<s.length;c++){const h=s[l],u=s[c];let f=u.x-h.x,d=u.z-h.z,g=Math.hypot(f,d);const _=h.r+u.r+t;if(g<_){g<1e-6&&(f=1,d=0,g=1);const m=(_-g)/2;h.x-=f/g*m,h.z-=d/g*m,u.x+=f/g*m,u.z+=d/g*m,a=!0}}if(e){const c=s[l],h=Math.hypot(c.x,c.z)||1,u=e+c.r;h<u&&(c.x*=u/h,c.z*=u/h,a=!0)}}if(!a)break}return s}function vp(n,t,e){const i=new Map(t.map(h=>[h.slug,h])),r=new Map,s=new Map;for(const h of n){const u=h.topics.map(y=>i.get(y)).filter(y=>!!y),f=new Set(u.map(y=>y.slug)),d=u.filter(y=>!y.parent||!f.has(y.parent)),g=u.length>1&&d.length===1?d[0].slug:null,_=u.sort((y,M)=>+(M.slug===g)-+(y.slug===g)||M.notes-y.notes||y.slug.localeCompare(M.slug)).map(y=>({id:y.slug,r:_p(y.notes)})),m=Cc(_,18),p=Math.max(60,...m.map(y=>Math.hypot(y.x,y.z)+y.r))+24;r.set(h.id,m),s.set(h.id,p)}const o={x:0,y:0,z:0,r:26+4*Math.sqrt(e)},a=n.length<=1,l=Cc(n.map(h=>({id:h.id,r:s.get(h.id)??60})),a?0:70,a?0:o.r+90),c={constellations:new Map,topics:new Map,inbox:o,radius:0};for(const h of l){const u=_r(`c:${h.id}`),f=a?0:(u()-.5)*.3*h.r;c.constellations.set(h.id,{x:h.x,y:f,z:h.z,r:h.r});const d=(u()-.5)*.7,g=u()*Math.PI*2,_=Math.cos(g),m=Math.sin(g);for(const p of r.get(h.id)??[]){const y=_r(`t:${p.id}`),M=p.x*_-p.z*m,E=p.x*m+p.z*_,P=Math.sin(d)*M+(y()-.5)*.35*p.r;c.topics.set(p.id,{x:h.x+M*Math.cos(d),y:f+P,z:h.z+E,r:p.r})}c.radius=Math.max(c.radius,Math.hypot(h.x,h.z)+h.r)}if(c.radius=Math.max(c.radius,o.r*3),a){const h=[...c.constellations.values()][0];h&&(o.x=h.x+h.r+o.r+60,c.radius=Math.max(c.radius,h.r+2*o.r+60))}return c}const xp=new Set(["index","_index","readme"]);function yp(n){if(n.path)return n.path;const t=s=>s.slice(0,Math.max(0,s.lastIndexOf("/"))),e=n.nodes.find(s=>s.id===n.hub);if(e)return t(e.path);const i=n.nodes.map(s=>t(s.path).split("/"));if(!i.length)return"";const r=[];for(let s=0;i.every(o=>o[s]!==void 0&&o[s]===i[0][s]);s++)r.push(i[0][s]);return r.join("/")}function Sp(n,t){const e=new Set;for(let r=n.parent===null?void 0:t.get(n.parent);r;r=r.parent===null?void 0:t.get(r.parent))for(const s of r.title.split(" · "))e.add(s.trim().toLowerCase());const i=n.title.split(" · ");for(;i.length>1&&e.has(i[0].trim().toLowerCase());)i.shift();return i.join(" · ")}function Pr(n){const t=yp(n),e=t?`${t}/`:"",i=new Map;i.set("",{key:"",parent:null,title:n.title,label:n.title,note:n.hub,depth:0,count:0});const r=a=>{let l=i.get(a);if(!l){const c=a.lastIndexOf("/"),h=c<0?"":a.slice(0,c),u=r(h),f=a.slice(c+1);l={key:a,parent:h,title:f,label:f,note:null,depth:u.depth+1,count:0},i.set(a,l)}return l},s=new Map,o=[...n.nodes].filter(a=>a.kind!=="episode").sort((a,l)=>a.path.localeCompare(l.path));for(const a of o){const l=a.path.startsWith(e)?a.path.slice(e.length):a.path,c=l.lastIndexOf("/"),h=c<0?"":l.slice(0,c),u=r(h),f=l.slice(c+1).replace(/\.md$/i,"").toLowerCase(),d=h.slice(h.lastIndexOf("/")+1).toLowerCase();h&&!u.note&&(f===d||xp.has(f))&&(u.note=a.id,u.title=a.title),s.set(a.id,h)}for(const a of s.values())for(let l=i.get(a);l;l=l.parent===null?void 0:i.get(l.parent))l.count++;for(const a of i.values())a.label=Sp(a,i);return{branches:i,folderOf:s}}function Bh(n){return Math.sqrt(Math.max(10,n))}const ko=48;function Mp(n,t){const{branches:e,folderOf:i}=Pr(n),r=new Map(n.nodes.map(S=>[S.id,S])),s=new Map;for(const S of e.values())S.parent!==null&&s.set(S.parent,[...s.get(S.parent)??[],S.key]);const o=new Map;for(const[S,w]of i)o.set(w,[...o.get(w)??[],S]);const a=S=>{const w=e.get(S),U=(o.get(S)??[]).map(C=>({id:C,plane:w.depth,weight:Bh(r.get(C)?.lines??0),first:C===w.note})),T=(s.get(S)??[]).map(a),x=T.length&&U.length>1?[{id:`notes:${S}`,plane:w.depth,weight:0,first:U.some(C=>C.first),children:U}]:U;return{id:`branch:${S}`,key:S,plane:w.depth,weight:0,first:!1,children:[...x,...T]}},l={ids:[],positions:new Float32Array,branches:[],skeleton:new Float32Array,skeletonShade:new Float32Array};if(!i.size)return l;const c=2*t*.85,h=zl(a(""),S=>S.children).sum(S=>S.children?0:S.weight).sort((S,w)=>Number(w.data.first)-Number(S.data.first)||(w.value??0)-(S.value??0)||S.data.id.localeCompare(w.data.id)),u=pp().size([c,c]).padding(c*.008)(h),f=t*.04,d=(S,w,U)=>{const T=S-c/2,x=c/2-w,C=U*f;return[T-no[0]*C,x*Ac[1]-no[1]*C,x*Ac[2]-no[2]*C]},g=new Map,_=[];for(const S of u.descendants())S.data.key!==void 0?S.data.key!==""&&_.push({key:S.data.key,x:S.x,y:S.y,r:S.r,depth:S.data.plane}):S.children||g.set(S.data.id,d(S.x,S.y,S.data.plane));const m=[...i.keys()].filter(S=>g.has(S)).sort((S,w)=>+(w===n.hub)-+(S===n.hub)),p=new Float32Array(m.length*3);m.forEach((S,w)=>p.set(g.get(S),w*3));const y=[],M=[];for(const S of _)for(let w=0;w<ko;w++){const U=w/ko*Math.PI*2,T=(w+1)/ko*Math.PI*2;y.push(...d(S.x+S.r*Math.cos(U),S.y+S.r*Math.sin(U),S.depth)),y.push(...d(S.x+S.r*Math.cos(T),S.y+S.r*Math.sin(T),S.depth)),M.push(.6,.6)}const E=new Map(_.map(S=>[S.key,S])),P=[...e.values()].filter(S=>S.key!==""&&E.has(S.key)).sort((S,w)=>S.depth-w.depth||S.key.localeCompare(w.key)).map(S=>{const w=E.get(S.key);return{...S,position:d(w.x,w.y-w.r,w.depth),center:d(w.x,w.y,w.depth),radius:w.r}});return{ids:m,positions:p,branches:P,skeleton:new Float32Array(y),skeletonShade:new Float32Array(M)}}function Ep(n,t){for(let e=t===null?void 0:n.get(t);e&&e.key!=="";e=e.parent===null?void 0:n.get(e.parent))if(e.note)return e.note;return null}function zo(n,t,e){const i=n.constellation;if(n.note&&n.topic){if(e&&e.slug===n.topic&&n.note!==e.hub){const{branches:r,folderOf:s}=Pr(e),o=s.get(n.note)??"",a=r.get(o),l=a?.note===n.note?a.parent??null:o,c=Ep(r,l);if(c)return{constellation:i,topic:n.topic,note:c}}return{constellation:i,topic:n.topic}}if(n.topic){const r=t.topics.find(s=>s.slug===n.topic)?.parent;return r&&t.topics.some(s=>s.slug===r)?{topic:r}:{constellation:i}}return n.constellation?{}:null}function Rc(n,t,e){if(!n.constellation&&!n.topic){const l=c=>t.topics.filter(h=>t.constellations.find(u=>u.id===c)?.topics.includes(h.slug)).reduce((h,u)=>h+u.notes,0);return[...t.constellations].sort((c,h)=>l(h.id)-l(c.id)||c.title.localeCompare(h.title)).map(c=>({constellation:c.id}))}if(!n.topic){const l=new Set(t.constellations.find(c=>c.id===n.constellation)?.topics??[]);return t.topics.filter(c=>l.has(c.slug)&&!(c.parent&&l.has(c.parent))).sort((c,h)=>h.notes-c.notes||c.title.localeCompare(h.title)).map(c=>({topic:c.slug}))}if(!e||e.slug!==n.topic)return[];const{branches:i,folderOf:r}=Pr(e);let s;if(!n.note||n.note===e.hub)s="";else{const l=r.get(n.note);if(l===void 0||i.get(l)?.note!==n.note)return[];s=l}const o=[];for(const l of i.values()){if(l.parent!==s)continue;const c=l.note??a(l.key);c&&o.push({focus:{topic:n.topic,note:c},size:l.count,title:l.title})}for(const[l,c]of r)c===s&&l!==i.get(c).note&&l!==e.hub&&o.push({focus:{topic:n.topic,note:l},size:1,title:e.nodes.find(h=>h.id===l)?.title??l});if(s==="")for(const l of t.topics)l.parent===n.topic&&o.push({focus:{topic:l.slug},size:l.notes,title:l.title});return o.sort((l,c)=>c.size-l.size||l.title.localeCompare(c.title)).map(l=>l.focus);function a(l){const c=[...i.values()].filter(h=>h.parent===l).sort((h,u)=>u.count-h.count||h.key.localeCompare(u.key));for(const h of c){const u=h.note??a(h.key);if(u)return u}for(const[h,u]of r)if(u===l)return h;return null}}/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */const xe={LEFT:1,RIGHT:2,MIDDLE:4},Y=Object.freeze({NONE:0,ROTATE:1,TRUCK:2,SCREEN_PAN:4,OFFSET:8,DOLLY:16,ZOOM:32,TOUCH_ROTATE:64,TOUCH_TRUCK:128,TOUCH_SCREEN_PAN:256,TOUCH_OFFSET:512,TOUCH_DOLLY:1024,TOUCH_ZOOM:2048,TOUCH_DOLLY_TRUCK:4096,TOUCH_DOLLY_SCREEN_PAN:8192,TOUCH_DOLLY_OFFSET:16384,TOUCH_DOLLY_ROTATE:32768,TOUCH_ZOOM_TRUCK:65536,TOUCH_ZOOM_OFFSET:131072,TOUCH_ZOOM_SCREEN_PAN:262144,TOUCH_ZOOM_ROTATE:524288}),Qi={NONE:0,IN:1,OUT:-1};function Ai(n){return n.isPerspectiveCamera}function pi(n){return n.isOrthographicCamera}const Ji=Math.PI*2,Pc=Math.PI/2,Hh=1e-5,Fr=Math.PI/180;function En(n,t,e){return Math.max(t,Math.min(e,n))}function fe(n,t=Hh){return Math.abs(n)<t}function ie(n,t,e=Hh){return fe(n-t,e)}function Lc(n,t){return Math.round(n/t)*t}function Nr(n){return isFinite(n)?n:n<0?-Number.MAX_VALUE:Number.MAX_VALUE}function kr(n){return Math.abs(n)<Number.MAX_VALUE?n:n*(1/0)}function _s(n,t,e,i,r=1/0,s){i=Math.max(1e-4,i);const o=2/i,a=o*s,l=1/(1+a+.48*a*a+.235*a*a*a);let c=n-t;const h=t,u=r*i;c=En(c,-u,u),t=n-c;const f=(e.value+o*c)*s;e.value=(e.value-o*f)*l;let d=t+(c+f)*l;return h-n>0==d>h&&(d=h,e.value=(d-h)/s),d}function Dc(n,t,e,i,r=1/0,s,o){i=Math.max(1e-4,i);const a=2/i,l=a*s,c=1/(1+l+.48*l*l+.235*l*l*l);let h=t.x,u=t.y,f=t.z,d=n.x-h,g=n.y-u,_=n.z-f;const m=h,p=u,y=f,M=r*i,E=M*M,P=d*d+g*g+_*_;if(P>E){const W=Math.sqrt(P);d=d/W*M,g=g/W*M,_=_/W*M}h=n.x-d,u=n.y-g,f=n.z-_;const S=(e.x+a*d)*s,w=(e.y+a*g)*s,U=(e.z+a*_)*s;e.x=(e.x-a*S)*c,e.y=(e.y-a*w)*c,e.z=(e.z-a*U)*c,o.x=h+(d+S)*c,o.y=u+(g+w)*c,o.z=f+(_+U)*c;const T=m-n.x,x=p-n.y,C=y-n.z,O=o.x-m,z=o.y-p,X=o.z-y;return T*O+x*z+C*X>0&&(o.x=m,o.y=p,o.z=y,e.x=(o.x-m)/s,e.y=(o.y-p)/s,e.z=(o.z-y)/s),o}function Bo(n,t){t.set(0,0),n.forEach(e=>{t.x+=e.clientX,t.y+=e.clientY}),t.x/=n.length,t.y/=n.length}function Ho(n,t){return pi(n)?(console.warn(`${t} is not supported in OrthographicCamera`),!0):!1}let bp=class{constructor(){this._listeners={}}addEventListener(t,e){const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}removeAllEventListeners(t){if(!t){this._listeners={};return}Array.isArray(this._listeners[t])&&(this._listeners[t].length=0)}dispatchEvent(t){const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t)}}};var Vo;const Tp="2.10.1",vs=1/8,wp=/Mac/.test((Vo=globalThis?.navigator)===null||Vo===void 0?void 0:Vo.platform);let Ot,Uc,xs,Go,$e,Bt,ee,tr,zr,Dn,Un,Ci,Ic,Oc,un,Br,er,Fc,Wo,Nc,Xo,qo,ys;class dn extends bp{static install(t){Ot=t.THREE,Uc=Object.freeze(new Ot.Vector3(0,0,0)),xs=Object.freeze(new Ot.Vector3(0,1,0)),Go=Object.freeze(new Ot.Vector3(0,0,1)),$e=new Ot.Vector2,Bt=new Ot.Vector3,ee=new Ot.Vector3,tr=new Ot.Vector3,zr=new Ot.Vector3,Dn=new Ot.Vector3,Un=new Ot.Vector3,Ci=new Ot.Vector3,Ic=new Ot.Vector3,Oc=new Ot.Vector3,un=new Ot.Spherical,Br=new Ot.Spherical,er=new Ot.Box3,Fc=new Ot.Box3,Wo=new Ot.Sphere,Nc=new Ot.Quaternion,Xo=new Ot.Quaternion,qo=new Ot.Matrix4,ys=new Ot.Raycaster}static get ACTION(){return Y}set verticalDragToForward(t){console.warn("camera-controls: `verticalDragToForward` was removed. Use `mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.")}constructor(t,e){super(),this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.minDistance=Number.EPSILON,this.maxDistance=1/0,this.infinityDolly=!1,this.minZoom=.01,this.maxZoom=1/0,this.smoothTime=.25,this.draggingSmoothTime=.125,this.maxSpeed=1/0,this.azimuthRotateSpeed=1,this.polarRotateSpeed=1,this.dollySpeed=1,this.dollyDragInverted=!1,this.truckSpeed=2,this.dollyToCursor=!1,this.dragToOffset=!1,this.boundaryFriction=0,this.restThreshold=.01,this.colliderMeshes=[],this.cancel=()=>{},this._enabled=!0,this._state=Y.NONE,this._viewport=null,this._changedDolly=0,this._changedZoom=0,this._hasRested=!0,this._boundaryEnclosesCamera=!1,this._needsUpdate=!0,this._updatedLastTime=!1,this._elementRect=new DOMRect,this._isDragging=!1,this._dragNeedsUpdate=!0,this._activePointers=[],this._lockedPointer=null,this._interactiveArea=new DOMRect(0,0,1,1),this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._isUserControllingOffset=!1,this._isUserControllingZoom=!1,this._lastDollyDirection=Qi.NONE,this._thetaVelocity={value:0},this._phiVelocity={value:0},this._radiusVelocity={value:0},this._targetVelocity=new Ot.Vector3,this._focalOffsetVelocity=new Ot.Vector3,this._zoomVelocity={value:0},this._truckInternal=(p,y,M,E)=>{let P,S;if(Ai(this._camera)){const w=Bt.copy(this._camera.position).sub(this._target),U=this._camera.getEffectiveFOV()*Fr,T=w.length()*Math.tan(U*.5);P=this.truckSpeed*p*T/this._elementRect.height,S=this.truckSpeed*y*T/this._elementRect.height}else if(pi(this._camera)){const w=this._camera;P=this.truckSpeed*p*(w.right-w.left)/w.zoom/this._elementRect.width,S=this.truckSpeed*y*(w.top-w.bottom)/w.zoom/this._elementRect.height}else return;E?(M?this.setFocalOffset(this._focalOffsetEnd.x+P,this._focalOffsetEnd.y,this._focalOffsetEnd.z,!0):this.truck(P,0,!0),this.forward(-S,!0)):M?this.setFocalOffset(this._focalOffsetEnd.x+P,this._focalOffsetEnd.y+S,this._focalOffsetEnd.z,!0):this.truck(P,S,!0)},this._rotateInternal=(p,y)=>{const M=Ji*this.azimuthRotateSpeed*p/this._elementRect.height,E=Ji*this.polarRotateSpeed*y/this._elementRect.height;this.rotate(M,E,!0)},this._dollyInternal=(p,y,M)=>{const E=Math.pow(.95,-p*this.dollySpeed),P=this._sphericalEnd.radius,S=this._sphericalEnd.radius*E,w=En(S,this.minDistance,this.maxDistance),U=w-S;this.infinityDolly&&this.dollyToCursor?this._dollyToNoClamp(S,!0):this.infinityDolly&&!this.dollyToCursor?(this.dollyInFixed(U,!0),this._dollyToNoClamp(w,!0)):this._dollyToNoClamp(w,!0),this.dollyToCursor&&(this._changedDolly+=(this.infinityDolly?S:w)-P,this._dollyControlCoord.set(y,M)),this._lastDollyDirection=Math.sign(-p)},this._zoomInternal=(p,y,M)=>{const E=Math.pow(.95,p*this.dollySpeed),P=this._zoom,S=this._zoom*E;this.zoomTo(S,!0),this.dollyToCursor&&(this._changedZoom+=S-P,this._dollyControlCoord.set(y,M))},typeof Ot>"u"&&console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."),this._camera=t,this._yAxisUpSpace=new Ot.Quaternion().setFromUnitVectors(this._camera.up,xs),this._yAxisUpSpaceInverse=this._yAxisUpSpace.clone().invert(),this._state=Y.NONE,this._target=new Ot.Vector3,this._targetEnd=this._target.clone(),this._focalOffset=new Ot.Vector3,this._focalOffsetEnd=this._focalOffset.clone(),this._spherical=new Ot.Spherical().setFromVector3(Bt.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)),this._sphericalEnd=this._spherical.clone(),this._lastDistance=this._spherical.radius,this._zoom=this._camera.zoom,this._zoomEnd=this._zoom,this._lastZoom=this._zoom,this._nearPlaneCorners=[new Ot.Vector3,new Ot.Vector3,new Ot.Vector3,new Ot.Vector3],this._updateNearPlaneCorners(),this._boundary=new Ot.Box3(new Ot.Vector3(-1/0,-1/0,-1/0),new Ot.Vector3(1/0,1/0,1/0)),this._cameraUp0=this._camera.up.clone(),this._target0=this._target.clone(),this._position0=this._camera.position.clone(),this._zoom0=this._zoom,this._focalOffset0=this._focalOffset.clone(),this._dollyControlCoord=new Ot.Vector2,this.mouseButtons={left:Y.ROTATE,middle:Y.DOLLY,right:Y.TRUCK,wheel:Ai(this._camera)?Y.DOLLY:pi(this._camera)?Y.ZOOM:Y.NONE},this.touches={one:Y.TOUCH_ROTATE,two:Ai(this._camera)?Y.TOUCH_DOLLY_TRUCK:pi(this._camera)?Y.TOUCH_ZOOM_TRUCK:Y.NONE,three:Y.TOUCH_TRUCK};const i=new Ot.Vector2,r=new Ot.Vector2,s=new Ot.Vector2,o=p=>{if(!this._enabled||!this._domElement)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const E=this._domElement.getBoundingClientRect(),P=p.clientX/E.width,S=p.clientY/E.height;if(P<this._interactiveArea.left||P>this._interactiveArea.right||S<this._interactiveArea.top||S>this._interactiveArea.bottom)return}const y=p.pointerType!=="mouse"?null:(p.buttons&xe.LEFT)===xe.LEFT?xe.LEFT:(p.buttons&xe.MIDDLE)===xe.MIDDLE?xe.MIDDLE:(p.buttons&xe.RIGHT)===xe.RIGHT?xe.RIGHT:null;if(y!==null){const E=this._findPointerByMouseButton(y);E&&this._disposePointer(E)}if((p.buttons&xe.LEFT)===xe.LEFT&&this._lockedPointer)return;const M={pointerId:p.pointerId,clientX:p.clientX,clientY:p.clientY,deltaX:0,deltaY:0,mouseButton:y};this._activePointers.push(M),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),this._isDragging=!0,f(p)},a=p=>{p.cancelable&&p.preventDefault();const y=p.pointerId,M=this._lockedPointer||this._findPointerById(y);if(M){if(M.clientX=p.clientX,M.clientY=p.clientY,M.deltaX=p.movementX,M.deltaY=p.movementY,this._state=0,p.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else(!this._isDragging&&this._lockedPointer||this._isDragging&&(p.buttons&xe.LEFT)===xe.LEFT)&&(this._state=this._state|this.mouseButtons.left),this._isDragging&&(p.buttons&xe.MIDDLE)===xe.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),this._isDragging&&(p.buttons&xe.RIGHT)===xe.RIGHT&&(this._state=this._state|this.mouseButtons.right);d()}},l=p=>{const y=this._findPointerById(p.pointerId);if(!(y&&y===this._lockedPointer)){if(y&&this._disposePointer(y),p.pointerType==="touch")switch(this._activePointers.length){case 0:this._state=Y.NONE;break;case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else this._state=Y.NONE;g()}};let c=-1;const h=p=>{if(!this._domElement||!this._enabled||this.mouseButtons.wheel===Y.NONE)return;if(this._interactiveArea.left!==0||this._interactiveArea.top!==0||this._interactiveArea.width!==1||this._interactiveArea.height!==1){const S=this._domElement.getBoundingClientRect(),w=p.clientX/S.width,U=p.clientY/S.height;if(w<this._interactiveArea.left||w>this._interactiveArea.right||U<this._interactiveArea.top||U>this._interactiveArea.bottom)return}if(p.preventDefault(),this.dollyToCursor||this.mouseButtons.wheel===Y.ROTATE||this.mouseButtons.wheel===Y.TRUCK){const S=performance.now();c-S<1e3&&this._getClientRect(this._elementRect),c=S}const y=wp?-1:-3,M=p.deltaMode===1||p.ctrlKey?p.deltaY/y:p.deltaY/(y*10),E=this.dollyToCursor?(p.clientX-this._elementRect.x)/this._elementRect.width*2-1:0,P=this.dollyToCursor?(p.clientY-this._elementRect.y)/this._elementRect.height*-2+1:0;switch(this.mouseButtons.wheel){case Y.ROTATE:{this._rotateInternal(p.deltaX,p.deltaY),this._isUserControllingRotate=!0;break}case Y.TRUCK:{this._truckInternal(p.deltaX,p.deltaY,!1,!1),this._isUserControllingTruck=!0;break}case Y.SCREEN_PAN:{this._truckInternal(p.deltaX,p.deltaY,!1,!0),this._isUserControllingTruck=!0;break}case Y.OFFSET:{this._truckInternal(p.deltaX,p.deltaY,!0,!1),this._isUserControllingOffset=!0;break}case Y.DOLLY:{this._dollyInternal(-M,E,P),this._isUserControllingDolly=!0;break}case Y.ZOOM:{this._zoomInternal(-M,E,P),this._isUserControllingZoom=!0;break}}this.dispatchEvent({type:"control"})},u=p=>{if(!(!this._domElement||!this._enabled)){if(this.mouseButtons.right===dn.ACTION.NONE){const y=p instanceof PointerEvent?p.pointerId:0,M=this._findPointerById(y);M&&this._disposePointer(M),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l);return}p.preventDefault()}},f=p=>{if(!this._enabled)return;if(Bo(this._activePointers,$e),this._getClientRect(this._elementRect),i.copy($e),r.copy($e),this._activePointers.length>=2){const M=$e.x-this._activePointers[1].clientX,E=$e.y-this._activePointers[1].clientY,P=Math.sqrt(M*M+E*E);s.set(0,P);const S=(this._activePointers[0].clientX+this._activePointers[1].clientX)*.5,w=(this._activePointers[0].clientY+this._activePointers[1].clientY)*.5;r.set(S,w)}if(this._state=0,!p)this._lockedPointer&&(this._state=this._state|this.mouseButtons.left);else if("pointerType"in p&&p.pointerType==="touch")switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three;break}else!this._lockedPointer&&(p.buttons&xe.LEFT)===xe.LEFT&&(this._state=this._state|this.mouseButtons.left),(p.buttons&xe.MIDDLE)===xe.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),(p.buttons&xe.RIGHT)===xe.RIGHT&&(this._state=this._state|this.mouseButtons.right);((this._state&Y.ROTATE)===Y.ROTATE||(this._state&Y.TOUCH_ROTATE)===Y.TOUCH_ROTATE||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE)&&(this._sphericalEnd.theta=this._spherical.theta,this._sphericalEnd.phi=this._spherical.phi,this._thetaVelocity.value=0,this._phiVelocity.value=0),((this._state&Y.TRUCK)===Y.TRUCK||(this._state&Y.SCREEN_PAN)===Y.SCREEN_PAN||(this._state&Y.TOUCH_TRUCK)===Y.TOUCH_TRUCK||(this._state&Y.TOUCH_SCREEN_PAN)===Y.TOUCH_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN)&&(this._targetEnd.copy(this._target),this._targetVelocity.set(0,0,0)),((this._state&Y.DOLLY)===Y.DOLLY||(this._state&Y.TOUCH_DOLLY)===Y.TOUCH_DOLLY||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE)&&(this._sphericalEnd.radius=this._spherical.radius,this._radiusVelocity.value=0),((this._state&Y.ZOOM)===Y.ZOOM||(this._state&Y.TOUCH_ZOOM)===Y.TOUCH_ZOOM||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_ZOOM_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE)&&(this._zoomEnd=this._zoom,this._zoomVelocity.value=0),((this._state&Y.OFFSET)===Y.OFFSET||(this._state&Y.TOUCH_OFFSET)===Y.TOUCH_OFFSET||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET)&&(this._focalOffsetEnd.copy(this._focalOffset),this._focalOffsetVelocity.set(0,0,0)),this.dispatchEvent({type:"controlstart"})},d=()=>{if(!this._enabled||!this._dragNeedsUpdate)return;this._dragNeedsUpdate=!1,Bo(this._activePointers,$e);const y=this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement?this._lockedPointer||this._activePointers[0]:null,M=y?-y.deltaX:r.x-$e.x,E=y?-y.deltaY:r.y-$e.y;if(r.copy($e),((this._state&Y.ROTATE)===Y.ROTATE||(this._state&Y.TOUCH_ROTATE)===Y.TOUCH_ROTATE||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE)&&(this._rotateInternal(M,E),this._isUserControllingRotate=!0),(this._state&Y.DOLLY)===Y.DOLLY||(this._state&Y.ZOOM)===Y.ZOOM){const P=this.dollyToCursor?(i.x-this._elementRect.x)/this._elementRect.width*2-1:0,S=this.dollyToCursor?(i.y-this._elementRect.y)/this._elementRect.height*-2+1:0,w=this.dollyDragInverted?-1:1;(this._state&Y.DOLLY)===Y.DOLLY?(this._dollyInternal(w*E*vs,P,S),this._isUserControllingDolly=!0):(this._zoomInternal(w*E*vs,P,S),this._isUserControllingZoom=!0)}if((this._state&Y.TOUCH_DOLLY)===Y.TOUCH_DOLLY||(this._state&Y.TOUCH_ZOOM)===Y.TOUCH_ZOOM||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_ZOOM_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_ZOOM_ROTATE)===Y.TOUCH_ZOOM_ROTATE){const P=$e.x-this._activePointers[1].clientX,S=$e.y-this._activePointers[1].clientY,w=Math.sqrt(P*P+S*S),U=s.y-w;s.set(0,w);const T=this.dollyToCursor?(r.x-this._elementRect.x)/this._elementRect.width*2-1:0,x=this.dollyToCursor?(r.y-this._elementRect.y)/this._elementRect.height*-2+1:0;(this._state&Y.TOUCH_DOLLY)===Y.TOUCH_DOLLY||(this._state&Y.TOUCH_DOLLY_ROTATE)===Y.TOUCH_DOLLY_ROTATE||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET?(this._dollyInternal(U*vs,T,x),this._isUserControllingDolly=!0):(this._zoomInternal(U*vs,T,x),this._isUserControllingZoom=!0)}((this._state&Y.TRUCK)===Y.TRUCK||(this._state&Y.TOUCH_TRUCK)===Y.TOUCH_TRUCK||(this._state&Y.TOUCH_DOLLY_TRUCK)===Y.TOUCH_DOLLY_TRUCK||(this._state&Y.TOUCH_ZOOM_TRUCK)===Y.TOUCH_ZOOM_TRUCK)&&(this._truckInternal(M,E,!1,!1),this._isUserControllingTruck=!0),((this._state&Y.SCREEN_PAN)===Y.SCREEN_PAN||(this._state&Y.TOUCH_SCREEN_PAN)===Y.TOUCH_SCREEN_PAN||(this._state&Y.TOUCH_DOLLY_SCREEN_PAN)===Y.TOUCH_DOLLY_SCREEN_PAN||(this._state&Y.TOUCH_ZOOM_SCREEN_PAN)===Y.TOUCH_ZOOM_SCREEN_PAN)&&(this._truckInternal(M,E,!1,!0),this._isUserControllingTruck=!0),((this._state&Y.OFFSET)===Y.OFFSET||(this._state&Y.TOUCH_OFFSET)===Y.TOUCH_OFFSET||(this._state&Y.TOUCH_DOLLY_OFFSET)===Y.TOUCH_DOLLY_OFFSET||(this._state&Y.TOUCH_ZOOM_OFFSET)===Y.TOUCH_ZOOM_OFFSET)&&(this._truckInternal(M,E,!0,!1),this._isUserControllingOffset=!0),this.dispatchEvent({type:"control"})},g=()=>{Bo(this._activePointers,$e),r.copy($e),this._dragNeedsUpdate=!1,(this._activePointers.length===0||this._activePointers.length===1&&this._activePointers[0]===this._lockedPointer)&&(this._isDragging=!1),this._activePointers.length===0&&this._domElement&&(this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this.dispatchEvent({type:"controlend"}))};this.lockPointer=()=>{!this._enabled||!this._domElement||(this.cancel(),this._lockedPointer={pointerId:-1,clientX:0,clientY:0,deltaX:0,deltaY:0,mouseButton:null},this._activePointers.push(this._lockedPointer),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.requestPointerLock(),this._domElement.ownerDocument.addEventListener("pointerlockchange",_),this._domElement.ownerDocument.addEventListener("pointerlockerror",m),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),f())},this.unlockPointer=()=>{var p,y,M;this._lockedPointer!==null&&(this._disposePointer(this._lockedPointer),this._lockedPointer=null),(p=this._domElement)===null||p===void 0||p.ownerDocument.exitPointerLock(),(y=this._domElement)===null||y===void 0||y.ownerDocument.removeEventListener("pointerlockchange",_),(M=this._domElement)===null||M===void 0||M.ownerDocument.removeEventListener("pointerlockerror",m),this.cancel()};const _=()=>{this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement||this.unlockPointer()},m=()=>{this.unlockPointer()};this._addAllEventListeners=p=>{this._domElement=p,this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none",this._domElement.addEventListener("pointerdown",o),this._domElement.addEventListener("pointercancel",l),this._domElement.addEventListener("wheel",h,{passive:!1}),this._domElement.addEventListener("contextmenu",u)},this._removeAllEventListeners=()=>{this._domElement&&(this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect="",this._domElement.removeEventListener("pointerdown",o),this._domElement.removeEventListener("pointercancel",l),this._domElement.removeEventListener("wheel",h,{passive:!1}),this._domElement.removeEventListener("contextmenu",u),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.removeEventListener("pointerlockchange",_),this._domElement.ownerDocument.removeEventListener("pointerlockerror",m))},this.cancel=()=>{this._state!==Y.NONE&&(this._state=Y.NONE,this._activePointers.length=0,g())},e&&this.connect(e),this.update(0)}get camera(){return this._camera}set camera(t){this._camera=t,this.updateCameraUp(),this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0}get enabled(){return this._enabled}set enabled(t){this._enabled=t,this._domElement&&(t?(this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none"):(this.cancel(),this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect=""))}get active(){return!this._hasRested}get currentAction(){return this._state}get distance(){return this._spherical.radius}set distance(t){this._spherical.radius===t&&this._sphericalEnd.radius===t||(this._spherical.radius=t,this._sphericalEnd.radius=t,this._needsUpdate=!0)}get azimuthAngle(){return this._spherical.theta}set azimuthAngle(t){this._spherical.theta===t&&this._sphericalEnd.theta===t||(this._spherical.theta=t,this._sphericalEnd.theta=t,this._needsUpdate=!0)}get polarAngle(){return this._spherical.phi}set polarAngle(t){this._spherical.phi===t&&this._sphericalEnd.phi===t||(this._spherical.phi=t,this._sphericalEnd.phi=t,this._needsUpdate=!0)}get boundaryEnclosesCamera(){return this._boundaryEnclosesCamera}set boundaryEnclosesCamera(t){this._boundaryEnclosesCamera=t,this._needsUpdate=!0}set interactiveArea(t){this._interactiveArea.width=En(t.width,0,1),this._interactiveArea.height=En(t.height,0,1),this._interactiveArea.x=En(t.x,0,1-this._interactiveArea.width),this._interactiveArea.y=En(t.y,0,1-this._interactiveArea.height)}addEventListener(t,e){super.addEventListener(t,e)}removeEventListener(t,e){super.removeEventListener(t,e)}rotate(t,e,i=!1){return this.rotateTo(this._sphericalEnd.theta+t,this._sphericalEnd.phi+e,i)}rotateAzimuthTo(t,e=!1){return this.rotateTo(t,this._sphericalEnd.phi,e)}rotatePolarTo(t,e=!1){return this.rotateTo(this._sphericalEnd.theta,t,e)}rotateTo(t,e,i=!1){this._isUserControllingRotate=!1;const r=En(t,this.minAzimuthAngle,this.maxAzimuthAngle),s=En(e,this.minPolarAngle,this.maxPolarAngle);this._sphericalEnd.theta=r,this._sphericalEnd.phi=s,this._sphericalEnd.makeSafe(),this._needsUpdate=!0,i||(this._spherical.theta=this._sphericalEnd.theta,this._spherical.phi=this._sphericalEnd.phi);const o=!i||ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold);return this._createOnRestPromise(o)}dolly(t,e=!1){return this.dollyTo(this._sphericalEnd.radius-t,e)}dollyTo(t,e=!1){return this._isUserControllingDolly=!1,this._lastDollyDirection=Qi.NONE,this._changedDolly=0,this._dollyToNoClamp(En(t,this.minDistance,this.maxDistance),e)}_dollyToNoClamp(t,e=!1){const i=this._sphericalEnd.radius;if(this.colliderMeshes.length>=1){const o=this._collisionTest(),a=ie(o,this._spherical.radius);if(!(i>t)&&a)return Promise.resolve();this._sphericalEnd.radius=Math.min(t,o)}else this._sphericalEnd.radius=t;this._needsUpdate=!0,e||(this._spherical.radius=this._sphericalEnd.radius);const s=!e||ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(s)}dollyInFixed(t,e=!1){this._targetEnd.add(this._getCameraDirection(zr).multiplyScalar(t)),e||this._target.copy(this._targetEnd);const i=!e||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(i)}zoom(t,e=!1){return this.zoomTo(this._zoomEnd+t,e)}zoomTo(t,e=!1){this._isUserControllingZoom=!1,this._zoomEnd=En(t,this.minZoom,this.maxZoom),this._needsUpdate=!0,e||(this._zoom=this._zoomEnd);const i=!e||ie(this._zoom,this._zoomEnd,this.restThreshold);return this._changedZoom=0,this._createOnRestPromise(i)}pan(t,e,i=!1){return console.warn("`pan` has been renamed to `truck`"),this.truck(t,e,i)}truck(t,e,i=!1){this._camera.updateMatrix(),Dn.setFromMatrixColumn(this._camera.matrix,0),Un.setFromMatrixColumn(this._camera.matrix,1),Dn.multiplyScalar(t),Un.multiplyScalar(-e);const r=Bt.copy(Dn).add(Un),s=ee.copy(this._targetEnd).add(r);return this.moveTo(s.x,s.y,s.z,i)}forward(t,e=!1){Bt.setFromMatrixColumn(this._camera.matrix,0),Bt.crossVectors(this._camera.up,Bt),Bt.multiplyScalar(t);const i=ee.copy(this._targetEnd).add(Bt);return this.moveTo(i.x,i.y,i.z,e)}elevate(t,e=!1){return Bt.copy(this._camera.up).multiplyScalar(t),this.moveTo(this._targetEnd.x+Bt.x,this._targetEnd.y+Bt.y,this._targetEnd.z+Bt.z,e)}moveTo(t,e,i,r=!1){this._isUserControllingTruck=!1;const s=Bt.set(t,e,i).sub(this._targetEnd);this._encloseToBoundary(this._targetEnd,s,this.boundaryFriction),this._needsUpdate=!0,r||this._target.copy(this._targetEnd);const o=!r||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(o)}lookInDirectionOf(t,e,i,r=!1){const a=Bt.set(t,e,i).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);return this.setPosition(a.x,a.y,a.z,r)}fitToBox(t,e,{cover:i=!1,paddingLeft:r=0,paddingRight:s=0,paddingBottom:o=0,paddingTop:a=0}={}){const l=[],c=t.isBox3?er.copy(t):er.setFromObject(t);c.isEmpty()&&(console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"),Promise.resolve());const h=Lc(this._sphericalEnd.theta,Pc),u=Lc(this._sphericalEnd.phi,Pc);l.push(this.rotateTo(h,u,e));const f=Bt.setFromSpherical(this._sphericalEnd).normalize(),d=Nc.setFromUnitVectors(f,Go),g=ie(Math.abs(f.y),1);g&&d.multiply(Xo.setFromAxisAngle(xs,h)),d.multiply(this._yAxisUpSpaceInverse);const _=Fc.makeEmpty();ee.copy(c.min).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setX(c.max.x).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setY(c.max.y).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setZ(c.min.z).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.min).setZ(c.max.z).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setY(c.min.y).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).setX(c.min.x).applyQuaternion(d),_.expandByPoint(ee),ee.copy(c.max).applyQuaternion(d),_.expandByPoint(ee),_.min.x-=r,_.min.y-=o,_.max.x+=s,_.max.y+=a,d.setFromUnitVectors(Go,f),g&&d.premultiply(Xo.invert()),d.premultiply(this._yAxisUpSpace);const m=_.getSize(Bt),p=_.getCenter(ee).applyQuaternion(d);if(Ai(this._camera)){const y=this.getDistanceToFitBox(m.x,m.y,m.z,i);l.push(this.moveTo(p.x,p.y,p.z,e)),l.push(this.dollyTo(y,e)),l.push(this.setFocalOffset(0,0,0,e))}else if(pi(this._camera)){const y=this._camera,M=y.right-y.left,E=y.top-y.bottom,P=i?Math.max(M/m.x,E/m.y):Math.min(M/m.x,E/m.y);l.push(this.moveTo(p.x,p.y,p.z,e)),l.push(this.zoomTo(P,e)),l.push(this.setFocalOffset(0,0,0,e))}return Promise.all(l)}fitToSphere(t,e){const i=[],s="isObject3D"in t?dn.createBoundingSphere(t,Wo):Wo.copy(t);if(i.push(this.moveTo(s.center.x,s.center.y,s.center.z,e)),Ai(this._camera)){const o=this.getDistanceToFitSphere(s.radius);i.push(this.dollyTo(o,e))}else if(pi(this._camera)){const o=this._camera.right-this._camera.left,a=this._camera.top-this._camera.bottom,l=2*s.radius,c=Math.min(o/l,a/l);i.push(this.zoomTo(c,e))}return i.push(this.setFocalOffset(0,0,0,e)),Promise.all(i)}setLookAt(t,e,i,r,s,o,a=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=Qi.NONE,this._changedDolly=0;const l=ee.set(r,s,o),c=Bt.set(t,e,i);this._targetEnd.copy(l),this._sphericalEnd.setFromVector3(c.sub(l).applyQuaternion(this._yAxisUpSpace)),this.normalizeRotations(),this._needsUpdate=!0,a||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const h=!a||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(h)}lerpLookAt(t,e,i,r,s,o,a,l,c,h,u,f,d,g=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=Qi.NONE,this._changedDolly=0;const _=Bt.set(r,s,o),m=ee.set(t,e,i);un.setFromVector3(m.sub(_).applyQuaternion(this._yAxisUpSpace));const p=tr.set(h,u,f),y=ee.set(a,l,c);Br.setFromVector3(y.sub(p).applyQuaternion(this._yAxisUpSpace)),this._targetEnd.copy(_.lerp(p,d));const M=Br.theta-un.theta,E=Br.phi-un.phi,P=Br.radius-un.radius;this._sphericalEnd.set(un.radius+P*d,un.phi+E*d,un.theta+M*d),this.normalizeRotations(),this._needsUpdate=!0,g||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));const S=!g||ie(this._target.x,this._targetEnd.x,this.restThreshold)&&ie(this._target.y,this._targetEnd.y,this.restThreshold)&&ie(this._target.z,this._targetEnd.z,this.restThreshold)&&ie(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&ie(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&ie(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(S)}setPosition(t,e,i,r=!1){return this.setLookAt(t,e,i,this._targetEnd.x,this._targetEnd.y,this._targetEnd.z,r)}setTarget(t,e,i,r=!1){const s=this.getPosition(Bt),o=this.setLookAt(s.x,s.y,s.z,t,e,i,r);return this._sphericalEnd.phi=En(this._sphericalEnd.phi,this.minPolarAngle,this.maxPolarAngle),o}setFocalOffset(t,e,i,r=!1){this._isUserControllingOffset=!1,this._focalOffsetEnd.set(t,e,i),this._needsUpdate=!0,r||this._focalOffset.copy(this._focalOffsetEnd);const s=!r||ie(this._focalOffset.x,this._focalOffsetEnd.x,this.restThreshold)&&ie(this._focalOffset.y,this._focalOffsetEnd.y,this.restThreshold)&&ie(this._focalOffset.z,this._focalOffsetEnd.z,this.restThreshold);return this._createOnRestPromise(s)}setOrbitPoint(t,e,i){this._camera.updateMatrixWorld(),Dn.setFromMatrixColumn(this._camera.matrixWorldInverse,0),Un.setFromMatrixColumn(this._camera.matrixWorldInverse,1),Ci.setFromMatrixColumn(this._camera.matrixWorldInverse,2);const r=Bt.set(t,e,i),s=r.distanceTo(this._camera.position),o=r.sub(this._camera.position);Dn.multiplyScalar(o.x),Un.multiplyScalar(o.y),Ci.multiplyScalar(o.z),Bt.copy(Dn).add(Un).add(Ci),Bt.z=Bt.z+s,this.dollyTo(s,!1),this.setFocalOffset(-Bt.x,Bt.y,-Bt.z,!1),this.moveTo(t,e,i,!1)}setBoundary(t){if(!t){this._boundary.min.set(-1/0,-1/0,-1/0),this._boundary.max.set(1/0,1/0,1/0),this._needsUpdate=!0;return}this._boundary.copy(t),this._boundary.clampPoint(this._targetEnd,this._targetEnd),this._needsUpdate=!0}setViewport(t,e,i,r){if(t===null){this._viewport=null;return}this._viewport=this._viewport||new Ot.Vector4,typeof t=="number"?this._viewport.set(t,e,i,r):this._viewport.copy(t)}getDistanceToFitBox(t,e,i,r=!1){if(Ho(this._camera,"getDistanceToFitBox"))return this._spherical.radius;const s=t/e,o=this._camera.getEffectiveFOV()*Fr,a=this._camera.aspect;return((r?s>a:s<a)?e:t/a)*.5/Math.tan(o*.5)+i*.5}getDistanceToFitSphere(t){if(Ho(this._camera,"getDistanceToFitSphere"))return this._spherical.radius;const e=this._camera.getEffectiveFOV()*Fr,i=Math.atan(Math.tan(e*.5)*this._camera.aspect)*2,r=1<this._camera.aspect?e:i;return t/Math.sin(r*.5)}getTarget(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._targetEnd:this._target)}getPosition(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).setFromSpherical(e?this._sphericalEnd:this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(e?this._targetEnd:this._target)}getSpherical(t,e=!0){return(t||new Ot.Spherical).copy(e?this._sphericalEnd:this._spherical)}getFocalOffset(t,e=!0){return(t&&t.isVector3?t:new Ot.Vector3).copy(e?this._focalOffsetEnd:this._focalOffset)}normalizeRotations(){this._sphericalEnd.theta=this._sphericalEnd.theta%Ji,this._sphericalEnd.theta<0&&(this._sphericalEnd.theta+=Ji),this._spherical.theta+=Ji*Math.round((this._sphericalEnd.theta-this._spherical.theta)/Ji)}stop(){this._focalOffset.copy(this._focalOffsetEnd),this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd),this._zoom=this._zoomEnd}reset(t=!1){if(!ie(this._camera.up.x,this._cameraUp0.x)||!ie(this._camera.up.y,this._cameraUp0.y)||!ie(this._camera.up.z,this._cameraUp0.z)){this._camera.up.copy(this._cameraUp0);const i=this.getPosition(Bt);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}const e=[this.setLookAt(this._position0.x,this._position0.y,this._position0.z,this._target0.x,this._target0.y,this._target0.z,t),this.setFocalOffset(this._focalOffset0.x,this._focalOffset0.y,this._focalOffset0.z,t),this.zoomTo(this._zoom0,t)];return Promise.all(e)}saveState(){this._cameraUp0.copy(this._camera.up),this.getTarget(this._target0),this.getPosition(this._position0),this._zoom0=this._zoom,this._focalOffset0.copy(this._focalOffset)}updateCameraUp(){this._yAxisUpSpace.setFromUnitVectors(this._camera.up,xs),this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert()}applyCameraUp(){const t=Bt.subVectors(this._target,this._camera.position).normalize(),e=ee.crossVectors(t,this._camera.up);this._camera.up.crossVectors(e,t).normalize(),this._camera.updateMatrixWorld();const i=this.getPosition(Bt);this.updateCameraUp(),this.setPosition(i.x,i.y,i.z)}update(t){const e=this._sphericalEnd.theta-this._spherical.theta,i=this._sphericalEnd.phi-this._spherical.phi,r=this._sphericalEnd.radius-this._spherical.radius,s=Ic.subVectors(this._targetEnd,this._target),o=Oc.subVectors(this._focalOffsetEnd,this._focalOffset),a=this._zoomEnd-this._zoom;if(fe(e))this._thetaVelocity.value=0,this._spherical.theta=this._sphericalEnd.theta;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.theta=_s(this._spherical.theta,this._sphericalEnd.theta,this._thetaVelocity,u,1/0,t),this._needsUpdate=!0}if(fe(i))this._phiVelocity.value=0,this._spherical.phi=this._sphericalEnd.phi;else{const u=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.phi=_s(this._spherical.phi,this._sphericalEnd.phi,this._phiVelocity,u,1/0,t),this._needsUpdate=!0}if(fe(r))this._radiusVelocity.value=0,this._spherical.radius=this._sphericalEnd.radius;else{const u=this._isUserControllingDolly?this.draggingSmoothTime:this.smoothTime;this._spherical.radius=_s(this._spherical.radius,this._sphericalEnd.radius,this._radiusVelocity,u,this.maxSpeed,t),this._needsUpdate=!0}if(fe(s.x)&&fe(s.y)&&fe(s.z))this._targetVelocity.set(0,0,0),this._target.copy(this._targetEnd);else{const u=this._isUserControllingTruck?this.draggingSmoothTime:this.smoothTime;Dc(this._target,this._targetEnd,this._targetVelocity,u,this.maxSpeed,t,this._target),this._needsUpdate=!0}if(fe(o.x)&&fe(o.y)&&fe(o.z))this._focalOffsetVelocity.set(0,0,0),this._focalOffset.copy(this._focalOffsetEnd);else{const u=this._isUserControllingOffset?this.draggingSmoothTime:this.smoothTime;Dc(this._focalOffset,this._focalOffsetEnd,this._focalOffsetVelocity,u,this.maxSpeed,t,this._focalOffset),this._needsUpdate=!0}if(fe(a))this._zoomVelocity.value=0,this._zoom=this._zoomEnd;else{const u=this._isUserControllingZoom?this.draggingSmoothTime:this.smoothTime;this._zoom=_s(this._zoom,this._zoomEnd,this._zoomVelocity,u,1/0,t)}if(this.dollyToCursor){if(Ai(this._camera)&&this._changedDolly!==0){const u=this._spherical.radius-this._lastDistance,f=this._camera,d=this._getCameraDirection(zr),g=Bt.copy(d).cross(f.up).normalize();g.lengthSq()===0&&(g.x=1);const _=ee.crossVectors(g,d),m=this._sphericalEnd.radius*Math.tan(f.getEffectiveFOV()*Fr*.5),y=(this._sphericalEnd.radius-u-this._sphericalEnd.radius)/this._sphericalEnd.radius,M=tr.copy(this._targetEnd).add(g.multiplyScalar(this._dollyControlCoord.x*m*f.aspect)).add(_.multiplyScalar(this._dollyControlCoord.y*m)),E=Bt.copy(this._targetEnd).lerp(M,y),P=this._lastDollyDirection===Qi.IN&&this._spherical.radius<=this.minDistance,S=this._lastDollyDirection===Qi.OUT&&this.maxDistance<=this._spherical.radius;if(this.infinityDolly&&(P||S)){this._sphericalEnd.radius-=u,this._spherical.radius-=u;const U=ee.copy(d).multiplyScalar(-u);E.add(U)}this._boundary.clampPoint(E,E);const w=ee.subVectors(E,this._targetEnd);this._targetEnd.copy(E),this._target.add(w),this._changedDolly-=u,fe(this._changedDolly)&&(this._changedDolly=0)}else if(pi(this._camera)&&this._changedZoom!==0){const u=this._zoom-this._lastZoom,f=this._camera,d=Bt.set(this._dollyControlCoord.x,this._dollyControlCoord.y,(f.near+f.far)/(f.near-f.far)).unproject(f),g=ee.set(0,0,-1).applyQuaternion(f.quaternion),_=tr.copy(d).add(g.multiplyScalar(-d.dot(f.up))),p=-(this._zoom-u-this._zoom)/this._zoom,y=this._getCameraDirection(zr),M=this._targetEnd.dot(y),E=Bt.copy(this._targetEnd).lerp(_,p),P=E.dot(y),S=y.multiplyScalar(P-M);E.sub(S),this._boundary.clampPoint(E,E);const w=ee.subVectors(E,this._targetEnd);this._targetEnd.copy(E),this._target.add(w),this._changedZoom-=u,fe(this._changedZoom)&&(this._changedZoom=0)}}this._camera.zoom!==this._zoom&&(this._camera.zoom=this._zoom,this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0),this._dragNeedsUpdate=!0;const l=this._collisionTest();this._spherical.radius=Math.min(this._spherical.radius,l),this._spherical.makeSafe(),this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target),this._camera.lookAt(this._target),(!fe(this._focalOffset.x)||!fe(this._focalOffset.y)||!fe(this._focalOffset.z))&&(Dn.setFromMatrixColumn(this._camera.matrix,0),Un.setFromMatrixColumn(this._camera.matrix,1),Ci.setFromMatrixColumn(this._camera.matrix,2),Dn.multiplyScalar(this._focalOffset.x),Un.multiplyScalar(-this._focalOffset.y),Ci.multiplyScalar(this._focalOffset.z),Bt.copy(Dn).add(Un).add(Ci),this._camera.position.add(Bt),this._camera.updateMatrixWorld()),this._boundaryEnclosesCamera&&this._encloseToBoundary(this._camera.position.copy(this._target),Bt.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse),1);const h=this._needsUpdate;return h&&!this._updatedLastTime?(this._hasRested=!1,this.dispatchEvent({type:"wake"}),this.dispatchEvent({type:"update"})):h?(this.dispatchEvent({type:"update"}),fe(e,this.restThreshold)&&fe(i,this.restThreshold)&&fe(r,this.restThreshold)&&fe(s.x,this.restThreshold)&&fe(s.y,this.restThreshold)&&fe(s.z,this.restThreshold)&&fe(o.x,this.restThreshold)&&fe(o.y,this.restThreshold)&&fe(o.z,this.restThreshold)&&fe(a,this.restThreshold)&&!this._hasRested&&(this._hasRested=!0,this.dispatchEvent({type:"rest"}))):!h&&this._updatedLastTime&&this.dispatchEvent({type:"sleep"}),this._lastDistance=this._spherical.radius,this._lastZoom=this._zoom,this._updatedLastTime=h,this._needsUpdate=!1,h}toJSON(){return JSON.stringify({enabled:this._enabled,minDistance:this.minDistance,maxDistance:Nr(this.maxDistance),minZoom:this.minZoom,maxZoom:Nr(this.maxZoom),minPolarAngle:this.minPolarAngle,maxPolarAngle:Nr(this.maxPolarAngle),minAzimuthAngle:Nr(this.minAzimuthAngle),maxAzimuthAngle:Nr(this.maxAzimuthAngle),smoothTime:this.smoothTime,draggingSmoothTime:this.draggingSmoothTime,dollySpeed:this.dollySpeed,truckSpeed:this.truckSpeed,dollyToCursor:this.dollyToCursor,target:this._targetEnd.toArray(),position:Bt.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),zoom:this._zoomEnd,focalOffset:this._focalOffsetEnd.toArray(),target0:this._target0.toArray(),position0:this._position0.toArray(),zoom0:this._zoom0,focalOffset0:this._focalOffset0.toArray()})}fromJSON(t,e=!1){const i=JSON.parse(t);this.enabled=i.enabled,this.minDistance=i.minDistance,this.maxDistance=kr(i.maxDistance),this.minZoom=i.minZoom,this.maxZoom=kr(i.maxZoom),this.minPolarAngle=i.minPolarAngle,this.maxPolarAngle=kr(i.maxPolarAngle),this.minAzimuthAngle=kr(i.minAzimuthAngle),this.maxAzimuthAngle=kr(i.maxAzimuthAngle),this.smoothTime=i.smoothTime,this.draggingSmoothTime=i.draggingSmoothTime,this.dollySpeed=i.dollySpeed,this.truckSpeed=i.truckSpeed,this.dollyToCursor=i.dollyToCursor,this._target0.fromArray(i.target0),this._position0.fromArray(i.position0),this._zoom0=i.zoom0,this._focalOffset0.fromArray(i.focalOffset0),this.moveTo(i.target[0],i.target[1],i.target[2],e),un.setFromVector3(Bt.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)),this.rotateTo(un.theta,un.phi,e),this.dollyTo(un.radius,e),this.zoomTo(i.zoom,e),this.setFocalOffset(i.focalOffset[0],i.focalOffset[1],i.focalOffset[2],e),this._needsUpdate=!0}connect(t){if(this._domElement){console.warn("camera-controls is already connected.");return}t.setAttribute("data-camera-controls-version",Tp),this._addAllEventListeners(t),this._getClientRect(this._elementRect)}disconnect(){this.cancel(),this._removeAllEventListeners(),this._domElement&&(this._domElement.removeAttribute("data-camera-controls-version"),this._domElement=void 0)}dispose(){this.removeAllEventListeners(),this.disconnect()}_getTargetDirection(t){return t.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse)}_getCameraDirection(t){return this._getTargetDirection(t).negate()}_findPointerById(t){return this._activePointers.find(e=>e.pointerId===t)}_findPointerByMouseButton(t){return this._activePointers.find(e=>e.mouseButton===t)}_disposePointer(t){this._activePointers.splice(this._activePointers.indexOf(t),1)}_encloseToBoundary(t,e,i){const r=e.lengthSq();if(r===0)return t;const s=ee.copy(e).add(t),a=this._boundary.clampPoint(s,tr).sub(s),l=a.lengthSq();if(l===0)return t.add(e);if(l===r)return t;if(i===0)return t.add(e).add(a);{const c=1+i*l/e.dot(a);return t.add(ee.copy(e).multiplyScalar(c)).add(a.multiplyScalar(1-i))}}_updateNearPlaneCorners(){if(Ai(this._camera)){const t=this._camera,e=t.near,i=t.getEffectiveFOV()*Fr,r=Math.tan(i*.5)*e,s=r*t.aspect;this._nearPlaneCorners[0].set(-s,-r,0),this._nearPlaneCorners[1].set(s,-r,0),this._nearPlaneCorners[2].set(s,r,0),this._nearPlaneCorners[3].set(-s,r,0)}else if(pi(this._camera)){const t=this._camera,e=1/t.zoom,i=t.left*e,r=t.right*e,s=t.top*e,o=t.bottom*e;this._nearPlaneCorners[0].set(i,s,0),this._nearPlaneCorners[1].set(r,s,0),this._nearPlaneCorners[2].set(r,o,0),this._nearPlaneCorners[3].set(i,o,0)}}_collisionTest(){let t=1/0;if(!(this.colliderMeshes.length>=1)||Ho(this._camera,"_collisionTest"))return t;const i=this._getTargetDirection(zr);qo.lookAt(Uc,i,this._camera.up);for(let r=0;r<4;r++){const s=ee.copy(this._nearPlaneCorners[r]);s.applyMatrix4(qo);const o=tr.addVectors(this._target,s);ys.set(o,i),ys.far=this._spherical.radius+1;const a=ys.intersectObjects(this.colliderMeshes);a.length!==0&&a[0].distance<t&&(t=a[0].distance)}return t}_getClientRect(t){if(!this._domElement)return;const e=this._domElement.getBoundingClientRect();return t.x=e.left,t.y=e.top,this._viewport?(t.x+=this._viewport.x,t.y+=e.height-this._viewport.w-this._viewport.y,t.width=this._viewport.z,t.height=this._viewport.w):(t.width=e.width,t.height=e.height),t}_createOnRestPromise(t){return t?Promise.resolve():(this._hasRested=!1,this.dispatchEvent({type:"transitionstart"}),new Promise(e=>{const i=()=>{this.removeEventListener("rest",i),e()};this.addEventListener("rest",i)}))}_addAllEventListeners(t){}_removeAllEventListeners(){}get dampingFactor(){return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."),0}set dampingFactor(t){console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.")}get draggingDampingFactor(){return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."),0}set draggingDampingFactor(t){console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.")}static createBoundingSphere(t,e=new Ot.Sphere){const i=e,r=i.center;er.makeEmpty(),t.traverseVisible(o=>{o.isMesh&&er.expandByObject(o)}),er.getCenter(r);let s=0;return t.traverseVisible(o=>{if(!o.isMesh)return;const a=o;if(!a.geometry)return;const l=a.geometry.clone();l.applyMatrix4(a.matrixWorld);const h=l.attributes.position;for(let u=0,f=h.count;u<f;u++)Bt.fromBufferAttribute(h,u),s=Math.max(s,r.distanceToSquared(Bt))}),i.radius=Math.sqrt(s),i}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bl="177",Ap=0,kc=1,Cp=2,Vh=1,Rp=2,Zn=3,yi=0,Je=1,jn=2,Jn=0,xr=1,_o=2,zc=3,Bc=4,Gh=5,mi=100,Pp=101,Lp=102,Dp=103,Up=104,Ip=200,ka=201,Op=202,Fp=203,za=204,Ba=205,Np=206,kp=207,zp=208,Bp=209,Hp=210,Vp=211,Gp=212,Wp=213,Xp=214,Ha=0,Va=1,Ga=2,br=3,Wa=4,Xa=5,qa=6,Ya=7,Wh=0,qp=1,Yp=2,xi=0,Xh=1,qh=2,Yh=3,Hl=4,$h=5,Zh=6,jh=7,Kh=300,Tr=301,wr=302,$a=303,Za=304,wo=306,ja=1e3,Bi=1001,Ka=1002,Xe=1003,$p=1004,Ss=1005,Nn=1006,Yo=1007,Hi=1008,ii=1009,Qh=1010,Jh=1011,es=1012,Vl=1013,Xi=1014,An=1015,ti=1016,Gl=1017,Wl=1018,ns=1020,td=35902,ed=1021,nd=1022,sn=1023,is=1026,rs=1027,id=1028,Xl=1029,rd=1030,ql=1031,Yl=1033,io=33776,ro=33777,so=33778,oo=33779,Qa=35840,Ja=35841,tl=35842,el=35843,nl=36196,il=37492,rl=37496,sl=37808,ol=37809,al=37810,ll=37811,cl=37812,ul=37813,hl=37814,dl=37815,fl=37816,pl=37817,ml=37818,gl=37819,_l=37820,vl=37821,ao=36492,xl=36494,yl=36495,sd=36283,Sl=36284,Ml=36285,El=36286,Zp=3200,jp=3201,Kp=0,Qp=1,gi="",fn="srgb",Ar="srgb-linear",vo="linear",ae="srgb",nr=7680,Hc=519,Jp=512,tm=513,em=514,od=515,nm=516,im=517,rm=518,sm=519,bl=35044,om=35048,Vc="300 es",Qn=2e3,xo=2001;class Lr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Gc=1234567;const jr=Math.PI/180,ss=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]).toLowerCase()}function Vt(n,t,e){return Math.max(t,Math.min(e,n))}function $l(n,t){return(n%t+t)%t}function am(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function lm(n,t,e){return n!==t?(e-n)/(t-n):0}function Kr(n,t,e){return(1-e)*n+e*t}function cm(n,t,e,i){return Kr(n,t,1-Math.exp(-e*i))}function um(n,t=1){return t-Math.abs($l(n,t*2)-t)}function hm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function dm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function fm(n,t){return n+Math.floor(Math.random()*(t-n+1))}function pm(n,t){return n+Math.random()*(t-n)}function mm(n){return n*(.5-Math.random())}function gm(n){n!==void 0&&(Gc=n);let t=Gc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function _m(n){return n*jr}function vm(n){return n*ss}function xm(n){return(n&n-1)===0&&n!==0}function ym(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Sm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Mm(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),h=o((t+i)/2),u=s((t-i)/2),f=o((t-i)/2),d=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":n.set(a*h,l*u,l*f,a*c);break;case"YZY":n.set(l*f,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*f,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Tn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function le(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Em={DEG2RAD:jr,RAD2DEG:ss,generateUUID:ei,clamp:Vt,euclideanModulo:$l,mapLinear:am,inverseLerp:lm,lerp:Kr,damp:cm,pingpong:um,smoothstep:hm,smootherstep:dm,randInt:fm,randFloat:pm,randFloatSpread:mm,seededRandom:gm,degToRad:_m,radToDeg:vm,isPowerOfTwo:xm,ceilPowerOfTwo:ym,floorPowerOfTwo:Sm,setQuaternionFromProperEuler:Mm,normalize:le,denormalize:Tn};class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Vt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let m=1-a;const p=l*f+c*d+h*g+u*_,y=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const P=Math.sqrt(M),S=Math.atan2(P,p*y);m=Math.sin(m*S)/P,a=Math.sin(a*S)/P}const E=a*y;if(l=l*m+f*E,c=c*m+d*E,h=h*m+g*E,u=u*m+_*E,m===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),f=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,i=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),h=2*(a*e-s*r),u=2*(s*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return $o.copy(this).projectOnVector(t),this.sub($o)}reflect(t){return this.sub($o.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Vt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $o=new N,Wc=new Dr;class Ht{constructor(t,e,i,r,s,o,a,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],y=r[1],M=r[4],E=r[7],P=r[2],S=r[5],w=r[8];return s[0]=o*_+a*y+l*P,s[3]=o*m+a*M+l*S,s[6]=o*p+a*E+l*w,s[1]=c*_+h*y+u*P,s[4]=c*m+h*M+u*S,s[7]=c*p+h*E+u*w,s[2]=f*_+d*y+g*P,s[5]=f*m+d*M+g*S,s[8]=f*p+d*E+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*s,d=c*s-o*l,g=e*u+i*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*c-h*i)*_,t[2]=(a*i-r*o)*_,t[3]=f*_,t[4]=(h*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Zo.makeScale(t,e)),this}rotate(t){return this.premultiply(Zo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Zo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Zo=new Ht;function ad(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function yo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function bm(){const n=yo("canvas");return n.style.display="block",n}const Xc={};function yr(n){n in Xc||(Xc[n]=!0,console.warn(n))}function Tm(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function wm(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Am(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cm(){const n={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ae&&(r.r=ni(r.r),r.g=ni(r.g),r.b=ni(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ae&&(r.r=Sr(r.r),r.g=Sr(r.g),r.b=Sr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===gi?vo:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return yr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return yr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ar]:{primaries:t,whitePoint:i,transfer:vo,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}}),n}const Jt=Cm();function ni(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Sr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ir;class Rm{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ir===void 0&&(ir=yo("canvas")),ir.width=t.width,ir.height=t.height;const r=ir.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=ir}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=yo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ni(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ni(e[i]/255)*255):e[i]=ni(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Pm=0;class Zl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=ei(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(jo(r[o].image)):s.push(jo(r[o]))}else s=jo(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function jo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Rm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Lm=0;const Ko=new N;class qe extends Lr{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,i=Bi,r=Bi,s=Nn,o=Hi,a=sn,l=ii,c=qe.DEFAULT_ANISOTROPY,h=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=ei(),this.name="",this.source=new Zl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ko).x}get height(){return this.source.getSize(Ko).y}get depth(){return this.source.getSize(Ko).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ja:t.x=t.x-Math.floor(t.x);break;case Bi:t.x=t.x<0?0:1;break;case Ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ja:t.y=t.y-Math.floor(t.y);break;case Bi:t.y=t.y<0?0:1;break;case Ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=Kh;qe.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,i=0,r=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,E=(d+1)/2,P=(p+1)/2,S=(h+f)/4,w=(u+_)/4,U=(g+m)/4;return M>E&&M>P?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=S/i,s=w/i):E>P?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=S/r,s=U/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=w/s,r=U/s),this.set(i,r,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Dm extends Lr{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new qe(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Nn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Zl(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends Dm{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ld extends qe{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Um extends qe{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class si{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,yn):yn.fromBufferAttribute(s,o),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ms.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ms.copy(i.boundingBox)),Ms.applyMatrix4(t.matrixWorld),this.union(Ms)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hr),Es.subVectors(this.max,Hr),rr.subVectors(t.a,Hr),sr.subVectors(t.b,Hr),or.subVectors(t.c,Hr),ai.subVectors(sr,rr),li.subVectors(or,sr),Ri.subVectors(rr,or);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Ri.z,Ri.y,ai.z,0,-ai.x,li.z,0,-li.x,Ri.z,0,-Ri.x,-ai.y,ai.x,0,-li.y,li.x,0,-Ri.y,Ri.x,0];return!Qo(e,rr,sr,or,Es)||(e=[1,0,0,0,1,0,0,0,1],!Qo(e,rr,sr,or,Es))?!1:(bs.crossVectors(ai,li),e=[bs.x,bs.y,bs.z],Qo(e,rr,sr,or,Es))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Gn=[new N,new N,new N,new N,new N,new N,new N,new N],yn=new N,Ms=new si,rr=new N,sr=new N,or=new N,ai=new N,li=new N,Ri=new N,Hr=new N,Es=new N,bs=new N,Pi=new N;function Qo(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Pi.fromArray(n,s);const a=r.x*Math.abs(Pi.x)+r.y*Math.abs(Pi.y)+r.z*Math.abs(Pi.z),l=t.dot(Pi),c=e.dot(Pi),h=i.dot(Pi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Im=new si,Vr=new N,Jo=new N;class Ei{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Im.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vr.subVectors(t,this.center);const e=Vr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Vr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vr.copy(t.center).add(Jo)),this.expandByPoint(Vr.copy(t.center).sub(Jo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Wn=new N,ta=new N,Ts=new N,ci=new N,ea=new N,ws=new N,na=new N;class jl{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){ta.copy(t).add(e).multiplyScalar(.5),Ts.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(ta);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Ts),a=ci.dot(this.direction),l=-ci.dot(Ts),c=ci.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ta).addScaledVector(Ts,f),d}intersectSphere(t,e){Wn.subVectors(t.center,this.origin);const i=Wn.dot(this.direction),r=Wn.dot(Wn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,i,r,s){ea.subVectors(e,t),ws.subVectors(i,t),na.crossVectors(ea,ws);let o=this.direction.dot(na),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,t);const l=a*this.direction.dot(ws.crossVectors(ci,ws));if(l<0)return null;const c=a*this.direction.dot(ea.cross(ci));if(c<0||l+c>o)return null;const h=-a*ci.dot(na);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,m)}set(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/ar.setFromMatrixColumn(t,0).length(),s=1/ar.setFromMatrixColumn(t,1).length(),o=1/ar.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Om,t,Fm)}lookAt(t,e,i){const r=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ui.crossVectors(i,nn),ui.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ui.crossVectors(i,nn)),ui.normalize(),As.crossVectors(nn,ui),r[0]=ui.x,r[4]=As.x,r[8]=nn.x,r[1]=ui.y,r[5]=As.y,r[9]=nn.y,r[2]=ui.z,r[6]=As.z,r[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],y=i[3],M=i[7],E=i[11],P=i[15],S=r[0],w=r[4],U=r[8],T=r[12],x=r[1],C=r[5],O=r[9],z=r[13],X=r[2],W=r[6],K=r[10],J=r[14],Z=r[3],at=r[7],R=r[11],_t=r[15];return s[0]=o*S+a*x+l*X+c*Z,s[4]=o*w+a*C+l*W+c*at,s[8]=o*U+a*O+l*K+c*R,s[12]=o*T+a*z+l*J+c*_t,s[1]=h*S+u*x+f*X+d*Z,s[5]=h*w+u*C+f*W+d*at,s[9]=h*U+u*O+f*K+d*R,s[13]=h*T+u*z+f*J+d*_t,s[2]=g*S+_*x+m*X+p*Z,s[6]=g*w+_*C+m*W+p*at,s[10]=g*U+_*O+m*K+p*R,s[14]=g*T+_*z+m*J+p*_t,s[3]=y*S+M*x+E*X+P*Z,s[7]=y*w+M*C+E*W+P*at,s[11]=y*U+M*O+E*K+P*R,s[15]=y*T+M*z+E*J+P*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*l*u-r*c*u-s*a*f+i*c*f+r*a*d-i*l*d)+_*(+e*l*d-e*c*f+s*o*f-r*o*d+r*c*h-s*l*h)+m*(+e*c*u-e*a*d-s*o*u+i*o*d+s*a*h-i*c*h)+p*(-r*a*h-e*l*u+e*a*f+r*o*u-i*o*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=u*m*c-_*f*c+_*l*d-a*m*d-u*l*p+a*f*p,M=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,E=h*_*c-g*u*c+g*a*d-o*_*d-h*a*p+o*u*p,P=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,S=e*y+i*M+r*E+s*P;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/S;return t[0]=y*w,t[1]=(_*f*s-u*m*s-_*r*d+i*m*d+u*r*p-i*f*p)*w,t[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*p+i*l*p)*w,t[3]=(u*l*s-a*f*s-u*r*c+i*f*c+a*r*d-i*l*d)*w,t[4]=M*w,t[5]=(h*m*s-g*f*s+g*r*d-e*m*d-h*r*p+e*f*p)*w,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*p-e*l*p)*w,t[7]=(o*f*s-h*l*s+h*r*c-e*f*c-o*r*d+e*l*d)*w,t[8]=E*w,t[9]=(g*u*s-h*_*s-g*i*d+e*_*d+h*i*p-e*u*p)*w,t[10]=(o*_*s-g*a*s+g*i*c-e*_*c-o*i*p+e*a*p)*w,t[11]=(h*a*s-o*u*s-h*i*c+e*u*c+o*i*d-e*a*d)*w,t[12]=P*w,t[13]=(h*_*r-g*u*r+g*i*f-e*_*f-h*i*m+e*u*m)*w,t[14]=(g*a*r-o*_*r-g*i*l+e*_*l+o*i*m-e*a*m)*w,t[15]=(o*u*r-h*a*r+h*i*l-e*u*l-o*i*f+e*a*f)*w,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,f=s*c,d=s*h,g=s*u,_=o*h,m=o*u,p=a*u,y=l*c,M=l*h,E=l*u,P=i.x,S=i.y,w=i.z;return r[0]=(1-(_+p))*P,r[1]=(d+E)*P,r[2]=(g-M)*P,r[3]=0,r[4]=(d-E)*S,r[5]=(1-(f+p))*S,r[6]=(m+y)*S,r[7]=0,r[8]=(g+M)*w,r[9]=(m-y)*w,r[10]=(1-(f+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=ar.set(r[0],r[1],r[2]).length();const o=ar.set(r[4],r[5],r[6]).length(),a=ar.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Sn.copy(this);const c=1/s,h=1/o,u=1/a;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,e.setFromRotationMatrix(Sn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Qn){const l=this.elements,c=2*s/(e-t),h=2*s/(i-r),u=(e+t)/(e-t),f=(i+r)/(i-r);let d,g;if(a===Qn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===xo)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Qn){const l=this.elements,c=1/(e-t),h=1/(i-r),u=1/(o-s),f=(e+t)*c,d=(i+r)*h;let g,_;if(a===Qn)g=(o+s)*u,_=-2*u;else if(a===xo)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ar=new N,Sn=new pe,Om=new N(0,0,0),Fm=new N(1,1,1),ui=new N,As=new N,nn=new N,$c=new pe,Zc=new Dr;class ri{constructor(t=0,e=0,i=0,r=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return $c.makeRotationFromQuaternion(t),this.setFromRotationMatrix($c,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class Kl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Nm=0;const jc=new N,lr=new Dr,Xn=new pe,Cs=new N,Gr=new N,km=new N,zm=new Dr,Kc=new N(1,0,0),Qc=new N(0,1,0),Jc=new N(0,0,1),tu={type:"added"},Bm={type:"removed"},cr={type:"childadded",child:null},ia={type:"childremoved",child:null};class tn extends Lr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const t=new N,e=new ri,i=new Dr,r=new N(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pe},normalMatrix:{value:new Ht}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return lr.setFromAxisAngle(t,e),this.quaternion.multiply(lr),this}rotateOnWorldAxis(t,e){return lr.setFromAxisAngle(t,e),this.quaternion.premultiply(lr),this}rotateX(t){return this.rotateOnAxis(Kc,t)}rotateY(t){return this.rotateOnAxis(Qc,t)}rotateZ(t){return this.rotateOnAxis(Jc,t)}translateOnAxis(t,e){return jc.copy(t).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kc,t)}translateY(t){return this.translateOnAxis(Qc,t)}translateZ(t){return this.translateOnAxis(Jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Cs.copy(t):Cs.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Gr,Cs,this.up):Xn.lookAt(Cs,Gr,this.up),this.quaternion.setFromRotationMatrix(Xn),r&&(Xn.extractRotation(r.matrixWorld),lr.setFromRotationMatrix(Xn),this.quaternion.premultiply(lr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tu),cr.child=t,this.dispatchEvent(cr),cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bm),ia.child=t,this.dispatchEvent(ia),ia.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tu),cr.child=t,this.dispatchEvent(cr),cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,t,km),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,zm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}tn.DEFAULT_UP=new N(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new N,qn=new N,ra=new N,Yn=new N,ur=new N,hr=new N,eu=new N,sa=new N,oa=new N,aa=new N,la=new ue,ca=new ue,ua=new ue;class wn{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Mn.subVectors(t,e),r.cross(Mn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Mn.subVectors(r,e),qn.subVectors(i,e),ra.subVectors(t,e);const o=Mn.dot(Mn),a=Mn.dot(qn),l=Mn.dot(ra),c=qn.dot(qn),h=qn.dot(ra),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Yn.x),l.addScaledVector(o,Yn.y),l.addScaledVector(a,Yn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return la.setScalar(0),ca.setScalar(0),ua.setScalar(0),la.fromBufferAttribute(t,e),ca.fromBufferAttribute(t,i),ua.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(la,s.x),o.addScaledVector(ca,s.y),o.addScaledVector(ua,s.z),o}static isFrontFacing(t,e,i,r){return Mn.subVectors(i,e),qn.subVectors(t,e),Mn.cross(qn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),Mn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return wn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;ur.subVectors(r,i),hr.subVectors(s,i),sa.subVectors(t,i);const l=ur.dot(sa),c=hr.dot(sa);if(l<=0&&c<=0)return e.copy(i);oa.subVectors(t,r);const h=ur.dot(oa),u=hr.dot(oa);if(h>=0&&u<=h)return e.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(ur,o);aa.subVectors(t,s);const d=ur.dot(aa),g=hr.dot(aa);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(hr,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return eu.subVectors(s,r),a=(u-h)/(u-h+(d-g)),e.copy(r).addScaledVector(eu,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(i).addScaledVector(ur,o).addScaledVector(hr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function ha(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=Jt.workingColorSpace){if(t=$l(t,1),e=Vt(e,0,1),i=Vt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=ha(o,s,t+1/3),this.g=ha(o,s,t),this.b=ha(o,s,t-1/3)}return Jt.colorSpaceToWorking(this,r),this}setStyle(t,e=fn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fn){const i=cd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=Sr(t.r),this.g=Sr(t.g),this.b=Sr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fn){return Jt.workingToColorSpace(ze.copy(this),t),Math.round(Vt(ze.r*255,0,255))*65536+Math.round(Vt(ze.g*255,0,255))*256+Math.round(Vt(ze.b*255,0,255))}getHexString(t=fn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(ze.copy(this),e);const i=ze.r,r=ze.g,s=ze.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=fn){Jt.workingToColorSpace(ze.copy(this),t);const e=ze.r,i=ze.g,r=ze.b;return t!==fn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(hi),this.setHSL(hi.h+t,hi.s+e,hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(hi),t.getHSL(Rs);const i=Kr(hi.h,Rs.h,e),r=Kr(hi.s,Rs.s,e),s=Kr(hi.l,Rs.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new jt;jt.NAMES=cd;let Hm=0;class ls extends Lr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hm++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=xr,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=za,this.blendDst=Ba,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nr,this.stencilZFail=nr,this.stencilZPass=nr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==xr&&(i.blending=this.blending),this.side!==yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==za&&(i.blendSrc=this.blendSrc),this.blendDst!==Ba&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==br&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==nr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==nr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==nr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ql extends ls{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=Wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new N,Ps=new zt;let Vm=0;class Me{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=bl,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ps.fromBufferAttribute(this,e),Ps.applyMatrix3(t),this.setXY(e,Ps.x,Ps.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Tn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Tn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Tn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Tn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Tn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==bl&&(t.usage=this.usage),t}}class ud extends Me{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class hd extends Me{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class gn extends Me{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Gm=0;const hn=new pe,da=new tn,dr=new N,rn=new si,Wr=new si,Le=new N;class an extends Lr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ad(t)?hd:ud)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ht().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,i){return hn.makeTranslation(t,e,i),this.applyMatrix4(hn),this}scale(t,e,i){return hn.makeScale(t,e,i),this.applyMatrix4(hn),this}lookAt(t){return da.lookAt(t),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gn(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ei);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Wr.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(rn.min,Wr.min),rn.expandByPoint(Le),Le.addVectors(rn.max,Wr.max),rn.expandByPoint(Le)):(rn.expandByPoint(Wr.min),rn.expandByPoint(Wr.max))}rn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Le.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Le));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Le.fromBufferAttribute(a,c),l&&(dr.fromBufferAttribute(t,c),Le.add(dr)),r=Math.max(r,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new N,l[U]=new N;const c=new N,h=new N,u=new N,f=new zt,d=new zt,g=new zt,_=new N,m=new N;function p(U,T,x){c.fromBufferAttribute(i,U),h.fromBufferAttribute(i,T),u.fromBufferAttribute(i,x),f.fromBufferAttribute(s,U),d.fromBufferAttribute(s,T),g.fromBufferAttribute(s,x),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(C),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),a[U].add(_),a[T].add(_),a[x].add(_),l[U].add(m),l[T].add(m),l[x].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let U=0,T=y.length;U<T;++U){const x=y[U],C=x.start,O=x.count;for(let z=C,X=C+O;z<X;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new N,E=new N,P=new N,S=new N;function w(U){P.fromBufferAttribute(r,U),S.copy(P);const T=a[U];M.copy(T),M.sub(P.multiplyScalar(P.dot(T))).normalize(),E.crossVectors(S,T);const C=E.dot(l[U])<0?-1:1;o.setXYZW(U,M.x,M.y,M.z,C)}for(let U=0,T=y.length;U<T;++U){const x=y[U],C=x.start,O=x.count;for(let z=C,X=C+O;z<X;z+=3)w(t.getX(z+0)),w(t.getX(z+1)),w(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Me(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new an,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nu=new pe,Li=new jl,Ls=new Ei,iu=new N,Ds=new N,Us=new N,Is=new N,fa=new N,Os=new N,ru=new N,Fs=new N;class Cn extends tn{constructor(t=new an,e=new Ql){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Os.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(fa.fromBufferAttribute(u,t),o?Os.addScaledVector(fa,h):Os.addScaledVector(fa.sub(e),h))}e.add(Os)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(s),Li.copy(t.ray).recast(t.near),!(Ls.containsPoint(Li.origin)===!1&&(Li.intersectSphere(Ls,iu)===null||Li.origin.distanceToSquared(iu)>(t.far-t.near)**2))&&(nu.copy(s).invert(),Li.copy(t.ray).applyMatrix4(nu),!(i.boundingBox!==null&&Li.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Li)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let E=y,P=M;E<P;E+=3){const S=a.getX(E),w=a.getX(E+1),U=a.getX(E+2);r=Ns(this,p,t,i,c,h,u,S,w,U),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const y=a.getX(m),M=a.getX(m+1),E=a.getX(m+2);r=Ns(this,o,t,i,c,h,u,y,M,E),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let E=y,P=M;E<P;E+=3){const S=E,w=E+1,U=E+2;r=Ns(this,p,t,i,c,h,u,S,w,U),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const y=m,M=m+1,E=m+2;r=Ns(this,o,t,i,c,h,u,y,M,E),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Wm(n,t,e,i,r,s,o,a){let l;if(t.side===Je?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===yi,a),l===null)return null;Fs.copy(a),Fs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Fs);return c<e.near||c>e.far?null:{distance:c,point:Fs.clone(),object:n}}function Ns(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Ds),n.getVertexPosition(l,Us),n.getVertexPosition(c,Is);const h=Wm(n,t,e,i,Ds,Us,Is,ru);if(h){const u=new N;wn.getBarycoord(ru,Ds,Us,Is,u),r&&(h.uv=wn.getInterpolatedAttribute(r,a,l,c,u,new zt)),s&&(h.uv1=wn.getInterpolatedAttribute(s,a,l,c,u,new zt)),o&&(h.normal=wn.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};wn.getNormal(Ds,Us,Is,f.normal),h.face=f,h.barycoord=u}return h}class cs extends an{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new gn(c,3)),this.setAttribute("normal",new gn(h,3)),this.setAttribute("uv",new gn(u,2));function g(_,m,p,y,M,E,P,S,w,U,T){const x=E/w,C=P/U,O=E/2,z=P/2,X=S/2,W=w+1,K=U+1;let J=0,Z=0;const at=new N;for(let R=0;R<K;R++){const _t=R*C-z;for(let Ut=0;Ut<W;Ut++){const I=Ut*x-O;at[_]=I*y,at[m]=_t*M,at[p]=X,c.push(at.x,at.y,at.z),at[_]=0,at[m]=0,at[p]=S>0?1:-1,h.push(at.x,at.y,at.z),u.push(Ut/w),u.push(1-R/U),J+=1}}for(let R=0;R<U;R++)for(let _t=0;_t<w;_t++){const Ut=f+_t+W*R,I=f+_t+W*(R+1),Q=f+(_t+1)+W*(R+1),lt=f+(_t+1)+W*R;l.push(Ut,I,lt),l.push(I,Q,lt),Z+=6}a.addGroup(d,Z,T),d+=Z,f+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Cr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Ve(n){const t={};for(let e=0;e<n.length;e++){const i=Cr(n[e]);for(const r in i)t[r]=i[r]}return t}function Xm(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function dd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const qi={clone:Cr,merge:Ve};var qm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ym=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class De extends ls{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qm,this.fragmentShader=Ym,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Cr(t.uniforms),this.uniformsGroups=Xm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class fd extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const di=new N,su=new zt,ou=new zt;class pn extends fd{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ss*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(di.x,di.y).multiplyScalar(-t/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(di.x,di.y).multiplyScalar(-t/di.z)}getViewSize(t,e){return this.getViewBounds(t,su,ou),e.subVectors(ou,su)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(jr*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const fr=-90,pr=1;class $m extends tn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new pn(fr,pr,t,e);r.layers=this.layers,this.add(r);const s=new pn(fr,pr,t,e);s.layers=this.layers,this.add(s);const o=new pn(fr,pr,t,e);o.layers=this.layers,this.add(o);const a=new pn(fr,pr,t,e);a.layers=this.layers,this.add(a);const l=new pn(fr,pr,t,e);l.layers=this.layers,this.add(l);const c=new pn(fr,pr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===xo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class pd extends qe{constructor(t=[],e=Tr,i,r,s,o,a,l,c,h){super(t,e,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zm extends Pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new pd(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new cs(5,5,5),s=new De({name:"CubemapFromEquirect",uniforms:Cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Je,blending:Jn});s.uniforms.tEquirect.value=e;const o=new Cn(r,s),a=e.minFilter;return e.minFilter===Hi&&(e.minFilter=Nn),new $m(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class Vi extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jm={type:"move"};class pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(jm)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Vi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Km extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Qm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=bl,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const He=new N;class _i{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Tn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=le(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Tn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Tn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Tn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Tn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),i=le(i,this.array),r=le(r,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new _i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class md extends qe{constructor(t=null,e=1,i=1,r,s,o,a,l,c=Xe,h=Xe,u,f){super(null,o,a,l,c,h,r,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ma=new N,Jm=new N,tg=new Ht;class Fi{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=ma.subVectors(i,e).cross(Jm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ma),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||tg.getNormalMatrix(t),r=this.coplanarPoint(ma).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new Ei,ks=new N;class Jl{constructor(t=new Fi,e=new Fi,i=new Fi,r=new Fi,s=new Fi,o=new Fi){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Qn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],f=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],y=r[13],M=r[14],E=r[15];if(i[0].setComponents(l-s,f-c,m-d,E-p).normalize(),i[1].setComponents(l+s,f+c,m+d,E+p).normalize(),i[2].setComponents(l+o,f+h,m+g,E+y).normalize(),i[3].setComponents(l-o,f-h,m-g,E-y).normalize(),i[4].setComponents(l-a,f-u,m-_,E-M).normalize(),e===Qn)i[5].setComponents(l+a,f+u,m+_,E+M).normalize();else if(e===xo)i[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(t){return Di.center.set(0,0,0),Di.radius=.7071067811865476,Di.applyMatrix4(t.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(ks.x=r.normal.x>0?t.max.x:t.min.x,ks.y=r.normal.y>0?t.max.y:t.min.y,ks.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class eg extends ls{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const au=new pe,Tl=new jl,zs=new Ei,Bs=new N;class lu extends tn{constructor(t=new an,e=new eg){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(r),zs.radius+=s,t.ray.intersectsSphere(zs)===!1)return;au.copy(r).invert(),Tl.copy(t.ray).applyMatrix4(au);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=c.getX(g);Bs.fromBufferAttribute(u,m),cu(Bs,m,l,r,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)Bs.fromBufferAttribute(u,g),cu(Bs,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function cu(n,t,e,i,r,s,o){const a=Tl.distanceSqToPoint(n);if(a<e){const l=new N;Tl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class gd extends qe{constructor(t,e,i=Xi,r,s,o,a=Xe,l=Xe,c,h=is,u=1){if(h!==is&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Zl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class ng{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,d=(o-h)/f;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new zt:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new N,r=[],s=[],o=[],a=new N,l=new pe;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Vt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(Vt(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function ig(n,t){const e=1-n;return e*e*t}function rg(n,t){return 2*(1-n)*n*t}function sg(n,t){return n*n*t}function ga(n,t,e,i){return ig(n,t)+rg(n,e)+sg(n,i)}class og extends ng{constructor(t=new N,e=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new N){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(ga(t,r.x,s.x,o.x),ga(t,r.y,s.y,o.y),ga(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ao extends an{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const y=p*f-o;for(let M=0;M<c;M++){const E=M*u-s;g.push(E,-y,0),_.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const M=y+c*p,E=y+c*(p+1),P=y+1+c*(p+1),S=y+1+c*p;d.push(M,E,S),d.push(E,P,S)}this.setIndex(d),this.setAttribute("position",new gn(g,3)),this.setAttribute("normal",new gn(_,3)),this.setAttribute("uv",new gn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.width,t.height,t.widthSegments,t.heightSegments)}}class ag extends an{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,r=new N,s=new N;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],f=u.start,d=u.count;for(let g=f,_=f+d;g<_;g+=3)for(let m=0;m<3;m++){const p=a.getX(g+m),y=a.getX(g+(m+1)%3);r.fromBufferAttribute(o,p),s.fromBufferAttribute(o,y),uu(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;r.fromBufferAttribute(o,h),s.fromBufferAttribute(o,u),uu(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new gn(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function uu(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(r)===!0?!1:(e.add(i),e.add(r),!0)}class lg extends De{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class cg extends ls{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ug extends ls{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class _d extends fd{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class hg extends an{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class dg extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class vd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=hu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=hu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function hu(){return performance.now()}class wl extends Qm{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const du=new pe;class fg{constructor(t,e,i=0,r=1/0){this.ray=new jl(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new Kl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return du.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(du),this}intersectObject(t,e=!0,i=[]){return Al(t,this,i,e),i.sort(fu),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)Al(t[r],this,i,e);return i.sort(fu),i}}function fu(n,t){return n.distance-t.distance}function Al(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Al(s[o],t,e,!0)}}class pg{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Vt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Vt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const pu=new N,Hs=new N;class mg{constructor(t=new N,e=new N){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){pu.subVectors(t,this.start),Hs.subVectors(this.end,this.start);const i=Hs.dot(Hs);let s=Hs.dot(pu)/i;return e&&(s=Vt(s,0,1)),s}closestPointToPoint(t,e,i){const r=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function mu(n,t,e,i){const r=gg(i);switch(e){case ed:return n*t;case id:return n*t/r.components*r.byteLength;case Xl:return n*t/r.components*r.byteLength;case rd:return n*t*2/r.components*r.byteLength;case ql:return n*t*2/r.components*r.byteLength;case nd:return n*t*3/r.components*r.byteLength;case sn:return n*t*4/r.components*r.byteLength;case Yl:return n*t*4/r.components*r.byteLength;case io:case ro:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case so:case oo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ja:case el:return Math.max(n,16)*Math.max(t,8)/4;case Qa:case tl:return Math.max(n,8)*Math.max(t,8)/2;case nl:case il:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case rl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ol:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ll:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case cl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ul:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case hl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case dl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case fl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case pl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ml:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case gl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case _l:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case vl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ao:case xl:case yl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case sd:case Sl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ml:case El:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function gg(n){switch(n){case ii:case Qh:return{byteLength:1,components:1};case es:case Jh:case ti:return{byteLength:2,components:1};case Gl:case Wl:return{byteLength:2,components:4};case Xi:case Vl:case An:return{byteLength:4,components:1};case td:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xd(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function _g(n){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var vg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xg=`#ifdef USE_ALPHAHASH
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
#endif`,yg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Eg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bg=`#ifdef USE_AOMAP
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
#endif`,Tg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wg=`#ifdef USE_BATCHING
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
#endif`,Ag=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Lg=`#ifdef USE_IRIDESCENCE
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
#endif`,Dg=`#ifdef USE_BUMPMAP
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
#endif`,Ug=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ng=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Hg=`#define PI 3.141592653589793
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
} // validated`,Vg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gg=`vec3 transformedNormal = objectNormal;
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
#endif`,Wg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$g="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jg=`#ifdef USE_ENVMAP
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
#endif`,Kg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qg=`#ifdef USE_ENVMAP
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
#endif`,Jg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,t_=`#ifdef USE_ENVMAP
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
#endif`,e_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,n_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,i_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,r_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s_=`#ifdef USE_GRADIENTMAP
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
}`,o_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,a_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c_=`uniform bool receiveShadow;
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
#endif`,u_=`#ifdef USE_ENVMAP
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
#endif`,h_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,d_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,f_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,p_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,m_=`PhysicalMaterial material;
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
#endif`,g_=`struct PhysicalMaterial {
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
}`,__=`
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
#endif`,v_=`#if defined( RE_IndirectDiffuse )
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
#endif`,x_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,y_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,S_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,b_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,T_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,w_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,A_=`#if defined( USE_POINTS_UV )
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
#endif`,C_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,R_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,P_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,L_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,D_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U_=`#ifdef USE_MORPHTARGETS
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
#endif`,I_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,F_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,N_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,B_=`#ifdef USE_NORMALMAP
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
#endif`,H_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,V_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,G_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,W_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,X_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Y_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Z_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,j_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Q_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,t0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,n0=`float getShadowMask() {
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
}`,i0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,r0=`#ifdef USE_SKINNING
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
#endif`,s0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,o0=`#ifdef USE_SKINNING
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
#endif`,a0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,l0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,u0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,h0=`#ifdef USE_TRANSMISSION
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
#endif`,d0=`#ifdef USE_TRANSMISSION
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
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,g0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,v0=`uniform sampler2D t2D;
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
}`,x0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,M0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`#include <common>
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
}`,b0=`#if DEPTH_PACKING == 3200
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
}`,T0=`#define DISTANCE
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
}`,w0=`#define DISTANCE
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
}`,A0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,C0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`uniform float scale;
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
}`,P0=`uniform vec3 diffuse;
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
}`,L0=`#include <common>
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
}`,D0=`uniform vec3 diffuse;
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
}`,U0=`#define LAMBERT
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
}`,I0=`#define LAMBERT
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
}`,O0=`#define MATCAP
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
}`,F0=`#define MATCAP
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
}`,N0=`#define NORMAL
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
}`,k0=`#define NORMAL
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
}`,z0=`#define PHONG
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
}`,B0=`#define PHONG
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
}`,H0=`#define STANDARD
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
}`,V0=`#define STANDARD
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
}`,G0=`#define TOON
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
}`,W0=`#define TOON
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
}`,X0=`uniform float size;
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
}`,q0=`uniform vec3 diffuse;
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
}`,Y0=`#include <common>
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
}`,$0=`uniform vec3 color;
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
}`,Z0=`uniform float rotation;
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
}`,j0=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:vg,alphahash_pars_fragment:xg,alphamap_fragment:yg,alphamap_pars_fragment:Sg,alphatest_fragment:Mg,alphatest_pars_fragment:Eg,aomap_fragment:bg,aomap_pars_fragment:Tg,batching_pars_vertex:wg,batching_vertex:Ag,begin_vertex:Cg,beginnormal_vertex:Rg,bsdfs:Pg,iridescence_fragment:Lg,bumpmap_pars_fragment:Dg,clipping_planes_fragment:Ug,clipping_planes_pars_fragment:Ig,clipping_planes_pars_vertex:Og,clipping_planes_vertex:Fg,color_fragment:Ng,color_pars_fragment:kg,color_pars_vertex:zg,color_vertex:Bg,common:Hg,cube_uv_reflection_fragment:Vg,defaultnormal_vertex:Gg,displacementmap_pars_vertex:Wg,displacementmap_vertex:Xg,emissivemap_fragment:qg,emissivemap_pars_fragment:Yg,colorspace_fragment:$g,colorspace_pars_fragment:Zg,envmap_fragment:jg,envmap_common_pars_fragment:Kg,envmap_pars_fragment:Qg,envmap_pars_vertex:Jg,envmap_physical_pars_fragment:u_,envmap_vertex:t_,fog_vertex:e_,fog_pars_vertex:n_,fog_fragment:i_,fog_pars_fragment:r_,gradientmap_pars_fragment:s_,lightmap_pars_fragment:o_,lights_lambert_fragment:a_,lights_lambert_pars_fragment:l_,lights_pars_begin:c_,lights_toon_fragment:h_,lights_toon_pars_fragment:d_,lights_phong_fragment:f_,lights_phong_pars_fragment:p_,lights_physical_fragment:m_,lights_physical_pars_fragment:g_,lights_fragment_begin:__,lights_fragment_maps:v_,lights_fragment_end:x_,logdepthbuf_fragment:y_,logdepthbuf_pars_fragment:S_,logdepthbuf_pars_vertex:M_,logdepthbuf_vertex:E_,map_fragment:b_,map_pars_fragment:T_,map_particle_fragment:w_,map_particle_pars_fragment:A_,metalnessmap_fragment:C_,metalnessmap_pars_fragment:R_,morphinstance_vertex:P_,morphcolor_vertex:L_,morphnormal_vertex:D_,morphtarget_pars_vertex:U_,morphtarget_vertex:I_,normal_fragment_begin:O_,normal_fragment_maps:F_,normal_pars_fragment:N_,normal_pars_vertex:k_,normal_vertex:z_,normalmap_pars_fragment:B_,clearcoat_normal_fragment_begin:H_,clearcoat_normal_fragment_maps:V_,clearcoat_pars_fragment:G_,iridescence_pars_fragment:W_,opaque_fragment:X_,packing:q_,premultiplied_alpha_fragment:Y_,project_vertex:$_,dithering_fragment:Z_,dithering_pars_fragment:j_,roughnessmap_fragment:K_,roughnessmap_pars_fragment:Q_,shadowmap_pars_fragment:J_,shadowmap_pars_vertex:t0,shadowmap_vertex:e0,shadowmask_pars_fragment:n0,skinbase_vertex:i0,skinning_pars_vertex:r0,skinning_vertex:s0,skinnormal_vertex:o0,specularmap_fragment:a0,specularmap_pars_fragment:l0,tonemapping_fragment:c0,tonemapping_pars_fragment:u0,transmission_fragment:h0,transmission_pars_fragment:d0,uv_pars_fragment:f0,uv_pars_vertex:p0,uv_vertex:m0,worldpos_vertex:g0,background_vert:_0,background_frag:v0,backgroundCube_vert:x0,backgroundCube_frag:y0,cube_vert:S0,cube_frag:M0,depth_vert:E0,depth_frag:b0,distanceRGBA_vert:T0,distanceRGBA_frag:w0,equirect_vert:A0,equirect_frag:C0,linedashed_vert:R0,linedashed_frag:P0,meshbasic_vert:L0,meshbasic_frag:D0,meshlambert_vert:U0,meshlambert_frag:I0,meshmatcap_vert:O0,meshmatcap_frag:F0,meshnormal_vert:N0,meshnormal_frag:k0,meshphong_vert:z0,meshphong_frag:B0,meshphysical_vert:H0,meshphysical_frag:V0,meshtoon_vert:G0,meshtoon_frag:W0,points_vert:X0,points_frag:q0,shadow_vert:Y0,shadow_frag:$0,sprite_vert:Z0,sprite_frag:j0},ut={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Ke={basic:{uniforms:Ve([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Ve([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Ve([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Ve([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Ve([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new jt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Ve([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Ve([ut.points,ut.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Ve([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Ve([ut.common,ut.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Ve([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Ve([ut.sprite,ut.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:Ve([ut.common,ut.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:Ve([ut.lights,ut.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Ke.physical={uniforms:Ve([Ke.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Vs={r:0,b:0,g:0},Ui=new ri,K0=new pe;function Q0(n,t,e,i,r,s,o){const a=new jt(0);let l=s===!0?0:1,c,h,u=null,f=0,d=null;function g(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?e:t).get(E)),E}function _(M){let E=!1;const P=g(M);P===null?p(a,l):P&&P.isColor&&(p(P,1),E=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,E){const P=g(E);P&&(P.isCubeTexture||P.mapping===wo)?(h===void 0&&(h=new Cn(new cs(1,1,1),new De({name:"BackgroundCubeMaterial",uniforms:Cr(Ke.backgroundCube.uniforms),vertexShader:Ke.backgroundCube.vertexShader,fragmentShader:Ke.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,w,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Ui.copy(E.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),h.material.uniforms.envMap.value=P,h.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(K0.makeRotationFromEuler(Ui)),h.material.toneMapped=Jt.getTransfer(P.colorSpace)!==ae,(u!==P||f!==P.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=P,f=P.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new Cn(new Ao(2,2),new De({name:"BackgroundMaterial",uniforms:Cr(Ke.background.uniforms),vertexShader:Ke.background.vertexShader,fragmentShader:Ke.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(P.colorSpace)!==ae,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(u!==P||f!==P.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=P,f=P.version,d=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,E){M.getRGB(Vs,dd(n)),i.buffers.color.setClear(Vs.r,Vs.g,Vs.b,E,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),l=E,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:_,addToRenderList:m,dispose:y}}function J0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(x,C,O,z,X){let W=!1;const K=u(z,O,C);s!==K&&(s=K,c(s.object)),W=d(x,z,O,X),W&&g(x,z,O,X),X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,E(x,C,O,z),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function h(x){return n.deleteVertexArray(x)}function u(x,C,O){const z=O.wireframe===!0;let X=i[x.id];X===void 0&&(X={},i[x.id]=X);let W=X[C.id];W===void 0&&(W={},X[C.id]=W);let K=W[z];return K===void 0&&(K=f(l()),W[z]=K),K}function f(x){const C=[],O=[],z=[];for(let X=0;X<e;X++)C[X]=0,O[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:O,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,C,O,z){const X=s.attributes,W=C.attributes;let K=0;const J=O.getAttributes();for(const Z in J)if(J[Z].location>=0){const R=X[Z];let _t=W[Z];if(_t===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(_t=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(_t=x.instanceColor)),R===void 0||R.attribute!==_t||_t&&R.data!==_t.data)return!0;K++}return s.attributesNum!==K||s.index!==z}function g(x,C,O,z){const X={},W=C.attributes;let K=0;const J=O.getAttributes();for(const Z in J)if(J[Z].location>=0){let R=W[Z];R===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(R=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(R=x.instanceColor));const _t={};_t.attribute=R,R&&R.data&&(_t.data=R.data),X[Z]=_t,K++}s.attributes=X,s.attributesNum=K,s.index=z}function _(){const x=s.newAttributes;for(let C=0,O=x.length;C<O;C++)x[C]=0}function m(x){p(x,0)}function p(x,C){const O=s.newAttributes,z=s.enabledAttributes,X=s.attributeDivisors;O[x]=1,z[x]===0&&(n.enableVertexAttribArray(x),z[x]=1),X[x]!==C&&(n.vertexAttribDivisor(x,C),X[x]=C)}function y(){const x=s.newAttributes,C=s.enabledAttributes;for(let O=0,z=C.length;O<z;O++)C[O]!==x[O]&&(n.disableVertexAttribArray(O),C[O]=0)}function M(x,C,O,z,X,W,K){K===!0?n.vertexAttribIPointer(x,C,O,X,W):n.vertexAttribPointer(x,C,O,z,X,W)}function E(x,C,O,z){_();const X=z.attributes,W=O.getAttributes(),K=C.defaultAttributeValues;for(const J in W){const Z=W[J];if(Z.location>=0){let at=X[J];if(at===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(at=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(at=x.instanceColor)),at!==void 0){const R=at.normalized,_t=at.itemSize,Ut=t.get(at);if(Ut===void 0)continue;const I=Ut.buffer,Q=Ut.type,lt=Ut.bytesPerElement,dt=Q===n.INT||Q===n.UNSIGNED_INT||at.gpuType===Vl;if(at.isInterleavedBufferAttribute){const ht=at.data,St=ht.stride,Wt=at.offset;if(ht.isInstancedInterleavedBuffer){for(let wt=0;wt<Z.locationSize;wt++)p(Z.location+wt,ht.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let wt=0;wt<Z.locationSize;wt++)m(Z.location+wt);n.bindBuffer(n.ARRAY_BUFFER,I);for(let wt=0;wt<Z.locationSize;wt++)M(Z.location+wt,_t/Z.locationSize,Q,R,St*lt,(Wt+_t/Z.locationSize*wt)*lt,dt)}else{if(at.isInstancedBufferAttribute){for(let ht=0;ht<Z.locationSize;ht++)p(Z.location+ht,at.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ht=0;ht<Z.locationSize;ht++)m(Z.location+ht);n.bindBuffer(n.ARRAY_BUFFER,I);for(let ht=0;ht<Z.locationSize;ht++)M(Z.location+ht,_t/Z.locationSize,Q,R,_t*lt,_t/Z.locationSize*ht*lt,dt)}}else if(K!==void 0){const R=K[J];if(R!==void 0)switch(R.length){case 2:n.vertexAttrib2fv(Z.location,R);break;case 3:n.vertexAttrib3fv(Z.location,R);break;case 4:n.vertexAttrib4fv(Z.location,R);break;default:n.vertexAttrib1fv(Z.location,R)}}}}y()}function P(){U();for(const x in i){const C=i[x];for(const O in C){const z=C[O];for(const X in z)h(z[X].object),delete z[X];delete C[O]}delete i[x]}}function S(x){if(i[x.id]===void 0)return;const C=i[x.id];for(const O in C){const z=C[O];for(const X in z)h(z[X].object),delete z[X];delete C[O]}delete i[x.id]}function w(x){for(const C in i){const O=i[C];if(O[x.id]===void 0)continue;const z=O[x.id];for(const X in z)h(z[X].object),delete z[X];delete O[x.id]}}function U(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:T,dispose:P,releaseStatesOfGeometry:S,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function tv(n,t,e){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ev(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==sn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const U=w===ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ii&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==An&&!U)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:E,vertexTextures:P,maxSamples:S}}function nv(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Fi,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||r;return r=f,i=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const y=s?0:i,M=y*4;let E=p.clippingState||null;l.value=E,E=h(g,f,M,d);for(let P=0;P!==M;++P)E[P]=e[P];p.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,E=d;M!==_;++M,E+=4)o.copy(u[M]).applyMatrix4(y,a),o.normal.toArray(m,E),m[E+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function iv(n){let t=new WeakMap;function e(o,a){return a===$a?o.mapping=Tr:a===Za&&(o.mapping=wr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===$a||a===Za)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Zm(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const vr=4,gu=[.125,.215,.35,.446,.526,.582],zi=20,_a=new _d,_u=new jt;let va=null,xa=0,ya=0,Sa=!1;const Ni=(1+Math.sqrt(5))/2,mr=1/Ni,vu=[new N(-Ni,mr,0),new N(Ni,mr,0),new N(-mr,0,Ni),new N(mr,0,Ni),new N(0,Ni,-mr),new N(0,Ni,mr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],rv=new N;class xu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=rv}=s;va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Su(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(va,xa,ya),this._renderer.xr.enabled=Sa,t.scissorTest=!1,Gs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Tr||t.mapping===wr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:ti,format:sn,colorSpace:Ar,depthBuffer:!1},r=yu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yu(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sv(s)),this._blurMaterial=ov(s,t,e)}return r}_compileMaterial(t){const e=new Cn(this._lodPlanes[0],t);this._renderer.compile(e,_a)}_sceneToCubeUV(t,e,i,r,s){const l=new pn(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(_u),u.toneMapping=xi,u.autoClear=!1;const g=new Ql({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),_=new Cn(new cs,g);let m=!1;const p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,m=!0):(g.color.copy(_u),m=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[y],s.y,s.z)):M===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[y]));const E=this._cubeSize;Gs(r,M*E,y>2?E:0,E,E),u.setRenderTarget(r),m&&u.render(_,l),u.render(t,l)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Tr||t.mapping===wr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Su());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Cn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Gs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,_a)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=vu[(r-s-1)%vu.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Cn(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*zi-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):zi;m>zi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zi}`);const p=[];let y=0;for(let w=0;w<zi;++w){const U=w/_,T=Math.exp(-U*U/2);p.push(T),w===0?y+=T:w<m&&(y+=2*T)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const E=this._sizeLods[r],P=3*E*(r>M-vr?r-M+vr:0),S=4*(this._cubeSize-E);Gs(e,P,S,3*E,2*E),l.setRenderTarget(e),l.render(u,_a)}}function sv(n){const t=[],e=[],i=[];let r=n;const s=n-vr+1+gu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-vr?l=gu[o-n+vr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*d),M=new Float32Array(m*g*d),E=new Float32Array(p*g*d);for(let S=0;S<d;S++){const w=S%3*2/3-1,U=S>2?0:-1,T=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];y.set(T,_*g*S),M.set(f,m*g*S);const x=[S,S,S,S,S,S];E.set(x,p*g*S)}const P=new an;P.setAttribute("position",new Me(y,_)),P.setAttribute("uv",new Me(M,m)),P.setAttribute("faceIndex",new Me(E,p)),t.push(P),r>vr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function yu(n,t,e){const i=new Pn(n,t,e);return i.texture.mapping=wo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Gs(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function ov(n,t,e){const i=new Float32Array(zi),r=new N(0,1,0);return new De({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:tc(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Su(){return new De({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Mu(){return new De({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

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
	`}function av(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===$a||l===Za,h=l===Tr||l===wr;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new xu(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&r(d)?(e===null&&(e=new xu(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function lv(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&yr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function cv(n,t,e,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let M=0,E=y.length;M<E;M+=3){const P=y[M+0],S=y[M+1],w=y[M+2];f.push(P,S,S,w,w,P)}}else if(g!==void 0){const y=g.array;_=g.version;for(let M=0,E=y.length/3-1;M<E;M+=3){const P=M+0,S=M+1,w=M+2;f.push(P,S,S,w,w,P)}}else return;const m=new(ad(f)?hd:ud)(f,1);m.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function uv(n,t,e){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*o),e.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,f*o,g),e.update(d,i,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,f,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=d[y]*_[y];e.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hv(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function dv(n,t,e){const i=new WeakMap,r=new ue;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let x=function(){U.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let E=0;g===!0&&(E=1),_===!0&&(E=2),m===!0&&(E=3);let P=a.attributes.position.count*E,S=1;P>t.maxTextureSize&&(S=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const w=new Float32Array(P*S*4*u),U=new ld(w,P,S,u);U.type=An,U.needsUpdate=!0;const T=E*4;for(let C=0;C<u;C++){const O=p[C],z=y[C],X=M[C],W=P*S*4*C;for(let K=0;K<O.count;K++){const J=K*T;g===!0&&(r.fromBufferAttribute(O,K),w[W+J+0]=r.x,w[W+J+1]=r.y,w[W+J+2]=r.z,w[W+J+3]=0),_===!0&&(r.fromBufferAttribute(z,K),w[W+J+4]=r.x,w[W+J+5]=r.y,w[W+J+6]=r.z,w[W+J+7]=0),m===!0&&(r.fromBufferAttribute(X,K),w[W+J+8]=r.x,w[W+J+9]=r.y,w[W+J+10]=r.z,w[W+J+11]=X.itemSize===4?r.w:1)}}f={count:u,texture:U,size:new zt(P,S)},i.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function fv(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const yd=new qe,Eu=new gd(1,1),Sd=new ld,Md=new Um,Ed=new pd,bu=[],Tu=[],wu=new Float32Array(16),Au=new Float32Array(9),Cu=new Float32Array(4);function Ur(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=bu[r];if(s===void 0&&(s=new Float32Array(r),bu[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Ce(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Re(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Co(n,t){let e=Tu[t];e===void 0&&(e=new Int32Array(t),Tu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function pv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function mv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2fv(this.addr,t),Re(e,t)}}function gv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;n.uniform3fv(this.addr,t),Re(e,t)}}function _v(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4fv(this.addr,t),Re(e,t)}}function vv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;Cu.set(i),n.uniformMatrix2fv(this.addr,!1,Cu),Re(e,i)}}function xv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;Au.set(i),n.uniformMatrix3fv(this.addr,!1,Au),Re(e,i)}}function yv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;wu.set(i),n.uniformMatrix4fv(this.addr,!1,wu),Re(e,i)}}function Sv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Mv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2iv(this.addr,t),Re(e,t)}}function Ev(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3iv(this.addr,t),Re(e,t)}}function bv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4iv(this.addr,t),Re(e,t)}}function Tv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function wv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2uiv(this.addr,t),Re(e,t)}}function Av(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3uiv(this.addr,t),Re(e,t)}}function Cv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4uiv(this.addr,t),Re(e,t)}}function Rv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Eu.compareFunction=od,s=Eu):s=yd,e.setTexture2D(t||s,r)}function Pv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Md,r)}function Lv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Ed,r)}function Dv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Sd,r)}function Uv(n){switch(n){case 5126:return pv;case 35664:return mv;case 35665:return gv;case 35666:return _v;case 35674:return vv;case 35675:return xv;case 35676:return yv;case 5124:case 35670:return Sv;case 35667:case 35671:return Mv;case 35668:case 35672:return Ev;case 35669:case 35673:return bv;case 5125:return Tv;case 36294:return wv;case 36295:return Av;case 36296:return Cv;case 35678:case 36198:case 36298:case 36306:case 35682:return Rv;case 35679:case 36299:case 36307:return Pv;case 35680:case 36300:case 36308:case 36293:return Lv;case 36289:case 36303:case 36311:case 36292:return Dv}}function Iv(n,t){n.uniform1fv(this.addr,t)}function Ov(n,t){const e=Ur(t,this.size,2);n.uniform2fv(this.addr,e)}function Fv(n,t){const e=Ur(t,this.size,3);n.uniform3fv(this.addr,e)}function Nv(n,t){const e=Ur(t,this.size,4);n.uniform4fv(this.addr,e)}function kv(n,t){const e=Ur(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function zv(n,t){const e=Ur(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Bv(n,t){const e=Ur(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Hv(n,t){n.uniform1iv(this.addr,t)}function Vv(n,t){n.uniform2iv(this.addr,t)}function Gv(n,t){n.uniform3iv(this.addr,t)}function Wv(n,t){n.uniform4iv(this.addr,t)}function Xv(n,t){n.uniform1uiv(this.addr,t)}function qv(n,t){n.uniform2uiv(this.addr,t)}function Yv(n,t){n.uniform3uiv(this.addr,t)}function $v(n,t){n.uniform4uiv(this.addr,t)}function Zv(n,t,e){const i=this.cache,r=t.length,s=Co(e,r);Ce(i,s)||(n.uniform1iv(this.addr,s),Re(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||yd,s[o])}function jv(n,t,e){const i=this.cache,r=t.length,s=Co(e,r);Ce(i,s)||(n.uniform1iv(this.addr,s),Re(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Md,s[o])}function Kv(n,t,e){const i=this.cache,r=t.length,s=Co(e,r);Ce(i,s)||(n.uniform1iv(this.addr,s),Re(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Ed,s[o])}function Qv(n,t,e){const i=this.cache,r=t.length,s=Co(e,r);Ce(i,s)||(n.uniform1iv(this.addr,s),Re(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Sd,s[o])}function Jv(n){switch(n){case 5126:return Iv;case 35664:return Ov;case 35665:return Fv;case 35666:return Nv;case 35674:return kv;case 35675:return zv;case 35676:return Bv;case 5124:case 35670:return Hv;case 35667:case 35671:return Vv;case 35668:case 35672:return Gv;case 35669:case 35673:return Wv;case 5125:return Xv;case 36294:return qv;case 36295:return Yv;case 36296:return $v;case 35678:case 36198:case 36298:case 36306:case 35682:return Zv;case 35679:case 36299:case 36307:return jv;case 35680:case 36300:case 36308:case 36293:return Kv;case 36289:case 36303:case 36311:case 36292:return Qv}}class tx{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Uv(e.type)}}class ex{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Jv(e.type)}}class nx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const Ma=/(\w+)(\])?(\[|\.)?/g;function Ru(n,t){n.seq.push(t),n.map[t.id]=t}function ix(n,t,e){const i=n.name,r=i.length;for(Ma.lastIndex=0;;){const s=Ma.exec(i),o=Ma.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Ru(e,c===void 0?new tx(a,n,t):new ex(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new nx(a),Ru(e,u)),e=u}}}class lo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);ix(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Pu(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const rx=37297;let sx=0;function ox(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Lu=new Ht;function ax(n){Jt._getMatrix(Lu,Jt.workingColorSpace,n);const t=`mat3( ${Lu.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(n)){case vo:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Du(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+ox(n.getShaderSource(t),o)}else return r}function lx(n,t){const e=ax(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function cx(n,t){let e;switch(t){case Xh:e="Linear";break;case qh:e="Reinhard";break;case Yh:e="Cineon";break;case Hl:e="ACESFilmic";break;case Zh:e="AgX";break;case jh:e="Neutral";break;case $h:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ws=new N;function ux(){Jt.getLuminanceCoefficients(Ws);const n=Ws.x.toFixed(4),t=Ws.y.toFixed(4),e=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function dx(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function fx(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function $r(n){return n!==""}function Uu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Iu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const px=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(n){return n.replace(px,gx)}const mx=new Map;function gx(n,t){let e=Gt[t];if(e===void 0){const i=mx.get(t);if(i!==void 0)e=Gt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Cl(e)}const _x=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ou(n){return n.replace(_x,vx)}function vx(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Fu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function xx(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Vh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Rp?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Zn&&(t="SHADOWMAP_TYPE_VSM"),t}function yx(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Tr:case wr:t="ENVMAP_TYPE_CUBE";break;case wo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Sx(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case wr:t="ENVMAP_MODE_REFRACTION";break}return t}function Mx(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wh:t="ENVMAP_BLENDING_MULTIPLY";break;case qp:t="ENVMAP_BLENDING_MIX";break;case Yp:t="ENVMAP_BLENDING_ADD";break}return t}function Ex(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function bx(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=xx(e),c=yx(e),h=Sx(e),u=Mx(e),f=Ex(e),d=hx(e),g=dx(s),_=r.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($r).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($r).join(`
`),p.length>0&&(p+=`
`)):(m=[Fu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),p=[Fu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?Gt.tonemapping_pars_fragment:"",e.toneMapping!==xi?cx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,lx("linearToOutputTexel",e.outputColorSpace),ux(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($r).join(`
`)),o=Cl(o),o=Uu(o,e),o=Iu(o,e),a=Cl(a),a=Uu(a,e),a=Iu(a,e),o=Ou(o),a=Ou(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Vc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=y+m+o,E=y+p+a,P=Pu(r,r.VERTEX_SHADER,M),S=Pu(r,r.FRAGMENT_SHADER,E);r.attachShader(_,P),r.attachShader(_,S),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(C){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),z=r.getShaderInfoLog(P).trim(),X=r.getShaderInfoLog(S).trim();let W=!0,K=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,P,S);else{const J=Du(r,P,"vertex"),Z=Du(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+O+`
`+J+`
`+Z)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||X==="")&&(K=!1);K&&(C.diagnostics={runnable:W,programLog:O,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:p}})}r.deleteShader(P),r.deleteShader(S),U=new lo(r,_),T=fx(r,_)}let U;this.getUniforms=function(){return U===void 0&&w(this),U};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,rx)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sx++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=S,this}let Tx=0;class wx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Ax(t),e.set(t,i)),i}}class Ax{constructor(t){this.id=Tx++,this.code=t,this.usedTimes=0}}function Cx(n,t,e,i,r,s,o){const a=new Kl,l=new wx,c=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,x,C,O,z){const X=O.fog,W=z.geometry,K=T.isMeshStandardMaterial?O.environment:null,J=(T.isMeshStandardMaterial?e:t).get(T.envMap||K),Z=J&&J.mapping===wo?J.image.height:null,at=g[T.type];T.precision!==null&&(d=r.getMaxPrecision(T.precision),d!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",d,"instead."));const R=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,_t=R!==void 0?R.length:0;let Ut=0;W.morphAttributes.position!==void 0&&(Ut=1),W.morphAttributes.normal!==void 0&&(Ut=2),W.morphAttributes.color!==void 0&&(Ut=3);let I,Q,lt,dt;if(at){const se=Ke[at];I=se.vertexShader,Q=se.fragmentShader}else I=T.vertexShader,Q=T.fragmentShader,l.update(T),lt=l.getVertexShaderID(T),dt=l.getFragmentShaderID(T);const ht=n.getRenderTarget(),St=n.state.buffers.depth.getReversed(),Wt=z.isInstancedMesh===!0,wt=z.isBatchedMesh===!0,ce=!!T.map,me=!!T.matcap,Qt=!!J,F=!!T.aoMap,Pe=!!T.lightMap,Zt=!!T.bumpMap,re=!!T.normalMap,Tt=!!T.displacementMap,Yt=!!T.emissiveMap,At=!!T.metalnessMap,kt=!!T.roughnessMap,Se=T.anisotropy>0,L=T.clearcoat>0,b=T.dispersion>0,q=T.iridescence>0,D=T.sheen>0,B=T.transmission>0,G=Se&&!!T.anisotropyMap,rt=L&&!!T.clearcoatMap,nt=L&&!!T.clearcoatNormalMap,mt=L&&!!T.clearcoatRoughnessMap,xt=q&&!!T.iridescenceMap,tt=q&&!!T.iridescenceThicknessMap,gt=D&&!!T.sheenColorMap,Ct=D&&!!T.sheenRoughnessMap,yt=!!T.specularMap,ct=!!T.specularColorMap,Rt=!!T.specularIntensityMap,k=B&&!!T.transmissionMap,ft=B&&!!T.thicknessMap,it=!!T.gradientMap,Mt=!!T.alphaMap,st=T.alphaTest>0,et=!!T.alphaHash,Et=!!T.extensions;let Nt=xi;T.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Nt=n.toneMapping);const ge={shaderID:at,shaderType:T.type,shaderName:T.name,vertexShader:I,fragmentShader:Q,defines:T.defines,customVertexShaderID:lt,customFragmentShaderID:dt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:d,batching:wt,batchingColor:wt&&z._colorsTexture!==null,instancing:Wt,instancingColor:Wt&&z.instanceColor!==null,instancingMorph:Wt&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Ar,alphaToCoverage:!!T.alphaToCoverage,map:ce,matcap:me,envMap:Qt,envMapMode:Qt&&J.mapping,envMapCubeUVHeight:Z,aoMap:F,lightMap:Pe,bumpMap:Zt,normalMap:re,displacementMap:f&&Tt,emissiveMap:Yt,normalMapObjectSpace:re&&T.normalMapType===Qp,normalMapTangentSpace:re&&T.normalMapType===Kp,metalnessMap:At,roughnessMap:kt,anisotropy:Se,anisotropyMap:G,clearcoat:L,clearcoatMap:rt,clearcoatNormalMap:nt,clearcoatRoughnessMap:mt,dispersion:b,iridescence:q,iridescenceMap:xt,iridescenceThicknessMap:tt,sheen:D,sheenColorMap:gt,sheenRoughnessMap:Ct,specularMap:yt,specularColorMap:ct,specularIntensityMap:Rt,transmission:B,transmissionMap:k,thicknessMap:ft,gradientMap:it,opaque:T.transparent===!1&&T.blending===xr&&T.alphaToCoverage===!1,alphaMap:Mt,alphaTest:st,alphaHash:et,combine:T.combine,mapUv:ce&&_(T.map.channel),aoMapUv:F&&_(T.aoMap.channel),lightMapUv:Pe&&_(T.lightMap.channel),bumpMapUv:Zt&&_(T.bumpMap.channel),normalMapUv:re&&_(T.normalMap.channel),displacementMapUv:Tt&&_(T.displacementMap.channel),emissiveMapUv:Yt&&_(T.emissiveMap.channel),metalnessMapUv:At&&_(T.metalnessMap.channel),roughnessMapUv:kt&&_(T.roughnessMap.channel),anisotropyMapUv:G&&_(T.anisotropyMap.channel),clearcoatMapUv:rt&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&_(T.sheenRoughnessMap.channel),specularMapUv:yt&&_(T.specularMap.channel),specularColorMapUv:ct&&_(T.specularColorMap.channel),specularIntensityMapUv:Rt&&_(T.specularIntensityMap.channel),transmissionMapUv:k&&_(T.transmissionMap.channel),thicknessMapUv:ft&&_(T.thicknessMap.channel),alphaMapUv:Mt&&_(T.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(re||Se),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!W.attributes.uv&&(ce||Mt),fog:!!X,useFog:T.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:St,skinning:z.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Ut,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Nt,decodeVideoTexture:ce&&T.map.isVideoTexture===!0&&Jt.getTransfer(T.map.colorSpace)===ae,decodeVideoTextureEmissive:Yt&&T.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(T.emissiveMap.colorSpace)===ae,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===jn,flipSided:T.side===Je,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Et&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&T.extensions.multiDraw===!0||wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function p(T){const x=[];if(T.shaderID?x.push(T.shaderID):(x.push(T.customVertexShaderID),x.push(T.customFragmentShaderID)),T.defines!==void 0)for(const C in T.defines)x.push(C),x.push(T.defines[C]);return T.isRawShaderMaterial===!1&&(y(x,T),M(x,T),x.push(n.outputColorSpace)),x.push(T.customProgramCacheKey),x.join()}function y(T,x){T.push(x.precision),T.push(x.outputColorSpace),T.push(x.envMapMode),T.push(x.envMapCubeUVHeight),T.push(x.mapUv),T.push(x.alphaMapUv),T.push(x.lightMapUv),T.push(x.aoMapUv),T.push(x.bumpMapUv),T.push(x.normalMapUv),T.push(x.displacementMapUv),T.push(x.emissiveMapUv),T.push(x.metalnessMapUv),T.push(x.roughnessMapUv),T.push(x.anisotropyMapUv),T.push(x.clearcoatMapUv),T.push(x.clearcoatNormalMapUv),T.push(x.clearcoatRoughnessMapUv),T.push(x.iridescenceMapUv),T.push(x.iridescenceThicknessMapUv),T.push(x.sheenColorMapUv),T.push(x.sheenRoughnessMapUv),T.push(x.specularMapUv),T.push(x.specularColorMapUv),T.push(x.specularIntensityMapUv),T.push(x.transmissionMapUv),T.push(x.thicknessMapUv),T.push(x.combine),T.push(x.fogExp2),T.push(x.sizeAttenuation),T.push(x.morphTargetsCount),T.push(x.morphAttributeCount),T.push(x.numDirLights),T.push(x.numPointLights),T.push(x.numSpotLights),T.push(x.numSpotLightMaps),T.push(x.numHemiLights),T.push(x.numRectAreaLights),T.push(x.numDirLightShadows),T.push(x.numPointLightShadows),T.push(x.numSpotLightShadows),T.push(x.numSpotLightShadowsWithMaps),T.push(x.numLightProbes),T.push(x.shadowMapType),T.push(x.toneMapping),T.push(x.numClippingPlanes),T.push(x.numClipIntersection),T.push(x.depthPacking)}function M(T,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),T.push(a.mask)}function E(T){const x=g[T.type];let C;if(x){const O=Ke[x];C=qi.clone(O.uniforms)}else C=T.uniforms;return C}function P(T,x){let C;for(let O=0,z=h.length;O<z;O++){const X=h[O];if(X.cacheKey===x){C=X,++C.usedTimes;break}}return C===void 0&&(C=new bx(n,x,T,s),h.push(C)),C}function S(T){if(--T.usedTimes===0){const x=h.indexOf(T);h[x]=h[h.length-1],h.pop(),T.destroy()}}function w(T){l.remove(T)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:P,releaseProgram:S,releaseShaderCache:w,programs:h,dispose:U}}function Rx(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function Px(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Nu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ku(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(u,f,d,g,_,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):e.push(p)}function l(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||Px),i.length>1&&i.sort(f||Nu),r.length>1&&r.sort(f||Nu)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Lx(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new ku,n.set(i,[o])):r>=s.length?(o=new ku,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Dx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new jt};break;case"SpotLight":e={position:new N,direction:new N,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function Ux(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Ix=0;function Ox(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Fx(n){const t=new Dx,e=Ux(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const r=new N,s=new pe,o=new pe;function a(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,y=0,M=0,E=0,P=0,S=0,w=0;c.sort(Ox);for(let T=0,x=c.length;T<x;T++){const C=c[T],O=C.color,z=C.intensity,X=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=O.r*z,u+=O.g*z,f+=O.b*z;else if(C.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(C.sh.coefficients[K],z);w++}else if(C.isDirectionalLight){const K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,Z=e.get(C);Z.shadowIntensity=J.intensity,Z.shadowBias=J.bias,Z.shadowNormalBias=J.normalBias,Z.shadowRadius=J.radius,Z.shadowMapSize=J.mapSize,i.directionalShadow[d]=Z,i.directionalShadowMap[d]=W,i.directionalShadowMatrix[d]=C.shadow.matrix,y++}i.directional[d]=K,d++}else if(C.isSpotLight){const K=t.get(C);K.position.setFromMatrixPosition(C.matrixWorld),K.color.copy(O).multiplyScalar(z),K.distance=X,K.coneCos=Math.cos(C.angle),K.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),K.decay=C.decay,i.spot[_]=K;const J=C.shadow;if(C.map&&(i.spotLightMap[P]=C.map,P++,J.updateMatrices(C),C.castShadow&&S++),i.spotLightMatrix[_]=J.matrix,C.castShadow){const Z=e.get(C);Z.shadowIntensity=J.intensity,Z.shadowBias=J.bias,Z.shadowNormalBias=J.normalBias,Z.shadowRadius=J.radius,Z.shadowMapSize=J.mapSize,i.spotShadow[_]=Z,i.spotShadowMap[_]=W,E++}_++}else if(C.isRectAreaLight){const K=t.get(C);K.color.copy(O).multiplyScalar(z),K.halfWidth.set(C.width*.5,0,0),K.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=K,m++}else if(C.isPointLight){const K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),K.distance=C.distance,K.decay=C.decay,C.castShadow){const J=C.shadow,Z=e.get(C);Z.shadowIntensity=J.intensity,Z.shadowBias=J.bias,Z.shadowNormalBias=J.normalBias,Z.shadowRadius=J.radius,Z.shadowMapSize=J.mapSize,Z.shadowCameraNear=J.camera.near,Z.shadowCameraFar=J.camera.far,i.pointShadow[g]=Z,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=C.shadow.matrix,M++}i.point[g]=K,g++}else if(C.isHemisphereLight){const K=t.get(C);K.skyColor.copy(C.color).multiplyScalar(z),K.groundColor.copy(C.groundColor).multiplyScalar(z),i.hemi[p]=K,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const U=i.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==y||U.numPointShadows!==M||U.numSpotShadows!==E||U.numSpotMaps!==P||U.numLightProbes!==w)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=E+P-S,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=w,U.directionalLength=d,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=y,U.numPointShadows=M,U.numSpotShadows=E,U.numSpotMaps=P,U.numLightProbes=w,i.version=Ix++)}function l(c,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const M=c[p];if(M.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),u++}else if(M.isSpotLight){const E=i.spot[d];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const E=i.hemi[_];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function zu(n){const t=new Fx(n),e=[],i=[];function r(h){c.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Nx(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new zu(n),t.set(r,[a])):s>=o.length?(a=new zu(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zx=`uniform sampler2D shadow_pass;
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
}`;function Bx(n,t,e){let i=new Jl;const r=new zt,s=new zt,o=new ue,a=new cg({depthPacking:jp}),l=new ug,c={},h=e.maxTextureSize,u={[yi]:Je,[Je]:yi,[jn]:jn},f=new De({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:kx,fragmentShader:zx}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new an;g.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Cn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vh;let p=this.type;this.render=function(S,w,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const T=n.getRenderTarget(),x=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Jn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==Zn&&this.type===Zn,X=p===Zn&&this.type!==Zn;for(let W=0,K=S.length;W<K;W++){const J=S[W],Z=J.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const at=Z.getFrameExtents();if(r.multiply(at),s.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/at.x),r.x=s.x*at.x,Z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/at.y),r.y=s.y*at.y,Z.mapSize.y=s.y)),Z.map===null||z===!0||X===!0){const _t=this.type!==Zn?{minFilter:Xe,magFilter:Xe}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Pn(r.x,r.y,_t),Z.map.texture.name=J.name+".shadowMap",Z.camera.updateProjectionMatrix()}n.setRenderTarget(Z.map),n.clear();const R=Z.getViewportCount();for(let _t=0;_t<R;_t++){const Ut=Z.getViewport(_t);o.set(s.x*Ut.x,s.y*Ut.y,s.x*Ut.z,s.y*Ut.w),O.viewport(o),Z.updateMatrices(J,_t),i=Z.getFrustum(),E(w,U,Z.camera,J,this.type)}Z.isPointLightShadow!==!0&&this.type===Zn&&y(Z,U),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(T,x,C)};function y(S,w){const U=t.update(_);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Pn(r.x,r.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,U,f,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,U,d,_,null)}function M(S,w,U,T){let x=null;const C=U.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)x=C;else if(x=U.isPointLight===!0?l:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const O=x.uuid,z=w.uuid;let X=c[O];X===void 0&&(X={},c[O]=X);let W=X[z];W===void 0&&(W=x.clone(),X[z]=W,w.addEventListener("dispose",P)),x=W}if(x.visible=w.visible,x.wireframe=w.wireframe,T===Zn?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:u[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const O=n.properties.get(x);O.light=U}return x}function E(S,w,U,T,x){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&x===Zn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,S.matrixWorld);const z=t.update(S),X=S.material;if(Array.isArray(X)){const W=z.groups;for(let K=0,J=W.length;K<J;K++){const Z=W[K],at=X[Z.materialIndex];if(at&&at.visible){const R=M(S,at,T,x);S.onBeforeShadow(n,S,w,U,z,R,Z),n.renderBufferDirect(U,null,z,R,S,Z),S.onAfterShadow(n,S,w,U,z,R,Z)}}}else if(X.visible){const W=M(S,X,T,x);S.onBeforeShadow(n,S,w,U,z,W,null),n.renderBufferDirect(U,null,z,W,S,null),S.onAfterShadow(n,S,w,U,z,W,null)}}const O=S.children;for(let z=0,X=O.length;z<X;z++)E(O[z],w,U,T,x)}function P(S){S.target.removeEventListener("dispose",P);for(const U in c){const T=c[U],x=S.target.uuid;x in T&&(T[x].dispose(),delete T[x])}}}const Hx={[Ha]:Va,[Ga]:qa,[Wa]:Ya,[br]:Xa,[Va]:Ha,[qa]:Ga,[Ya]:Wa,[Xa]:br};function Vx(n,t){function e(){let k=!1;const ft=new ue;let it=null;const Mt=new ue(0,0,0,0);return{setMask:function(st){it!==st&&!k&&(n.colorMask(st,st,st,st),it=st)},setLocked:function(st){k=st},setClear:function(st,et,Et,Nt,ge){ge===!0&&(st*=Nt,et*=Nt,Et*=Nt),ft.set(st,et,Et,Nt),Mt.equals(ft)===!1&&(n.clearColor(st,et,Et,Nt),Mt.copy(ft))},reset:function(){k=!1,it=null,Mt.set(-1,0,0,0)}}}function i(){let k=!1,ft=!1,it=null,Mt=null,st=null;return{setReversed:function(et){if(ft!==et){const Et=t.get("EXT_clip_control");et?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),ft=et;const Nt=st;st=null,this.setClear(Nt)}},getReversed:function(){return ft},setTest:function(et){et?ht(n.DEPTH_TEST):St(n.DEPTH_TEST)},setMask:function(et){it!==et&&!k&&(n.depthMask(et),it=et)},setFunc:function(et){if(ft&&(et=Hx[et]),Mt!==et){switch(et){case Ha:n.depthFunc(n.NEVER);break;case Va:n.depthFunc(n.ALWAYS);break;case Ga:n.depthFunc(n.LESS);break;case br:n.depthFunc(n.LEQUAL);break;case Wa:n.depthFunc(n.EQUAL);break;case Xa:n.depthFunc(n.GEQUAL);break;case qa:n.depthFunc(n.GREATER);break;case Ya:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Mt=et}},setLocked:function(et){k=et},setClear:function(et){st!==et&&(ft&&(et=1-et),n.clearDepth(et),st=et)},reset:function(){k=!1,it=null,Mt=null,st=null,ft=!1}}}function r(){let k=!1,ft=null,it=null,Mt=null,st=null,et=null,Et=null,Nt=null,ge=null;return{setTest:function(se){k||(se?ht(n.STENCIL_TEST):St(n.STENCIL_TEST))},setMask:function(se){ft!==se&&!k&&(n.stencilMask(se),ft=se)},setFunc:function(se,vn,Bn){(it!==se||Mt!==vn||st!==Bn)&&(n.stencilFunc(se,vn,Bn),it=se,Mt=vn,st=Bn)},setOp:function(se,vn,Bn){(et!==se||Et!==vn||Nt!==Bn)&&(n.stencilOp(se,vn,Bn),et=se,Et=vn,Nt=Bn)},setLocked:function(se){k=se},setClear:function(se){ge!==se&&(n.clearStencil(se),ge=se)},reset:function(){k=!1,ft=null,it=null,Mt=null,st=null,et=null,Et=null,Nt=null,ge=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,y=null,M=null,E=null,P=null,S=null,w=new jt(0,0,0),U=0,T=!1,x=null,C=null,O=null,z=null,X=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,J=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(Z)[1]),K=J>=1):Z.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),K=J>=2);let at=null,R={};const _t=n.getParameter(n.SCISSOR_BOX),Ut=n.getParameter(n.VIEWPORT),I=new ue().fromArray(_t),Q=new ue().fromArray(Ut);function lt(k,ft,it,Mt){const st=new Uint8Array(4),et=n.createTexture();n.bindTexture(k,et),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Et=0;Et<it;Et++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,Mt,0,n.RGBA,n.UNSIGNED_BYTE,st):n.texImage2D(ft+Et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,st);return et}const dt={};dt[n.TEXTURE_2D]=lt(n.TEXTURE_2D,n.TEXTURE_2D,1),dt[n.TEXTURE_CUBE_MAP]=lt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[n.TEXTURE_2D_ARRAY]=lt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),dt[n.TEXTURE_3D]=lt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(br),Zt(!1),re(kc),ht(n.CULL_FACE),F(Jn);function ht(k){h[k]!==!0&&(n.enable(k),h[k]=!0)}function St(k){h[k]!==!1&&(n.disable(k),h[k]=!1)}function Wt(k,ft){return u[k]!==ft?(n.bindFramebuffer(k,ft),u[k]=ft,k===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ft),k===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function wt(k,ft){let it=d,Mt=!1;if(k){it=f.get(ft),it===void 0&&(it=[],f.set(ft,it));const st=k.textures;if(it.length!==st.length||it[0]!==n.COLOR_ATTACHMENT0){for(let et=0,Et=st.length;et<Et;et++)it[et]=n.COLOR_ATTACHMENT0+et;it.length=st.length,Mt=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,Mt=!0);Mt&&n.drawBuffers(it)}function ce(k){return g!==k?(n.useProgram(k),g=k,!0):!1}const me={[mi]:n.FUNC_ADD,[Pp]:n.FUNC_SUBTRACT,[Lp]:n.FUNC_REVERSE_SUBTRACT};me[Dp]=n.MIN,me[Up]=n.MAX;const Qt={[Ip]:n.ZERO,[ka]:n.ONE,[Op]:n.SRC_COLOR,[za]:n.SRC_ALPHA,[Hp]:n.SRC_ALPHA_SATURATE,[zp]:n.DST_COLOR,[Np]:n.DST_ALPHA,[Fp]:n.ONE_MINUS_SRC_COLOR,[Ba]:n.ONE_MINUS_SRC_ALPHA,[Bp]:n.ONE_MINUS_DST_COLOR,[kp]:n.ONE_MINUS_DST_ALPHA,[Vp]:n.CONSTANT_COLOR,[Gp]:n.ONE_MINUS_CONSTANT_COLOR,[Wp]:n.CONSTANT_ALPHA,[Xp]:n.ONE_MINUS_CONSTANT_ALPHA};function F(k,ft,it,Mt,st,et,Et,Nt,ge,se){if(k===Jn){_===!0&&(St(n.BLEND),_=!1);return}if(_===!1&&(ht(n.BLEND),_=!0),k!==Gh){if(k!==m||se!==T){if((p!==mi||E!==mi)&&(n.blendEquation(n.FUNC_ADD),p=mi,E=mi),se)switch(k){case xr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _o:n.blendFunc(n.ONE,n.ONE);break;case zc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case xr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _o:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case zc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,M=null,P=null,S=null,w.set(0,0,0),U=0,m=k,T=se}return}st=st||ft,et=et||it,Et=Et||Mt,(ft!==p||st!==E)&&(n.blendEquationSeparate(me[ft],me[st]),p=ft,E=st),(it!==y||Mt!==M||et!==P||Et!==S)&&(n.blendFuncSeparate(Qt[it],Qt[Mt],Qt[et],Qt[Et]),y=it,M=Mt,P=et,S=Et),(Nt.equals(w)===!1||ge!==U)&&(n.blendColor(Nt.r,Nt.g,Nt.b,ge),w.copy(Nt),U=ge),m=k,T=!1}function Pe(k,ft){k.side===jn?St(n.CULL_FACE):ht(n.CULL_FACE);let it=k.side===Je;ft&&(it=!it),Zt(it),k.blending===xr&&k.transparent===!1?F(Jn):F(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),s.setMask(k.colorWrite);const Mt=k.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Yt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):St(n.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(k){x!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),x=k)}function re(k){k!==Ap?(ht(n.CULL_FACE),k!==C&&(k===kc?n.cullFace(n.BACK):k===Cp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):St(n.CULL_FACE),C=k}function Tt(k){k!==O&&(K&&n.lineWidth(k),O=k)}function Yt(k,ft,it){k?(ht(n.POLYGON_OFFSET_FILL),(z!==ft||X!==it)&&(n.polygonOffset(ft,it),z=ft,X=it)):St(n.POLYGON_OFFSET_FILL)}function At(k){k?ht(n.SCISSOR_TEST):St(n.SCISSOR_TEST)}function kt(k){k===void 0&&(k=n.TEXTURE0+W-1),at!==k&&(n.activeTexture(k),at=k)}function Se(k,ft,it){it===void 0&&(at===null?it=n.TEXTURE0+W-1:it=at);let Mt=R[it];Mt===void 0&&(Mt={type:void 0,texture:void 0},R[it]=Mt),(Mt.type!==k||Mt.texture!==ft)&&(at!==it&&(n.activeTexture(it),at=it),n.bindTexture(k,ft||dt[k]),Mt.type=k,Mt.texture=ft)}function L(){const k=R[at];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function q(){try{n.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function D(){try{n.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function B(){try{n.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function rt(){try{n.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function nt(){try{n.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function mt(){try{n.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function xt(){try{n.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function tt(){try{n.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function gt(k){I.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),I.copy(k))}function Ct(k){Q.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),Q.copy(k))}function yt(k,ft){let it=c.get(ft);it===void 0&&(it=new WeakMap,c.set(ft,it));let Mt=it.get(k);Mt===void 0&&(Mt=n.getUniformBlockIndex(ft,k.name),it.set(k,Mt))}function ct(k,ft){const Mt=c.get(ft).get(k);l.get(ft)!==Mt&&(n.uniformBlockBinding(ft,Mt,k.__bindingPointIndex),l.set(ft,Mt))}function Rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},at=null,R={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,y=null,M=null,E=null,P=null,S=null,w=new jt(0,0,0),U=0,T=!1,x=null,C=null,O=null,z=null,X=null,I.set(0,0,n.canvas.width,n.canvas.height),Q.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ht,disable:St,bindFramebuffer:Wt,drawBuffers:wt,useProgram:ce,setBlending:F,setMaterial:Pe,setFlipSided:Zt,setCullFace:re,setLineWidth:Tt,setPolygonOffset:Yt,setScissorTest:At,activeTexture:kt,bindTexture:Se,unbindTexture:L,compressedTexImage2D:b,compressedTexImage3D:q,texImage2D:xt,texImage3D:tt,updateUBOMapping:yt,uniformBlockBinding:ct,texStorage2D:nt,texStorage3D:mt,texSubImage2D:D,texSubImage3D:B,compressedTexSubImage2D:G,compressedTexSubImage3D:rt,scissor:gt,viewport:Ct,reset:Rt}}function Gx(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,b){return d?new OffscreenCanvas(L,b):yo("canvas")}function _(L,b,q){let D=1;const B=Se(L);if((B.width>q||B.height>q)&&(D=q/Math.max(B.width,B.height)),D<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const G=Math.floor(D*B.width),rt=Math.floor(D*B.height);u===void 0&&(u=g(G,rt));const nt=b?g(G,rt):u;return nt.width=G,nt.height=rt,nt.getContext("2d").drawImage(L,0,0,G,rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+G+"x"+rt+")."),nt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){n.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(L,b,q,D,B=!1){if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let G=b;if(b===n.RED&&(q===n.FLOAT&&(G=n.R32F),q===n.HALF_FLOAT&&(G=n.R16F),q===n.UNSIGNED_BYTE&&(G=n.R8)),b===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.R8UI),q===n.UNSIGNED_SHORT&&(G=n.R16UI),q===n.UNSIGNED_INT&&(G=n.R32UI),q===n.BYTE&&(G=n.R8I),q===n.SHORT&&(G=n.R16I),q===n.INT&&(G=n.R32I)),b===n.RG&&(q===n.FLOAT&&(G=n.RG32F),q===n.HALF_FLOAT&&(G=n.RG16F),q===n.UNSIGNED_BYTE&&(G=n.RG8)),b===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.RG8UI),q===n.UNSIGNED_SHORT&&(G=n.RG16UI),q===n.UNSIGNED_INT&&(G=n.RG32UI),q===n.BYTE&&(G=n.RG8I),q===n.SHORT&&(G=n.RG16I),q===n.INT&&(G=n.RG32I)),b===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.RGB8UI),q===n.UNSIGNED_SHORT&&(G=n.RGB16UI),q===n.UNSIGNED_INT&&(G=n.RGB32UI),q===n.BYTE&&(G=n.RGB8I),q===n.SHORT&&(G=n.RGB16I),q===n.INT&&(G=n.RGB32I)),b===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),q===n.UNSIGNED_INT&&(G=n.RGBA32UI),q===n.BYTE&&(G=n.RGBA8I),q===n.SHORT&&(G=n.RGBA16I),q===n.INT&&(G=n.RGBA32I)),b===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),b===n.RGBA){const rt=B?vo:Jt.getTransfer(D);q===n.FLOAT&&(G=n.RGBA32F),q===n.HALF_FLOAT&&(G=n.RGBA16F),q===n.UNSIGNED_BYTE&&(G=rt===ae?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function E(L,b){let q;return L?b===null||b===Xi||b===ns?q=n.DEPTH24_STENCIL8:b===An?q=n.DEPTH32F_STENCIL8:b===es&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Xi||b===ns?q=n.DEPTH_COMPONENT24:b===An?q=n.DEPTH_COMPONENT32F:b===es&&(q=n.DEPTH_COMPONENT16),q}function P(L,b){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Xe&&L.minFilter!==Nn?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function S(L){const b=L.target;b.removeEventListener("dispose",S),U(b),b.isVideoTexture&&h.delete(b)}function w(L){const b=L.target;b.removeEventListener("dispose",w),x(b)}function U(L){const b=i.get(L);if(b.__webglInit===void 0)return;const q=L.source,D=f.get(q);if(D){const B=D[b.__cacheKey];B.usedTimes--,B.usedTimes===0&&T(L),Object.keys(D).length===0&&f.delete(q)}i.remove(L)}function T(L){const b=i.get(L);n.deleteTexture(b.__webglTexture);const q=L.source,D=f.get(q);delete D[b.__cacheKey],o.memory.textures--}function x(L){const b=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let D=0;D<6;D++){if(Array.isArray(b.__webglFramebuffer[D]))for(let B=0;B<b.__webglFramebuffer[D].length;B++)n.deleteFramebuffer(b.__webglFramebuffer[D][B]);else n.deleteFramebuffer(b.__webglFramebuffer[D]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[D])}else{if(Array.isArray(b.__webglFramebuffer))for(let D=0;D<b.__webglFramebuffer.length;D++)n.deleteFramebuffer(b.__webglFramebuffer[D]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let D=0;D<b.__webglColorRenderbuffer.length;D++)b.__webglColorRenderbuffer[D]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[D]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const q=L.textures;for(let D=0,B=q.length;D<B;D++){const G=i.get(q[D]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(q[D])}i.remove(L)}let C=0;function O(){C=0}function z(){const L=C;return L>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),C+=1,L}function X(L){const b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.colorSpace),b.join()}function W(L,b){const q=i.get(L);if(L.isVideoTexture&&At(L),L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){const D=L.image;if(D===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(D.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{dt(q,L,b);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+b)}function K(L,b){const q=i.get(L);if(L.version>0&&q.__version!==L.version){dt(q,L,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+b)}function J(L,b){const q=i.get(L);if(L.version>0&&q.__version!==L.version){dt(q,L,b);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+b)}function Z(L,b){const q=i.get(L);if(L.version>0&&q.__version!==L.version){ht(q,L,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+b)}const at={[ja]:n.REPEAT,[Bi]:n.CLAMP_TO_EDGE,[Ka]:n.MIRRORED_REPEAT},R={[Xe]:n.NEAREST,[$p]:n.NEAREST_MIPMAP_NEAREST,[Ss]:n.NEAREST_MIPMAP_LINEAR,[Nn]:n.LINEAR,[Yo]:n.LINEAR_MIPMAP_NEAREST,[Hi]:n.LINEAR_MIPMAP_LINEAR},_t={[Jp]:n.NEVER,[sm]:n.ALWAYS,[tm]:n.LESS,[od]:n.LEQUAL,[em]:n.EQUAL,[rm]:n.GEQUAL,[nm]:n.GREATER,[im]:n.NOTEQUAL};function Ut(L,b){if(b.type===An&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Nn||b.magFilter===Yo||b.magFilter===Ss||b.magFilter===Hi||b.minFilter===Nn||b.minFilter===Yo||b.minFilter===Ss||b.minFilter===Hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,at[b.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,at[b.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,at[b.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,R[b.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,R[b.minFilter]),b.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,_t[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Xe||b.minFilter!==Ss&&b.minFilter!==Hi||b.type===An&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(L,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function I(L,b){let q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",S));const D=b.source;let B=f.get(D);B===void 0&&(B={},f.set(D,B));const G=X(b);if(G!==L.__cacheKey){B[G]===void 0&&(B[G]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),B[G].usedTimes++;const rt=B[L.__cacheKey];rt!==void 0&&(B[L.__cacheKey].usedTimes--,rt.usedTimes===0&&T(b)),L.__cacheKey=G,L.__webglTexture=B[G].texture}return q}function Q(L,b,q){return Math.floor(Math.floor(L/q)/b)}function lt(L,b,q,D){const G=L.updateRanges;if(G.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,q,D,b.data);else{G.sort((tt,gt)=>tt.start-gt.start);let rt=0;for(let tt=1;tt<G.length;tt++){const gt=G[rt],Ct=G[tt],yt=gt.start+gt.count,ct=Q(Ct.start,b.width,4),Rt=Q(gt.start,b.width,4);Ct.start<=yt+1&&ct===Rt&&Q(Ct.start+Ct.count-1,b.width,4)===ct?gt.count=Math.max(gt.count,Ct.start+Ct.count-gt.start):(++rt,G[rt]=Ct)}G.length=rt+1;const nt=n.getParameter(n.UNPACK_ROW_LENGTH),mt=n.getParameter(n.UNPACK_SKIP_PIXELS),xt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let tt=0,gt=G.length;tt<gt;tt++){const Ct=G[tt],yt=Math.floor(Ct.start/4),ct=Math.ceil(Ct.count/4),Rt=yt%b.width,k=Math.floor(yt/b.width),ft=ct,it=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Rt),n.pixelStorei(n.UNPACK_SKIP_ROWS,k),e.texSubImage2D(n.TEXTURE_2D,0,Rt,k,ft,it,q,D,b.data)}L.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,nt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,mt),n.pixelStorei(n.UNPACK_SKIP_ROWS,xt)}}function dt(L,b,q){let D=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(D=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(D=n.TEXTURE_3D);const B=I(L,b),G=b.source;e.bindTexture(D,L.__webglTexture,n.TEXTURE0+q);const rt=i.get(G);if(G.version!==rt.__version||B===!0){e.activeTexture(n.TEXTURE0+q);const nt=Jt.getPrimaries(Jt.workingColorSpace),mt=b.colorSpace===gi?null:Jt.getPrimaries(b.colorSpace),xt=b.colorSpace===gi||nt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let tt=_(b.image,!1,r.maxTextureSize);tt=kt(b,tt);const gt=s.convert(b.format,b.colorSpace),Ct=s.convert(b.type);let yt=M(b.internalFormat,gt,Ct,b.colorSpace,b.isVideoTexture);Ut(D,b);let ct;const Rt=b.mipmaps,k=b.isVideoTexture!==!0,ft=rt.__version===void 0||B===!0,it=G.dataReady,Mt=P(b,tt);if(b.isDepthTexture)yt=E(b.format===rs,b.type),ft&&(k?e.texStorage2D(n.TEXTURE_2D,1,yt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,gt,Ct,null));else if(b.isDataTexture)if(Rt.length>0){k&&ft&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],k?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,gt,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,gt,Ct,ct.data);b.generateMipmaps=!1}else k?(ft&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height),it&&lt(b,tt,gt,Ct)):e.texImage2D(n.TEXTURE_2D,0,yt,tt.width,tt.height,0,gt,Ct,tt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){k&&ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,Rt[0].width,Rt[0].height,tt.depth);for(let st=0,et=Rt.length;st<et;st++)if(ct=Rt[st],b.format!==sn)if(gt!==null)if(k){if(it)if(b.layerUpdates.size>0){const Et=mu(ct.width,ct.height,b.format,b.type);for(const Nt of b.layerUpdates){const ge=ct.data.subarray(Nt*Et/ct.data.BYTES_PER_ELEMENT,(Nt+1)*Et/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,Nt,ct.width,ct.height,1,gt,ge)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,ct.width,ct.height,tt.depth,gt,ct.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,st,yt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?it&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,ct.width,ct.height,tt.depth,gt,Ct,ct.data):e.texImage3D(n.TEXTURE_2D_ARRAY,st,yt,ct.width,ct.height,tt.depth,0,gt,Ct,ct.data)}else{k&&ft&&e.texStorage2D(n.TEXTURE_2D,Mt,yt,Rt[0].width,Rt[0].height);for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],b.format!==sn?gt!==null?k?it&&e.compressedTexSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,gt,ct.data):e.compressedTexImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,ct.width,ct.height,gt,Ct,ct.data):e.texImage2D(n.TEXTURE_2D,st,yt,ct.width,ct.height,0,gt,Ct,ct.data)}else if(b.isDataArrayTexture)if(k){if(ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,yt,tt.width,tt.height,tt.depth),it)if(b.layerUpdates.size>0){const st=mu(tt.width,tt.height,b.format,b.type);for(const et of b.layerUpdates){const Et=tt.data.subarray(et*st/tt.data.BYTES_PER_ELEMENT,(et+1)*st/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,et,tt.width,tt.height,1,gt,Ct,Et)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,gt,Ct,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,yt,tt.width,tt.height,tt.depth,0,gt,Ct,tt.data);else if(b.isData3DTexture)k?(ft&&e.texStorage3D(n.TEXTURE_3D,Mt,yt,tt.width,tt.height,tt.depth),it&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,gt,Ct,tt.data)):e.texImage3D(n.TEXTURE_3D,0,yt,tt.width,tt.height,tt.depth,0,gt,Ct,tt.data);else if(b.isFramebufferTexture){if(ft)if(k)e.texStorage2D(n.TEXTURE_2D,Mt,yt,tt.width,tt.height);else{let st=tt.width,et=tt.height;for(let Et=0;Et<Mt;Et++)e.texImage2D(n.TEXTURE_2D,Et,yt,st,et,0,gt,Ct,null),st>>=1,et>>=1}}else if(Rt.length>0){if(k&&ft){const st=Se(Rt[0]);e.texStorage2D(n.TEXTURE_2D,Mt,yt,st.width,st.height)}for(let st=0,et=Rt.length;st<et;st++)ct=Rt[st],k?it&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,gt,Ct,ct):e.texImage2D(n.TEXTURE_2D,st,yt,gt,Ct,ct);b.generateMipmaps=!1}else if(k){if(ft){const st=Se(tt);e.texStorage2D(n.TEXTURE_2D,Mt,yt,st.width,st.height)}it&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt,Ct,tt)}else e.texImage2D(n.TEXTURE_2D,0,yt,gt,Ct,tt);m(b)&&p(D),rt.__version=G.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function ht(L,b,q){if(b.image.length!==6)return;const D=I(L,b),B=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+q);const G=i.get(B);if(B.version!==G.__version||D===!0){e.activeTexture(n.TEXTURE0+q);const rt=Jt.getPrimaries(Jt.workingColorSpace),nt=b.colorSpace===gi?null:Jt.getPrimaries(b.colorSpace),mt=b.colorSpace===gi||rt===nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const xt=b.isCompressedTexture||b.image[0].isCompressedTexture,tt=b.image[0]&&b.image[0].isDataTexture,gt=[];for(let et=0;et<6;et++)!xt&&!tt?gt[et]=_(b.image[et],!0,r.maxCubemapSize):gt[et]=tt?b.image[et].image:b.image[et],gt[et]=kt(b,gt[et]);const Ct=gt[0],yt=s.convert(b.format,b.colorSpace),ct=s.convert(b.type),Rt=M(b.internalFormat,yt,ct,b.colorSpace),k=b.isVideoTexture!==!0,ft=G.__version===void 0||D===!0,it=B.dataReady;let Mt=P(b,Ct);Ut(n.TEXTURE_CUBE_MAP,b);let st;if(xt){k&&ft&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,Ct.width,Ct.height);for(let et=0;et<6;et++){st=gt[et].mipmaps;for(let Et=0;Et<st.length;Et++){const Nt=st[Et];b.format!==sn?yt!==null?k?it&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,Nt.width,Nt.height,yt,Nt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,0,0,Nt.width,Nt.height,yt,ct,Nt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et,Rt,Nt.width,Nt.height,0,yt,ct,Nt.data)}}}else{if(st=b.mipmaps,k&&ft){st.length>0&&Mt++;const et=Se(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Rt,et.width,et.height)}for(let et=0;et<6;et++)if(tt){k?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,gt[et].width,gt[et].height,yt,ct,gt[et].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,gt[et].width,gt[et].height,0,yt,ct,gt[et].data);for(let Et=0;Et<st.length;Et++){const ge=st[Et].image[et].image;k?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,ge.width,ge.height,yt,ct,ge.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,ge.width,ge.height,0,yt,ct,ge.data)}}else{k?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,yt,ct,gt[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Rt,yt,ct,gt[et]);for(let Et=0;Et<st.length;Et++){const Nt=st[Et];k?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,0,0,yt,ct,Nt.image[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Et+1,Rt,yt,ct,Nt.image[et])}}}m(b)&&p(n.TEXTURE_CUBE_MAP),G.__version=B.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function St(L,b,q,D,B,G){const rt=s.convert(q.format,q.colorSpace),nt=s.convert(q.type),mt=M(q.internalFormat,rt,nt,q.colorSpace),xt=i.get(b),tt=i.get(q);if(tt.__renderTarget=b,!xt.__hasExternalTextures){const gt=Math.max(1,b.width>>G),Ct=Math.max(1,b.height>>G);B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?e.texImage3D(B,G,mt,gt,Ct,b.depth,0,rt,nt,null):e.texImage2D(B,G,mt,gt,Ct,0,rt,nt,null)}e.bindFramebuffer(n.FRAMEBUFFER,L),Yt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,D,B,tt.__webglTexture,0,Tt(b)):(B===n.TEXTURE_2D||B>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&B<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,D,B,tt.__webglTexture,G),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Wt(L,b,q){if(n.bindRenderbuffer(n.RENDERBUFFER,L),b.depthBuffer){const D=b.depthTexture,B=D&&D.isDepthTexture?D.type:null,G=E(b.stencilBuffer,B),rt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=Tt(b);Yt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt,G,b.width,b.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt,G,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,G,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,L)}else{const D=b.textures;for(let B=0;B<D.length;B++){const G=D[B],rt=s.convert(G.format,G.colorSpace),nt=s.convert(G.type),mt=M(G.internalFormat,rt,nt,G.colorSpace),xt=Tt(b);q&&Yt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,mt,b.width,b.height):Yt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,mt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,mt,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function wt(L,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const D=i.get(b.depthTexture);D.__renderTarget=b,(!D.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);const B=D.__webglTexture,G=Tt(b);if(b.depthTexture.format===is)Yt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,B,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,B,0);else if(b.depthTexture.format===rs)Yt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,B,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,B,0);else throw new Error("Unknown depthTexture format")}function ce(L){const b=i.get(L),q=L.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==L.depthTexture){const D=L.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),D){const B=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,D.removeEventListener("dispose",B)};D.addEventListener("dispose",B),b.__depthDisposeCallback=B}b.__boundDepthTexture=D}if(L.depthTexture&&!b.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");const D=L.texture.mipmaps;D&&D.length>0?wt(b.__webglFramebuffer[0],L):wt(b.__webglFramebuffer,L)}else if(q){b.__webglDepthbuffer=[];for(let D=0;D<6;D++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[D]),b.__webglDepthbuffer[D]===void 0)b.__webglDepthbuffer[D]=n.createRenderbuffer(),Wt(b.__webglDepthbuffer[D],L,!1);else{const B=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=b.__webglDepthbuffer[D];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,G)}}else{const D=L.texture.mipmaps;if(D&&D.length>0?e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Wt(b.__webglDepthbuffer,L,!1);else{const B=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,G)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function me(L,b,q){const D=i.get(L);b!==void 0&&St(D.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&ce(L)}function Qt(L){const b=L.texture,q=i.get(L),D=i.get(b);L.addEventListener("dispose",w);const B=L.textures,G=L.isWebGLCubeRenderTarget===!0,rt=B.length>1;if(rt||(D.__webglTexture===void 0&&(D.__webglTexture=n.createTexture()),D.__version=b.version,o.memory.textures++),G){q.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer[nt]=[];for(let mt=0;mt<b.mipmaps.length;mt++)q.__webglFramebuffer[nt][mt]=n.createFramebuffer()}else q.__webglFramebuffer[nt]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer=[];for(let nt=0;nt<b.mipmaps.length;nt++)q.__webglFramebuffer[nt]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(rt)for(let nt=0,mt=B.length;nt<mt;nt++){const xt=i.get(B[nt]);xt.__webglTexture===void 0&&(xt.__webglTexture=n.createTexture(),o.memory.textures++)}if(L.samples>0&&Yt(L)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let nt=0;nt<B.length;nt++){const mt=B[nt];q.__webglColorRenderbuffer[nt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[nt]);const xt=s.convert(mt.format,mt.colorSpace),tt=s.convert(mt.type),gt=M(mt.internalFormat,xt,tt,mt.colorSpace,L.isXRRenderTarget===!0),Ct=Tt(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ct,gt,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.RENDERBUFFER,q.__webglColorRenderbuffer[nt])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),Wt(q.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture),Ut(n.TEXTURE_CUBE_MAP,b);for(let nt=0;nt<6;nt++)if(b.mipmaps&&b.mipmaps.length>0)for(let mt=0;mt<b.mipmaps.length;mt++)St(q.__webglFramebuffer[nt][mt],L,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,mt);else St(q.__webglFramebuffer[nt],L,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(b)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let nt=0,mt=B.length;nt<mt;nt++){const xt=B[nt],tt=i.get(xt);e.bindTexture(n.TEXTURE_2D,tt.__webglTexture),Ut(n.TEXTURE_2D,xt),St(q.__webglFramebuffer,L,xt,n.COLOR_ATTACHMENT0+nt,n.TEXTURE_2D,0),m(xt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let nt=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(nt=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(nt,D.__webglTexture),Ut(nt,b),b.mipmaps&&b.mipmaps.length>0)for(let mt=0;mt<b.mipmaps.length;mt++)St(q.__webglFramebuffer[mt],L,b,n.COLOR_ATTACHMENT0,nt,mt);else St(q.__webglFramebuffer,L,b,n.COLOR_ATTACHMENT0,nt,0);m(b)&&p(nt),e.unbindTexture()}L.depthBuffer&&ce(L)}function F(L){const b=L.textures;for(let q=0,D=b.length;q<D;q++){const B=b[q];if(m(B)){const G=y(L),rt=i.get(B).__webglTexture;e.bindTexture(G,rt),p(G),e.unbindTexture()}}}const Pe=[],Zt=[];function re(L){if(L.samples>0){if(Yt(L)===!1){const b=L.textures,q=L.width,D=L.height;let B=n.COLOR_BUFFER_BIT;const G=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=i.get(L),nt=b.length>1;if(nt)for(let xt=0;xt<b.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);const mt=L.texture.mipmaps;mt&&mt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let xt=0;xt<b.length;xt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(B|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(B|=n.STENCIL_BUFFER_BIT)),nt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,rt.__webglColorRenderbuffer[xt]);const tt=i.get(b[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,q,D,0,0,q,D,B,n.NEAREST),l===!0&&(Pe.length=0,Zt.length=0,Pe.push(n.COLOR_ATTACHMENT0+xt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Pe.push(G),Zt.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Zt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),nt)for(let xt=0;xt<b.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,rt.__webglColorRenderbuffer[xt]);const tt=i.get(b[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const b=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Tt(L){return Math.min(r.maxSamples,L.samples)}function Yt(L){const b=i.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function At(L){const b=o.render.frame;h.get(L)!==b&&(h.set(L,b),L.update())}function kt(L,b){const q=L.colorSpace,D=L.format,B=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||q!==Ar&&q!==gi&&(Jt.getTransfer(q)===ae?(D!==sn||B!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),b}function Se(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=W,this.setTexture2DArray=K,this.setTexture3D=J,this.setTextureCube=Z,this.rebindTextures=me,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Yt}function Wx(n,t){function e(i,r=gi){let s;const o=Jt.getTransfer(r);if(i===ii)return n.UNSIGNED_BYTE;if(i===Gl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===td)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qh)return n.BYTE;if(i===Jh)return n.SHORT;if(i===es)return n.UNSIGNED_SHORT;if(i===Vl)return n.INT;if(i===Xi)return n.UNSIGNED_INT;if(i===An)return n.FLOAT;if(i===ti)return n.HALF_FLOAT;if(i===ed)return n.ALPHA;if(i===nd)return n.RGB;if(i===sn)return n.RGBA;if(i===is)return n.DEPTH_COMPONENT;if(i===rs)return n.DEPTH_STENCIL;if(i===id)return n.RED;if(i===Xl)return n.RED_INTEGER;if(i===rd)return n.RG;if(i===ql)return n.RG_INTEGER;if(i===Yl)return n.RGBA_INTEGER;if(i===io||i===ro||i===so||i===oo)if(o===ae)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===io)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===oo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===io)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===oo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Qa||i===Ja||i===tl||i===el)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Qa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ja)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===tl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===el)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===nl||i===il||i===rl)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===nl||i===il)return o===ae?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===rl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===sl||i===ol||i===al||i===ll||i===cl||i===ul||i===hl||i===dl||i===fl||i===pl||i===ml||i===gl||i===_l||i===vl)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===sl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ol)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===al)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ll)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ul)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===hl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ml)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===gl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_l)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vl)return o===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ao||i===xl||i===yl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ao)return o===ae?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===yl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sd||i===Sl||i===Ml||i===El)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===ao)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Sl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ml)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===El)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ns?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const Xx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qx=`
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

}`;class Yx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new qe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new De({vertexShader:Xx,fragmentShader:qx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Cn(new Ao(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $x extends Lr{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=new Yx,m=e.getContextAttributes();let p=null,y=null;const M=[],E=[],P=new zt;let S=null;const w=new pn;w.viewport=new ue;const U=new pn;U.viewport=new ue;const T=[w,U],x=new dg;let C=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let lt=M[Q];return lt===void 0&&(lt=new pa,M[Q]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function(Q){let lt=M[Q];return lt===void 0&&(lt=new pa,M[Q]=lt),lt.getGripSpace()},this.getHand=function(Q){let lt=M[Q];return lt===void 0&&(lt=new pa,M[Q]=lt),lt.getHandSpace()};function z(Q){const lt=E.indexOf(Q.inputSource);if(lt===-1)return;const dt=M[lt];dt!==void 0&&(dt.update(Q.inputSource,Q.frame,c||o),dt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function X(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",W);for(let Q=0;Q<M.length;Q++){const lt=E[Q];lt!==null&&(E[Q]=null,M[Q].disconnect(lt))}C=null,O=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,r=null,y=null,I.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",X),r.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(P),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,ht=null,St=null;m.depth&&(St=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=m.stencil?rs:is,ht=m.stencil?ns:Xi);const Wt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:s};u=new XRWebGLBinding(r,e),f=u.createProjectionLayer(Wt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Pn(f.textureWidth,f.textureHeight,{format:sn,type:ii,depthTexture:new gd(f.textureWidth,f.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const dt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,dt),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Pn(d.framebufferWidth,d.framebufferHeight,{format:sn,type:ii,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),I.setContext(r),I.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(Q){for(let lt=0;lt<Q.removed.length;lt++){const dt=Q.removed[lt],ht=E.indexOf(dt);ht>=0&&(E[ht]=null,M[ht].disconnect(dt))}for(let lt=0;lt<Q.added.length;lt++){const dt=Q.added[lt];let ht=E.indexOf(dt);if(ht===-1){for(let Wt=0;Wt<M.length;Wt++)if(Wt>=E.length){E.push(dt),ht=Wt;break}else if(E[Wt]===null){E[Wt]=dt,ht=Wt;break}if(ht===-1)break}const St=M[ht];St&&St.connect(dt)}}const K=new N,J=new N;function Z(Q,lt,dt){K.setFromMatrixPosition(lt.matrixWorld),J.setFromMatrixPosition(dt.matrixWorld);const ht=K.distanceTo(J),St=lt.projectionMatrix.elements,Wt=dt.projectionMatrix.elements,wt=St[14]/(St[10]-1),ce=St[14]/(St[10]+1),me=(St[9]+1)/St[5],Qt=(St[9]-1)/St[5],F=(St[8]-1)/St[0],Pe=(Wt[8]+1)/Wt[0],Zt=wt*F,re=wt*Pe,Tt=ht/(-F+Pe),Yt=Tt*-F;if(lt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Yt),Q.translateZ(Tt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),St[10]===-1)Q.projectionMatrix.copy(lt.projectionMatrix),Q.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{const At=wt+Tt,kt=ce+Tt,Se=Zt-Yt,L=re+(ht-Yt),b=me*ce/kt*At,q=Qt*ce/kt*At;Q.projectionMatrix.makePerspective(Se,L,b,q,At,kt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function at(Q,lt){lt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(lt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let lt=Q.near,dt=Q.far;_.texture!==null&&(_.depthNear>0&&(lt=_.depthNear),_.depthFar>0&&(dt=_.depthFar)),x.near=U.near=w.near=lt,x.far=U.far=w.far=dt,(C!==x.near||O!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,O=x.far),w.layers.mask=Q.layers.mask|2,U.layers.mask=Q.layers.mask|4,x.layers.mask=w.layers.mask|U.layers.mask;const ht=Q.parent,St=x.cameras;at(x,ht);for(let Wt=0;Wt<St.length;Wt++)at(St[Wt],ht);St.length===2?Z(x,w,U):x.projectionMatrix.copy(w.projectionMatrix),R(Q,x,ht)};function R(Q,lt,dt){dt===null?Q.matrix.copy(lt.matrixWorld):(Q.matrix.copy(dt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(lt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(lt.projectionMatrix),Q.projectionMatrixInverse.copy(lt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ss*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let _t=null;function Ut(Q,lt){if(h=lt.getViewerPose(c||o),g=lt,h!==null){const dt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let ht=!1;dt.length!==x.cameras.length&&(x.cameras.length=0,ht=!0);for(let wt=0;wt<dt.length;wt++){const ce=dt[wt];let me=null;if(d!==null)me=d.getViewport(ce);else{const F=u.getViewSubImage(f,ce);me=F.viewport,wt===0&&(t.setRenderTargetTextures(y,F.colorTexture,F.depthStencilTexture),t.setRenderTarget(y))}let Qt=T[wt];Qt===void 0&&(Qt=new pn,Qt.layers.enable(wt),Qt.viewport=new ue,T[wt]=Qt),Qt.matrix.fromArray(ce.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(ce.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(me.x,me.y,me.width,me.height),wt===0&&(x.matrix.copy(Qt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ht===!0&&x.cameras.push(Qt)}const St=r.enabledFeatures;if(St&&St.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&u){const wt=u.getDepthInformation(dt[0]);wt&&wt.isValid&&wt.texture&&_.init(t,wt,r.renderState)}}for(let dt=0;dt<M.length;dt++){const ht=E[dt],St=M[dt];ht!==null&&St!==void 0&&St.update(ht,lt,c||o)}_t&&_t(Q,lt),lt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:lt}),g=null}const I=new xd;I.setAnimationLoop(Ut),this.setAnimationLoop=function(Q){_t=Q},this.dispose=function(){}}}const Ii=new ri,Zx=new pe;function jx(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,dd(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,M,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,E)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),M=y.envMap,E=y.envMapRotation;M&&(m.envMap.value=M,Ii.copy(E),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),m.envMapRotation.value.setFromMatrix4(Zx.makeRotationFromEuler(Ii)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Kx(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){const E=M.program;i.uniformBlockBinding(y,E)}function c(y,M){let E=r[y.id];E===void 0&&(g(y),E=h(y),r[y.id]=E,y.addEventListener("dispose",m));const P=M.program;i.updateUBOMapping(y,P);const S=t.render.frame;s[y.id]!==S&&(f(y),s[y.id]=S)}function h(y){const M=u();y.__bindingPointIndex=M;const E=n.createBuffer(),P=y.__size,S=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,E),E}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const M=r[y.id],E=y.uniforms,P=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let S=0,w=E.length;S<w;S++){const U=Array.isArray(E[S])?E[S]:[E[S]];for(let T=0,x=U.length;T<x;T++){const C=U[T];if(d(C,S,T,P)===!0){const O=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let W=0;W<z.length;W++){const K=z[W],J=_(K);typeof K=="number"||typeof K=="boolean"?(C.__data[0]=K,n.bufferSubData(n.UNIFORM_BUFFER,O+X,C.__data)):K.isMatrix3?(C.__data[0]=K.elements[0],C.__data[1]=K.elements[1],C.__data[2]=K.elements[2],C.__data[3]=0,C.__data[4]=K.elements[3],C.__data[5]=K.elements[4],C.__data[6]=K.elements[5],C.__data[7]=0,C.__data[8]=K.elements[6],C.__data[9]=K.elements[7],C.__data[10]=K.elements[8],C.__data[11]=0):(K.toArray(C.__data,X),X+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,M,E,P){const S=y.value,w=M+"_"+E;if(P[w]===void 0)return typeof S=="number"||typeof S=="boolean"?P[w]=S:P[w]=S.clone(),!0;{const U=P[w];if(typeof S=="number"||typeof S=="boolean"){if(U!==S)return P[w]=S,!0}else if(U.equals(S)===!1)return U.copy(S),!0}return!1}function g(y){const M=y.uniforms;let E=0;const P=16;for(let w=0,U=M.length;w<U;w++){const T=Array.isArray(M[w])?M[w]:[M[w]];for(let x=0,C=T.length;x<C;x++){const O=T[x],z=Array.isArray(O.value)?O.value:[O.value];for(let X=0,W=z.length;X<W;X++){const K=z[X],J=_(K),Z=E%P,at=Z%J.boundary,R=Z+at;E+=at,R!==0&&P-R<J.storage&&(E+=P-R),O.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=E,E+=J.storage}}}const S=E%P;return S>0&&(E+=P-S),y.__size=E,y.__cache={},this}function _(y){const M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),M}function m(y){const M=y.target;M.removeEventListener("dispose",m);const E=o.indexOf(M.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const y in r)n.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class Qx{constructor(t={}){const{canvas:e=bm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const y=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let P=!1;this._outputColorSpace=fn;let S=0,w=0,U=null,T=-1,x=null;const C=new ue,O=new ue;let z=null;const X=new jt(0);let W=0,K=e.width,J=e.height,Z=1,at=null,R=null;const _t=new ue(0,0,K,J),Ut=new ue(0,0,K,J);let I=!1;const Q=new Jl;let lt=!1,dt=!1;const ht=new pe,St=new pe,Wt=new N,wt=new ue,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Qt(){return U===null?Z:1}let F=i;function Pe(A,H){return e.getContext(A,H)}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Bl}`),e.addEventListener("webglcontextlost",Mt,!1),e.addEventListener("webglcontextrestored",st,!1),e.addEventListener("webglcontextcreationerror",et,!1),F===null){const H="webgl2";if(F=Pe(H,A),F===null)throw Pe(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Zt,re,Tt,Yt,At,kt,Se,L,b,q,D,B,G,rt,nt,mt,xt,tt,gt,Ct,yt,ct,Rt,k;function ft(){Zt=new lv(F),Zt.init(),ct=new Wx(F,Zt),re=new ev(F,Zt,t,ct),Tt=new Vx(F,Zt),re.reverseDepthBuffer&&f&&Tt.buffers.depth.setReversed(!0),Yt=new hv(F),At=new Rx,kt=new Gx(F,Zt,Tt,At,re,ct,Yt),Se=new iv(E),L=new av(E),b=new _g(F),Rt=new J0(F,b),q=new cv(F,b,Yt,Rt),D=new fv(F,q,b,Yt),gt=new dv(F,re,kt),mt=new nv(At),B=new Cx(E,Se,L,Zt,re,Rt,mt),G=new jx(E,At),rt=new Lx,nt=new Nx(Zt),tt=new Q0(E,Se,L,Tt,D,d,l),xt=new Bx(E,D,re),k=new Kx(F,Yt,re,Tt),Ct=new tv(F,Zt,Yt),yt=new uv(F,Zt,Yt),Yt.programs=B.programs,E.capabilities=re,E.extensions=Zt,E.properties=At,E.renderLists=rt,E.shadowMap=xt,E.state=Tt,E.info=Yt}ft();const it=new $x(E,F);this.xr=it,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=Zt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Zt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(A){A!==void 0&&(Z=A,this.setSize(K,J,!1))},this.getSize=function(A){return A.set(K,J)},this.setSize=function(A,H,$=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=A,J=H,e.width=Math.floor(A*Z),e.height=Math.floor(H*Z),$===!0&&(e.style.width=A+"px",e.style.height=H+"px"),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(K*Z,J*Z).floor()},this.setDrawingBufferSize=function(A,H,$){K=A,J=H,Z=$,e.width=Math.floor(A*$),e.height=Math.floor(H*$),this.setViewport(0,0,A,H)},this.getCurrentViewport=function(A){return A.copy(C)},this.getViewport=function(A){return A.copy(_t)},this.setViewport=function(A,H,$,j){A.isVector4?_t.set(A.x,A.y,A.z,A.w):_t.set(A,H,$,j),Tt.viewport(C.copy(_t).multiplyScalar(Z).round())},this.getScissor=function(A){return A.copy(Ut)},this.setScissor=function(A,H,$,j){A.isVector4?Ut.set(A.x,A.y,A.z,A.w):Ut.set(A,H,$,j),Tt.scissor(O.copy(Ut).multiplyScalar(Z).round())},this.getScissorTest=function(){return I},this.setScissorTest=function(A){Tt.setScissorTest(I=A)},this.setOpaqueSort=function(A){at=A},this.setTransparentSort=function(A){R=A},this.getClearColor=function(A){return A.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,$=!0){let j=0;if(A){let V=!1;if(U!==null){const ot=U.texture.format;V=ot===Yl||ot===ql||ot===Xl}if(V){const ot=U.texture.type,pt=ot===ii||ot===Xi||ot===es||ot===ns||ot===Gl||ot===Wl,bt=tt.getClearColor(),vt=tt.getClearAlpha(),It=bt.r,Ft=bt.g,Pt=bt.b;pt?(g[0]=It,g[1]=Ft,g[2]=Pt,g[3]=vt,F.clearBufferuiv(F.COLOR,0,g)):(_[0]=It,_[1]=Ft,_[2]=Pt,_[3]=vt,F.clearBufferiv(F.COLOR,0,_))}else j|=F.COLOR_BUFFER_BIT}H&&(j|=F.DEPTH_BUFFER_BIT),$&&(j|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Mt,!1),e.removeEventListener("webglcontextrestored",st,!1),e.removeEventListener("webglcontextcreationerror",et,!1),tt.dispose(),rt.dispose(),nt.dispose(),At.dispose(),Se.dispose(),L.dispose(),D.dispose(),Rt.dispose(),k.dispose(),B.dispose(),it.dispose(),it.removeEventListener("sessionstart",lc),it.removeEventListener("sessionend",cc),Ti.stop()};function Mt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function st(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const A=Yt.autoReset,H=xt.enabled,$=xt.autoUpdate,j=xt.needsUpdate,V=xt.type;ft(),Yt.autoReset=A,xt.enabled=H,xt.autoUpdate=$,xt.needsUpdate=j,xt.type=V}function et(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Et(A){const H=A.target;H.removeEventListener("dispose",Et),Nt(H)}function Nt(A){ge(A),At.remove(A)}function ge(A){const H=At.get(A).programs;H!==void 0&&(H.forEach(function($){B.releaseProgram($)}),A.isShaderMaterial&&B.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,$,j,V,ot){H===null&&(H=ce);const pt=V.isMesh&&V.matrixWorld.determinant()<0,bt=uf(A,H,$,j,V);Tt.setMaterial(j,pt);let vt=$.index,It=1;if(j.wireframe===!0){if(vt=q.getWireframeAttribute($),vt===void 0)return;It=2}const Ft=$.drawRange,Pt=$.attributes.position;let $t=Ft.start*It,oe=(Ft.start+Ft.count)*It;ot!==null&&($t=Math.max($t,ot.start*It),oe=Math.min(oe,(ot.start+ot.count)*It)),vt!==null?($t=Math.max($t,0),oe=Math.min(oe,vt.count)):Pt!=null&&($t=Math.max($t,0),oe=Math.min(oe,Pt.count));const ve=oe-$t;if(ve<0||ve===1/0)return;Rt.setup(V,j,bt,$,vt);let ye,te=Ct;if(vt!==null&&(ye=b.get(vt),te=yt,te.setIndex(ye)),V.isMesh)j.wireframe===!0?(Tt.setLineWidth(j.wireframeLinewidth*Qt()),te.setMode(F.LINES)):te.setMode(F.TRIANGLES);else if(V.isLine){let Dt=j.linewidth;Dt===void 0&&(Dt=1),Tt.setLineWidth(Dt*Qt()),V.isLineSegments?te.setMode(F.LINES):V.isLineLoop?te.setMode(F.LINE_LOOP):te.setMode(F.LINE_STRIP)}else V.isPoints?te.setMode(F.POINTS):V.isSprite&&te.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)yr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),te.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))te.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Dt=V._multiDrawStarts,Ue=V._multiDrawCounts,ne=V._multiDrawCount,xn=vt?b.get(vt).bytesPerElement:1,Zi=At.get(j).currentProgram.getUniforms();for(let en=0;en<ne;en++)Zi.setValue(F,"_gl_DrawID",en),te.render(Dt[en]/xn,Ue[en])}else if(V.isInstancedMesh)te.renderInstances($t,ve,V.count);else if($.isInstancedBufferGeometry){const Dt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ue=Math.min($.instanceCount,Dt);te.renderInstances($t,ve,Ue)}else te.render($t,ve)};function se(A,H,$){A.transparent===!0&&A.side===jn&&A.forceSinglePass===!1?(A.side=Je,A.needsUpdate=!0,fs(A,H,$),A.side=yi,A.needsUpdate=!0,fs(A,H,$),A.side=jn):fs(A,H,$)}this.compile=function(A,H,$=null){$===null&&($=A),p=nt.get($),p.init(H),M.push(p),$.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),A!==$&&A.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const j=new Set;return A.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ot=V.material;if(ot)if(Array.isArray(ot))for(let pt=0;pt<ot.length;pt++){const bt=ot[pt];se(bt,$,V),j.add(bt)}else se(ot,$,V),j.add(ot)}),p=M.pop(),j},this.compileAsync=function(A,H,$=null){const j=this.compile(A,H,$);return new Promise(V=>{function ot(){if(j.forEach(function(pt){At.get(pt).currentProgram.isReady()&&j.delete(pt)}),j.size===0){V(A);return}setTimeout(ot,10)}Zt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let vn=null;function Bn(A){vn&&vn(A)}function lc(){Ti.stop()}function cc(){Ti.start()}const Ti=new xd;Ti.setAnimationLoop(Bn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(A){vn=A,it.setAnimationLoop(A),A===null?Ti.stop():Ti.start()},it.addEventListener("sessionstart",lc),it.addEventListener("sessionend",cc),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(H),H=it.getCamera()),A.isScene===!0&&A.onBeforeRender(E,A,H,U),p=nt.get(A,M.length),p.init(H),M.push(p),St.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Q.setFromProjectionMatrix(St),dt=this.localClippingEnabled,lt=mt.init(this.clippingPlanes,dt),m=rt.get(A,y.length),m.init(),y.push(m),it.enabled===!0&&it.isPresenting===!0){const ot=E.xr.getDepthSensingMesh();ot!==null&&Uo(ot,H,-1/0,E.sortObjects)}Uo(A,H,0,E.sortObjects),m.finish(),E.sortObjects===!0&&m.sort(at,R),me=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,me&&tt.addToRenderList(m,A),this.info.render.frame++,lt===!0&&mt.beginShadows();const $=p.state.shadowsArray;xt.render($,A,H),lt===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,V=m.transmissive;if(p.setupLights(),H.isArrayCamera){const ot=H.cameras;if(V.length>0)for(let pt=0,bt=ot.length;pt<bt;pt++){const vt=ot[pt];hc(j,V,A,vt)}me&&tt.render(A);for(let pt=0,bt=ot.length;pt<bt;pt++){const vt=ot[pt];uc(m,A,vt,vt.viewport)}}else V.length>0&&hc(j,V,A,H),me&&tt.render(A),uc(m,A,H);U!==null&&w===0&&(kt.updateMultisampleRenderTarget(U),kt.updateRenderTargetMipmap(U)),A.isScene===!0&&A.onAfterRender(E,A,H),Rt.resetDefaultState(),T=-1,x=null,M.pop(),M.length>0?(p=M[M.length-1],lt===!0&&mt.setGlobalState(E.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Uo(A,H,$,j){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Q.intersectsSprite(A)){j&&wt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(St);const pt=D.update(A),bt=A.material;bt.visible&&m.push(A,pt,bt,$,wt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Q.intersectsObject(A))){const pt=D.update(A),bt=A.material;if(j&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),wt.copy(A.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),wt.copy(pt.boundingSphere.center)),wt.applyMatrix4(A.matrixWorld).applyMatrix4(St)),Array.isArray(bt)){const vt=pt.groups;for(let It=0,Ft=vt.length;It<Ft;It++){const Pt=vt[It],$t=bt[Pt.materialIndex];$t&&$t.visible&&m.push(A,pt,$t,$,wt.z,Pt)}}else bt.visible&&m.push(A,pt,bt,$,wt.z,null)}}const ot=A.children;for(let pt=0,bt=ot.length;pt<bt;pt++)Uo(ot[pt],H,$,j)}function uc(A,H,$,j){const V=A.opaque,ot=A.transmissive,pt=A.transparent;p.setupLightsView($),lt===!0&&mt.setGlobalState(E.clippingPlanes,$),j&&Tt.viewport(C.copy(j)),V.length>0&&ds(V,H,$),ot.length>0&&ds(ot,H,$),pt.length>0&&ds(pt,H,$),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function hc(A,H,$,j){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Pn(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?ti:ii,minFilter:Hi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const ot=p.state.transmissionRenderTarget[j.id],pt=j.viewport||C;ot.setSize(pt.z*E.transmissionResolutionScale,pt.w*E.transmissionResolutionScale);const bt=E.getRenderTarget();E.setRenderTarget(ot),E.getClearColor(X),W=E.getClearAlpha(),W<1&&E.setClearColor(16777215,.5),E.clear(),me&&tt.render($);const vt=E.toneMapping;E.toneMapping=xi;const It=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),lt===!0&&mt.setGlobalState(E.clippingPlanes,j),ds(A,$,j),kt.updateMultisampleRenderTarget(ot),kt.updateRenderTargetMipmap(ot),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let Pt=0,$t=H.length;Pt<$t;Pt++){const oe=H[Pt],ve=oe.object,ye=oe.geometry,te=oe.material,Dt=oe.group;if(te.side===jn&&ve.layers.test(j.layers)){const Ue=te.side;te.side=Je,te.needsUpdate=!0,dc(ve,$,j,ye,te,Dt),te.side=Ue,te.needsUpdate=!0,Ft=!0}}Ft===!0&&(kt.updateMultisampleRenderTarget(ot),kt.updateRenderTargetMipmap(ot))}E.setRenderTarget(bt),E.setClearColor(X,W),It!==void 0&&(j.viewport=It),E.toneMapping=vt}function ds(A,H,$){const j=H.isScene===!0?H.overrideMaterial:null;for(let V=0,ot=A.length;V<ot;V++){const pt=A[V],bt=pt.object,vt=pt.geometry,It=pt.group;let Ft=pt.material;Ft.allowOverride===!0&&j!==null&&(Ft=j),bt.layers.test($.layers)&&dc(bt,H,$,vt,Ft,It)}}function dc(A,H,$,j,V,ot){A.onBeforeRender(E,H,$,j,V,ot),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(E,H,$,j,A,ot),V.transparent===!0&&V.side===jn&&V.forceSinglePass===!1?(V.side=Je,V.needsUpdate=!0,E.renderBufferDirect($,H,j,V,A,ot),V.side=yi,V.needsUpdate=!0,E.renderBufferDirect($,H,j,V,A,ot),V.side=jn):E.renderBufferDirect($,H,j,V,A,ot),A.onAfterRender(E,H,$,j,V,ot)}function fs(A,H,$){H.isScene!==!0&&(H=ce);const j=At.get(A),V=p.state.lights,ot=p.state.shadowsArray,pt=V.state.version,bt=B.getParameters(A,V.state,ot,H,$),vt=B.getProgramCacheKey(bt);let It=j.programs;j.environment=A.isMeshStandardMaterial?H.environment:null,j.fog=H.fog,j.envMap=(A.isMeshStandardMaterial?L:Se).get(A.envMap||j.environment),j.envMapRotation=j.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,It===void 0&&(A.addEventListener("dispose",Et),It=new Map,j.programs=It);let Ft=It.get(vt);if(Ft!==void 0){if(j.currentProgram===Ft&&j.lightsStateVersion===pt)return pc(A,bt),Ft}else bt.uniforms=B.getUniforms(A),A.onBeforeCompile(bt,E),Ft=B.acquireProgram(bt,vt),It.set(vt,Ft),j.uniforms=bt.uniforms;const Pt=j.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pt.clippingPlanes=mt.uniform),pc(A,bt),j.needsLights=df(A),j.lightsStateVersion=pt,j.needsLights&&(Pt.ambientLightColor.value=V.state.ambient,Pt.lightProbe.value=V.state.probe,Pt.directionalLights.value=V.state.directional,Pt.directionalLightShadows.value=V.state.directionalShadow,Pt.spotLights.value=V.state.spot,Pt.spotLightShadows.value=V.state.spotShadow,Pt.rectAreaLights.value=V.state.rectArea,Pt.ltc_1.value=V.state.rectAreaLTC1,Pt.ltc_2.value=V.state.rectAreaLTC2,Pt.pointLights.value=V.state.point,Pt.pointLightShadows.value=V.state.pointShadow,Pt.hemisphereLights.value=V.state.hemi,Pt.directionalShadowMap.value=V.state.directionalShadowMap,Pt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pt.spotShadowMap.value=V.state.spotShadowMap,Pt.spotLightMatrix.value=V.state.spotLightMatrix,Pt.spotLightMap.value=V.state.spotLightMap,Pt.pointShadowMap.value=V.state.pointShadowMap,Pt.pointShadowMatrix.value=V.state.pointShadowMatrix),j.currentProgram=Ft,j.uniformsList=null,Ft}function fc(A){if(A.uniformsList===null){const H=A.currentProgram.getUniforms();A.uniformsList=lo.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function pc(A,H){const $=At.get(A);$.outputColorSpace=H.outputColorSpace,$.batching=H.batching,$.batchingColor=H.batchingColor,$.instancing=H.instancing,$.instancingColor=H.instancingColor,$.instancingMorph=H.instancingMorph,$.skinning=H.skinning,$.morphTargets=H.morphTargets,$.morphNormals=H.morphNormals,$.morphColors=H.morphColors,$.morphTargetsCount=H.morphTargetsCount,$.numClippingPlanes=H.numClippingPlanes,$.numIntersection=H.numClipIntersection,$.vertexAlphas=H.vertexAlphas,$.vertexTangents=H.vertexTangents,$.toneMapping=H.toneMapping}function uf(A,H,$,j,V){H.isScene!==!0&&(H=ce),kt.resetTextureUnits();const ot=H.fog,pt=j.isMeshStandardMaterial?H.environment:null,bt=U===null?E.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ar,vt=(j.isMeshStandardMaterial?L:Se).get(j.envMap||pt),It=j.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ft=!!$.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Pt=!!$.morphAttributes.position,$t=!!$.morphAttributes.normal,oe=!!$.morphAttributes.color;let ve=xi;j.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ve=E.toneMapping);const ye=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,te=ye!==void 0?ye.length:0,Dt=At.get(j),Ue=p.state.lights;if(lt===!0&&(dt===!0||A!==x)){const Be=A===x&&j.id===T;mt.setState(j,A,Be)}let ne=!1;j.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==Ue.state.version||Dt.outputColorSpace!==bt||V.isBatchedMesh&&Dt.batching===!1||!V.isBatchedMesh&&Dt.batching===!0||V.isBatchedMesh&&Dt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Dt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Dt.instancing===!1||!V.isInstancedMesh&&Dt.instancing===!0||V.isSkinnedMesh&&Dt.skinning===!1||!V.isSkinnedMesh&&Dt.skinning===!0||V.isInstancedMesh&&Dt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Dt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Dt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Dt.instancingMorph===!1&&V.morphTexture!==null||Dt.envMap!==vt||j.fog===!0&&Dt.fog!==ot||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==mt.numPlanes||Dt.numIntersection!==mt.numIntersection)||Dt.vertexAlphas!==It||Dt.vertexTangents!==Ft||Dt.morphTargets!==Pt||Dt.morphNormals!==$t||Dt.morphColors!==oe||Dt.toneMapping!==ve||Dt.morphTargetsCount!==te)&&(ne=!0):(ne=!0,Dt.__version=j.version);let xn=Dt.currentProgram;ne===!0&&(xn=fs(j,H,V));let Zi=!1,en=!1,Or=!1;const _e=xn.getUniforms(),ln=Dt.uniforms;if(Tt.useProgram(xn.program)&&(Zi=!0,en=!0,Or=!0),j.id!==T&&(T=j.id,en=!0),Zi||x!==A){Tt.buffers.depth.getReversed()?(ht.copy(A.projectionMatrix),wm(ht),Am(ht),_e.setValue(F,"projectionMatrix",ht)):_e.setValue(F,"projectionMatrix",A.projectionMatrix),_e.setValue(F,"viewMatrix",A.matrixWorldInverse);const Ye=_e.map.cameraPosition;Ye!==void 0&&Ye.setValue(F,Wt.setFromMatrixPosition(A.matrixWorld)),re.logarithmicDepthBuffer&&_e.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&_e.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,en=!0,Or=!0)}if(V.isSkinnedMesh){_e.setOptional(F,V,"bindMatrix"),_e.setOptional(F,V,"bindMatrixInverse");const Be=V.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),_e.setValue(F,"boneTexture",Be.boneTexture,kt))}V.isBatchedMesh&&(_e.setOptional(F,V,"batchingTexture"),_e.setValue(F,"batchingTexture",V._matricesTexture,kt),_e.setOptional(F,V,"batchingIdTexture"),_e.setValue(F,"batchingIdTexture",V._indirectTexture,kt),_e.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&_e.setValue(F,"batchingColorTexture",V._colorsTexture,kt));const cn=$.morphAttributes;if((cn.position!==void 0||cn.normal!==void 0||cn.color!==void 0)&&gt.update(V,$,xn),(en||Dt.receiveShadow!==V.receiveShadow)&&(Dt.receiveShadow=V.receiveShadow,_e.setValue(F,"receiveShadow",V.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(ln.envMap.value=vt,ln.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&H.environment!==null&&(ln.envMapIntensity.value=H.environmentIntensity),en&&(_e.setValue(F,"toneMappingExposure",E.toneMappingExposure),Dt.needsLights&&hf(ln,Or),ot&&j.fog===!0&&G.refreshFogUniforms(ln,ot),G.refreshMaterialUniforms(ln,j,Z,J,p.state.transmissionRenderTarget[A.id]),lo.upload(F,fc(Dt),ln,kt)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(lo.upload(F,fc(Dt),ln,kt),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&_e.setValue(F,"center",V.center),_e.setValue(F,"modelViewMatrix",V.modelViewMatrix),_e.setValue(F,"normalMatrix",V.normalMatrix),_e.setValue(F,"modelMatrix",V.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Be=j.uniformsGroups;for(let Ye=0,Io=Be.length;Ye<Io;Ye++){const wi=Be[Ye];k.update(wi,xn),k.bind(wi,xn)}}return xn}function hf(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function df(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(A,H,$){const j=At.get(A);j.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),At.get(A.texture).__webglTexture=H,At.get(A.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:$,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){const $=At.get(A);$.__webglFramebuffer=H,$.__useDefaultFramebuffer=H===void 0};const ff=F.createFramebuffer();this.setRenderTarget=function(A,H=0,$=0){U=A,S=H,w=$;let j=!0,V=null,ot=!1,pt=!1;if(A){const vt=At.get(A);if(vt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(F.FRAMEBUFFER,null),j=!1;else if(vt.__webglFramebuffer===void 0)kt.setupRenderTarget(A);else if(vt.__hasExternalTextures)kt.rebindTextures(A,At.get(A.texture).__webglTexture,At.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Pt=A.depthTexture;if(vt.__boundDepthTexture!==Pt){if(Pt!==null&&At.has(Pt)&&(A.width!==Pt.image.width||A.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(A)}}const It=A.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(pt=!0);const Ft=At.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ft[H])?V=Ft[H][$]:V=Ft[H],ot=!0):A.samples>0&&kt.useMultisampledRTT(A)===!1?V=At.get(A).__webglMultisampledFramebuffer:Array.isArray(Ft)?V=Ft[$]:V=Ft,C.copy(A.viewport),O.copy(A.scissor),z=A.scissorTest}else C.copy(_t).multiplyScalar(Z).floor(),O.copy(Ut).multiplyScalar(Z).floor(),z=I;if($!==0&&(V=ff),Tt.bindFramebuffer(F.FRAMEBUFFER,V)&&j&&Tt.drawBuffers(A,V),Tt.viewport(C),Tt.scissor(O),Tt.setScissorTest(z),ot){const vt=At.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,vt.__webglTexture,$)}else if(pt){const vt=At.get(A.texture),It=H;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,vt.__webglTexture,$,It)}else if(A!==null&&$!==0){const vt=At.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,vt.__webglTexture,$)}T=-1},this.readRenderTargetPixels=function(A,H,$,j,V,ot,pt,bt=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=At.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt){Tt.bindFramebuffer(F.FRAMEBUFFER,vt);try{const It=A.textures[bt],Ft=It.format,Pt=It.type;if(!re.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-j&&$>=0&&$<=A.height-V&&(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt),F.readPixels(H,$,j,V,ct.convert(Ft),ct.convert(Pt),ot))}finally{const It=U!==null?At.get(U).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(A,H,$,j,V,ot,pt,bt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=At.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&pt!==void 0&&(vt=vt[pt]),vt)if(H>=0&&H<=A.width-j&&$>=0&&$<=A.height-V){Tt.bindFramebuffer(F.FRAMEBUFFER,vt);const It=A.textures[bt],Ft=It.format,Pt=It.type;if(!re.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,$t),F.bufferData(F.PIXEL_PACK_BUFFER,ot.byteLength,F.STREAM_READ),A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt),F.readPixels(H,$,j,V,ct.convert(Ft),ct.convert(Pt),0);const oe=U!==null?At.get(U).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,oe);const ve=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Tm(F,ve,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,$t),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ot),F.deleteBuffer($t),F.deleteSync(ve),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,H=null,$=0){const j=Math.pow(2,-$),V=Math.floor(A.image.width*j),ot=Math.floor(A.image.height*j),pt=H!==null?H.x:0,bt=H!==null?H.y:0;kt.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,pt,bt,V,ot),Tt.unbindTexture()};const pf=F.createFramebuffer(),mf=F.createFramebuffer();this.copyTextureToTexture=function(A,H,$=null,j=null,V=0,ot=null){ot===null&&(V!==0?(yr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ot=V,V=0):ot=0);let pt,bt,vt,It,Ft,Pt,$t,oe,ve;const ye=A.isCompressedTexture?A.mipmaps[ot]:A.image;if($!==null)pt=$.max.x-$.min.x,bt=$.max.y-$.min.y,vt=$.isBox3?$.max.z-$.min.z:1,It=$.min.x,Ft=$.min.y,Pt=$.isBox3?$.min.z:0;else{const cn=Math.pow(2,-V);pt=Math.floor(ye.width*cn),bt=Math.floor(ye.height*cn),A.isDataArrayTexture?vt=ye.depth:A.isData3DTexture?vt=Math.floor(ye.depth*cn):vt=1,It=0,Ft=0,Pt=0}j!==null?($t=j.x,oe=j.y,ve=j.z):($t=0,oe=0,ve=0);const te=ct.convert(H.format),Dt=ct.convert(H.type);let Ue;H.isData3DTexture?(kt.setTexture3D(H,0),Ue=F.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(kt.setTexture2DArray(H,0),Ue=F.TEXTURE_2D_ARRAY):(kt.setTexture2D(H,0),Ue=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const ne=F.getParameter(F.UNPACK_ROW_LENGTH),xn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Zi=F.getParameter(F.UNPACK_SKIP_PIXELS),en=F.getParameter(F.UNPACK_SKIP_ROWS),Or=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ye.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ye.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,It),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ft),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Pt);const _e=A.isDataArrayTexture||A.isData3DTexture,ln=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){const cn=At.get(A),Be=At.get(H),Ye=At.get(cn.__renderTarget),Io=At.get(Be.__renderTarget);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,Ye.__webglFramebuffer),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Io.__webglFramebuffer);for(let wi=0;wi<vt;wi++)_e&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(A).__webglTexture,V,Pt+wi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(H).__webglTexture,ot,ve+wi)),F.blitFramebuffer(It,Ft,pt,bt,$t,oe,pt,bt,F.DEPTH_BUFFER_BIT,F.NEAREST);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||A.isRenderTargetTexture||At.has(A)){const cn=At.get(A),Be=At.get(H);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,pf),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,mf);for(let Ye=0;Ye<vt;Ye++)_e?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,cn.__webglTexture,V,Pt+Ye):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,cn.__webglTexture,V),ln?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Be.__webglTexture,ot,ve+Ye):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Be.__webglTexture,ot),V!==0?F.blitFramebuffer(It,Ft,pt,bt,$t,oe,pt,bt,F.COLOR_BUFFER_BIT,F.NEAREST):ln?F.copyTexSubImage3D(Ue,ot,$t,oe,ve+Ye,It,Ft,pt,bt):F.copyTexSubImage2D(Ue,ot,$t,oe,It,Ft,pt,bt);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ln?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(Ue,ot,$t,oe,ve,pt,bt,vt,te,Dt,ye.data):H.isCompressedArrayTexture?F.compressedTexSubImage3D(Ue,ot,$t,oe,ve,pt,bt,vt,te,ye.data):F.texSubImage3D(Ue,ot,$t,oe,ve,pt,bt,vt,te,Dt,ye):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ot,$t,oe,pt,bt,te,Dt,ye.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ot,$t,oe,ye.width,ye.height,te,ye.data):F.texSubImage2D(F.TEXTURE_2D,ot,$t,oe,pt,bt,te,Dt,ye);F.pixelStorei(F.UNPACK_ROW_LENGTH,ne),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,xn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Zi),F.pixelStorei(F.UNPACK_SKIP_ROWS,en),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Or),ot===0&&H.generateMipmaps&&F.generateMipmap(Ue),Tt.unbindTexture()},this.copyTextureToTexture3D=function(A,H,$=null,j=null,V=0){return yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,H,$,j,V)},this.initRenderTarget=function(A){At.get(A).__webglFramebuffer===void 0&&kt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?kt.setTextureCube(A,0):A.isData3DTexture?kt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?kt.setTexture2DArray(A,0):kt.setTexture2D(A,0),Tt.unbindTexture()},this.resetState=function(){S=0,w=0,U=null,Tt.reset(),Rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new zt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ke.line={uniforms:qi.merge([ut.common,ut.fog,ut.line]),vertexShader:`
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
		`};class bd extends De{constructor(t){super({type:"LineMaterial",uniforms:qi.clone(Ke.line.uniforms),vertexShader:Ke.line.vertexShader,fragmentShader:Ke.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Bu=new si,Xs=new N;class Td extends hg{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new gn(t,3)),this.setAttribute("uv",new gn(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new wl(e,6,1);return this.setAttribute("instanceStart",new _i(i,3,0)),this.setAttribute("instanceEnd",new _i(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new wl(e,6,1);return this.setAttribute("instanceColorStart",new _i(i,3,0)),this.setAttribute("instanceColorEnd",new _i(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new ag(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Bu.setFromBufferAttribute(e),this.boundingBox.union(Bu))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ei),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Xs.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Xs)),Xs.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Xs));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const Ea=new ue,Hu=new N,Vu=new N,Ie=new ue,Oe=new ue,In=new ue,ba=new N,Ta=new pe,Fe=new mg,Gu=new N,qs=new si,Ys=new Ei,On=new ue;let Fn,Gi;function Wu(n,t,e){return On.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),On.multiplyScalar(1/On.w),On.x=Gi/e.width,On.y=Gi/e.height,On.applyMatrix4(n.projectionMatrixInverse),On.multiplyScalar(1/On.w),Math.abs(Math.max(On.x,On.y))}function Jx(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,l=o;a<l;a++){Fe.start.fromBufferAttribute(r,a),Fe.end.fromBufferAttribute(s,a),Fe.applyMatrix4(e);const c=new N,h=new N;Fn.distanceSqToSegment(Fe.start,Fe.end,h,c),h.distanceTo(c)<Gi*.5&&t.push({point:h,pointOnLine:c,distance:Fn.origin.distanceTo(h),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function ty(n,t,e){const i=t.projectionMatrix,s=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),u=-t.near;Fn.at(1,In),In.w=1,In.applyMatrix4(t.matrixWorldInverse),In.applyMatrix4(i),In.multiplyScalar(1/In.w),In.x*=s.x/2,In.y*=s.y/2,In.z=0,ba.copy(In),Ta.multiplyMatrices(t.matrixWorldInverse,o);for(let f=0,d=h;f<d;f++){if(Ie.fromBufferAttribute(l,f),Oe.fromBufferAttribute(c,f),Ie.w=1,Oe.w=1,Ie.applyMatrix4(Ta),Oe.applyMatrix4(Ta),Ie.z>u&&Oe.z>u)continue;if(Ie.z>u){const M=Ie.z-Oe.z,E=(Ie.z-u)/M;Ie.lerp(Oe,E)}else if(Oe.z>u){const M=Oe.z-Ie.z,E=(Oe.z-u)/M;Oe.lerp(Ie,E)}Ie.applyMatrix4(i),Oe.applyMatrix4(i),Ie.multiplyScalar(1/Ie.w),Oe.multiplyScalar(1/Oe.w),Ie.x*=s.x/2,Ie.y*=s.y/2,Oe.x*=s.x/2,Oe.y*=s.y/2,Fe.start.copy(Ie),Fe.start.z=0,Fe.end.copy(Oe),Fe.end.z=0;const _=Fe.closestPointToPointParameter(ba,!0);Fe.at(_,Gu);const m=Em.lerp(Ie.z,Oe.z,_),p=m>=-1&&m<=1,y=ba.distanceTo(Gu)<Gi*.5;if(p&&y){Fe.start.fromBufferAttribute(l,f),Fe.end.fromBufferAttribute(c,f),Fe.start.applyMatrix4(o),Fe.end.applyMatrix4(o);const M=new N,E=new N;Fn.distanceSqToSegment(Fe.start,Fe.end,E,M),e.push({point:E,pointOnLine:M,distance:Fn.origin.distanceTo(E),object:n,face:null,faceIndex:f,uv:null,uv1:null})}}}class ey extends Cn{constructor(t=new Td,e=new bd({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)Hu.fromBufferAttribute(e,o),Vu.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Hu.distanceTo(Vu);const s=new wl(r,2,1);return t.setAttribute("instanceDistanceStart",new _i(s,1,0)),t.setAttribute("instanceDistanceEnd",new _i(s,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Fn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Gi=l.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),Ys.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=Gi*.5;else{const u=Math.max(r.near,Ys.distanceToPoint(Fn.origin));c=Wu(r,u,l.resolution)}if(Ys.radius+=c,Fn.intersectsSphere(Ys)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),qs.copy(a.boundingBox).applyMatrix4(o);let h;if(i)h=Gi*.5;else{const u=Math.max(r.near,qs.distanceToPoint(Fn.origin));h=Wu(r,u,l.resolution)}qs.expandByScalar(h),Fn.intersectsBox(qs)!==!1&&(i?Jx(this,e):ty(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Ea),this.material.uniforms.resolution.value.set(Ea.z,Ea.w))}}const co={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ir{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ny=new _d(-1,1,1,-1,0,1);class iy extends an{constructor(){super(),this.setAttribute("position",new gn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gn([0,2,0,0,2,0],2))}}const ry=new iy;class ec{constructor(t){this._mesh=new Cn(ry,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,ny)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class wd extends Ir{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof De?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=qi.clone(t.uniforms),this.material=new De({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new ec(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Xu extends Ir{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const r=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class sy extends Ir{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class oy{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new zt);this._width=i.width,this._height=i.height,e=new Pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ti}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new wd(co),this.copyPass.material.blending=Jn,this.clock=new vd}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Xu!==void 0&&(o instanceof Xu?i=!0:o instanceof sy&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const $s={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class ay extends Ir{constructor(){super(),this.uniforms=qi.clone($s.uniforms),this.material=new lg({name:$s.name,uniforms:this.uniforms,vertexShader:$s.vertexShader,fragmentShader:$s.fragmentShader}),this._fsQuad=new ec(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jt.getTransfer(this._outputColorSpace)===ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===qh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Yh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Hl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Zh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===jh?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===$h&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ly extends Ir{constructor(t,e,i=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new jt}render(t,e,i){const r=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=r}}const cy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new jt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Rr extends Ir{constructor(t,e=1,i,r){super(),this.strength=e,this.radius=i,this.threshold=r,this.resolution=t!==void 0?new zt(t.x,t.y):new zt(256,256),this.clearColor=new jt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Pn(s,o,{type:ti}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new Pn(s,o,{type:ti});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new Pn(s,o,{type:ti});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const a=cy;this.highPassUniforms=qi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new De({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new zt(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=qi.clone(co.uniforms),this.blendMaterial=new De({uniforms:this.copyUniforms,vertexShader:co.vertexShader,fragmentShader:co.fragmentShader,blending:_o,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new jt,this._oldClearAlpha=1,this._basic=new Ql,this._fsQuad=new ec(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new zt(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(t,e,i,r,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Rr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Rr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new De({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new zt(.5,.5)},direction:{value:new zt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(t){return new De({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Rr.BlurDirectionX=new zt(1,0);Rr.BlurDirectionY=new zt(0,1);const nc=["conflict","stale","unverified","orphan","lint_error"],uy={constellation:11,topic:7.2,hub:7.2,branch:7,note:6.6,inbox:7.4},hy={constellation:26,topic:24,hub:24,branch:22,note:20,inbox:24};class dy{root;slots=[];v=new N;max=90;constructor(t){this.root=document.createElement("div"),this.root.className="labels",t.appendChild(this.root)}slot(t){let e=this.slots[t];if(!e){const i=document.createElement("div"),r=document.createElement("span");r.className="lbl-dot";const s=document.createElement("span");s.className="lbl-text";const o=document.createElement("span");o.className="lbl-sub",i.append(r,s,o),this.root.appendChild(i),e={el:i,text:s,sub:o,dot:r,key:"",shown:!1},this.slots[t]=e}return e}update(t,e,i,r){const s=[];t.sort((a,l)=>l.priority-a.priority);let o=0;for(const a of t){if(o>=this.max)break;if(this.v.copy(a.pos).project(e),this.v.z>1||this.v.z<-1)continue;const l=(this.v.x*.5+.5)*i,c=(-this.v.y*.5+.5)*r-(a.lift??0),h=a.text.length+(a.sub?a.sub.length+2:0),u=Math.min(360,h*uy[a.kind]+30),f=hy[a.kind],d={x0:l-u/2,y0:c-f,x1:l+u/2,y1:c};if(d.x1<0||d.x0>i||d.y1<0||d.y0>r||s.some(_=>d.x0<_.x1&&d.x1>_.x0&&d.y0<_.y1&&d.y1>_.y0))continue;s.push(d);const g=this.slot(o++);g.key!==a.key?(g.key=a.key,g.el.className=`lbl lbl-${a.kind}${a.emphasis?" lbl-emph":""}`,g.text.textContent=a.text,g.sub.textContent=a.sub??"",g.dot.style.background=a.color??"transparent"):g.el.classList.contains("lbl-emph")!==!!a.emphasis&&g.el.classList.toggle("lbl-emph",!!a.emphasis),g.el.style.transform=`translate3d(${Math.round(l)}px, ${Math.round(c)}px, 0) translate(-50%, -100%)`,g.shown||(g.el.style.opacity="1",g.shown=!0)}for(let a=o;a<this.slots.length;a++){const l=this.slots[a];l.shown&&(l.el.style.opacity="0",l.shown=!1,l.key="")}}setVisible(t){this.root.style.display=t?"":"none"}}function Ad(n){return n.transparent=!0,n.depthWrite=!1,n.blending=Gh,n.blendEquation=mi,n.blendSrc=ka,n.blendDst=ka,n}function wa(n,t){return Ad(new De({uniforms:{uScale:{value:500},uGroups:{value:n},uGroupCount:{value:t},uFalloff:{value:4}},vertexShader:`
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
        }`}))}function fy(){return Ad(new De({uniforms:{uScale:{value:500},uHealth:{value:0},uTime:{value:0},uMotion:{value:1},uFade:{value:1}},vertexShader:`
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
        }`}))}const py={uniforms:{tDiffuse:{value:null},uStrength:{value:.55},uTime:{value:0}},vertexShader:`
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
    }`};dn.install({THREE:{Vector2:zt,Vector3:N,Vector4:ue,Quaternion:Dr,Matrix4:pe,Spherical:pg,Box3:si,Sphere:Ei,Raycaster:fg}});const Mr=["part_of","depends_on","conflicts_with","supersedes","related_to","links_to"],kn={part_of:"#5d6b8a",depends_on:"#4f8dff",conflicts_with:"#ff3b4f",supersedes:"#ffb347",related_to:"#9a7bff",links_to:"#7f8aa3"},Aa={part_of:{width:1,opacity:.32,dashed:!1},depends_on:{width:1.7,opacity:.75,dashed:!0},conflicts_with:{width:2.4,opacity:.95,dashed:!1},supersedes:{width:2,opacity:.85,dashed:!0},related_to:{width:1.2,opacity:.38,dashed:!1},links_to:{width:1,opacity:.22,dashed:!1}},my=new N(...no);function Ca(n,t,e){switch(n){case"part_of":return["part_of",t,e];case"has_part":return["part_of",e,t];case"depends_on":return["depends_on",e,t];case"enables":return["depends_on",t,e];case"supersedes":return["supersedes",e,t];case"superseded_by":return["supersedes",t,e];case"conflicts_with":return["conflicts_with",t,e];case"related_to":return["related_to",t,e];case"links_to":return["links_to",t,e];default:return null}}function qu(n,t){if(!n)return .55;const e=Date.parse(n);if(Number.isNaN(e))return .55;const i=Math.max(0,(t-e)/864e5);return .45+.55*Math.exp(-i/75)}function Si(n){return n.split(" · ")[0]}class Yu{constructor(t){this.count=t;const e=Math.max(1,t);this.value=new Float32Array(e*4),this.target=new Float32Array(e*4);for(let i=0;i<e;i++)this.value[i*4]=this.target[i*4]=1;this.texture=new md(this.value,e,1,sn,An),this.texture.magFilter=Xe,this.texture.minFilter=Xe,this.texture.needsUpdate=!0}value;target;texture;set(t,e,i,r,s){this.target.set([e,i,r,s],t*4)}ease(t){let e=!1;for(let i=0;i<this.value.length;i++){const r=this.target[i]-this.value[i];Math.abs(r)>.001&&(this.value[i]+=r*t,e=!0)}e&&(this.texture.needsUpdate=!0)}}const Zs=new jt;function $n(n,t=1){return Zs.set(n),[Zs.r*t,Zs.g*t,Zs.b*t]}class gy{constructor(t,e,i,r,s){this.container=t,this.world=e,this.source=i,this.events=r,this.qualityMode=s,s!=="auto"&&(this.quality=s),this.topics=e.topics,e.topics.forEach((a,l)=>{this.topicIndex.set(a.slug,l),this.topicBySlug.set(a.slug,a)}),this.layout=vp(e.constellations,e.topics,e.episodes.count),this.renderer=new Qx({antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(197899,1),this.renderer.toneMapping=Hl,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.className="scene-canvas",t.appendChild(this.renderer.domElement);const o=this.layout.radius;this.camera=new pn(50,1,.5,o*30),this.controls=new dn(this.camera,this.renderer.domElement),this.controls.dollyToCursor=!0,this.controls.smoothTime=this.motion?.55:0,this.controls.draggingSmoothTime=.12,this.controls.minDistance=4,this.controls.maxDistance=o*7,this.controls.dollySpeed=.6,this.controls.minPolarAngle=this.controls.maxPolarAngle=ts,this.controls.minAzimuthAngle=this.controls.maxAzimuthAngle=0,this.controls.mouseButtons.left=dn.ACTION.SCREEN_PAN,this.controls.mouseButtons.right=dn.ACTION.SCREEN_PAN,this.controls.mouseButtons.middle=dn.ACTION.DOLLY,this.controls.mouseButtons.wheel=dn.ACTION.DOLLY,this.controls.touches.one=dn.ACTION.TOUCH_SCREEN_PAN,this.controls.touches.two=dn.ACTION.TOUCH_DOLLY,this.controls.touches.three=dn.ACTION.NONE,this.controls.addEventListener("controlstart",()=>{this.userDriven=!0}),this.renderer.domElement.addEventListener("wheel",()=>{this.userDriven=!0},{passive:!0}),this.groups=new Yu(this.topics.length),this.dustGroups=new Yu(e.constellations.length),this.severity=Na(this.topics),this.dustSeverity=Na(e.constellations.map(a=>{const l=a.topics.map(c=>this.topicBySlug.get(c)).filter(c=>!!c);return{notes:l.reduce((c,h)=>c+h.notes,0),flagged:l.reduce((c,h)=>c+h.flagged,0)}})),this.buildStarfield(),this.buildDust(),this.buildNebulae(),this.buildInbox(),this.scene.add(this.flowGroup),this.scene.add(this.focusLines),this.composer=new oy(this.renderer),this.composer.addPass(new ly(this.scene,this.camera)),this.bloom=new Rr(new zt(256,256),.95,.6,.08),this.composer.addPass(this.bloom),this.vignette=new wd(py),this.composer.addPass(this.vignette),this.composer.addPass(new ay),this.labels=new dy(t),this.bindPointer(),this.resize(),window.addEventListener("resize",this.resize),this.flyTo({},!0),this.buildFlows(),this.renderer.setAnimationLoop(this.frame)}layout;camera;renderer;scene=new Km;controls;composer;bloom;bloomTarget=.95;vignette;labels;clock=new vd;topics;topicIndex=new Map;topicBySlug=new Map;groups;dustGroups;glowMats=[];starMats=new Set;lineMats=new Map;flowGroup=new Vi;focusLines=new Vi;revealed=new Map;pending=new Map;topicPx=new Map;focus={};neighborhood=new Map;run=null;layers={part_of:!0,depends_on:!0,conflicts_with:!0,supersedes:!0,related_to:!0,links_to:!1};health=!1;severity;dustSeverity;motion=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;quality="high";qualityMode="auto";autoDecided=!1;autoFrom=1.5;autoSamples=[];frameTimes=[];lastLod=0;pointer={x:0,y:0,down:!1,dx:0,dy:0,moved:!1,dirty:!1,inside:!1};hovered=null;flowHits=[];focusHits=[];hoverLine=null;hoverEnds=new Set;hoverTopics=new Set;now=Date.now();disposed=!1;userDriven=!1;fps=0;points(t,e,i,r={}){const s={position:new Float32Array(t*3),aColor:new Float32Array(t*3),aSize:new Float32Array(t),aAlpha:new Float32Array(t),aGroup:new Float32Array(t)};for(const[l,c]of Object.entries(r))s[l]=new Float32Array(t*c);for(let l=0;l<t;l++)e(l,s);const o=new an;o.setAttribute("position",new Me(s.position,3)),o.setAttribute("aColor",new Me(s.aColor,3));for(const l of["aSize","aAlpha","aGroup"])o.setAttribute(l,new Me(s[l],1));for(const[l,c]of Object.entries(r))o.setAttribute(l,new Me(s[l],c));o.computeBoundingSphere();const a=new lu(o,i);return a.frustumCulled=!1,a}plainGlow(t=4){const e=new md(new Float32Array([1,0,0,1]),1,1,sn,An);e.needsUpdate=!0;const i=wa(e,1);return i.uniforms.uFalloff.value=t,this.glowMats.push(i),i}buildStarfield(){const t=this.layout.radius,e=_r("starfield"),r=this.points(6500,(s,o)=>{const a=e()*2-1,l=e()*Math.PI*2,c=Math.sqrt(1-a*a),h=t*(3.2+e()*4);o.position.set([h*c*Math.cos(l),h*a,h*c*Math.sin(l)],s*3);const u=e();o.aColor.set(u<.15?[1,.85,.7]:u<.4?[.75,.85,1]:[.9,.93,1],s*3),o.aSize[s]=t*(.006+.012*e()**3),o.aAlpha[s]=.25+.6*e()},this.plainGlow(6));this.scene.add(r)}buildDust(){const e=this.world.constellations,i=wa(this.dustGroups.texture,Math.max(1,e.length));i.uniforms.uFalloff.value=2.5,this.glowMats.push(i);const r=this.points(e.length*70,(s,o)=>{const a=Math.floor(s/70),l=e[a],c=this.layout.constellations.get(l.id),h=_r(`dust:${l.id}:${s%70}`);o.position.set([c.x+Vn(h)*c.r*.55,c.y+Vn(h)*c.r*.12,c.z+Vn(h)*c.r*.55],s*3),o.aColor.set($n(l.color,.9),s*3),o.aSize[s]=c.r*(.5+.6*h()),o.aAlpha[s]=.018+.03*h(),o.aGroup[s]=a},i);this.scene.add(r)}buildNebulae(){const t=[];this.topics.forEach(r=>{const s=Math.max(10,Math.min(80,Math.round(10+r.notes*.55)));t.push({slug:r.slug,i:0,kind:"core"});for(let a=0;a<s;a++)t.push({slug:r.slug,i:a,kind:"cloud"});const o=Math.min(6,r.flags.conflict??0);for(let a=0;a<o;a++)t.push({slug:r.slug,i:a,kind:"conflict"})});const e=wa(this.groups.texture,Math.max(1,this.topics.length));this.glowMats.push(e);const i=this.points(t.length,(r,s)=>{const o=t[r],a=this.topicBySlug.get(o.slug),l=this.layout.topics.get(o.slug),c=this.topicIndex.get(o.slug),h=qu(a.updated,this.now)*(1+Math.min(.4,a.recent/Math.max(1,a.notes)));if(s.aGroup[r]=c,o.kind==="core"){s.position.set([l.x,l.y,l.z],r*3),s.aColor.set($n(a.color,1.25),r*3),s.aSize[r]=l.r*.95,s.aAlpha[r]=.75*h;return}const u=_r(`neb:${o.slug}:${o.kind}:${o.i}`),f=o.kind==="conflict"?.3:.42;if(s.position.set([l.x+Vn(u)*l.r*f,l.y+Vn(u)*l.r*f*.5,l.z+Vn(u)*l.r*f],r*3),o.kind==="conflict")s.aColor.set([1,.2,.26],r*3),s.aSize[r]=l.r*.38,s.aAlpha[r]=.35;else{const[d,g,_]=$n(a.color),m=.75+.5*u();s.aColor.set([d*m,g*m,_*m],r*3),s.aSize[r]=l.r*(.3+.45*u()),s.aAlpha[r]=(.08+.1*u())*h}},e);this.scene.add(i)}buildInbox(){const t=this.layout.inbox,e=Math.min(420,this.world.episodes.count)+1,i=_r("inbox"),r=this.points(e,(s,o)=>{if(s===0){o.position.set([t.x,t.y,t.z],0),o.aColor.set([1.2,1.05,.8],0),o.aSize[0]=t.r*1.6,o.aAlpha[0]=this.world.episodes.count?.85:.25;return}o.position.set([t.x+Vn(i)*t.r*.45,t.y+Vn(i)*t.r*.3,t.z+Vn(i)*t.r*.45],s*3),o.aColor.set(i()<.5?[1,.86,.55]:[1,.95,.85],s*3),o.aSize[s]=2+3*i(),o.aAlpha[s]=.5+.5*i()},this.plainGlow(5));this.scene.add(r)}lineMaterial(t,e,i,r){let s=this.lineMats.get(t);return s||(s=new bd({color:16777215,linewidth:e,vertexColors:!0,transparent:!0,opacity:i,dashed:r,dashSize:2.5,gapSize:16,dashScale:1,worldUnits:!1}),s.depthWrite=!1,s.blending=_o,s.resolution.set(this.container.clientWidth,this.container.clientHeight),this.lineMats.set(t,s)),s}trail(t,e,i,r,s,o){const a=o&&this.motion,l=this.segments(t,e,this.lineMaterial(i,r,a?s*.55:s,!1));return a?[l,this.segments(t,e,this.lineMaterial(`${i}:pulse`,r+.8,Math.min(1,s+.2),!0))]:[l]}segments(t,e,i){const r=new Td;r.setPositions(t),r.setColors(e);const s=new ey(r,i);return i.dashed&&s.computeLineDistances(),s.frustumCulled=!1,s}buildFlows(){for(const f of[...this.flowGroup.children])this.flowGroup.remove(f),f.geometry.dispose();const t=qr(this.focus),e=[];this.flowHits=[];const i=f=>this.topicBySlug.get(f)?.constellation,r=this.run?new Set(Object.keys(this.run.topics)):null,s=r?new Set([...r].map(i)):null,o=f=>{const d=this.layout.topics.get(f);return new N(d.x,d.y,d.z)},a=f=>{const d=this.layout.constellations.get(f);return new N(d.x,d.y,d.z)},l=new Map(this.world.constellations.map(f=>[f.id,f.color]));if(t==="galaxy"&&this.world.constellations.length>1){const f=new Map,d=new Map;for(const g of this.world.flows){const _=i(g.a),m=i(g.b);if(!_||!m||_===m)continue;const p=_<m?`${_}|${m}`:`${m}|${_}`;f.set(p,(f.get(p)??0)+g.total);const y=d.get(p)??{};for(const[M,E]of Object.entries(g.rels))y[M]=(y[M]??0)+E;d.set(p,y)}[...f.entries()].sort((g,_)=>_[1]-g[1]).slice(0,70).forEach(([g,_])=>{const[m,p]=g.split("|");e.push({a:a(m),b:a(p),ca:l.get(m),cb:l.get(p),w:_,lit:!s||s.has(m)||s.has(p),ka:m,kb:p,rels:d.get(g)??{}})})}else{const f=_=>!this.focus.constellation||i(_)===this.focus.constellation,d=this.focus.topic;this.world.flows.filter(_=>d?_.a===d||_.b===d:f(_.a)&&f(_.b)).sort((_,m)=>m.total-_.total).slice(0,d?24:160).forEach(_=>{e.push({a:o(_.a),b:o(_.b),ca:this.topicBySlug.get(_.a).color,cb:this.topicBySlug.get(_.b).color,w:_.total,lit:!r||r.has(_.a)||r.has(_.b),ka:_.a,kb:_.b,rels:_.rels})})}if(e.length===0)return;const c=e.map(f=>f.w).sort((f,d)=>f-d),h=f=>c[Math.min(c.length-1,Math.floor(f*c.length))],u=[{max:h(.6),width:1,opacity:.14},{max:h(.9),width:1.8,opacity:.22},{max:1/0,width:2.8,opacity:.32}];u.forEach((f,d)=>{const g=[],_=[],m=d===0?-1/0:u[d-1].max;for(const p of e){if(!(p.w>m&&p.w<=f.max))continue;const y=p.a.clone().add(p.b).multiplyScalar(.5);y.y+=p.a.distanceTo(p.b)*.22;const E=new og(p.a,y,p.b).getPoints(14);this.flowHits.push({level:t==="galaxy"&&this.world.constellations.length>1?"constellation":"topic",a:p.ka,b:p.kb,total:p.w,rels:p.rels,points:E});const[P,S,w]=$n(p.ca),[U,T,x]=$n(p.cb),C=p.lit?1:.15;for(let O=0;O<E.length-1;O++){const z=O/(E.length-1),X=(O+1)/(E.length-1);g.push(E[O].x,E[O].y,E[O].z,E[O+1].x,E[O+1].y,E[O+1].z);const W=(.35+.65*Math.abs(z-.5)*2)*C,K=(.35+.65*Math.abs(X-.5)*2)*C;_.push((P+(U-P)*z)*W,(S+(T-S)*z)*W,(w+(x-w)*z)*W,(P+(U-P)*X)*K,(S+(T-S)*X)*K,(w+(x-w)*X)*K)}}g.length&&this.flowGroup.add(this.segments(g,_,this.lineMaterial(`flow${d}`,f.width,f.opacity,!1)))}),this.dimFlows()}reveal(t){if(this.revealed.has(t))return Promise.resolve();let e=this.pending.get(t);return e||(e=this.load(t).finally(()=>this.pending.delete(t)),this.pending.set(t,e)),e}async load(t){const e=await this.source.topic(t);if(!e||this.disposed)return;const i=this.layout.topics.get(t);i&&(this.revealed.set(t,this.buildLayer(e,i)),this.focus.note&&this.buildNeighborhood(),this.refreshStates(),this.refreshGroups())}buildLayer(t,e){const i=Mp(t,e.r),r=new N(e.x,e.y,e.z),s=new Map(t.nodes.map(C=>[C.id,C])),o=i.ids.map(C=>s.get(C)),a=new Map(i.ids.map((C,O)=>[C,O])),l=o.length,c=fy();c.uniforms.uScale.value=this.pointScale(),c.uniforms.uHealth.value=this.health?1:0,c.uniforms.uMotion.value=this.motion?1:0,c.uniforms.uFade.value=0,this.starMats.add(c);const h=new an,u=new Float32Array(l*3),f=new Float32Array(l),d=new Float32Array(l),g=new Float32Array(l),_=new Float32Array(l),m=new Float32Array(l*3),[p,y,M]=$n(t.color);o.forEach((C,O)=>{const z=C.id===t.hub,X=C.status==="superseded"||C.status==="archived",W=z?.25:.55;u.set([p*(1-W)+W,y*(1-W)+W,M*(1-W)+W],O*3),X&&u.set([.55,.58,.66],O*3),f[O]=z?8:Math.min(7.2,Math.max(2.2,1.2+.8*Math.sqrt(Bh(C.lines??0)))),d[O]=(X?.32:1)*qu(C.updated,this.now);const K=nc.findIndex(J=>C.flags.includes(J));g[O]=K<0?0:K+1,m[O*3]=i.positions[O*3]+r.x,m[O*3+1]=i.positions[O*3+1]+r.y,m[O*3+2]=i.positions[O*3+2]+r.z}),h.setAttribute("position",new Me(i.positions,3)),h.setAttribute("aColor",new Me(u,3)),h.setAttribute("aSize",new Me(f,1)),h.setAttribute("aAlpha",new Me(d,1)),h.setAttribute("aFlag",new Me(g,1));const E=new Me(_,1);E.setUsage(om),h.setAttribute("aState",E);const P=new lu(h,c);P.frustumCulled=!1;const S=new Vi;S.position.copy(r),S.add(P);const w=C=>{const O=a.get(C);return O===void 0?null:[i.positions[O*3],i.positions[O*3+1],i.positions[O*3+2]]},U=new Map;for(const C of t.links){const O=Ca(C.rel,C.source,C.target);if(!O)continue;const[z,X,W]=O;if(z==="part_of")continue;const K=w(X),J=w(W);if(!K||!J||X===W)continue;let Z=U.get(z);Z||U.set(z,Z={pos:[],colors:[]}),Z.pos.push(...K,...J);const at=$n(kn[z]);Z.colors.push(at[0]*.55,at[1]*.55,at[2]*.55,at[0],at[1],at[2])}const T=new Map;for(const[C,O]of U){const z=Aa[C],X=this.trail(O.pos,O.colors,`fam:${C}`,z.width,z.opacity,z.dashed);for(const W of X)W.visible=!1,S.add(W);T.set(C,X)}if(i.skeleton.length){const C=[];for(const X of i.skeletonShade){const W=.5+.3*X;C.push(p*W,y*W,M*W)}const O=Aa.part_of,z=this.trail([...i.skeleton],C,"fam:part_of",O.width,O.opacity,!1);for(const X of z)X.visible=!1,S.add(X);T.set("part_of",z)}this.scene.add(S);const x=new Set(i.branches.flatMap(C=>C.note?[C.note]:[]));return{slug:t.slug,data:t,center:r,radius:e.r,group:S,stars:P,material:c,state:E,sizes:f,ids:i.ids,index:a,nodes:o,world:m,lines:T,branches:i.branches,branchNotes:x,fade:0,target:1}}disposeLayer(t){this.scene.remove(t.group),t.stars.geometry.dispose(),t.material.dispose(),this.starMats.delete(t.material);for(const e of t.lines.values())for(const i of e)i.geometry.dispose()}setFocus(t,e=!0){const i=qr(t)!==qr(this.focus)||t.constellation!==this.focus.constellation||t.topic!==this.focus.topic;this.focus={...t},this.buildNeighborhood(),t.topic&&this.reveal(t.topic),i&&this.buildFlows(),this.refreshGroups(),this.refreshStates(),e&&this.flyTo(t)}buildNeighborhood(){this.neighborhood.clear(),this.focusHits=[];for(const h of[...this.focusLines.children])this.focusLines.remove(h),h.geometry.dispose();const t=this.focus,e=t.note&&t.topic?this.revealed.get(t.topic):void 0,i=e&&t.note?e.index.get(t.note):void 0;if(!e||i===void 0||!t.note)return;this.neighborhood.set(t.note,3);const r=[e.world[i*3],e.world[i*3+1],e.world[i*3+2]],s=(h,u)=>{for(const d of[e,u?this.revealed.get(u):void 0]){const g=d?.index.get(h);if(d&&g!==void 0)return[d.world[g*3],d.world[g*3+1],d.world[g*3+2]]}const f=u?this.layout.topics.get(u):void 0;return f?[f.x,f.y,f.z]:null},o=new Map,a={id:t.note,title:e.nodes[i].title,topic:e.slug},l=(h,u,f,d,g,_)=>{if(h==="links_to")return;const m=Ca(h,u,f),p=s(d,g);if(!m||!p)return;this.neighborhood.has(d)||this.neighborhood.set(d,2);const[y,M]=m,E=M===t.note,P={id:d,title:_,topic:g??e.slug};this.focusHits.push(E?{family:y,from:a,to:P,a:r,b:p}:{family:y,from:P,to:a,a:p,b:r});let S=o.get(y);S||o.set(y,S={pos:[],colors:[]}),S.pos.push(...E?r:p,...E?p:r);const w=$n(kn[y]);S.colors.push(w[0]*.5,w[1]*.5,w[2]*.5,w[0]*1.2,w[1]*1.2,w[2]*1.2)},c=h=>e.nodes[e.index.get(h)??-1]?.title??h;for(const h of e.data.links)h.source===t.note?l(h.rel,h.source,h.target,h.target,e.slug,c(h.target)):h.target===t.note&&l(h.rel,h.source,h.target,h.source,e.slug,c(h.source));for(const h of e.data.external)h.source===t.note?l(h.rel,h.source,h.target,h.target,h.topic,h.title):h.target===t.note&&l(h.rel,h.source,h.target,h.source,h.topic,h.title);for(const[h,u]of o){const f=Aa[h];for(const d of this.trail(u.pos,u.colors,`focus:${h}`,f.width+1,Math.min(1,f.opacity+.25),f.dashed))this.focusLines.add(d)}}setRun(t){this.run=t,this.buildFlows(),this.refreshGroups(),this.refreshStates()}setLayers(t){this.layers={...t};for(const e of this.revealed.values())for(const[i,r]of e.lines)for(const s of r)s.visible=this.layers[i]&&e.fade>.05}setHealth(t){this.health=t;for(const e of this.starMats)e.uniforms.uHealth.value=t?1:0;this.dimFlows(),this.refreshGroups()}dimFlows(){for(const[t,e]of this.lineMats)t.startsWith("flow")&&(e.userData.base??=e.opacity,e.opacity=e.userData.base*(this.health?.3:1))}setLabels(t){this.labels.setVisible(t)}setQualityMode(t){if(this.qualityMode=t,t!=="auto"){this.quality=t;return}this.quality="high",this.autoDecided=!1,this.autoSamples=[],this.autoFrom=this.clock.elapsedTime+1.5}refreshGroups(){const t=this.focus,e=this.run?new Set(Object.keys(this.run.topics)):null;this.topics.forEach((i,r)=>{let s=1,o=0;t.topic?s=i.slug===t.topic?t.note?.05:.1:.22:t.constellation&&(s=i.constellation===t.constellation?1:.3),this.revealed.has(i.slug)&&i.slug!==t.topic&&(s*=.45);const a=this.severity[r];this.health&&(s*=.3+.7*a),e&&(e.has(i.slug)?o=.45:s*=.12),this.groups.set(r,s,o,this.health?1:0,a)}),this.world.constellations.forEach((i,r)=>{const s=this.dustSeverity[r];let o=t.note?.3:t.topic||t.constellation?.4:1;this.health&&(o*=.35+.65*s),this.dustGroups.set(r,o,0,this.health?1:0,s)});for(const i of this.revealed.values())i.target=!t.topic||i.slug===t.topic||this.run?.topics[i.slug]?1:.3;this.bloomTarget=t.note?.45:t.topic?.5:.95}refreshStates(){const t=this.run?new Set(this.run.touched):null;for(const e of this.revealed.values()){const i=e.state.array;e.ids.forEach((r,s)=>{let o=0;this.neighborhood.size&&(o=this.neighborhood.get(r)??1),t&&(o=t.has(r)?Math.max(o,2):o||1),this.hoverEnds.has(r)&&(o=Math.max(o,2)),i[s]=o}),e.state.needsUpdate=!0}}flyTo(t,e=!1){this.userDriven=!1;const i=!e&&this.motion,r=this.layout.radius,s=(l,c)=>{const h=l.clone().addScaledVector(my,c);this.controls.setLookAt(h.x,h.y,h.z,l.x,l.y,l.z,i)};if(t.note&&t.topic){const l=this.revealed.get(t.topic),c=l?.index.get(t.note);if(l&&c!==void 0){const f=new N(l.world[c*3],l.world[c*3+1],l.world[c*3+2]);s(f,Math.max(48,l.radius*1.1));return}const h=t.topic,u=t.note;this.reveal(h).then(()=>{this.focus.note===u&&this.revealed.get(h)?.index.has(u)&&this.flyTo(this.focus)})}if(t.topic){const l=this.layout.topics.get(t.topic);l&&s(new N(l.x,l.y,l.z),l.r*3.1);return}const o=t.constellation?this.layout.constellations.get(t.constellation):this.world.constellations.length===1?this.layout.constellations.get(this.world.constellations[0].id):void 0;if(o){s(new N(o.x,o.y,o.z),o.r*2.4);return}const a=r/Math.sin(this.camera.fov*Math.PI/360)/Math.min(1,this.camera.aspect);s(new N(-r*.08,0,0),a*.86)}resetView(){this.flyTo({})}view(){return{pos:this.camera.position.clone(),target:this.controls.getTarget(new N)}}pointScale(){return this.renderer.getDrawingBufferSize(new zt).y/(2*Math.tan(this.camera.fov*Math.PI/360))}resize=()=>{const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setSize(t,e,!1),this.composer.setSize(t,e),this.bloom.resolution.set(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();const i=this.pointScale();for(const r of this.glowMats)r.uniforms.uScale.value=i;for(const r of this.starMats)r.uniforms.uScale.value=i;for(const r of this.lineMats.values())r.resolution.set(t,e)};frame=()=>{if(this.disposed)return;const t=Math.min(.1,this.clock.getDelta()),e=this.clock.elapsedTime;this.controls.update(t),this.trackFps(t);const i=performance.now();i-this.lastLod>120&&(this.lastLod=i,this.updateLod()),this.animate(t,e),this.pointer.dirty&&(this.pointer.dirty=!1,this.hover()),this.updateLabels(),this.quality==="high"?(this.vignette.uniforms.uTime.value=e,this.composer.render(t)):this.renderer.render(this.scene,this.camera)};trackFps(t){this.frameTimes.push(t),this.frameTimes.length>60&&this.frameTimes.shift();const e=this.frameTimes.reduce((o,a)=>o+a,0)/this.frameTimes.length;if(this.fps=e>0?1/e:0,this.qualityMode!=="auto"||this.autoDecided)return;const i=this.clock.elapsedTime;if(i<this.autoFrom||(this.autoSamples.push(t),i<this.autoFrom+2.5||this.autoSamples.length<20))return;const r=[...this.autoSamples].sort((o,a)=>o-a),s=r[r.length>>1]>1/30?"low":"high";this.autoDecided=!0,this.autoSamples=[],this.quality=s,this.events.quality(s,!0)}animate(t,e){const i=1-Math.exp(-t*6);this.groups.ease(i),this.dustGroups.ease(i),this.bloom.strength+=(this.bloomTarget-this.bloom.strength)*i;for(const[r,s]of[...this.revealed]){s.fade+=(s.target-s.fade)*i,s.material.uniforms.uFade.value=s.fade,s.material.uniforms.uTime.value=e,s.group.visible=s.fade>.02;for(const[o,a]of s.lines)for(const l of a)l.visible=this.layers[o]&&s.fade>.05;s.target===0&&s.fade<.03&&(this.disposeLayer(s),this.revealed.delete(r))}if(this.motion)for(const[r,s]of this.lineMats)s.dashed&&(s.dashOffset-=t*(r.includes("supersedes")?9:14))}viewSample(t){const e=this.controls.getTarget(new N,!1),i=this.camera.position,r=(c,h)=>Math.hypot(c-e.x,h-e.z);let s=null,o=1.6;for(const c of this.topics){const h=this.layout.topics.get(c.slug),u=r(h.x,h.z)/h.r;u<o&&(o=u,s={slug:c.slug,constellation:c.constellation,size:(this.topicPx.get(c.slug)??0)/t})}const a=c=>{const h=this.layout.constellations.get(c);return h?ji(h.r,i.distanceTo(new N(h.x,h.y,h.z)),t,this.camera.fov)/t:0};let l=null;o=1.3;for(const c of this.world.constellations){const h=this.layout.constellations.get(c.id),u=r(h.x,h.z)/h.r;u<o&&(o=u,l={id:c.id,size:a(c.id)})}return{nearTopic:s,nearConstellation:l,focusTopicSize:this.focus.topic?(this.topicPx.get(this.focus.topic)??0)/t:0,focusConstellationSize:this.focus.constellation?a(this.focus.constellation):0,multi:this.world.constellations.length>1,only:this.world.constellations.length===1?this.world.constellations[0].id:void 0}}updateLod(){const t=this.container.clientHeight||1,e=new Jl().setFromProjectionMatrix(new pe().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse)),i=new Ei,r=this.topics.map(l=>{const c=this.layout.topics.get(l.slug);i.center.set(c.x,c.y,c.z),i.radius=c.r;const h=ji(c.r,this.camera.position.distanceTo(i.center),t,this.camera.fov);return this.topicPx.set(l.slug,h),{slug:l.slug,px:h,visible:e.intersectsSphere(i)}});this.events.view(this.viewSample(t),this.userDriven);const s=new Set([...this.revealed].filter(([,l])=>l.target>0).map(([l])=>l)),o=Lf(r,s);if(this.focus.topic&&o.add(this.focus.topic),this.run)for(const l of Object.keys(this.run.topics))(this.topicPx.get(l)??0)>40&&o.add(l);let a=!1;for(const l of o){const c=this.revealed.get(l);c?c.target===0&&(a=!0,c.target=1):this.reveal(l)}for(const[l,c]of this.revealed)!o.has(l)&&c.target!==0&&(c.target=0,a=!0);a&&this.refreshGroups()}updateLabels(){const t=this.container.clientWidth,e=this.container.clientHeight,i=[],r=this.camera.position,s=qr(this.focus),o=e/2/Math.tan(this.camera.fov*Math.PI/360),a=this.layout.inbox,l=ji(a.r,r.distanceTo(new N(a.x,a.y,a.z)),e,this.camera.fov);if(l>6&&i.push({key:"inbox",kind:"inbox",text:"Inbox",sub:`${this.world.episodes.count} pending`,color:"#ffd88a",pos:new N(a.x,a.y,a.z),priority:7e3,lift:Math.min(l,60)*.6}),this.world.constellations.length>1)for(const h of this.world.constellations){if(this.focus.constellation===h.id&&s!=="galaxy")continue;const u=this.layout.constellations.get(h.id),f=new N(u.x,u.y,u.z),d=ji(u.r,r.distanceTo(f),e,this.camera.fov);d<16||d>1500||i.push({key:`c:${h.id}`,kind:"constellation",text:Si(h.title),sub:`${h.topics.length} topics`,color:h.color,pos:f,priority:6e3+d,lift:Math.min(d*.55,120),emphasis:this.hoverTopics.has(h.id)})}for(const h of this.topics){const u=this.topicPx.get(h.slug)??0,f=this.focus.topic===h.slug,d=this.revealed.get(h.slug);if(u<(s==="galaxy"&&this.world.constellations.length>1?15:8)&&!f||d&&d.fade>.5&&u>(f?220:520))continue;const g=this.layout.topics.get(h.slug),_=!this.focus.constellation||h.constellation===this.focus.constellation,m=this.run?.topics[h.slug];i.push({key:`t:${h.slug}`,kind:"topic",text:h.title,sub:m?`${m} changed`:h.flagged?`${h.notes} · ${h.flagged}⚑`:`${h.notes}`,color:h.color,pos:new N(g.x,g.y,g.z),priority:(f?9e3:3e3)+u*2+(_?400:0)+(this.health&&h.flagged?600:0)+(m?5e3:0)+(this.hoverTopics.has(h.slug)?6e3:0),lift:Math.min(u,140)*.62,emphasis:f||!!m||this.hovered===`t:${h.slug}`||this.hoverTopics.has(h.slug)})}const c=new N;for(const h of this.revealed.values()){if(h.fade<.5||(this.topicPx.get(h.slug)??0)<200)continue;const u=h.nodes.map((f,d)=>({nd:f,i:d})).sort((f,d)=>d.nd.degree-f.nd.degree).slice(0,140);for(const f of h.branches){const d=f.note?Math.max(this.neighborhood.get(f.note)??0,this.hoverEnds.has(f.note)?2:0):0,g=!!f.note&&this.hovered===`n:${f.note}`;i.push({key:`b:${h.slug}:${f.key}`,kind:"branch",text:f.label,sub:`${f.count}`,pos:new N(f.position[0]+h.center.x,f.position[1]+h.center.y,f.position[2]+h.center.z),priority:d>=2||g?12e3:5200+f.count*8-f.depth*300,lift:10,emphasis:d>=2||g})}for(const{nd:f,i:d}of u){if(h.branchNotes.has(f.id))continue;c.set(h.world[d*3],h.world[d*3+1],h.world[d*3+2]);const g=r.distanceTo(c),_=h.sizes[d]*o/Math.max(g,1),m=this.hoverEnds.has(f.id),p=Math.max(this.neighborhood.get(f.id)??0,m?2:0),y=f.id===h.data.hub;if(_<3.5&&p<2&&!y)continue;const M=f.flags.length>0,E=m?12500:p===3?12e3:p===2?8500:y?6500:(M?2500:1e3)+f.degree*20+_*10;i.push({key:`n:${f.id}`,kind:y?"hub":"note",text:f.title,sub:y?"index":void 0,color:M?"#ff6b7a":void 0,pos:c.clone(),priority:E,lift:_/2+6,emphasis:p>=2||this.hovered===`n:${f.id}`})}}this.labels.update(i,this.camera,t,e)}bindPointer(){const t=this.renderer.domElement;t.addEventListener("pointermove",e=>{const i=t.getBoundingClientRect();this.pointer.x=e.clientX-i.left,this.pointer.y=e.clientY-i.top,this.pointer.inside=!0,this.pointer.down&&Math.hypot(e.clientX-this.pointer.dx,e.clientY-this.pointer.dy)>5&&(this.pointer.moved=!0),this.pointer.dirty=!0}),t.addEventListener("pointerleave",()=>{this.pointer.inside=!1,this.hovered=null,this.events.hover(null,0,0)}),t.addEventListener("pointerdown",e=>{this.pointer.down=!0,this.pointer.moved=!1,this.pointer.dx=e.clientX,this.pointer.dy=e.clientY}),t.addEventListener("pointerup",e=>{const i=this.pointer.down&&!this.pointer.moved&&e.button===0;if(this.pointer.down=!1,!i)return;const r=t.getBoundingClientRect();this.events.select(this.pick(e.clientX-r.left,e.clientY-r.top))}),t.addEventListener("contextmenu",e=>e.preventDefault())}hover(){if(!this.pointer.inside||this.pointer.down)return;const t=this.pickDetailed(this.pointer.x,this.pointer.y),e=t?.key??null;this.renderer.domElement.style.cursor=t?"pointer":"",e!==this.hovered&&(this.hovered=e,this.setHighlight(t)),this.events.hover(t?.target??null,this.pointer.x,this.pointer.y)}setHighlight(t){this.hoverLine&&(this.scene.remove(this.hoverLine),this.hoverLine.geometry.dispose(),this.hoverLine=null);const e=new Set,i=new Set,r=t?.target;if(r?.kind==="link"?e.add(r.from.id).add(r.to.id):r?.kind==="flow"&&i.add(r.a).add(r.b),t?.segments){const o=$n(t.color??"#e8f0ff").map(l=>Math.min(1.8,l*1.6)),a=[];for(let l=0;l<t.segments.length/3;l++)a.push(o[0],o[1],o[2]);this.hoverLine=this.segments(t.segments,a,this.lineMaterial("hover",4.5,1,!1)),this.hoverLine.renderOrder=10,this.scene.add(this.hoverLine)}const s=e.size!==this.hoverEnds.size||[...e].some(o=>!this.hoverEnds.has(o));this.hoverEnds=e,this.hoverTopics=i,s&&this.refreshStates()}pick(t,e){return this.pickDetailed(t,e)?.target??null}pickLink(t,e,i){const r=(l,c,h,u)=>{const f=h-l,d=u-c,g=f*f+d*d,_=g?Math.max(0,Math.min(1,((t-l)*f+(e-c)*d)/g)):0;return Math.hypot(l+_*f-t,c+_*d-e)},s=(l,c,h)=>`l:${l}:${c.id}>${h.id}`;let o=null,a=6;for(const l of this.focusHits){if(!this.layers[l.family])continue;const c=i(l.a[0],l.a[1],l.a[2]),h=i(l.b[0],l.b[1],l.b[2]);if(!c||!h)continue;const u=r(c[0],c[1],h[0],h[1]);u<a&&(a=u,o={target:{kind:"link",family:l.family,from:l.from,to:l.to},key:s(l.family,l.from,l.to),segments:[...l.a,...l.b],color:kn[l.family]})}if(o)return o;a=5;for(const l of this.revealed.values()){if(l.fade<.5)continue;const c=l.ids.map((h,u)=>i(l.world[u*3],l.world[u*3+1],l.world[u*3+2]));for(const h of l.data.links){const u=Ca(h.rel,h.source,h.target);if(!u||u[0]==="part_of"||!this.layers[u[0]])continue;const f=l.index.get(u[1]),d=l.index.get(u[2]);if(f===void 0||d===void 0||f===d)continue;const g=c[f],_=c[d];if(!g||!_)continue;const m=r(g[0],g[1],_[0],_[1]);if(m<a){a=m;const p={id:u[1],title:l.nodes[f].title,topic:l.slug},y={id:u[2],title:l.nodes[d].title,topic:l.slug},M=l.world;o={target:{kind:"link",family:u[0],from:p,to:y},key:s(u[0],p,y),segments:[M[f*3],M[f*3+1],M[f*3+2],M[d*3],M[d*3+1],M[d*3+2]],color:kn[u[0]]}}}}if(o)return o;a=5;for(const l of this.flowHits){let c=i(l.points[0].x,l.points[0].y,l.points[0].z);for(let h=1;h<l.points.length;h++){const u=i(l.points[h].x,l.points[h].y,l.points[h].z);if(c&&u){const f=r(c[0],c[1],u[0],u[1]);if(f<a){a=f;const d=[];for(let g=0;g<l.points.length-1;g++)d.push(...l.points[g].toArray(),...l.points[g+1].toArray());o={target:{kind:"flow",level:l.level,a:l.a,b:l.b,total:l.total,rels:l.rels},key:`f:${l.a}|${l.b}`,segments:d}}}c=u}}return o}pickDetailed(t,e){const i=_=>_&&{target:_,key:_.kind==="topic"?`t:${_.slug}`:_.kind==="constellation"?`c:${_.id}`:"inbox"},r=this.container.clientWidth,s=this.container.clientHeight,o=s/2/Math.tan(this.camera.fov*Math.PI/360),a=new N,l=(_,m,p)=>(a.set(_,m,p).project(this.camera),a.z>1?null:[(a.x*.5+.5)*r,(-a.y*.5+.5)*s]);let c=null,h=1/0;for(const _ of this.revealed.values())if(!(_.fade<.3))for(let m=0;m<_.ids.length;m++){const p=l(_.world[m*3],_.world[m*3+1],_.world[m*3+2]);if(!p)continue;const y=this.camera.position.distanceTo(a.set(_.world[m*3],_.world[m*3+1],_.world[m*3+2])),M=Math.max(7,_.sizes[m]*o/Math.max(y,1)*.5+3),E=Math.hypot(p[0]-t,p[1]-e);E<M&&E<h&&(h=E,c={kind:"note",id:_.ids[m],topic:_.slug})}if(c)return{target:c,key:`n:${c.id}`};const u=this.pickLink(t,e,l);if(u)return u;let f=1/0;for(const _ of this.topics){const m=this.layout.topics.get(_.slug),p=l(m.x,m.y,m.z);if(!p)continue;const y=Math.max(10,(this.topicPx.get(_.slug)??0)*.7),M=Math.hypot(p[0]-t,p[1]-e);M<y&&M/y<f&&(f=M/y,c={kind:"topic",slug:_.slug})}const d=this.layout.inbox,g=l(d.x,d.y,d.z);if(g){const _=Math.max(12,ji(d.r,this.camera.position.distanceTo(a.set(d.x,d.y,d.z)),s,this.camera.fov)),m=Math.hypot(g[0]-t,g[1]-e);m<_&&m/_<f&&(f=m/_,c={kind:"inbox"})}if(c)return i(c);if(this.world.constellations.length>1)for(const _ of this.world.constellations){const m=this.layout.constellations.get(_.id),p=l(m.x,m.y,m.z);if(!p)continue;const y=ji(m.r,this.camera.position.distanceTo(a.set(m.x,m.y,m.z)),s,this.camera.fov)*.8,M=Math.hypot(p[0]-t,p[1]-e);M<y&&M/y<f&&(f=M/y,c={kind:"constellation",id:_.id})}return i(c)}screenOf(t){let e=null;if(t.kind==="topic"){const i=this.layout.topics.get(t.slug);i&&(e=new N(i.x,i.y,i.z))}else if(t.kind==="constellation"){const i=this.layout.constellations.get(t.id);i&&(e=new N(i.x,i.y,i.z))}else if(t.kind==="note"){const i=this.revealed.get(t.topic),r=i?.index.get(t.id);i&&r!==void 0&&(e=new N(i.world[r*3],i.world[r*3+1],i.world[r*3+2]))}else if(t.kind==="inbox"){const i=this.layout.inbox;e=new N(i.x,i.y,i.z)}return e?(e.project(this.camera),{x:(e.x*.5+.5)*this.container.clientWidth,y:(-e.y*.5+.5)*this.container.clientHeight}):null}noteTitle(t){for(const e of this.revealed.values()){const i=e.index.get(t);if(i!==void 0)return e.nodes[i].title}}revealedTopics(){return[...this.revealed].filter(([,t])=>t.target>0).map(([t])=>t)}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),window.removeEventListener("resize",this.resize);for(const t of this.revealed.values())this.disposeLayer(t);this.controls.dispose(),this.renderer.dispose()}}var os,Ee,Ra,$u,as=0,Cd=[],we=he,Zu=we.__b,ju=we.__r,Ku=we.diffed,Qu=we.__c,Ju=we.unmount,th=we.__;function ic(n,t){we.__h&&we.__h(Ee,n,as||t),as=0;var e=Ee.__H||(Ee.__H={__:[],__h:[]});return n>=e.__.length&&e.__.push({}),e.__[n]}function Rn(n){return as=1,_y(Pd,n)}function _y(n,t,e){var i=ic(os++,2);if(i.t=n,!i.__c&&(i.__=[Pd(void 0,t),function(a){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,a);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=Ee,!Ee.__f)){var r=function(a,l,c){if(!i.__c.__H)return!0;var h=i.__c.__H.__.filter(function(f){return!!f.__c});if(h.every(function(f){return!f.__N}))return!s||s.call(this,a,l,c);var u=i.__c.props!==a;return h.forEach(function(f){if(f.__N){var d=f.__[0];f.__=f.__N,f.__N=void 0,d!==f.__[0]&&(u=!0)}}),s&&s.call(this,a,l,c)||u};Ee.__f=!0;var s=Ee.shouldComponentUpdate,o=Ee.componentWillUpdate;Ee.componentWillUpdate=function(a,l,c){if(this.__e){var h=s;s=void 0,r(a,l,c),s=h}o&&o.call(this,a,l,c)},Ee.shouldComponentUpdate=r}return i.__N||i.__}function Mi(n,t){var e=ic(os++,3);!we.__s&&Rd(e.__H,t)&&(e.__=n,e.u=t,Ee.__H.__h.push(e))}function us(n){return as=5,_n(function(){return{current:n}},[])}function _n(n,t){var e=ic(os++,7);return Rd(e.__H,t)&&(e.__=n(),e.__H=t,e.__h=n),e.__}function vy(n,t){return as=8,_n(function(){return n},t)}function xy(){for(var n;n=Cd.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(uo),n.__H.__h.forEach(Rl),n.__H.__h=[]}catch(t){n.__H.__h=[],we.__e(t,n.__v)}}we.__b=function(n){Ee=null,Zu&&Zu(n)},we.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),th&&th(n,t)},we.__r=function(n){ju&&ju(n),os=0;var t=(Ee=n.__c).__H;t&&(Ra===Ee?(t.__h=[],Ee.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(uo),t.__h.forEach(Rl),t.__h=[],os=0)),Ra=Ee},we.diffed=function(n){Ku&&Ku(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(Cd.push(t)!==1&&$u===we.requestAnimationFrame||(($u=we.requestAnimationFrame)||yy)(xy)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),Ra=Ee=null},we.__c=function(n,t){t.some(function(e){try{e.__h.forEach(uo),e.__h=e.__h.filter(function(i){return!i.__||Rl(i)})}catch(i){t.some(function(r){r.__h&&(r.__h=[])}),t=[],we.__e(i,e.__v)}}),Qu&&Qu(n,t)},we.unmount=function(n){Ju&&Ju(n);var t,e=n.__c;e&&e.__H&&(e.__H.__.forEach(function(i){try{uo(i)}catch(r){t=r}}),e.__H=void 0,t&&we.__e(t,e.__v))};var eh=typeof requestAnimationFrame=="function";function yy(n){var t,e=function(){clearTimeout(i),eh&&cancelAnimationFrame(t),setTimeout(n)},i=setTimeout(e,35);eh&&(t=requestAnimationFrame(e))}function uo(n){var t=Ee,e=n.__c;typeof e=="function"&&(n.__c=void 0,e()),Ee=t}function Rl(n){var t=Ee;n.__c=n.__(),Ee=t}function Rd(n,t){return!n||n.length!==t.length||t.some(function(e,i){return e!==n[i]})}function Pd(n,t){return typeof t=="function"?t(n):t}class Sy{constructor(t){this.s=t}listeners=new Set;get state(){return this.s}set(t){this.s={...this.s,...t};for(const e of this.listeners)e()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}function Xt(n,t){const[e,i]=Rn(()=>t(n.state));return Mi(()=>{const r=()=>i(()=>t(n.state));return r(),n.subscribe(r)},[n]),e}class My{constructor(t,e){this.source=t,this.world=e,this.constellationOf=new Map(e.topics.map(s=>[s.slug,s.constellation])),this.trail=new Af(Ey(`brainviz.trail:${e.brain}:${location.pathname}`));const i=new URLSearchParams(location.search).get("quality"),r=Dd(i)?i:by()??"low";this.store=new Sy({world:e,focus:{},hover:null,note:null,topicData:null,layers:Object.fromEntries(Mr.map(s=>[s,s!=="links_to"])),health:!1,labels:!0,quality:r==="low"?"low":"high",qualityMode:r,navOpen:!0,navTab:"atlas",paletteOpen:!1,helpOpen:!1,healthData:null,run:null,toast:null,embedded:t.embedded,sceneError:null,previewOpen:!1,trail:this.trail.state(),historyOpen:!1,zoom:0})}store;galaxy=null;toastTimer=0;noteSeq=0;constellationOf;trail;mount(t){try{this.galaxy=new gy(t,this.world,this.source,{hover:(e,i,r)=>this.store.set({hover:e?{target:e,x:i,y:r}:null}),select:e=>this.select(e),view:(e,i)=>this.onView(e,i),quality:(e,i)=>{this.store.set({quality:e}),i&&e==="low"&&this.toast("Graphics set to Low: frames were slow on this GPU, so the glow is off. Change it in the ⋯ menu.")}},this.store.state.qualityMode),this.galaxy.setLayers(this.store.state.layers)}catch(e){t.replaceChildren(),this.store.set({sceneError:e instanceof Error?e.message:String(e)}),console.error("brain viz: the 3D scene could not start",e)}window.addEventListener("popstate",e=>this.onHistory(e.state)),window.addEventListener("hashchange",()=>this.onHistory(history.state)),this.onHistory(history.state),window.__brainViz={controller:this,galaxy:this.galaxy,ready:!0},document.body.dataset.ready="1"}onHistory(t){this.applyHash();const e=this.store.state.focus,i=Hn(e),r=t?.brainViz;if(typeof r=="number"&&this.trail.entries[r]?.hash===i)this.trail.moveTo(r);else{const s=this.trail.visit({hash:i,focus:e,title:this.titleOf(e)});history.replaceState({brainViz:s},"",i)}this.syncTrail()}back(){this.trail.canBack&&history.back()}forward(){this.trail.canForward&&history.forward()}jump(t){const e=t-this.trail.index;this.store.set({historyOpen:!1}),e&&history.go(e)}syncTrail(){this.store.set({trail:this.trail.state()});try{sessionStorage.setItem(this.trailKey(),JSON.stringify(this.trail.state()))}catch{}}trailKey(){return`brainviz.trail:${this.world.brain}:${location.pathname}`}titleOf(t){if(t.note)return this.galaxy?.noteTitle(t.note)??this.store?.state.topicData?.nodes.find(e=>e.id===t.note)?.title}applyHash(){const t=Df(location.hash,e=>this.constellationOf.get(e));(Hn(t)!==Hn(this.store.state.focus)||!this.store.state.focus.constellation)&&this.focus(t,"none")}focus(t,e="push",i=!0){t.topic&&!t.constellation&&(t={...t,constellation:this.constellationOf.get(t.topic)});const r=this.store.state.focus;this.store.set({focus:t,hover:null}),this.galaxy?.setFocus(t,i);const s=Hn(t);if(e!=="none"&&s!==location.hash){const o={hash:s,focus:t,title:this.titleOf(t)};e==="push"?history.pushState({brainViz:this.trail.visit(o)},"",s):history.replaceState({brainViz:this.trail.replace(o)},"",s),this.syncTrail()}if(t.topic&&t.topic!==r.topic?(this.store.set({topicData:null}),this.source.topic(t.topic).then(o=>{this.store.state.focus.topic===t.topic&&this.store.set({topicData:o})})):t.topic||this.store.set({topicData:null}),t.note){const o=++this.noteSeq;t.note!==r.note&&this.store.set({note:null}),this.source.note(t.note).then(a=>{o===this.noteSeq&&this.store.set({note:a}),a&&this.trail.setTitle(Hn(t),a.title)&&this.syncTrail()})}else this.store.set({note:null,previewOpen:!1})}up(){const t=this.store.state;if(t.paletteOpen)return this.store.set({paletteOpen:!1});if(t.historyOpen)return this.store.set({historyOpen:!1});if(t.helpOpen)return this.store.set({helpOpen:!1});if(t.previewOpen)return this.store.set({previewOpen:!1});if(t.run)return this.setRun(null);if(qr(t.focus)==="galaxy")return this.galaxy?.resetView();this.levelUp()}climbed=[];async levelUp(){const t=this.store.state.focus,e=t.topic?await this.source.topic(t.topic):null,i=zo(t,this.world,e);i&&(this.climbed.push(t),this.focus(i))}async sibling(t){const e=this.store.state.focus,i=zo(e,this.world,e.topic?await this.source.topic(e.topic):null);if(!i)return;const r=Rc(i,this.world,i.topic?await this.source.topic(i.topic):null),s=l=>l.note??l.topic??l.constellation??"",o=r.findIndex(l=>s(l)===s(e)),a=r[(o+t+r.length)%r.length];a&&s(a)!==s(e)&&this.focus(a)}async levelDown(){const t=this.store.state.focus,e=Hn(t),i=this.climbed.pop();if(i){const o=i.topic?await this.source.topic(i.topic):null,a=zo(i,this.world,o);if(a&&Hn(a)===e)return this.focus(i);this.climbed=[]}const r=t.topic?await this.source.topic(t.topic):null,[s]=Rc(t,this.world,r);s?this.focus(s):this.toast("Nothing below this note.")}select(t){if(t)if(t.kind==="constellation")this.focus({constellation:t.id});else if(t.kind==="topic")this.focus({topic:t.slug});else if(t.kind==="note")this.openNote(t.id,t.topic);else if(t.kind==="link"){const e=this.store.state.focus.note===t.to.id?t.from:t.to;this.focus({topic:e.topic,note:e.id})}else if(t.kind==="flow"){const e=this.store.state.focus;t.level==="constellation"?this.focus({constellation:e.constellation===t.b?t.a:t.b}):this.focus({topic:e.topic===t.b?t.a:t.b})}else this.toast(`${this.world.episodes.count} episodes wait in the inbox. Ask your agent to consolidate them, or run brain consolidate.`)}onView(t,e){const i=this.store.state.focus,{focus:r,progress:s}=Uf(i,t);Math.abs(s-this.store.state.zoom)>.02&&this.store.set({zoom:s}),e&&Hn(r)!==Hn(i)&&this.focus(r,"replace",!1)}openNote(t,e){e&&(this.focus({topic:e,note:t}),this.store.set({previewOpen:!0}))}setLayer(t,e){const i={...this.store.state.layers,[t]:e};this.store.set({layers:i}),this.galaxy?.setLayers(i)}setHealth(t){this.store.set({health:t}),this.galaxy?.setHealth(t),t&&!this.store.state.healthData&&this.loadHealth()}setLabels(t){this.store.set({labels:t}),this.galaxy?.setLabels(t)}setQualityMode(t){this.store.set({qualityMode:t,...t==="auto"?{}:{quality:t}}),this.galaxy?.setQualityMode(t);try{localStorage.setItem(Ld,t)}catch{}}setRun(t){if(this.store.set({run:t}),this.galaxy?.setRun(t),t){const e=Object.entries(t.topics).sort((i,r)=>r[1]-i[1])[0];e&&this.focus({constellation:this.constellationOf.get(e[0])})}}async loadHealth(){const t=await this.source.health();this.store.set({healthData:t})}setNav(t){this.store.set({navTab:t,navOpen:!0}),t==="health"&&!this.store.state.healthData&&this.loadHealth()}search(t){return this.source.search(t)}toast(t){this.store.set({toast:t}),window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.store.set({toast:null}),4200)}}function Ey(n){try{const t=sessionStorage.getItem(n),e=t?JSON.parse(t):void 0;return e&&Array.isArray(e.entries)&&typeof e.index=="number"?e:void 0}catch{return}}const Ld="brainviz.graphics";function Dd(n){return n==="auto"||n==="high"||n==="low"}function by(){try{const n=localStorage.getItem(Ld);return Dd(n)?n:null}catch{return null}}const Ro={conflict:"Conflicts",stale:"May be outdated",unverified:"Unverified facts",orphan:"Orphans",lint_error:"Format problems"},Yi={conflict:"#ff3b4f",stale:"#ffad38",unverified:"#bd85ff",orphan:"#9aa6c4",lint_error:"#ff6bc6"};function Ae({color:n,size:t=8}){return v("span",{class:"dot",style:{background:n,width:`${t}px`,height:`${t}px`,boxShadow:`0 0 10px ${n}`}})}function js({children:n,tone:t}){return v("span",{class:`chip${t?` chip-${t}`:""}`,children:n})}function Wi({children:n}){return v("kbd",{class:"kbd",children:n})}function Ge(n){return n>=1e4?`${(n/1e3).toFixed(1)}k`:n.toLocaleString()}function be({name:n}){return v("svg",{class:"icon",viewBox:"0 0 24 24","aria-hidden":"true",children:v("path",{d:{search:"M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.2 4.2-1.4 1.4-4.2-4.2A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z",layers:"m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",health:"M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21Z",reset:"M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5",help:"M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-6v.01M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V13",labels:"M4 5h16M4 12h10M4 19h7",spark:"M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6 4 4m0-14-4 4m-6 6-4 4",close:"M6 6l12 12M18 6 6 18",chevron:"m9 6 6 6-6 6",back:"m15 6-6 6 6 6",forward:"m9 6 6 6-6 6",more:"M5.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M16.5 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",history:"M12 7v5l3 2M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4 4v4h4",copy:"M8 8h11v11H8zM5 16V5h11",open:"M14 4h6v6m0-6-9 9M10 6H5v13h13v-5",read:"M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z",folder:"M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}[n]})})}const nh={part_of:"Part of",has_part:"Contains",depends_on:"Depends on",enables:"Enables",conflicts_with:"Conflicts with",supersedes:"Replaces",superseded_by:"Replaced by",related_to:"Related to",links_to:"Links to"};function ih(n){return n.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(t,e,i)=>i??e).replace(/(\*\*|__)(.+?)\1/g,"$2").replace(/`([^`]+)`/g,"$1")}const Ty={part_of:"part_of",has_part:"part_of",depends_on:"depends_on",enables:"depends_on",conflicts_with:"conflicts_with",supersedes:"supersedes",superseded_by:"supersedes",related_to:"related_to",links_to:"links_to"},rh={part_of:"has_part",has_part:"part_of",depends_on:"enables",enables:"depends_on",supersedes:"superseded_by",superseded_by:"supersedes"},sh=["superseded_by","supersedes","conflicts_with","depends_on","enables","part_of","has_part","related_to","links_to"];function wy(n,t){if(!t)return[];const e=new Map(t.nodes.map(o=>[o.id,o.title])),i=[],r=new Set,s=(o,a,l,c)=>{const h=`${o}|${a}`;r.has(h)||a===n||(r.add(h),i.push({rel:o,id:a,title:l,topic:c}))};for(const o of t.links)o.source===n?s(o.rel,o.target,e.get(o.target)??o.target,t.slug):o.target===n&&s(o.rel==="conflicts_with"||o.rel==="related_to"||o.rel==="links_to"?o.rel:rh[o.rel]??o.rel,o.source,e.get(o.source)??o.source,t.slug);for(const o of t.external)o.source===n?s(o.rel,o.target,o.title,o.topic):o.target===n&&s(o.rel==="conflicts_with"||o.rel==="related_to"||o.rel==="links_to"?o.rel:rh[o.rel]??o.rel,o.source,o.title,o.topic);return i.sort((o,a)=>sh.indexOf(o.rel)-sh.indexOf(a.rel)||o.title.localeCompare(a.title))}function vi({label:n,value:t,tone:e}){return v("div",{class:`stat${e?` stat-${e}`:""}`,children:[v("div",{class:"stat-v",children:typeof t=="number"?Ge(t):t}),v("div",{class:"stat-l",children:n})]})}function Ay({n,c:t,topic:e}){return v("button",{class:"row",onClick:()=>t.openNote(n.id,e),children:[v("span",{class:"row-title",children:n.title}),n.flags.length>0&&v(Ae,{color:Yi[n.flags[0]],size:6}),v("span",{class:"row-meta",children:n.degree===1?"1 link":`${Ge(n.degree)} links`})]})}function Pl(n){return n===1?"1 note":`${Ge(n)} notes`}function Cy({c:n,id:t}){const e=n.world.constellations.find(a=>a.id===t);if(!e)return null;const i=n.world.topics.filter(a=>a.constellation===t).sort((a,l)=>l.notes-a.notes),r=i.reduce((a,l)=>a+l.notes,0),s=i.reduce((a,l)=>a+l.flagged,0),o=i.reduce((a,l)=>a+l.recent,0);return v(Ne,{children:[v("div",{class:"insp-kicker",children:[v(Ae,{color:e.color})," Group of topics"]}),v("h2",{class:"insp-title",children:e.title}),v("div",{class:"stats",children:[v(vi,{label:"topics",value:i.length}),v(vi,{label:"notes",value:r}),v(vi,{label:"changed 7d",value:o}),v(vi,{label:"with issues",value:s,tone:s?"warn":void 0})]}),v("div",{class:"section-title",children:"Topics"}),v("div",{class:"rows",children:[i.slice(0,14).map(a=>v("button",{class:"row",onClick:()=>n.focus({topic:a.slug}),children:[v(Ae,{color:a.color,size:7}),v("span",{class:"row-title",children:a.title}),a.flagged>0&&v("span",{class:"badge",children:a.flagged}),v("span",{class:"row-meta",children:Pl(a.notes)})]},a.slug)),i.length>14&&v("div",{class:"more",children:["and ",i.length-14," more in the Topics tab"]})]})]})}function Ry({c:n,slug:t}){const e=Xt(n.store,u=>u.topicData),i=n.world.topics.find(u=>u.slug===t),r=_n(()=>n.world.flows.filter(u=>u.a===t||u.b===t).sort((u,f)=>f.total-u.total).slice(0,6),[n,t]);if(!i)return null;const s=new Map(n.world.topics.map(u=>[u.slug,u])),o=e?.slug===t?e:null,a=o?[...o.nodes].filter(u=>u.id!==o.hub).sort((u,f)=>f.degree-u.degree).slice(0,8):[],l=o?.nodes.find(u=>u.id===o.hub),c=n.world.topics.filter(u=>u.parent===t).sort((u,f)=>f.notes-u.notes),h=o?[...Pr(o).branches.values()].filter(u=>u.depth===1).sort((u,f)=>f.count-u.count||u.title.localeCompare(f.title)):[];return v(Ne,{children:[v("div",{class:"insp-kicker",children:[v(Ae,{color:i.color})," Topic"]}),v("h2",{class:"insp-title",children:i.title}),i.description&&v("p",{class:"insp-desc",children:i.description}),v("div",{class:"stats",children:[v(vi,{label:"notes",value:i.notes}),v(vi,{label:"changed 7d",value:i.recent}),v(vi,{label:"with issues",value:i.flagged,tone:i.flagged?"warn":void 0}),v(vi,{label:"last change",value:i.updated?i.updated.slice(5):"—"})]}),i.flagged>0&&v("div",{class:"flag-chips",children:nc.filter(u=>i.flags[u]).map(u=>v("span",{class:"flag-chip",style:{borderColor:Yi[u]},children:[v(Ae,{color:Yi[u],size:6})," ",Ro[u]," ",v("b",{children:i.flags[u]})]},u))}),l&&v("button",{class:"hub-link",onClick:()=>n.openNote(l.id,t),children:[v(be,{name:"spark"})," Open the topic index ",v("span",{class:"row-meta",children:l.title})]}),c.length>0&&v(Ne,{children:[v("div",{class:"section-title",children:["Sub-topics ",v("span",{class:"section-count",children:c.length})]}),v("div",{class:"rows",children:[c.slice(0,14).map(u=>v("button",{class:"row",onClick:()=>n.focus({topic:u.slug}),children:[v(Ae,{color:u.color,size:7}),v("span",{class:"row-title",children:u.title}),v("span",{class:"row-meta",children:Pl(u.notes)})]},u.slug)),c.length>14&&v("div",{class:"more",children:["and ",c.length-14," more in the Topics tab"]})]})]}),h.length>0&&v(Ne,{children:[v("div",{class:"section-title",children:["Folders ",v("span",{class:"section-count",children:h.length})]}),v("div",{class:"rows",children:[h.slice(0,12).map(u=>v("button",{class:"row",disabled:!u.note,title:u.note?void 0:"This folder has no folder note",onClick:()=>u.note&&n.openNote(u.note,t),children:[v(be,{name:"folder"}),v("span",{class:"row-title",children:u.title}),v("span",{class:"row-meta",children:Pl(u.count)})]},u.key)),h.length>12&&v("div",{class:"more",children:["and ",h.length-12," more"]})]})]}),!o&&v("div",{class:"empty small",children:"Loading…"}),o&&o.nodes.length>5&&v(Ne,{children:[v("div",{class:"section-title",children:"Most connected"}),v("div",{class:"rows",children:a.map(u=>v(Ay,{n:u,c:n,topic:t},u.id))})]}),r.length>0&&v(Ne,{children:[v("div",{class:"section-title",children:"Linked topics"}),v("div",{class:"rows",children:r.map(u=>{const f=s.get(u.a===t?u.b:u.a);return f?v("button",{class:"row",onClick:()=>n.focus({topic:f.slug}),children:[v(Ae,{color:f.color,size:7}),v("span",{class:"row-title",children:f.title}),v("span",{class:"row-meta",children:u.total===1?"1 link":`${Ge(u.total)} links`})]},f.slug):null})})]})]})}function Py({c:n,id:t,slug:e}){const i=Xt(n.store,m=>m.note),r=Xt(n.store,m=>m.topicData),[s,o]=Rn(!1),a=n.world.topics.find(m=>m.slug===e),l=r?.nodes.find(m=>m.id===t),c=_n(()=>wy(t,r?.slug===e?r:null),[t,r,e]),h=i?.title??l?.title??"…",u=i?.status??l?.status,f=new Map((r?.nodes??[]).map(m=>[m.path,m])),d=new Map;for(const m of c)d.set(m.rel,[...d.get(m.rel)??[],m]);const g=i?.path??l?.path,_=_n(()=>{if(r?.slug!==e)return[];const{branches:m,folderOf:p}=Pr(r),y=[];for(let M=m.get(p.get(t)??"");M&&M.key!=="";M=M.parent===null?void 0:m.get(M.parent))M.note!==t&&y.unshift(M);return y},[r,e,t]);return v(Ne,{children:[v("div",{class:"insp-kicker",children:[v(Ae,{color:a?.color??"#888"})," ",v("button",{class:"link",onClick:()=>n.focus({topic:e}),children:a?.title??e})]}),v("h2",{class:"insp-title",children:h}),_.length>0&&v("div",{class:"insp-place",title:"Where this note lives",children:["In ",[a?.title??e,..._.map(m=>m.title)].join(" › ")]}),v("div",{class:"chips",children:[(i?.kind??l?.kind)&&v(js,{children:i?.kind??l?.kind}),(i?.type??l?.type)&&v(js,{children:i?.type??l?.type}),u&&v(js,{tone:u==="active"?"ok":"warn",children:u}),(i?.updated??l?.updated)&&v(js,{tone:"dim",children:["updated ",(i?.updated??l?.updated??"").slice(0,10)]})]}),l&&l.flags.length>0&&v("div",{class:"flag-chips",children:l.flags.map(m=>v("span",{class:"flag-chip",style:{borderColor:Yi[m]},children:[v(Ae,{color:Yi[m],size:6})," ",Ro[m]]},m))}),(i?.banners??[]).map(m=>v("div",{class:`banner${/conflict/i.test(m)?" banner-red":""}`,children:m},m)),i?.summary&&v("p",{class:"insp-desc",children:ih(i.summary)}),!i&&v("div",{class:"empty small",children:"Reading the note…"}),i?.partial&&v("div",{class:"hint",children:"This exported file has no claim text."}),(i?.claims?.length??0)>0&&v(Ne,{children:[v("div",{class:"section-title",children:["Facts ",v("span",{class:"section-count",children:i.claims.length})]}),v("ul",{class:"claims",children:i.claims.map((m,p)=>v("li",{class:`claim claim-${m.status}${m.taint==="true"||m.taint==="unknown"?" claim-unverified":""}`,children:ih(m.text)},m.id??p))})]}),d.size>0&&v("div",{class:"section-title",children:["Relations ",v("span",{class:"section-count",children:c.length})]}),[...d].map(([m,p])=>v("div",{class:"rel-group",children:[v("div",{class:"rel-label",style:{color:kn[Ty[m]]},children:nh[m]}),p.slice(0,12).map(y=>v("button",{class:"row",onClick:()=>n.openNote(y.id,y.topic),children:[v("span",{class:"row-title",children:y.title}),y.topic&&y.topic!==e&&v("span",{class:"row-meta",children:n.world.topics.find(M=>M.slug===y.topic)?.title??y.topic})]},`${m}${y.id}`)),p.length>12&&v("div",{class:"more",children:["and ",p.length-12," more"]})]},m)),(i?.backlinks?.length??0)>0&&v(Ne,{children:[v("div",{class:"section-title",children:["Linked from ",v("span",{class:"section-count",children:i.backlinks.length})]}),v("div",{class:"rows",children:i.backlinks.slice(0,12).map(m=>{const p=f.get(m.path);return v("button",{class:"row",disabled:!p,onClick:()=>p&&n.openNote(p.id,e),children:[v("span",{class:"row-title",children:m.title}),v("span",{class:"row-meta",children:(nh[m.relation]??m.relation.replace("_"," ")).toLowerCase()})]},m.path+m.relation)})})]}),g&&v("div",{class:"path-row",children:[v("code",{class:"path",children:g}),v("button",{class:"icon-btn",title:"Read the note (P)",onClick:()=>n.store.set({previewOpen:!0}),children:v(be,{name:"read"})}),v("button",{class:"icon-btn",title:"Copy path",onClick:()=>{navigator.clipboard?.writeText(i?.abs_path??g),o(!0),window.setTimeout(()=>o(!1),1200)},children:v(be,{name:"copy"})}),i?.abs_path&&v("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(i.abs_path)}`,children:v(be,{name:"open"})}),s&&v("span",{class:"copied",children:"copied"})]})]})}function Ly({c:n}){const t=Xt(n.store,i=>i.focus),e=t.note&&t.topic?v(Py,{c:n,id:t.note,slug:t.topic}):t.topic?v(Ry,{c:n,slug:t.topic}):t.constellation&&n.world.constellations.length>1?v(Cy,{c:n,id:t.constellation}):null;return v("aside",{class:`panel insp open${e?"":" idle"}`,"aria-label":"Details",children:[v("div",{class:"insp-head",children:[v("span",{children:"Details"}),e&&v("button",{class:"icon-btn",onClick:()=>n.up(),title:"Up one level (Esc)","aria-label":"Up one level",children:v(be,{name:"close"})})]}),v("div",{class:"insp-body",children:e??v("div",{class:"empty small",children:"Click a topic or a star to see its details here."})})]})}const Ze=184;function Dy(n){const t=[[77,107,168],[255,158,41],[255,26,46]],[e,i,r]=n<.5?[t[0],t[1],n*2]:[t[1],t[2],(n-.5)*2];return`rgb(${e.map((s,o)=>Math.round(s+(i[o]-s)*r)).join(",")})`}function Uy({c:n}){const t=us(null),e=Xt(n.store,o=>o.focus),i=Xt(n.store,o=>o.health),r=_n(()=>Na(n.world.topics),[n]);Mi(()=>{const o=t.current,a=n.galaxy;if(!o||!a)return;const l=Math.min(2,window.devicePixelRatio||1);o.width=Ze*l,o.height=Ze*l;const c=o.getContext("2d"),h=a.layout,u=(Ze/2-10)/h.radius,f=(_,m)=>[Ze/2+_*u,Ze/2+m*u],d=()=>{c.setTransform(l,0,0,l,0,0),c.clearRect(0,0,Ze,Ze);for(const C of n.world.constellations){const O=h.constellations.get(C.id),[z,X]=f(O.x,O.z),W=Math.max(4,O.r*u),K=c.createRadialGradient(z,X,0,z,X,W),J=i?"#8a94b0":C.color;K.addColorStop(0,`${J}${i?"30":"55"}`),K.addColorStop(1,`${J}00`),c.fillStyle=K,c.beginPath(),c.arc(z,X,W,0,Math.PI*2),c.fill(),e.constellation===C.id&&!e.topic&&(c.strokeStyle="rgba(220,230,255,0.7)",c.lineWidth=1,c.stroke())}n.world.topics.forEach((C,O)=>{const z=h.topics.get(C.slug),[X,W]=f(z.x,z.z);c.fillStyle=i?Dy(r[O]):C.color,c.globalAlpha=e.topic&&e.topic!==C.slug?.45:.9,c.beginPath(),c.arc(X,W,Math.max(1,Math.min(3.2,z.r*u*.6)),0,Math.PI*2),c.fill(),e.topic===C.slug&&(c.globalAlpha=1,c.strokeStyle="#fff",c.lineWidth=1.2,c.beginPath(),c.arc(X,W,5,0,Math.PI*2),c.stroke())}),c.globalAlpha=1;const _=h.inbox,[m,p]=f(_.x,_.z);c.fillStyle="#ffd88a",c.beginPath(),c.arc(m,p,2.5,0,Math.PI*2),c.fill();const y=a.view(),[M,E]=f(y.pos.x,y.pos.z),[P,S]=f(y.target.x,y.target.z),w=Math.atan2(S-E,P-M),U=Math.min(70,Math.max(16,Math.hypot(P-M,S-E))),T=.42,x=c.createLinearGradient(M,E,M+Math.cos(w)*U,E+Math.sin(w)*U);x.addColorStop(0,"rgba(140,180,255,0.42)"),x.addColorStop(1,"rgba(140,180,255,0)"),c.fillStyle=x,c.beginPath(),c.moveTo(M,E),c.lineTo(M+Math.cos(w-T)*U,E+Math.sin(w-T)*U),c.lineTo(M+Math.cos(w+T)*U,E+Math.sin(w+T)*U),c.closePath(),c.fill(),c.fillStyle="#cfe0ff",c.beginPath(),c.arc(Math.max(4,Math.min(Ze-4,M)),Math.max(4,Math.min(Ze-4,E)),2.6,0,Math.PI*2),c.fill()};d();const g=window.setInterval(d,200);return()=>window.clearInterval(g)},[n.galaxy,e,i]);const s=o=>{const a=n.galaxy,l=t.current;if(!a||!l)return;const c=l.getBoundingClientRect(),h=(Ze/2-10)/a.layout.radius,u=(o.clientX-c.left-Ze/2)/h,f=(o.clientY-c.top-Ze/2)/h;let d=null,g=1/0;for(const _ of n.world.topics){const m=a.layout.topics.get(_.slug),p=Math.hypot(m.x-u,m.z-f)/m.r;p<g&&(g=p,d=_.slug)}d&&n.focus({topic:d})};return v("div",{class:"panel minimap","aria-label":"Minimap",children:[v("canvas",{ref:t,style:{width:`${Ze}px`,height:`${Ze}px`},onClick:s}),v("div",{class:"minimap-label",children:"MAP"})]})}const Ks=(n,t)=>n.localeCompare(t,void 0,{sensitivity:"base",numeric:!0});function oh(n){return(t,e)=>n==="health"?e.flagged/Math.max(1,e.notes)-t.flagged/Math.max(1,t.notes)||e.flagged-t.flagged||Ks(t.title,e.title):n==="recent"?(e.updated??"").localeCompare(t.updated??"")||e.recent-t.recent||Ks(t.title,e.title):n==="size"&&e.notes-t.notes||Ks(t.title,e.title)}function Iy({c:n}){const t=n.world,e=Xt(n.store,d=>d.focus),[i,r]=Rn(""),[s,o]=Rn("name"),[a,l]=Rn({});Mi(()=>{const d=e.constellation;d&&l(g=>d in g?Object.fromEntries(Object.entries(g).filter(([_])=>_!==d)):g)},[e.constellation]);const c=_n(()=>new Map(t.topics.map(d=>[d.slug,d])),[t]),h=Math.max(1,...t.topics.map(d=>d.notes)),u=i.trim().toLowerCase(),f=t.constellations.length===1;return v("div",{class:"atlas",children:[v("div",{class:"nav-tools",children:[v("input",{class:"field",placeholder:"Filter topics",value:i,onInput:d=>r(d.target.value),"aria-label":"Filter topics"}),v("select",{class:"field select",value:s,onChange:d=>o(d.target.value),"aria-label":"Sort topics",children:[v("option",{value:"name",children:"Name"}),v("option",{value:"size",children:"Most notes"}),v("option",{value:"health",children:"Most issues"}),v("option",{value:"recent",children:"Recently changed"})]})]}),v("div",{class:"tree",role:"tree",children:t.constellations.map(d=>{const g=Oy(d.topics.map(y=>c.get(y)).filter(y=>!!y&&(!u||y.title.toLowerCase().includes(u)||y.slug.includes(u))),oh(s)),_=y=>g.reduce((M,{topic:E})=>M+y(E),0),m=g.reduce((y,{topic:M})=>(M.updated??"")>y?M.updated??"":y,"")||null,p={title:Si(d.title),notes:_(y=>y.notes),flagged:_(y=>y.flagged),updated:m,recent:_(y=>y.recent)};return{con:d,topics:g,group:p}}).sort((d,g)=>oh(s)(d.group,g.group)).map(({con:d,topics:g,group:{notes:_,flagged:m}})=>{if(u&&g.length===0)return null;const p=e.constellation===d.id,y=f||!!u||(a[d.id]??p),M=()=>l({...a,[d.id]:!y});return v("div",{class:"tree-group",children:[!f&&v("div",{class:`tree-con${p?" active":""}`,role:"treeitem","aria-expanded":y,children:[v("button",{class:`chev${y?" open":""}`,onClick:M,"aria-label":y?"Collapse":"Expand",title:y?"Collapse":"Expand",children:v(be,{name:"chevron"})}),v("button",{class:"tree-con-main",onClick:()=>{if(p&&y)return M();l({...a,[d.id]:!0}),n.focus({constellation:d.id})},children:[v(Ae,{color:d.color,size:9}),v("span",{class:"tree-title",title:d.title,children:[Si(d.title),d.topics.length>1?v("span",{class:"tree-more",children:[" +",d.topics.length-1]}):null]}),v("span",{class:"tree-meta",children:[d.topics.length," topics · ",Ge(_)," notes",m?v("span",{class:"warn",children:[" · ",m,"⚑"]}):null]})]})]}),y&&v("div",{class:"tree-topics",children:g.map(({topic:E,depth:P})=>v("button",{class:`tree-topic${e.topic===E.slug?" active":""}`,style:P?{paddingLeft:`${8+P*14}px`}:void 0,onClick:()=>n.focus({topic:E.slug}),role:"treeitem","aria-level":P+1,children:[v(Ae,{color:E.color,size:7}),v("span",{class:"tree-title",children:E.title}),E.flagged>0&&v("span",{class:"badge",title:`${E.flagged} flagged notes`,children:E.flagged}),v("span",{class:"tree-count",title:`${Ge(E.notes)} notes`,children:[Ge(E.notes)," notes"]}),v("span",{class:"bar","aria-hidden":"true",children:v("span",{style:{width:`${Math.max(4,E.notes/h*100)}%`,background:E.color}})})]},E.slug))})]},d.id)})})]})}function Oy(n,t){const e=new Set(n.map(a=>a.slug)),i=new Map,r=[];for(const a of n)a.parent&&e.has(a.parent)?i.set(a.parent,[...i.get(a.parent)??[],a]):r.push(a);const s=[],o=(a,l)=>{s.push({topic:a,depth:l});for(const c of(i.get(a.slug)??[]).sort(t))o(c,l+1)};for(const a of r.sort(t))o(a,0);return s}function Fy({c:n}){const t=Xt(n.store,a=>a.healthData),e=Xt(n.store,a=>a.health),[i,r]=Rn("conflict"),s=_n(()=>new Map(n.world.topics.map(a=>[a.slug,a])),[n]);if(!t)return v("div",{class:"empty",children:"Reading health…"});const o=nc.filter(a=>(t.counts[a]??0)>0);return v("div",{class:"health",children:[v("label",{class:"switch-row",children:[v("span",{children:"Highlight issues on the map: color each topic by its share of notes with issues, and ring each of those notes"}),v("input",{type:"checkbox",class:"switch",checked:e,onChange:a=>n.setHealth(a.target.checked)})]}),o.length===0&&v("div",{class:"empty",children:"No issues found."}),o.map(a=>v("div",{class:"flag-group",children:[v("button",{class:"flag-head",onClick:()=>r(i===a?null:a),"aria-expanded":i===a,children:[v("span",{class:`chev${i===a?" open":""}`,children:v(be,{name:"chevron"})}),v(Ae,{color:Yi[a]}),v("span",{class:"tree-title",children:Ro[a]}),v("span",{class:"flag-count",children:Ge(t.counts[a]??0)})]}),i===a&&v("div",{class:"flag-items",children:[(t.items[a]??[]).map(l=>v("button",{class:"flag-item",onClick:()=>n.openNote(l.id,l.topic),children:[v("span",{class:"tree-title",children:l.title}),v("span",{class:"tree-meta",children:l.topic?s.get(l.topic)?.title??l.topic:""})]},l.id)),(t.counts[a]??0)>(t.items[a]?.length??0)&&v("div",{class:"more",children:["and ",Ge((t.counts[a]??0)-(t.items[a]?.length??0))," more"]})]})]},a))]})}const Ny={consolidate:"Merged captures",edit:"Agent edit","lint-fix":"Auto-fix",mv:"Moved",undo:"Undo",import:"Import",review:"Review",rule:"Rule"};function ky({c:n}){const t=Xt(n.store,r=>r.run),e=n.world.runs,i=_n(()=>new Map(n.world.topics.map(r=>[r.slug,r])),[n]);return e.length===0?v("div",{class:"empty",children:"No activity recorded on this device yet."}):v("div",{class:"changes",children:[v("div",{class:"hint",children:"Select an entry to highlight the notes it changed."}),e.map(r=>{const s=Object.entries(r.topics).sort((a,l)=>l[1]-a[1]),o=r.at?new Date(r.at):null;return v("button",{class:`run${t?.id===r.id?" active":""}`,onClick:()=>n.setRun(t?.id===r.id?null:r),children:[v("div",{class:"run-top",children:[v("span",{class:`run-kind kind-${r.kind}`,children:Ny[r.kind]??r.kind}),v("span",{class:"run-when",children:o?o.toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):""})]}),v("div",{class:"run-body",children:[r.episodes>0&&v("span",{children:[r.episodes," session captures · "]}),v("span",{children:[r.touched.length," notes changed"]})]}),s.length>0&&v("div",{class:"run-topics",children:s.slice(0,4).map(([a,l])=>{const c=i.get(a);return v("span",{class:"run-topic",children:[v(Ae,{color:c?.color??"#888",size:6})," ",c?.title??a," ",v("b",{children:l})]},a)})})]},r.id)})]})}function zy({c:n}){const t=Xt(n.store,r=>r.navTab),e=Xt(n.store,r=>r.navOpen),i=n.world.totals.flagged;return v("aside",{class:`panel nav${e?"":" collapsed"}`,"aria-label":"Topics, issues, and activity",children:[v("div",{class:"tabs",role:"tablist",children:[["atlas","health","changes"].map(r=>v("button",{role:"tab","aria-selected":t===r,class:`tab${t===r?" active":""}`,onClick:()=>n.setNav(r),children:[r==="atlas"?"Topics":r==="health"?"Issues":"Activity",r==="health"&&i>0&&v("span",{class:"tab-badge",children:Ge(i)}),r==="changes"&&n.world.runs.length>0&&v("span",{class:"tab-badge dim",children:n.world.runs.length})]},r)),v("button",{class:"icon-btn",onClick:()=>n.store.set({navOpen:!e}),"aria-label":e?"Collapse the panel":"Expand the panel",title:e?"Collapse":"Expand",children:v(be,{name:e?"back":"chevron"})})]}),e&&v("div",{class:"nav-body",children:t==="atlas"?v(Iy,{c:n}):t==="health"?v(Fy,{c:n}):v(ky,{c:n})})]})}function By({c:n}){const[t,e]=Rn(""),[i,r]=Rn([]),[s,o]=Rn(!1),[a,l]=Rn(0),c=us(null),h=_n(()=>new Map(n.world.topics.map(_=>[_.slug,_])),[n]);Mi(()=>c.current?.focus(),[]),Mi(()=>{const _=t.trim();if(!_){r([]);return}o(!0);const m=window.setTimeout(()=>{n.search(_).then(p=>r(p)).catch(()=>r([])).finally(()=>o(!1))},140);return()=>window.clearTimeout(m)},[t]);const u=()=>n.store.set({paletteOpen:!1}),f=t.trim().toLowerCase(),d=[];if(f){for(const _ of n.world.constellations)n.world.constellations.length>1&&_.title.toLowerCase().includes(f)&&d.push({key:`c:${_.id}`,kind:"constellation",title:_.title,sub:`${_.topics.length} topics`,color:_.color,run:()=>n.focus({constellation:_.id})});for(const _ of n.world.topics)if((_.title.toLowerCase().includes(f)||_.slug.includes(f))&&d.push({key:`t:${_.slug}`,kind:"topic",title:_.title,sub:`${_.notes} notes`,color:_.color,run:()=>n.focus({topic:_.slug})}),d.length>8)break;for(const _ of i){const m=_.topic?h.get(_.topic):void 0;d.push({key:`n:${_.id}`,kind:"note",title:_.title,sub:[m?.title,_.snippet].filter(Boolean).join(" · "),color:m?.color??"#8892b0",run:()=>n.openNote(_.id,_.topic)})}}else for(const _ of[...n.world.topics].sort((m,p)=>p.notes-m.notes).slice(0,8))d.push({key:`t:${_.slug}`,kind:"topic",title:_.title,sub:`${_.notes} notes`,color:_.color,run:()=>n.focus({topic:_.slug})});const g=_=>{const m=d[_];m&&(u(),m.run())};return v("div",{class:"palette-scrim",onClick:_=>_.target===_.currentTarget&&u(),children:v("div",{class:"palette panel",role:"dialog","aria-label":"Search notes and topics",children:[v("div",{class:"palette-input",children:[v(be,{name:"search"}),v("input",{ref:c,value:t,placeholder:"Search notes and topics…","aria-label":"Search",onInput:_=>{e(_.target.value),l(0)},onKeyDown:_=>{_.key==="ArrowDown"?(_.preventDefault(),l(Math.min(d.length-1,a+1))):_.key==="ArrowUp"?(_.preventDefault(),l(Math.max(0,a-1))):_.key==="Enter"?(_.preventDefault(),g(a)):_.key==="Escape"&&(_.preventDefault(),u())}}),s&&v("span",{class:"spinner"}),v(Wi,{children:"esc"})]}),v("div",{class:"palette-results",role:"listbox",children:[!f&&v("div",{class:"palette-section",children:"Largest topics"}),d.map((_,m)=>v("button",{role:"option","aria-selected":m===a,class:`palette-item${m===a?" sel":""}`,onMouseEnter:()=>l(m),onClick:()=>g(m),children:[v(Ae,{color:_.color,size:8}),v("span",{class:`palette-kind kind-${_.kind}`,children:_.kind==="constellation"?"group":_.kind}),v("span",{class:"palette-title",children:_.title}),v("span",{class:"palette-sub",children:_.sub})]},_.key)),f&&!s&&d.length===0&&v("div",{class:"empty",children:["Nothing matches “",t,"”."]})]})]})})}const Hy={};function Vy(n,t){const e=Hy,i=typeof e.includeImageAlt=="boolean"?e.includeImageAlt:!0,r=typeof e.includeHtml=="boolean"?e.includeHtml:!0;return Ud(n,i,r)}function Ud(n,t,e){if(Gy(n)){if("value"in n)return n.type==="html"&&!e?"":n.value;if(t&&"alt"in n&&n.alt)return n.alt;if("children"in n)return ah(n.children,t,e)}return Array.isArray(n)?ah(n,t,e):""}function ah(n,t,e){const i=[];let r=-1;for(;++r<n.length;)i[r]=Ud(n[r],t,e);return i.join("")}function Gy(n){return!!(n&&typeof n=="object")}const lh=document.createElement("i");function rc(n){const t="&"+n+";";lh.innerHTML=t;const e=lh.textContent;return e.charCodeAt(e.length-1)===59&&n!=="semi"||e===t?!1:e}function on(n,t,e,i){const r=n.length;let s=0,o;if(t<0?t=-t>r?0:r+t:t=t>r?r:t,e=e>0?e:0,i.length<1e4)o=Array.from(i),o.unshift(t,e),n.splice(...o);else for(e&&n.splice(t,e);s<i.length;)o=i.slice(s,s+1e4),o.unshift(t,0),n.splice(...o),s+=1e4,t+=1e4}function mn(n,t){return n.length>0?(on(n,n.length,0,t),n):t}const ch={}.hasOwnProperty;function Id(n){const t={};let e=-1;for(;++e<n.length;)Wy(t,n[e]);return t}function Wy(n,t){let e;for(e in t){const r=(ch.call(n,e)?n[e]:void 0)||(n[e]={}),s=t[e];let o;if(s)for(o in s){ch.call(r,o)||(r[o]=[]);const a=s[o];Xy(r[o],Array.isArray(a)?a:a?[a]:[])}}}function Xy(n,t){let e=-1;const i=[];for(;++e<t.length;)(t[e].add==="after"?n:i).push(t[e]);on(n,0,0,i)}function Od(n,t){const e=Number.parseInt(n,t);return e<9||e===11||e>13&&e<32||e>126&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?"�":String.fromCodePoint(e)}function Ln(n){return n.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const We=bi(/[A-Za-z]/),Qe=bi(/[\dA-Za-z]/),qy=bi(/[#-'*+\--9=?A-Z^-~]/);function So(n){return n!==null&&(n<32||n===127)}const Ll=bi(/\d/),Yy=bi(/[\dA-Fa-f]/),$y=bi(/[!-/:-@[-`{-~]/);function Lt(n){return n!==null&&n<-2}function de(n){return n!==null&&(n<0||n===32)}function qt(n){return n===-2||n===-1||n===32}const Po=bi(/\p{P}|\p{S}/u),$i=bi(/\s/);function bi(n){return t;function t(e){return e!==null&&e>-1&&n.test(String.fromCharCode(e))}}function Kt(n,t,e,i){const r=i?i-1:Number.POSITIVE_INFINITY;let s=0;return o;function o(l){return qt(l)?(n.enter(e),a(l)):t(l)}function a(l){return qt(l)&&s++<r?(n.consume(l),a):(n.exit(e),t(l))}}const Zy={tokenize:jy};function jy(n){const t=n.attempt(this.parser.constructs.contentInitial,i,r);let e;return t;function i(a){if(a===null){n.consume(a);return}return n.enter("lineEnding"),n.consume(a),n.exit("lineEnding"),Kt(n,t,"linePrefix")}function r(a){return n.enter("paragraph"),s(a)}function s(a){const l=n.enter("chunkText",{contentType:"text",previous:e});return e&&(e.next=l),e=l,o(a)}function o(a){if(a===null){n.exit("chunkText"),n.exit("paragraph"),n.consume(a);return}return Lt(a)?(n.consume(a),n.exit("chunkText"),s):(n.consume(a),o)}}const Ky={tokenize:Qy},uh={tokenize:Jy};function Qy(n){const t=this,e=[];let i=0,r,s,o;return a;function a(M){if(i<e.length){const E=e[i];return t.containerState=E[1],n.attempt(E[0].continuation,l,c)(M)}return c(M)}function l(M){if(i++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,r&&y();const E=t.events.length;let P=E,S;for(;P--;)if(t.events[P][0]==="exit"&&t.events[P][1].type==="chunkFlow"){S=t.events[P][1].end;break}p(i);let w=E;for(;w<t.events.length;)t.events[w][1].end={...S},w++;return on(t.events,P+1,0,t.events.slice(E)),t.events.length=w,c(M)}return a(M)}function c(M){if(i===e.length){if(!r)return f(M);if(r.currentConstruct&&r.currentConstruct.concrete)return g(M);t.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return t.containerState={},n.check(uh,h,u)(M)}function h(M){return r&&y(),p(i),f(M)}function u(M){return t.parser.lazy[t.now().line]=i!==e.length,o=t.now().offset,g(M)}function f(M){return t.containerState={},n.attempt(uh,d,g)(M)}function d(M){return i++,e.push([t.currentConstruct,t.containerState]),f(M)}function g(M){if(M===null){r&&y(),p(0),n.consume(M);return}return r=r||t.parser.flow(t.now()),n.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:s}),_(M)}function _(M){if(M===null){m(n.exit("chunkFlow"),!0),p(0),n.consume(M);return}return Lt(M)?(n.consume(M),m(n.exit("chunkFlow")),i=0,t.interrupt=void 0,a):(n.consume(M),_)}function m(M,E){const P=t.sliceStream(M);if(E&&P.push(null),M.previous=s,s&&(s.next=M),s=M,r.defineSkip(M.start),r.write(P),t.parser.lazy[M.start.line]){let S=r.events.length;for(;S--;)if(r.events[S][1].start.offset<o&&(!r.events[S][1].end||r.events[S][1].end.offset>o))return;const w=t.events.length;let U=w,T,x;for(;U--;)if(t.events[U][0]==="exit"&&t.events[U][1].type==="chunkFlow"){if(T){x=t.events[U][1].end;break}T=!0}for(p(i),S=w;S<t.events.length;)t.events[S][1].end={...x},S++;on(t.events,U+1,0,t.events.slice(w)),t.events.length=S}}function p(M){let E=e.length;for(;E-- >M;){const P=e[E];t.containerState=P[1],P[0].exit.call(t,n)}e.length=M}function y(){r.write([null]),s=void 0,r=void 0,t.containerState._closeFlow=void 0}}function Jy(n,t,e){return Kt(n,n.attempt(this.parser.constructs.document,t,e),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Mo(n){if(n===null||de(n)||$i(n))return 1;if(Po(n))return 2}function Lo(n,t,e){const i=[];let r=-1;for(;++r<n.length;){const s=n[r].resolveAll;s&&!i.includes(s)&&(t=s(t,e),i.push(s))}return t}const Dl={name:"attention",resolveAll:tS,tokenize:eS};function tS(n,t){let e=-1,i,r,s,o,a,l,c,h;for(;++e<n.length;)if(n[e][0]==="enter"&&n[e][1].type==="attentionSequence"&&n[e][1]._close){for(i=e;i--;)if(n[i][0]==="exit"&&n[i][1].type==="attentionSequence"&&n[i][1]._open&&t.sliceSerialize(n[i][1]).charCodeAt(0)===t.sliceSerialize(n[e][1]).charCodeAt(0)){if((n[i][1]._close||n[e][1]._open)&&(n[e][1].end.offset-n[e][1].start.offset)%3&&!((n[i][1].end.offset-n[i][1].start.offset+n[e][1].end.offset-n[e][1].start.offset)%3))continue;l=n[i][1].end.offset-n[i][1].start.offset>1&&n[e][1].end.offset-n[e][1].start.offset>1?2:1;const u={...n[i][1].end},f={...n[e][1].start};hh(u,-l),hh(f,l),o={type:l>1?"strongSequence":"emphasisSequence",start:u,end:{...n[i][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...n[e][1].start},end:f},s={type:l>1?"strongText":"emphasisText",start:{...n[i][1].end},end:{...n[e][1].start}},r={type:l>1?"strong":"emphasis",start:{...o.start},end:{...a.end}},n[i][1].end={...o.start},n[e][1].start={...a.end},c=[],n[i][1].end.offset-n[i][1].start.offset&&(c=mn(c,[["enter",n[i][1],t],["exit",n[i][1],t]])),c=mn(c,[["enter",r,t],["enter",o,t],["exit",o,t],["enter",s,t]]),c=mn(c,Lo(t.parser.constructs.insideSpan.null,n.slice(i+1,e),t)),c=mn(c,[["exit",s,t],["enter",a,t],["exit",a,t],["exit",r,t]]),n[e][1].end.offset-n[e][1].start.offset?(h=2,c=mn(c,[["enter",n[e][1],t],["exit",n[e][1],t]])):h=0,on(n,i-1,e-i+3,c),e=i+c.length-h-2;break}}for(e=-1;++e<n.length;)n[e][1].type==="attentionSequence"&&(n[e][1].type="data");return n}function eS(n,t){const e=this.parser.constructs.attentionMarkers.null,i=this.previous,r=Mo(i);let s;return o;function o(l){return s=l,n.enter("attentionSequence"),a(l)}function a(l){if(l===s)return n.consume(l),a;const c=n.exit("attentionSequence"),h=Mo(l),u=!h||h===2&&r||e.includes(l),f=!r||r===2&&h||e.includes(i);return c._open=!!(s===42?u:u&&(r||!f)),c._close=!!(s===42?f:f&&(h||!u)),t(l)}}function hh(n,t){n.column+=t,n.offset+=t,n._bufferIndex+=t}const nS={name:"autolink",tokenize:iS};function iS(n,t,e){let i=0;return r;function r(d){return n.enter("autolink"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.enter("autolinkProtocol"),s}function s(d){return We(d)?(n.consume(d),o):d===64?e(d):c(d)}function o(d){return d===43||d===45||d===46||Qe(d)?(i=1,a(d)):c(d)}function a(d){return d===58?(n.consume(d),i=0,l):(d===43||d===45||d===46||Qe(d))&&i++<32?(n.consume(d),a):(i=0,c(d))}function l(d){return d===62?(n.exit("autolinkProtocol"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),t):d===null||d===32||d===60||So(d)?e(d):(n.consume(d),l)}function c(d){return d===64?(n.consume(d),h):qy(d)?(n.consume(d),c):e(d)}function h(d){return Qe(d)?u(d):e(d)}function u(d){return d===46?(n.consume(d),i=0,h):d===62?(n.exit("autolinkProtocol").type="autolinkEmail",n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),t):f(d)}function f(d){if((d===45||Qe(d))&&i++<63){const g=d===45?f:u;return n.consume(d),g}return e(d)}}const hs={partial:!0,tokenize:rS};function rS(n,t,e){return i;function i(s){return qt(s)?Kt(n,r,"linePrefix")(s):r(s)}function r(s){return s===null||Lt(s)?t(s):e(s)}}const Fd={continuation:{tokenize:oS},exit:aS,name:"blockQuote",tokenize:sS};function sS(n,t,e){const i=this;return r;function r(o){if(o===62){const a=i.containerState;return a.open||(n.enter("blockQuote",{_container:!0}),a.open=!0),n.enter("blockQuotePrefix"),n.enter("blockQuoteMarker"),n.consume(o),n.exit("blockQuoteMarker"),s}return e(o)}function s(o){return qt(o)?(n.enter("blockQuotePrefixWhitespace"),n.consume(o),n.exit("blockQuotePrefixWhitespace"),n.exit("blockQuotePrefix"),t):(n.exit("blockQuotePrefix"),t(o))}}function oS(n,t,e){const i=this;return r;function r(o){return qt(o)?Kt(n,s,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):s(o)}function s(o){return n.attempt(Fd,t,e)(o)}}function aS(n){n.exit("blockQuote")}const Nd={name:"characterEscape",tokenize:lS};function lS(n,t,e){return i;function i(s){return n.enter("characterEscape"),n.enter("escapeMarker"),n.consume(s),n.exit("escapeMarker"),r}function r(s){return $y(s)?(n.enter("characterEscapeValue"),n.consume(s),n.exit("characterEscapeValue"),n.exit("characterEscape"),t):e(s)}}const kd={name:"characterReference",tokenize:cS};function cS(n,t,e){const i=this;let r=0,s,o;return a;function a(u){return n.enter("characterReference"),n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),l}function l(u){return u===35?(n.enter("characterReferenceMarkerNumeric"),n.consume(u),n.exit("characterReferenceMarkerNumeric"),c):(n.enter("characterReferenceValue"),s=31,o=Qe,h(u))}function c(u){return u===88||u===120?(n.enter("characterReferenceMarkerHexadecimal"),n.consume(u),n.exit("characterReferenceMarkerHexadecimal"),n.enter("characterReferenceValue"),s=6,o=Yy,h):(n.enter("characterReferenceValue"),s=7,o=Ll,h(u))}function h(u){if(u===59&&r){const f=n.exit("characterReferenceValue");return o===Qe&&!rc(i.sliceSerialize(f))?e(u):(n.enter("characterReferenceMarker"),n.consume(u),n.exit("characterReferenceMarker"),n.exit("characterReference"),t)}return o(u)&&r++<s?(n.consume(u),h):e(u)}}const dh={partial:!0,tokenize:hS},fh={concrete:!0,name:"codeFenced",tokenize:uS};function uS(n,t,e){const i=this,r={partial:!0,tokenize:P};let s=0,o=0,a;return l;function l(S){return c(S)}function c(S){const w=i.events[i.events.length-1];return s=w&&w[1].type==="linePrefix"?w[2].sliceSerialize(w[1],!0).length:0,a=S,n.enter("codeFenced"),n.enter("codeFencedFence"),n.enter("codeFencedFenceSequence"),h(S)}function h(S){return S===a?(o++,n.consume(S),h):o<3?e(S):(n.exit("codeFencedFenceSequence"),qt(S)?Kt(n,u,"whitespace")(S):u(S))}function u(S){return S===null||Lt(S)?(n.exit("codeFencedFence"),i.interrupt?t(S):n.check(dh,_,E)(S)):(n.enter("codeFencedFenceInfo"),n.enter("chunkString",{contentType:"string"}),f(S))}function f(S){return S===null||Lt(S)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),u(S)):qt(S)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),Kt(n,d,"whitespace")(S)):S===96&&S===a?e(S):(n.consume(S),f)}function d(S){return S===null||Lt(S)?u(S):(n.enter("codeFencedFenceMeta"),n.enter("chunkString",{contentType:"string"}),g(S))}function g(S){return S===null||Lt(S)?(n.exit("chunkString"),n.exit("codeFencedFenceMeta"),u(S)):S===96&&S===a?e(S):(n.consume(S),g)}function _(S){return n.attempt(r,E,m)(S)}function m(S){return n.enter("lineEnding"),n.consume(S),n.exit("lineEnding"),p}function p(S){return s>0&&qt(S)?Kt(n,y,"linePrefix",s+1)(S):y(S)}function y(S){return S===null||Lt(S)?n.check(dh,_,E)(S):(n.enter("codeFlowValue"),M(S))}function M(S){return S===null||Lt(S)?(n.exit("codeFlowValue"),y(S)):(n.consume(S),M)}function E(S){return n.exit("codeFenced"),t(S)}function P(S,w,U){let T=0;return x;function x(W){return S.enter("lineEnding"),S.consume(W),S.exit("lineEnding"),C}function C(W){return S.enter("codeFencedFence"),qt(W)?Kt(S,O,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(W):O(W)}function O(W){return W===a?(S.enter("codeFencedFenceSequence"),z(W)):U(W)}function z(W){return W===a?(T++,S.consume(W),z):T>=o?(S.exit("codeFencedFenceSequence"),qt(W)?Kt(S,X,"whitespace")(W):X(W)):U(W)}function X(W){return W===null||Lt(W)?(S.exit("codeFencedFence"),w(W)):U(W)}}}function hS(n,t,e){const i=this;return r;function r(o){return o===null?e(o):(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}const Pa={name:"codeIndented",tokenize:fS},dS={partial:!0,tokenize:pS};function fS(n,t,e){const i=this;return r;function r(c){return n.enter("codeIndented"),Kt(n,s,"linePrefix",5)(c)}function s(c){const h=i.events[i.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?o(c):e(c)}function o(c){return c===null?l(c):Lt(c)?n.attempt(dS,o,l)(c):(n.enter("codeFlowValue"),a(c))}function a(c){return c===null||Lt(c)?(n.exit("codeFlowValue"),o(c)):(n.consume(c),a)}function l(c){return n.exit("codeIndented"),t(c)}}function pS(n,t,e){const i=this;return r;function r(o){return i.parser.lazy[i.now().line]?e(o):Lt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),r):Kt(n,s,"linePrefix",5)(o)}function s(o){const a=i.events[i.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):Lt(o)?r(o):e(o)}}const mS={name:"codeText",previous:_S,resolve:gS,tokenize:vS};function gS(n){let t=n.length-4,e=3,i,r;if((n[e][1].type==="lineEnding"||n[e][1].type==="space")&&(n[t][1].type==="lineEnding"||n[t][1].type==="space")){for(i=e;++i<t;)if(n[i][1].type==="codeTextData"){n[e][1].type="codeTextPadding",n[t][1].type="codeTextPadding",e+=2,t-=2;break}}for(i=e-1,t++;++i<=t;)r===void 0?i!==t&&n[i][1].type!=="lineEnding"&&(r=i):(i===t||n[i][1].type==="lineEnding")&&(n[r][1].type="codeTextData",i!==r+2&&(n[r][1].end=n[i-1][1].end,n.splice(r+2,i-r-2),t-=i-r-2,i=r+2),r=void 0);return n}function _S(n){return n!==96||this.events[this.events.length-1][1].type==="characterEscape"}function vS(n,t,e){let i=0,r,s;return o;function o(u){return n.enter("codeText"),n.enter("codeTextSequence"),a(u)}function a(u){return u===96?(n.consume(u),i++,a):(n.exit("codeTextSequence"),l(u))}function l(u){return u===null?e(u):u===32?(n.enter("space"),n.consume(u),n.exit("space"),l):u===96?(s=n.enter("codeTextSequence"),r=0,h(u)):Lt(u)?(n.enter("lineEnding"),n.consume(u),n.exit("lineEnding"),l):(n.enter("codeTextData"),c(u))}function c(u){return u===null||u===32||u===96||Lt(u)?(n.exit("codeTextData"),l(u)):(n.consume(u),c)}function h(u){return u===96?(n.consume(u),r++,h):r===i?(n.exit("codeTextSequence"),n.exit("codeText"),t(u)):(s.type="codeTextData",c(u))}}class xS{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,e){const i=e??Number.POSITIVE_INFINITY;return i<this.left.length?this.left.slice(t,i):t>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(t,e,i){const r=e||0;this.setCursor(Math.trunc(t));const s=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return i&&Xr(this.left,i),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Xr(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Xr(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const e=this.left.splice(t,Number.POSITIVE_INFINITY);Xr(this.right,e.reverse())}else{const e=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Xr(this.left,e.reverse())}}}function Xr(n,t){let e=0;if(t.length<1e4)n.push(...t);else for(;e<t.length;)n.push(...t.slice(e,e+1e4)),e+=1e4}function zd(n){const t={};let e=-1,i,r,s,o,a,l,c;const h=new xS(n);for(;++e<h.length;){for(;e in t;)e=t[e];if(i=h.get(e),e&&i[1].type==="chunkFlow"&&h.get(e-1)[1].type==="listItemPrefix"&&(l=i[1]._tokenizer.events,s=0,s<l.length&&l[s][1].type==="lineEndingBlank"&&(s+=2),s<l.length&&l[s][1].type==="content"))for(;++s<l.length&&l[s][1].type!=="content";)l[s][1].type==="chunkText"&&(l[s][1]._isInFirstContentOfListItem=!0,s++);if(i[0]==="enter")i[1].contentType&&(Object.assign(t,yS(h,e)),e=t[e],c=!0);else if(i[1]._container){for(s=e,r=void 0;s--;)if(o=h.get(s),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(r&&(h.get(r)[1].type="lineEndingBlank"),o[1].type="lineEnding",r=s);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;r&&(i[1].end={...h.get(r)[1].start},a=h.slice(r,e),a.unshift(i),h.splice(r,e-r+1,a))}}return on(n,0,Number.POSITIVE_INFINITY,h.slice(0)),!c}function yS(n,t){const e=n.get(t)[1],i=n.get(t)[2];let r=t-1;const s=[];let o=e._tokenizer;o||(o=i.parser[e.contentType](e.start),e._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const a=o.events,l=[],c={};let h,u,f=-1,d=e,g=0,_=0;const m=[_];for(;d;){for(;n.get(++r)[1]!==d;);s.push(r),d._tokenizer||(h=i.sliceStream(d),d.next||h.push(null),u&&o.defineSkip(d.start),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(h),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),u=d,d=d.next}for(d=e;++f<a.length;)a[f][0]==="exit"&&a[f-1][0]==="enter"&&a[f][1].type===a[f-1][1].type&&a[f][1].start.line!==a[f][1].end.line&&(_=f+1,m.push(_),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(o.events=[],d?(d._tokenizer=void 0,d.previous=void 0):m.pop(),f=m.length;f--;){const p=a.slice(m[f],m[f+1]),y=s.pop();l.push([y,y+p.length-1]),n.splice(y,2,p)}for(l.reverse(),f=-1;++f<l.length;)c[g+l[f][0]]=g+l[f][1],g+=l[f][1]-l[f][0]-1;return c}const SS={resolve:ES,tokenize:bS},MS={partial:!0,tokenize:TS};function ES(n){return zd(n),n}function bS(n,t){let e;return i;function i(a){return n.enter("content"),e=n.enter("chunkContent",{contentType:"content"}),r(a)}function r(a){return a===null?s(a):Lt(a)?n.check(MS,o,s)(a):(n.consume(a),r)}function s(a){return n.exit("chunkContent"),n.exit("content"),t(a)}function o(a){return n.consume(a),n.exit("chunkContent"),e.next=n.enter("chunkContent",{contentType:"content",previous:e}),e=e.next,r}}function TS(n,t,e){const i=this;return r;function r(o){return n.exit("chunkContent"),n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),Kt(n,s,"linePrefix")}function s(o){if(o===null||Lt(o))return e(o);const a=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):n.interrupt(i.parser.constructs.flow,e,t)(o)}}function Bd(n,t,e,i,r,s,o,a,l){const c=l||Number.POSITIVE_INFINITY;let h=0;return u;function u(p){return p===60?(n.enter(i),n.enter(r),n.enter(s),n.consume(p),n.exit(s),f):p===null||p===32||p===41||So(p)?e(p):(n.enter(i),n.enter(o),n.enter(a),n.enter("chunkString",{contentType:"string"}),_(p))}function f(p){return p===62?(n.enter(s),n.consume(p),n.exit(s),n.exit(r),n.exit(i),t):(n.enter(a),n.enter("chunkString",{contentType:"string"}),d(p))}function d(p){return p===62?(n.exit("chunkString"),n.exit(a),f(p)):p===null||p===60||Lt(p)?e(p):(n.consume(p),p===92?g:d)}function g(p){return p===60||p===62||p===92?(n.consume(p),d):d(p)}function _(p){return!h&&(p===null||p===41||de(p))?(n.exit("chunkString"),n.exit(a),n.exit(o),n.exit(i),t(p)):h<c&&p===40?(n.consume(p),h++,_):p===41?(n.consume(p),h--,_):p===null||p===32||p===40||So(p)?e(p):(n.consume(p),p===92?m:_)}function m(p){return p===40||p===41||p===92?(n.consume(p),_):_(p)}}function Hd(n,t,e,i,r,s){const o=this;let a=0,l;return c;function c(d){return n.enter(i),n.enter(r),n.consume(d),n.exit(r),n.enter(s),h}function h(d){return a>999||d===null||d===91||d===93&&!l||d===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?e(d):d===93?(n.exit(s),n.enter(r),n.consume(d),n.exit(r),n.exit(i),t):Lt(d)?(n.enter("lineEnding"),n.consume(d),n.exit("lineEnding"),h):(n.enter("chunkString",{contentType:"string"}),u(d))}function u(d){return d===null||d===91||d===93||Lt(d)||a++>999?(n.exit("chunkString"),h(d)):(n.consume(d),l||(l=!qt(d)),d===92?f:u)}function f(d){return d===91||d===92||d===93?(n.consume(d),a++,u):u(d)}}function Vd(n,t,e,i,r,s){let o;return a;function a(f){return f===34||f===39||f===40?(n.enter(i),n.enter(r),n.consume(f),n.exit(r),o=f===40?41:f,l):e(f)}function l(f){return f===o?(n.enter(r),n.consume(f),n.exit(r),n.exit(i),t):(n.enter(s),c(f))}function c(f){return f===o?(n.exit(s),l(o)):f===null?e(f):Lt(f)?(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),Kt(n,c,"linePrefix")):(n.enter("chunkString",{contentType:"string"}),h(f))}function h(f){return f===o||f===null||Lt(f)?(n.exit("chunkString"),c(f)):(n.consume(f),f===92?u:h)}function u(f){return f===o||f===92?(n.consume(f),h):h(f)}}function Qr(n,t){let e;return i;function i(r){return Lt(r)?(n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),e=!0,i):qt(r)?Kt(n,i,e?"linePrefix":"lineSuffix")(r):t(r)}}const wS={name:"definition",tokenize:CS},AS={partial:!0,tokenize:RS};function CS(n,t,e){const i=this;let r;return s;function s(d){return n.enter("definition"),o(d)}function o(d){return Hd.call(i,n,a,e,"definitionLabel","definitionLabelMarker","definitionLabelString")(d)}function a(d){return r=Ln(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),d===58?(n.enter("definitionMarker"),n.consume(d),n.exit("definitionMarker"),l):e(d)}function l(d){return de(d)?Qr(n,c)(d):c(d)}function c(d){return Bd(n,h,e,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(d)}function h(d){return n.attempt(AS,u,u)(d)}function u(d){return qt(d)?Kt(n,f,"whitespace")(d):f(d)}function f(d){return d===null||Lt(d)?(n.exit("definition"),i.parser.defined.push(r),t(d)):e(d)}}function RS(n,t,e){return i;function i(a){return de(a)?Qr(n,r)(a):e(a)}function r(a){return Vd(n,s,e,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function s(a){return qt(a)?Kt(n,o,"whitespace")(a):o(a)}function o(a){return a===null||Lt(a)?t(a):e(a)}}const PS={name:"hardBreakEscape",tokenize:LS};function LS(n,t,e){return i;function i(s){return n.enter("hardBreakEscape"),n.consume(s),r}function r(s){return Lt(s)?(n.exit("hardBreakEscape"),t(s)):e(s)}}const DS={name:"headingAtx",resolve:US,tokenize:IS};function US(n,t){let e=n.length-2,i=3,r,s;return n[i][1].type==="whitespace"&&(i+=2),e-2>i&&n[e][1].type==="whitespace"&&(e-=2),n[e][1].type==="atxHeadingSequence"&&(i===e-1||e-4>i&&n[e-2][1].type==="whitespace")&&(e-=i+1===e?2:4),e>i&&(r={type:"atxHeadingText",start:n[i][1].start,end:n[e][1].end},s={type:"chunkText",start:n[i][1].start,end:n[e][1].end,contentType:"text"},on(n,i,e-i+1,[["enter",r,t],["enter",s,t],["exit",s,t],["exit",r,t]])),n}function IS(n,t,e){let i=0;return r;function r(h){return n.enter("atxHeading"),s(h)}function s(h){return n.enter("atxHeadingSequence"),o(h)}function o(h){return h===35&&i++<6?(n.consume(h),o):h===null||de(h)?(n.exit("atxHeadingSequence"),a(h)):e(h)}function a(h){return h===35?(n.enter("atxHeadingSequence"),l(h)):h===null||Lt(h)?(n.exit("atxHeading"),t(h)):qt(h)?Kt(n,a,"whitespace")(h):(n.enter("atxHeadingText"),c(h))}function l(h){return h===35?(n.consume(h),l):(n.exit("atxHeadingSequence"),a(h))}function c(h){return h===null||h===35||de(h)?(n.exit("atxHeadingText"),a(h)):(n.consume(h),c)}}const OS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],ph=["pre","script","style","textarea"],FS={concrete:!0,name:"htmlFlow",resolveTo:zS,tokenize:BS},NS={partial:!0,tokenize:VS},kS={partial:!0,tokenize:HS};function zS(n){let t=n.length;for(;t--&&!(n[t][0]==="enter"&&n[t][1].type==="htmlFlow"););return t>1&&n[t-2][1].type==="linePrefix"&&(n[t][1].start=n[t-2][1].start,n[t+1][1].start=n[t-2][1].start,n.splice(t-2,2)),n}function BS(n,t,e){const i=this;let r,s,o,a,l;return c;function c(I){return h(I)}function h(I){return n.enter("htmlFlow"),n.enter("htmlFlowData"),n.consume(I),u}function u(I){return I===33?(n.consume(I),f):I===47?(n.consume(I),s=!0,_):I===63?(n.consume(I),r=3,i.interrupt?t:R):We(I)?(n.consume(I),o=String.fromCharCode(I),m):e(I)}function f(I){return I===45?(n.consume(I),r=2,d):I===91?(n.consume(I),r=5,a=0,g):We(I)?(n.consume(I),r=4,i.interrupt?t:R):e(I)}function d(I){return I===45?(n.consume(I),i.interrupt?t:R):e(I)}function g(I){const Q="CDATA[";return I===Q.charCodeAt(a++)?(n.consume(I),a===Q.length?i.interrupt?t:O:g):e(I)}function _(I){return We(I)?(n.consume(I),o=String.fromCharCode(I),m):e(I)}function m(I){if(I===null||I===47||I===62||de(I)){const Q=I===47,lt=o.toLowerCase();return!Q&&!s&&ph.includes(lt)?(r=1,i.interrupt?t(I):O(I)):OS.includes(o.toLowerCase())?(r=6,Q?(n.consume(I),p):i.interrupt?t(I):O(I)):(r=7,i.interrupt&&!i.parser.lazy[i.now().line]?e(I):s?y(I):M(I))}return I===45||Qe(I)?(n.consume(I),o+=String.fromCharCode(I),m):e(I)}function p(I){return I===62?(n.consume(I),i.interrupt?t:O):e(I)}function y(I){return qt(I)?(n.consume(I),y):x(I)}function M(I){return I===47?(n.consume(I),x):I===58||I===95||We(I)?(n.consume(I),E):qt(I)?(n.consume(I),M):x(I)}function E(I){return I===45||I===46||I===58||I===95||Qe(I)?(n.consume(I),E):P(I)}function P(I){return I===61?(n.consume(I),S):qt(I)?(n.consume(I),P):M(I)}function S(I){return I===null||I===60||I===61||I===62||I===96?e(I):I===34||I===39?(n.consume(I),l=I,w):qt(I)?(n.consume(I),S):U(I)}function w(I){return I===l?(n.consume(I),l=null,T):I===null||Lt(I)?e(I):(n.consume(I),w)}function U(I){return I===null||I===34||I===39||I===47||I===60||I===61||I===62||I===96||de(I)?P(I):(n.consume(I),U)}function T(I){return I===47||I===62||qt(I)?M(I):e(I)}function x(I){return I===62?(n.consume(I),C):e(I)}function C(I){return I===null||Lt(I)?O(I):qt(I)?(n.consume(I),C):e(I)}function O(I){return I===45&&r===2?(n.consume(I),K):I===60&&r===1?(n.consume(I),J):I===62&&r===4?(n.consume(I),_t):I===63&&r===3?(n.consume(I),R):I===93&&r===5?(n.consume(I),at):Lt(I)&&(r===6||r===7)?(n.exit("htmlFlowData"),n.check(NS,Ut,z)(I)):I===null||Lt(I)?(n.exit("htmlFlowData"),z(I)):(n.consume(I),O)}function z(I){return n.check(kS,X,Ut)(I)}function X(I){return n.enter("lineEnding"),n.consume(I),n.exit("lineEnding"),W}function W(I){return I===null||Lt(I)?z(I):(n.enter("htmlFlowData"),O(I))}function K(I){return I===45?(n.consume(I),R):O(I)}function J(I){return I===47?(n.consume(I),o="",Z):O(I)}function Z(I){if(I===62){const Q=o.toLowerCase();return ph.includes(Q)?(n.consume(I),_t):O(I)}return We(I)&&o.length<8?(n.consume(I),o+=String.fromCharCode(I),Z):O(I)}function at(I){return I===93?(n.consume(I),R):O(I)}function R(I){return I===62?(n.consume(I),_t):I===45&&r===2?(n.consume(I),R):O(I)}function _t(I){return I===null||Lt(I)?(n.exit("htmlFlowData"),Ut(I)):(n.consume(I),_t)}function Ut(I){return n.exit("htmlFlow"),t(I)}}function HS(n,t,e){const i=this;return r;function r(o){return Lt(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s):e(o)}function s(o){return i.parser.lazy[i.now().line]?e(o):t(o)}}function VS(n,t,e){return i;function i(r){return n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),n.attempt(hs,t,e)}}const GS={name:"htmlText",tokenize:WS};function WS(n,t,e){const i=this;let r,s,o;return a;function a(R){return n.enter("htmlText"),n.enter("htmlTextData"),n.consume(R),l}function l(R){return R===33?(n.consume(R),c):R===47?(n.consume(R),P):R===63?(n.consume(R),M):We(R)?(n.consume(R),U):e(R)}function c(R){return R===45?(n.consume(R),h):R===91?(n.consume(R),s=0,g):We(R)?(n.consume(R),y):e(R)}function h(R){return R===45?(n.consume(R),d):e(R)}function u(R){return R===null?e(R):R===45?(n.consume(R),f):Lt(R)?(o=u,J(R)):(n.consume(R),u)}function f(R){return R===45?(n.consume(R),d):u(R)}function d(R){return R===62?K(R):R===45?f(R):u(R)}function g(R){const _t="CDATA[";return R===_t.charCodeAt(s++)?(n.consume(R),s===_t.length?_:g):e(R)}function _(R){return R===null?e(R):R===93?(n.consume(R),m):Lt(R)?(o=_,J(R)):(n.consume(R),_)}function m(R){return R===93?(n.consume(R),p):_(R)}function p(R){return R===62?K(R):R===93?(n.consume(R),p):_(R)}function y(R){return R===null||R===62?K(R):Lt(R)?(o=y,J(R)):(n.consume(R),y)}function M(R){return R===null?e(R):R===63?(n.consume(R),E):Lt(R)?(o=M,J(R)):(n.consume(R),M)}function E(R){return R===62?K(R):M(R)}function P(R){return We(R)?(n.consume(R),S):e(R)}function S(R){return R===45||Qe(R)?(n.consume(R),S):w(R)}function w(R){return Lt(R)?(o=w,J(R)):qt(R)?(n.consume(R),w):K(R)}function U(R){return R===45||Qe(R)?(n.consume(R),U):R===47||R===62||de(R)?T(R):e(R)}function T(R){return R===47?(n.consume(R),K):R===58||R===95||We(R)?(n.consume(R),x):Lt(R)?(o=T,J(R)):qt(R)?(n.consume(R),T):K(R)}function x(R){return R===45||R===46||R===58||R===95||Qe(R)?(n.consume(R),x):C(R)}function C(R){return R===61?(n.consume(R),O):Lt(R)?(o=C,J(R)):qt(R)?(n.consume(R),C):T(R)}function O(R){return R===null||R===60||R===61||R===62||R===96?e(R):R===34||R===39?(n.consume(R),r=R,z):Lt(R)?(o=O,J(R)):qt(R)?(n.consume(R),O):(n.consume(R),X)}function z(R){return R===r?(n.consume(R),r=void 0,W):R===null?e(R):Lt(R)?(o=z,J(R)):(n.consume(R),z)}function X(R){return R===null||R===34||R===39||R===60||R===61||R===96?e(R):R===47||R===62||de(R)?T(R):(n.consume(R),X)}function W(R){return R===47||R===62||de(R)?T(R):e(R)}function K(R){return R===62?(n.consume(R),n.exit("htmlTextData"),n.exit("htmlText"),t):e(R)}function J(R){return n.exit("htmlTextData"),n.enter("lineEnding"),n.consume(R),n.exit("lineEnding"),Z}function Z(R){return qt(R)?Kt(n,at,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(R):at(R)}function at(R){return n.enter("htmlTextData"),o(R)}}const sc={name:"labelEnd",resolveAll:$S,resolveTo:ZS,tokenize:jS},XS={tokenize:KS},qS={tokenize:QS},YS={tokenize:JS};function $S(n){let t=-1;const e=[];for(;++t<n.length;){const i=n[t][1];if(e.push(n[t]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){const r=i.type==="labelImage"?4:2;i.type="data",t+=r}}return n.length!==e.length&&on(n,0,n.length,e),n}function ZS(n,t){let e=n.length,i=0,r,s,o,a;for(;e--;)if(r=n[e][1],s){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;n[e][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(o){if(n[e][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(s=e,r.type!=="labelLink")){i=2;break}}else r.type==="labelEnd"&&(o=e);const l={type:n[s][1].type==="labelLink"?"link":"image",start:{...n[s][1].start},end:{...n[n.length-1][1].end}},c={type:"label",start:{...n[s][1].start},end:{...n[o][1].end}},h={type:"labelText",start:{...n[s+i+2][1].end},end:{...n[o-2][1].start}};return a=[["enter",l,t],["enter",c,t]],a=mn(a,n.slice(s+1,s+i+3)),a=mn(a,[["enter",h,t]]),a=mn(a,Lo(t.parser.constructs.insideSpan.null,n.slice(s+i+4,o-3),t)),a=mn(a,[["exit",h,t],n[o-2],n[o-1],["exit",c,t]]),a=mn(a,n.slice(o+1)),a=mn(a,[["exit",l,t]]),on(n,s,n.length,a),n}function jS(n,t,e){const i=this;let r=i.events.length,s,o;for(;r--;)if((i.events[r][1].type==="labelImage"||i.events[r][1].type==="labelLink")&&!i.events[r][1]._balanced){s=i.events[r][1];break}return a;function a(f){return s?s._inactive?u(f):(o=i.parser.defined.includes(Ln(i.sliceSerialize({start:s.end,end:i.now()}))),n.enter("labelEnd"),n.enter("labelMarker"),n.consume(f),n.exit("labelMarker"),n.exit("labelEnd"),l):e(f)}function l(f){return f===40?n.attempt(XS,h,o?h:u)(f):f===91?n.attempt(qS,h,o?c:u)(f):o?h(f):u(f)}function c(f){return n.attempt(YS,h,u)(f)}function h(f){return t(f)}function u(f){return s._balanced=!0,e(f)}}function KS(n,t,e){return i;function i(u){return n.enter("resource"),n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),r}function r(u){return de(u)?Qr(n,s)(u):s(u)}function s(u){return u===41?h(u):Bd(n,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function o(u){return de(u)?Qr(n,l)(u):h(u)}function a(u){return e(u)}function l(u){return u===34||u===39||u===40?Vd(n,c,e,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):h(u)}function c(u){return de(u)?Qr(n,h)(u):h(u)}function h(u){return u===41?(n.enter("resourceMarker"),n.consume(u),n.exit("resourceMarker"),n.exit("resource"),t):e(u)}}function QS(n,t,e){const i=this;return r;function r(a){return Hd.call(i,n,s,o,"reference","referenceMarker","referenceString")(a)}function s(a){return i.parser.defined.includes(Ln(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?t(a):e(a)}function o(a){return e(a)}}function JS(n,t,e){return i;function i(s){return n.enter("reference"),n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),r}function r(s){return s===93?(n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),n.exit("reference"),t):e(s)}}const tM={name:"labelStartImage",resolveAll:sc.resolveAll,tokenize:eM};function eM(n,t,e){const i=this;return r;function r(a){return n.enter("labelImage"),n.enter("labelImageMarker"),n.consume(a),n.exit("labelImageMarker"),s}function s(a){return a===91?(n.enter("labelMarker"),n.consume(a),n.exit("labelMarker"),n.exit("labelImage"),o):e(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(a):t(a)}}const nM={name:"labelStartLink",resolveAll:sc.resolveAll,tokenize:iM};function iM(n,t,e){const i=this;return r;function r(o){return n.enter("labelLink"),n.enter("labelMarker"),n.consume(o),n.exit("labelMarker"),n.exit("labelLink"),s}function s(o){return o===94&&"_hiddenFootnoteSupport"in i.parser.constructs?e(o):t(o)}}const La={name:"lineEnding",tokenize:rM};function rM(n,t){return e;function e(i){return n.enter("lineEnding"),n.consume(i),n.exit("lineEnding"),Kt(n,t,"linePrefix")}}const ho={name:"thematicBreak",tokenize:sM};function sM(n,t,e){let i=0,r;return s;function s(c){return n.enter("thematicBreak"),o(c)}function o(c){return r=c,a(c)}function a(c){return c===r?(n.enter("thematicBreakSequence"),l(c)):i>=3&&(c===null||Lt(c))?(n.exit("thematicBreak"),t(c)):e(c)}function l(c){return c===r?(n.consume(c),i++,l):(n.exit("thematicBreakSequence"),qt(c)?Kt(n,a,"whitespace")(c):a(c))}}const je={continuation:{tokenize:cM},exit:hM,name:"list",tokenize:lM},oM={partial:!0,tokenize:dM},aM={partial:!0,tokenize:uM};function lM(n,t,e){const i=this,r=i.events[i.events.length-1];let s=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,o=0;return a;function a(d){const g=i.containerState.type||(d===42||d===43||d===45?"listUnordered":"listOrdered");if(g==="listUnordered"?!i.containerState.marker||d===i.containerState.marker:Ll(d)){if(i.containerState.type||(i.containerState.type=g,n.enter(g,{_container:!0})),g==="listUnordered")return n.enter("listItemPrefix"),d===42||d===45?n.check(ho,e,c)(d):c(d);if(!i.interrupt||d===49)return n.enter("listItemPrefix"),n.enter("listItemValue"),l(d)}return e(d)}function l(d){return Ll(d)&&++o<10?(n.consume(d),l):(!i.interrupt||o<2)&&(i.containerState.marker?d===i.containerState.marker:d===41||d===46)?(n.exit("listItemValue"),c(d)):e(d)}function c(d){return n.enter("listItemMarker"),n.consume(d),n.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||d,n.check(hs,i.interrupt?e:h,n.attempt(oM,f,u))}function h(d){return i.containerState.initialBlankLine=!0,s++,f(d)}function u(d){return qt(d)?(n.enter("listItemPrefixWhitespace"),n.consume(d),n.exit("listItemPrefixWhitespace"),f):e(d)}function f(d){return i.containerState.size=s+i.sliceSerialize(n.exit("listItemPrefix"),!0).length,t(d)}}function cM(n,t,e){const i=this;return i.containerState._closeFlow=void 0,n.check(hs,r,s);function r(a){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,Kt(n,t,"listItemIndent",i.containerState.size+1)(a)}function s(a){return i.containerState.furtherBlankLines||!qt(a)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,o(a)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,n.attempt(aM,t,o)(a))}function o(a){return i.containerState._closeFlow=!0,i.interrupt=void 0,Kt(n,n.attempt(je,t,e),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function uM(n,t,e){const i=this;return Kt(n,r,"listItemIndent",i.containerState.size+1);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===i.containerState.size?t(s):e(s)}}function hM(n){n.exit(this.containerState.type)}function dM(n,t,e){const i=this;return Kt(n,r,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(s){const o=i.events[i.events.length-1];return!qt(s)&&o&&o[1].type==="listItemPrefixWhitespace"?t(s):e(s)}}const mh={name:"setextUnderline",resolveTo:fM,tokenize:pM};function fM(n,t){let e=n.length,i,r,s;for(;e--;)if(n[e][0]==="enter"){if(n[e][1].type==="content"){i=e;break}n[e][1].type==="paragraph"&&(r=e)}else n[e][1].type==="content"&&n.splice(e,1),!s&&n[e][1].type==="definition"&&(s=e);const o={type:"setextHeading",start:{...n[i][1].start},end:{...n[n.length-1][1].end}};return n[r][1].type="setextHeadingText",s?(n.splice(r,0,["enter",o,t]),n.splice(s+1,0,["exit",n[i][1],t]),n[i][1].end={...n[s][1].end}):n[i][1]=o,n.push(["exit",o,t]),n}function pM(n,t,e){const i=this;let r;return s;function s(c){let h=i.events.length,u;for(;h--;)if(i.events[h][1].type!=="lineEnding"&&i.events[h][1].type!=="linePrefix"&&i.events[h][1].type!=="content"){u=i.events[h][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||u)?(n.enter("setextHeadingLine"),r=c,o(c)):e(c)}function o(c){return n.enter("setextHeadingLineSequence"),a(c)}function a(c){return c===r?(n.consume(c),a):(n.exit("setextHeadingLineSequence"),qt(c)?Kt(n,l,"lineSuffix")(c):l(c))}function l(c){return c===null||Lt(c)?(n.exit("setextHeadingLine"),t(c)):e(c)}}const mM={tokenize:gM};function gM(n){const t=this,e=n.attempt(hs,i,n.attempt(this.parser.constructs.flowInitial,r,Kt(n,n.attempt(this.parser.constructs.flow,r,n.attempt(SS,r)),"linePrefix")));return e;function i(s){if(s===null){n.consume(s);return}return n.enter("lineEndingBlank"),n.consume(s),n.exit("lineEndingBlank"),t.currentConstruct=void 0,e}function r(s){if(s===null){n.consume(s);return}return n.enter("lineEnding"),n.consume(s),n.exit("lineEnding"),t.currentConstruct=void 0,e}}const _M={resolveAll:Wd()},vM=Gd("string"),xM=Gd("text");function Gd(n){return{resolveAll:Wd(n==="text"?yM:void 0),tokenize:t};function t(e){const i=this,r=this.parser.constructs[n],s=e.attempt(r,o,a);return o;function o(h){return c(h)?s(h):a(h)}function a(h){if(h===null){e.consume(h);return}return e.enter("data"),e.consume(h),l}function l(h){return c(h)?(e.exit("data"),s(h)):(e.consume(h),l)}function c(h){if(h===null)return!0;const u=r[h];let f=-1;if(u)for(;++f<u.length;){const d=u[f];if(!d.previous||d.previous.call(i,i.previous))return!0}return!1}}}function Wd(n){return t;function t(e,i){let r=-1,s;for(;++r<=e.length;)s===void 0?e[r]&&e[r][1].type==="data"&&(s=r,r++):(!e[r]||e[r][1].type!=="data")&&(r!==s+2&&(e[s][1].end=e[r-1][1].end,e.splice(s+2,r-s-2),r=s+2),s=void 0);return n?n(e,i):e}}function yM(n,t){let e=0;for(;++e<=n.length;)if((e===n.length||n[e][1].type==="lineEnding")&&n[e-1][1].type==="data"){const i=n[e-1][1],r=t.sliceStream(i);let s=r.length,o=-1,a=0,l;for(;s--;){const c=r[s];if(typeof c=="string"){for(o=c.length;c.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(c===-2)l=!0,a++;else if(c!==-1){s++;break}}if(t._contentTypeTextTrailing&&e===n.length&&(a=0),a){const c={type:e===n.length||l||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?o:i.start._bufferIndex+o,_index:i.start._index+s,line:i.end.line,column:i.end.column-a,offset:i.end.offset-a},end:{...i.end}};i.end={...c.start},i.start.offset===i.end.offset?Object.assign(i,c):(n.splice(e,0,["enter",c,t],["exit",c,t]),e+=2)}e++}return n}const SM={42:je,43:je,45:je,48:je,49:je,50:je,51:je,52:je,53:je,54:je,55:je,56:je,57:je,62:Fd},MM={91:wS},EM={[-2]:Pa,[-1]:Pa,32:Pa},bM={35:DS,42:ho,45:[mh,ho],60:FS,61:mh,95:ho,96:fh,126:fh},TM={38:kd,92:Nd},wM={[-5]:La,[-4]:La,[-3]:La,33:tM,38:kd,42:Dl,60:[nS,GS],91:nM,92:[PS,Nd],93:sc,95:Dl,96:mS},AM={null:[Dl,_M]},CM={null:[42,95]},RM={null:[]},PM=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:CM,contentInitial:MM,disable:RM,document:SM,flow:bM,flowInitial:EM,insideSpan:AM,string:TM,text:wM},Symbol.toStringTag,{value:"Module"}));function LM(n,t,e){let i={_bufferIndex:-1,_index:0,line:e&&e.line||1,column:e&&e.column||1,offset:e&&e.offset||0};const r={},s=[];let o=[],a=[];const l={attempt:w(P),check:w(S),consume:y,enter:M,exit:E,interrupt:w(S,{interrupt:!0})},c={code:null,containerState:{},defineSkip:_,events:[],now:g,parser:n,previous:null,sliceSerialize:f,sliceStream:d,write:u};let h=t.tokenize.call(c,l);return t.resolveAll&&s.push(t),c;function u(C){return o=mn(o,C),m(),o[o.length-1]!==null?[]:(U(t,0),c.events=Lo(s,c.events,c),c.events)}function f(C,O){return UM(d(C),O)}function d(C){return DM(o,C)}function g(){const{_bufferIndex:C,_index:O,line:z,column:X,offset:W}=i;return{_bufferIndex:C,_index:O,line:z,column:X,offset:W}}function _(C){r[C.line]=C.column,x()}function m(){let C;for(;i._index<o.length;){const O=o[i._index];if(typeof O=="string")for(C=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===C&&i._bufferIndex<O.length;)p(O.charCodeAt(i._bufferIndex));else p(O)}}function p(C){h=h(C)}function y(C){Lt(C)?(i.line++,i.column=1,i.offset+=C===-3?2:1,x()):C!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===o[i._index].length&&(i._bufferIndex=-1,i._index++)),c.previous=C}function M(C,O){const z=O||{};return z.type=C,z.start=g(),c.events.push(["enter",z,c]),a.push(z),z}function E(C){const O=a.pop();return O.end=g(),c.events.push(["exit",O,c]),O}function P(C,O){U(C,O.from)}function S(C,O){O.restore()}function w(C,O){return z;function z(X,W,K){let J,Z,at,R;return Array.isArray(X)?Ut(X):"tokenize"in X?Ut([X]):_t(X);function _t(dt){return ht;function ht(St){const Wt=St!==null&&dt[St],wt=St!==null&&dt.null,ce=[...Array.isArray(Wt)?Wt:Wt?[Wt]:[],...Array.isArray(wt)?wt:wt?[wt]:[]];return Ut(ce)(St)}}function Ut(dt){return J=dt,Z=0,dt.length===0?K:I(dt[Z])}function I(dt){return ht;function ht(St){return R=T(),at=dt,dt.partial||(c.currentConstruct=dt),dt.name&&c.parser.constructs.disable.null.includes(dt.name)?lt():dt.tokenize.call(O?Object.assign(Object.create(c),O):c,l,Q,lt)(St)}}function Q(dt){return C(at,R),W}function lt(dt){return R.restore(),++Z<J.length?I(J[Z]):K}}}function U(C,O){C.resolveAll&&!s.includes(C)&&s.push(C),C.resolve&&on(c.events,O,c.events.length-O,C.resolve(c.events.slice(O),c)),C.resolveTo&&(c.events=C.resolveTo(c.events,c))}function T(){const C=g(),O=c.previous,z=c.currentConstruct,X=c.events.length,W=Array.from(a);return{from:X,restore:K};function K(){i=C,c.previous=O,c.currentConstruct=z,c.events.length=X,a=W,x()}}function x(){i.line in r&&i.column<2&&(i.column=r[i.line],i.offset+=r[i.line]-1)}}function DM(n,t){const e=t.start._index,i=t.start._bufferIndex,r=t.end._index,s=t.end._bufferIndex;let o;if(e===r)o=[n[e].slice(i,s)];else{if(o=n.slice(e,r),i>-1){const a=o[0];typeof a=="string"?o[0]=a.slice(i):o.shift()}s>0&&o.push(n[r].slice(0,s))}return o}function UM(n,t){let e=-1;const i=[];let r;for(;++e<n.length;){const s=n[e];let o;if(typeof s=="string")o=s;else switch(s){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&r)continue;o=" ";break}default:o=String.fromCharCode(s)}r=s===-2,i.push(o)}return i.join("")}function IM(n){const i={constructs:Id([PM,...(n||{}).extensions||[]]),content:r(Zy),defined:[],document:r(Ky),flow:r(mM),lazy:{},string:r(vM),text:r(xM)};return i;function r(s){return o;function o(a){return LM(i,s,a)}}}function OM(n){for(;!zd(n););return n}const gh=/[\0\t\n\r]/g;function FM(){let n=1,t="",e=!0,i;return r;function r(s,o,a){const l=[];let c,h,u,f,d;for(s=t+(typeof s=="string"?s.toString():new TextDecoder(o||void 0).decode(s)),u=0,t="",e&&(s.charCodeAt(0)===65279&&u++,e=void 0);u<s.length;){if(gh.lastIndex=u,c=gh.exec(s),f=c&&c.index!==void 0?c.index:s.length,d=s.charCodeAt(f),!c){t=s.slice(u);break}if(d===10&&u===f&&i)l.push(-3),i=void 0;else switch(i&&(l.push(-5),i=void 0),u<f&&(l.push(s.slice(u,f)),n+=f-u),d){case 0:{l.push(65533),n++;break}case 9:{for(h=Math.ceil(n/4)*4,l.push(-2);n++<h;)l.push(-1);break}case 10:{l.push(-4),n=1;break}default:i=!0,n=1}u=f+1}return a&&(i&&l.push(-5),t&&l.push(t),l.push(null)),l}}const NM=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function kM(n){return n.replace(NM,zM)}function zM(n,t,e){if(t)return t;if(e.charCodeAt(0)===35){const r=e.charCodeAt(1),s=r===120||r===88;return Od(e.slice(s?2:1),s?16:10)}return rc(e)||n}function fo(n){return!n||typeof n!="object"?"":"position"in n||"type"in n?_h(n.position):"start"in n||"end"in n?_h(n):"line"in n||"column"in n?Ul(n):""}function Ul(n){return vh(n&&n.line)+":"+vh(n&&n.column)}function _h(n){return Ul(n&&n.start)+"-"+Ul(n&&n.end)}function vh(n){return n&&typeof n=="number"?n:1}const Xd={}.hasOwnProperty;function BM(n,t,e){return typeof t!="string"&&(e=t,t=void 0),HM(e)(OM(IM(e).document().write(FM()(n,t,!0))))}function HM(n){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(Yt),autolinkProtocol:T,autolinkEmail:T,atxHeading:s(Pe),blockQuote:s(wt),characterEscape:T,characterReference:T,codeFenced:s(ce),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:s(ce,o),codeText:s(me,o),codeTextData:T,data:T,codeFlowValue:T,definition:s(Qt),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:s(F),hardBreakEscape:s(Zt),hardBreakTrailing:s(Zt),htmlFlow:s(re,o),htmlFlowData:T,htmlText:s(re,o),htmlTextData:T,image:s(Tt),label:o,link:s(Yt),listItem:s(kt),listItemValue:f,listOrdered:s(At,u),listUnordered:s(At),paragraph:s(Se),reference:I,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:s(Pe),strong:s(L),thematicBreak:s(q)},exit:{atxHeading:l(),atxHeadingSequence:P,autolink:l(),autolinkEmail:Wt,autolinkProtocol:St,blockQuote:l(),characterEscapeValue:x,characterReferenceMarkerHexadecimal:lt,characterReferenceMarkerNumeric:lt,characterReferenceValue:dt,characterReference:ht,codeFenced:l(m),codeFencedFence:_,codeFencedFenceInfo:d,codeFencedFenceMeta:g,codeFlowValue:x,codeIndented:l(p),codeText:l(W),codeTextData:x,data:x,definition:l(),definitionDestinationString:E,definitionLabelString:y,definitionTitleString:M,emphasis:l(),hardBreakEscape:l(O),hardBreakTrailing:l(O),htmlFlow:l(z),htmlFlowData:x,htmlText:l(X),htmlTextData:x,image:l(J),label:at,labelText:Z,lineEnding:C,link:l(K),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:Q,resourceDestinationString:R,resourceTitleString:_t,resource:Ut,setextHeading:l(U),setextHeadingLineSequence:w,setextHeadingText:S,strong:l(),thematicBreak:l()}};qd(t,(n||{}).mdastExtensions||[]);const e={};return i;function i(D){let B={type:"root",children:[]};const G={stack:[B],tokenStack:[],config:t,enter:a,exit:c,buffer:o,resume:h,data:e},rt=[];let nt=-1;for(;++nt<D.length;)if(D[nt][1].type==="listOrdered"||D[nt][1].type==="listUnordered")if(D[nt][0]==="enter")rt.push(nt);else{const mt=rt.pop();nt=r(D,mt,nt)}for(nt=-1;++nt<D.length;){const mt=t[D[nt][0]];Xd.call(mt,D[nt][1].type)&&mt[D[nt][1].type].call(Object.assign({sliceSerialize:D[nt][2].sliceSerialize},G),D[nt][1])}if(G.tokenStack.length>0){const mt=G.tokenStack[G.tokenStack.length-1];(mt[1]||xh).call(G,void 0,mt[0])}for(B.position={start:fi(D.length>0?D[0][1].start:{line:1,column:1,offset:0}),end:fi(D.length>0?D[D.length-2][1].end:{line:1,column:1,offset:0})},nt=-1;++nt<t.transforms.length;)B=t.transforms[nt](B)||B;return B}function r(D,B,G){let rt=B-1,nt=-1,mt=!1,xt,tt,gt,Ct;for(;++rt<=G;){const yt=D[rt];switch(yt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{yt[0]==="enter"?nt++:nt--,Ct=void 0;break}case"lineEndingBlank":{yt[0]==="enter"&&(xt&&!Ct&&!nt&&!gt&&(gt=rt),Ct=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Ct=void 0}if(!nt&&yt[0]==="enter"&&yt[1].type==="listItemPrefix"||nt===-1&&yt[0]==="exit"&&(yt[1].type==="listUnordered"||yt[1].type==="listOrdered")){if(xt){let ct=rt;for(tt=void 0;ct--;){const Rt=D[ct];if(Rt[1].type==="lineEnding"||Rt[1].type==="lineEndingBlank"){if(Rt[0]==="exit")continue;tt&&(D[tt][1].type="lineEndingBlank",mt=!0),Rt[1].type="lineEnding",tt=ct}else if(!(Rt[1].type==="linePrefix"||Rt[1].type==="blockQuotePrefix"||Rt[1].type==="blockQuotePrefixWhitespace"||Rt[1].type==="blockQuoteMarker"||Rt[1].type==="listItemIndent"))break}gt&&(!tt||gt<tt)&&(xt._spread=!0),xt.end=Object.assign({},tt?D[tt][1].start:yt[1].end),D.splice(tt||rt,0,["exit",xt,yt[2]]),rt++,G++}if(yt[1].type==="listItemPrefix"){const ct={type:"listItem",_spread:!1,start:Object.assign({},yt[1].start),end:void 0};xt=ct,D.splice(rt,0,["enter",ct,yt[2]]),rt++,G++,gt=void 0,Ct=!0}}}return D[B][1]._spread=mt,G}function s(D,B){return G;function G(rt){a.call(this,D(rt),rt),B&&B.call(this,rt)}}function o(){this.stack.push({type:"fragment",children:[]})}function a(D,B,G){this.stack[this.stack.length-1].children.push(D),this.stack.push(D),this.tokenStack.push([B,G||void 0]),D.position={start:fi(B.start),end:void 0}}function l(D){return B;function B(G){D&&D.call(this,G),c.call(this,G)}}function c(D,B){const G=this.stack.pop(),rt=this.tokenStack.pop();if(rt)rt[0].type!==D.type&&(B?B.call(this,D,rt[0]):(rt[1]||xh).call(this,D,rt[0]));else throw new Error("Cannot close `"+D.type+"` ("+fo({start:D.start,end:D.end})+"): it’s not open");G.position.end=fi(D.end)}function h(){return Vy(this.stack.pop())}function u(){this.data.expectingFirstListItemValue=!0}function f(D){if(this.data.expectingFirstListItemValue){const B=this.stack[this.stack.length-2];B.start=Number.parseInt(this.sliceSerialize(D),10),this.data.expectingFirstListItemValue=void 0}}function d(){const D=this.resume(),B=this.stack[this.stack.length-1];B.lang=D}function g(){const D=this.resume(),B=this.stack[this.stack.length-1];B.meta=D}function _(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function m(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function p(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D.replace(/(\r?\n|\r)$/g,"")}function y(D){const B=this.resume(),G=this.stack[this.stack.length-1];G.label=B,G.identifier=Ln(this.sliceSerialize(D)).toLowerCase()}function M(){const D=this.resume(),B=this.stack[this.stack.length-1];B.title=D}function E(){const D=this.resume(),B=this.stack[this.stack.length-1];B.url=D}function P(D){const B=this.stack[this.stack.length-1];if(!B.depth){const G=this.sliceSerialize(D).length;B.depth=G}}function S(){this.data.setextHeadingSlurpLineEnding=!0}function w(D){const B=this.stack[this.stack.length-1];B.depth=this.sliceSerialize(D).codePointAt(0)===61?1:2}function U(){this.data.setextHeadingSlurpLineEnding=void 0}function T(D){const G=this.stack[this.stack.length-1].children;let rt=G[G.length-1];(!rt||rt.type!=="text")&&(rt=b(),rt.position={start:fi(D.start),end:void 0},G.push(rt)),this.stack.push(rt)}function x(D){const B=this.stack.pop();B.value+=this.sliceSerialize(D),B.position.end=fi(D.end)}function C(D){const B=this.stack[this.stack.length-1];if(this.data.atHardBreak){const G=B.children[B.children.length-1];G.position.end=fi(D.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(B.type)&&(T.call(this,D),x.call(this,D))}function O(){this.data.atHardBreak=!0}function z(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D}function X(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D}function W(){const D=this.resume(),B=this.stack[this.stack.length-1];B.value=D}function K(){const D=this.stack[this.stack.length-1];if(this.data.inReference){const B=this.data.referenceType||"shortcut";D.type+="Reference",D.referenceType=B,delete D.url,delete D.title}else delete D.identifier,delete D.label;this.data.referenceType=void 0}function J(){const D=this.stack[this.stack.length-1];if(this.data.inReference){const B=this.data.referenceType||"shortcut";D.type+="Reference",D.referenceType=B,delete D.url,delete D.title}else delete D.identifier,delete D.label;this.data.referenceType=void 0}function Z(D){const B=this.sliceSerialize(D),G=this.stack[this.stack.length-2];G.label=kM(B),G.identifier=Ln(B).toLowerCase()}function at(){const D=this.stack[this.stack.length-1],B=this.resume(),G=this.stack[this.stack.length-1];if(this.data.inReference=!0,G.type==="link"){const rt=D.children;G.children=rt}else G.alt=B}function R(){const D=this.resume(),B=this.stack[this.stack.length-1];B.url=D}function _t(){const D=this.resume(),B=this.stack[this.stack.length-1];B.title=D}function Ut(){this.data.inReference=void 0}function I(){this.data.referenceType="collapsed"}function Q(D){const B=this.resume(),G=this.stack[this.stack.length-1];G.label=B,G.identifier=Ln(this.sliceSerialize(D)).toLowerCase(),this.data.referenceType="full"}function lt(D){this.data.characterReferenceType=D.type}function dt(D){const B=this.sliceSerialize(D),G=this.data.characterReferenceType;let rt;G?(rt=Od(B,G==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):rt=rc(B);const nt=this.stack[this.stack.length-1];nt.value+=rt}function ht(D){const B=this.stack.pop();B.position.end=fi(D.end)}function St(D){x.call(this,D);const B=this.stack[this.stack.length-1];B.url=this.sliceSerialize(D)}function Wt(D){x.call(this,D);const B=this.stack[this.stack.length-1];B.url="mailto:"+this.sliceSerialize(D)}function wt(){return{type:"blockquote",children:[]}}function ce(){return{type:"code",lang:null,meta:null,value:""}}function me(){return{type:"inlineCode",value:""}}function Qt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function F(){return{type:"emphasis",children:[]}}function Pe(){return{type:"heading",depth:0,children:[]}}function Zt(){return{type:"break"}}function re(){return{type:"html",value:""}}function Tt(){return{type:"image",title:null,url:"",alt:null}}function Yt(){return{type:"link",title:null,url:"",children:[]}}function At(D){return{type:"list",ordered:D.type==="listOrdered",start:null,spread:D._spread,children:[]}}function kt(D){return{type:"listItem",spread:D._spread,checked:null,children:[]}}function Se(){return{type:"paragraph",children:[]}}function L(){return{type:"strong",children:[]}}function b(){return{type:"text",value:""}}function q(){return{type:"thematicBreak"}}}function fi(n){return{line:n.line,column:n.column,offset:n.offset}}function qd(n,t){let e=-1;for(;++e<t.length;){const i=t[e];Array.isArray(i)?qd(n,i):VM(n,i)}}function VM(n,t){let e;for(e in t)if(Xd.call(t,e))switch(e){case"canContainEols":{const i=t[e];i&&n[e].push(...i);break}case"transforms":{const i=t[e];i&&n[e].push(...i);break}case"enter":case"exit":{const i=t[e];i&&Object.assign(n[e],i);break}}}function xh(n,t){throw n?new Error("Cannot close `"+n.type+"` ("+fo({start:n.start,end:n.end})+"): a different token (`"+t.type+"`, "+fo({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+fo({start:t.start,end:t.end})+") is still open")}function yh(n,t){const e=String(n);if(typeof t!="string")throw new TypeError("Expected character");let i=0,r=e.indexOf(t);for(;r!==-1;)i++,r=e.indexOf(t,r+t.length);return i}function GM(n){if(typeof n!="string")throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}const oc=function(n){if(n==null)return YM;if(typeof n=="function")return Do(n);if(typeof n=="object")return Array.isArray(n)?WM(n):XM(n);if(typeof n=="string")return qM(n);throw new Error("Expected function, string, or object as test")};function WM(n){const t=[];let e=-1;for(;++e<n.length;)t[e]=oc(n[e]);return Do(i);function i(...r){let s=-1;for(;++s<t.length;)if(t[s].apply(this,r))return!0;return!1}}function XM(n){const t=n;return Do(e);function e(i){const r=i;let s;for(s in n)if(r[s]!==t[s])return!1;return!0}}function qM(n){return Do(t);function t(e){return e&&e.type===n}}function Do(n){return t;function t(e,i,r){return!!($M(e)&&n.call(this,e,typeof i=="number"?i:void 0,r||void 0))}}function YM(){return!0}function $M(n){return n!==null&&typeof n=="object"&&"type"in n}const Yd=[],ZM=!0,Sh=!1,jM="skip";function KM(n,t,e,i){let r;r=t;const s=oc(r),o=1;a(n,void 0,[])();function a(l,c,h){const u=l&&typeof l=="object"?l:{};if(typeof u.type=="string"){const d=typeof u.tagName=="string"?u.tagName:typeof u.name=="string"?u.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(l.type+(d?"<"+d+">":""))+")"})}return f;function f(){let d=Yd,g,_,m;if(s(l,c,h[h.length-1]||void 0)&&(d=QM(e(l,h)),d[0]===Sh))return d;if("children"in l&&l.children){const p=l;if(p.children&&d[0]!==jM)for(_=-1+o,m=h.concat(p);_>-1&&_<p.children.length;){const y=p.children[_];if(g=a(y,_,m)(),g[0]===Sh)return g;_=typeof g[1]=="number"?g[1]:_+o}}return d}}}function QM(n){return Array.isArray(n)?n:typeof n=="number"?[ZM,n]:n==null?Yd:[n]}function JM(n,t,e){const r=oc((e||{}).ignore||[]),s=tE(t);let o=-1;for(;++o<s.length;)KM(n,"text",a);function a(c,h){let u=-1,f;for(;++u<h.length;){const d=h[u],g=f?f.children:void 0;if(r(d,g?g.indexOf(d):void 0,f))return;f=d}if(f)return l(c,h)}function l(c,h){const u=h[h.length-1],f=s[o][0],d=s[o][1];let g=0;const m=u.children.indexOf(c);let p=!1,y=[];f.lastIndex=0;let M=f.exec(c.value);for(;M;){const E=M.index,P={index:M.index,input:M.input,stack:[...h,c]};let S=d(...M,P);if(typeof S=="string"&&(S=S.length>0?{type:"text",value:S}:void 0),S===!1?f.lastIndex=E+1:(g!==E&&y.push({type:"text",value:c.value.slice(g,E)}),Array.isArray(S)?y.push(...S):S&&y.push(S),g=E+M[0].length,p=!0),!f.global)break;M=f.exec(c.value)}return p?(g<c.value.length&&y.push({type:"text",value:c.value.slice(g)}),u.children.splice(m,1,...y)):y=[c],m+y.length}}function tE(n){const t=[];if(!Array.isArray(n))throw new TypeError("Expected find and replace tuple or list of tuples");const e=!n[0]||Array.isArray(n[0])?n:[n];let i=-1;for(;++i<e.length;){const r=e[i];t.push([eE(r[0]),nE(r[1])])}return t}function eE(n){return typeof n=="string"?new RegExp(GM(n),"g"):n}function nE(n){return typeof n=="function"?n:function(){return n}}function iE(){return{transforms:[cE],enter:{literalAutolink:rE,literalAutolinkEmail:Da,literalAutolinkHttp:Da,literalAutolinkWww:Da},exit:{literalAutolink:lE,literalAutolinkEmail:aE,literalAutolinkHttp:sE,literalAutolinkWww:oE}}}function rE(n){this.enter({type:"link",title:null,url:"",children:[]},n)}function Da(n){this.config.enter.autolinkProtocol.call(this,n)}function sE(n){this.config.exit.autolinkProtocol.call(this,n)}function oE(n){this.config.exit.data.call(this,n);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(n)}function aE(n){this.config.exit.autolinkEmail.call(this,n)}function lE(n){this.exit(n)}function cE(n){JM(n,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,uE],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,hE]],{ignore:["link","linkReference"]})}function uE(n,t,e,i,r){let s="";if(!$d(r)||(/^w/i.test(t)&&(e=t+e,t="",s="http://"),!dE(e)))return!1;const o=fE(e+i);if(!o[0])return!1;const a={type:"link",title:null,url:s+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function hE(n,t,e,i){return!$d(i,!0)||/[-\d_]$/.test(e)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+e,children:[{type:"text",value:t+"@"+e}]}}function dE(n){const t=n.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function fE(n){const t=/[!"&'),.:;<>?\]}]+$/.exec(n);if(!t)return[n,void 0];n=n.slice(0,t.index);let e=t[0],i=e.indexOf(")");const r=yh(n,"(");let s=yh(n,")");for(;i!==-1&&r>s;)n+=e.slice(0,i+1),e=e.slice(i+1),i=e.indexOf(")"),s++;return[n,e]}function $d(n,t){const e=n.input.charCodeAt(n.index-1);return(n.index===0||$i(e)||Po(e))&&(!t||e!==47)}function pE(){this.buffer()}function mE(n){this.enter({type:"footnoteReference",identifier:"",label:""},n)}function gE(){this.buffer()}function _E(n){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},n)}function vE(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Ln(this.sliceSerialize(n)).toLowerCase(),e.label=t}function xE(n){this.exit(n)}function yE(n){const t=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Ln(this.sliceSerialize(n)).toLowerCase(),e.label=t}function SE(n){this.exit(n)}function ME(){return{enter:{gfmFootnoteCallString:pE,gfmFootnoteCall:mE,gfmFootnoteDefinitionLabelString:gE,gfmFootnoteDefinition:_E},exit:{gfmFootnoteCallString:vE,gfmFootnoteCall:xE,gfmFootnoteDefinitionLabelString:yE,gfmFootnoteDefinition:SE}}}function EE(){return{canContainEols:["delete"],enter:{strikethrough:bE},exit:{strikethrough:TE}}}function bE(n){this.enter({type:"delete",children:[]},n)}function TE(n){this.exit(n)}function wE(){return{enter:{table:AE,tableData:Mh,tableHeader:Mh,tableRow:RE},exit:{codeText:PE,table:CE,tableData:Ua,tableHeader:Ua,tableRow:Ua}}}function AE(n){const t=n._align;this.enter({type:"table",align:t.map(function(e){return e==="none"?null:e}),children:[]},n),this.data.inTable=!0}function CE(n){this.exit(n),this.data.inTable=void 0}function RE(n){this.enter({type:"tableRow",children:[]},n)}function Ua(n){this.exit(n)}function Mh(n){this.enter({type:"tableCell",children:[]},n)}function PE(n){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,LE));const e=this.stack[this.stack.length-1];e.type,e.value=t,this.exit(n)}function LE(n,t){return t==="|"?t:n}function DE(){return{exit:{taskListCheckValueChecked:Eh,taskListCheckValueUnchecked:Eh,paragraph:UE}}}function Eh(n){const t=this.stack[this.stack.length-2];t.type,t.checked=n.type==="taskListCheckValueChecked"}function UE(n){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const e=this.stack[this.stack.length-1];e.type;const i=e.children[0];if(i&&i.type==="text"){const r=t.children;let s=-1,o;for(;++s<r.length;){const a=r[s];if(a.type==="paragraph"){o=a;break}}o===e&&(i.value=i.value.slice(1),i.value.length===0?e.children.shift():e.position&&i.position&&typeof i.position.start.offset=="number"&&(i.position.start.column++,i.position.start.offset++,e.position.start=Object.assign({},i.position.start)))}}this.exit(n)}function IE(){return[iE(),ME(),EE(),wE(),DE()]}const OE={tokenize:HE,partial:!0},Zd={tokenize:VE,partial:!0},jd={tokenize:GE,partial:!0},Kd={tokenize:WE,partial:!0},FE={tokenize:XE,partial:!0},Qd={name:"wwwAutolink",tokenize:zE,previous:tf},Jd={name:"protocolAutolink",tokenize:BE,previous:ef},oi={name:"emailAutolink",tokenize:kE,previous:nf},zn={};function NE(){return{text:zn}}let Oi=48;for(;Oi<123;)zn[Oi]=oi,Oi++,Oi===58?Oi=65:Oi===91&&(Oi=97);zn[43]=oi;zn[45]=oi;zn[46]=oi;zn[95]=oi;zn[72]=[oi,Jd];zn[104]=[oi,Jd];zn[87]=[oi,Qd];zn[119]=[oi,Qd];function kE(n,t,e){const i=this;let r,s;return o;function o(u){return!Il(u)||!nf.call(i,i.previous)||ac(i.events)?e(u):(n.enter("literalAutolink"),n.enter("literalAutolinkEmail"),a(u))}function a(u){return Il(u)?(n.consume(u),a):u===64?(n.consume(u),l):e(u)}function l(u){return u===46?n.check(FE,h,c)(u):u===45||u===95||Qe(u)?(s=!0,n.consume(u),l):h(u)}function c(u){return n.consume(u),r=!0,l}function h(u){return s&&r&&We(i.previous)?(n.exit("literalAutolinkEmail"),n.exit("literalAutolink"),t(u)):e(u)}}function zE(n,t,e){const i=this;return r;function r(o){return o!==87&&o!==119||!tf.call(i,i.previous)||ac(i.events)?e(o):(n.enter("literalAutolink"),n.enter("literalAutolinkWww"),n.check(OE,n.attempt(Zd,n.attempt(jd,s),e),e)(o))}function s(o){return n.exit("literalAutolinkWww"),n.exit("literalAutolink"),t(o)}}function BE(n,t,e){const i=this;let r="",s=!1;return o;function o(u){return(u===72||u===104)&&ef.call(i,i.previous)&&!ac(i.events)?(n.enter("literalAutolink"),n.enter("literalAutolinkHttp"),r+=String.fromCodePoint(u),n.consume(u),a):e(u)}function a(u){if(We(u)&&r.length<5)return r+=String.fromCodePoint(u),n.consume(u),a;if(u===58){const f=r.toLowerCase();if(f==="http"||f==="https")return n.consume(u),l}return e(u)}function l(u){return u===47?(n.consume(u),s?c:(s=!0,l)):e(u)}function c(u){return u===null||So(u)||de(u)||$i(u)||Po(u)?e(u):n.attempt(Zd,n.attempt(jd,h),e)(u)}function h(u){return n.exit("literalAutolinkHttp"),n.exit("literalAutolink"),t(u)}}function HE(n,t,e){let i=0;return r;function r(o){return(o===87||o===119)&&i<3?(i++,n.consume(o),r):o===46&&i===3?(n.consume(o),s):e(o)}function s(o){return o===null?e(o):t(o)}}function VE(n,t,e){let i,r,s;return o;function o(c){return c===46||c===95?n.check(Kd,l,a)(c):c===null||de(c)||$i(c)||c!==45&&Po(c)?l(c):(s=!0,n.consume(c),o)}function a(c){return c===95?i=!0:(r=i,i=void 0),n.consume(c),o}function l(c){return r||i||!s?e(c):t(c)}}function GE(n,t){let e=0,i=0;return r;function r(o){return o===40?(e++,n.consume(o),r):o===41&&i<e?s(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?n.check(Kd,t,s)(o):o===null||de(o)||$i(o)?t(o):(n.consume(o),r)}function s(o){return o===41&&i++,n.consume(o),r}}function WE(n,t,e){return i;function i(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(n.consume(a),i):a===38?(n.consume(a),s):a===93?(n.consume(a),r):a===60||a===null||de(a)||$i(a)?t(a):e(a)}function r(a){return a===null||a===40||a===91||de(a)||$i(a)?t(a):i(a)}function s(a){return We(a)?o(a):e(a)}function o(a){return a===59?(n.consume(a),i):We(a)?(n.consume(a),o):e(a)}}function XE(n,t,e){return i;function i(s){return n.consume(s),r}function r(s){return Qe(s)?e(s):t(s)}}function tf(n){return n===null||n===40||n===42||n===95||n===91||n===93||n===126||de(n)}function ef(n){return!We(n)}function nf(n){return!(n===47||Il(n))}function Il(n){return n===43||n===45||n===46||n===95||Qe(n)}function ac(n){let t=n.length,e=!1;for(;t--;){const i=n[t][1];if((i.type==="labelLink"||i.type==="labelImage")&&!i._balanced){e=!0;break}if(i._gfmAutolinkLiteralWalkedInto){e=!1;break}}return n.length>0&&!e&&(n[n.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),e}const qE={tokenize:tb,partial:!0};function YE(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:KE,continuation:{tokenize:QE},exit:JE}},text:{91:{name:"gfmFootnoteCall",tokenize:jE},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:$E,resolveTo:ZE}}}}function $E(n,t,e){const i=this;let r=i.events.length;const s=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let o;for(;r--;){const l=i.events[r][1];if(l.type==="labelImage"){o=l;break}if(l.type==="gfmFootnoteCall"||l.type==="labelLink"||l.type==="label"||l.type==="image"||l.type==="link")break}return a;function a(l){if(!o||!o._balanced)return e(l);const c=Ln(i.sliceSerialize({start:o.end,end:i.now()}));return c.codePointAt(0)!==94||!s.includes(c.slice(1))?e(l):(n.enter("gfmFootnoteCallLabelMarker"),n.consume(l),n.exit("gfmFootnoteCallLabelMarker"),t(l))}}function ZE(n,t){let e=n.length;for(;e--;)if(n[e][1].type==="labelImage"&&n[e][0]==="enter"){n[e][1];break}n[e+1][1].type="data",n[e+3][1].type="gfmFootnoteCallLabelMarker";const i={type:"gfmFootnoteCall",start:Object.assign({},n[e+3][1].start),end:Object.assign({},n[n.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},n[e+3][1].end),end:Object.assign({},n[e+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},n[n.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},a=[n[e+1],n[e+2],["enter",i,t],n[e+3],n[e+4],["enter",r,t],["exit",r,t],["enter",s,t],["enter",o,t],["exit",o,t],["exit",s,t],n[n.length-2],n[n.length-1],["exit",i,t]];return n.splice(e,n.length-e+1,...a),n}function jE(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s=0,o;return a;function a(u){return n.enter("gfmFootnoteCall"),n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),l}function l(u){return u!==94?e(u):(n.enter("gfmFootnoteCallMarker"),n.consume(u),n.exit("gfmFootnoteCallMarker"),n.enter("gfmFootnoteCallString"),n.enter("chunkString").contentType="string",c)}function c(u){if(s>999||u===93&&!o||u===null||u===91||de(u))return e(u);if(u===93){n.exit("chunkString");const f=n.exit("gfmFootnoteCallString");return r.includes(Ln(i.sliceSerialize(f)))?(n.enter("gfmFootnoteCallLabelMarker"),n.consume(u),n.exit("gfmFootnoteCallLabelMarker"),n.exit("gfmFootnoteCall"),t):e(u)}return de(u)||(o=!0),s++,n.consume(u),u===92?h:c}function h(u){return u===91||u===92||u===93?(n.consume(u),s++,c):c(u)}}function KE(n,t,e){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s,o=0,a;return l;function l(g){return n.enter("gfmFootnoteDefinition")._container=!0,n.enter("gfmFootnoteDefinitionLabel"),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionLabelMarker"),c}function c(g){return g===94?(n.enter("gfmFootnoteDefinitionMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionMarker"),n.enter("gfmFootnoteDefinitionLabelString"),n.enter("chunkString").contentType="string",h):e(g)}function h(g){if(o>999||g===93&&!a||g===null||g===91||de(g))return e(g);if(g===93){n.exit("chunkString");const _=n.exit("gfmFootnoteDefinitionLabelString");return s=Ln(i.sliceSerialize(_)),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(g),n.exit("gfmFootnoteDefinitionLabelMarker"),n.exit("gfmFootnoteDefinitionLabel"),f}return de(g)||(a=!0),o++,n.consume(g),g===92?u:h}function u(g){return g===91||g===92||g===93?(n.consume(g),o++,h):h(g)}function f(g){return g===58?(n.enter("definitionMarker"),n.consume(g),n.exit("definitionMarker"),r.includes(s)||r.push(s),Kt(n,d,"gfmFootnoteDefinitionWhitespace")):e(g)}function d(g){return t(g)}}function QE(n,t,e){return n.check(hs,t,n.attempt(qE,t,e))}function JE(n){n.exit("gfmFootnoteDefinition")}function tb(n,t,e){const i=this;return Kt(n,r,"gfmFootnoteDefinitionIndent",5);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(s):e(s)}}function eb(n){let e={}.singleTilde;const i={name:"strikethrough",tokenize:s,resolveAll:r};return e==null&&(e=!0),{text:{126:i},insideSpan:{null:[i]},attentionMarkers:{null:[126]}};function r(o,a){let l=-1;for(;++l<o.length;)if(o[l][0]==="enter"&&o[l][1].type==="strikethroughSequenceTemporary"&&o[l][1]._close){let c=l;for(;c--;)if(o[c][0]==="exit"&&o[c][1].type==="strikethroughSequenceTemporary"&&o[c][1]._open&&o[l][1].end.offset-o[l][1].start.offset===o[c][1].end.offset-o[c][1].start.offset){o[l][1].type="strikethroughSequence",o[c][1].type="strikethroughSequence";const h={type:"strikethrough",start:Object.assign({},o[c][1].start),end:Object.assign({},o[l][1].end)},u={type:"strikethroughText",start:Object.assign({},o[c][1].end),end:Object.assign({},o[l][1].start)},f=[["enter",h,a],["enter",o[c][1],a],["exit",o[c][1],a],["enter",u,a]],d=a.parser.constructs.insideSpan.null;d&&on(f,f.length,0,Lo(d,o.slice(c+1,l),a)),on(f,f.length,0,[["exit",u,a],["enter",o[l][1],a],["exit",o[l][1],a],["exit",h,a]]),on(o,c-1,l-c+3,f),l=c+f.length-2;break}}for(l=-1;++l<o.length;)o[l][1].type==="strikethroughSequenceTemporary"&&(o[l][1].type="data");return o}function s(o,a,l){const c=this.previous,h=this.events;let u=0;return f;function f(g){return c===126&&h[h.length-1][1].type!=="characterEscape"?l(g):(o.enter("strikethroughSequenceTemporary"),d(g))}function d(g){const _=Mo(c);if(g===126)return u>1?l(g):(o.consume(g),u++,d);if(u<2&&!e)return l(g);const m=o.exit("strikethroughSequenceTemporary"),p=Mo(g);return m._open=!p||p===2&&!!_,m._close=!_||_===2&&!!p,a(g)}}}class nb{constructor(){this.map=[]}add(t,e,i){ib(this,t,e,i)}consume(t){if(this.map.sort(function(s,o){return s[0]-o[0]}),this.map.length===0)return;let e=this.map.length;const i=[];for(;e>0;)e-=1,i.push(t.slice(this.map[e][0]+this.map[e][1]),this.map[e][2]),t.length=this.map[e][0];i.push(t.slice()),t.length=0;let r=i.pop();for(;r;){for(const s of r)t.push(s);r=i.pop()}this.map.length=0}}function ib(n,t,e,i){let r=0;if(!(e===0&&i.length===0)){for(;r<n.map.length;){if(n.map[r][0]===t){n.map[r][1]+=e,n.map[r][2].push(...i);return}r+=1}n.map.push([t,e,i])}}function rb(n,t){let e=!1;const i=[];for(;t<n.length;){const r=n[t];if(e){if(r[0]==="enter")r[1].type==="tableContent"&&i.push(n[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(n[t-1][1].type==="tableDelimiterMarker"){const s=i.length-1;i[s]=i[s]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(e=!0);t+=1}return i}function sb(){return{flow:{null:{name:"table",tokenize:ob,resolveAll:ab}}}}function ob(n,t,e){const i=this;let r=0,s=0,o;return a;function a(x){let C=i.events.length-1;for(;C>-1;){const X=i.events[C][1].type;if(X==="lineEnding"||X==="linePrefix")C--;else break}const O=C>-1?i.events[C][1].type:null,z=O==="tableHead"||O==="tableRow"?S:l;return z===S&&i.parser.lazy[i.now().line]?e(x):z(x)}function l(x){return n.enter("tableHead"),n.enter("tableRow"),c(x)}function c(x){return x===124||(o=!0,s+=1),h(x)}function h(x){return x===null?e(x):Lt(x)?s>1?(s=0,i.interrupt=!0,n.exit("tableRow"),n.enter("lineEnding"),n.consume(x),n.exit("lineEnding"),d):e(x):qt(x)?Kt(n,h,"whitespace")(x):(s+=1,o&&(o=!1,r+=1),x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),o=!0,h):(n.enter("data"),u(x)))}function u(x){return x===null||x===124||de(x)?(n.exit("data"),h(x)):(n.consume(x),x===92?f:u)}function f(x){return x===92||x===124?(n.consume(x),u):u(x)}function d(x){return i.interrupt=!1,i.parser.lazy[i.now().line]?e(x):(n.enter("tableDelimiterRow"),o=!1,qt(x)?Kt(n,g,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):g(x))}function g(x){return x===45||x===58?m(x):x===124?(o=!0,n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),_):P(x)}function _(x){return qt(x)?Kt(n,m,"whitespace")(x):m(x)}function m(x){return x===58?(s+=1,o=!0,n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),p):x===45?(s+=1,p(x)):x===null||Lt(x)?E(x):P(x)}function p(x){return x===45?(n.enter("tableDelimiterFiller"),y(x)):P(x)}function y(x){return x===45?(n.consume(x),y):x===58?(o=!0,n.exit("tableDelimiterFiller"),n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),M):(n.exit("tableDelimiterFiller"),M(x))}function M(x){return qt(x)?Kt(n,E,"whitespace")(x):E(x)}function E(x){return x===124?g(x):x===null||Lt(x)?!o||r!==s?P(x):(n.exit("tableDelimiterRow"),n.exit("tableHead"),t(x)):P(x)}function P(x){return e(x)}function S(x){return n.enter("tableRow"),w(x)}function w(x){return x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),w):x===null||Lt(x)?(n.exit("tableRow"),t(x)):qt(x)?Kt(n,w,"whitespace")(x):(n.enter("data"),U(x))}function U(x){return x===null||x===124||de(x)?(n.exit("data"),w(x)):(n.consume(x),x===92?T:U)}function T(x){return x===92||x===124?(n.consume(x),U):U(x)}}function ab(n,t){let e=-1,i=!0,r=0,s=[0,0,0,0],o=[0,0,0,0],a=!1,l=0,c,h,u;const f=new nb;for(;++e<n.length;){const d=n[e],g=d[1];d[0]==="enter"?g.type==="tableHead"?(a=!1,l!==0&&(bh(f,t,l,c,h),h=void 0,l=0),c={type:"table",start:Object.assign({},g.start),end:Object.assign({},g.end)},f.add(e,0,[["enter",c,t]])):g.type==="tableRow"||g.type==="tableDelimiterRow"?(i=!0,u=void 0,s=[0,0,0,0],o=[0,e+1,0,0],a&&(a=!1,h={type:"tableBody",start:Object.assign({},g.start),end:Object.assign({},g.end)},f.add(e,0,[["enter",h,t]])),r=g.type==="tableDelimiterRow"?2:h?3:1):r&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")?(i=!1,o[2]===0&&(s[1]!==0&&(o[0]=o[1],u=Qs(f,t,s,r,void 0,u),s=[0,0,0,0]),o[2]=e)):g.type==="tableCellDivider"&&(i?i=!1:(s[1]!==0&&(o[0]=o[1],u=Qs(f,t,s,r,void 0,u)),s=o,o=[s[1],e,0,0])):g.type==="tableHead"?(a=!0,l=e):g.type==="tableRow"||g.type==="tableDelimiterRow"?(l=e,s[1]!==0?(o[0]=o[1],u=Qs(f,t,s,r,e,u)):o[1]!==0&&(u=Qs(f,t,o,r,e,u)),r=0):r&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")&&(o[3]=e)}for(l!==0&&bh(f,t,l,c,h),f.consume(t.events),e=-1;++e<t.events.length;){const d=t.events[e];d[0]==="enter"&&d[1].type==="table"&&(d[1]._align=rb(t.events,e))}return n}function Qs(n,t,e,i,r,s){const o=i===1?"tableHeader":i===2?"tableDelimiter":"tableData",a="tableContent";e[0]!==0&&(s.end=Object.assign({},gr(t.events,e[0])),n.add(e[0],0,[["exit",s,t]]));const l=gr(t.events,e[1]);if(s={type:o,start:Object.assign({},l),end:Object.assign({},l)},n.add(e[1],0,[["enter",s,t]]),e[2]!==0){const c=gr(t.events,e[2]),h=gr(t.events,e[3]),u={type:a,start:Object.assign({},c),end:Object.assign({},h)};if(n.add(e[2],0,[["enter",u,t]]),i!==2){const f=t.events[e[2]],d=t.events[e[3]];if(f[1].end=Object.assign({},d[1].end),f[1].type="chunkText",f[1].contentType="text",e[3]>e[2]+1){const g=e[2]+1,_=e[3]-e[2]-1;n.add(g,_,[])}}n.add(e[3]+1,0,[["exit",u,t]])}return r!==void 0&&(s.end=Object.assign({},gr(t.events,r)),n.add(r,0,[["exit",s,t]]),s=void 0),s}function bh(n,t,e,i,r){const s=[],o=gr(t.events,e);r&&(r.end=Object.assign({},o),s.push(["exit",r,t])),i.end=Object.assign({},o),s.push(["exit",i,t]),n.add(e+1,0,s)}function gr(n,t){const e=n[t],i=e[0]==="enter"?"start":"end";return e[1][i]}const lb={name:"tasklistCheck",tokenize:ub};function cb(){return{text:{91:lb}}}function ub(n,t,e){const i=this;return r;function r(l){return i.previous!==null||!i._gfmTasklistFirstContentOfListItem?e(l):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),s)}function s(l){return de(l)?(n.enter("taskListCheckValueUnchecked"),n.consume(l),n.exit("taskListCheckValueUnchecked"),o):l===88||l===120?(n.enter("taskListCheckValueChecked"),n.consume(l),n.exit("taskListCheckValueChecked"),o):e(l)}function o(l){return l===93?(n.enter("taskListCheckMarker"),n.consume(l),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),a):e(l)}function a(l){return Lt(l)?t(l):qt(l)?n.check({tokenize:hb},t,e)(l):e(l)}}function hb(n,t,e){return Kt(n,i,"whitespace");function i(r){return r===null?e(r):t(r)}}function db(n){return Id([NE(),YE(),eb(),sb(),cb()])}function fb({text:n,links:t,onOpen:e}){return _n(()=>pb(n,t,e),[n,t,e])}function pb(n,t,e){const i=BM(gb(n),{extensions:[db()],mdastExtensions:[IE()]}),r=rf(t,e),s=i.children.filter(o=>o.type==="footnoteDefinition");return v("div",{class:"md",children:[Eo(i.children,r),s.length>0&&v("section",{class:"md-footnotes",children:[v("hr",{}),v("ol",{children:s.map(o=>v("li",{id:`fn-${o.identifier}`,children:Eo(o.children,r)},o.identifier))})]})]})}function rf(n,t){const e=new Map(Object.entries(n).map(([i,r])=>[i.toLowerCase(),r]));return{resolve:i=>n[i]??e.get(i.toLowerCase()),onOpen:t}}const mb=/(!?)\[\[([^[\]\n]+?)\]\]/g;function Th(n,t){const e=[];let i=0;for(const r of n.matchAll(mb)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),e.push(of(r[2],r[1]==="!",t,s)),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function gb(n){return n.split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/m).map((t,e)=>e%2?t:t.replace(/%%[\s\S]*?%%/g,"")).join("")}const _b=/^\[!([A-Za-z-]+)\]([+-]?)[ \t]*(.*)$/,vb={note:"note",info:"info",todo:"info",abstract:"abstract",summary:"abstract",tldr:"abstract",tip:"tip",hint:"tip",important:"tip",success:"success",check:"success",done:"success",question:"question",help:"question",faq:"question",warning:"warning",caution:"warning",attention:"warning",failure:"danger",fail:"danger",missing:"danger",danger:"danger",error:"danger",bug:"danger",example:"example",quote:"quote",cite:"quote"};function Eo(n,t){return n.map((e,i)=>sf(e,t,i))}function sf(n,t,e){switch(n.type){case"paragraph":return v("p",{children:bn(n.children,t)},e);case"heading":return xb(n,t,e);case"thematicBreak":return v("hr",{},e);case"blockquote":return Mb(n.children,t,e)??v("blockquote",{children:Eo(n.children,t)},e);case"list":return yb(n,t,e);case"code":return v("pre",{class:"md-code","data-lang":n.lang??void 0,children:v("code",{children:n.value})},e);case"table":return Sb(n,t,e);case"html":return af(n.value)?null:v("pre",{class:"md-raw",children:n.value},e);case"definition":case"footnoteDefinition":case"yaml":return null;default:return null}}function xb(n,t,e){const i=`h${n.depth}`;return v(i,{children:bn(n.children,t)},e)}function yb(n,t,e){const i=n.children.map((r,s)=>v("li",{class:r.checked!=null?`task${r.checked?" done":""}`:void 0,children:[r.checked!=null&&v("input",{type:"checkbox",checked:r.checked,disabled:!0}),r.children.map((o,a)=>o.type==="paragraph"&&!n.spread?v("span",{children:bn(o.children,t)},a):sf(o,t,a))]},s));return n.ordered?v("ol",{start:n.start??void 0,children:i},e):v("ul",{children:i},e)}function Sb(n,t,e){const[i,...r]=n.children,s=o=>n.align?.[o]?{textAlign:n.align[o]}:void 0;return v("div",{class:"md-table",children:v("table",{children:[i&&v("thead",{children:v("tr",{children:i.children.map((o,a)=>v("th",{style:s(a),children:bn(o.children,t)},a))})}),v("tbody",{children:r.map((o,a)=>v("tr",{children:o.children.map((l,c)=>v("td",{style:s(c),children:bn(l.children,t)},c))},a))})]})},e)}function Mb(n,t,e){const i=n[0];if(i?.type!=="paragraph"||i.children[0]?.type!=="text")return null;const r=i.children[0].value,s=r.indexOf(`
`),o=_b.exec(s<0?r:r.slice(0,s));if(!o)return null;const a=o[1].toLowerCase(),l=vb[a]??"note",c=o[3]||a.charAt(0).toUpperCase()+a.slice(1),h={...i,children:s<0?i.children.slice(1):[{type:"text",value:r.slice(s+1)},...i.children.slice(1)]},u=[...h.children.length?[h]:[],...n.slice(1)],f=u.length>0&&v("div",{class:"md-callout-body",children:Eo(u,t)}),d=v("div",{class:"md-callout-title",children:c});return o[2]?v("details",{class:`md-callout ${l}`,open:o[2]==="+",children:[v("summary",{children:d}),f]},e):v("div",{class:`md-callout ${l}`,children:[d,f]},e)}function bn(n,t){return n.map((e,i)=>Eb(e,t,i))}function Eb(n,t,e){switch(n.type){case"text":return v("span",{children:Tb(n.value,t)},e);case"emphasis":return v("em",{children:bn(n.children,t)},e);case"strong":return v("strong",{children:bn(n.children,t)},e);case"delete":return v("del",{children:bn(n.children,t)},e);case"inlineCode":return v("code",{children:n.value},e);case"break":return v("br",{},e);case"link":return Cb(n.url)?v("a",{class:"md-external",href:n.url,target:"_blank",rel:"noopener noreferrer",children:bn(n.children,t)},e):v("span",{children:bn(n.children,t)},e);case"image":return v("span",{class:"md-image",children:n.alt||"image"},e);case"footnoteReference":return v("sup",{class:"md-fnref",children:["[",n.label??n.identifier,"]"]},e);case"html":return af(n.value)?null:v("span",{class:"md-raw",children:n.value},e);case"linkReference":case"imageReference":return v("span",{children:"children"in n?bn(n.children,t):n.alt},e);default:return null}}const bb=/(!?)\[\[([^[\]\n]+?)\]\]|==([^=\n]+?)==|(^|[\s(])#([\p{L}_][\p{L}\p{N}_/-]*)/gu;function Tb(n,t){const e=[];let i=0;for(const r of n.matchAll(bb)){const s=r.index??0;s>i&&e.push(n.slice(i,s)),r[2]!==void 0?e.push(of(r[2],r[1]==="!",t,s)):r[3]!==void 0?e.push(v("mark",{children:r[3]},s)):(e.push(r[4]),e.push(v("span",{class:"md-tag",children:["#",r[5]]},s))),i=s+r[0].length}return i<n.length&&e.push(n.slice(i)),e}function of(n,t,e,i){const[r,s]=wb(n,"|"),[o,a]=Ab(r,/[#^]/),l=e.resolve(o.trim()),c=s?.trim()||(l?l.title+(a?` › ${a.replace(/^[#^]/,"")}`:""):r.trim()),h=`md-internal${l?"":" unresolved"}${t?" embed":""}`;return l?v("a",{class:h,href:"#",onClick:u=>{u.preventDefault(),e.onOpen(l)},children:[t&&v("span",{class:"md-embed-mark",children:"↪ "}),c]},i):v("span",{class:h,title:"Not found, or not visible to this profile",children:c},i)}function wb(n,t){const e=n.indexOf(t);return e<0?[n,void 0]:[n.slice(0,e),n.slice(e+1)]}function Ab(n,t){const e=t.exec(n);return e?[n.slice(0,e.index),n.slice(e.index)]:[n,void 0]}function Cb(n){return/^(https?:|mailto:)/i.test(n.trim())}function af(n){return/^\s*<!--[\s\S]*-->\s*$/.test(n)}function Rb({c:n}){const t=Xt(n.store,a=>a.previewOpen),e=Xt(n.store,a=>a.focus),i=Xt(n.store,a=>a.note),r=vy(a=>n.openNote(a.id,a.topic),[n]);if(!t||!e.note)return null;const s=i&&i.id===e.note?i:null,o=n.world.topics.find(a=>a.slug===(s?.topic??e.topic));return v("aside",{class:"panel preview",role:"dialog","aria-label":"Note preview",children:[v("header",{class:"preview-head",children:[v("div",{class:"insp-kicker",children:[v(Ae,{color:o?.color??"#9cc3ff",size:7})," ",o?.title??"Note"]}),v("div",{class:"preview-actions",children:[s?.abs_path&&v("a",{class:"icon-btn",title:"Open in Obsidian",href:`obsidian://open?path=${encodeURIComponent(s.abs_path)}`,children:v(be,{name:"open"})}),v("button",{class:"icon-btn",title:"Close (Esc)","aria-label":"Close preview",onClick:()=>n.store.set({previewOpen:!1}),children:v(be,{name:"close"})})]})]}),v("div",{class:"preview-body",children:s?v(Ne,{children:[!/^\s*#\s+\S/.test(s.markdown??"")&&v("h1",{class:"md-inline-title",children:s.title}),s.properties&&v(Ub,{props:s.properties,links:s.links??{},onOpen:r}),s.markdown!=null?v(fb,{text:s.markdown,links:s.links??{},onOpen:r}):v("div",{class:"empty",children:["Exported maps do not include note text. Run ",v("code",{children:"brain viz"})," to read notes."]})]}):v("div",{class:"empty",children:"Loading…"})})]})}const Pb=new Set(["title"]),Lb=new Set(["bw-claims","bw-claims-superseded"]),Db=/\s*\{([^{}]*)\}\s*$/;function Ub({props:n,links:t,onOpen:e}){const i=_n(()=>rf(t,e),[t,e]),r=Object.entries(n).filter(([s,o])=>!Pb.has(s)&&o!==null&&o!=="");return r.length?v("details",{class:"md-props",open:!0,children:[v("summary",{children:"Properties"}),v("dl",{children:r.map(([s,o])=>v("div",{class:"md-prop",children:[v("dt",{children:s}),v("dd",{children:Ib(s,o,i)})]},s))})]}):null}function Ib(n,t,e){if(Array.isArray(t))return t.map((r,s)=>v("span",{class:n==="tags"?"md-tag":"md-chip",children:n==="tags"?`#${String(r)}`:wh(n,String(r),e)},s));if(typeof t=="boolean")return v("input",{type:"checkbox",checked:t,disabled:!0});const i=typeof t=="object"?JSON.stringify(t):String(t);return/^https?:\/\//i.test(i)?v("a",{class:"md-external",href:i,target:"_blank",rel:"noopener noreferrer",children:i.replace(/^https?:\/\//,"")}):wh(n,i,e)}function wh(n,t,e){const i=Lb.has(n)?Db.exec(t):null;if(!i)return Th(t,e);const r=Th(t.slice(0,i.index),e);return v("span",{title:i[1],children:n==="bw-claims-superseded"?v("s",{children:r}):r})}const po=n=>!n.altKey&&!n.metaKey&&!n.ctrlKey,Js=n=>t=>po(t)&&t.key.toLowerCase()===n;function Ob(n){return[{section:"Move",keys:[[n.alt,"↑"],[n.alt,"↓"]],join:"pair",does:"Up or down one level: note, folder, topic, group, overview",match:t=>t.altKey&&!t.metaKey&&!t.ctrlKey&&(t.key==="ArrowUp"||t.key==="ArrowDown"),run:(t,e)=>void(e.key==="ArrowUp"?t.levelUp():t.levelDown())},{section:"Move",keys:[["["],["]"]],join:"pair",does:"Previous or next place at the same level",match:t=>po(t)&&(t.key==="["||t.key==="]"),run:(t,e)=>void t.sibling(e.key==="]"?1:-1)},{section:"Move",keys:[["O"]],does:"Overview",match:Js("o"),run:t=>t.focus({})},{section:"Move",keys:[[n.history,"←"],[n.history,"→"]],join:"pair",does:"Back or forward through what you opened"},{section:"Move",keys:[["Esc"]],does:"Close what is open; otherwise up one level",match:t=>t.key==="Escape",run:t=>t.up(),whileTyping:!0},{section:"Show",keys:[["P"]],does:"Preview of the selected note",match:Js("p"),run:t=>t.store.state.focus.note&&t.store.set({previewOpen:!t.store.state.previewOpen})},{section:"Show",keys:[["I"]],does:"Highlight issues",match:Js("i"),run:t=>t.setHealth(!t.store.state.health)},{section:"Show",keys:[["L"]],does:"Labels",match:Js("l"),run:t=>t.setLabels(!t.store.state.labels)},{section:"Show",keys:[["1"],[String(Mr.length)]],join:"range",does:"Show or hide a kind of line, in the order of the bar below",match:t=>po(t)&&/^[1-9]$/.test(t.key)&&Number(t.key)<=Mr.length,run:(t,e)=>{const i=Mr[Number(e.key)-1];t.setLayer(i,!t.store.state.layers[i])}},{section:"Find",keys:[["/"],[n.mod,"K"]],join:"or",does:"Search notes and topics",match:t=>t.key==="/"&&po(t)||t.key.toLowerCase()==="k"&&(t.metaKey||t.ctrlKey)&&!t.altKey,run:t=>t.store.set({paletteOpen:!0}),whileTyping:t=>t.metaKey||t.ctrlKey},{section:"Find",keys:[["?"]],does:"These shortcuts",match:t=>t.key==="?"&&!t.metaKey&&!t.ctrlKey,run:t=>t.store.set({helpOpen:!0})}]}function Fb(n,t,e){return n.find(i=>i.match?.(t)?e?typeof i.whileTyping=="function"?i.whileTyping(t):!!i.whileTyping:!0:!1)}function Nb(n=typeof navigator>"u"?void 0:navigator){const t=n?.userAgentData?.platform||n?.platform||n?.userAgent||"";return/mac|iphone|ipad|ipod/i.test(t)}function kb(n=Nb()){return n?{alt:"⌥",mod:"⌘",history:"⌘",join:(t,e)=>`${t}${e}`}:{alt:"Alt",mod:"Ctrl",history:"Alt",join:(t,e)=>`${t}+${e}`}}const Zr=kb(),lf=Ob(Zr),cf={part_of:"Folders",depends_on:"Depends on",conflicts_with:"Conflicts",supersedes:"Replaces",related_to:"Related",links_to:"Wikilinks"},zb={part_of:"Folders: each note to its folder's note, and each folder to the one above it",depends_on:"Depends on: pulses run from the prerequisite to what depends on it",conflicts_with:"Conflicts: two notes contradict each other",supersedes:"Replaces: pulses run from the old note to the one that replaced it",related_to:"Related: a loose association, no direction",links_to:"Wikilinks: links written inside note text"};function Bb(){return v("svg",{class:"logo",viewBox:"0 0 32 32","aria-hidden":"true",children:[v("defs",{children:v("radialGradient",{id:"lg",cx:"50%",cy:"50%",r:"50%",children:[v("stop",{offset:"0","stop-color":"#fff"}),v("stop",{offset:"0.35","stop-color":"#9cc3ff"}),v("stop",{offset:"1","stop-color":"#7a5cff","stop-opacity":"0"})]})}),v("circle",{cx:"16",cy:"16",r:"15",fill:"url(#lg)"}),v("ellipse",{cx:"16",cy:"16",rx:"14",ry:"5",fill:"none",stroke:"#9cc3ff","stroke-opacity":"0.6",transform:"rotate(-24 16 16)"})]})}function Hb({c:n}){const t=Xt(n.store,c=>c.focus),e=Xt(n.store,c=>c.note),i=Xt(n.store,c=>c.topicData),r=n.world.constellations.find(c=>c.id===t.constellation),s=n.world.topics.find(c=>c.slug===t.topic),o=e?.title??i?.nodes.find(c=>c.id===t.note)?.title,a=[],l=n.world.constellations.length>1;if(a.push({label:l?"Overview":n.world.brain,go:()=>n.focus({}),current:!t.constellation&&!t.topic}),r&&l&&a.push({label:`${Si(r.title)}${r.topics.length>1?` +${r.topics.length-1}`:""}`,color:r.color,go:()=>n.focus({constellation:r.id}),current:!t.topic}),s){const c=[];for(let h=n.world.topics.find(u=>u.slug===s.parent);h;h=n.world.topics.find(u=>u.slug===h.parent))c.unshift(h);for(const h of c)!h.parent&&r&&Si(r.title)===h.title||a.push({label:h.title,color:h.color,go:()=>n.focus({topic:h.slug}),current:!1});a.push({label:s.title,color:s.color,go:()=>n.focus({topic:s.slug}),current:!t.note})}if(t.note&&i&&i.slug===t.topic){const{branches:c,folderOf:h}=Pr(i),u=[];for(let f=c.get(h.get(t.note)??"");f&&f.key!=="";f=f.parent===null?void 0:c.get(f.parent))u.unshift(f);for(const f of u)f.note!==t.note&&a.push({label:f.title,go:()=>f.note?n.focus({topic:i.slug,note:f.note}):void 0,current:!1})}return t.note&&a.push({label:o??"…",go:()=>{},current:!0}),v("nav",{class:"crumbs","aria-label":"Breadcrumb",children:a.map((c,h)=>v("span",{class:"crumb-wrap",children:[h>0&&v("span",{class:"crumb-sep",children:v(be,{name:"chevron"})}),v("button",{class:`crumb${c.current?" current":""}`,onClick:c.go,"aria-current":c.current?"page":void 0,children:[c.color&&v(Ae,{color:c.color,size:7}),v("span",{children:c.label})]})]},h))})}function Vb({c:n}){const t=Xt(n.store,f=>f.focus),e=Xt(n.store,f=>f.zoom),i=Xt(n.store,f=>f.note),r=n.world.constellations.length>1,s=n.world.constellations.find(f=>f.id===t.constellation),o=n.world.topics.find(f=>f.slug===t.topic),a=t.note?3:t.topic?2:t.constellation&&r?1:r?0:1,l=[{level:0,name:"Overview",place:r?`${n.world.constellations.length} groups`:"",go:()=>n.focus({})},{level:1,name:"Group",place:s?Si(s.title):"",go:()=>s&&n.focus({constellation:s.id})},{level:2,name:"Topic",place:o?.title??"",go:()=>o&&n.focus({topic:o.slug})},{level:3,name:"Note",place:t.note?i?.title??"":"",go:()=>{}}].filter(f=>r||f.level>0),c=l[0].level,h=3-c,u=Math.max(0,Math.min(1,(Math.max(e,c)-c)/h));return v("div",{class:"panel level-hud","aria-label":"Map level",children:[v("div",{class:"minimap-label",children:"ZOOM"}),v("div",{class:"level-track",children:[v("div",{class:"level-rail"}),v("div",{class:"level-marker",style:{top:`${u*100}%`}})]}),v("ol",{class:"level-rungs",children:l.map(f=>v("li",{class:`level-rung${f.level===a?" current":""}${f.level<a?" above":""}`,children:v("button",{disabled:f.level>=a,onClick:f.go,title:f.level<a?`Back to the ${f.name.toLowerCase()} level`:void 0,children:[v("span",{class:"level-name",children:f.name}),f.place&&f.level<=a&&v("span",{class:"level-place",children:f.place})]})},f.level))}),v("div",{class:"level-hint",children:a<2?"Scroll to zoom in":a===2?"Click a star to open a note":"Scroll out or press Esc to go back"})]})}function Ia(n,t){const e=t.focus,i=n.world.topics.find(s=>s.slug===e.topic);if(e.note)return{title:t.title??n.galaxy?.noteTitle(e.note)??"Note",kind:"note",color:i?.color,sub:i?.title};if(i)return{title:i.title,kind:"topic",color:i.color};const r=n.world.constellations.find(s=>s.id===e.constellation);return r?{title:Si(r.title),kind:"group",color:r.color}:{title:n.world.constellations.length>1?"Overview":n.world.brain,kind:"overview"}}function Gb({c:n}){const t=Xt(n.store,o=>o.trail),e=Xt(n.store,o=>o.historyOpen),i=us(null);Mi(()=>{if(!e)return;const o=a=>{i.current?.contains(a.target)||n.store.set({historyOpen:!1})};return document.addEventListener("pointerdown",o),()=>document.removeEventListener("pointerdown",o)},[e]);const r=t.entries[t.index-1],s=t.entries[t.index+1];return v("div",{class:"nav-buttons",ref:i,children:[v("button",{class:"icon-btn",disabled:!r,onClick:()=>n.back(),"aria-label":"Back",title:r?`Back to ${Ia(n,r).title} (${Zr.join(Zr.history,"←")})`:"Back",children:v(be,{name:"back"})}),v("button",{class:"icon-btn",disabled:!s,onClick:()=>n.forward(),"aria-label":"Forward",title:s?`Forward to ${Ia(n,s).title} (${Zr.join(Zr.history,"→")})`:"Forward",children:v(be,{name:"forward"})}),v("button",{class:`icon-btn${e?" on":""}`,disabled:t.entries.length<2,onClick:()=>n.store.set({historyOpen:!e}),"aria-label":"History","aria-expanded":e,title:"Everything opened in this tab",children:v(be,{name:"history"})}),e&&v("div",{class:"panel history-pop",role:"menu","aria-label":"History",children:[v("div",{class:"section-title",children:"Opened in this tab"}),t.entries.map((o,a)=>({v:o,i:a})).reverse().map(({v:o,i:a})=>{const l=Ia(n,o);return v("button",{role:"menuitem",class:`row history-row${a===t.index?" current":""}`,onClick:()=>n.jump(a),children:[l.color?v(Ae,{color:l.color,size:7}):v("span",{class:"dot-space"}),v("span",{class:"row-title",children:l.title}),v("span",{class:"row-meta",children:l.sub??l.kind})]},`${a}${o.hash}`)})]})]})}function Wb({c:n}){const t=n.world,e=Xt(n.store,i=>i.embedded);return v("header",{class:"topbar",children:[v("div",{class:"panel brand",children:[v(Bb,{}),v("div",{class:"brand-text",children:[v("div",{class:"brand-name",children:t.brain}),v("div",{class:"brand-sub",children:["brain-wiki · ",t.profile==="owner"?"owner view":`as ${t.profile}`,e?" · exported":""]})]})]}),v("div",{class:"panel crumbs-panel",children:[v(Gb,{c:n}),v(Hb,{c:n})]}),v("button",{class:"panel search-btn",onClick:()=>n.store.set({paletteOpen:!0}),"aria-label":"Search",children:[v(be,{name:"search"}),v("span",{children:"Search notes and topics"}),v(Wi,{children:"/"})]}),v("div",{class:"panel totals","aria-label":"Totals",children:[v("div",{children:[v("b",{children:Ge(t.totals.topics)}),v("span",{children:"topics"})]}),v("div",{children:[v("b",{children:Ge(t.totals.notes)}),v("span",{children:"notes"})]}),v("div",{children:[v("b",{children:Ge(t.totals.links)}),v("span",{children:"links"})]}),v("button",{class:`total${t.totals.flagged?" warn":""}`,onClick:()=>n.setNav("health"),title:"Notes with issues: open the Issues tab",children:[v("b",{children:Ge(t.totals.flagged)}),v("span",{children:"with issues"})]}),v("button",{class:"total gold",onClick:()=>n.select({kind:"inbox"}),title:"Session captures waiting to be merged automatically",children:[v("b",{children:Ge(t.episodes.count)}),v("span",{children:"inbox"})]})]})]})}function Xb({c:n}){const t=Xt(n.store,i=>i.layers),e=Xt(n.store,i=>i.health);return v("div",{class:"dock-wrap",children:v("div",{class:"panel dock",role:"toolbar","aria-label":"Layers",children:[v("div",{class:"dock-group",children:Mr.map(i=>v("button",{class:`layer fam${t[i]?" on":" off"}`,"aria-pressed":t[i],onClick:()=>n.setLayer(i,!t[i]),title:`${zb[i]} (${t[i]?"shown":"hidden"}; ${Mr.indexOf(i)+1} toggles)`,children:[v("span",{class:"swatch",style:t[i]?{background:kn[i],boxShadow:`0 0 10px ${kn[i]}`}:{borderColor:kn[i]}}),v("span",{children:cf[i]})]},i))}),v("div",{class:"dock-sep"}),v("div",{class:"dock-group",children:[v("button",{class:`layer${e?" on health":""}`,"aria-pressed":e,onClick:()=>n.setHealth(!e),title:"Color the map by notes with issues (I)",children:[v(be,{name:"health"})," ",v("span",{children:"Highlight issues"})]}),v(qb,{c:n}),v("button",{class:"layer",onClick:()=>n.store.set({helpOpen:!0}),title:"Shortcuts (?)","aria-label":"Shortcuts",children:v(be,{name:"help"})})]})]})})}function qb({c:n}){const t=Xt(n.store,a=>a.labels),e=Xt(n.store,a=>a.quality),i=Xt(n.store,a=>a.qualityMode),[r,s]=Rn(!1),o=us(null);return Mi(()=>{if(!r)return;const a=c=>{o.current?.contains(c.target)||s(!1)},l=c=>{c.key==="Escape"&&(c.stopPropagation(),s(!1))};return document.addEventListener("pointerdown",a),document.addEventListener("keydown",l,!0),()=>{document.removeEventListener("pointerdown",a),document.removeEventListener("keydown",l,!0)}},[r]),v("div",{class:"more",ref:o,children:[v("button",{class:`layer${r?" on":""}`,onClick:()=>s(!r),"aria-label":"More settings","aria-expanded":r,title:"More settings",children:v(be,{name:"more"})}),r&&v("div",{class:"panel more-pop",role:"menu",children:[v("label",{class:"more-row",children:[v("input",{type:"checkbox",checked:t,onChange:()=>n.setLabels(!t)}),v("span",{children:"Labels"}),v(Wi,{children:"L"})]}),v("div",{class:"more-row graphics",children:[v("span",{children:"Graphics"}),v("div",{class:"seg",role:"radiogroup","aria-label":"Graphics",children:["auto","high","low"].map(a=>v("button",{role:"radio","aria-checked":i===a,class:i===a?"on":"",onClick:()=>n.setQualityMode(a),children:a==="auto"?"Auto":a==="high"?"High":"Low"},a))})]}),v("p",{class:"more-note",children:["Now ",e==="high"?"High: glow, vignette and grain":"Low: no glow, for slower GPUs",".",i==="auto"?" Auto measures your GPU after loading.":""]})]})]})}const Yb={depends_on:{verb:"depends on",subject:"to",roles:["dependent","prerequisite"]},supersedes:{verb:"supersedes",subject:"to",roles:["newer","older"]},conflicts_with:{verb:"conflicts with",subject:"from"},related_to:{verb:"is related to",subject:"from"},links_to:{verb:"links to",subject:"from"},part_of:{verb:"is part of",subject:"from"}};function $b({c:n,target:t,left:e,top:i}){const r=Yb[t.family],[s,o]=r.subject==="to"?[t.to,t.from]:[t.from,t.to],a=(h,u)=>{const f=n.world.topics.find(d=>d.slug===h.topic);return v("div",{class:"link-end",children:[v("div",{class:"hover-title",children:h.title}),v("div",{class:"hover-line",children:[v(Ae,{color:f?.color??"#9cc3ff",size:6})," ",f?.title??h.topic,u?` · ${u}`:""]})]})},c=n.store.state.focus.note===t.to.id?t.from:t.to;return v("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[v("div",{class:"insp-kicker",children:[v("span",{class:"swatch",style:{background:kn[t.family]}})," ",cf[t.family]]}),a(s,r.roles?.[0]),v("div",{class:"link-verb",style:{color:kn[t.family]},children:r.verb}),a(o,r.roles?.[1]),v("div",{class:"hover-line link-hint",children:["Click to go to ",c.title]})]})}function Zb({c:n,target:t,left:e,top:i}){const r=c=>t.level==="constellation"?Si(n.world.constellations.find(h=>h.id===c)?.title??c):n.world.topics.find(h=>h.slug===c)?.title??c,s=n.store.state.focus,[o,a]=s.topic===t.b||s.constellation===t.b?[t.b,t.a]:[t.a,t.b],l=Object.entries(t.rels).sort((c,h)=>h[1]-c[1]).map(([c,h])=>`${h} ${c.replace(/_/g," ")}`);return v("div",{class:"hovercard panel",style:{left:`${e}px`,top:`${i}px`},children:[v("div",{class:"insp-kicker",children:["Links between ",t.level==="constellation"?"groups":"topics"]}),v("div",{class:"hover-title",children:[r(o)," ↔ ",r(a)]}),v("div",{class:"hover-line",children:[t.total," typed links",l.length?`: ${l.join(" · ")}`:""]}),v("div",{class:"hover-line link-hint",children:["Click to fly to ",r(a)]})]})}function jb({c:n}){const t=Xt(n.store,d=>d.hover),e=Xt(n.store,d=>d.topicData);if(!t)return null;const{target:i,x:r,y:s}=t;if(i.kind==="link"||i.kind==="flow"){const d=Math.min(window.innerWidth-310,r+18),g=Math.min(window.innerHeight-200,s+18);return i.kind==="link"?v($b,{c:n,target:i,left:d,top:g}):v(Zb,{c:n,target:i,left:d,top:g})}let o="",a="",l="#9cc3ff",c=[],h=[];if(i.kind==="constellation"){const d=n.world.constellations.find(g=>g.id===i.id);if(!d)return null;o="Group of topics",a=d.title,l=d.color,c=[`${d.topics.length} topics`,"Click to zoom in"]}else if(i.kind==="topic"){const d=n.world.topics.find(g=>g.slug===i.slug);if(!d)return null;o="Topic",a=d.title,l=d.color,c=[`${d.notes} notes${d.recent?` · ${d.recent} changed this week`:""}`,d.flagged?`${d.flagged} with issues`:"No issues"]}else if(i.kind==="note"){const d=n.world.topics.find(m=>m.slug===i.topic),_=(e?.slug===i.topic?e.nodes:void 0)?.find(m=>m.id===i.id);o=d?.title??"Note",l=d?.color??l,a=_?.title??"Note",_&&(c=[[_.kind==="hub"?"topic index":_.type,_.status!=="active"?_.status:null,`${_.degree} links`].filter(Boolean).join(" · ")],h=_.flags)}else o="Inbox",a=`${n.world.episodes.count} session captures`,l="#ffd88a",c=["Waiting to be merged into your notes automatically"];const u=Math.min(window.innerWidth-300,r+18),f=Math.min(window.innerHeight-140,s+18);return v("div",{class:"hovercard panel",style:{left:`${u}px`,top:`${f}px`},children:[v("div",{class:"insp-kicker",children:[v(Ae,{color:l,size:7})," ",o]}),v("div",{class:"hover-title",children:a}),c.map(d=>v("div",{class:"hover-line",children:d},d)),h.length>0&&v("div",{class:"hover-flags",children:h.map(d=>v("span",{style:{color:Yi[d]},children:["● ",Ro[d]]},d))})]})}function Kb({b:n}){const[t,e]=n.keys;if(n.join==="pair"&&e&&t.length===e.length&&t.slice(0,-1).every((s,o)=>s===e[o]))return v("span",{class:"keys",children:[v("span",{class:"chord",children:t.map(s=>v(Wi,{children:s},s))}),v("span",{class:"keys-sep",children:"/"}),v(Wi,{children:e[e.length-1]})]});const r=n.join==="range"?"–":n.join==="or"?"or":"";return v("span",{class:"keys",children:n.keys.map((s,o)=>v(Ne,{children:[o>0&&r&&v("span",{class:"keys-sep",children:r}),v("span",{class:"chord",children:s.map(a=>v(Wi,{children:a},a))})]},o))})}const Qb=[{title:"Move",column:0},{title:"Show",column:1},{title:"Find",column:1}],Jb=[["Click","zoom to a group or topic; open a note"],["Scroll","zoom toward the pointer"],["Drag","pan"],["Hover a line","see the two notes it joins; click to go to the other end"]];function tT({c:n}){const t=[0,1].map(e=>Qb.filter(i=>i.column===e));return v("div",{class:"palette-scrim",onClick:e=>e.target===e.currentTarget&&n.store.set({helpOpen:!1}),children:v("div",{class:"panel help",role:"dialog","aria-label":"Shortcuts",children:[v("div",{class:"help-head",children:[v("h3",{children:"Shortcuts"}),v("button",{class:"icon-btn",onClick:()=>n.store.set({helpOpen:!1}),"aria-label":"Close",title:"Close (Esc)",children:v(be,{name:"close"})})]}),v("div",{class:"help-cols",children:t.map((e,i)=>v("div",{class:"help-col",children:e.map(r=>v(Ne,{children:[v("h4",{children:r.title}),lf.filter(s=>s.section===r.title).map(s=>v("div",{class:"help-row",children:[v(Kb,{b:s}),v("span",{children:s.does})]},s.does))]},r.title))},i))}),v("section",{class:"help-section help-wide",children:[v("h4",{children:"Mouse"}),v("p",{class:"help-list",children:Jb.map(([e,i],r)=>v(Ne,{children:[r>0&&v("span",{class:"help-dot",children:" · "}),v("b",{children:e})," ",i]},e))})]}),v("section",{class:"help-section help-wide",children:[v("h4",{children:"Reading the map"}),v("p",{class:"help-list",children:"A circle is a folder, holding its notes and sub-folders · star size: how much a note holds · brightness: how recently it changed · a ring: it has issues · pulses flow prerequisite → dependent (blue) and old → new (amber)"})]})]})})}function eT({c:n}){const t=us(null),e=Xt(n.store,l=>l.paletteOpen),i=Xt(n.store,l=>l.helpOpen),r=Xt(n.store,l=>l.toast),s=Xt(n.store,l=>l.run),o=Xt(n.store,l=>l.health),a=Xt(n.store,l=>l.sceneError);return Mi(()=>{t.current&&!n.galaxy&&n.mount(t.current);const l=c=>{const h=c.target,u=h.tagName==="INPUT"||h.tagName==="SELECT"||h.tagName==="TEXTAREA",f=Fb(lf,c,u);f?.run&&(c.preventDefault(),u&&c.key==="Escape"&&h.blur(),f.run(n,c))};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[]),v("div",{class:"app",children:[v("div",{class:"stage",ref:t}),a&&v("div",{class:"panel scene-error",role:"alert",children:[v("h2",{children:"The 3D map could not start"}),v("p",{class:"scene-error-detail",children:a}),v("p",{children:["It needs WebGL2 with hardware acceleration. Turn on hardware acceleration in your browser settings, then check ",v("code",{children:"chrome://gpu"})," (or ",v("code",{children:"about:support"})," in Firefox) for WebGL2 marked hardware accelerated. Remote desktop sessions often have no GPU."]}),v("p",{children:"The topic list, search, and details panel still work."})]}),v(Wb,{c:n}),v(zy,{c:n}),v(Ly,{c:n}),v(Rb,{c:n}),!a&&v(Uy,{c:n}),!a&&v(Vb,{c:n}),v(Xb,{c:n}),v(jb,{c:n}),s&&v("div",{class:"panel run-banner",children:[v("span",{class:"run-kind",children:s.kind})," ",s.at?new Date(s.at).toLocaleString():""," · ",s.touched.length," notes lit",v("button",{class:"link",onClick:()=>n.setRun(null),children:"clear"})]}),o&&v("div",{class:"panel health-legend",role:"note","aria-label":"Health mode legend",children:[v("span",{children:"Fewest issues"}),v("span",{class:"health-ramp"}),v("span",{children:"Most issues"}),v("span",{class:"dock-sep"}),v("span",{class:"ring"})," ",v("span",{children:"note with issues"}),v("span",{class:"dock-sep"}),v(Wi,{children:"I"})," ",v("span",{children:"exit"})]}),e&&v(By,{c:n}),i&&v(tT,{c:n}),r&&v("div",{class:"panel toast",role:"status",children:r})]})}async function nT(){const n=document.getElementById("app"),t=document.createElement("div");t.className="boot",t.textContent="Charting your brain…",n.appendChild(t);try{const e=wf(),i=await e.world();t.remove(),Mf(v(eT,{c:new My(e,i)}),n)}catch(e){t.className="boot boot-error",t.textContent=`Could not load the brain: ${e instanceof Error?e.message:String(e)}`}}nT();
