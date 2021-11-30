import AppRouter from './Router';
import GlobalStyles from './GlobalStyles';
import { useState, useEffect } from 'react';
import { authService, db } from '../fbase';
import { doc, getDoc } from 'firebase/firestore';

const fetchUser = async () => {
  const docRef = doc(db, 'users', authService.currentUser.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState();
  const [userDocObj, setUserDocObj] = useState({});

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        fetchUser()
          .then((user) => {
            setUserDocObj(user);
          })
          .catch((error) => {
            console.log(error);
          });
        setUserObj(user);
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
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} userDocObj={userDocObj} />
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
