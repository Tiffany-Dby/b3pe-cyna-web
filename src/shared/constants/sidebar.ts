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
    groupLabel: "dashboard.groupLabel",
    groupItems: [
      {
        title: "dashboard.analytics.title",
        icon: ChartPieIcon,
        subItems: [
          {
            title: "dashboard.analytics.subItems.salesOrders",
            url: APP_ROUTES.ADMIN,
          },
          {
            title: "dashboard.analytics.subItems.userActivity",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
          {
            title: "dashboard.analytics.subItems.inventories",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
        ],
      },
      {
        title: "dashboard.support.title",
        icon: MessageSquareIcon,
        subItems: [
          {
            title: "dashboard.support.subItems.tickets",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
          {
            title: "dashboard.support.subItems.chatbot",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
        ],
      },
      {
        title: "dashboard.settings.title",
        icon: SettingsIcon,
        subItems: [
          {
            title: "dashboard.settings.subItems.general",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
          {
            title: "dashboard.settings.subItems.payments",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
          {
            title: "dashboard.settings.subItems.localization",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
        ],
      },
    ],
  },
  {
    groupLabel: "management.groupLabel",
    groupItems: [
      {
        title: "management.contents.title",
        icon: ImageIcon,
        subItems: [
          {
            title: "management.contents.subItems.promotionsCarousel",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
        ],
      },
      {
        title: "management.products.title",
        icon: BoxIcon,
        subItems: [
          {
            title: "management.products.subItems.allProducts",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
          {
            title: "management.products.subItems.addNewProduct",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
        ],
      },
      {
        title: "management.categories.title",
        icon: ShapesIcon,
        subItems: [
          {
            title: "management.categories.subItems.allCategories",
            url: APP_ROUTES.ADMIN_CATEGORY_ALL,
          },
          {
            title: "management.categories.subItems.addNewCategory",
            url: APP_ROUTES.ADMIN_CATEGORY_NEW,
          },
        ],
      },
      {
        title: "management.users.title",
        icon: UsersIcon,
        subItems: [
          {
            title: "management.users.subItems.allClients",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
          {
            title: "management.users.subItems.allAdmins",
            url: APP_ROUTES.ADMIN_PRODUCT,
          },
        ],
      },
    ],
  },
];

export { SIDEBAR_ITEMS };
