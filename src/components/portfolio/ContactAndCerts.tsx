import { UserProfile } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Phone, Award, GraduationCap, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function ContactAndCerts({ profile }: { profile: UserProfile }) {
  const [redirectingTo, setRedirectingTo] = useState<{ platform: string, url: string } | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: string, url: string) => {
    e.preventDefault();
    setRedirectingTo({ platform, url });
    setTimeout(() => {
      if (url.startsWith('mailto:') || url.startsWith('tel:')) {
        window.open(url, '_top');
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      setRedirectingTo(null);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950">
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
              <p className="text-white font-display text-sm">Opening {redirectingTo.platform}...</p>
              <p className="text-slate-400 text-xs font-mono truncate max-w-[200px]">{redirectingTo.url.replace(/mailto:|tel:|https?:\/\//, '')}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-cyan-400 ml-2 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic top gradient separator */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-900/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16">
        
        {/* Left Column: Education, Achievements, Areas of Interest */}
        <div className="space-y-16">
          
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <GraduationCap className="text-cyan-400 w-6 h-6" />
              <h2 className="text-3xl font-display font-light text-white">Academy</h2>
            </motion.div>

            <div className="space-y-6">
               {profile.education.map((edu, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="pl-6 border-l-2 border-cyan-500/20 relative"
                 >
                   <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                   <h3 className="text-xl text-white font-display">{edu.degree}</h3>
                   <p className="text-slate-400 font-light mt-1">{edu.institution}</p>
                   <p className="text-sm font-mono text-cyan-400 mt-2">{edu.period}</p>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <BookOpen className="text-indigo-400 w-6 h-6" />
              <h2 className="text-3xl font-display font-light text-white">Focus Areas</h2>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {profile.areasOfInterest.map((interest, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 glass-panel border-indigo-500/20 text-indigo-300 rounded-lg text-sm hover:border-indigo-400/50 hover:bg-white/5 transition-colors cursor-default"
                >
                  {interest}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <Award className="text-purple-400 w-6 h-6" />
              <h2 className="text-3xl font-display font-light text-white">Milestones</h2>
            </motion.div>

            <div className="space-y-4">
              {[...profile.achievements, ...profile.certifications].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-5 rounded-xl border-l-2 border-l-purple-500/50 hover:bg-white/5 transition-colors group"
                >
                  <p className="text-slate-300 font-light group-hover:text-white transition-colors flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Contact (Comms) */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8 sticky top-32"
          >
            <h2 className="text-3xl font-display font-light text-white">Establish Comm Link</h2>
            <p className="text-slate-400 mt-2 font-mono text-sm">Open channel for new directives.</p>
            
            <div className="glass-panel rounded-2xl p-8 space-y-6 mt-8">
              <a 
                href={`mailto:${profile.contact.email}`} 
                className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-mono">{profile.contact.email}</span>
              </a>
              
              <a 
                href={profile.contact.linkedin.startsWith('http') ? profile.contact.linkedin : `https://${profile.contact.linkedin}`} 
                onClick={(e) => handleLinkClick(e, 'LinkedIn', profile.contact.linkedin.startsWith('http') ? profile.contact.linkedin : `https://${profile.contact.linkedin}`)}
                target="_blank" rel="noopener noreferrer" 
                className="flex items-center gap-4 text-slate-300 hover:text-indigo-400 transition-colors group"
              >
                 <div className="p-3 bg-white/5 rounded-lg group-hover:bg-indigo-500/10 border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="font-mono">{profile.contact.linkedin}</span>
              </a>

              {profile.contact.github && (
                <a 
                  href={profile.contact.github.startsWith('http') ? profile.contact.github : `https://${profile.contact.github}`} 
                  onClick={(e) => handleLinkClick(e, 'GitHub', profile.contact.github.startsWith('http') ? profile.contact.github : `https://${profile.contact.github}`)}
                  target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-slate-300 hover:text-purple-400 transition-colors group"
                >
                   <div className="p-3 bg-white/5 rounded-lg group-hover:bg-purple-500/10 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                  </div>
                  <span className="font-mono">{profile.contact.github}</span>
                </a>
              )}

              <a 
                href={`tel:${profile.contact.phone}`} 
                className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                 <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-mono">{profile.contact.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-32 pb-8 text-center text-slate-600 font-mono text-xs max-w-6xl mx-auto px-6 border-t border-white/5 pt-8 flex justify-between items-center">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="uppercase tracking-widest text-[#22d3ee]/50">End of Transmission</span>
      </footer>
    </section>
  );
}
