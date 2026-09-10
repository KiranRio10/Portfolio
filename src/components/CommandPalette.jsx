import React, { useState, useEffect, useRef } from 'react'
import { Search, Terminal, FolderKanban, Cpu, GraduationCap, Mail, Phone, ExternalLink, Volume2, Sparkles, X } from 'lucide-react'
import { sound } from '../utils/sound'
import { triggerCyberBlast } from '../utils/confetti'
import { profileData } from '../data/profile'
import { projectsData } from '../data/projects'

export default function CommandPalette({ isOpen, onClose, onViewChange, onOpenProject, onOpenResume, onOpenInbox }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  // Define commands
  const commands = [
    // Inbound Messages Hub
    {
      id: 'action-inbox',
      title: 'Inbound Transmissions Hub (View Received Messages)',
      description: 'Check messages and contact inquiries stored in database',
      category: 'Inquiries',
      icon: Mail,
      action: () => {
        if (onOpenInbox) onOpenInbox()
        sound.playOpen()
      }
    },

    // Views
    {
      id: 'view-constellation',
      title: 'Switch View: 3D Constellation Canvas',
      category: 'View Mode',
      icon: Cpu,
      action: () => {
        onViewChange('constellation')
        sound.playOpen()
      }
    },
    {
      id: 'view-timeline',
      title: 'Switch View: Narrative Story Timeline',
      category: 'View Mode',
      icon: FolderKanban,
      action: () => {
        onViewChange('timeline')
        sound.playOpen()
      }
    },
    {
      id: 'view-terminal',
      title: 'Switch View: Cyber Hacker Terminal',
      category: 'View Mode',
      icon: Terminal,
      action: () => {
        onViewChange('terminal')
        sound.playOpen()
      }
    },
    // Projects
    ...projectsData.map((project) => ({
      id: `project-${project.id}`,
      title: `Case Study: ${project.title}`,
      description: project.subtitle,
      category: 'Projects',
      icon: FolderKanban,
      action: () => {
        onOpenProject(project)
        sound.playOpen()
      }
    })),
    // Sections
    {
      id: 'section-skills',
      title: 'Explore Skills Matrix & AI Stack',
      category: 'Navigation',
      icon: Cpu,
      action: () => {
        const el = document.getElementById('skills-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        sound.playClick()
      }
    },
    {
      id: 'section-education',
      title: 'View Education (B.Tech AI & ML, JBIET)',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => {
        const el = document.getElementById('education-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        sound.playClick()
      }
    },
    {
      id: 'section-contact',
      title: 'Get In Touch / Hire Kiran',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        const el = document.getElementById('contact-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        sound.playClick()
      }
    },
    // Quick Actions
    {
      id: 'action-resume',
      title: 'View / Download Official Resume',
      category: 'Actions',
      icon: ExternalLink,
      action: () => {
        onOpenResume()
        sound.playOpen()
      }
    },
    {
      id: 'action-copy-email',
      title: `Copy Email: ${profileData.email}`,
      category: 'Actions',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(profileData.email)
        sound.playSuccess()
        alert(`Copied ${profileData.email} to clipboard!`)
      }
    },
    {
      id: 'action-phone',
      title: `Call / WhatsApp: ${profileData.phone}`,
      category: 'Actions',
      icon: Phone,
      action: () => {
        window.open(`tel:${profileData.rawPhone}`, '_blank')
        sound.playClick()
      }
    },
    {
      id: 'action-linkedin',
      title: 'Visit LinkedIn Profile',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        window.open(profileData.linkedin, '_blank')
        sound.playClick()
      }
    },
    {
      id: 'action-github',
      title: 'Visit GitHub Profile (@KiranRio10)',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        window.open(profileData.github, '_blank')
        sound.playClick()
      }
    },
    {
      id: 'action-toggle-sound',
      title: 'Toggle Audio Synthesizer',
      category: 'Preferences',
      icon: Volume2,
      action: () => {
        sound.toggle()
      }
    },
    {
      id: 'action-confetti',
      title: 'Trigger Cyber Confetti Blast ⚡',
      category: 'Fun',
      icon: Sparkles,
      action: () => {
        triggerCyberBlast()
        sound.playSuccess()
      }
    }
  ]

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(query.toLowerCase())) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      sound.playOpen()
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Command Palette with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
          sound.playClose()
        } else {
          // Open
        }
      }

      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        sound.playClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length))
        sound.playHover()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length))
        sound.playHover()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-gray-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-gray-900/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-800 bg-gray-950/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Type a command, project name, or skill... (e.g. FitZone, AI, resume)"
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 text-base focus:outline-none font-mono"
          />
          <button
            onClick={() => {
              onClose()
              sound.playClose()
            }}
            className="text-gray-400 hover:text-gray-200 p-1 rounded-lg hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-gray-800/40">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-mono text-sm">
              No matching commands or projects found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action()
                    onClose()
                  }}
                  onMouseEnter={() => {
                    setSelectedIndex(idx)
                    sound.playHover()
                  }}
                  data-cursor-text="EXECUTE"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'hover:bg-gray-800/50 text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-medium">{cmd.title}</div>
                      {cmd.description && (
                        <div className="text-xs text-gray-400 truncate">{cmd.description}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-800/80 text-gray-400 uppercase tracking-wider shrink-0 ml-3">
                    {cmd.category}
                  </span>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-gray-950/80 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500 font-mono">
          <div className="flex items-center space-x-3">
            <span>↑↓ to navigate</span>
            <span>↵ to execute</span>
            <span>esc to close</span>
          </div>
          <span className="text-cyan-400/70">⌘K / Ctrl+K Active</span>
        </div>
      </div>
    </div>
  )
}
