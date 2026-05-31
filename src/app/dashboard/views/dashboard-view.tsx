'use client'

import { Coins, Clock, Image as ImageIcon, BarChart3, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardViewProps {
  userEmail: string
  credits: number
  historyCount: number
  onStartEditing: () => void
  onUpgrade: () => void
}

export function DashboardView({ userEmail, credits, historyCount, onStartEditing, onUpgrade }: DashboardViewProps) {
  const userName = userEmail.split('@')[0]
  const maxCredits = 10 // Assumption for demo purposes
  const creditPercentage = Math.min(100, (credits / maxCredits) * 100)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col space-y-2 px-1">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#60a5fa] capitalize">{userName}</span>!
        </h1>
        <p className="text-[#a1a1aa] text-lg">Your creative workspace is ready. What would you like to do today?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-1">
        {/* Credits Card with Progress Bar */}
        <Card className="bg-[#18181b]/60 border-[#27272a] backdrop-blur-sm overflow-hidden group hover:border-[#3b82f6]/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-[#a1a1aa] uppercase tracking-wider">Account Credits</CardTitle>
            <Coins className="h-5 w-5 text-yellow-500 group-hover:scale-125 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white mb-4 tracking-tighter">{credits} <span className="text-xs text-[#52525b] font-normal tracking-normal uppercase">/ {maxCredits} available</span></div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-[#09090b] rounded-full overflow-hidden p-[1px] ring-1 ring-[#27272a]">
                <div 
                  className="h-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]" 
                  style={{ width: `${creditPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-[#71717a] font-bold uppercase tracking-[0.1em]">Plan: Free Tier</p>
                <button 
                  onClick={onUpgrade}
                  className="text-[10px] text-[#2563eb] hover:text-blue-400 font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-1 group/btn"
                >
                  Upgrade to Pro
                  <ArrowRight className="h-2.5 w-2.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Creations Card */}
        <Card className="bg-[#18181b]/40 border-[#27272a] backdrop-blur-sm hover:border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-[#a1a1aa] uppercase tracking-wider">Total Creations</CardTitle>
            <ImageIcon className="h-5 w-5 text-[#2563eb] transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-white tracking-tighter">{historyCount}</div>
            <p className="mt-4 text-xs text-[#71717a] font-medium">All processed images are saved in your profile history.</p>
          </CardContent>
        </Card>

        {/* System Status Card */}
        <Card className="bg-[#18181b]/40 border-[#27272a] backdrop-blur-sm hover:border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-[#a1a1aa] uppercase tracking-wider">AI Engine Status</CardTitle>
            <BarChart3 className="h-5 w-5 text-green-500 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </div>
              <div className="text-lg font-bold text-white">System Online</div>
            </div>
            <p className="text-xs text-[#71717a] leading-relaxed">Latency: <span className="text-zinc-300">~140ms</span>. Engine is ready for processing.</p>
          </CardContent>
        </Card>
      </div>

      {/* Hero Action Section - Premium Upgrade */}
      <div 
        onClick={onStartEditing}
        className="relative group overflow-hidden rounded-[1.5rem] border border-[#27272a] bg-gradient-to-br from-[#18181b] to-[#09090b] p-6 md:p-10 cursor-pointer hover:border-zinc-800 transition-all duration-500 shadow-2xl"
      >
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-[#2563eb]/5 rounded-full blur-[100px] transition-all" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-48 w-48 bg-blue-500/5 rounded-full blur-[80px]" />
        
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left">

            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter">
              Ready to remove some <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#60a5fa]">backgrounds?</span>
            </h2>
            <p className="text-[#a1a1aa] leading-relaxed text-sm md:text-base">
              Upload your photos and let our high-precision AI do the heavy lifting. Get professional results in seconds.
            </p>
            
            <div className="pt-2 flex items-center justify-center lg:justify-start">
              <div className="px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_-5px_rgba(37,99,235,0.3)] flex items-center gap-2 transform group-hover:scale-[1.01]">
                <span className="text-sm">Get Started Now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 relative">
             <div className="absolute inset-0 bg-[#2563eb]/20 rounded-[1.5rem] blur-2xl opacity-30" />
             <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-[1.5rem] bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center shadow-[0_15px_35px_rgba(37,99,235,0.2)] group-hover:scale-102 transition-all duration-700 ring-4 ring-[#2563eb]/10">
               <ImageIcon className="h-12 w-12 md:h-16 md:w-16 text-white drop-shadow-2xl" />
             </div>
          </div>
        </div>
      </div>
    </div>

  )
}
