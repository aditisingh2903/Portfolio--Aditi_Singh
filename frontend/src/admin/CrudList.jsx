import { useEffect, useState } from 'react';
import { fetchMany, createOne, updateOne, deleteOne, reorder } from '../lib/api.js';

export default function CrudList({ endpoint, title, fields, itemTitleKey = 'title', FormComponent }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const data = await fetchMany(endpoint); setItems(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const onSave = async (body) => {
    if (editing) await updateOne(endpoint, editing._id, body);
    else await createOne(endpoint, body);
    setShowForm(false); setEditing(null); load();
  };
  const onDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    await deleteOne(endpoint, id); load();
  };
  const move = async (id, dir) => {
    const idx = items.findIndex(i => i._id === id);
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const arr = [...items];
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    arr.forEach((it, i) => it.order = i);
    setItems(arr);
    await reorder(endpoint, arr.map((it) => ({ id: it._id, order: it.order })));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary text-sm py-2">+ Add</button>
      </div>
      {loading ? <p className="text-white/50">Loading...</p> : items.length === 0 ? (
        <p className="text-white/40 text-sm">No items yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={it._id} className="glass rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <button onClick={() => move(it._id, -1)} disabled={i === 0} className="text-white/40 hover:text-accent disabled:opacity-30">↑</button>
                  <button onClick={() => move(it._id, 1)} disabled={i === items.length - 1} className="text-white/40 hover:text-accent disabled:opacity-30">↓</button>
                  <h3 className="font-semibold">{it[itemTitleKey] || it.category || it.role || it.institution || 'Item'}</h3>
                  {it.published === false && <span className="chip text-amber-400 border-amber-400/30">Unpublished</span>}
                </div>
                <ul className="mt-1 text-xs text-white/50 space-y-0.5">
                  {fields.map((f) => (
                    Array.isArray(it[f]) ? (it[f].length > 0 && <li key={f}><b className="text-white/70">{f}:</b> {it[f].join(', ')}</li>)
                    : (it[f] && typeof it[f] === 'object' && !it[f].url) ? <li key={f}><b className="text-white/70">{f}:</b> {JSON.stringify(it[f])}</li>
                    : (it[f] && <li key={f}><b className="text-white/70">{f}:</b> {String(it[f]).slice(0, 80)}</li>)
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => { setEditing(it); setShowForm(true); }} className="text-accent text-sm hover:underline">Edit</button>
                <button onClick={() => onDelete(it._id)} className="text-red-400 text-sm hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-lg font-bold">{editing ? 'Edit' : 'Add'} {title}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-white/60 text-xl">×</button>
            </div>
            {FormComponent ? <FormComponent initial={editing} onSave={onSave} onCancel={() => { setShowForm(false); setEditing(null); }} /> : null}
          </div>
        </div>
      )}
    </div>
  );
}
