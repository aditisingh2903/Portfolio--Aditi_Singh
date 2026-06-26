const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-slate-900/40">
      <div className="max-w-6xl mx-auto">
        <p className="text-cyan-400 font-medium mb-3">About Me</p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          I build practical tech with real-world impact.
        </h2>

        <p className="text-slate-400 max-w-3xl leading-relaxed">
          I am a Computer Science undergraduate at Bhilai Institute of
          Technology, Durg, exploring the intersection of full-stack
          development, artificial intelligence, IoT systems, and research.
          My work includes award-winning projects like BinSense, SHRUTI AI,
          Medical Report System, and computer vision-based Tiger Detection.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <h3 className="text-xl font-semibold mb-2">AI + Research</h3>
            <p className="text-slate-400 text-sm">
              Working with multimodal AI, computer vision, OCR, LLMs, and
              research-driven intelligent systems.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <h3 className="text-xl font-semibold mb-2">IoT + Impact</h3>
            <p className="text-slate-400 text-sm">
              Built BinSense, a smart waste monitoring system using sensors,
              Firebase, dashboards, and route optimization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <h3 className="text-xl font-semibold mb-2">Full Stack</h3>
            <p className="text-slate-400 text-sm">
              Building production-ready web apps using React, Node.js,
              Express, MongoDB, Firebase, and REST APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;