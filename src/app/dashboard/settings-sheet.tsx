'use client'

import { useTransition } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { UserMenu } from "./user-menu"
import { Settings, Bell, Shield, CreditCard, LogOut, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
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
      await signOut()
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#09090b] border-[#27272a] text-white w-[400px] sm:w-[540px] p-0">
        <SheetHeader className="p-6 border-b border-[#27272a]">
          <SheetTitle className="text-white flex items-center space-x-2">
            <Settings className="h-5 w-5 text-[#2563eb]" />
            <span>Settings</span>
          </SheetTitle>
          <SheetDescription className="text-[#a1a1aa]">
            Adjust your preferences and manage your account here.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* User Profile Section in Sheet */}
          <div className="p-6 border-b border-[#27272a] bg-[#18181b]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717a] mb-4">Account</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#2563eb] flex items-center justify-center font-bold text-white uppercase">
                  {user?.email?.[0] || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user?.email}</p>
                  <p className="text-xs text-[#a1a1aa]">Standard Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Options */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#18181b] transition-colors group">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-[#a1a1aa] group-hover:text-white" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <div className="text-[10px] bg-[#27272a] px-2 py-0.5 rounded text-[#a1a1aa]">Off</div>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#18181b] transition-colors group">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-[#a1a1aa] group-hover:text-white" />
                <span className="text-sm font-medium">Privacy & Security</span>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#18181b] transition-colors group">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-[#a1a1aa] group-hover:text-white" />
                <span className="text-sm font-medium">Billing</span>
              </div>
            </button>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-[#27272a] bg-[#09090b]">
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 disabled:opacity-50"
              onClick={handleSignOut}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </>
              )}
            </Button>
            <p className="text-[10px] text-center text-[#3f3f46] mt-4 uppercase tracking-[0.2em]">
              BGRemover v0.1.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
