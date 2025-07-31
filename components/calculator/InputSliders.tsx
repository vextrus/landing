'use client'

import { motion } from 'framer-motion'

interface InputSlidersProps {
  values: {
    activeProjects: number
    avgProjectValue: number
    currentDelayRate: number
    currentProfitMargin: number
    numberOfEmployees: number
  }
  onChange: (key: string, value: number) => void
}

export default function InputSliders({ values, onChange }: InputSlidersProps) {
  const sliders = [
    {
      key: 'activeProjects',
      label: 'Number of Active Projects',
      min: 1,
      max: 50,
      step: 1,
      unit: 'projects',
      value: values.activeProjects,
      color: 'primary'
    },
    {
      key: 'avgProjectValue',
      label: 'Average Project Value',
      min: 100000,
      max: 10000000,
      step: 100000,
      unit: '$',
      value: values.avgProjectValue,
      color: 'accent',
      format: (v: number) => `$${(v / 1000000).toFixed(1)}M`
    },
    {
      key: 'currentDelayRate',
      label: 'Current Delay Rate',
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      value: values.currentDelayRate,
      color: 'warning'
    },
    {
      key: 'currentProfitMargin',
      label: 'Current Profit Margin',
      min: 0,
      max: 50,
      step: 1,
      unit: '%',
      value: values.currentProfitMargin,
      color: 'success'
    },
    {
      key: 'numberOfEmployees',
      label: 'Number of Employees',
      min: 10,
      max: 1000,
      step: 10,
      unit: 'people',
      value: values.numberOfEmployees,
      color: 'primary'
    }
  ]

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Current Situation</h3>
      
      {sliders.map((slider, index) => (
        <motion.div
          key={slider.key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-gray-700">
              {slider.label}
            </label>
            <span className="text-lg font-bold text-gray-900">
              {slider.format ? slider.format(slider.value) : `${slider.value} ${slider.unit}`}
            </span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={slider.value}
              onChange={(e) => onChange(slider.key, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-${slider.color}) 0%, var(--color-${slider.color}) ${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%, #e5e7eb ${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%, #e5e7eb 100%)`
              }}
            />
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{slider.format ? slider.format(slider.min) : slider.min}</span>
              <span>{slider.format ? slider.format(slider.max) : slider.max}</span>
            </div>
          </div>
        </motion.div>
      ))}
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border: 2px solid var(--color-primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border: 2px solid var(--color-primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}