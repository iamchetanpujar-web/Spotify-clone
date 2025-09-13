import React, { useState } from 'react';
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react';
import { mockPlaylists } from '../mock';

const Sidebar = ({ onNavigate, currentView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPlaylists = mockPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 bg-black text-white flex flex-col h-full">
      {/* Main Navigation */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        <nav className="space-y-4">
          <button 
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-4 text-sm font-medium w-full p-2 rounded-md transition-colors ${
              currentView === 'home' ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home size={20} />
            Home
          </button>
          <button 
            onClick={() => onNavigate('search')}
            className={`flex items-center gap-4 text-sm font-medium w-full p-2 rounded-md transition-colors ${
              currentView === 'search' ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Search size={20} />
            Search
          </button>
        </nav>
      </div>

      {/* Your Library Section */}
      <div className="flex-1 flex flex-col">
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Library size={20} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-400">Your Library</span>
            </div>
            <Plus size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
          
          <div className="flex gap-2 mb-4">
            <button className="px-3 py-1.5 bg-gray-800 rounded-full text-xs font-medium hover:bg-gray-700 transition-colors">
              Playlists
            </button>
            <button className="px-3 py-1.5 bg-gray-800 rounded-full text-xs font-medium hover:bg-gray-700 transition-colors">
              Artists
            </button>
            <button className="px-3 py-1.5 bg-gray-800 rounded-full text-xs font-medium hover:bg-gray-700 transition-colors">
              Podcasts & Shows
            </button>
          </div>

          {/* Search within library */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Your Library"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Playlist Items */}
        <div className="flex-1 overflow-y-auto px-2">
          {filteredPlaylists.map((playlist) => (
            <div 
              key={playlist.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer transition-colors group"
              onClick={() => onNavigate('playlist', playlist)}
            >
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-700">
                {playlist.isLiked ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Heart size={20} className="text-white fill-white" />
                  </div>
                ) : (
                  <img 
                    src={playlist.image} 
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzgwODA4MCIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5PIElNRzwvdGV4dD4KICA8L3N2Zz4K';
                    }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {playlist.name}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {playlist.type === 'playlist' && playlist.songCount ? (
                    `Playlist • ${playlist.songCount} songs`
                  ) : playlist.type === 'podcast' ? (
                    `Podcast • ${playlist.artist}`
                  ) : playlist.type === 'artist' ? (
                    'Artist'
                  ) : (
                    `${playlist.type} • ${playlist.artist}`
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Install App Section */}
      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center gap-3 text-sm">
          <Download size={20} className="text-gray-400" />
          <span className="text-gray-400">Install App</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;