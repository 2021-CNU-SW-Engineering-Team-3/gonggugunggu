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

/*
 * AppRouter Component
 */
const AppRouter = ({ isLoggedIn, userObj, userDocObj, data }) => {
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
          <Route path='/posting' element={<Posting />} />
          <Route path='/detail/:id' element={<Detail data={data} />} />

          <Route path='/myPost' element={<MyPost data={data} />} />
          <Route path='/partList' element={<PartList isLoggedIn={isLoggedIn} userObj={userObj} userDocObj={userDocObj} data={data} />} />
          
        </Routes>
      </main>
    </Router>
  );
};

export default AppRouter;
