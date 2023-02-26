import { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { formatSingleDate, calculatePaymentPeriod } from '../utils/helper';
import { iconArrowLeft, iconArrowRight, iconCalendar } from '../utils/constants';

const CustomCalendar = ({invoiceDate:{value: invoiceDate}, paymentTerms: {value: paymentPeriod}, name}) => {
  const calculatedPaymentPeriod = calculatePaymentPeriod(invoiceDate, paymentPeriod);
  const [period, setPeriod] = useState({
    month: calculatedPaymentPeriod.getMonth(),
    year: calculatedPaymentPeriod.getFullYear(),
  });


  const changeCalendarDate = type => {
    if (type === 'dec') {
      setPeriod(prevValue => {
        let tempValue = {...prevValue};
        tempValue = {...tempValue, month:  tempValue.month - 1}
        if (tempValue.month < 0) {
          tempValue = {month: 11, year: tempValue.year - 1};
        }

        return tempValue;
      });
    }

    if (type === 'inc') {
      setPeriod(prevValue => {
        let tempValue = {...prevValue};
        tempValue = {...tempValue, month:  tempValue.month + 1}
        if (tempValue.month > 11) {
          tempValue = {month: 0, year: tempValue.year + 1};
        }

        return tempValue;
      });
    }
  }
  
  return (
    <Wrapper>
      <div className="calendar-value">
        <span>{moment(calculatedPaymentPeriod).format('DD MMM YYYY')}</span>
        {iconCalendar}
      </div>
      <div className="calendar-holder">
        <div className="calendar-holder-top">
          <button type="button" onClick={() => changeCalendarDate('dec')}>
            {iconArrowLeft}
          </button>
          <h4>{moment(calculatePaymentPeriod(`${period.year}-${period.month + 1}-${new Date(invoiceDate).getDate()}`, paymentPeriod)).format('MMM YYYY')}</h4>
          <button type="button" onClick={() => changeCalendarDate('inc')}>
            {iconArrowRight}
          </button>
        </div>
        <ul className="calendar-holder-dates">
          {[...Array(new Date(period.year, period.month + 1, 0).getDate()).keys()].map((item, index) => {
            return <li 
              className={`date${ new Date(invoiceDate).getMonth() === period.month && new Date(invoiceDate).getDate() === (index + 1) ? ' active' : '' }`} 
              key={index}
              name={name}
              data-value={`${period.year}-${formatSingleDate(period.month + 1)}-${formatSingleDate(item + 1)}`}
              >
                {item + 1}
              </li>
          })}
        </ul>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  .calendar-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--clr-label);
    padding: 0 1.125rem;
    background: var(--clr-input);
    border: 1px solid var(--clr-input-border);
    border-radius: 5px;
    cursor: pointer;
  }

  .calendar-holder {
    position: absolute;
    top: calc(100% + 0.3125rem);
    left: 0;
    width: 15rem;
    padding: 1.5rem;
    background: var(--clr-input);
    box-shadow: var(--clr-shadow);
    border-radius: 10px;
    z-index: 1;

    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.9375rem;
    }

    &-dates {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-row-gap: 1rem;
      row-gap: 0.7rem;
      .date {
        font-size: 12px;
        font-weight: 700;
        color: var(--clr-header);
        text-align: center;
        cursor: pointer;
        
        &:hover {
          color: var(--purple);
        }

        &.active {
          color: var(--purple)
        }
      }
    }

    button {
      padding: 0.5rem;
      cursor: pointer;
    }

    h4 {
      color: var(--clr-header);
    }
  }
`;

export default CustomCalendar;