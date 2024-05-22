import {initializeApp} from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD2evSojBKSzmqR9uXQRRF_BwtJfPUblYo',
  authDomain: 'crmeduca-deb5b.firebaseapp.com',
  projectId: 'crmeduca-deb5b',
  storageBucket: 'crmeduca-deb5b.appspot.com',
  messagingSenderId: '562919707799',
  appId: '1:562919707799:web:a8760a1c8d5f8d94d305d2',
  measurementId: 'G-TM0N5SCE3B',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export {
  app,
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  fireStore,
  collection,
  doc,
  setDoc,
  getDocs,
  where,
  query,
};
