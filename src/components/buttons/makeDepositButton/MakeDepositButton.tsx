import React from 'react';
import './MakeDepositButton.scss';

interface PropsBut {
  isFinished: boolean;
  onClick?: () => void;
}

const MakeDepositButton: React.FC<PropsBut> = ({ isFinished, onClick }) => {
  return (
    <div className="makeDeposit" onClick={onClick}>
      <button className={isFinished ? 'disabled' : ''}>Make deposit</button>
    </div>
  );
};

export default MakeDepositButton;
