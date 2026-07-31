import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '../components/Particles.jsx';
import BigName from '../components/BigName.jsx';
import Magnetic from '../components/Magnetic.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { FaArrowDown, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Hero() {
  const { profile } = usePortfolio();
  const roles = profile?.roles?.length ? profile.roles : ['Full-Stack Developer', 'AI/IoT Builder', 'SIH 2025 Winner', 'Computer Vision Engineer'];
  const [role, setRole] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, [roles.length]);
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden noise gradient-mesh pt-24">
      <div className="absolute inset-0 opacity-60"><Particles count={70} /></div>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] glow-orb bg-accent/40" />
      <div className="absolute -bottom-40 -right-40 h-[34rem] w-[34rem] glow-orb bg-accent-cyan/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 md:px-16 w-full flex-1 flex flex-col justify-center gap-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <p className="num-label mb-3">Hi, I'm</p>
          <div className="text-white/60 text-sm md:text-base max-w-md mb-2 font-mono">{profile?.email || '2903singhditi@gmail.com'} · {profile?.phone || '+91 6264434150'}</div>
        </motion.div>

        <BigName text="ADITI SINGH" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex items-center gap-3 h-12">
            <span className="num-label">Currently</span>
            <div className="overflow-hidden h-10">
              <motion.div key={role} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="font-display text-2xl md:text-3xl font-semibold grad-text whitespace-nowrap">
                {roles[role]}
              </motion.div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="flex items-center gap-3">
            <Magnetic onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-magnetic">View Work</Magnetic>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-ghost">Get In Touch</a>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-5 sm:px-8 md:px-16 pb-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/40">
            {profile?.socials?.filter(s => s.url).length ? profile.socials.filter(s => s.url).map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">{s.icon === 'linkedin' ? <FaLinkedin /> : s.icon === 'github' ? <FaGithub /> : <FaTwitter />}</a>
            )) : (
              <>
                <a href="mailto:2903singhaditi@gmail.com" className="hover:text-accent transition"><FaLinkedin /></a>
                <a href="#" className="hover:text-accent transition"><FaGithub /></a>
                <a href="#" className="hover:text-accent transition"><FaTwitter /></a>
              </>
            )}
          </div>
          <motion.button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="flex items-center gap-2 text-white/40 hover:text-accent text-sm font-mono">
            SCROLL <FaArrowDown className="text-xs" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
