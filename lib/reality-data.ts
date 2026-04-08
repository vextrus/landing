/**
 * The Reality — Anthropic research data and narrative beats
 * Source: Anthropic Economic Index, March 5, 2026
 * Authors: Massenkoff & McCrory
 */

export interface AnthropicBar {
  category: string
  theoretical: number
  actual: number
  highlight?: boolean
}

export const anthropicData: AnthropicBar[] = [
  { category: 'Computer & Math', theoretical: 94, actual: 33 },
  { category: 'Office & Admin', theoretical: 90, actual: 25 },
  { category: 'Manufacturing', theoretical: 67, actual: 15 },
  { category: 'Financial Services', theoretical: 54, actual: 12 },
  { category: 'Construction', theoretical: 40, actual: 2, highlight: true },
]

export interface RealityBeat {
  id: string
  heading: string
  body: string
  visual: 'anthropic-chart' | 'before-state' | 'competitor-positioning' | 'payoff'
}

export const realityBeats: RealityBeat[] = [
  {
    id: 'anthropic-data',
    heading: 'The capability gap is massive.',
    body: 'AI can already perform 94% of knowledge work tasks. But only 33% is actually being used — even in tech. The gap between capability and adoption is the largest untapped opportunity in enterprise software.',
    visual: 'anthropic-chart',
  },
  {
    id: 'bangladesh-reality',
    heading: 'Bangladesh is a \u09F332-37 billion market running on Excel.',
    body: '3,197 registered construction and real estate companies. 11% of national GDP. Yet fewer than 8% use any integrated ERP system. Most still run on spreadsheets, WhatsApp groups, and paper ledgers.',
    visual: 'before-state',
  },
  {
    id: 'global-players',
    heading: 'Global players are moving. But not here.',
    body: 'Procore launched agentic AI. Yardi built Virtuoso on Claude. SAP embedded Joule across every module. But none of them understand VAT Mushak forms, lakh-crore accounting, or mouza-level land records.',
    visual: 'competitor-positioning',
  },
  {
    id: 'the-answer',
    heading: "The question isn't whether. It's who.",
    body: 'Every construction company will adopt AI-integrated management systems. The question is whether they adopt one built for their context — or try to retrofit a Western tool.',
    visual: 'payoff',
  },
]

export const bdMarketStats = {
  marketSize: '\u09F332-37B',
  companyCount: '3,197',
  gdpShare: '11%',
  erpAdoption: '<8%',
} as const
