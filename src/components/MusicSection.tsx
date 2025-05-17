import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface Album {
  title: string
  artist: string
  imageUrl: string
}

interface MusicSectionProps {
  title: string
  album: Album
  href: string
}

export default function MusicSection({ title, album, href }: MusicSectionProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 ease-in-out">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-5 lg:p-6 2xl:p-7 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-semibold tracking-tight">{title}</h2>
            <Link 
              href={href}
              className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-primary hover:text-primary/90 font-medium transition-colors"
            >
              See All
            </Link>
          </div>

          {/* Album Cover */}
          <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
            <Image
              src={album.imageUrl}
              alt={`${album.title} by ${album.artist}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 2560px) 20vw, (min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Album Info */}
          <div className="p-4 sm:p-5 lg:p-6 2xl:p-7 space-y-2 2xl:space-y-3">
            <h3 className="font-medium text-base sm:text-lg lg:text-xl 2xl:text-2xl tracking-tight">
              {album.title}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-muted-foreground">
              {album.artist}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 