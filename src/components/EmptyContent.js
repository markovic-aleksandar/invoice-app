import styled from 'styled-components';
import illustrationEmptyImage from '../images/illustration-empty.svg';

const EmptyContent = () => {
  return (
    <Wrapper>
      <img src={illustrationEmptyImage} alt="illustration empty" />
      <div>
        <h2>There is nothing here.</h2>
        <p>Create an invoice by clicking the <br /> <b>New Invoice</b> button and get started</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    margin: 2.1875rem 0 1.25rem;
  }
`;

export default EmptyContent;