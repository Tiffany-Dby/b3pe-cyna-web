import BaseLayout from "@/shared/ui/components/BaseLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "@/users/views/SignUp";
import { AppRoutes } from "@/shared/types/Routes";
import SignIn from "@/users/views/SignIn";
import Home from "@/shared/views/Home";
import { useAuth } from "@/users/context/AuthContext";
import PrivateRoutes from "@/users/context/PrivateRoutes";
import Dashboard from "@/users/views/Dashboard";
import ResetPassword from "@/users/views/ResetPassword";
import useScrollTrigger from "./shared/hooks/useScrollTrigger";

const App = () => {
  const { isAuthenticated } = useAuth();
  const scrolled = useScrollTrigger(50);

  return (
    <BrowserRouter>
      <BaseLayout scrolled={scrolled}>
        <Routes>
          <Route path={AppRoutes.home} element={<Home />} />
          <Route
            path={AppRoutes.signUp}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignUp />
              </div>
            }
          />
          <Route
            path={AppRoutes.signIn}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignIn />
              </div>
            }
          />
          <Route
            path={AppRoutes.resetPassword}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <ResetPassword />
              </div>
            }
          />

          <Route
            path={AppRoutes.account}
            element={
              <PrivateRoutes hasAccess={isAuthenticated}>
                <div className="max-w-xl w-full mx-auto py-5 px-4">
                  <Dashboard />
                </div>
              </PrivateRoutes>
            }
          />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
};

export default App;
