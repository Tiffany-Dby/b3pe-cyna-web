import { AppRoutes } from "@/shared/types/Routes";

type SidebarItem = {
  groupLabel: string;
  groupItems: GroupItem[];
};

type GroupItem = {
  title: string;
  icon: React.ElementType;
  subItems: SubItem[];
};

type SubItem = {
  title: string;
  url: AppRoutes;
};

export type { SidebarItem };
