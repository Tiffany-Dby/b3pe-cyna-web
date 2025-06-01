import { Button } from "@/lib/components/ui/button";
import { Card } from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import ProductStatusBadge from "@/products/ui/components/ProductStatusBadge";
import { useDialog } from "@/shared/hooks/useDialog";
import StatusBadge from "@/shared/ui/components/StatusBadge";
import { formatUnixTimestamp } from "@/shared/utils/date";
import {
  SubscriptionItem,
  SubscriptionStatus,
} from "@/users/types/Subscriptions";
import { ArrowUpIcon } from "lucide-react";
import CancelSubscriptionDialog from "@/users/ui/components/CancelSubscriptionDialog";
import { useTranslation } from "react-i18next";

type Props = {
  subscriptionItem: SubscriptionItem;
  status: SubscriptionStatus;
};

const SubscriptionCard = ({ subscriptionItem, status }: Props) => {
  const { t } = useTranslation("account");
  const { dialog, open, close } = useDialog<SubscriptionItem | null>();
  const product = subscriptionItem?.orderItem.product;

  return (
    <>
      <Card className="px-6">
        <article className="@container flex flex-col gap-8">
          <div className="flex-between-center flex-wrap">
            <h2>{product?.name}</h2>
            <ProductStatusBadge type={product?.type} status={product?.status} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-between-center flex-wrap">
              <p>{t("subscriptions.status.title")}</p>
              <StatusBadge status={status} />
            </div>
            <Separator />
            <div className="flex-between-center flex-wrap">
              <p>{t("subscriptions.start")}</p>
              <p>{formatUnixTimestamp(subscriptionItem.currentPeriodStart)}</p>
            </div>
            <Separator />
            <div className="flex-between-center flex-wrap">
              <p>{t("subscriptions.nextInvoice")}</p>
              <p>{formatUnixTimestamp(subscriptionItem.currentPeriodEnd)}</p>
            </div>
            <Separator />
          </div>
          <div className="flex flex-col @sm:flex-row @sm:flex-wrap gap-4">
            <Button
              variant="outline"
              className="grow"
              onClick={() => open("cancel", subscriptionItem)}
            >
              {t("subscriptions.cancel")}
            </Button>
            <Button className="grow">{t("subscriptions.update")}</Button>
            <Button variant="primaryLight" className="w-full" disabled={true}>
              <span className="flex-between-center gap-2 w-full">
                {t("subscriptions.upgrade")} <ArrowUpIcon />
              </span>
            </Button>
          </div>
        </article>
      </Card>

      {dialog.type === "cancel" && dialog.item && (
        <CancelSubscriptionDialog
          selected={dialog.item}
          open={true}
          onOpenChange={close}
        />
      )}
    </>
  );
};

export default SubscriptionCard;
