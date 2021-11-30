/*
 * import for react
 */
import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

/*
 * import for firebase
 */
import { authService } from '../fbase';

/*
 * Global Object
 */
const userDropdownItems = [
  { id: 1, name: '내 정보', path: '/Profile', pathName: 'profile' },
  { id: 2, name: '참여목록', path: '/PartList', pathName: 'partList' },
  { id: 3, name: '내가 쓴 글', path: '/MyPost', pathName: 'myLecture' },
  { id: 4, name: '내 거래친구', path: '/MyFriend', pathName: 'myFriend' },
];

const adminDropdownItems = [
  { id: 1, name: '내 정보', path: '/Profile', pathName: 'profile' },
  { id: 2, name: '회원목록', path: '/UserList', pathName: 'userList' },
  { id: 3, name: '게시글 목록', path: '/PostList', pathName: 'postList' },
];

/*
 * Styled Component
 */
const DropdownContainer = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const Avata = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  position: absolute;
  width: 150px;
  margin-top: 5px;
  background-color: white;
  right: 0px;
  border: 1px solid lightgray;
  border-radius: 3%;
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
  border-bottom: 2px solid #d2d2d2;
  border-top: none;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    color: gray;
  }
`;

const ItemName = styled.p`
  padding-left: 10px;
  font-weight: 400;
`;

/*
 * AvataDropdown Component
 */
const AvataDropdown = ({ userObj, userDocObj }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e) => {
    setIsActive((prev) => !prev);
  }, []);

  const onLogoutClick = () => {
    authService.signOut();
    navigate('/');
  };

  return (
    <DropdownContainer>
      <Avata onClick={onActiveToggle} src={userObj.photoURL} />
      <DropdownMenu isActive={isActive}>
        {userDocObj.role === 'user'
          ? userDropdownItems.map((item) => (
              <Link to={item.path} key={item.id}>
                <DropdownItemContainer onClick={onSelectItem}>
                  <ItemName id='item_name'>{item.name}</ItemName>
                </DropdownItemContainer>
              </Link>
            ))
          : adminDropdownItems.map((item) => (
              <Link to={item.path} key={item.id}>
                <DropdownItemContainer onClick={onSelectItem}>
                  <ItemName id='item_name'>{item.name}</ItemName>
                </DropdownItemContainer>
              </Link>
            ))}
        <DropdownItemContainer onClick={onLogoutClick}>
          <ItemName id='item_name' style={{ color: 'red' }}>
            로그아웃
          </ItemName>
        </DropdownItemContainer>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default AvataDropdown;
