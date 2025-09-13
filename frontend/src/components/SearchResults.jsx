import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { mockSongs, mockSearchResults } from '../mock';
import { useAudio } from './AudioManager';

const SearchResults = ({ searchQuery }) => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, toggleLike, isLiked } = useAudio();

  if (!searchQuery.trim()) {
    return (
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Search Spotify</h1>
        
        {/* Browse Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Pop', color: 'bg-red-500', image: '🎵' },
              { name: 'Hip Hop', color: 'bg-orange-500', image: '🎤' },
              { name: 'Rock', color: 'bg-blue-500', image: '🎸' },
              { name: 'Jazz', color: 'bg-green-500', image: '🎷' },
              { name: 'Classical', color: 'bg-purple-500', image: '🎼' },
              { name: 'Electronic', color: 'bg-pink-500', image: '🎧' }
            ].map((category, index) => (
              <div 
                key={index}
                className={`${category.color} rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden h-24`}
              >
                <div className="text-white font-bold text-lg">{category.name}</div>
                <div className="absolute bottom-2 right-2 text-3xl transform rotate-12">
                  {category.image}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Filter songs based on search query
  const filteredSongs = Object.values(mockSongs).filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const PlayButton = ({ songId, songs, index, size = "w-10 h-10" }) => {
    const isCurrentSong = currentTrack?.id === songId;
    const isCurrentPlaying = isCurrentSong && isPlaying;
    
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isCurrentSong) {
            togglePlayPause();
          } else {
            playTrack(songId, songs, index);
          }
        }}
        className={`${size} rounded-full flex items-center justify-center transition-all duration-200 ${
          isCurrentSong 
            ? 'bg-green-500 hover:bg-green-400' 
            : 'bg-green-500 opacity-0 group-hover:opacity-100 hover:scale-105'
        }`}
      >
        {isCurrentPlaying ? (
          <Pause size={16} className="text-black" />
        ) : (
          <Play size={16} className="text-black ml-0.5" />
        )}
      </button>
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Search results for "{searchQuery}"
        </h1>
        <p className="text-gray-400">{filteredSongs.length} songs found</p>
      </div>

      {/* Top Result */}
      {filteredSongs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Top result</h2>
          <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer max-w-md">
            <div className="flex items-center gap-4">
              <img 
                src={filteredSongs[0].image} 
                alt={filteredSongs[0].title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">{filteredSongs[0].title}</h3>
                <p className="text-gray-400">{filteredSongs[0].artist}</p>
                <span className="inline-block px-2 py-1 bg-gray-800 text-white text-xs rounded-full mt-2">
                  Song
                </span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayButton 
                  songId={filteredSongs[0].id} 
                  songs={filteredSongs.map(s => s.id)} 
                  index={0}
                  size="w-12 h-12"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Songs List */}
      {filteredSongs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
          <div className="space-y-2">
            {filteredSongs.map((song, index) => {
              const isCurrentSong = currentTrack?.id === song.id;
              const isCurrentPlaying = isCurrentSong && isPlaying;
              
              return (
                <div
                  key={song.id}
                  className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer ${
                    isCurrentSong ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => {
                    if (isCurrentSong) {
                      togglePlayPause();
                    } else {
                      playTrack(song.id, filteredSongs.map(s => s.id), index);
                    }
                  }}
                >
                  {/* Play Button / Number */}
                  <div className="w-10 flex items-center justify-center">
                    <span className="text-gray-400 group-hover:hidden text-sm">
                      {isCurrentPlaying ? (
                        <div className="flex space-x-0.5">
                          <div className="w-1 h-3 bg-green-500 animate-pulse"></div>
                          <div className="w-1 h-3 bg-green-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-1 h-3 bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <div className="hidden group-hover:block">
                      <PlayButton 
                        songId={song.id} 
                        songs={filteredSongs.map(s => s.id)} 
                        index={index} 
                      />
                    </div>
                  </div>
                  
                  {/* Song Info */}
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                      {song.title}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                      {song.artist}
                    </div>
                  </div>
                  
                  {/* Album */}
                  <div className="hidden md:block text-sm text-gray-400 truncate max-w-xs">
                    {song.album}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(song.id);
                      }}
                      className={`transition-colors ${
                        isLiked(song.id) 
                          ? 'text-green-500' 
                          : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:text-white'
                      }`}
                    >
                      <Heart size={16} className={isLiked(song.id) ? 'fill-green-500' : ''} />
                    </button>
                    
                    <span className="text-sm text-gray-400 w-12 text-right">
                      {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredSongs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No results found for "{searchQuery}"</div>
          <div className="text-gray-500 text-sm">
            Try searching for something else or check your spelling.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;