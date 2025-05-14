import Image from 'next/image'
import Link from 'next/link'

interface Album {
  title: string
  artist: string
  imageUrl: string
}

interface MusicSectionProps {
  title: string
  album: Album
}

export default function MusicSection({ title, album }: MusicSectionProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <Link
          href={`/music/${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium inline-flex items-center"
        >
          See All
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden w-48">
        <div className="relative aspect-square w-full">
          <Image
            src={album.imageUrl}
            alt={album.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white text-sm">
            {album.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {album.artist}
          </p>
        </div>
      </div>
    </div>
  )
} 