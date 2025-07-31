import { useState, useEffect, useRef } from 'react'
import { getMockRealtimeData } from '../services/mockDataService'
import { useEnhancedRealtimeData } from './useEnhancedRealtimeData'

interface RealtimeDataHook {
  data: any
  isConnected: boolean
  error: string | null
  reconnect: () => void
}

// Enhanced real-time data hook with realistic simulations
export function useRealtimeData(): RealtimeDataHook {
  const { data: enhancedData, isConnected, refreshData } = useEnhancedRealtimeData()
  const [error, setError] = useState<string | null>(null)
  
  // Map enhanced data to legacy format for backwards compatibility
  const mappedData = {
    sites: {
      bashundhara: {
        workers: enhancedData.sites.bashundhara.workers,
        productivity: enhancedData.sites.bashundhara.productivity,
        safety: enhancedData.sites.bashundhara.safety
      },
      jolshiri: {
        workers: enhancedData.sites.jolshiri.workers,
        productivity: enhancedData.sites.jolshiri.productivity,
        safety: enhancedData.sites.jolshiri.safety
      }
    },
    equipment: {
      cranes: {
        active: enhancedData.equipment.cranes.active,
        total: enhancedData.equipment.cranes.total
      },
      trucks: {
        active: enhancedData.equipment.trucks.active,
        inTransit: enhancedData.equipment.trucks.inTransit
      },
      excavators: {
        operational: enhancedData.equipment.excavators.active
      }
    },
    projects: {
      revenue: {
        current: enhancedData.finance.revenue.ytd,
        projected: enhancedData.finance.revenue.projected,
        growth: 12.5
      },
      costs: {
        labor: enhancedData.finance.expenses.categories.labor,
        materials: enhancedData.finance.expenses.categories.materials,
        equipment: enhancedData.finance.expenses.categories.equipment
      },
      timeline: {
        onSchedule: 5,
        delayed: 2,
        ahead: 1
      }
    },
    totalSites: enhancedData.sites.bashundhara.totalSites + enhancedData.sites.jolshiri.totalSites,
    totalWorkers: enhancedData.sites.bashundhara.workers + enhancedData.sites.jolshiri.workers,
    avgProgress: 65,
    // Include enhanced data for components that can use it
    enhanced: enhancedData
  }
  
  const reconnect = () => {
    setError(null)
    refreshData()
  }
  
  // Simulate occasional errors
  useEffect(() => {
    if (!isConnected) {
      setError('Connection lost. Attempting to reconnect...')
      const timeout = setTimeout(() => setError(null), 3000)
      return () => clearTimeout(timeout)
    }
  }, [isConnected])
  
  return {
    data: mappedData,
    isConnected,
    error,
    reconnect
  }
}

// Export the enhanced hook for direct use
export { useEnhancedRealtimeData } from './useEnhancedRealtimeData'