import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'my-store-ecommerce.firebaseapp.com',
  projectId: 'my-store-ecommerce',
  storageBucket: 'my-store-ecommerce.appspot.com',
  messagingSenderId: '527342084274',
  appId: '1:527342084274:web:dc24f58c987b39017369ab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
