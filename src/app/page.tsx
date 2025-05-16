import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Sarah!</h1>
          <p className="mt-1 text-muted-foreground">Your personality type is INFJ</p>
        </div>

        {/* Music Sections */}
        <div className="space-y-8">
          {/* Chill Vibes */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Chill Vibes</h2>
              <Link 
                href="/playlists/chill" 
                className="text-sm font-medium text-primary hover:underline"
              >
                See All →
              </Link>
            </div>
            <div className="max-w-sm overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="aspect-square relative w-full">
                <Image
                  src="/images/midnight-dreams.jpg"
                  alt="Midnight Dreams Album Cover"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-card-foreground">Midnight Dreams</h3>
                <p className="text-sm text-muted-foreground">Ambient Collective</p>
              </div>
            </div>
          </section>

          {/* Focus Mode */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Focus Mode</h2>
              <Link 
                href="/playlists/focus" 
                className="text-sm font-medium text-primary hover:underline"
              >
                See All →
              </Link>
            </div>
            <div className="max-w-sm overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="aspect-square relative w-full">
                <Image
                  src="/images/piano-studies.png"
                  alt="Piano Studies Album Cover"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-card-foreground">Piano Studies</h3>
                <p className="text-sm text-muted-foreground">Classical Flow</p>
              </div>
            </div>
          </section>
        </div>

        {/* MBTI Profile */}
        <div className="mt-8 max-w-sm">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">INFJ Profile</h2>
            <h3 className="mb-2 text-base font-medium text-card-foreground">The Advocate</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>I - Introvert</li>
              <li>N - Intuitive</li>
              <li>F - Feeling</li>
              <li>J - Judging</li>
            </ul>
            <Link 
              href="/mbti/profile" 
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Explore Deeper →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
