import { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ToBlockchainDefolt from 'componentsPath/toBlockchain/toBlockchainDefolt/ToBlockchainDefolt';
import ToBlockchainLose from '../toBlockchain/toBlockchainLose/ToBlockchainLose';
import ToBlockchainWin from '../toBlockchain/toBlockchainWin/ToBlockchainWin';
import RoomLotteryInfo from 'componentsPath/roomLotteryInfo/RoomLotteryInfo';
import ProgressBarParticipants from 'componentsPath/progressBars/progressBarParticipant/ProgressBarParticipant';
import ProgressBarTime from 'componentsPath/progressBars/progressBarTime/ProgressBarTime';
import TakeDepositButton from 'componentsPath/buttons/takeDepositButton/TakeDepositButton';
import MakeDepositButton from 'componentsPath/buttons/makeDepositButton/MakeDepositButton';
import AddFavoriteButton from 'componentsPath/buttons/addFavoriteButton/AddFavoriteButton';
import DropDown from 'componentsPath/buttons/dropDownButton/DropDownButton';
import CollectDepositButton from 'componentsPath/buttons/collectDeposit/CollectDeposit.tsx';
import logoAnimate from '@/assets/logoAnimateIcon/0001.webm';
import Participant from 'componentsPath/participant/Participant';
import ParticipantEnough from 'componentsPath/participantEnough/ParticipantEnough';
import NoActiveButton from '../buttons/noActiveButton/NoActiveButton';
import NoEnoughParticipant from '../noEnoughParticipant/NoEnoughParticipant';
import MakeDepositParticipant from '../buttons/makeDepositParticipant/MakeDepositParticipant';
import { Address } from 'everscale-inpage-provider';
import ContractABI from '../../abi/PoolOfChance.abi.json';
import { VenomConnectContext } from '../context/VenomConnect';
import { Transaction } from '@/api/Transactions';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import yellowLogo from '@/assets/yellowLogo.svg';
import './Room.scss';

import { useRoomContext } from '../context/RoomProvider';
import { useNavigate, useParams } from 'react-router-dom';

export const TooltipCustome = styled(
  ({
    className,

    ...props
  }: TooltipProps & { className?: string; color?: string }) => (
    <Tooltip
      {...props}
      placement="right-start"
      classes={{ popper: className }}
    />
  ),
)(({ color = 'white' }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    position: 'relative',
    textTransform: 'uppercase',
    top: '10px',
    backgroundColor: 'transparent',
    color: color,
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15.6px',
    border: 'none',
  },
  [`& .${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: '0px',
    },
}));
export interface RoomProps {
  address: string;
  state: 'default' | 'pending';
  number: number;
  nominal: string;
  poolStatus: 'InProcess' | 'Finished' | 'Cancelled';
  count: number;
  rewardTimestamp: number;
  depositsAmountForReward: number;
  minDepositValue: number;
  jackpot: number;
  checkBox: boolean;
  check: boolean;
  selectAll: (v: boolean) => void;
  onRemoveFromFavorites: () => void;
  rewardPeriod: number;
  setIsModalMakeOpen: (v: boolean) => void;
  setModalProps: (props: { minimum: number; address: string }) => void;
  onWithdraw: () => void;
}
const Room: React.FC<RoomProps> = ({
  state,
  number,
  nominal,
  count,
  rewardTimestamp,
  depositsAmountForReward,
  minDepositValue,
  address,
  jackpot,
  checkBox,
  check,
  poolStatus,
  selectAll,
  onRemoveFromFavorites,
  rewardPeriod,
  setIsModalMakeOpen,
  setModalProps,
  onWithdraw,
}) => {
  const roomRef = useRef(null);
  const { roomId } = useParams();
  const { addRoom } = useRoomContext();
  const navigate = useNavigate();
  const [isRoomOpen, setIsRoomOpen] = useState(roomId ? true : false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [depositInfo, setDepositInfo] = useState<{
    deposit: string;
    reward: string;
  }>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const { venomProvider, userAddress } = useContext(VenomConnectContext);

  const totalSlots = depositsAmountForReward;

  const expired = useMemo(
    () => poolStatus === 'Cancelled' || poolStatus === 'Finished',
    [poolStatus],
  );

  const currentParticipants = useMemo(
    () => (transactions || []).length,
    [transactions],
  );
  const emptySlots = useMemo(
    () => totalSlots - (transactions || [])?.length,
    [transactions],
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  const getDepositInfo = async () => {
    const contractAddress = new Address(address);
    const contract = new venomProvider!.Contract(ContractABI, contractAddress);
    const result: any = await contract.methods
      .getDepositData({ answerId: 0, user: userAddress } as never)
      .call();
    setDepositInfo(result.value0);
  };
  const hasDeposit = useMemo(
    () => Number(depositInfo?.deposit) > 0,
    [depositInfo],
  );

  const hasReward = useMemo(
    () => Number(depositInfo?.reward) > 0,
    [depositInfo],
  );
  useEffect(() => {
    if (depositInfo) {
      addRoom({ address: address, depositInfo });
    }
  }, [depositInfo]);

  const getTransactionsData = async () => {
    const response = await fetch(
      'https://lottery-api.venom.rs/v1/transactions/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayTotalCount: true,
          limit: 99,
          offset: 0,
          poolAddress: address,
        }),
      },
    );

    const json: any = await response.json();
    console.log('transactions', json);
    setTransactions(json.transactions);
  };

  const getVideoClass = () => {
    switch (nominal) {
      case 'blue':
        return 'videoBlue';
      case 'yellow':
        return 'videoYellow';
      case 'red':
        return 'videoRed';
      default:
        return '';
    }
  };

  const handleDropDownClick = () => {
    setIsRoomOpen(!isRoomOpen);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('safari') && !ua.includes('chrome')) {
      setIsSafari(true);
    }

    const videoElement = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement?.play();
          } else {
            videoElement?.pause();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  useEffect(() => {
    const storedFavoriteRooms = localStorage.getItem('favoriteRooms');
    const favoriteRooms = storedFavoriteRooms
      ? JSON.parse(storedFavoriteRooms)
      : [];
    const isRoomFavorite = favoriteRooms.includes(number);
    setIsFavorite(isRoomFavorite);

    window.addEventListener('resize', handleResize);

    getTransactionsData();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (userAddress && venomProvider) {
      getDepositInfo();
    }
  }, [userAddress, venomProvider]);

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const text = `${baseUrl}/room/${number}`;

  const addFavorite = () => {
    if (isFavorite === true) {
      const storedFavoriteRooms = localStorage.getItem('favoriteRooms');
      const favoriteRooms = storedFavoriteRooms
        ? JSON.parse(storedFavoriteRooms)
        : [];
      const updatedFavoriteRooms = favoriteRooms.filter(
        (room: number) => room !== number,
      );
      localStorage.setItem(
        'favoriteRooms',
        JSON.stringify(updatedFavoriteRooms),
      );
    } else {
      const storedFavoriteRooms = localStorage.getItem('favoriteRooms');
      const favoriteRooms = storedFavoriteRooms
        ? JSON.parse(storedFavoriteRooms)
        : [];
      favoriteRooms.push(number);
      localStorage.setItem('favoriteRooms', JSON.stringify(favoriteRooms));
    }
    setIsFavorite(!isFavorite);
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const backgroundColor =
    nominal === 'blue'
      ? isHovered
        ? 'rgba(140, 253, 236, 0.3)'
        : 'rgba(140, 253, 236, 0.1)'
      : nominal === 'yellow'
        ? isHovered
          ? 'rgba(224, 255, 37, 0.3)'
          : 'rgba(224, 255, 37, 0.1)'
        : isHovered
          ? 'rgba(255, 108, 26, 0.3)'
          : 'rgba(255, 108, 26, 0.1)';
  const backgroundColorLink =
    nominal === 'blue'
      ? isHoveredLink
        ? 'rgba(140, 253, 236, 0.3)'
        : 'rgba(140, 253, 236, 0.1)'
      : nominal === 'yellow'
        ? isHoveredLink
          ? 'rgba(224, 255, 37, 0.3)'
          : 'rgba(224, 255, 37, 0.1)'
        : isHoveredLink
          ? 'rgba(255, 108, 26, 0.3)'
          : 'rgba(255, 108, 26, 0.1)';
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (check == true) {
      setIsChecked(check);
    }
  }, [check]);

  return (
    <div
      className="room"
      ref={roomRef}
      style={{
        height:
          isRoomOpen && windowWidth > 1120
            ? '458px'
            : isRoomOpen && windowWidth <= 1120
              ? 'auto'
              : '100px',
        background: isRoomOpen
          ? 'rgba(40, 40, 40, 0.48)'
          : isChecked
            ? 'rgba(40, 40, 40, 0.40)'
            : 'rgba(40, 40, 40, 0.2)',
      }}
    >
      <div
        className={`roomStatic ${isRoomOpen || windowWidth <= 1120 ? '' : 'default'}`}
      >
        {windowWidth > 1440 || windowWidth <= 1120 ? (
          <>
            <div className="roomInfo">
              {checkBox && windowWidth > 1440 ? (
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                    if (check == true) {
                      selectAll(false);
                    }
                  }}
                />
              ) : (
                <CopyToClipboard text={text}>
                  <TooltipCustome
                    title="COPY LINK"
                    followCursor
                    color={
                      nominal === 'blue'
                        ? '#8CFDEC'
                        : nominal === 'yellow'
                          ? '#E0FF25'
                          : '#FF6C1A'
                    }
                  >
                    <div
                      className="roomLinkBlock"
                      style={{
                        backgroundColor,
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15.565 12.546C15.31 12.546 15.0551 12.449 14.8601 12.255C14.4681 11.866 14.466 11.232 14.856 10.841L16.824 8.86302C17.584 8.11102 18 7.104 18 6.024C18 4.944 17.5829 3.93301 16.8259 3.17601C15.2599 1.60801 12.7079 1.61001 11.1389 3.17601L9.17311 5.15202C8.78411 5.54302 8.15205 5.54602 7.75905 5.15602C7.36705 4.76702 7.3649 4.13302 7.7549 3.74202L9.72291 1.76402C12.0719 -0.584979 15.893 -0.584993 18.24 1.76201C19.375 2.89601 20 4.41 20 6.024C20 7.643 19.3741 9.15401 18.2361 10.28L16.2739 12.253C16.0789 12.448 15.822 12.546 15.565 12.546ZM10.2739 18.24L12.2529 16.272C12.6449 15.882 12.6471 15.249 12.2571 14.858C11.8671 14.467 11.235 14.464 10.843 14.854L8.86305 16.824C7.29405 18.392 4.74404 18.39 3.17604 16.824C1.60904 15.256 1.60909 12.706 3.17409 11.14L5.15309 9.17201C5.54509 8.78201 5.547 8.14901 5.157 7.75801C4.767 7.36701 4.13493 7.36401 3.74293 7.75401L1.76295 9.72401C-0.585047 12.071 -0.585047 15.89 1.76295 18.238C2.93795 19.412 4.47999 19.998 6.02199 19.998C7.56199 19.999 9.10294 19.413 10.2739 18.24ZM7.70704 13.707L13.7329 7.68202C14.1239 7.29102 14.1239 6.65802 13.7329 6.26802C13.3419 5.87802 12.7101 5.87802 12.3191 6.26802L6.29298 12.293C5.90198 12.684 5.90198 13.317 6.29298 13.707C6.48798 13.902 6.74401 14 7.00001 14C7.25601 14 7.51204 13.902 7.70704 13.707Z"
                          fill={
                            nominal === 'blue'
                              ? '#8CFDEC'
                              : nominal === 'yellow'
                                ? '#E0FF25'
                                : '#FF6C1A'
                          }
                        />
                      </svg>
                    </div>
                  </TooltipCustome>
                </CopyToClipboard>
              )}
              <div className="roomInfoNumberBlock">
                {(state == 'pending' || state == 'default') &&
                  hasDeposit == false && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M33.3334 33.75H30.8334V7.5C30.8334 6.11667 29.7167 5 28.3334 5H11.6667C10.2834 5 9.16675 6.11667 9.16675 7.5V33.75H6.66675C5.97675 33.75 5.41675 34.31 5.41675 35C5.41675 35.69 5.97675 36.25 6.66675 36.25H33.3334C34.0234 36.25 34.5834 35.69 34.5834 35C34.5834 34.31 34.0234 33.75 33.3334 33.75ZM25.0168 18.3333H25.0334C25.9501 18.3333 26.7001 19.0833 26.7001 20C26.7001 20.9167 25.9501 21.6667 25.0334 21.6667C24.1168 21.6667 23.3668 20.9167 23.3668 20C23.3668 19.0833 24.1001 18.3333 25.0168 18.3333Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                    </svg>
                  )}
                {(state == 'pending' || state == 'default') &&
                  hasDeposit == true &&
                  !hasReward && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M20.2832 5.06668L10.2832 7.28332C9.14989 7.53332 8.33325 8.54997 8.33325 9.71664V30.2833C8.33325 31.45 9.14989 32.4667 10.2832 32.7167L20.2832 34.9333C21.8499 35.2833 23.3333 34.1 23.3333 32.5V7.5C23.3333 5.9 21.8499 4.71668 20.2832 5.06668ZM17.5333 21.6667C16.6166 21.6667 15.8666 20.9167 15.8666 20C15.8666 19.0833 16.5999 18.3333 17.5166 18.3333H17.5333C18.45 18.3333 19.2 19.0833 19.2 20C19.2 20.9167 18.45 21.6667 17.5333 21.6667ZM26.6666 31.1667V8.83331C26.6666 8.55664 26.8899 8.33333 27.1666 8.33333H29.1666C30.5466 8.33333 31.6666 9.45333 31.6666 10.8333V29.1667C31.6666 30.5467 30.5466 31.6667 29.1666 31.6667H27.1666C26.8899 31.6667 26.6666 31.4433 26.6666 31.1667Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                    </svg>
                  )}
                {state == 'default' &&
                  hasDeposit &&
                  hasReward &&
                  expired == true &&
                  depositsAmountForReward <= count && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M21.2317 31.0917C21.2334 31.06 21.25 31.0317 21.25 31.0001V26.0001C21.25 25.9667 21.25 25.9501 21.2333 25.9167C20.8333 25.9667 20.4167 26.0001 20 26.0001C19.5833 26.0001 19.1667 25.9667 18.7667 25.9167C18.75 25.9501 18.75 25.9667 18.75 26.0001V31.0001C18.75 31.0334 18.7666 31.06 18.7683 31.0917C16.2583 31.4734 15 33.1067 15 36.0001H25C25 33.1084 23.7417 31.475 21.2317 31.0917Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        opacity="0.4"
                        d="M20 26C25.5233 26 30 21.5233 30 16V8.5C30 7.12 28.88 6 27.5 6H12.5C11.12 6 10 7.12 10 8.5V16C10 21.5233 14.4767 26 20 26Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        d="M36.25 10.9999V13.75C36.25 18.4666 32.2501 20.5833 29.4167 20.5833H28.8833C29.3 19.7999 29.6 18.9499 29.7834 18.0499C31.2834 17.8999 33.75 16.75 33.75 13.75V10.9999C33.75 10.7666 33.5667 10.5833 33.3334 10.5833H30V8.49992C30 8.34992 29.9833 8.21659 29.9667 8.08325H33.3334C34.9334 8.08325 36.25 9.39992 36.25 10.9999Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        d="M11.1167 20.5833H10.5833C7.74996 20.5833 3.75 18.4666 3.75 13.75V10.9999C3.75 9.39992 5.06667 8.08325 6.66667 8.08325H10.05C10.0167 8.21659 10 8.34992 10 8.49992V10.5833H6.66667C6.43333 10.5833 6.25 10.7666 6.25 10.9999V13.75C6.25 16.75 8.71667 17.8999 10.2167 18.0499C10.4 18.9499 10.7001 19.7999 11.1167 20.5833Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        d="M20.5351 10.7749L21.6134 12.9516C21.6951 13.115 21.8517 13.2283 22.0317 13.255L24.5217 13.6149C24.9784 13.6815 25.1599 14.2416 24.8299 14.5616L23.03 16.3083C22.8983 16.4366 22.8384 16.6199 22.8701 16.7999L23.2817 19.1916C23.365 19.6766 22.8551 20.0466 22.4184 19.8183L20.2584 18.6882C20.0967 18.6032 19.9033 18.6032 19.7416 18.6882L17.5834 19.8183C17.1468 20.0466 16.635 19.6766 16.7184 19.1916L17.1299 16.8033C17.1616 16.6233 17.1017 16.4383 16.97 16.3116L15.1701 14.5649C14.8401 14.2432 15.0217 13.6832 15.4783 13.6182L17.9684 13.2582C18.15 13.2316 18.3067 13.1182 18.3867 12.9549L19.4649 10.7783C19.6849 10.3333 20.3151 10.3332 20.5351 10.7749Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                    </svg>
                  )}

                <h1>{number}</h1>
              </div>
            </div>
            {!(
              expired == true &&
              count < depositsAmountForReward &&
              !hasReward &&
              windowWidth > 1120
            ) && (
              <ProgressBarParticipants
                participantCount={count}
                nominal={nominal}
                participantMax={depositsAmountForReward}
              />
            )}
          </>
        ) : (
          <div className="roomInfoProgress">
            <div className="roomInfo">
              {checkBox && windowWidth < 1440 ? (
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
              ) : (
                <CopyToClipboard text={text}>
                  <div
                    className="roomLinkBlock"
                    style={{
                      backgroundColor,
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M15.565 12.546C15.31 12.546 15.0551 12.449 14.8601 12.255C14.4681 11.866 14.466 11.232 14.856 10.841L16.824 8.86302C17.584 8.11102 18 7.104 18 6.024C18 4.944 17.5829 3.93301 16.8259 3.17601C15.2599 1.60801 12.7079 1.61001 11.1389 3.17601L9.17311 5.15202C8.78411 5.54302 8.15205 5.54602 7.75905 5.15602C7.36705 4.76702 7.3649 4.13302 7.7549 3.74202L9.72291 1.76402C12.0719 -0.584979 15.893 -0.584993 18.24 1.76201C19.375 2.89601 20 4.41 20 6.024C20 7.643 19.3741 9.15401 18.2361 10.28L16.2739 12.253C16.0789 12.448 15.822 12.546 15.565 12.546ZM10.2739 18.24L12.2529 16.272C12.6449 15.882 12.6471 15.249 12.2571 14.858C11.8671 14.467 11.235 14.464 10.843 14.854L8.86305 16.824C7.29405 18.392 4.74404 18.39 3.17604 16.824C1.60904 15.256 1.60909 12.706 3.17409 11.14L5.15309 9.17201C5.54509 8.78201 5.547 8.14901 5.157 7.75801C4.767 7.36701 4.13493 7.36401 3.74293 7.75401L1.76295 9.72401C-0.585047 12.071 -0.585047 15.89 1.76295 18.238C2.93795 19.412 4.47999 19.998 6.02199 19.998C7.56199 19.999 9.10294 19.413 10.2739 18.24ZM7.70704 13.707L13.7329 7.68202C14.1239 7.29102 14.1239 6.65802 13.7329 6.26802C13.3419 5.87802 12.7101 5.87802 12.3191 6.26802L6.29298 12.293C5.90198 12.684 5.90198 13.317 6.29298 13.707C6.48798 13.902 6.74401 14 7.00001 14C7.25601 14 7.51204 13.902 7.70704 13.707Z"
                        fill={
                          nominal === 'blue'
                            ? '#8CFDEC'
                            : nominal === 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                    </svg>
                  </div>
                </CopyToClipboard>
              )}
              <div className="roomInfoNumberBlock">
                {(state == 'pending' || state == 'default') &&
                  hasDeposit == false && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M33.3334 33.75H30.8334V7.5C30.8334 6.11667 29.7167 5 28.3334 5H11.6667C10.2834 5 9.16675 6.11667 9.16675 7.5V33.75H6.66675C5.97675 33.75 5.41675 34.31 5.41675 35C5.41675 35.69 5.97675 36.25 6.66675 36.25H33.3334C34.0234 36.25 34.5834 35.69 34.5834 35C34.5834 34.31 34.0234 33.75 33.3334 33.75ZM25.0168 18.3333H25.0334C25.9501 18.3333 26.7001 19.0833 26.7001 20C26.7001 20.9167 25.9501 21.6667 25.0334 21.6667C24.1168 21.6667 23.3668 20.9167 23.3668 20C23.3668 19.0833 24.1001 18.3333 25.0168 18.3333Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                    </svg>
                  )}
                {(state == 'pending' || state == 'default') &&
                  hasDeposit == true &&
                  !hasReward && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M20.2832 5.06668L10.2832 7.28332C9.14989 7.53332 8.33325 8.54997 8.33325 9.71664V30.2833C8.33325 31.45 9.14989 32.4667 10.2832 32.7167L20.2832 34.9333C21.8499 35.2833 23.3333 34.1 23.3333 32.5V7.5C23.3333 5.9 21.8499 4.71668 20.2832 5.06668ZM17.5333 21.6667C16.6166 21.6667 15.8666 20.9167 15.8666 20C15.8666 19.0833 16.5999 18.3333 17.5166 18.3333H17.5333C18.45 18.3333 19.2 19.0833 19.2 20C19.2 20.9167 18.45 21.6667 17.5333 21.6667ZM26.6666 31.1667V8.83331C26.6666 8.55664 26.8899 8.33333 27.1666 8.33333H29.1666C30.5466 8.33333 31.6666 9.45333 31.6666 10.8333V29.1667C31.6666 30.5467 30.5466 31.6667 29.1666 31.6667H27.1666C26.8899 31.6667 26.6666 31.4433 26.6666 31.1667Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                    </svg>
                  )}
                {state == 'default' &&
                  hasDeposit &&
                  hasReward &&
                  expired == true &&
                  depositsAmountForReward <= count && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M21.2317 31.0917C21.2334 31.06 21.25 31.0317 21.25 31.0001V26.0001C21.25 25.9667 21.25 25.9501 21.2333 25.9167C20.8333 25.9667 20.4167 26.0001 20 26.0001C19.5833 26.0001 19.1667 25.9667 18.7667 25.9167C18.75 25.9501 18.75 25.9667 18.75 26.0001V31.0001C18.75 31.0334 18.7666 31.06 18.7683 31.0917C16.2583 31.4734 15 33.1067 15 36.0001H25C25 33.1084 23.7417 31.475 21.2317 31.0917Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        opacity="0.4"
                        d="M20 26C25.5233 26 30 21.5233 30 16V8.5C30 7.12 28.88 6 27.5 6H12.5C11.12 6 10 7.12 10 8.5V16C10 21.5233 14.4767 26 20 26Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        d="M36.25 10.9999V13.75C36.25 18.4666 32.2501 20.5833 29.4167 20.5833H28.8833C29.3 19.7999 29.6 18.9499 29.7834 18.0499C31.2834 17.8999 33.75 16.75 33.75 13.75V10.9999C33.75 10.7666 33.5667 10.5833 33.3334 10.5833H30V8.49992C30 8.34992 29.9833 8.21659 29.9667 8.08325H33.3334C34.9334 8.08325 36.25 9.39992 36.25 10.9999Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        d="M11.1167 20.5833H10.5833C7.74996 20.5833 3.75 18.4666 3.75 13.75V10.9999C3.75 9.39992 5.06667 8.08325 6.66667 8.08325H10.05C10.0167 8.21659 10 8.34992 10 8.49992V10.5833H6.66667C6.43333 10.5833 6.25 10.7666 6.25 10.9999V13.75C6.25 16.75 8.71667 17.8999 10.2167 18.0499C10.4 18.9499 10.7001 19.7999 11.1167 20.5833Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                      <path
                        d="M20.5351 10.7749L21.6134 12.9516C21.6951 13.115 21.8517 13.2283 22.0317 13.255L24.5217 13.6149C24.9784 13.6815 25.1599 14.2416 24.8299 14.5616L23.03 16.3083C22.8983 16.4366 22.8384 16.6199 22.8701 16.7999L23.2817 19.1916C23.365 19.6766 22.8551 20.0466 22.4184 19.8183L20.2584 18.6882C20.0967 18.6032 19.9033 18.6032 19.7416 18.6882L17.5834 19.8183C17.1468 20.0466 16.635 19.6766 16.7184 19.1916L17.1299 16.8033C17.1616 16.6233 17.1017 16.4383 16.97 16.3116L15.1701 14.5649C14.8401 14.2432 15.0217 13.6832 15.4783 13.6182L17.9684 13.2582C18.15 13.2316 18.3067 13.1182 18.3867 12.9549L19.4649 10.7783C19.6849 10.3333 20.3151 10.3332 20.5351 10.7749Z"
                        fill={
                          nominal == 'blue'
                            ? '#8CFDEC'
                            : nominal == 'yellow'
                              ? '#E0FF25'
                              : '#FF6C1A'
                        }
                      />
                    </svg>
                  )}

                <h1>{number}</h1>
              </div>
            </div>
            <ProgressBarParticipants
              participantCount={count}
              nominal={nominal}
              participantMax={depositsAmountForReward}
            />
          </div>
        )}

        <div
          className={
            expired == true && count != depositsAmountForReward && !hasReward
              ? 'roomStateNo'
              : 'roomState'
          }
        >
          {expired == true &&
          count < depositsAmountForReward &&
          !hasReward &&
          windowWidth > 1120 ? (
            <NoEnoughParticipant />
          ) : (
            <RoomLotteryInfo
              rewardTimestamp={rewardTimestamp}
              nominal={nominal}
              minimum={minDepositValue}
              jackpot={jackpot}
            />
          )}

          <ProgressBarTime
            count={count}
            isIn={hasDeposit}
            rewardTimestamp={rewardTimestamp}
            minDepositsAmount={depositsAmountForReward}
            isWin={hasReward}
            rewardPeriod={rewardPeriod}
            nominal={nominal}
          />

          {state == 'default' && hasDeposit && hasReward && expired ? (
            <CollectDepositButton onClick={onWithdraw} />
          ) : expired && hasDeposit ? (
            <TakeDepositButton onClick={onWithdraw} />
          ) : !expired && (hasDeposit || hasReward) ? (
            <NoActiveButton />
          ) : (
            <MakeDepositButton
              isFinished={expired ? true : false}
              onClick={() => {
                // if (!userAddress) {
                //   handleClick();
                // } else {
                setModalProps({ minimum: minDepositValue, address });
                return expired ? null : setIsModalMakeOpen(true);
                // }
              }}
            />
          )}
          {checkBox && windowWidth <= 1120 ? (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          ) : (
            <div className="additionalButtons">
              <AddFavoriteButton
                onRemoveFromFavorites={onRemoveFromFavorites}
                addFavorite={addFavorite}
                isFavorite={isFavorite}
              />

              <DropDown onDropDownClick={handleDropDownClick} />
            </div>
          )}
        </div>
      </div>

      <div
        className="roomOpened"
        style={{
          width: isRoomOpen ? 'auto' : '0',
          height: isRoomOpen ? 'auto' : '0',
          opacity: isRoomOpen ? '1' : '0',
          overflow: isRoomOpen ? 'visible' : 'hidden',
        }}
      >
        <div className="participantContainer">
          <div className="participantList">
            {(transactions || [])?.map((transaction, index) => (
              <div className="participantListRow" key={index}>
                <Participant
                  number={index + 1}
                  amount={Number(transaction.nativeAmount)}
                  timestamp={transaction.timestampBlock}
                  walletAddress={transaction.userAddress}
                  nominal={nominal}
                />
              </div>
            ))}

            {emptySlots > 0 && (
              <>
                {!hasDeposit && (
                  <div className="participantListRow">
                    <MakeDepositParticipant nominal={nominal} />
                  </div>
                )}
                {Array.from({ length: emptySlots - 1 }, (_, index) => (
                  <div
                    className="participantListRow"
                    key={currentParticipants + index}
                  >
                    <ParticipantEnough />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="linkBlock">
          {state == 'default' && hasDeposit && hasReward ? (
            <ToBlockchainWin />
          ) : state == 'default' &&
            hasDeposit &&
            !hasReward &&
            depositsAmountForReward <= count ? (
            <ToBlockchainLose />
          ) : (
            <ToBlockchainDefolt />
          )}
          <div className="roomLink">
            <div className="desription">
              <h2>Copy Room Link</h2>
              <h4>Invite a friend into the room and play together</h4>
            </div>
            <div className="link">
              <CopyToClipboard text={text}>
                <div
                  className="copyLink"
                  style={{
                    background: backgroundColorLink,
                    transition: 'background-color 0.3s ease', // Smooth transition
                  }}
                  onMouseEnter={() => setIsHoveredLink(true)}
                  onMouseLeave={() => setIsHoveredLink(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.565 12.546C15.31 12.546 15.0551 12.449 14.8601 12.255C14.4681 11.866 14.466 11.232 14.856 10.841L16.824 8.86302C17.584 8.11102 18 7.104 18 6.024C18 4.944 17.5829 3.93301 16.8259 3.17601C15.2599 1.60801 12.7079 1.61001 11.1389 3.17601L9.17311 5.15202C8.78411 5.54302 8.15205 5.54602 7.75905 5.15602C7.36705 4.76702 7.3649 4.13302 7.7549 3.74202L9.72291 1.76402C12.0719 -0.584979 15.893 -0.584993 18.24 1.76201C19.375 2.89601 20 4.41 20 6.024C20 7.643 19.3741 9.15401 18.2361 10.28L16.2739 12.253C16.0789 12.448 15.822 12.546 15.565 12.546ZM10.2739 18.24L12.2529 16.272C12.6449 15.882 12.6471 15.249 12.2571 14.858C11.8671 14.467 11.235 14.464 10.843 14.854L8.86305 16.824C7.29405 18.392 4.74404 18.39 3.17604 16.824C1.60904 15.256 1.60909 12.706 3.17409 11.14L5.15309 9.17201C5.54509 8.78201 5.547 8.14901 5.157 7.75801C4.767 7.36701 4.13493 7.36401 3.74293 7.75401L1.76295 9.72401C-0.585047 12.071 -0.585047 15.89 1.76295 18.238C2.93795 19.412 4.47999 19.998 6.02199 19.998C7.56199 19.999 9.10294 19.413 10.2739 18.24ZM7.70704 13.707L13.7329 7.68202C14.1239 7.29102 14.1239 6.65802 13.7329 6.26802C13.3419 5.87802 12.7101 5.87802 12.3191 6.26802L6.29298 12.293C5.90198 12.684 5.90198 13.317 6.29298 13.707C6.48798 13.902 6.74401 14 7.00001 14C7.25601 14 7.51204 13.902 7.70704 13.707Z"
                      fill={
                        nominal == 'blue'
                          ? '#8CFDEC'
                          : nominal == 'yellow'
                            ? '#E0FF25'
                            : '#FF6C1A'
                      }
                    />
                  </svg>
                  <h1
                    style={{
                      color:
                        nominal == 'blue'
                          ? '#8CFDEC'
                          : nominal == 'yellow'
                            ? '#E0FF25'
                            : '#FF6C1A',
                    }}
                  >
                    Copy Link
                  </h1>
                </div>
              </CopyToClipboard>
              <div
                className="linkToRoom"
                onClick={() => {
                  navigate(`/room/${number}`);
                }}
                style={{
                  color:
                    nominal == 'blue'
                      ? '#8CFDEC'
                      : nominal == 'yellow'
                        ? '#E0FF25'
                        : '#FF6C1A',
                  backgroundColor:
                    nominal == 'blue'
                      ? 'rgba(140, 253, 236, 0.10)'
                      : nominal == 'yellow'
                        ? 'rgba(224, 255, 37, 0.10)'
                        : 'rgba(255, 108, 26, 0.10)',
                }}
              >
                {text.replace('http://', '').replace('https://', '')}
              </div>
            </div>
          </div>
        </div>
        <div className="colorLogo">
          {/* <img
            src={
              nominal == 'blue'
                ? blueLogo
                : nominal == 'yellow'
                  ? yellowLogo
                  : redLogo
            }
            alt=""
            style={{
              height: isRoomOpen ? 'auto' : '0',
              overflow: isRoomOpen ? 'visible' : 'hidden',
            }}
          /> */}

          {!isSafari ? (
            <video
              ref={videoRef}
              className={`letter-image ${getVideoClass()}`}
              autoPlay
              loop
              muted
            >
              <source src={logoAnimate} type="video/webm" />
            </video>
          ) : (
            <img src={yellowLogo} alt="Static logo" className="letter-image" />
          )}
          <div
            className="logoBg"
            style={{
              background:
                nominal == 'blue'
                  ? 'radial-gradient(50% 50% at 50% 50%, rgb(140, 253, 224),rgba(140, 253, 236, 0) 100%)'
                  : nominal == 'yellow'
                    ? 'radial-gradient(50% 50% at 50% 50%, rgb(224, 255, 37),rgba(140, 253, 236, 0) 100%)'
                    : 'radial-gradient(50% 50% at 50% 50%, rgb(255, 108, 26),rgba(140, 253, 236, 0) 100%)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Room;
