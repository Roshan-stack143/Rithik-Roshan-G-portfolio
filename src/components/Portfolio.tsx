import { UserProfile } from '../types';
import { Hero } from './portfolio/Hero';
import { About } from './portfolio/About';
import { Skills } from './portfolio/Skills';
import { Projects } from './portfolio/Projects';
import { ContactAndCerts } from './portfolio/ContactAndCerts';
import { ProfileSettings } from './ProfileSettings';
import { motion, useScroll, useSpring } from 'motion/react';

interface PortfolioProps {
  profile: UserProfile;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
}

export function Portfolio({ profile, onUpdateProfile }: PortfolioProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <ProfileSettings profile={profile} onUpdate={onUpdateProfile} />

      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        style={{ scaleX }}
      />
      
      {/* Fixed Navigation/Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
           <div className="font-display font-medium text-white tracking-widest uppercase text-sm glass-panel px-4 py-2 rounded-full pointer-events-auto">
             {profile.name}
           </div>
           <nav className="hidden md:flex gap-6 pointer-events-auto glass-panel px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-slate-300">
             <a href="#about" className="hover:text-cyan-400 transition-colors">Story</a>
             <a href="#skills" className="hover:text-cyan-400 transition-colors">Capabilities</a>
             <a href="#projects" className="hover:text-cyan-400 transition-colors">Expeditions</a>
             <a href="#contact" className="hover:text-cyan-400 transition-colors">Comms</a>
           </nav>
        </div>
      </header>

      <main>
        <Hero profile={profile} />
        <About profile={profile} onUpdate={onUpdateProfile} />
        <Skills profile={profile} />
        <Projects profile={profile} />
        <ContactAndCerts profile={profile} />
      </main>
    </div>
  );
}
