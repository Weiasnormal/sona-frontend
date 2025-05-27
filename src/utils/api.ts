// API utility functions

/**
 * Retry a function with exponential backoff
 * @param fn The function to retry
 * @param retries Number of retries
 * @param delay Initial delay in ms
 * @returns Promise with the result of the function
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>, 
  retries = 3, 
  delay = 300
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    // Wait for the specified delay
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry with exponential backoff
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}

/**
 * Generate detailed mock recommendations based on MBTI type
 * This provides a better fallback experience with more tracks
 */
function generateDetailedMockRecommendations(mbti: string) {
  // Create different mock tracks based on MBTI type
  const getMockTracksForType = (type: string) => {
    // Categorize by function pairs (NF, NT, SF, ST)
    const functionPair = getFunctionPair(type);
    
    // Base tracks that appear for all types
    const baseTracks = [
      { name: 'Calm Waters', artist: 'Ocean Sounds', id: 'local-1', image: '/images/midnight-dreams.png' },
      { name: 'Mountain Air', artist: 'Nature Vibes', id: 'local-2', image: '/images/midnight-dreams.png' },
      { name: 'City Lights', artist: 'Urban Beats', id: 'local-3', image: '/images/midnight-dreams.png' }
    ];
    
    // Additional tracks based on function pair
    let specificTracks = [];
    
    if (functionPair === 'NF') {
      specificTracks = [
        { name: "Dreamer's Canvas", artist: 'Imagination', id: 'nf-1', image: '/images/midnight-dreams.png' },
        { name: 'Soul Connection', artist: 'Empathy', id: 'nf-2', image: '/images/midnight-dreams.png' },
        { name: 'Idealist Journey', artist: 'Visionary', id: 'nf-3', image: '/images/midnight-dreams.png' },
        { name: 'Harmony in Chaos', artist: 'Balance Seekers', id: 'nf-4', image: '/images/midnight-dreams.png' },
        { name: 'Emotional Depths', artist: 'Inner Light', id: 'nf-5', image: '/images/midnight-dreams.png' },
        { name: 'Authentic Voice', artist: 'True Self', id: 'nf-6', image: '/images/midnight-dreams.png' },
        { name: 'Meaningful Connections', artist: 'Purpose Finders', id: 'nf-7', image: '/images/midnight-dreams.png' },
        { name: 'Inspirational Heights', artist: 'Motivation', id: 'nf-8', image: '/images/midnight-dreams.png' },
        { name: 'Creative Flow', artist: 'Artistic Mind', id: 'nf-9', image: '/images/midnight-dreams.png' },
        { name: 'Compassionate Heart', artist: 'Kindness', id: 'nf-10', image: '/images/midnight-dreams.png' }
      ];
    } else if (functionPair === 'NT') {
      specificTracks = [
        { name: 'Logical Progression', artist: 'Rational Mind', id: 'nt-1', image: '/images/midnight-dreams.png' },
        { name: 'Strategic Vision', artist: 'Master Plan', id: 'nt-2', image: '/images/midnight-dreams.png' },
        { name: 'Innovative Concepts', artist: 'Breakthrough', id: 'nt-3', image: '/images/midnight-dreams.png' },
        { name: 'Analytical Rhythm', artist: 'Deep Thinker', id: 'nt-4', image: '/images/midnight-dreams.png' },
        { name: 'Theoretical Framework', artist: 'Abstract Logic', id: 'nt-5', image: '/images/midnight-dreams.png' },
        { name: 'Intellectual Challenge', artist: 'Mind Games', id: 'nt-6', image: '/images/midnight-dreams.png' },
        { name: 'System Architecture', artist: 'Blueprint', id: 'nt-7', image: '/images/midnight-dreams.png' },
        { name: 'Critical Analysis', artist: 'Objective View', id: 'nt-8', image: '/images/midnight-dreams.png' },
        { name: 'Efficiency Matrix', artist: 'Optimization', id: 'nt-9', image: '/images/midnight-dreams.png' },
        { name: 'Competence Showcase', artist: 'Excellence', id: 'nt-10', image: '/images/midnight-dreams.png' }
      ];
    } else if (functionPair === 'SF') {
      specificTracks = [
        { name: 'Practical Harmony', artist: 'Down to Earth', id: 'sf-1', image: '/images/midnight-dreams.png' },
        { name: 'Social Connections', artist: 'Community', id: 'sf-2', image: '/images/midnight-dreams.png' },
        { name: 'Sensory Experience', artist: 'Present Moment', id: 'sf-3', image: '/images/midnight-dreams.png' },
        { name: 'Helpful Hands', artist: 'Service', id: 'sf-4', image: '/images/midnight-dreams.png' },
        { name: 'Traditional Values', artist: 'Heritage', id: 'sf-5', image: '/images/midnight-dreams.png' },
        { name: 'Cooperative Spirit', artist: 'Team Player', id: 'sf-6', image: '/images/midnight-dreams.png' },
        { name: 'Detailed Care', artist: 'Attentive', id: 'sf-7', image: '/images/midnight-dreams.png' },
        { name: 'Nurturing Environment', artist: 'Caretaker', id: 'sf-8', image: '/images/midnight-dreams.png' },
        { name: 'Reliable Rhythm', artist: 'Dependable', id: 'sf-9', image: '/images/midnight-dreams.png' },
        { name: 'Warm Atmosphere', artist: 'Friendly', id: 'sf-10', image: '/images/midnight-dreams.png' }
      ];
    } else { // ST
      specificTracks = [
        { name: 'Structured System', artist: 'Organized', id: 'st-1', image: '/images/midnight-dreams.png' },
        { name: 'Practical Solutions', artist: 'Problem Solver', id: 'st-2', image: '/images/midnight-dreams.png' },
        { name: 'Factual Analysis', artist: 'Concrete Data', id: 'st-3', image: '/images/midnight-dreams.png' },
        { name: 'Efficient Process', artist: 'Streamlined', id: 'st-4', image: '/images/midnight-dreams.png' },
        { name: 'Realistic Approach', artist: 'Pragmatic', id: 'st-5', image: '/images/midnight-dreams.png' },
        { name: 'Technical Expertise', artist: 'Specialist', id: 'st-6', image: '/images/midnight-dreams.png' },
        { name: 'Methodical Rhythm', artist: 'Step by Step', id: 'st-7', image: '/images/midnight-dreams.png' },
        { name: 'Decisive Action', artist: 'Quick Response', id: 'st-8', image: '/images/midnight-dreams.png' },
        { name: 'Resource Management', artist: 'Efficiency', id: 'st-9', image: '/images/midnight-dreams.png' },
        { name: 'Tactical Execution', artist: 'Implementation', id: 'st-10', image: '/images/midnight-dreams.png' }
      ];
    }
    
    // Combine base tracks with specific tracks
    return [...baseTracks, ...specificTracks];
  };
  
  return {
    success: true,
    message: 'Generated fallback recommendations',
    mbti: mbti,
    recommendations: {
      tracks: getMockTracksForType(mbti)
    },
    isApiData: false
  };
}

/**
 * Check if we're in development mode
 * In development, we'll use mock data if the API is unavailable
 */
const isDevelopment = process.env.NODE_ENV === 'development'; // Don't force development mode

/**
 * Interface for the Spotify API response structure
 * This is flexible to handle different response formats
 */
interface SpotifyResponse {
  // Original expected structure
  SpotifyRoot?: {
    tracks?: {
      items?: Array<{
        track?: {
          name?: string;
          artists?: Array<{ name?: string }>;
          album?: {
            images?: Array<{ url?: string }>;
          };
          id?: string;
          preview_url?: string;
        };
      }>;
    };
  };
  
  // Alternative structure that might be returned
  tracks?: Array<{
    name?: string;
    artists?: Array<{ name?: string }>;
    album?: {
      images?: Array<{ url?: string }>;
    };
    id?: string;
    preview_url?: string;
  }>;
  
  // Another possible structure
  items?: Array<{
    track?: {
      name?: string;
      artists?: Array<{ name?: string }>;
      album?: {
        images?: Array<{ url?: string }>;
      };
      id?: string;
      preview_url?: string;
    };
  }>;
}

/**
 * Transform Spotify API response to our frontend format
 * This function is now more flexible to handle different response structures
 */
function transformSpotifyResponse(spotifyResponse: any) {
  console.log('Transforming response:', spotifyResponse);
  
  let tracks: any[] = [];
  
  // Try to extract tracks from different possible structures
  if (spotifyResponse.SpotifyRoot?.tracks?.items) {
    // Original expected structure
    tracks = spotifyResponse.SpotifyRoot.tracks.items
      .filter((item: any) => item.track)
      .map((item: any) => {
        const track = item.track;
        return {
          name: track.name || 'Unknown Track',
          artist: track.artists?.[0]?.name || 'Unknown Artist',
          image: track.album?.images?.[0]?.url || '/images/midnight-dreams.png',
          id: track.id || 'unknown',
          preview_url: track.preview_url
        };
      });
  } else if (spotifyResponse.tracks) {
    // Direct tracks array
    if (Array.isArray(spotifyResponse.tracks)) {
      tracks = spotifyResponse.tracks.map((track: any) => ({
        name: track.name || 'Unknown Track',
        artist: track.artists?.[0]?.name || 'Unknown Artist',
        image: track.album?.images?.[0]?.url || '/images/midnight-dreams.png',
        id: track.id || 'unknown',
        preview_url: track.preview_url
      }));
    } else if (spotifyResponse.tracks.items) {
      // Tracks with items
      tracks = spotifyResponse.tracks.items
        .filter((item: any) => item.track || item)
        .map((item: any) => {
          const track = item.track || item;
          return {
            name: track.name || 'Unknown Track',
            artist: track.artists?.[0]?.name || 'Unknown Artist',
            image: track.album?.images?.[0]?.url || '/images/midnight-dreams.png',
            id: track.id || 'unknown',
            preview_url: track.preview_url
          };
        });
    }
  } else if (spotifyResponse.items) {
    // Direct items array
    tracks = spotifyResponse.items
      .filter((item: any) => item.track || item)
      .map((item: any) => {
        const track = item.track || item;
        return {
          name: track.name || 'Unknown Track',
          artist: track.artists?.[0]?.name || 'Unknown Artist',
          image: track.album?.images?.[0]?.url || '/images/midnight-dreams.png',
          id: track.id || 'unknown',
          preview_url: track.preview_url
        };
      });
  }
  
  console.log('Transformed tracks:', tracks);
  
  return {
    success: true,
    message: 'Retrieved recommendations',
    recommendations: { tracks }
  };
}

/**
 * Send MBTI data to the Sona API with retry logic and fallback
 * @param mbtiData The MBTI data to send
 * @returns Promise with the API response or fallback data
 */
export async function sendMBTIData(mbtiData: {
  mbti: string;
  function_pair: string;
  danceablitiy: number;
  liveliness: number;
  valance: number;
  energy: number;
  instrumentalness: number;
  loudness: number;
  tempo: number;
}) {
  console.log('Attempting to call the Sona API...');
  
  try {
    // Prepare the request body with lowercase field names to match API expectations
    const requestBody = {
      mbti: mbtiData.mbti,
      function_pair: mbtiData.function_pair,
      danceablitiy: mbtiData.danceablitiy, // Note: Both frontend and backend have this typo
      liveliness: mbtiData.liveliness,
      valance: mbtiData.valance,
      energy: mbtiData.energy,
      instrumentalness: mbtiData.instrumentalness,
      Loudness: mbtiData.loudness,
      Tempo: mbtiData.tempo
    };
    
    // Use retry with backoff for the fetch call
    const spotifyResponse = await retryWithBackoff(async () => {
      console.log('Making API request with body:', requestBody);
      
      const response = await fetch('https://sonaapi.onrender.com/api/MBTI/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        // Add mode: 'cors' to explicitly handle CORS
        mode: 'no-cors',
        // Increase timeout to 30 seconds
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      console.log('API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Raw API Response:', responseData);
      
      return responseData;
    }, 3); // Retry up to 3 times (4 attempts total)
    
    // Transform the Spotify response to our frontend format
    return transformSpotifyResponse(spotifyResponse);
    
  } catch (error) {
    console.error('Error sending MBTI data:', error);
    
    if (error instanceof TypeError && error.message.includes('AbortError')) {
      console.error('API request timed out after 30 seconds');
    } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
      console.error('Network error - check if the API is accessible');
    } else if (error instanceof Error) {
      console.error('Detailed error:', error.message, error.stack);
    }
    
    // Return mock data as fallback only if the API call fails
    console.log('Using fallback recommendations due to API error');
    return generateDetailedMockRecommendations(mbtiData.mbti);
  }
}

/**
 * Get the function pair from an MBTI type
 * @param mbti The MBTI type (e.g., "ENFJ")
 * @returns The function pair (e.g., "NF")
 */
export function getFunctionPair(mbti: string): string {
  if (!mbti || mbti.length !== 4) {
    return "NF"; // Default to NF if invalid
  }
  
  // Extract the second and third letters (e.g., "NF" from "ENFJ")
  return mbti.substring(1, 3);
}

/**
 * Example usage of the sendMBTIData function
 */
export async function exampleApiCall() {
  const mbtiData = {
    mbti: "ENFJ",
    function_pair: "NF",
    danceablitiy: 0.56468,
    liveliness: 0.136674,
    valance: 0.433126,
    energy: 0.60764,
    instrumentalness: 0.060110227,
    loudness: -7.75768,
    tempo: 123.76112
  };

  try {
    const response = await sendMBTIData(mbtiData);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    return null;
  }
}
