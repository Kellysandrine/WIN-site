import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/office-building.jpg" alt="Contact WIN" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0022E8]/90 to-[#0022E8]/70" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Contact <span className="text-[#FF8C00]">Us</span>
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Get in touch with our team for tailored solutions designed to fit your unique business needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#0022E8] mb-6">
                Get In <span className="text-[#FF8C00]">Touch</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you are a growing startup or an established corporation, our team is dedicated to delivering professionalism, integrity, and innovative solutions to exceed your expectations.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0022E8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#FF8C00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0022E8] mb-1">Address</h4>
                    <p className="text-gray-600 text-sm">Kibagabaga, KG 19, 301st, Trinity Corner House, Kigali - Rwanda</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0022E8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#FF8C00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0022E8] mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">(+250) 781886037</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0022E8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#FF8C00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0022E8] mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">info@winhumancapital.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0022E8] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FF8C00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0022E8] mb-1">Working Hours</h4>
                    <p className="text-gray-600 text-sm">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#0022E8] mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0022E8] flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] text-white transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0022E8] flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] text-white transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0022E8] flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] text-white transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0022E8] flex items-center justify-center hover:bg-[#FF8C00] hover:text-[#0022E8] text-white transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#FAFAF8] rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-[#FF8C00]" />
                  <h3 className="text-xl font-bold text-[#0022E8]">Send Us a Message</h3>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <Send className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-bold text-green-800 mb-1">Message Sent!</h4>
                    <p className="text-green-600 text-sm">Thank you for reaching out. We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0022E8] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all bg-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0022E8] mb-1.5">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all bg-white"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0022E8] mb-1.5">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all bg-white"
                          placeholder="+250 ..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0022E8] mb-1.5">Service Interest</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select a service</option>
                        <option value="hr">HR Services</option>
                        <option value="events">Corporate Events</option>
                        <option value="communication">Communication</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0022E8] mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all bg-white resize-none"
                        placeholder="Tell us about your needs..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#0022E8] text-white py-3.5 rounded-lg font-semibold hover:bg-[#1a40b8] transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
