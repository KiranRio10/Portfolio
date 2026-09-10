import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Canvas3D({ viewMode = 'constellation' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let animationFrameId
    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    // 1. Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x030712, 0.0018)

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 90

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x030712, 1)
    container.appendChild(renderer.domElement)

    // 4. Kinetic Particles Constellation
    const particleCount = 900
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color('#06b6d4') // cyan
    const color2 = new THREE.Color('#8b5cf6') // purple
    const color3 = new THREE.Color('#10b981') // emerald

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3
      positions[idx] = (Math.random() - 0.5) * 180
      positions[idx + 1] = (Math.random() - 0.5) * 180
      positions[idx + 2] = (Math.random() - 0.5) * 180

      velocities[idx] = (Math.random() - 0.5) * 0.08
      velocities[idx + 1] = (Math.random() - 0.5) * 0.08
      velocities[idx + 2] = (Math.random() - 0.5) * 0.08

      const mixed = Math.random() < 0.5 ? color1.clone().lerp(color2, Math.random()) : color2.clone().lerp(color3, Math.random())
      colors[idx] = mixed.r
      colors[idx + 1] = mixed.g
      colors[idx + 2] = mixed.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Canvas particle texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.8)')
      gradient.addColorStop(0.8, 'rgba(139, 92, 246, 0.2)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(canvas)
    }

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: createParticleTexture(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, particleMaterial)
    scene.add(particleSystem)

    // 5. Central Kinetic Cyber Icosahedron
    const coreGroup = new THREE.Group()
    
    // Outer wireframe icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(18, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    })
    const icoMesh = new THREE.Mesh(icoGeom, icoMat)
    coreGroup.add(icoMesh)

    // Inner glowing sphere core
    const innerGeom = new THREE.SphereGeometry(7, 16, 16)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    })
    const innerMesh = new THREE.Mesh(innerGeom, innerMat)
    coreGroup.add(innerMesh)

    // Orbiting rings
    const ringGeom = new THREE.TorusGeometry(26, 0.2, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f2ff,
      transparent: true,
      opacity: 0.4
    })
    const ringMesh1 = new THREE.Mesh(ringGeom, ringMat)
    ringMesh1.rotation.x = Math.PI / 3
    coreGroup.add(ringMesh1)

    const ringMesh2 = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({
      color: 0xff007f,
      transparent: true,
      opacity: 0.3
    }))
    ringMesh2.rotation.y = Math.PI / 4
    coreGroup.add(ringMesh2)

    scene.add(coreGroup)

    // 6. Interactive Mouse Tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let mouseSpeed = 0
    let prevMouseX = 0
    let prevMouseY = 0

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2
      const windowHalfY = window.innerHeight / 2
      mouseX = (e.clientX - windowHalfX) * 0.05
      mouseY = (e.clientY - windowHalfY) * 0.05

      // Compute speed
      const dx = e.clientX - prevMouseX
      const dy = e.clientY - prevMouseY
      mouseSpeed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.005, 0.5)
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 7. Window Resize
    const handleResize = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // 8. Animation Loop
    const startTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = (performance.now() - startTime) * 0.001

      // Mouse Lerp
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      mouseSpeed *= 0.95

      // Rotate central cyber core
      coreGroup.rotation.x = elapsedTime * 0.2 + targetY * 0.02
      coreGroup.rotation.y = elapsedTime * 0.3 + targetX * 0.02
      ringMesh1.rotation.z = elapsedTime * 0.4
      ringMesh2.rotation.x = elapsedTime * -0.3

      // Rotate particle cloud
      particleSystem.rotation.y = elapsedTime * 0.05 + targetX * 0.01
      particleSystem.rotation.x = targetY * 0.01

      // Subtle particle breathing
      const posArray = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        posArray[idx] += velocities[idx] * (1 + mouseSpeed * 3)
        posArray[idx + 1] += velocities[idx + 1] * (1 + mouseSpeed * 3)
        posArray[idx + 2] += velocities[idx + 2] * (1 + mouseSpeed * 3)

        // Boundary wrap
        if (Math.abs(posArray[idx]) > 90) velocities[idx] *= -1
        if (Math.abs(posArray[idx + 1]) > 90) velocities[idx + 1] *= -1
        if (Math.abs(posArray[idx + 2]) > 90) velocities[idx + 2] *= -1
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      // Camera viewMode adjustment
      if (viewMode === 'terminal') {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 120, 0.05)
        coreGroup.position.y = THREE.MathUtils.lerp(coreGroup.position.y, -30, 0.05)
      } else if (viewMode === 'timeline') {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 80, 0.05)
        coreGroup.position.y = THREE.MathUtils.lerp(coreGroup.position.y, 0, 0.05)
      } else {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 90, 0.05)
        coreGroup.position.y = THREE.MathUtils.lerp(coreGroup.position.y, 0, 0.05)
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      particleMaterial.dispose()
      icoGeom.dispose()
      icoMat.dispose()
      innerGeom.dispose()
      innerMat.dispose()
      ringGeom.dispose()
      ringMat.dispose()
      renderer.dispose()
    }
  }, [viewMode])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  )
}
