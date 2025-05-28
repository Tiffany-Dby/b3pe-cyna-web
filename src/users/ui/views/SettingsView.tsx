import { useTranslation } from "react-i18next";
import SettingsAddressCard from "@/users/ui/components/SettingsAddressCard";
import SettingsPasswordCard from "@/users/ui/components/SettingsPasswordCard";
import SettingsPersonalInfosCard from "@/users/ui/components/SettingsPersonalInfosCard";
import { useAddressesStore } from "@/users/store/addressesStore";
import { useEffect } from "react";

const SettingsView = () => {
  const { t } = useTranslation();
  const { getUserAddresses } = useAddressesStore();

  useEffect(() => {
    getUserAddresses();
  }, []);

  return (
    <div className="max-w-xl w-full mx-auto py-5 px-4">
      <h1>{t("account:settings.title")}</h1>
      <div className="flex flex-col gap-4">
        <SettingsPersonalInfosCard />
        <SettingsPasswordCard />
        <SettingsAddressCard />
      </div>
    </div>
  );
};

export default SettingsView;
