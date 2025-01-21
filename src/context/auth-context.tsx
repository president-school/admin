import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getIdTokenResult,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Loader } from "lucide-react";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Foydalanuvchini kuzatish va avtomatik logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const tokenResult = await getIdTokenResult(currentUser);

          // Token muddati tugashini tekshirish
          const isTokenExpired =
            tokenResult.expirationTime &&
            new Date() > new Date(tokenResult.expirationTime);

          if (isTokenExpired) {
            await signOut(auth); // Token muddati tugadi - logout
            setUser(null);
          } else {
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Auth kuzatishda xatolik:", error);
          await signOut(auth); // Xato bo'lsa logout
          setUser(null);
        }
      } else {
        setUser(null); // Foydalanuvchi tizimdan chiqdi
      }
      setLoading(false); // Yangi holatni yuklash tugadi
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Login funksiyasi
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login xatolik:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register funksiyasi
  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Ro‘yxatdan o‘tishda xatolik:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout funksiyasi
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout xatolik:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {loading ? (
        <div className="w-full flex justify-center items-center h-screen">
          <Loader size={40} className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
