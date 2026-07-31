import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Achievements() {
  const { achievements } = usePortfolio();
  return (
    <section id="achievements" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeading eyebrow="achievements / 06" title="Trophies & wins." />
          <p className="text-white/50 text-sm max-w-md">From the national Smart India Hackathon to regional pitching competitions — milestones I'm proud of.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <Reveal key={a._id || i} delay={i * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="card group p-6 h-full flex flex-col gap-4 relative overflow-hidden hover:border-accent/40">
                <div className="flex items-start justify-between">
                  <span className={'h-11 w-11 rounded-xl flex items-center justify-center ' + (a.rank === '1st' || a.rank === 'Winner' ? 'bg-amber-400/15 text-amber-300' : 'bg-accent/15 text-accent')}>
                    {a.rank === '1st' || a.rank === 'Winner' ? <FaTrophy className="text-lg" /> : <FaMedal className="text-lg" />}
                  </span>
                  {a.rank && <span className="chip">{a.rank}</span>}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug">{a.title}</h3>
                  {a.issuer && <p className="text-accent text-sm mt-1">{a.issuer}</p>}
                  {a.date && <p className="font-mono text-xs text-white/40 mt-1">{a.date}</p>}
                  {a.description && <p className="text-white/60 text-sm mt-3 line-clamp-3 group-hover:line-clamp-none transition">{a.description}</p>}
                </div>
                <span className="absolute -bottom-8 -right-6 font-display text-7xl font-extrabold text-white/[0.04] select-none">{String(i + 1).padStart(2, '0')}</span>
              </motion.div>
            </Reveal>
          ))}
          {achievements.length === 0 && <p className="text-white/40 text-sm">No achievements published yet.</p>}
        </div>
      </div>
    </section>
  );
}
