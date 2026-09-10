import React, { useState, useEffect } from 'react'
import { 
  Inbox, 
  Mail, 
  Send, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  X, 
  Copy, 
  Check, 
  Sparkles 
} from 'lucide-react'
import { sound } from '../utils/sound'
import { fetchContactMessages, toggleMessageRead, deleteContactMessage } from '../services/api'
import { profileData } from '../data/profile'

export default function MessagesModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all') // 'all', 'unread'

  const loadMessages = async () => {
    setLoading(true)
    try {
      const data = await fetchContactMessages()
      if (Array.isArray(data)) {
        setMessages(data)
      }
    } catch (err) {
      console.error('Failed to load messages:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadMessages()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleToggleRead = async (id) => {
    sound.playClick()
    const updated = await toggleMessageRead(id)
    if (updated) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: updated.isRead } : m))
      )
    }
  }

  const handleDelete = async (id) => {
    sound.playClick()
    const confirmed = window.confirm('Delete this message permanently from database?')
    if (!confirmed) return
    const res = await deleteContactMessage(id)
    if (res && res.status === 'deleted') {
      setMessages((prev) => prev.filter((m) => m.id !== id))
    }
  }

  const handleCopyEmail = (email, id) => {
    navigator.clipboard.writeText(email)
    setCopiedId(id)
    sound.playSuccess()
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatDate = (isoString) => {
    if (!isoString) return 'Recent transmission'
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return isoString
    }
  }

  const unreadCount = messages.filter((m) => !m.isRead).length
  const displayedMessages =
    activeFilter === 'unread' ? messages.filter((m) => !m.isRead) : messages

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-gray-950 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-800 bg-gray-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight">
                  Inbound Transmissions Hub
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-gray-400">
                Direct messages received from visitors & recruiters
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playClick()
                loadMessages()
              }}
              title="Refresh messages"
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
            <button
              onClick={() => {
                sound.playClose()
                onClose()
              }}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Target Notification Status Banner */}
        <div className="px-6 py-3 bg-gray-900/40 border-b border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg transition ${
                activeFilter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              All Inquiries ({messages.length})
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-3 py-1 rounded-lg transition ${
                activeFilter === 'unread'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          <div className="text-[11px] text-gray-400 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target Inbox: <strong className="text-gray-300">{profileData.email}</strong></span>
          </div>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[calc(90vh-190px)]">
          {loading && messages.length === 0 ? (
            <div className="py-16 text-center">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
              <p className="text-sm font-mono text-gray-400">Syncing transmissions with backend database...</p>
            </div>
          ) : displayedMessages.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-gray-600 flex items-center justify-center mx-auto border border-gray-800">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-gray-300 font-mono">
                {activeFilter === 'unread' ? 'No unread messages' : 'No transmissions recorded yet'}
              </h4>
              <p className="text-xs font-mono text-gray-500 max-w-sm mx-auto">
                Whenever someone sends a message through the contact form, it is saved to the database and appears here instantly.
              </p>
            </div>
          ) : (
            displayedMessages.map((msg) => {
              const gmailReplyUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent(`Re: Inquiry from ${msg.name}`)}&body=${encodeURIComponent(`Hi ${msg.name},\n\nThank you for reaching out through my portfolio website!\n\nRegarding your message:\n"${msg.message}"\n\nBest regards,\nKiran Kumar\n${profileData.email} | ${profileData.phone}`)}`
              const mailtoUrl = `mailto:${msg.email}?subject=${encodeURIComponent(`Re: Inquiry from ${msg.name}`)}&body=${encodeURIComponent(`Hi ${msg.name},\n\nThank you for reaching out via my portfolio!\n\nRegarding your note:\n"${msg.message}"\n\n`)}`

              return (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    msg.isRead
                      ? 'bg-gray-900/40 border-gray-800/80 hover:border-gray-700'
                      : 'bg-gray-900/90 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                  }`}
                >
                  {/* Message Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold">
                        {msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-white font-mono">{msg.name}</h4>
                          {!msg.isRead && (
                            <span className="px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 text-[10px] font-mono rounded border border-cyan-500/30">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                          <a
                            href={`mailto:${msg.email}`}
                            className="hover:text-cyan-300 transition text-cyan-400/90 underline decoration-dotted"
                          >
                            {msg.email}
                          </a>
                          <span>•</span>
                          <span className="text-gray-500 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(msg.createdAt)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick controls */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleCopyEmail(msg.email, msg.id)}
                        title="Copy sender email"
                        className="p-1.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-400 hover:text-white transition"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleRead(msg.id)}
                        title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        className={`p-1.5 rounded-lg border transition text-xs font-mono flex items-center space-x-1 ${
                          msg.isRead
                            ? 'bg-gray-950 border-gray-800 text-gray-500 hover:text-gray-300'
                            : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(msg.id)}
                        title="Delete message"
                        className="p-1.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-500 hover:text-rose-400 hover:border-rose-500/30 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="p-3.5 rounded-xl bg-gray-950/80 border border-gray-800/80 text-xs sm:text-sm font-mono text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </div>

                  {/* Reply Action Buttons */}
                  <div className="mt-3.5 pt-3 border-t border-gray-800/60 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-gray-500">
                      ID #{msg.id} {msg.ipAddress && `• IP: ${msg.ipAddress}`}
                    </span>

                    <div className="flex items-center space-x-2">
                      <a
                        href={gmailReplyUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center space-x-1.5 transition"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply in Gmail</span>
                        <ExternalLink className="w-3 h-3 text-cyan-400" />
                      </a>

                      <a
                        href={mailtoUrl}
                        onClick={() => sound.playClick()}
                        className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-mono flex items-center space-x-1.5 transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Mail Client</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-gray-900/80 border-t border-gray-800 text-xs font-mono text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px] text-gray-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Messages are saved permanently to PostgreSQL / SQLite.</span>
          </div>
          <button
            onClick={() => {
              sound.playClose()
              onClose()
            }}
            className="px-4 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-mono text-xs transition"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  )
}
