/*
 * import for react
 */

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/all';
import styled from 'styled-components';
import Avata from './AvataDropdown.js';

/*
 * import for image
 */
import logo from '../Images/gonggugunggu.png';

/*
 * Styled Component
 */
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  z-index: 1000; //z축 순서 스크롤해도 최상위 유지
  transition: all ease-out 0.2s;

  &.show {
    border-bottom: 1px solid #e8e8e8;
  }
  &.hide {
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
  justify-content: space-between;
  width: 100%;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
`;

const Textfield = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-left: 40px;
  height: 40px;
  width: 350px;
  border: 1px solid lightgray;
  border-radius: 5px;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const SeachBox = styled.input`
  height: 35px;
  width: 200px;
  border: none;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const NavLink = styled.div`
  margin-left: 40px;
  font-weight: 500;
  font-size: 16px;
`;

const Text = styled.div`
  &:hover {
    opacity: 0.7;
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
 * MyHeader Component
 */
const MyHeader = ({ isLoggedIn, userObj, userDocObj }) => {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const show = deltaY !== 0;
    const hide = pageYOffset >= 150 && deltaY >= 0;
    setShow(show);
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  return (
    <Header className={show ? (hide ? 'hide' : 'show') : ''}>
      <FlexBox className='inner'>
        <Gnb>
          <HeaderLeft>
            <Logo
              src={logo}
              onClick={() => {
                navigation('/');
              }}
            />
            <Textfield>
              <SeachBox placeholder='물품명을 입력하여 검색해보세요!' />
              <AiOutlineSearch />
            </Textfield>
          </HeaderLeft>
          <NavGroup>
            <NavLink>
              {isLoggedIn ? (
                <Avata userObj={userObj} userDocObj={userDocObj} />
              ) : (
                <Text>
                  <Link to={'/auth'}>로그인하기</Link>
                </Text>
              )}
            </NavLink>
          </NavGroup>
        </Gnb>
      </FlexBox>
    </Header>
  );
};

export default MyHeader;
