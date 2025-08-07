// src/app/components/AnimatedBackground.tsx
'use client';

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 100 + 50;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    return {
      id: i,
      size,
      duration,
      delay,
      x,
      y,
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden -10">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-amber-300 opacity-80"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, 30, 60, 30, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;