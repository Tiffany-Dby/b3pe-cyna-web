import { Button } from "@/lib/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/lib/components/ui/collapsible";
import { AppRoutes } from "@/shared/types/Routes";
import { useAuth } from "@/users/context/AuthContext";
import { Fragment, useState } from "react";
import { NavLink } from "react-router";

type MenuItem = {
  label?: string;
  href?: AppRoutes;
  button?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  submenu?: MenuItem[];
};

type MenuItemProps = {
  item: MenuItem;
  depth?: number;
  closeMenu: () => void;
};

const MenuItem = ({ item, closeMenu }: MenuItemProps) => {
  const { onSignOut } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const IconComponent = item.icon;

  const handleClickSignOut = () => {
    closeMenu();
    onSignOut();
  };

  return (
    <>
      {item.submenu ? (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex flex-col gap-2 items-start"
        >
          <CollapsibleTrigger className="h-fit" asChild>
            <Button
              variant="ghost"
              className="has-[>svg]:px-0 py-0 text-size-n hover:bg-transparent"
            >
              {IconComponent && <IconComponent className="size-4.5" />}
              {item.label}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-2">
            {item.submenu.map((subitem) => (
              <Fragment key={subitem.label}>
                {subitem.href && (
                  <NavLink
                    to={subitem.href}
                    className="ml-8 text-size-n hover:text-accent transition-colors duration-500"
                    onClick={closeMenu}
                  >
                    {subitem.label}
                  </NavLink>
                )}
                {subitem.button && (
                  <div className="ml-8">
                    <Button
                      className="p-0 bg-transparent text-size-xs hover:text-accent hover:bg-transparent transition-colors duration-500 h-fit"
                      onClick={handleClickSignOut}
                    >
                      Se déconnecter
                    </Button>
                  </div>
                )}
              </Fragment>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          {item.href && (
            <NavLink
              to={item.href}
              className={`flex items-center gap-2 font-medium hover:text-accent transition-colors duration-500`}
              onClick={closeMenu}
            >
              {IconComponent && <IconComponent className="size-4.5" />}
              {item.label}
            </NavLink>
          )}
        </>
      )}
    </>
  );
};

export default MenuItem;
