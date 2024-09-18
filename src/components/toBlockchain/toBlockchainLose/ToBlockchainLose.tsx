import React from 'react';
import toBlockchain from '@/assets/toBlockhain.svg';
import miniHand from '@/assets/miniHand.svg';
import hand from '@/assets/hand.svg';
import './ToBlockchainLose.scss';
import { useEffect, useState } from 'react';

const ToBlockchainLose: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="toBlockchainLose">
      <div className="desription">
        <h3>
          Better luck
          <br /> next time!
        </h3>
        <img src={windowWidth > 1440 ? hand : miniHand} alt="hand" />
        <div className="shadow"> </div>
      </div>
      <div className="toBlockChainButton">
        <img src={toBlockchain} alt="toBlockchain"></img>
        <h2>Go to transaction</h2>
      </div>
    </div>
  );
};

export default ToBlockchainLose;
