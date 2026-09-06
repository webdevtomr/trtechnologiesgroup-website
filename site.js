/* ==========================================================================
   TR TECHNOLOGIES GROUP - interaction

   Six things, in this order:

     0. hero video      the grass moves, cross-faded so the loop has no seam
     1. reveals         line splitting, then one observer for every entrance
     2. parallax        one rAF loop, transform only, off when out of view
     3. masthead        tone, hide-on-read, and which section you are in
     4. mobile menu     full screen, focus trapped, Esc and backdrop
     5. clock + form    the Perth time in the hero, and a real mailto

   No animation library. Everything here is IntersectionObserver, one
   requestAnimationFrame loop and CSS custom properties - the transitions
   themselves all live in site.css, so this file never animates anything
   frame by frame except the two things that genuinely need to be
   (the video cross-fade and the parallax offset).

   Every part is optional. With this file absent, or with JavaScript off, the
   page renders complete and every control still works - the reveal styles in
   site.css are scoped to .js, which is only set when script is running.
   ========================================================================== */
(() => {
  'use strict';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const moves = () => !reduce.matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------------------------------------------------------------
     0. HERO VIDEO - the grass moves, nothing else does
     The still photograph is what the markup ships. The video source is only
     attached when motion is allowed, so reduced-motion visitors never
     download it, and it only fades in once it can genuinely play - meaning a
     slow connection gets the photograph rather than a black rectangle.
     --------------------------------------------------------------------- */
  const stage = $('.hero-media');
  const vid = stage && $('.hero-vid', stage);
  const conn = navigator.connection;
  const thrifty = conn && (conn.saveData || /^([23]g|slow-2g)$/.test(conn.effectiveType || ''));

  if (vid && vid.dataset.src && !thrifty && moves()) {
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
     1. REVEALS

     [data-mask] headings are cut into their rendered lines, so the wipe
     follows the wrap rather than a guess at it. That has to happen after the
     webfont has settled, or the split is measured against the fallback face
     and the lines come out wrong - hence the wait on document.fonts, capped
     so a font that never arrives cannot hold the page hostage.

     The original markup of every split heading is kept, so a resize can
     re-cut it from the source rather than from an already-cut copy.
     --------------------------------------------------------------------- */
  const source = new WeakMap();

  const splitLines = (el) => {
    if (!source.has(el)) source.set(el, el.innerHTML);
    else el.innerHTML = source.get(el);

    // Tokenise on whitespace, not on node boundaries. An element child (the
    // accent word) is carried across whole so its markup survives, and
    // anything butted straight up against it with no space - the full stop
    // after "going" - joins that same token rather than becoming a word of
    // its own with a gap in front of it.
    const frag = document.createDocumentFragment();
    let open = null;                                  // the token still accepting
    const add = (node, join) => {
      if (join && open) { open.appendChild(node); return; }
      open = document.createElement('span');
      open.className = 'w';
      open.appendChild(node);
      frag.appendChild(open);
      frag.appendChild(document.createTextNode(' '));
    };

    let spaced = true;                                // nothing to join to yet
    for (const n of [...el.childNodes]) {
      if (n.nodeType === 3) {
        const raw = n.textContent;
        if (!raw) continue;
        let join = !spaced && !/^\s/.test(raw);
        for (const part of raw.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { join = false; continue; }
          add(document.createTextNode(part), join);
          join = false;
        }
        spaced = /\s$/.test(raw);
      } else if (n.nodeType === 1) {
        add(n.cloneNode(true), !spaced);
        spaced = false;
      }
    }
    el.replaceChildren(frag);

    // Group the words by the line they landed on, then rebuild each line as
    // a clip with one moving child.
    const words = $$(':scope > .w', el);
    if (!words.length) return;

    const lines = [];
    let top = null, cur = null;
    for (const w of words) {
      const t = w.offsetTop;
      if (top === null || Math.abs(t - top) > 2) { cur = []; lines.push(cur); top = t; }
      cur.push(w);
    }

    const out = document.createDocumentFragment();
    lines.forEach((ws, i) => {
      const ln = document.createElement('span');
      ln.className = 'ln';
      ln.style.setProperty('--i', i);
      const inner = document.createElement('span');
      inner.className = 'ln-i';
      ws.forEach((w, j) => {
        if (j) inner.appendChild(document.createTextNode(' '));
        while (w.firstChild) inner.appendChild(w.firstChild);
      });
      ln.appendChild(inner);
      out.appendChild(ln);
    });
    el.replaceChildren(out);
  };

  const masks = $$('[data-mask]');
  const cutAll = () => masks.forEach(splitLines);

  const revealable = $$('[data-rise],[data-mask],[data-clip]');
  const light = (el) => el.classList.add('in');

  const watch = () => {
    if (!('IntersectionObserver' in window) || !moves()) { revealable.forEach(light); return; }
    const io = new IntersectionObserver((entries, o) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        light(e.target);
        o.unobserve(e.target);          // an entrance happens once
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    revealable.forEach(el => io.observe(el));
  };

  /* The hero is choreographed rather than observed: it is on screen already,
     so it opens on its own timing the moment the type is ready. */
  const hero = $('.hero');
  const begin = () => {
    if (moves()) cutAll();
    else masks.forEach(el => el.classList.add('in'));
    hero && hero.classList.add('lit');
    watch();
  };

  if (moves() && document.fonts && document.fonts.ready) {
    // capped, so a font that never resolves cannot hold the reveal
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 700))]).then(begin);
  } else {
    begin();
  }

  /* re-cut on a real width change only - a phone hiding its URL bar changes
     the height constantly and must not retrigger a split */
  let lastW = innerWidth, cutTimer = 0;
  addEventListener('resize', () => {
    if (innerWidth === lastW || !moves()) return;
    lastW = innerWidth;
    clearTimeout(cutTimer);
    cutTimer = setTimeout(cutAll, 180);
  }, { passive: true });

  /* ---------------------------------------------------------------------
     2. PARALLAX

     One loop, three elements, transform only. Offsets are computed from
     scrollY against a cached document position, so the loop never reads
     layout and never forces one. It is started and stopped by the hero
     leaving the viewport, so it costs nothing for most of the page.
     --------------------------------------------------------------------- */
  const heroIn = $('.hero-in');
  const parts = $$('[data-par]').map(el => ({ el, f: parseFloat(el.dataset.par) || 0, base: 0 }));

  if (moves() && parts.length) {
    let pRaf = 0, live = false;

    /* base is the scroll position at which an element sits at zero offset:
       the moment it first enters the viewport, or straight away for anything
       already on screen at the top of the document. Without it, a hero
       element would start life pushed off its own layout position. */
    const measure = () => {
      const sy = scrollY;
      for (const p of parts) {
        const top = p.el.getBoundingClientRect().top + sy;
        p.base = Math.max(0, top - innerHeight);
      }
    };

    const draw = () => {
      const sy = scrollY;
      for (const p of parts) {
        const travel = Math.max(0, sy - p.base) * p.f;
        p.el.style.setProperty('--par', travel.toFixed(2) + 'px');
      }
      if (heroIn && hero) {
        // the copy leaves a touch faster than the page, and is gone before
        // the section below it arrives
        const h = hero.offsetHeight || 1;
        heroIn.style.opacity = String(Math.max(0, 1 - (sy / h) * 1.65));
      }
      pRaf = live ? requestAnimationFrame(draw) : 0;
    };

    const run = (on) => {
      if (on === live) return;
      live = on;
      for (const p of parts) p.el.style.willChange = on ? 'transform' : '';
      if (on && !pRaf) pRaf = requestAnimationFrame(draw);
      if (!on) { cancelAnimationFrame(pRaf); pRaf = 0; }
    };

    measure();
    draw();
    addEventListener('resize', () => { measure(); if (!live) draw(); }, { passive: true });

    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => run(e.isIntersecting), { threshold: 0 }).observe(hero);
    } else {
      run(true);
    }
  }

  /* ---------------------------------------------------------------------
     3. MASTHEAD
     Takes the tone of the section behind it, marks the section you are
     actually in, and gets out of the way while you are reading downward.
     --------------------------------------------------------------------- */
  const nav = $('.masthead');
  const toned = $$('[data-tone]');
  const spy = $$('.nav-link[href*="#"]');

  if (nav) {
    const target = new Map();          // section id -> the links pointing at it
    for (const a of spy) {
      const id = (a.getAttribute('href') || '').split('#')[1];
      if (!id) continue;
      if (!target.has(id)) target.set(id, []);
      target.get(id).push(a);
    }

    let ticking = false, last = 0, current = '', hold = 0;

    /* Following a link from the bar is a scroll downward, and the bar must
       not answer that by hiding itself - so a click parks the hide logic for
       as long as the smooth scroll takes. */
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (a && a.getAttribute('href').includes('#')) hold = performance.now() + 1300;
    }, true);

    const update = () => {
      const sy = scrollY;
      nav.classList.toggle('stuck', sy > 32);

      // hide while reading down, return the moment you scroll up
      if (performance.now() < hold) nav.classList.remove('away');
      else if (sy > 460 && sy > last + 4) nav.classList.add('away');
      else if (sy < last - 4 || sy <= 460) nav.classList.remove('away');
      last = sy;

      if (!toned.length) return;

      /* Two lines, not one. Tone is sampled just under the bar, because that
         is the pixel the bar actually sits on. The section marked in the nav
         is sampled just under scroll-padding-top, so that landing on an
         anchor marks the section you asked for rather than the one above it. */
      const pick = (line) => {
        for (const s of toned) {
          const r = s.getBoundingClientRect();
          if (r.top <= line && r.bottom > line) return s;
        }
        return null;
      };
      const active = pick(44);
      const here = pick(94) || active;
      if (!active) return;

      const dark = active.dataset.tone === 'dark';
      nav.classList.toggle('tone-dark', dark);   // flips the ink mark to white
      nav.style.setProperty('--nav-fg', dark ? 'var(--on-dark)' : 'var(--ink)');
      nav.style.setProperty('--nav-bg', dark ? 'var(--dark)' : 'var(--paper)');
      nav.style.setProperty('--nav-rule', dark ? 'var(--rule-dark)' : 'var(--rule)');

      const id = (here && here.id) || '';
      if (id !== current) {
        for (const a of spy) a.removeAttribute('aria-current');
        (target.get(id) || []).forEach(a => a.setAttribute('aria-current', 'true'));
        current = id;
      }
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
     4. MOBILE MENU
     A full screen rather than a dropdown. Closed, it is visibility:hidden
     and inert, so it is out of the tab order and out of the accessibility
     tree without needing to be display:none - which is what lets it animate.
     --------------------------------------------------------------------- */
  const burger = $('.burger');
  const menu = $('.menu');

  if (burger && menu) {
    const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';
    let open = false, scrollY0 = 0;

    const setOpen = (want) => {
      if (want === open) return;
      open = want;
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.inert = !open;

      if (open) {
        scrollY0 = scrollY;
        const first = $(FOCUSABLE, menu);
        first && first.focus({ preventScroll: true });
      } else {
        burger.focus({ preventScroll: true });
        void scrollY0;
      }
    };

    menu.inert = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', () => setOpen(!open));

    // any destination closes it, including the in-page anchors
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

    addEventListener('keydown', (e) => {
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const items = $$(FOCUSABLE, menu).filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    });

    // a resize past the breakpoint must not strand the page in nav-open
    matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------------------------------------------------------------------
     5a. THE CLOCK
     Perth time, taken from the visitor's own clock and rendered in the
     studio's timezone - so it is right wherever it is read from. The dot
     beside it is green only during the hours the site says we work; a light
     that is always on is a light that means nothing.
     --------------------------------------------------------------------- */
  const clocks = $$('[data-clock]');
  const dots = $$('[data-hours]');

  if (clocks.length || dots.length) {
    const OPEN = 8 * 60, SHUT = 17 * 60 + 30;         // 08:00-17:30 AWST, Mon-Fri
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Perth', weekday: 'short',
        hour: '2-digit', minute: '2-digit', hour12: false,
      });
    } catch { fmt = null; }

    if (fmt) {
      const tick = () => {
        const part = {};
        for (const p of fmt.formatToParts(new Date())) part[p.type] = p.value;
        const time = `${part.hour}:${part.minute}`;
        for (const el of clocks) el.textContent = time;

        const mins = (+part.hour) * 60 + (+part.minute);
        const weekday = !/^(sat|sun)/i.test(part.weekday || '');
        const openNow = weekday && mins >= OPEN && mins < SHUT;
        for (const el of dots) {
          el.dataset.state = openNow ? 'open' : 'shut';
          const say = el.parentElement && el.parentElement.querySelector('.sr');
          if (say) say.textContent = openNow ? 'The studio is open now.' : 'Outside working hours.';
        }
      };
      tick();
      setInterval(tick, 20000);
    }
  }

  /* ---------------------------------------------------------------------
     5b. ENQUIRY FORM
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
