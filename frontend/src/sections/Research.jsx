import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { FaFileAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Research() {
  const { research } = usePortfolio();
  if (!research?.length) return null;
  return (
    <section id="research" className="section-pad">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="07" title="Research Papers" />
        <div className="grid sm:grid-cols-2 gap-4">
          {research.map((r, i) => (
            <Reveal key={r._id || i} delay={i * 0.06}>
              <div className="card h-full">
                <div className="flex items-start gap-3">
                  <FaFileAlt className="text-accent mt-1" />
                  <div>
                    {r.link ? <a href={r.link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent">{r.title}</a> : <h3 className="font-semibold">{r.title}</h3>}
                    {r.authors?.length > 0 && <p className="text-white/50 text-xs">{r.authors.join(', ')}</p>}
                    {r.journal && <p className="text-white/40 text-xs">{r.journal} - {r.year}</p>}
                    {r.abstract && <p className="text-white/60 text-sm mt-2">{r.abstract}</p>}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
