import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const links = [
  ['About', 'about'], ['Projects', 'projects'], ['Skills', 'skills'], ['Achievements', 'achievements'], ['Contact', 'contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <motion.header initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 pt-4">
      <div className={'mx-auto max-w-7xl flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition ' + (scrolled ? 'glass shadow-soft' : 'bg-transparent')}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-lg font-bold tracking-tight flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent animate-glow" />
          <span className="grad-text">Aditi</span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)} className="text-sm text-white/70 hover:text-white transition relative group">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/admin" className="text-sm text-white/40 hover:text-white/80 transition hidden sm:block">Admin</Link>
          <MagneticLink onClick={go} id="contact" />
          <button className="md:hidden" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <div className="space-y-1.5">
              <span className={'block h-0.5 w-6 bg-white transition ' + (open ? 'translate-y-2 rotate-45' : '')} />
              <span className={'block h-0.5 w-6 bg-white transition ' + (open ? 'opacity-0' : '')} />
              <span className={'block h-0.5 w-6 bg-white transition ' + (open ? '-translate-y-2 -rotate-45' : '')} />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="md:hidden glass rounded-2xl mt-2 overflow-hidden">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map(([label, id]) => (
              <button key={id} onClick={() => go(id)} className="text-left text-white/80 hover:text-accent transition">{label}</button>
            ))}
            <Link to="/admin" className="text-white/40 hover:text-white/80">Admin</Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function MagneticLink({ onClick, id }) {
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onClick(id)} className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-bg px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-white transition">
      Let's Talk <FaArrowDown className="text-xs" />
    </motion.button>
  );
}
