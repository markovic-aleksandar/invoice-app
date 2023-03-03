import styled from 'styled-components';
import { useAppContext } from '../../context';
import Invoice from './Invoice';
// import EmptyContent from '../EmptyContent';
import { Loader, EmptyContent } from '../index';

const Invoices = () => {
  const {invoicesLoading, filteredInvoices} = useAppContext();

  if (invoicesLoading) {
    return <Loader />
  }

  if (filteredInvoices.length < 1) {
    return <EmptyContent />
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