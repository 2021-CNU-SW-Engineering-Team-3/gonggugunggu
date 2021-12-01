/*
 * import for react
 */
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Container, Row, Col } from 'react-bootstrap';

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
const Header = styled.header`
  position: fixed;
  top: 70px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  z-index: -1; //z축 순서 스크롤해도 최상위 유지
  transition: all ease-out 0.2s;
  opacity: 0;

  &.show {
    z-index: 1000;
    opacity: 1;
    transition: all ease-out 0.2s;
  }
  &.move {
    z-index: 1000;
    opacity: 1;
    transform: translateY(-70px);
    transition: all ease-out 0.2s;
  }

  @media only screen and (max-width: 900px) {
    width: 900px;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const Gnb = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  font-weight: 700;
`;

const Pin = styled.span`
  font-size: 30px;
  margin-right: 8px;
`;

const Text = styled.span`
  font-size: 25px;
`;

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

/*
 * Global Function
 */
const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const Home = ({ data }) => {
  const [products, setProducts] = useState(data);

  const [show, setShow] = useState(false);
  const [move, setMove] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    console.log(pageYOffset);
    const show = pageYOffset >= 100;
    const move = pageYOffset >= 120;
    setShow(show);
    setMove(move);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  return (
    <>
      <Header className={show ? (move ? 'move' : 'show') : ''}>
        <FlexBox className='inner'>
          <Gnb>
            <Pin>📌</Pin>
            <Text>공동구매</Text>
          </Gnb>
        </FlexBox>
      </Header>
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
