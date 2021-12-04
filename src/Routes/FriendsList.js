import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import FriendCard from '../Components/FriendCard';
import ChattingModal from '../Components/ChattingModal';
import DeleteModal from '../Components/DeleteModal';

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

const Button = styled.button`
  font-size: 15px;
  padding: 12px 30px;
  color: black;
  justify-content: center;
  font-size: 18px;
  margin: 8px 0;
  width: 45%;
  border: 2px solid black;
  margin: 5px;
  border-radius: 5px;

  &:hover {
    background-color: ${({ color }) => color};
    color: white;
    transition: all ease-out 0.3s 0s;
  }
`;

const FriendsList = ({ userObj, userDocObj, fetchUser, setUserDocObj }) => {
  const [friends, setFriends] = useState(userDocObj.friends);
  const [loaded, setLoaded] = useState(false);
  const [chattingToggle, setChattingToggle] = useState(false);
  const [clickedUser, setClickedUser] = useState('');
  const [deleteToggle, setDeleteToggle] = useState(false);

  if ((friends === undefined && userDocObj.friends !== undefined) || userDocObj.friends !== friends)
    setFriends(userDocObj.friends);

  const handleModalClick = (e, value) => {
    e.preventDefault();
    !chattingToggle ? setClickedUser(value) : setClickedUser('');
    setChattingToggle((prev) => !prev);
  };

  const handleDeleteClick = (e, value) => {
    e.preventDefault();
    !deleteToggle ? setClickedUser(value) : setClickedUser('');
    setDeleteToggle((prev) => !prev);
  };

  useEffect(() => {
    fetchUser()
      .then((user) => {
        setUserDocObj(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteToggle]);

  return (
    <>
      {!loaded ? setLoaded(true) : <></>}
      <CardContainer>
        <Row xs={1} sm={1} md={2} lg={3} className='g-4'>
          {friends !== undefined && Object.values(friends).length !== 0 ? (
            Object.values(friends).map((val) => {
              return (
                <Col key={val}>
                  <FriendCard friends={val} />
                  <Button color={'black'} onClick={(e) => handleModalClick(e, val)}>
                    채팅하기
                  </Button>
                  <Button color={'black'} onClick={(e) => handleDeleteClick(e, val)}>
                    삭제하기
                  </Button>
                </Col>
              );
            })
          ) : (
            <NoFriends>친구가 없습니다.</NoFriends>
          )}
        </Row>
      </CardContainer>
      {chattingToggle === true ? (
        <ChattingModal handleModalClick={handleModalClick} opponentObj={clickedUser}></ChattingModal>
      ) : (
        ''
      )}
      {deleteToggle === true ? (
        <DeleteModal handleDeleteClick={handleDeleteClick} opponentObj={clickedUser}></DeleteModal>
      ) : (
        ''
      )}
    </>
  );
};

export default FriendsList;
