'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Compass, Brain, Settings, Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-blue-600">🎵</span>
            <span className="text-lg font-medium">SoundType</span>
          </Link>

          {/* Center Navigation */}
          <nav className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              href="/explore" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <Compass size={20} />
              <span>Explore</span>
            </Link>
            <Link 
              href="/mbti" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <Brain size={20} />
              <span>My MBTI</span>
            </Link>
            <Link 
              href="/settings" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 hover:text-blue-600"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Sarah"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
