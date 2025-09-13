import React from 'react';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { mockDailyMixes, mockJafikiData, mockRecentlyPlayed } from '../mock';

const MainContent = ({ currentView, selectedPlaylist, isPlaying, onPlayPause, currentTrack, onTrackSelect }) => {
  
  const PlayButton = ({ onClick, isCurrentPlaying, size = "w-12 h-12" }) => (
    <button 
      onClick={onClick}
      className={`${size} bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 hover:bg-green-400 shadow-lg`}
    >
      {isCurrentPlaying ? (
        <Pause size={size === "w-12 h-12" ? 20 : 16} className="text-black" />
      ) : (
        <Play size={size === "w-12 h-12" ? 20 : 16} className="text-black ml-0.5" />
      )}
    </button>
  );

  const MusicCard = ({ item, showArtist = true, onPlay }) => (
    <div className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer">
      <div className="relative mb-4">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full aspect-square object-cover rounded-md"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
          }}
        />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayButton onClick={onPlay} />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
        {showArtist && item.subtitle && (
          <p className="text-gray-400 text-xs truncate">{item.subtitle}</p>
        )}
        {showArtist && item.artist && (
          <p className="text-gray-400 text-xs truncate">{item.artist}</p>
        )}
      </div>
    </div>
  );

  if (currentView === 'search') {
    return (
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Search Spotify</h1>
        <div className="text-gray-400 text-center mt-20">
          Start typing to search for music, artists, albums, and more...
        </div>
      </div>
    );
  }

  if (currentView === 'playlist' && selectedPlaylist) {
    return (
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-black">
        <div className="p-6">
          <div className="flex items-end gap-6 mb-8">
            <img 
              src={selectedPlaylist.image} 
              alt={selectedPlaylist.name}
              className="w-60 h-60 object-cover rounded-lg shadow-2xl"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-white uppercase tracking-wider mb-2">
                {selectedPlaylist.type}
              </p>
              <h1 className="text-6xl font-bold text-white mb-6">{selectedPlaylist.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                {selectedPlaylist.artist && <span>{selectedPlaylist.artist}</span>}
                {selectedPlaylist.songCount && (
                  <>
                    <span>•</span>
                    <span>{selectedPlaylist.songCount} songs</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mb-8">
            <PlayButton onClick={onPlayPause} isCurrentPlaying={isPlaying} />
            <MoreHorizontal size={32} className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <div className="p-6">
        {/* Header Pills */}
        <div className="flex gap-3 mb-8">
          <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:scale-105 transition-transform">
            All
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
            Music
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
            Podcasts
          </button>
        </div>

        {/* Made For Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Made For Chetu</h2>
            <button className="text-sm font-medium text-gray-400 hover:text-white hover:underline">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {mockDailyMixes.map((mix) => (
              <MusicCard 
                key={mix.id}
                item={mix}
                onPlay={() => onTrackSelect({
                  id: mix.id,
                  title: mix.title,
                  artist: 'Various Artists',
                  image: mix.image
                })}
              />
            ))}
          </div>
        </section>

        {/* Jafiki Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">More like Jafiki</h2>
            <button className="text-sm font-medium text-gray-400 hover:text-white hover:underline">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockJafikiData.map((item) => (
              <MusicCard 
                key={item.id}
                item={item}
                onPlay={() => onTrackSelect({
                  id: item.id,
                  title: item.title,
                  artist: item.artist,
                  image: item.image
                })}
              />
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recently played</h2>
            <button className="text-sm font-medium text-gray-400 hover:text-white hover:underline">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockRecentlyPlayed.map((item) => (
              <MusicCard 
                key={item.id}
                item={item}
                onPlay={() => onTrackSelect({
                  id: item.id,
                  title: item.title,
                  artist: item.artist,
                  image: item.image
                })}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainContent;