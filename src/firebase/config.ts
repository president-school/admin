import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDTIcrd7p2gll1F6wyr-rdoHG0F5fwPxko",
  authDomain: "qarshiimi-412d4.firebaseapp.com",
  projectId: "qarshiimi-412d4",
  storageBucket: "qarshiimi-412d4.appspot.com",
  messagingSenderId: "243683096377",
  appId: "1:243683096377:web:b192a426a2ba57e94b9ae8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
