import BaseDialog from "@/shared/ui/components/BaseDialog";
import { useAddressesStore } from "@/users/store/addressesStore";
import { Address } from "@/users/types/Address";
import { useTranslation } from "react-i18next";

type Props = {
  selected: Address;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteAddressDialog = ({ selected, open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const { deleteUserAddress } = useAddressesStore();

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.delete.title")}
      description={""}
      buttons={[
        {
          children: t("dialog.actions.delete"),
          variant: "destructive",
          onClick: () =>
            deleteUserAddress(selected, {
              success: t("account:settings.address.toast.delete.success"),
              loading: t("account:settings.address.toast.delete.loading"),
              error: t("account:settings.address.toast.error"),
            }),
        },
      ]}
    >
      <p>{t("account:settings.address.dialog.delete.message")}</p>
    </BaseDialog>
  );
};

export default DeleteAddressDialog;
