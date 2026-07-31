import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { FaCertificate } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Certifications() {
  const { certifications } = usePortfolio();
  if (!certifications?.length) return null;
  return (
    <section id="certifications" className="section-pad bg-bg-soft/30">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="08" title="Certifications" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <Reveal key={c._id || i} delay={i * 0.06}>
              <div className="card h-full">
                {c.image && <img src={c.image} alt={c.title} className="rounded-lg mb-3 w-full h-32 object-cover" />}
                <div className="flex items-start gap-2">
                  <FaCertificate className="text-accent mt-1" />
                  <div>
                    {c.link ? <a href={c.link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent">{c.title}</a> : <h3 className="font-semibold">{c.title}</h3>}
                    {c.issuer && <p className="text-white/50 text-xs">{c.issuer}</p>}
                    {c.date && <p className="text-white/40 text-xs">{c.date}</p>}
                    {c.credentialId && <p className="text-white/40 text-xs mt-1">ID: {c.credentialId}</p>}
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
