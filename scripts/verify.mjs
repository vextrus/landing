// Playwright assert + screenshot harness for the marketing site.
// Usage: node apps/landing/scripts/verify.mjs <path> <screenshotName> [assertText]
//   env VERIFY_BASE (default http://localhost:3003), MOBILE=1 for 390x844 viewport.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Git Bash (MSYS) mangles a leading-slash route arg into the Git install dir
// (e.g. "/" -> "C:/Program Files/Git/"). Undo it so callers can pass "/workforce".
function normRoute(arg) {
  if (!arg) return '/'
  const m = arg.match(/Program Files[/\\]Git[/\\]?(.*)$/i)
  if (m) return '/' + (m[1] || '')
  if (/^https?:/i.test(arg)) return arg
  return arg.startsWith('/') ? arg : '/' + arg
}
const [rawPath = '/', name = 'shot', assertText] = process.argv.slice(2)
const path = normRoute(rawPath)
const BASE = process.env.VERIFY_BASE ?? 'http://localhost:3003'
const mobile = process.env.MOBILE === '1'
mkdirSync(new URL('../screenshots/', import.meta.url), { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
})
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' })
if (!resp || resp.status() >= 400) {
  console.error(`HTTP ${resp ? resp.status() : 'no-response'} for ${path}`)
  await browser.close()
  process.exit(1)
}
// auto-scroll so whileInView / scroll-driven reveals fire
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 120))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(600)

let ok = true
if (assertText) {
  const found = await page.getByText(assertText, { exact: false }).count()
  if (!found) {
    console.error(`ASSERT FAIL: "${assertText}" not found on ${path}`)
    ok = false
  }
}
const appErrors = errors.filter((e) => !/favicon|third-party|ResizeObserver/i.test(e))
if (appErrors.length) {
  console.error('CONSOLE ERRORS:\n' + appErrors.join('\n'))
  ok = false
}

await page.screenshot({
  path: fileURLToPath(new URL(`../screenshots/${name}${mobile ? '-mobile' : ''}.png`, import.meta.url)),
  fullPage: true,
})
await browser.close()
console.log(ok ? `OK ${path} -> screenshots/${name}.png` : `FAIL ${path}`)
process.exit(ok ? 0 : 1)
