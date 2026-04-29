import { UserProfile } from '../../types';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export function Skills({ profile }: { profile: UserProfile }) {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-light text-white flex items-center gap-4">
            <Terminal className="text-cyan-400 w-8 h-8" />
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.skills.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group h-full"
            >
              <div className="h-full glass-panel border-white/10 rounded-2xl p-6 relative overflow-hidden bg-slate-900/40">
                {/* Background ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* System Scan Animation Overlay */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay">
                  <motion.div
                    animate={{ top: ['-20%', '120%'] }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-lg font-display text-white mb-6 uppercase tracking-wider">{category.name}</h3>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-3 py-1 font-mono text-xs rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
