import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DIVISIONS, CITIES, buildPaths } from '../geo.ts'

test('8 named divisions, incl. Mymensingh, with modern spellings', () => {
  assert.equal(DIVISIONS.length, 8)
  const names = DIVISIONS.map((d) => d.name)
  assert.ok(names.includes('Mymensingh'), 'must include Mymensingh (8-division dataset)')
  assert.ok(names.includes('Chattogram'), 'normalised from Chittagong')
  assert.ok(names.includes('Rajshahi'), 'normalised from Rajshani')
  assert.ok(names.includes('Barishal'), 'normalised from Barisal')
})

test('buildPaths projects to finite SVG geometry', () => {
  const { outline, divisions, cities } = buildPaths(300, 360)
  assert.match(outline, /^M[\d.\-,\sLZ]/i)
  assert.equal(divisions.length, 8)
  assert.ok(divisions.every((d) => d.d.length > 0), 'every division has a path')
  assert.equal(cities.length, 5)
  assert.ok(
    cities.every((c) => Number.isFinite(c.cx) && Number.isFinite(c.cy) && (c.cx !== 0 || c.cy !== 0)),
    'every city projects to a finite, non-origin centroid (matched a division)'
  )
})
