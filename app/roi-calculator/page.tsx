'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Download, Share2, MessageSquare } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import InputSliders from '@/components/calculator/InputSliders'
import ResultsDisplay from '@/components/calculator/ResultsDisplay'
import ChartVisualizations from '@/components/calculator/ChartVisualizations'

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState({
    activeProjects: 10,
    avgProjectValue: 2000000,
    currentDelayRate: 40,
    currentProfitMargin: 15,
    numberOfEmployees: 100
  })

  const handleInputChange = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  // Calculate results based on inputs
  const results = useMemo(() => {
    const totalProjectValue = inputs.activeProjects * inputs.avgProjectValue
    const monthlyRevenue = totalProjectValue / 12
    
    // Time Savings Calculations
    const hoursPerWeek = Math.round(inputs.numberOfEmployees * 8 * 0.3) // 30% time savings
    const fasterDelivery = Math.round(inputs.currentDelayRate * 0.45) // 45% reduction in delays
    const quickerDecisions = 10
    
    // Cost Savings Calculations
    const materialWaste = totalProjectValue * 0.02 // 2% of project value
    const laborEfficiency = inputs.numberOfEmployees * 50000 * 0.2 // 20% efficiency gain
    const errorReduction = totalProjectValue * 0.01 // 1% error reduction
    const annualCostSavings = materialWaste + laborEfficiency + errorReduction
    
    // Revenue Gains Calculations
    const moreProjects = 20 // 20% more capacity
    const fasterSales = 15 // 15 days faster
    const betterPricing = 5 // 5% better pricing
    const additionalRevenue = totalProjectValue * 0.15 // 15% revenue increase
    
    // ROI Calculations
    const setupFee = 50000
    const monthlyFee = inputs.activeProjects * 1000 + inputs.numberOfEmployees * 50
    const annualInvestment = setupFee + (monthlyFee * 12)
    const annualReturn = annualCostSavings + additionalRevenue
    const roiPercentage = Math.round((annualReturn / annualInvestment - 1) * 100)
    const paybackMonths = Math.round(annualInvestment / (annualReturn / 12))
    
    return {
      timeSavings: {
        hoursPerWeek,
        fasterDelivery,
        quickerDecisions
      },
      costSavings: {
        materialWaste,
        laborEfficiency,
        errorReduction,
        annualSavings: annualCostSavings
      },
      revenueGains: {
        moreProjects,
        fasterSales,
        betterPricing,
        additionalRevenue
      },
      roi: {
        investment: annualInvestment,
        annualReturn,
        roiPercentage,
        paybackMonths
      }
    }
  }, [inputs])

  // Chart data
  const chartData = useMemo(() => {
    const costComparison = [
      { 
        category: 'Material Costs', 
        before: inputs.avgProjectValue * inputs.activeProjects * 0.4,
        after: inputs.avgProjectValue * inputs.activeProjects * 0.34
      },
      { 
        category: 'Labor Costs', 
        before: inputs.numberOfEmployees * 50000,
        after: inputs.numberOfEmployees * 50000 * 0.8
      },
      { 
        category: 'Delay Penalties', 
        before: inputs.avgProjectValue * inputs.activeProjects * 0.05,
        after: inputs.avgProjectValue * inputs.activeProjects * 0.01
      },
      { 
        category: 'Quality Issues', 
        before: inputs.avgProjectValue * inputs.activeProjects * 0.03,
        after: inputs.avgProjectValue * inputs.activeProjects * 0.005
      }
    ]
    
    const roiTimeline = Array.from({ length: 24 }, (_, i) => {
      const month = i + 1
      const monthlyReturn = results.roi.annualReturn / 12
      const cumulativeReturns = monthlyReturn * month
      const investment = month === 1 ? results.roi.investment : results.roi.investment / 12
      
      return {
        month: `Month ${month}`,
        investment,
        returns: monthlyReturn,
        cumulative: cumulativeReturns
      }
    })
    
    const savingsBreakdown = [
      { name: 'Material Savings', value: results.costSavings.materialWaste, color: '#22C55E' },
      { name: 'Labor Efficiency', value: results.costSavings.laborEfficiency, color: '#14B8A6' },
      { name: 'Error Reduction', value: results.costSavings.errorReduction, color: '#8B5CF6' },
      { name: 'Revenue Growth', value: results.revenueGains.additionalRevenue, color: '#F59E0B' }
    ]
    
    return {
      costComparison,
      roiTimeline,
      savingsBreakdown
    }
  }, [inputs, results])

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ROI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how much Vextrus can save your construction business. 
            Adjust the sliders below to match your current situation and see your potential ROI.
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <InputSliders values={inputs} onChange={handleInputChange} />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <ResultsDisplay results={results} />
          </motion.div>
        </div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ChartVisualizations data={chartData} />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Achieve {results.roi.roiPercentage}% ROI?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Based on your inputs, Vextrus can generate {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(results.roi.annualReturn)} in value annually
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Report
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Discuss Results
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Analysis
            </Button>
          </div>
        </motion.div>
      </Container>
    </main>
  )
}