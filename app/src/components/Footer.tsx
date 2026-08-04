import { Link } from 'react-router';
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0022E8] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="WIN Human Capital"
                className="h-12 w-auto rounded-lg bg-white p-0.5"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted partner in maximizing your organization's potential through comprehensive HR services and Events Management since 2011.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#FF8C00] font-semibold text-sm uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/hr-services" className="text-white/70 hover:text-[#FF8C00] transition-colors text-sm">
                  HR Services
                </Link>
              </li>
              <li>
                <Link to="/events-services" className="text-white/70 hover:text-[#FF8C00] transition-colors text-sm">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link to="/communication-services" className="text-white/70 hover:text-[#FF8C00] transition-colors text-sm">
                  Communication
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/70 hover:text-[#FF8C00] transition-colors text-sm">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#FF8C00] font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-white/70 hover:text-[#FF8C00] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-[#FF8C00] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-[#FF8C00] transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-white/70 text-sm">
                  Careers
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#FF8C00] font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF8C00] mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">
                  KG 42 Street, Gasabo – Kimironko – Kibagabaga, Kigali - Rwanda
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span className="text-white/70 text-sm">
                  (+250) 788842883 / (+250) 781886037
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span className="text-white/70 text-sm">
                  winhumancapital@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © 2024 WIN Human Capital. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            Your people, your strengths!
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#FF8C00] text-[#0022E8] flex items-center justify-center hover:bg-[#ff9f1a] transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
