import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import './ModalWithdrawn.scss';
import valletPng from '@/assets/vallet.png';

import dropDown from '@/assets/dropDownDefault.svg';
import { Pool } from '@/api/Pools';
import { VenomConnectContext } from '../context/VenomConnect';
import { Address } from 'everscale-inpage-provider';
import { useRoomContext } from '../context/RoomProvider';
import ContractABI from '../../abi/PoolOfChance.abi.json';
import BigNumber from 'bignumber.js';
interface ModalWithdrawnProps {
  selectedRooms: Pool[];
  windowWidth: number;
  onWithdraw: () => void;
  onClose: () => void;
}
const ModalWithdrawn: React.FC<ModalWithdrawnProps> = ({
  onClose,
  onWithdraw,
  selectedRooms,
  windowWidth,
}) => {
  const [loading, setLoading] = useState(false);
  const { userBalance, venomProvider, userAddress } =
    useContext(VenomConnectContext);
  const { getRoomByAddress } = useRoomContext();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isInsidePage, setIsInsidePage] = useState(false);
  useEffect(() => {
    if (componentRef.current) {
      const isIn = componentRef.current.closest('.roomPage') !== null;
      setIsInsidePage(isIn);
    }
  }, []);
  const [isRoomListVisible, setIsRoomListVisible] = useState(
    selectedRooms.length <= 5 || windowWidth > 1550,
  );
  const [isWalletInfoVisible, setIsWalletInfoVisible] = useState(false);

  const withdrawnBalance = useMemo(() => {
    return selectedRooms.reduce(
      (prev, curr) =>
        prev +
        Number(getRoomByAddress(curr.poolAddress)?.depositInfo?.deposit || 0),
      0,
    );
  }, []);

  const participationFee = useMemo(() => {
    return selectedRooms.reduce(
      (prev, curr) => prev + Number(curr.withdrawFee),
      0,
    );
  }, []);

  const handleWithdraw = async () => {
    if (venomProvider && selectedRooms.length > 0) {
      setLoading(true);
      const contractAddress = new Address(selectedRooms[0].poolAddress);
      const contract = new venomProvider.Contract(ContractABI, contractAddress);

      const result = await contract.methods.withdraw({} as never).send({
        from: new Address(userAddress || ''),
        amount: new BigNumber(2).multipliedBy(10 ** 9).toString(),
        bounce: false,
      });
      console.log('RESULT', result);
      onWithdraw();
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
      <div className="modalMain">
        <div className="withdrawnInfo">
          <div className="withdrawnInfoMain">
            <div className="item1">
              {windowWidth > 1550 && (
                <div className="walletBalance">
                  <div className="balanceType">
                    <div style={{ color: '#FFF' }}>Wallet</div> Balance
                  </div>
                  <div className="balance">
                    <h5>{userBalance / 10 ** 9}</h5>
                    <img src={valletPng} alt="" />
                  </div>
                  {/* <h6>≈ $ 500</h6> */}
                </div>
              )}
              <div className="withdrawnBalance">
                <div className="balanceType">
                  <div style={{ color: '#E0FF25' }}>Withdrawn</div> Balance
                </div>
                <div className="balance">
                  <h5>{Number(withdrawnBalance) / 10 ** 9}</h5>
                  <img src={valletPng} alt="" />
                </div>
                {/* <h6>≈ $ 2500</h6> */}
              </div>
            </div>
            {windowWidth > 1555 ? (
              <div className="item2">
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
                <div className="payment">
                  <h5>Participation payment</h5>{' '}
                  <div className="h4WithSvg">
                    <h4>{participationFee}</h4>
                    <img src={valletPng} alt="" />
                  </div>
                </div>

                <div className="total">
                  <h5>You will recieve</h5>
                  <div className="h4WithSvg">
                    <h4>{`${withdrawnBalance / 10 ** 9} - ${participationFee} = ${withdrawnBalance / 10 ** 9 - participationFee}`}</h4>
                    <img src={valletPng} alt="" />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="walletInfoMain"
                style={{ height: isWalletInfoVisible ? '255px' : '40px' }}
                onClick={() => {
                  setIsWalletInfoVisible(!isWalletInfoVisible);
                }}
              >
                <div className="walletInfoButton">
                  <h3>Wallet Information</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`arrow-icon ${isWalletInfoVisible ? 'flipped' : ''}`}
                  >
                    <path
                      d="M12.0003 17C11.7443 17 11.4883 16.9021 11.2933 16.7071L4.29325 9.70707C3.90225 9.31607 3.90225 8.68401 4.29325 8.29301C4.68425 7.90201 5.31631 7.90201 5.70731 8.29301L12.0003 14.586L18.2933 8.29301C18.6842 7.90201 19.3163 7.90201 19.7073 8.29301C20.0983 8.68401 20.0983 9.31607 19.7073 9.70707L12.7073 16.7071C12.5123 16.9021 12.2563 17 12.0003 17Z"
                      fill="#EEEDE9"
                    />
                  </svg>
                </div>

                <div
                  className="itemWallet"
                  style={{
                    opacity: isWalletInfoVisible ? '1' : '0',
                    maxHeight: isWalletInfoVisible ? 'none' : '0',
                  }}
                >
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
                  <div className="payment">
                    <h5>Participation payment</h5>{' '}
                    <div className="h4WithSvg">
                      <h4>{participationFee}</h4>
                      <img src={valletPng} alt="" />
                    </div>
                  </div>
                </div>
                <div
                  className="walletBalance"
                  style={{
                    opacity: isWalletInfoVisible ? '1' : '0',
                    maxHeight: isWalletInfoVisible ? 'none' : '0',
                    display: isWalletInfoVisible ? 'unset' : 'none',
                  }}
                >
                  <div className="balanceType">
                    <div style={{ color: '#FFF' }}>Wallet</div> Balance
                  </div>
                  <div className="balance">
                    <h5>{userBalance / 10 ** 9}</h5>
                    <img src={valletPng} alt="" />
                  </div>
                  <h6>≈ $ 500</h6>
                </div>
              </div>
            )}
            <div className="item3">
              <div className="finallWithdrawnBalance">
                <h4>Final withdrawn balance</h4>
                <div className="balance">
                  <h5>{withdrawnBalance / 10 ** 9 - participationFee}</h5>
                  <img src={valletPng} alt="" />
                </div>
                {windowWidth <= 1555 && (
                  <div className="total">
                    <div className="h4WithSvg">
                      <h4>{`${withdrawnBalance / 10 ** 9} - ${participationFee} = ${withdrawnBalance / 10 ** 9 - participationFee}`}</h4>
                    </div>
                  </div>
                )}
                {/* <h6>≈ $ 500</h6> */}
              </div>
              <div className="withdrawnButton" onClick={() => handleWithdraw()}>
                <h1>Withdrawn</h1>
              </div>
              {windowWidth < 1555 && (
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
          {windowWidth > 1555 && (
            <div
              className="withdrawnInfoCancelButton"
              style={{ cursor: 'pointer' }}
              onClick={onClose}
            >
              <h2>Cancel</h2>
            </div>
          )}
        </div>
        {selectedRooms.length > 5 && windowWidth < 1550 && (
          <div
            className="roomListState"
            onClick={() => setIsRoomListVisible(!isRoomListVisible)}
          >
            {isRoomListVisible ? (
              <h6>Hide list of rooms</h6>
            ) : (
              <h6>Show list of rooms</h6>
            )}

            <img
              src={dropDown}
              alt="dropDown"
              style={{
                transform: isRoomListVisible
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </div>
        )}
        {/* {isRoomListVisible && (
          <div className="roomListСontainer">
            <div className="roomList">
              {selectedRooms.map((room, index) => (
                <div
                  key={room.poolAddress}
                  className="roomItem"
                  style={{
                    marginRight:
                      windowWidth > 1550
                        ? selectedRooms.length >= 9
                          ? '16px'
                          : '0px'
                        : selectedRooms.length > 5
                          ? '13px'
                          : '0px',
                  }}
                >
                  {rooms[room.poolAddress].hasReward && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M16.9854 24.0736C16.9867 24.0482 17 24.0256 17 24.0002V20.0002C17 19.9736 17 19.9603 16.9867 19.9336C16.6667 19.9736 16.3333 20.0002 16 20.0002C15.6667 20.0002 15.3333 19.9736 15.0133 19.9336C15 19.9603 15 19.9736 15 20.0002V24.0002C15 24.0269 15.0133 24.0482 15.0146 24.0736C13.0066 24.3789 12 25.6856 12 28.0002H20C20 25.6869 18.9934 24.3802 16.9854 24.0736Z"
                        fill="#8CFDEC"
                      />
                      <path
                        opacity="0.4"
                        d="M16 20C20.4187 20 24 16.4187 24 12V6C24 4.896 23.104 4 22 4H10C8.896 4 8 4.896 8 6V12C8 16.4187 11.5813 20 16 20Z"
                        fill="#8CFDEC"
                      />
                      <path
                        d="M28.9998 7.99984V10.1999C28.9998 13.9732 25.7999 15.6665 23.5332 15.6665H23.1064C23.4398 15.0398 23.6798 14.3598 23.8265 13.6398C25.0265 13.5198 26.9998 12.5999 26.9998 10.1999V7.99984C26.9998 7.81317 26.8532 7.6665 26.6665 7.6665H23.9998V5.99984C23.9998 5.87984 23.9865 5.77317 23.9731 5.6665H26.6665C27.9465 5.6665 28.9998 6.71984 28.9998 7.99984Z"
                        fill="#8CFDEC"
                      />
                      <path
                        d="M8.89339 15.6665H8.46663C6.19997 15.6665 3 13.9732 3 10.1999V7.99984C3 6.71984 4.05333 5.6665 5.33333 5.6665H8.04004C8.01337 5.77317 8 5.87984 8 5.99984V7.6665H5.33333C5.14667 7.6665 5 7.81317 5 7.99984V10.1999C5 12.5999 6.97334 13.5198 8.17334 13.6398C8.32001 14.3598 8.56006 15.0398 8.89339 15.6665Z"
                        fill="#8CFDEC"
                      />
                      <path
                        d="M16.4279 7.81983L17.2905 9.56121C17.3558 9.69187 17.4811 9.78255 17.6251 9.80388L19.6172 10.0918C19.9825 10.1451 20.1278 10.5932 19.8638 10.8492L18.4238 12.2465C18.3185 12.3492 18.2705 12.4958 18.2959 12.6398L18.6251 14.5532C18.6918 14.9412 18.2839 15.2372 17.9346 15.0545L16.2065 14.1505C16.0772 14.0825 15.9224 14.0825 15.7931 14.1505L14.0666 15.0545C13.7172 15.2372 13.3078 14.9412 13.3745 14.5532L13.7038 12.6425C13.7291 12.4985 13.6812 12.3505 13.5758 12.2492L12.1359 10.8518C11.8719 10.5945 12.0171 10.1465 12.3825 10.0945L14.3745 9.80649C14.5198 9.78515 14.6451 9.69448 14.7091 9.56381L15.5718 7.82252C15.7478 7.46652 16.2519 7.4665 16.4279 7.81983Z"
                        fill="#8CFDEC"
                      />
                    </svg>
                  )}
                  {!room.hasReward && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M26.6663 27H24.6663V6C24.6663 4.89333 23.773 4 22.6663 4H9.33301C8.22634 4 7.33301 4.89333 7.33301 6V27H5.33301C4.78101 27 4.33301 27.448 4.33301 28C4.33301 28.552 4.78101 29 5.33301 29H26.6663C27.2183 29 27.6663 28.552 27.6663 28C27.6663 27.448 27.2183 27 26.6663 27ZM20.013 14.6667H20.0264C20.7597 14.6667 21.3597 15.2667 21.3597 16C21.3597 16.7333 20.7597 17.3333 20.0264 17.3333C19.293 17.3333 18.693 16.7333 18.693 16C18.693 15.2667 19.2797 14.6667 20.013 14.6667Z"
                        fill="#E0FF25"
                      />
                    </svg>
                  )}
                  <h2>{index}</h2>
                  <h3>3D : 5H : 26MIN : 58SEC</h3>
                  {room.hasReward && <div className="winning">Winning</div>}
                  {!room.hasReward && <div className="lose">Lose</div>}
                  <div className="totalDep">
                    <h4>Total Deposit:</h4>
                    <div className="deposit">
                      <div>2500</div> <img src={miniValletPng} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ModalWithdrawn;
