import styled from 'styled-components';
import { formatPrice } from '../../utils/helper';

const InvoiceItemMob = ({name, quantity, price, total}) => {
  return (
    <Wrapper>
      <div>
        <h4>{name}</h4>
        <h4>{quantity} x {formatPrice(price)}</h4>
      </div>
      <h4>{formatPrice(total)}</h4>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:first-child) {
    margin-top: 1.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    h4:last-child {
      color: #7e88c3;
    }
  }
`;

export default InvoiceItemMob;