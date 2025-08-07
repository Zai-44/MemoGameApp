// src/app/game/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function GamePage() {
  const router = useRouter();
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <button
            onClick={() => router.back()}
            className="text-white hover:text-indigo-300 transition-colors"
          >
            ← Volver
          </button>
          
          <h1 className="text-3xl font-bold text-white">MemoGame</h1>
          
          <div className="text-white">
            Puntaje: <span className="font-bold">0</span>
          </div>
        </motion.div>
        
        {/* Game board will go here */}
        <Card className="p-6 min-h-[60vh] flex items-center justify-center">
          <p className="text-center text-gray-300">Aquí irá el tablero del juego</p>
        </Card>
      </div>
    </div>
  );
}