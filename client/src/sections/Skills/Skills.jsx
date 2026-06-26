const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "HTML", "CSS", "Tailwind", "Bootstrap"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Firebase", "REST APIs"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "SQLite", "Mongoose"],
  },
  {
    title: "AI / ML",
    skills: ["YOLOv8", "TensorFlow", "MediaPipe", "Tesseract OCR", "Groq LLM"],
  },
  {
    title: "IoT",
    skills: ["ESP8266", "Arduino", "Sensors", "ThingSpeak"],
  },
  {
    title: "Design",
    skills: ["Canva", "PPT Design", "Communication"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-cyan-400 font-medium mb-3">Skills</p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          My Innovation Stack
        </h2>

        <p className="text-slate-400 max-w-3xl mb-10">
          A mix of full-stack development, AI, IoT, and design skills that help
          me build complete real-world systems.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 transition"
            >
              <h3 className="text-xl font-semibold mb-4">{group.title}</h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 rounded-full bg-slate-800 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;