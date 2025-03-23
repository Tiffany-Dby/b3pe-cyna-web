import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/components/ui/sheet";
import MenuBurger from "./MenuBurger";
import { useState } from "react";
import logoCyna from "@/shared/assets/images/logo-cyna.svg";
import MenuItem from "./MenuItem";
import { AppRoutes } from "@/shared/types/Routes";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  CircleUserRoundIcon,
  HomeIcon,
  ShapesIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useAuth } from "@/users/context/AuthContext";

const MenuNavigation = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      label: "Accueil",
      href: AppRoutes.home,
      icon: HomeIcon,
    },
    {
      label: "Produits",
      href: AppRoutes.products,
      icon: ShapesIcon,
    },
    isAuthenticated
      ? {
          label: "Mon compte",
          icon: CircleUserRoundIcon,
          submenu: [
            {
              label: "Tableau de bord",
              href: AppRoutes.account,
            },
            {
              label: "Se déconnecter",
              button: true,
            },
          ],
        }
      : {
          label: "Se connecter",
          href: AppRoutes.signIn,
          icon: CircleUserRoundIcon,
        },
    {
      label: "Panier",
      href: AppRoutes.checkout,
      icon: ShoppingCartIcon,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <MenuBurger isOpen={isOpen} onOpenChange={handleOpenChange} />
      </SheetTrigger>
      <SheetContent className="bg-primary-150">
        <SheetHeader>
          <div>
            <img src={logoCyna} alt="Logo Cyna" />
          </div>
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>
        <nav className="py-2 px-7 text-primary-150-foreground">
          <div className="flex flex-col gap-5">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                item={item}
                closeMenu={() => setIsOpen(false)}
              />
            ))}
          </div>
        </nav>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuNavigation;
