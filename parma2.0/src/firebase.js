import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXNl5Lzoy-2magXvwZgTAXGHuxLSGHvGI",
  authDomain: "parma-shop-b49a2.firebaseapp.com",
  projectId: "parma-shop-b49a2",
  storageBucket: "parma-shop-b49a2.firebasestorage.app",
  messagingSenderId: "658562578372",
  appId: "1:658562578372:web:b813b5b79ae3829fb1d691",
  measurementId: "G-5KVNRMR6K5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
