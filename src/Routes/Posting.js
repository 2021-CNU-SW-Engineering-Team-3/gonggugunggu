/*
 * import for react
 */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Container } from 'react-bootstrap';

/*
 * import for firebase
 */
import { authService, db, storageService } from '../fbase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, uploadString, ref as storageRef } from 'firebase/storage';

/*
 * import for image
 */
import { v4 } from 'uuid';

/*
 * Keyframes
 */
const appear = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
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

/*
 * Styled Component
 */
const PostingContainer = styled(Container)`
  margin-top: 120px;
  animation: ${appear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
`;

const StepContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  animation: ${TitleAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;

  @media only screen and (max-width: 992px) {
    margin-top: 90px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 70px;
  }
`;

const TextContainer1 = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  height: 350px;
  animation: ${TitleAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;

  @media only screen and (max-width: 992px) {
    height: 250px;
  }
  @media only screen and (max-width: 768px) {
    height: 200px;
  }
`;

const TextContainer2 = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  height: 350px;
  animation: ${TitleAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  @media only screen and (max-width: 992px) {
    height: 250px;
  }
  @media only screen and (max-width: 768px) {
    height: 200px;
  }
`;

const TextContainer3 = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  height: 350px;
  animation: ${TitleAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  @media only screen and (max-width: 992px) {
    height: 250px;
  }
  @media only screen and (max-width: 768px) {
    height: 200px;
  }
`;

const Text = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-right: 40px;

  color: black;

  &.question {
    font-weight: 700;
    margin-bottom: 20px;

    @media only screen and (max-width: 992px) {
      font-size: 38px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 25px;
      margin-bottom: 18px;
    }
  }

  &.here {
    font-weight: 700;
    border-bottom: 5px solid black;
    margin-right: 10px;
    margin-bottom: 20px;

    @media only screen and (max-width: 992px) {
      border-bottom: 4px solid black;
      font-size: 38px;
    }
    @media only screen and (max-width: 768px) {
      border-bottom: 3px solid black;
      font-size: 25px;

      margin-bottom: 18px;
    }
    &:hover {
      opacity: 0.5;
    }
  }

  &.step {
    font-size: 36px;
    font-weight: 500;
    @media only screen and (max-width: 992px) {
      font-size: 35px;
    }

    @media only screen and (max-width: 768px) {
      font-size: 23px;
    }
  }

  @media only screen and (max-width: 992px) {
    font-size: 40px;
    font-weight: 800;
  }
  @media only screen and (max-width: 768px) {
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 0px;
  }
`;

const Input = styled.input`
  font-size: 48px;
  font-weight: 700;
  border: none;
  margin-bottom: 30px;
  margin-right: 20px;
  border-bottom: 5px solid black;

  max-width: ${({ width }) => width};

  @media only screen and (max-width: 992px) {
    border-bottom: 4px solid black;
    font-size: 38px;
    font-weight: 800;
  }
  @media only screen and (max-width: 768px) {
    border-bottom: 3px solid black;
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 18px;
  }

  &:focus {
    outline: none;
  }
`;

const PhotoSelect = styled.input`
  display: none;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PostingButton = styled.input`
  background-color: #ededed;
  font-size: 16px;
  font-weight: 700;
  width: 140px;
  height: 45px;
  margin-bottom: 50px;
  margin-right: 50px;
  border-radius: 25px;
  border: none;
  transition: all ease-out 0.2s;

  &:hover {
    background-color: lightgray;
    transition: all ease-out 0.2s;
  }

  @media only screen and (max-width: 992px) {
    font-size: 15px;
    font-weight: 600;
  }

  @media only screen and (max-width: 768px) {
    font-size: 14px;
    font-weight: 600;
  }
`;

/*
 * Posting Component
 */
const Posting = ({ fetchPosts, userDocObj, fetchUser, setUserDocObj }) => {
  const navigation = useNavigate();
  const uploadPhotoRef = useRef();
  const user = authService.currentUser;

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [totalPartNum, setTotalPartNum] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [selectedImg, setSelectedImg] = useState();

  const handleClick = async (e) => {
    const {
      target: { name },
    } = e;

    if (name === 'prev' && step !== 1) setStep(step - 1);
    else if (name === 'next' && step !== 3) setStep(step + 1);
    else if (name === 'confirm') {
      if (title && totalPrice && totalPartNum && selectedImg) {
        if (userDocObj.point >= Number(totalPrice) + Number(totalPrice) / Number(totalPartNum)) {
          const fileRef = storageRef(storageService, `${user.uid}/${v4()}`);
          const res = await uploadString(fileRef, selectedImg, 'data_url');
          const fileURL = await getDownloadURL(res.ref);

          const postid = v4();

          await setDoc(doc(db, 'posts', postid), {
            uid: user.uid,
            postid: postid,
            title: title,
            photoURL: fileURL,
            totalPartNum: totalPartNum,
            currentPartNum: 1,
            currentPartUser: [user.uid],
            totalPrice: totalPrice,
            liked: 0,
            createdAt: serverTimestamp(),
          });
          console.log(postid);
          await setDoc(
            doc(db, 'users', user.uid),
            {
              point: userDocObj.point - totalPrice / totalPartNum,
              currentParts: [postid],
            },
            { merge: true },
          );
          fetchPosts();
          fetchUser()
            .then((user) => {
              setUserDocObj(user);
            })
            .catch((error) => {
              console.log(error);
            });
          navigation('/');
        } else {
          alert(
            '게시글 작성을 위해서는 총 금액에 자신의 참여 비용을 더한 포인트 보다 많은 포인트를 가지고 있어야 합니다.',
          );
        }
      } else {
        alert('스텝을 모두 완료해주세요');
      }
    }
  };

  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') setTitle(value);
    else if (name === 'totalPartNum') setTotalPartNum(value);
    else if (name === 'totalPrice') setTotalPrice(value);
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

  const onPhotoClick = () => {
    uploadPhotoRef.current.click();
  };

  return (
    <PostingContainer>
      <StepContainer>
        <RowFlex>
          <Text>✍🏻 STEP</Text>
          <Text>{step} / 3</Text>
        </RowFlex>
        <Text className='step'>스텝을 모두 완료하고 게시글을 등록하세요</Text>
      </StepContainer>
      {step === 1 ? (
        <TextContainer1>
          <ColumnFlex>
            <Text className='question'>게시글 제목은 </Text>
            <Input type='text' name='title' value={title} onChange={handleChange} width='530px' />
            <Text className='question'>입니다.</Text>
          </ColumnFlex>
        </TextContainer1>
      ) : step === 2 ? (
        <TextContainer2>
          <ColumnFlex>
            <Text className='question'>상품의 총 가격은 </Text>
            <RowFlex>
              <Input
                type='number'
                name='totalPrice'
                value={totalPrice || 0}
                onChange={handleChange}
                width='220px'
              />
              <Text className='question'>원이고, </Text>
            </RowFlex>
            <Text className='question'>모집 인원 수는 </Text>
            <RowFlex>
              <Input
                type='number'
                name='totalPartNum'
                value={totalPartNum || 0}
                onChange={handleChange}
                width='100px'
              />
              <Text className='question'> 명입니다.</Text>
            </RowFlex>
          </ColumnFlex>
        </TextContainer2>
      ) : (
        <TextContainer3>
          <ColumnFlex>
            <Text className='question'>마지막입니다! </Text>
            <PhotoSelect
              type='file'
              accept='image/*'
              ref={uploadPhotoRef}
              name='photo'
              onChange={onImgChange}
            />
            <RowFlex>
              <Text onClick={onPhotoClick} className='here'>
                여기
              </Text>
              <Text className='question'>를 눌러 이미지를 추가하세요</Text>
            </RowFlex>
          </ColumnFlex>
        </TextContainer3>
      )}

      <ButtonContainer>
        <PostingButton type='button' name='prev' value='이전' onClick={handleClick} />
        <PostingButton
          type='button'
          name={step === 3 ? 'confirm' : 'next'}
          value={step === 3 ? '완료' : '다음'}
          onClick={handleClick}
        />
      </ButtonContainer>
    </PostingContainer>
  );
};

export default Posting;
