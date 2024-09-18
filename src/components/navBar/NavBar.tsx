import React, { useState, useEffect, useContext } from 'react';
import './NavBar.scss';
import { ProviderRpcClient, Address } from 'everscale-inpage-provider';
import { VenomConnectContext } from '../../components/context/VenomConnect.tsx';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useNavigate } from 'react-router-dom';
import './NavBar.scss';
import connect from '@/assets/connect.svg';
import Logo from '@/assets/mniLogo.svg';

gsap.registerPlugin(ScrollToPlugin);

const NavBar = () => {
  const {
    venomConnect,
    venomProvider,
    setVenomProvider,
    setUserAddress,
    userAddress,
    setBalance,
  } = useContext(VenomConnectContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const login = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };

  const getAddress = async (provider: ProviderRpcClient) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };

  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) {
      await getAddress(_venomConnect);
    }
  };

  const onConnect = async (provider: any) => {
    setVenomProvider(provider);
    await onProviderReady(provider);
  };

  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setUserAddress('');
  };

  const onProviderReady = async (provider: ProviderRpcClient) => {
    const venomWalletAddress = provider
      ? await getAddress(provider)
      : undefined;
    setUserAddress(venomWalletAddress || '');
    const balance = await provider.getBalance(
      new Address(venomWalletAddress || ''),
    );
    setBalance(Number(balance || 0));
  };

  useEffect(() => {
    const off = venomConnect?.on('connect', onConnect);
    if (venomConnect) {
      checkAuth(venomConnect);
    }

    return () => {
      off?.();
    };
  }, [venomConnect]);

  const handleClick = () => {
    if (!userAddress) {
      login();
    } else {
      onDisconnect();
    }
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');

    if (window.location.pathname !== '/' && targetId != '/rooms') {
      navigate('/', { replace: true });
      setTimeout(() => {
        let targetElement: HTMLElement | null = null;
        if (targetId) {
          targetElement = document.querySelector(targetId);
          if (targetElement) {
            gsap.to(window, {
              duration: 0.2,
              scrollTo: targetElement,
            });
          }
        }
      }, 1000);
    } else {
      if (targetId == '/rooms' && window.location.pathname !== '/rooms') {
        navigate('/rooms', { replace: true });
      }
      let targetElement: HTMLElement | null = null;
      if (targetId) {
        targetElement = document.querySelector(targetId);
        if (targetElement) {
          gsap.to(window, { duration: 0.2, scrollTo: targetElement });
        }
      }
    }
  };

  const handleTitleClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: 0, autoKill: false },
          ease: 'power2.out',
        });
      }, 1000);
    } else {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: 0, autoKill: false },
        ease: 'power2.out',
      });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      <div className={`mobileMenu ${isOpen ? 'is-open' : ''}`}>
        <div className="mobileMenuBox">
          <div className="mobileMenuLinks">
            <li>
              <a href="#scrollTo" onClick={handleAnchorClick}>
                About Project
              </a>
            </li>
            <li>
              <a href="#rooms" onClick={handleAnchorClick}>
                Rooms
              </a>
            </li>
            <li>
              <a href="#FAQ" onClick={handleAnchorClick}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#" onClick={handleAnchorClick}>
                Contacts
              </a>
            </li>
          </div>
          <div className="subLinkBarMobile">
            <a href="#">Twitter</a>
            <div>
              <h6>Follow us</h6>
              <a href="#">Discord</a>
            </div>
            <a href="#">Github</a>
          </div>
          <div className="logoBox">
            <img src={Logo} alt="Logo" />
          </div>
        </div>
      </div>
      <div className={`navBar ${isNavVisible ? 'visible' : 'hidden'}`}>
        <div className="hiperNavBar">
          <h1 className="mixBlendMode" onClick={handleTitleClick}>
            RoomStake
          </h1>
        </div>
      </div>

      <div className={`pageNaviagtion ${isNavVisible ? 'visible' : 'hidden'}`}>
        <div className="pageNaviagtionDisplay">
          <div className="pageNaviagtionDisplayItem">
            <a href="#scrollTo" onClick={handleAnchorClick}>
              About Project
            </a>{' '}
          </div>
          <div className="pageNaviagtionDisplayItem">
            <a href="/rooms" onClick={handleAnchorClick}>
              Rooms
            </a>{' '}
          </div>
          <div className="pageNaviagtionDisplayItem">
            <a href="#FAQ" onClick={handleAnchorClick}>
              FAQ
            </a>{' '}
          </div>
        </div>
      </div>

      <div
        className={`textWallet ${isNavVisible ? 'visible' : 'hidden'} ${isHovered ? 'hovered' : ''}`}
      >
        {userAddress
          ? `${userAddress.slice(0, 6)}...${userAddress.slice(userAddress.length - 5, userAddress.length - 1)}`
          : 'Connect wallet'}
      </div>

      <div
        className={`connectWalletBox ${isNavVisible ? 'visible' : 'hidden'}`}
      >
        <img
          src={connect}
          className="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <div className="pageNavigationMobie">
          <div
            className={`burgerBtn ${isOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
          >
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
