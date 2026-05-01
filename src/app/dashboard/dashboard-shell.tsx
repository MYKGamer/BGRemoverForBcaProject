'use client'

import { useState } from 'react'
import { UserMenu } from './user-menu'
import { Zap, Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DashboardView } from './views/dashboard-view'
import { EditorView } from './views/editor-view'
import { HistoryView } from './views/history-view'
import { PricingView } from './views/pricing-view'
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
  const router = useRouter()

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView 
            userEmail={user.email} 
            credits={credits} 
            historyCount={historyItems.length} 
            onStartEditing={() => setActiveView('editor')}
            onUpgrade={() => router.push('/pricing')}
          />
        )
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
      <div className="hidden md:block">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          onSettingsClick={() => setIsSettingsOpen(true)} 
        />
      </div>

      <SettingsSheet 
        isOpen={isSettingsOpen} 
        onClose={setIsSettingsOpen} 
        user={user}
      />

      <div className="flex-1 flex flex-col md:pl-20">
        {/* Header */}
        <header className="h-16 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur sticky top-0 z-50">
          <div className="px-4 md:px-8 h-full flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="md:hidden">
                <Sheet>
                <SheetTrigger 
                  render={
                    <Button variant="ghost" size="icon" className="text-white">
                      <Menu className="h-5 w-5" />
                    </Button>
                  }
                />
                  <SheetContent side="left" className="bg-[#09090b] border-[#27272a] p-0 w-64">
                    <Sidebar 
                      activeView={activeView} 
                      forceExpand={true}
                      setActiveView={(v) => {
                        setActiveView(v)
                      }} 
                      onSettingsClick={() => {
                        setIsSettingsOpen(true)
                      }} 
                    />
                  </SheetContent>
                </Sheet>
              </div>
              <h2 className="text-xs md:text-sm font-medium text-[#a1a1aa] uppercase tracking-widest transition-all">
                {activeView === 'editor' ? 'BG Editor' : activeView}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/pricing')}
                className="hidden sm:block text-[#a1a1aa] hover:text-white hover:bg-[#18181b] rounded-xl font-bold uppercase tracking-wider text-xs"
              >
                Pricing
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/pricing')}
                className="hidden sm:flex bg-[#2563eb]/10 border-[#2563eb]/20 text-[#2563eb] hover:bg-[#2563eb] hover:text-white rounded-full transition-all items-center gap-2 px-4 h-9 font-bold"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                Upgrade to Pro
              </Button>
              <div className="flex items-center space-x-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-[#18181b] border border-[#27272a] shadow-inner">
                <Zap className="h-3 md:h-4 w-3 md:w-4 text-yellow-500" />
                <span className="text-xs md:text-sm font-medium text-[#fafafa]">{credits} <span className="hidden sm:inline">Credits</span></span>
              </div>
              <UserMenu user={user} />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto w-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>

  )
}
