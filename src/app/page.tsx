import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MusicSection from '@/components/MusicSection'
import Link from 'next/link'
import "../styles/test.css"

export default function Home() {
  return (
    
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
           {/* Test Tailwind CSS */}
           <h1 className="test-heading">TEST</h1>
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">Welcome back, Sarah!</h1>
            <p className="mt-2 text-lg text-muted-foreground lg:text-xl">Your personality type is INFJ</p>
          </div>

          {/* Music Sections Grid */}
          <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
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
          </div>

          {/* MBTI Profile */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-2xl">INFJ Profile</CardTitle>
                <p className="text-sm text-muted-foreground">The Advocate</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">I</span>
                    <span className="col-span-3 text-sm text-muted-foreground">Introvert</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">N</span>
                    <span className="col-span-3 text-sm text-muted-foreground">Intuitive</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">F</span>
                    <span className="col-span-3 text-sm text-muted-foreground">Feeling</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">J</span>
                    <span className="col-span-3 text-sm text-muted-foreground">Judging</span>
                  </div>
                </div>
                <Link 
                  href="/mbti/profile" 
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90"
                >
                  Explore Deeper
                  <span className="ml-1">→</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
