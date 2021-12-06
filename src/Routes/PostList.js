/*
 * import for react
 */
import { useEffect, useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import Tr from '../Components/Tr';

import styled from 'styled-components';

/*
 * import for firebase
 */
import { db } from '../fbase';
import { collection, getDocs } from 'firebase/firestore';

const Table = styled.table`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  border-spacing: 0;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border-bottom: 1px solid #e8e8e8;
  padding: 0;
  font-size: 16px;
  padding: 10px 5px;
  font-weight: bold;
  background-color: #FFFFE0;
`;

const TableName = styled.div`
  margin-top: 5px;
  margin-bottom: 3px;
  font-weight: bold;
  text-align: center;
  font-size: 30px;
`;

const TableContainer = styled.div`
  margin: auto;
  margin-top: 50px;
`;

const PostList = ({ fetchPosts, fetchUser }) => {
    const [posts, setPosts] = useState([]);

    let postArray = [];

    useEffect(async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        postArray.push(doc.data());
      });
      setPosts(postArray);

    }, []);

  return (
    <TableContainer>
        <TableName>게시글 목록</TableName>
        <Table>
            <thead>
                <tr>
                    <TableHeader>번호</TableHeader>
                    <TableHeader>제목</TableHeader>
                    <TableHeader>작성자</TableHeader>
                    <TableHeader>참여자 수</TableHeader>
                </tr>
            </thead>
            <Tr posts={posts}></Tr>
        </Table>
    </TableContainer>
  );
};

export default PostList;