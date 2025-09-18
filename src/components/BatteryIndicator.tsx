'use client';

import { useState, useEffect } from 'react';

interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime?: number;
  dischargingTime?: number;
}

const BatteryIndicator = () => {
  const [battery, setBattery] = useState<BatteryInfo | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const getBatteryInfo = async () => {
      try {
        // Check if Battery API is supported
        if ('getBattery' in navigator) {
          const batteryApi = await (navigator as any).getBattery();
          setIsSupported(true);
          
          const updateBatteryInfo = () => {
            setBattery({
              level: batteryApi.level,
              charging: batteryApi.charging,
              chargingTime: batteryApi.chargingTime,
              dischargingTime: batteryApi.dischargingTime,
            });
          };

          updateBatteryInfo();

          // Add event listeners for battery changes
          batteryApi.addEventListener('chargingchange', updateBatteryInfo);
          batteryApi.addEventListener('levelchange', updateBatteryInfo);
          batteryApi.addEventListener('chargingtimechange', updateBatteryInfo);
          batteryApi.addEventListener('dischargingtimechange', updateBatteryInfo);

          return () => {
            batteryApi.removeEventListener('chargingchange', updateBatteryInfo);
            batteryApi.removeEventListener('levelchange', updateBatteryInfo);
            batteryApi.removeEventListener('chargingtimechange', updateBatteryInfo);
            batteryApi.removeEventListener('dischargingtimechange', updateBatteryInfo);
          };
        } else {
          setIsSupported(false);
        }
      } catch (error) {
        console.log('Battery API not supported');
        setIsSupported(false);
      }
    };

    getBatteryInfo();
  }, []);

  if (!isSupported || !battery) {
    // Fallback for unsupported browsers
    return (
      <div className="flex items-center gap-1">
        <div className="w-6 h-3 border border-gray-600 bg-white relative">
          <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-1 h-1 bg-gray-600"></div>
          <div className="w-full h-full bg-gray-400"></div>
        </div>
        <span className="text-xs">AC</span>
      </div>
    );
  }

  const batteryPercentage = Math.round(battery.level * 100);
  const batteryWidth = Math.max(batteryPercentage, 5);
  
  const getBatteryColor = () => {
    if (battery.charging) return '#00ff00';
    if (batteryPercentage > 50) return '#00ff00';
    if (batteryPercentage > 20) return '#ffff00';
    return '#ff0000';
  };

  const getBatteryIcon = () => {
    if (battery.charging) return '🔌';
    if (batteryPercentage > 75) return '🔋';
    if (batteryPercentage > 50) return '🔋';
    if (batteryPercentage > 25) return '🪫';
    return '🪫';
  };

  return (
    <div className="flex items-center gap-1" title={`Battery: ${batteryPercentage}% ${battery.charging ? '(Charging)' : ''}`}>
      <div className="w-6 h-3 border border-gray-600 bg-white relative">
        <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-1 h-1 bg-gray-600"></div>
        <div 
          className="h-full transition-all duration-300" 
          style={{ 
            width: `${batteryWidth}%`, 
            backgroundColor: getBatteryColor() 
          }}
        ></div>
      </div>
      <span className="text-xs">{getBatteryIcon()}</span>
      <span className="text-xs">{batteryPercentage}%</span>
    </div>
  );
};

export default BatteryIndicator;
