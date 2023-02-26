import styled from 'styled-components';
import { formatPrice } from '../../utils/helper';

const InvoiceAmount = ({total}) => {

  return (
    <Wrapper>
      <p>Amount Due</p>
      <h2>{formatPrice(total)}</h2>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  padding: 1.5rem;
  background: var(--clr-darker);
  border-radius: 0 0 10px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p, h2 {
    color: var(--white);
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export default InvoiceAmount;