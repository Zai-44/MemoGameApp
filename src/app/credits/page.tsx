// src/app/credits/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';

export default function CreditsPage() {
  const router = useRouter();
  
  const teamMembers = [
    { name: 'Diseñador UI/UX', role: 'Diseño de interfaz y experiencia de usuario' },
    { name: 'Desarrollador Frontend', role: 'Implementación del juego y animaciones' },
    { name: 'Diseñador Gráfico', role: 'Creación de assets visuales' },
    { name: 'Tester', role: 'Control de calidad y experiencia de juego' },
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
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Créditos</h1>
            
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-indigo-50 p-6 rounded-lg"
                >
                  <h3 className="font-bold text-lg text-indigo-600">{member.name}</h3>
                  <p className="text-gray-700">{member.role}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center text-gray-600"
            >
              <p>© {new Date().getFullYear()} MemoGameApp - Todos los derechos reservados</p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}