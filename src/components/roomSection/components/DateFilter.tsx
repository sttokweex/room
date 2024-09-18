import React from 'react';
import dropDown from '@/assets/dropDownSmall.svg';
interface Props {
  isOpen: boolean;
  value: string;
  active: boolean;
  onOpenChange: () => void;
  onChange: (value: 'new' | 'closedSoon' | 'closedDate') => void;
}

const DateFilter: React.FC<Props> = ({
  isOpen,
  value,
  active,
  onChange,
  onOpenChange,
}) => {
  return (
    <div className="filterValue">
      <div className="filterValueMain" onClick={onOpenChange}>
        <h4
          className="filterName"
          style={{
            color: active ? '#E0FF25' : '',
          }}
        >
          Date
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
      <div className={`filterList ${isOpen ? 'show' : 'hide'}`}>
        <div>
          <input
            type="checkbox"
            checked={value === 'new'}
            onChange={() => onChange('new')}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.17 3.03994L6.16998 4.36993C5.48998 4.51993 5 5.12992 5 5.82992V18.1699C5 18.8699 5.48998 19.4799 6.16998 19.6299L12.17 20.9599C13.11 21.1699 14 20.4599 14 19.4999V4.49994C14 3.53994 13.11 2.82994 12.17 3.03994ZM10.52 12.9999C9.97002 12.9999 9.52002 12.5499 9.52002 11.9999C9.52002 11.4499 9.96001 10.9999 10.51 10.9999H10.52C11.07 10.9999 11.52 11.4499 11.52 11.9999C11.52 12.5499 11.07 12.9999 10.52 12.9999ZM16 18.6999V5.29992C16 5.13392 16.134 4.99994 16.3 4.99994H17.5C18.328 4.99994 19 5.67194 19 6.49994V17.4999C19 18.3279 18.328 18.9999 17.5 18.9999H16.3C16.134 18.9999 16 18.8659 16 18.6999Z"
              fill="#EEEDE9"
            />
          </svg>
          New
        </div>{' '}
        <div>
          <input
            type="checkbox"
            checked={value === 'closedSoon'}
            onChange={() => onChange('closedSoon')}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.17 3.03994L6.16998 4.36993C5.48998 4.51993 5 5.12992 5 5.82992V18.1699C5 18.8699 5.48998 19.4799 6.16998 19.6299L12.17 20.9599C13.11 21.1699 14 20.4599 14 19.4999V4.49994C14 3.53994 13.11 2.82994 12.17 3.03994ZM10.52 12.9999C9.97002 12.9999 9.52002 12.5499 9.52002 11.9999C9.52002 11.4499 9.96001 10.9999 10.51 10.9999H10.52C11.07 10.9999 11.52 11.4499 11.52 11.9999C11.52 12.5499 11.07 12.9999 10.52 12.9999ZM16 18.6999V5.29992C16 5.13392 16.134 4.99994 16.3 4.99994H17.5C18.328 4.99994 19 5.67194 19 6.49994V17.4999C19 18.3279 18.328 18.9999 17.5 18.9999H16.3C16.134 18.9999 16 18.8659 16 18.6999Z"
              fill="#EEEDE9"
            />
          </svg>
          Closed soon
        </div>{' '}
        <div>
          <input
            type="checkbox"
            checked={value === 'closedDate'}
            onChange={() => onChange('closedDate')}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.17 3.03994L6.16998 4.36993C5.48998 4.51993 5 5.12992 5 5.82992V18.1699C5 18.8699 5.48998 19.4799 6.16998 19.6299L12.17 20.9599C13.11 21.1699 14 20.4599 14 19.4999V4.49994C14 3.53994 13.11 2.82994 12.17 3.03994ZM10.52 12.9999C9.97002 12.9999 9.52002 12.5499 9.52002 11.9999C9.52002 11.4499 9.96001 10.9999 10.51 10.9999H10.52C11.07 10.9999 11.52 11.4499 11.52 11.9999C11.52 12.5499 11.07 12.9999 10.52 12.9999ZM16 18.6999V5.29992C16 5.13392 16.134 4.99994 16.3 4.99994H17.5C18.328 4.99994 19 5.67194 19 6.49994V17.4999C19 18.3279 18.328 18.9999 17.5 18.9999H16.3C16.134 18.9999 16 18.8659 16 18.6999Z"
              fill="#EEEDE9"
            />
          </svg>
          Closed
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
