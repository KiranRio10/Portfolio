import React, { useState } from 'react'
import { FolderKanban, Cpu, ArrowUpRight, Sparkles, Layers, ShieldCheck, Dumbbell, Shirt, BookOpen } from 'lucide-react'
import { projectsData } from '../data/projects'
import { sound } from '../utils/sound'

export default function ConstellationView({ onOpenProject }) {
  const [filter, setFilter] = useState('all') // 'all', 'fullstack', 'frontend'

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'fullstack') return p.category.includes('Full-Stack')
    if (filter === 'frontend') return p.category.includes('UI') || p.category.includes('Financial')
    return true
  })

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 z-10">
      {/* View Header & Interactive Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Node Canvas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Flagship Engineering Systems
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-gray-950/80 p-1.5 rounded-2xl border border-gray-800 text-xs font-mono">
          {[
            { id: 'all', label: 'All Systems' },
            { id: 'fullstack', label: 'Full-Stack / Python' },
            { id: 'frontend', label: 'Frontend & State' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setFilter(item.id)
                sound.playClick()
              }}
              data-cursor-text="FILTER"
              className={`px-3 py-1.5 rounded-xl transition ${
                filter === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Project Nodes Grid */}
      <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => {
                onOpenProject(project)
                sound.playOpen()
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor-text="DEEP DIVE"
              className="group relative bg-gray-900/60 hover:bg-gray-900/90 border border-gray-800/80 hover:border-cyan-500/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] hover:-translate-y-1.5"
            >
              {/* Glow Accent Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold border"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                      borderColor: `${project.color}35`
                    }}
                  >
                    {project.badge}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-gray-950/80 border border-gray-800 flex items-center justify-center group-hover:border-cyan-400 group-hover:text-cyan-300 transition">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-gray-400 mb-3 line-clamp-1">
                  {project.subtitle}
                </p>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {project.tagline}
                </p>
              </div>

              {/* Tech Stack & Interactive Sandbox CTA */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-950/80 border border-gray-800 text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-950/80 border border-gray-800 text-cyan-400">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Live Sandbox Simulator</span>
                  </span>
                  <span className="text-gray-500 group-hover:translate-x-1 transition">→</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
