import styled from 'styled-components';
import { FilterInvoice, Invoices } from '../components';

const Home = () => {
  return (
    <Wrapper>
      <section className="main-section">
        <div className="main-container">
          <FilterInvoice />
          <Invoices />
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`

`;

export default Home;