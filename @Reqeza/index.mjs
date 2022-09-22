var R=Object.defineProperty,m=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var l=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var _=(s,e,t)=>e in s?R(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,h=(s,e)=>{for(var t in e||(e={}))l.call(e,t)&&_(s,t,e[t]);if(d)for(var t of d(e))T.call(e,t)&&_(s,t,e[t]);return s},f=(s,e)=>m(s,y(e));var r=class extends Error{constructor(e){super(e),this.name="ValidationError",this.message=e}toJSON(){return{error:{name:this.name,message:this.message,stacktrace:this.stack}}}};function g(s){if(!s.ok)throw new r(s.statusText);return s}var I=["get","head","put","delete","post","patch","options"],C=["json","text","blob","arrayBuffer","formData"],p=class{constructor(e={},t){this.__options=e;this.__methodsConfig=t;this.__options=e,this.__methodsConfig=t}get __parseURI(){var e;try{return new URL(Object.hasOwnProperty.call(this.__options,"PREFIX_URL")?(typeof this.__options.PREFIX_URL=="object"&&this.__options.PREFIX_URL!==null?this.__methodsConfig.PREFIX_URL?this.__options.PREFIX_URL[this.__methodsConfig.PREFIX_URL]:Object.values(this.__options.PREFIX_URL)[0]:(e=this.__options.PREFIX_URL)!=null?e:this.__methodsConfig.PREFIX_URL)+this.__methodsConfig.path:this.__methodsConfig.path)}catch(t){throw new r("The given URI is invalid.")}}get __configuration(){let e=new Headers(this.__methodsConfig.headers);return["post","put","patch"].includes(this.__methodsConfig.method)&&Object.hasOwnProperty.call(this.__methodsConfig,"json")&&!Object.hasOwnProperty.call(this.__methodsConfig,"headers['Content-Type']")&&e.append("Content-Type","application/json; charset=UTF-8"),new Request(this.__parseURI.href,{method:this.__methodsConfig.method.toLocaleUpperCase(),headers:e,body:Object.hasOwnProperty.call(this.__methodsConfig,"json")?JSON.stringify(this.__methodsConfig.json):this.__methodsConfig.body,signal:this.__methodsConfig.signal})}httpAdapter(){let e=this.__configuration;return fetch(e).then(g).then(async t=>{let a=()=>{let n={};for(let o of t.headers.entries())n[o[0]]=o[1];return n};return{data:await(()=>t[this.__methodsConfig.responseType]())(),headers:a(),status:t.status,statusText:t.statusText,config:e}})}},u={create(s){let e=I.map(t=>({[t]:(a,c)=>{let i="json",n=f(h({},Object.assign({},...C.map(o=>({[o]:()=>(i=o,n)})))),{then(o){return new p(s,h({path:a,method:t,responseType:i},c)).httpAdapter().then(o)}});return n}}));return Object.assign({},...e)}},O=Object.assign(u,u.create());export{O as default};
//# sourceMappingURL=index.mjs.map