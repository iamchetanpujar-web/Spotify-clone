import React, { useState, useEffect } from 'react';
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
  Maximize2
} from 'lucide-react';

const Player = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious, onRightPanelToggle, isRightPanelVisible }) => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  useEffect(() => {
    if (currentTrack && isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(percent * (currentTrack?.duration || 0));
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(100, Math.floor(percent * 100)));
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={16} />;
    if (volume < 50) return <Volume1 size={16} />;
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
        <button className="text-green-500 hover:text-green-400 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"/>
          </svg>
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center gap-2 px-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsShuffled(!isShuffled)}
            className={`transition-colors ${isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle size={16} />
          </button>
          <button 
            onClick={onPrevious}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack size={16} />
          </button>
          <button 
            onClick={onPlayPause}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all"
          >
            {isPlaying ? (
              <Pause size={16} className="text-black" />
            ) : (
              <Play size={16} className="text-black ml-0.5" />
            )}
          </button>
          <button 
            onClick={onNext}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward size={16} />
          </button>
          <button 
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
            className={`transition-colors ${repeatMode > 0 ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat size={16} />
            {repeatMode === 2 && (
              <div className="w-1 h-1 bg-green-500 rounded-full absolute -bottom-1"></div>
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
              style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
            >
              <div className="absolute -right-1.5 -top-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400 w-10">
            {formatTime(currentTrack.duration)}
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