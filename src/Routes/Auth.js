import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.div`
  font-size: 70px;
  font-weight: 700;
  color: black;
  margin-bottom: 30px;

  @media only screen and (max-width: 800px) {
    font-size: 50px;
  }
`;

const TextField = styled.input`
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 15px;
  padding: 10px 20px;
  width: 100%;
  height: 50px;

  &:focus {
    outline: none;
    border: 1.5px solid black;
  }
`;

const Button = styled.button`
  background-color: ${({ color }) => color};
  padding: 12px 50px;
  color: white;
  justify-content: center;
  font-size: 18px;
  margin: 8px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
`;

const LoginWrap = styled.div`
  min-height: calc(100vh - 190px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 370px;
  padding-bottom: 70px;
`;

const Auth = () => {
  return (
    <LoginWrap>
      <LoginBox>
        <Logo>LOGIN</Logo>
        <TextField placeholder={'이메일'} id='email' name='email' />
        <TextField type='password' placeholder={'비밀번호'} id='password' name='password' />

        {<div style={{ color: 'red' }}>{}</div>}

        <Button color={'black'} name='signin'>
          LOGIN
        </Button>

        <Link to={'/Register'} style={{ width: '100%' }}>
          <Button color='#8E8E8E' name='signup'>
            회원가입
          </Button>
        </Link>

        <Button color='#8E8E8E' name='google'>
          Continue with Google
        </Button>
        <Button color='#8E8E8E' name='github'>
          Continue with Github
        </Button>
      </LoginBox>
    </LoginWrap>
  );
};
export default Auth;
