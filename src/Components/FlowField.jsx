import { useEffect, useRef } from 'react';

// An interactive flow field for the hero background. Particles drift along an
// evolving vector field; the cursor stirs the current; a handful of notes are
// hidden in the field and surface as you pass them; typing "akv" resolves the
// whole field into the monogram, then releases it back into flow.
//
// The canvas is a transparent overlay (destination-out fade) that sits BEHIND
// the hero content with pointer-events:none, so it never blocks the buttons and
// the cursor-spotlight glow still shows through. Cursor is tracked at the window
// level and mapped into canvas space.
//
// `ambient` (mobile) runs the flow alone: no cursor, notes, or monogram, and
// fewer particles. The animation pauses whenever the hero scrolls out of view.

const CYAN = 'rgba(97,185,206,';
const WHITE = 'rgba(228,231,235,';

// Notes live in the open right-hand space so they never collide with the name.
const NOTES = [
  { nx: 0.70, ny: 0.15, t: 'critical thinking over vibes' },
  { nx: 0.58, ny: 0.28, t: 'ships it, then makes it good' },
  { nx: 0.82, ny: 0.40, t: 'new stack? give me a day' },
  { nx: 0.60, ny: 0.52, t: 'built the payments dashboard, solo' },
  { nx: 0.82, ny: 0.64, t: 'forward deployed: I sit with the customer' },
  { nx: 0.58, ny: 0.76, t: 'Delhi, open to everywhere' },
  { nx: 0.78, ny: 0.87, t: 'runs on caffeine and Claude Code' },
];

export default function FlowField({ className = '', ambient = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cnv = canvasRef.current;
    if (!cnv) return;
    const ctx = cnv.getContext('2d');
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, raf = null, t = 0, mode = 'flow', hold = 0, buf = '';
    let particles = [];
    const mouse = { x: -1e4, y: -1e4, on: false };
    const notes = NOTES.map(n => ({ ...n, a: 0, x: 0, y: 0 }));

    function fit() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cnv.getBoundingClientRect();
      W = r.width; H = r.height;
      cnv.width = Math.max(1, Math.round(W * dpr));
      cnv.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(ambient ? 1400 : 3400, Math.round(W * H / (ambient ? 360 : 240)));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        c: Math.random() < 0.07, tx: 0, ty: 0, live: true,
      }));
      notes.forEach(nn => { nn.x = nn.nx * W; nn.y = nn.ny * H; });
    }
    fit();

    const field = (x, y) => (Math.sin(x * 0.007 + t) + Math.sin(y * 0.009 - t * 0.8)
                           + Math.sin((x + y) * 0.004 + t * 0.5)) * Math.PI;

    function buildTargets(text) {
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const o = off.getContext('2d');
      o.fillStyle = '#fff';
      o.textAlign = 'center'; o.textBaseline = 'middle';
      const size = Math.min(W * 0.24, H * 0.4);
      o.font = `800 ${size}px 'Bricolage Grotesque', system-ui, sans-serif`;
      // Form the monogram out in the open right-hand space, clear of the name
      // and the left-fade legibility mask.
      o.fillText(text, W * 0.68, H * 0.5);
      const img = o.getImageData(0, 0, W | 0, H | 0).data;
      const pts = [];
      for (let y = 0; y < H; y += 5)
        for (let x = 0; x < W; x += 5)
          if (img[((y | 0) * (W | 0) + (x | 0)) * 4 + 3] > 128) pts.push([x, y]);
      const N = particles.length;
      let chosen = pts;
      if (pts.length > N) {
        chosen = [];
        const stride = pts.length / N;
        for (let i = 0; i < N; i++) chosen.push(pts[Math.floor(i * stride)]);
      }
      for (let i = chosen.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
      }
      particles.forEach((p, i) => {
        if (i < chosen.length) { p.tx = chosen[i][0]; p.ty = chosen[i][1]; p.live = true; }
        else p.live = false;
      });
    }
    function triggerMorph(text) { buildTargets(text); mode = 'morph'; hold = 0; }

    function flowFrame() {
      t += 0.0015;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.04)'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';

      if (!ambient) {
        for (const nn of notes) {
          const d = Math.hypot(mouse.x - nn.x, mouse.y - nn.y);
          nn.a += (((mouse.on && d < 150) ? 1 : 0) - nn.a) * 0.07;
          ctx.beginPath(); ctx.arc(nn.x, nn.y, 1.6 + nn.a * 2.4, 0, 6.2832);
          ctx.fillStyle = CYAN + (0.22 + 0.6 * nn.a) + ')'; ctx.fill();
          if (nn.a > 0.02) {
            const right = nn.nx > 0.68;
            ctx.font = '12.5px ui-monospace, SFMono-Regular, Menlo, monospace';
            ctx.textAlign = right ? 'end' : 'start';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = WHITE + (0.9 * nn.a) + ')';
            ctx.fillText(nn.t, nn.x + (right ? -14 : 14), nn.y);
          }
        }
      }

      for (const p of particles) {
        const a = field(p.x, p.y);
        let vx = Math.cos(a), vy = Math.sin(a);
        if (mouse.on) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < 150) {
            const f = 1 - d / 150;
            vx += (-dy / (d || 1)) * f * 1.7 + (dx / (d || 1)) * f * 0.5;
            vy += ( dx / (d || 1)) * f * 1.7 + (dy / (d || 1)) * f * 0.5;
          }
        }
        for (const nn of notes) {
          if (nn.a < 0.05) continue;
          const dx = nn.x - p.x, dy = nn.y - p.y, d = Math.hypot(dx, dy);
          if (d < 130) { vx += (dx / (d || 1)) * nn.a * 0.6; vy += (dy / (d || 1)) * nn.a * 0.6; }
        }
        const nx = p.x + vx, ny = p.y + vy;
        ctx.strokeStyle = p.c ? CYAN + '0.5)' : WHITE + '0.15)';
        ctx.lineWidth = p.c ? 0.9 : 0.7;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
        p.x = nx; p.y = ny;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) { p.x = Math.random() * W; p.y = Math.random() * H; }
      }
    }

    function morphFrame() {
      hold++;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        if (!p.live) continue;
        p.x += (p.tx - p.x) * 0.11; p.y += (p.ty - p.y) * 0.11;
        ctx.fillStyle = p.c ? CYAN + '0.9)' : WHITE + '0.85)';
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      if (hold > 200) { mode = 'flow'; ctx.clearRect(0, 0, W, H); }
    }

    // Cursor tracked at window level, mapped into canvas space (canvas is
    // pointer-events:none so it never intercepts clicks on the hero content).
    const onMove = e => {
      const r = cnv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.on = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= r.width && mouse.y <= r.height;
    };
    const onKey = e => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-6);
      if (buf.endsWith('akv')) triggerMorph('AKV');
      else if (buf.endsWith('aman')) triggerMorph('AMAN');
    };
    const onResize = () => fit();

    if (REDUCED) {
      for (let i = 0; i < 3; i++) flowFrame();
      if (!ambient) {
        for (const nn of notes) {
          ctx.beginPath(); ctx.arc(nn.x, nn.y, 2.2, 0, 6.2832);
          ctx.fillStyle = CYAN + '0.5)'; ctx.fill();
        }
      }
      return () => {};
    }

    window.addEventListener('resize', onResize);
    if (!ambient) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('keydown', onKey);
    }

    // Pause the animation whenever the hero scrolls out of view — saves battery,
    // and matters most on mobile where this runs as an ambient backdrop.
    let visible = true;
    const loop = () => {
      (mode === 'flow' ? flowFrame : morphFrame)();
      raf = visible ? requestAnimationFrame(loop) : null;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && raf === null) raf = requestAnimationFrame(loop);
    }, { threshold: 0 });
    io.observe(cnv);
    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      if (!ambient) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('keydown', onKey);
      }
    };
  }, [ambient]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
