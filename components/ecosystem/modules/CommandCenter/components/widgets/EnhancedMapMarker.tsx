'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Construction, AlertTriangle, Building2, TrendingUp, Users, Shield } from 'lucide-react'
import { useLiquidGlassDark } from '../../theme/liquidGlassDark'

interface EnhancedMapMarkerProps {
  site: any
  getStatusColor: (status: string) => string
  onHover: (siteId: string | null) => void
  onClick: (siteId: string) => void
  selected?: boolean
}

const EnhancedMapMarker: React.FC<EnhancedMapMarkerProps> = ({ 
  site, 
  getStatusColor, 
  onHover, 
  onClick,
  selected = false
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(false)
  const theme = useLiquidGlassDark()

  // Enhanced color mapping for dark theme
  const statusColorMap: Record<string, string> = {
    planning: '#6B7280',
    foundation: '#FFB800',
    structure: '#00D9FF',
    finishing: '#00FF88',
    completed: '#00FF88'
  }

  const markerColor = statusColorMap[site.status] || '#00D9FF'
  const progressCircumference = 2 * Math.PI * 24

  // Trigger pulse animation for active sites
  useEffect(() => {
    if (site.details.issues > 0 || site.status === 'structure') {
      setPulseAnimation(true)
    }
  }, [site.details.issues, site.status])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    onHover(site.id)
  }, [site.id, onHover])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    onHover(null)
  }, [onHover])

  const handleClick = useCallback(() => {
    onClick(site.id)
  }, [site.id, onClick])

  // Get icon based on site type
  const getIcon = () => {
    switch(site.type) {
      case 'residential': return Building2
      case 'commercial': return Construction
      default: return Construction
    }
  }

  const Icon = getIcon()

  return (
    <motion.div
      className="map-marker-react"
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{ 
        scale: selected ? 1.3 : isHovered ? 1.2 : 1,
        opacity: 1,
        y: selected ? -8 : isHovered ? -6 : 0 
      }}
      whileTap={{ 
        scale: 0.95,
        y: 0,
        transition: { duration: 0.1 } 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25, 
        mass: 0.8 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '56px',
        height: '56px',
        cursor: 'pointer',
        filter: `drop-shadow(0 ${isHovered ? '8px 16px' : '4px 8px'} rgba(0,0,0,0.3))`,
      }}
    >
      {/* Ambient glow effect */}
      <AnimatePresence>
        {(isHovered || selected) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${markerColor}40 0%, transparent 70%)`,
              filter: 'blur(20px)',
              pointerEvents: 'none',
              zIndex: -2,
            }}
          />
        )}
      </AnimatePresence>

      {/* Energy ring pulses for active sites */}
      {pulseAnimation && (
        <>
          {[0, 0.3, 0.6].map((delay, index) => (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                inset: -index * 4,
                borderRadius: '50%',
                border: `1px solid ${markerColor}`,
                opacity: 0,
                pointerEvents: 'none',
              }}
              animate={{
                scale: [1, 1.5, 1.8],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                delay,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* Glass morphism container */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: '50%',
          background: theme.colors.glass.medium.background,
          backdropFilter: `blur(${theme.colors.glass.medium.blur})`,
          WebkitBackdropFilter: `blur(${theme.colors.glass.medium.blur})`,
          border: `2px solid ${markerColor}`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          borderWidth: isHovered || selected ? '3px' : '2px',
          borderColor: isHovered || selected ? markerColor : `${markerColor}AA`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Holographic shimmer effect */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(105deg, transparent 40%, ${markerColor}30 50%, transparent 60%)`,
            pointerEvents: 'none',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${markerColor}20 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon with glow effect */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon 
            style={{ 
              width: 24, 
              height: 24, 
              color: markerColor,
              filter: `drop-shadow(0 0 8px ${markerColor}50)`,
            }} 
          />
        </motion.div>
      </motion.div>

      {/* Enhanced progress ring */}
      <svg
        style={{
          position: 'absolute',
          inset: '-2px',
          width: '60px',
          height: '60px',
          transform: 'rotate(-90deg)',
          pointerEvents: 'none'
        }}
      >
        <defs>
          {/* Gradient definitions for dark theme */}
          <linearGradient id={`bg-gradient-${site.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
          <linearGradient id={`progress-gradient-${site.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={markerColor} />
            <stop offset="50%" stopColor={markerColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={markerColor} stopOpacity="0.6" />
          </linearGradient>
          <filter id={`glow-${site.id}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background ring */}
        <circle
          cx="30"
          cy="30"
          r="24"
          fill="none"
          stroke={`url(#bg-gradient-${site.id})`}
          strokeWidth="2"
          opacity="0.5"
        />
        
        {/* Progress ring with animation */}
        <motion.circle
          cx="30"
          cy="30"
          r="24"
          fill="none"
          stroke={`url(#progress-gradient-${site.id})`}
          strokeWidth={isHovered || selected ? "3" : "2"}
          strokeLinecap="round"
          filter={`url(#glow-${site.id})`}
          initial={{
            strokeDasharray: `0 ${progressCircumference}`,
          }}
          animate={{
            strokeDasharray: `${(site.progress / 100) * progressCircumference} ${progressCircumference}`,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.2,
          }}
        />

        {/* Animated progress endpoint */}
        {site.progress > 0 && site.progress < 100 && (
          <motion.circle
            cx="30"
            cy="6"
            r="3"
            fill={markerColor}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0.8],
              r: [2, 3, 2],
              rotate: (site.progress / 100) * 360,
            }}
            transition={{
              opacity: { duration: 1.5, delay: 1.7 },
              r: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 1.5, delay: 0.2 },
            }}
            style={{
              transformOrigin: '30px 30px',
              filter: `drop-shadow(0 0 6px ${markerColor})`,
            }}
          />
        )}
      </svg>

      {/* Status indicators */}
      <AnimatePresence>
        {/* Issue badge with enhanced styling */}
        {site.details.issues > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              rotate: 0,
              opacity: 1,
            }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '22px',
              height: '22px',
              background: `linear-gradient(135deg, ${theme.colors.accent.danger} 0%, ${theme.colors.accent.danger}CC 100%)`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              border: `2px solid ${theme.colors.background.primary}`,
              boxShadow: `0 4px 8px rgba(255, 51, 102, 0.4)`,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
          >
            {site.details.issues}
          </motion.div>
        )}

        {/* Productivity indicator for high-performing sites */}
        {site.details.productivity > 90 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              background: `linear-gradient(135deg, ${theme.colors.accent.success} 0%, ${theme.colors.accent.success}CC 100%)`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${theme.colors.background.primary}`,
              boxShadow: `0 4px 8px rgba(0, 255, 136, 0.4)`,
            }}
            transition={{ delay: 0.3 }}
          >
            <TrendingUp style={{ width: 12, height: 12, color: 'white' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover info card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              minWidth: '160px',
              padding: '12px',
              borderRadius: '12px',
              background: theme.colors.glass.strong.background,
              backdropFilter: `blur(${theme.colors.glass.strong.blur})`,
              WebkitBackdropFilter: `blur(${theme.colors.glass.strong.blur})`,
              border: `1px solid ${theme.colors.glass.strong.border}`,
              boxShadow: theme.colors.glass.strong.shadow,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <h4 className="text-sm font-semibold text-white mb-2">{site.name}</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Progress</span>
                <span className="text-white font-medium">{site.progress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Workers</span>
                <span className="text-white font-medium">{site.workers.toLocaleString()}</span>
              </div>
              {site.details.safety && (
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Safety</span>
                  <span className={`font-medium ${site.details.safety >= 95 ? 'text-[#00FF88]' : 'text-[#FFB800]'}`}>
                    {site.details.safety}%
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default React.memo(EnhancedMapMarker)