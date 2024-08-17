import styled from 'styled-components';
import InvoiceItemMob from './InvoiceItemMob';
import InvoiceItemDesk from './InvoiceItemDesk';
import useScreen from '../../useScreen';

const InvoiceItems = ({items}) => {
  const isMobile = useScreen();
 
  return (
    <Wrapper>
      {isMobile ?
        items.map((item, index) => {
          return <InvoiceItemMob key={index} {...item} />
        })
        :
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>QTY.</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return <InvoiceItemDesk key={index} {...item} />
            })}
          </tbody>
        </table>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1.5rem;
  background: var(--clr-lightBckg);
  border-radius: 10px 10px 0 0;

  table {
    width: 100%;

    thead {
      tr::after {
        content: "";
        display: table-row;
        height: 2rem;
      }
      
      th {
        font-size: 0.6875rem;
        font-weight: 500;
        text-align: right;
        color: var(--clr-text);
  
        &:first-child {
          text-align: left;
        }

        &:nth-of-type(2) {
          text-align: center;
        }
      }
    }

    tbody {
      tr::after {
        content: "";
        display: table-row;
        height: 2.2rem;
      }

      td {
        font-size: 0.75rem;
        font-weight: 600;
        text-align: right;
        color: var(--clr-text);
  
        &:first-child, &:last-child {
          color: var(--clr-header);
        }
  
        &:first-child {
          text-align: left;
        }

        &:nth-of-type(2) {
          text-align: center;
        }
      }
    }
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export default InvoiceItems;