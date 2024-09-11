import { db } from './config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ObjType } from '../lib/types';

const addEmployee = async (data: ObjType) => {
  try {
    const employeesCollectionRef = collection(db, 'employees');
    const docRef = await addDoc(employeesCollectionRef, data);
    console.log('Employee added with ID:', docRef.id);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error adding employee:', error);
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
    console.log(employees);
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

const deleteEmployee = async (firestoreId: string) => {
  try {
    console.log('Attempting to delete employee with Firestore ID:', firestoreId);
    const employeeDoc = doc(db, 'employees', firestoreId);
    console.log('Document reference:', employeeDoc.path);
    await deleteDoc(employeeDoc);
    console.log('Employee deleted:', firestoreId);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

const editEmployee = async (id: string, data: any): Promise<void> => {
  try {
    console.log('Received ID for edit:', id);
    const employeeDoc = doc(db, 'employees', id);
    await updateDoc(employeeDoc, data);
    console.log('Employee updated:', id);
  } catch (error) {
    console.error('Error updating employee:', error);
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
      console.log('Text document updated:', docRef.id);
    } else {
      const newDocRef = await addDoc(textCollectionRef, { text: data });
      console.log('New text document created:', newDocRef.id);
    }
  } catch (error) {
    console.error('Error creating or updating text:', error);
    throw error;
  }
};

export { addEmployee, getEmployees, deleteEmployee, editEmployee, createOrUpdateText };
