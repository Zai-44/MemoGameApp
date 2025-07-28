import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Image from 'next/image';

interface GameCardProps {
  backgroundImage: string;
  onPlayClick: () => void;
  onRankingClick: () => void;
}

export function GameCard({
  backgroundImage,
  onPlayClick,
  onRankingClick,
}: GameCardProps) {
  return (
    <div 
      className="relative w-full max-w-2xl h-135 overflow-hidden"
    >
      {/* Fondo de la card */}
      <div className="absolute inset-0">
        <Image
          src="/MemoGameApp.png"
          alt="Memorama background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/0" />
      </div>

      {/* Contenido de la card */}
      <div className="relative z-10 h-full flex flex-col items-start pt-18 p-20">
        <h1 className="text-4xl italic font-bold text-white mb-10 text-center" 
            style={{ fontFamily:"'Pacifico', cursive", color: '#657d4b' }}>
          MemoGameApp
        </h1>

        {/* Botones */}
        <div className="flex flex-col sm:flex-col gap-7 w-80 justify-center">

          <Button 
            onClick={onPlayClick}
            className="bg-white hover:bg-white/20 py-8 text-2xl text-black font-semibold" 
            style={{  color: '#657d4b' }}
          > 
            <Video 
              src="public/flechaDer.mp4"
              alt="Cómo jugar" 
              width={20} 
              height={20} 
              className="mr-2"
              muted
              autoPlay
              loop
              playsInline
            />

            <span>Comenzar</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={onRankingClick}
            className="bg-white/10 hover:bg-white/40 px-6 py-8 text-2xl font-semibold"
          >           
            <span>Ranking</span>
          </Button>
        </div>
      </div>
    </div>
  );
}