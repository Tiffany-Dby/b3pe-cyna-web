import { ModeToggle } from "@/lib/components/context/mode-toggle";
import { MenuItem } from "@/shared/types/NavigationMenu";
import { AppRoutes } from "@/shared/types/Routes";
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
      url: AppRoutes.home,
      icon: HomeIcon,
    },
    {
      title: "Produits",
      url: AppRoutes.products,
      icon: ShapesIcon,
    },
    isAuthenticated
      ? {
          title: "Mon compte",
          icon: CircleUserRoundIcon,
          subitems: [
            {
              title: "Paramètres",
              url: AppRoutes.settings,
              description:
                "Gérer mes informations personnelles, mon mot de passe, mes moyens de paiements, etc.",
            },
            {
              title: "Abonnements",
              url: AppRoutes.subscriptions,
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
          url: AppRoutes.signIn,
        },
    {
      title: "Panier",
      url: AppRoutes.cart,
      icon: ShoppingCartIcon,
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <NavigationInline items={menuItems} />
      <ModeToggle />
      <NavigationSheet items={menuItems} />
    </div>
  );
};

export default NavigationMenu;
