import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimatedCardProps {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  hoverEffect?: "glow" | "lift" | "tilt" | "none";
  glowColor?: string;
  delay?: number;
}

const AnimatedCard = ({
  className,
  children,
  title,
  description,
  footer,
  hoverEffect = "glow",
  glowColor = "rgba(147, 51, 234, 0.5)",
  delay = 0
}: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Different hover animations based on the selected effect
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "glow":
        return {
          boxShadow: `0 0 20px ${glowColor}`,
          scale: 1.02
        };
      case "lift":
        return {
          y: -10,
          scale: 1.02
        };
      case "tilt":
        return {
          rotateX: 5,
          rotateY: 5,
          scale: 1.02
        };
      case "none":
      default:
        return {};
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={getHoverAnimation()}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("relative", hoverEffect === "tilt" && "transform-3d")}
    >
      <Card className={cn(
        "transition-all duration-300 overflow-hidden border-opacity-50",
        isHovered && "border-opacity-100",
        className
      )}>
        {(title || description) && (
          <CardHeader>
            {title && (
              <CardTitle className="relative">
                {title}
                {isHovered && (
                  <motion.span
                    layoutId={`underline-${title.toString()}`}
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </CardTitle>
            )}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        
        {children && <CardContent>{children}</CardContent>}
        
        {footer && <CardFooter>{footer}</CardFooter>}
        
        {/* Background gradient effect */}
        {isHovered && hoverEffect === "glow" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.5,
              background: [
                "linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(147, 51, 234, 0.1) 100%)",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(59, 130, 246, 0.05) 100%)",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(147, 51, 234, 0.1) 100%)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        )}
      </Card>
    </motion.div>
  );
};

export { AnimatedCard };
