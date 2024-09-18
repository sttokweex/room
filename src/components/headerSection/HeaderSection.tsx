import './HeaderSection.scss';
import { useEffect, useRef, useState } from 'react';
// import bgImage from '@/assets/bgImg.png';
import logoUrl from '@/assets/Logo.svg';
import miniLogo from '@/assets/mniLogo.svg';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Spline from '@splinetool/react-spline';
import staticImage from '@/assets/bgWithOutSpline.png';

gsap.registerPlugin(ScrollToPlugin);

const HeaderSection: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    localStorage.removeItem('checkedRooms');
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 3,
          ease: 'power2.out',
        },
      );
    }
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0.5, top: '50%' },
        {
          top: '85%',
          opacity: 1,
          duration: 2,
          ease: 'elastic.out(0.2, 0.5)',
        },
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSplineLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    if (splineContainerRef.current) {
      observer.observe(splineContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="headerSectionMainBox">
      <div className="bgImage" ref={splineContainerRef}>
        {windowWidth < 850 ? (
          <img src={staticImage} alt="Static background" />
        ) : (
          isSplineLoaded && (
            <Spline scene="https://prod.spline.design/pbyjIwcjdNeQXP6r/scene.splinecode" />
          )
        )}
      </div>

      <div className="mainSectionLogo" ref={logoRef}>
        <img src={windowWidth < 850 ? miniLogo : logoUrl} alt="Logo" />
      </div>

      <div className="mainSection">
        <div className="mainSectionContentBox">
          <div className="mainSectionContent" ref={textRef}>
            <h1>Guaranteed Blockchain Lotteries every day.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderSection;
