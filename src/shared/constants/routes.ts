const APP_ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  RESET_PASSWORD: "/reset-password",
  ACCOUNT_SETTINGS: "/account/settings",
  ACCOUNT_SUBSCRIPTIONS: "/account/subscriptions",
  PRODUCTS: "/products",
  PRODUCT: "/products/:id",
  CART: "/cart",
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "dashboard",
  ADMIN_PRODUCTS: "products",
  ADMIN_PRODUCT: "product",
  ADMIN_CATEGORY_ALL: "categories",
  ADMIN_CATEGORY_NEW: "categories/new",
} as const;

const API_ROUTES = {
  URL: "http://localhost:8000",
  SIGN_UP: "/api/auth/register",
  SIGN_IN: "/api/auth/login",
  ME: "/api/auth/me",
  USER_UPDATE_INFOS: "/api/users/update",
  USER_UPDATE_PASSWORD: "/api/users/update-password",
  CATEGORY_GET_ALL: "/api/categories/get-all-locales",
  CATEGORY_NEW: "/api/categories/add",
  CATEGORY_NEW_LOCALE: "/api/categories/add-locale",
} as const;

export { APP_ROUTES, API_ROUTES };
