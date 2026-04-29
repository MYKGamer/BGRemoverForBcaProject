'use client'

import { Zap, Clock, Image as ImageIcon, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardViewProps {
  userEmail: string
  credits: number
  historyCount: number
}

export function DashboardView({ userEmail, credits, historyCount }: DashboardViewProps) {
  const userName = userEmail.split('@')[0]
  const maxCredits = 10 // Assumption for demo purposes
  const creditPercentage = Math.min(100, (credits / maxCredits) * 100)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back, <span className="capitalize">{userName}</span>!
        </h1>
        <p className="text-[#a1a1aa]">Your creative workspace is ready. What would you like to do today?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Credits Card with Progress Bar */}
        <Card className="bg-[#18181b] border-[#27272a] overflow-hidden group hover:border-[#3f3f46] transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a1a1aa]">Account Credits</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-4">{credits} <span className="text-xs text-[#52525b] font-normal">/ {maxCredits}</span></div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-[#27272a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] transition-all duration-1000 ease-out" 
                  style={{ width: `${creditPercentage}%` }}
                />
              </div>
              <p className="text-[10px] text-[#71717a] font-medium uppercase tracking-wider">Usage: {100 - creditPercentage}% remaining</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Creations Card */}
        <Card className="bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a1a1aa]">Total Creations</CardTitle>
            <ImageIcon className="h-4 w-4 text-[#2563eb]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{historyCount}</div>
            <p className="text-xs text-[#71717a] mt-2 flex items-center">
              <span className="text-green-500 font-medium mr-1">↑ 12%</span> from last week
            </p>
          </CardContent>
        </Card>

        {/* System Status Card */}
        <Card className="bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a1a1aa]">AI Engine Status</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <div className="text-xl font-bold text-white">Active</div>
            </div>
            <p className="text-xs text-[#71717a] mt-3">All systems operational. Latency: 240ms</p>
          </CardContent>
        </Card>
      </div>

      {/* Hero Action Section */}
      <div className="relative group overflow-hidden rounded-2xl border border-[#27272a] bg-[#18181b]/40 p-8 md:p-12">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-[#2563eb]/5 rounded-full blur-3xl transition-all group-hover:bg-[#2563eb]/10" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] text-xs font-bold uppercase tracking-widest">
              New Update v0.1
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ready to remove some backgrounds?</h2>
            <p className="text-[#a1a1aa] leading-relaxed">
              Get clean, professional cuts in just a few seconds. Whether it's for your next big project or just for fun, we've got you covered.
            </p>
          </div>
          
          <div className="flex-shrink-0">
             <div className="h-20 w-20 rounded-2xl bg-[#2563eb] flex items-center justify-center shadow-2xl shadow-[#2563eb]/30 group-hover:scale-110 transition-transform duration-500">
               <ImageIcon className="h-10 w-10 text-white" />
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
