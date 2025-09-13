import React from 'react'
import { Sparkles, TrendingUp, Heart } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const HomeScreen: React.FC = () => {
  const { garments, toggleWishlist } = useApp()

  const trendingLooks = [
    {
      id: '1',
      title: 'Summer Vibes',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 234
    },
    {
      id: '2',
      title: 'Street Style',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 189
    },
    {
      id: '3',
      title: 'Office Chic',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 156
    }
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-hotswap-blue to-hotswap-pink p-6 text-white">
        <div className="flex items-center mb-4">
          <Sparkles size={24} className="mr-2" />
          <h2 className="text-xl font-bold">Ready to slay? ✨</h2>
        </div>
        <p className="text-white/90 mb-6">
          Discover trending looks and try them on instantly
        </p>
        <button className="bg-white text-hotswap-blue font-medium py-3 px-6 rounded-xl">
          Start Trying On
        </button>
      </div>

      {/* Trending Looks */}
      <div className="p-6">
        <div className="flex items-center mb-4">
          <TrendingUp size={20} className="text-hotswap-pink mr-2" />
          <h3 className="text-lg font-bold text-hotswap-black dark:text-white">
            Trending Looks
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {trendingLooks.map((look) => (
            <div key={look.id} className="card overflow-hidden">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-hotswap-black dark:text-white mb-1">
                  {look.title}
                </h4>
                <div className="flex items-center text-hotswap-gray text-sm">
                  <Heart size={14} className="mr-1" />
                  {look.likes}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Items */}
        <h3 className="text-lg font-bold text-hotswap-black dark:text-white mb-4">
          Featured Items
        </h3>
        
        <div className="space-y-4">
          {garments.slice(0, 3).map((garment) => (
            <div key={garment.id} className="card p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={garment.image}
                  alt={garment.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-hotswap-black dark:text-white">
                    {garment.name}
                  </h4>
                  <p className="text-hotswap-gray text-sm">{garment.brand}</p>
                  <p className="text-hotswap-blue font-medium">{garment.price}</p>
                </div>
                <button
                  onClick={() => toggleWishlist(garment.id)}
                  className="btn-icon"
                >
                  <Heart
                    size={20}
                    className={garment.isWishlisted ? 'text-hotswap-pink fill-current' : 'text-hotswap-gray'}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen