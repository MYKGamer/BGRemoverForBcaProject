'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function extractFilenameFromUrl(url: string) {
  // URLs look like: https://[project].supabase.co/storage/v1/object/public/creations/filename.png
  const parts = url.split('/')
  return parts[parts.length - 1]
}

export async function deleteHistoryItem(id: string, originalUrl: string, transparentUrl: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    // Extract filenames
    const originalFilename = extractFilenameFromUrl(originalUrl)
    const transparentFilename = extractFilenameFromUrl(transparentUrl)

    // 1. Delete from Storage FIRST
    const { error: storageError } = await supabase.storage
      .from('creations')
      .remove([originalFilename, transparentFilename])

    if (storageError) {
      console.error('Failed to delete files from storage:', storageError)
      return { error: 'Failed to delete files from storage' }
    }

    // 2. THEN Delete from Database
    const { error: dbError } = await supabase
      .from('history')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user owns it

    if (dbError) {
      console.error('Failed to delete history record:', dbError)
      return { error: 'Failed to delete history record' }
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: unknown) {
    console.error('Server Action Error:', error)
    return { error: error instanceof Error ? error.message : 'An unexpected error occurred' }
  }
}

export async function renameHistoryItem(id: string, newTitle: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    if (!newTitle || newTitle.trim() === '') {
      return { error: 'Title cannot be empty' }
    }

    const { error } = await supabase
      .from('history')
      .update({ title: newTitle.trim() })
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Failed to rename item:', error)
      return { error: 'Failed to rename item' }
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: unknown) {
    console.error('Server Action Error:', error)
    return { error: error instanceof Error ? error.message : 'An unexpected error occurred' }
  }
}
