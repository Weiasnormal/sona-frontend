import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MusicSection from '@/components/MusicSection'
import Link from 'next/link'
import "../styles/test.css"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 w-full transition-all duration-300">
        <div className="container max-w-[2560px] mx-auto px-4 py-6 sm:py-8 md:py-10 lg:px-8 2xl:px-12">
          {/* Welcome and MBTI Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-14">
            {/* Welcome Section */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground transition-all">
                Welcome back, Sarah!
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground transition-all">
                Your personality type is INFJ
              </p>
            </div>

            {/* MBTI Profile */}
            <Card className="overflow-hidden lg:col-span-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
              <CardHeader className="space-y-2 p-5 sm:p-6 lg:p-7 bg-muted/50">
                <CardTitle className="text-xl font-bold sm:text-2xl lg:text-3xl">INFJ Profile</CardTitle>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">The Advocate</p>
              </CardHeader>
              <CardContent className="grid gap-4 sm:gap-5 p-5 sm:p-6 lg:p-7">
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  <div className="grid grid-cols-4 items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors">
                    <span className="font-bold text-lg sm:text-xl lg:text-2xl text-primary">I</span>
                    <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Introvert</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors">
                    <span className="font-bold text-lg sm:text-xl lg:text-2xl text-primary">N</span>
                    <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Intuitive</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors">
                    <span className="font-bold text-lg sm:text-xl lg:text-2xl text-primary">F</span>
                    <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Feeling</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors">
                    <span className="font-bold text-lg sm:text-xl lg:text-2xl text-primary">J</span>
                    <span className="col-span-3 text-sm sm:text-base lg:text-lg text-muted-foreground">Judging</span>
                  </div>
                </div>
                <Link 
                  href="/mbti/profile" 
                  className="inline-flex items-center text-sm sm:text-base lg:text-lg font-medium text-primary hover:text-primary/90 mt-2 transition-colors"
                >
                  Explore Deeper
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Music Sections Grid */}
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

            <MusicSection
              title="Focus Mode"
              album={{
                title: "Piano Studies",
                artist: "Classical Flow",
                imageUrl: "/images/piano-studies.png"
              }}
              href="/playlists/focus"
            />

            <MusicSection
              title="Deep Work"
              album={{
                title: "Minimal Focus",
                artist: "Ambient Works",
                imageUrl: "/images/midnight-dreams.jpg"
              }}
              href="/playlists/deep-work"
            />

            <MusicSection
              title="Evening Jazz"
              album={{
                title: "Night Vibes",
                artist: "Jazz Collective",
                imageUrl: "/images/piano-studies.png"
              }}
              href="/playlists/evening-jazz"
            />

            <MusicSection
              title="Study Time"
              album={{
                title: "Focus Flow",
                artist: "Study Beats",
                imageUrl: "/images/piano-studies.png"
              }}
              href="/playlists/study"
            />
          </div>
        </div>
      </main>
    </>
  )
}
