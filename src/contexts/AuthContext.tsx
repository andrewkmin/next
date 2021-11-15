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
    const token = localStorage.getItem("token");

    if (token !== null) {
      axios.defaults.headers.common = {
        Authorization: token!!,
      };
    }

    const listener = (window.onbeforeunload = () => {
      localStorage.setItem("token", token!!);
      setToken(null);
    });

    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

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
