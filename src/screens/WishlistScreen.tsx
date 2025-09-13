import React from 'react'
import { Heart, ShoppingBag, ExternalLink } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const WishlistScreen: React.FC = () => {
  const { wishlistItems, toggleWishlist } = useApp()

  if (wishlistItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-hotswap-silver dark:bg-hotswap-gray rounded-full flex items-center justify-center mb-6">
          <Heart size={32} className="text-hotswap-gray" />
        </div>
        <h3 className="text-xl font-bold text-hotswap-black dark:text-white mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-hotswap-gray mb-6">
          Start adding items you love to keep track of them
        </p>
        <button className="btn-primary">
          Discover Items
        </button>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <p className="text-hotswap-gray">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="space-y-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="card p-4">
            <div className="flex items-start space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-hotswap-black dark:text-white">
                      {item.name}
                    </h4>
                    {item.brand && (
                      <p className="text-hotswap-gray text-sm">{item.brand}</p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="btn-icon p-2"
                  >
                    <Heart
                      size={20}
                      className="text-hotswap-pink fill-current"
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-hotswap-blue font-medium">{item.price}</p>
                    <p className="text-hotswap-gray text-xs">{item.category}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm py-2 px-3">
                      Try On
                    </button>
                    <button className="btn-primary text-sm py-2 px-3">
                      <ShoppingBag size={16} className="mr-1" />
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping Tips */}
      <div className="mt-8 card p-4 bg-gradient-to-r from-hotswap-blue/10 to-hotswap-pink/10">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-hotswap-blue rounded-full flex items-center justify-center flex-shrink-0">
            <ExternalLink size={16} className="text-white" />
          </div>
          <div>
            <h4 className="font-medium text-hotswap-black dark:text-white mb-1">
              Smart Shopping Tip
            </h4>
            <p className="text-hotswap-gray text-sm">
              Try on items virtually before purchasing to make sure they're perfect for you! 💫
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistScreen