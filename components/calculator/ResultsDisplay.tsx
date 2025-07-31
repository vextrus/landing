'use client'

import { motion } from 'framer-motion'
import { 
  Clock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface ResultsDisplayProps {
  results: {
    timeSavings: {
      hoursPerWeek: number
      fasterDelivery: number
      quickerDecisions: number
    }
    costSavings: {
      materialWaste: number
      laborEfficiency: number
      errorReduction: number
      annualSavings: number
    }
    revenueGains: {
      moreProjects: number
      fasterSales: number
      betterPricing: number
      additionalRevenue: number
    }
    roi: {
      investment: number
      annualReturn: number
      roiPercentage: number
      paybackMonths: number
    }
  }
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Potential with Vextrus</h3>
      
      {/* Time Savings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Time Savings</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{results.timeSavings.hoursPerWeek}</p>
            <p className="text-xs text-gray-600">Hours saved/week</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{results.timeSavings.fasterDelivery}%</p>
            <p className="text-xs text-gray-600">Faster delivery</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{results.timeSavings.quickerDecisions}x</p>
            <p className="text-xs text-gray-600">Quicker decisions</p>
          </div>
        </div>
      </motion.div>
      
      {/* Cost Savings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-green-50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-green-600" />
          <h4 className="text-lg font-bold text-gray-900">Cost Savings</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Material waste reduction</span>
            <span className="font-bold text-green-600">{formatCurrency(results.costSavings.materialWaste)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Labor efficiency gains</span>
            <span className="font-bold text-green-600">{formatCurrency(results.costSavings.laborEfficiency)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Error reduction value</span>
            <span className="font-bold text-green-600">{formatCurrency(results.costSavings.errorReduction)}</span>
          </div>
          <div className="pt-3 border-t border-green-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total Annual Savings</span>
              <span className="text-xl font-bold text-green-600">{formatCurrency(results.costSavings.annualSavings)}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Revenue Gains */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-purple-50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h4 className="text-lg font-bold text-gray-900">Revenue Gains</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">More projects capacity</span>
            <span className="font-bold text-purple-600">+{results.revenueGains.moreProjects}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Faster sales cycle</span>
            <span className="font-bold text-purple-600">{results.revenueGains.fasterSales} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Better pricing power</span>
            <span className="font-bold text-purple-600">+{results.revenueGains.betterPricing}%</span>
          </div>
          <div className="pt-3 border-t border-purple-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Additional Revenue</span>
              <span className="text-xl font-bold text-purple-600">{formatCurrency(results.revenueGains.additionalRevenue)}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* ROI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-accent" />
          <h4 className="text-lg font-bold text-gray-900">Return on Investment</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Investment Required</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.roi.investment)}</p>
            <p className="text-xs text-gray-500">One-time + monthly</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Annual Return</p>
            <p className="text-2xl font-bold text-accent">{formatCurrency(results.roi.annualReturn)}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              Total value generated
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {results.roi.roiPercentage}%
              </p>
              <p className="text-sm text-gray-600">ROI</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-success">
                {results.roi.paybackMonths}
              </p>
              <p className="text-sm text-gray-600">Months to Payback</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}