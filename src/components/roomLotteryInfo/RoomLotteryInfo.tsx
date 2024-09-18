import React from 'react';
import blueNominalSvg from '@/assets/nominalBlue.svg';
import redNominalSvg from '@/assets/nominalRed.svg';
import YellowNominalSvg from '@/assets/nominalYellow.svg';
import './RoomLotteryInfo.scss';
import dayjs from 'dayjs';
interface RoomLotteryInfoProps {
  rewardTimestamp: number;
  nominal: string;
  minimum: number;
  jackpot: number;
}

const RoomLotteryInfo: React.FC<RoomLotteryInfoProps> = ({
  rewardTimestamp,
  nominal,
  minimum,
  jackpot,
}) => {
  const unix = dayjs.unix(rewardTimestamp);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="lotteryInfo">
      <div className="lotteryInfoDefaultBlock">
        <div className="description">Current jackpot</div>
        {/************************************************/}
        <div className="nominal text">
        ${truncateText(jackpot.toString(), 6)} 
          <img
            src={
              nominal == 'blue'
                ? blueNominalSvg
                : nominal == 'yellow'
                  ? YellowNominalSvg
                  : redNominalSvg
            }
            alt="yellowNominal"
          />
        </div>
      </div>
      <div className="lotteryInfoDefaultBlock">
        <div className="description">Minimum</div>
        <div className="nominal text">
          ${minimum}
          <img
            src={
              nominal == 'blue'
                ? blueNominalSvg
                : nominal == 'yellow'
                  ? YellowNominalSvg
                  : redNominalSvg
            }
            alt="yellowNominal"
          />
        </div>
      </div>
      <div className="lotteryInfoDefaultBlock">
        <div className="description">Chance</div>
        <div className="text">5%</div>
      </div>
      <div className="lotteryInfoDefaultBlock">
        <div className="description">Rounds ends</div>
        <div className="text">
          {unix.format('MMM DD')} / {unix.format('ha')}
        </div>
      </div>
    </div>
  );
};

export default RoomLotteryInfo;
