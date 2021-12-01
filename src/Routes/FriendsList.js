import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import FriendCard from '../Components/FriendCard';

const CardAppear = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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

const NoFriends = styled.div``;

const FriendsList = ({ userObj, userDocObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [friends, setFriends] = useState(userDocObj.friends);
  const [loaded, setLoaded] = useState(false);
  if (friends === undefined && userDocObj.friends !== undefined) setFriends(userDocObj.friends);

  return (
    <>
      {!loaded ? setLoaded(true) : <></>}
      <CardContainer>
        <Row xs={1} sm={1} md={2} lg={3} className='g-4'>
          {friends !== undefined && Object.values(friends).length !== 0 ? (
            Object.values(friends).map((val) => {
              return (
                <Col>
                  <FriendCard key={val} friends={val} />
                </Col>
              );
            })
          ) : (
            <NoFriends>친구가 없습니다.</NoFriends>
          )}
        </Row>
      </CardContainer>
    </>
  );
};

export default FriendsList;
