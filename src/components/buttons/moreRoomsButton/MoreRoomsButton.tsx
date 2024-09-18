import React from 'react';
import './MoreRoomsButton.scss';
import { useNavigate } from 'react-router-dom';

const MoreRoomsButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="moreRooms">
      <button
        className="connectButton"
        onClick={() => {
          navigate('/rooms');
        }}
      >
        <p>More Rooms</p>
      </button>
    </div>
  );
};

export default MoreRoomsButton;
