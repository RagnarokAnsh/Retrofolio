'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCalendarDays = () => {
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDate; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="relative">
      <motion.div
        className="flex flex-col items-center cursor-pointer p-1 hover:bg-gray-400 transition-colors"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        <div className="text-xs font-bold">{formatTime(currentTime)}</div>
        <div className="text-xs">{formatDate(currentTime)}</div>
      </motion.div>

      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 bg-gray-200 border-2 border-gray-400 shadow-lg p-3 min-w-64"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Calendar Header */}
            <div className="text-center font-bold mb-2 text-sm">
              {monthNames[currentTime.getMonth()]} {currentTime.getFullYear()}
            </div>

            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {weekDays.map(day => (
                <div key={day} className="text-xs text-center font-bold p-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {getCalendarDays().map((day, index) => (
                <div
                  key={index}
                  className={`text-xs text-center p-1 ${
                    day === currentTime.getDate() 
                      ? 'bg-blue-600 text-white font-bold' 
                      : day 
                        ? 'hover:bg-gray-300 cursor-pointer' 
                        : ''
                  }`}
                >
                  {day || ''}
                </div>
              ))}
            </div>

            {/* Current time display */}
            <div className="border-t mt-2 pt-2 text-center">
              <div className="text-lg font-mono">{formatTime(currentTime)}</div>
              <div className="text-xs">
                {currentTime.toLocaleDateString([], {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close calendar */}
      {isCalendarOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsCalendarOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
