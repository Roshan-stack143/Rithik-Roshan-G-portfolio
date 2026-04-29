import { UserProfile } from '../../types';
import { motion } from 'motion/react';
import { Edit3, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { enhanceText } from '../../services/aiService';

interface AboutProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export function About({ profile, onUpdate }: AboutProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ about: profile.about, goal: profile.careerGoal });
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    onUpdate({
      about: editData.about,
      careerGoal: editData.goal
    });
    setIsEditing(false);
  };

  const handleAiAction = async (action: string) => {
    setIsGenerating(true);
    try {
      const promptMap: Record<string, string> = {
        'Update your skills?': 'Please rewrite this text to highlight a growth in technical skills and continuous learning.',
        'Add a new project?': 'Please rewrite this text to emphasize recent project completions and leadership.',
        'Modify your summary?': 'Please rewrite this text to make it sound more cinematic and professional.'
      };

      const baseText = editData.about;
      const instruction = promptMap[action] || action;
      const enhanced = await enhanceText(`Original Text: ${baseText}\n\nInstruction: ${instruction}`);
      setEditData(prev => ({ ...prev, about: enhanced }));
    } catch(e) {
      console.error(e);
    }
    setIsGenerating(false);
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image Side */}
          <div className="relative group perspective-[1000px]">
             <motion.div 
               className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 shadow-xl transform-gpu transition-all duration-500 hover:scale-[1.02]"
             >
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent z-10 opacity-90" />
                  <img 
                    src={profile.profileImage || "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop"} 
                    alt="User Profile UI"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Decorative Elements */}
                  <div className="absolute bottom-8 left-8 z-20">
                    <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-1">Design Thinking</p>
                    <p className="font-display sm:text-2xl md:text-3xl font-medium text-white shadow-sm">UI Development Journey</p>
                  </div>
                </div>
             </motion.div>
          </div>

          {/* Text Side */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-display font-light mb-8 text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Story</span>
            </h2>

            {isEditing ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-panel p-6 rounded-xl space-y-4"
              >
                {/* AI Assistant Section */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">AI Assistant</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Update your skills?', 'Add a new project?', 'Modify your summary?'].map(action => (
                       <button
                         key={action}
                         onClick={() => handleAiAction(action)}
                         disabled={isGenerating}
                         className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-mono rounded-md border border-indigo-500/30 transition-colors disabled:opacity-50"
                       >
                         {action}
                       </button>
                    ))}
                  </div>
                  <div className="mt-3 relative">
                     <input
                       type="text"
                       value={aiPrompt}
                       onChange={e => setAiPrompt(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleAiAction(`Custom request: ${aiPrompt}`)}
                       placeholder="Or type a custom modification..."
                       disabled={isGenerating}
                       className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none placeholder:text-slate-500"
                     />
                  </div>
                  {isGenerating && <p className="text-xs text-indigo-400 mt-2 font-mono">Generating response...</p>}
                </div>

                <div>
                  <label className="block text-sm font-mono text-cyan-400 mb-2">About (Summary)</label>
                  <textarea 
                    value={editData.about}
                    onChange={(e) => setEditData({...editData, about: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-400/50 outline-none h-32 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-cyan-400 mb-2">Career Goal</label>
                  <input 
                    type="text"
                    value={editData.goal}
                    onChange={(e) => setEditData({...editData, goal: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-400/50 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 text-sm bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg border border-cyan-500/50 transition-colors">Save Route</button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-8 relative group">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute -right-4 -top-4 p-2 bg-white/5 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 hover:border-cyan-400/50 text-slate-300 z-10"
                  title="Update Coordinates (Edit)"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <div className="space-y-4 text-slate-300 sm:text-lg leading-relaxed font-light">
                  <p>{profile.about}</p>
                </div>

                <div className="glass-panel p-6 rounded-xl border-l-4 border-l-cyan-400 bg-cyan-500/5">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2">Primary Objective</h3>
                  <p className="text-white sm:text-lg font-display">{profile.careerGoal}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
