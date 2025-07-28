'use client'
import { Settings } from 'lucide-react';
import { BotonCredit } from '../components/BotonCredit';
import { GameCard } from '../components/GameCard';


export default function HomePage() {
  const handlePlayClick = () => {
    // Lógica para iniciar el juego
    console.log('Iniciar juego');
  };

  const handleRankingClick = () => {
    // Lógica para mostrar instrucciones
    console.log('Mostrar instrucciones');
  };

  const handleSettingsClick = () => {
    // Lógica para configuraciones
    console.log('Abrir configuraciones');
  };

  return (
    <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-12" style={{ backgroundColor: '#70a9dc' }}>
      <GameCard
        backgroundImage="/images/memorama-bg.jpg"
        onPlayClick={handlePlayClick}
        onRankingClick={handleRankingClick}
      />
      
      <BotonCredit
        icon={<Settings className="w-6 h-6" />}
        onClick={handleSettingsClick}
        className="bg-rose-600 hover:bg-rose-700"
      />
    </main>
  );
}
