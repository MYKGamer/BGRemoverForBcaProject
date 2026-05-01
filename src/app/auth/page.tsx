import { AuthForm } from './auth-form'
import Link from 'next/link'
import { ImageIcon, Loader2 } from 'lucide-react'
import { Suspense } from 'react'

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] p-4 relative">
      {/* Top Left Logo/Brand */}
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="flex items-center space-x-2 group transition-all"
        >
          <div className="h-10 w-10 rounded-xl bg-[#2563eb] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <ImageIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">BG<span className="text-[#2563eb]">Remover</span></span>
        </Link>
      </div>

      <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>}>
        <AuthForm />
      </Suspense>
    </main>
  )
}
