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
  href?: string
}

export default function MusicSection({ title, album, href }: MusicSectionProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {title}
        </h2>
        <Link
          href={href || `/music/${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/90"
        >
          See All
          <span className="ml-1">→</span>
        </Link>
      </div>

      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square">
          <Image
            src={album.imageUrl}
            alt={`${album.title} album cover`}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-card-foreground">
            {album.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {album.artist}
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 