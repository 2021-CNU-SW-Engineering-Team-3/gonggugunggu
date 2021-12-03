import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

const UserInfo = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
  &:hover {
    background-color: #e3fafc;
  }
  width: 800px;
`;

const User = ({ users }) => {

  return (
      <div>
        {users.map(user => {
          return (
            <div class="card mb-3" key={user.id}>
              <UserInfo >
                <Link to={`/userDetail/${user.id}`}>
                  {user.name} {user.email}
                </Link>
              </UserInfo>
            </div>
          );
        })}
      </div>
  );
  
  // return (
  //   <div>
  //     {users.map(user => {
  //       return (
  //         <div className="card mb-2" key={user.id}>
  //           <div className="card-body p-3">
  //             {user.id} {user.email}
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
  
};

export default User;
