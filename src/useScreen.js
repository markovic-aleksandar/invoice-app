import { useState, useEffect } from 'react';

const useScreen = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const changeScreen = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', changeScreen);

    // remove event on unmount
    return () => {
      window.removeEventListener('resize', changeScreen);
    }
  }, []);

  return isMobile;
}

export default useScreen;