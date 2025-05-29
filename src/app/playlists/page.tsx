'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import SortDropdown from '@/components/SortDropdown';
import { quickSort, SortOption, SORT_OPTIONS, SortField, SortOrder } from '@/utils/sortUtils';
import type { PlaylistData, MusicTrack } from '@/types/playlist';

export default function PlaylistPage() {
  const searchParams = useSearchParams();
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [currentSortOption, setCurrentSortOption] = useState<SortOption>(SORT_OPTIONS[0]);
  const [sortedTracks, setSortedTracks] = useState<MusicTrack[]>([]);

  useEffect(() => {
    // Get the encoded playlist data from URL
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setPlaylistData(decodedData);
        
        // Ensure all tracks have album field for sorting
        const tracksWithAlbum = decodedData.tracks.map((track: MusicTrack) => {
          // Create a new track with album field if it doesn't exist
          if (!track.album) {
            return {
              ...track,
              album: 'Unknown Album' // Default album name
            };
          }
          return track;
        });
        
        // Apply initial sorting
        const initialSortedTracks = quickSort(tracksWithAlbum, currentSortOption.field, currentSortOption.order);
        setSortedTracks(initialSortedTracks as MusicTrack[]);
      } catch (error) {
        console.error('Error parsing playlist data:', error);
      }
    }
  }, [searchParams, currentSortOption]);

  // Handle sort option change
  const handleSortChange = (option: SortOption) => {
    setCurrentSortOption(option);
    if (playlistData && playlistData.tracks) {
      // Ensure all tracks have album field for sorting
      const tracksWithAlbum = playlistData.tracks.map((track: MusicTrack) => {
        // Create a new track with album field if it doesn't exist
        if (!track.album) {
          return {
            ...track,
            album: 'Unknown Album' // Default album name
          };
        }
        return track;
      });
      
      // Apply new sorting to tracks
      const newSortedTracks = quickSort(tracksWithAlbum, option.field, option.order);
      setSortedTracks(newSortedTracks as MusicTrack[]);
    }
  };
  
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
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer w-full max-w-[220px] flex-shrink-0"
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
      <main className="flex-1 w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900 overflow-x-hidden min-w-[240px]">
        <div className={`w-full bg-gradient-to-b ${playlistData.gradient} py-8 xs:py-10 sm:py-12`}>
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
            <div className="max-w-[2560px] mx-auto">
              {/* Header Section */}
              <div className="mb-6 xs:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end">
                <div>
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{playlistData.title}</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-base xs:text-lg">
                    {playlistData.description}
                  </p>
                  {playlistData.type === 'compatible' && playlistData.personalityType && (
                    <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-500 mt-2">
                      Personalized for {playlistData.personalityType} personality type
                    </p>
                  )}
                </div>
                <div className="mt-4 sm:mt-0 flex justify-end">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md px-3 xs:px-4 py-2">
                    <SortDropdown 
                      onSortChange={handleSortChange}
                      defaultOption={currentSortOption}
                    />
                  </div>
                </div>
              </div>

              {/* Tracks Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 xs:gap-5 sm:gap-6">
              {(sortedTracks.length > 0 ? sortedTracks : playlistData.tracks).map((track: MusicTrack, index: number) => (
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