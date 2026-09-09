import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjKOIVcxuo1PytGTb0uL6x1DhfdCYlOPk",
  authDomain: "studyflow-59bad.firebaseapp.com",
  projectId: "studyflow-59bad",
  storageBucket: "studyflow-59bad.firebasestorage.app",
  messagingSenderId: "138098479530",
  appId: "1:138098479530:web:f347e6aae3793724259bd3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);