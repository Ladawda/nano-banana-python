import React from 'react'
import { Settings } from 'lucide-react'

interface TopNavigationProps {
  title: string
  rightAction?: React.ReactNode
}

const TopNavigation: React.FC<TopNavigationProps> = ({ title, rightAction }) => {
  return (
    <header className="bg-hotswap-white dark:bg-hotswap-black border-b border-hotswap-border dark:border-hotswap-gray px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-hotswap-black dark:text-white">
          {title}
        </h1>
        {rightAction || (
          <button className="btn-icon">
            <Settings size={20} className="text-hotswap-gray" />
          </button>
        )}
      </div>
    </header>
  )
}

export default TopNavigation