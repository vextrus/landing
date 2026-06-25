import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, FeatureCollection } from 'geojson'
import topoJson from './bd-divisions.topo.json' with { type: 'json' }

// geoBoundaries ADM1 ships older / misspelled division names; normalise to the
// modern Bangladeshi spellings for display.
const CLEAN: Record<string, string> = {
  Chittagong: 'Chattogram',
  Barisal: 'Barishal',
  Rajshani: 'Rajshahi',
}
const clean = (raw: string): string => CLEAN[raw] ?? raw
const nameOf = (f: Feature): string => clean(String(f.properties?.shapeName ?? ''))

const topology = topoJson as unknown as Topology
const objectName = Object.keys(topology.objects)[0]
const fc = feature(
  topology,
  topology.objects[objectName] as GeometryCollection
) as FeatureCollection

export const DIVISIONS: readonly { name: string }[] = fc.features
  .map((f) => ({ name: nameOf(f) }))
  .sort((a, b) => a.name.localeCompare(b.name))

// Major cities placed at their division centroid (a stylised marketing map).
// `div` matches the RAW dataset shapeName; `name` is the modern city spelling.
export const CITIES = [
  { name: 'Dhaka', div: 'Dhaka' },
  { name: 'Chattogram', div: 'Chittagong' },
  { name: 'Khulna', div: 'Khulna' },
  { name: 'Sylhet', div: 'Sylhet' },
  { name: 'Rajshahi', div: 'Rajshani' },
] as const

export function buildPaths(width: number, height: number) {
  const projection = geoMercator().fitSize([width, height], fc)
  const path = geoPath(projection)
  const divisions = fc.features.map((f) => ({ name: nameOf(f), d: path(f) ?? '' }))
  const outline = path(fc) ?? ''
  const cities = CITIES.map((c) => {
    const f = fc.features.find((g) => String(g.properties?.shapeName ?? '') === c.div)
    const [cx, cy] = f ? path.centroid(f) : [0, 0]
    return { name: c.name, cx, cy }
  })
  return { outline, divisions, cities }
}
