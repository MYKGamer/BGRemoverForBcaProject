'use client'

import { useState } from 'react'
import { UserMenu } from './user-menu'
import { Zap } from 'lucide-react'
import { DashboardView } from './views/dashboard-view'
import { EditorView } from './views/editor-view'
import { HistoryView } from './views/history-view'
import { Sidebar } from './sidebar'
import { SettingsSheet } from './settings-sheet'

type View = 'dashboard' | 'editor' | 'history'

interface DashboardShellProps {
  user: any
  credits: number
  historyItems: any[]
}

export function DashboardShell({ user, credits, historyItems }: DashboardShellProps) {
  const [activeView, setActiveView] = useState<View>('dashboard')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView userEmail={user.email} credits={credits} historyCount={historyItems.length} />
      case 'editor':
        return <EditorView />
      case 'history':
        return <HistoryView initialItems={historyItems} />
      default:
        return <EditorView />
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onSettingsClick={() => setIsSettingsOpen(true)} 
      />

      <SettingsSheet 
        isOpen={isSettingsOpen} 
        onClose={setIsSettingsOpen} 
        user={user}
      />

      <div className="flex-1 flex flex-col pl-20">
        {/* Header */}
        <header className="h-16 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur sticky top-0 z-50">
          <div className="px-8 h-full flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-sm font-medium text-[#a1a1aa] uppercase tracking-widest transition-all">
                {activeView === 'editor' ? 'BG Editor' : activeView}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#18181b] border border-[#27272a] shadow-inner">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-[#fafafa]">{credits} Credits</span>
              </div>
              <UserMenu user={user} />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}
