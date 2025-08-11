'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CardPosition {
  id: number;
  x: number;
  y: number;
  rotation: number;
  baseScale: number; // Escala base (sin animación)
  targetScale: number; // Escala objetivo para la animación
  image: string;
  xVelocity: number;
  yVelocity: number;
  scaleDuration: number; // Duración de la animación de escala
}

export const AnimatedCardsBackground = () => {
  const [cards, setCards] = useState<CardPosition[]>([]);

  useEffect(() => {
    // Cargar imágenes de cartas
    const cardImages = [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
      '/images/4.png',
      '/images/5.png',
      '/images/6.png',
      '/images/7.png',
      '/images/8.png',
      '/images/9.png',
      '/images/10.png',
      '/images/11.png',
      '/images/12.png',
      '/images/13.png',
    ];

    // Generar posiciones aleatorias para las cartas
    const initialCards = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      baseScale: 0.7 + Math.random() * 0.6, // Escala base
      targetScale: 1.1 + Math.random() * 0.3, // Escala máxima para la animación
      image: cardImages[i % cardImages.length],
      xVelocity: (Math.random() - 0.5) * 0.2,
      yVelocity: (Math.random() - 0.5) * 0.2,
      scaleDuration: 2 + Math.random() * 3, // Duración aleatoria entre 2-5 segundos
    }));

    setCards(initialCards);

    // Animación continua de las cartas
    const interval = setInterval(() => {
      setCards(prevCards =>
        prevCards.map(card => {
          let newX = card.x + card.xVelocity;
          let newY = card.y + card.yVelocity;
          let newXVelocity = card.xVelocity;
          let newYVelocity = card.yVelocity;

          // Rebotar en los bordes
          if (newX <= 0 || newX >= 100) newXVelocity *= -1;
          if (newY <= 0 || newY >= 100) newYVelocity *= -1;

          return {
            ...card,
            x: newX,
            y: newY,
            xVelocity: newXVelocity,
            yVelocity: newYVelocity,
            rotation: card.rotation + (Math.random() - 0.5) * 2,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} 
      className="fixed inset-0 overflow-hidden bg-blue-300"
    >
      {cards.map(card => (
        <motion.div
          key={card.id}
          className="absolute"
          style={{
            width: '200px',
            height: '400px',
            left: `${card.x}%`,
            top: `${card.y}%`,
            rotate: card.rotation,
            zIndex: Math.floor(card.baseScale * 10),
            filter: `brightness(${0.8 + card.baseScale * 0.3})`,
            opacity: 0.4 ,
          }}
          animate={{
            x: [`${card.x}%`, `${card.x + card.xVelocity}%`],
            y: [`${card.y}%`, `${card.y + card.yVelocity}%`],
            scale: [card.baseScale, card.targetScale, card.baseScale], // Animación de escala
          }}
          transition={{
            x: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            },
            y: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            },
            scale: {
              duration: card.scaleDuration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          <img 
            src={card.image} 
            alt="Carta" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};