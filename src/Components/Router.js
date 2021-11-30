import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MyHeader from './Header';
import Home from '../Routes/Home';
import Auth from '../Routes/Auth';
import Register from '../Routes/Register';

const AppRouter = ({ isLoggedIn, avataURL }) => {
  return (
    <Router>
      <MyHeader isLoggedIn={isLoggedIn} avataURL={avataURL} />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
};

export default AppRouter;
