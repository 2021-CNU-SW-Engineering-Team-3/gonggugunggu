/*
 * import for react
 */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

/*
 * import for firebase
 */
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { authService, db } from '../fbase';

import unknown from '../Images/Unknown_person.jpeg';

const CardAppear = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const DetailContainer = styled(Container)`
  max-width: 668px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 80px;
  border: none;
  border-radius: 25px;
  box-shadow: 5px 10px 30px -2px #e2e2e2;
  animation: ${CardAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  border-radius: 25px;
  width: 100%;
`;

const Photo = styled.img`
  height: 500px;
  object-fit: cover;
  margin: 0 auto;
`;

const UserContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  border-bottom: 1px solid #e8e8e8;
`;

const UserLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Avata = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Rate = styled.div``;

const BodyContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 50px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  color: black;
`;

const Price = styled.div`
  margin-bottom: 30px;
  font-weight: 700;
`;

const PartiButton = styled.button`
  background-color: #ededed;
  font-size: 16px;
  font-weight: 700;
  width: 140px;
  height: 45px;
  margin-bottom: 50px;
  border-radius: 25px;
  transition: all ease-out 0.2s;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s;
  }
  &:focus {
    opacity: 1;
    background-color: lightgray;
    transition: all ease-out 0.2s;
  }
  margin-bottom: 40px;
`;

const MySpinner = styled(Spinner)`
  position: fixed;
  left: 48%;
  top: 48%;
`;

const Detail = ({ fetchPosts, data, userDocObj }) => {
  let { id } = useParams();
  const navigation = useNavigate();
  const [postUser, setPostUser] = useState();
  const [post, setPost] = useState();
  const user = authService.currentUser;

  const getPost = useCallback(async () => {
    if (data) {
      const findPost = data.find((item) => {
        return item.postid === id;
      });
      setPost(findPost);
    }
  }, [data, id]);

  const getUser = useCallback(async () => {
    if (post) {
      const docRef = doc(db, 'users', post.uid);
      const docSnap = await getDoc(docRef);
      setPostUser(docSnap.data());
    }
  }, [post]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleClick = async () => {
    const findUser = post.currentPartUser.find((item) => {
      return item === user.uid;
    });

    if (post.currentPartNum < post.totalPartNum) {
      if (!findUser) {
        await setDoc(
          doc(db, 'posts', post.postid),
          {
            currentPartNum: post.currentPartNum + 1,
            currentPartUser: [...post.currentPartUser, user.uid],
          },
          { merge: true },
        );

        await setDoc(
          doc(db, 'users', post.user.uid),
          {
            point: userDocObj.point - post.totalPrice / post.totalPartNum,
          },
          { merge: true },
        );
        alert(`참여 완료. 포인트가 ${post.totalPrice / post.totalPartNum} 포인트가 차감됩니다.`);
        fetchPosts();
        navigation('/');
      } else {
        alert('이미 참여 중 입니다.');
      }
    } else {
      alert('모집이 끝났습니다.');
    }
  };

  return (
    <div>
      {post && postUser ? (
        <DetailContainer>
          <PhotoContainer>
            <Photo src={post.photoURL} alt='product' width='100%' />
          </PhotoContainer>

          <UserContainer>
            <UserLeft>
              <Avata src={postUser.photoURL} />
              <UserName>{postUser.name}</UserName>
            </UserLeft>
            <Rate>백마지수 {postUser.rate}</Rate>
          </UserContainer>

          <BodyContainer>
            <Title>{post.title}</Title>
            <Price>참여비용 {post.totalPrice / post.totalPartNum}원</Price>
            <Title>♡{post.liked}</Title>
            <Title>
              현재 참여 인원 {post.currentPartNum}/{post.totalPartNum}
            </Title>
          </BodyContainer>

          <PartiButton onClick={handleClick}>공동구매 참여</PartiButton>
        </DetailContainer>
      ) : (
        <MySpinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MySpinner>
      )}
    </div>
  );
};

export default Detail;
