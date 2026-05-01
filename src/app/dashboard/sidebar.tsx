'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  History, 
  Settings,
  ChevronRight,
  Zap,
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

  return (
    <aside 
      className={`h-screen bg-[#09090b] border-r border-[#27272a] z-[60] transition-all duration-300 ease-in-out flex flex-col w-64 md:fixed md:left-0 md:top-0 ${
        !isHovered ? 'md:w-20' : 'md:w-64'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Logo Section */}
      <Link 
        href="/" 
        className="h-16 flex items-center px-6 mb-8 mt-4 group hover:opacity-90 transition-all"
      >
        <div className="h-10 w-10 min-w-[40px] bg-[#2563eb] rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-[#2563eb]/20 group-hover:scale-105 transition-transform">
          B
        </div>
        <span className={`ml-3 font-bold text-xl text-white tracking-tight transition-opacity duration-300 whitespace-nowrap ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          BGRemover
        </span>
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          if (item.id === 'pricing') {
            return (
              <button
                key={item.id}
                onClick={() => window.location.href = '/pricing'}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group relative ${
                  activeView === 'pricing' 
                    ? 'bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20' 
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181b]'
                }`}
              >
                <Icon className={`h-6 w-6 min-w-[24px] group-hover:scale-110 transition-transform`} />
                <span className={`ml-4 font-medium transition-opacity duration-300 whitespace-nowrap ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                }`}>
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20' 
                  : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181b]'
              }`}
            >
              <Icon className={`h-6 w-6 min-w-[24px] ${isActive ? 'text-[#2563eb]' : 'group-hover:scale-110 transition-transform'}`} />
              <span className={`ml-4 font-medium transition-opacity duration-300 whitespace-nowrap ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                {item.label}
              </span>

              {/* Active Indicator (Dot) */}
              {isActive && !isExpanded && (
                <div className="absolute left-[-4px] w-1.5 h-6 bg-[#2563eb] rounded-r-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 mb-8 space-y-2">
        <button
          onClick={onSettingsClick}
          className="w-full flex items-center p-3 rounded-xl text-[#a1a1aa] hover:text-white hover:bg-[#18181b] transition-all duration-200 group"
        >
          <Settings className="h-6 w-6 min-w-[24px] group-hover:rotate-45 transition-transform duration-500" />
          <span className={`ml-4 font-medium transition-opacity duration-300 whitespace-nowrap ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}>
            Settings
          </span>
        </button>

        {/* Mini Credit Display when collapsed */}
        <div className={`p-3 rounded-xl bg-[#18181b]/50 border border-[#27272a] transition-all duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-100'
        }`}>
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 min-w-[20px]" />
            <div className={`ml-4 transition-opacity duration-300 whitespace-nowrap ${
              isExpanded ? 'opacity-100' : 'hidden'
            }`}>
              <p className="text-[10px] uppercase tracking-wider text-[#a1a1aa] font-bold">Credits</p>
              <p className="text-sm font-bold text-white">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
