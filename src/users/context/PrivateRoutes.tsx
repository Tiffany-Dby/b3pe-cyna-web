import { APP_ROUTES } from "@/shared/constants/routes";
import React from "react";
import { Navigate, Outlet } from "react-router";

type PrivateRoutesProps = {
  hasAccess: boolean;
  redirectPath?: string;
  children: React.ReactNode;
};

const PrivateRoutes = ({
  hasAccess,
  redirectPath = APP_ROUTES.signIn,
  children,
}: PrivateRoutesProps) => {
  if (!hasAccess) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoutes;
