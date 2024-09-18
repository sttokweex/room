import RoomSection from '@/components/roomSection/RoomSection';
import NavBar from '@/components/navBar/NavBar';
import './RoomIdPage.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomIdPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!document.querySelector('.room')) {
        window.location.replace(
          `${window.location.protocol}//${window.location.host}/err`,
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, RoomSection]);

  return (
    <div className="roomIdPageMain">
      <div id="rooms" className="background">
        <NavBar />
        <div className="roomIdPageContent">
          <RoomSection withMoreRoomsButton={false} isInRoomIdPage={true} />
        </div>
      </div>
    </div>
  );
};

export default RoomIdPage;
