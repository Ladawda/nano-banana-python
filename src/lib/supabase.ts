import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Profile {
  id: string
  name: string
  height: string
  size: string
  body_image_url: string
  created_at: string
  updated_at: string
}

export interface Garment {
  id: string
  user_id: string
  name: string
  category: string
  brand: string
  price: string
  image_url: string
  is_wishlisted: boolean
  created_at: string
}

export interface TryOnSession {
  id: string
  user_id: string
  body_image_url: string
  garment_images: string[]
  prompt: string
  result_image_url: string | null
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}