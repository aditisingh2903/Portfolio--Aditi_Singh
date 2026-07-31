import { FaStar } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import Marquee from '../components/Marquee.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Skills() {
  const { skills } = usePortfolio();
  const all = skills.flatMap((s) => s.items);
  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeading eyebrow="skills / 02" title="My tech stack." />
          <div className="hidden md:block">
            <div className="h-24 w-24 rounded-full border border-white/10 flex items-center justify-center relative">
              <span className="animate-spinSlow text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 [text-wrap:balance] px-3 text-center">craft · build · ship ·</span>
              <FaStar className="absolute text-accent" />
            </div>
          </div>
        </div>

        {all.length > 0 && (
          <div className="mb-14">
            <Marquee items={all.map((s, i) => (
              <span key={i} className="font-display text-3xl md:text-5xl font-bold text-white/[0.07] hover:text-accent/40 transition px-6 whitespace-nowrap">{s}</span>
            ))} />
            <div className="h-3" />
            <Marquee reverse items={all.map((s, i) => (
              <span key={i} className="font-display text-3xl md:text-5xl font-bold text-white/[0.07] hover:text-accent-cyan/40 transition px-6 whitespace-nowrap">{s}</span>
            ))} />
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => (
            <Reveal key={s._id || i} delay={i * 0.06}>
              <div className="card group p-6 h-full hover:-translate-y-1 hover:border-accent/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold">{s.category}</h3>
                  <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => <span key={it} className="chip group-hover:border-accent/40 group-hover:bg-accent/10 transition">{it}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
