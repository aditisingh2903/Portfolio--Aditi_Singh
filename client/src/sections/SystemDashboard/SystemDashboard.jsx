import { systemMetrics } from "../../data/system";
import Window from "../../components/ui/Window";
import ProgressBar from "../../components/ui/ProgressBar";
import SectionHeader from "../../components/ui/SectionHeader";
import Section from "../../components/layout/Section";
import Container from "../../components/layout/Container";

const SystemDashboard = () => {
  return (
    <Section id="system" background="bg-slate-900/40">
  <Container>
       <SectionHeader
  eyebrow="System Status"
  title="Core capabilities powering AditiOS."
/> 

        <Window label="system/status" title="Capability Monitor">
          <div className="grid md:grid-cols-2 gap-6">
            {systemMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between mb-3">
                  <span className="font-medium">{metric.label}</span>
                  <span className="text-cyan-400">{metric.value}%</span>
                </div>

                <ProgressBar value={metric.value} />
              </div>
            ))}
          </div>
        </Window>
      </Container>
    </Section>
  );
};

export default SystemDashboard;