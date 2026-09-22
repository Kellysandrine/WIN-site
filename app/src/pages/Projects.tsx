import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Calendar, ArrowRight, Filter, Megaphone, Sparkles } from 'lucide-react';
import { projects, type Category } from '../data/projects';

const categories: { key: Category | 'all'; label: string; icon: typeof Megaphone }[] = [
  { key: 'all', label: 'All Projects', icon: FolderOpen },
  { key: 'communication', label: 'Communication', icon: Megaphone },
  { key: 'events', label: 'Events', icon: Sparkles },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/project-conference.jpg" alt="Projects" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0022E8]/90 to-[#0022E8]/60" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Our <span className="text-[#FF8C00]">Projects</span>
              </h1>
              <p className="text-white/80 text-lg max-w-lg">
                A showcase of our work across communication and corporate events.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-[#FAFAF8] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-[#0022E8]" />
            <span className="text-sm font-medium text-gray-600">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat.key
                    ? 'bg-[#0022E8] text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0022E8] hover:text-[#0022E8]'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Link to={`/projects/${project.id}`} className="group block">
                    <div className="bg-[#FAFAF8] rounded-2xl overflow-hidden border border-gray-100 hover:border-[#FF8C00]/40 hover:shadow-xl transition-all h-full">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            project.category === 'communication'
                              ? 'bg-[#0022E8] text-white'
                              : 'bg-[#FF8C00] text-white'
                          }`}>
                            {project.category === 'communication' ? 'Communication' : 'Events'}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-[#0022E8] mb-2 group-hover:text-[#FF8C00] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{project.shortDesc}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <FolderOpen className="w-3.5 h-3.5" />
                            <span>{project.client}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{project.year}</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1 text-[#FF8C00] font-semibold text-sm group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
