import React, { useState } from 'react'
import { Camera, Upload, ArrowRight } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

interface OnboardingScreenProps {
  onComplete: () => void
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [height, setHeight] = useState('')
  const [size, setSize] = useState('')
  const { setUserProfile } = useApp()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      setUserProfile({
        id: '1',
        name,
        height,
        size,
        body_image_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      onComplete()
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-8">👗</div>
            <h1 className="text-3xl font-bold text-hotswap-black dark:text-white mb-4">
              Welcome to HotSwap
            </h1>
            <p className="text-hotswap-gray text-lg leading-relaxed">
              Try on clothes virtually before you buy. Ready to revolutionize your shopping? ✨
            </p>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-hotswap-black dark:text-white mb-2">
                Tell us about yourself
              </h2>
              <p className="text-hotswap-gray">
                This helps us create better fits for you
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              
              <input
                type="text"
                placeholder={`Height (e.g., 5'6")`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input-field"
              />
              
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="input-field"
              >
                <option value="">Select your size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-hotswap-black dark:text-white mb-2">
                Upload your body photo
              </h2>
              <p className="text-hotswap-gray">
                Take a full-body photo for the best try-on experience
              </p>
            </div>
            
            <div className="card p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-hotswap-silver dark:bg-hotswap-gray rounded-full flex items-center justify-center mx-auto">
                <Camera size={32} className="text-hotswap-gray" />
              </div>
              
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  <Camera size={20} className="mr-2" />
                  Take Photo
                </button>
                
                <button className="btn-secondary w-full">
                  <Upload size={20} className="mr-2" />
                  Upload from Gallery
                </button>
              </div>
              
              <p className="text-xs text-hotswap-gray">
                Your photos are private and secure
              </p>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return true
      case 2:
        return name.trim() && height.trim() && size
      case 3:
        return true // In real app, check if photo is uploaded
      default:
        return false
    }
  }

  return (
    <div className="flex-1 flex flex-col p-6">
      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i <= step ? 'bg-hotswap-blue' : 'bg-hotswap-border dark:bg-hotswap-gray'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {renderStep()}
      </div>

      <div className="pt-6">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full flex items-center justify-center ${
            canProceed() ? 'btn-primary' : 'bg-hotswap-border text-hotswap-gray cursor-not-allowed'
          }`}
        >
          {step === 3 ? 'Get Started' : 'Continue'}
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  )
}

export default OnboardingScreen