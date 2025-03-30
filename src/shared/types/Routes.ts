import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";

type AppRoutes = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
type ApiRoutes = (typeof API_ROUTES)[keyof typeof API_ROUTES];

export type { AppRoutes, ApiRoutes };

/*
enum AppRoutes {
  home = "/",
  signUp = "/sign-up",
  signIn = "/sign-in",
  resetPassword = "/reset-password",
  accountSettings = "/account/settings",
  accountSubscriptions = "/account/subscriptions",
  products = "/products",
  product = "/product/:id",
  cart = "/cart",
  checkout = "/checkout",
}
enum ApiRoutes {
  url = "http://localhost:8000",
  signUp = "/api/auth/register",
  signIn = "/api/auth/login",
  me = "/api/auth/me",
}

export { AppRoutes, ApiRoutes };
*/
