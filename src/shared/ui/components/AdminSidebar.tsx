import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/lib/components/ui/sidebar";
import { APP_ROUTES } from "@/shared/constants/routes";
import { ArrowLeftToLineIcon, ChevronDownIcon } from "lucide-react";
import logoCyna from "@/shared/assets/images/logo-cyna.svg";
import logoCynaBlack from "@/shared/assets/images/logo-cyna-black.svg";
import { Link, useLocation } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/lib/components/ui/collapsible";
import { useResolvedTheme } from "@/lib/components/context/theme-provider";
import { SIDEBAR_ITEMS } from "@/shared/constants/sidebar";
import { useTranslation } from "react-i18next";
import { useId } from "react";

const AdminSidebar = () => {
  const location = useLocation();
  const resolved = useResolvedTheme();
  const { t } = useTranslation("adminSidebar");
  const id = useId();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="overflow-hidden py-4">
        <Link to={APP_ROUTES.HOME}>
          <img
            src={resolved === "dark" ? logoCyna : logoCynaBlack}
            alt="Logo Cyna"
            className="w-[132px] max-w-none"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-4">
          {SIDEBAR_ITEMS.map((sidebarItem) => (
            <div key={id + "-" + sidebarItem.groupLabel}>
              <SidebarGroupLabel>{t(sidebarItem.groupLabel)}</SidebarGroupLabel>
              <SidebarGroupContent className="flex  flex-col gap-1">
                {sidebarItem.groupItems.map((item) => (
                  <SidebarMenu key={id + "-" + item.title}>
                    <SidebarMenuItem>
                      <Collapsible
                        defaultOpen={item.subItems.some(
                          (subitem) => subitem.url === APP_ROUTES.ADMIN
                        )}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className="flex justify-between cursor-pointer group"
                            isActive={item.subItems.some(
                              (subitem) =>
                                subitem.url === location.pathname ||
                                APP_ROUTES.ADMIN + "/" + subitem.url ===
                                  location.pathname
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {item.icon && (
                                <item.icon className="size-4 min-w-4" />
                              )}
                              {t(item.title)}
                            </span>

                            <ChevronDownIcon className="transition-transform duration-300 group-data-[state=open]:-rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subitem) => (
                              <SidebarMenuSubItem key={subitem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={
                                    subitem.url === location.pathname ||
                                    APP_ROUTES.ADMIN + "/" + subitem.url ===
                                      location.pathname
                                  }
                                >
                                  <Link to={subitem.url}>
                                    {t(subitem.title)}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  </SidebarMenu>
                ))}
              </SidebarGroupContent>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-4 overflow-hidden">
        <SidebarMenuButton>
          <Link
            className="flex justify-end items-center gap-2"
            to={APP_ROUTES.HOME}
          >
            <ArrowLeftToLineIcon className="size-4 min-w-4" />
            {t("backToWebsite")}
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
