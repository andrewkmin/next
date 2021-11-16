import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
} from "react";
import axios from "../helpers/axios";

export const AuthContext = createContext<{
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}>({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const __token = localStorage.getItem("token");
    if (__token !== null)
      axios.defaults.headers.common = {
        Authorization: __token,
      };
    if (__token === null) localStorage.removeItem("token");

    // Adding an event listener
    const listener = window.addEventListener("beforeunload", () => {
      if (token !== null) {
        localStorage.setItem("token", token!!);
        return setToken(null);
      }
    });

    return () => {
      // Cleaning up the listeners
      window.removeEventListener("beforeunload", listener as any);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("`AuthContext.Provider` was not initialized");
  return context;
};
