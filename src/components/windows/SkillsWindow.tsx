'use client';

import { motion } from 'framer-motion';

const SkillsWindow = () => {
  const skills = [
    { category: 'Frontend', items: ['Angular', 'Next.js', 'React', 'WordPress', 'React Native'], level: 90 },
    { category: 'Backend', items: ['Laravel', 'Node.js', 'Express', 'Django'], level: 85 },
    { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'], level: 80 },
    { category: 'Tools', items: ['Git', 'Docker','Figma'], level: 88 },
    { category: 'Cloud', items: ['Vercel', 'AWS', 'Digital Ocean', 'Stripe'], level: 75 },
  ];

  return (
    <motion.div
      className="h-full overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-bold mb-4">Skills & Technologies</h2>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            className="border-2 border-gray-400 bg-white p-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="font-bold text-blue-800 mb-2">{skill.category}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {skill.items.map((item, i) => (
                <motion.span
                  key={item}
                  className="bg-gray-200 border border-gray-400 px-2 py-1 text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (index * 0.1) + (i * 0.05) }}
                  whileHover={{ scale: 1.05, backgroundColor: '#e0e0e0' }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-300 border border-gray-500 h-4 relative">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: index * 0.2, duration: 1 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                {skill.level}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-xs">
        <strong>Download instruction manual:</strong> Available in the Start menu under Help & Support (not really but you can still try)
      </div>
    </motion.div>
  );
};

export default SkillsWindow;
