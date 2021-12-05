import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import unknownPersonImg from '../Images/Unknown_person.jpeg';
import { doc, updateDoc, deleteField, arrayUnion, getDoc } from 'firebase/firestore';
import { authService, db } from '../fbase';

const CardContainer = styled(Card)`
  height: 100px;
  border: none;
  border-radius: 20px;
  box-shadow: 5px 10px 30px -2px #e2e2e2;
  margin-bottom: 40px;
  margin-left: 5px;
  margin-right: 5px;
  bottom: 0px;
  transition: all ease-out 0.2s 0s;
  color: black;

  &:hover {
    bottom: 10px;
    box-shadow: 5px 10px 40px 10px #e2e2e2;
    transition: all ease-out 0.2s 0s;
  }

  @media only screen and (max-width: 992px) {
    height: 100px;
  }
  @media only screen and (max-width: 768px) {
    margin: 5px 50px;
  }
`;

const CardImage = styled(Card.Img)`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 25px 25px 0 0;
`;

const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
`;

const CardTitle = styled(Card.Title)`
  font-size: 30px;
  font-weight: 700;
  @media only screen and (max-width: 992px) {
    font-size: 28px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

const CardDescription = styled(Card.Text)`
  font-size: 20px;
  @media only screen and (max-width: 992px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RowFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  justify-content: center;
  font-size: 18px;
  width: 30px;
  height: 30px;
  border-radius: 5px;

  &:hover {
    background-color: ${({ color }) => color};
    color: white;
    transition: all ease-out 0.3s 0s;
  }
`;

const AcceptButton = styled(Button)`
  border: 2px solid green;
  color: green;
`;

const RefuseButton = styled(Button)`
  border: 2px solid red;
  color: red;
`;

const FriendCard = ({ friend, userDocObj }) => {
  const user = authService.currentUser;

  const handleAcceptClick = async (e, value) => {
    e.preventDefault();
    const userRef = doc(db, 'users', user.uid);
    const opponentRef = doc(db, 'users', value.id);

    const userSnap = await getDoc(userRef);
    const opponentSnap = await getDoc(opponentRef);

    if (userSnap.data().waitingFriend !== undefined && opponentSnap.data().waitingFriend !== undefined) {
      if (
        userSnap.data().waitingFriend.requested !== undefined &&
        opponentSnap.data().waitingFriend.wait !== undefined
      ) {
        //user의 친구에 상대방 추가
        await updateDoc(userRef, {
          ['friends.' + value.id]: arrayUnion({
            id: value.id,
            name: value.name,
            totalRate: value.totalRate,
            photoURL: value.photoURL,
          }),
        });

        //user의 친구 신청목록에서 상대방 삭제
        await updateDoc(userRef, {
          ['waitingFriend.requested.' + value.id]: deleteField(),
        });

        //상대방의 친구에 user 추가
        await updateDoc(opponentRef, {
          ['friends.' + user.uid]: arrayUnion({
            id: user.uid,
            name: user.displayName,
            totalRate: userDocObj.totalRate,
            photoURL: user.photoURL,
          }),
        });

        //상대방의 친구 대기목록에서 user 삭제
        await updateDoc(opponentRef, {
          ['waitingFriend.wait.' + user.uid]: deleteField(),
        });
      }
    }
  };
  const handleRefuseClick = async (e, value) => {
    e.preventDefault();

    const userRef = doc(db, 'users', user.uid);
    const opponentRef = doc(db, 'users', value.id);

    //user의 친구 대기목록에서 상대방 삭제
    await updateDoc(userRef, {
      ['waitingFriend.requested.' + value.id]: deleteField(),
    });

    //상대방의 친구 신청목록에서 user 삭제
    await updateDoc(opponentRef, {
      ['waitingFriend.wait.' + user.uid]: deleteField(),
    });
  };
  return (
    <CardContainer>
      <RowFlex>
        {friend[0].photoURL === null || friend[0].photoURL === '' ? (
          <CardImage variant='top' src={unknownPersonImg} />
        ) : (
          <CardImage variant='top' src={friend[0].photoURL} />
        )}
        <CardBody>
          <ColumnFlex>
            <CardTitle>{friend[0].name}</CardTitle>
            <CardDescription>백마지수 : {friend[0].totalRate}</CardDescription>
          </ColumnFlex>
          <ColumnFlex>
            <AcceptButton color={'green'} onClick={(e) => handleAcceptClick(e, friend[0])}>
              V
            </AcceptButton>
            <RefuseButton color={'red'} onClick={(e) => handleRefuseClick(e, friend[0])}>
              X
            </RefuseButton>
          </ColumnFlex>
        </CardBody>
      </RowFlex>
    </CardContainer>
  );
};

export default FriendCard;
