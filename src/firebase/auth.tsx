import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
