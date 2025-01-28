import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_Api_key,
  authDomain: import.meta.env.VITE_Auth_domain,
  projectId: import.meta.env.VITE_ProjectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_AppId,
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
