import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const { profile } = usePortfolio();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-bg-soft/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl font-bold"><span className="grad-text">Aditi</span> Singh</p>
          <p className="text-sm text-white/50 mt-1">{profile?.tagline || 'Full-Stack & AI/IoT Developer'}</p>
        </div>
        <div className="flex items-center gap-5 text-white/60">
          {profile?.socials?.filter(s => s.url).map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition" aria-label={s.label}>
              {s.icon === 'linkedin' ? <FaLinkedin /> : s.icon === 'github' ? <FaGithub /> : s.icon === 'twitter' ? <FaTwitter /> : '•'}
            </a>
          ))}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-accent transition"><FaEnvelope /></a>
          )}
        </div>
        <p className="text-xs text-white/40">© {year} Aditi Singh. All rights reserved.</p>
      </div>
    </footer>
  );
}
