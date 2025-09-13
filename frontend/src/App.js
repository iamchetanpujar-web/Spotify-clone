import React, { useState } from 'react';
import "./App.css";
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import Player from './components/Player';
import NowPlayingModal from './components/NowPlayingModal';
import { AudioProvider } from './components/AudioManager';
import KeyboardShortcuts from './components/KeyboardShortcuts';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [isNowPlayingVisible, setIsNowPlayingVisible] = useState(false);
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

  const toggleNowPlaying = () => {
    setIsNowPlayingVisible(!isNowPlayingVisible);
  };

  return (
    <AudioProvider>
      <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
        <KeyboardShortcuts />
        
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
            onBack={handleBack}
            searchQuery={searchQuery}
          />
          
          {/* Right Panel */}
          {isRightPanelVisible && (
            <RightPanel
              isVisible={isRightPanelVisible}
              onClose={() => setIsRightPanelVisible(false)}
            />
          )}
        </div>

        {/* Player */}
        <Player
          onRightPanelToggle={toggleRightPanel}
          isRightPanelVisible={isRightPanelVisible}
          onNowPlayingToggle={toggleNowPlaying}
        />
        
        {/* Now Playing Modal */}
        <NowPlayingModal
          isVisible={isNowPlayingVisible}
          onClose={() => setIsNowPlayingVisible(false)}
        />
        
        {/* Keyboard Shortcuts Indicator */}
        <div className="fixed bottom-4 right-4 bg-gray-900 text-gray-400 text-xs p-2 rounded opacity-75 pointer-events-none">
          Press Space to play/pause • Ctrl+← → for prev/next
        </div>
      </div>
    </AudioProvider>
  );
}

export default App;