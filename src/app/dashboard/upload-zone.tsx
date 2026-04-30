'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Loader2, Image as ImageIcon, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { removeBackground } from './actions'
import { toast } from 'sonner'

export function UploadZone() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)

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

    setIsProcessing(true)
    setResultImage(null)
    toast.loading('Processing image...', { id: 'processing-toast' })

    const formData = new FormData()
    formData.append('image', file)

    try {
      const result = await removeBackground(formData)

      if (result.error) {
        toast.error(result.error, { id: 'processing-toast' })
      } else if (result.success && result.transparentUrl) {
        toast.success('Background removed successfully!', { id: 'processing-toast' })
        setResultImage(result.transparentUrl)
      }
    } catch {
      toast.error('An unexpected error occurred', { id: 'processing-toast' })
    } finally {
      setIsProcessing(false)
    }
  }, [])

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

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      {resultImage ? (
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-8 text-center shadow-xl space-y-6">
          <h3 className="text-xl font-medium text-white">Result</h3>
          <div className="relative w-full aspect-video flex items-center justify-center bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-[#09090b] rounded-lg border border-[#27272a] overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={resultImage} 
              alt="Background removed result" 
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={handleDownload}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-6 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-blue-500/20 text-base font-semibold group"
            >
              <Download className="h-5 w-5 group-hover:translate-y-[1px] transition-transform" />
              <span>Download Image</span>
            </Button>
            
            <button 
              onClick={() => setResultImage(null)}
              className="text-[#a1a1aa] hover:text-white transition-colors text-sm px-4 py-2"
            >
              Upload another image
            </button>
          </div>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`
            relative group border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? 'border-[#2563eb] bg-[#2563eb]/5' : 'border-[#27272a] hover:border-[#2563eb] bg-[#18181b]'}
            ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center justify-center space-y-4">
            {isProcessing ? (
              <div className="h-16 w-16 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-[#2563eb] animate-spin" />
              </div>
            ) : (
              <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors
                ${isDragActive ? 'bg-[#2563eb]/20' : 'bg-[#27272a] group-hover:bg-[#2563eb]/10'}
              `}>
                <Upload className={`h-8 w-8 transition-colors
                  ${isDragActive ? 'text-[#2563eb]' : 'text-[#a1a1aa] group-hover:text-[#2563eb]'}
                `} />
              </div>
            )}
            
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-[#fafafa]">
                {isProcessing ? 'Removing Background...' : 'Drop your image here'}
              </h3>
              <p className="text-sm text-[#a1a1aa]">
                {isProcessing 
                  ? 'This usually takes a few seconds.' 
                  : 'or click to browse from your computer'}
              </p>
            </div>
            
            {!isProcessing && (
              <div className="pt-4 flex items-center justify-center space-x-2 text-xs text-[#52525b]">
                <ImageIcon className="h-4 w-4" />
                <span>Supports JPG, PNG, WEBP (Max 10MB)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
