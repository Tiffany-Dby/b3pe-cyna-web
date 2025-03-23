export enum AppRoutes {
  home = "/",
  products = "/produits",
  account = "/account",
  signUp = "/sign-up",
  signIn = "/sign-in",
  checkout = "/checkout",
  resetPassword = "/reset-password",
}

export enum ApiRoutes {
  url = "http://localhost:8000",
  signUp = "/api/auth/register",
  signIn = "/api/auth/login",
  me = "/api/auth/me",
}
