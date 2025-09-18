'use client';

import { motion } from 'framer-motion';
import { useSounds } from '@/context/SoundContext';
import { WindowState } from './Desktop';
import BatteryIndicator from './BatteryIndicator';
import Calendar from './Calendar';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
}

const Taskbar = ({ windows, onWindowClick }: TaskbarProps) => {
  const { playClick } = useSounds();

  const handleStartClick = () => {
    playClick();
    // Could implement start menu here
  };

  const handleWindowClick = (id: string) => {
    playClick();
    onWindowClick(id);
  };

  return (
    <motion.div
      className="win95-taskbar"
      initial={{ y: 32 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Start Button */}
      <motion.button
        className="win95-button flex items-center gap-1 px-3 py-1 text-sm font-bold"
        whileHover={{ backgroundColor: '#e0e0e0' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartClick}
      >
        <span className="text-base">🪟</span>
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
      <div className="flex-1 flex gap-1">
        {windows.map(window => (
          <motion.button
            key={window.id}
            className={`win95-button px-3 py-1 text-sm max-w-40 truncate ${
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
      <div className="flex items-center gap-2 ml-auto border-l border-gray-600 pl-2">
        {/* System Icons */}
        <div className="flex items-center gap-1">
          <motion.div 
            className="w-4 h-4 flex items-center justify-center text-xs cursor-pointer"
            whileHover={{ scale: 1.1 }}
            title="Volume"
          >
            🔊
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
  );
};

export default Taskbar;
