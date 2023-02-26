import styled from 'styled-components';
import InvoiceItems from './InvoiceItems';
import InvoiceAmount from './InvoiceAmount';
import { formatDate } from '../../utils/helper';

const InvoiceInfo = (props) => {
  const {
    id, 
    description, 
    senderAddress, 
    createdAt, 
    paymentDue,
    clientName,
    clientAddress,
    clientEmail,
    items,
    total
  } = props;

  const senderAddressItems = Object.values(senderAddress);
  const clientAddressItems = Object.values(clientAddress);

  return (
    <Wrapper>
      <div className="invoice-mark">
        <article className="mark-info">
          <h4>#{id}</h4>
          <p>{description}</p>
        </article>
        <ul className="sender-info">
          {senderAddressItems.map((item, index)=> {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
      <div className="invoice-info">
        <article className="date-bill-info">
          <div>
            <div>
              <p>Invoice Date</p>
              <h3>{formatDate(createdAt)}</h3>
            </div>
            <div>
              <p>Payment Due</p>
              <h3>{formatDate(paymentDue)}</h3>
            </div>
          </div>
          <div>
            <p>Bill To</p>
            <h3>{clientName}</h3>
            <ul>
              {clientAddressItems.map((item, index) => {
                return <li key={index}>{item}</li>
              })}
            </ul>
          </div>
        </article>
        <article>
          <p>Sent To</p>
          <h3>{clientEmail}</h3>
        </article>
      </div>
      <InvoiceItems items={items} />
      <InvoiceAmount total={total} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: var(--clr-holder);
  padding: 1.5rem;
  box-shadow: 0 10px 10px -10px rgba(72, 84, 159, 0.1);
  border-radius: 10px;
  
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.3375rem;
  }
  
  .invoice-mark {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;

    .mark-info h4 {
      margin-bottom: 0.3375rem;
    }
  }
  
  .invoice-info {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 1.875rem;

    p {
      margin-bottom: 0.9375rem;
    }

    .date-bill-info {
      display: flex;
      gap: 2.5rem;

      > div:first-child {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      > div:last-child ul {
        margin-top: 1rem;
      }
    }
  }

  @media (min-width: 768px) {
    .invoice-mark {
      flex-direction: row;
      justify-content: space-between;
    }

    .invoice-info {
      display: grid;
      grid-template-columns: 2fr 1fr;
      margin-bottom: 2.5rem;

      .date-bill-info {
        gap: 5rem;
      }
    }
  }
`;

export default InvoiceInfo;