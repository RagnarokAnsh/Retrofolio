'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BackgroundType = 'lightning' | 'pixelblast';

interface BackgroundSettings {
  type: BackgroundType;
  lightningSettings: {
    hue: number;
    speed: number;
    intensity: number;
    size: number;
    xOffset: number;
  };
  pixelBlastSettings: {
    variant: 'square' | 'circle' | 'triangle' | 'diamond';
    pixelSize: number;
    color: string;
    patternScale: number;
    patternDensity: number;
    liquid: boolean;
    liquidStrength: number;
    liquidRadius: number;
    pixelSizeJitter: number;
    enableRipples: boolean;
    rippleIntensityScale: number;
    rippleThickness: number;
    rippleSpeed: number;
    liquidWobbleSpeed: number;
    edgeFade: number;
  };
}

interface BackgroundContextType {
  settings: BackgroundSettings;
  updateBackgroundType: (type: BackgroundType) => void;
  updateLightningSettings: (settings: Partial<BackgroundSettings['lightningSettings']>) => void;
  updatePixelBlastSettings: (settings: Partial<BackgroundSettings['pixelBlastSettings']>) => void;
  isActivated: boolean;
  activateWindows: () => void;
}

const defaultSettings: BackgroundSettings = {
  type: 'lightning',
  lightningSettings: {
    hue: 120,
    speed: 0.8,
    intensity: 1.2,
    size: 1.5,
    xOffset: 0,
  },
  pixelBlastSettings: {
    variant: 'circle',
    pixelSize: 6,
    color: '#B19EEF',
    patternScale: 3,
    patternDensity: 1.2,
    liquid: false,
    liquidStrength: 0.12,
    liquidRadius: 1.2,
    pixelSizeJitter: 0.5,
    enableRipples: true,
    rippleIntensityScale: 1.5,
    rippleThickness: 0.12,
    rippleSpeed: 0.4,
    liquidWobbleSpeed: 5,
    edgeFade: 0.25,
  },
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<BackgroundSettings>(defaultSettings);
  const [isActivated, setIsActivated] = useState(false);

  const updateBackgroundType = (type: BackgroundType) => {
    setSettings(prev => ({ ...prev, type }));
  };

  const updateLightningSettings = (newSettings: Partial<BackgroundSettings['lightningSettings']>) => {
    setSettings(prev => ({
      ...prev,
      lightningSettings: { ...prev.lightningSettings, ...newSettings }
    }));
  };

  const updatePixelBlastSettings = (newSettings: Partial<BackgroundSettings['pixelBlastSettings']>) => {
    setSettings(prev => ({
      ...prev,
      pixelBlastSettings: { ...prev.pixelBlastSettings, ...newSettings }
    }));
  };

  const activateWindows = () => {
    setIsActivated(true);
  };

  return (
    <BackgroundContext.Provider value={{
      settings,
      updateBackgroundType,
      updateLightningSettings,
      updatePixelBlastSettings,
      isActivated,
      activateWindows,
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
