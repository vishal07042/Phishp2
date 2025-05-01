import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { useGamification } from "@/components/GamificationSystem";

interface AnimatedButtonProps extends ButtonProps {
  hoverScale?: number;
  glowColor?: string;
  pulseEffect?: boolean;
  rewardPoints?: number;
  rewardReason?: string;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    children, 
    hoverScale = 1.05, 
    glowColor = "rgba(147, 51, 234, 0.5)",
    pulseEffect = false,
    rewardPoints,
    rewardReason,
    onClick,
    ...props 
  }, ref) => {
    const { addPoints } = useGamification();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Award points if specified
      if (rewardPoints && rewardPoints > 0) {
        addPoints(rewardPoints, rewardReason);
      }
      
      // Call the original onClick handler if provided
      if (onClick) {
        onClick(e);
      }
    };
    
    return (
      <motion.div
        whileHover={{ 
          scale: hoverScale,
          boxShadow: `0 0 15px ${glowColor}`,
        }}
        whileTap={{ scale: 0.98 }}
        animate={pulseEffect ? {
          scale: [1, 1.03, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : undefined}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {/* Shine effect on hover */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
            style={{ skewX: -20 }}
            whileHover={{
              opacity: 0.2,
              x: ["0%", "150%"],
              transition: { duration: 1, repeat: Infinity, repeatDelay: 1 }
            }}
          />
          
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
