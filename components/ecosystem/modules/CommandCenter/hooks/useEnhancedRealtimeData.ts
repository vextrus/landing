// Enhanced Real-time Data Hook with Realistic Simulations
// Provides time-aware, weather-impacted, cross-module correlated data

import { useState, useEffect, useRef, useCallback } from 'react'
import enhancedMockData, {
  WeatherCondition,
  SupplyChainEvent,
  FinancialTransaction,
  WorkforceEvent,
  EquipmentTelemetry,
  QualityControlIncident,
  AIInsight
} from '../services/enhancedMockDataService'

export interface EnhancedRealtimeData {
  // Core metrics
  timestamp: Date
  timeOfDay: 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'
  weather: WeatherCondition
  prayer: string | null
  
  // Site data
  sites: {
    bashundhara: {
      workers: number
      productivity: number
      safety: number
      activeSites: number
      totalSites: number
    }
    jolshiri: {
      workers: number
      productivity: number
      safety: number
      activeSites: number
      totalSites: number
    }
  }
  
  // Equipment data
  equipment: {
    cranes: {
      active: number
      total: number
      maintenance: number
      utilization: number
    }
    excavators: {
      active: number
      total: number
      maintenance: number
      utilization: number
    }
    concrete_mixers: {
      active: number
      total: number
      maintenance: number
      utilization: number
    }
    trucks: {
      active: number
      inTransit: number
      total: number
      maintenance: number
    }
  }
  
  // Financial data
  finance: {
    revenue: {
      today: number
      thisMonth: number
      ytd: number
      projected: number
    }
    expenses: {
      today: number
      thisMonth: number
      categories: {
        labor: number
        materials: number
        equipment: number
        utilities: number
        other: number
      }
    }
    cashflow: {
      current: number
      projected7Days: number
      projected30Days: number
    }
    transactions: {
      pending: number
      processing: number
      completed: number
      failed: number
    }
  }
  
  // Supply chain data
  supplyChain: {
    orders: {
      active: number
      pending: number
      completed: number
      cancelled: number
    }
    deliveries: {
      today: number
      pending: number
      delayed: number
      onTime: number
    }
    inventory: {
      cement: { current: number; required: number; unit: string }
      steel: { current: number; required: number; unit: string }
      bricks: { current: number; required: number; unit: string }
      sand: { current: number; required: number; unit: string }
    }
    suppliers: {
      active: number
      verified: number
      blacklisted: number
      performance: {
        onTime: number
        quality: number
        pricing: number
      }
    }
  }
  
  // Quality data
  quality: {
    inspections: {
      today: number
      passed: number
      failed: number
      pending: number
    }
    defects: {
      rate: number
      critical: number
      major: number
      minor: number
    }
    compliance: {
      safety: number
      environmental: number
      quality: number
      regulatory: number
    }
    certifications: {
      iso9001: { status: string; expiry: string }
      iso14001: { status: string; expiry: string }
      ohsas18001: { status: string; expiry: string }
    }
  }
  
  // HR data
  hr: {
    workforce: {
      total: number
      present: number
      onLeave: number
      overtime: number
    }
    attendance: {
      rate: number
      lateArrivals: number
      earlyDepartures: number
    }
    safety: {
      incidents: {
        today: number
        thisMonth: number
        severity: {
          minor: number
          moderate: number
          severe: number
        }
      }
      trainings: {
        scheduled: number
        completed: number
        compliance: number
      }
    }
    skills: {
      certified: {
        welders: number
        electricians: number
        plumbers: number
        masons: number
        crane_operators: number
      }
      training: {
        ongoing: number
        completed: number
        scheduled: number
      }
    }
  }
}

export interface RealtimeEvents {
  supplyChain: SupplyChainEvent[]
  financial: FinancialTransaction[]
  workforce: WorkforceEvent[]
  equipment: EquipmentTelemetry[]
  quality: QualityControlIncident[]
  aiInsights: AIInsight[]
}

interface UseEnhancedRealtimeDataReturn {
  data: EnhancedRealtimeData
  events: RealtimeEvents
  correlations: any
  isConnected: boolean
  lastUpdate: Date
  refreshData: () => void
}

// Update intervals (in milliseconds)
const UPDATE_INTERVALS = {
  core: 5000,        // 5 seconds for core metrics
  events: 30000,     // 30 seconds for events
  insights: 60000,   // 1 minute for AI insights
  telemetry: 10000   // 10 seconds for equipment telemetry
}

export function useEnhancedRealtimeData(): UseEnhancedRealtimeDataReturn {
  const [data, setData] = useState<EnhancedRealtimeData>(enhancedMockData.getEnhancedRealtimeData())
  const [events, setEvents] = useState<RealtimeEvents>({
    supplyChain: [],
    financial: [],
    workforce: [],
    equipment: [],
    quality: [],
    aiInsights: []
  })
  const [correlations, setCorrelations] = useState(enhancedMockData.getCrossModuleCorrelations())
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  // Refs for intervals
  const coreInterval = useRef<NodeJS.Timeout | null>(null)
  const eventsInterval = useRef<NodeJS.Timeout | null>(null)
  const insightsInterval = useRef<NodeJS.Timeout | null>(null)
  const telemetryInterval = useRef<NodeJS.Timeout | null>(null)
  
  // Refresh data manually
  const refreshData = useCallback(() => {
    const newData = enhancedMockData.getEnhancedRealtimeData()
    setData(newData)
    setCorrelations(enhancedMockData.getCrossModuleCorrelations())
    setLastUpdate(new Date())
  }, [])
  
  // Core data updates
  useEffect(() => {
    coreInterval.current = setInterval(() => {
      const newData = enhancedMockData.getEnhancedRealtimeData()
      setData(newData)
      setLastUpdate(new Date())
    }, UPDATE_INTERVALS.core)
    
    return () => {
      if (coreInterval.current) clearInterval(coreInterval.current)
    }
  }, [])
  
  // Event updates
  useEffect(() => {
    // Initial load
    setEvents({
      supplyChain: enhancedMockData.generateSupplyChainEvents(5),
      financial: enhancedMockData.generateFinancialTransactions(10),
      workforce: enhancedMockData.generateWorkforceEvents(20),
      equipment: enhancedMockData.generateEquipmentTelemetry(15),
      quality: enhancedMockData.generateQualityControlIncidents(5),
      aiInsights: enhancedMockData.generateAIInsights(data)
    })
    
    eventsInterval.current = setInterval(() => {
      setEvents(prev => ({
        ...prev,
        supplyChain: [...enhancedMockData.generateSupplyChainEvents(2), ...prev.supplyChain].slice(0, 10),
        financial: [...enhancedMockData.generateFinancialTransactions(3), ...prev.financial].slice(0, 20),
        workforce: [...enhancedMockData.generateWorkforceEvents(5), ...prev.workforce].slice(0, 30)
      }))
    }, UPDATE_INTERVALS.events)
    
    return () => {
      if (eventsInterval.current) clearInterval(eventsInterval.current)
    }
  }, [data])
  
  // Equipment telemetry updates
  useEffect(() => {
    telemetryInterval.current = setInterval(() => {
      setEvents(prev => ({
        ...prev,
        equipment: enhancedMockData.generateEquipmentTelemetry(15)
      }))
    }, UPDATE_INTERVALS.telemetry)
    
    return () => {
      if (telemetryInterval.current) clearInterval(telemetryInterval.current)
    }
  }, [])
  
  // AI insights updates
  useEffect(() => {
    insightsInterval.current = setInterval(() => {
      const newInsights = enhancedMockData.generateAIInsights(data)
      setEvents(prev => ({
        ...prev,
        aiInsights: [...newInsights, ...prev.aiInsights].slice(0, 10)
      }))
      
      // Update correlations
      setCorrelations(enhancedMockData.getCrossModuleCorrelations())
    }, UPDATE_INTERVALS.insights)
    
    return () => {
      if (insightsInterval.current) clearInterval(insightsInterval.current)
    }
  }, [data])
  
  // Simulate connection status
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      // Simulate occasional disconnections (5% chance)
      if (Math.random() > 0.95) {
        setIsConnected(false)
        setTimeout(() => setIsConnected(true), 3000) // Reconnect after 3 seconds
      }
    }, 10000)
    
    return () => clearInterval(connectionInterval)
  }, [])
  
  return {
    data,
    events,
    correlations,
    isConnected,
    lastUpdate,
    refreshData
  }
}

// Hook for specific module data
export function useModuleRealtimeData(module: 'sites' | 'equipment' | 'finance' | 'supply' | 'quality' | 'hr') {
  const { data, events, isConnected, lastUpdate } = useEnhancedRealtimeData()
  
  switch (module) {
    case 'sites':
      return {
        data: data.sites,
        weather: data.weather,
        events: events.workforce,
        isConnected,
        lastUpdate
      }
    case 'equipment':
      return {
        data: data.equipment,
        telemetry: events.equipment,
        isConnected,
        lastUpdate
      }
    case 'finance':
      return {
        data: data.finance,
        transactions: events.financial,
        isConnected,
        lastUpdate
      }
    case 'supply':
      return {
        data: data.supplyChain,
        events: events.supplyChain,
        isConnected,
        lastUpdate
      }
    case 'quality':
      return {
        data: data.quality,
        incidents: events.quality,
        isConnected,
        lastUpdate
      }
    case 'hr':
      return {
        data: data.hr,
        events: events.workforce,
        isConnected,
        lastUpdate
      }
    default:
      return { data: {}, events: [], isConnected, lastUpdate }
  }
}

// Hook for AI insights
export function useAIInsights() {
  const { events, correlations } = useEnhancedRealtimeData()
  
  return {
    insights: events.aiInsights,
    correlations,
    recommendations: events.aiInsights
      .filter(i => i.type === 'optimization' || i.type === 'prediction')
      .flatMap(i => i.recommendations)
      .slice(0, 10)
  }
}