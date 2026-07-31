import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children, className = '', strength = 0.35, as = 'button', ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const MotionTag = motion[as] || motion.button;
  function onMove(e) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.x + r.width / 2)) * strength;
    const y = (e.clientY - (r.y + r.height / 2)) * strength;
    setPos({ x, y });
  }
  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
