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
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../fbase';

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

const Description = styled.div`
  margin-bottom: 40px;
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

const Detail = ({ data }) => {
  let { id } = useParams();
  const [postUser, setPostUser] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    if (data !== undefined) {
      const findPost = data.find((item) => {
        return item.postid === id;
      });
      setPost(findPost);
    }
  }, [data, id]);

  const getUser = useCallback(async () => {
    if (post !== undefined) {
      const docRef = doc(db, 'users', post.uid);
      const docSnap = await getDoc(docRef);
      setPostUser(docSnap.data());
    }
  }, [post]);

  useEffect(() => {
    getUser();
  }, [getUser]);

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
            <Price>{post.totalPrice}원</Price>
          </BodyContainer>

          <PartiButton>공동구매 참여</PartiButton>
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
