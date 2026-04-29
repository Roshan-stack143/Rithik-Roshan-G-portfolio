import { UserProfile } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Layers } from 'lucide-react';
import { useState } from 'react';

export function Projects({ profile }: { profile: UserProfile }) {
  const [redirectingTo, setRedirectingTo] = useState<{ platform: string, url: string } | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: string, url: string) => {
    e.preventDefault();
    setRedirectingTo({ platform, url });
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setRedirectingTo(null);
    }, 2000);
  };

  return (
    <section id="projects" className="py-32 relative">
      {/* Toast Popup for Redirection */}
      <AnimatePresence>
        {redirectingTo && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] glass-panel px-6 py-4 rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex-shrink-0" />
            <div>
              <p className="text-white font-display text-sm">Deploying route to {redirectingTo.platform}...</p>
              <p className="text-slate-400 text-xs font-mono truncate max-w-[200px]">{redirectingTo.url.replace(/https?:\/\//, '')}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-cyan-400 ml-2 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center justify-between"
        >
          <h2 className="text-4xl md:text-5xl font-display font-light text-white">
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Expeditions</span>
          </h2>
          <Layers className="text-indigo-400 w-8 h-8 opacity-50" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {profile.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group relative rounded-3xl overflow-hidden glass-panel aspect-[4/3] md:aspect-video flex items-end block"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10 opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-display text-white">{project.title}</h3>
                </div>
                
                <p className="text-slate-300 mb-6 font-light sm:text-lg max-w-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-3 py-1 font-mono text-xs rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 backdrop-blur-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a 
                  href={project.link}
                  onClick={(e) => handleLinkClick(e, project.title, project.link)}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-500/80 hover:bg-cyan-400 text-slate-950 rounded-full font-medium transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500 delay-200"
                >
                  View Deployment <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Cinematic Border Overlays */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
