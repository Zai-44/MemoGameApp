// src/components/MemoryCard.tsx

import React from "react";
import Image from "next/image";

interface MemoryCardProps {
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  image,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}) => {
  return (
    <div
      className={`w-20 h-20 relative rounded-lg cursor-pointer transition-transform duration-300 transform ${
        disabled ? "cursor-not-allowed opacity-70" : ""
      } ${isFlipped || isMatched ? "rotate-y-180" : ""}`}
      onClick={!disabled ? onClick : undefined}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Cara frontal (imagen) */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden rounded-lg"
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <Image
          src={image}
          alt="Tarjeta"
          width={80}
          height={80}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Cara trasera (contraportada) */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-slate-200"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <Image
          src="/images/contraportada.png"
          alt="Contraportada"
          width={80}
          height={80}
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default MemoryCard;