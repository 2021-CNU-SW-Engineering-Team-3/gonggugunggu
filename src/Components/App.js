/*
 * import for react
 */
import AppRouter from './Router';
import GlobalStyles from './GlobalStyles';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

/*
 * import for firebase
 */
import { authService, db } from '../fbase';
import { doc, getDoc } from 'firebase/firestore';

/*
 * import for image
 */
import product0 from '../Images/product0.png';
import product1 from '../Images/product1.png';
import product2 from '../Images/product2.png';
import product3 from '../Images/product3.png';
import Footer from './Footer';

/*
 * Global function
 */
const fetchUser = async () => {
  const docRef = doc(db, 'users', authService.currentUser.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

/*
 * Global Data
 */
const data = [
  {
    id: 0,
    photoURL: product0,
    title: '콜라 공동구매',
    content: '콜라 공동구매합니다.',
    totalPrice: 10000,
    liked: 5,
    currentPart: 4,
    totalPart: 10,
  },
  {
    id: 1,
    photoURL: product1,
    title: '게토레이 공동구매',
    content: '게토레이 공동구매',
    totalPrice: 10000,
    liked: 7,
    currentPart: 4,
    totalPart: 10,
  },
  {
    id: 2,
    photoURL: product2,
    title: '과자 공동구매',
    content: '과자 공동구매',
    totalPrice: 20000,
    liked: 9,
    currentPart: 5,
    totalPart: 10,
  },
  {
    id: 3,
    photoURL: product3,
    title: '음료수 공동구매',
    content: '음료수 공동구매',
    totalPrice: 25000,
    liked: 10,
    currentPart: 4,
    totalPart: 10,
  },
];

/*
 * Styled Component
 */
const MySpinner = styled(Spinner)`
  position: fixed;
  left: 48%;
  top: 48%;
`;

/*
 * App Component
 */
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
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
          });

        setUserObj(user);
        console.log(user);

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? (
        <>
          <GlobalStyles />
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} userDocObj={userDocObj} data={data} />
          <Footer />
        </>
      ) : (
        <MySpinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MySpinner>
      )}
    </div>
  );
};

export default App;
