import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ChatBot from './components/ChatBot.jsx';
import PageTransition from './components/PageTransition.jsx';
import Cursor from './components/Cursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const location = useLocation();
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/admin/*" element={<PageTransition><Admin /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      {!location.pathname.startsWith('/admin') && (
        <>
          <ChatBot />
        </>
      )}
    </>
  );
}
