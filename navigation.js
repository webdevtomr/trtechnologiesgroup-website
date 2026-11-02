(()=>{
 const header=document.querySelector('.firm-header'); if(!header)return;
 const menus=[...header.querySelectorAll('.nav-disclosure,.mobile-menu')];
 const hoverEnabled=matchMedia('(hover:hover) and (pointer:fine) and (min-width:1101px)');
 const closeTimers=new Map();
 const openTimers=new Map();
 const cancelOpen=menu=>{clearTimeout(openTimers.get(menu));openTimers.delete(menu)};
 const cancelClose=menu=>{clearTimeout(closeTimers.get(menu));closeTimers.delete(menu)};
 const close=(menu,focus=false)=>{cancelOpen(menu);cancelClose(menu);menu.open=false;if(focus)menu.querySelector('summary').focus()};
 menus.forEach(menu=>{
  if(menu.classList.contains('nav-disclosure')){
   menu.addEventListener('pointerenter',event=>{
    if(!hoverEnabled.matches||event.pointerType==='touch')return;
    cancelClose(menu);
    cancelOpen(menu);
    if(!menu.open)openTimers.set(menu,setTimeout(()=>{
     openTimers.delete(menu);
     menus.forEach(other=>{if(other!==menu)close(other)});
     menu.open=true;
    },140));
   });
   menu.addEventListener('pointerleave',event=>{
    if(!hoverEnabled.matches||event.pointerType==='touch')return;
    cancelClose(menu);
    cancelOpen(menu);
    closeTimers.set(menu,setTimeout(()=>close(menu),320));
   });
  }
  menu.addEventListener('toggle',()=>{if(menu.open)menus.forEach(other=>{if(other!==menu)close(other)})});
  menu.querySelector('summary').addEventListener('pointerdown',()=>cancelOpen(menu));
  menu.querySelector('summary').addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();menu.open=true;menu.querySelector('a')?.focus()}});
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){const menu=menus.find(m=>m.open);if(menu){event.preventDefault();close(menu,true)}}});
 document.addEventListener('click',event=>{menus.forEach(menu=>{if(menu.open&&!menu.contains(event.target))close(menu)})});
 document.addEventListener('focusin',event=>{menus.forEach(menu=>{if(menu.open&&!menu.contains(event.target))close(menu)})});
 const mobile=header.querySelector('.mobile-menu nav');
 const overview=mobile?.querySelector('a');
 const desktop=header.querySelector('.mega-columns');
 if(mobile&&overview&&desktop){
  const group=document.createElement('details');group.className='mobile-capabilities';
  const summary=document.createElement('summary');summary.textContent='What we do';group.append(summary);
  const links=document.createElement('div');links.className='mobile-service-links';
  overview.textContent='Explore all capabilities';links.append(overview);
  desktop.querySelectorAll('a').forEach(link=>{const copy=link.cloneNode(true);copy.className=link.classList.contains('mega-title')?'mobile-group':'';links.append(copy)});
  group.append(links);mobile.prepend(group);
 }
 // One highlight travels between links instead of restarting on every row.
 header.querySelectorAll('.mega-panel,.company-panel,nav[aria-label="Main navigation"]').forEach(panel=>{
  const highlight=document.createElement('span');
  highlight.className='nav-travelling-highlight';highlight.setAttribute('aria-hidden','true');
  panel.prepend(highlight);
  let active=null;
  const clear=()=>{active?.classList.remove('nav-hover-active');active=null;panel.classList.remove('has-hover-target')};
  const follow=target=>{
   const link=target.closest('a,summary');
   if(panel.matches('nav')&&link?.closest('.mega-panel,.company-panel'))return;
   if(!hoverEnabled.matches||!link||!panel.contains(link))return;
   active?.classList.remove('nav-hover-active');active=link;link.classList.add('nav-hover-active');
   const bounds=highlight.offsetParent.getBoundingClientRect(),rect=link.getBoundingClientRect();
   highlight.style.width=rect.width+'px';highlight.style.height=rect.height+'px';
   highlight.style.transform=`translate(${rect.left-bounds.left+panel.scrollLeft}px,${rect.top-bounds.top+panel.scrollTop}px)`;
   panel.classList.add('has-hover-target');
  };
  panel.addEventListener('pointerover',event=>{if(event.pointerType!=='touch')follow(event.target)});
  panel.addEventListener('pointerleave',clear);
  panel.addEventListener('focusin',event=>follow(event.target));
  panel.addEventListener('focusout',event=>{if(!panel.contains(event.relatedTarget))clear()});
  panel.closest('details')?.addEventListener('toggle',()=>{if(!panel.closest('details').open)clear()});
 });
 const current=location.pathname.replace(/index\.html$/,'');
 header.querySelectorAll('a[href]').forEach(link=>{if(new URL(link.href).pathname.replace(/index\.html$/,'')===current)link.setAttribute('aria-current','page')});
 const breakpoint=matchMedia('(max-width:1100px)');breakpoint.addEventListener('change',()=>menus.forEach(menu=>close(menu)));
})();
