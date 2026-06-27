'use client'

import { useState, type FormEvent } from 'react'
import { Icon } from '../../ui/icon'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'company' | 'role' | 'email' | 'message' | 'form', string>>

const FIELD =
  'w-full rounded-[10px] border border-line-strong bg-[var(--color-paper)] px-3.5 py-3 text-sm text-ink transition-[border-color,box-shadow] placeholder:text-ink-dim focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-[oklch(0.62_0.13_50/0.2)] aria-[invalid=true]:border-[var(--color-overdue)]'

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs text-ink-soft">
      {children}
    </label>
  )
}

export function DemoForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const data = {
      name: String(fd.get('name') ?? ''),
      company: String(fd.get('company') ?? ''),
      role: String(fd.get('role') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''),
    }

    // lightweight client check (server is authoritative)
    const next: Errors = {}
    if (data.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!data.company.trim()) next.company = 'Please enter your company.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) next.email = 'Please enter a valid email.'
    if (Object.keys(next).length) {
      setErrors(next)
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrors({})
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.ok) {
        setStatus('success')
        form.reset()
      } else {
        setErrors(
          json.errors ?? { form: json.message ?? 'Something went wrong. Please try again.' }
        )
        setStatus('error')
      }
    } catch {
      setErrors({ form: 'Network error. Please email ceo@vextrus.com.' })
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="glass-card flex flex-col items-center gap-3 p-8 text-center"
        style={{ borderRadius: 18 }}
        role="status"
        aria-live="polite"
      >
        <span
          className="inline-grid h-12 w-12 place-items-center rounded-full"
          style={{ background: 'oklch(0.62 0.14 155 / 0.16)', color: 'var(--color-success)' }}
        >
          <Icon name="check" size={24} strokeWidth={2.2} />
        </span>
        <h2 className="m-0 font-heading text-[19px] font-semibold">Request received</h2>
        <p className="m-0 max-w-[320px] text-sm leading-normal text-ink-soft">
          A founder replies within one business day. Bring a structural drawing to the call — we’ll
          price it live.
        </p>
      </div>
    )
  }

  return (
    <form
      className="draft-cut p-7 sm:p-8"
      style={{ borderRadius: 16, background: 'var(--color-raised)' }}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={errors.form ? 'form-error' : undefined}
    >
      <h2 className="m-0 mb-1.5 font-heading text-[19px] font-semibold">Request a demo</h2>
      <p className="m-0 mb-5 text-[13px] text-ink-soft">
        A founder replies within one business day.
      </p>

      {/* honeypot — visually hidden, off the tab order */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className={FIELD}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && (
            <p
              id="err-name"
              className="mt-1 text-[11.5px]"
              style={{ color: 'var(--color-overdue)' }}
            >
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Your firm"
            className={FIELD}
            required
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'err-company' : undefined}
          />
          {errors.company && (
            <p
              id="err-company"
              className="mt-1 text-[11.5px]"
              style={{ color: 'var(--color-overdue)' }}
            >
              {errors.company}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <input id="role" name="role" type="text" placeholder="MD · CFO · QS" className={FIELD} />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@firm.com"
            className={FIELD}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && (
            <p
              id="err-email"
              className="mt-1 text-[11.5px]"
              style={{ color: 'var(--color-overdue)' }}
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3.5">
        <Label htmlFor="message">What would you like priced or solved?</Label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="e.g. an RCC pile-cap drawing; or procurement leakage on Project 2"
          className={`${FIELD} resize-y`}
        />
      </div>

      {errors.form && (
        <p
          id="form-error"
          className="mt-3 text-[12.5px]"
          style={{ color: 'var(--color-overdue)' }}
          role="alert"
        >
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-[18px] w-full rounded-[11px] bg-accent px-4 py-3.5 font-heading text-[15px] font-semibold text-[oklch(0.18_0.03_44)] transition-[transform,box-shadow,opacity] duration-200 ease-spring hover:shadow-[0_12px_34px_var(--accent-glow)] motion-safe:hover:-translate-y-0.5 active:translate-y-px disabled:opacity-70"
      >
        {status === 'submitting' ? 'Sending…' : 'Request a demo →'}
      </button>
      <p className="mt-3 text-center text-[11.5px] leading-normal text-ink-soft">
        Your data stays in your own isolated tenant. Private deployment is possible.
      </p>
    </form>
  )
}
