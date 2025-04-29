import account from "./account.json";
import common from "./common.json";
import home from "./home.json";
import layout from "./layout.json";
import notFound from "./notFound.json";
import products from "./products.json";
import resetPassword from "./resetPassword.json";
import signIn from "./signIn.json";
import signUp from "./signUp.json";
import cart from "./cart.json";
import adminSidebar from "./adminSidebar.json";

const en = {
  account,
  common,
  home,
  layout,
  notFound,
  products,
  resetPassword,
  signIn,
  signUp,
  cart,
  adminSidebar,
} as const;

export { en };
