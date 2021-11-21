import { isEmpty } from "lodash";
import axios from "../helpers/axios";
import { useUser } from "../stores/useUser";
import { createContext, useEffect } from "react";
import { setAxiosBearerToken } from "../helpers/axios";
import { useTokenStore } from "../stores/useTokenStore";

const AuthContext = createContext(null);

const Context = ({ children }: any) => {
  // prettier-ignore
  const [user, setUser, removeUser] = useUser(({ user, setUser, removeUser }) => [user, setUser, removeUser]);
  // prettier-ignore
  const [tokens, setTokens, removeTokens] = useTokenStore(({ refreshToken, accessToken, setTokens, removeTokens }) => [{ accessToken, refreshToken }, setTokens, removeTokens]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });
        return setUser(data);
      } catch (error) {
        console.error({ error });
      }
    };

    if (isEmpty(user)) getUser();

    return () => {};
  }, [tokens]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default Context;
