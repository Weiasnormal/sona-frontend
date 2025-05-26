'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-transparent dark:shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.1)]">
        <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-20">
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
            <Link href="/Home" className="text-sm lg:text-base font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/take-quiz" className="text-sm lg:text-base font-medium hover:text-primary transition-colors">
              Take Quiz
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
                // Render an empty div with the same dimensions during SSR to prevent layout shift
                <div className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2 z-20">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {mounted ? (
                theme === 'dark' ? 
                  <Sun className="h-5 w-5" /> : 
                  <Moon className="h-5 w-5" />
              ) : (
                // Render an empty div with the same dimensions during SSR to prevent layout shift
                <div className="h-5 w-5" />
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? 
                <X className="h-5 w-5" /> : 
                <Menu className="h-5 w-5" />
              }
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-end pt-20 transition-all duration-300 ease-in-out z-10 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="flex flex-col items-start space-y-4 sm:space-y-6 md:space-y-8"> 
              <Link 
                href="/Home" 
                className="text-base sm:text-lg md:text-xl font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/take-quiz" 
                className="text-base sm:text-lg md:text-xl font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Take Quiz
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14 sm:h-16 md:h-[60px]" />
    </>
  )
}
