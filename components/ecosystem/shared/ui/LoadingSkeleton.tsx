'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  count?: number
}

export default function LoadingSkeleton({ 
  className = '',
  variant = 'text',
  width,
  height,
  count = 1
}: LoadingSkeletonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return `h-4 rounded-md ${width ? '' : 'w-full'}`
      case 'circular':
        return 'rounded-full aspect-square'
      case 'rectangular':
        return 'rounded-lg'
      case 'card':
        return 'rounded-2xl'
      default:
        return ''
    }
  }

  const skeletonElements = Array.from({ length: count }, (_, i) => (
    <motion.div
      key={i}
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${getVariantStyles()} ${className}`}
      style={{ 
        width: width || undefined, 
        height: height || undefined,
        backgroundSize: '200% 100%'
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0']
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  ))

  return (
    <>
      {count > 1 ? (
        <div className="space-y-3">
          {skeletonElements}
        </div>
      ) : (
        skeletonElements[0]
      )}
    </>
  )
}

// Card Skeleton Component
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <LoadingSkeleton variant="text" width="60%" height={24} />
          <LoadingSkeleton variant="circular" width={40} height={40} />
        </div>
        <LoadingSkeleton variant="text" width="40%" height={16} />
        <div className="pt-4">
          <LoadingSkeleton variant="rectangular" height={120} />
        </div>
        <div className="flex items-center gap-4">
          <LoadingSkeleton variant="text" width="30%" />
          <LoadingSkeleton variant="text" width="30%" />
        </div>
      </div>
    </div>
  )
}

// Map Skeleton Component
export function MapSkeleton() {
  return (
    <div className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
      <div className="absolute top-4 left-4">
        <LoadingSkeleton variant="rectangular" width={120} height={40} />
      </div>
      <div className="absolute top-4 right-4">
        <LoadingSkeleton variant="card" width={200} height={140} />
      </div>
    </div>
  )
}