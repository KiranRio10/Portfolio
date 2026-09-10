import confetti from 'canvas-confetti'

export function triggerConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#06b6d4', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
    disableForReducedMotion: true,
  })
}

export function triggerCyberBlast() {
  const count = 200
  const defaults = {
    origin: { y: 0.6 },
    colors: ['#00f5ff', '#7928ca', '#ff0080', '#00dfd8']
  }

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    })
  }

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}
