import React, { useEffect, useRef, useState } from 'react';
import './Footer.scss';
import yellowLogo from '@/assets/yellowLogo.svg';
import RoomStakeText from '@/assets/RoomStake.svg';
import LogoAnimate from '@/assets/logoAnimateIcon/LogoAnimateIcon.webm';

const Footer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('safari') && !ua.includes('chrome')) {
      setIsSafari(true);
    }

    const videoElement = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement?.play();
          } else {
            videoElement?.pause();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);
  return (
    <div className="footerBox">
      <div className="roomStakeMobileText">RoomStake</div>

      <div className="followUsMobile">Follow us</div>

      <div className="linkBar">
        <span>
          <a href="mailto:">Hello@</a>
          <a href="mailto:">RoomStake.com</a>
        </span>
        <div className="subLinkBar">
          <div>
            <h6>Follow us</h6>
            <a href="/404page">Discord</a>
          </div>
          <a href="/404page">Twitter</a>
          <a href="/404page">Github</a>
        </div>

        <div className="invisibleHelpBlock"></div>
      </div>
      <div className="footerContent">
        <h1>
          <img src={RoomStakeText} alt="" className="roomStakeText" />
          {!isSafari ? (
            <video ref={videoRef} className="letter-image" autoPlay muted>
              <source src={LogoAnimate} type="video/webm" />
            </video>
          ) : (
            <img src={yellowLogo} alt="Static logo" className="letter-image" />
          )}
        </h1>
      </div>

      <div className="mobileLine">
        <p>All rights reserved</p>
        <p>Priivacy Policy</p>
        <p>Design by Radiance</p>
      </div>

      <div className="linkBarBottom">
        <div className="Footeritem1">
          <h4>RoomStake</h4>
          <p>All rights reserved</p>
        </div>
        <div className="Footeritem2">
          <a href="/404page">Privacy Policy</a>
        </div>
        <div className="Footeritem3">
          <p>Design by Radiance</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
