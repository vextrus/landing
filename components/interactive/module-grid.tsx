'use client'

import { useEffect, useRef, useState } from 'react'
import { LucideIcon } from '@/components/ui/lucide-icon'
import type { Module } from '@/lib/modules'

interface ModuleGridProps {
  modules: Module[]
  domains: readonly { readonly name: string; readonly ids: readonly string[] }[]
}

function ModuleCard({ module }: { module: Module }) {
  const [hovered, setHovered] = useState(false)
  const color = `oklch(0.65 0.12 ${module.hue})`

  return (
    <div
      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--canvas-raised)] p-4 transition-all duration-200"
      style={{
        borderColor: hovered ? color : undefined,
        boxShadow: hovered ? `0 0 20px oklch(0.65 0.12 ${module.hue} / 0.12)` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `oklch(0.65 0.12 ${module.hue} / 0.15)`,
          }}
        >
          <LucideIcon name={module.icon} size={14} style={{ color }} strokeWidth={1.8} />
        </div>
        <h3 className="font-heading text-[13px] font-semibold text-[var(--text-primary)]">
          {module.name}
        </h3>
      </div>

      <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-secondary)]">
        {module.description}
      </p>

      {/* Hover features */}
      {hovered && module.hoverFeatures && (
        <ul className="mt-2 space-y-1 border-t border-[var(--border-subtle)] pt-2">
          {module.hoverFeatures.map((f) => (
            <li
              key={f}
              className="flex items-start gap-1.5 text-[11px] text-[var(--text-secondary)]"
            >
              <span
                className="mt-1 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ModuleGrid({ modules, domains }: ModuleGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  // Group modules by domain, excluding Intelligence and Real Estate (they get deep dives)
  const domainGroups = domains.filter((d) => !['Intelligence', 'Real Estate'].includes(d.name))

  return (
    <div
      ref={gridRef}
      className={`mt-12 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {domainGroups.map((domain) => {
        const domainModules = modules.filter((m) => domain.ids.includes(m.id))
        if (domainModules.length === 0) return null

        return (
          <div key={domain.name} className="mt-8 first:mt-0">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              {domain.name}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {domainModules.map((m) => (
                <ModuleCard key={m.id} module={m} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
