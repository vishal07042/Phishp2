import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  opacity: number;
  delay: number;
  duration: number;
}

interface Nebula {
  id: number;
  width: string;
  height: string;
  top: string;
  left: string;
  color: string;
  opacity: number;
  blur: string;
  animationDuration: number;
}

interface Comet {
  id: number;
  top: string;
  left: string;
  size: number;
  angle: number;
  delay: number;
  duration: number;
}

interface WhimsicalElement {
  id: number;
  type: 'planet' | 'asteroid' | 'satellite' | 'ufo';
  top: string;
  left: string;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
}

const EnhancedBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [nebulae, setNebulae] = useState<Nebula[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);
  const [whimsicals, setWhimsicals] = useState<WhimsicalElement[]>([]);

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = Math.min(window.innerWidth / 3, 200); // More stars, but capped
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 3 + 1, // 1-4px
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7 + 0.3, // 0.3-1.0
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2 // 2-5s
        });
      }
      
      setStars(newStars);
    };
    
    // Generate nebulae
    const generateNebulae = () => {
      const newNebulae: Nebula[] = [];
      const nebulaCount = 6; // More nebulae for vibrant background
      const colors = [
        'rgba(147, 51, 234, 0.15)', // Purple
        'rgba(79, 70, 229, 0.15)',  // Indigo
        'rgba(59, 130, 246, 0.15)', // Blue
        'rgba(236, 72, 153, 0.15)', // Pink
        'rgba(16, 185, 129, 0.15)', // Emerald
        'rgba(245, 158, 11, 0.15)'  // Amber
      ];
      
      for (let i = 0; i < nebulaCount; i++) {
        newNebulae.push({
          id: i,
          width: `${Math.random() * 30 + 20}%`, // 20-50% width
          height: `${Math.random() * 30 + 20}%`, // 20-50% height
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 80}%`,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.2 + 0.05, // 0.05-0.25
          blur: `${Math.random() * 100 + 50}px`, // 50-150px blur
          animationDuration: Math.random() * 60 + 60 // 60-120s
        });
      }
      
      setNebulae(newNebulae);
    };
    
    // Generate comets
    const generateComets = () => {
      const newComets: Comet[] = [];
      const cometCount = 8; // More comets
      
      for (let i = 0; i < cometCount; i++) {
        newComets.push({
          id: i,
          top: `${Math.random() * 50}%`,
          left: `${Math.random() * 50}%`,
          size: Math.random() * 100 + 50, // 50-150px
          angle: Math.random() * 60 - 30, // -30 to 30 degrees
          delay: Math.random() * 15, // 0-15s delay
          duration: Math.random() * 5 + 3 // 3-8s duration
        });
      }
      
      setComets(newComets);
    };
    
    // Generate whimsical elements
    const generateWhimsicals = () => {
      const newWhimsicals: WhimsicalElement[] = [];
      const whimsicalCount = 6; // Add more whimsical elements
      const types: ('planet' | 'asteroid' | 'satellite' | 'ufo')[] = ['planet', 'asteroid', 'satellite', 'ufo'];
      
      for (let i = 0; i < whimsicalCount; i++) {
        newWhimsicals.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          size: Math.random() * 30 + 20, // 20-50px
          rotation: Math.random() * 360, // 0-360 degrees
          delay: Math.random() * 5,
          duration: Math.random() * 60 + 30 // 30-90s
        });
      }
      
      setWhimsicals(newWhimsicals);
    };
    
    generateStars();
    generateNebulae();
    generateComets();
    generateWhimsicals();
    
    // Handle window resize
    const handleResize = () => {
      generateStars();
      generateNebulae();
      generateComets();
      generateWhimsicals();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render whimsical element based on type
  const renderWhimsical = (element: WhimsicalElement) => {
    switch (element.type) {
      case 'planet':
        return (
          <motion.div
            key={element.id}
            className="absolute rounded-full"
            style={{
              top: element.top,
              left: element.left,
              width: `${element.size}px`,
              height: `${element.size}px`,
              background: 'radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.3), rgba(0, 0, 0, 0.8))',
              boxShadow: 'inset 2px 2px 10px rgba(255, 255, 255, 0.2)'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: {
                duration: element.duration,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: element.duration / 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              delay: element.delay
            }}
          />
        );
      case 'asteroid':
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              top: element.top,
              left: element.left,
              width: `${element.size * 1.5}px`,
              height: `${element.size}px`,
              background: 'radial-gradient(ellipse at center, rgba(100, 100, 100, 0.5), rgba(50, 50, 50, 0.3))',
              borderRadius: '50% 30% 50% 40%'
            }}
            animate={{
              rotate: [0, 360],
              x: [0, 50, 0, -50, 0],
              y: [0, 30, 0, -30, 0]
            }}
            transition={{
              rotate: {
                duration: element.duration / 2,
                repeat: Infinity,
                ease: "linear"
              },
              x: {
                duration: element.duration,
                repeat: Infinity,
                ease: "easeInOut"
              },
              y: {
                duration: element.duration * 0.7,
                repeat: Infinity,
                ease: "easeInOut"
              },
              delay: element.delay
            }}
          />
        );
      case 'satellite':
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              top: element.top,
              left: element.left,
              width: `${element.size * 2}px`,
              height: `${element.size / 2}px`,
              background: 'linear-gradient(90deg, rgba(150, 150, 150, 0.7), rgba(200, 200, 200, 0.9), rgba(150, 150, 150, 0.7))',
              borderRadius: '40% 40% 10% 10%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: element.duration / 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: element.duration / 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              delay: element.delay
            }}
          >
            <motion.div
              className="absolute"
              style={{
                top: '50%',
                left: '10%',
                width: `${element.size * 1.5}px`,
                height: `${element.size / 10}px`,
                background: 'rgba(100, 100, 100, 0.8)',
                borderRadius: '10px',
                transform: 'translateY(-50%)'
              }}
            />
          </motion.div>
        );
      case 'ufo':
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              top: element.top,
              left: element.left,
              width: `${element.size}px`,
              height: `${element.size / 2}px`,
              background: 'radial-gradient(ellipse at center, rgba(150, 255, 150, 0.7), rgba(100, 200, 100, 0.5))',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(100, 255, 100, 0.6)'
            }}
            animate={{
              y: [0, -20, 0, 20, 0],
              x: [0, 30, 0, -30, 0],
              scale: [1, 1.1, 1, 0.9, 1]
            }}
            transition={{
              y: {
                duration: element.duration / 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              x: {
                duration: element.duration / 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: element.duration / 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              delay: element.delay
            }}
          >
            <motion.div
              className="absolute"
              style={{
                bottom: '0',
                left: '50%',
                width: `${element.size * 0.6}px`,
                height: `${element.size * 0.3}px`,
                background: 'rgba(200, 255, 200, 0.8)',
                borderRadius: '50%',
                transform: 'translateX(-50%) translateY(25%)'
              }}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Vibrant background gradient */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(20, 20, 40, 1), rgba(0, 0, 0, 1))'
        }}
      />
      
      {/* Nebulae */}
      {nebulae.map(nebula => (
        <motion.div
          key={nebula.id}
          className="absolute rounded-full"
          style={{
            width: nebula.width,
            height: nebula.height,
            top: nebula.top,
            left: nebula.left,
            background: nebula.color,
            opacity: nebula.opacity,
            filter: `blur(${nebula.blur})`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [nebula.opacity, nebula.opacity * 1.5, nebula.opacity]
          }}
          transition={{
            duration: nebula.animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Comets */}
      {comets.map(comet => (
        <motion.div
          key={comet.id}
          className="absolute"
          style={{
            top: comet.top,
            left: comet.left,
            width: `${comet.size}px`,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8))',
            transformOrigin: 'left center',
            transform: `rotate(${comet.angle}deg)`
          }}
          initial={{ opacity: 0, x: -comet.size * 2 }}
          animate={{
            opacity: [0, 1, 0],
            x: [
              -comet.size * 2,
              window.innerWidth + comet.size * 2
            ]
          }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            delay: comet.delay,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Whimsical elements */}
      {whimsicals.map(element => renderWhimsical(element))}
    </div>
  );
};

export default EnhancedBackground;
