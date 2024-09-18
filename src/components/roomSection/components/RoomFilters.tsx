import React, { useState, useEffect, useMemo } from 'react';

import StateFilter from './StateFilter';
import StatusFilter from './StatusFilter';
import DateFilter from './DateFilter';
import NominalFilter from './NominalFilter';
import MobileFilters from './MobileFilters';
import { TooltipCustome } from '@/components/room/Room';
import { defaultFilterValues, FilterValues } from '../RoomSection';
import {
  SvgClose,
  SvgClosed,
  SvgClosedErr,
  SvgClosedTime,
  SvgLose,
  SvgOpen,
  SvgOpenStatus,
  SvgWallet,
  SvgWin,
} from './Icons';

const svgMap: { [key: string]: JSX.Element } = {
  Open: <SvgOpen />,
  Close: <SvgClose />,
  Win: <SvgWin />,
  Lose: <SvgLose />,
  OpenStatus: <SvgOpenStatus />,
  Closed: <SvgClosed />,
  ClosedErr: <SvgClosedErr />,
  ClosedTime: <SvgClosedTime />,
  '$0-5000': <SvgWallet />,
  '$5000-25000': <SvgWallet />,
  '$25000-50000': <SvgWallet />,
};

interface Props {
  value: FilterValues;
  windowWidth: number;
  overlayVisible: boolean;
  subfiltersActive: string[];
  checkBox: boolean;
  collectAllDisabled: boolean;
  onChange: (value: FilterValues) => void;
  setOverlayVisible: (v: boolean) => void;
  onSelectAll: (v: boolean) => void;
  onCollectAll: () => void;
  onReset: () => void;
}

const RoomFilters: React.FC<Props> = ({
  value,
  windowWidth,
  overlayVisible,
  checkBox,
  subfiltersActive,
  collectAllDisabled,
  onChange,
  onSelectAll,
  setOverlayVisible,
  onCollectAll,
  onReset,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [stateFilterOpen, setStateFilterOpen] = useState(false);
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [nominalFilterOpen, setNominalFilterOpen] = useState(false);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [active, setActive] = useState('');

  const defaultState = useMemo(
    () => Object.keys(value).every((value) => value.length == 0 || !value),
    [value],
  );

  const closeAllFilters = () => {
    setMobileFilterOpen(false);
    setStateFilterOpen(false);
    setStatusFilterOpen(false);
    setNominalFilterOpen(false);
    setDateFilterOpen(false);
  };

  useEffect(() => {
    setOverlayVisible(
      mobileFilterOpen ||
        stateFilterOpen ||
        statusFilterOpen ||
        nominalFilterOpen ||
        dateFilterOpen,
    );
  }, [
    mobileFilterOpen,
    stateFilterOpen,
    statusFilterOpen,
    nominalFilterOpen,
    dateFilterOpen,
  ]);

  useEffect(() => {
    if (overlayVisible == false) {
      closeAllFilters();
    }
  }, [overlayVisible]);

  return (
    <div className="buttonSection">
      <div className="collectTotalDeposit">
        {windowWidth > 1120 && (
          <div className="toolTip">
            <h6>Multiple choice</h6>
            <TooltipCustome
              title={
                <>
                  Select the Winning and Losing <br /> Rooms in the filter and
                  select <br /> multiple selection
                </>
              }
              color="#E0FF25"
              placement="bottom-end"
              followCursor
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                cursor={'pointer'}
              >
                <path
                  d="M10.745 1.66669C6.14004 1.66669 2.40723 5.39752 2.40723 10C2.40723 14.6025 6.14004 18.3334 10.745 18.3334C15.3499 18.3334 19.0827 14.6025 19.0827 10C19.0827 5.39752 15.3499 1.66669 10.745 1.66669ZM10.7617 14.5834C10.3014 14.5834 9.92363 14.21 9.92363 13.75C9.92363 13.29 10.2931 12.9167 10.7533 12.9167H10.7617C11.2228 12.9167 11.5955 13.29 11.5955 13.75C11.5955 14.21 11.2219 14.5834 10.7617 14.5834ZM12.0816 10.4401C11.4721 10.8484 11.3586 11.0759 11.3378 11.1359C11.2502 11.3967 11.0068 11.5617 10.745 11.5617C10.6791 11.5617 10.6124 11.5517 10.5465 11.5292C10.2188 11.4192 10.043 11.065 10.1522 10.7375C10.3031 10.2875 10.6942 9.86336 11.3846 9.40086C12.2359 8.83086 12.1266 8.20592 12.0907 8.00092C11.9965 7.45592 11.5371 6.99159 10.9976 6.89659C10.5874 6.82159 10.1864 6.92909 9.87294 7.19159C9.55778 7.45576 9.37667 7.84495 9.37667 8.25828C9.37667 8.60328 9.09652 8.88328 8.75133 8.88328C8.40615 8.88328 8.126 8.60328 8.126 8.25828C8.126 7.47411 8.4696 6.73665 9.06909 6.23415C9.66274 5.73748 10.444 5.53006 11.2152 5.66673C12.2716 5.85339 13.138 6.72583 13.3222 7.7875C13.5057 8.83916 13.0646 9.78175 12.0816 10.4401Z"
                  fill="#747474"
                />
              </svg>
            </TooltipCustome>
          </div>
        )}
        {windowWidth > 1120 && (
          <TooltipCustome
            title={
              <>
                Multiple withdrawal <br />
                of the deposit
              </>
            }
            color="#E0FF25"
            placement="bottom-end"
            followCursor
          >
            <div
              className={`collectTotalDepositMainBlock ${collectAllDisabled && checkBox ? '' : 'disabled'}`}
              onClick={() => onCollectAll()}
            >
              <div className="content">
                <h3>Collect Total Deposit</h3>
              </div>
            </div>
          </TooltipCustome>
        )}
      </div>
      {windowWidth > 1120 && (
        <TooltipCustome
          title={
            <>
              Select the Winning <br />
              and Losing Rooms
            </>
          }
          color="#E0FF25"
       
          followCursor
        >
          <div
            className="selectAll"
            onClick={() => {
              onSelectAll(true);
            }}
          >
            <div className="content">
              <h3>Select All</h3>
            </div>
          </div>
        </TooltipCustome>
      )}
      {windowWidth < 1120 && (
        <div
          className={`story ${collectAllDisabled && checkBox ? '' : 'disabled'}`}
          onClick={() => null}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M28 19.818V8.45341C28 6.37341 26.96 5.33341 24.88 5.33341H21.8933C21.96 5.74675 22 6.20008 22 6.66675V17.1498C22.1788 17.1359 22.3595 17.1288 22.5419 17.1288C24.7648 17.1288 26.7417 18.1827 28 19.818ZM16.1889 26.6645C16.1267 26.666 16.0637 26.6667 16 26.6667H8C5.33333 26.6667 4 25.3334 4 22.6667V6.66675C4 4.00008 5.33333 2.66675 8 2.66675H16C18.6667 2.66675 20 4.00008 20 6.66675V17.6134C17.4568 18.6246 15.659 21.1082 15.659 24.0116C15.659 24.9519 15.8476 25.848 16.1889 26.6645Z"
              fill="white"
            />
            <path
              d="M22.6641 18.8911C19.7188 18.8911 17.3308 21.2791 17.3308 24.2244C17.3308 27.1698 19.7188 29.5578 22.6641 29.5578C25.6095 29.5578 27.9975 27.1698 27.9975 24.2244C27.9975 21.2791 25.6095 18.8911 22.6641 18.8911ZM24.8028 23.5845L22.5802 25.8071C22.4548 25.9325 22.2855 26.0018 22.1082 26.0018C21.9308 26.0018 21.7615 25.9311 21.6362 25.8071L20.5255 24.6965C20.2655 24.4365 20.2655 24.0137 20.5255 23.7537C20.7855 23.4937 21.2082 23.4937 21.4682 23.7537L22.1069 24.3937L23.8575 22.6431C24.1175 22.3831 24.5402 22.3831 24.8002 22.6431C25.0602 22.9031 25.0628 23.3245 24.8028 23.5845Z"
              fill="white"
            />
          </svg>
        </div>
      )}
      <div
        className="marked"
        onClick={() => {
          closeAllFilters();
          setFavorites(true);
        }}
      >
        <div className="content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
          >
            <path
              d="M9.96199 0.596006L11.904 4.513C12.05 4.808 12.332 5.01202 12.659 5.05902L17.1419 5.70697C17.9639 5.82597 18.292 6.83398 17.697 7.41198L14.456 10.557C14.219 10.787 14.111 11.118 14.167 11.443L14.9079 15.747C15.0579 16.62 14.1409 17.286 13.3549 16.875L9.467 14.84C9.175 14.687 8.82697 14.687 8.53597 14.84L4.65096 16.873C3.86396 17.285 2.94393 16.618 3.09493 15.743L3.83602 11.443C3.89202 11.118 3.78396 10.787 3.54696 10.557L0.305988 7.41198C-0.290012 6.83398 0.0379201 5.82597 0.86092 5.70697L5.34395 5.05902C5.66995 5.01202 5.95196 4.808 6.09896 4.513L8.04097 0.596006C8.43197 -0.198994 9.56799 -0.198994 9.96199 0.596006Z"
              fill={favorites ? '#E0FF25' : 'white'}
            />
          </svg>

          <h3
            style={{
              color: favorites ? '#E0FF25' : 'white',
            }}
          >
            Marked
          </h3>
        </div>
      </div>
      <div className="roomSectionHeaderFilters">
        {windowWidth > 1120 && (
          <div className="upperFilters">
            <div className="toolTip">
              <h6>Value Filter</h6>
            </div>
            <div className="subFilters">
              {subfiltersActive.map((filter, index) => (
                <div key={index} className="subItem">
                  {svgMap[filter]}
                  <h2>
                    {filter === 'OpenStatus'
                      ? 'Open'
                      : filter === 'ClosedErr' || filter === 'ClosedTime'
                        ? 'Closed'
                        : filter}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}

        {windowWidth > 1120 && (
          <div className="roomSectionHeaderFiltersType">
            <TooltipCustome
              title={
                <>
                  Show all rooms <br /> without filter
                </>
              }
              color=" #E0FF25"
              placement="bottom-end"
              followCursor
            >
              <div
                className="roomColor"
                onClick={() => {
                  onReset();
                  closeAllFilters();
                  setActive('');
                  setFavorites(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="colorful"></div>

                <div className="allRooms">
                  <h4
                    style={{
                      color: defaultState ? '' : '#E0FF25',
                    }}
                  >
                    All Rooms
                  </h4>
                </div>
              </div>
            </TooltipCustome>

            <StateFilter
              isOpen={stateFilterOpen}
              value={value.state}
              onChange={(_value) => {
                onChange({
                  ...defaultFilterValues,
                  state: _value,
                });
              }}
              active={active === 'state'}
              onOpenChange={() => {
                closeAllFilters();
                setStateFilterOpen(!stateFilterOpen);
                setActive('state');
                setFavorites(false);
              }}
            />
            <StatusFilter
              isOpen={statusFilterOpen}
              value={value.status}
              onChange={(_value) => {
                onChange({
                  ...defaultFilterValues,
                  status: _value,
                });
              }}
              active={active === 'status'}
              onOpenChange={() => {
                closeAllFilters();
                setStatusFilterOpen(!statusFilterOpen);
                setActive('status');
                setFavorites(false);
              }}
            />
            <DateFilter
              isOpen={dateFilterOpen}
              value={value.date}
              onChange={(_value) => {
                onChange({
                  ...defaultFilterValues,
                  date: _value,
                });
              }}
              active={active === 'date'}
              onOpenChange={() => {
                closeAllFilters();
                setFavorites(false);
                setDateFilterOpen(!dateFilterOpen);
                setActive('date');
              }}
            />
            <NominalFilter
              isOpen={nominalFilterOpen}
              value={value.nominal}
              onChange={(_value) => {
                onChange({
                  ...defaultFilterValues,
                  nominal: _value,
                });
              }}
              active={active === 'nominal'}
              onOpenChange={() => {
                closeAllFilters();
                setNominalFilterOpen(!nominalFilterOpen);
                setActive('nominal');
                setFavorites(false);
              }}
            />
          </div>
        )}
        {windowWidth < 1120 && (
          <MobileFilters
            onChange={(v) => {
              onChange({
                ...value,
                state: v?.state || value.state,
                status: v?.status || value.status,
                date: v?.date || value.date,
                nominal: v?.nominal || value.nominal,
              });
            }}
            value={{
              state: value.state,
              status: value.status,
              date: value.date,
              nominal: value.nominal,
            }}
            isOpen={mobileFilterOpen}
            setOpen={setMobileFilterOpen}
            setActive={setActive}
            setFavorites={setFavorites}
          />
        )}
      </div>
    </div>
  );
};

export default RoomFilters;
