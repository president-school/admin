import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  where,
  query,
} from 'firebase/firestore';
import { ObjType } from '../lib/types';

const addEmployee = async (data: ObjType) => {
  try {
    const employeesCollectionRef = collection(db, 'employees');
    await addDoc(employeesCollectionRef, data);
    return { id: data.id, ...data };
  } catch (error) {
    throw error;
  }
};

const getEmployees = async (): Promise<ObjType[]> => {
  try {
    const employeesCollectionRef = collection(db, 'employees');
    const querySnapshot = await getDocs(employeesCollectionRef);
    const employees: ObjType[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as ObjType),
    }));
    return employees;
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (id: string) => {
  try {
    const employeeDoc = doc(db, 'employees', id);
    await deleteDoc(employeeDoc);
  } catch (error) {
    throw error;
  }
};

const editEmployee = async (id: string, data: any): Promise<void> => {
  try {
    const employeeDoc = doc(db, 'employees', id);
    await updateDoc(employeeDoc, data);
  } catch (error) {
    console.error("Xodimni o'zgartirishda xato:", error);
    throw error;
  }
};

const createOrUpdateText = async (data: string) => {
  try {
    const textCollectionRef = collection(db, 'text');

    const querySnapshot = await getDocs(textCollectionRef);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { text: data });
    } else {
      await addDoc(textCollectionRef, { text: data });
    }
  } catch (error) {
    throw error;
  }
};

export { addEmployee, getEmployees, deleteEmployee, editEmployee, createOrUpdateText };
