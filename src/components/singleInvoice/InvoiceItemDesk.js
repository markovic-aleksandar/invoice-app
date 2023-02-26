import { formatPrice } from '../../utils/helper';

const InvoiceItemDesk = ({name, quantity, price, total}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{formatPrice(price)}</td>
      <td>{formatPrice(total)}</td>
    </tr>
  );
}

export default InvoiceItemDesk;