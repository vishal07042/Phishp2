import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Star, Trophy, Zap } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Define types for our gamification system
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  points: number;
}

interface GamificationContextType {
  score: number;
  addPoints: (points: number, reason?: string) => void;
  level: number;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  streak: number;
  incrementStreak: () => void;
  resetStreak: () => void;
  showScoreAnimation: (points: number) => void;
}

// Create context
const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// Initial achievements
const initialAchievements: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Contact',
    description: 'Visit the site for the first time',
    icon: <Zap className="h-5 w-5 text-yellow-400" />,
    unlocked: false,
    points: 10
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit all main pages of the site',
    icon: <Star className="h-5 w-5 text-blue-400" />,
    unlocked: false,
    points: 25
  },
  {
    id: 'streak_3',
    title: 'On Fire',
    description: 'Get a streak of 3 correct answers',
    icon: <Award className="h-5 w-5 text-orange-400" />,
    unlocked: false,
    points: 30
  },
  {
    id: 'master',
    title: 'Security Master',
    description: 'Reach level 5',
    icon: <Trophy className="h-5 w-5 text-purple-400" />,
    unlocked: false,
    points: 100
  }
];

// Provider component
export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem('gamification_score');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  
  const [level, setLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('gamification_level');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  
  const [streak, setStreak] = useState<number>(() => {
    const savedStreak = localStorage.getItem('gamification_streak');
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });
  
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const savedAchievements = localStorage.getItem('gamification_achievements');
    return savedAchievements ? JSON.parse(savedAchievements) : initialAchievements;
  });
  
  const [animatingPoints, setAnimatingPoints] = useState<number | null>(null);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gamification_score', score.toString());
    localStorage.setItem('gamification_level', level.toString());
    localStorage.setItem('gamification_streak', streak.toString());
    localStorage.setItem('gamification_achievements', JSON.stringify(achievements));
  }, [score, level, streak, achievements]);

  // Check for level up
  useEffect(() => {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      
      // Celebrate level up
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      
      toast("Level Up!", {
        description: `You've reached level ${newLevel}!`,
        icon: <Trophy className="h-5 w-5 text-yellow-500" />,
        className: "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      });
      
      // Check for level-based achievements
      if (newLevel >= 5) {
        unlockAchievement('master');
      }
    }
  }, [score, level]);

  // Unlock first visit achievement on first load
  useEffect(() => {
    if (!achievements.find(a => a.id === 'first_visit')?.unlocked) {
      unlockAchievement('first_visit');
    }
  }, []);

  // Add points and show reason
  const addPoints = (points: number, reason?: string) => {
    setScore(prev => prev + points);
    showScoreAnimation(points);
    
    if (reason) {
      toast(`+${points} points`, {
        description: reason,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      });
    }
  };

  // Unlock achievement
  const unlockAchievement = (id: string) => {
    setAchievements(prev => 
      prev.map(achievement => {
        if (achievement.id === id && !achievement.unlocked) {
          // Add achievement points to score
          setScore(prevScore => prevScore + achievement.points);
          
          // Show achievement notification
          toast("Achievement Unlocked!", {
            description: achievement.title,
            icon: achievement.icon,
            className: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          });
          
          // Celebrate with confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          
          return { ...achievement, unlocked: true };
        }
        return achievement;
      })
    );
  };

  // Increment streak
  const incrementStreak = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    
    // Check for streak achievements
    if (newStreak === 3) {
      unlockAchievement('streak_3');
    }
    
    // Special celebration for streaks
    if (newStreak % 3 === 0) {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.7 },
        gravity: 1.2
      });
      
      toast("STREAK BONUS!", {
        icon: <Award className="h-5 w-5 text-yellow-500" />,
        description: `You're on fire! ${newStreak} in a row!`,
        className: "bg-gradient-to-r from-yellow-600 to-orange-600 text-white"
      });
      
      // Add bonus points for streaks
      addPoints(newStreak * 5, "Streak bonus!");
    }
  };

  // Reset streak
  const resetStreak = () => {
    setStreak(0);
  };

  // Show floating score animation
  const showScoreAnimation = (points: number) => {
    setAnimatingPoints(points);
    setTimeout(() => setAnimatingPoints(null), 1500);
  };

  return (
    <GamificationContext.Provider
      value={{
        score,
        addPoints,
        level,
        achievements,
        unlockAchievement,
        streak,
        incrementStreak,
        resetStreak,
        showScoreAnimation
      }}
    >
      {children}
      
      {/* Floating score animation */}
      <AnimatePresence>
        {animatingPoints !== null && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -50, scale: 1.2 }}
            exit={{ opacity: 0, y: -100, scale: 0.5 }}
            transition={{ duration: 1.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 neon-glow">
              +{animatingPoints}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GamificationContext.Provider>
  );
};

// Custom hook to use the gamification context
export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// Score display component
export const ScoreDisplay: React.FC = () => {
  const { score, level, streak } = useGamification();
  
  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 flex items-center space-x-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div 
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full px-4 py-1 text-white font-bold flex items-center"
        whileHover={{ scale: 1.05 }}
      >
        <Trophy className="w-4 h-4 mr-1" />
        <span>{score}</span>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full px-3 py-1 text-white font-bold flex items-center"
        whileHover={{ scale: 1.05 }}
      >
        <Star className="w-4 h-4 mr-1" />
        <span>Lvl {level}</span>
      </motion.div>
      
      {streak > 0 && (
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-full px-3 py-1 text-white font-bold flex items-center"
        >
          <span className="mr-1">🔥</span> {streak}
        </motion.div>
      )}
    </motion.div>
  );
};

// Achievements panel component
export const AchievementsPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const { achievements, score, level } = useGamification();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl border border-purple-800 w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Achievements</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-black/50 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400">Total Score</p>
                  <p className="text-2xl font-bold text-white">{score}</p>
                </div>
                <div>
                  <p className="text-gray-400">Level</p>
                  <p className="text-2xl font-bold text-white">{level}</p>
                </div>
                <div>
                  <p className="text-gray-400">Unlocked</p>
                  <p className="text-2xl font-bold text-white">
                    {achievements.filter(a => a.unlocked).length}/{achievements.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500' 
                      : 'bg-gray-900/50 border-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      achievement.unlocked ? 'bg-purple-900' : 'bg-gray-800'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold ${
                        achievement.unlocked ? 'text-white' : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                      <p className="text-xs text-purple-400 mt-1">+{achievement.points} points</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GamificationProvider;
