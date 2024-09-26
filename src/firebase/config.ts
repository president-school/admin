import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {apiKey: 'AIzaSyAuOA5J54sSMr59g4Qc0ylxaisGTxdnCIk',
  authDomain: 'president-school-8273b.firebaseapp.com',
  projectId: 'president-school-8273b',
  storageBucket: 'president-school-8273b.appspot.com',
  messagingSenderId: '961384384206',
  appId: '1:961384384206:web:2b5113094761cbe16cf29f',
  measurementId: 'G-24MHLM0KYR',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
