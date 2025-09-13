import React, { useState } from 'react'
import { Camera, Upload, Sparkles, RotateCcw } from 'lucide-react'
import { useTryOn } from '../hooks/useTryOn'
import { useApp } from '../contexts/AppContext'

const TryOnScreen: React.FC = () => {
  const [selectedBody, setSelectedBody] = useState<string | null>(null)
  const [selectedGarment, setSelectedGarment] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null)
  
  const { createTryOnSession, loading } = useTryOn()
  const { userProfile, garments } = useApp()

  const bodyProfiles = [
    {
      id: '1',
      name: 'Main Profile',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
      isActive: true
    }
  ]

  const garmentOptions = [
    {
      id: '1',
      name: 'Classic White Tee',
      image_url: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Tops'
    },
    {
      id: '2',
      name: 'Denim Jacket',
      image_url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Outerwear'
    },
    {
      id: '3',
      name: 'Black Dress',
      image_url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Dresses'
    }
  ]

  const handleTryOn = async () => {
    if (selectedBody && selectedGarment) {
      const bodyProfile = bodyProfiles.find(p => p.id === selectedBody)
      const garment = garmentOptions.find(g => g.id === selectedGarment)
      
      if (bodyProfile && garment) {
        const session = await createTryOnSession(
          bodyProfile.image,
          [garment.image_url],
          "Create a professional quality studio shoot showing the person wearing the garment with better lighting and depth of field."
        )
        
        if (session?.result_image_url) {
          setResultImageUrl(session.result_image_url)
          setShowResult(true)
        }
      }
    }
  }

  const resetTryOn = () => {
    setShowResult(false)
    setSelectedGarment(null)
  }

  if (showResult) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Result View */}
        <div className="flex-1 bg-hotswap-silver dark:bg-hotswap-charcoal p-6">
          <div className="card h-full flex flex-col items-center justify-center">
            <div className="relative">
              <img
                src={resultImageUrl || "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=400"}
                alt="Try-on result"
                className="w-48 h-64 object-cover rounded-2xl"
              />
              <div className="absolute top-4 right-4">
                <div className="badge">
                  <Sparkles size={12} className="mr-1" />
                  AI Generated
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <h3 className="text-lg font-bold text-hotswap-black dark:text-white mb-2">
                Looking fabulous! 🔥
              </h3>
              <p className="text-hotswap-gray">
                How does this look feel to you?
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <button className="btn-primary w-full">
            Save to Closet
          </button>
          <button className="btn-secondary w-full">
            Share Look
          </button>
          <button
            onClick={resetTryOn}
            className="btn-secondary w-full"
          >
            <RotateCcw size={20} className="mr-2" />
            Try Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Body Selection */}
      <div>
        <h3 className="text-lg font-bold text-hotswap-black dark:text-white mb-4">
          Select Body Profile
        </h3>
        
        <div className="flex space-x-4">
          {bodyProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedBody(profile.id)}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                selectedBody === profile.id
                  ? 'ring-2 ring-hotswap-blue'
                  : 'opacity-70'
              }`}
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-20 h-28 object-cover"
              />
              {profile.isActive && (
                <div className="absolute top-2 left-2">
                  <div className="w-2 h-2 bg-hotswap-green rounded-full"></div>
                </div>
              )}
            </button>
          ))}
          
          <button className="w-20 h-28 border-2 border-dashed border-hotswap-border dark:border-hotswap-gray rounded-2xl flex flex-col items-center justify-center text-hotswap-gray">
            <Camera size={20} className="mb-1" />
            <span className="text-xs">Add</span>
          </button>
        </div>
      </div>

      {/* Garment Selection */}
      <div>
        <h3 className="text-lg font-bold text-hotswap-black dark:text-white mb-4">
          Choose Garment
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {garmentOptions.map((garment) => (
            <button
              key={garment.id}
              onClick={() => setSelectedGarment(garment.id)}
              className={`card p-4 text-left transition-all ${
                selectedGarment === garment.id
                  ? 'ring-2 ring-hotswap-blue'
                  : ''
              }`}
            >
              <img
                src={garment.image_url}
                alt={garment.name}
                className="w-full h-24 object-cover rounded-xl mb-3"
              />
              <h4 className="font-medium text-hotswap-black dark:text-white text-sm">
                {garment.name}
              </h4>
              <p className="text-hotswap-gray text-xs">{garment.category}</p>
            </button>
          ))}
        </div>
        
        <button className="btn-secondary w-full">
          <Upload size={20} className="mr-2" />
          Upload New Garment
        </button>
      </div>

      {/* Try-On Button */}
      <div className="pt-4">
        <button
          onClick={handleTryOn}
          disabled={!selectedBody || !selectedGarment}
          className={`w-full flex items-center justify-center ${
            selectedBody && selectedGarment && !loading
              ? 'btn-primary'
              : 'bg-hotswap-border text-hotswap-gray cursor-not-allowed'
          }`}
        >
          <Sparkles size={20} className="mr-2" />
          {loading ? 'Generating...' : 'Try It On!'}
        </button>
      </div>
    </div>
  )
}

export default TryOnScreen
          className={`w-full flex items-center justify-center ${
            selectedBody && selectedGarment
              ? 'btn-primary'
              : 'bg-hotswap-border text-hotswap-gray cursor-not-allowed'
          }`}
        >
          <Sparkles size={20} className="mr-2" />
          Try It On!
        </button>
      </div>
    </div>
  )
}

export default TryOnScreen