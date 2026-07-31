import { useEffect, useState } from 'react';
import api, { fetchOne, saveOne, fetchMany, uploadResume } from '../lib/api.js';
import GenericForm from './GenericForm.jsx';


export function ProfileEditor() {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = async () => { const d = await fetchOne('/profile'); setData(d); };
  useEffect(() => { load(); }, []);
  if (!data) return <p>Loading...</p>;
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold">Profile</h2>
      <GenericForm initial={data} onSave={async (fd) => { await saveOne('/profile', fd); load(); alert('Saved'); }} onCancel={() => load()} schema={[
        { key: 'name', type: 'text', label: 'Name' },
        { key: 'tagline', type: 'text', label: 'Tagline' },
        { key: 'roles', type: 'array', label: 'Roles (array)' },
        { key: 'phone', type: 'text', label: 'Phone' },
        { key: 'email', type: 'text', label: 'Email' },
        { key: 'location', type: 'text', label: 'Location' },
        { key: 'summary', type: 'textarea', label: 'Summary' },
        { key: 'avatar', type: 'image', label: 'Avatar' },
        { key: 'socials', type: 'array', label: 'Socials (array of {label,url,icon})' },
        { key: 'cpi', type: 'text', label: 'CPI' },
      ]} />
      <ResumeUpload current={data.resumeUrl || ''} onChanged={load} />
    </div>
  );
}

export function AboutEditor() {
  const [data, setData] = useState(null);
  const load = async () => { const d = await fetchOne('/about'); setData(d); };
  useEffect(() => { load(); }, []);
  if (!data) return <p>Loading...</p>;
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold">About</h2>
      <GenericForm initial={data} onSave={async (fd) => { await saveOne('/about', fd); load(); alert('Saved'); }} onCancel={() => load()} schema={[
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'paragraphs', type: 'array', label: 'Paragraphs (array)' },
        { key: 'image', type: 'image', label: 'Image' },
        { key: 'highlights', type: 'array', label: 'Highlights (array)' },
        { key: 'stats', type: 'array', label: 'Stats (array of {label,value})' },
      ]} />
    </div>
  );
}

export function SeoEditor() {
  const [data, setData] = useState(null);
  const load = async () => { const d = await fetchOne('/seo'); setData(d); };
  useEffect(() => { load(); }, []);
  if (!data) return <p>Loading...</p>;
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold">SEO Settings</h2>
      <GenericForm initial={data} onSave={async (fd) => { await saveOne('/seo', fd); load(); alert('Saved'); }} onCancel={() => load()} schema={[
        { key: 'title', type: 'text', label: 'Page title' },
        { key: 'description', type: 'textarea', label: 'Meta description' },
        { key: 'keywords', type: 'array', label: 'Keywords (array)' },
        { key: 'ogTitle', type: 'text', label: 'OG title' },
        { key: 'ogDescription', type: 'textarea', label: 'OG description' },
        { key: 'ogImage', type: 'image', label: 'OG image' },
        { key: 'twitterCard', type: 'text', label: 'Twitter card', default: 'summary_large_image' },
        { key: 'favicon', type: 'image', label: 'Favicon' },
        { key: 'googleAnalyticsId', type: 'text', label: 'Google Analytics ID' },
      ]} />
    </div>
  );
}

function ResumeUpload({ current, onChanged }) {
  const [busy, setBusy] = useState(false);
  const upload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true);
    try {
      const { url } = await uploadResume(file);
      // PATCH only the resumeUrl — send JSON (profile route has no multer).
      const profile = await fetchOne('/profile');
      await api.put('/profile', { ...profile, resumeUrl: url });
      onChanged();
      alert('Resume updated');
    } catch (er) { alert('Failed to upload resume'); }
    finally { setBusy(false); }
  };
  return (
    <div className="glass rounded-xl p-4">
      <h3 className="font-semibold mb-2">Resume PDF</h3>
      {current && <p className="text-xs text-accent mb-2 break-all">Current: {current}</p>}
      <input type="file" accept="application/pdf" onChange={upload} disabled={busy} className="text-xs text-white/60 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-accent file:text-white" />
      {busy && <p className="text-xs text-accent mt-1">Uploading...</p>}
    </div>
  );
}

export function Messages() {
  const [items, setItems] = useState([]);
  const load = async () => { const data = await fetchMany('/messages'); setItems(data); };
  useEffect(() => { load(); }, []);
  return (
    <div>
      <h2 className="font-display text-xl font-bold mb-4">Contact Messages</h2>
      <div className="space-y-3">
        {items.map((m) => (
          <div key={m._id} className="glass rounded-xl p-4">
            <div className="flex justify-between">
              <p><b>{m.name}</b> · <span className="text-accent text-xs">{m.email}</span></p>
              <span className="text-xs text-white/40">{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            {m.subject && <p className="text-white/60 text-sm mt-1">Subject: {m.subject}</p>}
            <p className="text-white/70 text-sm mt-1">{m.message}</p>
          </div>
        ))}
        {items.length === 0 && <p className="text-white/40 text-sm">No messages yet.</p>}
      </div>
    </div>
  );
}
