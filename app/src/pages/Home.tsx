import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Users, Calendar, Megaphone, ArrowRight, ChevronDown, Award, Clock, DollarSign, Target, Heart, Briefcase, Sparkles, TrendingUp, Shield } from 'lucide-react';

const heroServices = [
  { title: 'HR Services', path: '/hr-services', icon: Users, desc: 'Comprehensive HR solutions' },
  { title: 'Corporate Events', path: '/events-services', icon: Calendar, desc: 'Memorable brand experiences' },
  { title: 'Communication', path: '/communication-services', icon: Megaphone, desc: 'Impactful C4D campaigns' },
];

const features = [
  { icon: Award, title: 'Professional Team', desc: 'Experienced experts' },
  { icon: DollarSign, title: 'Fair Prices', desc: 'Competitive rates' },
  { icon: Clock, title: '24/7 Support', desc: 'Always available' },
  { icon: TrendingUp, title: 'Results Driven', desc: 'Measurable impact' },
  { icon: Shield, title: 'Risk Management', desc: 'Stay compliant' },
  { icon: Heart, title: 'Women Empowerment', desc: 'Inclusive growth' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-bg.jpg" alt="WIN Human Capital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0022E8]/80 via-[#0022E8]/70 to-[#0022E8]/90" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8 md:mb-10">
            <img src="/logo.jpg" alt="WIN Human Capital" className="h-20 md:h-24 w-auto rounded-xl bg-white p-1 shadow-xl mx-auto mb-5" />
            <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto">
              Your trusted partner in maximizing your organization's potential.
            </p>
          </motion.div>

          {/* 3 Service Buttons */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col md:flex-row gap-4 w-full max-w-4xl px-4">
            {heroServices.map((service, index) => (
              <Link key={service.path} to={service.path} className="group flex-1">
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-[#0066CC] hover:bg-[#0077dd] text-white rounded-xl px-6 py-5 flex items-center justify-between shadow-xl transition-all border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <service.icon className="w-6 h-6 text-[#FF8C00] shrink-0" />
                    <div className="text-left">
                      <span className="block font-bold text-sm tracking-wide uppercase">{service.title}</span>
                      <span className="text-white/60 text-xs hidden md:block">{service.desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#FF8C00] group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-5 max-w-xl w-full mx-4 border-l-4 border-[#FF8C00]">
            <div className="space-y-1.5 text-sm text-white/90">
              <p><span className="font-semibold">Phone:</span> <span className="text-[#FF8C00]">(+250) 788842883</span></p>
              <p><span className="font-semibold">Email:</span> <span className="text-[#FF8C00]">winhumancapital@gmail.com</span></p>
            </div>
          </motion.div>

          {/* Scroll */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              <ChevronDown className="w-5 h-5 text-[#FF8C00]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features - Icon Grid */}
      <section id="features" className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Why <span className="text-[#FF8C00]">Choose Us</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10 hover:border-[#FF8C00]/50 text-center transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0022E8]/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0022E8]/40 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#FF8C00]" />
                </div>
                <h3 className="text-white text-sm font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/50 text-xs">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-20 bg-[#0022E8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/office-building.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your People, <span className="text-[#FF8C00]">Your Strengths</span></h2>
              <p className="text-white/80 mb-6 text-sm leading-relaxed">
                Since 2011, WIN Human Capital has been dedicated to enhancing your people's capacity and maximizing ROI. We offer tailored HR solutions, event management, and C4D services.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff9f1a] transition-colors text-sm">
                About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <img src="/about-leader.jpg" alt="WIN" className="rounded-2xl shadow-2xl w-full max-w-sm mx-auto lg:ml-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0022E8] mb-2">Our <span className="text-[#FF8C00]">Services</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: 'HR Services', desc: 'Recruitment, payroll, performance & development', link: '/hr-services', image: '/hr-services.jpg' },
              { icon: Sparkles, title: 'Corporate Events', desc: 'Galas, conferences, launches & team building', link: '/events-services', image: '/events-services.jpg' },
              { icon: Heart, title: 'Communication', desc: 'C4D campaigns in health, education & governance', link: '/communication-services', image: '/communication-services.jpg' },
            ].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link to={s.link} className="group block">
                  <div className="bg-[#FAFAF8] rounded-2xl overflow-hidden border border-gray-100 hover:border-[#FF8C00]/30 hover:shadow-xl transition-all">
                    <div className="h-44 overflow-hidden">
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-[#0022E8] flex items-center justify-center">
                          <s.icon className="w-4 h-4 text-[#FF8C00]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0022E8]">{s.title}</h3>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">{s.desc}</p>
                      <span className="inline-flex items-center gap-1 text-[#FF8C00] font-semibold text-xs group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FF8C00]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0022E8] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a40b8] transition-colors">
              <Target className="w-5 h-5" /> Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
