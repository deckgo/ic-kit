if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let d={};const a=e=>s(e,c),o={module:{uri:c},exports:d,require:a};i[c]=Promise.all(n.map((e=>o[e]||a(e)))).then((e=>(r(...e),d)))}}define(["./workbox-c837f436"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"build/deck/index-ELSPH57U.js",revision:"8899461ca9005d30b491c38e2dc33cae"},{url:"build/deck/index.css",revision:"90359c151a631cb705c72a4ebd38bc02"},{url:"build/doc/index.css",revision:"4da032629c7a37e9edfb6e8a6179d435"},{url:"build/index-55VE2P7H.js",revision:"0d5eda7cdb75b94bfab77a7fef6ee7ed"},{url:"build/index.css",revision:"dca8953ce43f58277464fb5351e3b141"},{url:"d/index.html",revision:"6c159dd99316be38157a1c223a6acc5e"},{url:"index.html",revision:"891c88e384efc81ac9693f82f19f4646"},{url:"manifest.webmanifest",revision:"e78fe8f13a9efb780ebb7a89131a1bdd"},{url:"p/index.html",revision:"8d9067a9be18ed5344dcb6b22b097daa"},{url:"robots.txt",revision:"19fc8f6d0b12ecb160b1a43d465e2b28"}],{ignoreURLParametersMatching:[/./]}),e.registerRoute(/^(?!.*(?:unsplash|giphy|tenor|firebasestorage))(?=.*(?:png|jpg|jpeg|svg|webp|gif)).*/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/^(?=.*(?:unsplash|giphy|tenor|firebasestorage))(?=.*(?:png|jpg|jpeg|svg|webp|gif)).*/,new e.StaleWhileRevalidate({cacheName:"cors-images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
