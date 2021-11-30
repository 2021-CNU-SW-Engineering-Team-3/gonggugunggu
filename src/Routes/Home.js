import { useEffect } from 'react';
import styled from 'styled-components';
import { authService } from '../fbase';

const Text = styled.div`
  margin: 30px;
`;

const Home = () => {
  useEffect(() => {
    console.log(authService.currentUser);
  }, []);
  return <Text>home</Text>;
};

export default Home;
