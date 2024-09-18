import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import MoreRoomsButton from '@/components/buttons/moreRoomsButton/MoreRoomsButton';
import Room from 'componentsPath/room/Room';
import ProgressBar from './components/ProgressBar';
import RoomFilters from './components/RoomFilters';
import { Pool, PoolsResponse } from '@/api/Pools';
import { VenomConnectContext } from '../context/VenomConnect';
import ModalWithdrawn from '../modalWithdrawn/ModalWithdrawn';
import MakeDepositModal from '../makeDepositModal/makeDepositModal';

import './RoomSection.scss';
import { useParams } from 'react-router-dom';
interface RoomSectionProps {
  withMoreRoomsButton: boolean;
  isInRoomIdPage: boolean;
}

export interface FilterValues {
  state: string;
  status: string;
  nominal: { title: string; value: number[] } | null;
  date: string;
  favorites: boolean;
  all: boolean;
}
export const defaultFilterValues: FilterValues = {
  state: '',
  status: '',
  nominal: null,
  date: '',
  favorites: false,
  all: false,
};

const RoomSection: React.FC<RoomSectionProps> = ({
  withMoreRoomsButton,
  isInRoomIdPage,
}) => {
  const [, setFavoriteRooms] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollProgressCount, setScrollProgressCount] = useState<number>(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { userAddress } = useContext(VenomConnectContext);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [modalProps, setModalProps] = useState<{
    minimum: number;
    address: string;
  }>({ minimum: 5, address: '...' });
  const [isModalMakeOpen, setIsModalMakeOpen] = useState(false);
  const roomScrollRef = useRef<HTMLDivElement>(null);
  const { roomId } = useParams();

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [filters, setFilters] = useState<FilterValues>(defaultFilterValues);
  const [pools, setPools] = useState<Pool[]>([]);
  const [total, setTotal] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<Pool[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    localStorage.removeItem('checkedRooms');
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (roomScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = roomScrollRef.current;
      if (scrollTop == 0) {
        setScrollProgress(0);
        if (scrollHeight == clientHeight) {
          setScrollProgressCount(pools.length);
        } else {
          setScrollProgressCount(Math.round(clientHeight / 112));
        }
      }
    }
    const handleScroll = () => {
      if (roomScrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = roomScrollRef.current;

        const scrollPercentage =
          (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(scrollPercentage);
        setScrollProgressCount(
          Math.round(scrollTop / 112 + clientHeight / 112),
        );
      }
    };

    const scrollContainer = roomScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pools, roomScrollRef.current?.scrollTop]);

  useEffect(() => {
    if (selectAll == true) {
      setShowCheckboxes(true);
    }
  }, [selectAll]);

  useEffect(() => {
    fetchRooms();
  }, [userAddress]);

  const handleRemoveFromFavorites = (roomAddress: string) => {
    const storedFavoriteRooms = localStorage.getItem('favoriteRooms');
    const favoriteRooms = storedFavoriteRooms
      ? JSON.parse(storedFavoriteRooms)
      : [];

    const updatedFavorites = favoriteRooms.filter(
      (address: string) => address !== roomAddress,
    );
    localStorage.setItem('favoriteRooms', JSON.stringify(updatedFavorites));
    setFavoriteRooms(updatedFavorites);
  };

  const fetchRooms = async () => {
    const response = await fetch(
      'https://lottery-api.venom.rs/v1/pools/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayTotalCount: true,
          limit: !withMoreRoomsButton ? 50 : windowWidth < 1120 ? 4 : 7,
          offset: 0,
          poolStatus:
            filters.state === 'open' || filters.status === 'openStatus'
              ? 'InProcess'
              : filters.state === 'close' || filters.status === 'closed'
                ? 'Cancelled'
                : undefined,
          userAddress:
            filters.state === 'win' || filters.state === 'lose'
              ? userAddress
              : undefined,
          prizeAmountGe: filters.nominal
            ? String(filters.nominal.value[0])
            : undefined,
          prizeAmountLe: filters.nominal
            ? String(filters.nominal.value[1])
            : undefined,
        }),
      },
    );

    const json: PoolsResponse = await response.json();
    console.log('json', json);
    const filtered =
      filters.state === 'win'
        ? [...json.pools].filter(
            (pool) => !!pool.reward && pool.status == 'Finished',
          )
        : filters.state === 'lose'
          ? [...json.pools].filter(
              (pool) =>
                pool.status === ('Cancelled' || pool.status === 'Finished') &&
                !pool.reward,
            )
          : json.pools;
    setPools(filtered);
    setTotal(json.totalCount);
  };

  const handleFilterChange = useCallback(
    (value: FilterValues) => {
      setFilters(value);
    },
    [pools],
  );

  useEffect(() => {
    console.log('filters', filters);
    fetchRooms();
  }, [filters]);

  // const setArrChecked = () => {
  //   const storedCheckedRooms = localStorage.getItem('checkedRooms');
  //   const checkedRooms = storedCheckedRooms
  //     ? JSON.parse(storedCheckedRooms)
  //     : [];

  //   const newCheckedRooms = checkedRooms.filter((room: checkedRoom) => {
  //     return room.hasDeposit == true;
  //   });
  //   if (newCheckedRooms) {
  //     setArrCheckedRooms([...newCheckedRooms]);
  //   }
  // };

  return (
    <div
      className="roomSectionMainBox"
      style={{
        marginBottom: withMoreRoomsButton ? '210px' : '0',
      }}
    >
      <div
        className={`filterOverlay ${overlayVisible ? 'visible' : ''}`}
        style={{
          height: !withMoreRoomsButton
            ? windowWidth < 1120
              ? 'none'
              : '100vh'
            : '50000px',
        }}
        onClick={() => {
          setOverlayVisible(false);
        }}
      ></div>
      {withdrawOpen && (
        <ModalWithdrawn
          onClose={() => setWithdrawOpen(false)}
          selectedRooms={selectedRooms}
          windowWidth={windowWidth}
          onWithdraw={() => setWithdrawOpen(false)}
        />
      )}
      {isModalMakeOpen && (
        <MakeDepositModal
          minimum={modalProps.minimum}
          poolAddress={modalProps.address}
          onClose={() => setIsModalMakeOpen(false)}
          onDeposit={() => setIsModalMakeOpen(false)}
          windowWidth={windowWidth}
        />
      )}
      {!isInRoomIdPage && (
        <div
          className="roomSectionHeader"
          style={{
            paddingTop: withMoreRoomsButton
              ? '86px'
              : windowWidth < 1120
                ? '120px'
                : '100px',
          }}
        >
          <div className="roomSectionHeaderTittle">
            {(!withMoreRoomsButton || windowWidth < 1120) && (
              <div className="roomCount">
                <h3>
                  {windowWidth < 1120
                    ? pools.length
                    : scrollProgressCount > pools.length
                      ? pools.length
                      : scrollProgressCount}{' '}
                  / {total}
                </h3>
              </div>
            )}
            <h1
              className={
                windowWidth > 1440 && withMoreRoomsButton ? 'allRooms' : 'rooms'
              }
            >
              {windowWidth > 1440 && withMoreRoomsButton
                ? 'All Rooms'
                : 'Rooms'}
            </h1>
          </div>
          <RoomFilters
            value={filters}
            windowWidth={windowWidth}
            onChange={handleFilterChange}
            setOverlayVisible={setOverlayVisible}
            overlayVisible={overlayVisible}
            onCollectAll={() => null}
            subfiltersActive={[]}
            checkBox={showCheckboxes}
            onReset={() => setFilters(defaultFilterValues)}
            collectAllDisabled={true}
            onSelectAll={() => null}
          />
        </div>
      )}
      {withMoreRoomsButton && (
        <ProgressBar progress={windowWidth > 1120 ? scrollProgress : 30} />
      )}
      <div className="roomContainer">
        <div
          ref={roomScrollRef}
          className="roomScroll"
          style={{
            overflow: withMoreRoomsButton ? 'hidden' : 'auto',
            height: withMoreRoomsButton ? 'fit-content' : 'unset',
            maxHeight:
              withMoreRoomsButton == true
                ? 'none'
                : windowWidth > 1120
                  ? '74.9vh'
                  : 'none',
          }}
        >
          {!withMoreRoomsButton &&
            windowWidth > 1120 &&
            pools.length > 6 &&
            !isInRoomIdPage && <div className="gradient top"></div>}
          {pools.map((pool, index) => {
            if (isInRoomIdPage) {
              if (index + 1 == Number(roomId)) {
                return (
                  <div key={pool.poolAddress}>
                    <Room
                      address={pool.poolAddress}
                      state={pool.status == 'InProcess' ? 'pending' : 'default'}
                      number={index + 1}
                      nominal={
                        'red'
                        // index == 0 ? 'yellow' : index == 1 ? 'blue' :
                      }
                      count={pool.countOfParticipants}
                      rewardTimestamp={Number(pool.rewardTimestamp)}
                      depositsAmountForReward={pool.depositsAmountForReward}
                      minDepositValue={Number(pool.minDepositValueForReward)}
                      jackpot={Number(pool.jackpot)}
                      checkBox={showCheckboxes}
                      check={selectAll}
                      selectAll={setSelectAll}
                      onRemoveFromFavorites={() =>
                        handleRemoveFromFavorites(pool.poolAddress)
                      }
                      rewardPeriod={Number(pool.rewardPeriod)}
                      setIsModalMakeOpen={setIsModalMakeOpen}
                      setModalProps={setModalProps}
                      onWithdraw={() => {
                        setWithdrawOpen(true);
                        setSelectedRooms([pool]);
                      }}
                      poolStatus={pool.status}
                    />
                  </div>
                );
              }
              return null;
            } else {
              return (
                <div key={pool.poolAddress}>
                  <Room
                    address={pool.poolAddress}
                    state={pool.status == 'InProcess' ? 'pending' : 'default'}
                    number={index + 1}
                    nominal={
                      'red'
                      // index == 0 ? 'yellow' : index == 1 ? 'blue' :
                    }
                    count={pool.countOfParticipants}
                    rewardTimestamp={Number(pool.rewardTimestamp)}
                    depositsAmountForReward={pool.depositsAmountForReward}
                    minDepositValue={Number(pool.minDepositValueForReward)}
                    jackpot={Number(pool.jackpot)}
                    checkBox={showCheckboxes}
                    check={selectAll}
                    selectAll={setSelectAll}
                    onRemoveFromFavorites={() =>
                      handleRemoveFromFavorites(pool.poolAddress)
                    }
                    rewardPeriod={Number(pool.rewardPeriod)}
                    setIsModalMakeOpen={setIsModalMakeOpen}
                    setModalProps={setModalProps}
                    onWithdraw={() => {
                      setWithdrawOpen(true);
                      setSelectedRooms([pool]);
                    }}
                    poolStatus={pool.status}
                  />
                </div>
              );
            }
          })}

          {/* {!withMoreRoomsButton && windowWidth > 1120 && pools.length > 6 && (
            // <div className="gradient bottom"></div>
          )} */}
        </div>

        {withMoreRoomsButton && <MoreRoomsButton />}
      </div>
    </div>
  );
};
export default RoomSection;
