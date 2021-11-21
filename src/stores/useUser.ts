import create from "zustand";

export interface User {
  id: string;
  bio: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  last_name: string;
  first_name: string;
}

interface Store {
  user: Partial<User>;
  removeUser: () => void;
  setUser: (state: Partial<User>) => void;
}

export const useUser = create<Store>((set) => ({
  user: {},
  removeUser: () => set({ user: {} }),
  setUser: (state: Partial<User>) => set({ user: state }),
}));
