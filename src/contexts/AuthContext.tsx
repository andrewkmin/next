import axios from "../helpers/axios";
import { createContext, useContext } from "react";

const AuthContext = createContext<{ user?: any }>({});

export const getUser = async () => {
  try {
    const { data, status } = await axios.get("/auth");
    if (status !== 200) return { user: null };
    else return { user: data };
  } catch (error) {
    return { user: null };
  }
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuth = () => useContext(AuthContext);
