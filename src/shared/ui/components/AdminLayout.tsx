import { Separator } from "@/lib/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/lib/components/ui/sidebar";
import { useState } from "react";
import AdminSidebar from "@/shared/ui/components/AdminSidebar";
import { Outlet, useLocation } from "react-router";
import { ModeToggle } from "@/lib/components/context/mode-toggle";
import LanguageToggle from "@/shared/ui/components/LanguageToggle";
import { SIDEBAR_ITEMS } from "@/shared/constants/sidebar";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";
import { Toaster } from "sonner";

const AdminLayout = () => {
  const location = useLocation();
  const { t } = useTranslation("adminSidebar");
  const [open, setOpen] = useState(true);

  const currentSubItem = SIDEBAR_ITEMS.flatMap((group) => group.groupItems)
    .flatMap((item) => item.subItems)
    .find(
      (sub) =>
        sub.url === location.pathname ||
        APP_ROUTES.ADMIN + "/" + sub.url === location.pathname
    );

  const pageTitle = currentSubItem?.title ?? "Back office";

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AdminSidebar />
      <div className="flex flex-col w-full px-4 bg-primary/7 dark:bg-background">
        <header>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 !h-4" />
              <h1 className="text-size-3xl">{t(pageTitle)}</h1>
            </div>
            <div className="flex-center-center gap-2">
              <ModeToggle />
              <LanguageToggle />
            </div>
          </div>
        </header>
        <main className="min-h-auto pt-4 pb-8">
          <Outlet />
          <Toaster richColors position="top-center" closeButton />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
