import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Participant.scss';
import dayjs from 'dayjs';

interface ParticipantProps {
  number: number;
  walletAddress: string;
  timestamp: number;
  amount: number;
  nominal: string;
}

const Participant: React.FC<ParticipantProps> = ({
  number,
  walletAddress,
  timestamp,
  amount,
  nominal,
}) => {
  const [displayedAddress, setDisplayedAddress] = useState(walletAddress);
  const mainBlockRef = useRef<HTMLDivElement | null>(null);
  let participantList: HTMLDivElement | null;
  if (mainBlockRef.current) {
    participantList = mainBlockRef.current.closest('.participantList');
  }
  const updateDisplayedAddress = () => {
    if (participantList) {
      const fullWidth = window.innerWidth;
      let start, end;
      switch (true) {
        case fullWidth >= 1850:
          start = walletAddress.slice(0, 11);
          end = walletAddress.slice(-11);
          break;
        case fullWidth >= 1800:
          start = walletAddress.slice(0, 10);
          end = walletAddress.slice(-10);
          break;
        case fullWidth >= 1780:
          start = walletAddress.slice(0, 9);
          end = walletAddress.slice(-9);
          break;
        case fullWidth >= 1651:
          start = walletAddress.slice(0, 8);
          end = walletAddress.slice(-8);
          break;

        case fullWidth >= 1551:
          start = walletAddress.slice(0, 11);
          end = walletAddress.slice(-11);
          break;
        case fullWidth >= 1440:
          start = walletAddress.slice(0, 8);
          end = walletAddress.slice(-8);
          break;

        case fullWidth >= 1324:
          start = walletAddress.slice(0, 9);
          end = walletAddress.slice(-9);
          break;
        case fullWidth >= 1224:
          start = walletAddress.slice(0, 6);
          end = walletAddress.slice(-6);
          break;

        case fullWidth >= 1100:
          start = walletAddress.slice(0, 11);
          end = walletAddress.slice(-11);
          break;
        case fullWidth >= 1050:
          start = walletAddress.slice(0, 8);
          end = walletAddress.slice(-8);
          break;
        case fullWidth >= 676:
          start = walletAddress.slice(0, 6);
          end = walletAddress.slice(-6);
          break;
        case fullWidth >= 500:
          start = walletAddress.slice(0, 11);
          end = walletAddress.slice(-11);
          break;
        case fullWidth >= 400:
          start = walletAddress.slice(0, 8);
          end = walletAddress.slice(-8);
          break;
        case fullWidth >= 100:
          start = walletAddress.slice(0, 4);
          end = walletAddress.slice(-4);
          break;
        default:
          start = walletAddress.slice(0, 11);
          end = walletAddress.slice(-11);
          break;
      }

      setDisplayedAddress(`${start}...${end}`);
    }
  };

  useEffect(() => {
    const start = walletAddress.slice(0, 11);
    const end = walletAddress.slice(-11);
    setDisplayedAddress(`${start}...${end}`);
    updateDisplayedAddress();
    const participantList = mainBlockRef.current?.closest('.participantList');
    const observer = new ResizeObserver(updateDisplayedAddress);
    if (participantList) {
      observer.observe(participantList);
    }

    return () => {
      if (participantList) {
        observer.unobserve(participantList);
      }
    };
  }, [mainBlockRef.current]);

  return (
    <div className="participantMain">
      <div className="mainBlock" ref={mainBlockRef}>
        {' '}
        {/* Применяем ref к элементу */}
        <div className="participant">
          <div className="timeDate">
            <div>
              <h1>{number}</h1>
              <h3>{dayjs.unix(timestamp).format('HH:mm')}</h3>
            </div>
            <h3>{dayjs.unix(timestamp).format('DD.MM.YYYY')}</h3>
          </div>
          <div className="depositInfo">
            <div className="sumDeposit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M12.6489 5.54994C12.6239 5.45252 12.5212 5.40292 12.4249 5.43209C12.0989 5.52951 11.7477 5.56447 11.3866 5.52772C10.2742 5.41572 9.3251 4.56466 9.09819 3.46975C8.97569 2.87825 9.05677 2.31475 9.27319 1.83525C9.3146 1.74308 9.27844 1.63285 9.1851 1.59435C8.51252 1.31552 7.77285 1.16675 6.99935 1.16675C3.72393 1.16675 1.07618 3.87052 1.16835 7.16635C1.25293 10.2096 3.78985 12.7459 6.83311 12.8311C10.1289 12.9232 12.8327 10.2755 12.8327 7.00008C12.8333 6.499 12.7691 6.01135 12.6489 5.54994ZM8.28502 9.25701C8.04877 9.49326 7.74835 9.6373 7.4246 9.68397V9.91675C7.4246 10.1582 7.2286 10.3542 6.9871 10.3542C6.7456 10.3542 6.5496 10.1582 6.5496 9.91675V9.68283C5.88285 9.57433 5.35377 9.0371 5.27561 8.34527C5.24877 8.10493 5.42143 7.88853 5.66177 7.86169C5.9021 7.83136 6.11794 8.00752 6.14535 8.24785C6.18269 8.58035 6.46269 8.83119 6.79635 8.83119H7.20468C7.37852 8.83119 7.54244 8.76289 7.66669 8.63864C7.79094 8.51439 7.85919 8.35048 7.85919 8.17665C7.85919 7.87623 7.65502 7.61549 7.36277 7.5414L6.42477 7.3087C6.09227 7.22411 5.79594 7.03099 5.58827 6.76325C5.38177 6.50191 5.26627 6.16707 5.26627 5.82466C5.26627 5.06574 5.82335 4.43867 6.5496 4.32025V4.08342C6.5496 3.84191 6.7456 3.64592 6.9871 3.64592C7.2286 3.64592 7.4246 3.84191 7.4246 4.08342V4.31441C8.1036 4.413 8.6461 4.95373 8.72485 5.6549C8.75169 5.89523 8.57902 6.11164 8.33868 6.13847C8.09893 6.16764 7.88194 5.99264 7.8551 5.75231C7.81777 5.41981 7.53777 5.16898 7.20411 5.16898H6.79577C6.43468 5.16898 6.14127 5.46243 6.14127 5.82352C6.14127 5.96993 6.18969 6.11223 6.27719 6.22306C6.36935 6.34206 6.49302 6.42259 6.63768 6.45876L7.57569 6.69147C8.25819 6.86413 8.73419 7.47434 8.73419 8.17551C8.73361 8.58384 8.57435 8.96768 8.28502 9.25701ZM13.1424 3.22593L11.9758 4.3926C11.9355 4.43285 11.8871 4.46492 11.8334 4.48709C11.7798 4.50926 11.7232 4.52092 11.666 4.52092C11.6088 4.52092 11.5523 4.50926 11.4986 4.48709C11.4449 4.46492 11.3965 4.43285 11.3563 4.3926L10.1896 3.22593C10.0187 3.05502 10.0187 2.77791 10.1896 2.60699C10.3605 2.43608 10.6376 2.43608 10.8085 2.60699L11.2285 3.02698V1.16675C11.2285 0.925248 11.4245 0.729248 11.666 0.729248C11.9075 0.729248 12.1035 0.925248 12.1035 1.16675V3.02698L12.5235 2.60699C12.6944 2.43608 12.9715 2.43608 13.1424 2.60699C13.3134 2.77791 13.3134 3.05502 13.1424 3.22593Z"
                  fill={
                    nominal === 'blue'
                      ? '#8CFDEC'
                      : nominal === 'yellow'
                        ? '#E0FF25'
                        : '#FF6C1A'
                  }
                />
              </svg>
              <h4>${amount}</h4>
            </div>
            <div className="vallet">{displayedAddress}</div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="2"
          viewBox="0 0 400 2"
          fill="none"
        >
          <path opacity="0.04" d="M1 1H400" stroke="#EEEDE9" />
        </svg>
      </div>
    </div>
  );
};

Participant.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Participant;
