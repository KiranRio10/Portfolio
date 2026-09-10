import React, { useState } from 'react'
import { Cpu, Server, Layout, Terminal, CheckCircle2 } from 'lucide-react'
import { skillsData } from '../data/skills'
import { sound } from '../utils/sound'

export default function SkillsMatrix({ onSelectProjectById }) {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const iconMap = {
    Brain: Cpu,
    Server: Server,
    Layout: Layout,
    Terminal: Terminal
  }

  return (
    <section id="skills-section" className="w-full max-w-6xl mx-auto px-4 py-16 z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Cpu className="w-4 h-4" />
          <span>Technical Architecture Core</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Competencies & Engineering Stack
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl mx-auto font-mono">
          Spanning AI/ML algorithmic foundations, asynchronous Python APIs, and reactive 3D WebGL interfaces.
        </p>
      </div>

      {/* Skills 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsData.map((category, idx) => {
          const Icon = iconMap[category.icon] || Cpu
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {category.category}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill List */}
                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => {
                    return (
                      <div
                        key={sIdx}
                        onClick={() => {
                          setSelectedSkill(skill.name)
                          sound.playClick()
                        }}
                        data-cursor-text="TAG"
                        className="cursor-pointer group/skill"
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className="text-gray-300 group-hover/skill:text-cyan-300 transition">
                            {skill.name}
                          </span>
                          <span className="text-gray-500 group-hover/skill:text-cyan-400 transition">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-6 mt-6 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span>Verified in production</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
