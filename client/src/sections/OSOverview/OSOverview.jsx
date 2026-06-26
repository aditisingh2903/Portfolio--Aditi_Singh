import { osModules } from "../../data/portfolioData";
import Section from "../../components/layout/Section";
import Container from "../../components/layout/Container";
import SectionHeader from "../../components/ui/SectionHeader";

const OSOverview = () => {
  return (
    <Section id="modules">
  <Container>
    <SectionHeader
      eyebrow="Modules"
      title="Installed systems inside AditiOS."
      description="Each module represents a working area of my engineering journey: artificial intelligence, IoT systems, research, and full-stack product development."
    />
      <div className="max-w-6xl mx-auto">
        
        <div className="grid md:grid-cols-2 gap-6">
          {osModules.map((module, index) => (
            <article
              key={module.title}
              className="group relative p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400/70 transition overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-2 text-xs font-mono text-slate-500">
                MODULE_0{index + 1}
              </div>

              <h3 className="text-2xl font-semibold mb-2">{module.title}</h3>

              <p className="text-cyan-400 text-sm mb-4">{module.subtitle}</p>

              <p className="text-slate-400 leading-relaxed">
                {module.description}
              </p>

              <div className="mt-6 h-px w-full bg-slate-800" />

              <p className="mt-4 text-xs font-mono text-slate-500">
                status: active
              </p>
            </article>
          ))}
        </div>
      </div>
      </Container>
</Section>
  );
};

export default OSOverview;