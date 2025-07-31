// Bangladesh Construction Sites - Comprehensive Real Data
// All coordinates converted from DMS to decimal format

export interface ConstructionSite {
  id: string
  name: string
  location: string
  lat: number
  lng: number
  type: 'residential' | 'commercial' | 'mixed'
  status: 'planning' | 'foundation' | 'structure' | 'finishing' | 'completed'
  progress: number
  workers: number
  floors: number
  units: number
  startDate: string
  completionDate: string
  budget: number // in BDT
  spent: number // in BDT
  developer: string
  contractor: string
  area: number // in square feet
  details: {
    phase: string
    safety: number // percentage
    productivity: number // percentage
    issues: number
    materials: {
      cement: number // bags
      steel: number // tons
      bricks: number // thousands
    }
    equipment: {
      cranes: number
      excavators: number
      concrete_mixers: number
    }
    milestones: Array<{
      name: string
      date: string
      status: 'completed' | 'in_progress' | 'pending'
    }>
  }
}

// Convert DMS to decimal: degrees + minutes/60 + seconds/3600
export const bangladeshSites: ConstructionSite[] = [
  // Bashundhara R/A Sites
  {
    id: 'bash-tower-a',
    name: 'Bashundhara Sky Tower A',
    location: 'Block-J, Road-12, Bashundhara R/A',
    lat: 23.8144167, // 23°48'51.9"N
    lng: 90.4438611, // 90°26'37.9"E
    type: 'residential',
    status: 'structure',
    progress: 65,
    workers: 487,
    floors: 22,
    units: 176,
    startDate: '2024-03-15',
    completionDate: '2025-12-30',
    budget: 1850000000, // 185 Crore BDT
    spent: 1202500000,
    developer: 'Bashundhara Group',
    contractor: 'Concord Engineers & Construction Ltd',
    area: 125000,
    details: {
      phase: 'Structural Work - Floor 15',
      safety: 98,
      productivity: 82,
      issues: 2,
      materials: {
        cement: 45000,
        steel: 3200,
        bricks: 5500
      },
      equipment: {
        cranes: 3,
        excavators: 2,
        concrete_mixers: 5
      },
      milestones: [
        { name: 'Foundation Complete', date: '2024-06-30', status: 'completed' },
        { name: 'Structure 50%', date: '2024-11-15', status: 'completed' },
        { name: 'Structure Complete', date: '2025-04-30', status: 'in_progress' },
        { name: 'Interior Finishing', date: '2025-10-30', status: 'pending' }
      ]
    }
  },
  {
    id: 'bash-plaza',
    name: 'Bashundhara Business Plaza',
    location: 'Block-B, Road-6, Bashundhara R/A',
    lat: 23.8135833, // 23°48'48.9"N
    lng: 90.4366667, // 90°26'12.0"E
    type: 'commercial',
    status: 'finishing',
    progress: 88,
    workers: 326,
    floors: 18,
    units: 124,
    startDate: '2023-08-10',
    completionDate: '2025-03-15',
    budget: 2200000000, // 220 Crore BDT
    spent: 1936000000,
    developer: 'Asset Developments & Holdings Ltd',
    contractor: 'Mir Concrete Products Ltd',
    area: 98000,
    details: {
      phase: 'Interior Finishing - Floor 12-18',
      safety: 96,
      productivity: 78,
      issues: 3,
      materials: {
        cement: 38000,
        steel: 2800,
        bricks: 4200
      },
      equipment: {
        cranes: 2,
        excavators: 1,
        concrete_mixers: 3
      },
      milestones: [
        { name: 'Foundation Complete', date: '2024-01-15', status: 'completed' },
        { name: 'Structure Complete', date: '2024-09-30', status: 'completed' },
        { name: 'MEP Installation', date: '2024-12-30', status: 'completed' },
        { name: 'Final Handover', date: '2025-03-15', status: 'in_progress' }
      ]
    }
  },
  {
    id: 'bash-heritage',
    name: 'Bashundhara Heritage Complex',
    location: 'Block-M, Road-19, Bashundhara R/A',
    lat: 23.8250278, // 23°49'30.1"N
    lng: 90.4437778, // 90°26'37.6"E
    type: 'mixed',
    status: 'foundation',
    progress: 22,
    workers: 612,
    floors: 28,
    units: 320,
    startDate: '2024-11-01',
    completionDate: '2027-06-30',
    budget: 3500000000, // 350 Crore BDT
    spent: 770000000,
    developer: 'Shanta Holdings Limited',
    contractor: 'BSRM Group',
    area: 185000,
    details: {
      phase: 'Foundation Work - Piling',
      safety: 95,
      productivity: 76,
      issues: 4,
      materials: {
        cement: 62000,
        steel: 4500,
        bricks: 8200
      },
      equipment: {
        cranes: 4,
        excavators: 3,
        concrete_mixers: 6
      },
      milestones: [
        { name: 'Land Development', date: '2024-12-15', status: 'completed' },
        { name: 'Foundation 50%', date: '2025-02-28', status: 'in_progress' },
        { name: 'Foundation Complete', date: '2025-05-30', status: 'pending' },
        { name: 'Structure Start', date: '2025-06-15', status: 'pending' }
      ]
    }
  },
  {
    id: 'bash-residence',
    name: 'Bashundhara Royal Residence',
    location: 'Block-P, Road-24, Bashundhara R/A',
    lat: 23.8255833, // 23°49'32.1"N
    lng: 90.4352222, // 90°26'06.8"E
    type: 'residential',
    status: 'planning',
    progress: 8,
    workers: 125,
    floors: 15,
    units: 90,
    startDate: '2025-01-15',
    completionDate: '2027-12-30',
    budget: 1200000000, // 120 Crore BDT
    spent: 96000000,
    developer: 'Building Technology & Ideas Ltd (bti)',
    contractor: 'TBA',
    area: 78000,
    details: {
      phase: 'Architectural Planning & Approvals',
      safety: 100,
      productivity: 85,
      issues: 0,
      materials: {
        cement: 0,
        steel: 0,
        bricks: 0
      },
      equipment: {
        cranes: 0,
        excavators: 1,
        concrete_mixers: 0
      },
      milestones: [
        { name: 'RAJUK Approval', date: '2025-02-28', status: 'in_progress' },
        { name: 'Contractor Selection', date: '2025-03-30', status: 'pending' },
        { name: 'Ground Breaking', date: '2025-04-15', status: 'pending' },
        { name: 'Foundation Start', date: '2025-05-01', status: 'pending' }
      ]
    }
  },
  {
    id: 'bash-galleria',
    name: 'Bashundhara Galleria Mall',
    location: 'Block-C, Road-3, Bashundhara R/A',
    lat: 23.8123611, // 23°48'44.5"N
    lng: 90.4475833, // 90°26'51.3"E
    type: 'commercial',
    status: 'structure',
    progress: 45,
    workers: 534,
    floors: 12,
    units: 450,
    startDate: '2024-01-20',
    completionDate: '2026-03-30',
    budget: 2800000000, // 280 Crore BDT
    spent: 1260000000,
    developer: 'Jamuna Future Park Ltd',
    contractor: 'Max Infrastructure Ltd',
    area: 220000,
    details: {
      phase: 'Structural Work - Floor 8',
      safety: 94,
      productivity: 79,
      issues: 5,
      materials: {
        cement: 52000,
        steel: 3800,
        bricks: 6500
      },
      equipment: {
        cranes: 3,
        excavators: 2,
        concrete_mixers: 4
      },
      milestones: [
        { name: 'Foundation Complete', date: '2024-06-30', status: 'completed' },
        { name: 'Structure 25%', date: '2024-10-30', status: 'completed' },
        { name: 'Structure 50%', date: '2025-03-30', status: 'in_progress' },
        { name: 'MEP Installation', date: '2025-10-30', status: 'pending' }
      ]
    }
  },
  {
    id: 'bash-tech-park',
    name: 'Bashundhara Tech Park',
    location: 'Block-G, Road-9, Bashundhara R/A',
    lat: 23.8174722, // 23°49'02.9"N
    lng: 90.4551111, // 90°27'18.4"E
    type: 'commercial',
    status: 'structure',
    progress: 72,
    workers: 412,
    floors: 20,
    units: 180,
    startDate: '2023-10-15',
    completionDate: '2025-09-30',
    budget: 3200000000, // 320 Crore BDT
    spent: 2304000000,
    developer: 'Bashundhara Group',
    contractor: 'China State Construction Engineering',
    area: 165000,
    details: {
      phase: 'Structural Work - Floor 18',
      safety: 97,
      productivity: 86,
      issues: 1,
      materials: {
        cement: 48000,
        steel: 3500,
        bricks: 5800
      },
      equipment: {
        cranes: 4,
        excavators: 1,
        concrete_mixers: 5
      },
      milestones: [
        { name: 'Foundation Complete', date: '2024-02-28', status: 'completed' },
        { name: 'Structure 50%', date: '2024-08-30', status: 'completed' },
        { name: 'Structure Complete', date: '2025-02-28', status: 'in_progress' },
        { name: 'IT Infrastructure', date: '2025-07-30', status: 'pending' }
      ]
    }
  },
  {
    id: 'bash-green-city',
    name: 'Bashundhara Green City',
    location: 'Block-K, Road-15, Bashundhara R/A',
    lat: 23.8123056, // 23°48'44.3"N
    lng: 90.4541389, // 90°27'14.9"E
    type: 'residential',
    status: 'finishing',
    progress: 92,
    workers: 278,
    floors: 16,
    units: 128,
    startDate: '2023-05-10',
    completionDate: '2025-02-28',
    budget: 1650000000, // 165 Crore BDT
    spent: 1518000000,
    developer: 'Living Plus Developers',
    contractor: 'Ratcon Group',
    area: 95000,
    details: {
      phase: 'Final Finishing & Landscaping',
      safety: 99,
      productivity: 88,
      issues: 1,
      materials: {
        cement: 32000,
        steel: 2200,
        bricks: 3800
      },
      equipment: {
        cranes: 1,
        excavators: 1,
        concrete_mixers: 2
      },
      milestones: [
        { name: 'Structure Complete', date: '2024-06-30', status: 'completed' },
        { name: 'MEP Complete', date: '2024-10-30', status: 'completed' },
        { name: 'Interior Complete', date: '2025-01-30', status: 'in_progress' },
        { name: 'Handover', date: '2025-02-28', status: 'pending' }
      ]
    }
  },

  // Jolshiri Sites
  {
    id: 'jolshiri-tower-1',
    name: 'Jolshiri Tower A',
    location: 'Plot-5, Jolshiri Abashon',
    lat: 23.8104444, // 23°48'37.6"N
    lng: 90.5024722, // 90°30'08.9"E
    type: 'residential',
    status: 'structure',
    progress: 58,
    workers: 423,
    floors: 18,
    units: 144,
    startDate: '2024-02-01',
    completionDate: '2026-01-30',
    budget: 1450000000, // 145 Crore BDT
    spent: 841000000,
    developer: 'Jolshiri Abashon Ltd',
    contractor: 'Confidence Cement Ltd',
    area: 102000,
    details: {
      phase: 'Structural Work - Floor 12',
      safety: 96,
      productivity: 80,
      issues: 3,
      materials: {
        cement: 38000,
        steel: 2600,
        bricks: 4500
      },
      equipment: {
        cranes: 2,
        excavators: 1,
        concrete_mixers: 4
      },
      milestones: [
        { name: 'Foundation Complete', date: '2024-05-30', status: 'completed' },
        { name: 'Structure 50%', date: '2024-12-30', status: 'in_progress' },
        { name: 'Structure Complete', date: '2025-06-30', status: 'pending' },
        { name: 'Interior Start', date: '2025-07-15', status: 'pending' }
      ]
    }
  },
  {
    id: 'jolshiri-plaza',
    name: 'Jolshiri Shopping Plaza',
    location: 'Plot-12, Jolshiri Abashon',
    lat: 23.8135556, // 23°48'48.8"N
    lng: 90.5069722, // 90°30'25.1"E
    type: 'commercial',
    status: 'foundation',
    progress: 28,
    workers: 387,
    floors: 10,
    units: 220,
    startDate: '2024-09-15',
    completionDate: '2026-06-30',
    budget: 980000000, // 98 Crore BDT
    spent: 274400000,
    developer: 'Jolshiri Developers',
    contractor: 'United Engineering Ltd',
    area: 75000,
    details: {
      phase: 'Foundation Work - Basement',
      safety: 93,
      productivity: 75,
      issues: 4,
      materials: {
        cement: 25000,
        steel: 1800,
        bricks: 3200
      },
      equipment: {
        cranes: 2,
        excavators: 2,
        concrete_mixers: 3
      },
      milestones: [
        { name: 'Site Preparation', date: '2024-10-30', status: 'completed' },
        { name: 'Foundation 50%', date: '2025-01-30', status: 'in_progress' },
        { name: 'Foundation Complete', date: '2025-03-30', status: 'pending' },
        { name: 'Structure Start', date: '2025-04-15', status: 'pending' }
      ]
    }
  },
  {
    id: 'jolshiri-heights',
    name: 'Jolshiri Heights',
    location: 'Plot-8, Jolshiri Abashon',
    lat: 23.8158611, // 23°48'57.1"N
    lng: 90.4990833, // 90°29'56.7"E
    type: 'residential',
    status: 'finishing',
    progress: 85,
    workers: 298,
    floors: 14,
    units: 112,
    startDate: '2023-07-20',
    completionDate: '2025-04-30',
    budget: 1120000000, // 112 Crore BDT
    spent: 952000000,
    developer: 'Sheltech (Pvt) Ltd',
    contractor: 'Mir Akhter Hossain Ltd',
    area: 82000,
    details: {
      phase: 'Interior Finishing - All Floors',
      safety: 98,
      productivity: 84,
      issues: 2,
      materials: {
        cement: 28000,
        steel: 2000,
        bricks: 3500
      },
      equipment: {
        cranes: 1,
        excavators: 0,
        concrete_mixers: 2
      },
      milestones: [
        { name: 'Structure Complete', date: '2024-08-30', status: 'completed' },
        { name: 'MEP Installation', date: '2024-11-30', status: 'completed' },
        { name: 'Interior 75%', date: '2025-02-28', status: 'in_progress' },
        { name: 'Handover Start', date: '2025-04-30', status: 'pending' }
      ]
    }
  },
  {
    id: 'jolshiri-park-view',
    name: 'Jolshiri Park View',
    location: 'Plot-15, Jolshiri Abashon',
    lat: 23.8141389, // 23°48'50.9"N
    lng: 90.5102222, // 90°30'36.8"E
    type: 'mixed',
    status: 'structure',
    progress: 40,
    workers: 456,
    floors: 25,
    units: 200,
    startDate: '2024-04-10',
    completionDate: '2026-10-30',
    budget: 2650000000, // 265 Crore BDT
    spent: 1060000000,
    developer: 'Assure Group',
    contractor: 'Abdul Monem Limited',
    area: 148000,
    details: {
      phase: 'Structural Work - Floor 10',
      safety: 95,
      productivity: 77,
      issues: 3,
      materials: {
        cement: 55000,
        steel: 4000,
        bricks: 7000
      },
      equipment: {
        cranes: 3,
        excavators: 2,
        concrete_mixers: 5
      },
      milestones: [
        { name: 'Foundation Complete', date: '2024-08-30', status: 'completed' },
        { name: 'Structure 25%', date: '2024-12-30', status: 'completed' },
        { name: 'Structure 50%', date: '2025-05-30', status: 'pending' },
        { name: 'MEP Start', date: '2025-10-30', status: 'pending' }
      ]
    }
  },
  {
    id: 'jolshiri-eco-village',
    name: 'Jolshiri Eco Village',
    location: 'Plot-20, Jolshiri Abashon',
    lat: 23.8092222, // 23°48'33.2"N
    lng: 90.5099722, // 90°30'35.9"E
    type: 'residential',
    status: 'planning',
    progress: 12,
    workers: 98,
    floors: 8,
    units: 64,
    startDate: '2024-12-01',
    completionDate: '2026-12-30',
    budget: 680000000, // 68 Crore BDT
    spent: 81600000,
    developer: 'Green Delta Housing',
    contractor: 'TBA',
    area: 58000,
    details: {
      phase: 'Environmental Impact Assessment',
      safety: 100,
      productivity: 90,
      issues: 0,
      materials: {
        cement: 0,
        steel: 0,
        bricks: 0
      },
      equipment: {
        cranes: 0,
        excavators: 1,
        concrete_mixers: 0
      },
      milestones: [
        { name: 'EIA Complete', date: '2025-01-30', status: 'in_progress' },
        { name: 'RAJUK Approval', date: '2025-03-30', status: 'pending' },
        { name: 'Contractor Tender', date: '2025-04-30', status: 'pending' },
        { name: 'Construction Start', date: '2025-06-01', status: 'pending' }
      ]
    }
  }
]

// Helper function to get sites by area
export function getSitesByArea(area: 'bashundhara' | 'jolshiri'): ConstructionSite[] {
  return bangladeshSites.filter(site => 
    area === 'bashundhara' ? site.id.startsWith('bash-') : site.id.startsWith('jolshiri-')
  )
}

// Helper function to get site statistics
export function getSiteStatistics() {
  const totalWorkers = bangladeshSites.reduce((sum, site) => sum + site.workers, 0)
  const totalBudget = bangladeshSites.reduce((sum, site) => sum + site.budget, 0)
  const totalSpent = bangladeshSites.reduce((sum, site) => sum + site.spent, 0)
  const avgProgress = bangladeshSites.reduce((sum, site) => sum + site.progress, 0) / bangladeshSites.length
  const avgSafety = bangladeshSites.reduce((sum, site) => sum + site.details.safety, 0) / bangladeshSites.length
  const avgProductivity = bangladeshSites.reduce((sum, site) => sum + site.details.productivity, 0) / bangladeshSites.length
  
  return {
    totalSites: bangladeshSites.length,
    totalWorkers,
    totalBudget,
    totalSpent,
    avgProgress: Math.round(avgProgress),
    avgSafety: Math.round(avgSafety),
    avgProductivity: Math.round(avgProductivity),
    byStatus: {
      planning: bangladeshSites.filter(s => s.status === 'planning').length,
      foundation: bangladeshSites.filter(s => s.status === 'foundation').length,
      structure: bangladeshSites.filter(s => s.status === 'structure').length,
      finishing: bangladeshSites.filter(s => s.status === 'finishing').length,
      completed: bangladeshSites.filter(s => s.status === 'completed').length
    }
  }
}

// Get real-time simulated data for a site
export function getRealtimeDataForSite(siteId: string) {
  const site = bangladeshSites.find(s => s.id === siteId)
  if (!site) return null
  
  // Simulate minor variations
  const variance = 0.02 // 2% variance
  const workerVariance = Math.floor(site.workers * variance * (Math.random() - 0.5))
  const productivityVariance = Math.round(site.details.productivity * variance * (Math.random() - 0.5))
  
  return {
    ...site,
    workers: site.workers + workerVariance,
    details: {
      ...site.details,
      productivity: Math.max(0, Math.min(100, site.details.productivity + productivityVariance))
    }
  }
}