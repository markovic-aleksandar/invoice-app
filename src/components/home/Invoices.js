import styled from 'styled-components';
import { useAppContext } from '../../context';
import Invoice from './Invoice';

const Invoices = () => {
  const {invoicesLoading, invoices} = useAppContext();

  if (invoicesLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Wrapper>
      {invoices.map(invoice => {
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