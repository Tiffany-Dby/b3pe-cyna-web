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
} as const;

const API_ROUTES = {
  url: "http://localhost:8000",
  signUp: "/api/auth/register",
  signIn: "/api/auth/login",
  me: "/api/auth/me",
} as const;

export { APP_ROUTES, API_ROUTES };
