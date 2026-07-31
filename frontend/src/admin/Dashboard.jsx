import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { fetchMany } from '../lib/api.js';
import CrudList from './CrudList.jsx';
import { ProfileEditor, AboutEditor, SeoEditor, Messages } from './SingleEditor.jsx';
import { ProjectForm, SkillForm, ExperienceForm, EducationForm, AchievementForm, ResearchForm, CertificationForm } from './forms.jsx';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects', endpoint: '/projects', form: ProjectForm, itemTitleKey: 'title', fields: ['subtitle', 'featured'] },
  { id: 'skills', label: 'Skills', endpoint: '/skills', form: SkillForm, itemTitleKey: 'category', fields: ['items'] },
  { id: 'experience', label: 'Experience', endpoint: '/experience', form: ExperienceForm, itemTitleKey: 'role', fields: ['organization', 'type', 'startDate', 'endDate'] },
  { id: 'education', label: 'Education', endpoint: '/education', form: EducationForm, itemTitleKey: 'institution', fields: ['degree', 'field', 'score', 'endDate'] },
  { id: 'achievements', label: 'Achievements', endpoint: '/achievements', form: AchievementForm, itemTitleKey: 'title', fields: ['issuer', 'date', 'rank'] },
  { id: 'research', label: 'Research', endpoint: '/research', form: ResearchForm, itemTitleKey: 'title', fields: ['journal', 'year'] },
  { id: 'certifications', label: 'Certifications', endpoint: '/certifications', form: CertificationForm, itemTitleKey: 'title', fields: ['issuer', 'date'] },
  { id: 'seo', label: 'SEO' },
  { id: 'messages', label: 'Messages' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState('profile');
  const active = tabs.find((t) => t.id === tab);

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/10 bg-bg-soft p-4 flex flex-col">
        <Link to="/" className="font-display font-bold mb-6"><span className="grad-text">Aditi</span> Singh</Link>
        <nav className="flex-1 space-y-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={'w-full text-left px-3 py-2 rounded-lg text-sm transition ' + (tab === t.id ? 'bg-accent text-white' : 'text-white/60 hover:bg-white/5')}>{t.label}</button>
          ))}
        </nav>
        <button onClick={() => { logout(); nav('/admin/login'); }} className="mt-4 text-sm text-red-400 hover:text-red-300">Logout</button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-2xl font-bold">{active.label}</h1>
          <p className="text-sm text-white/50">{user?.email}</p>
        </div>
        <div className="max-w-3xl">
          {tab === 'profile' && <ProfileEditor />}
          {tab === 'about' && <AboutEditor />}
          {tab === 'seo' && <SeoEditor />}
          {tab === 'messages' && <Messages />}
          {active.endpoint && (
            <CrudList
              endpoint={active.endpoint}
              title={active.label}
              fields={active.fields}
              itemTitleKey={active.itemTitleKey}
              FormComponent={active.form}
            />
          )}
        </div>
      </main>
    </div>
  );
}
