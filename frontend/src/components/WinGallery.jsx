import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function WinGallery({ images = [], alt = 'win' }) {
  const imgs = (images || []).filter(Boolean);
  const [active, setActive] = useState(null);

  if (imgs.length === 0) return null;

  return (
    <>
      {imgs.length === 1 && (
        <button onClick={() => setActive(imgs[0])} className="mt-4 block w-full overflow-hidden rounded-xl border border-white/10 group">
          <img src={imgs[0]} alt={alt} className="w-full max-h-80 object-cover group-hover:scale-105 transition duration-700" />
        </button>
      )}

      {imgs.length === 2 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {imgs.map((src, i) => (
            <button key={i} onClick={() => setActive(src)} className="block overflow-hidden rounded-xl border border-white/10 group aspect-[4/3]">
              <img src={src} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </button>
          ))}
        </div>
      )}

      {imgs.length === 3 && (
        <div className="mt-4 grid grid-cols-3 grid-rows-2 gap-2 h-64">
          <button onClick={() => setActive(imgs[0])} className="block overflow-hidden rounded-xl border border-white/10 group col-span-2 row-span-2">
            <img src={imgs[0]} alt={`${alt} 1`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          </button>
          {imgs.slice(1).map((src, i) => (
            <button key={i} onClick={() => setActive(src)} className="block overflow-hidden rounded-xl border border-white/10 group">
              <img src={src} alt={`${alt} ${i + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.img initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={(e) => e.stopPropagation()} src={active} alt={alt} className="max-w-full max-h-[88vh] rounded-2xl object-contain border border-white/10" />
            <button onClick={() => setActive(null)} className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
