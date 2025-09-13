import React from 'react'
import { Home, Shirt, Archive, Heart, User } from 'lucide-react'
import type { Screen } from '../App'

interface TabNavigationProps {
  currentScreen: Screen
  onScreenChange: (screen: Screen) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentScreen, onScreenChange }) => {
  const tabs = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'tryon' as Screen, icon: Shirt, label: 'Try-On' },
    { id: 'closet' as Screen, icon: Archive, label: 'Closet' },
    { id: 'wishlist' as Screen, icon: Heart, label: 'Wishlist' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' },
  ]

  return (
    <nav className="bg-hotswap-white dark:bg-hotswap-black border-t border-hotswap-border dark:border-hotswap-gray px-2 py-2">
      <div className="flex justify-around">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onScreenChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 min-h-[44px] ${
              currentScreen === id
                ? 'text-hotswap-blue'
                : 'text-hotswap-gray hover:text-hotswap-black dark:hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default TabNavigation