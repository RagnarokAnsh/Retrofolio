'use client';

import { createContext, useContext, useRef, useEffect, ReactNode } from 'react';
import { Howl } from 'howler';

interface SoundContextType {
  playStartup: () => void;
  playClick: () => void;
  playError: () => void;
  playNotification: () => void;
  playWindowOpen: () => void;
  playWindowClose: () => void;
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

  const playStartup = () => soundsRef.current.startup?.play();
  const playClick = () => soundsRef.current.click?.play();
  const playError = () => soundsRef.current.error?.play();
  const playNotification = () => soundsRef.current.notification?.play();
  const playWindowOpen = () => soundsRef.current.windowOpen?.play();
  const playWindowClose = () => soundsRef.current.windowClose?.play();

  return (
    <SoundContext.Provider
      value={{
        playStartup,
        playClick,
        playError,
        playNotification,
        playWindowOpen,
        playWindowClose,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
