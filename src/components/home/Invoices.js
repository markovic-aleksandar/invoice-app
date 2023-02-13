import styled from 'styled-components';
import { useAppContext } from '../../context';
import Invoice from './Invoice';

const Invoices = () => {
  const {invoicesLoading, filteredInvoices} = useAppContext();

  if (invoicesLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Wrapper>
      {filteredInvoices.map(invoice => {
        return <Invoice key={invoice.id} {...invoice} />
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Invoices;