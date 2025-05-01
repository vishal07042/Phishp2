import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  points: number;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  size: number;
  angle: number;
  delay: number;
  duration: number;
  length: number;
}

interface Sparkle {
  id: number;
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  color: string;
}

const WhimsicalStars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate whimsical stars
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 30; // More whimsical stars
      const colors = [
        '#ffffff', // White
        '#ffeb3b', // Yellow
        '#ff9800', // Orange
        '#e91e63', // Pink
        '#9c27b0', // Purple
        '#3f51b5', // Indigo
        '#2196f3', // Blue
      ];
      
      for (let i = 0; i < starCount; i++) {
        // Randomly decide if it's a regular star or a special star shape
        const points = Math.random() > 0.7 ? 5 : Math.floor(Math.random() * 3) + 4; // 4-6 points or 5 points
        
        newStars.push({
          id: i,
          size: Math.random() * 20 + 10, // 10-30px
          top: `${Math.random() * 90 + 5}%`,
          left: `${Math.random() * 90 + 5}%`,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 5, // 5-15s
          rotation: Math.random() * 360, // 0-360 degrees
          points: points
        });
      }
      
      setStars(newStars);
    };
    
    // Generate shooting stars
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      const shootingStarCount = 5; // More shooting stars
      
      for (let i = 0; i < shootingStarCount; i++) {
        newShootingStars.push({
          id: i,
          top: `${Math.random() * 50}%`,
          left: `${Math.random() * 70}%`,
          size: Math.random() * 2 + 1, // 1-3px
          angle: Math.random() * 60 - 30, // -30 to 30 degrees
          delay: Math.random() * 15, // 0-15s delay
          duration: Math.random() * 2 + 1, // 1-3s duration
          length: Math.random() * 100 + 50 // 50-150px
        });
      }
      
      setShootingStars(newShootingStars);
    };
    
    // Generate sparkles
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      const sparkleCount = 40; // Lots of sparkles
      const colors = [
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 235, 59, 0.8)',
        'rgba(255, 152, 0, 0.8)',
        'rgba(233, 30, 99, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.8)'
      ];
      
      for (let i = 0; i < sparkleCount; i++) {
        newSparkles.push({
          id: i,
          size: Math.random() * 4 + 1, // 1-5px
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 10, // 0-10s delay
          duration: Math.random() * 3 + 1, // 1-4s duration
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setSparkles(newSparkles);
    };
    
    generateStars();
    generateShootingStars();
    generateSparkles();
    
    // Regenerate shooting stars periodically
    const shootingStarInterval = setInterval(() => {
      generateShootingStars();
    }, 10000); // Every 10 seconds
    
    // Regenerate sparkles periodically
    const sparkleInterval = setInterval(() => {
      generateSparkles();
    }, 5000); // Every 5 seconds
    
    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(sparkleInterval);
    };
  }, []);

  // Create a star shape SVG path
  const createStarPath = (size: number, points: number): string => {
    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = size / 2;
    const innerRadius = outerRadius / 2;
    let path = `M ${centerX},${centerY - outerRadius} `;
    
    for (let i = 0; i < points; i++) {
      const outerAngle = (Math.PI * 2 * i) / points - Math.PI / 2;
      const innerAngle = outerAngle + Math.PI / points;
      
      const outerX = centerX + outerRadius * Math.cos(outerAngle);
      const outerY = centerY + outerRadius * Math.sin(outerAngle);
      const innerX = centerX + innerRadius * Math.cos(innerAngle);
      const innerY = centerY + innerRadius * Math.sin(innerAngle);
      
      path += `L ${outerX},${outerY} L ${innerX},${innerY} `;
    }
    
    path += 'Z';
    return path;
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Whimsical stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `rotate(${star.rotation}deg)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [star.rotation, star.rotation + 360],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            scale: {
              duration: star.duration / 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: star.duration * 2,
              repeat: Infinity,
              ease: "linear"
            },
            opacity: {
              duration: star.duration / 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            delay: star.delay
          }}
        >
          <svg width={star.size} height={star.size} viewBox={`0 0 ${star.size} ${star.size}`}>
            <path
              d={createStarPath(star.size, star.points)}
              fill={star.color}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Shooting stars */}
      {shootingStars.map(star => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.length}px`,
            height: `${star.size}px`,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8))',
            borderRadius: '50%',
            transformOrigin: 'left center',
            transform: `rotate(${star.angle}deg)`
          }}
          initial={{ opacity: 0, x: -star.length * 2 }}
          animate={{
            opacity: [0, 1, 0],
            x: [
              -star.length * 2,
              window.innerWidth + star.length * 2
            ]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
            repeatDelay: Math.random() * 20 + 10 // 10-30s delay between repeats
          }}
        />
      ))}
      
      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
            repeatDelay: Math.random() * 5 + 2 // 2-7s delay between repeats
          }}
        />
      ))}
    </div>
  );
};

export default WhimsicalStars;
