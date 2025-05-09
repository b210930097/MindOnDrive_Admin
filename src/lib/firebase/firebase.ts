import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyDOACmuAO5NKLWFv0VAd97MjLogwzLsSvQ',
  authDomain: 'erdenet-divers.firebaseapp.com',
  databaseURL: 'https://erdenet-divers-default-rtdb.firebaseio.com',
  projectId: 'erdenet-divers',
  storageBucket: 'erdenet-divers.firebasestorage.app',
  messagingSenderId: '941154206174',
  appId: '1:941154206174:web:7108dd38696af54783dd4f',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
