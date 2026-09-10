import { Terminal, ArrowRight, Mail, Phone, Sparkles, Code, Cpu } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import { sound } from '../utils/sound'
import { profileData } from '../data/profile'

export default function HeroSection({ onOpenCommandPalette, onSwitchView, onOpenResume }) {
  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center text-center z-10">
      {/* Availability Status Badge */}
      <div 
        onClick={() => {
          onOpenCommandPalette()
          sound.playClick()
        }}
        data-cursor-text="DISCOVER"
        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-8 cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>{profileData.status}</span>
        <span className="text-gray-500">// Press ⌘K</span>
      </div>

      {/* Main Name & Identity */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400">
          MEDISHETTY
        </span>{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
          KIRAN KUMAR
        </span>
      </h1>

      {/* Role / Subtitle */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-lg font-mono text-cyan-300/90 mb-6">
        <span className="flex items-center space-x-1.5">
          <Code className="w-4 h-4 text-cyan-400" />
          <span>Full-Stack Developer</span>
        </span>
        <span className="text-gray-600">•</span>
        <span className="flex items-center space-x-1.5">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>AI / ML Engineer</span>
        </span>
        <span className="text-gray-600">•</span>
        <span className="text-emerald-400">B.Tech AIML (7.73 CGPA)</span>
      </div>

      {/* Elevator Pitch / Summary */}
      <p className="max-w-2xl text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
        Full-stack developer with hands-on experience building and deploying React.js and Python applications, 
        including a live credit-tracking app and a weather-recommendation tool used end-to-end from UI to deployment. 
        Strong foundation in AI/ML through academic coursework; comfortable owning a project from design through deployment.
      </p>

      {/* Interactive Action Hub */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={() => {
            const el = document.getElementById('projects-grid')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
            sound.playClick()
          }}
          data-cursor-text="EXPLORE"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center space-x-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition active:scale-95"
        >
          <span>EXPLORE SYSTEMS & CASE STUDIES</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            onSwitchView('terminal')
            sound.playOpen()
          }}
          data-cursor-text="TERMINAL"
          className="px-5 py-3 rounded-2xl bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-700 hover:border-cyan-500/50 font-mono text-xs sm:text-sm font-medium flex items-center space-x-2 transition"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Launch CLI Terminal</span>
        </button>

        <button
          onClick={() => {
            onOpenResume()
            sound.playClick()
          }}
          data-cursor-text="RESUME"
          className="px-5 py-3 rounded-2xl bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-700 hover:border-purple-500/50 font-mono text-xs sm:text-sm font-medium flex items-center space-x-2 transition"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>View Resume</span>
        </button>
      </div>

      {/* Fast Contact Chips */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400 mb-12">
        <a
          href={profileData.linkedin}
          target="_blank"
          rel="noreferrer"
          data-cursor-text="LINKEDIN"
          className="flex items-center space-x-1.5 hover:text-cyan-300 transition"
        >
          <Linkedin className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </a>
        <span>/</span>
        <a
          href={profileData.github}
          target="_blank"
          rel="noreferrer"
          data-cursor-text="GITHUB"
          className="flex items-center space-x-1.5 hover:text-cyan-300 transition"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
        <span>/</span>
        <a
          href={`mailto:${profileData.email}`}
          data-cursor-text="EMAIL"
          className="flex items-center space-x-1.5 hover:text-cyan-300 transition"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>{profileData.email}</span>
        </a>
        <span>/</span>
        <a
          href={`tel:${profileData.rawPhone}`}
          data-cursor-text="CALL"
          className="flex items-center space-x-1.5 hover:text-cyan-300 transition"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{profileData.phone}</span>
        </a>
      </div>

      {/* Engineering Metrics Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {profileData.stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 hover:border-cyan-500/40 transition group text-left"
          >
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
              {stat.label}
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-white group-hover:text-cyan-400 transition">
              {stat.value}
            </div>
            <div className="text-[11px] text-gray-500 font-mono mt-1 truncate">
              {stat.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
