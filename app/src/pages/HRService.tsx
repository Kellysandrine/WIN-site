import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  Users, ArrowRight, UserPlus, DollarSign, Heart, GraduationCap,
  Shield, FileCheck, Headphones, Search, ClipboardCheck,
  Handshake, BookOpen, BarChart3, Target
} from 'lucide-react';
import ProcessDiagram from '../components/ProcessDiagram';

const services = [
  { icon: Users, title: 'Recruitment & Talent Acquisition' },
  { icon: UserPlus, title: 'Onboarding & Orientation' },
  { icon: DollarSign, title: 'Payroll Administration' },
  { icon: Heart, title: 'Employee Relations' },
  { icon: GraduationCap, title: 'Training & Development' },
  { icon: Shield, title: 'Compliance & Risk' },
  { icon: FileCheck, title: 'Performance Management' },
  { icon: Headphones, title: 'HR Consulting' },
];

const processSteps = [
  { number: '01', title: 'Assess', icon: Search },
  { number: '02', title: 'Recruit', icon: UserPlus },
  { number: '03', title: 'Screen', icon: ClipboardCheck },
  { number: '04', title: 'Hire', icon: Handshake },
  { number: '05', title: 'Train', icon: BookOpen },
  { number: '06', title: 'Evaluate', icon: BarChart3 },
];

export default function HRService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hr-services.jpg" alt="HR Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0022E8]/90 to-[#0022E8]/60" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                HR <span className="text-[#FF8C00]">Services</span>
              </h1>
              <p className="text-white/80 text-lg max-w-xl">
                Comprehensive human resource solutions to build and manage your dream team.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid - Icon Cards */}
      <section className="py-16 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              What We <span className="text-[#FF8C00]">Offer</span>
            </h2>
            <p className="text-white/60 max-w-md mx-auto">End-to-end HR services for your organization</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10 hover:border-[#FF8C00]/50 hover:bg-white/10 transition-all group text-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0022E8]/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0022E8]/40 transition-colors">
                  <service.icon className="w-6 h-6 md:w-7 md:h-7 text-[#FF8C00]" />
                </div>
                <h3 className="text-white text-sm md:text-base font-semibold leading-tight">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Diagram */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#FF8C00] font-semibold uppercase tracking-wider text-sm">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0022E8] mt-2 mb-3">
              How We <span className="text-[#FF8C00]">Work</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">From assessment to evaluation, we handle it all</p>
          </motion.div>

          <ProcessDiagram steps={processSteps} />
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 md:py-20 bg-[#0022E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Why <span className="text-[#FF8C00]">WIN HR</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Target, label: 'Customized Solutions' },
              { icon: Shield, label: 'Risk Prevention' },
              { icon: Users, label: 'Talent Retention' },
              { icon: GraduationCap, label: 'Women Empowerment' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#FF8C00] flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FF8C00]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-4">Transform Your Workforce</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Let us help you build a stronger, more productive team.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0022E8] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a40b8] transition-colors">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
