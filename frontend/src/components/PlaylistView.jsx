import React from 'react';
import { Play, Pause, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { mockSongs, mockPlaylists, mockAlbums } from '../mock';
import { useAudio } from './AudioManager';

const PlaylistView = ({ playlist, onBack }) => {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    toggleLike,
    isLiked
  } = useAudio();

  if (!playlist) return null;

  const isAlbum = playlist.type === 'album';
  const songs = playlist.songs || [];
  const songData = songs.map(songId => mockSongs[songId]).filter(Boolean);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTotalDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playTrack(songs[0], songs, 0);
    }
  };

  const handleSongPlay = (songId, index) => {
    if (currentTrack?.id === songId) {
      togglePlayPause();
    } else {
      playTrack(songId, songs, index);
    }
  };

  const PlayButton = ({ songId, index, size = "w-10 h-10" }) => {
    const isCurrentSong = currentTrack?.id === songId;
    const isCurrentPlaying = isCurrentSong && isPlaying;
    
    return (
      <button
        onClick={() => handleSongPlay(songId, index)}
        className={`${size} rounded-full flex items-center justify-center transition-all duration-200 ${
          isCurrentSong 
            ? 'bg-green-500 hover:bg-green-400' 
            : 'bg-green-500 opacity-0 group-hover:opacity-100 hover:scale-105'
        }`}
      >
        {isCurrentPlaying ? (
          <Pause size={size === "w-10 h-10" ? 16 : 20} className="text-black" />
        ) : (
          <Play size={size === "w-10 h-10" ? 16 : 20} className="text-black ml-0.5" />
        )}
      </button>
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      {/* Header */}
      <div className="p-6">
        <button 
          onClick={onBack}
          className="mb-6 text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        
        <div className="flex items-end gap-6 mb-8">
          <div className="w-60 h-60 rounded-lg overflow-hidden shadow-2xl bg-gray-700 flex-shrink-0">
            {playlist.isLiked ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Heart size={80} className="text-white fill-white" />
              </div>
            ) : (
              <img 
                src={playlist.image} 
                alt={playlist.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
                }}
              />
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-medium text-white uppercase tracking-wider mb-2">
              {isAlbum ? 'Album' : playlist.type}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 break-words">
              {playlist.name || playlist.title}
            </h1>
            
            <div className="flex items-center gap-2 text-sm text-gray-300 flex-wrap">
              {playlist.artist && <span className="font-medium text-white">{playlist.artist}</span>}
              {playlist.year && <><span>•</span><span>{playlist.year}</span></>}
              {playlist.songCount && (
                <>
                  <span>•</span>
                  <span>{playlist.songCount} songs</span>
                </>
              )}
              {playlist.totalDuration && (
                <>
                  <span>•</span>
                  <span>{formatTotalDuration(playlist.totalDuration)}</span>
                </>
              )}
            </div>
            
            {playlist.description && (
              <p className="text-gray-400 mt-3 text-sm">{playlist.description}</p>
            )}
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
          
          {playlist.isLiked && (
            <button className="text-green-500 hover:scale-110 transition-transform">
              <Heart size={32} className="fill-green-500" />
            </button>
          )}
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={32} />
          </button>
        </div>
      </div>

      {/* Songs List */}
      {songData.length > 0 && (
        <div className="px-6 pb-6">
          <div className="mb-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-800 text-sm text-gray-400 font-medium">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-6">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-2 text-right">
                <Clock size={16} className="inline" />
              </div>
            </div>
            
            {/* Songs */}
            <div className="space-y-1">
              {songData.map((song, index) => {
                const isCurrentSong = currentTrack?.id === song.id;
                const isCurrentPlaying = isCurrentSong && isPlaying;
                
                return (
                  <div
                    key={song.id}
                    className={`grid grid-cols-12 gap-4 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors group cursor-pointer ${
                      isCurrentSong ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => handleSongPlay(song.id, index)}
                  >
                    {/* Track Number / Play Button */}
                    <div className="col-span-1 flex items-center justify-center">
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
                        <PlayButton songId={song.id} index={index} />
                      </div>
                    </div>
                    
                    {/* Title and Artist */}
                    <div className="col-span-6 flex items-center gap-3 min-w-0">
                      <img 
                        src={song.image} 
                        alt={song.title}
                        className="w-10 h-10 rounded object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
                        }}
                      />
                      <div className="min-w-0">
                        <div className={`font-medium truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                          {song.title}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {song.artist}
                        </div>
                      </div>
                    </div>
                    
                    {/* Album */}
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm text-gray-400 truncate">
                        {song.album}
                      </span>
                    </div>
                    
                    {/* Duration and Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
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
                        {formatDuration(song.duration)}
                      </span>
                      <button className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {songData.length === 0 && (
        <div className="px-6 pb-6">
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No songs available</div>
            <div className="text-gray-500 text-sm">This playlist is empty or songs are not loaded.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistView;