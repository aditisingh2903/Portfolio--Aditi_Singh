import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    requestAnimationFrame(tick);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 -ml-4 h-8 w-8 rounded-full border border-accent/60 z-[9998] mix-blend-difference" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 -ml-1 h-2 w-2 rounded-full bg-accent z-[9999]" />
    </>
  );
}
