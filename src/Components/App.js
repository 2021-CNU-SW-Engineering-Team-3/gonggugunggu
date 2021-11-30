import AppRouter from './Router';
import GlobalStyles from './GlobalStyles';
import { useState, useEffect } from 'react';
import { authService } from '../fbase';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avataURL, setAvataURL] = useState('');

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <>
          <GlobalStyles />
          <AppRouter isLoggedIn={isLoggedIn} avataURL={avataURL} />
          {/* <Footer /> */}
        </>
      ) : (
        //TODO: 추후 로딩 애니메이션 넣어야함
        'Loading...'
      )}
    </>
  );
};

export default App;
