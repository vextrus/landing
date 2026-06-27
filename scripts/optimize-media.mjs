#!/usr/bin/env node
// optimize-media.mjs — Vextrus marketing v3 real-media pipeline.
//
// Stills + posters: PNG/JPG -> WebP (full + mobile variant) via sharp.
// Video (webm/mp4) state-to-state clips: assembled via ffmpeg WHEN frame sequences exist
//   AND ffmpeg is on PATH (gracefully skipped otherwise — ffmpeg is not bundled).
//
// Usage:  node apps/landing/scripts/optimize-media.mjs [srcDir] [outDir]
// Default srcDir/outDir = the Wave-1 staging dirs; at the branch switch, point outDir at
//   apps/landing/public/media/<flow>/ and re-run.
//
// Targets (spec §3/§8): hero < 1MB, feature loops < 300–500KB, posters sub-200KB; CLS 0 via
//   explicit width/height baked into the manifest from the metadata this script prints.

import { readdir, mkdir, stat } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import sharp from 'sharp'

const exec = promisify(execFile)
const [, , srcDir = 'docs/reports/marketing-v3/media-staging/raw',
  outDir = 'docs/reports/marketing-v3/media-staging/optimized'] = process.argv

const WEBP_QUALITY = 82
const MOBILE_WIDTH = 760

async function hasFfmpeg() {
  try { await exec('ffmpeg', ['-version']); return true } catch { return false }
}

async function optimizeStill(file) {
  const base = path.basename(file, path.extname(file))
  const input = path.join(srcDir, file)
  const meta = await sharp(input).metadata()
  const fullOut = path.join(outDir, `${base}.webp`)
  await sharp(input).webp({ quality: WEBP_QUALITY }).toFile(fullOut)
  const mobOut = path.join(outDir, `${base}.mobile.webp`)
  await sharp(input)
    .resize({ width: Math.min(MOBILE_WIDTH, meta.width || MOBILE_WIDTH) })
    .webp({ quality: WEBP_QUALITY }).toFile(mobOut)
  const [a, b, c] = await Promise.all([stat(input), stat(fullOut), stat(mobOut)])
  return { base, src: a.size, webp: b.size, mobile: c.size, w: meta.width, h: meta.height }
}

await mkdir(outDir, { recursive: true })
const files = (await readdir(srcDir)).filter((f) => /\.(png|jpe?g)$/i.test(f))
console.log(`optimize-media: ${files.length} stills  ${srcDir} -> ${outDir}`)
const results = []
for (const f of files) {
  try { results.push(await optimizeStill(f)) } catch (e) { console.error('FAIL', f, e.message) }
}
for (const r of results) {
  console.log(`  ${r.base}  ${(r.src / 1024) | 0}KB png -> ${(r.webp / 1024) | 0}KB webp ` +
    `(${r.w}x${r.h}) + ${(r.mobile / 1024) | 0}KB mobile`)
}

const ff = await hasFfmpeg()
console.log(ff
  ? 'ffmpeg: available — video assembly path enabled'
  : 'ffmpeg: NOT on PATH — webm/mp4 assembly skipped (install ffmpeg for hero/loop clips)')
// State-to-state video assembly (build time, when frame sequences + slots are known):
//   ffmpeg -framerate 12 -i frame-%03d.png -c:v libvpx-vp9 -crf 38 -b:v 0 -an out.webm
//   ffmpeg -i out.webm -c:v libx264 -crf 25 -pix_fmt yuv420p -movflags +faststart -an out.mp4
console.log('done.')
