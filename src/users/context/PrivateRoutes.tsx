import { APP_ROUTES } from "@/shared/constants/routes";
import React from "react";
import { Navigate, Outlet } from "react-router";
import { UserRole } from "@/users/types/UserRole";
import { useAuth } from "@/users/context/AuthContext";

type Props = {
  roles?: UserRole[];
  redirectPath?: string;
  children?: React.ReactNode;
};

const PrivateRoutes = ({
  roles,
  redirectPath = APP_ROUTES.SIGN_IN,
  children,
}: Props) => {
  const { user } = useAuth();
  const hasAccess =
    user !== null && (roles?.length ? roles.includes(user.role) : !!user);

  if (!hasAccess) return <Navigate to={redirectPath} replace />;

  return children ?? <Outlet />;
};

export default PrivateRoutes;
