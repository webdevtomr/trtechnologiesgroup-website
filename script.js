/* Progressive enhancements shared by the homepage and project pages. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#mobile-nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('.site-footer');
  const closeMenu = (returnFocus = false) => {
    if (!menu || !nav) return;
    nav.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (main) main.inert = false;
    if (footer) footer.inert = false;
    if (returnFocus) menu.focus();
  };
  menu?.addEventListener('click', () => {
    if (menu.getAttribute('aria-expanded') === 'true') return closeMenu(true);
    nav.hidden = false;
    menu.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    nav.querySelector('a')?.focus();
  });
  document.addEventListener('keydown', event => {
    if (!nav || nav.hidden) return;
    if (event.key === 'Escape') closeMenu(true);
    if (event.key === 'Tab') {
      const items = [menu, ...nav.querySelectorAll('a')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    closeMenu();
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    }
  }));
  matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const status = document.querySelector('[data-copy-status]');
      try { await navigator.clipboard.writeText('info@trtechnologies.com.au'); status.textContent = 'Email address copied.'; }
      catch { status.textContent = 'You can select and copy the email address above.'; }
    });
  });
  document.querySelector('.enquiry-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const business = String(data.get('business') || '').trim();
    const project = String(data.get('project') || '').trim();
    const body = `Hi Tom and Andy,\n\n${project}\n\n${business ? `Business / website: ${business}\n` : ''}From: ${name}`;
    const subject = business ? `Project enquiry — ${business}` : 'Project enquiry';
    window.location.href = `mailto:info@trtechnologies.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector('.form-status').textContent = 'If your email app did not open, email info@trtechnologies.com.au directly. Nothing has been sent from this page.';
  });
  const dialog = document.querySelector('.image-dialog');
  document.querySelector('[data-open-image]')?.addEventListener('click', () => dialog?.showModal());
  dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
})();
