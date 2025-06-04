import {
  BoxIcon,
  ChartPieIcon,
  ImageIcon,
  MessageSquareIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { APP_ROUTES } from "@/shared/constants/routes";
import { SidebarItem } from "@/shared/types/Sidebar";

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
            url: APP_ROUTES.ADMIN_DASHBOARD_SALES,
          },
          {
            title: "dashboard.analytics.subItems.userActivity",
            url: APP_ROUTES.ADMIN_DASHBOARD_CUSTOMERS,
          },
          // {
          //   title: "dashboard.analytics.subItems.inventories",
          //   url: APP_ROUTES.ADMIN_DASHBOARD,
          // },
        ],
      },
      {
        title: "dashboard.support.title",
        icon: MessageSquareIcon,
        subItems: [
          {
            title: "dashboard.support.subItems.tickets",
            url: APP_ROUTES.ADMIN_SUPPORT_TICKETS,
          },
          {
            title: "dashboard.support.subItems.chatbot",
            url: APP_ROUTES.ADMIN_SUPPORT_CHATBOT,
          },
        ],
      },
      {
        title: "dashboard.settings.title",
        icon: SettingsIcon,
        subItems: [
          {
            title: "dashboard.settings.subItems.general",
            url: APP_ROUTES.ADMIN_SETTINGS_GENERAL,
          },
          {
            title: "dashboard.settings.subItems.payments",
            url: APP_ROUTES.ADMIN_SETTINGS_PAYMENTS,
          },
          {
            title: "dashboard.settings.subItems.localization",
            url: APP_ROUTES.ADMIN_SETTINGS_LANGUAGES,
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
            url: APP_ROUTES.ADMIN_PROMOTION_CAROUSEL,
          },
        ],
      },
      {
        title: "management.products.title",
        icon: BoxIcon,
        subItems: [
          {
            title: "management.products.subItems.productsAndTranslations",
            url: APP_ROUTES.ADMIN_PRODUCTS,
          },
          {
            title: "management.products.subItems.categories",
            url: APP_ROUTES.ADMIN_CATEGORIES,
          },
        ],
      },
      {
        title: "management.users.title",
        icon: UsersIcon,
        subItems: [
          {
            title: "management.users.subItems.allAdmins",
            url: APP_ROUTES.ADMIN_USERS_ADMINS,
          },
          {
            title: "management.users.subItems.allClients",
            url: APP_ROUTES.ADMIN_USERS_CLIENTS,
          },
        ],
      },
    ],
  },
];

export { SIDEBAR_ITEMS };
