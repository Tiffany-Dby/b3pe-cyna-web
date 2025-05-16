import { Outlet, ScrollRestoration } from "react-router";
import BaseLayout from "@/shared/ui/components/BaseLayout";
import { Toaster } from "sonner";
import { usePurchaseStore } from "./purchase/store/purchaseStore";
import { useEffect } from "react";

const App = () => {
  const { getCart } = usePurchaseStore();
  useEffect(() => {
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
