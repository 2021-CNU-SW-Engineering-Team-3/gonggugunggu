/*
 * import for react
 */
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

/*
 * import for firebase
 */
import { db } from '../fbase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

/*
 * import for firebase
 */
import UserInfoModal from '../Components/UserInfoModal';

/*
 * Styled Component
 */
const Header = styled.header`
  position: fixed;
  top: 70px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  z-index: -1;
  transition: all ease-out 0s;
  /* opacity: 0; */

  &.show {
    z-index: 999;
    opacity: 1;
    transition: all ease-out 0.2s;
  }
  &.move {
    z-index: 999;
    opacity: 1;
    transform: translateY(-70px);
    transition: all ease-out 0.2s;
  }

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
  width: 100%;

  font-weight: 700;
`;

const Pin = styled.span`
  font-size: 30px;
  margin-right: 8px;
`;

const Text = styled.span`
  font-size: 20px;
`;
const TitleAppear = keyframes`
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
`;

const TitleContainer = styled(Container)`
  margin-top: 120px;
  animation: ${TitleAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;

  @media only screen and (max-width: 992px) {
    margin-top: 90px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 70px;
  }
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 25px;

  @media only screen and (max-width: 992px) {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 30px;
    font-weight: 800;
    margin: 0 50px;
    margin-bottom: 18px;
  }
`;

const SubTitle = styled.div`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 50px;

  @media only screen and (max-width: 992px) {
    font-size: 35px;
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 23px;
    margin: 0 50px;
    margin-bottom: 0px;
  }
`;
const profileAppear = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const ProfileWrap = styled(Card)`
  animation: ${profileAppear} 0.6s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 80px;
  padding: 40px;
  border-radius: 20px;
  border: none;
`;

const Avata = styled(Card.Img)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 30px;

  @media only screen and (max-width: 992px) {
    width: 230px;
    height: 230px;
  }
  @media only screen and (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Name = styled(Card.Title)`
  font-size: 50px;
  font-weight: 700;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  font-size: 23px;
  font-weight: 200;
  margin-bottom: 5px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 180px;
`;

const Button = styled.button`
  color: black;
  justify-content: center;
  font-size: 20px;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.3s 0s;
  }
`;

const ResignButton = styled.button`
  color: red;
  font-size: 20px;
  justify-content: center;

  background-color: white;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s 0s;
  }
`;

const UserDetail = () => {
  const { id } = useParams();
  const [userPhotoURL, setUserPhotoURL] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
  
    if(docSnap.exists()) {
      console.log("documenet data : " , docSnap.data().id);
      setUserPhotoURL(docSnap.data().photoURL);
      setUserEmail(docSnap.data().email);
      setUserName(docSnap.data().name);
      setUser(docSnap.data());
    }
    else{
      console.log('no such document');
    }
  }, []);

  const navigate = useNavigate();

  const onResignClick = () => {
    if (window.confirm('정말 회원 삭제하시겠습니까?') === true) {
      const docRef = doc(db, 'users', user.id);
      deleteDoc(docRef);

      navigate('/userList');
    }
  };

  return (
    <ProfileWrap>
      <>
        <Infos>
          <Avata src={userPhotoURL} />
          <Name>{userName}</Name>
          <Info>{userEmail}</Info>
        </Infos>
        <Buttons>
          {/* <Button color='black' name='info' onClick={onModalClick}>
            정보 수정
          </Button> */}
          <ResignButton onClick={onResignClick}>회원 탈퇴</ResignButton>
        </Buttons>
      </>
       
      {/* {infoToggle === true ? (
        <UserInfoModal
          infoToggle={infoToggle}
          setAvataURL={setAvataURL}
          setUserName={setUserName}
          userObj={userObj}
        />
      ) : null} */}
    </ProfileWrap>
  );
};

export default UserDetail;