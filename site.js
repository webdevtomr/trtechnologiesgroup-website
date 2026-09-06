/* ==========================================================================
   TR TECHNOLOGIES GROUP - interaction

   There is deliberately almost nothing here. "No motion at all" was the only
   option accepted after all three levels were reviewed running inside a real
   page, so there are no reveals, no scroll effects and no page transitions to
   drive. What is left is the two things that genuinely need JavaScript:

     1. the masthead taking the tone of the section behind it
     2. the enquiry form, which composes a real email rather than posting to a
        dead endpoint

   Everything on the page renders and works with this file absent.
   ========================================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------------------
     0. HERO - the grass moves, nothing else does
     The still photograph is what the markup ships. The video source is only
     attached when motion is allowed, so reduced-motion visitors never
     download it, and it only fades in once it can genuinely play - meaning a
     slow connection gets the photograph rather than a black rectangle.
     --------------------------------------------------------------------- */
  const stage = document.querySelector('.hero-media');
  const vid = stage && stage.querySelector('.hero-vid');
  const conn = navigator.connection;
  const thrifty = conn && (conn.saveData || /^([23]g|slow-2g)$/.test(conn.effectiveType || ''));

  if (vid && vid.dataset.src && !thrifty && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    /* The clip does not loop cleanly on its own - after five seconds the grass
       is nowhere near where it started, so a plain `loop` snaps. Instead two
       copies of the same file run half a cycle apart and cross-fade, so
       whichever one is about to hit its own seam is already invisible. The
       browser fetches the file once and both elements share it. */
    const twin = vid.cloneNode();
    twin.classList.add('hero-vid-b');
    stage.appendChild(twin);

    const pair = [vid, twin];
    const FADE = 0.9;                                   // seconds of overlap

    let raf = 0;
    const mix = () => {
      const d = vid.duration;
      if (d && isFinite(d)) {
        for (const v of pair) {
          const t = v.currentTime;
          // full opacity in the middle of the clip, zero at either seam
          const edge = Math.min(t, d - t);
          v.style.opacity = String(Math.max(0, Math.min(1, edge / FADE)));
        }
      }
      raf = requestAnimationFrame(mix);
    };

    let started = 0;
    const start = (v) => () => {
      if (v.dataset.on) return;
      v.dataset.on = '1';
      v.play().then(() => {
        // offset the second copy by half a cycle so the seams never coincide
        if (v === twin && isFinite(v.duration)) v.currentTime = v.duration / 2;
        if (++started === 2) {
          stage.classList.add('vid-ready');
          if (!raf) raf = requestAnimationFrame(mix);
        }
      }).catch(() => {});                               // refused autoplay keeps the still
    };

    pair.forEach(v => {
      v.addEventListener('canplay', start(v), { once: true });
      v.loop = true;
      v.preload = 'auto';
      v.src = v.dataset.src;
    });

    // stop decoding two video streams while the hero is off screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) {
          pair.forEach(v => v.play().catch(() => {}));
          if (!raf) raf = requestAnimationFrame(mix);
        } else {
          pair.forEach(v => v.pause());
          cancelAnimationFrame(raf); raf = 0;
        }
      }), { threshold: 0 }).observe(stage);
    }
  }

  /* ---------------------------------------------------------------------
     1. MASTHEAD - background once you leave the hero, tone per section
     --------------------------------------------------------------------- */
  const nav = document.querySelector('.masthead');
  const toned = [...document.querySelectorAll('[data-tone]')];

  if (nav) {
    let ticking = false;
    const update = () => {
      nav.classList.toggle('stuck', window.scrollY > 32);

      if (!toned.length) return;
      const line = 56;                       // just under the bar
      let active = null;
      for (const s of toned) {
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) { active = s; break; }
      }
      if (!active) return;
      const dark = active.dataset.tone === 'dark';
      nav.style.setProperty('--nav-fg', dark ? 'var(--on-dark)' : 'var(--ink)');
      nav.style.setProperty('--nav-bg', dark ? 'var(--dark)' : 'var(--paper)');
      nav.style.setProperty('--nav-rule', dark ? 'var(--rule-dark)' : 'var(--rule)');
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------
     2. ENQUIRY FORM
     Composes a real email in the visitor's own mail app. No endpoint is
     pretended, and nothing reports success that did not happen.
     --------------------------------------------------------------------- */
  const form = document.getElementById('enquiry');
  if (!form) return;

  const status = document.getElementById('status');
  const to = form.dataset.to || 'hello@trtechnologies.com.au';

  const fail = (msg, field) => {
    status.dataset.state = 'err';
    status.textContent = msg;
    form.elements[field]?.focus();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get('name') || '').toString().trim();
    const email = (d.get('email') || '').toString().trim();
    const kind = (d.get('kind') || '').toString();
    const brief = (d.get('brief') || '').toString().trim();

    if (!name) return fail('Add your name so we know who we are replying to.', 'name');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail('Add an email address we can reply to.', 'email');
    if (brief.length < 10) return fail('Tell us a little about the business and what is not working.', 'brief');

    const subject = `Enquiry: ${kind || 'Project'} (${name})`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Looking for: ${kind}`, '', brief].join('\n');

    status.dataset.state = '';
    status.textContent = 'Opening your email app with this filled in. Send it there and it comes straight to us.';
    location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
