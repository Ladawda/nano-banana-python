import React from 'react'

interface MobileContainerProps {
  children: React.ReactNode
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-hotswap-silver dark:bg-hotswap-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-screen max-h-[800px] bg-hotswap-white dark:bg-hotswap-black rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        {/* Status bar simulation */}
        <div className="h-11 bg-hotswap-white dark:bg-hotswap-black flex items-center justify-center relative">
          <div className="absolute left-6 text-sm font-medium text-hotswap-black dark:text-white">
            9:41
          </div>
          <div className="absolute right-6 flex items-center space-x-1">
            <div className="w-6 h-3 border border-hotswap-black dark:border-white rounded-sm">
              <div className="w-4 h-1.5 bg-hotswap-black dark:bg-white rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  )
}

export default MobileContainer