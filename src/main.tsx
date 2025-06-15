import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/assets/styles/index.css";
import { AuthProvider } from "@/users/context/AuthContext";
import { ThemeProvider } from "@/lib/components/context/theme-provider";
import "@/shared/i18n/i18n";
import { RouterProvider } from "react-router";
import { router } from "@/shared/routes/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
