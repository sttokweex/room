import React, { useEffect, useRef, useContext } from 'react';
import './about.scss';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import ConnectYourWalletV02 from '@/assets/lottieAnimation/ConnectYourWalletV02.json';
import MakeADepositV02 from '@/assets/lottieAnimation/MakeADepositV03.json';
import RoomSearchV02 from '@/assets/lottieAnimation/RoomSearchV02.json';
import TakeWinningsOrDepositV02 from '@/assets/lottieAnimation/TakeWinningsOrDepositV02.json';
import { VenomConnectContext } from '../../components/context/VenomConnect.tsx';

const About: React.FC = () => {
  const lottieRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lottieRef1 = useRef<LottieRefCurrentProps | null>(null);
  const lottieRef2 = useRef<LottieRefCurrentProps | null>(null);
  const lottieRef3 = useRef<LottieRefCurrentProps | null>(null);
  const lottieRef4 = useRef<LottieRefCurrentProps | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null); // Создаём ref для заголовка
  const { venomConnect, venomProvider, setUserAddress, userAddress } =
    useContext(VenomConnectContext);

  const login = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };

  const handleClick = () => {
    if (!userAddress) {
      login();
    } else {
      onDisconnect();
    }
  };

  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setUserAddress('');
  };

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.5 } 
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        titleObserver.unobserve(titleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            [lottieRef1, lottieRef2, lottieRef3, lottieRef4].forEach((lottieRef, index) => {
              // setTimeout(() => {
                lottieRef.current?.playSegments([0, 61], true);
              // }, index * 500); 
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    lottieRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      lottieRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const handleSegmentComplete = () => {
    lottieRef1.current?.playSegments([61, 20], false);
    lottieRef2.current?.playSegments([59, 12], false);
    lottieRef3.current?.playSegments([43, 59], false);
    lottieRef4.current?.playSegments([20, 59], false);
  };

  return (
    <div className="mainInfo">
      <div className="mainInfoContentBox">
        <div className="mainInfoContent">
          <h1 className="h1Indent2 animated-title" id="scrollTo" ref={titleRef}>
            Gathering 50 crypto investors <br /> for{' '}
            <span className="highlight">risk-free blockchain lotteries.</span>
            One winner takes the prize, others get their{' '}
            <span className="highlight">full deposit back.</span>{' '}
          </h1>
          <button className="connectButton" onClick={handleClick}>
            <p>
              {userAddress
                ? `${userAddress.slice(0, 6)}...${userAddress.slice(userAddress.length - 5, userAddress.length - 1)}`
                : 'Connect wallet'}
            </p>
          </button>
        </div>
        <div className="infoInstructions">
          <div className="instructionsItems">
            <div className="item item0 " ref={(el) => (lottieRefs.current[0] = el)}>
              <div className="numberIcon">1</div>

              <div className="lottieAnimationWrapper">
                <Lottie
                  className="lottieAnimationIcon"
                  animationData={ConnectYourWalletV02}
                  loop={false}
                  lottieRef={lottieRef1}
                  onComplete={handleSegmentComplete}
                  autoPlay={false}
                />
              </div>

              <h2>Connect wallet</h2>
              <p>
                Connect your wallet <br /> and proceed to the next steps in the rooms
              </p>
            </div>

            <div className="item item1" ref={(el) => (lottieRefs.current[1] = el)}>
              <div className="numberIcon">2</div>

              <div className="lottieAnimationWrapper">
                <Lottie
                  className="lottieAnimationIcon1"
                  animationData={RoomSearchV02}
                  loop={false}
                  lottieRef={lottieRef2}
                  onComplete={handleSegmentComplete}
                  autoPlay={false}
                />
              </div>

              <h2>Room search</h2>
              <p>
                Choose a room from our list of rooms, which we&apos;ve posted a bit below
              </p>
            </div>
            <div className="item item2" ref={(el) => (lottieRefs.current[2] = el)}>
              <div className="numberIcon">3</div>

              <div className="lottieAnimationWrapper">
                <Lottie
                  className="lottieAnimationIcon2"
                  animationData={MakeADepositV02}
                  loop={false}
                  lottieRef={lottieRef3}
                  onComplete={handleSegmentComplete}
                  autoPlay={false}
                />
              </div>

              <h2>Make a deposit</h2>
              <p>
                Connect your wallet and make a deposit in your preferred cryptocurrency
              </p>
            </div>
            <div className="item item3" ref={(el) => (lottieRefs.current[3] = el)}>
              <div className="numberIcon">4</div>

              <div className="lottieAnimationWrapper">
                <Lottie
                  className="lottieAnimationIcon3"
                  animationData={TakeWinningsOrDepositV02}
                  loop={false}
                  lottieRef={lottieRef4}
                  onComplete={handleSegmentComplete}
                  autoPlay={false}
                />
              </div>

              <h2>Take winnings or deposit</h2>
              <p>
                If you win, you take your winnings, and if you didn&apos;t, you just take your deposit back
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
