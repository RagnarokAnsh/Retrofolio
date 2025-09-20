'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSounds } from '@/context/SoundContext';

const ContactWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { playClick, playNotification } = useSounds();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playNotification();
    alert('under development, no actual email sent copy and paste my mail dont wait for redirection, do some actual work');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-bold mb-4">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <motion.div
          className="border-2 border-gray-400 bg-white p-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <strong>📧 Email:</strong>{' '}
          <a 
            href="mailto:connectansh@outlook.com" 
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={() => playClick()}
          >
            connectansh@outlook.com
          </a>
        </motion.div>
        
        <motion.div
          className="border-2 border-gray-400 bg-white p-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <strong>🐙 GitHub:</strong>{' '}
          <a 
            href="https://github.com/ragnarokansh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={() => playClick()}
          >
            @ragnarokansh
          </a>
        </motion.div>

        <motion.div
          className="border-2 border-gray-400 bg-white p-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <strong>📱 Phone:</strong> +91 8510878000
        </motion.div>

        <motion.div
          className="border-2 border-gray-400 bg-white p-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <strong>💼 LinkedIn:</strong>{' '}
          <a 
            href="https://www.linkedin.com/in/connectansh/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={() => playClick()}
          >
            Ansh Sharma
          </a>
        </motion.div>

        <motion.div
          className="border-2 border-gray-400 bg-white p-3 md:col-span-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <strong>💰 UPI ID:</strong> 8510878000@ptsbi
        </motion.div>
      </div>

      {/* <form onSubmit={handleSubmit} className="space-y-3">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-bold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-400 p-1 text-sm"
            required
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-bold mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-400 p-1 text-sm"
            required
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-bold mb-1">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full border-2 border-gray-400 p-1 text-sm resize-none"
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          className="win95-button px-4 py-2 text-sm font-bold"
          whileHover={{ backgroundColor: '#d0d0d0' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => playClick()}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Send Message
        </motion.button>
      </form> */}
    </motion.div>
  );
};

export default ContactWindow;
