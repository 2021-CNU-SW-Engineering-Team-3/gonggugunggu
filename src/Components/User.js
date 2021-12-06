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
  )
};

export default User;
