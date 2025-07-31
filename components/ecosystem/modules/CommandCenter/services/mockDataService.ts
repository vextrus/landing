// Mock Data Service for AI Command Center
// Provides stable, realistic data for demonstrations

import { bangladeshSites, getSiteStatistics } from './bangladeshSitesData'

export interface SiteData {
  bashundhara: {
    workers: number
    productivity: number
    safety: number
  }
  jolshiri: {
    workers: number
    productivity: number
    safety: number
  }
}

export interface EquipmentData {
  cranes: {
    active: number
    total: number
  }
  trucks: {
    active: number
    inTransit: number
  }
  excavators: {
    operational: number
  }
}

export interface ProjectData {
  revenue: {
    current: number
    projected: number
    growth: number
  }
  costs: {
    labor: number
    materials: number
    equipment: number
  }
  timeline: {
    onSchedule: number
    delayed: number
    ahead: number
  }
}

// Stable mock data
const mockRealtimeData = {
  sites: {
    bashundhara: {
      workers: 4523,
      productivity: 84,
      safety: 98
    },
    jolshiri: {
      workers: 3933,
      productivity: 78,
      safety: 95
    }
  },
  equipment: {
    cranes: {
      active: 68,
      total: 75
    },
    trucks: {
      active: 124,
      inTransit: 45
    },
    excavators: {
      operational: 34
    }
  },
  projects: {
    revenue: {
      current: 2054000000, // 205.4 Crore BDT
      projected: 2308000000,
      growth: 12.5
    },
    costs: {
      labor: 823000000,
      materials: 1028000000,
      equipment: 203000000
    },
    timeline: {
      onSchedule: 5,
      delayed: 2,
      ahead: 1
    }
  }
}

// AI Predictions with stable confidence scores
export const mockPredictions = [
  {
    id: 'pred-1',
    type: 'warning' as const,
    confidence: 92,
    message: 'Material shortage predicted for steel reinforcement',
    impact: 'High - May delay Tower B foundation by 3-5 days',
    actions: [
      'Contact primary steel supplier immediately',
      'Activate backup supplier agreements',
      'Adjust workforce allocation to other tasks'
    ]
  },
  {
    id: 'pred-2',
    type: 'opportunity' as const,
    confidence: 87,
    message: 'Optimal weather window for concrete pouring',
    impact: 'Medium - Can accelerate Tower A schedule by 2 days',
    actions: [
      'Schedule concrete delivery for next 48 hours',
      'Mobilize additional concrete crews',
      'Prepare quality control team'
    ]
  },
  {
    id: 'pred-3',
    type: 'recommendation' as const,
    confidence: 95,
    message: 'Workforce optimization opportunity detected',
    impact: 'High - Improve overall efficiency by 15%',
    actions: [
      'Reallocate 20 workers from Plaza to Tower A',
      'Update digital work schedules',
      'Brief site supervisors on new allocation'
    ]
  }
]

// Simulated real-time updates (minimal changes)
let dataVersion = 0

export function getMockRealtimeData() {
  // Only update small values to avoid flickering
  dataVersion++
  
  const stats = getSiteStatistics()
  const bashundharaSites = bangladeshSites.filter(s => s.id.startsWith('bash-'))
  const jolshiriSites = bangladeshSites.filter(s => s.id.startsWith('jolshiri-'))
  
  const bashWorkers = bashundharaSites.reduce((sum, site) => sum + site.workers, 0)
  const jolshiriWorkers = jolshiriSites.reduce((sum, site) => sum + site.workers, 0)
  const bashProductivity = Math.round(bashundharaSites.reduce((sum, site) => sum + site.details.productivity, 0) / bashundharaSites.length)
  const jolshiriProductivity = Math.round(jolshiriSites.reduce((sum, site) => sum + site.details.productivity, 0) / jolshiriSites.length)
  
  return {
    ...mockRealtimeData,
    sites: {
      bashundhara: {
        workers: bashWorkers + (Math.sin(dataVersion * 0.1) * 10) | 0,
        productivity: bashProductivity + (Math.cos(dataVersion * 0.05) * 2) | 0,
        safety: stats.avgSafety
      },
      jolshiri: {
        workers: jolshiriWorkers + (Math.cos(dataVersion * 0.1) * 10) | 0,
        productivity: jolshiriProductivity + (Math.sin(dataVersion * 0.05) * 2) | 0,
        safety: stats.avgSafety - 2
      }
    },
    equipment: {
      ...mockRealtimeData.equipment,
      trucks: {
        ...mockRealtimeData.equipment.trucks,
        active: mockRealtimeData.equipment.trucks.active + (Math.sin(dataVersion * 0.2) * 3) | 0
      }
    },
    totalSites: stats.totalSites,
    totalWorkers: stats.totalWorkers,
    avgProgress: stats.avgProgress
  }
}

// Activity feed with timestamps
export function getActivityFeed() {
  const activities = [
    {
      id: 'act-1',
      type: 'success',
      message: 'Tower A foundation completed',
      time: '2 mins ago',
      location: 'Bashundhara'
    },
    {
      id: 'act-2',
      type: 'warning',
      message: 'Crane maintenance required',
      time: '15 mins ago',
      location: 'Jolshiri'
    },
    {
      id: 'act-3',
      type: 'info',
      message: 'New safety inspection scheduled',
      time: '1 hour ago',
      location: 'All Sites'
    },
    {
      id: 'act-4',
      type: 'success',
      message: 'Material delivery completed',
      time: '2 hours ago',
      location: 'Bashundhara'
    }
  ]
  
  return activities
}

// Performance metrics for charts
export function getPerformanceMetrics() {
  return {
    weekly: [
      { day: 'Mon', efficiency: 82, safety: 96 },
      { day: 'Tue', efficiency: 84, safety: 98 },
      { day: 'Wed', efficiency: 79, safety: 95 },
      { day: 'Thu', efficiency: 86, safety: 97 },
      { day: 'Fri', efficiency: 81, safety: 99 },
      { day: 'Sat', efficiency: 83, safety: 96 },
      { day: 'Sun', efficiency: 80, safety: 94 }
    ],
    monthly: {
      target: 85,
      actual: 82.5,
      trend: 'improving'
    }
  }
}