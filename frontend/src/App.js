import React, { useState } from 'react';
import "./App.css";
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import Player from './components/Player';
import { AudioProvider } from './components/AudioManager';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (view, data = null) => {
    setCurrentView(view);
    if (view === 'playlist' && data) {
      setSelectedPlaylist(data);
    } else {
      setSelectedPlaylist(null);
    }
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedPlaylist(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentView('search');
    }
  };

  const toggleRightPanel = () => {
    setIsRightPanelVisible(!isRightPanelVisible);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Top Bar */}
      <TopBar 
        onSearch={handleSearch}
        currentView={currentView}
      />
      
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          onNavigate={handleNavigation}
          currentView={currentView}
        />
        
        {/* Main Content */}
        <MainContent
          currentView={currentView}
          selectedPlaylist={selectedPlaylist}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          currentTrack={currentTrack}
          onTrackSelect={handleTrackSelect}
          searchQuery={searchQuery}
        />
        
        {/* Right Panel */}
        {isRightPanelVisible && (
          <RightPanel
            currentTrack={currentTrack}
            isVisible={isRightPanelVisible}
            onClose={() => setIsRightPanelVisible(false)}
          />
        )}
      </div>

      {/* Player */}
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onRightPanelToggle={toggleRightPanel}
        isRightPanelVisible={isRightPanelVisible}
      />
    </div>
  );
}

export default App;