'use client';

import { useState } from 'react';
import { useBackground } from '@/context/BackgroundContext';

type TabType = 'appearance' | 'activation';

const SettingsWindow = () => {
  const [activeTab, setActiveTab] = useState<TabType>('appearance');
  const { settings, updateBackgroundType, updateLightningSettings, updatePixelBlastSettings, isActivated, activateWindows } = useBackground();

  const handleActivate = () => {
    activateWindows();
  };

  return (
    <div className="p-6 bg-white h-full overflow-y-auto">
      <div className="max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Settings</h2>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'appearance'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Appearance
          </button>
          <button
            onClick={() => setActiveTab('activation')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'activation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Activation
          </button>
        </div>

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Background Settings</h3>
              
              {/* Background Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateBackgroundType('lightning')}
                    className={`px-4 py-2 text-sm border-2 transition-colors ${
                      settings.type === 'lightning'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    Lightning
                  </button>
                  <button
                    onClick={() => updateBackgroundType('pixelblast')}
                    className={`px-4 py-2 text-sm border-2 transition-colors ${
                      settings.type === 'pixelblast'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    Pixel Blast
                  </button>
                </div>
              </div>

              {/* Lightning Settings */}
              {settings.type === 'lightning' && (
                <div className="space-y-4 p-4 bg-gray-50 border border-gray-200 rounded">
                  <h4 className="font-medium text-gray-800">Lightning Settings</h4>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Hue: {settings.lightningSettings.hue}°</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={settings.lightningSettings.hue}
                      onChange={(e) => updateLightningSettings({ hue: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Speed: {settings.lightningSettings.speed}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={settings.lightningSettings.speed}
                      onChange={(e) => updateLightningSettings({ speed: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Intensity: {settings.lightningSettings.intensity}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={settings.lightningSettings.intensity}
                      onChange={(e) => updateLightningSettings({ intensity: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Size: {settings.lightningSettings.size}</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={settings.lightningSettings.size}
                      onChange={(e) => updateLightningSettings({ size: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Pixel Blast Settings */}
              {settings.type === 'pixelblast' && (
                <div className="space-y-4 p-4 bg-gray-50 border border-gray-200 rounded">
                  <h4 className="font-medium text-gray-800">Pixel Blast Settings</h4>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Shape</label>
                    <select
                      value={settings.pixelBlastSettings.variant}
                      onChange={(e) => updatePixelBlastSettings({ variant: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="circle">Circle</option>
                      <option value="square">Square</option>
                      <option value="triangle">Triangle</option>
                      <option value="diamond">Diamond</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Pixel Size: {settings.pixelBlastSettings.pixelSize}</label>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={settings.pixelBlastSettings.pixelSize}
                      onChange={(e) => updatePixelBlastSettings({ pixelSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Pattern Scale: {settings.pixelBlastSettings.patternScale}</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={settings.pixelBlastSettings.patternScale}
                      onChange={(e) => updatePixelBlastSettings({ patternScale: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="ripples"
                      checked={settings.pixelBlastSettings.enableRipples}
                      onChange={(e) => updatePixelBlastSettings({ enableRipples: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="ripples" className="text-sm text-gray-600">Enable Ripples</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activation Tab */}
        {activeTab === 'activation' && (
          <div className="space-y-6">
            <div className="bg-gray-100 border-2 border-gray-300 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-bold">
                  W
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Windows 95</h3>
                  <p className="text-sm text-gray-600">Professional Edition</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-mono">12345-67890-ABCDE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={isActivated ? "text-green-600" : "text-red-600"}>
                    {isActivated ? "Activated" : "Not Activated"}
                  </span>
                </div>
              </div>
            </div>

            {!isActivated && (
              <div className="bg-yellow-50 border border-yellow-300 p-4">
                <h4 className="font-bold text-yellow-800 mb-2">Activation Required</h4>
                <p className="text-sm text-yellow-700 mb-4">
                  Windows needs to be activated to continue using all features.
                </p>
                <button
                  onClick={handleActivate}
                  className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition-colors"
                >
                  Activate Windows
                </button>
              </div>
            )}

            {isActivated && (
              <div className="bg-green-50 border border-green-300 p-4">
                <h4 className="font-bold text-green-800 mb-2">Windows Activated</h4>
                <p className="text-sm text-green-700">
                  Thank you for activating Windows! All features are now available.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-bold text-gray-800">System Information</h4>
              <div className="bg-gray-50 border border-gray-200 p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span>Windows 95 (Build 950)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processor:</span>
                  <span>Intel 486DX2-66</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Memory:</span>
                  <span>16 MB RAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Display:</span>
                  <span>SVGA 1024x768</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsWindow;
