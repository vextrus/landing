export type Cell = 'full' | 'partial' | 'none'

export const COLUMNS = [
  { id: 'execute', label: 'Agents that do the work', plain: 'AI that acts, not just chats' },
  { id: 'erp', label: 'Full 20-module ERP', plain: 'GL · AP/AR · procurement · projects' },
  { id: 'bd', label: 'Built for Bangladesh', plain: 'Mushak · RAJUK · BBS · lakh/crore' },
  {
    id: 'governed',
    label: 'Governed + auditable',
    plain: '4-Eyes approval · tenant isolation · provenance',
  },
  { id: 'fast', label: 'Live in weeks', plain: 'no rip-and-replace, no dev team' },
] as const

export const ROWS = [
  {
    id: 'vextrus',
    label: 'Vextrus',
    note: 'AI workforce on a BD-native engine, approval-gated.',
    cells: { execute: 'full', erp: 'full', bd: 'full', governed: 'full', fast: 'full' },
  },
  {
    id: 'manual',
    label: 'Excel + WhatsApp',
    note: 'The real status quo for most firms.',
    cells: { execute: 'none', erp: 'none', bd: 'partial', governed: 'none', fast: 'partial' },
  },
  {
    id: 'wrapper',
    label: 'ChatGPT / Copilot',
    note: 'Advice that cannot touch your books.',
    cells: { execute: 'partial', erp: 'none', bd: 'none', governed: 'none', fast: 'full' },
  },
  {
    id: 'point',
    label: 'Point AI tools',
    note: 'One task, no system of record.',
    cells: { execute: 'partial', erp: 'none', bd: 'partial', governed: 'partial', fast: 'full' },
  },
  {
    id: 'legacy',
    label: 'SAP · Oracle · local ERP',
    note: 'Acts, but foreign and slow to land.',
    cells: { execute: 'partial', erp: 'full', bd: 'none', governed: 'partial', fast: 'none' },
  },
] as const satisfies readonly {
  id: string
  label: string
  note: string
  cells: Record<string, Cell>
}[]

// Invariants (the test): exactly 5 cols, 5 rows; Vextrus all-full; no rival all-full.
const _cols = COLUMNS.length === 5
const _rows = ROWS.length === 5
const _vextrusAllFull = Object.values(ROWS[0].cells).every((c) => c === 'full')
const _noRivalAllFull = ROWS.slice(1).every((r) => Object.values(r.cells).some((c) => c !== 'full'))
const _everyRowHasEveryCol = ROWS.every((r) => COLUMNS.every((c) => r.cells[c.id] !== undefined))
const _check = [
  _cols,
  _rows,
  _vextrusAllFull,
  _noRivalAllFull,
  _everyRowHasEveryCol,
] satisfies boolean[]
if (_check.includes(false)) throw new Error('comparison.ts invariant violated')
