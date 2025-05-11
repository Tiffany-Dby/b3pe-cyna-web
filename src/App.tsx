import { Outlet, ScrollRestoration } from "react-router";
import BaseLayout from "@/shared/ui/components/BaseLayout";

const App = () => {
  return (
    <>
      <ScrollRestoration />
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </>
  );
};

export default App;
