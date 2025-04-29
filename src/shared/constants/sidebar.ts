import {
  BoxIcon,
  ChartPieIcon,
  ImageIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShapesIcon,
  UsersIcon,
} from "lucide-react";
import { APP_ROUTES } from "./routes";
import { SidebarItem } from "../types/Sidebar";

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    groupLabel: "Dashboard",
    groupItems: [
      {
        title: "Analytics",
        icon: ChartPieIcon,
        subItems: [
          { title: "Sales & orders", url: APP_ROUTES.ADMIN },
          { title: "User activity", url: APP_ROUTES.ADMIN_PRODUCT },
          { title: "Inventories", url: APP_ROUTES.ADMIN_PRODUCT },
        ],
      },
      {
        title: "Support",
        icon: MessageSquareIcon,
        subItems: [
          { title: "Tickets", url: APP_ROUTES.ADMIN_PRODUCT },
          { title: "Chatbot", url: APP_ROUTES.ADMIN_PRODUCT },
        ],
      },
      {
        title: "Settings",
        icon: SettingsIcon,
        subItems: [
          { title: "General", url: APP_ROUTES.ADMIN_PRODUCT },
          { title: "Payments", url: APP_ROUTES.ADMIN_PRODUCT },
          { title: "Localization", url: APP_ROUTES.ADMIN_PRODUCT },
        ],
      },
    ],
  },
  {
    groupLabel: "Management",
    groupItems: [
      {
        title: "Contents",
        icon: ImageIcon,
        subItems: [
          { title: "Promotions carousel", url: APP_ROUTES.ADMIN_PRODUCT },
        ],
      },
      {
        title: "Products",
        icon: BoxIcon,
        subItems: [
          { title: "All products", url: APP_ROUTES.ADMIN_PRODUCT },
          { title: "Add new product", url: APP_ROUTES.ADMIN_PRODUCT },
        ],
      },
      {
        title: "Categories",
        icon: ShapesIcon,
        subItems: [
          { title: "All categories", url: APP_ROUTES.ADMIN_PRODUCT },
          { title: "Add new category", url: APP_ROUTES.ADMIN_PRODUCT },
        ],
      },
      {
        title: "Users",
        icon: UsersIcon,
        subItems: [
          { title: "All clients", url: APP_ROUTES.ADMIN_PRODUCT },
          { title: "All admins", url: APP_ROUTES.ADMIN_PRODUCT },
        ],
      },
    ],
  },
];

export { SIDEBAR_ITEMS };
