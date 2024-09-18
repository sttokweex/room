import './layout.scss';
import HeaderSection from '@/components/headerSection/HeaderSection';
import RoomSection from '@/components/roomSection/RoomSection';
import About from '@/components/about/about';
import BottomSection from '@/components/bottomSection/BottomSection';
import NavBar from '@/components/navBar/NavBar';

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <div id="header" className="headerSection">
        <HeaderSection />
      </div>
      <div id="about" className="aboutSection">
        <About />
      </div>
      <div id="rooms" className="background">
        <RoomSection withMoreRoomsButton={true} isInRoomIdPage={false} />
        <div id="FAQ">
          <BottomSection />
        </div>
      </div>
    </>
  );
};

export default Layout;
