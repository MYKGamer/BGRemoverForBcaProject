import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardShell } from './dashboard-shell'

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
    <DashboardShell 
      user={user} 
      credits={credits} 
      historyItems={items} 
    />
  )
}
