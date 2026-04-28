import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '../auth/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-[#fafafa] p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to BGRemover AI</h1>
        <p className="text-[#a1a1aa] text-lg">
          Hello, <span className="text-white font-medium">{user.email}</span>. Your professional background removal workspace is ready.
        </p>
        <div className="pt-4">
          <form action={signOut}>
            <Button variant="outline" className="border-[#27272a] hover:bg-[#27272a] text-[#fafafa]">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
