import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Loader, InvoiceControl, InvoiceInfo } from '../components';
import { useAppContext } from '../context';
import iconArrowLeft from '../images/icon-arrow-left.svg';

const SingleInvoice = () => {
  const {id} = useParams();
  const navigation = useNavigate();
  const {invoicesLoading, invoices, setCurrentInvoice} = useAppContext();

  const handleBack = () => {
    setCurrentInvoice(null);
    navigation('/');
  }

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  // remove current invoice by clicking on back browser arrow
  useEffect(() => {
    window.addEventListener('popstate', () => setCurrentInvoice(null));
  }, [setCurrentInvoice]);

  useEffect(() => {
    // get current invoice
    const currnetInvoice = invoices.find(invoice => invoice.id === id);

    // set current invoice
    setCurrentInvoice(currnetInvoice);

    // eslint-disable-next-line
  }, [invoices, id]);

  if (invoicesLoading) {
    return (
      <Wrapper>
        <section className="main-section">
          <div className="main-container">
            <Loader />
          </div>
        </section>  
      </Wrapper>
    )
  }
  
  const invoice = invoices.find(invoice => invoice.id === id);

  return (
    <Wrapper>
      <section className="main-section">
        <div className="main-container">
          <button type="button" className="btn-back" onClick={handleBack}>
            <img src={iconArrowLeft} alt="arrow left" />
            Go back
          </button>
          <InvoiceControl {...invoice} />
          <InvoiceInfo {...invoice} />
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .btn-back {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--clr-label);
    background: transparent;
    margin-bottom: 2rem;
    border: none;
    cursor: pointer;
  }
`;

export default SingleInvoice;