const CACHE='ematiMad-clean-v1';
const ASSETS=[
  './','index.html','college.html','capes.html','references.html','contact.html',
  'css/style.css','js/main.js','assets/img/logo.png','_includes/header.html','_includes/footer.html'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
