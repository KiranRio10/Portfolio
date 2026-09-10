import React, { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [ripples, setRipples] = useState([])

  const ringPosRef = useRef({ x: -100, y: -100 })
  const ringElementRef = useRef(null)

  useEffect(() => {
    // Only run if not touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      // Detect hover target
      const target = e.target.closest('button, a, [data-interactive], [data-cursor-text]')
      if (target) {
        setIsHovered(true)
        const customText = target.getAttribute('data-cursor-text') || ''
        setHoverText(customText)
      } else {
        setIsHovered(false)
        setHoverText('')
      }
    }

    const onMouseDown = (e) => {
      setIsClicked(true)
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      }
      setRipples((prev) => [...prev.slice(-4), newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
    }

    const onMouseUp = () => {
      setIsClicked(false)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Smooth ring follow loop
    let reqId
    const loop = () => {
      ringPosRef.current.x += (position.x - ringPosRef.current.x) * 0.2
      ringPosRef.current.y += (position.y - ringPosRef.current.y) * 0.2

      if (ringElementRef.current) {
        ringElementRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0px) translate(-50%, -50%)`
      }
      reqId = requestAnimationFrame(loop)
    }
    reqId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(reqId)
    }
  }, [position.x, position.y, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Precision Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_10px_#00f2ff]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px) translate(-50%, -50%) scale(${isClicked ? 0.6 : 1})`
        }}
      />

      {/* Trailing Physics Ring */}
      <div
        ref={ringElementRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ${
          isHovered
            ? 'w-16 h-16 border-cyan-400/80 bg-cyan-500/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : isClicked
            ? 'w-7 h-7 border-purple-400 bg-purple-500/20'
            : 'w-10 h-10 border-cyan-400/30 bg-transparent'
        }`}
      >
        {hoverText && (
          <span className="text-[9px] font-mono tracking-widest text-cyan-300 font-bold uppercase select-none">
            {hoverText}
          </span>
        )}
      </div>

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed top-0 left-0 rounded-full border border-cyan-400/60 pointer-events-none animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  )
}
