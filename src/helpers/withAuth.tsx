import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const withAuth = (Component: ReactNode, redirectTo: string) => {
  return () => {
    const router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
      if (token) return Component;
      else return router.push(redirectTo);
    });
  };
};

export default withAuth;
