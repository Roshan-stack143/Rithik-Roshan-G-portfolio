import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 2000);
    const timer2 = setTimeout(() => setPhase(2), 4000);
    const timer3 = setTimeout(onComplete, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="relative flex flex-col items-center">
        {/* Glow behind text */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"
        />

        <div className="h-12 flex items-center justify-center overflow-hidden">
          {phase === 0 && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-2xl font-display tracking-[0.2em] text-cyan-400 uppercase neon-text-cyan"
            >
              Initializing Profile
            </motion.p>
          )}
          {phase === 1 && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-2xl font-display tracking-[0.2em] text-indigo-400 uppercase"
            >
              Loading Journey
            </motion.p>
          )}
           {phase === 2 && (
            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-display tracking-[0.3em] text-white uppercase neon-text-cyan"
            >
              System Ready
            </motion.p>
          )}
        </div>

        {/* Loading bar */}
        <div className="w-64 h-1 mt-8 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}
