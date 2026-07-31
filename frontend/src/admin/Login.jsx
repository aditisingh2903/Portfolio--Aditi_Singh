import { useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null); setBusy(true);
    try { await login(email, password); nav('/admin'); }
    catch (e) { setErr(e.response?.data?.message || 'Login failed'); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="glass rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h1 className="font-display text-2xl font-bold mb-2"><span className="grad-text">Admin</span> Login</h1>
        <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Signing in...' : 'Sign In'}</button>
        {err && <p className="text-red-400 text-sm text-center">{err}</p>}
      </motion.form>
    </div>
  );
}
