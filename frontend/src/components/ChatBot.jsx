import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { sendChat } from '../lib/api.js';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Aditi's AI assistant. Ask me about her projects, skills, experience, or achievements." },
  ]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || busy) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: msg }]);
    setBusy(true);
    try {
      const { reply } = await sendChat(msg);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: "I'm having trouble responding. Please try again later." }]);
    } finally { setBusy(false); }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center shadow-glow"
        aria-label="Open AI Assistant"
      >
        <FaRobot className="text-white text-2xl" />
        <span className="absolute inset-0 rounded-full animate-ping bg-accent/30" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-[9999] w-[90vw] max-w-sm glass rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center"><FaRobot className="text-white" /></div>
                <div>
                  <p className="font-semibold text-sm">Aditi's Assistant</p>
                  <p className="text-xs text-emerald-400">● online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close"><FaTimes className="text-white/60 hover:text-white" /></button>
            </div>
            <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 bg-bg-soft/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-accent text-white' : 'bg-white/10 text-white/90'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && <div className="flex justify-start"><div className="bg-white/10 px-3 py-2 rounded-2xl text-sm">typing...</div></div>}
              <div ref={endRef} />
            </div>
            <div className="flex items-center gap-2 p-3 border-t border-white/10">
              <input
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about projects, skills..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm outline-none focus:border-accent"
              />
              <button onClick={send} disabled={busy} className="h-10 w-10 rounded-full bg-accent flex items-center justify-center disabled:opacity-50">
                <FaPaperPlane className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
