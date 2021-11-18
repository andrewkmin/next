import { useRouter } from "next/router";
import { ReactNode,  useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const withAuth = (Component: ReactNode, redirectTo: string) => {
  return () => {
    const router = useRouter();
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);

    return Component;
  };
};

export default withAuth;
