/*
 * import for react
 */
import { useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Card } from 'react-bootstrap';

/*
 * import for image
 */
import { v4 } from 'uuid';

/*
 * import for firebase
 */
import { authService, db, storageService } from '../fbase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

/*
 * Styled Component
 */
const modalAppear = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const WhiteBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1002;
  animation: ${(props) =>
    props.infoToggle
      ? css`
          ${modalAppear} 0.4s cubic-bezier(0.77, 0, 0.175, 1) forwards
        `
      : ''};
`;

const ModalContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  height: 500px;
  background-color: white;
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 1004;
  border-radius: 20px;
  border: none;

  animation: ${(props) =>
    props.infoToggle
      ? css`
          ${modalAppear} 0.4s cubic-bezier(0.77, 0, 0.175, 1) forwards
        `
      : ''};
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhotoSelect = styled.input`
  display: none;
`;

const Avata = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 25px;
  margin-top: 18px;
  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s;
  }
`;

const TextSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 20px;
`;

const Name = styled.input`
  font-size: 20px;
  padding: 10px;
  margin: 15px;
  width: 75%;
  background-color: #e2e2e2;
  border-radius: 5px;
  border: none;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

const CancelButton = styled.button`
  color: red;
  font-size: 18px;
  justify-content: center;
  background-color: white;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s 0s;
  }
`;

const UserInfoModal = ({ infoToggle, setAvataURL, setUserName, userObj, onModalClick }) => {
  const [selectedImg, setSelectedImg] = useState(userObj.photoURL);
  const [tempName, setTempName] = useState(userObj.displayName);

  const uploadPhotoRef = useRef();

  const onButtonClick = async (e) => {
    try {
      let fileURL = '';
      if (selectedImg !== userObj.photoURL) {
        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const res = await uploadString(fileRef, selectedImg, 'data_url');
        fileURL = await getDownloadURL(res.ref);
      } else {
        fileURL = userObj.photoURL;
      }

      updateProfile(authService.currentUser, { photoURL: fileURL, displayName: tempName })
        .then(() => {
          console.log('user update');
          setUserName(tempName);
          setAvataURL(fileURL);
        })
        .catch((error) => {
          console.log(error);
        });

      await setDoc(
        doc(db, 'users', authService.currentUser.uid),
        {
          name: tempName,
          photoURL: fileURL,
        },
        { merge: true },
      );

      onModalClick(e);
    } catch (error) {
      console.log(error);
    }
  };

  const onPhotoClick = () => {
    uploadPhotoRef.current.click();
  };

  const onImgChange = async (e) => {
    const {
      target: { files },
    } = e;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setSelectedImg(result);
    };

    reader.readAsDataURL(file);
  };

  const onTextChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'name') setTempName(value);
  };

  return (
    <>
      <WhiteBack />
      <ModalContainer infoToggle={infoToggle}>
        <Infos>
          <PhotoSelect
            type='file'
            accept='image/*'
            ref={uploadPhotoRef}
            name='photo'
            onChange={onImgChange}
          />
          <Avata src={selectedImg} onClick={onPhotoClick} />
          <TextSpace>
            <Text>이름</Text>
            <Name
              name='name'
              autoComplete='off'
              placeholder='이름을 입력하세요'
              value={tempName}
              onChange={onTextChange}
            />
          </TextSpace>
        </Infos>
        <Buttons>
          <Button color='black' name='info' onClick={onButtonClick}>
            확인
          </Button>
          <CancelButton color='black' name='info' onClick={onModalClick}>
            취소
          </CancelButton>
        </Buttons>
      </ModalContainer>
    </>
  );
};

export default UserInfoModal;
