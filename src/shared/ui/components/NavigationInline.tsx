import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/lib/components/ui/navigation-menu";
import { NavLink } from "react-router";
import { Fragment, useId } from "react";
import { Button } from "@/lib/components/ui/button";
import { MenuItem } from "@/shared/types/NavigationMenu";
import { APP_ROUTES } from "@/shared/constants/routes";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";

const NavigationInline = ({ items }: { items: MenuItem[] }) => {
  const id = useId();
  const { cart } = usePurchaseStore();

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {items.map((item) => (
          <Fragment key={id + "-" + item.title}>
            {!item.subitems ? (
              <NavigationMenuItem className=" [&_span]:text-white">
                <NavLink
                  to={item.url!}
                  className={`${navigationMenuTriggerStyle()} gap-1`}
                >
                  <item.icon className="size-3.5" />
                  {item.title}
                  {item.url === APP_ROUTES.CART && !!cart?.items.length && (
                    <span className="absolute flex-center-center w-4.5 h-4.5 bg-danger rounded-full text-size-label -right-0.5 -top-0.5">
                      {cart.items.length}
                    </span>
                  )}
                </NavLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-1">
                  <item.icon className="size-3.5" /> {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 md:w-[375px]">
                    {item.subitems.map((subitem) => (
                      <Fragment key={id + "-" + subitem.title}>
                        {subitem.url ? (
                          <li className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary/20 focus:text-primary-foreground">
                            <NavLink
                              to={subitem.url}
                              className="flex flex-col gap-1.5 p-3"
                            >
                              <p className="font-bold">{subitem.title}</p>
                              <p className="text-size-label">
                                {subitem.description}
                              </p>
                            </NavLink>
                          </li>
                        ) : (
                          <li className="px-3 pb-3 hover:px-0 transition-[padding] duration-500">
                            <Button className="w-full" onClick={subitem.action}>
                              {subitem.title}
                            </Button>
                          </li>
                        )}
                      </Fragment>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationInline;
