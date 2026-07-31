import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaVideo, FaStar, FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import TiltCard from '../components/TiltCard.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

const TYPES = ['IoT System', 'AI / CV', 'Full-Stack', 'ML / Detection'];

export default function Projects() {
  const { projects } = usePortfolio();
  const [active, setActive] = useState(null);
  return (
    <section id="projects" className="section-pad bg-bg-soft/30 relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeading eyebrow="projects / 03" title="Featured Work." />
          <p className="max-w-md text-white/50 text-sm">A curated selection of projects that made me confident in building real software — from smart-city IoT to AI on the edge.</p>
        </div>

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center text-white/40">No projects published yet — seed the database to populate this section.</div>
        ) : (
          <div className="space-y-6">
            {projects.map((p, i) => (
              <Reveal key={p._id || i} delay={i * 0.06}>
                <TiltCard className="group" maxTilt={4}>
                  <button onClick={() => setActive(p)} className="w-full text-left">
                    <div className="glass rounded-3xl overflow-hidden grid md:grid-cols-12 hover:border-accent/40 transition">
                      <div className="md:col-span-5 relative aspect-video md:aspect-auto md:min-h-[20rem] overflow-hidden">
                        {p.image
                          ? <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                          : <div className="h-full w-full grid-bg flex items-center justify-center text-white/25 text-sm">Image placeholder</div>}
                        <div className="absolute top-4 left-4 chip bg-bg/70">{TYPES[i % TYPES.length]}</div>
                        {p.featured && <div className="absolute top-4 right-4 chip text-amber-300 bg-bg/70 border-amber-400/30 flex items-center gap-1"><FaStar className="text-amber-400" /> Featured</div>}
                      </div>
                      <div className="md:col-span-7 p-8 flex flex-col justify-between min-h-[20rem]">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-sm text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                            <span className="h-px flex-1 bg-white/10" />
                          </div>
                          <h3 className="font-display text-2xl md:text-4xl font-extrabold leading-tight mb-2">{p.title}</h3>
                          {p.subtitle && <p className="text-accent text-sm md:text-base">{p.subtitle}</p>}
                          <p className="text-white/60 text-sm mt-4 max-w-lg line-clamp-3">{p.description}</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {p.techStack?.map((t) => <span key={t} className="chip">{t}</span>)}
                          </div>
                        </div>
                        <div className="mt-6 flex items-center gap-4 text-sm">
                          <span className="text-accent font-semibold flex items-center gap-1 group-hover:gap-2 transition">View details <FaArrowRight className="text-xs" /></span>
                          {p.links?.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-white/50 hover:text-white"><FaGithub /></a>}
                          {p.links?.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-white/50 hover:text-white"><FaExternalLinkAlt /></a>}
                        </div>
                      </div>
                    </div>
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }} onClick={e => e.stopPropagation()} className="glass rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto">
              {active.image ? (
                <div className="aspect-video overflow-hidden rounded-t-3xl"><img src={active.image} alt={active.title} className="h-full w-full object-cover" /></div>
              ) : <div className="aspect-video grid-bg rounded-t-3xl flex items-center justify-center text-white/25 text-sm">Image placeholder</div>}
              <div className="p-7 md:p-9">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="num-label mb-2">Project</p>
                    <h3 className="font-display text-3xl md:text-4xl font-extrabold">{active.title}</h3>
                    {active.subtitle && <p className="text-accent mt-1">{active.subtitle}</p>}
                  </div>
                  <button onClick={() => setActive(null)} className="text-white/60 hover:text-white text-xl">×</button>
                </div>
                {active.longDescription?.length > 0 && (
                  <ul className="space-y-3 my-6">
                    {active.longDescription.map((d, i) => (
                      <li key={i} className="text-white/70 text-sm flex gap-3"><span className="text-accent mt-1">▹</span>{d}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 mb-6">{active.techStack?.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                <div className="flex gap-3 flex-wrap">
                  {active.links?.github && <a href={active.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm"><FaGithub /> Code</a>}
                  {active.links?.live && <a href={active.links.live} target="_blank" rel="noopener noreferrer" className="btn-magnetic text-sm"><FaExternalLinkAlt /> Live</a>}
                  {active.links?.video && <a href={active.links.video} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm"><FaVideo /> Video</a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
