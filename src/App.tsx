import { Outlet, ScrollRestoration } from "react-router";
import BaseLayout from "@/shared/ui/components/BaseLayout";
import { Toaster } from "sonner";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { useEffect } from "react";
import { useAuth } from "@/users/context/AuthContext";
import { useProductsStore } from "./products/store/productsStore";
import { useTranslation } from "react-i18next";
// import { Crisp } from "crisp-sdk-web";

const App = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? "en";

  const { getProductsLocale } = useProductsStore();
  const { getCart } = usePurchaseStore();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) getCart();
  }, [isAuthenticated]);

  useEffect(() => {
    // Crisp.configure(import.meta.env.VITE_CRISP_TOKEN);
    getProductsLocale(locale);
  }, []);

  return (
    <>
      <ScrollRestoration />
      <BaseLayout>
        <Outlet />
        <Toaster richColors position="top-center" closeButton />
      </BaseLayout>
    </>
  );
};

export default App;
