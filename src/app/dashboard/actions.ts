'use server'

import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function removeBackground(formData: FormData) {
  let uploadedOriginalPath = ''
  
  try {
    const file = formData.get('image') as File | null
    if (!file) {
      return { error: 'No image provided' }
    }

    // 1. Basic File Validation (Teacher check: Security & Performance)
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return { error: 'Image too large. Please upload an image smaller than 10MB.' }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    // 2. Check credits
    const { data: userData, error: userError } = await supabase
      .from('users_data')
      .select('credits')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return { error: 'Could not fetch user data' }
    }

    if (userData.credits <= 0) {
      return { error: 'Out of credits. Please top up to continue.' }
    }

    // 3. Upload Original Image
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}-original.${fileExt}`
    uploadedOriginalPath = fileName

    const { error: uploadError } = await supabase.storage
      .from('creations')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      return { error: 'Failed to upload image to storage' }
    }

    const originalUrl = supabase.storage.from('creations').getPublicUrl(fileName).data.publicUrl

    // 4. Call Clipdrop API
    const clipdropForm = new FormData()
    clipdropForm.append('image_file', file)

    const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY!,
      },
      body: clipdropForm,
    })

    if (!response.ok) {
      // CLEANUP: Delete the original image if AI fails
      await supabase.storage.from('creations').remove([fileName])
      
      const errorText = await response.text()
      console.error('Clipdrop Error:', response.status, errorText)
      return { error: 'AI processing failed. Please try again later.' }
    }

    const buffer = await response.arrayBuffer()
    const resultBlob = new Blob([buffer], { type: 'image/png' })
    const resultFile = new File([resultBlob], 'result.png', { type: 'image/png' })

    // 5. Upload Transparent Image
    const resultFileName = `${user.id}-${Date.now()}-transparent.png`

    const { error: resultUploadError } = await supabase.storage
      .from('creations')
      .upload(resultFileName, resultFile)

    if (resultUploadError) {
      // CLEANUP: Delete the original image if second upload fails
      await supabase.storage.from('creations').remove([fileName])
      console.error('Result Upload Error:', resultUploadError)
      return { error: 'Failed to save processed image' }
    }

    const transparentUrl = supabase.storage.from('creations').getPublicUrl(resultFileName).data.publicUrl

    // 6. Save History
    const { error: historyError } = await supabase
      .from('history')
      .insert({
        user_id: user.id,
        title: file.name,
        original_image_url: originalUrl,
        transparent_image_url: transparentUrl
      })

    if (historyError) {
      console.error('History Error:', historyError)
    }

    // 7. Deduct Credit (Using Service Role via Admin Client)
    const { error: deductError } = await supabaseAdmin
      .rpc('decrement_credit', { user_id: user.id })

    if (deductError) {
      const { error: updateError } = await supabaseAdmin
        .from('users_data')
        .update({ credits: Math.max(0, userData.credits - 1) })
        .eq('id', user.id)

      if (updateError) {
        console.error('Deduct Error:', updateError)
      }
    }

    revalidatePath('/dashboard')
    return { success: true, originalUrl, transparentUrl }

  } catch (error: unknown) {
    // FINAL CLEANUP: Ensure no junk files if an unexpected error occurs
    if (uploadedOriginalPath) {
      const supabase = await createClient()
      await supabase.storage.from('creations').remove([uploadedOriginalPath])
    }
    
    console.error('Server Action Error:', error)
    return { error: 'An unexpected system error occurred' }
  }
}
