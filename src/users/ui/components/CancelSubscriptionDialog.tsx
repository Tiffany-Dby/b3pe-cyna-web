import BaseDialog from "@/shared/ui/components/BaseDialog";
import { useSubscriptionsStore } from "@/users/store/subscriptionsStore";
import { SubscriptionItem } from "@/users/types/Subscriptions";
import { useTranslation } from "react-i18next";

type Props = {
  selected: SubscriptionItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CancelSubscriptionDialog = ({ selected, open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const { cancelSubscription } = useSubscriptionsStore();

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.cancel.title")}
      description={""}
      buttons={[
        {
          children: t("dialog.actions.confirm"),
          variant: "destructive",
          onClick: () =>
            cancelSubscription(selected, {
              success: t("account:subscriptions.toast.cancel.success"),
              loading: t("account:subscriptions.toast.cancel.loading"),
              error: t("account:subscriptions.toast.error"),
            }),
        },
      ]}
    >
      <p>{t("account:subscriptions.dialog.cancel.message")}</p>
    </BaseDialog>
  );
};

export default CancelSubscriptionDialog;
