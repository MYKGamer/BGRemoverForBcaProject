'use client'

import { useTransition } from 'react'
import { Settings, Bell, Shield, CreditCard, LogOut, Loader2, Sparkles, User, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet"
import { signOut } from "../auth/actions"

interface SettingsSheetProps {
  isOpen: boolean
  onClose: (open: boolean) => void
  user: any
}

export function SettingsSheet({ isOpen, onClose, user }: SettingsSheetProps) {
  const [isPending, startTransition] = useTransition()

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut('/')
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#09090b]/95 border-[#27272a] backdrop-blur-2xl text-white w-[400px] sm:w-[480px] p-0 flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]">
        <SheetHeader className="p-8 border-b border-[#27272a]/50">
          <SheetTitle className="text-2xl font-black text-white flex items-center space-x-3 tracking-tight">
            <div className="h-10 w-10 rounded-2xl bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center">
              <Settings className="h-6 w-6 text-[#2563eb]" />
            </div>
            <span>Account Control</span>
          </SheetTitle>
          <SheetDescription className="text-[#a1a1aa] text-base font-medium">
            Manage your workspace and subscription.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
          {/* User Profile Card */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#52525b] px-2">Profile Instance</h3>
            <div className="bg-[#18181b]/50 border border-[#27272a] rounded-[2rem] p-6 flex items-center gap-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-16 w-16 rounded-[1.25rem] bg-[#2563eb] flex items-center justify-center font-black text-2xl text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
                {user?.email?.[0] || 'U'}
              </div>
              <div className="relative flex-1">
                <p className="text-lg font-bold text-white truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-500 uppercase tracking-widest">Standard Plan</span>
                </div>
              </div>
            </div>
          </section>

          {/* Credits Summary Card */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#52525b] px-2">Usage Monitor</h3>
            <div className="bg-gradient-to-br from-[#09090b] to-[#18181b] border border-[#27272a] rounded-[2rem] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="h-4 w-4 text-[#2563eb]" />
                  <span className="text-sm font-bold">Remaining Credits</span>
                </div>
                <span className="text-xl font-black text-white">42</span>
              </div>
              <div className="h-2 w-full bg-[#27272a] rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-[#2563eb] rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              </div>
              <p className="text-[10px] text-[#71717a] font-medium leading-relaxed">
                Credits reset on the 1st of every month. Upgrade to Pro for unlimited removals.
              </p>
            </div>
          </section>

          {/* Preferences */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#52525b] px-2">Preferences</h3>
            <div className="space-y-1">
              {[
                { icon: Bell, label: 'Notifications', value: 'Enabled' },
                { icon: Shield, label: 'Security & Privacy', value: 'Active' },
                { icon: CreditCard, label: 'Billing & Invoices', value: null },
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[#18181b] transition-all duration-300 group border border-transparent hover:border-[#27272a]"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="h-5 w-5 text-[#71717a] group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold text-[#a1a1aa] group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-[10px] font-black text-[#52525b] group-hover:text-blue-500 transition-colors uppercase tracking-widest">{item.value}</span>}
                    <ChevronRight className="h-4 w-4 text-[#27272a] group-hover:text-white transition-all transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-[#27272a]/50 bg-[#09090b]/50 backdrop-blur-sm">
          <Button 
            variant="destructive" 
            className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 shadow-2xl transition-all duration-500 font-bold text-base"
            onClick={handleSignOut}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <LogOut className="h-5 w-5" />
                <span>Sign Out Instance</span>
              </>
            )}
          </Button>
          <div className="mt-6 flex items-center justify-between opacity-30">
            <span className="text-[8px] font-black uppercase tracking-[0.3em]">BGRemover Engine v1.0</span>
            <div className="h-1 w-1 rounded-full bg-white animate-pulse" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
