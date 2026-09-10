// Procedural Web Audio API sound synthesizer
// Zero external audio files required, runs seamlessly in any modern browser

class SoundEngine {
  constructor() {
    this.ctx = null
    this.enabled = true
    this.hasInteracted = false
    
    // Check saved preference
    try {
      const saved = localStorage.getItem('kiran_sound_enabled')
      if (saved !== null) {
        this.enabled = saved === 'true'
      }
    } catch {
      this.enabled = true
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    this.hasInteracted = true
  }

  toggle() {
    this.enabled = !this.enabled
    try {
      localStorage.setItem('kiran_sound_enabled', String(this.enabled))
    } catch {}
    if (this.enabled) {
      this.init()
      this.playSuccess()
    }
    window.dispatchEvent(new CustomEvent('sound-state-change', { detail: { enabled: this.enabled } }))
    return this.enabled
  }

  playHover() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(480, now)
    osc.frequency.exponentialRampToValueAtTime(720, now + 0.04)

    gain.gain.setValueAtTime(0.02, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.04)
  }

  playClick() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(320, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.08)

    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  }

  playOpen() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const chord = [440, 554.37, 659.25, 880] // A major
    chord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.04)

      gain.gain.setValueAtTime(0.03, now + i * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.25)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now + i * 0.04)
      osc.stop(now + i * 0.04 + 0.25)
    })
  }

  playClose() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(520, now)
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12)

    gain.gain.setValueAtTime(0.03, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.12)
  }

  playSuccess() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.50] // C major arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.06)

      gain.gain.setValueAtTime(0.04, now + idx * 0.06)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.3)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now + idx * 0.06)
      osc.stop(now + idx * 0.06 + 0.3)
    })
  }

  playTerminalKey() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    const freq = 600 + Math.random() * 200
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    gain.gain.setValueAtTime(0.015, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.02)
  }
}

export const sound = new SoundEngine()
