/*
 * import for react
 */
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

/*
 * import for route
 */
import MyHeader from './Header';
import Home from '../Routes/Home';
import Auth from '../Routes/Auth';
import Register from '../Routes/Register';
import Profile from '../Routes/Profile';
import Detail from '../Routes/Detail';
import FriendsList from '../Routes/FriendsList';
import Posting from '../Routes/Posting';
import MyPost from '../Routes/MyPost';
import PartList from '../Routes/PartList';
import UserList from '../Routes/UserList';
import UserDetail from '../Routes/UserDetail';
import PostList from '../Routes/PostList';
import PostDetail from '../Routes/PostDetail';

/*
 * AppRouter Component
 */
const AppRouter = ({ isLoggedIn, userObj, userDocObj, fetchPosts, data, fetchUser, setUserDocObj }) => {
  return (
    <Router>
      <MyHeader isLoggedIn={isLoggedIn} userObj={userObj} userDocObj={userDocObj} />
      <main>
        <Routes>
          <Route path='/' element={<Home data={data} />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile userObj={userObj} userDocObj={userDocObj} />} />
          <Route path='/friendsList' element={<FriendsList userObj={userObj} userDocObj={userDocObj} />} />
          <Route path='/userList' element={<UserList />} />
          <Route path='/userDetail/:id' element={<UserDetail />} />
          <Route path='/postList/' element={<PostList />} />
          <Route path='/postDetail/:id' element={<PostDetail />} />
          <Route
            path='/posting'
            element={
              <Posting
                fetchPosts={fetchPosts}
                userDocObj={userDocObj}
                fetchUser={fetchUser}
                setUserDocObj={setUserDocObj}
              />
            }
          />
          <Route
            path='/detail/:id'
            element={
              <Detail
                fetchPosts={fetchPosts}
                data={data}
                userDocObj={userDocObj}
                fetchUser={fetchUser}
                setUserDocObj={setUserDocObj}
              />
            }
          />
          <Route path='/myPost' element={<MyPost data={data} userObj={userObj} userDocObj={userDocObj} />} />
          <Route
            path='/partList'
            element={
              <PartList isLoggedIn={isLoggedIn} userObj={userObj} userDocObj={userDocObj} data={data} />
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default AppRouter;
