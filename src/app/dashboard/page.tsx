import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '../auth/actions'
import { UploadZone } from './upload-zone'
import { HistoryGrid } from './history-grid'
import { Zap } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Fetch user credits
  const { data: userData } = await supabase
    .from('users_data')
    .select('credits')
    .eq('id', user.id)
    .single()

  const credits = userData?.credits ?? 0

  // Fetch user history
  const { data: historyItems, error: historyError } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const items = historyItems || []

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur supports-[backdrop-filter]:bg-[#09090b]/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white tracking-tight">BGRemover</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#2563eb]/20 text-[#2563eb] font-medium border border-[#2563eb]/30">PRO</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#18181b] border border-[#27272a]">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-[#fafafa]">{credits} Credits</span>
            </div>
            <form action={signOut}>
              <Button variant="ghost" size="sm" className="text-[#a1a1aa] hover:text-white hover:bg-[#27272a]">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center max-w-2xl w-full space-y-4 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Remove Backgrounds <span className="text-[#2563eb]">Instantly</span>
          </h1>
          <p className="text-lg text-[#a1a1aa]">
            Upload an image and let our AI do the heavy lifting in seconds.
          </p>
        </div>

        <UploadZone />
        
        {/* History Section */}
        <div className="w-full max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#27272a] pb-4">
            Your Creations
          </h2>
          <HistoryGrid initialItems={items} />
        </div>
      </main>
    </div>
  )
}
