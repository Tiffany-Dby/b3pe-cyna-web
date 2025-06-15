import { ModeToggle } from "@/lib/components/context/mode-toggle";
import { APP_ROUTES } from "@/shared/constants/routes";
import { MenuItem } from "@/shared/types/NavigationMenu";
import NavigationInline from "@/shared/ui/components/NavigationInline";
import NavigationSheet from "@/shared/ui/components/NavigationSheet";
import {
  BoxIcon,
  CircleUserRoundIcon,
  HomeIcon,
  ShoppingCartIcon,
} from "lucide-react";
import LanguageToggle from "@/shared/ui/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { UserRole } from "@/users/types/UserRole";
import { useAuth } from "@/users/context/useAuth";
import SearchToggle from "@/shared/ui/components/SearchToggle";

const NavigationMenu = () => {
  const { isAuthenticated, onSignOut, user } = useAuth();
  const { t } = useTranslation("layout");

  const menuItems: MenuItem[] = [
    {
      title: t("header.navigation.home"),
      url: APP_ROUTES.HOME,
      icon: HomeIcon,
    },
    {
      title: t("header.navigation.products"),
      url: APP_ROUTES.PRODUCTS,
      icon: BoxIcon,
    },
    isAuthenticated
      ? {
          title: t("header.navigation.account.auth"),
          url: APP_ROUTES.ACCOUNT,
          icon: CircleUserRoundIcon,
          subitems: [
            {
              title: t("header.navigation.account.settings.title"),
              url: APP_ROUTES.ACCOUNT_SETTINGS,
              description: t("header.navigation.account.settings.description"),
            },
            {
              title: t("header.navigation.account.subscriptions.title"),
              url: APP_ROUTES.ACCOUNT_SUBSCRIPTIONS,
              description: t(
                "header.navigation.account.subscriptions.description"
              ),
            },
            {
              title: t("header.navigation.account.history.title"),
              url: APP_ROUTES.ACCOUNT_HISTORY,
              description: t("header.navigation.account.history.description"),
            },
            ...(user?.role === UserRole.admin
              ? [
                  {
                    title: t("header.navigation.account.admin.title"),
                    url: APP_ROUTES.ADMIN_DASHBOARD_SALES,
                    description: t(
                      "header.navigation.account.admin.description"
                    ),
                  },
                ]
              : []),
            {
              title: t("header.navigation.account.signOut"),
              action: onSignOut,
              description: "",
            },
          ],
        }
      : {
          title: t("header.navigation.account.notAuth"),
          icon: CircleUserRoundIcon,
          url: APP_ROUTES.SIGN_IN,
        },
    {
      title: t("header.navigation.cart"),
      url: APP_ROUTES.PURCHASE_CART,
      icon: ShoppingCartIcon,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <NavigationInline items={menuItems} />
      <ModeToggle />
      <LanguageToggle />
      <SearchToggle />
      <NavigationSheet items={menuItems} />
    </div>
  );
};

export default NavigationMenu;
