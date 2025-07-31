'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import FullScreenModal from '@/components/ecosystem/modules/CommandCenter/components/FullScreenModal'

const CommandCenter = dynamic(() => import('@/components/ecosystem/modules/CommandCenter'), {
  ssr: false,
  loading: () => <div>Loading Command Center...</div>
})

export default function TestCommandCenterPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Command Center Test Page</h1>
      
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Open Command Center Modal
      </button>

      <FullScreenModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CommandCenter />
      </FullScreenModal>
    </div>
  )
}