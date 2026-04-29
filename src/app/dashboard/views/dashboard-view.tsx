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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back, <span className="capitalize">{userName}</span>!
        </h1>
        <p className="text-[#a1a1aa]">Here's what's happening with your account today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a1a1aa]">Available Credits</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{credits}</div>
            <p className="text-xs text-[#a1a1aa] mt-1">Free project credits</p>
          </CardContent>
        </Card>

        <Card className="bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a1a1aa]">Total Creations</CardTitle>
            <ImageIcon className="h-4 w-4 text-[#2563eb]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{historyCount}</div>
            <p className="text-xs text-[#a1a1aa] mt-1">Images processed</p>
          </CardContent>
        </Card>

        <Card className="bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#a1a1aa]">Efficiency</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">100%</div>
            <p className="text-xs text-[#a1a1aa] mt-1">AI uptime active</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-[#27272a] bg-[#18181b]/50 p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-[#2563eb]/10 flex items-center justify-center border border-[#2563eb]/20">
          <Clock className="h-6 w-6 text-[#2563eb]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Ready to create?</h2>
          <p className="text-[#a1a1aa] max-w-sm mx-auto">
            Your workspace is set up and ready. Head over to the BG Editor to start removing backgrounds.
          </p>
        </div>
      </div>
    </div>
  )
}
