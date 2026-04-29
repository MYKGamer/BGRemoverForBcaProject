'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Download, Trash2, Edit2, Check, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteHistoryItem, renameHistoryItem } from './history-actions'
import { toast } from 'sonner'

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
      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-[#27272a] rounded-2xl bg-[#09090b]">
        <div className="h-16 w-16 bg-[#18181b] rounded-full flex items-center justify-center mb-4 border border-[#27272a]">
          <ImageIcon className="h-8 w-8 text-[#a1a1aa]" />
        </div>
        <h3 className="text-xl font-semibold text-white">No creations yet</h3>
        <p className="text-[#a1a1aa] mt-2 max-w-sm">
          Upload an image above to remove its background. Your processed images will appear here.
        </p>
      </div>
    )
  }

  const handleDelete = async (item: HistoryItem) => {
    if (!window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) return

    setIsDeleting(item.id)
    const result = await deleteHistoryItem(item.id, item.original_image_url, item.transparent_image_url)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Image deleted successfully')
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
      
      toast.success('Download started')
    } catch (error) {
      toast.error('Failed to download image')
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="group relative rounded-xl overflow-hidden border border-[#27272a] bg-[#18181b] transition-all hover:border-[#3f3f46] hover:shadow-2xl hover:shadow-black/50 flex flex-col"
        >
          {/* Image Container with Checkerboard Pattern */}
          <div 
            className="relative w-full aspect-square bg-[#09090b] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #18181b 25%, transparent 25%, transparent 75%, #18181b 75%, #18181b), repeating-linear-gradient(45deg, #18181b 25%, #09090b 25%, #09090b 75%, #18181b 75%, #18181b)',
              backgroundPosition: '0 0, 10px 10px',
              backgroundSize: '20px 20px'
            }}
          >
            <Image
              src={item.transparent_image_url}
              alt={item.title}
              fill
              className="object-contain p-4 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-white text-black hover:bg-gray-200 hover:scale-110 transition-transform"
                onClick={() => handleDownload(item.transparent_image_url, item.title)}
                title="Download"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:scale-110 transition-transform"
                onClick={() => handleDelete(item)}
                disabled={isDeleting === item.id}
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 border-t border-[#27272a] bg-[#18181b]">
            {editingId === item.id ? (
              <div className="flex items-center gap-2">
                <Input
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(item.id)
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                  className="h-8 bg-[#09090b] border-[#27272a] text-sm text-white focus-visible:ring-1 focus-visible:ring-[#2563eb]"
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
            <p className="text-xs text-[#a1a1aa] mt-1">
              {new Date(item.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
