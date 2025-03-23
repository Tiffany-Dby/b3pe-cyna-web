import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  // SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/components/ui/sheet";
import MenuBurger from "@/shared/ui/components/MenuBurger";
import { Fragment, useState } from "react";
import logoCyna from "@/shared/assets/images/logo-cyna.svg";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/lib/components/ui/collapsible";
import { Button } from "@/lib/components/ui/button";
import { MenuItem } from "@/shared/types/NavigationMenu";
import { NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/lib/components/ui/navigation-menu";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

const NavigationSheet = ({ items }: { items: MenuItem[] }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = () => setIsOpen(!isOpen);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <MenuBurger isOpen={isOpen} onOpenChange={handleOpenChange} />
      </SheetTrigger>
      <SheetContent className="bg-primary-150 text-primary-150-foreground">
        <SheetHeader>
          <div>
            <img src={logoCyna} alt="Logo Cyna" />
          </div>
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Sélectionnez une option pour accéder aux différentes pages du site
            </SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <NavigationMenu
          orientation="vertical"
          className="sheet-nav w-full max-w-full justify-normal items-start py-2 px-5"
        >
          <NavigationMenuList className="sheet-nav-list flex-col gap-1.5">
            {items.map((item, index) => (
              <Fragment key={index}>
                {!item.subitems ? (
                  <>
                    <NavigationMenuItem className="w-full">
                      <NavLink
                        to={item.url!}
                        className="flex items-center gap-1 w-full  py-3"
                        onClick={handleOpenChange}
                      >
                        <item.icon className="size-3.5" />
                        {item.title}
                      </NavLink>
                    </NavigationMenuItem>
                    <li className="w-full">
                      <Separator className="bg-primary-150-foreground/10 h-px" />
                    </li>
                  </>
                ) : (
                  <>
                    <NavigationMenuItem className="w-full">
                      <Collapsible
                        open={isSubMenuOpen}
                        onOpenChange={setIsSubMenuOpen}
                        className="w-full"
                      >
                        <CollapsibleTrigger className="flex-between-center py-3 [&_svg:not([class*='size-'])]:size-4">
                          <span className="flex items-center gap-1">
                            <item.icon className="size-3.5" /> {item.title}
                          </span>
                          <ChevronDownIcon
                            className={`transition-transform duration-500 ${
                              isSubMenuOpen ? "-rotate-180" : "rotate-0"
                            }`}
                          />
                          <span className="sr-only">Toggle</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="flex flex-col gap-3">
                            {item.subitems.map((subitem, index) => (
                              <Fragment key={index + subitem.title}>
                                {subitem.url ? (
                                  <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary/20 focus:text-primary-foreground">
                                    <NavLink
                                      to={subitem.url}
                                      className="flex flex-col gap-1.5"
                                      onClick={handleOpenChange}
                                    >
                                      <p className="font-bold">
                                        {subitem.title}
                                      </p>
                                      <p className="text-size-label">
                                        {subitem.description}
                                      </p>
                                    </NavLink>
                                  </li>
                                ) : (
                                  <li className="p-3 pt-0 hover:px-0 transition-[padding] duration-500">
                                    <Button
                                      className="w-full"
                                      onClick={() => {
                                        if (subitem.action) subitem.action();
                                        handleOpenChange();
                                      }}
                                    >
                                      {subitem.title}
                                    </Button>
                                  </li>
                                )}
                              </Fragment>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </NavigationMenuItem>
                    <li className="w-full">
                      <Separator className="bg-primary-150-foreground/10 h-px" />
                    </li>
                  </>
                )}
              </Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
