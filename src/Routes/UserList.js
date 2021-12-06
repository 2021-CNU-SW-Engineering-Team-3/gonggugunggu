/*
 * import for react
 */
import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
import User from '../Components/User';

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
  background-color: #6495ED;
`;

const TableName = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  
`;

const TableContainer = styled.div`
  margin-top: 50px;
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  
  let userArray = [];

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      userArray.push(doc.data());
    });
    setUsers(userArray);
    
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  
  return (
    <TableContainer>
      <TableName>유저 목록</TableName>
      <Table>
        <thead>
            <tr>
                <TableHeader>번호</TableHeader>
                <TableHeader>이름</TableHeader>
                <TableHeader>이메일</TableHeader>
            </tr>
        </thead>
        <User users={users} />
      </Table>
    </TableContainer>
  );
};

export default UserList;