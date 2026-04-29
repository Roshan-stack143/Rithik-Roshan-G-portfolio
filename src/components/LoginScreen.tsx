import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User } from 'lucide-react';

export function LoginScreen({ onComplete }: { onComplete: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login verification
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        
        {/* Base Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop" 
          alt="Professional Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Animated Moving UI/UX Images */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 h-[35vh] w-[200vw] sm:w-[400vw] flex animate-[film-slide-right_40s_linear_infinite] opacity-40 pointer-events-none origin-center rotate-[2deg] drop-shadow-xl z-0">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-4 sm:gap-8 h-full items-center px-2 sm:px-4">
              {[
                "1581291518633-83b4ebd1d83e", // UI Tablet
                "1561070791331-741a4a28bb70", // UI Dashboard
                "1507238691740-14c27d762063", // Wireframing
                "1618761714954-0b8cd0026356", // Mobile UI
                "1551288049-bebda4e38f71", // Dark UI
                "1555421689-d68471e189f2", // Code Design
              ].map((id, index) => (
                <div key={`${arrayIndex}-${index}`} className="relative h-full aspect-[4/3] sm:aspect-video bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center shadow-lg overflow-hidden rounded-2xl">
                  <img 
                    src={`https://images.unsplash.com/${id}?q=80&w=600&auto=format&fit=crop`}
                    alt="UI/UX Design"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-[1.1] grayscale-[0.2]"
                  />
                  <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Global Dark Overlay - Clean and minimal */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[4px] z-10" />
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full z-10 pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full z-10 pointer-events-none mix-blend-screen" />
      </div>

      {/* Login Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full max-w-md bg-white/[0.03] backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-cyan-500/10"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-display font-light text-white mb-2 tracking-wider"
          >
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Access</span>
          </motion.h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Identify to continue journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Identity (Username)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <User className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/5 transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                placeholder="Enter identifier..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Passcode</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/5 transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden rounded-xl p-[1px] mt-8"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-slate-950/80 backdrop-blur-md px-4 py-3.5 rounded-[11px] flex items-center justify-center gap-2 group-hover:bg-slate-900/60 transition-colors">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                  <span className="text-white font-medium tracking-wide">Authenticating...</span>
                </>
              ) : (
                <span className="text-white font-medium tracking-wide">Enter Portfolio</span>
              )}
            </div>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
