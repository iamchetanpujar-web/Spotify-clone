import { useEffect } from 'react';
import { useAudio } from './AudioManager';

const KeyboardShortcuts = () => {
  const { 
    togglePlayPause, 
    handleNext, 
    handlePrevious, 
    setVolumeLevel, 
    volume, 
    toggleShuffle, 
    toggleRepeat,
    toggleMute
  } = useAudio();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger shortcuts when typing in input fields
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          togglePlayPause();
          break;
        
        case 'ArrowRight':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handleNext();
          }
          break;
        
        case 'ArrowLeft':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handlePrevious();
          }
          break;
        
        case 'ArrowUp':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setVolumeLevel(Math.min(1, volume + 0.1));
          }
          break;
        
        case 'ArrowDown':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setVolumeLevel(Math.max(0, volume - 0.1));
          }
          break;
        
        case 'KeyS':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleShuffle();
          }
          break;
        
        case 'KeyR':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleRepeat();
          }
          break;
        
        case 'KeyM':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleMute();
          }
          break;
        
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [togglePlayPause, handleNext, handlePrevious, setVolumeLevel, volume, toggleShuffle, toggleRepeat, toggleMute]);

  return null; // This component doesn't render anything
};

export default KeyboardShortcuts;