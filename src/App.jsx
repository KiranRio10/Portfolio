import React, { useState, useEffect } from 'react'
import Canvas3D from './components/Canvas3D'
import CustomCursor from './components/CustomCursor'
import CommandPalette from './components/CommandPalette'
import HUDNavigation from './components/HUDNavigation'
import HeroSection from './components/HeroSection'
import ConstellationView from './components/ConstellationView'
import TimelineView from './components/TimelineView'
import TerminalView from './components/TerminalView'
import CaseStudyModal from './components/CaseStudyModal'
import ResumeModal from './components/ResumeModal'
import MessagesModal from './components/MessagesModal'
import SkillsMatrix from './components/SkillsMatrix'
import EducationSection from './components/EducationSection'
import ContactSection from './components/ContactSection'
import { sound } from './utils/sound'
import { profileData } from './data/profile'
import { trackAnalyticsEvent } from './services/api'

export default function App() {
  const [viewMode, setViewMode] = useState('constellation') // 'constellation', 'timeline', 'terminal'
  const [selectedProject, setSelectedProject] = useState(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)


  // Track initial page view in PostgreSQL
  useEffect(() => {
    trackAnalyticsEvent('page_view', 'portfolio_landing', { userAgent: navigator.userAgent })
  }, [])

  // Global shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [])

  const handleOpenContact = () => {
    const el = document.getElementById('contact-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      setViewMode('constellation')
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* 3D WebGL Living Canvas */}
      <Canvas3D viewMode={viewMode} />

      {/* Interactive Physics Cursor */}
      <CustomCursor />

      {/* Cyber Grid Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none cyber-grid z-0 opacity-40" />

      {/* Main Content Flow */}
      <main className="relative z-10 flex flex-col min-h-screen pb-32">
        {/* Navigation & Hero Section (hidden when in pure terminal mode) */}
        {viewMode !== 'terminal' && (
          <HeroSection
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onSwitchView={(mode) => setViewMode(mode)}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}

        {/* View Switcher Output */}
        {viewMode === 'constellation' && (
          <>
            <ConstellationView onOpenProject={(proj) => setSelectedProject(proj)} />
            <SkillsMatrix onSelectProjectById={(id) => {}} />
            <EducationSection />
            <ContactSection onOpenInbox={() => setIsMessagesOpen(true)} />
          </>
        )}

        {viewMode === 'timeline' && (
          <>
            <TimelineView onOpenProject={(proj) => setSelectedProject(proj)} />
            <SkillsMatrix onSelectProjectById={(id) => {}} />
            <EducationSection />
            <ContactSection onOpenInbox={() => setIsMessagesOpen(true)} />
          </>
        )}

        {viewMode === 'terminal' && (
          <div className="pt-8 pb-12 flex-1 flex flex-col justify-center">
            <TerminalView
              onOpenProject={(proj) => setSelectedProject(proj)}
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenContact={handleOpenContact}
              onSwitchView={(mode) => setViewMode(mode)}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="w-full max-w-6xl mx-auto px-4 py-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500 z-10">
          <div>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      {/* Floating HUD Navigation Bottom Dock */}
      <HUDNavigation
        currentView={viewMode}
        onViewChange={(mode) => setViewMode(mode)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={handleOpenContact}
        onOpenInbox={() => setIsMessagesOpen(true)}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onViewChange={(mode) => setViewMode(mode)}
        onOpenProject={(proj) => setSelectedProject(proj)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenInbox={() => setIsMessagesOpen(true)}
      />

      {/* In-Depth Case Study Modal with Live Sandboxes */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* High-Fidelity Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Inbound Messages / Transmissions Hub Modal */}
      <MessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
      />
    </div>
  )

}
