'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/context/SoundContext';
import { WindowState } from './Desktop';
import BatteryIndicator from './BatteryIndicator';
import Calendar from './Calendar';
import TextType from './TextType';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
}

const Taskbar = ({ windows, onWindowClick }: TaskbarProps) => {
  const { playClick, isMuted, toggleMute } = useSounds();
  const [showStartMenu, setShowStartMenu] = useState(false);

  const handleStartClick = () => {
    playClick();
    setShowStartMenu(!showStartMenu);
  };

  const handleWindowClick = (id: string) => {
    playClick();
    onWindowClick(id);
  };

  const handleVolumeClick = () => {
    toggleMute();
  };

  return (
    <>
      <motion.div
        className="win95-taskbar"
        initial={{ y: 48 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Start Button */}
        <motion.button
          className={`win95-button flex items-center gap-2 px-4 py-2 text-base font-bold ${showStartMenu ? 'bg-gray-300' : ''}`}
          whileHover={{ backgroundColor: '#e0e0e0' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartClick}
        >
          <span className="text-xl">⊞</span>
          Start
        </motion.button>

      {/* Quick Launch Area */}
      {/* <div className="flex items-center gap-1 ml-2 mr-2 border-r border-gray-600 pr-2">
        <motion.button
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-400 text-xs"
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          title="Show Desktop"
        >
          📋
        </motion.button>
        <motion.button
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-400 text-xs"
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          title="Internet Explorer"
        >
          🌐
        </motion.button>
        <motion.button
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-400 text-xs"
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          title="My Computer"
        >
          💻
        </motion.button>
      </div> */}

        {/* Window Buttons */}
        <div className="flex-1 flex gap-1 ml-2">
          {windows.map(window => (
            <motion.button
              key={window.id}
              className={`win95-button px-4 py-2 text-base max-w-48 truncate ${
                window.isMinimized ? 'bg-gray-300' : 'bg-white border-gray-700'
              }`}
              whileHover={{ backgroundColor: window.isMinimized ? '#e0e0e0' : '#f0f0f0' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWindowClick(window.id)}
            >
              {window.title}
            </motion.button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 ml-auto border-l border-gray-600 pl-3">
          {/* System Icons */}
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-6 h-6 flex items-center justify-center text-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isMuted ? "Unmute" : "Mute"}
              onClick={handleVolumeClick}
            >
              {isMuted ? '🔇' : '🔊'}
            </motion.div>
          {/* <motion.div 
            className="w-4 h-4 flex items-center justify-center text-xs cursor-pointer"
            whileHover={{ scale: 1.1 }}
            title="Network"
          >
            📶
          </motion.div> */}
          <BatteryIndicator />
        </div>

        {/* Calendar and Clock */}
        <Calendar />
      </div>
    </motion.div>

    {/* Start Menu */}
    <AnimatePresence>
      {showStartMenu && (
        <motion.div
          className="fixed bottom-12 left-2 w-80 h-96 bg-gray-200 border-2 border-gray-400 shadow-lg z-50"
          style={{
            background: 'linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 100%)',
            boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Start Menu Header */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 font-bold text-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⊞</span>
              Windows 95
            </div>
          </div>
          
          {/* Start Menu Content */}
          <div className="p-6 flex flex-col justify-center items-center h-full">
            <div className="text-center">
              <TextType
                text="Site Still under development"
                typingSpeed={80}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="_"
                loop={false}
                className="text-xl font-mono text-gray-800 font-bold"
                initialDelay={500}
              />
            </div>
            
            {/* Close button */}
            <motion.button
              className="win95-button mt-8 px-6 py-2 text-base"
              whileHover={{ backgroundColor: '#e0e0e0' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStartMenu(false)}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

export default Taskbar;
