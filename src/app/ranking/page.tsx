// src/app/ranking/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Card from '../components/Card';
import AnimatedBackground from '../components/AnimatedBackground';

export default function RankingPage() {
  const router = useRouter();
  
  // Sample ranking data
  const rankings = [
    { id: 1, name: 'Jugador 1', score: 1200 },
    { id: 2, name: 'Jugador 2', score: 1000 },
    { id: 3, name: 'Jugador 3', score: 800 },
    { id: 4, name: 'Jugador 4', score: 600 },
    { id: 5, name: 'Jugador 5', score: 400 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="text-white hover:text-indigo-300 transition-colors mb-6"
          >
            ← Volver
          </button>
          
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Ranking</h1>
            
            <div className="space-y-4">
              {rankings.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="font-bold text-indigo-600 w-8">{index + 1}.</span>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <span className="font-bold">{player.score} pts</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}