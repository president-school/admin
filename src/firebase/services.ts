import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "./config";
import { useEffect, useState } from "react";
import { message } from "antd";

export function GetFirebaseData<T>(path: string) {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<any>();
  const fetchingData = async (load: boolean) => {
    try {
      if (load) setLoading(true);
      const getCollection = collection(db, path);
      const dataRes = await getDocs(getCollection);
      const filterData = dataRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //   @ts-ignore
      setData(filterData);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      if (load) setLoading(false);
    }
  };
  useEffect(() => {
    fetchingData(true);
  }, []);
  const refresh = () => {
    fetchingData(false);
  };
  return { data, loading, error, refresh };
}

export function GetFirebaseDataById(path: string, id: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const getCollection = doc(db, path, id);
      const res = await getDoc(getCollection);
      if (res.exists()) {
        setData(res.data());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading };
}

export function PostFirebaseData(path: string) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fetchingData = async (data: any) => {
    try {
      setLoading(true);
      const postCollection = collection(db, path);
      const res = await addDoc(postCollection, data);
      console.log(res);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchingData, success };
}

export function UpdateData(path: string) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fetchData = async (id: string, data: any) => {
    try {
      setLoading(true);
      const docRef = doc(db, path, id);
      const res: any = await updateDoc(docRef, data);
      console.log(res);

      message.success("update success");
      setSuccess(true);
    } catch (err) {
      message.success("update error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, success, fetchData };
}
export const uploadFiles = async (
  files: File[],
  onProgress?: (progress: number) => void // Progressni kuzatish uchun callback
): Promise<string[]> => {
  if (!files || files.length === 0) {
    throw new Error("Yuklash uchun fayllar tanlanmagan.");
  }

  try {
    const uploadPromises = files.map((file, index) => {
      const uniqueFileName = `images/${file.name}-${uuidv4()}`;
      const imageRef = storageRef(storage, uniqueFileName);

      return new Promise<string>((resolve, reject) => {
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            if (onProgress) {
              const progress =
                ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) /
                files.length;
              onProgress(progress + index * (100 / files.length)); // Har bir faylning progressini hisoblash
            }
          },
          (error) => {
            console.error("Fayl yuklashda xatolik:", error);
            reject(
              new Error(`Faylni yuklashda muammo yuz berdi: ${file.name}`)
            );
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              console.error("URL olishda xatolik:", error);
              reject(new Error(`Fayl URL'ini olishda xatolik: ${file.name}`));
            }
          }
        );
      });
    });

    const urls = await Promise.all(uploadPromises); // Barcha fayllarni parallel yuklash
    return urls;
  } catch (error) {
    console.error("Yuklash jarayonida xatolik:", error);
    throw new Error("Fayllarni yuklash jarayonida xatolik yuz berdi.");
  }
};

const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export const uploadVideos = async (
  files: File[],
  onProgress?: (progress: number) => void // Progressni kuzatish uchun callback
): Promise<string[]> => {
  if (!files || files.length === 0) {
    throw new Error("Yuklash uchun videolar tanlanmagan.");
  }

  // Fayllar hajmini tekshirish
  const oversizedFiles = files.filter((file) => file.size > MAX_VIDEO_SIZE);
  if (oversizedFiles.length > 0) {
    const oversizedFileNames = oversizedFiles
      .map((file) => file.name)
      .join(", ");
    throw new Error(
      `Quyidagi fayllar hajmi 100MB dan oshgan: ${oversizedFileNames}`
    );
  }

  try {
    const uploadPromises = files.map((file, index) => {
      const uniqueFileName = `videos/${file.name}-${uuidv4()}`; // Fayl nomi va UUID
      const videoRef = ref(storage, uniqueFileName); // To'g'ri referens yaratiladi

      return new Promise<string>((resolve, reject) => {
        const uploadTask = uploadBytesResumable(videoRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            if (onProgress) {
              const progress =
                ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) /
                files.length;
              onProgress(progress + index * (100 / files.length)); // Har bir fayl progressini hisoblash
            }
          },
          (error) => {
            console.error("Video yuklashda xatolik:", error);
            reject(new Error(`Video yuklashda muammo yuz berdi: ${file.name}`));
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(videoRef); // `getDownloadURL` to'g'ri ishlaydi
              resolve(downloadURL);
            } catch (error) {
              console.error("URL olishda xatolik:", error);
              reject(new Error(`Video URL'ini olishda xatolik: ${file.name}`));
            }
          }
        );
      });
    });

    const urls = await Promise.all(uploadPromises); // Barcha videolarni parallel yuklash
    return urls;
  } catch (error) {
    console.error("Yuklash jarayonida xatolik:", error);
    throw new Error("Videolarni yuklash jarayonida xatolik yuz berdi.");
  }
};
export const refreshUrl = async (filePath: string): Promise<string> => {
  const fileRef = ref(storage, filePath);
  return await getDownloadURL(fileRef);
};

export const DeleteData = (path: string) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const deleteFun = async (id: any) => {
    try {
      setLoading(true);
      // Hujjatga murojaat
      const docRef = doc(db, path, id);
      // Hujjatni o'chirish
      await deleteDoc(docRef);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFun, loading, success };
};

export const uploadFile = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("No file selected for upload.");
  }

  const uniqueFileName = `images/${file.name}-${uuidv4()}`;
  const imageRef = storageRef(storage, uniqueFileName);

  await uploadBytes(imageRef, file);

  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
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
export const createOrUpdateText = async (
  de: string,
  en: string,
  uz: string
) => {
  try {
    const text_de = convertTextToHtml(de);
    const text_en = convertTextToHtml(en);
    const text_uz = convertTextToHtml(uz);
    const data = {
      uz: {
        text: text_uz,
      },
      de: {
        text: text_de,
      },
      en: {
        text: text_en,
      },
    };
    console.log(data);

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
