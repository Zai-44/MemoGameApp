'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { GameCard } from '@/components/GameCard';
import SoundController from '@/components/SoundController';
import { BotonCredit } from '@/components/BotonCredit';
import { AnimatedCardsBackground } from '@/components/AnimatedCardsBackground';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const router = useRouter();
  const [showCardsBackground, setShowCardsBackground] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setShowCardsBackground(true);
    }, 4000);

      const handleVideoEnd = () => {
    setShowCardsBackground(true);
  };

    return () => clearTimeout(timer);
  }, []);

  const handleSettingsClick = () => {
    router.push('/credits');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {showCardsBackground && <AnimatedCardsBackground />}

      <AnimatePresence>
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                MemoGame
              </h1>
              <p className="text-xl text-blue-200">Juego de Memoria</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-blue-100 text-lg"
            >
              Cargando...
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
            {/* Control de sonido en esquina superior derecha */}
            
              <SoundController />
           

            {/* Contenido principal del juego */}
            <GameCard />

            {/* Botón de configuración */}
            <div className="mt-8">
            {/* Botón de créditos que redirige */}
            <BotonCredit
              icon={<Settings className="w-6 h-6" />}
              onClick={handleSettingsClick}
              className="bg-amber-700 hover:bg-amber-700"
            />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}