import { Button } from "@/lib/components/ui/button";
import { useDialog } from "@/shared/hooks/useDialog";
import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import { useTranslation } from "react-i18next";
import NewAddressDialog from "./NewAddressDialog";
import UpdateAddressForm from "./UpdateAddressForm";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Separator } from "@/lib/components/ui/separator";
import { useAddressesStore } from "@/users/store/addressesStore";
import { Address } from "@/users/types/Address";
import DeleteAddressDialog from "./DeleteAddressDialog";
import Loader from "@/shared/ui/components/Loader";

const SettingsAddressCard = () => {
  const { t } = useTranslation();
  const { dialog, open, close } = useDialog<Address | null>();

  const { addresses, isLoading, error } = useAddressesStore();

  return (
    <>
      <BaseAccordionCard
        accordionValue="newAddressForm"
        title="account:settings.address.caption"
        description={
          <div className="flex w-full justify-end mb-4">
            <Button onClick={() => open("create", null)}>
              <PlusIcon /> {t("account:settings.address.newAddress")}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          {isLoading && <Loader />}
          {error && <p className="text-danger">{error}</p>}
          {addresses?.map((address, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <div className="flex-between-center">
                <p className="uppercase text-size-l font-semibold">
                  {t("account:settings.address.caption")} {index + 1}
                </p>
                <Button
                  variant="destructive"
                  onClick={() => open("delete", address)}
                >
                  <Trash2Icon /> {t("account:settings.address.delete")}
                </Button>
              </div>
              <UpdateAddressForm address={address} />
              {index + 1 < addresses.length && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </BaseAccordionCard>

      {dialog.type === "create" && (
        <NewAddressDialog open={true} onOpenChange={close} />
      )}

      {dialog.type === "delete" && dialog.item && (
        <DeleteAddressDialog
          selected={dialog.item}
          open={true}
          onOpenChange={close}
        />
      )}
    </>
  );
};

export default SettingsAddressCard;
