import NavBar from '@/components/navBar/NavBar';
import './roomPage.scss';

import RoomSection from 'componentsPath/roomSection/RoomSection.tsx';

const RoomPage: React.FC = () => {
  return (
    <div id="rooms" className="background">
      <NavBar />
      <div className="roomPage">
        <RoomSection withMoreRoomsButton={false} isInRoomIdPage={false} />
      </div>
    </div>
  );
};

export default RoomPage;
