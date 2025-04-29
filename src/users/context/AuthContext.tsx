import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearStorage,
  getFromStorage,
  setToStorage,
} from "@/shared/utils/localStorage";
import { SignInResponse, UserResponse } from "@/users/types/SignIn";
import useFetch from "@/shared/hooks/useFetch";
import { API_ROUTES } from "@/shared/constants/routes";

type AuthContextType = {
  token?: SignInResponse["access"];
  user: User;
  onSignIn: (userData: SignInResponse) => void;
  onSignOut: () => void;
  isAuthenticated: boolean;
};

type User = UserResponse | null;

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<AuthContextType["token"]>(
    () => getFromStorage<AuthContextType["token"]>("token") ?? undefined
  );
  const [user, setUser] = useState<UserResponse | null>(null);

  const { data, error, isLoading } = useFetch<UserResponse>(
    API_ROUTES.ME,
    token
  );

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  useEffect(() => {
    if (error) onSignOut();
  }, [error]);

  const onSignIn = (userData: SignInResponse) => {
    setToken(userData.access);
    setUser(userData.user);

    setToStorage("token", userData.access);
  };

  const onSignOut = () => {
    setToken(undefined);
    setUser(null);
    clearStorage();
  };

  const isAuthenticated = !!token;
  // const isAuthenticated = true;

  return (
    <AuthContext.Provider
      value={{ token, user, onSignIn, onSignOut, isAuthenticated }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export { AuthProvider, useAuth };
