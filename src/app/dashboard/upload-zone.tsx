'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { Upload, Loader2, Image as ImageIcon, Download, Cpu } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { toast } from 'sonner'
import { useEffect } from 'react'
import { Lock } from 'lucide-react'

export function UploadZone() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  
  // Passcode States
  const [isPasscodeVerified, setIsPasscodeVerified] = useState(false)
  const [showPasscodeModal, setShowPasscodeModal] = useState(false)
  const [passcodeInput, setPasscodeInput] = useState('')

  // Check localStorage on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('project_access_code')
    if (savedCode === '2026') {
      setIsPasscodeVerified(true)
    }
  }, [])

  const [pendingFile, setPendingFile] = useState<File | null>(null)

  const processFile = async (fileToProcess: File) => {
    setIsProcessing(true)
    setResultImage(null)
    toast.loading('Processing image...', { id: 'processing-toast' })

    const formData = new FormData()
    formData.append('image', fileToProcess)

    try {
      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: {
          'x-access-code': localStorage.getItem('project_access_code') || ''
        },
        body: formData,
      })
      
      const result = await response.json()

      if (!response.ok || result.error) {
        toast.error(result.error || 'Failed to process image', { id: 'processing-toast' })
      } else if (result.success && result.transparentUrl) {
        toast.success('Background removed successfully!', { id: 'processing-toast' })
        setResultImage(result.transparentUrl)
        router.refresh()
      }
    } catch {
      toast.error('An unexpected error occurred', { id: 'processing-toast' })
    } finally {
      setIsProcessing(false)
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB')
      return
    }

    // Check if passcode is verified
    if (!isPasscodeVerified) {
      setPendingFile(file)
      setShowPasscodeModal(true)
      return
    }

    await processFile(file)
  }, [isPasscodeVerified])

  const handleDownload = async () => {
    if (!resultImage) return
    
    try {
      const response = await fetch(resultImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `bg-remover-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Download started!')
    } catch (error) {
      console.error('Download Error:', error)
      toast.error('Failed to download image')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    disabled: isProcessing
  })

  const handlePasscodeSubmit = async () => {
    if (passcodeInput === '2026') {
      localStorage.setItem('project_access_code', '2026')
      setIsPasscodeVerified(true)
      setShowPasscodeModal(false)
      toast.success('Access Granted!')
      
      if (pendingFile) {
        await processFile(pendingFile)
        setPendingFile(null)
      }
    } else {
      toast.error('Invalid Access Code. Please try again.')
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4">
      {/* Passcode Modal */}
      {showPasscodeModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={() => setShowPasscodeModal(false)}
        >
          <div 
            className="bg-[#121214] border border-zinc-800 p-6 rounded-xl w-full max-w-[320px] shadow-xl space-y-5 animate-in zoom-in-95 duration-200 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 mb-2">
                <Lock className="w-5 h-5 text-zinc-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Access Code</h2>
              <p className="text-zinc-500 text-xs">This tool is locked for project evaluation.</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter Access Code"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePasscodeSubmit()}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-white text-center text-base focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-700"
                autoFocus
              />
              <Button 
                onClick={handlePasscodeSubmit}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all active:scale-95"
              >
                Unlock Tool
              </Button>
            </div>
          </div>
        </div>
      )}
      {resultImage ? (
        <div className="bg-[#18181b]/80 border border-[#27272a] backdrop-blur-xl rounded-[1.5rem] p-5 md:p-8 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-white tracking-tight">AI Result Ready</h3>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <div className="h-2 w-2 rounded-full bg-green-500/20" />
            </div>
          </div>

          <div className="relative group w-full aspect-video md:aspect-[16/10] flex items-center justify-center bg-[#09090b] rounded-[1.5rem] border border-[#27272a] overflow-hidden shadow-inner">
             {/* Transparency Grid Background */}
             <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-20" />
             
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={resultImage} 
              alt="Background removed result" 
              className="relative z-10 max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Corner Decorative Elements */}
            <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-[#2563eb]/30 rounded-tl-md" />
            <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-[#2563eb]/30 rounded-tr-md" />
            <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-[#2563eb]/30 rounded-bl-md" />
            <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#2563eb]/30 rounded-br-md" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button 
              onClick={handleDownload}
              className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-6 rounded-xl flex items-center space-x-2 transition-all shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(37,99,235,0.7)] text-base font-bold group transform hover:-translate-y-1"
            >
              <Download className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              <span>Download High-Res</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setResultImage(null)}
              className="w-full sm:w-auto border-[#27272a] hover:bg-[#18181b] text-[#a1a1aa] hover:text-white px-6 py-6 rounded-xl text-sm font-semibold transition-all"
            >
              Remove Another
            </Button>
          </div>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`
            relative group border-2 border-dashed rounded-[1.5rem] p-6 md:p-14 text-center cursor-pointer transition-all duration-500 overflow-hidden
            ${isDragActive ? 'border-[#2563eb] bg-[#2563eb]/5 scale-[0.99] shadow-[0_0_50px_-12px_rgba(37,99,235,0.3)]' : 'border-[#27272a] hover:border-[#2563eb]/50 bg-[#18181b]/40 hover:shadow-2xl hover:shadow-black/40'}
            ${isProcessing ? 'opacity-90 pointer-events-none' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {/* Animated Background Mesh */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#2563eb]/5 blur-[80px] rounded-full" />
          </div>

          {/* Scanning Animation for Processing */}
          {isProcessing && (
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[1.5rem]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent shadow-[0_0_15px_rgba(37,99,235,0.8)] animate-[scan_2s_linear_infinite]" />
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scan {
                  0% { top: 0%; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
              `}} />
            </div>
          )}
          
          <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
            {isProcessing ? (
              <div className="relative">
                <div className="absolute inset-0 bg-[#2563eb]/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative h-20 w-20 rounded-2xl bg-[#09090b] border border-[#2563eb]/30 flex items-center justify-center shadow-2xl">
                  <Loader2 className="h-8 w-8 text-[#2563eb] animate-spin" />
                </div>
              </div>
            ) : (
              <div className={`h-20 w-20 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3
                ${isDragActive ? 'bg-[#2563eb] rotate-3' : 'bg-[#09090b] border border-[#27272a] group-hover:border-[#2563eb]/40'}
              `}>
                <Upload className={`h-8 w-8 transition-colors duration-500
                  ${isDragActive ? 'text-white' : 'text-[#a1a1aa] group-hover:text-[#2563eb]'}
                `} />
              </div>
            )}
            
            <div className="space-y-1.5">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isProcessing ? 'AI is working...' : 'Upload your image'}
              </h3>
              <p className="text-[#a1a1aa] text-sm md:text-base max-w-sm mx-auto">
                {isProcessing 
                   ? 'Hold tight, we are separating the pixels with high precision.' 
                   : 'Drag & drop an image here, or click to browse'}
              </p>
            </div>
            
            {!isProcessing && (
              <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#18181b] border border-[#27272a] text-[10px] font-bold text-[#71717a] uppercase tracking-widest">PNG, JPG up to 10MB</span>
                <div className="h-1 w-1 rounded-full bg-[#3f3f46]" />
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#2563eb] uppercase tracking-widest">
                  <Cpu className="h-3 w-3" />
                  High-Precision Engine
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

  )
}
