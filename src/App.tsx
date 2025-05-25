import { Outlet, ScrollRestoration } from "react-router";
import BaseLayout from "@/shared/ui/components/BaseLayout";
import { Toaster } from "sonner";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const App = () => {
  const { getCart } = usePurchaseStore();

  useEffect(() => {
    // Crisp.configure(import.meta.env.VITE_CRISP_TOKEN);
    getCart();
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
