import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

const TableBodyColumn = styled.td`
    padding: 10px 5px;
`;

const TableBodyRow = styled.tr`
    &:hover{
        background-color: #eceaea;
        cursor: pointer;
    }
`;

const User = ({ users }) => {

  return (
        <tbody>
            {
                users.map((user, index) => {
                    return (
                        <TableBodyRow>
                            <TableBodyColumn>{index}</TableBodyColumn>
                            <TableBodyColumn>
                                <Link to={`/userDetail/${user.id}`}>
                                    {user.name}
                                </Link>
                            </TableBodyColumn>
                            <TableBodyColumn>{user.email}</TableBodyColumn>
                        </TableBodyRow>
                    )
                })
            }
        </tbody>
      // <div>
      //   {users.map(user => {
      //     return (
      //       <div class="card mb-3" key={user.id}>
      //         <UserInfo >
      //           <Link to={`/userDetail/${user.id}`}>
      //             {user.name} {user.email}
      //           </Link>
      //         </UserInfo>
      //       </div>
      //     );
      //   })}
      // </div>
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
