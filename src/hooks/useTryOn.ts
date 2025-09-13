import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { TryOnSession } from '../lib/supabase'

export const useTryOn = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTryOnSession = async (
    bodyImageUrl: string,
    garmentImages: string[],
    prompt?: string
  ): Promise<TryOnSession | null> => {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Create try-on session in database
      const { data: session, error: sessionError } = await supabase
        .from('try_on_sessions')
        .insert({
          user_id: user.id,
          body_image_url: bodyImageUrl,
          garment_images: garmentImages,
          prompt: prompt || '',
          status: 'pending'
        })
        .select()
        .single()

      if (sessionError) {
        throw sessionError
      }

      // Call edge function to generate image
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-tryon',
        {
          body: {
            sessionId: session.id,
            bodyImageUrl,
            garmentImages,
            prompt
          }
        }
      )

      if (functionError) {
        throw functionError
      }

      if (!functionData.success) {
        throw new Error(functionData.error || 'Failed to generate try-on image')
      }

      // Return updated session
      const { data: updatedSession, error: fetchError } = await supabase
        .from('try_on_sessions')
        .select('*')
        .eq('id', session.id)
        .single()

      if (fetchError) {
        throw fetchError
      }

      return updatedSession

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTryOnSession = async (sessionId: string): Promise<TryOnSession | null> => {
    try {
      const { data, error } = await supabase
        .from('try_on_sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (err) {
      console.error('Error fetching try-on session:', err)
      return null
    }
  }

  const getUserTryOnSessions = async (): Promise<TryOnSession[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data, error } = await supabase
        .from('try_on_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (err) {
      console.error('Error fetching user try-on sessions:', err)
      return []
    }
  }

  return {
    loading,
    error,
    createTryOnSession,
    getTryOnSession,
    getUserTryOnSessions,
  }
}