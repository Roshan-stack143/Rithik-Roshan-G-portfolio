import { UserProfile } from '../../types';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export function Hero({ profile }: { profile: UserProfile }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 bg-slate-950"
      >
        <div className="absolute inset-0 bg-slate-900/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10" />
        <img 
          src={profile.profileImage || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"} 
          alt="Clean coding background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center text-center px-6 mt-20"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-mono text-cyan-400 tracking-[0.3em] uppercase text-sm mb-6">Subject Identity</p>
          <h1 className="text-6xl md:text-8xl font-display font-light text-white mb-6 uppercase tracking-tight">
            {profile.name}
          </h1>
        </motion.div>

        {/* Roles Animation */}
        <div className="h-12 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, -48, -96, -144, 0] }} // Adjust based on number of roles + padding
            transition={{ duration: 8, repeat: Infinity, ease: "circInOut" }}
            className="flex flex-col items-center gap-6"
          >
            {profile.roles.map((role, i) => (
              <div key={i} className="h-12 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-light text-slate-300">
                  {role}
                </span>
              </div>
            ))}
            {/* Duplicate first element for seamless loop */}
            {profile.roles.length > 0 && (
               <div className="h-12 flex items-center justify-center">
                 <span className="text-xl md:text-2xl font-light text-slate-300">
                   {profile.roles[0]}
                 </span>
               </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 z-20 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Begin Journey</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-cyan-500/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
