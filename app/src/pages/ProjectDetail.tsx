import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, FolderOpen, CheckCircle,
  ArrowRight, Megaphone, Sparkles, Tag
} from 'lucide-react';
import { getProjectById, projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0022E8] mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 bg-[#0022E8] text-white px-6 py-3 rounded-lg font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const related = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  const CategoryIcon = project.category === 'communication' ? Megaphone : Sparkles;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Image */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Back link */}
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-white/80 hover:text-[#FF8C00] transition-colors text-sm mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </Link>

              {/* Category badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  project.category === 'communication'
                    ? 'bg-[#0022E8] text-white'
                    : 'bg-[#FF8C00] text-white'
                }`}>
                  <CategoryIcon className="w-3 h-3" />
                  {project.category === 'communication' ? 'Communication' : 'Events'}
                </span>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {project.year}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {project.title}
              </h1>
              <p className="text-white/70 text-sm md:text-base max-w-2xl">
                {project.shortDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content - Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0022E8] mb-6">
                Project <span className="text-[#FF8C00]">Overview</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">{project.overview}</p>

              {/* Deliverables */}
              <h3 className="text-xl font-bold text-[#0022E8] mb-4">Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="flex items-center gap-3 bg-[#FAFAF8] rounded-xl px-4 py-3 border border-gray-100"
                  >
                    <CheckCircle className="w-5 h-5 text-[#FF8C00] shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{deliverable}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar - Key Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-[#0022E8] mb-5">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FolderOpen className="w-5 h-5 text-[#FF8C00] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Client</span>
                      <p className="text-gray-800 text-sm font-medium">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-[#FF8C00] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Category</span>
                      <p className="text-gray-800 text-sm font-medium capitalize">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#FF8C00] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Year</span>
                      <p className="text-gray-800 text-sm font-medium">{project.year}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200">
                  <Link
                    to="/contact"
                    className="block w-full text-center bg-[#0022E8] text-white py-3 rounded-lg font-semibold hover:bg-[#1a40b8] transition-colors text-sm"
                  >
                    Start a Similar Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-[#FAFAF8] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-[#0022E8]">
                Related <span className="text-[#FF8C00]">Projects</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rp, index) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/projects/${rp.id}`} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#FF8C00]/40 hover:shadow-lg transition-all">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={rp.image}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-[#0022E8] text-sm mb-1 group-hover:text-[#FF8C00] transition-colors">
                          {rp.title}
                        </h4>
                        <p className="text-gray-500 text-xs line-clamp-2">{rp.shortDesc}</p>
                        <div className="mt-2 flex items-center gap-1 text-[#FF8C00] font-semibold text-xs">
                          View <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
