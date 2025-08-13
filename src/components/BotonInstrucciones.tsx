import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface BotonInstruccionesProps {
  icon?: React.ReactNode;
  className?: string;
}

export function BotonInstrucciones({
  icon,
  className = '',
}: BotonInstruccionesProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Botón arriba a la izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="absolute top-4 left-4 z-50"
      >
        <Button
          onClick={() => setShowModal(true)}
          className={`bg-yellow-500 text-white hover:bg-yellow-600 rounded-full w-12 h-12 p-0 shadow-lg ${className}`}
        >
          {icon ?? <span className="text-lg font-bold">?</span>}
        </Button>
      </motion.div>

      {/* Modal con imagen */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]">
          <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto">
            <image
              src="images/instrucciones.jpg" // Coloca aquí la ruta pública de tu imagen
              alt="Instrucciones"
              className="rounded-lg"
            />
            <div className="text-center mt-4">
              <Button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
