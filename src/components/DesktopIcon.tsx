'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSounds } from '@/context/SoundContext';
import ElectricBorder from './ElectricBorder';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon = ({ icon, label, onClick }: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const { playClick } = useSounds();

  const handleClick = () => {
    playClick();
    onClick();
  };

  const handleDoubleClick = () => {
    handleClick();
  };

  return (
    <motion.div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={handleDoubleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ElectricBorder
        color="#00FF6A"
        speed={0.8}
        chaos={0.6}
        thickness={2}
        style={{ borderRadius: 6 }}
        className="w-full h-full"
      >
        <div className="icon">{icon}</div>
        <div className="label">{label}</div>
      </ElectricBorder>
    </motion.div>
  );
};

export default DesktopIcon;
