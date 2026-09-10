import React, { useState, useEffect } from 'react'
import { Sparkles, Terminal, Compass, Command, Volume2, VolumeX, FileText, Send, Inbox } from 'lucide-react'
import { sound } from '../utils/sound'
import { checkBackendHealth, fetchContactMessages } from '../services/api'

export default function HUDNavigation({
  currentView,
  onViewChange,
  onOpenCommandPalette,
  onOpenResume,
  onOpenContact,
  onOpenInbox
}) {
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled)
  const [backendStatus, setBackendStatus] = useState({ online: false, engine: 'connecting' })
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const handleSoundChange = (e) => {
      setSoundEnabled(e.detail.enabled)
    }
    window.addEventListener('sound-state-change', handleSoundChange)

    // Check backend health and unread messages
    const verifyBackendAndMessages = async () => {
      const res = await checkBackendHealth()
      if (res.status === 'healthy') {
        setBackendStatus({
          online: true,
          engine: res.database?.engine?.toUpperCase() || 'DB'
        })
      } else {
        setBackendStatus({ online: false, engine: 'offline' })
      }

      try {
        const list = await fetchContactMessages()
        if (Array.isArray(list)) {
          setUnreadCount(list.filter((m) => !m.isRead).length)
        }
      } catch {}
    }

    verifyBackendAndMessages()
    const interval = setInterval(verifyBackendAndMessages, 10000)

    return () => {
      window.removeEventListener('sound-state-change', handleSoundChange)
      clearInterval(interval)
    }
  }, [])


  const handleToggleSound = () => {
    const next = sound.toggle()
    setSoundEnabled(next)
  }

  return (
    <header className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[96vw] pointer-events-auto" role="banner" aria-label="HUD Control Center">
      <div className="glass-panel-glow rounded-2xl p-1.5 sm:px-3 sm:py-2 flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-2xl backdrop-blur-xl border border-cyan-500/30">
        
        {/* Left: View Mode Switcher */}
        <div className="flex items-center space-x-1 bg-gray-950/70 p-1 rounded-xl border border-gray-800/90 shrink-0">
          <button
            onClick={() => {
              onViewChange('constellation')
              sound.playClick()
            }}
            data-cursor-text="SPACE"
            title="3D Constellation Space View"
            className={`h-8 flex items-center space-x-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-mono transition-all ${
              currentView === 'constellation'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Constellation</span>
          </button>

          <button
            onClick={() => {
              onViewChange('timeline')
              sound.playClick()
            }}
            data-cursor-text="STORY"
            title="Narrative Timeline Story View"
            className={`h-8 flex items-center space-x-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-mono transition-all ${
              currentView === 'timeline'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Timeline</span>
          </button>

          <button
            onClick={() => {
              onViewChange('terminal')
              sound.playClick()
            }}
            data-cursor-text="CLI"
            title="Cyber Terminal View"
            className={`h-8 flex items-center space-x-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-mono transition-all ${
              currentView === 'terminal'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terminal</span>
          </button>
        </div>

        {/* Center: Command Palette Trigger */}
        <button
          onClick={() => {
            onOpenCommandPalette()
            sound.playClick()
          }}
          data-cursor-text="CMD"
          className="h-8 flex items-center space-x-2 px-3 rounded-xl bg-gray-950/70 hover:bg-cyan-950/40 text-gray-300 hover:text-cyan-300 border border-gray-800/90 hover:border-cyan-500/40 transition text-xs font-mono shrink-0"
        >
          <Command className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">Commands</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-gray-800 rounded border border-gray-700 text-gray-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Inbound Messages Inbox Trigger */}
        <button
          onClick={() => {
            if (onOpenInbox) onOpenInbox()
            sound.playClick()
          }}
          data-cursor-text="INBOX"
          title="Open Inbound Contact Inquiries Hub"
          className="h-8 flex items-center space-x-1.5 px-2.5 sm:px-3 rounded-xl bg-gray-950/70 hover:bg-cyan-950/40 text-gray-300 hover:text-cyan-300 border border-gray-800/90 hover:border-cyan-500/40 transition text-xs font-mono shrink-0 relative"
        >
          <Inbox className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Inbox</span>
          {unreadCount > 0 ? (
            <span className="px-1.5 py-0.2 bg-cyan-500 text-gray-950 text-[10px] font-bold font-mono rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]">
              {unreadCount}
            </span>
          ) : (
            <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">
              0
            </span>
          )}
        </button>


        {/* Backend / PostgreSQL status pill */}
        <div
          title={`FastAPI backend status: ${backendStatus.online ? 'Online' : 'Offline'} | Database: ${backendStatus.engine}`}
          className="h-8 hidden lg:flex items-center space-x-1.5 px-2.5 rounded-xl bg-gray-950/70 border border-gray-800/90 text-[10px] font-mono text-gray-400 shrink-0"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              backendStatus.online ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-gray-600'
            }`}
          />
          <span className="text-gray-300">FastAPI</span>
          <span className="text-cyan-400">[{backendStatus.engine}]</span>
        </div>

        {/* Right: Sound Synthesizer, Resume & Quick Hire */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            data-cursor-text={soundEnabled ? 'MUTE' : 'UNMUTE'}
            title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
            className={`h-8 px-2 sm:px-2.5 rounded-xl border transition flex items-center justify-center space-x-1.5 shrink-0 ${
              soundEnabled
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                : 'bg-gray-950/70 border-gray-800/90 text-gray-500 hover:text-gray-300'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <div className="hidden sm:flex items-end space-x-0.5 h-2.5 w-3.5">
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Resume Viewer */}
          <button
            onClick={() => {
              onOpenResume()
              sound.playOpen()
            }}
            data-cursor-text="RESUME"
            title="View Formatted Resume"
            className="h-8 hidden sm:flex items-center space-x-1.5 px-3 rounded-xl bg-gray-950/70 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800/90 transition text-xs font-mono shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Resume</span>
          </button>

          {/* Hire / Contact */}
          <button
            onClick={() => {
              onOpenContact()
              sound.playOpen()
            }}
            data-cursor-text="CONTACT"
            className="h-8 flex items-center space-x-1.5 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.35)] transition active:scale-95 shrink-0"
          >
            <Send className="w-3 h-3" />
            <span className="whitespace-nowrap">Hire Kiran</span>
          </button>
        </div>
      </div>
    </header>
  )
}
