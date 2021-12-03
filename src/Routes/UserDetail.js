/*
 * import for react
 */
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';

/*
 * import for firebase
 */
import { authService, db } from '../fbase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

/*
 * import for firebase
 */
import UserInfoModal from '../Components/UserInfoModal';

/*
 * Styled Component
 */
const profileAppear = keyframes`
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
`;

const ProfileWrap = styled.div`
  animation: ${profileAppear} 0.6s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 150px;
  padding: 40px;
  border-radius: 20px;
`;

const Avata = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Name = styled.div`
  font-size: 45px;
  font-weight: 700;
  margin: 15px;
`;

const Email = styled.div`
  font-size: 20px;
  font-weight: 200;
  margin: 5px;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
`;

const Info = styled.div`
  font-size: 20px;
  font-weight: 200;
  margin: 10px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 180px;
`;

const Button = styled.button`
  color: black;
  justify-content: center;
  font-size: 18px;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.3s 0s;
  }
`;

const ResignButton = styled.button`
  color: red;
  font-size: 18px;
  justify-content: center;

  background-color: white;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s 0s;
  }
`;

const UserDetail = ({ data }) => {
  const [infoToggle, setInfoToggle] = useState(false);
  // const [userName, setUserName] = useState(userObj.displayName);
  // const [avataURL, setAvataURL] = useState(userObj.photoURL);
  const { id } = useParams();
  const [userId, setUserId] = useState(id);
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
    if (window.confirm('정말 회원 탈퇴하시겠습니까?') === true) {
      const password = window.prompt('비밀번호를 입력해주세요');
      // const credential = EmailAuthProvider.credential(user.email, password);

      const docRef = doc(db, 'users', user.id);
      deleteDoc(docRef);

      navigate('/userList');
    }
  };

  const onModalClick = (e) => {
    // const {
    //   target: { name },
    // } = e;

    // if (name === 'info' || e.target.getAttribute('name') === 'info') {
    //   setInfoToggle((prev) => !prev);
    // }
  };

  return (
    <ProfileWrap>
      <>
        <Infos>
          <Avata src={userPhotoURL} />
          <Name>{userName}</Name>
          <Email>{userEmail}</Email>
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