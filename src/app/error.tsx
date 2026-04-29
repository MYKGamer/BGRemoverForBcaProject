'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Website Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Animated Error Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
          <div className="relative bg-[#18181b] border border-red-500/20 p-6 rounded-3xl shadow-2xl">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white tracking-tight">Oops! Something went wrong</h1>
          <p className="text-[#a1a1aa] text-lg">
            Humne ek error detect kiya hai. Ho sakta hai server bohot zyada load mein ho ya connection slow ho.
          </p>
        </div>

        {/* Technical Hint (Subtle) */}
        <div className="p-4 bg-[#18181b] rounded-2xl border border-[#27272a] text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#3f3f46] mb-2">Error Details</p>
          <p className="text-xs font-mono text-[#71717a] break-all">
            {error.message || "An unexpected error occurred during the process."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => reset()}
            className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          
          <Button 
            variant="outline"
            asChild
            className="flex-1 border-[#27272a] hover:bg-[#18181b] text-white py-6 rounded-2xl text-lg transition-all"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>

        <p className="text-xs text-[#3f3f46] uppercase tracking-[0.1em]">
          BGRemover Recovery System v1.0
        </p>
      </div>
    </div>
  )
}
