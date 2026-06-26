import { motion } from "framer-motion";
import { heroData } from "../../data/portfolioData";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-cyan-400 mb-4"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold"
        >
          {heroData.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-300 mt-4"
        >
          AI • IoT • Full Stack • Research
          {heroData.role}
        </motion.h2>

        <p className="max-w-2xl mx-auto mt-6 text-slate-400 leading-relaxed">
          Building intelligent systems that combine Artificial Intelligence,
          IoT, Full Stack Development, and Research to solve real-world
          problems.
          {heroData.tagline}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition">
            View Projects
          </button>

          <button className="px-6 py-3 rounded-xl border border-slate-700 hover:border-cyan-400 transition">
            Download Resume
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;