import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { sendMessage } from '../lib/api.js';

export default function Contact() {
  const { profile } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, ok: null, err: null });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, err: null });
    try {
      await sendMessage(form);
      setForm({ name: '', email: '', subject: '', message: '' });
      setStatus({ loading: false, ok: 'Message sent successfully!', err: null });
    } catch (err) {
      setStatus({ loading: false, ok: null, err: err.response?.data?.message || 'Failed to send message' });
    }
  };

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="09" title="Get In Touch" align="center" />
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="space-y-5">
              {profile?.email && <a href={`mailto:${profile.email}`} className="flex items-center gap-4 glass rounded-xl p-4 hover:border-accent transition"><FaEnvelope className="text-accent text-xl" /><span>{profile.email}</span></a>}
              {profile?.phone && <div className="flex items-center gap-4 glass rounded-xl p-4"><FaPhone className="text-accent text-xl" /><span>{profile.phone}</span></div>}
              {profile?.location && <div className="flex items-center gap-4 glass rounded-xl p-4"><FaMapMarkerAlt className="text-accent text-xl" /><span>{profile.location}</span></div>}
              <div className="flex gap-4 pt-2">
                {profile?.socials?.filter(s => s.url).map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full glass flex items-center justify-center hover:scale-110 hover:border-accent transition" aria-label={s.label}>
                    {s.icon === 'linkedin' ? <FaLinkedin /> : s.icon === 'github' ? <FaGithub /> : s.icon === 'twitter' ? <FaTwitter /> : '•'}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="glass rounded-2xl p-6 space-y-4">
              <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent resize-none" placeholder="Your Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={status.loading} className="btn-primary w-full">{status.loading ? 'Sending...' : 'Send Message'}</motion.button>
              {status.ok && <p className="text-emerald-400 text-sm text-center">{status.ok}</p>}
              {status.err && <p className="text-red-400 text-sm text-center">{status.err}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
