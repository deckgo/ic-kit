if(!self.define){let e,i={};const s=(s,d)=>(s=new URL(s+".js",d).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(d,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const a=e=>s(e,r),o={module:{uri:r},exports:c,require:a};i[r]=Promise.all(d.map((e=>o[e]||a(e)))).then((e=>(n(...e),c)))}}define(["./workbox-c837f436"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"build/deck/index-ELSPH57U.js",revision:"8899461ca9005d30b491c38e2dc33cae"},{url:"build/deck/index-HPLMJ2FO.css",revision:"90359c151a631cb705c72a4ebd38bc02"},{url:"build/doc/index-RZB27UR5.css",revision:"48b915688c0940a8db89ed23f09323ec"},{url:"build/index-55VE2P7H.js",revision:"0d5eda7cdb75b94bfab77a7fef6ee7ed"},{url:"build/index-M763JKRZ.css",revision:"32d9022971546c83258ff2d372e6fdf0"},{url:"d/index.html",revision:"caecd1e0d1881ad4049e6e22055316f2"},{url:"index.html",revision:"2da980d9d5ad9e6ef88857fbad9e2d1d"},{url:"manifest.webmanifest",revision:"e78fe8f13a9efb780ebb7a89131a1bdd"},{url:"p/index.html",revision:"8705f7549a28234c04faddbd53b2dca3"},{url:"robots.txt",revision:"4f261bf7f54fd4d6ec30e5e40a54c4fe"}],{ignoreURLParametersMatching:[/./]}),e.registerRoute(/^(?!.*(?:unsplash|giphy|tenor|firebasestorage))(?=.*(?:png|jpg|jpeg|svg|webp|gif)).*/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/^(?=.*(?:unsplash|giphy|tenor|firebasestorage))(?=.*(?:png|jpg|jpeg|svg|webp|gif)).*/,new e.StaleWhileRevalidate({cacheName:"cors-images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
