import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight, Eye, Target, Award, Users, Globe, TrendingUp, Heart, Shield, Lightbulb, Handshake } from 'lucide-react';

const stats = [
  { number: '13+', label: 'Years', icon: Award },
  { number: '500+', label: 'Clients', icon: Users },
  { number: '50+', label: 'Events', icon: Globe },
  { number: '3', label: 'Services', icon: TrendingUp },
];

const values = [
  { icon: Award, title: 'Excellence' },
  { icon: Shield, title: 'Integrity' },
  { icon: Lightbulb, title: 'Innovation' },
  { icon: Heart, title: 'Inclusivity' },
  { icon: Handshake, title: 'Partnership' },
  { icon: Users, title: 'Empowerment' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/office-building.jpg" alt="About WIN" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0022E8]/90 to-[#0022E8]/60" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">About <span className="text-[#FF8C00]">WIN</span></h1>
              <p className="text-white/80 text-lg max-w-lg">Your people, your strengths. Since 2011.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#0022E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF8C00] flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Vision/Mission */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0022E8] mb-4">Our <span className="text-[#FF8C00]">Story</span></h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Since 2011, WIN Human Capital has been dedicated to enhancing people's capacity and maximizing ROI. We offer tailored HR solutions, event management, and communication services.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We champion diversity, empower women, and specialize in career development for young professionals across Africa.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-[#0022E8] flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5 text-[#FF8C00]" />
                </div>
                <h3 className="text-lg font-bold text-[#0022E8] mb-2">Vision</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Leading provider of impactful HR solutions across Africa.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#0022E8] rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF8C00] flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mission</h3>
                <p className="text-white/80 text-xs leading-relaxed">Innovative leadership in career success and gender equality.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Icon Grid */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Our <span className="text-[#FF8C00]">Values</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-[#FF8C00]/50 text-center transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0022E8]/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0022E8]/40 transition-colors">
                  <value.icon className="w-6 h-6 text-[#FF8C00]" />
                </div>
                <h3 className="text-white text-sm font-semibold">{value.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FF8C00]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Partner With Us</h2>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0022E8] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a40b8] transition-colors">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
