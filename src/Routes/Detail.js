/*
 * import for react
 */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner, Card, Accordion } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import { IoPersonAddOutline } from 'react-icons/all';
import { Rating } from 'react-simple-star-rating';

/*
 * import for firebase
 */
import { doc, getDoc, setDoc, deleteDoc, updateDoc, arrayUnion, get, child } from 'firebase/firestore';
import { authService, db } from '../fbase';

import CustomToggle from '../Components/CustomToggle';

const fillColorArray = [
  '#f17a45',
  '#f17a45',
  '#f19745',
  '#f19745',
  '#f1a545',
  '#f1a545',
  '#f1b345',
  '#f1b345',
  '#f1d045',
  '#f1d045',
];

const CardAppear = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const DetailContainer = styled(Container)`
  animation: ${CardAppear} 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
`;

const DetailContentContainer = styled(Container)`
  max-width: 668px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 80px;
  border: none;
  border-radius: 25px;
  box-shadow: 5px 10px 30px -2px #e2e2e2;
`;

const DetailTitleContainer = styled(Card)`
  max-width: 668px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 80px;
  border: none;
`;

const PhotoContainer = styled(Card.Img)`
  object-fit: cover;
  height: 500px;
  border-radius: 25px 25px 0 0;
`;

const UserContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
`;

const MyAccodion = styled(Accordion)`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
`;

const AccodionBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
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

const Rate = styled.div`
  margin-left: 20px;
`;

const BodyContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100px;
  padding: 20px 50px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 14px;
  color: black;
`;

const Price = styled.div`
  font-weight: 600;
`;

const PartTitle = styled.div`
  color: black;
  font-size: 32px;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 25px;

  @media only screen and (max-width: 992px) {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 28px;
    font-weight: 600;
    margin: 0 50px;
    margin-bottom: 18px;
  }
`;

const SubTitle = styled.div`
  color: black;
  font-size: 26px;
  font-weight: 500;

  @media only screen and (max-width: 992px) {
    font-size: 22px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 20px;
    /* margin: 0 50px; */
    margin-bottom: 0px;
  }
`;

const Button = styled.button`
  background-color: #ededed;
  font-size: 16px;
  font-weight: 700;
  width: 140px;
  height: 45px;

  border-radius: 25px;
  transition: all ease-out 0.2s;

  &.parti {
    margin-bottom: 10px;
  }

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.2s;
  }
  &:focus {
    opacity: 1;
    background-color: lightgray;
    transition: all ease-out 0.2s;
  }
`;

const PartNumber = styled.div`
  align-self: center;
  font-size: 13px;
  margin-bottom: 40px;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RemovePost = styled.button`
  font-size: 15px;
  font-weight: 400;

  &:hover {
    opacity: 0.7;
    transition: all ease-out 0.1s;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: black;
  transition: all ease-out 0.2s;
  &:hover {
    background-color: #e8e8e8;
    transition: all ease-out 0.2s;
  }
`;

const MySpinner = styled(Spinner)`
  position: fixed;
  left: 48%;
  top: 48%;
`;

const Detail = ({ fetchPosts, fetchUser, data, userDocObj, setUserDocObj }) => {
  const user = authService.currentUser;

  let { id } = useParams();
  const navigation = useNavigate();

  const [postUser, setPostUser] = useState();
  const [post, setPost] = useState();
  const [partUsers, setPartUsers] = useState([]);
  const [isPart, setIsPart] = useState();
  const [rating, setRating] = useState(0);

  const handleRating = async (rate, value) => {
    setRating(rate);

    const currentUser = await getDoc(doc(db, 'users', user.uid));
    const currentUserData = currentUser.data();

    if (!currentUserData.evaluateUser.find((userId) => userId === value.id)) {
      await setDoc(
        doc(db, 'users', value.id),
        {
          totalRate: value.totalRate + rate / 10,
          evaluateCount: value.evaluateCount + 1,
        },
        { merge: true },
      );

      await setDoc(
        doc(db, 'users', currentUserData.id),
        {
          evaluateUser: [...currentUserData.evaluateUser, value.id],
        },
        { merge: true },
      );

      getPartUsers();
    } else {
      alert('이미 평가한 유저입니다.');
    }
  };

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

  const getPartUsers = useCallback(() => {
    if (post) {
      let partUsersId = [...post.currentPartUser];
      const temp = [];

      setIsPart(partUsersId.find((userId) => userId === user.uid));

      if (isPart) {
        partUsersId = partUsersId.filter((userId) => userId !== user.uid);
        partUsersId.forEach(async (value, index) => {
          const docRef = doc(db, 'users', value);
          const docSnap = await getDoc(docRef);
          temp.push(docSnap.data());

          if (partUsersId.length - 1 === index) {
            setPartUsers(temp);
          }
        });
      }
    }
  }, [post, user, isPart]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    getPartUsers();
  }, [getPartUsers]);

  function filtercurrentParts(userparts) {
    var index = userparts.indexOf(post.postid);
    if (index > -1) {
      userparts.splice(index, 1);
    }
    return userparts;
  }

  //게시글 삭제
  const RemovePostClick = async () => {
    const docRef2 = doc(db, 'posts', post.postid);
    deleteDoc(docRef2);
    for (var i = 0; i < partUsers.length; i++) {
      await setDoc(
        doc(db, 'users', partUsers[i].id),
        {
          point: partUsers[i].point + post.totalPrice / post.totalPartNum,
          currentParts: filtercurrentParts(partUsers[i].currentParts),
        },
        { merge: true },
      );
    }
    await setDoc(
      doc(db, 'users', user.uid),
      {
        point: userDocObj.point + post.totalPrice / post.totalPartNum,
        currentParts: filtercurrentParts(userDocObj.currentParts),
      },
      { merge: true },
    );
    alert(`게시글이 삭제되었습니다.`);
    fetchPosts();
    fetchUser()
      .then((user) => {
        setUserDocObj(user);
      })
      .catch((error) => {
        console.log(error);
      });
    navigation('/');
  };

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
          doc(db, 'users', user.uid),
          {
            point: userDocObj.point - post.totalPrice / post.totalPartNum,
            currentParts: [...userDocObj.currentParts, post.postid],
          },
          { merge: true },
        );
        alert(`참여 완료. 포인트가 ${post.totalPrice / post.totalPartNum} 포인트가 차감됩니다.`);
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
        alert('이미 참여 중 입니다.');
      }
    } else {
      alert('모집이 끝났습니다.');
    }
  };

  const handleAddButton = (e, value) => {
    e.preventDefault();
    requestFriend(value);
  };

  const requestFriend = async (value) => {
    const userRef = doc(db, 'users', user.uid);
    const opponentRef = doc(db, 'users', value.id);

    //이미 친구거나 친구신청을 했다면 return
    const userSnap = await getDoc(userRef);
    const opponentSnap = await getDoc(opponentRef);

    //이미 친구인 경우
    if (userSnap.data().friends !== undefined && opponentSnap.data().friends !== undefined) {
      if (
        Object.keys(userSnap.data().friends).includes(value.id) &&
        Object.keys(opponentSnap.data().friends).includes(user.uid)
      ) {
        alert('이미 친구입니다.');
        return;
      }
    }
    if (userSnap.data().waitingFriend !== undefined && opponentSnap.data().waitingFriend !== undefined) {
      if (
        userSnap.data().waitingFriend.wait !== undefined &&
        opponentSnap.data().waitingFriend.requested !== undefined
      ) {
        if (
          Object.keys(userSnap.data().waitingFriend.wait).includes(value.id) &&
          Object.keys(opponentSnap.data().waitingFriend.requested).includes(user.uid)
        ) {
          alert('이미 친구신청을 한 상대입니다.');
          return;
        }
      } else if (
        userSnap.data().waitingFriend.requested !== undefined &&
        opponentSnap.data().waitingFriend.wait !== undefined
      ) {
        if (
          Object.keys(userSnap.data().waitingFriend.requested).includes(value.id) &&
          Object.keys(opponentSnap.data().waitingFriend.wait).includes(user.uid)
        ) {
          alert('이미 상대방이 친구신청을 하였습니다.');
          return;
        }
      }
    }

    //친구 신청 보내기
    //requested = 신청 받음, wait = 신청 보냄
    await updateDoc(userRef, {
      ['waitingFriend.wait.' + value.id]: arrayUnion({
        id: value.id,
        name: value.name,
        totalRate: value.totalRate,
        photoURL: value.photoURL,
      }),
    });

    await updateDoc(opponentRef, {
      ['waitingFriend.requested.' + user.uid]: arrayUnion({
        id: user.uid,
        name: user.displayName,
        totalRate: userDocObj.totalRate,
        photoURL: user.photoURL,
      }),
    });

    alert(value.name + '님께 친구신청을 보냈습니다.');
  };

  return (
    <div>
      {post && postUser ? (
        <DetailContainer>
          <DetailContentContainer>
            <PhotoContainer src={post.photoURL} variant='top' />

            <UserContainer>
              <UserLeft>
                <Avata src={postUser.photoURL} />
                <UserName>{postUser.name}</UserName>
              </UserLeft>
              <Rate>
                백마지수{' '}
                {postUser.evaluateCount > 0
                  ? Math.round((postUser.totalRate / postUser.evaluateCount) * 10) / 10
                  : 0}
              </Rate>
            </UserContainer>

            <BodyContainer>
              <RowFlex>
                <ColumnFlex>
                  <Title>{post.title}</Title>
                  <Price>참여 비용 {post.totalPrice / post.totalPartNum}원</Price>
                </ColumnFlex>
                {post.uid === user.uid ? (
                  <RemovePost className='removePost' onClick={RemovePostClick}>
                    삭제
                  </RemovePost>
                ) : (
                  ''
                )}
              </RowFlex>
            </BodyContainer>

            {isPart ? (
              // TODO: 구매 확정 onClick 이벤트 넣어야 함
              <Button className='parti'>구매 확정</Button>
            ) : (
              <Button className='parti' onClick={handleClick}>
                공동구매 참여
              </Button>
            )}

            <PartNumber>
              현재 참여 인원 {post.currentPartNum} / {post.totalPartNum}
            </PartNumber>
          </DetailContentContainer>

          {isPart ? (
            <DetailTitleContainer style={{ maxWidth: 668 }}>
              <PartTitle className='g-4'>현재 참여 중인 공동구매입니다!</PartTitle>
              <SubTitle>참여 중인 유저와 거래친구를 맺거나 평가할 수 있습니다.</SubTitle>
            </DetailTitleContainer>
          ) : (
            ''
          )}
          <DetailContentContainer>
            {partUsers.map((value, index) => {
              return (
                <MyAccodion defaultActiveKey='0'>
                  <UserContainer key={index}>
                    <UserLeft>
                      <Avata src={value.photoURL} />
                      <UserName>{value.name}</UserName>
                      <Rate>
                        백마지수{' '}
                        {value.evaluateCount > 0
                          ? Math.round((value.totalRate / value.evaluateCount) * 10) / 10
                          : 0}
                      </Rate>
                    </UserLeft>
                    <RowFlex>
                      {/* //TODO: 평가하기 onClick 이벤트 처리 */}
                      <IconContainer style={{ marginRight: 20 }}>
                        <CustomToggle eventKey={index} />
                      </IconContainer>
                      <IconContainer>
                        <IoPersonAddOutline onClick={(e) => handleAddButton(e, value)} size={20} />
                      </IconContainer>
                    </RowFlex>
                  </UserContainer>

                  {/* 아코디언 바디 */}
                  <Accordion.Collapse eventKey={index}>
                    <AccodionBody>
                      <Rating
                        onClick={(rate) => handleRating(rate, value)}
                        ratingValue={rating}
                        transition
                        allowHalfIcon
                        eventKey={index}
                        fillColorArray={fillColorArray}
                        style={{ marginBottom: 20 }}
                      />
                    </AccodionBody>
                  </Accordion.Collapse>
                </MyAccodion>
              );
            })}
          </DetailContentContainer>
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
