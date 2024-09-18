import { useContext, useEffect, useRef, useState } from 'react';
import { Address } from 'everscale-inpage-provider';
import BigNumber from 'bignumber.js';
import ContractABI from '../../abi/PoolOfChance.abi.json';
import { VenomConnectContext } from '../context/VenomConnect';
import valletPng from '@/assets/vallet.png';
import './makeDepositModal.scss';

type Props = {
  poolAddress: string;
  minimum: number;
  windowWidth: number;
  onClose: () => void;
  onDeposit: () => void;
};

const MakeDepositModal = ({
  poolAddress,
  minimum,
  windowWidth,
  onDeposit,
  onClose,
}: Props) => {
  const { userBalance, venomProvider, userAddress } =
    useContext(VenomConnectContext);
  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoadind] = useState(false);
  const [isInsidePage, setIsInsidePage] = useState(false);

  useEffect(() => {
    if (componentRef.current) {
      const isIn = componentRef.current.closest('.roomPage') !== null;
      setIsInsidePage(isIn);
    }
  }, []);

  const handleDeposit = async () => {
    setLoadind(true);
    const deposit = new BigNumber(minimum).multipliedBy(10 ** 9).toString();
    const amount = new BigNumber(deposit)
      .plus(new BigNumber(2).multipliedBy(10 ** 9))
      .toString();
    try {
      const contractAddress = new Address(poolAddress);
      const contract = new venomProvider!.Contract(
        ContractABI,
        contractAddress,
      );
      const result = await contract.methods
        .deposit({ _amount: deposit, _nonce: 0 } as never)
        .send({
          from: new Address(userAddress || ''),
          amount,
          bounce: true,
        });
      console.log('RESULT', result);
      onDeposit();
    } catch (e: any) {
      setLoadind(false);
      onClose();
    }
  };

  return (
    <div
      className="modal"
      ref={componentRef}
      style={{
        height: isInsidePage ? '100vh' : '5000px',
      }}
    >
      <div className="modalMainMake">
        <div className="withdrawnInfo">
          <div className="withdrawnInfoMain">
            <div className="item1">
              <div className="walletBalance">
                <div className="balanceType">
                  <div style={{ color: '#FFF' }}>Wallet</div> Balance
                </div>
                <div className="balance">
                  <h5>{userBalance / 10 ** 9}</h5>
                  <img src={valletPng} alt="" />
                </div>
                <h6>≈ $ 5000</h6>
              </div>
              <div className="walletBalance">
                <div className="balanceType">
                  <div style={{ color: '#E0FF25' }}>Minimum Room</div> Balance
                </div>
                <div className="balance">
                  <h5>6000</h5>
                  <img src={valletPng} alt="" />
                </div>
                <h6>≈$ 500</h6>
              </div>
            </div>
            {/* <div className="item2">
              <div className="walletAddress">
                <h5>Wallet Connected</h5>
                <div className="h4WithSvg">
                  {windowWidth > 1555 && userAddress ? (
                    <h4>{`${userAddress.slice(0, 6)}...${userAddress.slice(userAddress.length - 5, userAddress.length)}`}</h4>
                  ) : (
                    <h4>{`${userAddress?.slice(0, 3)}...${userAddress?.slice(userAddress.length - 3, userAddress.length)}`}</h4>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18.3327 3.33325V7.49992C18.3327 7.95992 17.9602 8.33325 17.4993 8.33325H13.3327C12.8718 8.33325 12.4993 7.95992 12.4993 7.49992C12.4993 7.03992 12.8718 6.66658 13.3327 6.66658H15.7576C14.5851 4.63742 12.4052 3.33325 9.99935 3.33325C6.59185 3.33325 3.74514 5.87984 3.37764 9.25651C3.33098 9.68318 2.97021 9.99992 2.55021 9.99992C2.52021 9.99992 2.4901 9.99817 2.45927 9.99483C2.00177 9.94483 1.67178 9.53418 1.72095 9.07585C2.18178 4.85168 5.74016 1.66577 10.0002 1.66577C12.6693 1.66577 15.1227 2.94499 16.6668 5.00582V3.33325C16.6668 2.87325 17.0393 2.49992 17.5002 2.49992C17.961 2.49992 18.3327 2.87325 18.3327 3.33325ZM17.5402 10.005C17.0727 9.95584 16.6711 10.2858 16.6211 10.7433C16.2536 14.1208 13.4068 16.6666 9.99935 16.6666C7.59352 16.6666 5.41359 15.3624 4.24109 13.3333H6.66602C7.12685 13.3333 7.49935 12.9599 7.49935 12.4999C7.49935 12.0399 7.12685 11.6666 6.66602 11.6666H2.49935C2.03852 11.6666 1.66602 12.0399 1.66602 12.4999V16.6666C1.66602 17.1266 2.03852 17.4999 2.49935 17.4999C2.96018 17.4999 3.33268 17.1266 3.33268 16.6666V14.9932C4.87685 17.054 7.33018 18.3333 9.99935 18.3333C14.2585 18.3333 17.8177 15.1473 18.2786 10.9232C18.3277 10.4657 17.9977 10.055 17.5402 10.005Z"
                      fill="#EEEDE9"
                    />
                  </svg>
                </div>
              </div>
            </div> */}
            <div className="item3">
              {/* <div className="finallWithdrawnBalance">
                <input type="number" value={minimum} disabled />
              </div> */}
              <div className="withdrawnButton" onClick={handleDeposit}>
                <h1>Deposit</h1>
              </div>
              {windowWidth <= 1000 && (
                <div
                  className="mobileWithdrawnInfoCancelButton"
                  style={{ cursor: 'pointer' }}
                  onClick={onClose}
                >
                  <h2>Cancel</h2>
                </div>
              )}
            </div>
          </div>
          {windowWidth > 1000 && (
            <div
              className="withdrawnInfoCancelButton"
              style={{ cursor: 'pointer' }}
              onClick={onClose}
            >
              <h2>Cancel</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeDepositModal;
