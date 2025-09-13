import React, { createContext, useContext, useState } from 'react'
import { Profile, Garment } from '../lib/supabase'

interface AppContextType {
  userProfile: Profile | null
  setUserProfile: (profile: Profile) => void
  garments: Garment[]
  addGarment: (garment: Garment) => void
  toggleWishlist: (garmentId: string) => void
  wishlistItems: Garment[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [garments, setGarments] = useState<Garment[]>([
    {
      id: '1',
      user_id: 'demo',
      name: 'Classic White Tee',
      category: 'Tops',
      image_url: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Essential Co.',
      price: '$29',
      is_wishlisted: false,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      user_id: 'demo',
      name: 'Denim Jacket',
      category: 'Outerwear',
      image_url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Urban Style',
      price: '$89',
      is_wishlisted: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      user_id: 'demo',
      name: 'Black Dress',
      category: 'Dresses',
      image_url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Chic Boutique',
      price: '$125',
      is_wishlisted: false,
      created_at: new Date().toISOString()
    }
  ])

  const addGarment = (garment: Garment) => {
    setGarments(prev => [...prev, garment])
  }

  const toggleWishlist = (garmentId: string) => {
    setGarments(prev => 
      prev.map(garment => 
        garment.id === garmentId 
          ? { ...garment, is_wishlisted: !garment.is_wishlisted }
          : garment
      )
    )
  }

  const wishlistItems = garments.filter(garment => garment.is_wishlisted)

  return (
    <AppContext.Provider value={{
      userProfile,
      setUserProfile,
      garments,
      addGarment,
      toggleWishlist,
      wishlistItems
    }}>
      {children}
    </AppContext.Provider>
  )
}