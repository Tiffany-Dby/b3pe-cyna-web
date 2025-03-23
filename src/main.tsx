import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/assets/styles/index.css";
import App from "./App.tsx";
import { AuthProvider } from "./users/context/AuthContext.tsx";
import { ThemeProvider } from "./lib/components/context/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
