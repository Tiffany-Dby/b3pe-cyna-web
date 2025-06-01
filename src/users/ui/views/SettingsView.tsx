import { useTranslation } from "react-i18next";
import SettingsAddressCard from "@/users/ui/components/SettingsAddressCard";
import SettingsPasswordCard from "@/users/ui/components/SettingsPasswordCard";
import SettingsPersonalInfosCard from "@/users/ui/components/SettingsPersonalInfosCard";
import { useAddressesStore } from "@/users/store/addressesStore";
import { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import { Link } from "react-router";

const SettingsView = () => {
  const { t } = useTranslation();
  const { getUserAddresses } = useAddressesStore();

  useEffect(() => {
    getUserAddresses();
  }, []);

  return (
    <section>
      <div className="container mx-auto flex flex-col gap-6 pt-10 pb-24 px-4">
        <div>
          <h1>{t("account:settings.title")}</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={"/account"}>
                  {t("layout:header.navigation.account.auth")}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {t("layout:header.navigation.account.settings.title")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <SettingsPersonalInfosCard />
          <SettingsPasswordCard />
          <SettingsAddressCard />
        </div>
      </div>
    </section>
  );
};

export default SettingsView;
