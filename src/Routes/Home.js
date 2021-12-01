/*
 * import for react
 */
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Container, Row, Col, Carousel } from 'react-bootstrap';

/*
 * import for firebase
 */
// import { authService } from '../fbase';

/*
 * import for Component
 */
import ProductCard from '../Components/ProductCard';

/*
 * Styled Component
 */
const CardAppear = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const TitleAppear = keyframes`
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
`;

const TitleContainer = styled(Container)`
  margin-top: 120px;
  animation: ${TitleAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;

  @media only screen and (max-width: 992px) {
    margin-top: 90px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 70px;
  }
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 25px;

  @media only screen and (max-width: 992px) {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 30px;
    font-weight: 800;
    margin: 0 50px;
    margin-bottom: 18px;
  }
`;

const SubTitle = styled.div`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 50px;

  @media only screen and (max-width: 992px) {
    font-size: 35px;
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 23px;
    margin: 0 50px;
    margin-bottom: 0px;
  }
`;

const CardContainer = styled(Container)`
  margin-top: 100px;
  animation: ${CardAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;

  @media only screen and (max-width: 992px) {
    margin-top: 60px;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 40px;
  }
`;

const Home = ({ data }) => {
  const [products, setProducts] = useState(data);

  return (
    <>
      <TitleContainer>
        <Title className='g-4'>📌 공동구매</Title>
        <SubTitle>가장 저렴하게 물건을 구할 수 있는 방법</SubTitle>
      </TitleContainer>
      <CardContainer>
        <Row xs={1} sm={1} md={2} lg={3} className='g-4'>
          {products.map((_, index) => {
            return (
              <Col>
                <ProductCard key={index} product={products[index]} />
              </Col>
            );
          })}
        </Row>
      </CardContainer>
    </>
  );
};

export default Home;
