import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/motionVariants";
import { bootSequence, systemIdentity } from "../../data/system";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a,#020617_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          variants={fadeUp}
          className="inline-block mb-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-left shadow-2xl"
        >
          <p className="font-mono text-sm text-cyan-400 mb-3">
            {systemIdentity.name} {systemIdentity.version} initializing...
          </p>

          <div className="space-y-2">
            {bootSequence.map((line) => (
              <p key={line} className="font-mono text-sm text-slate-300">
                <span className="text-green-400">✓</span> {line}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.p variants={fadeUp} className="text-cyan-400 font-medium mb-4">
          SYSTEM OWNER
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          {systemIdentity.owner}
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-4xl font-bold mt-5 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          {systemIdentity.headline}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto mt-6 text-slate-400 leading-relaxed"
        >
          {systemIdentity.tagline}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;