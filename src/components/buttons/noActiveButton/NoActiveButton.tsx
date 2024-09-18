import React from 'react';
import './noActiveButton.scss';

const NoActiveButton: React.FC = () => {
  return (
    <div className="noActiveButton">
      <button>You entered the room</button>
    </div>
  );
};

export default NoActiveButton;
