'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MoveHorizontal } from 'lucide-react'

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = (x / rect.width) * 100
    setSliderPosition(percent)
  }, [])

  useEffect(() => {
    const handleMoveEvent = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      
      // Safety check: if it's a mouse event, ensure the left button (buttons: 1) is still held down
      if ('buttons' in e && e.buttons !== 1) {
        setIsDragging(false)
        return
      }

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      handleMove(clientX)
    }

    const handleUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMoveEvent)
      window.addEventListener('touchmove', handleMoveEvent)
      window.addEventListener('mouseup', handleUp)
      window.addEventListener('touchend', handleUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMoveEvent)
      window.removeEventListener('touchmove', handleMoveEvent)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [isDragging, handleMove])

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-video rounded-2xl overflow-hidden select-none border border-[#27272a] shadow-2xl transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-default'
      }`}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-[#09090b]">
        <img 
          src="/images/After.jpg" 
          alt="After" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Before Image (Foreground with Clip) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src="/images/Before.jpg" 
          alt="Before" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Line/Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* THE TRIGGER HANDLE - This is now the ONLY place where dragging can start */}
        <div 
          className={`h-12 w-12 rounded-full bg-white text-[#2563eb] flex items-center justify-center shadow-2xl border-4 border-[#2563eb]/20 transition-transform duration-200 pointer-events-auto cursor-col-resize active:cursor-grabbing ${
            isDragging ? 'scale-125 shadow-[#2563eb]/40' : 'scale-100 hover:scale-110'
          }`}
          onMouseDown={(e) => {
            if (e.button !== 0) return
            setIsDragging(true)
          }}
          onTouchStart={() => {
            setIsDragging(true)
          }}
        >
          <MoveHorizontal className="h-6 w-6" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/10 shadow-lg">
        Original
      </div>
      <div className="absolute top-4 right-4 bg-[#2563eb]/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/10 shadow-lg">
        AI Result
      </div>
    </div>
  )
}
