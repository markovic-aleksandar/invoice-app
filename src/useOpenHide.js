import { useState, useEffect } from 'react';

const useOpenHide = (eventHandler, elClass) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hide = e => {
      if (isOpen && !e.target.closest(`.${elClass}`)) {
        setIsOpen(false);
      }
    }

    document.querySelector(eventHandler).addEventListener('click', hide)

    return () => {
      document.querySelector(eventHandler).removeEventListener('click', hide);
    }
  }, [isOpen, eventHandler, elClass]);

  return {isOpen, setIsOpen};
}

export default useOpenHide;