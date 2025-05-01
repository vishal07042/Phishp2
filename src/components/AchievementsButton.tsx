import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { AchievementsPanel, useGamification } from './GamificationSystem';

const AchievementsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { achievements } = useGamification();
  
  // Count unlocked achievements
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  
  // Calculate progress percentage
  const progressPercentage = (unlockedCount / totalCount) * 100;
  
  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 text-white shadow-lg"
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 15px rgba(147, 51, 234, 0.7)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <Trophy className="w-6 h-6" />
          
          {/* Progress ring */}
          <svg 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="2" 
            />
            <motion.circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeDasharray="100"
              strokeDashoffset={100 - progressPercentage}
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - progressPercentage }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          
          {/* Badge counter */}
          <motion.div 
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {unlockedCount}
          </motion.div>
        </div>
      </motion.button>
      
      <AchievementsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AchievementsButton;
