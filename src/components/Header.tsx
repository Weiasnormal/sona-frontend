'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    
    if (path === '/Home') {
      const personalityType = localStorage.getItem('personalityType')
      const quizInProgress = localStorage.getItem('quizInProgress')
      
      // Always show welcome page first if not completed quiz
      if (!personalityType) {
        // Save current path to return after welcome
        if (window.location.pathname !== '/welcome') {
          localStorage.setItem('returnPath', window.location.pathname)
        }
        router.push('/welcome')
      } else {
        // If quiz is completed, go directly to home
        router.push('/Home')
      }
    } else {
      router.push(path)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const personalityType = localStorage.getItem('personalityType')
    
    if (personalityType) {
      // If quiz is completed, go to home
      router.push('/Home')
    } else {
      // If quiz is not completed, show welcome page
      router.push('/welcome')
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg shadow-sm dark:border-transparent dark:shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.1)]">
        <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/welcome"
            onClick={handleLogoClick}
            className="flex items-center gap-2 z-20"
          >
            <Image 
              src="/images/Sona.png" 
              alt="Sona Logo" 
              width={36} 
              height={36} 
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
              priority
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold">Sona</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              href="/Home" 
              onClick={(e) => handleNavigation(e, '/Home')}
              className="text-sm lg:text-base font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/mbti-selection" 
              className="text-sm lg:text-base font-medium hover:text-primary transition-colors"
            >
              Discover Music
            </Link>            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {mounted ? (
                theme === 'dark' ? 
                  <Sun className="h-5 w-5" /> : 
                  <Moon className="h-5 w-5" />
              ) : (
                <div className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-colors backdrop-blur-sm"
              aria-label="Toggle dark mode"
            >
              {mounted ? (
                theme === 'dark' ? 
                  <Sun className="h-5 w-5" /> : 
                  <Moon className="h-5 w-5" />
              ) : (
                <div className="h-5 w-5" />
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-colors backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? 
                <X className="h-5 w-5" /> : 
                <Menu className="h-5 w-5" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-2/3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900 shadow-lg transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-2.5 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col py-6">
          <Link 
            href="/Home" 
            onClick={(e) => {
              handleNavigation(e, '/Home')
              setIsMenuOpen(false)
            }}
            className="px-6 py-3 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/mbti-selection" 
            onClick={() => setIsMenuOpen(false)}
            className="px-6 py-3 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Discover Music
          </Link>             
        </nav>
      </div>

      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } z-40`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14 sm:h-16 md:h-[60px]" />
    </>
  )
}
