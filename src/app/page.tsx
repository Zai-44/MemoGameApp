"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type CardType = {
  id: number;
  image: string;
  matched: boolean;
};

type RankingType = {
  time: number;
  attempts: number;
};

const generateShuffledCards = (): CardType[] => {
  const cardImages = Array.from(
    { length: 12 },
    (_, i) => `/images/${i + 1}.png`
  );
  const duplicated = [...cardImages, ...cardImages];
  const shuffled = duplicated
    .map((image, index) => ({ id: index, image, matched: false }))
    .sort(() => Math.random() - 0.5);
  return shuffled;
};

export default function Home() {
  const [cards, setCards] = useState<CardType[]>(generateShuffledCards());
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [ranking, setRanking] = useState<RankingType[]>([]);

  // Start timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.image === secondCard.image) {
        setCards((prev) =>
          prev.map((card) =>
            card.image === firstCard.image ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
        setAttempts((prev) => prev + 1);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setIsRunning(false);
      saveToRanking();
    }
  }, [cards]);

  useEffect(() => {
    const saved = localStorage.getItem("memorama-ranking");
    if (saved) setRanking(JSON.parse(saved));
  }, []);

  const handleChoice = (card: CardType) => {
    if (!disabled && card !== firstCard && !card.matched) {
      firstCard ? setSecondCard(card) : setFirstCard(card);
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const saveToRanking = () => {
    const newRecord = { time, attempts };
    const updated = [...ranking, newRecord]
      .sort((a, b) => a.time - b.time || a.attempts - b.attempts)
      .slice(0, 5);
    setRanking(updated);
    localStorage.setItem("memorama-ranking", JSON.stringify(updated));
  };

  const restartGame = () => {
    setCards(generateShuffledCards());
    setFirstCard(null);
    setSecondCard(null);
    setAttempts(0);
    setTime(0);
    setIsRunning(true);
  };

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
      <div className="max-w-5xl mx-auto text-center py-6">
        <h1 className="text-4xl font-bold mb-2">🧠 App Memorama</h1>
        <p className="text-gray-300 mb-6">
          ¡Encuentra los pares lo más rápido posible!
        </p>

        <div className="flex justify-between items-center mb-4 px-4 text-lg">
          <div>
            ⏱️ Tiempo: <strong>{formatTime(time)}</strong>
          </div>
          <div>
            ❌ Intentos fallidos: <strong>{attempts}</strong>
          </div>
          <button
            className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded"
            onClick={restartGame}
          >
            Reiniciar
          </button>
        </div>

        <div className="grid grid-cols-6 gap-3 justify-center">
          {cards.map((card) => {
            const flipped =
              card === firstCard || card === secondCard || card.matched;
            return (
              <div
                key={card.id}
                className="cursor-pointer rounded shadow-md"
                onClick={() => handleChoice(card)}
              >
                <Image
                  src={flipped ? card.image : "/images/contraportada.png"}
                  alt="card"
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">🏆 Ranking</h2>
          <ul className="text-left mx-auto max-w-md">
            {ranking.length === 0 && <li>No hay registros aún.</li>}
            {ranking.map((entry, index) => (
              <li key={index} className="mb-1">
                #{index + 1} - ⏱️ {formatTime(entry.time)} | ❌ {entry.attempts}{" "}
                fallos
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}
