'use client';

import { motion } from 'framer-motion';

const ProjectsWindow = () => {
  const projects = [
    {
      name: 'CoDuck',
      description: 'Web Maintenance Innovation - Platform for unlimited maintenance and technical support',
      tech: 'WordPress | Elementor | PHP | Javascript | Stripe',
      status: '🟢 Active'
    },
    {
      name: 'Delirium',
      description: 'Creative web application with modern design patterns',
      tech: 'React | Node.js | MongoDB',
      status: '🟡 In Progress'
    },
    {
      name: 'UCM',
      description: 'University content management system',
      tech: 'PHP | MySQL | Bootstrap',
      status: '🟢 Completed'
    },
    {
      name: 'MadMusic',
      description: 'Music streaming platform with social features',
      tech: 'Vue.js | Express | PostgreSQL',
      status: '🟡 Beta'
    },
    {
      name: 'Hysteria',
      description: 'High-performance gaming platform',
      tech: 'Unity | C# | WebGL',
      status: '🔴 Archived'
    },
    {
      name: 'Retrofolio95',
      description: 'This Windows 95-style portfolio you are viewing!',
      tech: 'Next.js | React95 | Framer Motion | Howler',
      status: '🟢 Live'
    }
  ];

  return (
    <motion.div
      className="h-full overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-bold mb-4">Web Projects</h2>
      
      <div className="space-y-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            className="border-2 border-gray-400 bg-white p-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-blue-800">{project.name}</h3>
              <span className="text-xs">{project.status}</span>
            </div>
            <p className="text-xs mb-2 text-gray-700">{project.description}</p>
            <div className="text-xs text-purple-700 font-mono">{project.tech}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-2 bg-yellow-100 border border-yellow-400 text-xs">
        <strong>Note:</strong> 90% of requests are resolved in less than 24 hours, 
        ensuring high-quality service with a fixed monthly rate.
      </div>
    </motion.div>
  );
};

export default ProjectsWindow;
