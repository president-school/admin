/* eslint-disable @typescript-eslint/no-explicit-any */
import { db, storage } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ObjType } from "../lib/types";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
const newDate = Date.now();
const addEmployee = async (formData: ObjType) => {
  try {
    const {
      full_name,
      description,
      education,
      role,
      scientific_degree,
      isTeacher,
      phone,
      email,
      admission_days,
      photo,
      position,
      number
    } = formData;

    const employeeData = {
      full_name,
      description,
      education,
      role,
      scientific_degree,
      isTeacher,
      phone,
      email,
      admission_days,
      photo,
      position,
      number,
      newDate,
    };

    const employeesCollectionRef = collection(db, "employees");
    const docRef = await addDoc(employeesCollectionRef, employeeData);

    return { id: docRef.id, ...employeeData };
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

const uploadFile = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("No file selected for upload.");
  }

  const uniqueFileName = `images/${file.name}-${uuidv4()}`;
  const imageRef = storageRef(storage, uniqueFileName);

  await uploadBytes(imageRef, file);

  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
};

const getEmployeeById = async (id: string): Promise<ObjType | null> => {
  try {
    const employeeDocRef = doc(db, "employees", id);
    const employeeDocSnap = await getDoc(employeeDocRef);

    if (employeeDocSnap.exists()) {
      return { id: employeeDocSnap.id, ...employeeDocSnap.data() } as ObjType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    throw error;
  }
};
const getEmployees = async (): Promise<ObjType[]> => {
  try {
    const employeesCollectionRef = collection(db, "employees");
    const querySnapshot = await getDocs(employeesCollectionRef);
    const employees: ObjType[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as ObjType),
    }));
    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

const deleteEmployee = async (firestoreId: string | number | undefined) => {
  if (firestoreId === undefined) {
    throw new Error("firestoreId is required");
  }

  try {
    console.log(
      "Attempting to delete employee with Firestore ID:",
      firestoreId
    );
    const employeeDoc = doc(db, "employees", String(firestoreId));
    // console.log("Document reference:", employeeDoc.path);
    await deleteDoc(employeeDoc);
    // console.log("Employee deleted:", firestoreId);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

const editEmployee = async (id: string, data: any): Promise<void> => {
  try {
    // console.log("Received ID for edit:", id);
    const employeeDoc = doc(db, "employees", id);
    await updateDoc(employeeDoc, data);
    // console.log("Employee updated:", id);
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

interface IHtmlToText {
  description: string;
}
const convertTextToHtml = (input: string) => {
  if (typeof input === "object") {
    console.error(
      "Invalid input: Expected a string, but received an object. Extracting text..."
    );
    // console.log("Input object:", input);

    input = (input as IHtmlToText).description || "";
  }

  if (typeof input !== "string") {
    console.error(
      "Invalid input: Expected a string, but received:",
      typeof input
    );
    return "";
  }

  let html = input
    .split("\n")
    .map((line) => {
      line = line.trim();
      if (line) {
        return `<p>${line}</p>`;
      }
      return "";
    })
    .join("");

  html = html.replace(/➖/g, "<li>").replace(/✅/g, "<b>");

  html = html.replace(/Maktabga qabul:/, "<h3>Maktabga qabul:</h3>");

  return `<div>${html}</div>`;
};

const createOrUpdateText = async (html: string) => {
  try {
    const data = convertTextToHtml(html);

    const textCollectionRef = collection(db, "text");
    const querySnapshot = await getDocs(textCollectionRef);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { text: data });
      console.log("Text document updated:", docRef.id);
    } else {
      const newDocRef = await addDoc(textCollectionRef, { text: data });
      console.log("New text document created:", newDocRef.id);
    }
  } catch (error) {
    console.error("Error creating or updating text:", error);
    throw error;
  }
};

export {
  addEmployee,
  getEmployees,
  deleteEmployee,
  editEmployee,
  createOrUpdateText,
  uploadFile,
  getEmployeeById,
};
