import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvXoBzIJUVvD4YiRxUnykDDA2gI-cYQQ4",
  authDomain: "ecommerce-laptop-app-fa46e.firebaseapp.com",
  projectId: "ecommerce-laptop-app-fa46e",
  storageBucket: "ecommerce-laptop-app-fa46e.appspot.com",
  messagingSenderId: "552697830458",
  appId: "1:552697830458:web:4ff289dd5882f5090ea903"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);