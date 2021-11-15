import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

export const UserContext = createContext<{
  user: object | null;
  setUser: Dispatch<SetStateAction<object | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<object | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("`UserContext.Provider` was not initialized");
  return context;
};
