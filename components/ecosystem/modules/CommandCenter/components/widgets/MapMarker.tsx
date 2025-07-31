'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Construction, AlertTriangle } from 'lucide-react'

interface MapMarkerProps {
  site: any
  getStatusColor: (status: string) => string
  onHover: (siteId: string | null) => void
  onClick: (siteId: string) => void
}

const MapMarker: React.FC<MapMarkerProps> = ({ 
  site, 
  getStatusColor, 
  onHover, 
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const markerColor = getStatusColor(site.status)
  const progressCircumference = 2 * Math.PI * 22

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

  return (
    <motion.div
      className="map-marker-react"
      initial={{ scale: 1, y: 0 }}
      animate={{ 
        scale: isHovered ? 1.18 : 1,
        y: isHovered ? -4 : 0 
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
        width: '48px',
        height: '48px',
        cursor: 'pointer',
        filter: isHovered ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
      }}
    >
      {/* Background pulse effect for issues */}
      {site.details.issues > 0 && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: markerColor,
            borderRadius: '50%',
            opacity: 0.2,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Main marker circle */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '6px',
          background: isHovered 
            ? `linear-gradient(135deg, white 0%, ${markerColor}05 100%)` 
            : 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `3px solid ${markerColor}`,
          overflow: 'hidden',
        }}
        animate={{
          borderWidth: isHovered ? '4px' : '3px',
          background: isHovered 
            ? `linear-gradient(135deg, white 0%, ${markerColor}05 100%)` 
            : 'white',
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Subtle inner glow on hover */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${markerColor}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <Construction 
          style={{ 
            width: 20, 
            height: 20, 
            color: markerColor 
          }} 
        />
      </motion.div>

      {/* Progress ring SVG */}
      <motion.svg
        style={{
          position: 'absolute',
          inset: '-2px',
          width: '52px',
          height: '52px',
          transform: 'rotate(-90deg)',
          pointerEvents: 'none'
        }}
        animate={{
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background ring with gradient */}
        <defs>
          <linearGradient id={`bg-gradient-${site.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
          <linearGradient id={`progress-gradient-${site.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={markerColor} stopOpacity="1" />
            <stop offset="100%" stopColor={markerColor} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        
        <circle
          cx="26"
          cy="26"
          r="22"
          fill="none"
          stroke={`url(#bg-gradient-${site.id})`}
          strokeWidth={isHovered ? "4" : "3"}
        />
        
        {/* Progress ring with enhanced effects */}
        <motion.circle
          cx="26"
          cy="26"
          r="22"
          fill="none"
          stroke={`url(#progress-gradient-${site.id})`}
          strokeWidth={isHovered ? "4" : "3"}
          strokeLinecap="round"
          style={{
            filter: isHovered 
              ? `drop-shadow(0 0 8px ${markerColor}) brightness(1.1)` 
              : `drop-shadow(0 0 4px ${markerColor})`,
          }}
          initial={{
            strokeDasharray: `0 ${progressCircumference}`,
          }}
          animate={{
            strokeDasharray: `${(site.progress / 100) * progressCircumference} ${progressCircumference}`,
            strokeWidth: isHovered ? "4" : "3",
          }}
          transition={{
            strokeDasharray: { duration: 1.2, ease: "easeOut", delay: 0.1 },
            strokeWidth: { duration: 0.2 },
          }}
        />
      </motion.svg>

      {/* Issue badge */}
      {site.details.issues > 0 && (
        <motion.div
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '11px',
            fontWeight: 'bold',
            border: '2px solid white',
            boxShadow: isHovered 
              ? '0 4px 8px rgba(239, 68, 68, 0.4), 0 2px 4px rgba(0,0,0,0.2)' 
              : '0 2px 4px rgba(0,0,0,0.2)',
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: 0,
            boxShadow: isHovered 
              ? '0 4px 8px rgba(239, 68, 68, 0.4), 0 2px 4px rgba(0,0,0,0.2)' 
              : '0 2px 4px rgba(0,0,0,0.2)',
          }}
          transition={{
            scale: { type: "spring", stiffness: 400, damping: 20, delay: 0.2 },
            rotate: { type: "spring", stiffness: 300, damping: 25, delay: 0.2 },
            boxShadow: { duration: 0.2 }
          }}
        >
          {site.details.issues}
        </motion.div>
      )}

      {/* Enhanced hover glow effect */}
      {isHovered && (
        <>
          {/* Primary glow */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${markerColor}25 0%, ${markerColor}10 40%, transparent 70%)`,
              filter: 'blur(12px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Secondary pulse effect */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${markerColor}15 0%, transparent 60%)`,
              filter: 'blur(4px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </motion.div>
  )
}

export default React.memo(MapMarker)