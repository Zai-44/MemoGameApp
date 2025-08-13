// components/MemoryRanking.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatTime } from '../utils/timeUtils';

// Tipo para los registros del ranking
interface RankingEntry {
  id: string;
  playerName: string;
  time: number; // tiempo en milisegundos
  date: string;
}

const MemoryRanking: React.FC = () => {
  // Estado para almacenar los registros del ranking
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Omit<RankingEntry, 'id'>>({ 
    playerName: '', 
    time: 0,
    date: new Date().toISOString()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar ranking desde localStorage al iniciar
  useEffect(() => {
    const savedRanking = localStorage.getItem('memoryGameRanking');
    if (savedRanking) {
      setRanking(JSON.parse(savedRanking));
    }
  }, []);

  // Guardar en localStorage cuando el ranking cambia
  useEffect(() => {
    if (ranking.length > 0) {
      localStorage.setItem('memoryGameRanking', JSON.stringify(ranking));
    }
  }, [ranking]);

  // Función para manejar cuando el juego termina (se llama desde el componente del juego)
  const handleGameCompleted = (completionTime: number) => {
    setNewEntry(prev => ({
      ...prev,
      time: completionTime,
      date: new Date().toISOString()
    }));
  };

  // Guardar nuevo registro en el ranking
  const submitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.playerName.trim()) return;

    setIsSubmitting(true);
    
    const entryWithId = {
      ...newEntry,
      id: Date.now().toString()
    };

    setRanking(prev => {
      const newRanking = [...prev, entryWithId]
        .sort((a, b) => a.time - b.time) // Ordenar por tiempo (menor primero)
        .slice(0, 10); // Mantener solo top 10
      return newRanking;
    });

    setNewEntry({
      playerName: '',
      time: 0,
      date: new Date().toISOString()
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Ranking de Memorama</h2>
      
      {/* Formulario para agregar nuevo puntaje (se muestra solo si hay un tiempo para registrar) */}
      {newEntry.time > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            ¡Completaste el memorama en {formatTime(newEntry.time)}!
          </h3>
          <form onSubmit={submitScore} className="space-y-4">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
                Ingresa tu nombre:
              </label>
              <input
                id="playerName"
                type="text"
                value={newEntry.playerName}
                onChange={(e) => setNewEntry({...newEntry, playerName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
                maxLength={20}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Puntaje'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Tabla de ranking */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Posición</th>
              <th className="py-3 px-4 text-left">Jugador</th>
              <th className="py-3 px-4 text-left">Tiempo</th>
              <th className="py-3 px-4 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {ranking.length > 0 ? (
                ranking.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="py-3 px-4 font-medium">{index + 1}</td>
                    <td className="py-3 px-4">{entry.playerName}</td>
                    <td className="py-3 px-4">{formatTime(entry.time)}</td>
                    <td className="py-3 px-4">{new Date(entry.date).toLocaleDateString()}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No hay registros aún. ¡Sé el primero!
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemoryRanking;