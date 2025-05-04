import { BrowserRouter, Route, Routes } from "react-router";
import { useAuth } from "@/users/context/AuthContext";
import { APP_ROUTES } from "@/shared/constants/routes";
import PrivateRoutes from "@/users/context/PrivateRoutes";
import BaseLayout from "@/shared/ui/components/BaseLayout";
import HomeView from "@/shared/ui/views/HomeView";
import SignInView from "@/users/ui/views/SignInView";
import SignUpView from "@/users/ui/views/SignUpView";
import SettingsView from "@/users/ui/views/SettingsView";
import ResetPasswordView from "@/users/ui/views/ResetPasswordView";
import ProductView from "@/products/ui/views/ProductView";
import NotFoundView from "@/shared/ui/views/NotFoundView";
import CartView from "@/purchase/ui/views/CartView";
import AdminLayout from "@/shared/ui/components/AdminLayout";
import { UserRole } from "@/users/types/UserRole";
import AdminCategoriesView from "@/categories/ui/views/AdminCategoriesView";

const App = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path={APP_ROUTES.HOME} element={<HomeView />} />
          <Route
            path={APP_ROUTES.SIGN_UP}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignUpView />
              </div>
            }
          />
          <Route
            path={APP_ROUTES.SIGN_IN}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <SignInView />
              </div>
            }
          />
          <Route
            path={APP_ROUTES.RESET_PASSWORD}
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <ResetPasswordView />
              </div>
            }
          />

          <Route
            path={APP_ROUTES.ACCOUNT_SETTINGS}
            element={
              <PrivateRoutes hasAccess={isAuthenticated}>
                <div className="max-w-xl w-full mx-auto py-5 px-4">
                  <SettingsView />
                </div>
              </PrivateRoutes>
            }
          />

          <Route path={APP_ROUTES.PRODUCTS} element={<ProductView />} />

          <Route path={APP_ROUTES.CART} element={<CartView />} />

          <Route
            path="*"
            element={
              <div className="max-w-xl w-full mx-auto py-5 px-4">
                <NotFoundView />
              </div>
            }
          />
        </Route>
        <Route
          element={<PrivateRoutes hasAccess={user?.role === UserRole.admin} />}
        >
          <Route path={APP_ROUTES.ADMIN} element={<AdminLayout />}>
            <Route index element={<p>Index</p>} />
            <Route
              path={APP_ROUTES.ADMIN_DASHBOARD}
              element={<p>Dashboard</p>}
            />
            <Route path={APP_ROUTES.ADMIN_PRODUCT} element={<p>Product</p>} />
            <Route
              path={APP_ROUTES.ADMIN_CATEGORIES}
              element={<AdminCategoriesView />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
