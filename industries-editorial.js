(() => {
 const nav = document.querySelector('.sector-tabs');
 if (!nav) return;
 const tabs = [...nav.querySelectorAll('a')];
 const panels = tabs.map(tab => document.querySelector(tab.getAttribute('href')));
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 nav.setAttribute('role', 'tablist'); nav.setAttribute('aria-orientation', 'vertical');
 tabs.forEach((tab, i) => { tab.setAttribute('role','tab'); tab.setAttribute('aria-controls',panels[i].id); panels[i].setAttribute('role','tabpanel'); panels[i].setAttribute('aria-labelledby',tab.id); panels[i].tabIndex=0; });
 function select(index, animate=false) {
  tabs.forEach((tab,i) => {tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});
  if(animate && !motion.matches) panels[index].animate([{opacity:.65,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'cubic-bezier(.16,1,.3,1)'});
 }
 tabs.forEach((tab,i) => {
  tab.addEventListener('click',event=>{event.preventDefault();select(i,true);});
  tab.addEventListener('keydown',event=>{let n=i;if(['ArrowDown','ArrowRight'].includes(event.key)) n=(i+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(event.key)) n=(i-1+tabs.length)%tabs.length;else if(event.key==='Home') n=0;else if(event.key==='End') n=tabs.length-1;else return;event.preventDefault();select(n,true);tabs[n].focus();});
 });
 const initial=panels.findIndex(panel=>'#'+panel.id===location.hash);select(initial<0?0:initial);
})();
