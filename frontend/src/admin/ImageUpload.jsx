import { useState } from 'react';
import { uploadImage } from '../lib/api.js';

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr(null);
    try { const { url } = await uploadImage(file); onChange(url); }
    catch (er) { setErr(er.response?.data?.message || 'Upload failed'); }
    finally { setBusy(false); }
  };
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <div className="mt-1 flex items-center gap-3">
        {value && <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover border border-white/10" />}
        <input type="file" accept="image/*" onChange={onFile} disabled={busy} className="text-xs text-white/60 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-accent file:text-white" />
      </div>
      {busy && <p className="text-xs text-accent mt-1">Uploading...</p>}
      {err && <p className="text-xs text-red-400 mt-1">{err}</p>}
      <input className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs" placeholder="or paste image URL" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
