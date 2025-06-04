import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";
import { UserRole } from "@/users/types/UserRole";
import App from "@/App";
import HomeView from "@/home/ui/views/HomeView";
import SignUpView from "@/users/ui/views/SignUpView";
import SignInView from "@/users/ui/views/SignInView";
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
import AdminDashboardView from "@/dashboard/ui/views/AdminDashboardView";
import CheckoutView from "@/purchase/ui/views/CheckoutView";
import AddressView from "@/purchase/ui/views/AddressView";
import PurchaseLayout from "@/purchase/ui/components/PurchaseLayout";
import SuccessView from "@/purchase/ui/views/SuccessView";
import ResetPasswordView from "@/users/ui/views/ResetPasswordView";
import TermsOfUseView from "@/shared/ui/views/TermsOfUseView";
import LegalNoticeView from "@/shared/ui/views/LegalNoticeView";
import SubscriptionsView from "@/users/ui/views/SubscriptionsView";
import AccountView from "@/users/ui/views/AccountView";
import HistoryView from "@/users/ui/views/HistoryView";

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
          { index: true, Component: AccountView },
          { path: APP_ROUTES.ACCOUNT_SETTINGS, Component: SettingsView },
          {
            path: APP_ROUTES.ACCOUNT_SUBSCRIPTIONS,
            Component: SubscriptionsView,
          },
          {
            path: APP_ROUTES.ACCOUNT_HISTORY,
            Component: HistoryView,
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
        path: APP_ROUTES.PURCHASE,
        Component: PurchaseLayout,
        children: [
          { index: true, path: APP_ROUTES.PURCHASE_CART, Component: CartView },
          { path: APP_ROUTES.PURCHASE_ADDRESS, Component: AddressView },
          { path: APP_ROUTES.PURCHASE_CHECKOUT, Component: CheckoutView },
        ],
      },
      {
        path: APP_ROUTES.CHECKOUT_SUCCESS,
        Component: SuccessView,
      },
      {
        path: APP_ROUTES.LEGAL_TERMS_OF_USE,
        Component: TermsOfUseView,
      },
      {
        path: APP_ROUTES.LEGAL_NOTICE,
        Component: LegalNoticeView,
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
          {
            index: true,
            path: APP_ROUTES.ADMIN_DASHBOARD_SALES,
            Component: AdminDashboardView,
          },
          {
            path: APP_ROUTES.ADMIN_DASHBOARD_CUSTOMERS,
            element: <p>Dashboard/customers</p>,
          },
          {
            path: APP_ROUTES.ADMIN_SUPPORT_TICKETS,
            element: <p>Supprt/tickets</p>,
          },
          {
            path: APP_ROUTES.ADMIN_SUPPORT_CHATBOT,
            element: <p>Supprt/chatbot</p>,
          },
          {
            path: APP_ROUTES.ADMIN_SETTINGS_GENERAL,
            element: <p>Settings/general</p>,
          },
          {
            path: APP_ROUTES.ADMIN_SETTINGS_PAYMENTS,
            element: <p>Settings/payments</p>,
          },
          {
            path: APP_ROUTES.ADMIN_SETTINGS_LANGUAGES,
            element: <p>Settings/languages</p>,
          },
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
          {
            path: APP_ROUTES.ADMIN_USERS_CLIENTS,
            element: <p>Users/clients</p>,
          },
        ],
      },
    ],
  },
]);

export { router };
