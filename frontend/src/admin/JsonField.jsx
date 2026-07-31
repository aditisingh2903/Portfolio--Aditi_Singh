import { useState } from 'react';
export default function JsonField({ value, onChange, label }) {
  const [text, setText] = useState(() => (Array.isArray(value) || typeof value === 'object') ? JSON.stringify(value, null, 2) : (value || '[]'));
  const [err, setErr] = useState(null);
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <textarea
        rows={5}
        className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono"
        value={text}
        onChange={(e) => { setText(e.target.value); try { onChange(JSON.parse(e.target.value)); setErr(null); } catch (e2) { setErr('Invalid JSON'); } }}
      />
      {err && <p className="text-xs text-red-400 mt-1">{err}</p>}
    </div>
  );
}
