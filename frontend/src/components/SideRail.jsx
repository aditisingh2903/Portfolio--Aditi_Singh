import { useEffect, useState } from 'react';
export default function SideRail() {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    function setP(p) { setPos(Math.min(1, Math.max(0, p))); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      <div className="h-40 w-px bg-white/10 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-accent" style={{ height: (pos * 100) + '%' }} />
      </div>
      <span className="font-mono text-[10px] text-white/40 [writing-mode:vertical-rl]">{Math.round(pos * 100)}%</span>
    </div>
  );
}
