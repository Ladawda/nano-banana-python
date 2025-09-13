import React from 'react'
import { 
  User, 
  Settings, 
  Moon, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Edit
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useApp } from '../contexts/AppContext'

const ProfileScreen: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const { userProfile } = useApp()

  const menuItems = [
    {
      icon: Settings,
      label: 'Account Settings',
      action: () => console.log('Account Settings')
    },
    {
      icon: Bell,
      label: 'Notifications',
      action: () => console.log('Notifications')
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      action: () => console.log('Privacy')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      action: () => console.log('Help')
    }
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-hotswap-blue to-hotswap-pink p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">
              {userProfile?.name || 'Fashion Lover'}
            </h2>
            <p className="text-white/90">
              {userProfile?.measurements?.height || 'Complete your profile'}
            </p>
            <p className="text-white/90 text-sm">
              Size {userProfile?.measurements?.size || 'Not set'}
            </p>
          </div>
          <button className="btn-icon">
            <Edit size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 bg-hotswap-white dark:bg-hotswap-black">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-hotswap-black dark:text-white">12</div>
            <div className="text-hotswap-gray text-sm">Try-Ons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-hotswap-black dark:text-white">5</div>
            <div className="text-hotswap-gray text-sm">Saved Looks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-hotswap-black dark:text-white">8</div>
            <div className="text-hotswap-gray text-sm">Wishlist</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-2">
        {/* Dark Mode Toggle */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon size={20} className="text-hotswap-gray" />
              <span className="font-medium text-hotswap-black dark:text-white">
                Dark Mode
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isDark ? 'bg-hotswap-blue' : 'bg-hotswap-border dark:bg-hotswap-gray'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Other Menu Items */}
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="card p-4 w-full text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <item.icon size={20} className="text-hotswap-gray" />
                <span className="font-medium text-hotswap-black dark:text-white">
                  {item.label}
                </span>
              </div>
              <ChevronRight size={16} className="text-hotswap-gray" />
            </div>
          </button>
        ))}

        {/* Logout */}
        <button className="card p-4 w-full text-left">
          <div className="flex items-center space-x-3">
            <LogOut size={20} className="text-hotswap-red" />
            <span className="font-medium text-hotswap-red">
              Sign Out
            </span>
          </div>
        </button>
      </div>

      {/* App Info */}
      <div className="p-6 text-center">
        <p className="text-hotswap-gray text-sm">
          HotSwap v1.0.0
        </p>
        <p className="text-hotswap-gray text-xs mt-1">
          Made with ✨ for fashion lovers
        </p>
      </div>
    </div>
  )
}

export default ProfileScreen