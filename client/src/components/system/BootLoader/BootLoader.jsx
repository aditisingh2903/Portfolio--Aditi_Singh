import { motion } from "framer-motion";
import { bootSequence, systemIdentity } from "../../../data/system";
import { useEffect } from "react";

const BootLoader = ({ onComplete }) => {
    useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onComplete();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [onComplete]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
      >
        <p className="font-mono text-sm text-cyan-400 mb-6">
          {systemIdentity.name} Kernel {systemIdentity.version}
        </p>

        <div className="space-y-3">
          {bootSequence.map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.25, duration: 0.35 }}
              className="font-mono text-sm text-slate-300"
            >
              {line}
              <span className="text-cyan-400"> ...... OK</span>
            </motion.p>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: bootSequence.length * 0.25 + 0.4 }}
          onClick={onComplete}
          className="mt-8 font-mono text-sm text-slate-400 hover:text-cyan-400 transition"
        >
          Press Enter to Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default BootLoader;