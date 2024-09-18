import React from 'react';
import toBlockchain from '@/assets/toBlockhain.svg';
import './ToBlockchainDefolt.scss';
const ToBlockchainDefolt: React.FC = () => {
  return (
    <div className="toBlockchain">
      <div className="desription">
        <h3>Blockchain</h3>
        <h4>
          Go to the resource of the original blockchain and familiarize yourself
          with the structure
        </h4>
      </div>
      <div className="toBlockChainButton">
        <img src={toBlockchain} alt="toBlockchain"></img>
        <h2>Go to transaction</h2>
      </div>
    </div>
  );
};

export default ToBlockchainDefolt;
