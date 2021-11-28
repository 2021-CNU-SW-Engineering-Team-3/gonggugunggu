import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/all';
import styled from 'styled-components';
import logo from '../Images/gonggugunggu.png';

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

const Logo = styled.img`
  width: 200px;
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
  &:hover {
    color: gray;
    padding-bottom: 2px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
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

const MyHeader = ({ isLoggedIn }) => {
  const navigation = useNavigate();

  return (
    <Header>
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
              {isLoggedIn ? <>{/* <Avata avataURL={avataURL} /> */}</> : <Link to={'/Auth'}>로그인하기</Link>}
            </NavLink>
          </NavGroup>
        </Gnb>
      </FlexBox>
    </Header>
  );
};

export default MyHeader;
