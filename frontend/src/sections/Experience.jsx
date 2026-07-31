import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Experience() {
  const { experience } = usePortfolio();
  return (
    <section id="experience" className="section-pad relative">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <SectionHeading eyebrow="experience / 04" title="Milestones & wins." />
        </div>
        <div className="relative border-l-2 border-white/10 pl-8 space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e._id || i} delay={i * 0.08}>
              <div className="relative">
                <span className="absolute -left-[42px] top-1.5 h-4 w-4 rounded-full bg-accent animate-glow ring-4 ring-accent/20" />
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-display text-xl font-bold">{e.role}</h3>
                      <p className="text-accent text-sm">{e.organization}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-white/40">{e.startDate}{e.endDate && e.endDate !== e.startDate ? ` — ${e.endDate}` : ''}</p>
                      {e.type && <span className="chip mt-1 capitalize">{e.type}</span>}
                    </div>
                  </div>
                  {e.description?.map((d, j) => <p key={j} className="text-white/60 text-sm mt-3 leading-relaxed">{d}</p>)}
                </div>
              </div>
            </Reveal>
          ))}
          {experience.length === 0 && <p className="text-white/40 text-sm">No milestones yet.</p>}
        </div>
      </div>
    </section>
  );
}
