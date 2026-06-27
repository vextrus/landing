'use client'

// <SystemProof> — the real-media spine. Shows the actual Vextrus product, never a
// simulation. One local component (no dependency) per spec §9 / plan W1.6.
//
//  • Poster-first: a WebP frame of the real UI carries the LCP (sub-200KB hero).
//  • Explicit aspect-ratio box → CLS = 0 (the single most important rule).
//  • Optional lazy <video> overlay (webm/mp4); hero = eager, below-fold = IO-gated,
//    play()/.pause() on enter/leave with a .catch()'d play promise.
//  • prefers-reduced-motion → static poster (a real UI frame), never a paused video.
//  • Minimal browser chrome (app.vextrus.com URL) composited as HTML, never baked
//    into pixels (themeable, crisp, Bangla-localizable).
//  • 3-tier honesty badge — the asymmetric roster's truth, on every capture.
//
// When `src` is omitted (today: ffmpeg-less, stills only) the component renders the
// poster alone — same box, same CLS guarantee, zero JS video work.

import { useEffect, useRef, useState } from 'react'

export type SystemProofStatus = 'live' | 'in-development' | 'roadmap'

const STATUS_LABEL: Record<SystemProofStatus, string> = {
  live: 'Available now',
  'in-development': 'In development',
  roadmap: 'On the roadmap',
}

export interface SystemProofProps {
  /** WebP poster of the real UI (required — carries the LCP and the reduced-motion frame). */
  poster: string
  /** Honest, specific alt text describing the real screen. */
  alt: string
  /** Intrinsic media dimensions — drive the aspect-ratio box (CLS = 0). */
  width: number
  height: number
  /** Optional looping clip; omit for a still. WebM first, MP4 fallback. */
  src?: { webm?: string; mp4?: string }
  /** Honest caption tied to a real on-screen value (rendered in mono). */
  caption?: string
  /** 3-tier honesty tag shown as a badge over the frame. */
  status?: SystemProofStatus
  /** Hero/above-fold → eager + high fetch priority; else lazy (IO-gated). */
  eager?: boolean
  /** Minimal browser-chrome frame; pass the real app URL path. */
  frame?: { url?: string }
  className?: string
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function SystemProof({
  poster,
  alt,
  width,
  height,
  src,
  caption,
  status,
  eager = false,
  frame,
  className = '',
}: SystemProofProps) {
  const hasVideo = Boolean(src?.webm || src?.mp4)
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Only mount the <video> when we actually intend to play it (video present,
  // motion allowed, and — for below-fold — once near the viewport).
  const [mountVideo, setMountVideo] = useState(false)

  useEffect(() => {
    if (!hasVideo || prefersReducedMotion()) return
    if (eager) {
      setMountVideo(true)
      return
    }
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setMountVideo(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMountVideo(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [hasVideo, eager])

  // Play/pause the mounted video as it enters/leaves; always catch the play promise.
  useEffect(() => {
    if (!mountVideo) return
    const v = videoRef.current
    const el = wrapRef.current
    if (!v || !el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            void v.play().catch(() => {})
          } else {
            v.pause()
          }
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mountVideo])

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className="overflow-hidden rounded-[14px] border"
        style={{ borderColor: 'var(--color-line, oklch(0.85 0.008 70))', background: 'var(--color-raised, #fff)' }}
      >
        {frame ? (
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ borderBottom: '1px solid var(--color-line, oklch(0.85 0.008 70))' }}
            aria-hidden
          >
            <span className="flex gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.72 0.04 30 / 0.5)' }} />
              <span className="block h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.72 0.04 90 / 0.5)' }} />
              <span className="block h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.72 0.04 150 / 0.5)' }} />
            </span>
            <span
              className="ml-1 truncate rounded-full px-2.5 py-0.5 text-[11px]"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--color-ink-soft, oklch(0.5 0.01 70))',
                background: 'var(--color-canvas, oklch(0.97 0.006 80))',
              }}
            >
              app.vextrus.com{frame.url ?? ''}
            </span>
          </div>
        ) : null}

        <div className="relative" ref={wrapRef} style={{ aspectRatio: `${width} / ${height}` }}>
          {/* Poster always present — owns the box, the LCP, and the reduced-motion frame.
              Plain <img> (not next/image) for exact width/height + CLS=0 over pre-optimized WebP. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={alt}
            width={width}
            height={height}
            loading={eager ? 'eager' : 'lazy'}
            {...(eager ? { fetchPriority: 'high' as const } : {})}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          {mountVideo ? (
            <video
              ref={videoRef}
              poster={poster}
              width={width}
              height={height}
              muted
              loop
              playsInline
              preload={eager ? 'auto' : 'none'}
              className="absolute inset-0 h-full w-full object-cover"
            >
              {src?.webm ? <source src={src.webm} type="video/webm" /> : null}
              {src?.mp4 ? <source src={src.mp4} type="video/mp4" /> : null}
            </video>
          ) : null}

          {status ? (
            <span
              className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                color: status === 'live' ? 'var(--color-accent, oklch(0.62 0.13 50))' : 'var(--color-ink-soft, oklch(0.5 0.01 70))',
                background: 'oklch(1 0 0 / 0.86)',
                border: '1px solid var(--color-line, oklch(0.85 0.008 70))',
              }}
            >
              {STATUS_LABEL[status]}
            </span>
          ) : null}
        </div>
      </div>

      {caption ? (
        <figcaption
          className="mt-2.5 text-[12.5px] leading-snug"
          style={{ fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-ink-soft, oklch(0.5 0.01 70))' }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default SystemProof
