(()=>{
 const title=document.querySelector('.featured-heading h2');
 if(!title)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let animation;
 const observer=new IntersectionObserver(entries=>{
  if(!entries.some(entry=>entry.isIntersecting))return;
  observer.disconnect();
  if(reduced.matches)return;
  animation=title.animate([
   {transform:`translateX(${Math.min(innerWidth*.3,440)}px)`,opacity:0},
   {transform:'translateX(0)',opacity:1}
  ],{duration:850,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'});
 },{threshold:.2,rootMargin:'0px 0px -50px 0px'});
 observer.observe(title);
 reduced.addEventListener('change',()=>{if(reduced.matches)animation?.cancel()});
})();
