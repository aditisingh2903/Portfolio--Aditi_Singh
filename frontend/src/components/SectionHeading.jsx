import { motion } from 'framer-motion';
export default function SectionHeading({ eyebrow, title, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
      className={`mb-10 ${align === 'center' ? 'text-center' : ''}`}
    >
      {eyebrow && <p className="text-sm uppercase tracking-[0.25em] text-accent/70 mb-2">{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-5xl font-bold">{title}</h2>
      <div className={`mt-4 h-1 w-16 bg-gradient-to-r from-accent to-accent-cyan rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
