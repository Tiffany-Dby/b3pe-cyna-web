import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/lib/components/ui/navigation-menu";
import { NavLink } from "react-router";
import { Fragment } from "react";
import { Button } from "@/lib/components/ui/button";
import { MenuItem } from "@/shared/types/NavigationMenu";

const NavigationInline = ({ items }: { items: MenuItem[] }) => {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {items.map((item, index) => (
          <Fragment key={index}>
            {!item.subitems ? (
              <NavigationMenuItem>
                <NavLink
                  to={item.url!}
                  className={`${navigationMenuTriggerStyle()} gap-1`}
                >
                  <item.icon className="size-3.5" />
                  {item.title}
                </NavLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-1">
                  <item.icon className="size-3.5" /> {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 md:w-[375px]">
                    {item.subitems.map((subitem, index) => (
                      <Fragment key={index + subitem.title}>
                        {subitem.url ? (
                          <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary/20 focus:text-primary-foreground">
                            <NavLink
                              to={subitem.url}
                              className="flex flex-col gap-1.5"
                            >
                              <p className="font-bold">{subitem.title}</p>
                              <p className="text-size-label">
                                {subitem.description}
                              </p>
                            </NavLink>
                          </li>
                        ) : (
                          <li className="p-3 pt-0 hover:px-0 transition-[padding] duration-500">
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
