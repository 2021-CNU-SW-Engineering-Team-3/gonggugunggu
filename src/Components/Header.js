/* eslint-disable import/no-anonymous-default-export */
import { React, useRef, useState } from "react";
import { Link, withRouter, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0px 200px;
  background-color: #fff;
  box-shadow: 0 0 10px -5px #303030;
  z-index: 1000; //z축 순서 스크롤해도 최상위 유지

  @media only screen and (max-width: 900px) {
    width: 900px;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
`;

const Gnb = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const NavLink = styled.div`
  margin-left: 40px;
  font-weight: 800;
  font-size: 18px;

  &:hover {
    padding-bottom: 2px;
  }
`;

const SeachBox = styled.input`
  margin-left: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
`;

const MyHeader = ({ isLoggedIn, avataURL }) => {
  return (
    <>
      <Header>
        <FlexBox className="inner">
          <Gnb>
            <HeaderLeft>
              <div>logo</div>
              <SeachBox />
            </HeaderLeft>

            <NavGroup>
              <NavLink>
                {isLoggedIn ? (
                  <>{/* <Avata avataURL={avataURL} /> */}</>
                ) : (
                  <Link to={"/Auth"} onClick={() => {}}>
                    로그인
                  </Link>
                )}
              </NavLink>
            </NavGroup>
          </Gnb>
        </FlexBox>
      </Header>
    </>
  );
};

export default MyHeader;
