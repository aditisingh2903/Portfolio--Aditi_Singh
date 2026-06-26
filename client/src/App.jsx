import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import BootLoader from "./components/system/BootLoader";

import Hero from "./sections/Hero/Hero";
import SystemDashboard from "./sections/SystemDashboard/SystemDashboard";
import OSOverview from "./sections/OSOverview/OSOverview";
import ApplicationManager from "./sections/ApplicationManager/ApplicationManager";
import About from "./sections/About/About";
import Skills from "./sections/Skills/Skills";

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!bootComplete && (
          <BootLoader onComplete={() => setBootComplete(true)} />
        )}
      </AnimatePresence>

      {bootComplete && (
        <>
          <Navbar />
          <Hero />
          <SystemDashboard />
          <OSOverview />
          <ApplicationManager />
          <About />
          <Skills />
        </>
      )}
    </>
  );
}

export default App;