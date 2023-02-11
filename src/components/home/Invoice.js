import styled from 'styled-components';
import iconArrowRight from '../../images/icon-arrow-right.svg';

const Invoice = ({id, paymentDue, clientName, total, status}) => {
  return (
    <Wrapper>
      <div className="invoice-global-info">
        <div>
          <h4>#{id}</h4>
          <p>Due {paymentDue}</p>
        </div>
        <p>{clientName}</p>
      </div>
      <div className="invoice-paid-info">
        <h3>{total}</h3>
        <div>
          <div className={`status-label ${status}`}>
            <span></span>
            {status}     
          </div>
          <img src={iconArrowRight} alt="right arrow" />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  background: var(--clr-holder);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    border-color: var(--purple);
  }

  .invoice-global-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    > div {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  .invoice-paid-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      display: none;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 3.125rem;

    .invoice-global-info {
      flex: 1;
      align-items: center;
      justify-content: flex-start;
      gap: 3rem;

      > div {
        flex-direction: row;
        align-items: center;
      }
    }

    .invoice-paid-info {
      gap: 2.5rem;

      > div {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }

      img {
        display: block;
      }
    }
  }
`;

export default Invoice;