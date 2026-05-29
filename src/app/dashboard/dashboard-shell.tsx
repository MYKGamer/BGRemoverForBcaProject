'use client'

import { useState } from 'react'
import { UserMenu } from './user-menu'
import { Zap, Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
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
  
  const springTransition = { type: "spring", stiffness: 350, damping: 25 }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView 
            userEmail={user.email} 
            credits={credits} 
            historyCount={historyItems.length} 
            onStartEditing={() => setActiveView('editor')}
            onUpgrade={() => window.location.href = '/pricing'}
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
    <div className="min-h-screen bg-[#050507] text-[#fafafa] flex overflow-hidden">
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

      <div className="flex-1 flex flex-col md:pl-20 min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-[#1a1a1f] bg-[#050507]/80 backdrop-blur sticky top-0 z-50 shadow-sm shadow-black/25">
          <div className="px-4 md:px-8 h-full flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger 
                    render={
                      <Button variant="ghost" size="icon" className="text-white hover:bg-[#1a1a1f]">
                        <Menu className="h-5 w-5" />
                      </Button>
                    }
                  />
                  <SheetContent side="left" className="bg-[#0e0e11] border-[#1a1a1f] p-0 w-64">
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
              <h2 className="text-xs md:text-sm font-black text-[#8a8a93] uppercase tracking-widest transition-all">
                {activeView === 'editor' ? 'BG Editor' : activeView}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
              >
                <Button 
                  variant="ghost" 
                  onClick={() => window.location.href = '/pricing'}
                  className="hidden sm:block text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1f]/60 rounded-xl font-bold uppercase tracking-wider text-xs px-4 py-2"
                >
                  Pricing
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.href = '/pricing'}
                  className="hidden sm:flex bg-[#2563eb]/10 border-[#2563eb]/30 text-[#3b82f6] hover:bg-[#2563eb] hover:text-white rounded-xl transition-all items-center gap-2 px-4 h-9 font-bold shadow-md shadow-[#2563eb]/5"
                >
                  <Zap className="h-3.5 w-3.5 fill-current animate-pulse" />
                  Upgrade to Pro
                </Button>
              </motion.div>

              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#0e0e11] border border-[#1a1a1f] shadow-inner shadow-black/40">
                <Zap className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                <span className="text-xs md:text-sm font-extrabold text-white">{credits} <span className="hidden sm:inline text-zinc-500 font-medium ml-0.5">Credits</span></span>
              </div>
              <UserMenu user={user} />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#050507]">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto w-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}
}
