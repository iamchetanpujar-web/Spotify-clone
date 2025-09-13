import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2,
  Mic2,
  ListMusic,
  Monitor,
  VolumeX,
  Volume1,
  Maximize2,
  Heart
} from 'lucide-react';
import { useAudio } from './AudioManager';

const Player = ({ onRightPanelToggle, isRightPanelVisible }) => {
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
    if (isMuted || volume === 0) return <VolumeX size={16} />;
    if (volume < 0.5) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  if (!currentTrack) {
    return (
      <div className="h-20 bg-black border-t border-gray-800 flex items-center justify-center">
        <div className="text-gray-500 text-sm">Select a song to play</div>
      </div>
    );
  }

  return (
    <div className="h-20 bg-black border-t border-gray-800 flex items-center px-4">
      {/* Current Track Info */}
      <div className="flex items-center gap-3 w-80 min-w-0">
        <img 
          src={currentTrack.image} 
          alt={currentTrack.title}
          className="w-14 h-14 rounded object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">
            {currentTrack.title}
          </div>
          <div className="text-gray-400 text-xs truncate">
            {currentTrack.artist}
          </div>
        </div>
        <button 
          onClick={() => toggleLike(currentTrack.id)}
          className={`transition-colors ${
            isLiked(currentTrack.id) 
              ? 'text-green-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={16} className={isLiked(currentTrack.id) ? 'fill-green-500' : ''} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center gap-2 px-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleShuffle}
            className={`transition-colors ${isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle size={16} />
            {isShuffled && (
              <div className="w-1 h-1 bg-green-500 rounded-full absolute -bottom-1"></div>
            )}
          </button>
          <button 
            onClick={handlePrevious}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack size={16} />
          </button>
          <button 
            onClick={togglePlayPause}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all"
          >
            {isPlaying ? (
              <Pause size={16} className="text-black" />
            ) : (
              <Play size={16} className="text-black ml-0.5" />
            )}
          </button>
          <button 
            onClick={handleNext}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward size={16} />
          </button>
          <button 
            onClick={toggleRepeat}
            className={`relative transition-colors ${repeatMode > 0 ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat size={16} />
            {repeatMode === 2 && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
            )}
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full max-w-lg">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div 
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
            onClick={handleProgressChange}
          >
            <div 
              className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute -right-1.5 -top-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 w-80 justify-end">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Mic2 size={16} />
        </button>
        <button 
          onClick={onRightPanelToggle}
          className={`transition-colors ${isRightPanelVisible ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
        >
          <ListMusic size={16} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Monitor size={16} />
        </button>
        
        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <VolumeIcon />
          </button>
          <div 
            className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer group"
            onClick={handleVolumeChange}
          >
            <div 
              className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            >
              <div className="absolute -right-1.5 -top-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-white transition-colors">
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Player;