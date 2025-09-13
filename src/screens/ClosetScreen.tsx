import React, { useState } from 'react'
import { User, Shirt, Plus, Filter } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const ClosetScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'garments'>('profiles')
  const { userProfile, garments } = useApp()

  const bodyProfiles = [
    {
      id: '1',
      name: 'Main Profile',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
      measurements: '5\'6", Size M',
      isActive: true
    }
  ]

  const savedOutfits = [
    {
      id: '1',
      name: 'Casual Friday',
      items: ['White Tee', 'Denim Jacket'],
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=200',
      createdAt: '2 days ago'
    },
    {
      id: '2',
      name: 'Date Night',
      items: ['Black Dress'],
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200',
      createdAt: '1 week ago'
    }
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Tab Navigation */}
      <div className="bg-hotswap-white dark:bg-hotswap-black px-6 py-4">
        <div className="flex bg-hotswap-silver dark:bg-hotswap-dark-gray rounded-xl p-1">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-all ${
              activeTab === 'profiles'
                ? 'bg-white dark:bg-hotswap-charcoal text-hotswap-black dark:text-white font-medium'
                : 'text-hotswap-gray'
            }`}
          >
            <User size={16} className="mr-2" />
            Profiles
          </button>
          <button
            onClick={() => setActiveTab('garments')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-all ${
              activeTab === 'garments'
                ? 'bg-white dark:bg-hotswap-charcoal text-hotswap-black dark:text-white font-medium'
                : 'text-hotswap-gray'
            }`}
          >
            <Shirt size={16} className="mr-2" />
            Garments
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'profiles' ? (
          <div className="space-y-6">
            {/* Body Profiles */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-hotswap-black dark:text-white">
                  Body Profiles
                </h3>
                <button className="btn-icon">
                  <Plus size={20} className="text-hotswap-blue" />
                </button>
              </div>
              
              <div className="space-y-3">
                {bodyProfiles.map((profile) => (
                  <div key={profile.id} className="card p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="w-16 h-20 object-cover rounded-xl"
                        />
                        {profile.isActive && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-hotswap-green rounded-full border-2 border-white dark:border-hotswap-black"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-hotswap-black dark:text-white">
                          {profile.name}
                        </h4>
                        <p className="text-hotswap-gray text-sm">{profile.measurements}</p>
                        {profile.isActive && (
                          <span className="text-hotswap-green text-xs font-medium">Active</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Outfits */}
            <div>
              <h3 className="text-lg font-bold text-hotswap-black dark:text-white mb-4">
                Saved Outfits
              </h3>
              
              <div className="space-y-3">
                {savedOutfits.map((outfit) => (
                  <div key={outfit.id} className="card p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-hotswap-black dark:text-white">
                          {outfit.name}
                        </h4>
                        <p className="text-hotswap-gray text-sm">
                          {outfit.items.join(' + ')}
                        </p>
                        <p className="text-hotswap-gray text-xs">{outfit.createdAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-hotswap-black dark:text-white">
                My Garments
              </h3>
              <button className="btn-icon">
                <Filter size={20} className="text-hotswap-gray" />
              </button>
            </div>

            {/* Garments Grid */}
            <div className="grid grid-cols-2 gap-4">
              {garments.map((garment) => (
                <div key={garment.id} className="card overflow-hidden">
                  <img
                    src={garment.image_url}
                    alt={garment.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-medium text-hotswap-black dark:text-white text-sm">
                      {garment.name}
                    </h4>
                    <p className="text-hotswap-gray text-xs">{garment.category}</p>
                    {garment.brand && (
                      <p className="text-hotswap-gray text-xs">{garment.brand}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add New Garment */}
              <button className="card h-48 flex flex-col items-center justify-center text-hotswap-gray border-2 border-dashed border-hotswap-border dark:border-hotswap-gray">
                <Plus size={24} className="mb-2" />
                <span className="text-sm">Add Garment</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClosetScreen