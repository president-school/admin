import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: 'AIzaSyAuOA5J54sSMr59g4Qc0ylxaisGTxdnCIk',
//   authDomain: 'president-school-8273b.firebaseapp.com',
//   projectId: 'president-school-8273b',
//   storageBucket: 'president-school-8273b.appspot.com',
//   messagingSenderId: '961384384206',
//   appId: '1:961384384206:web:2b5113094761cbe16cf29f',
//   measurementId: 'G-24MHLM0KYR',
// };

// const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyDTIcrd7p2gll1F6wyr-rdoHG0F5fwPxko",
  authDomain: "qarshiimi-412d4.firebaseapp.com",
  projectId: "qarshiimi-412d4",
  storageBucket: "qarshiimi-412d4.appspot.com",
  messagingSenderId: "243683096377",
  appId: "1:243683096377:web:b192a426a2ba57e94b9ae8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Firestore and Storage instances
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
