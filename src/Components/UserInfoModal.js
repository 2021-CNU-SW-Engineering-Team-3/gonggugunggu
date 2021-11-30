/*
 * import for react
 */
import { useState, useRef } from 'react';
import styled from 'styled-components';

/*
 * import for image
 */
import { v4 } from 'uuid';

/*
 * import for firebase
 */
import { authService, db, storageService } from '../fbase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

/*
 * Styled Component
 */
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;

const ModalContainer = styled.div`
  animation: modalAppear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 700px;
  background-color: white;
  padding: 40px;
  z-index: 1003;
  position: fixed;
  border-radius: 20px;

  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-size: 30px;
  position: absolute;
  left: 50px;
  top: 50px;
  font-weight: 700;
`;

const PhotoSelect = styled.input`
  display: none;
`;

const Avata = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 25px;
  margin-top: 120px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  font-size: 18px;
  color: white;
  background-color: black;
  padding: 12px 50px;
  margin: 8px 0;
  width: 40%;
  height: 50px;
  margin: 5px;
  border-radius: 5px;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s;
  }
`;

const CancelButton = styled.button`
  font-size: 18px;
  color: white;
  padding: 12px 50px;
  margin: 8px 0;
  width: 40%;
  height: 50px;
  margin: 5px;
  color: black;
  background-color: white;
  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s;
  }
`;

const UserInfoModal = ({ setAvataURL, setUserName, userObj, onModalClick }) => {
  const [selectedImg, setSelectedImg] = useState(userObj.photoURL);
  const [tempName, setTempName] = useState(userObj.displayName);

  const uploadPhotoRef = useRef();

  const onButtonClick = async (e) => {
    try {
      console.log(userObj.uid);
      console.log(selectedImg);

      if (selectedImg !== userObj.photoURL) {
        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const res = await uploadString(fileRef, selectedImg, 'data_url');
        const fileURL = await getDownloadURL(res.ref);

        updateProfile(authService.currentUser, { photoURL: fileURL })
          .then(() => {
            setAvataURL(fileURL);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      updateProfile(authService.currentUser, { displayName: tempName })
        .then(() => {
          console.log('displayName update');
          setUserName(tempName);
        })
        .catch((error) => {
          console.log(error);
        });

      await setDoc(
        doc(db, 'users', authService.currentUser.uid),
        {
          name: tempName,
          photoURL: selectedImg,
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
      <Background onClick={onModalClick} name='info' />
      <ModalContainer>
        <Infos>
          <Title>정보 수정</Title>

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
