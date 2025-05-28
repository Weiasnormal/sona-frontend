"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import "../../styles/test.css";
import "../../styles/responsive.css";

// Add custom CSS for hiding scrollbars while allowing scrolling
import "../../styles/scrollbar-hide.css";

// Custom loading component for lazy-loaded sections
const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0" style={{ width: 'calc(100vw / 2 - 2rem)', maxWidth: '220px' }}>
          <div className="aspect-square bg-gray-300 dark:bg-gray-600"></div>
          <div className="p-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Dynamically import Lucide React icons with SSR disabled to prevent hydration errors
const ChevronLeft = dynamic(() => import('lucide-react').then(mod => mod.ChevronLeft), { ssr: false });
const ChevronRight = dynamic(() => import('lucide-react').then(mod => mod.ChevronRight), { ssr: false });

export default function HomePage() {
  // State to store the personality type from URL or localStorage
  const [personalityType, setPersonalityType] = useState<string | null>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  
  // Define types for music recommendations
  type MusicTrack = {
    title: string;
    artist: string;
    imageUrl: string;
  };

  type APITrack = {
    name?: string;
    artist?: string;
    image?: string;
    id?: string;
  };

  type MusicRecommendations = {
    tracks?: APITrack[];
  };

  // State for music recommendations
  const [musicRecommendations, setMusicRecommendations] = useState<MusicRecommendations | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);

  useEffect(() => {
    // Check if we have a personality type in localStorage
    const storedType = localStorage.getItem('personalityType');
    if (storedType) {
      setPersonalityType(storedType);
      setHasCompletedQuiz(true);
      
      // Try to get music recommendations from localStorage
      try {
        const storedRecommendations = localStorage.getItem('musicRecommendations');
        if (storedRecommendations) {
          console.log('Found recommendations in localStorage:', storedRecommendations);
          const parsedRecommendations = JSON.parse(storedRecommendations);
          
          // Check if parsedRecommendations is already an array or if it's nested in an object
          if (Array.isArray(parsedRecommendations)) {
            // If it's already an array, use it directly
            setMusicRecommendations({ tracks: parsedRecommendations });
          } else if (parsedRecommendations.tracks && Array.isArray(parsedRecommendations.tracks)) {
            // If it has a tracks property that's an array, use that
            setMusicRecommendations(parsedRecommendations);
          } else {
            // Fallback for any other structure
            console.log('Recommendations found but in unexpected format:', parsedRecommendations);
            setMusicRecommendations({ tracks: [parsedRecommendations] });
          }
        } else {
          console.log('No recommendations found in localStorage');
        }
      } catch (error) {
        console.error('Error loading recommendations from localStorage:', error);
      }
    }
    
    // Set mounted state to true
    setIsMounted(true);
    setIsLoadingRecommendations(false);
  }, []);

  // Default fallback data for the music cards if API recommendations aren't available
  const defaultMusicItem: MusicTrack = {
    title: "Midnight Dreams",
    artist: "Ambient Collective",
    imageUrl: "/images/midnight-dreams.png"
  };
  
  // Process recommendations from API or use fallbacks
  const getRecommendedTracks = (): MusicTrack[] => {
    if (musicRecommendations?.tracks && musicRecommendations.tracks.length > 0) {
      console.log('Using API recommendations in Home page:', musicRecommendations.tracks);
      return musicRecommendations.tracks.map((track: APITrack) => ({
        title: track.name || 'Unknown Track',
        artist: track.artist || 'Unknown Artist',
        imageUrl: track.image || '/images/midnight-dreams.png'
      }));
    }
    console.log('No API recommendations available, using default items');
    return Array(20).fill(defaultMusicItem);
  };
  
  // Distribute tracks across different sections
  const allTracks = getRecommendedTracks();
  
  // Ensure we have enough tracks for all sections (20 cards per section)
  while (allTracks.length < 60) {
    allTracks.push(defaultMusicItem);
  }
  
  // Divide tracks into different categories (20 cards each)
  const personalizedPicks: MusicTrack[] = allTracks.slice(0, 20);
  const chillVibes: MusicTrack[] = allTracks.slice(20, 40);
  const focusMode: MusicTrack[] = allTracks.slice(40, 60);
  
  // Map personality types to descriptions
  const personalityDescriptions: Record<string, { title: string, traits: Record<string, number> }> = {
    "INFJ": {
      title: "The Advocate",
      traits: {
        "Extroverted": 19,
        "Introverted": 81,
        "Sensing": 27,
        "Intuitive": 73,
        "Thinking": 32,
        "Feeling": 68,
        "Judging": 64,
        "Perceiving": 36
      }
    },
    "INTJ": {
      title: "The Architect",
      traits: {
        "Extroverted": 16,
        "Introverted": 84,
        "Sensing": 26,
        "Intuitive": 74,
        "Thinking": 65,
        "Feeling": 35,
        "Judging": 61,
        "Perceiving": 39
      }
    },
    "INFP": {
      title: "The Mediator",
      traits: {
        "Extroverted": 24,
        "Introverted": 76,
        "Sensing": 35,
        "Intuitive": 65,
        "Thinking": 35,
        "Feeling": 65,
        "Judging": 32,
        "Perceiving": 68
      }
    },
    "INTP": {
      title: "The Logician",
      traits: {
        "Extroverted": 25,
        "Introverted": 75,
        "Sensing": 30,
        "Intuitive": 70,
        "Thinking": 70,
        "Feeling": 30,
        "Judging": 30,
        "Perceiving": 70
      }
    },
    "ENFJ": {
      title: "The Protagonist",
      traits: {
        "Extroverted": 70,
        "Introverted": 30,
        "Sensing": 25,
        "Intuitive": 75,
        "Thinking": 35,
        "Feeling": 65,
        "Judging": 65,
        "Perceiving": 35
      }
    },
    "ENTJ": {
      title: "The Commander",
      traits: {
        "Extroverted": 72,
        "Introverted": 28,
        "Sensing": 25,
        "Intuitive": 75,
        "Thinking": 75,
        "Feeling": 25,
        "Judging": 70,
        "Perceiving": 30
      }
    },
    "ENFP": {
      title: "The Campaigner",
      traits: {
        "Extroverted": 68,
        "Introverted": 32,
        "Sensing": 30,
        "Intuitive": 70,
        "Thinking": 30,
        "Feeling": 70,
        "Judging": 25,
        "Perceiving": 75
      }
    },
    "ENTP": {
      title: "The Debater",
      traits: {
        "Extroverted": 65,
        "Introverted": 35,
        "Sensing": 25,
        "Intuitive": 75,
        "Thinking": 70,
        "Feeling": 30,
        "Judging": 30,
        "Perceiving": 70
      }
    },
    "ISFJ": {
      title: "The Defender",
      traits: {
        "Extroverted": 30,
        "Introverted": 70,
        "Sensing": 75,
        "Intuitive": 25,
        "Thinking": 35,
        "Feeling": 65,
        "Judging": 70,
        "Perceiving": 30
      }
    },
    "ISTJ": {
      title: "The Logistician",
      traits: {
        "Extroverted": 25,
        "Introverted": 75,
        "Sensing": 75,
        "Intuitive": 25,
        "Thinking": 65,
        "Feeling": 35,
        "Judging": 75,
        "Perceiving": 25
      }
    },
    "ISFP": {
      title: "The Adventurer",
      traits: {
        "Extroverted": 30,
        "Introverted": 70,
        "Sensing": 70,
        "Intuitive": 30,
        "Thinking": 35,
        "Feeling": 65,
        "Judging": 30,
        "Perceiving": 70
      }
    },
    "ISTP": {
      title: "The Virtuoso",
      traits: {
        "Extroverted": 25,
        "Introverted": 75,
        "Sensing": 70,
        "Intuitive": 30,
        "Thinking": 70,
        "Feeling": 30,
        "Judging": 25,
        "Perceiving": 75
      }
    },
    "ESFJ": {
      title: "The Consul",
      traits: {
        "Extroverted": 70,
        "Introverted": 30,
        "Sensing": 70,
        "Intuitive": 30,
        "Thinking": 30,
        "Feeling": 70,
        "Judging": 70,
        "Perceiving": 30
      }
    },
    "ESFP": {
      title: "The Entertainer",
      traits: {
        "Extroverted": 75,
        "Introverted": 25,
        "Sensing": 70,
        "Intuitive": 30,
        "Thinking": 30,
        "Feeling": 70,
        "Judging": 25,
        "Perceiving": 75
      }
    },
    "ESTP": {
      title: "The Entrepreneur",
      traits: {
        "Extroverted": 76,
        "Introverted": 24,
        "Sensing": 73,
        "Intuitive": 27,
        "Thinking": 73,
        "Feeling": 27,
        "Judging": 24,
        "Perceiving": 76
      }
    },
    "ESTJ": {
      title: "The Executive",
      traits: {
        "Extroverted": 82,
        "Introverted": 18,
        "Sensing": 76,
        "Intuitive": 24,
        "Thinking": 79,
        "Feeling": 21,
        "Judging": 77,
        "Perceiving": 23
      }
    },
    // Add more personality types as needed
  };
  
  // Get the current personality info or default to INFJ
  // Make sure we have a valid personality type and it exists in our descriptions
  const safePersonalityType = personalityType && personalityDescriptions[personalityType] ? personalityType : "INFJ";
  const currentPersonality = personalityDescriptions[safePersonalityType];

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900 overflow-x-hidden min-w-[240px]">
        {!hasCompletedQuiz ? (
          // Blank state when user hasn't taken the quiz
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-20 text-center max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Welcome to Sona</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                It looks like you haven't taken the personality quiz yet. To get personalized music recommendations, you'll need to complete the quiz first.
              </p>
              <Link href="/take-quiz" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors">
                Take the Quiz <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        ) : (
          // Content when user has completed the quiz
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 md:py-10 lg:py-16 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/2 space-y-3 xs:space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Music<br />
                That Matches<br />
                <span className="text-indigo-600 dark:text-indigo-400">Your Personality</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Your personality type is <span className="font-bold">{personalityType}</span>
              </p>
              <div>
                <Link href="/take-quiz" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors">
                  Retake the Quiz <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Right Side - MBTI Profile Card */}
            <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">{personalityType || "INFJ"} Profile</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{currentPersonality?.title || "The Advocate"}</p>
              </div>

              {/* Personality Traits */}
              <div className="space-y-4 sm:space-y-6">
                {/* Extroverted vs Introverted */}
                <div>
                  <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm mb-1">
                    <span>Extroverted</span>
                    <span className="hidden xs:inline">{currentPersonality?.traits?.["Introverted"] || 50}% Introverted</span>
                    <span className="inline xs:hidden">{currentPersonality?.traits?.["Introverted"] || 50}%</span>
                    <span>Introverted</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${currentPersonality?.traits?.["Introverted"] || 50}%` }}></div>
                  </div>
                </div>

                {/* Intuitive vs Sensing */}
                <div>
                  <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm mb-1">
                    <span>Sensing</span>
                    <span className="hidden xs:inline">{currentPersonality?.traits?.["Intuitive"] || 50}% Intuitive</span>
                    <span className="inline xs:hidden">{currentPersonality?.traits?.["Intuitive"] || 50}%</span>
                    <span>Intuitive</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${currentPersonality?.traits?.["Intuitive"] || 50}%` }}></div>
                  </div>
                </div>
                
                {/* Thinking vs Feeling */}
                <div>
                  <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm mb-1">
                    <span>Thinking</span>
                    <span className="hidden xs:inline">{currentPersonality?.traits?.["Feeling"] || 50}% Feeling</span>
                    <span className="inline xs:hidden">{currentPersonality?.traits?.["Feeling"] || 50}%</span>
                    <span>Feeling</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${currentPersonality?.traits?.["Feeling"] || 50}%` }}></div>
                  </div>
                </div>
                
                {/* Judging vs Perceiving */}
                <div>
                  <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm mb-1">
                    <span>Judging</span>
                    <span className="hidden xs:inline">{currentPersonality?.traits?.["Judging"] || 50}% Judging</span>
                    <span className="inline xs:hidden">{currentPersonality?.traits?.["Judging"] || 50}%</span>
                    <span>Perceiving</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${currentPersonality?.traits?.["Judging"] || 50}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Personalized Picks Section - Above the fold, no lazy loading needed */}
          <section className="mb-8 sm:mb-12 mt-12">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">{personalityType || "INFJ"} Compatible Picks</h2>
              <Link href={`/playlists/${(personalityType || "INFJ").toLowerCase()}`} className="text-sm sm:text-base text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                See All
              </Link>
            </div>
            <div className="relative group">
              {/* Left scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('compatible-scroll-container');
                    if (container) {
                      // Scroll by 4 cards width + gaps (220px * 4 + 16px * 3)
                      container.scrollBy({ left: -944, behavior: 'smooth' });
                    }
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              )}
              
              <div id="compatible-scroll-container" className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 min-w-max px-1">
                  {personalizedPicks.map((item: MusicTrack, index: number) => (
                    <div 
                      key={`personalized-${index}`} 
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
                      style={{ width: '220px' }}
                    >
                      <div className="relative aspect-square">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 sm:p-3">
                        <h3 className="font-medium text-xs sm:text-sm md:text-base truncate">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs truncate">{item.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('compatible-scroll-container');
                    if (container) {
                      // Scroll by 4 cards width + gaps (220px * 4 + 16px * 3)
                      container.scrollBy({ left: 944, behavior: 'smooth' });
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              )}
            </div>
          </section>

          {/* Chill Vibes Section */}
          <section className="mb-8 sm:mb-12">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Chill Vibes</h2>
                <Link href="/playlists/chill" className="text-sm sm:text-base text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                  See All
                </Link>
              </div>
              <div className="relative group">
              {/* Left scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('chill-scroll-container');
                    if (container) {
                      // Scroll by 4 cards width + gaps (220px * 4 + 16px * 3)
                      container.scrollBy({ left: -944, behavior: 'smooth' });
                    }
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              )}
              
              <div id="chill-scroll-container" className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 min-w-max px-1">
                  {chillVibes.map((item: MusicTrack, index: number) => (
                    <div 
                      key={`chill-${index}`} 
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
                      style={{ width: '220px' }}
                    >
                      <div className="relative aspect-square">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 sm:p-3">
                        <h3 className="font-medium text-xs sm:text-sm md:text-base truncate">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs truncate">{item.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('chill-scroll-container');
                    if (container) {
                      // Scroll by 4 cards width + gaps (220px * 4 + 16px * 3)
                      container.scrollBy({ left: 944, behavior: 'smooth' });
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              )}
            </div>
          </section>

          {/* Focus Mode */}
          <section className="mb-8 sm:mb-12">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Focus Mode</h2>
              <Link href="/playlists/focus" className="text-sm sm:text-base text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                See All
              </Link>
            </div>
            <div className="relative group">
              {/* Left scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('focus-scroll-container');
                    if (container) {
                      // Scroll by 4 cards width + gaps (220px * 4 + 16px * 3)
                      container.scrollBy({ left: -944, behavior: 'smooth' });
                    }
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              )}
              
              <div id="focus-scroll-container" className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 min-w-max px-1">
                  {focusMode.map((item: MusicTrack, index: number) => (
                    <div 
                      key={`focus-${index}`} 
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
                      style={{ width: '220px' }}
                    >
                      <div className="relative aspect-square">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 sm:p-3">
                        <h3 className="font-medium text-xs sm:text-sm md:text-base truncate">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs truncate">{item.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('focus-scroll-container');
                    if (container) {
                      // Scroll by 4 cards width + gaps (220px * 4 + 16px * 3)
                      container.scrollBy({ left: 944, behavior: 'smooth' });
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              )}
            </div>
          </section>
        </div>
        )}
      </main>
    </>
  );
}