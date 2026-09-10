import React, { useState, useEffect } from 'react'
import { X, ExternalLink, Layers, Code2, Cpu, CheckCircle2, ChevronRight } from 'lucide-react'
import { Github } from './Icons'
import { sound } from '../utils/sound'
import FitZoneSandbox from './sandboxes/FitZoneSandbox'
import WeatherSandbox from './sandboxes/WeatherSandbox'
import KhaataBookSandbox from './sandboxes/KhaataBookSandbox'

export default function CaseStudyModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'architecture', 'code'
  const [copiedCode, setCopiedCode] = useState(false)

  useEffect(() => {
    sound.playOpen()
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        sound.playClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  const handleCopyCode = () => {
    if (project.codeHighlight?.code) {
      navigator.clipboard.writeText(project.codeHighlight.code)
      setCopiedCode(true)
      sound.playSuccess()
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-950/85 backdrop-blur-xl animate-fadeIn">
      <div 
        className="w-full max-w-5xl max-h-[92vh] bg-gray-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-950/70">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-gray-400 hidden sm:inline">
              // Timeline: {project.timeline}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                data-cursor-text="VISIT"
                className="flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition"
              >
                <span>Live URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-text="REPO"
                className="flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source Code</span>
              </a>
            )}
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

        {/* Hero Header */}
        <div className="px-6 py-5 bg-gradient-to-b from-gray-900 to-gray-950/60 border-b border-gray-800/80">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-cyan-300/90 font-mono mb-4">
            {project.subtitle}
          </p>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="bg-gray-950/60 p-3 rounded-xl border border-gray-800">
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gray-400">
                  {m.label}
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">
                  {m.value}
                </div>
                <div className="text-[10px] text-gray-500 font-mono hidden sm:block">
                  {m.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-gray-800 flex space-x-6 text-xs font-mono uppercase tracking-wider bg-gray-950/40">
          <button
            onClick={() => {
              setActiveTab('overview')
              sound.playClick()
            }}
            className={`pb-3 border-b-2 font-bold transition flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Interactive Sandbox & Overview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('architecture')
              sound.playClick()
            }}
            className={`pb-3 border-b-2 font-bold transition flex items-center space-x-2 ${
              activeTab === 'architecture'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Architecture & Decisions</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('code')
              sound.playClick()
            }}
            className={`pb-3 border-b-2 font-bold transition flex items-center space-x-2 ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Core Code Highlight</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Embedded Live Sandbox Simulator */}
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase block mb-2">
                  // Live In-Browser Sandbox
                </span>
                {project.sandboxType === 'fitzone' && <FitZoneSandbox />}
                {project.sandboxType === 'weather' && <WeatherSandbox />}
                {project.sandboxType === 'khaata' && <KhaataBookSandbox />}
              </div>

              {/* The Problem */}
              <div className="bg-gray-950/60 p-4 rounded-2xl border border-gray-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2 flex items-center space-x-2">
                  <span>The Engineering Problem</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Key Features List */}
              <div className="bg-gray-950/60 p-4 rounded-2xl border border-gray-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center space-x-2">
                  <span>Shipped Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                  Technologies Utilized
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-gray-900 border border-gray-800 text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Decisions & Trade-offs */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  // Architectural Trade-Offs & Decisions
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {project.decisions.map((dec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-gray-950/70 border border-gray-800 space-y-2"
                    >
                      <div className="flex items-center space-x-2 text-cyan-300 text-sm font-mono font-bold">
                        <ChevronRight className="w-4 h-4 text-cyan-400" />
                        <span>{dec.choice}</span>
                      </div>
                      <p className="text-xs text-gray-300 pl-6 leading-relaxed">
                        {dec.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Process Steps */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400">
                  // Implementation Methodology
                </h3>
                <div className="space-y-2.5">
                  {project.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-gray-950/50 border border-gray-800/80 flex items-start space-x-3 text-xs text-gray-300"
                    >
                      <span className="font-mono text-cyan-400 font-bold">0{idx + 1}.</span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/30 text-xs text-gray-200 leading-relaxed font-mono">
                <span className="font-bold text-cyan-300 uppercase block mb-1">Production Outcome:</span>
                {project.outcomes}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-950 px-4 py-2.5 rounded-t-xl border border-gray-800 text-xs font-mono text-gray-400">
                <span className="text-cyan-300">{project.codeHighlight?.filename}</span>
                <button
                  onClick={handleCopyCode}
                  data-cursor-text="COPY"
                  className="hover:text-cyan-300 transition"
                >
                  {copiedCode ? '✓ Copied to Clipboard' : 'Copy Code Snippet'}
                </button>
              </div>
              <pre className="p-4 bg-gray-950 border-x border-b border-gray-800 rounded-b-xl overflow-x-auto text-xs font-mono text-gray-200 leading-relaxed shadow-inner">
                <code>{project.codeHighlight?.code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
