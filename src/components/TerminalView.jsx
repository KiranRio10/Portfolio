import React, { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Volume2 } from 'lucide-react'
import { sound } from '../utils/sound'
import { triggerCyberBlast } from '../utils/confetti'
import { profileData } from '../data/profile'
import { projectsData } from '../data/projects'
import { skillsData } from '../data/skills'
import { certificationsData } from '../data/certifications'
import { executeTerminalCommandOnServer } from '../services/api'

export default function TerminalView({
  onOpenProject,
  onOpenResume,
  onOpenContact,
  onSwitchView
}) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'banner',
      content: `
   __  __ _____ ____ ___ ____  _   _ _____ _____ _______   __
  |  \\/  | ____|  _ \\_ _/ ___|| | | | ____|_   _|_   _\\ \\ / /
  | |\\/| |  _| | | | | |\\___ \\| |_| |  _|   | |   | |  \\ V / 
  | |  | | |___| |_| | | ___) |  _  | |___  | |   | |   | |  
  |_|  |_|_____|____/___|____/|_| |_|_____| |_|   |_|   |_|  
  
  MEDISHETTY KIRAN KUMAR — Full-Stack Developer & AI/ML Engineer
  Degree: B.Tech in Artificial Intelligence & Machine Learning (JBIET, 7.73 CGPA)
  Contact: mkirankumar4050@gmail.com | +91 9381911081
  Type 'help' to inspect available system commands.
      `
    }
  ])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = async (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase()
    const args = trimmed.split(' ')
    const root = args[0]

    setCommandHistory((prev) => [...prev, cmdStr])
    setHistoryIndex(-1)

    // Append user input to history
    const newHistory = [...history, { type: 'input', content: cmdStr }]

    if (!trimmed) {
      setHistory(newHistory)
      return
    }

    // Client-only UI actions
    if (root === 'clear') {
      setHistory([])
      setInput('')
      return
    }
    if (root === 'gui') {
      onSwitchView('constellation')
      sound.playOpen()
      setInput('')
      return
    }
    if (root === 'sound') {
      const newState = sound.toggle()
      newHistory.push({
        type: 'output',
        content: `Audio synthesizer is now ${newState ? 'ENABLED 🔊' : 'MUTED 🔇'}.`
      })
      setHistory(newHistory)
      setInput('')
      return
    }
    if (root === 'confetti') {
      triggerCyberBlast()
      newHistory.push({ type: 'output', content: '⚡ Cyber confetti detonation triggered!' })
      sound.playSuccess()
      setHistory(newHistory)
      setInput('')
      return
    }
    if (root === 'resume') {
      newHistory.push({ type: 'output', content: 'Opening formatted official resume modal...' })
      onOpenResume()
      sound.playOpen()
      setHistory(newHistory)
      setInput('')
      return
    }
    if (root === 'hire') {
      newHistory.push({ type: 'output', content: 'Launching contact / hire drawer...' })
      onOpenContact()
      sound.playOpen()
      setHistory(newHistory)
      setInput('')
      return
    }

    // Try FastAPI Server Execution first
    try {
      const serverRes = await executeTerminalCommandOnServer(cmdStr)
      if (serverRes) {
        newHistory.push({
          type: serverRes.status === 'error' ? 'error' : 'output',
          content: serverRes.output
        })
        if (serverRes.action === 'open_project' && serverRes.target_id) {
          const match = projectsData.find((p) => p.id === serverRes.target_id)
          if (match) onOpenProject(match)
        }
        if (serverRes.status === 'error') {
          sound.playClose()
        } else {
          sound.playSuccess()
        }
        setHistory(newHistory)
        setInput('')
        return
      }
    } catch {}

    // Local fallback if server unreachable
    switch (root) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: `
Available Commands:
  help            - List all executable terminal commands
  projects (ls)   - List all deployed engineering systems
  open <id>       - Open in-depth case study modal (e.g. 'open fitzone', 'open weather')
  skills          - Print AI/ML and full-stack technical competencies
  education       - View academic credentials, JBIET B.Tech AIML (7.73 CGPA)
  certifications  - Inspect professional industry credentials
  contact         - View direct email, phone, and social handles
  resume          - Launch interactive formatted resume viewer
  hire            - Launch quick contact / hire form
  sound           - Toggle Web Audio synthesizer on/off
  confetti        - Fire a cyber celebratory particle blast
  gui             - Switch back to 3D Constellation graphical view
  clear           - Clear the terminal screen
          `
        })
        sound.playOpen()
        break

      case 'projects':
      case 'ls':
        newHistory.push({
          type: 'output',
          content: `
Active Systems Deployed:
  1. fitzone-pro          - 3D Fitness Web Platform (React, FastAPI, SQLite, Three.js)
  2. weather-outfit-advisor - Meteorological Outfit Context Engine (JS, OpenWeather API)
  3. khaata-book          - Digital Credit Ledger & Financial State (React, Context API)

Type 'open fitzone', 'open weather', or 'open khaata' to launch interactive case study.
          `
        })
        sound.playSuccess()
        break

      case 'open':
        const targetArg = args[1]
        if (!targetArg) {
          newHistory.push({
            type: 'error',
            content: "Usage: open <project-id> (e.g. 'open fitzone', 'open weather', 'open khaata')"
          })
          sound.playClose()
        } else {
          const match = projectsData.find(
            (p) =>
              p.id.toLowerCase().includes(targetArg) ||
              p.title.toLowerCase().includes(targetArg)
          )
          if (match) {
            newHistory.push({
              type: 'output',
              content: `Launching case study drawer for [${match.title}]...`
            })
            onOpenProject(match)
            sound.playSuccess()
          } else {
            newHistory.push({
              type: 'error',
              content: `System '${targetArg}' not found. Type 'projects' to list valid IDs.`
            })
            sound.playClose()
          }
        }
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          content: `
==================== TECHNICAL CORE ====================
AI & MACHINE LEARNING:
  • Python (90%) | ML Algorithms (85%) | Neural Networks (80%) | Data Structures (85%)

FULL-STACK & BACKEND:
  • Python (FastAPI, 88%) | SQLite & SQLAlchemy ORM (85%) | JWT Auth (82%) | RESTful APIs (90%)

FRONTEND & CREATIVE TECH:
  • React.js (92%) | Tailwind CSS (95%) | Three.js / WebGL (78%) | JavaScript ES6+ (90%)

DEV TOOLS & INFRASTRUCTURE:
  • Git & GitHub (90%) | VS Code (92%) | Vite (88%) | Vercel (85%) | LocalStorage (90%)
          `
        })
        sound.playSuccess()
        break

      case 'education':
        newHistory.push({
          type: 'output',
          content: `
ACADEMIC RECORD:
1. B.Tech in Artificial Intelligence and Machine Learning (2022 – 2026)
   JB Institute of Engineering and Technology, Moinabad, Telangana
   CGPA: 7.73 / 10.0

2. Board of Intermediate Education (MPC) (2020 – 2022)
   Sri Chaitanya Junior Kalasala, Hyderabad | CGPA: 6.65

3. Board of Secondary Education (SSC) (2010 – 2020)
   New Gen High School of Excellence, Hyderabad | Distinction: 10.0 / 10.0 CGPA
          `
        })
        sound.playSuccess()
        break

      case 'certifications':
        newHistory.push({
          type: 'output',
          content: `
CERTIFIED CREDENTIALS:
1. [CCBP Nxtwave] Certified Python Full Stack Developer
   - Full stack Python engineering, React frontend reactivity, RESTful design.

2. [Coursework] The Complete Python Bootcamp From Zero to Hero in Python
   - Advanced OOP, decorators, asynchronous concurrency, data manipulation.

3. [Coursework] Introduction to Cybersecurity
   - OWASP top 10, JWT security, defensive engineering, safe API design.
          `
        })
        sound.playSuccess()
        break

      case 'contact':
        newHistory.push({
          type: 'output',
          content: `
COMMUNICATION CHANNELS:
  • Name:     Medishetty Kiran Kumar
  • Email:    mkirankumar4050@gmail.com
  • Phone:    +91 9381911081
  • LinkedIn: https://www.linkedin.com/in/kiranmedishetty/
  • GitHub:   https://github.com/KiranRio10
  • Location: Telangana, India
          `
        })
        sound.playSuccess()
        break

      case 'resume':
        newHistory.push({ type: 'output', content: 'Opening formatted official resume modal...' })
        onOpenResume()
        sound.playOpen()
        break

      case 'hire':
        newHistory.push({ type: 'output', content: 'Launching contact / hire drawer...' })
        onOpenContact()
        sound.playOpen()
        break

      case 'sound':
        const newState = sound.toggle()
        newHistory.push({
          type: 'output',
          content: `Audio synthesizer is now ${newState ? 'ENABLED 🔊' : 'MUTED 🔇'}.`
        })
        break

      case 'confetti':
        triggerCyberBlast()
        newHistory.push({ type: 'output', content: '⚡ Cyber confetti detonation triggered!' })
        sound.playSuccess()
        break

      case 'gui':
        onSwitchView('constellation')
        sound.playOpen()
        break

      case 'clear':
        setHistory([])
        setInput('')
        return

      default:
        newHistory.push({
          type: 'error',
          content: `command not found: '${trimmed}'. Type 'help' for valid commands.`
        })
        sound.playClose()
        break
    }

    setHistory(newHistory)
    setInput('')
  }

  const handleKeyDown = (e) => {
    sound.playTerminalKey()

    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx)
          setInput(commandHistory[commandHistory.length - 1 - nextIdx])
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInput(commandHistory[commandHistory.length - 1 - nextIdx])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 z-10 font-mono">
      <div 
        className="bg-gray-950/95 border border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col min-h-[620px]"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Title Bar */}
        <div className="px-5 py-3 border-b border-gray-800 bg-gray-900/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs text-gray-400 ml-2 font-mono">
              kiran@portfolio-core:~ (zsh / interactive)
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <button
              onClick={() => onSwitchView('constellation')}
              data-cursor-text="GUI"
              className="hover:text-cyan-300 transition"
            >
              [Switch to 3D GUI]
            </button>
          </div>
        </div>

        {/* Terminal Screen Stream */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-gray-300">
          {history.map((item, idx) => {
            if (item.type === 'banner') {
              return (
                <pre
                  key={idx}
                  className="text-emerald-400 text-[10px] sm:text-xs overflow-x-auto whitespace-pre font-mono leading-tight"
                >
                  {item.content}
                </pre>
              )
            }
            if (item.type === 'input') {
              return (
                <div key={idx} className="flex items-center space-x-2 text-cyan-300 font-bold">
                  <span className="text-emerald-400">kiran@portfolio:~$</span>
                  <span>{item.content}</span>
                </div>
              )
            }
            if (item.type === 'error') {
              return (
                <div key={idx} className="text-rose-400">
                  {item.content}
                </div>
              )
            }
            return (
              <pre
                key={idx}
                className="text-gray-300 whitespace-pre-wrap font-mono"
              >
                {item.content}
              </pre>
            )
          })}
          <div ref={bottomRef} />
        </div>

        {/* Command Line Input */}
        <div className="px-6 py-3.5 border-t border-gray-800 bg-gray-900/50 flex items-center space-x-2 text-sm">
          <span className="text-emerald-400 font-bold shrink-0">kiran@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any command..."
            className="w-full bg-transparent text-cyan-200 focus:outline-none font-mono"
            autoFocus
          />
          <CornerDownLeft className="w-4 h-4 text-gray-600 shrink-0" />
        </div>
      </div>
    </div>
  )
}
