// Global counter for particle IDs to ensure uniqueness
let particleIdCounter = 0

export interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  lifetime: number
  maxLifetime: number
  type: 'ambient' | 'data' | 'explosion' | 'trail'
}

export interface ParticleConfig {
  count?: number
  speed?: number
  size?: { min: number; max: number }
  opacity?: { min: number; max: number }
  lifetime?: { min: number; max: number }
  colors?: string[]
}

// Generate random number between min and max
export const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

// Create ambient floating particles
export const createAmbientParticles = (
  width: number,
  height: number,
  config: ParticleConfig = {}
): Particle[] => {
  const {
    count = 30,
    speed = 0.5,
    size = { min: 1, max: 3 },
    opacity = { min: 0.1, max: 0.3 },
    lifetime = { min: 500, max: 1500 },
    colors = ['#6366f1', '#a855f7', '#ec4899', '#06b6d4']
  } = config

  return Array.from({ length: count }, (_, i) => ({
    id: `ambient-${particleIdCounter++}`,
    x: random(0, width),
    y: random(0, height),
    vx: random(-speed, speed),
    vy: random(-speed, speed),
    size: random(size.min, size.max),
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: random(opacity.min, opacity.max),
    lifetime: 0,
    maxLifetime: random(lifetime.min, lifetime.max),
    type: 'ambient' as const
  }))
}

// Create explosion particles at a point
export const createExplosionParticles = (
  x: number,
  y: number,
  config: ParticleConfig = {}
): Particle[] => {
  const {
    count = 20,
    speed = 5,
    size = { min: 2, max: 6 },
    opacity = { min: 0.6, max: 1 },
    lifetime = { min: 30, max: 60 },
    colors = ['#fbbf24', '#f59e0b', '#f97316', '#ef4444']
  } = config

  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + random(-0.2, 0.2)
    const velocity = random(speed * 0.5, speed)
    
    return {
      id: `explosion-${particleIdCounter++}`,
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      size: random(size.min, size.max),
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: random(opacity.min, opacity.max),
      lifetime: 0,
      maxLifetime: random(lifetime.min, lifetime.max),
      type: 'explosion' as const
    }
  })
}

// Create data flow particles between two points
export const createDataFlowParticle = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string = '#6366f1'
): Particle => {
  return {
    id: `data-${particleIdCounter++}`,
    x: startX,
    y: startY,
    vx: 0,
    vy: 0,
    size: random(2, 4),
    color,
    opacity: 0.8,
    lifetime: 0,
    maxLifetime: 200,
    type: 'data' as const
  }
}

// Update particle physics
export const updateParticle = (
  particle: Particle,
  targetX?: number,
  targetY?: number,
  bounds?: { width: number; height: number }
): Particle => {
  const updated = { ...particle }
  updated.lifetime++

  switch (particle.type) {
    case 'ambient':
      // Float with slight randomness
      updated.x += particle.vx
      updated.y += particle.vy
      updated.vx += random(-0.02, 0.02)
      updated.vy += random(-0.02, 0.02)
      updated.vx *= 0.99 // Damping
      updated.vy *= 0.99

      // Wrap around bounds
      if (bounds) {
        if (updated.x < 0) updated.x = bounds.width
        if (updated.x > bounds.width) updated.x = 0
        if (updated.y < 0) updated.y = bounds.height
        if (updated.y > bounds.height) updated.y = 0
      }
      break

    case 'data':
      // Move towards target
      if (targetX !== undefined && targetY !== undefined) {
        const dx = targetX - updated.x
        const dy = targetY - updated.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 3) {
          const speed = 3
          updated.vx = (dx / distance) * speed
          updated.vy = (dy / distance) * speed
          updated.x += updated.vx
          updated.y += updated.vy
        }
      }
      break

    case 'explosion':
      // Expand outward with gravity
      updated.x += particle.vx
      updated.y += particle.vy
      updated.vy += 0.3 // Gravity
      updated.vx *= 0.98 // Friction
      updated.opacity = particle.opacity * (1 - particle.lifetime / particle.maxLifetime)
      break
  }

  return updated
}

// Draw particle with glow effect
export const drawParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  glowMultiplier: number = 2
) => {
  // Glow effect
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * glowMultiplier
  )
  
  const alpha = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')
  gradient.addColorStop(0, particle.color + alpha)
  gradient.addColorStop(0.5, particle.color + Math.floor(particle.opacity * 0.5 * 255).toString(16).padStart(2, '0'))
  gradient.addColorStop(1, particle.color + '00')
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size * glowMultiplier, 0, Math.PI * 2)
  ctx.fill()
  
  // Core
  ctx.fillStyle = particle.type === 'data' ? '#ffffff' : particle.color
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
  ctx.fill()
}

// Create gradient mesh background
export const drawGradientMesh = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) => {
  const gridSize = 100
  const points: { x: number; y: number; color: string }[] = []
  
  // Create grid points with animated colors
  for (let x = 0; x <= width; x += gridSize) {
    for (let y = 0; y <= height; y += gridSize) {
      const hue = (Math.sin(time * 0.001 + x * 0.01) * 30 + 250) % 360
      const lightness = 50 + Math.sin(time * 0.001 + y * 0.01) * 10
      points.push({
        x,
        y,
        color: `hsl(${hue}, 70%, ${lightness}%)`
      })
    }
  }
  
  // Draw gradient between points
  points.forEach((point, i) => {
    const gradient = ctx.createRadialGradient(
      point.x, point.y, 0,
      point.x, point.y, gridSize * 1.5
    )
    gradient.addColorStop(0, point.color + '20')
    gradient.addColorStop(1, point.color + '00')
    
    ctx.fillStyle = gradient
    ctx.fillRect(
      point.x - gridSize,
      point.y - gridSize,
      gridSize * 2,
      gridSize * 2
    )
  })
}

// Neural network connection effect
export const drawNeuralConnection = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  progress: number,
  color: string = '#6366f1'
) => {
  // Calculate control points for curved path
  const dx = x2 - x1
  const dy = y2 - y1
  const distance = Math.sqrt(dx * dx + dy * dy)
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2
  
  // Perpendicular offset for curve
  const offsetX = -dy / distance * 30
  const offsetY = dx / distance * 30
  
  const controlX = midX + offsetX * Math.sin(progress * Math.PI)
  const controlY = midY + offsetY * Math.sin(progress * Math.PI)
  
  // Draw path
  ctx.strokeStyle = color + Math.floor(progress * 100).toString(16).padStart(2, '0')
  ctx.lineWidth = 2 + Math.sin(progress * Math.PI) * 2
  ctx.lineCap = 'round'
  
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.quadraticCurveTo(controlX, controlY, x2, y2)
  ctx.stroke()
  
  // Draw pulse along path
  if (progress < 1) {
    const t = progress
    const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * controlX + t * t * x2
    const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * controlY + t * t * y2
    
    const pulseGradient = ctx.createRadialGradient(px, py, 0, px, py, 10)
    pulseGradient.addColorStop(0, '#ffffff')
    pulseGradient.addColorStop(0.5, color)
    pulseGradient.addColorStop(1, color + '00')
    
    ctx.fillStyle = pulseGradient
    ctx.beginPath()
    ctx.arc(px, py, 10, 0, Math.PI * 2)
    ctx.fill()
  }
}