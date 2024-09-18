import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progressBarColored">
      <div className="progressBarColoredContainer">
        <div
          className="progressBarColoredFill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
