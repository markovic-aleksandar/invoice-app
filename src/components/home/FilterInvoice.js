import styled from 'styled-components';
import { useAppContext } from '../../context';
import useScreen from '../../useScreen';
import useOpenHide from '../../useOpenHide';
import { getUniqueValues } from '../../utils/helper';
import iconArrowDown from '../../images/icon-arrow-down.svg';
import iconPlus from '../../images/icon-plus.svg';
import iconCheck from '../../images/icon-check.svg';

const FilterInvoice = () => {
  const {invoices, filteredInvoices, updateFilter, toggleAddEditBar} = useAppContext();
  const isMobile = useScreen();
  const {isOpen, setIsOpen} = useOpenHide('body', 'filter');
  // get uniqe invoice status
  const statuses = getUniqueValues(invoices);

  return (
    <Wrapper>
      <div>
        <h1>Invoices</h1>
        <p>{isMobile ? `${filteredInvoices.length} invoices` : `There are ${filteredInvoices.length} total invoices`}</p>
      </div>
      <div className="action-holder">
        <div className={`filter${ isOpen ? ' opened' : '' }`}>
          <div className="filter-label" onClick={() => setIsOpen(!isOpen)}>
            {isMobile ? 'Filter' : 'Filter by status'}
            <img src={iconArrowDown} alt="arrow down" />
          </div>
          <div className="filter-select">
            {statuses.length < 1 && <p>No invoices for filter</p>}
            {statuses.map((status, index) => {
              return <div key={index}>
                <div className="checkbox">
                  <input 
                    type="checkbox" 
                    name={status} 
                    id={status} 
                    onChange={updateFilter}
                  />
                  <span className="box"></span>
                </div>
                <label htmlFor={status}>{status}</label>
              </div>
            })}
          </div>
        </div>
        <button type="button" className="btn btn-purple" onClick={toggleAddEditBar}>
          <span><img src={iconPlus} alt="plus icon" /></span>
          {isMobile ? 'New' : 'New Invoice'}
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  
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
  
    .filter-label {
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      user-select: none;
      color: var(--clr-header);
  
      img {
        margin-left: 10px;
        transform: scaleY(1);
        transition: all .3s ease;
      }
    }
  
    .filter-select {
      position: absolute;
      top: 40px;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 11.875rem;
      background: var(--clr-select);
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: var(--clr-shadow);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease-in-out;
  
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
        background: var(--clr-checkbox);
        border: 1px solid var(--clr-checkbox);
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
        cursor: pointer;
  
        &:checked + .box {
          opacity: 1;
        }
      }
  
      label {
        flex: 1;
        font-size: 12px;
        font-weight: 700;
        color: var(--clr-label);
        text-transform: capitalize;
        user-select: none;
        cursor: pointer;
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

    &.opened {
      .filter-label img {
        transform: scaleY(-1);
      }

      .filter-select {
        opacity: 1;
        pointer-events: auto;
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