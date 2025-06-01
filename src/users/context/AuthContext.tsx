import { createContext, useContext, useEffect, useState } from "react";
import { UserResponse } from "@/users/types/SignIn";
import useFetch from "@/shared/hooks/useFetch";
import { API_ROUTES } from "@/shared/constants/routes";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
  signOut,
} from "@/shared/tools/auth";
import { UserRole } from "@/users/types/UserRole";

type SignInResponse = {
  access: string;
  user: UserResponse;
};

type AuthContextType = {
  user: UserResponse | null;
  onSignIn: (response: SignInResponse) => void;
  onSignOut: () => void;
  onUserUpdate: (user: UserResponse) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const { data, isLoading } = useFetch<UserResponse>(API_ROUTES.ME);

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  const onSignIn = (response: SignInResponse) => {
    setAccessToken(response.access);
    setUser(response.user);
  };

  const onSignOut = () => {
    clearAccessToken();
    setUser(null);
    signOut();
  };

  const onUserUpdate = (u: UserResponse) => setUser(u);

  const isAuthenticated = !!getAccessToken();
  const isAdmin = user?.role === UserRole.admin;

  return (
    <AuthContext.Provider
      value={{
        user,
        onSignIn,
        onSignOut,
        onUserUpdate,
        isAuthenticated,
        isAdmin,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");

  return ctx;
};

export { AuthProvider, useAuth };
