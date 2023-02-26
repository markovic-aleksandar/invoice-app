import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context';

const DeleteModal = () => {
  const navigation = useNavigate();
  const {currentInvoice: {id}, toggleDeleteModal, deleteInvoice} = useAppContext();

  const deleteModalClose = e => {
    e.stopPropagation();
    if (e.target.classList.contains('delete-modal')) {
      toggleDeleteModal();
    }
  }

  const handleDeleteInvoice = () => {
    deleteInvoice(id);
    navigation('/');
  }

  return (
    <Wrapper className="delete-modal" onClick={deleteModalClose}>
      <div className="delete-holder">
        <h1>Confirm Deletion</h1>
        <p>Are you sure you want to delete invoice #{id}? This action cannot be undone.</p>
        <div className="btns-container">
          <button type="button" className="btn btn-grey" onClick={toggleDeleteModal}>Cancel</button>
          <button type="button" className="btn btn-red" onClick={handleDeleteInvoice}>Delete</button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2;

  .delete-holder {
    width: 90%;
    max-width: 480px;
    padding: 2rem;
    background: var(--clr-holder);
    border-radius: 10px;

    p {
      margin: 0.9375rem 0 1.25rem;
    }

    .btns-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.9375rem;
    }
  }

  @media (min-width: 768px) {
    .delete-holder {
      padding: 3rem;
    }
  }
`;

export default DeleteModal;