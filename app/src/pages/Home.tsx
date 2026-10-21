import { Link } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, Calendar, Megaphone, ArrowRight, ChevronDown, Award, Clock, DollarSign, Target, Heart, TrendingUp, Shield } from 'lucide-react';

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
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="bg-[#0022E8] pt-28 pb-10 md:pt-32 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
            {/* Services stay in the left column, clear of the photograph. */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-0"
            >
              <p className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5">
                WIN Human Capital
              </p>
              <h1 id="hero-heading" className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight text-white mb-5">
                Your People,<br />
                <span className="hero-accent">Your Strengths.</span>
              </h1>
              <p className="text-white/80 text-base leading-relaxed max-w-md mb-8">
                HR solutions, corporate events and communication services.
              </p>

              <div className="flex flex-col gap-3">
                {heroServices.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/25 bg-white/10 px-5 py-5 text-white shadow-sm transition-[background-color,border-color,transform] duration-200 hover:bg-white/20 hover:border-[#FF8C00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0022E8] motion-safe:hover:translate-x-1 motion-reduce:transition-none sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <service.icon aria-hidden="true" className="w-6 h-6 text-[#FF8C00] shrink-0" />
                      <div>
                        <span className="block font-bold text-sm sm:text-base tracking-wide uppercase">{service.title}</span>
                        <span className="block text-white/80 text-sm mt-1">{service.desc}</span>
                      </div>
                    </div>
                    <ArrowRight aria-hidden="true" className="w-5 h-5 shrink-0 text-[#FF8C00] transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Original image at full opacity, with no tint or overlay. */}
            <div className="aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:h-[min(70svh,620px)] lg:min-h-[520px]">
              <img
                src="/hero-bg.jpg"
                alt="A team collaborating during a presentation in a bright meeting room"
                width={480}
                height={275}
                fetchPriority="high"
                className="h-full w-full object-cover object-[60%_center]"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center lg:mt-10">
            <button
              type="button"
              aria-label="Explore why clients choose WIN Human Capital"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00]"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })}
            >
              <ChevronDown aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features - Icon Grid */}
      <section id="features" className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0022E8] mb-3">Why <span className="text-[#0022E8]">Choose Us</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-5 md:p-6 border border-border hover:border-[#FF8C00]/50 text-center transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0022E8]/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF8C00]/15 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#0022E8]" />
                </div>
                <h3 className="text-[#0022E8] text-sm font-semibold mb-1">{feature.title}</h3>
                <p className="text-slate-600 text-xs">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-20 bg-[#0022E8] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your People, <span className="text-white">Your Strengths</span></h2>
              <p className="text-white/85 mb-6 text-sm leading-relaxed">
                Since 2011, WIN Human Capital has been dedicated to enhancing your people's capacity and maximizing ROI. We offer tailored HR solutions, event management, and C4D services.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 bg-[#FF8C00] text-[#081641] px-6 py-3 rounded-lg font-semibold hover:bg-[#ff9f1a] transition-colors text-sm">
                About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <img src="/about-leader.jpg" alt="WIN" className="rounded-2xl shadow-2xl w-full max-w-sm mx-auto lg:ml-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FF8C00]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-[#081641] mb-6">Ready to Get Started?</h2>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0022E8] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a40b8] transition-colors">
              <Target className="w-5 h-5" /> Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
