'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import Image from 'next/image'
import { LogOut, User, ChevronDown, UserPlus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from '../auth/actions'

interface UserMenuProps {
  user: {
    email?: string
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const menuRef = useRef<HTMLDivElement>(null)

  const email = user.email || 'User'
  const avatarUrl = user.user_metadata?.avatar_url
  const fullName = user.user_metadata?.full_name || email.split('@')[0]
  const initial = (fullName[0] || email[0]).toUpperCase()

  const handleSignOut = () => {
    setIsOpen(false)
    startTransition(async () => {
      await signOut('/')
    })
  }

  const handleSwitchAccount = () => {
    setIsOpen(false)
    startTransition(async () => {
      await signOut('/auth')
    })
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-[#18181b] transition-all border border-transparent hover:border-[#27272a] disabled:opacity-50"
      >
        <div className="h-8 w-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold overflow-hidden border border-[#27272a]">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-white" />
          ) : avatarUrl ? (
            <Image 
              src={avatarUrl} 
              alt={fullName} 
              width={32} 
              height={32} 
              className="object-cover"
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-[#a1a1aa] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#09090b] border border-[#27272a] shadow-2xl shadow-black/50 overflow-hidden z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="p-3 border-b border-[#27272a] bg-[#18181b]/50">
            <p className="text-xs font-medium text-[#a1a1aa] mb-1">Signed in as</p>
            <p className="text-sm font-semibold text-white truncate">{email}</p>
          </div>

          <div className="p-2 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded-lg"
              onClick={handleSwitchAccount}
              disabled={isPending}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Switch Account
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg"
              onClick={handleSignOut}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
