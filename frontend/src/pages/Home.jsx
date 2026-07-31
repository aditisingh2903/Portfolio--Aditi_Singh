import { Helmet } from 'react-helmet-async';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Skills from '../sections/Skills.jsx';
import Projects from '../sections/Projects.jsx';
import Experience from '../sections/Experience.jsx';
import Education from '../sections/Education.jsx';
import Achievements from '../sections/Achievements.jsx';
import Research from '../sections/Research.jsx';
import Certifications from '../sections/Certifications.jsx';
import Contact from '../sections/Contact.jsx';

function Seo() {
  const { seo, profile } = usePortfolio();
  return (
    <Helmet>
      <title>{seo?.title || `${profile?.name || 'Aditi Singh'} - Full-Stack & AI/IoT Developer`}</title>
      <meta name="description" content={seo?.description || 'Portfolio of Aditi Singh - full-stack & AI/IoT developer.'} />
      {seo?.keywords?.length > 0 && <meta name="keywords" content={seo.keywords.join(', ')} />}
      <meta property="og:title" content={seo?.ogTitle || 'Aditi Singh - Portfolio'} />
      <meta property="og:description" content={seo?.ogDescription || ''} />
      {seo?.ogImage && <meta property="og:image" content={seo.ogImage} />}
      <meta name="twitter:card" content={seo?.twitterCard || 'summary_large_image'} />
      {seo?.googleAnalyticsId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`} />}
      {seo?.googleAnalyticsId && (
        <script>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${seo.googleAnalyticsId}');`}</script>
      )}
    </Helmet>
  );
}

function HomeInner() {
  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Certifications />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <PortfolioProvider>
      <HomeInner />
    </PortfolioProvider>
  );
}
