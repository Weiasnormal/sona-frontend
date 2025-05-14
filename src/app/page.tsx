import Header from '@/components/Header'
import MBTICard from '@/components/MBTICard'
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-8">
            {/* Welcome Section */}
            <div className="mb-12">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
              <p className="text-gray-600 mt-1">Your personality type is INFJ</p>
            </div>

            {/* Music Sections */}
            <div className="space-y-12">
              {/* Chill Vibes */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Chill Vibes</h2>
                  <Link href="/playlists/chill" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    See All →
                  </Link>
                </div>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      <Image
                        src="/images/midnight-dreams.jpg"
                        alt="Midnight Dreams Album Cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Midnight Dreams</h3>
                      <p className="text-sm text-gray-500">Ambient Collective</p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Focus Mode */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Focus Mode</h2>
                  <Link href="/playlists/focus" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    See All →
                  </Link>
                </div>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      <Image
                        src="/images/piano-studies.jpg"
                        alt="Piano Studies Album Cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Piano Studies</h3>
                      <p className="text-sm text-gray-500">Classical Flow</p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>

          {/* Right Section - MBTI Profile */}
          <div className="lg:col-span-4">
            <MBTICard />
          </div>
        </div>
      </main>
    </div>
  )
}
