'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  History, 
  Settings,
  Coins,
  CreditCard
} from 'lucide-react'

type View = 'dashboard' | 'editor' | 'history'

interface SidebarProps {
  activeView: View
  setActiveView: (view: View) => void
  onSettingsClick: () => void
  forceExpand?: boolean
}

export function Sidebar({ activeView, setActiveView, onSettingsClick, forceExpand = false }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'editor', label: 'BG Editor', icon: ImageIcon },
    { id: 'history', label: 'History', icon: History },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
  ]
  
  const isExpanded = forceExpand || isHovered 
  const springTransition = { type: "spring", stiffness: 350, damping: 25 }

  return (
    <aside 
      className={`h-screen bg-[#0e0e11]/95 backdrop-blur-xl border-r border-[#1a1a1f] z-[60] transition-all duration-300 ease-in-out flex flex-col w-64 md:fixed md:left-0 md:top-0 shadow-2xl shadow-black/80 ${
        !isHovered ? 'md:w-20' : 'md:w-64'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Logo Section */}
      <Link 
        href="/" 
        className="h-16 flex items-center px-6 mb-8 mt-4 group transition-all"
      >
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          className="h-10 w-10 min-w-[40px] bg-[#2563eb] rounded-xl flex items-center justify-center font-extrabold text-white shadow-lg shadow-[#2563eb]/20"
        >
          B
        </motion.div>
        <span className={`ml-3 font-black text-xl text-white tracking-tighter transition-opacity duration-300 whitespace-nowrap ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          BGRemover
        </span>
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2 relative">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          if (item.id === 'pricing') {
            return (
              <motion.button
                key={item.id}
                onClick={() => window.location.href = '/pricing'}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="w-full flex items-center p-3 rounded-xl transition-all duration-200 group relative text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1f]/50 border border-transparent"
              >
                <Icon className="h-5 w-5 min-w-[20px] transition-colors" />
                <span className={`ml-4 font-semibold text-sm transition-opacity duration-300 whitespace-nowrap ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            )
          }

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={springTransition}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group relative border ${
                isActive 
                  ? 'bg-[#2563eb]/10 border-[#2563eb]/30 text-[#3b82f6]' 
                  : 'border-transparent text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1f]/50'
              }`}
            >
              <Icon className={`h-5 w-5 min-w-[20px] ${isActive ? 'text-[#3b82f6]' : 'transition-colors'}`} />
              <span className={`ml-4 font-semibold text-sm transition-opacity duration-300 whitespace-nowrap ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                {item.label}
              </span>

              {/* Active Indicator (Premium Sliding Bar) */}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-6 bg-[#2563eb] rounded-r-full"
                  transition={springTransition}
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 mb-8 space-y-2">
        <motion.button
          onClick={onSettingsClick}
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
          className="w-full flex items-center p-3 rounded-xl text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1f]/50 transition-all duration-200 group border border-transparent"
        >
          <Settings className="h-5 w-5 min-w-[20px] group-hover:rotate-45 transition-transform duration-500" />
          <span className={`ml-4 font-semibold text-sm transition-opacity duration-300 whitespace-nowrap ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}>
            Settings
          </span>
        </motion.button>

        {/* Mini Credit Display when collapsed */}
        <motion.button
          onClick={() => window.location.href = '/pricing'}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
          className="p-3 w-full rounded-xl bg-[#131316]/80 border border-[#1a1a1f] hover:bg-[#2563eb]/10 hover:border-[#2563eb]/30 transition-all duration-300 group shadow-md shadow-black/20"
        >
          <div className="flex items-center">
            <Coins className="h-5 w-5 text-yellow-500 min-w-[20px]" />
            <div className={`ml-4 text-left transition-opacity duration-300 whitespace-nowrap ${
              isExpanded ? 'opacity-100' : 'hidden'
            }`}>
              <p className="text-[9px] uppercase tracking-widest text-[#71717a] font-black">Credits</p>
              <p className="text-xs font-bold text-white group-hover:text-[#3b82f6] transition-colors">Standard Plan</p>
            </div>
          </div>
        </motion.button>
      </div>
    </aside>
  )
}
  )
}
