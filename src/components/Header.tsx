'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Sparkles, Brain, Settings, Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">
              🎵 SoundType
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link 
              href="/explore" 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Explore</span>
            </Link>
            <Link 
              href="/mbti" 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">My MBTI</span>
            </Link>
            <Link 
              href="/settings" 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Profile Picture */}
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-200">
              <Image
                src="/images/profile.jpg"
                alt="Sarah"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
