export interface MusicTrack {
  title: string;
  artist: string;
  imageUrl: string;
  mood: {
    energy: number;
    complexity: number;
    emotion: number;
    structure: number;
  };
  spotifyUrl?: string;
  album?: string; // Added album field for sorting
}

export interface PlaylistData {
  title: string;
  description: string;
  tracks: MusicTrack[];
  gradient: string;
  trait?: string;
  type: 'compatible' | 'mbti';
  personalityType?: string;
}