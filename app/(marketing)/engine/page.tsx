import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'
import { Section } from '@/components/ui/section'
import { Overline } from '@/components/ui/overline'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { LinkArrow } from '@/components/ui/link-arrow'
import { ModuleExplorer } from '@/components/signature/module-explorer'
import { FourThreads } from '@/components/sections/engine/four-threads'

export const metadata: Metadata = pageMeta({
  title: 'The Engine — 20 modules, one system of record',
  description:
    'The 20-module system the AI writes to. An AI is only useful if it can put the answer into your books — one balanced ledger, one tenant boundary, real write-back, connected across the whole business.',
  path: '/engine',
})

// Part 5.2 — the three properties that make the AI act, not just advise.
const PROPERTIES = [
  {
    n: '01',
    title: 'It writes the record',
    body: 'The AI does not hand you a document to re-type. It writes the real entry — a journal in the GL, a BOQ in costing, a collection action on the receivable. The output is the record itself, not a note about it.',
  },
  {
    n: '02',
    title: 'One action, everywhere',
    body: 'The modules are connected: when a journal posts or a milestone slips, the right modules react — nobody re-types anything. The AI plugs into the same wiring, so an approved entry flows through the whole business exactly as a human entry would.',
  },
  {
    n: '03',
    title: 'One source, one approval',
    body: 'Every module posts to the same ledger inside the same tenant boundary. One place the AI writes, one audit trail, one person who approves. No gap between an “AI system” and “the real system” — there is only the real system.',
  },
] as const

// Part 10.2 / 10.4 — architecture for the IT / CTO evaluator.
const ARCHITECTURE = [
  {
    title: 'DDD + CQRS, event-driven',
    body: 'Domain → application → infrastructure → presentation, with commands and queries and domain events across 20 bounded-context modules. Clean boundaries — no cross-module entity imports; integration by IDs and adapters.',
  },
  {
    title: 'Postgres Row-Level Security',
    body: 'Per-request tenant context drives PostgreSQL RLS under a non-bypass database role — isolation enforced by Postgres itself, not just the app layer. Policies are symmetric on read and write, so a tenant cannot cross the boundary either way.',
  },
  {
    title: 'Immutable audit trail',
    body: 'Globally fail-closed authentication, granular RBAC scopes, MFA, and a timestamp / identity / before-and-after record on every sensitive change. The same trail is the meter behind the Leakage Baseline.',
  },
] as const

const STACK = [
  'NestJS 11',
  'Prisma 7',
  'GraphQL',
  'PostgreSQL 16 + pgvector',
  'Redis 7',
  'React 19 + React Router 7',
  'Google Cloud Run',
] as const

export default function EnginePage() {
  return (
    <>
      {/* ── Hero — the engine is the floor, not the pitch ── */}
      <Section tone="canvas">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 82% 16%, oklch(0.55 0.1 275 / 0.16), transparent)',
          }}
          aria-hidden="true"
        />
        <div
          className="bg-grid mask-x pointer-events-none absolute inset-0 opacity-50"
          aria-hidden="true"
        />
        <Reveal className="relative max-w-[760px]">
          <Overline>The engine underneath</Overline>
          <h1 className="t-hero mt-3.5 max-w-[15ch]">20 modules. One system of record.</h1>
          <p className="mt-5 max-w-[640px] text-[18px] leading-relaxed text-ink-soft">
            The AI is the product. This is what it stands on — the system it can actually write to.
            A chatbot can read a drawing and talk about it. It cannot create a real BOQ line,
            because it has nowhere to put the answer.{' '}
            <strong className="font-semibold text-ink">
              An AI is only useful if it can put the answer into your books — not just talk about
              it.
            </strong>
          </p>
        </Reveal>
      </Section>

      {/* ── The 20 modules — interactive explorer ── */}
      <Section tone="deep">
        <Reveal className="max-w-[680px]">
          <Overline>What the AI stands on</Overline>
          <h2 className="t-section mt-3.5">Twenty modules, one balanced set of books.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Pick any module to see what it does, what you get out of it, and which agents write to
            it. Twenty in all — and one tenant boundary around them.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">
            Built first for construction and real estate — the same engine can serve other
            industries.
          </p>
        </Reveal>

        <ModuleExplorer className="mt-12" />
      </Section>

      {/* ── Why the agents are REAL (Part 5.2) ── */}
      <Section tone="canvas">
        <div
          className="bg-atmosphere-soft pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Overline>Why the AI acts, not just advises</Overline>
            <h2 className="t-section mt-3.5">Three things that make it real.</h2>
          </Reveal>
          <div className="mt-12 grid gap-[18px] md:grid-cols-3">
            {PROPERTIES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07} className="h-full">
                <div className="h-full rounded-[16px] border border-line bg-raised p-[26px]">
                  <div className="mb-3 font-mono text-[24px] text-accent">{p.n}</div>
                  <h3 className="m-0 mb-2 font-heading text-[18px] font-semibold">{p.title}</h3>
                  <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── The four threads (Part 5.3) ── */}
      <Section tone="deep">
        <Reveal className="max-w-[700px]">
          <Overline>Four threads</Overline>
          <h2 className="t-section mt-3.5">One action flows end to end. No double entry.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            The proof the engine is connected — and that the AI works across all of it, not in one
            corner — is that one action moves through the whole business with nothing re-typed.
          </p>
        </Reveal>
        <FourThreads className="mt-12" />
      </Section>

      {/* ── Architecture & trust (Part 10.2 / 10.4) ── */}
      <Section tone="canvas">
        <div
          className="bg-grid pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div className="relative">
          <Reveal className="max-w-[700px]">
            <Overline>For the IT / CTO evaluator</Overline>
            <h2 className="t-section mt-3.5">Architecture &amp; isolation.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              Plain enough to trust, calm enough to sign off. The isolation is enforced in the
              database, not just the application layer.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {ARCHITECTURE.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.07} className="h-full">
                <div className="h-full rounded-[14px] border border-line bg-raised p-[22px]">
                  <h3 className="m-0 mb-2 font-heading text-[15px] font-semibold">{a.title}</h3>
                  <p className="m-0 text-[13px] leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-7 flex flex-wrap gap-2" delay={0.1}>
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-[7px] border border-line px-[11px] py-1.5 font-mono text-[11px] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <Section tone="deep" className="text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 40%, oklch(0.55 0.1 275 / 0.18), transparent), radial-gradient(ellipse 50% 50% at 70% 80%, oklch(0.55 0.1 44 / 0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[720px]">
          <h2 className="t-display">
            The engine is the floor.
            <br />
            <span className="italic text-gradient">The AI is what you put to work.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-relaxed text-ink-soft">
            Twenty modules, one balanced ledger, one tenant boundary — built and connected. It is
            the reason a Vextrus agent does the work instead of just describing it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Book a demo
            </Button>
            <Button href="/workforce" size="lg" variant="ghost">
              Meet the workforce
            </Button>
          </div>
          <div className="mt-6">
            <LinkArrow href="/workforce">Explore all 23 agents</LinkArrow>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
