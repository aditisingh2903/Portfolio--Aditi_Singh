import { projects } from "../../data/projects";
const ApplicationManager = () => {
  return (
    <section id="applications" className="py-24 px-6 bg-slate-900/40">
      <div className="max-w-6xl mx-auto">
        <p className="text-cyan-400 font-medium mb-3">Application Manager</p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Projects installed as working systems.
        </h2>

        <p className="text-slate-400 max-w-3xl mb-10">
          A collection of projects built across IoT, artificial intelligence,
          computer vision, and full-stack development.
        </p>

        <div className="space-y-5">
          {projects.map((app, index) => (
            <article
              key={app.name}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400/70 transition"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-slate-500 mb-2">
                    APP_0{index + 1}
                  </p>

                  <h3 className="text-2xl font-semibold">{app.name}</h3>

                  <p className="text-cyan-400 text-sm mt-1">{app.type}</p>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full border border-slate-700 text-slate-400 w-fit">
                  {app.impact}
                </span>
              </div>

              <p className="text-slate-400 mt-5 leading-relaxed">
                {app.summary}
              </p>

              <div className="mt-5 pt-5 border-t border-slate-800">
                <p className="text-xs text-slate-500 font-mono">stack</p>
                <p className="text-sm text-slate-300 mt-1">{app.stack.join(" . ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationManager;