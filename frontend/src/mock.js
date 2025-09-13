// Mock data for Spotify clone

// Sample audio URLs (royalty-free music for demo)
export const sampleAudioUrls = [
  'https://www.soundjay.com/misc/sounds-for-demos/beep-07a.wav', // Short beep for demo
  'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav', // Sample audio
  'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav', // Sample audio
  'https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav', // Sample audio
  'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav' // Sample audio
];

export const mockSongs = {
  // Justin Bieber songs
  'jb1': {
    id: 'jb1',
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    album: 'Purpose',
    duration: 213,
    image: 'https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[0],
    genre: 'Pop'
  },
  'jb2': {
    id: 'jb2',
    title: 'Sorry',
    artist: 'Justin Bieber',
    album: 'Purpose',
    duration: 201,
    image: 'https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[1],
    genre: 'Pop'
  },
  'jb3': {
    id: 'jb3',
    title: 'What Do You Mean?',
    artist: 'Justin Bieber',
    album: 'Purpose',
    duration: 206,
    image: 'https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[2],
    genre: 'Pop'
  },
  'jb4': {
    id: 'jb4',
    title: 'Baby',
    artist: 'Justin Bieber feat. Ludacris',
    album: 'My World 2.0',
    duration: 214,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[3],
    genre: 'Pop'
  },
  // Ed Sheeran songs
  'es1': {
    id: 'es1',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 233,
    image: 'https://images.unsplash.com/photo-1690477554481-d8f79a4da0d0?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[4],
    genre: 'Pop'
  },
  'es2': {
    id: 'es2',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 263,
    image: 'https://images.unsplash.com/photo-1690477554481-d8f79a4da0d0?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[0],
    genre: 'Pop'
  },
  'es3': {
    id: 'es3',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    album: 'x (Multiply)',
    duration: 281,
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[1],
    genre: 'Pop'
  },
  // The Weeknd songs
  'tw1': {
    id: 'tw1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    image: 'https://images.unsplash.com/photo-1507246249828-b7a6c99f2ce1?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[2],
    genre: 'R&B'
  },
  'tw2': {
    id: 'tw2',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 215,
    image: 'https://images.unsplash.com/photo-1507246249828-b7a6c99f2ce1?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[3],
    genre: 'R&B'
  },
  // Billie Eilish songs
  'be1': {
    id: 'be1',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    duration: 194,
    image: 'https://images.pexels.com/photos/8044161/pexels-photo-8044161.jpeg?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[4],
    genre: 'Alternative'
  },
  'be2': {
    id: 'be2',
    title: 'Therefore I Am',
    artist: 'Billie Eilish',
    album: 'Happier Than Ever',
    duration: 174,
    image: 'https://images.pexels.com/photos/8044161/pexels-photo-8044161.jpeg?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[0],
    genre: 'Alternative'
  },
  // Harry Styles songs
  'hs1': {
    id: 'hs1',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[1],
    genre: 'Pop'
  },
  'hs2': {
    id: 'hs2',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harrys House',
    duration: 167,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[2],
    genre: 'Pop'
  },
  // Olivia Rodrigo songs
  'or1': {
    id: 'or1',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[3],
    genre: 'Pop'
  },
  'or2': {
    id: 'or2',
    title: 'Drivers License',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 242,
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    audioUrl: sampleAudioUrls[4],
    genre: 'Pop'
  }
};

export const mockPlaylists = [
  {
    id: '1',
    name: 'Liked Songs',
    type: 'playlist',
    songCount: 134,
    image: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?w=300&h=300&fit=crop',
    isLiked: true,
    description: 'Your favorite songs all in one place',
    songs: ['jb1', 'es1', 'tw1', 'be1', 'hs1', 'or1', 'jb2', 'es2', 'tw2', 'be2'],
    totalDuration: 2156
  },
  {
    id: '2',
    name: 'Never: The Playlist',
    type: 'playlist',
    artist: 'Rick Astley',
    image: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=300&h=300&fit=crop',
    description: 'Classic hits that never get old',
    songs: ['jb4', 'es3', 'hs2'],
    songCount: 3,
    totalDuration: 762
  },
  {
    id: '3',
    name: 'Today\'s Top Hits',
    type: 'playlist',
    artist: 'Spotify',
    image: 'https://images.unsplash.com/photo-1644855640845-ab57a047320e?w=300&h=300&fit=crop',
    description: 'The biggest songs right now',
    songs: ['jb1', 'jb2', 'es1', 'es2', 'tw1', 'be1', 'hs1', 'or1'],
    songCount: 8,
    totalDuration: 1654
  },
  {
    id: '4',
    name: 'RapCaviar',
    type: 'playlist',
    artist: 'Spotify',
    image: 'https://images.pexels.com/photos/2191013/pexels-photo-2191013.jpeg?w=300&h=300&fit=crop',
    description: 'New music from hip hop\'s biggest stars',
    songs: ['tw1', 'tw2', 'be1', 'be2', 'hs1', 'or1'],
    songCount: 6,
    totalDuration: 1142
  },
  {
    id: '5',
    name: 'Mrbeast',
    type: 'artist',
    image: 'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=300&h=300&fit=crop',
    followers: '1,234,567',
    monthlyListeners: '987,654'
  },
  {
    id: '6',
    name: 'Dil ke kareeb❤️',
    type: 'playlist',
    artist: 'boy.who.loved',
    image: 'https://images.unsplash.com/photo-1501837303764-ada599fdac6c?w=300&h=300&fit=crop',
    description: 'Songs close to the heart',
    songs: ['jb1', 'es2', 'hs2', 'or2'],
    songCount: 4,
    totalDuration: 878
  },
  {
    id: '7',
    name: 'GYM PHONK PLAYLIST🔥💪',
    type: 'playlist',
    artist: 'GYM',
    image: 'https://images.unsplash.com/photo-1507246249828-b7a6c99f2ce1?w=300&h=300&fit=crop',
    description: 'High energy tracks for your workout',
    songs: ['tw1', 'be1', 'hs1', 'or1', 'jb2'],
    songCount: 5,
    totalDuration: 946
  },
  {
    id: '8',
    name: 'The Mythpat Podcast',
    type: 'podcast',
    artist: 'Spotify Studios',
    image: 'https://images.unsplash.com/photo-1690477554481-d8f79a4da0d0?w=300&h=300&fit=crop',
    description: 'Gaming and entertainment podcast',
    episodes: 45
  },
  {
    id: '9',
    name: 'Alan Walker',
    type: 'artist',
    image: 'https://images.pexels.com/photos/8044161/pexels-photo-8044161.jpeg?w=300&h=300&fit=crop',
    followers: '2,345,678',
    monthlyListeners: '1,876,543'
  },
  {
    id: '10',
    name: 'Love Yourself',
    type: 'song',
    artist: 'Justin Bieber',
    image: 'https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg?w=300&h=300&fit=crop'
  }
];

export const mockAlbums = [
  {
    id: 'purpose',
    title: 'Purpose',
    artist: 'Justin Bieber',
    year: 2015,
    image: 'https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg?w=300&h=300&fit=crop',
    songs: ['jb1', 'jb2', 'jb3'],
    totalDuration: 620,
    type: 'album'
  },
  {
    id: 'divide',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    year: 2017,
    image: 'https://images.unsplash.com/photo-1690477554481-d8f79a4da0d0?w=300&h=300&fit=crop',
    songs: ['es1', 'es2'],
    totalDuration: 496,
    type: 'album'
  },
  {
    id: 'afterhours',
    title: 'After Hours',
    artist: 'The Weeknd',
    year: 2020,
    image: 'https://images.unsplash.com/photo-1507246249828-b7a6c99f2ce1?w=300&h=300&fit=crop',
    songs: ['tw1', 'tw2'],
    totalDuration: 415,
    type: 'album'
  }
];

export const mockDailyMixes = [
  {
    id: 'dm1',
    title: 'Daily Mix 1',
    subtitle: 'Taylor Swift, Ariana Grande, Dua Lipa and more',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  },
  {
    id: 'dm2',
    title: 'Daily Mix 2',
    subtitle: 'The Weeknd, Drake, Post Malone and more',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop'
  },
  {
    id: 'dm3',
    title: 'Daily Mix 3',
    subtitle: 'Lewis Capaldi, Adele, Harry Styles and more',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'
  },
  {
    id: 'dm4',
    title: 'Daily Mix 4',
    subtitle: 'Billie Eilish, Lorde, Phoebe Bridgers and more',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop'
  },
  {
    id: 'dm5',
    title: 'Daily Mix 5',
    subtitle: 'Imagine Dragons, OneRepublic, Maroon 5 and more',
    image: 'https://images.pexels.com/photos/2885788/pexels-photo-2885788.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 'dm6',
    title: 'Daily Mix 6',
    subtitle: 'Eminem, Kendrick Lamar, J. Cole and more',
    image: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?w=300&h=300&fit=crop'
  }
];

export const mockDiscoverWeekly = [
  {
    id: 'dw1',
    title: 'Discover Weekly',
    artist: 'Your weekly mixtape of fresh music',
    image: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?w=300&h=300&fit=crop'
  },
  {
    id: 'dw2',
    title: 'Release Radar',
    artist: 'Catch all the latest music from artists you follow',
    image: 'https://images.unsplash.com/photo-1644855640845-ab57a047320e?w=300&h=300&fit=crop'
  },
  {
    id: 'dw3',
    title: 'Pop Hits',
    artist: 'The biggest pop songs right now',
    image: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=300&h=300&fit=crop'
  },
  {
    id: 'dw4',
    title: 'Hip Hop Central',
    artist: 'The hottest tracks in hip hop',
    image: 'https://images.pexels.com/photos/2191013/pexels-photo-2191013.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 'dw5',
    title: 'Rock Classics',
    artist: 'Timeless rock anthems',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  },
  {
    id: 'dw6',
    title: 'Chill Vibes',
    artist: 'Laid back songs to help you relax',
    image: 'https://images.unsplash.com/photo-1507246249828-b7a6c99f2ce1?w=300&h=300&fit=crop'
  }
];

export const mockCurrentTrack = {
  id: 'current',
  title: 'Love Yourself',
  artist: 'Justin Bieber',
  album: 'Purpose',
  image: 'https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg?w=300&h=300&fit=crop',
  duration: 213,
  currentTime: 104,
  isPlaying: true
};

export const mockRelatedVideos = [
  {
    id: 'rv1',
    title: 'STAY',
    artist: 'The Kid LAROI, Justin Bieber',
    image: 'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=300&h=300&fit=crop'
  },
  {
    id: 'rv2',
    title: 'Santa Claus Is Coming to Town',
    artist: 'Justin Bieber',
    image: 'https://images.unsplash.com/photo-1501837303764-ada599fdac6c?w=300&h=300&fit=crop'
  }
];

export const mockRecentlyPlayed = [
  {
    id: 'rp1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1507246249828-b7a6c99f2ce1?w=300&h=300&fit=crop'
  },
  {
    id: 'rp2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    image: 'https://images.unsplash.com/photo-1690477554481-d8f79a4da0d0?w=300&h=300&fit=crop'
  },
  {
    id: 'rp3',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    image: 'https://images.pexels.com/photos/8044161/pexels-photo-8044161.jpeg?w=300&h=300&fit=crop'
  }
];

export const mockSearchResults = {
  songs: [
    {
      id: 's1',
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      album: 'Fine Line',
      duration: 174,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
    },
    {
      id: 's2',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: 178,
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop'
    }
  ],
  artists: [
    {
      id: 'a1',
      name: 'Taylor Swift',
      followers: '90,000,000',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'
    }
  ],
  albums: [
    {
      id: 'al1',
      title: 'Folklore',
      artist: 'Taylor Swift',
      year: 2020,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop'
    }
  ]
};