/*
 * import for react
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

/*
 * import for firebase
 */
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../fbase';

/*
 * Keyframes
 */
const appear = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

/*
 * Styled Component
 */
const LoginWrap = styled.div`
  min-height: calc(100vh - 190px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  animation: ${appear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 370px;
  padding-bottom: 70px;
`;

const Logo = styled.div`
  font-size: 70px;
  font-weight: 700;
  color: black;
  margin-bottom: 20px;
  border-bottom: 6px solid black;
  width: 100%;
  padding: 30px;
  text-align: center;

  @media only screen and (max-width: 800px) {
    font-size: 50px;
  }
`;

const TextField = styled.input`
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 15px;
  padding: 20px 24px;
  width: 100%;

  &:focus {
    outline: none;
    border: 1.5px solid black;
  }
`;

const Button = styled.button`
  background-color: ${({ color }) => color};
  padding: 12px 50px;
  justify-content: center;
  margin: 8px 0;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;

  &.signin {
    font-size: 20px;
    color: white;
  }

  &.signup {
    font-size: 16;
    color: black;
  }

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.1s;
  }
`;

const Error = styled.div`
  color: red;
`;

/*
 * Auth Component
 */
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSignClick = () => {
    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const onTextChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  return (
    <LoginWrap>
      <LoginBox>
        <Logo>LOGIN</Logo>
        <TextField placeholder={'이메일'} id='email' name='email' onChange={onTextChange} />
        <TextField
          type='password'
          placeholder={'비밀번호'}
          id='password'
          name='password'
          onChange={onTextChange}
        />
        <Error>{error}</Error>
        <Button className='signin' color={'black'} onClick={onSignClick}>
          LOGIN
        </Button>
        <Link to={'/register'} style={{ width: '100%' }}>
          <Button className='signup'>회원가입</Button>
        </Link>
      </LoginBox>
    </LoginWrap>
  );
};
export default Auth;
