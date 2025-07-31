/**
 * Animation utilities for the Vextrus ecosystem
 */

import { Variants } from 'framer-motion'

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
}

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const fadeInScale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

// Three.js animation helpers
export const rotateAnimation = {
  rotateY: [0, Math.PI * 2],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }
}

// Module-specific animations
export const moduleHover = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
}

export const dataFlowAnimation = {
  pathLength: [0, 1],
  opacity: [0, 1, 1, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }
}

// Number counter animation
export function animateValue(
  start: number, 
  end: number, 
  duration: number, 
  callback: (value: number) => void
) {
  const startTime = Date.now()
  const endTime = startTime + duration
  
  const update = () => {
    const now = Date.now()
    const progress = Math.min((now - startTime) / duration, 1)
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = start + (end - start) * easeOutQuart
    
    callback(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  
  requestAnimationFrame(update)
}

// Stagger delay calculator
export function getStaggerDelay(index: number, baseDelay: number = 0.1): number {
  return index * baseDelay
}

// Random float between min and max
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// Particle system configuration
export const particleConfig = {
  count: 100,
  speed: 0.5,
  size: 0.1,
  color: '#14B8A6',
  opacity: 0.6
}

// WebGL performance settings
export const performanceConfig = {
  high: {
    shadows: true,
    antialias: true,
    pixelRatio: window.devicePixelRatio || 1,
    shadowMapSize: 2048
  },
  medium: {
    shadows: true,
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    shadowMapSize: 1024
  },
  low: {
    shadows: false,
    antialias: false,
    pixelRatio: 1,
    shadowMapSize: 512
  }
}

// Device detection for performance
export function getPerformanceLevel(): 'high' | 'medium' | 'low' {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const gpu = (navigator as any).gpu
  
  if (isMobile) return 'low'
  if (!gpu) return 'medium'
  return 'high'
}