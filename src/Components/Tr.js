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

const Tr = ({ posts }) => {

    return (
        <tbody>
            {
                posts.map((post, index) => {
                    return (
                        <TableBodyRow>
                            <TableBodyColumn>{index}</TableBodyColumn>
                            <TableBodyColumn>
                                <Link to={`/postDetail/${post.postid}`}>
                                    {post.title}
                                </Link>
                            </TableBodyColumn>
                            <TableBodyColumn>{post.uid}</TableBodyColumn>
                            <TableBodyColumn>{post.currentPartNum}</TableBodyColumn>
                        </TableBodyRow>
                    )
                })
            }
        </tbody>
    );
};

export default Tr;