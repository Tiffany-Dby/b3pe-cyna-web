import { BrowserRouter, Route, Routes } from "react-router";
import { AppRoutes } from "@/shared/types/Routes";
import { useAuth } from "@/users/context/AuthContext";
import PrivateRoutes from "@/users/context/PrivateRoutes";
import BaseLayout from "@/shared/ui/components/BaseLayout";
import HomeView from "@/shared/views/HomeView";
import SignInView from "@/users/views/SignInView";
import SignUpView from "@/users/views/SignUpView";
import SettingsView from "@/users/views/SettingsView";
import ResetPasswordView from "@/users/views/ResetPasswordView";
import ProductView from "@/products/views/ProductView";
import NotFoundView from "./shared/views/NotFoundView";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path={AppRoutes.home} element={<HomeView />} />
          <Route
            path={AppRoutes.signUp}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignUpView />
              </div>
            }
          />
          <Route
            path={AppRoutes.signIn}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignInView />
              </div>
            }
          />
          <Route
            path={AppRoutes.resetPassword}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <ResetPasswordView />
              </div>
            }
          />

          <Route path={AppRoutes.products} element={<ProductView />} />

          <Route
            path={AppRoutes.settings}
            element={
              <PrivateRoutes hasAccess={isAuthenticated}>
                <div className="max-w-xl w-full mx-auto py-5 px-4">
                  <SettingsView />
                </div>
              </PrivateRoutes>
            }
          />

          <Route
            path="*"
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <NotFoundView />
              </div>
            }
          />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
};

export default App;
