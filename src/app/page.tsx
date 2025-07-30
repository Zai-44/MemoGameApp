'use client'
import { GameCard } from './components/GameCard';
import { Settings } from 'lucide-react';
import { BotonCredit } from './components/BotonCredit';

export default function HomePage() {
  const handlePlayClick = () => {
    console.log('Iniciar juego');
    // Redirección o lógica de juego aquí
  };

  const handleRankingClick = () => {
    console.log('Mostrar ranking');
    // Lógica para mostrar ranking aquí
  };

  const handleSettingsClick = () => {
    console.log('Abrir configuraciones');
    // Lógica para configuraciones aquí
  };

  return (
    <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full flex justify-center">
        <GameCard
          onPlayClick={handlePlayClick}
          onRankingClick={handleRankingClick}
        />
      </div>
      
      <BotonCredit
        icon={<Settings className="w-6 h-6" />}
        onClick={handleSettingsClick}
        className="bg-rose-600 hover:bg-rose-700"
      />
    </main>
  );
}