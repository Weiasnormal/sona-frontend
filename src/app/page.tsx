import Header from '@/components/Header'
import MusicSection from '@/components/MusicSection'
import Link from 'next/link'
import "../styles/test.css"
import MBTICard from '@/components/MBTICard'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 w-full transition-all duration-300">
        <div className="container max-w-[2560px] mx-auto px-4 py-6 sm:py-8 md:py-10 lg:px-8 2xl:px-12">
          {/* Welcome and MBTI Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-14">
            {/* Welcome Section */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground transition-all welcome-text-hover">
                Welcome back, Sarah!
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground transition-all">
                Your personality type is <span className="text-blue-600 font-bold">INFJ</span>
              </p>
            </div>
            <MBTICard />
          </div>

          {/* Music Sections Grid */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12 2xl:space-y-14">
            {/* Chill Vibes Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Chill Vibes</h2>
                <Link 
                  href="/playlists/chill"
                  className="text-sm sm:text-base text-primary hover:text-primary/90 transition-colors"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 2xl:gap-10">
                <MusicSection
                  title="Chill Vibes"
                  album={{
                    title: "Midnight Dreams",
                    artist: "Ambient Collective",
                    imageUrl: "/images/midnight-dreams.jpg"
                  }}
                  href="/playlists/chill"
                />
                {/* More chill songs will be shown when See All is clicked */}
              </div>
            </div>

            {/* Focus Mode Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Focus Mode</h2>
                <Link 
                  href="/playlists/focus"
                  className="text-sm sm:text-base text-primary hover:text-primary/90 transition-colors"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 2xl:gap-10">
                <MusicSection
                  title="Focus Mode"
                  album={{
                    title: "Piano Studies",
                    artist: "Classical Flow",
                    imageUrl: "/images/piano-studies.png"
                  }}
                  href="/playlists/focus"
                />
                {/* More focus songs will be shown when See All is clicked */}
              </div>
            </div>

            {/* Deep Work Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Deep Work</h2>
                <Link 
                  href="/playlists/deep-work"
                  className="text-sm sm:text-base text-primary hover:text-primary/90 transition-colors"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 2xl:gap-10">
                <MusicSection
                  title="Deep Work"
                  album={{
                    title: "Minimal Focus",
                    artist: "Ambient Works",
                    imageUrl: "/images/midnight-dreams.jpg"
                  }}
                  href="/playlists/deep-work"
                />
                {/* More deep work songs will be shown when See All is clicked */}
              </div>
            </div>

            {/* Evening Jazz Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Evening Jazz</h2>
                <Link 
                  href="/playlists/evening-jazz"
                  className="text-sm sm:text-base text-primary hover:text-primary/90 transition-colors"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 2xl:gap-10">
                <MusicSection
                  title="Evening Jazz"
                  album={{
                    title: "Night Vibes",
                    artist: "Jazz Collective",
                    imageUrl: "/images/piano-studies.png"
                  }}
                  href="/playlists/evening-jazz"
                />
                {/* More jazz songs will be shown when See All is clicked */}
              </div>
            </div>

            {/* Study Time Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Study Time</h2>
                <Link 
                  href="/playlists/study"
                  className="text-sm sm:text-base text-primary hover:text-primary/90 transition-colors"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 2xl:gap-10">
                <MusicSection
                  title="Study Time"
                  album={{
                    title: "Focus Flow",
                    artist: "Study Beats",
                    imageUrl: "/images/piano-studies.png"
                  }}
                  href="/playlists/study"
                />
                {/* More study songs will be shown when See All is clicked */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
