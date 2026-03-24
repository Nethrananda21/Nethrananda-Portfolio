import React from 'react';
import Aurora from './components/Aurora';
import DecryptedText from './components/DecryptedText';
import ShinyText from './components/ShinyText';
import GradientText from './components/GradientText';
import ScrollFloat from './components/ScrollFloat';
import CountUp from './components/CountUp';
import StarBorder from './components/StarBorder';
import ClickSpark from './components/ClickSpark';
import MagicBento, { MagicBentoCard } from './components/MagicBento';
import InteractiveProjectCards from './components/InteractiveProjectCards';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

function App() {
  return (
    <ClickSpark sparkColor="#a78bfa" sparkCount={10}>
      <div className="relative font-sans text-neutral-100 overflow-x-hidden w-full m-0 p-0 selection:bg-purple-500/30">
        <Aurora />

        <main className="w-full flex justify-center">
          <div className="w-full max-w-[1400px] px-6 md:px-16 flex flex-col gap-0">

            {/* ====== 1. INTRO & SUMMARY ====== */}
            <section className="min-h-screen flex flex-col justify-center gap-6 py-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <GradientText
                  colors={['#60a5fa', '#a78bfa', '#f472b6', '#60a5fa']}
                  animationSpeed={4}
                  showBorder={true}
                  className="text-sm font-bold tracking-[0.2em] uppercase"
                >
                  Generative AI & Software Engineer
                </GradientText>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[1.05] tracking-tight text-white max-w-[1200px]">
                <DecryptedText
                  text="Nethrananda Reddy"
                  speed={40}
                  sequential={true}
                  animateOn="view"
                  className=""
                />
              </h1>

              <div className="text-xl md:text-3xl font-light max-w-3xl leading-relaxed">
                <ShinyText
                  text="Building scalable intelligence, real-time systems, and generative architectures."
                  speed={4}
                  className=""
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex flex-wrap gap-4 mt-8 text-base font-medium"
              >
                <a href="mailto:reddynethrananda@gmail.com" className="px-8 py-4 bg-white text-black rounded-full hover:bg-neutral-200 transition-all hover:scale-105 font-semibold">Contact Me</a>
                <a href="https://linkedin.com/in/nethrananda/" target="_blank" rel="noreferrer" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all hover:scale-105">LinkedIn</a>
                <a href="https://github.com/Nethrananda21" target="_blank" rel="noreferrer" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all hover:scale-105">GitHub</a>
              </motion.div>
            </section>

            {/* ====== 2. SKILLS ====== */}
            <section className="py-28">
              <div className="flex flex-col gap-12">
                <ScrollFloat className="text-5xl md:text-6xl font-bold tracking-tight text-white">Skills</ScrollFloat>
                <MagicBento>
                  <MagicBentoCard>
                    <h3 className="text-lg text-blue-400 mb-3 font-semibold uppercase tracking-widest">Languages</h3>
                    <div className="flex flex-wrap gap-3">
                      {['C++', 'C', 'Java', 'Python'].map(s => (
                        <span key={s} className="px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-lg font-medium">{s}</span>
                      ))}
                    </div>
                  </MagicBentoCard>
                  <MagicBentoCard>
                    <h3 className="text-lg text-purple-400 mb-3 font-semibold uppercase tracking-widest">Tools & Platforms</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Git', 'GitHub', 'Linux', 'Docker', 'PostgreSQL'].map(s => (
                        <span key={s} className="px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-lg font-medium">{s}</span>
                      ))}
                    </div>
                  </MagicBentoCard>
                  <MagicBentoCard>
                    <h3 className="text-lg text-teal-400 mb-3 font-semibold uppercase tracking-widest">Core Competencies</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Team Leadership', 'Adaptability', 'Fast Learner', 'Problem Solving'].map(s => (
                        <span key={s} className="px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-lg font-medium">{s}</span>
                      ))}
                    </div>
                  </MagicBentoCard>
                </MagicBento>
              </div>
            </section>

            {/* ====== 3. PROJECTS ====== */}
            <section className="py-28">
              <div className="flex flex-col gap-16">
                <ScrollFloat className="text-5xl md:text-6xl font-bold tracking-tight text-white">Projects</ScrollFloat>
                <InteractiveProjectCards />
              </div>
            </section>

            {/* ====== 4. TRAINING & CERTIFICATIONS ====== */}
            <section className="py-28">
              <div className="flex flex-col gap-12">
                <ScrollFloat className="text-5xl md:text-6xl font-bold tracking-tight text-white">Training & Certifications</ScrollFloat>
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Data Structures & Algorithms', org: 'CipherSchools', date: 'July 2025', icon: '📊', color: 'rgba(96, 165, 250, 0.6)' },
                    { title: 'Master Generative AI & Tools', org: 'Infosys Springboard', date: 'Sep 2025', icon: '🤖', color: 'rgba(168, 85, 247, 0.6)' },
                    { title: 'Ethical Hacking', org: 'NPTEL', date: 'Nov 2025', icon: '🛡️', color: 'rgba(20, 184, 166, 0.6)' },
                    { title: 'Computer Communications', org: 'Coursera', date: 'Mar 2024', icon: '🌐', color: 'rgba(245, 158, 11, 0.6)' }
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeUp}>
                      <StarBorder color={item.color} speed={`${6 + i}s`} className="h-full">
                        <div className="flex items-start gap-4 h-full">
                          <span className="text-3xl mt-1">{item.icon}</span>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-neutral-400">{item.org}</p>
                            <p className="text-neutral-500 font-mono text-xs mt-2 tracking-widest uppercase">{item.date}</p>
                          </div>
                        </div>
                      </StarBorder>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ====== 5. ACHIEVEMENTS ====== */}
            <section className="py-28">
              <div className="flex flex-col gap-12">
                <ScrollFloat className="text-5xl md:text-6xl font-bold tracking-tight text-white">Achievements</ScrollFloat>
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={fadeUp} className="h-full">
                    <StarBorder color="rgba(96, 165, 250, 0.6)" className="h-full">
                      <div className="text-4xl mb-3">🏆</div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-white">Top</span>
                        <CountUp to={8} from={0} duration={1.5} className="text-4xl font-bold text-blue-400 font-mono" />
                      </div>
                      <p className="text-blue-400 font-semibold mb-2">Competitive Coding Challenge</p>
                      <p className="text-neutral-400 text-sm leading-relaxed">200+ participants. Applied efficient algorithms and logical reasoning within strict time limits.</p>
                      <p className="text-blue-500/50 font-mono text-xs mt-3 tracking-widest">NOVEMBER 2025</p>
                    </StarBorder>
                  </motion.div>
                  <motion.div variants={fadeUp} className="h-full">
                    <StarBorder color="rgba(168, 85, 247, 0.6)" className="h-full">
                      <div className="text-4xl mb-3">🛡️</div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-white">Top</span>
                        <CountUp to={15} from={0} duration={1.5} className="text-4xl font-bold text-purple-400 font-mono" />
                      </div>
                      <p className="text-purple-400 font-semibold mb-2">Cybersecurity Hackathon</p>
                      <p className="text-neutral-400 text-sm leading-relaxed">180 teams. Intrusion detection and response strategy expertise.</p>
                      <p className="text-purple-500/50 font-mono text-xs mt-3 tracking-widest">DECEMBER 2024</p>
                    </StarBorder>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* ====== 6. EDUCATION ====== */}
            <section className="py-28">
              <div className="flex flex-col gap-12">
                <ScrollFloat className="text-5xl md:text-6xl font-bold tracking-tight text-white">Education</ScrollFloat>
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={fadeUp} className="h-full">
                    <StarBorder color="rgba(52, 211, 153, 0.5)" className="h-full">
                      <span className="text-3xl mb-3 block">🎓</span>
                      <h3 className="text-2xl font-bold text-white mb-1">Lovely Professional University</h3>
                      <p className="text-neutral-400 mb-3">B.Tech — Computer Science and Engineering</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-neutral-400 text-sm">CGPA:</span>
                        <CountUp to={8.2} from={0} duration={2} className="text-3xl text-emerald-400 font-mono font-bold" />
                      </div>
                      <p className="text-neutral-500 tracking-widest uppercase text-xs mt-2">Phagwara, Punjab • 2023 – Present</p>
                    </StarBorder>
                  </motion.div>
                  <motion.div variants={fadeUp} className="h-full">
                    <StarBorder color="rgba(52, 211, 153, 0.5)" speed="8s" className="h-full">
                      <span className="text-3xl mb-3 block">📚</span>
                      <h3 className="text-2xl font-bold text-white mb-1">Narayana Junior College</h3>
                      <p className="text-neutral-400 mb-3">Intermediate (Class XII)</p>
                      <div className="flex items-baseline gap-1">
                        <CountUp to={92} from={0} duration={2} className="text-3xl text-emerald-400 font-mono font-bold" />
                        <span className="text-emerald-400 text-2xl font-bold">%</span>
                      </div>
                      <p className="text-neutral-500 tracking-widest uppercase text-xs mt-2">Tirupati, AP • 2021 – 2023</p>
                    </StarBorder>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 text-center border-t border-white/5">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <p className="text-neutral-500 text-sm">© 2026 Mittapalyam Nethrananda Reddy. Built with React & ReactBits.</p>
              </motion.div>
            </footer>
          </div>
        </main>
      </div>
    </ClickSpark>
  );
}

export default App;
