import { motion } from 'motion/react';
import { useEffect } from 'react';

export function TransitionScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Central portal effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 4], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute w-[800px] h-[800px] border-[2px] border-cyan-500/30 rounded-full flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] border-[1px] border-indigo-500/40 rounded-full" />
        <div className="absolute w-full h-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl rounded-full mix-blend-screen" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [20, 0, -20] }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="relative z-10 glass-panel px-12 py-8 rounded-2xl border-white/20 text-center"
      >
        <h1 className="text-5xl font-display font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 tracking-wider">
          Enter Portfolio
        </h1>
        <p className="mt-4 text-slate-400 font-mono tracking-widest text-sm uppercase">
          Coordinates Locked
        </p>
      </motion.div>
    </div>
  );
}
