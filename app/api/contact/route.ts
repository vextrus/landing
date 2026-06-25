import { NextResponse } from 'next/server'
import { z } from 'zod'

// Demo-request handler. Validates with zod, drops bot submissions via a honeypot,
// and forwards the lead to an env-configured CRM webhook / email. Nothing here is
// fatal if the webhook is unset — the lead is logged and accepted.
//
// Env:
//   CONTACT_WEBHOOK_URL  — optional POST target (Slack/CRM/Make/Zapier hook)
//   CONTACT_EMAIL        — notification address (default ceo@vextrus.com)

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  company: z.string().trim().min(1, 'Please enter your company.').max(160),
  role: z.string().trim().max(120).optional(),
  email: z.string().trim().email('Please enter a valid email.').max(200),
  message: z.string().trim().max(2000).optional(),
  // honeypot — real users never fill this; bots do. Accepted by the schema so a
  // filled value can be caught (and silently accepted) rather than 400'd.
  website: z.string().optional(),
})

export type ContactInput = z.infer<typeof ContactSchema>

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      if (!errors[key]) errors[key] = issue.message
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  // Honeypot tripped → accept silently so bots get no signal.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const { website: _hp, ...lead } = parsed.data
  void _hp

  const to = process.env.CONTACT_EMAIL ?? 'ceo@vextrus.com'
  const payload = {
    ...lead,
    to,
    source: 'www.vextrus.com /contact',
    receivedAt: new Date().toISOString(),
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`webhook ${res.status}`)
    } catch (err) {
      console.error('[contact] webhook delivery failed:', err)
      return NextResponse.json(
        { ok: false, message: 'We could not send your request. Please email ceo@vextrus.com.' },
        { status: 502 }
      )
    }
  } else {
    // No webhook configured — log the lead so it is not lost in dev/preview.
    console.log('[contact] demo request:', JSON.stringify(payload))
  }

  return NextResponse.json({ ok: true })
}
