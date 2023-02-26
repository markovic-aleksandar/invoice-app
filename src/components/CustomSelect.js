import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { iconArrowDown } from '../utils/constants';

const CustomSelect = ({values, value, name}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(values.find(valueItem => valueItem.value === value.value).label);

  const handleSelect = e => {
    const value = e.currentTarget.textContent.trim();
    setCurrentValue(value);
  }

  useEffect(() => {
    const hideSelect = e => {
      if (isOpen && !e.target.closest('.select-value')) {
        setIsOpen(false);
      }
    }

    window.addEventListener('click', hideSelect);

    return () => {
      window.removeEventListener('click', hideSelect);
    }
  }, [isOpen]);

  return (
    <Wrapper onClick={() => setIsOpen(!isOpen)}>
      <div className="select-value">
        <span>{currentValue}</span>
        {iconArrowDown}
      </div>
      <ul className={`select-options${isOpen ? ' active' : ''}`}>
        {values.map((value, index) => {
          const {label, value: text} = value;
          return <li
            name={name}
            key={index}
            data-value={text}
            onClick={handleSelect}
          >{label}
          </li>
        })}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  .select-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 700;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    padding: 0 1.125rem;
    color: var(--clr-label);
    background: var(--clr-input);
    border: 1px solid var(--clr-input-border);
    border-radius: 5px;
    cursor: pointer;
  }

  .select-options {
    position: absolute;
    top: 3.75rem;
    display: flex;
    flex-direction: column;
    background: var(--clr-input);
    width: 100%;
    border-radius: 10px;
    box-shadow: var(--clr-shadow);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }

    li {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--clr-header);
      padding: 0.9375rem 1.125rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:not(:last-child) {
        border-bottom: 1px solid var(--clr-input-border);
      }

      &:hover {
        color: var(--purple);
      }
    }
  }
`;


export default CustomSelect;