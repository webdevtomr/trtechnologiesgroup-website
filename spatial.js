/* Original perspective field, developed from the approved Spatial study. */
(() => {
  'use strict';
  const hero = document.querySelector('.home-hero');
  const canvas = document.querySelector('#spatial-field');
  const ctx = canvas?.getContext('2d');
  if (!ctx || !hero) return;
  const pause = document.querySelector('#spatial-motion');
  const perspective = document.querySelector('#spatial-perspective');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let stopped = reduced.matches, visible = true, frame = 0, time = 0, last = 0;
  let w = 0, h = 0, view = 0, pointer = { x: 0, y: 0 }, position = { x: 0, y: 0 };
  document.querySelector('.motion-controls').hidden = false;
  function draw() {
    ctx.fillStyle = '#e4e4de'; ctx.fillRect(0, 0, w, h);
    const vx = w * (.5 + position.x * .08), vy = h * (.44 + position.y * .045);
    const speed = time * .09 + view * .17;
    for (let surface = 0; surface < 2; surface++) {
      for (let j = 34; j >= 0; j--) {
        const k = Math.pow(Math.max(0, 1 - (j + speed % 1) / 34), 2.1);
        const y = vy + (surface === 0 ? h - vy + 80 : -vy - 100) * k;
        ctx.beginPath(); ctx.moveTo(vx - w * .85 * k, y); ctx.lineTo(vx + w * .85 * k, y);
        ctx.strokeStyle = surface === 0 ? 'rgba(62,65,58,.27)' : 'rgba(62,65,58,.13)';
        ctx.lineWidth = .8; ctx.stroke();
      }
      for (let j = -22; j <= 22; j++) {
        ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(vx + j * w / 22, surface === 0 ? h + 80 : -100);
        ctx.strokeStyle = surface === 0 ? 'rgba(62,65,58,.23)' : 'rgba(62,65,58,.10)';
        ctx.lineWidth = .8; ctx.stroke();
      }
    }
    for (let j = 9; j >= 0; j--) {
      const k = Math.pow(1 - (j + speed % 1) / 11, 1.8);
      const halfW = w * .79 * k, halfH = h * .73 * k;
      const skew = Math.sin(time * .17 + j * .08) * 12 + position.x * 24;
      ctx.beginPath(); ctx.moveTo(vx - halfW + skew, vy - halfH);
      ctx.lineTo(vx + halfW + skew, vy - halfH); ctx.lineTo(vx + halfW - skew, vy + halfH);
      ctx.lineTo(vx - halfW - skew, vy + halfH); ctx.closePath();
      ctx.strokeStyle = j % 3 === 0 ? 'rgba(190,67,40,.65)' : 'rgba(47,53,43,.27)';
      ctx.lineWidth = j % 3 === 0 ? 2.1 : 1; ctx.stroke();
    }
  }
  function resize() {
    const bounds = hero.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = bounds.width; h = bounds.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  }
  function tick(now) {
    frame = 0;
    if (stopped || !visible || document.hidden) return;
    time += Math.min((now - last) / 1000 || 0, .035); last = now;
    position.x += (pointer.x - position.x) * .045; position.y += (pointer.y - position.y) * .045;
    draw(); frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame); frame = 0;
    pause.setAttribute('aria-pressed', String(stopped));
    pause.innerHTML = stopped ? 'Play motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    if (!stopped && visible && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(tick); }
    else draw();
  }
  pause.addEventListener('click', () => { stopped = !stopped; sync(); });
  perspective.addEventListener('click', () => {
    view = (view + 1) % 3; pointer = { x: [0, .7, -.7][view], y: [0, -.3, .3][view] };
    if (stopped) { position = { ...pointer }; draw(); }
  });
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || stopped) return;
    const box = hero.getBoundingClientRect();
    pointer = { x: (event.clientX - box.left) / w * 2 - 1, y: (event.clientY - box.top) / h * 2 - 1 };
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointer = { x: 0, y: 0 }; });
  reduced.addEventListener('change', () => { stopped = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: .01 }).observe(hero);
  new ResizeObserver(resize).observe(hero);
  resize(); sync();
})();
