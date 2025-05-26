"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation'
import MusicSection from '@/components/MusicSection'

// Types for API data
type APITrack = {
  name?: string;
  artist?: string;
  image?: string;
  id?: string;
};

type MusicRecommendations = {
  tracks?: APITrack[];
};

// Fallback data if API data is not available
const fallbackData = {
  chill: {
    title: "Chill Vibes",
    description: "Relaxing tunes to help you unwind",
    songs: [
      {
        title: "Midnight Dreams",
        artist: "Ambient Collective",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Ocean Waves",
        artist: "Nature Sounds",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Gentle Rain",
        artist: "Ambient Collective",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Sunset Meditation",
        artist: "Chill Wave",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Mountain Air",
        artist: "Nature Sounds",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Floating Clouds",
        artist: "Ambient Dreams",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Peaceful Mind",
        artist: "Zen Masters",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Starlight Journey",
        artist: "Night Vibes",
        imageUrl: "/images/midnight-dreams.png"
      }
    ]
  },
  focus: {
    title: "Focus Mode",
    description: "Music to help you concentrate",
    songs: [
      {
        title: "Piano Studies",
        artist: "Classical Flow",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Deep Focus",
        artist: "Mind Flow",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Concentration",
        artist: "Study Beats",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Clear Mind",
        artist: "Focus Wave",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Productivity Flow",
        artist: "Work Beats",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Mental Clarity",
        artist: "Mind Masters",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Focus Zone",
        artist: "Concentration Kings",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Deep Thought",
        artist: "Brain Wave",
        imageUrl: "/images/piano-studies.png"
      }
    ]
  },
  "deep-work": {
    title: "Deep Work",
    description: "For your most intensive work sessions",
    songs: [
      {
        title: "Minimal Focus",
        artist: "Ambient Works",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Pure Focus",
        artist: "Deep Work",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Flow State",
        artist: "Mind Flow",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Deep Dive",
        artist: "Work Flow",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Intense Focus",
        artist: "Deep Mind",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Peak Performance",
        artist: "Flow Masters",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Maximum Focus",
        artist: "Deep State",
        imageUrl: "/images/midnight-dreams.png"
      },
      {
        title: "Zen Mode",
        artist: "Focus Masters",
        imageUrl: "/images/midnight-dreams.png"
      }
    ]
  },
  "evening-jazz": {
    title: "Evening Jazz",
    description: "Smooth jazz for your evening relaxation",
    songs: [
      {
        title: "Night Vibes",
        artist: "Jazz Collective",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Midnight Jazz",
        artist: "Jazz Ensemble",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Smooth Evening",
        artist: "Jazz Trio",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Late Night Blues",
        artist: "Jazz Masters",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Saxophone Dreams",
        artist: "Night Jazz",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Piano Nocturne",
        artist: "Jazz Piano",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "City Lights",
        artist: "Urban Jazz",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Moonlight Serenade",
        artist: "Jazz Quartet",
        imageUrl: "/images/piano-studies.png"
      }
    ]
  },
  study: {
    title: "Study Time",
    description: "Perfect background music for studying",
    songs: [
      {
        title: "Focus Flow",
        artist: "Study Beats",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Study Session",
        artist: "Lo-Fi Beats",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Learning Mode",
        artist: "Study Music",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Brain Power",
        artist: "Study Wave",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Memory Boost",
        artist: "Mind Music",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Study Zone",
        artist: "Focus Beats",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Knowledge Flow",
        artist: "Learn Wave",
        imageUrl: "/images/piano-studies.png"
      },
      {
        title: "Academic Focus",
        artist: "Study Masters",
        imageUrl: "/images/piano-studies.png"
      }
    ]
  }
}

export default function PlaylistPage({ params }: { params: { category: string } }) {
  // State for API data
  const [musicRecommendations, setMusicRecommendations] = useState<MusicRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the playlist data based on category
  const fallbackPlaylist = fallbackData[params.category as keyof typeof fallbackData];
  
  // If the category doesn't exist in our fallback data, show 404
  if (!fallbackPlaylist) {
    notFound();
  }
  
  useEffect(() => {
    // Try to get music recommendations from localStorage
    try {
      const storedRecommendations = localStorage.getItem('musicRecommendations');
      if (storedRecommendations) {
        console.log('Found recommendations in localStorage for playlist page:', storedRecommendations);
        const parsedRecommendations = JSON.parse(storedRecommendations);
        setMusicRecommendations({ tracks: parsedRecommendations });
      } else {
        console.log('No recommendations found in localStorage for playlist page');
      }
    } catch (error) {
      console.error('Error loading recommendations from localStorage:', error);
    }
    
    setIsLoading(false);
  }, []);
  
  // Convert API tracks to the format expected by MusicSection
  const getSongsFromAPI = () => {
    if (musicRecommendations?.tracks && musicRecommendations.tracks.length > 0) {
      console.log('Using API recommendations in playlist page:', musicRecommendations.tracks);
      return musicRecommendations.tracks.map((track) => ({
        title: track.name || 'Unknown Track',
        artist: track.artist || 'Unknown Artist',
        imageUrl: track.image || '/images/midnight-dreams.png'
      }));
    }
    console.log('No API recommendations available, using fallback data');
    return fallbackPlaylist.songs; // Use fallback if no API data
  };
  
  // Get the songs to display
  const songs = getSongsFromAPI();

  return (
    <main id="main-content" className="flex-1 w-full transition-all duration-300">
      <div className="container max-w-[2560px] mx-auto px-4 py-6 sm:py-8 md:py-10 lg:px-8 2xl:px-12">
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">{fallbackPlaylist.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">{fallbackPlaylist.description}</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 2xl:gap-10">
              {songs.map((song, index) => (
                <MusicSection
                  key={index}
                  title={fallbackPlaylist.title}
                  album={song}
                  href={`/playlists/${params.category}/${index}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 