import React from 'react';
import { Play, Pause, Heart, MoreHorizontal, Shuffle } from 'lucide-react';
import { mockSongs } from '../mock';
import { useAudio } from './AudioManager';

const ArtistView = ({ artist, onBack }) => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();

  if (!artist) return null;

  // Get songs by this artist
  const artistSongs = Object.values(mockSongs).filter(song => 
    song.artist.toLowerCase().includes(artist.name.toLowerCase())
  );

  const topSongs = artistSongs.slice(0, 5); // Show top 5 songs

  const handlePlayAll = () => {
    if (artistSongs.length > 0) {
      const songIds = artistSongs.map(song => song.id);
      playTrack(songIds[0], songIds, 0);
    }
  };

  const handleSongPlay = (songId, index) => {
    const songIds = artistSongs.map(song => song.id);
    if (currentTrack?.id === songId) {
      togglePlayPause();
    } else {
      playTrack(songId, songIds, index);
    }
  };

  const formatNumber = (num) => {
    if (typeof num === 'string') {
      return num;
    }
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-blue-900 via-gray-900 to-black overflow-y-auto">
      {/* Header */}
      <div className="p-6">
        <button 
          onClick={onBack}
          className="mb-6 text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        
        <div className="flex items-end gap-6 mb-8">
          <div className="w-60 h-60 rounded-full overflow-hidden shadow-2xl bg-gray-700 flex-shrink-0">
            <img 
              src={artist.image} 
              alt={artist.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkFSVElTVDwvdGV4dD4KICA8L3N2Zz4K';
              }}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9V3H13.5L19 8.5V9H21ZM21 11H15L13 13L15 15H21V13H17V11H21ZM9 21H15L21 15V13L19 11H15L9 17V21ZM7 21V17L1 11V13L3 15H7V21H9Z"/>
              </svg>
              <span className="text-sm font-medium text-white uppercase tracking-wider">
                Verified Artist
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 break-words">
              {artist.name}
            </h1>
            
            <div className="text-gray-300 text-lg">
              {artist.monthlyListeners && (
                <span>{formatNumber(artist.monthlyListeners)} monthly listeners</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-6 mb-8">
          <button 
            onClick={handlePlayAll}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all duration-200 shadow-lg"
          >
            <Play size={24} className="text-black ml-1" />
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Heart size={32} />
          </button>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={32} />
          </button>
        </div>
      </div>

      {/* Popular Songs */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold text-white mb-6">Popular</h2>
        
        {topSongs.length > 0 ? (
          <div className="space-y-2">
            {topSongs.map((song, index) => {
              const isCurrentSong = currentTrack?.id === song.id;
              const isCurrentPlaying = isCurrentSong && isPlaying;
              
              return (
                <div
                  key={song.id}
                  className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer ${
                    isCurrentSong ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => handleSongPlay(song.id, index)}
                >
                  {/* Rank */}
                  <div className="w-6 text-center">
                    <span className="text-gray-400 group-hover:hidden text-lg font-medium">
                      {isCurrentPlaying ? (
                        <div className="flex space-x-0.5 justify-center">
                          <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                          <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <div className="hidden group-hover:block">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSongPlay(song.id, index);
                        }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        {isCurrentPlaying ? (
                          <Pause size={12} className="text-black" />
                        ) : (
                          <Play size={12} className="text-black ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Song Info */}
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="w-14 h-14 rounded object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-lg truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                      {song.title}
                    </div>
                    <div className="text-gray-400 truncate">
                      {song.album}
                    </div>
                  </div>
                  
                  {/* Play Count (Mock) */}
                  <div className="text-gray-400 text-sm">
                    {formatNumber(Math.floor(Math.random() * 1000000000))}
                  </div>
                  
                  {/* Duration */}
                  <div className="text-gray-400 text-sm w-12 text-right">
                    {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-12">
            <div className="text-lg mb-2">No songs available</div>
            <div className="text-sm">Songs by this artist will appear here</div>
          </div>
        )}
        
        {/* Show All Button */}
        {artistSongs.length > 5 && (
          <button className="mt-6 text-gray-400 hover:text-white text-sm font-medium">
            See more
          </button>
        )}

        {/* Albums Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Mock albums */}
            {[
              { name: 'Greatest Hits', year: 2023, image: artist.image },
              { name: 'Live Concert', year: 2022, image: artist.image },
              { name: 'Best Of', year: 2021, image: artist.image }
            ].map((album, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer">
                <div className="relative mb-4">
                  <img 
                    src={album.image} 
                    alt={album.name}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 hover:bg-green-400 shadow-lg">
                      <Play size={20} className="text-black ml-0.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-white font-medium text-sm truncate">{album.name}</h3>
                <p className="text-gray-400 text-xs">{album.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistView;