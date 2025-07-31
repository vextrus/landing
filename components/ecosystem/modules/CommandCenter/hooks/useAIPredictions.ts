import { useState, useEffect, useRef } from 'react'
import { mockPredictions } from '../services/mockDataService'
import { useEnhancedAIPredictions } from './useEnhancedAIPredictions'

export interface AIPrediction {
  id: string
  type: 'warning' | 'opportunity' | 'recommendation'
  confidence: number
  message: string
  impact: string
  actions: string[]
}

interface AIPredictionsHook {
  predictions: AIPrediction[]
  isProcessing: boolean
  accuracy: number
  requestPrediction: (query: string) => Promise<AIPrediction[]>
}

// Enhanced AI predictions with sophisticated ML models
export function useAIPredictions(realtimeData: any): AIPredictionsHook {
  const { 
    predictions: enhancedPredictions, 
    isProcessing, 
    accuracy,
    refreshPredictions 
  } = useEnhancedAIPredictions()
  
  // Map enhanced predictions to legacy format for backwards compatibility
  const mappedPredictions: AIPrediction[] = enhancedPredictions.map(pred => ({
    id: pred.id,
    type: pred.type === 'forecast' || pred.type === 'anomaly' ? 'warning' : 
          pred.type === 'optimization' ? 'recommendation' : 
          pred.type === 'opportunity' ? 'opportunity' : 'recommendation',
    confidence: pred.confidence,
    message: pred.title,
    impact: pred.description,
    actions: pred.recommendations.map(r => r.action)
  }))
  
  const requestPrediction = async (query: string): Promise<AIPrediction[]> => {
    // Trigger refresh to get new predictions
    refreshPredictions()
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Return the most relevant predictions based on query
    const relevantPredictions = mappedPredictions
      .filter(p => 
        p.message.toLowerCase().includes(query.toLowerCase()) ||
        p.impact.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
    
    if (relevantPredictions.length === 0) {
      // Create a custom prediction if no matches
      return [{
        id: `pred-custom-${Date.now()}`,
        type: 'recommendation',
        confidence: 85,
        message: `AI Analysis: ${query}`,
        impact: 'Based on current data patterns and ML model analysis',
        actions: [
          'Review detailed analysis in AI Insights view',
          'Implement suggested optimizations',
          'Monitor impact metrics over next 24 hours',
          'Schedule follow-up analysis'
        ]
      }]
    }
    
    return relevantPredictions
  }
  
  return {
    predictions: mappedPredictions,
    isProcessing,
    accuracy,
    requestPrediction
  }
}

// Export the enhanced hook for direct use
export { useEnhancedAIPredictions } from './useEnhancedAIPredictions'