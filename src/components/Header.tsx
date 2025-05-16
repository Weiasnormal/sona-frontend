'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Compass, Brain, Settings, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'




export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-2 md:px-6 lg:px-8">
        {/* Left section with Logo */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Link href="/" className="flex items-center gap-x-2">
            <span className="text-2xl text-primary lg:text-3xl">🎵</span>
            <span className="text-lg font-semibold text-foreground lg:text-xl">SoundType</span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-x-4 lg:gap-x-6">
            <Link 
              href="/" 
              className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:px-4"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              href="/explore" 
              className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:px-4"
            >
              <Compass size={18} />
              <span>Explore</span>
            </Link>
            <Link 
              href="/mbti" 
              className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:px-4"
            >
              <Brain size={18} />
              <span>My MBTI</span>
            </Link>
            <Link 
              href="/settings" 
              className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:px-4"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:p-3"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background lg:h-10 lg:w-10">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  )
}
