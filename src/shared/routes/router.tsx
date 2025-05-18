import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";
import { UserRole } from "@/users/types/UserRole";
import App from "@/App";
import HomeView from "@/home/ui/views/HomeView";
import SignUpView from "@/users/ui/views/SignUpView";
import SignInView from "@/users/ui/views/SignInView";
import ResetPasswordView from "@/users/ui/views/ResetPasswordView";
import PrivateRoutes from "@/users/context/PrivateRoutes";
import SettingsView from "@/users/ui/views/SettingsView";
import ProductView from "@/products/ui/views/ProductView";
import NotFoundView from "@/shared/ui/views/NotFoundView";
import AdminLayout from "@/shared/ui/components/AdminLayout";
import AdminProductsView from "@/products/ui/views/AdminProductsView";
import AdminUpdateProductView from "@/products/ui/views/AdminUpdateProductView";
import AdminCategoriesView from "@/categories/ui/views/AdminCategoriesView";
import AdminUpdateProductTranslationView from "@/products/ui/views/AdminUpdateProductTranslationView";
import CartView from "@/purchase/ui/views/CartView";
import ProductsView from "@/products/ui/views/ProductsView";
import AdminPromotionsCarouselView from "@/home/ui/views/AdminPromotionsCarouselView";
import AdminAllAdminsView from "@/users/ui/views/AdminAllAdminsView";

const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    Component: App,
    children: [
      { index: true, Component: HomeView },
      {
        path: APP_ROUTES.SIGN_UP,
        Component: SignUpView,
      },
      {
        path: APP_ROUTES.SIGN_IN,
        Component: SignInView,
      },
      {
        path: APP_ROUTES.RESET_PASSWORD,
        Component: ResetPasswordView,
      },
      {
        path: APP_ROUTES.ACCOUNT,
        Component: PrivateRoutes,
        children: [
          { path: APP_ROUTES.ACCOUNT_SETTINGS, Component: SettingsView },
          {
            path: APP_ROUTES.ACCOUNT_SUBSCRIPTIONS,
            element: <p>Subscriptions</p>,
          },
        ],
      },
      {
        path: APP_ROUTES.PRODUCTS,
        Component: ProductsView,
      },
      {
        path: APP_ROUTES.PRODUCT,
        Component: ProductView,
      },
      {
        path: APP_ROUTES.CART,
        Component: CartView,
      },
      {
        path: "*",
        Component: NotFoundView,
      },
    ],
  },
  {
    element: <PrivateRoutes roles={[UserRole.admin]} />,
    children: [
      {
        path: APP_ROUTES.ADMIN,
        Component: AdminLayout,
        children: [
          { index: true, element: <p>Index</p> },
          { path: APP_ROUTES.ADMIN_DASHBOARD, element: <p>Dashboard</p> },
          {
            path: APP_ROUTES.ADMIN_PROMOTION_CAROUSEL,
            Component: AdminPromotionsCarouselView,
          },
          { path: APP_ROUTES.ADMIN_PRODUCTS, Component: AdminProductsView },
          { path: APP_ROUTES.ADMIN_PRODUCT, Component: AdminUpdateProductView },
          {
            path: APP_ROUTES.ADMIN_PRODUCT_TRANSLATION,
            Component: AdminUpdateProductTranslationView,
          },
          {
            path: APP_ROUTES.ADMIN_CATEGORIES,
            Component: AdminCategoriesView,
          },
          {
            path: APP_ROUTES.ADMIN_USERS_ADMINS,
            Component: AdminAllAdminsView,
          },
        ],
      },
    ],
  },
]);

export { router };
