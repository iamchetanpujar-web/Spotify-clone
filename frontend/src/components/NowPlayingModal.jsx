import React from 'react';
import { 
  X, 
  Heart, 
  MoreHorizontal, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Minimize2,
  ListMusic
} from 'lucide-react';
import { useAudio } from './AudioManager';

const NowPlayingModal = ({ isVisible, onClose }) => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    togglePlayPause,
    handleNext,
    handlePrevious,
    seekTo,
    setVolumeLevel,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    isLiked
  } = useAudio();

  if (!isVisible || !currentTrack) return null;

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * (duration || 0);
    seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));
    setVolumeLevel(newVolume);
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={24} />;
    if (volume < 0.5) return <Volume1 size={24} />;
    return <Volume2 size={24} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div className="w-full h-full max-w-6xl mx-auto p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <Minimize2 size={20} />
            </button>
            <h1 className="text-white font-bold text-lg">Now Playing</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <ListMusic size={20} />
            </button>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-16 w-full max-w-4xl">
            {/* Album Art */}
            <div className="flex-shrink-0">
              <img 
                src={currentTrack.image} 
                alt={currentTrack.title}
                className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
                }}
              />
            </div>

            {/* Track Info and Controls */}
            <div className="flex-1 min-w-0">
              {/* Track Info */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-2 truncate">
                  {currentTrack.title}
                </h2>
                <p className="text-xl text-gray-400 truncate">
                  {currentTrack.artist}
                </p>
                {currentTrack.album && (
                  <p className="text-gray-500 mt-1">
                    {currentTrack.album}
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div 
                  className="w-full h-2 bg-gray-700 rounded-full cursor-pointer group mb-2"
                  onClick={handleProgressChange}
                >
                  <div 
                    className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <div className="absolute -right-2 -top-1 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <button 
                  onClick={toggleShuffle}
                  className={`transition-colors ${isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
                >
                  <Shuffle size={24} />
                </button>
                
                <button 
                  onClick={handlePrevious}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack size={24} />
                </button>
                
                <button 
                  onClick={togglePlayPause}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all"
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-black" />
                  ) : (
                    <Play size={24} className="text-black ml-1" />
                  )}
                </button>
                
                <button 
                  onClick={handleNext}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward size={24} />
                </button>
                
                <button 
                  onClick={toggleRepeat}
                  className={`relative transition-colors ${repeatMode > 0 ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
                >
                  <Repeat size={24} />
                  {repeatMode === 2 && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                  )}
                </button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(currentTrack.id)}
                    className={`transition-colors ${
                      isLiked(currentTrack.id) 
                        ? 'text-green-500' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart size={24} className={isLiked(currentTrack.id) ? 'fill-green-500' : ''} />
                  </button>
                  
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal size={24} />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <VolumeIcon />
                  </button>
                  
                  <div 
                    className="w-32 h-1 bg-gray-700 rounded-full cursor-pointer group"
                    onClick={handleVolumeChange}
                  >
                    <div 
                      className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    >
                      <div className="absolute -right-1.5 -top-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingModal;