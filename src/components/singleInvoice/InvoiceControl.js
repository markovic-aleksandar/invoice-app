import styled from 'styled-components';
import { useAppContext } from '../../context';

const InvoiceControl = ({id, status}) => {
  const {toggleAddEditBar, toggleDeleteModal, updateStatus} = useAppContext();

  return (
    <Wrapper>
      <div className="invoice-status">
        <p>Status</p>
        <div className={`status-label ${status}`}>
          <span></span>
          {status}
        </div>
      </div>
      <div className="invoice-action">
        <button type="button" className="btn btn-grey" onClick={toggleAddEditBar}>Edit</button>
        <button type="button" className="btn btn-red" onClick={toggleDeleteModal}>Delete</button>
        {status === 'pending' && <button 
          type="button" 
          className="btn btn-purple"
          onClick={() => updateStatus(id)}
          >
            Mark as Paid
          </button>
        }
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  background: var(--clr-holder);
  padding: 1.5rem;
  box-shadow: 0 10px 10px -10px rgba(72, 84, 159, 0.1);
  border-radius: 10px;
  margin-bottom: 1.5rem;

  .invoice-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .invoice-action {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background: var(--clr-holder);
    display: flex;
    align-items: center;
    justify-content: center;

    button:not(:first-child) {
      margin-left: 15px;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .invoice-action {
      position: relative;
      justify-content: flex-end;
      height: auto;
    }
  }
`;

export default InvoiceControl;