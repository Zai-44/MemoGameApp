// components/GameCard.tsx
'use client';
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';

export function GameCard() {
  const router = useRouter();

  return (
    <Card>
      <div className="h-full flex flex-col justify-center p-10">
        {/* Título con efectos especiales */}
        <motion.div
          className="mb-10 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.2,
            duration: 0.6,
            type: 'spring',
            stiffness: 100
          }}
        >
          <motion.h1
            className="text-7xl"
            style={{ 
              fontFamily: "Anta", 
              color: "#FFFFFF",
              textShadow: "3px 3px 0 #000000, 6px 6px 0 #000000, 8px 8px 15px rgba(0,0,0,0.9)"
            }}
            whileHover={{ 
              scale: 1.03,
            }}>
            MemoGameApp
          </motion.h1>
        </motion.div>
        {/* Contenedor de botones */}
        <div className="space-y-8 w-full max-w-70 mx-auto">
          {/* Botón Comenzar con efectos mejorados */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              onClick={() => router.push('/game')}
              className="w-full flex items-center justify-center py-5 px-8 rounded-xl text-3xl font-bold relative overflow-hidden"
              style={{ 
                backgroundColor: '#960000',
                border: '2px solid #4A0000'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 15px rgba(101, 125, 75, 0.7)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute left-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
              </motion.span>
              <span className="mr-4">¡Juega Ya!</span>
              <FaArrowCircleRight size="1.3em" />
            </motion.button>
          </motion.div>
          {/* Botón Ranking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              onClick={() => router.push('/ranking')}
              className="py-2 rounded-xl text-3xl ml-80"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid',
                backdropFilter: 'blur(5px)'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                boxShadow: '0 0 10px rgba(101, 125, 75, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Ranking
            </motion.button>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}