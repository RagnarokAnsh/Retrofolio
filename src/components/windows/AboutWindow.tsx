'use client';

import { motion } from 'framer-motion';

const AboutWindow = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold mb-2">Lindows 95</h2>
        <div className="text-sm text-gray-600">Version 3.141592...</div>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <strong>Freaking Cool:</strong> Absolutely 
        </div>
        <div>
          <strong>Skills:</strong> Check the Skills folder
        </div>
        <div>
          <strong>Experience:</strong> People call me Senior Dev for a Reason
        </div>
        <div>
          <strong>Creativity:</strong> 165 ZB of genius
        </div>
      </div>

      <div className="mt-6 p-3 border-2 border-gray-400 bg-white">
        <h3 className="font-bold mb-2">About Me</h3>
        <p className="text-xs leading-relaxed">
          Welcome to my Windows 95-style portfolio! I&apos;m a developer who loves 
          creating nostalgic experiences with modern technology. This portfolio 
          combines the charm of retro computing with contemporary web development 
          techniques.
        </p>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
        Nigmas Corporation © 1991-2085? All Lefts Reserved.
        <br />
        Designed in Office, assembled in the back of a car.
      </div>
    </motion.div>
  );
};

export default AboutWindow;
