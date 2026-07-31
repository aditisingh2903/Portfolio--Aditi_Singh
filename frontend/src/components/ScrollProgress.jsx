import { motion } from 'framer-motion';
import { useScrollProgress } from '../hook/useScrollProgress.js';

export default function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9997] origin-left bg-gradient-to-r from-accent via-accent-cyan to-accent-pink"
      style={{ scaleX: p }}
    />
  );
}
