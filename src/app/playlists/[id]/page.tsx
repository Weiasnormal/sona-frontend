"use client";

import { useState, useEffect } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import MusicSection from '@/components/MusicSection';
import { getFunctionPair } from '@/utils/api';
import Header from '@/components/Header';

// Types for tracks and recommendations
type MusicTrack = {
  title: string;
  artist: string;
  imageUrl: string;
  mood: {
    energy: number;
    complexity: number;
    emotion: number;
    structure: number;
  };
  spotifyUrl?: string;
};

type APITrack = {
  name?: string;
  artist?: string;
  image?: string;
  id?: string;
  spotifyUrl?: string;
};

type MusicRecommendations = {
  tracks?: APITrack[];
};

// Function to determine if a track matches MBTI preferences
const getTrackScore = (track: MusicTrack, trait: string): number => {
  const mood = track.mood || {
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

// Get section details based on trait
const getSectionDetails = (trait: string) => {
  switch(trait.toUpperCase()) {
    case 'E':
      return {
        title: "Energetic Vibes",
        description: "Dynamic and upbeat tracks for your extroverted spirit",
        gradient: "from-orange-100 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20"
      };
    case 'I':
      return {
        title: "Inner Sanctuary",
        description: "Mellow and introspective tracks for your inner world",
        gradient: "from-purple-100 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20"
      };
    case 'S':
      return {
        title: "Sensory Rhythms",
        description: "Grounded melodies that connect with your practical nature",
        gradient: "from-green-100 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
      };
    case 'N':
      return {
        title: "Abstract Waves",
        description: "Imaginative soundscapes for your intuitive mind",
        gradient: "from-blue-100 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
      };
    case 'T':
      return {
        title: "Logical Beats",
        description: "Structured and precise compositions for analytical minds",
        gradient: "from-slate-100 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20"
      };
    case 'F':
      return {
        title: "Emotional Journey",
        description: "Heartfelt melodies that resonate with your feelings",
        gradient: "from-pink-100 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
      };
    case 'J':
      return {
        title: "Structured Harmony",
        description: "Organized and balanced tracks for your planned lifestyle",
        gradient: "from-teal-100 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
      };
    case 'P':
      return {
        title: "Spontaneous Mix",
        description: "Eclectic and dynamic tracks for your flexible spirit",
        gradient: "from-violet-100 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20"
      };
    default:
      return null;
  }
};

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const normalizedId = resolvedParams.id.toUpperCase();

  const [musicRecommendations, setMusicRecommendations] = useState<MusicRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [personalityType, setPersonalityType] = useState<string | null>(null);

  // Get section details
  const sectionDetails = getSectionDetails(normalizedId);
  
  // If the trait is invalid, show 404
  if (!sectionDetails) {
    notFound();
  }

  useEffect(() => {
    // Get personality type and recommendations from localStorage
    try {
      const storedType = localStorage.getItem('personalityType');
      const storedRecommendations = localStorage.getItem('musicRecommendations');
      
      if (storedType) {
        setPersonalityType(storedType);
      }
      
      if (storedRecommendations) {
        try {
          const parsedRecommendations = JSON.parse(storedRecommendations);
          // Ensure tracks is always an array
          const tracks = Array.isArray(parsedRecommendations) ? parsedRecommendations : 
                        (parsedRecommendations?.tracks && Array.isArray(parsedRecommendations.tracks)) ? parsedRecommendations.tracks :
                        [];
          setMusicRecommendations({ tracks });
        } catch (parseError) {
          console.error('Error parsing recommendations:', parseError);
          setMusicRecommendations({ tracks: [] });
        }
      } else {
        setMusicRecommendations({ tracks: [] });
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setMusicRecommendations({ tracks: [] });
    }
    
    setIsLoading(false);
  }, []);

  // Convert API tracks to MusicTrack format and filter by trait
  const getFilteredTracks = () => {
    const tracks = musicRecommendations?.tracks || [];
    if (!Array.isArray(tracks)) {
      console.error('Tracks is not an array:', tracks);
      return [];
    }

    const allTracks: MusicTrack[] = tracks.map(track => ({
      title: track.name || 'Unknown Track',
      artist: track.artist || 'Unknown Artist',
      imageUrl: track.image || '/images/midnight-dreams.png',
      spotifyUrl: track.spotifyUrl,
      mood: {
        energy: Math.random() * 100,
        complexity: Math.random() * 100,
        emotion: Math.random() * 100,
        structure: Math.random() * 100
      }
    }));

    // Sort tracks by trait score using normalized id
    return allTracks
      .sort((a, b) => getTrackScore(b, normalizedId) - getTrackScore(a, normalizedId));
  };

  const filteredTracks = getFilteredTracks();

  return (
    <>
      <Header />
      <main className="flex-1 w-full transition-all duration-300">
        <div className={`w-full bg-gradient-to-b ${sectionDetails.gradient} py-12`}>
          <div className="container max-w-[2560px] mx-auto px-4 lg:px-8 2xl:px-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{sectionDetails.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">{sectionDetails.description}</p>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8">
                {filteredTracks.map((track, index) => (
                  <MusicSection
                    key={`${track.title}-${index}`}
                    title={sectionDetails.title}
                    album={{
                      title: track.title,
                      artist: track.artist,
                      imageUrl: track.imageUrl
                    }}
                    href={track.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(`${track.title} ${track.artist}`)}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 