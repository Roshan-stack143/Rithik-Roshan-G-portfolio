import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Upload, Link as LinkIcon, Sparkles, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { UserProfile } from '../types';
import { generateProfileFromResume } from '../services/aiService';

export function ProfileSettings({ 
  profile, 
  onUpdate 
}: { 
  profile: UserProfile; 
  onUpdate: (data: Partial<UserProfile>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Editable fields
  const [resumeText, setResumeText] = useState('');
  const [linkedin, setLinkedin] = useState(profile.contact.linkedin);
  const [github, setGithub] = useState(profile.contact.github);
  const [name, setName] = useState(profile.name);

  // File Preview States
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(profile.profileImage || null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const vidInputRef = useRef<HTMLInputElement>(null);

  // Handle generalized uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf_txt' | 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'pdf_txt') {
      setResumeFile(file);
      // Fallback for reading text directly from txt files for our AI mock feature.
      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => setResumeText(e.target?.result as string);
        reader.readAsText(file);
      } else {
        setResumeText(`[PDF Context extracted from: ${file.name}]`);
      }
    } else if (type === 'image') {
       const url = URL.createObjectURL(file);
       setPreviewImage(url);
       // Immediately update the profile so hero image changes
       onUpdate({ profileImage: url });
    } else if (type === 'video') {
       const url = URL.createObjectURL(file);
       setPreviewVideo(url);
       // We can store demo videos in profile if needed, or just preview them
    }
  };

  // Simulated AI Generation (In production, wire to Gemini API)
  const handleAIGenerate = async () => {
    setIsGenerating(true);
    setErrorText('');
    try {
      if (resumeText) {
        const generatedData = await generateProfileFromResume(resumeText, linkedin, github);
        
        onUpdate({
          name: name,
          contact: {
            ...profile.contact,
            linkedin,
            github
          },
          about: generatedData?.about || profile.about,
          skills: generatedData?.skills || profile.skills
        });
      } else {
        // Just update normal fields if no AI needed
        onUpdate({
          name: name,
          contact: {
            ...profile.contact,
            linkedin,
            github
          }
        });
      }
      setIsOpen(false);
    } catch (e: any) {
      console.error(e);
      setErrorText(e.message || "Failed to generate AI profile.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-white/10 transition-all pointer-events-auto shadow-[0_0_15px_rgba(34,211,238,0.1)] group"
        title="Settings & Profile Generation"
      >
        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
                <div>
                   <h2 className="text-xl font-display text-white border-l-2 border-cyan-400 pl-3">Nav Computer</h2>
                   <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mt-1">AI Profile Setup</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-8 hide-scrollbar">
                
                {/* Media Uploads Grid */}
                <div className="space-y-4">
                   <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">Media & Assets</h3>
                   <div className="grid grid-cols-2 gap-3">
                     
                     {/* Image Upload */}
                     <div 
                       onClick={() => imgInputRef.current?.click()}
                       className="border border-dashed border-white/20 rounded-xl p-4 text-center hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all cursor-pointer relative overflow-hidden"
                     >
                        {previewImage ? (
                          <div className="absolute inset-0 opacity-40">
                             <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        ) : null}
                        <div className="relative z-10">
                          <ImageIcon className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                          <p className="text-xs text-slate-300">Update Profile/Journey Image</p>
                        </div>
                        <input type="file" ref={imgInputRef} accept="image/*" onChange={e => handleFileUpload(e, 'image')} className="hidden" />
                     </div>

                     {/* Video Upload */}
                     <div 
                       onClick={() => vidInputRef.current?.click()}
                       className="border border-dashed border-white/20 rounded-xl p-4 text-center hover:border-purple-400/50 hover:bg-purple-500/5 transition-all cursor-pointer"
                     >
                        <Video className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                        <p className="text-xs text-slate-300">Upload Video Reel</p>
                        {previewVideo && <p className="text-[10px] text-purple-400 mt-1 truncate">Ready</p>}
                        <input type="file" ref={vidInputRef} accept="video/*" onChange={e => handleFileUpload(e, 'video')} className="hidden" />
                     </div>
                   </div>

                   {/* Video Preview Block if Video Uploaded */}
                   {previewVideo && (
                     <div className="w-full aspect-video rounded-xl overflow-hidden bg-black mt-3 relative border border-white/10 group">
                       <video src={previewVideo} controls className="w-full h-full object-cover" />
                     </div>
                   )}
                </div>

                {/* Project Image Overrides */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">Project Image Overrides</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.projects.map((project, idx) => (
                      <div key={project.id} className="border border-white/10 rounded-lg p-2 bg-black/20 flex flex-col gap-2 relative">
                        <span className="text-[10px] text-slate-300 font-medium truncate block" title={project.title}>{project.title}</span>
                        <div className="relative group rounded overflow-hidden aspect-video border border-dashed border-white/20 hover:border-cyan-400/50 cursor-pointer">
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <ImageIcon className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                const newProjects = [...profile.projects];
                                newProjects[idx] = { ...newProjects[idx], imageUrl: url };
                                onUpdate({ projects: newProjects });
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Identity Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">Identity Override</h3>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* External Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">External Synapse Links</h3>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={linkedin}
                      onChange={e => setLinkedin(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-cyan-500 outline-none transition-colors text-sm"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={github}
                      onChange={e => setGithub(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-cyan-500 outline-none transition-colors text-sm"
                      placeholder="GitHub URL"
                    />
                  </div>
                </div>

                {/* AI Resume Upload */}
                <div className="space-y-4">
                   <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                     <Sparkles className="w-4 h-4" />
                     AI Knowledge Base
                   </h3>
                   <div 
                     onClick={() => fileInputRef.current?.click()}
                     className="border border-dashed border-white/20 rounded-xl p-8 text-center hover:border-indigo-400/50 hover:bg-indigo-500/5 transition-all group relative overflow-hidden cursor-pointer"
                   >
                     <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     {resumeFile ? <FileText className="w-8 h-8 text-indigo-400 mx-auto mb-3" /> : <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mx-auto mb-3 transition-colors" />}
                     <p className="text-slate-300 text-sm mb-1">{resumeFile ? resumeFile.name : 'Upload Resume (PDF/TXT)'}</p>
                     <p className="text-slate-500 text-xs">Used to regenerate journey context.</p>
                     <input 
                       type="file" 
                       ref={fileInputRef}
                       accept=".txt,.pdf"
                       onChange={(e) => handleFileUpload(e, 'pdf_txt')}
                       className="hidden" 
                     />
                   </div>

                   <div>
                     <label className="text-xs text-slate-400 mb-1 block uppercase tracking-widest font-mono">Or Paste Raw Data:</label>
                     <textarea 
                       value={resumeText}
                       onChange={e => setResumeText(e.target.value)}
                       className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors h-32 resize-none"
                       placeholder="Paste your past experiences, skills, etc. here..."
                     />
                   </div>
                </div>

              </div>

              <div className="p-6 border-t border-white/10 bg-slate-950">
                 {errorText && (
                   <p className="text-red-400 text-xs mb-3 font-mono">{errorText}</p>
                 )}
                 <button 
                   onClick={handleAIGenerate}
                   disabled={isGenerating}
                   className="w-full relative group overflow-hidden rounded-lg p-[1px]"
                 >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-lg group-hover:opacity-100 opacity-70 transition-opacity" />
                    <div className="relative bg-slate-900 px-4 py-3 rounded-[7px] flex items-center justify-center gap-2 hover:bg-slate-900/80 transition-colors">
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                          <span className="text-white text-sm font-medium">Generating Journey...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                          <span className="text-white text-sm font-medium uppercase tracking-wider">Regenerate Profile via AI</span>
                        </>
                      )}
                    </div>
                 </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
