import create from "zustand";
import { isServer } from "../lib/isServer";
import { combine } from "zustand/middleware";

const accessTokenKey = "@polygon/token";
const refreshTokenKey = "@polygon/refresh-token";

const getDefaultValues = (): { accessToken: string; refreshToken: string } => {
  if (!isServer)
    return {
      accessToken: localStorage.getItem(accessTokenKey) || "",
      refreshToken: localStorage.getItem(refreshTokenKey) || "",
    };

  return {
    accessToken: "",
    refreshToken: "",
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setTokens: (values: { accessToken: string; refreshToken: string }) => {
      localStorage.setItem(accessTokenKey, values.accessToken);
      localStorage.setItem(refreshTokenKey, values.refreshToken);
      return set(values);
    },

    removeTokens: () => set({ accessToken: "", refreshToken: "" }),
  }))
);
