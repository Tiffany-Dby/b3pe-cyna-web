import { ModeToggle } from "@/lib/components/context/mode-toggle";
import { APP_ROUTES } from "@/shared/constants/routes";
import { MenuItem } from "@/shared/types/NavigationMenu";
import NavigationInline from "@/shared/ui/components/NavigationInline";
import NavigationSheet from "@/shared/ui/components/NavigationSheet";
import { useAuth } from "@/users/context/AuthContext";
import {
  CircleUserRoundIcon,
  HomeIcon,
  ShapesIcon,
  ShoppingCartIcon,
} from "lucide-react";

const NavigationMenu = () => {
  const { isAuthenticated, onSignOut } = useAuth();

  const menuItems: MenuItem[] = [
    {
      title: "Accueil",
      url: APP_ROUTES.home,
      icon: HomeIcon,
    },
    {
      title: "Produits",
      url: APP_ROUTES.products,
      icon: ShapesIcon,
    },
    isAuthenticated
      ? {
          title: "Mon compte",
          icon: CircleUserRoundIcon,
          subitems: [
            {
              title: "Paramètres",
              url: APP_ROUTES.accountSettings,
              description:
                "Gérer mes informations personnelles, mon mot de passe, mes moyens de paiements, etc.",
            },
            {
              title: "Abonnements",
              url: APP_ROUTES.accountSubscriptions,
              description:
                "Prologer mes abonnements, effectuer une mise à niveau, etc.",
            },
            {
              title: "Me déconnecter",
              action: onSignOut,
              description: "",
            },
          ],
        }
      : {
          title: "Me connecter",
          icon: CircleUserRoundIcon,
          url: APP_ROUTES.signIn,
        },
    {
      title: "Panier",
      url: APP_ROUTES.cart,
      icon: ShoppingCartIcon,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <NavigationInline items={menuItems} />
      <ModeToggle />
      <NavigationSheet items={menuItems} />
    </div>
  );
};

export default NavigationMenu;
