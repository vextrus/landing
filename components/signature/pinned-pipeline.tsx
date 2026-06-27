// The Estimator signature — the real captured output (the proof) above a numbered
// state-to-state sequence of the one shipped workflow. The capture is real (C1); the
// step beats are designed annotations (honest — never a faked screen for the
// not-yet-captured approve/post steps). Pure CSS, no scroll JS: each step reveals on
// scroll where supported (.reveal-up) and is plain-visible everywhere else. The
// numbered sequence is a drafting device because the order carries real meaning.

const STEPS = [
  { k: '01', tag: 'Upload', beat: 'A structural drawing goes in — a pile-cap, a footing, a slab. DWG, PDF or a render.' },
  { k: '02', tag: 'Read', beat: 'Vision reads the dimensions only. A fixed-rule engine computes the concrete volume.', metric: '14.70 m³' },
  { k: '03', tag: 'Price', beat: 'A priced Bill of Quantities + a waste-minimised Bar Bending Schedule, in the BD format.' },
  { k: '04', tag: 'Approve', beat: 'It arrives as a 4-Eyes draft. Confirm, modify or reject on a visible diff — you can’t approve your own work.' },
  { k: '05', tag: 'Post', beat: 'On approval, a registered command posts the real BOQ lines to your costing books. Identity, time, before-and-after — logged.' },
]

function Capture() {
  return (
    <div className="draft-frame mx-auto max-w-[880px]">
      <div
        className="overflow-hidden rounded-[14px] border"
        style={{ borderColor: 'var(--color-line-strong)', background: 'var(--color-raised)' }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ borderBottom: '1px solid var(--color-line)' }}
          aria-hidden
        >
          <span className="flex gap-1.5">
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.72 0.04 30 / 0.5)' }} />
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.72 0.04 90 / 0.5)' }} />
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: 'oklch(0.72 0.04 150 / 0.5)' }} />
          </span>
          <span
            className="ml-1 truncate rounded-full px-2.5 py-0.5 text-[11px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-soft)', background: 'var(--color-canvas)' }}
          >
            app.vextrus.com/ai/drafts/019edff9
          </span>
          <span
            className="ml-auto rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-accent"
            style={{ border: '1px solid var(--color-line-strong)' }}
          >
            Available now
          </span>
        </div>
        <div className="relative" style={{ aspectRatio: '1280 / 720' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/estimator/c1-estimator-draft-100pct.webp"
            alt="The real VextrusAI Estimator draft at 100% confidence — pile-cap takeoff, priced BOQ and Bar Bending Schedule, ready for 4-Eyes approval."
            width={1280}
            height={720}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <p className="mt-2.5 font-mono text-[12px] text-ink-soft">
        Real output — Pile Cap PC4, 14.70 m³ concrete, priced BOQ + Bar Bending Schedule, in a 4-Eyes draft. Nothing here is simulated.
      </p>
    </div>
  )
}

export function PinnedPipeline() {
  return (
    <div>
      <Capture />

      {/* The state-to-state sequence — numbered, copper-connected. */}
      <ol className="mt-12 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-3">
        {STEPS.map((s, i) => (
          <li key={s.k} className="reveal-up relative pl-0 lg:pt-9">
            {/* connector rail (desktop) */}
            {i < STEPS.length - 1 ? (
              <span
                className="absolute left-[14px] top-[3px] hidden h-px w-full lg:block"
                style={{ background: 'var(--color-line-strong)' }}
                aria-hidden
              />
            ) : null}
            <span
              className="relative z-10 grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] font-semibold"
              style={{
                border: `1.5px solid ${i === 0 ? 'var(--line-cut)' : 'var(--color-line-strong)'}`,
                color: i === 0 ? 'var(--color-accent)' : 'var(--color-ink-soft)',
                background: 'var(--color-canvas)',
              }}
            >
              {s.k}
            </span>
            <div className="mt-3 pr-2">
              <div className="font-display text-[17px] font-semibold tracking-tight text-ink">{s.tag}</div>
              <p className="mt-1.5 text-[13.5px] leading-snug text-ink-soft">{s.beat}</p>
              {s.metric ? (
                <div className="mt-3 inline-flex items-center gap-2.5">
                  <svg viewBox="0 0 90 12" width="84" height="12" aria-hidden>
                    <line x1="2" y1="6" x2="88" y2="6" stroke="var(--line-cut)" strokeWidth="1.5" />
                    <line x1="2" y1="2" x2="2" y2="10" stroke="var(--line-cut)" strokeWidth="1.5" />
                    <line x1="88" y1="2" x2="88" y2="10" stroke="var(--line-cut)" strokeWidth="1.5" />
                  </svg>
                  <span className="font-mono text-[13px] font-semibold text-accent">{s.metric}</span>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default PinnedPipeline
