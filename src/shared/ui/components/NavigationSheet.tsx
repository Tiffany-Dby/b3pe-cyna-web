import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  // SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/components/ui/sheet";
import MenuBurger from "@/shared/ui/components/MenuBurger";
import { Fragment, useId, useState } from "react";
import logoCyna from "@/shared/assets/images/logo-cyna.svg";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/lib/components/ui/button";
import { MenuItem } from "@/shared/types/NavigationMenu";
import { Link, NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/lib/components/ui/navigation-menu";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/ui/accordion";
import { APP_ROUTES } from "@/shared/constants/routes";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const NavigationSheet = ({ items }: { items: MenuItem[] }) => {
  const { t } = useTranslation("layout");
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = () => setIsOpen(!isOpen);

  const { getDisplayedCart } = usePurchaseStore();
  const cart = getDisplayedCart();

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
              <Fragment key={id + "-" + item.title}>
                {!item.subitems ? (
                  <>
                    <NavigationMenuItem className="w-full">
                      <NavLink
                        to={item.url!}
                        className="flex items-center gap-1 w-full py-3 hover:underline"
                        onClick={handleOpenChange}
                      >
                        <span className="flex-center-center gap-1 relative">
                          <item.icon className="size-3.5" />
                          {item.title}
                          {item.url === APP_ROUTES.PURCHASE_CART &&
                            !!cart?.length && (
                              <span className="absolute flex-center-center w-4.5 h-4.5 bg-danger rounded-full text-size-label -right-4 -top-2">
                                {cart.length}
                              </span>
                            )}
                        </span>
                      </NavLink>
                    </NavigationMenuItem>
                    <li className="w-full">
                      <Separator className="bg-primary-150-foreground/10 h-px" />
                    </li>
                  </>
                ) : (
                  <>
                    <NavigationMenuItem className="w-full">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`${index}`}>
                          <AccordionTrigger className="items-center">
                            <NavLink
                              to={item.url}
                              className="flex items-center gap-1 text-size-n font-normal"
                              onClick={handleOpenChange}
                            >
                              <item.icon className="size-3.5" /> {item.title}
                            </NavLink>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="flex flex-col gap-3">
                              {item.subitems.map((subitem) => (
                                <Fragment key={id + "-" + subitem.title}>
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
                                    <li className="hover:px-3 transition-[padding] duration-500">
                                      <Button
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
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
          <nav className="flex flex-col gap-4">
            <ul className="flex justify-end gap-4">
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linkedin link"
                >
                  <FaLinkedinIn className="h-6 w-6 bg-white text-primary-150 p-0.5 rounded-sm" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook link"
                >
                  <FaFacebookF className="h-6 w-6 bg-white text-primary-150 p-0.5 rounded-sm" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter link"
                >
                  <FaXTwitter className="h-6 w-6 bg-white text-primary-150 p-0.5 rounded-sm" />
                </a>
              </li>
            </ul>
            <ul className="flex flex-col gap-4 text-right text-size-label">
              <li>
                <Link to={"#"}>Contact</Link>
              </li>
              <li>
                <Link to={APP_ROUTES.LEGAL_NOTICE}>
                  {t("footer.legalNotice")}
                </Link>
              </li>
              <li>
                <Link to={APP_ROUTES.LEGAL_TERMS_OF_USE}>
                  {t("footer.termsOfUse")}
                </Link>
              </li>
            </ul>
          </nav>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
