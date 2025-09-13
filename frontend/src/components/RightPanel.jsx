import React from 'react';
import { MoreHorizontal, ExternalLink, X } from 'lucide-react';
import { mockRelatedVideos } from '../mock';
import { useAudio } from './AudioManager';

const RightPanel = ({ isVisible, onClose }) => {
  const { currentTrack } = useAudio();
  
  if (!isVisible || !currentTrack) return null;

  return (
    <div className="w-80 bg-black text-white border-l border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Liked Songs</h3>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Currently Playing */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img 
            src={currentTrack.image} 
            alt={currentTrack.title}
            className="w-16 h-16 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
            }}
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-white truncate text-lg">
              {currentTrack.title}
            </h4>
            <p className="text-gray-400 text-sm truncate">
              {currentTrack.artist}
            </p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      {/* Related Music Videos */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-sm font-medium text-white mb-4">Related music videos</h4>
        <div className="space-y-4">
          {mockRelatedVideos.map((video) => (
            <div key={video.id} className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-colors group">
              <div className="relative">
                <img 
                  src={video.image} 
                  alt={video.title}
                  className="w-20 h-12 rounded object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {video.title}
                </p>
                <p className="text-gray-400 text-xs truncate">
                  {video.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;