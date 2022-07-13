import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider} from "firebase/auth";
import {getFirestore} from '@firebase/firestore';
import { getStorage }from'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD84P-SRgkA-E7swiEKRUGtUzQzmCcJrHE",
    authDomain: "emarket-db-a730c.firebaseapp.com",
    databaseURL: "gs://emarket-db-a730c.appspot.com",
    projectId: "emarket-db-a730c",
    storageBucket: "emarket-db-a730c.appspot.com",
    messagingSenderId: "559384461757",
    appId: "1:559384461757:web:4e00b8ad76ff9dbf5252d4",
    measurementId: "G-PZHKHXQ9R2"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const facebookProvider = new FacebookAuthProvider(app);
export const twitterProvider = new TwitterAuthProvider(app);

export const db = getFirestore(app);

export const storage = getStorage(app);