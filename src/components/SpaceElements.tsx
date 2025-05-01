import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDelay: string;
}

interface Planet {
  id: number;
  top: string;
  left: string;
  size: string;
  color: string;
  zIndex: number;
}

interface Comet {
  id: number;
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
  rotation: string;
}

const SpaceElements: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    // Create stars
    const starCount = 50;
    const newStars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 5}s`
      });
    }
    
    setStars(newStars);
    
    // Create planets
    const planetCount = 3;
    const newPlanets: Planet[] = [];
    const planetColors = [
      'radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.3), rgba(0, 0, 0, 0.8))',
      'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.3), rgba(0, 0, 0, 0.8))',
      'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), rgba(0, 0, 0, 0.8))'
    ];
    
    for (let i = 0; i < planetCount; i++) {
      newPlanets.push({
        id: i,
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        size: `${Math.random() * 80 + 40}px`,
        color: planetColors[Math.floor(Math.random() * planetColors.length)],
        zIndex: -1
      });
    }
    
    setPlanets(newPlanets);
    
    // Create comets
    const cometCount = 5;
    const newComets: Comet[] = [];
    
    for (let i = 0; i < cometCount; i++) {
      newComets.push({
        id: i,
        top: `${Math.random() * 50}%`,
        left: `${Math.random() * 50}%`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        rotation: `${Math.random() * 360}deg`
      });
    }
    
    setComets(newComets);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay
          }}
        />
      ))}
      
      {/* Planets */}
      {planets.map(planet => (
        <div
          key={planet.id}
          className="planet"
          style={{
            top: planet.top,
            left: planet.left,
            width: planet.size,
            height: planet.size,
            background: planet.color,
            zIndex: planet.zIndex
          }}
        />
      ))}
      
      {/* Comets */}
      {comets.map(comet => (
        <div
          key={comet.id}
          className="comet"
          style={{
            top: comet.top,
            left: comet.left,
            animationDelay: comet.animationDelay,
            animationDuration: comet.animationDuration,
            transform: `rotate(${comet.rotation})`
          }}
        />
      ))}
    </div>
  );
};

export default SpaceElements;
