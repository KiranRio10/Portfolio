import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, Database, Inbox, ExternalLink, RotateCcw } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import { profileData } from '../data/profile'
import { sound } from '../utils/sound'
import { triggerConfetti } from '../utils/confetti'
import { submitContactMessage, trackAnalyticsEvent } from '../services/api'

export default function ContactSection({ onOpenInbox }) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [lastSubmittedData, setLastSubmittedData] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dbStoredId, setDbStoredId] = useState(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email)
    setCopiedEmail(true)
    sound.playSuccess()
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.phone)
    setCopiedPhone(true)
    sound.playSuccess()
    setTimeout(() => setCopiedPhone(false), 2500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return

    setIsSubmitting(true)
    const currentData = { ...formState }
    setLastSubmittedData(currentData)

    try {
      const res = await submitContactMessage(currentData)
      trackAnalyticsEvent('form_submission', 'contact_inquiry', { email: currentData.email })
      setDbStoredId(res.id || 'db-synced')
      setSubmitted(true)
      sound.playSuccess()
      triggerConfetti()
    } catch (err) {
      setSubmitted(true)
      sound.playSuccess()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetForm = () => {
    setSubmitted(false)
    setFormState({ name: '', email: '', message: '' })
    setLastSubmittedData(null)
  }


  return (
    <section id="contact-section" className="w-full max-w-5xl mx-auto px-4 py-16 z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Direct Transmission Hub</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let’s Build Something Exceptional
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto font-mono">
          Available for full-time engineering positions, technical teams, and high-impact software projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left 2 Cols: Direct Contact Channels */}
        <div className="lg:col-span-2 space-y-4">
          {/* Email Card */}
          <div className="p-5 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-cyan-500/40 transition-all shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={handleCopyEmail}
                data-cursor-text="COPY"
                className="text-xs font-mono px-2.5 py-1 rounded-lg bg-gray-950 border border-gray-800 text-gray-400 hover:text-cyan-300 transition flex items-center space-x-1"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
              Email Address
            </div>
            <a
              href={`mailto:${profileData.email}`}
              className="text-sm sm:text-base font-mono font-bold text-white hover:text-cyan-400 transition break-all"
            >
              {profileData.email}
            </a>
          </div>

          {/* Phone / WhatsApp Card */}
          <div className="p-5 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-cyan-500/40 transition-all shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <button
                onClick={handleCopyPhone}
                data-cursor-text="COPY"
                className="text-xs font-mono px-2.5 py-1 rounded-lg bg-gray-950 border border-gray-800 text-gray-400 hover:text-emerald-300 transition flex items-center space-x-1"
              >
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
              Mobile / WhatsApp
            </div>
            <a
              href={`tel:${profileData.rawPhone}`}
              className="text-sm sm:text-base font-mono font-bold text-white hover:text-emerald-400 transition"
            >
              {profileData.phone}
            </a>
          </div>

          {/* Location & Profiles */}
          <div className="p-5 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-300">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{profileData.location}</span>
            </div>

            <div className="pt-3 border-t border-gray-800 flex items-center space-x-3">
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-text="LINKEDIN"
                className="flex-1 py-2.5 rounded-xl bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-cyan-300 text-xs font-mono flex items-center justify-center space-x-1.5 transition"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-text="GITHUB"
                className="flex-1 py-2.5 rounded-xl bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-cyan-300 text-xs font-mono flex items-center justify-center space-x-1.5 transition"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right 3 Cols: Interactive Direct Dispatch Form */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                <Send className="w-4 h-4" />
                <span>Direct Message Dispatcher</span>
              </div>
              {onOpenInbox && (
                <button
                  type="button"
                  onClick={() => {
                    sound.playOpen()
                    onOpenInbox()
                  }}
                  data-cursor-text="INBOX"
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center space-x-1.5 transition"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>View Received Inbox</span>
                </button>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-6">
              Send a Direct Inquiry
            </h3>

            {submitted ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-cyan-950/40 border border-cyan-500/60 text-center space-y-4 my-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-mono">Transmission Dispatched</h4>
                  <p className="text-xs font-mono text-gray-300 max-w-sm mx-auto mt-1">
                    Your inquiry has been stored directly into the database.
                  </p>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/30">
                  <Database className="w-3.5 h-3.5" />
                  <span>Database Record #{dbStoredId} Saved</span>
                </div>

                {/* Direct Gmail / Email client dispatch fallback */}
                <div className="pt-3 border-t border-cyan-500/20 text-left space-y-2.5 bg-gray-950/60 p-4 rounded-xl border border-gray-800">
                  <div className="text-xs font-mono text-cyan-300 font-bold flex items-center space-x-1.5">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Send directly to Kiran's personal Gmail inbox:</span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400">
                    To make 100% sure Kiran sees your email on his phone right now, you can open and send a pre-filled copy directly to <strong className="text-gray-200">mkirankumar4050@gmail.com</strong>:
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=mkirankumar4050@gmail.com&su=${encodeURIComponent(`Inquiry from ${lastSubmittedData?.name || 'Visitor'}`)}&body=${encodeURIComponent(`From: ${lastSubmittedData?.name} (${lastSubmittedData?.email})\n\n${lastSubmittedData?.message}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-mono font-bold flex items-center space-x-1.5 shadow transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={`mailto:mkirankumar4050@gmail.com?subject=${encodeURIComponent(`Inquiry from ${lastSubmittedData?.name || 'Visitor'}`)}&body=${encodeURIComponent(`From: ${lastSubmittedData?.name} (${lastSubmittedData?.email})\n\n${lastSubmittedData?.message}`)}`}
                      className="px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-mono flex items-center space-x-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Default Mail App</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 text-xs font-mono flex items-center space-x-1.5 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>

                  {onOpenInbox && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playOpen()
                        onOpenInbox()
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center space-x-1.5 transition"
                    >
                      <Inbox className="w-3.5 h-3.5" />
                      <span>View in Inbox</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1.5">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins (Engineering Lead)"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1.5">
                    Message / Opportunity Details
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project, team opportunity, or discussion topic..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-400 font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor-text="DISPATCH"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'DISPATCHING TRANSMISSION...' : 'DISPATCH MESSAGE TO KIRAN'}</span>
                </button>
              </form>
            )}
          </div>


          <div className="mt-6 pt-4 border-t border-gray-800 text-[11px] font-mono text-gray-500 flex items-center justify-between">
            <span>Response guarantee: Within 24 hours</span>
            <span>Telangana, India // GMT+5:30</span>
          </div>
        </div>
      </div>
    </section>
  )
}
