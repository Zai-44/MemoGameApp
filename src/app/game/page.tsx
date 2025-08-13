"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, Pause, Play, RotateCcw, X } from "lucide-react";
import Image from "next/image";
import { AnimatedCardsBackground } from "@/components/AnimatedCardsBackground";
import { Button } from "@/components/ui/button";
import SoundController from "@/components/SoundController";

type Card = {
  id: number; // índice único
  pairId: number; // id de la pareja (0..11)
  img: string; // ruta imagen frontal
  flipped: boolean;
  matched: boolean;
};

const TOTAL_CARDS = 24;
const PAIRS = TOTAL_CARDS / 2;
const INITIAL_REVEAL_MS = 3000; // mostrar todas al inicio (ms)
const FLIP_BACK_MS = 900; // tiempo antes de voltear cartas no emparejadas

export default function GamePage() {
  const router = useRouter();

  // estado del juego
  const [cards, setCards] = useState<Card[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [revealing, setRevealing] = useState(false); // muestra todas las cartas al inicio
  const [firstIndex, setFirstIndex] = useState<number | null>(null);
  const [secondIndex, setSecondIndex] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const timerRef = useRef<number | null>(null);
  const lockRef = useRef(false); // evita clicks mientras se resuelve par/no-par
   const flipSound = useRef<HTMLAudioElement | null>(null);

  // Inicializar audio
  useEffect(() => {
    flipSound.current = new Audio("/sounds/flip.mp3");
  }, []);


  // helper para generar cartas mezcladas
  const generateShuffled = (): Card[] => {
    const base = Array.from(
      { length: PAIRS },
      (_, i) => `/images/${i + 1}.png`
    );
    const duplicated = [...base, ...base]; // 24 elementos: dos de cada imagen
    // crear objetos con pairId (0..11) y id único
    const withPair = duplicated.map((img, idx) => {
      // pairId: basándonos en posición: find index in base
      const pairId = base.indexOf(img);
      return {
        id: idx + Math.floor(Math.random() * 1000), // id único (evita colisiones visuales)
        pairId,
        img,
        flipped: true,
        matched: false,
      } as Card;
    });
    // mezclar
    return withPair.sort(() => Math.random() - 0.5);
  };

  // iniciar/reiniciar juego
  const startGame = () => {
    // reset estados
    const shuffled = generateShuffled();
    setCards(shuffled);
    setIsPlaying(true);
    setIsPaused(false);
    setRevealing(true);
    setFirstIndex(null);
    setSecondIndex(null);
    setAttempts(0);
    setTime(0);
    setShowModal(false);

    // mostrar todas las cartas unos segundos, luego voltearlas
    setTimeout(() => {
      setCards((prev) => prev.map((c) => ({ ...c, flipped: false })));
      setRevealing(false);
      // arrancar cronómetro
      startTimer();
    }, INITIAL_REVEAL_MS);
  };

  // cronómetro
  const startTimer = () => {
    // limpiar si existe
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = window.setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // pausar/reanudar
  const togglePause = () => {
    if (!isPlaying) return;
    setIsPaused((p) => {
      const newP = !p;
      if (newP) {
        // pausar: detener timer
        stopTimer();
      } else {
        // reanudar: arrancar timer
        startTimer();
      }
      return newP;
    });
  };

  // limpiar interval al desmontar
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  // click en carta
  const onCardClick = (index: number) => {
    if (!isPlaying) return;
    if (isPaused) return;
    if (revealing) return;
    if (lockRef.current) return;

    const card = cards[index];
    if (card.matched || card.flipped) return; // no hacemos nada

     // reproducir sonido de giro
    flipSound.current?.play();

    // voltear la carta
    setCards((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], flipped: true };
      return copy;
    });

    if (firstIndex === null) {
      setFirstIndex(index);
      return;
    }

    if (secondIndex === null) {
      setSecondIndex(index);
      setAttempts((a) => a + 1); // se cuenta un intento cuando volteas la segunda carta
      lockRef.current = true; // bloquea clicks hasta resolver

      // comparar
      const first = cards[firstIndex];
      const second = cards[index];
      // note: use the latest cards array; but first/second pairId derived from state BEFORE flipping second.
      // Use cards array from state (may be stale by one render), so recompute pairId from previously stored indices:
      const firstPairId = cards[firstIndex].pairId;
      const secondPairId = cards[index].pairId;

      if (firstPairId === secondPairId) {
        // match: marcar matched
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIndex || i === index ? { ...c, matched: true } : c
            )
          );
          // limpiar referencias
          setFirstIndex(null);
          setSecondIndex(null);
          lockRef.current = false;
        }, 300); // pequeño retraso para que se vea la carta volteada
      } else {
        // no coincide: voltearlas de nuevo después de FLIP_BACK_MS
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIndex || i === index ? { ...c, flipped: false } : c
            )
          );
          setFirstIndex(null);
          setSecondIndex(null);
          lockRef.current = false;
        }, FLIP_BACK_MS);
      }
    }
  };

  // efecto para detectar final del juego (todas las cartas matched)
  useEffect(() => {
    if (!isPlaying) return;
    const allMatched = cards.length > 0 && cards.every((c) => c.matched);
    if (allMatched) {
      // parar timer y mostrar modal con tiempo e intentos
      stopTimer();
      setIsPlaying(false);
      setTimeout(() => {
        setShowModal(true);
      }, 300);
    }
  }, [cards, isPlaying]);

  // helper display time mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // inicial: generar tablero pero con cartas mostradas y volteadas luego
  useEffect(() => {
    // genera tablero pero no marca juego como iniciado
    const init = generateShuffled();
    setCards(init);
    // mostrar por defecto y voltearlas
    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) => ({ ...c, flipped: false, matched: false }))
      );
    }, 800); // breve reveal inicial al cargar la página
    // limpia timer al desmontar (ya hecho arriba)
  }, []);

  // reiniciar desde modal o botón Reiniciar
  const handleRestart = () => {
    stopTimer();
    startGame();
  };

  // link home: router.push('/')
  // (explicación abajo)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      <AnimatedCardsBackground />

      <SoundController />
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* Botón de volver */}
          <button
            onClick={() => {
              router.push("/");
            }}
            className="absolute top-4 left-4 w-10 h-10 border-4 border-red-700 rounded-full transition-transform transform hover:scale-110 hover:brightness-90 duration-300 ease-in-out"
            aria-label="Volver"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/9138/9138369.png"
              alt="Volver"
              className="w-full h-full object-contain"
            />
          </button>

          <div className="flex items-center md:w-[100px] justify-center flex-1">
  <div className="relative w-60 h-30"></div>
            <Image
              src="/images/logo.svg"
              alt="Logo MemoGame"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <div className="text-lg select-none mr-40 text-right ">
            <div>Tiempo</div>
            <div className=" ml-auto font-mono text-xl">{formatTime(time)}</div>
          </div>
        </div>

        {/* CONTROLES */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => {
              if (!isPlaying) startGame();
              else handleRestart();
            }}
            className="bg-green-600 hover:bg-green-500"
          >
            {isPlaying ? "Reiniciar" : "Comenzar"}
          </Button>

          {isPlaying && !revealing && (
            <Button
              onClick={togglePause}
              className="bg-yellow-600 hover:bg-yellow-500 flex items-center"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4 mr-2" /> Reanudar
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 mr-2" /> Pausar
                </>
              )}
            </Button>
          )}

          {/* Mostrar intentos en header control */}
          <div className="ml-4 self-center text-white">
            Intentos: <span className="font-bold">{attempts}</span>
          </div>
        </div>

        {/* TABLERO 6x4 */}
        <div className="grid grid-cols-6 gap-4 justify-items-center">
          {cards.map((card, idx) => (
            <div key={card.id} className="w-full aspect-[3/4]">             <motion.div
                onClick={() => onCardClick(idx)}
                className="relative w-full h-full cursor-pointer"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="w-full h-full rounded-lg select-none"
                  animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                  transition={{ duration: 0.55 }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* FRONT - imagen (visible cuando rotateY=180) */}
                  <div
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Image
                      src={card.img}
                      alt="front"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* BACK - contraportada */}
                  <div
                    className="absolute inset-0 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <Image
                      src="/images/Fondo.jpg"
                      alt="back"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL FINAL (flotante) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-{100}">
          <div className="bg-white text-gray-900 rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-red-600"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4">¡Juego completado!</h2>
            <p className="mb-2">
              Tiempo: <span className="font-mono">{formatTime(time)}</span>
            </p>
            <p className="mb-4">
              Intentos: <span className="font-bold">{attempts}</span>
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => {
                  setShowModal(false);
                  router.push("/");
                }}
                className="bg-blue-600"
              >
                Ir al inicio
              </Button>
              <Button
                onClick={() => {
                  setShowModal(false);
                  handleRestart();
                }}
                className="bg-green-600"
              >
                Jugar otra vez
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}