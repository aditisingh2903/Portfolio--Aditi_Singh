import Profile from '../models/Profile.js';
import About from '../models/About.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Achievement from '../models/Achievement.js';
import Certification from '../models/Certification.js';
import Research from '../models/Research.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const skills = ['projects', 'skills', 'about', 'experience', 'education', 'achievements', 'certifications', 'research', 'contact', 'resume', 'hello', 'hi', 'hey'];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export const chat = asyncHandler(async (req, res) => {
  const q = (req.body.message || '').toLowerCase().trim();
  if (!q) return res.json({ reply: 'Hi! Ask me about Aditi - projects, skills, experience, education, achievements, or contact.' });

  const profile = (await Profile.findOne()) || {};
  const about = (await About.findOne()) || {};

  if (/^(hi|hello|hey|yo|hola)/.test(q)) {
    return res.json({ reply: pick([
      `Hello! I am ${profile.name || 'Aditi'}'s assistant-bot. What would you like to know?`,
      'Hi there! Ask me about projects, skills, experience, or achievements.',
    ])});
  }
  if (q.includes('project')) {
    const projects = await Project.find({ published: true }).sort({ order: 1 }).limit(6);
    if (!projects.length) return res.json({ reply: 'No projects published yet.' });
    const lines = projects.map(p => `• ${p.title} - ${(p.description || '').slice(0, 90)}`);
    return res.json({ reply: `Here are some of Aditi's projects:\n${lines.join('\n')}` });
  }
  if (q.includes('skill')) {
    const skills = await Skill.find({ published: true }).sort({ order: 1 });
    const text = skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n');
    return res.json({ reply: `Aditi's skills:\n${text || 'Coming soon.'}` });
  }
  if (q.includes('about')) {
    return res.json({ reply: about.paragraphs?.[0] || (profile.summary || 'A CSE undergrad passionate about React, Django, IoT and AI.') });
  }
  if (q.includes('experience') || q.includes('internship') || q.includes('work')) {
    const exp = await Experience.find({ published: true }).sort({ order: 1 });
    const text = exp.map(e => `• ${e.role} @ ${e.organization} (${e.startDate || ''} - ${e.endDate || 'Present'})`).join('\n');
    return res.json({ reply: `Experience:\n${text || 'No published experience yet.'}` });
  }
  if (q.includes('education') || q.includes('study') || q.includes('college') || q.includes('degree')) {
    const ed = await Education.find({ published: true }).sort({ order: 1 });
    const text = ed.map(e => `• ${e.degree} - ${e.institution} (${e.score || ''})`).join('\n');
    return res.json({ reply: `Education:\n${text || 'No published education yet.'}` });
  }
  if (q.includes('achiev') || q.includes('award') || q.includes('hackathon')) {
    const ach = await Achievement.find({ published: true }).sort({ order: 1 });
    const text = ach.map(a => `• ${a.title}`).join('\n');
    return res.json({ reply: `Achievements:\n${text || 'No published achievements yet.'}` });
  }
  if (q.includes('certif')) {
    const c = await Certification.find({ published: true }).sort({ order: 1 });
    const text = c.map(x => `• ${x.title} - ${x.issuer || ''}`).join('\n');
    return res.json({ reply: `Certifications:\n${text || 'No published certifications yet.'}` });
  }
  if (q.includes('research') || q.includes('paper')) {
    const r = await Research.find({ published: true }).sort({ order: 1 });
    const text = r.map(x => `• ${x.title} (${x.year || ''})`).join('\n');
    return res.json({ reply: `Research:\n${text || 'No published research yet.'}` });
  }
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
    return res.json({ reply: `You can reach Aditi at ${profile.email || '2903singhaditi@gmail.com'} or phone ${profile.phone || '+91 6264434150'}.` });
  }
  if (q.includes('resume') || q.includes('cv')) {
    return res.json({ reply: profile.resumeUrl ? `Download resume here: ${profile.resumeUrl}` : 'Resume will be available soon.' });
  }
  return res.json({ reply: pick([
    "I can help with: projects, skills, experience, education, achievements, certifications, research, contact, and resume.",
    `I'm not sure about that. Try asking about ${pick(skills)}.`,
  ]) });
});
