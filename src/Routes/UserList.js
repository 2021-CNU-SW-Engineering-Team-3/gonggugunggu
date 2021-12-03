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

const UserListContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  transition: all 0.15s;
  user-select: none;
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
    <UserListContainer>
      <User users={users} />
    </UserListContainer>
  );
};

export default UserList;
