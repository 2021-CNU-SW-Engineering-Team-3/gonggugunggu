/*
 * import for react
 */
import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

/*
 * import for firebase
 */
import { authService } from '../fbase';

/*
 * import for Component
 */
import ProductCard from '../Components/ProductCard';

/*
 * import for Image
 */
import coffee from '../Images/home.png';

/*
 * Keyframes
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
  z-index: -1;
  transition: all ease-out 0s;

  &.show {
    z-index: 999;
    transition: all ease-out 0.2s;
  }
  &.move {
    z-index: 999;
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
  font-size: 20px;
`;

const TitleContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  margin-top: 120px;
  justify-content: space-between;
  align-items: flex-end;
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

const PostingButton = styled.button`
  background-color: #ededed;
  font-size: 16px;
  font-weight: 700;
  width: 140px;
  height: 45px;
  margin-bottom: 50px;
  margin-right: 50px;
  border-radius: 25px;
  transition: all ease-out 0.2s;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s;
  }
  &:focus {
    opacity: 1;
    background-color: lightgray;
    transition: all ease-out 0.2s;
  }

  @media only screen and (max-width: 992px) {
    font-size: 15px;
    font-weight: 600;
    margin-left: 20px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0px;
  }
`;

const ImageContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 60%;
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

/*
 * Home Component
 */
const Home = ({ data }) => {
  const user = authService.currentUser;

  const navigation = useNavigate();
  const documentRef = useRef(document);

  const [show, setShow] = useState(false);
  const [move, setMove] = useState(false);
  const [pageY, setPageY] = useState(0);

  // Scroll Event
  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const show = pageYOffset >= 170;
    const move = pageYOffset >= 200 && deltaY >= 0;
    setShow(show);
    setMove(move);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY, throttleScroll]);

  // Click Event
  const handlePostingClick = () => {
    const user = authService.currentUser;
    if (user.emailVerified === true) {
      navigation('/posting');
    } else {
      alert('이메일 인증된 회원만 이용할 수 있습니다');
    }
    // TODO: develop code
    navigation('/posting');
  };

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
        {user ? (
          <>
            <div>
              <Title className='g-4'>📌 공동구매</Title>
              <SubTitle>가장 저렴하게 물건을 구할 수 있는 방법</SubTitle>
            </div>
            <PostingButton onClick={handlePostingClick}>게시글 작성</PostingButton>
          </>
        ) : (
          <>
            <div>
              <Title className='g-4'>📌 공동구매</Title>
              <SubTitle>로그인하여 가장 저렴하게 물건을 구해보세요!</SubTitle>
            </div>
            <Link to={'/auth'}>
              <PostingButton>로그인 하기</PostingButton>
            </Link>
          </>
        )}
      </TitleContainer>

      {!user ? (
        <ImageContainer>
          <Image src={coffee} />
        </ImageContainer>
      ) : (
        ''
      )}

      <CardContainer>
        <Row xs={1} sm={1} md={2} lg={3} className='g-4'>
          {user && data
            ? data.map((_, index) => {
                return (
                  <Col key={index}>
                    <ProductCard product={data[index]} />
                  </Col>
                );
              })
            : ''}
        </Row>
      </CardContainer>
    </>
  );
};

export default Home;
