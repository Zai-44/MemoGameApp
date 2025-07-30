import { Button } from "@/components/ui/button";
import { BotonCredit } from "./BotonCredit";

interface GameCardProps {
  onPlayClick: () => void;
  onRankingClick: () => void;
}

export function GameCard({ onPlayClick, onRankingClick }: GameCardProps) {
  return (
    <div className="relative w-full max-w-2xl h-[600px] overflow-hidden"> 
      {/* Fondo de la card */}
      <div className="absolute inset-0 bg-white/1 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl" />
          {/* backdrop-blur-md/xl */}


      {/* Contenido de la card */}
      <div className="relative z-10 h-full flex flex-col  pt-18 p-20 justify-center ">
        <h1
          className="text-6xl italic font-bold text-black mb-6 text-center"
          style={{ fontFamily: "'Pacifico', cursive", color: "#657d4b" }}
        >
          MemoGameApp
        </h1>

        {/* Botones */}
        <div className="flex items-center gap-3 ml-24 mt-19">
          
          {/* Botón Comenzar */}
          <video
            src="/video/arrow.mp4"
            autoPlay
            loop
            muted
            width={80}
            height={80}
            className="mr-2"
          />
          <Button
            onClick={onPlayClick}
            className="bg-white hover:bg-white/20 py-9 text-3xl text-black font-semibold "
            style={{ color: "#657d4b" }}
          >
            <span>Comenzar</span>
          </Button>
        </div>

          {/* Botón Ranking */}
        <div className="flex flex-col sm:flex-col py-8 w-80 ml-18">
          <Button
            variant="outline"
            onClick={onRankingClick}
            className="bg-white/10 hover:bg-white/40 py-9 text-3xl font-semibold"
            style={{ color: "#657d4b" }}
          >
            <span>Ranking</span>
          </Button>
        </div>



      </div>
    </div>
  );
}