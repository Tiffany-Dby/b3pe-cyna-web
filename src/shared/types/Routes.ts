export enum AppRoutes {
  home = "/",
  products = "/products",
  settings = "/account/settings",
  subscriptions = "/account/subscriptions",
  signUp = "/sign-up",
  signIn = "/sign-in",
  cart = "/cart",
  checkout = "/checkout",
  resetPassword = "/reset-password",
}

export enum ApiRoutes {
  url = "http://localhost:8000",
  signUp = "/api/auth/register",
  signIn = "/api/auth/login",
  me = "/api/auth/me",
}
