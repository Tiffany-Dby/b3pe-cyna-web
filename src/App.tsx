import { BrowserRouter, Route, Routes } from "react-router";
import { useAuth } from "@/users/context/AuthContext";
import { APP_ROUTES } from "@/shared/constants/routes";
import PrivateRoutes from "@/users/context/PrivateRoutes";
import BaseLayout from "@/shared/ui/components/BaseLayout";
import HomeView from "@/shared/views/HomeView";
import SignInView from "@/users/views/SignInView";
import SignUpView from "@/users/views/SignUpView";
import SettingsView from "@/users/views/SettingsView";
import ResetPasswordView from "@/users/views/ResetPasswordView";
import ProductView from "@/products/views/ProductView";
import NotFoundView from "@/shared/views/NotFoundView";
import CartView from "@/purchase/views/CartView";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path={APP_ROUTES.home} element={<HomeView />} />
          <Route
            path={APP_ROUTES.signUp}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignUpView />
              </div>
            }
          />
          <Route
            path={APP_ROUTES.signIn}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignInView />
              </div>
            }
          />
          <Route
            path={APP_ROUTES.resetPassword}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <ResetPasswordView />
              </div>
            }
          />

          <Route
            path={APP_ROUTES.accountSettings}
            element={
              <PrivateRoutes hasAccess={isAuthenticated}>
                <div className="max-w-xl w-full mx-auto py-5 px-4">
                  <SettingsView />
                </div>
              </PrivateRoutes>
            }
          />

          <Route path={APP_ROUTES.products} element={<ProductView />} />

          <Route path={APP_ROUTES.cart} element={<CartView />} />

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
