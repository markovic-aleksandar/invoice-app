import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import iconArrowDown from '../../images/icon-arrow-down.svg';
import iconPlus from '../../images/icon-plus.svg';
import iconCheck from '../../images/icon-check.svg';

const FilterInvoice = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const hideFilter = useCallback(e => {
    const target = e.target;
    if (filterOpen & !target.closest('.filter')) {
      setFilterOpen(false);
    }
  }, [filterOpen]);

  useEffect(() => {
    // remove filter if is open
    window.addEventListener('click', hideFilter);

    return () => {
      window.removeEventListener('click', hideFilter);
    }
  }, [filterOpen, hideFilter]);

  return (
    <Wrapper>
      <div>
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
      </div>
      <div className="action-holder">
        <div className="filter">
          <div className="filter-label" onClick={() => setFilterOpen(!filterOpen)}>
            Filter by status
            <img src={iconArrowDown} alt="arrow down" />
          </div>
          <div className={`filter-select${filterOpen ? ' opened' : ''}`}>
            <div>
              <div className="checkbox">
                <input type="checkbox" name="draft" id="draft" />
                <span className="box"></span>
              </div>
              <label htmlFor="draft">Draft</label>
            </div>
            <div>
              <div className="checkbox">
                <input type="checkbox" name="pending" id="pending" />
                <span className="box"></span>
              </div>
              <label htmlFor="pending">Pending</label>
            </div>
            <div>
              <div className="checkbox">
                <input type="checkbox" name="paid" id="paid" />
                <span className="box"></span>
              </div>
              <label htmlFor="paid">Paid</label>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-purple">
          <span><img src={iconPlus} alt="plus icon" /></span>
          New Invoice
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.75rem 0;
  
  h1 {
    margin-bottom: 0.625rem;
  }
  
  .action-holder {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .filter {
    position: relative;
  }

  .filter-label {
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    color: var(--clr-header);

    img {
      margin-left: 10px;
    }
  }

  .filter-select {
    position: absolute;
    top: 50px;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 11.875rem;
    background: var(--white);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(72, 84, 159, 0.25);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;

    &.opened {
      opacity: 1;
      pointer-events: auto;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        .checkbox {
          border-color: var(--purple);
        }
      }
    }

    .checkbox {
      position: relative;
      width: 1.125rem;
      height: 1.125rem;
      background: var(--greyBlue);
      border: 1px solid var(--greyBlue);
      border-radius: 2px;
      overflow: hidden;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 1;

      &:checked + .box {
        opacity: 1;
      }
    }

    label {
      flex: 1;
      font-size: 12px;
      font-weight: 700;
      user-select: none;
    }

    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--purple);
      border: 1px solid var(--purple);
      opacity: 0;
      transition: all 0.2s ease-in-out;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background: url(${iconCheck}) no-repeat center center/contain;
      }
    }
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.4375rem 0.725rem 0.4375rem 0.4375rem;

    span {
      display: block;
      width: 2rem;
      height: 2rem;
      background: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (min-width: 768px) {
    h1 {
      margin-bottom: 1rem;
    }

    .btn {
      gap: 15px;
      padding: 0.625rem 1rem 0.625rem 0.625rem;
    }
  }
`;

export default FilterInvoice;