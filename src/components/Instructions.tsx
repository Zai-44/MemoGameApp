// components/Instructions.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface InstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Instructions = ({ isOpen, onClose }: InstructionsProps) => {
  // Contenido de las instrucciones
  const steps = [
    {
      title: "Voltea las cartas",
      description: "Haz clic en cualquier carta para voltearla y revelar su imagen."
    },
    {
      title: "Encuentra parejas",
      description: "Encuentra dos cartas con la misma imagen para hacerlas coincidir."
    },
    {
      title: "Memoriza las posiciones",
      description: "Recuerda dónde están las cartas que ya has visto para encontrar parejas más rápido."
    },
    {
      title: "Completa el juego",
      description: "Encuentra todas las parejas en el menor tiempo posible."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 p-6 shadow-2xl border border-blue-400/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cierre */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Cerrar instrucciones"
            >
              <X size={24} />
            </button>

            {/* Contenido principal */}
            <div className="space-y-6">
              <h2 className="text-center text-3xl font-bold text-white mb-2">
                Cómo jugar MemoGame
              </h2>
              <p className="text-center text-blue-200 mb-6">
                Sigue estos simples pasos para convertirte en un maestro del memorama
              </p>

              {/* Lista de instrucciones */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-blue-400/20"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <p className="text-blue-100">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Botón de acción */}
              <div className="pt-2 text-center">
                <Button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold transition-colors"
                >
                  ¡Entendido, a jugar!
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};