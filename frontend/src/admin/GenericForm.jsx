import { useState, useEffect } from 'react';
import JsonField from './JsonField.jsx';
import ImageUpload from './ImageUpload.jsx';
import MultiImageUpload from './MultiImageUpload.jsx';

export default function GenericForm({ initial, onSave, onCancel, schema }) {
  const [form, setForm] = useState(() => {
    const base = {};
    schema.forEach((f) => {
      base[f.key] = initial ? clone(initial[f.key]) : f.default !== undefined ? f.default : (f.type === 'array' || f.type === 'images' ? [] : f.type === 'object' ? {} : '');
    });
    return base;
  });

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const body = {};
    Object.entries(form).forEach(([k, v]) => {
      if (v !== undefined && v !== null) body[k] = v;
    });
    onSave(body);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {schema.map((f) => (
        <div key={f.key}>
          <label className="text-xs text-white/60">{f.label || f.key}</label>
          <div className="mt-1">
            {f.type === 'text' && <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent" value={form[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} />}
            {f.type === 'textarea' && <textarea rows={f.rows || 3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent resize-none" value={form[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} />}
            {f.type === 'array' && <JsonField label={f.label} value={form[f.key]} onChange={(v) => set(f.key, v)} />}
            {f.type === 'object' && <JsonField label={f.label} value={form[f.key]} onChange={(v) => set(f.key, v)} />}
            {f.type === 'image' && <ImageUpload value={form[f.key]} onChange={(v) => set(f.key, v)} label={f.label} />}
            {f.type === 'images' && <MultiImageUpload value={form[f.key]} onChange={(v) => set(f.key, v)} label={f.label} />}
            {f.type === 'boolean' && (
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form[f.key]} onChange={(e) => set(f.key, e.target.checked)} /> Published / Featured
              </label>
            )}
          </div>
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}

function clone(v) {
  if (Array.isArray(v)) return [...v];
  if (v && typeof v === 'object') return { ...v };
  return v;
}
