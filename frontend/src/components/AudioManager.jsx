import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { mockSongs } from '../mock';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState(['jb1', 'es1', 'tw1', 'be1']);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === 2) {
        // Repeat one
        audio.play();
      } else if (repeatMode === 1 || currentIndex < currentPlaylist.length - 1) {
        // Repeat all or has next song
        handleNext();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, currentIndex, currentPlaylist]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playTrack = (trackId, playlist = [], index = 0) => {
    const song = mockSongs[trackId];
    if (!song) return;

    setCurrentTrack(song);
    setCurrentPlaylist(playlist);
    setCurrentIndex(index);
    
    const audio = audioRef.current;
    if (audio) {
      audio.src = song.audioUrl;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Audio playback failed:', error);
        // Fallback for browsers that block autoplay
        setIsPlaying(false);
      });
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Audio playback failed:', error);
      });
    }
  };

  const handleNext = () => {
    if (currentPlaylist.length === 0) return;
    
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * currentPlaylist.length);
    } else {
      nextIndex = (currentIndex + 1) % currentPlaylist.length;
    }
    
    const nextTrackId = currentPlaylist[nextIndex];
    playTrack(nextTrackId, currentPlaylist, nextIndex);
  };

  const handlePrevious = () => {
    if (currentPlaylist.length === 0) return;
    
    let prevIndex;
    if (currentTime > 3) {
      // If more than 3 seconds played, restart current song
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
      }
      return;
    }
    
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * currentPlaylist.length);
    } else {
      prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    }
    
    const prevTrackId = currentPlaylist[prevIndex];
    playTrack(prevTrackId, currentPlaylist, prevIndex);
  };

  const seekTo = (time) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolumeLevel = (level) => {
    setVolume(level);
    setIsMuted(level === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const toggleLike = (songId) => {
    setLikedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const isLiked = (songId) => {
    return likedSongs.includes(songId);
  };

  const contextValue = {
    // State
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    currentPlaylist,
    currentIndex,
    likedSongs,
    
    // Actions
    playTrack,
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
  };

  return (
    <AudioContext.Provider value={contextValue}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};