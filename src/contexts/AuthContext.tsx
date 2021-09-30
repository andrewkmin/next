import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
} from "react";
import axios from "../helpers/axios";
import type { User } from "../types/user";

export const AuthContext = createContext<{
  user?: Partial<User> | null;
  setUser?: Dispatch<SetStateAction<Partial<User> | null>>;
}>({});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const auth = async () => {
      const { data, status } = await axios.get("/auth");
      if (status === 200) setUser(data);
      else console.warn("Couldn't authenticate the user from the context");
    };

    if (!user) auth();
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext.Provider was not initialized");
  return context;
};
