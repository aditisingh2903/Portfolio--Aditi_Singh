import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';

export default function Education() {
  const { education } = usePortfolio();
  return (
    <section id="education" className="section-pad bg-bg-soft/30 relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeading eyebrow="education / 05" title="Where I learned." />
        </div>
        <div className="grid md:grid-cols-12 gap-5">
          {education.map((e, i) => (
            <Reveal key={e._id || i} delay={i * 0.1} className={i === 0 ? 'md:col-span-7' : 'md:col-span-5'}>
              <motion.div whileHover={{ y: -6 }} className="glass rounded-3xl p-7 h-full flex flex-col justify-between min-h-[16rem] relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <span className="h-12 w-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">{i === 0 ? <FaGraduationCap className="text-xl" /> : <FaSchool className="text-xl" />}</span>
                  <div className="text-right">
                    <p className="font-display text-4xl font-extrabold grad-text">{e.score}</p>
                    <p className="text-xs text-white/40">{e.scoreType || 'Score'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold leading-snug">{e.institution}</h3>
                  <p className="text-accent text-sm mt-1">{e.degree}{e.field ? `, ${e.field}` : ''}</p>
                  <p className="font-mono text-xs text-white/40 mt-2">{e.startDate} {e.endDate ? `— ${e.endDate}` : ''}</p>
                  {e.description?.length > 0 && <p className="text-white/60 text-sm mt-3">{e.description.join(' ')}</p>}
                </div>
                <span className="absolute -bottom-12 -right-12 font-display text-[12rem] font-extrabold text-white/[0.03] select-none">{String(i + 1).padStart(2, '0')}</span>
              </motion.div>
            </Reveal>
          ))}
          {education.length === 0 && <p className="text-white/40 text-sm">No education published yet.</p>}
        </div>
      </div>
    </section>
  );
}
