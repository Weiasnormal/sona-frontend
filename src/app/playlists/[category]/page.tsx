import { notFound } from 'next/navigation'
import MusicSection from '@/components/MusicSection'

// This would typically come from your database or API
const playlistData = {
  chill: {
    title: "Chill Vibes",
    description: "Relaxing tunes to help you unwind",
    songs: [
      {
        title: "Midnight Dreams",
        artist: "Ambient Collective",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Ocean Waves",
        artist: "Nature Sounds",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Gentle Rain",
        artist: "Ambient Collective",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Sunset Meditation",
        artist: "Chill Wave",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Mountain Air",
        artist: "Nature Sounds",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Floating Clouds",
        artist: "Ambient Dreams",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Peaceful Mind",
        artist: "Zen Masters",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Starlight Journey",
        artist: "Night Vibes",
        imageUrl: "/images/midnight-dreams.jpg"
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
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Pure Focus",
        artist: "Deep Work",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Flow State",
        artist: "Mind Flow",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Deep Dive",
        artist: "Work Flow",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Intense Focus",
        artist: "Deep Mind",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Peak Performance",
        artist: "Flow Masters",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Maximum Focus",
        artist: "Deep State",
        imageUrl: "/images/midnight-dreams.jpg"
      },
      {
        title: "Zen Mode",
        artist: "Focus Masters",
        imageUrl: "/images/midnight-dreams.jpg"
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
  const playlist = playlistData[params.category as keyof typeof playlistData]
  
  if (!playlist) {
    notFound()
  }

  return (
    <main id="main-content" className="flex-1 w-full transition-all duration-300">
      <div className="container max-w-[2560px] mx-auto px-4 py-6 sm:py-8 md:py-10 lg:px-8 2xl:px-12">
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">{playlist.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">{playlist.description}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 2xl:gap-10">
            {playlist.songs.map((song, index) => (
              <MusicSection
                key={index}
                title={playlist.title}
                album={song}
                href={`/playlists/${params.category}/${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 