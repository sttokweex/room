import React from 'react';
import './ProgressBarParticipant.scss'; // Подключение файла стилей SCSS

interface ProgressBarParticipantProps {
  participantCount: number;
  nominal: string;
  participantMax: number;
}

const ProgressBarParticipant: React.FC<ProgressBarParticipantProps> = ({
  participantCount,
  nominal,
  participantMax,
}) => {
  return (
    <div
      className="progressBlock"
      style={{
        color:
          nominal == 'blue'
            ? '#8CFDEC'
            : nominal == 'yellow'
              ? '#E0FF25'
              : '#FF6C1A',
      }}
    >
      <div className="participantCount">
        <div className="progressText">Participants:</div>

        <div className="progressTextCount">
          <h2>{participantCount}&nbsp;/</h2>
          <pre
            className="specialNumber"
            style={{
              color:
                nominal == 'blue'
                  ? 'rgba(140, 253, 236, 0.20)'
                  : nominal == 'yellow'
                    ? 'rgba(224, 255, 37,0.20)'
                    : 'rgba(255, 108, 26, 0.20)',
            }}
          >
            {participantMax}
          </pre>
        </div>
      </div>
      <div
        className="progressBarParicipantContainer"
        style={{
          background:
            nominal == 'blue'
              ? 'linear-gradient(90deg, #8CFDEC 0%, rgba(140, 253, 236, 0) 100%)'
              : nominal == 'yellow'
                ? 'linear-gradient(90deg, #E0FF25 0%, rgba(224, 255, 37, 0) 100%)'
                : 'linear-gradient(90deg, #FF6C1A 0%, rgba(255, 108, 26, 0) 100%)',
        }}
      >
        <div
          className="progressParicipant"
          style={{
            width: `${(participantCount / participantMax) * 100}%`,
            background:
              nominal == 'blue'
                ? '#8CFDEC'
                : nominal == 'yellow'
                  ? '#E0FF25'
                  : '#FF6C1A',
            boxShadow:
              nominal == 'blue'
                ? '0px 0px 10px 0px #8CFDECCC'
                : nominal == 'yellow'
                  ? '0px 0px 10px 0px #E0FF25CC'
                  : '0px 0px 10px 0px #FF6C1ACC',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarParticipant;
