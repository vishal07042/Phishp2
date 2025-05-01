
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const AnimatedCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSize = useMotionValue(16);
  
  // Create spring animations for smoother cursor movement
  const springX = useSpring(cursorX, { damping: 25, stiffness: 700 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 700 });
  const springSize = useSpring(cursorSize, { damping: 25, stiffness: 400 });
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseDown = () => cursorSize.set(12);
    const handleMouseUp = () => cursorSize.set(16);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        cursorSize.set(32);
      }
    };
    
    const handleMouseOut = () => {
      cursorSize.set(16);
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);
  
  return (
    <motion.div className="pointer-events-none fixed z-50">
      <motion.div 
        className="fixed top-0 left-0 rounded-full border-2 border-primary/60 z-50 pointer-events-none mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          width: springSize,
          height: springSize
        }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-50 pointer-events-none mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          marginLeft: 7,
          marginTop: 7,
        }}
      />
    </motion.div>
  );
};

export default AnimatedCursor;
