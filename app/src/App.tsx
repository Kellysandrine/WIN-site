import { Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import SEO from './components/SEO';
import Services from './pages/Services';
import { Button } from './components/SiteSections';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HRService from './pages/HRService';
import EventsService from './pages/EventsService';
import CommunicationService from './pages/CommunicationService';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
export default function App() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
    return (<>
    <SEO />
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/services" element={<Services />}/>
          <Route path="*" element={<section className="win-section win-blue"><div className="win-container"><h1>Page not found</h1><p>Explore our people, communication and event services.</p><Button to="/">Back to home</Button></div></section>}/>
          <Route path="/" element={<Home />}/>
          <Route path="/hr-services" element={<HRService />}/>
          <Route path="/events-services" element={<EventsService />}/>
          <Route path="/communication-services" element={<CommunicationService />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/projects/:id" element={<ProjectDetail />}/>
        </Routes>
      </main>
      <Footer />
    </div>
    </>);
}
