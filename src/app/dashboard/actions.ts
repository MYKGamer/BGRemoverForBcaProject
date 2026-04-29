'use server'

import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function removeBackground(formData: FormData) {
  try {
    const file = formData.get('image') as File | null
    if (!file) {
      return { error: 'No image provided' }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    // 1. Check credits
    const { data: userData, error: userError } = await supabase
      .from('users_data')
      .select('credits')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return { error: 'Could not fetch user data' }
    }

    if (userData.credits <= 0) {
      return { error: 'Out of credits' }
    }

    // 2. Upload Original Image
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}-original.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('creations')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      return { error: 'Failed to upload original image' }
    }

    const originalUrl = supabase.storage.from('creations').getPublicUrl(fileName).data.publicUrl

    // 3. Call Clipdrop API
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
      const errorText = await response.text()
      console.error('Clipdrop Error:', response.status, errorText)
      return { error: 'Failed to process image with AI' }
    }

    const buffer = await response.arrayBuffer()
    const resultBlob = new Blob([buffer], { type: 'image/png' })
    const resultFile = new File([resultBlob], 'result.png', { type: 'image/png' })

    // 4. Upload Transparent Image
    const resultFileName = `${user.id}-${Date.now()}-transparent.png`

    const { error: resultUploadError } = await supabase.storage
      .from('creations')
      .upload(resultFileName, resultFile)

    if (resultUploadError) {
      console.error('Result Upload Error:', resultUploadError)
      return { error: 'Failed to upload processed image' }
    }

    const transparentUrl = supabase.storage.from('creations').getPublicUrl(resultFileName).data.publicUrl

    // 5. Save History
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
      // Continue anyway as the image is processed
    }

    // 6. Deduct Credit (Using Service Role via Admin Client)
    const { error: deductError } = await supabaseAdmin
      .rpc('decrement_credit', { user_id: user.id })

    // Fallback if RPC doesn't exist: use direct update with admin client
    if (deductError) {
      const { error: updateError } = await supabaseAdmin
        .from('users_data')
        .update({ credits: userData.credits - 1 })
        .eq('id', user.id)

      if (updateError) {
        console.error('Deduct Error:', updateError)
        return { error: 'Failed to deduct credit, but image processed' }
      }
    }

    revalidatePath('/dashboard')

    return { success: true, originalUrl, transparentUrl }
  } catch (error: unknown) {
    console.error('Server Action Error:', error)
    return { error: error instanceof Error ? error.message : 'An unexpected error occurred' }
  }
}
