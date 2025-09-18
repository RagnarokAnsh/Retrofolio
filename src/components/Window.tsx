'use client';

import { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useSounds } from '@/context/SoundContext';
import { WindowState } from './Desktop';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  hidden?: boolean;
}

const Window = ({ 
  window, 
  children, 
  onClose, 
  onMinimize, 
  onFocus, 
  onPositionChange,
  hidden = false
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const { playClick } = useSounds();

  const handleDragStart = () => {
    setIsDragging(true);
    onFocus();
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const viewportWidth = typeof globalThis !== 'undefined' && (globalThis as any).innerWidth ? (globalThis as any).innerWidth : 1200;
    const viewportHeight = typeof globalThis !== 'undefined' && (globalThis as any).innerHeight ? (globalThis as any).innerHeight : 800;
    const proposedX = window.position.x + info.offset.x;
    const proposedY = window.position.y + info.offset.y;
    const clampedX = Math.max(0, Math.min(proposedX, viewportWidth - window.size.width));
    const clampedY = Math.max(0, Math.min(proposedY, viewportHeight - window.size.height - 32));
    onPositionChange({ x: clampedX, y: clampedY });
  };

  const handleButtonClick = (action: () => void) => {
    playClick();
    action();
  };

  return (
    <motion.div
      ref={constraintsRef}
      className="fixed"
      style={{
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
        display: hidden ? 'none' : 'block',
      }}
      drag={!hidden}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={false}
      transition={{}}
      onClick={onFocus}
    >
      <div className="win95-window h-full flex flex-col pointer-events-auto">
        {/* Title Bar */}
        <motion.div
          className="win95-title-bar flex-shrink-0 cursor-move"
          onPointerEnter={(e) => { (e.currentTarget as HTMLElement).style.cursor = 'move'; }}
          onPointerLeave={(e) => { (e.currentTarget as HTMLElement).style.cursor = 'default'; }}
          onPointerDown={(e) => {
            // Begin a manual drag when starting from header to improve feel
            // We let framer-motion handle dragging; this ensures focus
            onFocus();
          }}
        >
          <span className="text-sm">{window.title}</span>
          <div className="flex gap-1">
            <motion.button
              className="w-4 h-4 bg-gray-300 border border-gray-600 text-xs flex items-center justify-center pointer-events-auto"
              whileHover={{ backgroundColor: '#e0e0e0' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick(onMinimize);
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              _
            </motion.button>
            <motion.button
              className="w-4 h-4 bg-gray-300 border border-gray-600 text-xs flex items-center justify-center pointer-events-auto"
              whileHover={{ backgroundColor: '#ff6b6b' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick(onClose);
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              ×
            </motion.button>
          </div>
        </motion.div>

        {/* Window Content */}
        <div 
          className="flex-1 p-4 overflow-auto bg-gray-200 pointer-events-auto"
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Window;
