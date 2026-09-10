import React from 'react'
import { Sparkles, ArrowRight, GraduationCap, Award, CheckCircle2, ChevronRight } from 'lucide-react'
import { projectsData } from '../data/projects'
import { profileData } from '../data/profile'
import { certificationsData } from '../data/certifications'
import { sound } from '../utils/sound'

export default function TimelineView({ onOpenProject }) {
  const milestones = [
    {
      year: '2022 – 2026',
      title: 'B.Tech in Artificial Intelligence & Machine Learning',
      organization: 'JB Institute of Engineering and Technology (7.73 CGPA)',
      type: 'education',
      description:
        'Focused on algorithmic foundations, neural networks, object-oriented systems, database management, and building intelligent web systems with end-to-end architecture.',
      skills: ['Machine Learning', 'Python', 'Algorithms', 'DBMS', 'Discrete Math']
    },
    {
      year: '2023',
      title: 'Khaata Book — Atomic Credit Ledger Architecture',
      organization: 'Frontend Engineering & LocalStorage Schema',
      type: 'project',
      projectId: 'khaata-book',
      description:
        'Engineered an offline-first double-entry credit ledger replacing physical bookkeeping. Architected state with React Context API and custom reducers to guarantee zero data loss.',
      skills: ['React.js', 'Context API', 'Tailwind CSS', 'Vite', 'LocalStorage']
    },
    {
      year: '2023 – 2024',
      title: 'Industry Professional Certifications',
      organization: 'CCBP Nxtwave & Udemy Global Credentials',
      type: 'certification',
      description:
        'Attained Certified Python Full Stack Developer certification and completed comprehensive security training spanning OWASP principles and JWT token protocols.',
      skills: ['Full Stack Python', 'Web Security', 'Defensive Coding', 'REST APIs']
    },
    {
      year: '2024',
      title: 'Weather-Outfit-Advisor (SkyWear) — Contextual Engine',
      organization: 'Deployed to Vercel with OpenWeather API',
      type: 'project',
      projectId: 'weather-outfit-advisor',
      description:
        'Shipped an atmospheric context engine mapping real-time meteorological metrics to situational outfit recommendations with GPS auto-detection and zero-framework footprint.',
      skills: ['Modern JS', 'OpenWeather API', 'Geolocation', 'CSS Glassmorphism']
    },
    {
      year: '2024 – Present',
      title: 'FitZone Pro — Next-Gen 3D Fitness Ecosystem',
      organization: 'FastAPI + React + Three.js + SQLite + AI Coach',
      type: 'project',
      projectId: 'fitzone-pro',
      description:
        'Full-stack fitness application combining 3D Three.js kinetic motions, distraction-free live workout sessions with procedural Web Audio rest timers, and an asynchronous Python backend.',
      skills: ['Python FastAPI', 'React.js', 'Three.js', 'SQLAlchemy', 'JWT Auth']
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Cinematic Narrative Path</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineering Evolution & Milestones
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto font-mono">
          From academic AI/ML coursework to production full-stack systems and 3D kinetic interfaces.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-gray-800 ml-4 sm:ml-8 space-y-10">
        {milestones.map((item, idx) => {
          const targetProject = item.projectId
            ? projectsData.find((p) => p.id === item.projectId)
            : null

          return (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Node Marker */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition duration-200 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

              {/* Card Container */}
              <div className="p-6 rounded-3xl bg-gray-900/70 border border-gray-800 hover:border-cyan-500/40 transition-all shadow-xl group-hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {item.year}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{item.organization}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Project Case Study Link */}
                {targetProject && (
                  <button
                    onClick={() => {
                      onOpenProject(targetProject)
                      sound.playOpen()
                    }}
                    data-cursor-text="INSPECT"
                    className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1"
                  >
                    <span>Launch In-Depth Case Study & Sandbox</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
