'use client'

import { HistoryGrid } from '../history-grid'

interface HistoryItem {
  id: string
  title: string
  original_image_url: string
  transparent_image_url: string
  created_at: string
}

export function HistoryView({ initialItems }: { initialItems: HistoryItem[] }) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">History</h1>
        <p className="text-[#a1a1aa]">Manage and download your past background removals.</p>
      </div>
      <HistoryGrid initialItems={initialItems} />
    </div>
  )
}
