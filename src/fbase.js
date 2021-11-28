import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCyHSBn4n17Cl1cWJ4tmWzGA3SPwiVo65E',
  authDomain: 'gonggu-gunggu.firebaseapp.com',
  projectId: 'gonggu-gunggu',
  storageBucket: 'gonggu-gunggu.appspot.com',
  messagingSenderId: '85193539771',
  appId: '1:85193539771:web:80027643e82663d8b2299e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const rt_db = getDatabase(app);
export const db = getFirestore(app);
export const authService = getAuth();
export const storageService = getStorage();
