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

import { useRouter } from 'next/navigation';
import type { PlaylistData } from '@/types/playlist';

export default function HomePage() {
  const router = useRouter();
  // State to store the personality type from URL or localStorage
  const [personalityType, setPersonalityType] = useState<string | null>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  
  // State to track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'compatible': false
  });
  
  // Function to toggle section expansion
  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Define types for music recommendations
  type MusicTrack = {
    title: string;
    artist: string;
    imageUrl: string;
    mood: TrackMood;
    spotifyUrl?: string;  // Add Spotify URL to the track type
  };

  type APITrack = {
    name?: string;
    artist?: string;
    image?: string;
    id?: string;
    spotifyUrl?: string;  // Add Spotify URL to the API track type
  };

  type MusicRecommendations = {
    tracks?: APITrack[];
  };

  // State for music recommendations
  const [musicRecommendations, setMusicRecommendations] = useState<MusicRecommendations | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);

  // Define track characteristics
  type TrackMood = {
    energy: number;      // 0-100: calm to energetic
    complexity: number;  // 0-100: simple to complex
    emotion: number;     // 0-100: logical to emotional
    structure: number;   // 0-100: fluid to structured
  };

  // Function to determine if a track matches MBTI preferences
  const getTrackScore = (track: MusicTrack, trait: string): number => {
    // Get track mood from metadata or assign default
    const mood: TrackMood = (track as any).mood || {
      energy: Math.random() * 100,
      complexity: Math.random() * 100,
      emotion: Math.random() * 100,
      structure: Math.random() * 100
    };

    switch(trait) {
      case 'E': return mood.energy;
      case 'I': return 100 - mood.energy;
      case 'S': return 100 - mood.complexity;
      case 'N': return mood.complexity;
      case 'T': return 100 - mood.emotion;
      case 'F': return mood.emotion;
      case 'J': return mood.structure;
      case 'P': return 100 - mood.structure;
      default: return 50;
    }
  };

  // Filter and sort tracks based on MBTI trait
  const getTracksForTrait = (tracks: MusicTrack[], trait: string, count: number = 20): MusicTrack[] => {
    return [...tracks]
      .sort((a, b) => getTrackScore(b, trait) - getTrackScore(a, trait))
      .slice(0, count);
  };

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
    imageUrl: "/images/midnight-dreams.png",
    spotifyUrl: "https://open.spotify.com",  // Default Spotify URL
    mood: {
      energy: 50,
      complexity: 50,
      emotion: 50,
      structure: 50
    }
  };
  
  // Create a component for the track card to handle click events
  const TrackCard = ({ track, index, sectionTitle }: { track: MusicTrack; index: number; sectionTitle: string }) => {
    const handleClick = () => {
      if (track.spotifyUrl) {
        // Open Spotify URL in a new tab
        window.open(track.spotifyUrl, '_blank');
      } else {
        // If no specific URL, search for the song on Spotify
        const searchQuery = encodeURIComponent(`${track.title} ${track.artist}`);
        window.open(`https://open.spotify.com/search/${searchQuery}`, '_blank');
      }
    };

    return (
      <div 
        key={`${sectionTitle}-${index}`} 
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer flex-shrink-0"
        style={{ width: '220px' }}
        onClick={handleClick}
      >
        <div className="relative aspect-square">
          <Image 
            src={track.imageUrl} 
            alt={track.title} 
            fill 
            className="object-cover"
          />
          {/* Add play button overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
            <svg 
              className="w-12 h-12 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div className="p-2 sm:p-3">
          <h3 className="font-medium text-xs sm:text-sm md:text-base truncate">{track.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs truncate">{track.artist}</p>
        </div>
      </div>
    );
  };
  
  // Process recommendations from API or use fallbacks
  const getRecommendedTracks = (): MusicTrack[] => {
    if (musicRecommendations?.tracks && musicRecommendations.tracks.length > 0) {
      console.log('Using API recommendations in Home page:', musicRecommendations.tracks);
      return musicRecommendations.tracks.map((track: APITrack) => ({
        title: track.name || 'Unknown Track',
        artist: track.artist || 'Unknown Artist',
        imageUrl: track.image || '/images/midnight-dreams.png',
        spotifyUrl: track.spotifyUrl,  // Add Spotify URL from API
        mood: {
          energy: Math.random() * 100,
          complexity: Math.random() * 100,
          emotion: Math.random() * 100,
          structure: Math.random() * 100
        }
      }));
    }
    
    // Create diverse fallback tracks with different moods
    const createFallbackTrack = (index: number): MusicTrack => {
      const moodVariation = Math.sin(index * 0.5) * 50 + 50;
      return {
        title: "Midnight Dreams",
        artist: "Ambient Collective",
        imageUrl: "/images/midnight-dreams.png",
        spotifyUrl: "https://open.spotify.com",  // Default Spotify URL
        mood: {
          energy: (moodVariation + Math.random() * 30) % 100,
          complexity: (moodVariation + Math.random() * 30) % 100,
          emotion: (moodVariation + Math.random() * 30) % 100,
          structure: (moodVariation + Math.random() * 30) % 100
        }
      };
    };

    return Array(100).fill(null).map((_, index) => createFallbackTrack(index));
  };
  
  // Get all tracks
  const allTracks = getRecommendedTracks();
  
  // Ensure we have enough tracks for all sections
  while (allTracks.length < 100) {
    allTracks.push(defaultMusicItem);
  }
  
  // Divide tracks into different categories (20 cards each)
  const personalizedPicks: MusicTrack[] = allTracks.slice(0, 20);
  
  // Define MBTI-based sections
  interface MBTISection {
    title: string;
    description: string;
    tracks: MusicTrack[];
    gradient: string;
    trait: string;
  }

  const getMBTISections = (type: string): MBTISection[] => {
    const sections: MBTISection[] = [];
    
    // Sections based on E/I (Energy)
    if (type.includes('E')) {
      sections.push({
        title: "Energetic Vibes",
        description: "Dynamic and upbeat tracks for your extroverted spirit",
        tracks: getTracksForTrait(allTracks, 'E'),
        gradient: "from-orange-100 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20",
        trait: 'E'
      });
    } else if (type.includes('I')) {
      sections.push({
        title: "Inner Sanctuary",
        description: "Mellow and introspective tracks for your inner world",
        tracks: getTracksForTrait(allTracks, 'I'),
        gradient: "from-purple-100 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
        trait: 'I'
      });
    }
    
    // Sections based on S/N (Information Processing)
    if (type.includes('S')) {
      sections.push({
        title: "Sensory Rhythms",
        description: "Grounded melodies that connect with your practical nature",
        tracks: getTracksForTrait(allTracks, 'S'),
        gradient: "from-green-100 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        trait: 'S'
      });
    } else if (type.includes('N')) {
      sections.push({
        title: "Abstract Waves",
        description: "Imaginative soundscapes for your intuitive mind",
        tracks: getTracksForTrait(allTracks, 'N'),
        gradient: "from-blue-100 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
        trait: 'N'
      });
    }
    
    // Sections based on T/F (Decision Making)
    if (type.includes('T')) {
      sections.push({
        title: "Logical Beats",
        description: "Structured and precise compositions for analytical minds",
        tracks: getTracksForTrait(allTracks, 'T'),
        gradient: "from-slate-100 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20",
        trait: 'T'
      });
    } else if (type.includes('F')) {
      sections.push({
        title: "Emotional Journey",
        description: "Heartfelt melodies that resonate with your feelings",
        tracks: getTracksForTrait(allTracks, 'F'),
        gradient: "from-pink-100 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
        trait: 'F'
      });
    }
    
    // Sections based on J/P (Lifestyle)
    if (type.includes('J')) {
      sections.push({
        title: "Structured Harmony",
        description: "Organized and balanced tracks for your planned lifestyle",
        tracks: getTracksForTrait(allTracks, 'J'),
        gradient: "from-teal-100 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20",
        trait: 'J'
      });
    } else if (type.includes('P')) {
      sections.push({
        title: "Spontaneous Mix",
        description: "Eclectic and dynamic tracks for your flexible spirit",
        tracks: getTracksForTrait(allTracks, 'P'),
        gradient: "from-violet-100 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20",
        trait: 'P'
      });
    }
    
    return sections;
  };

  const mbtiSections = getMBTISections(personalityType || "INFJ");
  
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

  const navigateToPlaylist = (playlistData: PlaylistData) => {
    const encodedData = encodeURIComponent(JSON.stringify(playlistData));
    router.push(`/playlists?data=${encodedData}`);
  };

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
          
          {/* MBTI Compatible Picks Section */}
          <section className="mb-8 sm:mb-12 mt-12">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">{personalityType || "INFJ"} Compatible Picks</h2>
              <button
                onClick={() => navigateToPlaylist({
                  title: `${personalityType || "INFJ"} Compatible Picks`,
                  description: "Your personalized music recommendations based on your personality type",
                  tracks: personalizedPicks,
                  gradient: "from-indigo-100 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
                  type: 'compatible',
                  personalityType: personalityType || "INFJ"
                })}
                className="text-sm sm:text-base text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                See All
              </button>
            </div>
            <div className="relative group">
              {/* Left scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('compatible-scroll-container');
                    if (container) {
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
                  {personalizedPicks.slice(0, 20).map((track: MusicTrack, index: number) => (
                    <TrackCard 
                      key={`personalized-${index}`} 
                      track={track}
                      index={index}
                      sectionTitle="Compatible Picks"
                    />
                  ))}
                </div>
              </div>
              
              {/* Right scroll button */}
              {isMounted && (
                <button 
                  onClick={() => {
                    const container = document.getElementById('compatible-scroll-container');
                    if (container) {
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

          {/* MBTI-based Sections */}
          {mbtiSections.map((section, sectionIndex) => (
            <section key={section.title} className="mb-8 sm:mb-12">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{section.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                </div>
                <button
                  onClick={() => navigateToPlaylist({
                    title: section.title,
                    description: section.description,
                    tracks: section.tracks,
                    gradient: section.gradient,
                    trait: section.trait,
                    type: 'mbti'
                  })}
                  className="text-sm sm:text-base text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  See All
                </button>
              </div>
              
              <div className="relative group">
                {/* Left scroll button */}
                {isMounted && (
                  <button 
                    onClick={() => {
                      const container = document.getElementById(`mbti-scroll-container-${sectionIndex}`);
                      if (container) {
                        container.scrollBy({ left: -944, behavior: 'smooth' });
                      }
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                )}
                
                <div id={`mbti-scroll-container-${sectionIndex}`} className="overflow-x-auto scrollbar-hide">
                  <div className={`flex space-x-4 min-w-max px-1 rounded-xl bg-${section.gradient}`}>
                    {section.tracks.slice(0, 20).map((track: MusicTrack, index: number) => (
                      <TrackCard 
                        key={`${section.title}-${index}`}
                        track={track}
                        index={index}
                        sectionTitle={section.title}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Right scroll button */}
                {isMounted && (
                  <button 
                    onClick={() => {
                      const container = document.getElementById(`mbti-scroll-container-${sectionIndex}`);
                      if (container) {
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
          ))}
        </div>
        )}
      </main>
    </>
  );
}