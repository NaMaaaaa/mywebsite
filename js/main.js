// Injection header/footer
async function inject(part, targetId){
  const el=document.getElementById(targetId);
  if(!el) return;
  const res=await fetch(`/_includes/${part}.html`);
  el.innerHTML=await res.text();
  // post-inject behaviors
  const burger=document.querySelector('.burger');
  const menu=document.getElementById('menu');
  if(burger && menu){
    burger.addEventListener('click',()=>{
      const open=menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true':'false');
    });
  }
  // theme toggle
  const btn=document.getElementById('themeToggle');
  if(btn){
    btn.addEventListener('click',()=>{
      const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
      document.documentElement.setAttribute('data-theme',t);
      localStorage.setItem('theme',t);
    });
    const saved=localStorage.getItem('theme');
    if(saved) document.documentElement.setAttribute('data-theme',saved);
  }
}
inject('header','site-header');
inject('footer','site-footer');

// Accordions
document.addEventListener('click',(e)=>{
  if(e.target.classList.contains('accordion')){
    const panel=e.target.nextElementSibling;
    const open=e.target.getAttribute('aria-expanded')==='true';
    e.target.setAttribute('aria-expanded',(!open).toString());
    panel.style.maxHeight= open ? null : panel.scrollHeight+'px';
  }
});

// Conditional MathJax loader: add data-mathjax on <html> when needed
(function(){
  const needsMJ = document.documentElement.hasAttribute('data-mathjax');
  if(!needsMJ) return;
  window.MathJax={tex:{inlineMath:[['$','$'],['\\(','\\)']]},svg:{fontCache:'global'}};
  const s=document.createElement('script');
  s.async=true; s.src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  document.head.appendChild(s);
})();

// Register service worker
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));
}
