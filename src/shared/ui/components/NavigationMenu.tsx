import { ModeToggle } from "@/lib/components/context/mode-toggle";
import { APP_ROUTES } from "@/shared/constants/routes";
import { MenuItem } from "@/shared/types/NavigationMenu";
import NavigationInline from "@/shared/ui/components/NavigationInline";
import NavigationSheet from "@/shared/ui/components/NavigationSheet";
import { useAuth } from "@/users/context/AuthContext";
import {
  BoxIcon,
  CircleUserRoundIcon,
  HomeIcon,
  ShoppingCartIcon,
} from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

const NavigationMenu = () => {
  const { isAuthenticated, onSignOut, user } = useAuth();
  const { t } = useTranslation("layout");

  const menuItems: MenuItem[] = [
    {
      title: t("header.navigation.home"),
      url: APP_ROUTES.home,
      icon: HomeIcon,
    },
    {
      title: t("header.navigation.products"),
      url: APP_ROUTES.products,
      icon: BoxIcon,
    },
    isAuthenticated
      ? {
          title: t("header.navigation.account.auth"),
          icon: CircleUserRoundIcon,
          subitems: [
            {
              title: t("header.navigation.account.settings.title"),
              url: APP_ROUTES.accountSettings,
              description: t("header.navigation.account.settings.description"),
            },
            {
              title: t("header.navigation.account.subscriptions.title"),
              url: APP_ROUTES.accountSubscriptions,
              description: t(
                "header.navigation.account.subscriptions.description"
              ),
            },
            ...(user?.role === 1
              ? [
                  {
                    title: "Administrateur",
                    url: APP_ROUTES.ADMIN,
                    description:
                      "Interface réservée aux administrateurs du site. Gérez les produits, les utilisateurs, etc.",
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
          url: APP_ROUTES.signIn,
        },
    {
      title: t("header.navigation.cart"),
      url: APP_ROUTES.cart,
      icon: ShoppingCartIcon,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <NavigationInline items={menuItems} />
      <ModeToggle />
      <LanguageToggle />
      <NavigationSheet items={menuItems} />
    </div>
  );
};

export default NavigationMenu;
