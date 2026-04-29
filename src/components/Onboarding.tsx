import { motion, AnimatePresence } from 'motion/react';
import { useState, ChangeEvent } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  initialData: UserProfile;
  onComplete: (data: UserProfile) => void;
}

export function Onboarding({ initialData, onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<UserProfile>(initialData);

  const steps = [
    {
      id: 'welcome',
      title: "Identify Yourself",
      question: "Who are you?",
      field: 'name',
      placeholder: "e.g., Alex Voyager",
      helper: "This will be the title of your journey."
    },
    {
      id: 'roles',
      title: "Your Archetype",
      question: "What are your primary roles?",
      field: 'roles',
      placeholder: "e.g., AI Developer, UI/UX Designer (comma separated)",
      helper: "Define your character class in the tech world."
    },
    {
      id: 'goal',
      title: "The Destination",
      question: "What is your career goal?",
      field: 'careerGoal',
      placeholder: "e.g., To build humane AI systems.",
      helper: "Where is this journey taking you?"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const currentStep = steps[step];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentStep.field === 'roles') {
      setFormData({ ...formData, roles: e.target.value.split(',').map(r => r.trim()) });
    } else {
      setFormData({ ...formData, [currentStep.field]: e.target.value });
    }
  };

  const getValue = () => {
    if (currentStep.field === 'roles') return formData.roles.join(', ');
    return formData[currentStep.field as keyof UserProfile] as string;
  };

  return (
    <div className="fixed inset-0 z-40 bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Background cinematic effects */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/30 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-2xl glass-panel p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden">
        {/* Subtle scan line */}
        <motion.div
           animate={{ top: ['-10%', '110%'] }}
           transition={{ duration: 3, ease: "linear", repeat: Infinity }}
           className="absolute left-0 right-0 h-[1px] bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-0 pointer-events-none"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8 text-cyan-400 font-mono text-sm uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Calibration // Step 0{step + 1}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-[200px]"
            >
              <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-2 neon-text-cyan opacity-90">
                {currentStep.title}
              </h2>
              <p className="text-xl text-slate-400 mb-8 font-light">
                {currentStep.question}
              </p>

              <div className="relative group">
                <input
                  type="text"
                  value={getValue()}
                  onChange={handleChange}
                  placeholder={currentStep.placeholder}
                  className="w-full bg-transparent border-b-2 border-white/20 px-0 py-4 text-2xl text-white outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-700"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNext();
                  }}
                />
                <p className="mt-3 text-sm text-slate-500 font-mono">{currentStep.helper}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex justify-between items-center">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-cyan-400' : i < step ? 'w-4 bg-indigo-500/50' : 'w-4 bg-white/20'}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-white font-medium group"
            >
              {step === steps.length - 1 ? 'Initialize' : 'Next'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
