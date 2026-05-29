'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Download, Trash2, Edit2, Check, X, Image as ImageIcon, ExternalLink, Clock, Calendar, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { deleteHistoryItem, renameHistoryItem } from './history-actions'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'

type HistoryItem = {
  id: string
  title: string
  original_image_url: string
  transparent_image_url: string
  created_at: string
}

export function HistoryGrid({ initialItems }: { initialItems: HistoryItem[] }) {
  const [items, setItems] = useState<HistoryItem[]>(initialItems)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center border-2 border-dashed border-[#27272a] rounded-[1.5rem] bg-[#09090b]/50 backdrop-blur-sm px-4">
        <div className="h-12 md:h-14 w-12 md:w-14 bg-[#18181b] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 border border-[#27272a] shadow-2xl rotate-3">
          <ImageIcon className="h-6 md:h-8 w-6 md:w-8 text-[#52525b]" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-white tracking-tight italic">Gallery is empty</h3>
        <p className="text-[#a1a1aa] mt-2 max-w-xs text-sm md:text-base font-medium">
          Your AI-powered background removals will appear here as soon as you create them.
        </p>
      </div>
    )
  }

  const handleDelete = async (item: HistoryItem) => {
    if (!window.confirm('Delete this asset? This cannot be undone.')) return

    setIsDeleting(item.id)
    const result = await deleteHistoryItem(item.id, item.original_image_url, item.transparent_image_url)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Asset deleted')
      setItems((prev) => prev.filter((i) => i.id !== item.id))
    }
    setIsDeleting(null)
  }

  const handleRename = async (id: string) => {
    if (!editTitle.trim()) {
      setEditingId(null)
      return
    }

    const result = await renameHistoryItem(id, editTitle)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Title updated')
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, title: editTitle.trim() } : i))
    }
    setEditingId(null)
  }

  const handleDownload = async (url: string, title: string) => {
    const toastId = toast.loading('Preparing download...')
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-transparent.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)

      toast.success('Download started', { id: toastId })
    } catch (error) {
      toast.error('Failed to download image', { id: toastId })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 25
      }
    }
  } as const

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
    >
      {items.map((item) => {
        const isNew = new Date(item.created_at).getTime() > Date.now() - 1000 * 60 * 60 * 24;

        return (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="group relative rounded-[1.5rem] overflow-hidden border border-[#27272a] bg-[#09090b] transition-all duration-500 hover:border-[#2563eb]/40 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col"
          >
            {/* Image Container with Custom Transparency Grid */}
            <div
              className="relative w-full aspect-square bg-[#09090b] flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%2318181b' d='M0 0h8v8H0zM8 8h8v8H8z'/%3E%3C/svg%3E")`,
                backgroundSize: '24px 24px'
              }}
            >
              <Image
                src={item.transparent_image_url}
                alt={item.title}
                fill
                className="object-contain p-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                {isNew && (
                  <div className="px-3 py-1 rounded-full bg-[#2563eb] text-[10px] font-black text-white uppercase tracking-tighter shadow-lg shadow-blue-500/40 flex items-center gap-1 animate-pulse">
                    <History className="h-3 w-3" />
                    Recent Asset
                  </div>
                )}
              </div>

              {/* Action Buttons Layer */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 z-30">
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-white text-black hover:bg-[#2563eb] hover:text-white transition-all shadow-xl hover:-translate-y-1 transform"
                  onClick={() => handleDownload(item.transparent_image_url, item.title)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-10 w-10 rounded-xl transition-all shadow-xl hover:-translate-y-1 transform bg-[#ef4444] hover:bg-[#dc2626]"
                  onClick={() => handleDelete(item)}
                  disabled={isDeleting === item.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 bg-[#18181b]/50 backdrop-blur-md border-t border-[#27272a] space-y-2">
              <div className="flex items-start justify-between gap-3">
                {editingId === item.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      autoFocus
                      className="h-8 bg-[#09090b] border-[#27272a] text-sm text-white focus-visible:ring-1 focus-visible:ring-[#2563eb]"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(item.id)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-[#27272a]"
                      onClick={() => handleRename(item.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-[#27272a]"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate pr-4 text-sm" title={item.title}>
                      {item.title}
                    </h3>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setEditingId(item.id)
                        setEditTitle(item.title)
                      }}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-xs text-[#a1a1aa] mt-1">
                {new Date(item.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
