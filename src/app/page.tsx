'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AnimatedCardsBackground } from '../components/AnimatedCardsBackground';
import AnimatedBackground from '../components/AnimatedBackground';
import { BotonCredit } from '../components/BotonCredit';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import { GameCard } from '@/components/GameCard';

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showCardsBackground, setShowCardsBackground] = useState(false);
  const router = useRouter(); // ← usado para redireccionar

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      setShowCardsBackground(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowAnimation(false);
    setShowCardsBackground(true);
  };

  const handleSettingsClick = () => {
    router.push('/credits'); // ← redirección al hacer clic
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado de cartas (solo después de la animación inicial) */}
      {showCardsBackground && <AnimatedCardsBackground />}

      {/* Fondo de burbujas (siempre visible durante la animación inicial) */}
      {showAnimation && <AnimatedBackground />}

      <AnimatePresence>
        {showAnimation ? (
          <motion.div
            key="video-animation"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-start bg-amber-50 min-h-screen"
          >
            {/* Texto arriba del video */}
            <motion.div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 40, x: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="text-8xl font-bold mt-10 mb-4 text-center text-white drop-shadow-lg relative z-10"
                style={{ fontFamily: 'Anta' }}
              >
                MemoGameApp
              </motion.h1>

              {/* Efecto de humo (copias del texto con blur) */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0.5,
                    y: 20 + i * 10,
                    x: 0,
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    opacity: 0,
                    y: 0 - i * 5,
                    x: (i % 2 === 0 ? 1 : -1) * 10,
                    filter: 'blur(20px)',
                  }}
                  transition={{
                    delay: 0.7 + i * 0.2,
                    duration: 1.5,
                    ease: 'easeOut',
                  }}
                  className="absolute top-0 left-0 w-full text-center"
                  style={{ fontFamily: 'Anta' }}
                >
                  <h1 className="text-8xl font-bold mt-10 mb-4 text-amber-300 opacity-80">
                    MemoGameApp
                  </h1>
                </motion.div>
              ))}
            </motion.div>

            {/* Video principal */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-6xl h-6xl max-h-[80vh] flex items-center mt-20 justify-center"
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full"
              >
                <source src="/video/TransOran.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
            {/* Imagen superior */}
            <div className="absolute top-10 w-full h-1/3 flex justify-center z-0">
              <div className="relative w-64 h-48">
                <Image
                  alt="FondoCard"
                  src="/images/logo.svg"
                  fill
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Componente de tarjeta principal */}
            <GameCard />

            {/* Botón de créditos que redirige */}
            <BotonCredit
              icon={<Settings className="w-6 h-6" />}
              onClick={handleSettingsClick}
              className="bg-red-800 hover:bg-rose-700"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
