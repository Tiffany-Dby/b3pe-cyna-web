const APP_ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  resetPassword: "/reset-password",
  accountSettings: "/account/settings",
  accountSubscriptions: "/account/subscriptions",
  products: "/products",
  product: "/products/:id",
  cart: "/cart",
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "dashboard",
  ADMIN_PRODUCTS: "products",
  ADMIN_PRODUCT: "product",
} as const;

const API_ROUTES = {
  url: "http://localhost:8000",
  signUp: "/api/auth/register",
  signIn: "/api/auth/login",
  me: "/api/auth/me",
  updateInfos: "/api/users/update",
  updatePassword: "/api/users/update-password",
} as const;

export { APP_ROUTES, API_ROUTES };
