if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const a=e=>s(e,r),o={module:{uri:r},exports:c,require:a};i[r]=Promise.all(n.map((e=>o[e]||a(e)))).then((e=>(d(...e),c)))}}define(["./workbox-c837f436"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"build/deck/index-ELSPH57U.js",revision:"8899461ca9005d30b491c38e2dc33cae"},{url:"build/deck/index-HPLMJ2FO.css",revision:"90359c151a631cb705c72a4ebd38bc02"},{url:"build/doc/index-6WZFUT5N.css",revision:"4da032629c7a37e9edfb6e8a6179d435"},{url:"build/index-55VE2P7H.js",revision:"0d5eda7cdb75b94bfab77a7fef6ee7ed"},{url:"build/index-M763JKRZ.css",revision:"32d9022971546c83258ff2d372e6fdf0"},{url:"d/index.html",revision:"b5b275c75cdbc23916055345e0e8c464"},{url:"index.html",revision:"2da980d9d5ad9e6ef88857fbad9e2d1d"},{url:"manifest.webmanifest",revision:"e78fe8f13a9efb780ebb7a89131a1bdd"},{url:"p/index.html",revision:"8705f7549a28234c04faddbd53b2dca3"},{url:"robots.txt",revision:"ec62ddee7c1f1375678f94037ff8432a"}],{ignoreURLParametersMatching:[/./]}),e.registerRoute(/^(?!.*(?:unsplash|giphy|tenor|firebasestorage))(?=.*(?:png|jpg|jpeg|svg|webp|gif)).*/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/^(?=.*(?:unsplash|giphy|tenor|firebasestorage))(?=.*(?:png|jpg|jpeg|svg|webp|gif)).*/,new e.StaleWhileRevalidate({cacheName:"cors-images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
