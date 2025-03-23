import { AppRoutes } from "@/shared/types/Routes";

type MenuItem = {
  title: string;
  url?: AppRoutes;
  icon: React.ComponentType<{ className?: string }>;
  subitems?: MenuSubItem[];
};

type MenuSubItem = {
  title: string;
  url?: AppRoutes;
  description?: string;
  action?: () => void;
};

export type { MenuItem };
