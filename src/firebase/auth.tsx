import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const login = async (email: string, password: string) => {
  const data: any = await signInWithEmailAndPassword(auth, email, password);

  return {
    email: data?._tokenResponse.email,
    role:
      data?._tokenResponse.email === "adimin@gmail.com"
        ? "admin"
        : "superAdmin",
  };
};
