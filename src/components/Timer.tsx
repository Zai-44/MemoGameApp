// Timer.tsx
import React from "react";

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-lg font-bold">
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;