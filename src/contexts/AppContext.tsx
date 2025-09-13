import React, { createContext, useContext, useState } from 'react'

interface UserProfile {
  id: string
  name: string
  bodyImage?: string
  measurements?: {
    height: string
    size: string
  }
}

interface GarmentItem {
  id: string
  name: string
  category: string
  image: string
  brand?: string
  price?: string
  isWishlisted: boolean
}

interface AppContextType {
  userProfile: UserProfile | null
  setUserProfile: (profile: UserProfile) => void
  garments: GarmentItem[]
  addGarment: (garment: GarmentItem) => void
  toggleWishlist: (garmentId: string) => void
  wishlistItems: GarmentItem[]
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [garments, setGarments] = useState<GarmentItem[]>([
    {
      id: '1',
      name: 'Classic White Tee',
      category: 'Tops',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Essential Co.',
      price: '$29',
      isWishlisted: false
    },
    {
      id: '2',
      name: 'Denim Jacket',
      category: 'Outerwear',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Urban Style',
      price: '$89',
      isWishlisted: true
    },
    {
      id: '3',
      name: 'Black Dress',
      category: 'Dresses',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Chic Boutique',
      price: '$125',
      isWishlisted: false
    }
  ])

  const addGarment = (garment: GarmentItem) => {
    setGarments(prev => [...prev, garment])
  }

  const toggleWishlist = (garmentId: string) => {
    setGarments(prev => 
      prev.map(garment => 
        garment.id === garmentId 
          ? { ...garment, isWishlisted: !garment.isWishlisted }
          : garment
      )
    )
  }

  const wishlistItems = garments.filter(garment => garment.isWishlisted)

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