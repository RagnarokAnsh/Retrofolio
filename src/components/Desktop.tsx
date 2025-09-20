'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/context/SoundContext';
import { useBackground } from '@/context/BackgroundContext';
import Taskbar from './Taskbar';
import Lightning from './Lightning';
import PixelBlast from './PixelBlast';
import TextType from './TextType';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ContactWindow from './windows/ContactWindow';
import SettingsWindow from './windows/SettingsWindow';

export interface WindowState {
  id: string;
  title: string;
  component: React.ComponentType<unknown>;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const { playStartup, playWindowOpen, playWindowClose } = useSounds();
  const { settings, isActivated } = useBackground();

  useEffect(() => {
    playStartup();
    let rafId: number | null = null;
    let start: number | null = null;
    let clearDone: (() => void) | null = null;
    const durationMs = 3200;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const next = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setBootProgress(next);
      if (next < 100) {
        rafId = requestAnimationFrame(step);
      } else {
        const doneTimeout = setTimeout(() => setIsBooting(false), 300);
        clearDone = () => clearTimeout(doneTimeout);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (clearDone) clearDone();
    };
  }, [playStartup]);

  const openWindow = (
    id: string,
    title: string,
    component: React.ComponentType<unknown>,
    size = { width: 600, height: 400 }
  ) => {
    // Responsive window sizing
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const responsiveSize = isMobile 
      ? { width: Math.min(size.width, window.innerWidth - 40), height: Math.min(size.height, window.innerHeight - 80) }
      : size;
    const existingWindow = windows.find(w => w.id === id);
    if (existingWindow) {
      setWindows(prev => prev.map(w => 
        w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
      ));
      setNextZIndex(prev => prev + 1);
      return;
    }

    playWindowOpen();
    const newWindow: WindowState = {
      id,
      title,
      component,
      isMinimized: false,
      position: { 
        x: isMobile ? 20 : Math.random() * (Math.max(400, (typeof window !== 'undefined' ? window.innerWidth : 1200) - responsiveSize.width - 100)),
        y: isMobile ? 20 : Math.random() * (Math.max(300, (typeof window !== 'undefined' ? window.innerHeight : 800) - responsiveSize.height - 100))
      },
      size: responsiveSize,
      zIndex: nextZIndex,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    playWindowClose();
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  if (isBooting) {
    return (
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div className="animated-bg" />
        <motion.div
          className="win95-window w-[360px] max-w-[90vw] text-black relative z-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="win95-title-bar">
            <span className="text-sm">Microsoft Windows 95</span>
            <span className="text-xs">© Microsoft</span>
          </div>
          <div className="p-6 flex flex-col items-center gap-4">
            <div className="text-5xl" aria-hidden>💻</div>
            <div className="text-base font-bold">Starting Windows 95...</div>
            <div
              className="win95-progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={bootProgress}
            >
              <div
                className="win95-progress-bar"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-700">Loading portfolio... {bootProgress}%</div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dynamic Background */}
      {settings.type === 'lightning' ? (
        <Lightning
          hue={settings.lightningSettings.hue}
          speed={settings.lightningSettings.speed}
          intensity={settings.lightningSettings.intensity}
          size={settings.lightningSettings.size}
          xOffset={settings.lightningSettings.xOffset}
          className="pointer-events-none"
          style={{ position: 'absolute', inset: 0 }}
        />
      ) : (
        <PixelBlast
          variant={settings.pixelBlastSettings.variant}
          pixelSize={settings.pixelBlastSettings.pixelSize}
          color={settings.pixelBlastSettings.color}
          patternScale={settings.pixelBlastSettings.patternScale}
          patternDensity={settings.pixelBlastSettings.patternDensity}
          liquid={settings.pixelBlastSettings.liquid}
          liquidStrength={settings.pixelBlastSettings.liquidStrength}
          liquidRadius={settings.pixelBlastSettings.liquidRadius}
          pixelSizeJitter={settings.pixelBlastSettings.pixelSizeJitter}
          enableRipples={settings.pixelBlastSettings.enableRipples}
          rippleIntensityScale={settings.pixelBlastSettings.rippleIntensityScale}
          rippleThickness={settings.pixelBlastSettings.rippleThickness}
          rippleSpeed={settings.pixelBlastSettings.rippleSpeed}
          liquidWobbleSpeed={settings.pixelBlastSettings.liquidWobbleSpeed}
          edgeFade={settings.pixelBlastSettings.edgeFade}
          className="pointer-events-none"
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
      
      {/* Top Left Intro Text */}
      <div className="absolute top-8 left-8 z-20">
        <TextType
          text={[
            "Hello,\nI'm Ansh a Full Stack Developer",
            "Hello,\nI build modern web applications",
            "Hello,\nI create digital experiences",
            "Hello,\nI'm passionate about technology"
          ]}
          typingSpeed={95}
          pauseDuration={1000}
          deletingSpeed={40}
          showCursor={true}
          cursorCharacter="|"
          loop={true}
          className="text-2xl font-mono text-white font-bold"
          textColors={['#00FF6A']}
          initialDelay={1000}
        />
      </div>
      
      {/* Top Header Bar */}
      {/* <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b border-gray-400 flex items-center justify-between px-4 z-10">
        <h1 className="text-lg font-bold">Portfolio</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">portfolio@retro95.com</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-400 border border-gray-600 text-xs flex items-center justify-center">🔊</div>
            <div className="w-4 h-4 bg-gray-400 border border-gray-600 text-xs flex items-center justify-center">📧</div>
            <div className="w-4 h-4 bg-gray-400 border border-gray-600 text-xs flex items-center justify-center">📁</div>
          </div>
          <span className="text-sm font-mono">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
        </div>
      </div> */}
      
      {/* Desktop Icons - Arranged vertically */}
      <div className="absolute top-16 right-8 flex flex-col gap-4">
        <DesktopIcon
          icon="📁"
          label="PROJECTS"
          onClick={() => openWindow('projects', 'My Projects', ProjectsWindow, { width: 700, height: 500 })}
        />
        <DesktopIcon
          icon="🎨"
          label="SKILLS"
          onClick={() => openWindow('skills', 'My Skills', SkillsWindow, { width: 600, height: 450 })}
        />
        <DesktopIcon
          icon="❤️"
          label="SOCIAL LIFE"
          onClick={() => openWindow('contact', 'Contact Me', ContactWindow, { width: 500, height: 350 })}
        />
        <DesktopIcon
          icon="💻"
          label="ABOUT ME"
          onClick={() => openWindow('about', 'About Me', AboutWindow, { width: 500, height: 400 })}
        />
        <DesktopIcon
          icon="⚙️"
          label="SETTINGS"
          onClick={() => openWindow('settings', 'Settings', SettingsWindow, { width: 500, height: 400 })}
        />
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map(window => (
          <Window
            key={window.id}
            window={window}
            hidden={window.isMinimized}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
          >
            <window.component />
          </Window>
        ))}
      </AnimatePresence>

      {/* Windows Activation Text - Bottom Right (only show if not activated) */}
      {!isActivated && (
        <div className="absolute bottom-18 right-14 z-10">
          <div className="p-2 shadow-lg">
            <div className="text-xl text-gray-800 font-bold">Activate Lindows</div>
            <div className="text-lg text-gray-600">Go to Settings to activate Lindows</div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowClick={(id) => {
          setWindows(prev => prev.map(w => {
            if (w.id !== id) return w;
            // Toggle minimize on click
            if (!w.isMinimized) {
              return { ...w, isMinimized: true };
            }
            // Restore to previous position/zIndex
            return { ...w, isMinimized: false, zIndex: nextZIndex };
          }));
          setNextZIndex(prev => prev + 1);
        }}
      />
    </motion.div>
  );
};

export default Desktop;
