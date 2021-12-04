import styled from 'styled-components';
import { BsGithub, MdEmail } from 'react-icons/all';

const Container = styled.div`
  width: 100%;
  height: 300px;
  border-top: 1px solid #e8e8e8;
  margin-top: 150px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-evenly;
  margin-bottom: 50px;
`;

const Text = styled.div`
  font-weight: 300;
  margin: 50px;
`;

const Footer = () => {
  return (
    <Container>
      <Flex>
        <Text> Contact </Text>
        <Icons>
          <a href='https://github.com/jeonbyeongmin'>
            <BsGithub />
          </a>
          <a href='https://github.com/jeonbyeongmin'>
            <MdEmail />
          </a>
        </Icons>
        <Text>&copy; {new Date().getFullYear()} Gonggu-Gunggu</Text>
      </Flex>
    </Container>
  );
};

export default Footer;
