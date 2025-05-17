'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Compass, Brain, Settings, Moon, Sun, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Add blur class to main content when mobile menu is open
  useEffect(() => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      if (isMobileMenuOpen) {
        mainContent.classList.add('blur-sm', 'pointer-events-none', 'brightness-50')
      } else {
        mainContent.classList.remove('blur-sm', 'pointer-events-none', 'brightness-50')
      }
    }
  }, [isMobileMenuOpen])
  
  const navLinkClass = "flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm lg:text-base 2xl:text-lg font-medium text-muted-foreground transition-colors transition-transform duration-200 xl:px-4 xl:py-2.5 2xl:px-5 2xl:py-3 whitespace-nowrap"


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full min-w-[320px]">
        <div className="container mx-auto h-14 sm:h-16 md:h-18 lg:h-20 2xl:h-24 max-w-[2560px] px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid h-full grid-cols-[auto,1fr,auto] lg:grid-cols-[250px,1fr,250px] 2xl:grid-cols-[300px,1fr,300px] items-center gap-4">
            {/* Left section with Logo - Fixed width */}
            <div className="flex items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
              <Link href="/" className="flex items-center gap-x-1.5 sm:gap-x-2 md:gap-x-2.5 lg:gap-x-3 2xl:gap-x-4">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-primary">🎵</span>
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-foreground whitespace-nowrap">SoundType</span>
              </Link>
               
            </div>

            {/* Center Navigation - Flexible width */}
            <div className="flex justify-end lg:justify-center">
             

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-x-2 xl:gap-x-4 2xl:gap-x-6">
                <Link 
                  href="/" 
                  className={`${navLinkClass} ${!isMobileMenuOpen ? 'hover:bg-accent hover:text-primary hover:scale-110 transition-transform duration-300 ease-in-out' : ''}`}
                  >
                  <Home className="h-[18px] w-[18px] lg:h-5 lg:w-5 2xl:h-6 2xl:w-6 flex-shrink-0" />
                  <span>Home</span>
                </Link>
                <Link 
                  href="/explore" 
                  className={`${navLinkClass} ${!isMobileMenuOpen ? 'hover:bg-accent hover:text-primary hover:scale-110 transition-transform duration-300 ease-in-out' : ''}`}
                >
                  <Compass className="h-[18px] w-[18px] lg:h-5 lg:w-5 2xl:h-6 2xl:w-6 flex-shrink-0" />
                  <span>Explore</span>
                </Link>
                <Link 
                  href="/mbti" 
                  className={`${navLinkClass} ${!isMobileMenuOpen ? 'hover:bg-accent hover:text-primary hover:scale-110 transition-transform duration-300 ease-in-out' : ''}`}
                >
                  <Brain className="h-[18px] w-[18px] lg:h-5 lg:w-5 2xl:h-6 2xl:w-6 flex-shrink-0" />
                  <span>My MBTI</span>
                </Link>
                <Link 
                  href="/settings" 
                  className={`${navLinkClass} ${!isMobileMenuOpen ? 'hover:bg-accent hover:text-primary hover:scale-110 transition-transform duration-300 ease-in-out' : ''}`}
                >
                  <Settings className="h-[18px] w-[18px] lg:h-5 lg:w-5 2xl:h-6 2xl:w-6 flex-shrink-0" />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>

            {/* Right Section - Fixed width */}
            <div className="flex items-center justify-end gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5 2xl:gap-x-6 min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-md p-1.5 sm:p-2 md:p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex-shrink-0"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? 
                  <Sun className="h-[18px] w-[18px] sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" /> : 
                  <Moon className="h-[18px] w-[18px] sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                }
              </button>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden rounded-md p-1.5 sm:p-2 md:p-2.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground ml-auto relative z-50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />}
              </button>
              
              {/* Profile Button */}
              <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 2xl:h-12 2xl:w-12 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background flex-shrink-0">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile"
                    fill
                    sizes="(min-width: 2560px) 48px, (min-width: 1024px) 44px, (min-width: 768px) 40px, (min-width: 640px) 36px, 32px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <span className="hidden md:inline-block text-sm sm:text-base lg:text-lg 2xl:text-xl font-medium text-foreground whitespace-nowrap">Profile Name</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg z-50">
            <nav className="container mx-auto flex flex-col space-y-1.5 px-4 py-3 sm:px-6 sm:py-4">
              <Link 
                href="/" 
                className="menu-item flex items-center gap-x-2 rounded-md px-3 py-2 text-sm sm:text-base font-medium text-foreground transition-all hover:bg-accent/80 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-[18px] w-[18px] sm:h-5 sm:w-5 flex-shrink-0" />
                <span>Home</span>
              </Link>
              <Link 
                href="/explore" 
                className="menu-item flex items-center gap-x-2 rounded-md px-3 py-2 text-sm sm:text-base font-medium text-foreground transition-all hover:bg-accent/80 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Compass className="h-[18px] w-[18px] sm:h-5 sm:w-5 flex-shrink-0" />
                <span>Explore</span>
              </Link>
              <Link 
                href="/mbti" 
                className="menu-item flex items-center gap-x-2 rounded-md px-3 py-2 text-sm sm:text-base font-medium text-foreground transition-all hover:bg-accent/80 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Brain className="h-[18px] w-[18px] sm:h-5 sm:w-5 flex-shrink-0" />
                <span>My MBTI</span>
              </Link>
              <Link 
                href="/settings" 
                className="menu-item flex items-center gap-x-2 rounded-md px-3 py-2 text-sm sm:text-base font-medium text-foreground transition-all hover:bg-accent/80 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="h-[18px] w-[18px] sm:h-5 sm:w-5 flex-shrink-0" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        )}
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14 sm:h-16 md:h-18 lg:h-20 2xl:h-24" />
    </>
  )
}
