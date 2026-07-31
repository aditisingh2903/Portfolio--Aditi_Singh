import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import TiltCard from '../components/TiltCard.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { FaTrophy, FaGraduationCap, FaMicrochip, FaCode } from 'react-icons/fa';

export default function About() {
  const { about, profile } = usePortfolio();
  const paragraphs = about?.paragraphs?.length ? about.paragraphs : [
    "I'm Aditi Singh — a CSE undergrad at Bhilai Institute of Technology, Durg building end-to-end software systems, from IoT sensor networks to AI-driven computer-vision applications.",
    "I turn ideas into shippable products: robust backends, clean React frontends, and edge-deployed ML models. My award-winning work spans smart-city IoT, sign-language translation, and assistive AI.",
  ];

  const cards = [
    {
      key: 'university',
      icon: <FaGraduationCap />,
      label: 'Education',
      short: 'Pursuing B.Tech in Computer Science & Engineering at BIT Durg, ranked among the top engineering institutions in the region.',
      long: (about?.paragraphs?.length ? about.paragraphs[0] : paragraphs[0]),
      stat: profile?.cpi || '8.34',
      statLabel: 'CPI',
    },
    {
      key: 'hackathon',
      icon: <FaTrophy />,
      label: 'Competitions',
      short: 'SIH 2025 Winner, 1st Place Code of the Phoenix & Business Plan Pitching, 1st Prize Tech X Survival — multiple hackathon wins.',
      long: 'Active hackathon competitor with multiple first-prize wins including Smart India Hackathon 2025 (Hardware Edition) and Code of the Phoenix. Proven ability to translate cutting-edge engineering into shipped solutions under pressure.',
      stat: '4+',
      statLabel: 'Wins',
    },
    {
      key: 'craft',
      icon: <FaMicrochip />,
      label: 'Craft',
      short: 'IoT sensor networks, edge-deployed sign language translation with MediaPipe + TensorFlow, and AI-powered medical report analysis.',
      long: paragraphs[0],
      stat: '99.89%',
      statLabel: 'ISL accuracy',
    },
  ];

  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeading eyebrow="about / 01" title="Building more than software." />
          <p className="max-w-md text-white/50 text-sm">{profile?.summary || paragraphs[0]}</p>
        </div>

        <div className="grid md:grid-cols-12 gap-5">
          {/* Portrait card */}
          <Reveal className="md:col-span-5 md:row-span-2">
            <TiltCard className="group h-full">
              <div className="relative h-full min-h-[26rem] glass rounded-2xl overflow-hidden">
                {about?.image
                  ? <img src={about.image} alt="Aditi Singh" className="h-full w-full object-cover" />
                  : <div className="h-full w-full grid-bg flex items-center justify-center text-white/30 text-sm">Portrait placeholder</div>}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-bg to-transparent">
                  <p className="num-label mb-1">Media</p>
                  <p className="font-display text-2xl font-bold">Aditi Singh</p>
                  <p className="text-white/60 text-sm">{profile?.tagline || 'CSE Undergrad • Full-Stack & AI/IoT Developer'}</p>
                </div>
                {profile?.resumeUrl && (
                  <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 chip hover:border-accent">Resume ↗</a>
                )}
              </div>
            </TiltCard>
          </Reveal>

          {/* Hover-to-read cards */}
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08} className="md:col-span-7 md:col-span-7">
              <TiltCard className="group h-full" maxTilt={6}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col justify-between min-h-[12rem] relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">{c.icon}</span>
                      <p className="num-label">{c.label}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold grad-text">{c.stat}</p>
                      <p className="text-xs text-white/40">{c.statLabel}</p>
                    </div>
                  </div>
                  <div className="relative h-16 mt-4 overflow-hidden">
                    <p className="text-sm text-white/70 absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">{c.short}</p>
                    <p className="text-sm text-white/80 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{c.long}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Stat strip */}
        {about?.stats?.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-6 glass rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {about.stats.map((s, i) => (
                <div key={i} className="px-4 first:pl-0">
                  <p className="font-display text-3xl md:text-4xl font-extrabold grad-text">{s.value}</p>
                  <p className="text-xs text-white/50 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Highlights */}
        {about?.highlights?.length > 0 && (
          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="num-label flex items-center">Winning moves</span>
              {about.highlights.map((h, i) => (
                <span key={i} className="chip flex items-center gap-2"><FaCode className="text-accent text-xs" /> {h}</span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
