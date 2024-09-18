import React from 'react';
import pending from '@/assets/pending.svg';
import executed from '@/assets/executed.svg';
import expired from '@/assets/expired.svg';
import sandTime from '@/assets/sandTime.svg';
import dropDown from '@/assets/dropDownSmall.svg';

interface Props {
  isOpen: boolean;
  value: string;
  active: boolean;
  onOpenChange: () => void;
  onChange: (
    value: 'openStatus' | 'closed' | 'closedErr' | 'closedTime',
  ) => void;
}

const StatusFilter: React.FC<Props> = ({
  isOpen,
  value,
  onChange,
  onOpenChange,
  active,
}) => {
  return (
    <div className="filterValue" >
      <div className="filterValueMain" onClick={onOpenChange}>
        <h4
          className="filterName"
          style={{
            color: active ? '#E0FF25' : '',
          }}
        >
          Status
        </h4>

        <img
          src={dropDown}
          alt="dropDown"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>
      <div className={`filterList ${isOpen ? 'show' : ''}`}>
        <div>
          <input
            type="checkbox"
            checked={value === 'openStatus'}
            onChange={() => onChange('openStatus')}
          />
          <img src={pending} alt="" />
          Open
        </div>
        <div>
          <input
            type="checkbox"
            checked={value === 'closed'}
            onChange={() => onChange('closed')}
          />
          <img src={executed} alt="" />
          Closed
        </div>
        <div>
          <input
            type="checkbox"
            checked={value === 'closedErr'}
            onChange={() => onChange('closedErr')}
          />
          <img src={expired} alt="" />
          Closed
        </div>

        <div>
          <input
            type="checkbox"
            checked={value === 'closedTime'}
            onChange={() => onChange('closedTime')}
          />
          <img src={sandTime} alt="" />
          Closed
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
