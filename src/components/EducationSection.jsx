import React from 'react'
import { GraduationCap, Award, ShieldCheck, CheckCircle2, BookOpen } from 'lucide-react'
import { profileData } from '../data/profile'
import { certificationsData } from '../data/certifications'
import { sound } from '../utils/sound'

export default function EducationSection() {
  return (
    <section id="education-section" className="w-full max-w-6xl mx-auto px-4 py-16 z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Pedigree & Credentials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Education & Certifications
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto font-mono">
          Rigorous academic foundation in Artificial Intelligence coupled with industry credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Formal Education */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Formal Academic Education</span>
          </div>

          {profileData.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {edu.period}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {edu.score}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-xs font-mono text-gray-400 mb-4">
                {edu.institution} • {edu.location}
              </p>

              <div className="space-y-1.5">
                {edu.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Certifications */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Industry Credentials</span>
          </div>

          {certificationsData.map((cert, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-purple-500/40 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {cert.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{cert.issueDate}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-xs font-mono text-purple-400 mb-3">
                  Issuer: {cert.issuer}
                </p>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {cert.summary}
                </p>
              </div>

              {/* Skills learned */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-800/80">
                {cert.skillsLearned.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-950 border border-gray-800 text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
