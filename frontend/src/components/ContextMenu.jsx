import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Heart, 
  Plus, 
  Share, 
  Copy, 
  Download,
  Radio,
  ListMusic,
  User
} from 'lucide-react';
import { useAudio } from './AudioManager';

const ContextMenu = ({ isVisible, position, onClose, target, targetType }) => {
  const menuRef = useRef(null);
  const { playTrack, toggleLike, isLiked, currentTrack, isPlaying, togglePlayPause } = useAudio();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible || !target) return null;

  const isCurrentTrack = currentTrack?.id === target.id;
  const isCurrentPlaying = isCurrentTrack && isPlaying;

  const menuItems = [];

  // Play/Pause option
  if (targetType === 'song') {
    menuItems.push({
      icon: isCurrentPlaying ? Pause : Play,
      label: isCurrentPlaying ? 'Pause' : 'Play',
      action: () => {
        if (isCurrentTrack) {
          togglePlayPause();
        } else {
          playTrack(target.id, [target.id], 0);
        }
        onClose();
      }
    });
  }

  // Like/Unlike option
  if (targetType === 'song') {
    menuItems.push({
      icon: Heart,
      label: isLiked(target.id) ? 'Remove from Liked Songs' : 'Save to your Liked Songs',
      action: () => {
        toggleLike(target.id);
        onClose();
      },
      className: isLiked(target.id) ? 'text-green-500' : ''
    });
  }

  // Add to playlist
  menuItems.push({
    icon: Plus,
    label: 'Add to playlist',
    action: () => {
      console.log('Add to playlist:', target.name || target.title);
      onClose();
    }
  });

  // Follow (for artists)
  if (targetType === 'artist') {
    menuItems.push({
      icon: User,
      label: 'Follow',
      action: () => {
        console.log('Follow artist:', target.name);
        onClose();
      }
    });
  }

  // Go to radio
  if (targetType === 'song' || targetType === 'artist') {
    menuItems.push({
      icon: Radio,
      label: `Go to ${targetType === 'song' ? 'song' : 'artist'} radio`,
      action: () => {
        console.log('Go to radio:', target.name || target.title);
        onClose();
      }
    });
  }

  // Show in queue
  if (targetType === 'song') {
    menuItems.push({
      icon: ListMusic,
      label: 'Show in queue',
      action: () => {
        console.log('Show in queue:', target.title);
        onClose();
      }
    });
  }

  // Share
  menuItems.push({
    icon: Share,
    label: 'Share',
    submenu: [
      {
        icon: Copy,
        label: 'Copy link',
        action: () => {
          navigator.clipboard.writeText(`https://open.spotify.com/${targetType}/${target.id}`);
          onClose();
        }
      }
    ]
  });

  // Download (for premium users)
  if (targetType === 'song' || targetType === 'album' || targetType === 'playlist') {
    menuItems.push({
      icon: Download,
      label: 'Download',
      action: () => {
        console.log('Download:', target.name || target.title);
        onClose();
      }
    });
  }

  return (
    <div
      ref={menuRef}
      className="fixed bg-gray-800 rounded-md shadow-lg py-1 z-50 min-w-48"
      style={{
        left: position.x,
        top: position.y,
        maxHeight: '80vh',
        overflow: 'auto'
      }}
    >
      {menuItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={item.action}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-white hover:bg-gray-700 transition-colors ${
              item.className || ''
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
          {item.submenu && (
            <div className="ml-6 border-l border-gray-700 pl-2">
              {item.submenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  onClick={subItem.action}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <subItem.icon size={14} />
                  {subItem.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;