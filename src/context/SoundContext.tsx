'use client';

import { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';
import { Howl } from 'howler';

interface SoundContextType {
  playStartup: () => void;
  playClick: () => void;
  playError: () => void;
  playNotification: () => void;
  playWindowOpen: () => void;
  playWindowClose: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const soundsRef = useRef<Record<string, Howl>>({});
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    // Create simplified sound effects using Web Audio API
    const createBeep = () => {
      return new Howl({
        src: [`data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmNBBSl+z+/OKyUFe8bz25hSEBhJrf`],
        volume: 0.3,
        rate: 1,
      });
    };

    soundsRef.current = {
      startup: createBeep(),
      click: createBeep(),
      error: createBeep(),
      notification: createBeep(),
      windowOpen: createBeep(),
      windowClose: createBeep(),
    };

    return () => {
      Object.values(soundsRef.current).forEach(sound => sound.unload());
    };
  }, []);

  const playStartup = () => !isMuted && soundsRef.current.startup?.play();
  const playClick = () => !isMuted && soundsRef.current.click?.play();
  const playError = () => !isMuted && soundsRef.current.error?.play();
  const playNotification = () => !isMuted && soundsRef.current.notification?.play();
  const playWindowOpen = () => !isMuted && soundsRef.current.windowOpen?.play();
  const playWindowClose = () => !isMuted && soundsRef.current.windowClose?.play();
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider
      value={{
        playStartup,
        playClick,
        playError,
        playNotification,
        playWindowOpen,
        playWindowClose,
        isMuted,
        toggleMute,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
