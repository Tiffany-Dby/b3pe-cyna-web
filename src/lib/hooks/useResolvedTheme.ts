import { useEffect, useState } from "react";
import { useTheme } from "@/lib/components/context/useTheme";

const useResolvedTheme = () => {
  const { theme } = useTheme();
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.matchMedia("(prefers-color-scheme: dark)");

    const compute = () =>
      theme === "system"
        ? setResolved(root.matches ? "dark" : "light")
        : setResolved(theme);

    compute();
    root.addEventListener("change", compute);

    return () => root.removeEventListener("change", compute);
  }, [theme]);

  return resolved;
};

export { useResolvedTheme };
