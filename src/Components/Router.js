import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MyHeader from './Header';
import Home from '../Routes/Home';
import Auth from '../Routes/Auth';

const AppRouter = () => {
  return (
    <Router>
      <MyHeader />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Auth' element={<Auth />} />
        </Routes>
      </main>
    </Router>
  );
};

export default AppRouter;
