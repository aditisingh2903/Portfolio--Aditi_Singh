import { useState } from 'react';
import { uploadImage } from '../lib/api.js';

const MAX_IMAGES = 3;

export default function MultiImageUpload({ value, onChange, label = 'Images' }) {
  const values = Array.isArray(value) ? value.filter(Boolean) : [];
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const set = (arr) => onChange(arr);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (values.length >= MAX_IMAGES) {
      setErr(`Max ${MAX_IMAGES} images allowed.`);
      return;
    }
    setBusy(true); setErr(null);
    try {
      const { url } = await uploadImage(file);
      set([...values, url]);
    } catch (er) {
      setErr(er.response?.data?.message || 'Upload failed');
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  const removeAt = (i) => set(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="text-xs text-white/60">{label} ({values.length}/{MAX_IMAGES})</label>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        {values.map((url, i) => (
          <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden border border-white/10">
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button type="button" onClick={() => removeAt(i)} className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-black/70 text-white text-xs hover:bg-red-500">×</button>
          </div>
        ))}
        {values.length < MAX_IMAGES && (
          <label className="h-20 w-20 rounded-lg border border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-accent hover:bg-white/5">
            <span className="text-white/40 text-xl leading-none">+</span>
            <input type="file" accept="image/*" onChange={onUpload} disabled={busy} className="hidden" />
          </label>
        )}
      </div>
      {busy && <p className="text-xs text-accent mt-1">Uploading...</p>}
      {err && <p className="text-xs text-red-400 mt-1">{err}</p>}
      <p className="text-xs text-white/30 mt-1">Add up to {MAX_IMAGES} images. One = full-width, 2-3 = collage.</p>
    </div>
  );
}
