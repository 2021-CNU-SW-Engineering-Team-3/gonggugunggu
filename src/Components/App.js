/*
 * import for react
 */
import AppRouter from './Router';
import GlobalStyles from './GlobalStyles';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import Footer from './Footer';

/*
 * import for firebase
 */
import { authService, db } from '../fbase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

/*
 * Global function
 */
const fetchUser = async () => {
  const docRef = doc(db, 'users', authService.currentUser.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

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
  const [posts, setPosts] = useState();

  const fetchPosts = useCallback(async () => {
    const temp = [];
    const querySnapshot = await getDocs(collection(db, 'posts'));
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setPosts(temp);
  }, []);

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

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      {init ? (
        <>
          <GlobalStyles />
          <AppRouter
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            userDocObj={userDocObj}
            fetchPosts={fetchPosts}
            fetchUser={fetchUser}
            setUserDocObj={setUserDocObj}
            data={posts}
          />
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
