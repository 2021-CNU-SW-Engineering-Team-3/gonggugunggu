import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { authService, rt_db, db } from '../fbase';
import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { ref, child, get, update } from 'firebase/database';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const ModalContainer = styled.div`
  flex-direction: column;
  width: 600px;
  height: 200px;
  background-color: white;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1002;
  border-radius: 20px;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  box-shadow: 1px 1px 15px -2px grey;
`;

const Button = styled.button`
  font-size: 15px;
  padding: 12px 50px;
  color: black;
  justify-content: center;
  font-size: 18px;
  margin: 8px 0;
  width: 40%;
  border: 2px solid black;
  margin: 10px;
  border-radius: 5px;

  &:hover {
    background-color: ${({ color }) => color};
    color: white;
    transition: all ease-out 0.4s 0s;
  }
`;

const Title = styled.div`
  font-size: 30px;
  position: absolute;
  left: 140px;
  top: 50px;
  font-weight: 700;
`;

const ButtonSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  width: 95%;
`;

const DeleteModal = ({ handleDeleteClick, opponentObj }) => {
  const [roomKey, setRoomKey] = useState(null);

  const user = authService.currentUser;

  const getRoomKey = () => {
    const dbRef = ref(rt_db);
    let roomKey = user.uid + opponentObj.id;
    get(child(dbRef, 'messages/' + roomKey)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot);
      } else {
        roomKey = opponentObj.id + user.uid;
        get(child(dbRef, 'messages/' + roomKey)).then((snapshot2) => {
          if (snapshot2.val() === null || snapshot2.val() === undefined) {
            return null;
          }
        });
      }
      setRoomKey(roomKey);
    });
  };

  const handleCancelButton = async (e) => {
    handleDeleteClick(await e);
  };

  const handleDeleteFriendButton = async (e) => {
    //서로의 친구 목록에서 삭제
    deleteFriendsList();
    //서로의 채팅 목록도 삭제
    deleteChatting();

    handleDeleteClick(await e);
  };

  const deleteFriendsList = async () => {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      ['friends.' + opponentObj.id]: deleteField(),
    });

    const opponentUserRef = doc(db, 'users', opponentObj.id);
    updateDoc(opponentUserRef, {
      ['friends.' + user.uid]: deleteField(),
    });
  };

  const deleteChatting = async () => {
    if (roomKey === null) {
      //메시지 이력 x
      return;
    }
    const dbRef = ref(rt_db);
    const updates = {};
    updates['/messages/' + roomKey] = null;
    updates['/roomUsers/' + roomKey] = null;
    await update(dbRef, updates);
  };

  useEffect(() => {
    getRoomKey();
  }, []);

  return (
    <>
      <Background onClick={handleCancelButton} />
      <ModalContainer>
        <Title>{opponentObj.name}을(를) 친구에서 삭제</Title>
        <ButtonSpace>
          <Button color='black' onClick={handleDeleteFriendButton}>
            삭제하기
          </Button>
          <Button color='black' onClick={handleCancelButton}>
            나가기
          </Button>
        </ButtonSpace>
      </ModalContainer>
    </>
  );
};

export default DeleteModal;
