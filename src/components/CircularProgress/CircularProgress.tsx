import React, { useEffect, useState } from "react";
import "./CircularProgress.css";

interface ICircularProgressProps {
  children: React.ReactNode;
  progress: number;
  className?: string;
}

const CircularProgress: React.FC<ICircularProgressProps> = ({
  children,
  progress,
}) => {
  const [progressState, setProgressState] = useState<number>(progress || 0);

  useEffect(() => {
    setProgressState(progress);
  }, [progress]);
  return (
    <div
      className="circular-progress circular-progress-container"
      style={{
        background:
          "conic-gradient(#d103fc " +
          Number((progressState / 100) * 360) +
          "deg, transparent 0deg)",
      }}
    >
      <div className="circular-progress-contents">{children}</div>
    </div>
  );
};

export default CircularProgress;
