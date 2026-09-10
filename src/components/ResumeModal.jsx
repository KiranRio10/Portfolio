import React, { useState } from 'react'
import { X, Printer, Copy, Check, ExternalLink, Download } from 'lucide-react'
import { profileData } from '../data/profile'
import { projectsData } from '../data/projects'
import { certificationsData } from '../data/certifications'
import { sound } from '../utils/sound'

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handlePrint = () => {
    sound.playClick()
    window.print()
  }

  const handleCopyText = () => {
    const resumeText = `
MEDISHETTY KIRAN KUMAR
Telangana, India
Email: ${profileData.email} | Mobile: ${profileData.phone}
LinkedIn: ${profileData.linkedin} | GitHub: ${profileData.github}

SUMMARY:
${profileData.summary}

EDUCATION:
- B.Tech in Artificial Intelligence & Machine Learning (2022 - 2026)
  JB Institute of Engineering and Technology | CGPA: 7.73
- Intermediate (MPC) (2020 - 2022) | Sri Chaitanya Junior Kalasala | CGPA: 6.65
- SSC (2010 - 2020) | New Gen High School of Excellence | CGPA: 10.0

SKILLS:
- Languages: Python, JavaScript, HTML, CSS
- Frameworks: React.js, FastAPI, Tailwind CSS, Three.js
- Databases: SQLite, SQLAlchemy, LocalStorage
- Dev Tools: Git, GitHub, VS Code, Vite, Vercel

PROJECTS:
1. FitZone-Pro: Full-stack fitness web app using React.js and Python (FastAPI), interactive workout tracking with live rest timers and audio cues.
2. Weather-Outfit-Advisor: Built & deployed live weather app converting real-time weather data into personalized outfit recommendations.
3. Khaata Book: Built full credit-ledger web app to track customer loans, repayments, and overdue balances using Context API and LocalStorage.

CERTIFICATIONS:
- Certified Python Full Stack Developer by CCBP Nxtwave
- The Complete Python Bootcamp From Zero to Hero in Python
- Introduction to Cybersecurity
    `.trim()

    navigator.clipboard.writeText(resumeText)
    setCopied(true)
    sound.playSuccess()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-950/85 backdrop-blur-xl animate-fadeIn">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-gray-900 border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-950/80 flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
            Official Curriculum Vitae
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyText}
              data-cursor-text="COPY"
              className="text-xs font-mono px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition flex items-center space-x-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              data-cursor-text="PRINT"
              className="text-xs font-mono px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                onClose()
                sound.playClose()
              }}
              data-cursor-text="CLOSE"
              className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet (High-legibility dark/clean print aesthetic) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-gray-950 font-sans text-gray-200 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-gray-800 pb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mb-2">
              MEDISHETTY KIRAN KUMAR
            </h1>
            <p className="text-xs font-mono text-gray-400 mb-2">Telangana, India</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-cyan-400">
              <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn Profile
              </a>
              <span>|</span>
              <a href={profileData.github} target="_blank" rel="noreferrer" className="hover:underline">
                GitHub (@KiranRio10)
              </a>
              <span>|</span>
              <a href={`mailto:${profileData.email}`} className="hover:underline">
                {profileData.email}
              </a>
              <span>|</span>
              <a href={`tel:${profileData.rawPhone}`} className="hover:underline">
                {profileData.phone}
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 border-b border-gray-800 pb-1">
              SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {profileData.summary}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3 border-b border-gray-800 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-white">
                    Bachelor of Technology in Artificial Intelligence and Machine Learning
                  </span>
                  <div className="text-gray-400 text-xs">JB Institute of Engineering and Technology</div>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-gray-400 mt-1 sm:mt-0">
                  <span>Moinabad, Telangana</span>
                  <div className="text-cyan-300 font-bold">2022 – 2026 | 7.73 CGPA</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-900">
                <div>
                  <span className="font-bold text-white">Board of Intermediate Education</span>
                  <div className="text-gray-400 text-xs">Sri Chaitanya Junior Kalasala</div>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-gray-400 mt-1 sm:mt-0">
                  <span>Hyderabad, Telangana</span>
                  <div className="text-cyan-300">2020 – 2022 | 6.65 CGPA</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-900">
                <div>
                  <span className="font-bold text-white">Board of Secondary Education</span>
                  <div className="text-gray-400 text-xs">New Gen High School of Excellence</div>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-gray-400 mt-1 sm:mt-0">
                  <span>Hyderabad, Telangana</span>
                  <div className="text-emerald-400 font-bold">2010 – 2020 | 10.0 CGPA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3 border-b border-gray-800 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-gray-400">Languages: </span>
                <span className="text-white">HTML, CSS, JavaScript, Python</span>
              </div>
              <div>
                <span className="text-gray-400">Frameworks: </span>
                <span className="text-white">React.js, Tailwind CSS, FastAPI</span>
              </div>
              <div>
                <span className="text-gray-400">Databases: </span>
                <span className="text-white">SQLite, SQLAlchemy, LocalStorage</span>
              </div>
              <div>
                <span className="text-gray-400">Dev Tools: </span>
                <span className="text-white">VS Code, Git, GitHub, Vite, Vercel</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-gray-400">Soft Skills: </span>
                <span className="text-white">
                  Problem Solving, Team Collaboration, Technical Communication, Adaptability
                </span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3 border-b border-gray-800 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projectsData.map((proj) => (
                <div key={proj.id} className="space-y-1 text-xs">
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      {proj.title}
                    </span>
                    <span className="font-mono text-gray-400">
                      {proj.techStack.slice(0, 5).join(', ')}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    • {proj.problem}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    • {proj.outcomes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3 border-b border-gray-800 pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="space-y-1 text-xs text-gray-300 list-disc list-inside font-mono">
              <li>Certified Python Full Stack Developer by CCBP Nxtwave</li>
              <li>The Complete Python Bootcamp From Zero to Hero in Python</li>
              <li>Introduction to Cybersecurity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
