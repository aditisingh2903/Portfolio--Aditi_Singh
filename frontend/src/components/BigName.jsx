import { motion } from 'framer-motion';
export default function BigName({ text = 'ADITI SINGH' }) {
  const letters = text.split('');
  return (
    <div className="flex justify-center gap-1 sm:gap-2 overflow-hidden select-none">
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ delay: 0.05 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold leading-none text-[14vw] md:text-[10vw] tracking-mega"
        >
          {l === ' ' ? '\u00A0' : l}
        </motion.span>
      ))}
    </div>
  );
}
