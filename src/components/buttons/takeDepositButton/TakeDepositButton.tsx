import React from 'react';
import './TakeDepositButton.scss';

const TakeDepositButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="takeDeposit" onClick={onClick}>
      <button>Take Deposit</button>
    </div>
  );
};

export default TakeDepositButton;
