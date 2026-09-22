import { Routes, Route, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import HRService from './pages/HRService'
import EventsService from './pages/EventsService'
import CommunicationService from './pages/CommunicationService'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import AdminApp from './admin/AdminApp'

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hr-services" element={<HRService />} />
          <Route path="/events-services" element={<EventsService />} />
          <Route path="/communication-services" element={<CommunicationService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}
