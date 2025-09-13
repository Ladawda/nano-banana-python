import React, { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppProvider } from './contexts/AppContext'
import MobileContainer from './components/MobileContainer'
import TabNavigation from './components/TabNavigation'
import TopNavigation from './components/TopNavigation'
import HomeScreen from './screens/HomeScreen'
import TryOnScreen from './screens/TryOnScreen'
import ClosetScreen from './screens/ClosetScreen'
import WishlistScreen from './screens/WishlistScreen'
import ProfileScreen from './screens/ProfileScreen'
import OnboardingScreen from './screens/OnboardingScreen'

export type Screen = 'home' | 'tryon' | 'closet' | 'wishlist' | 'profile' | 'onboarding'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding')
  const [isOnboarded, setIsOnboarded] = useState(false)

  const handleOnboardingComplete = () => {
    setIsOnboarded(true)
    setCurrentScreen('home')
  }

  const renderScreen = () => {
    if (!isOnboarded && currentScreen === 'onboarding') {
      return <OnboardingScreen onComplete={handleOnboardingComplete} />
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen />
      case 'tryon':
        return <TryOnScreen />
      case 'closet':
        return <ClosetScreen />
      case 'wishlist':
        return <WishlistScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Discover'
      case 'tryon':
        return 'Try-On'
      case 'closet':
        return 'My Closet'
      case 'wishlist':
        return 'Wishlist'
      case 'profile':
        return 'Profile'
      default:
        return 'HotSwap'
    }
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <MobileContainer>
          {isOnboarded && currentScreen !== 'onboarding' && (
            <TopNavigation title={getScreenTitle()} />
          )}
          
          <main className="flex-1 overflow-hidden">
            {renderScreen()}
          </main>
          
          {isOnboarded && currentScreen !== 'onboarding' && (
            <TabNavigation 
              currentScreen={currentScreen} 
              onScreenChange={setCurrentScreen} 
            />
          )}
        </MobileContainer>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App