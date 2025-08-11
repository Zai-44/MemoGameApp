// Scoreboard.tsx
import React from "react";

interface ScoreboardProps {
  attempts: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ attempts }) => {
  return (
    <div className="text-lg font-bold mt-2">
      Intentos fallidos: {attempts}
    </div>
  );
};

export default Scoreboard;