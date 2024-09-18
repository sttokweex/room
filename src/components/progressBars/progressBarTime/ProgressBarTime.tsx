import React, { useEffect, useState } from 'react';
import pending from '@/assets/pending.svg';
import executed from '@/assets/executed.svg';
import expiredIcon from '@/assets/expired.svg';
import sandTime from '@/assets/sandTime.svg';

import './ProgressBarTime.scss';
import dayjs from 'dayjs';
import { TooltipCustome } from '@/components/room/Room';
interface ProgressBarParticipantProps {
  count: number;
  minDepositsAmount: number;
  isIn: boolean;
  isWin: boolean;
  rewardTimestamp: number;
  rewardPeriod: number;
  nominal: string;
}

const ProgressBarTime: React.FC<ProgressBarParticipantProps> = ({
  count,
  isIn,
  isWin,
  minDepositsAmount,
  rewardTimestamp,
  rewardPeriod,
  nominal,
}) => {
  const [timerValue, setTimerValue] = useState<any>();
  const [expired, setExpired] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const rewardUnix = dayjs.unix(rewardTimestamp);

    const id = setInterval(() => {
      const rewardTime = dayjs.unix(rewardTimestamp);
      const now = dayjs();
      const diff = rewardTime.diff(now);
      const totalDuration = rewardTime.diff(
        dayjs.unix(rewardTimestamp - rewardPeriod),
      );
      const progressPercentage = Math.max(
        0,
        Math.min(100, ((totalDuration - diff) / totalDuration) * 100),
      );
      setProgress(progressPercentage);

      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const daysms = diff % (24 * 60 * 60 * 1000);
      const hours = Math.floor(daysms / (60 * 60 * 1000));
      const hoursms = diff % (60 * 60 * 1000);
      const minutes = Math.floor(hoursms / (60 * 1000));
      const minutesms = diff % (60 * 1000);
      const sec = Math.floor(minutesms / 1000);
      if (now.unix() > rewardUnix.unix() - 1) {
        setExpired(true);
      }
      setTimerValue({ days, hours, minutes, sec });
    }, 1000);
    return () => clearInterval(id);
  }, [rewardTimestamp]);

  return (
    <TooltipCustome
      title="TRY ANOTHER ROOM"
      color={
        nominal === 'blue'
          ? '#8CFDEC'
          : nominal === 'yellow'
            ? '#E0FF25'
            : '#FF6C1A'
      }
      followCursor
    >
      <div className="progressBarTime">
        <div
          className="progressTime"
          style={{
            width: `${progress}%`,
            background: expired
              ? 'none'
              : 'linear-gradient(270deg, #eeede9 0%, rgba(238, 237, 233, 0) 100%)',
          }}
        ></div>
        <div className="progressBarTimeInfo">
          <div className="progressBarTimeStatus">
            <img
              src={
                !expired
                  ? pending
                  : (count >= minDepositsAmount && !isWin) || isWin
                    ? isIn
                      ? executed
                      : sandTime
                    : expiredIcon
              }
              alt="pending"
            />
            <h4>{expired ? 'Closed' : 'Open'}</h4>
          </div>
          <div className="progressBarTimeLeft">
            {!expired && timerValue ? (
              <h3>
                {`${timerValue.days}D : ${timerValue.hours}H : ${timerValue.minutes}Min ${timerValue.sec}Sec`}
              </h3>
            ) : count >= minDepositsAmount ? (
              isIn ? (
                <h5>Successfully wagered</h5>
              ) : (
                <h5>You didn&apos;t have time</h5>
              )
            ) : (
              <h5>Drawing Error</h5>
            )}
          </div>
        </div>
      </div>
    </TooltipCustome>
  );
};

export default ProgressBarTime;
