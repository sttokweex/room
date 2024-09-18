import { useState, useEffect, lazy, Suspense, useContext } from 'react';
import RoomPage from './pages/roomPage/roomPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { initVenomConnect } from './venom-connect/configure.ts';
import './App.scss';
import { VenomConnectContext } from './components/context/VenomConnect.tsx';
import PreLoader from './components/preLoader/preLoader.tsx';
import Page404 from './pages/page404/Page404.tsx';
import RoomIdPage from './pages/roomIdPage/RoomIdPage.tsx';

const Layout = lazy(() => import('./pages/layout/layout'));

function App() {
  const { setVenomConnect } = useContext(VenomConnectContext);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const loadImages = () => {
      const images = Array.from(document.images);
      const imagePromises = images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        });
      });

      return Promise.all(imagePromises);
    };

    const checkResourcesLoaded = async () => {
      await loadImages();
      setTimeout(() => setIsLoading(false), 2000);
    };
    checkResourcesLoaded();
  }, []);

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <Router>
      <Suspense fallback={<PreLoader />}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/rooms" element={<RoomPage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/room/:roomId" element={<RoomIdPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
