import { UserProfile } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Phone, Award, GraduationCap, Sparkles, BookOpen, ExternalLink, Briefcase, Users } from 'lucide-react';
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
        
        {/* Left Column: Education, Internships, Roles, Certifications */}
        <div className="space-y-16">
          
          {/* Internships */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <Briefcase className="text-indigo-400 w-6 h-6" />
              <h2 className="text-3xl font-display font-light text-white">Experience</h2>
            </motion.div>

            <div className="space-y-6">
               {(profile.internships || []).map((internship, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="pl-6 border-l-2 border-indigo-500/20 relative"
                 >
                   <div className="absolute w-3 h-3 bg-indigo-400 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                   <h3 className="text-xl text-white font-display">{internship.role}</h3>
                   <p className="text-slate-300 font-medium mt-1">{internship.company}</p>
                   <div className="flex gap-4 items-center mt-2 mb-3 text-xs font-mono text-indigo-300">
                     <span>{internship.period}</span>
                     {internship.location && <span>• {internship.location}</span>}
                   </div>
                   <ul className="space-y-2 mt-3">
                     {internship.points.map((point, i) => (
                       <li key={i} className="text-slate-400 text-sm font-light flex items-start gap-2">
                         <span className="text-indigo-500/50 mt-1">•</span>
                         <span className="leading-relaxed">{point}</span>
                       </li>
                     ))}
                   </ul>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Roles & Responsibilities */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <Users className="text-cyan-400 w-6 h-6" />
              <h2 className="text-3xl font-display font-light text-white">Leadership & Roles</h2>
            </motion.div>

            <div className="space-y-6">
               {(profile.responsibilities || []).map((role, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="pl-6 border-l-2 border-cyan-500/20 relative"
                 >
                   <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                   <h3 className={`text-xl font-display ${role.title.includes('Joint Secretary') || role.title.includes('Campus Ambassador') ? 'text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-white'}`}>{role.title}</h3>
                   <p className="text-slate-300 font-medium mt-1">{role.organization}</p>
                   {role.period && <p className="text-sm font-mono text-cyan-400 mt-2">{role.period}</p>}
                   <ul className="space-y-2 mt-3">
                     {role.points.map((point, i) => (
                       <li key={i} className="text-slate-400 text-sm font-light flex items-start gap-2">
                         <span className="text-cyan-500/50 mt-1">•</span>
                         <span className="leading-relaxed">{point}</span>
                       </li>
                     ))}
                   </ul>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <GraduationCap className="text-purple-400 w-6 h-6" />
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
                   className="pl-6 border-l-2 border-purple-500/20 relative"
                 >
                   <div className="absolute w-3 h-3 bg-purple-400 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                   <h3 className="text-xl text-white font-display">{edu.degree}</h3>
                   <p className="text-slate-400 font-light mt-1">{edu.institution}</p>
                   <div className="flex items-center gap-3 mt-2 font-mono text-sm">
                     <span className="text-purple-400">{edu.period}</span>
                     {edu.cgpa && (
                       <>
                         <span className="text-slate-600">•</span>
                         <span className="text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">{edu.cgpa}</span>
                       </>
                     )}
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Certifications & Milestones */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <Award className="text-[#22d3ee] w-6 h-6" />
              <h2 className="text-3xl font-display font-light text-white">Certifications</h2>
            </motion.div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <ul className="grid sm:grid-cols-1 gap-3">
                {[...profile.certifications, ...(profile.achievements || [])].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="text-slate-300 font-light flex items-start gap-3 hover:text-white transition-colors group"
                  >
                    <Sparkles className="w-5 h-5 text-cyan-500/70 shrink-0 mt-0.5 group-hover:text-cyan-400 transition-colors" />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
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
              <div className="flex flex-col gap-1 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5 transition-colors group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30">
                    <Mail className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <a 
                    href={`mailto:${profile.contact.email}`}
                    className="font-mono text-slate-300 hover:text-cyan-400 hover:underline transition-all block py-2"
                  >
                    {profile.contact.email}
                  </a>
                </div>
                <div className="pl-16">
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.contact.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                  >
                    › Click here to open in Web Gmail
                  </a>
                </div>
              </div>
              
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
