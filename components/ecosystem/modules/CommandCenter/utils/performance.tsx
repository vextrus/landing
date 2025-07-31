import React, { memo, useCallback, useMemo, useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

// Performance monitoring HOC
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return memo((props: P) => {
    const renderCount = useRef(0)
    const renderTime = useRef<number>(0)
    
    useEffect(() => {
      renderCount.current++
      const startTime = performance.now()
      
      return () => {
        renderTime.current = performance.now() - startTime
        if (process.env.NODE_ENV === 'development' && renderTime.current > 16) {
          console.warn(
            `[Performance] ${componentName} took ${renderTime.current.toFixed(2)}ms to render (render #${renderCount.current})`
          )
        }
      }
    })
    
    return <Component {...props} />
  }, (prevProps, nextProps) => {
    // Custom comparison for better performance
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
  })
}

// Debounce hook for search and other inputs
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

// Intersection observer hook for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      observer.disconnect()
    }
  }, [ref, options])
  
  return isIntersecting
}

// Optimized event handler hook
export function useOptimizedHandler<T extends (...args: any[]) => any>(
  handler: T,
  deps: React.DependencyList
): T {
  return useCallback(handler, deps)
}

// Virtual scrolling hook for large lists
export function useVirtualScroll(
  items: any[],
  itemHeight: number,
  containerHeight: number,
  overscan = 5
) {
  const [scrollTop, setScrollTop] = React.useState(0)
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  )
  
  const visibleItems = items.slice(startIndex, endIndex + 1)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight
  
  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: (e: React.UIEvent<HTMLElement>) => {
      setScrollTop(e.currentTarget.scrollTop)
    }
  }
}

// Animation preference hook
export function useAnimationPreference() {
  const prefersReducedMotion = useReducedMotion()
  
  return {
    duration: prefersReducedMotion ? 0 : undefined,
    animate: !prefersReducedMotion,
    transition: prefersReducedMotion ? { duration: 0 } : undefined
  }
}

// Memoized className generator
export function useClassName(...classes: (string | undefined | false)[]) {
  return useMemo(() => classes.filter(Boolean).join(' '), [classes])
}