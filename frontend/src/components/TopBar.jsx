import React, { useState } from 'react';
import { Search, User, ChevronDown } from 'lucide-react';

const TopBar = ({ onSearch, currentView }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="h-16 bg-black bg-opacity-90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="What do you want to play?"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white hover:border-gray-600 transition-colors"
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-white hover:underline">
          Install App
        </button>
        
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm hover:scale-105 transition-transform">
            C
          </button>
          <ChevronDown size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;