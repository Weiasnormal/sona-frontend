'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import type { PlaylistData, MusicTrack } from '@/types/playlist';

export default function PlaylistPage() {
  const searchParams = useSearchParams();
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

  useEffect(() => {
    // Get the encoded playlist data from URL
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setPlaylistData(decodedData);
      } catch (error) {
        console.error('Error parsing playlist data:', error);
      }
    }
  }, [searchParams]);

  // Create a component for the track card to handle click events
  const TrackCard = ({ track }: { track: MusicTrack }) => {
    const handleClick = () => {
      if (track.spotifyUrl) {
        window.open(track.spotifyUrl, '_blank');
      } else {
        const searchQuery = encodeURIComponent(`${track.title} ${track.artist}`);
        window.open(`https://open.spotify.com/search/${searchQuery}`, '_blank');
      }
    };

    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
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

  if (!playlistData) {
    return (
      <>
        <Header />
        <main className="flex-1 w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Loading playlist...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full min-h-screen">
        <div className={`w-full bg-gradient-to-b ${playlistData.gradient} py-12`}>
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{playlistData.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {playlistData.description}
                </p>
                {playlistData.type === 'compatible' && playlistData.personalityType && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Personalized for {playlistData.personalityType} personality type
                  </p>
                )}
              </div>

              {/* Tracks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {playlistData.tracks.map((track, index) => (
                  <TrackCard key={`${track.title}-${index}`} track={track} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 