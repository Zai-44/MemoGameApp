// components/Card.tsx
'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
}

export default function Card({ 
  children, 
  className = '', 
  initial = { opacity: 0, y: 20 }, 
  animate = { opacity: 1, y: 0 }, 
  transition = { duration: 0.5 } 
}: CardProps) {
  return (
    <motion.div
      className={`relative w-[700px] max-w-2xl h-[400px] overflow-hidden rounded-2xl shadow-xl`}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {/* Fondo con imagen y degradado azul */}
      <div className="absolute inset-0">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-[url('/images/Fondo.jpg')] bg-center"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }}
        />
        
        {/* Degradado azul superior */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent"
        />
        
        {/* Capa de vidrio esmerilado */}
        <div className="absolute inset-0   border- border-blue-950" />
      </div>
      
      {/* Contenido */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}