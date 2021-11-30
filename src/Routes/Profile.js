/*
 * import for react
 */
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

/*
 * import for firebase
 */
import { authService, db } from '../fbase';
import { doc, deleteDoc } from 'firebase/firestore';
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
  justify-content: space-between;
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

const Profile = ({ userObj, userDocObj }) => {
  const [infoToggle, setInfoToggle] = useState(false);
  const [userName, setUserName] = useState(userObj.displayName);
  const [avataURL, setAvataURL] = useState(userObj.photoURL);

  const navigate = useNavigate();

  const onResignClick = () => {
    const user = authService.currentUser;

    if (window.confirm('정말 회원 탈퇴하시겠습니까?') === true) {
      const password = window.prompt('비밀번호를 입력해주세요');
      const credential = EmailAuthProvider.credential(user.email, password);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          deleteUser(user)
            .then(async () => {
              await deleteDoc(doc(db, 'users', user.uid));
            })
            .catch((error) => {
              console.log(error);
            });
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onModalClick = (e) => {
    const {
      target: { name },
    } = e;

    if (name === 'info' || e.target.getAttribute('name') === 'info') {
      setInfoToggle((prev) => !prev);
    }
  };

  return (
    <ProfileWrap>
      {userDocObj.role === 'user' ? (
        <>
          <Infos>
            <Avata src={avataURL} />
            <Name>{userName}</Name>
            <Email>{userObj.email}</Email>
            <Info>
              백마지수 :
              {userDocObj.evaluateCount > 0
                ? Math.round((userDocObj.totalRate / userDocObj.evaluateCount) * 10) / 10
                : 0}
            </Info>
          </Infos>
          <Buttons>
            <Button color='black' name='info' onClick={onModalClick}>
              정보 수정
            </Button>
            <ResignButton onClick={onResignClick}>회원 탈퇴</ResignButton>
          </Buttons>
        </>
      ) : userDocObj.role === 'admin' ? (
        <>
          <Infos>
            <Avata src={userObj.photoURL} />
            <Name>{userObj.displayName}</Name>
            <Email>{userObj.email}</Email>
          </Infos>
          <Buttons>
            <Button color='black' name='info' onClick={onModalClick}>
              정보 수정
            </Button>
            <ResignButton onClick={onResignClick}>회원 탈퇴</ResignButton>
          </Buttons>
        </>
      ) : (
        //TODO: 추후 로딩 애니메이션 넣어야함
        'Loading'
      )}
      {infoToggle === true ? (
        <UserInfoModal
          infoToggle={infoToggle}
          setAvataURL={setAvataURL}
          setUserName={setUserName}
          userObj={userObj}
          onModalClick={onModalClick}
        />
      ) : null}
    </ProfileWrap>
  );
};

export default Profile;
