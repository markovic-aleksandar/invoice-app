import { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import iconSun from '../images/icon-sun.svg';
import iconMoon from '../images/icon-moon.svg';
import userAvatar from '../images/image-avatar.jpg';

const Sidebar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark-theme');
    } else {
      document.querySelector('html').classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <Wrapper>
      <div className="logo-holder">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="theme-user-holder">
        <div className="theme-toggle" onClick={() => setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')}>
          <img src={theme === 'dark' ? iconSun : iconMoon} alt="theme icon" /> 
        </div>
        <div className="user-avatar">
          <img src={userAvatar} alt="user avatar" />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--darkBlue);
  z-index: 2;

  .logo-holder {
    position: relative;
    width: 4.5rem;
    height: 4.5rem;
    background: var(--purple);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 20px 20px 0;
    overflow: hidden;

    img {
      position: relative;
    }
    
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50%;
      background: var(--lightPurple);
      border-radius: 20px 0 0 0;
    }
  }

  .theme-user-holder {
    display: flex;
    height: 100%;

    .theme-toggle {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 2rem;
      border-right: 1px solid #494e6e;

      img {
        cursor: pointer;
      }

      img:hover {
        filter: brightness(0) invert(1);
      }
    }

    .user-avatar {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 2rem;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }
  }

  @media (min-width: 1200px) {
    top: 0;
    left: 0;
    width: 6.4375rem;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 0 20px 20px 0;

    .logo-holder {
      width: 6.4375rem;
      height: 6.4375rem;
    }

    .theme-user-holder {
      flex-direction: column;
      width: 100%;
      height: auto;

      .theme-toggle {
        justify-content: center;
        height: auto;
        width: 100%;
        padding: 2rem 0;
        border: none;
        border-bottom: 2px solid #494e6e;
      }

      .user-avatar {
        justify-content: center;
        height: auto;
        width: 100%;
        padding: 1.75rem 0;
      }
    }
  }
`;

export default Sidebar;