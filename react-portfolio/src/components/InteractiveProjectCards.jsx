import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'FireNexus',
    github: 'https://github.com/Nethrananda21/fire-nexus',
    tags: ['React', 'Node.js', 'Firebase', 'WebSockets'],
    summary: 'Real-time collaborative workspace platform.',
    details: 'FireNexus is a comprehensive real-time collaboration platform featuring live messaging, document sharing, and presence indicators. Built with a highly scalable architecture to handle concurrent connections efficiently, it leverages Firebase for realtime sync and WebSockets for low-latency live updates across remote teams.',
    challenges: 'Handling state synchronization across hundreds of clients simultaneously without degrading UI performance required optimizing React renders and batching Firebase listeners. Designed a custom messaging queue to prevent data loss during momentary network disconnections.',
    color: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    icon: '🔥',
  },
  {
    id: 2,
    title: 'Geom_Diffusion (Generative AI)',
    github: 'https://github.com/Nethrananda21/De-Novo-Drug-Discovery-AI',
    tags: ['Python', 'PyTorch', 'EGNN', 'DDPM', 'RDKit'],
    summary: 'AI-driven pipeline for novel molecule generation and drug design.',
    details: 'Built a Generative AI platform for structure-based drug design utilizing a PyTorch implementation of E(3)-equivariant diffusion models. The system is integrated with equivariant graph neural networks (EGNN) and classifier-free guidance for highly precise pocket-conditioned molecular generation.',
    challenges: 'Engineered a memory-efficient, T4-safe architecture employing a cosine noise schedule. Successfully achieved >95% RDKit validity, >90% uniqueness, >0.5 QED (drug-likeness), and < -7.0 Vina score binding affinity on held-out protein pockets.',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    icon: '🧬',
  },
  {
    id: 3,
    title: 'CLIF Framework',
    github: 'https://github.com/Nethrananda21',
    tags: ['Python', 'Go', 'ClickHouse', 'Redpanda', 'LightGBM'],
    summary: 'Cognitive Log Investigation Framework & Data Pipeline.',
    details: 'Built a high-throughput data pipeline using Redpanda and ClickHouse, processing millions of records with 0% data loss via batching and parallelization; sustained 66,586 events/sec and ensured integrity using Merkle tree anchoring. Developed a 3-agent LLM system (Triage, Hunter, Verifier) that automated 7,476 investigations.',
    challenges: 'Achieving strong validation (F1: 0.9469) across automated investigations and improving data quality using an ML ensemble (LightGBM, EIF, ARF) with SHAP explainability for maximum transparency.',
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-500/20',
    icon: '🧠',
  },
  {
    id: 4,
    title: 'Right To Repair',
    github: 'https://github.com/Nethrananda21/Right-To-Repair',
    tags: ['Next.js', 'Tailwind', 'PostgreSQL', 'Prisma'],
    summary: 'Marketplace facilitating device repairs with independent technicians.',
    details: 'A dedicated marketplace connecting consumers with broken devices to certified independent technicians. The platform promotes the circular economy by providing transparent pricing, technician reviews, and tracking of device repair status from start to finish.',
    challenges: 'Designing a secure escrow-like payment and dispute resolution system strictly using Stripe Connect features, along with real-time status tracking for fragmented repair milestones.',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    icon: '🔧',
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const fadeSlideItem = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

export default function InteractiveProjectCards() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const selectedProject = projects.find(p => p.id === selectedId) || projects[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full min-h-[550px] items-center">
      {/* Left: Cards List */}
      <div className="relative flex-1 flex flex-col items-center justify-center min-h-[450px] w-full mt-10 lg:mt-0">
        <div className="relative w-full max-w-sm h-[360px] perspective-1000">
          {projects.map((project, index) => {
            const isSelected = project.id === selectedId;
            const posOffset = (index - projects.findIndex(p => p.id === selectedId));
            
            // Complex 3D transforms for a beautiful stacked card effect
            let rotateX = isSelected ? 0 : 5;
            let rotateZ = isSelected ? 0 : posOffset > 0 ? posOffset * 4 : posOffset * 4;
            let y = isSelected ? 0 : Math.abs(posOffset) * 24;
            let x = isSelected ? 0 : posOffset * 15;
            let scale = isSelected ? 1 : 1 - Math.abs(posOffset) * 0.06;
            let zIndex = projects.length - Math.abs(posOffset);

            return (
              <motion.div
                key={project.id}
                className="absolute inset-0 cursor-pointer origin-bottom"
                onClick={() => setSelectedId(project.id)}
                initial={false}
                animate={{
                  rotateX: rotateX,
                  rotateZ: rotateZ,
                  y: y,
                  x: x,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: Math.abs(posOffset) > 2 ? 0 : 1
                }}
                whileHover={{
                  scale: isSelected ? 1.02 : scale + 0.02,
                  y: isSelected ? -5 : y - 5,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div 
                  className={`w-full h-full p-8 rounded-3xl border flex flex-col transition-all duration-500 overflow-hidden
                    ${isSelected 
                      ? `bg-black/80 bg-gradient-to-br ${project.color} ${project.border} shadow-2xl ${project.glow} backdrop-blur-xl` 
                      : 'bg-neutral-900/80 border-white/5 backdrop-blur-sm grayscale-[50%]'}`}
                >
                  {/* Subtle background glow blob inside the active card */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeCardGlow"
                      className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 blur-[50px] rounded-full text-transparent"
                    />
                  )}

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className="text-4xl filter drop-shadow-lg">{project.icon}</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                  </div>

                  <h3 className={`text-2xl font-bold mb-3 tracking-tight ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm flex-1 leading-relaxed ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {project.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium ${isSelected ? 'bg-white/10 text-white' : 'bg-white/5 text-neutral-500'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right: Selected Details */}
      <div className="flex-1 lg:max-w-[50%] w-full h-[550px]">
        <div className={`relative h-full bg-neutral-900/40 border ${selectedProject.border} rounded-[2rem] p-8 md:p-10 backdrop-blur-xl overflow-hidden shadow-2xl ${selectedProject.glow} transition-colors duration-500 flex flex-col`}>
          
          {/* Ambient background glow inside the details card */}
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${selectedProject.color} opacity-30 pointer-events-none rounded-[2rem] transition-colors duration-500`} />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col h-full relative z-10"
            >
              <motion.div variants={fadeSlideItem} className="flex items-center gap-4 mb-6">
                <span className="text-4xl md:text-5xl">{selectedProject.icon}</span>
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 tracking-tight leading-tight">
                  {selectedProject.title}
                </h2>
              </motion.div>

              <motion.div variants={fadeSlideItem} className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 text-white border border-white/10 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </motion.div>
              
              <motion.div variants={fadeSlideItem} className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-4 backdrop-blur-sm">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  Overview
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {selectedProject.details}
                </p>
              </motion.div>
              
              <motion.div variants={fadeSlideItem} className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-8 backdrop-blur-sm flex-1 overflow-hidden">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Key Challenges Solved
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed overflow-y-auto max-h-[100px] scrollbar-hide pr-2">
                  {selectedProject.challenges}
                </p>
              </motion.div>

              <motion.div variants={fadeSlideItem} className="mt-auto self-start">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-full transition-all duration-300 group"
                >
                  <span className="font-bold text-sm text-white tracking-wide group-hover:text-purple-300 transition-colors">View on GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-purple-300 transition-colors group-hover:translate-x-1 duration-300"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
