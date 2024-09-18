/* eslint-disable react/no-unescaped-entities */

import toBlockchain from '@/assets/toBlockhain.svg';
import './ToBlockchainWin.scss';
import kubok from '@/assets/kubok.svg';
import miniKubok from '@/assets/kubokMini.svg';
import { useEffect, useState } from 'react';

const ToBlockchainWin: React.FC = () => {
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
    <div className="toBlockchainWin">
      <div className="desription">
        <h3>
          You're the best
          <br /> in this room!
        </h3>
        <img src={windowWidth > 1440 ? kubok : miniKubok} alt="kubok" />
        <div className="shadow"> </div>
      </div>
      <div className="toBlockChainButton">
        <img src={toBlockchain} alt="toBlockchain"></img>
        <h2>Go to transaction</h2>
      </div>
    </div>
  );
};

export default ToBlockchainWin;
