import { SUBSCRIPTION_STATUS } from "@/users/constants/subscriptionsStatus";
import { SubscriptionStatus } from "@/users/types/Subscriptions";
import { useTranslation } from "react-i18next";

type Props = {
  status: SubscriptionStatus;
};

const StatusBadge = ({ status }: Props) => {
  const { t } = useTranslation("account");
  const currentStatus = SUBSCRIPTION_STATUS[status];

  return (
    <p className="flex items-center gap-2">
      {t(currentStatus?.label || "")}
      <span
        className={`h-2.5 w-2.5 rounded-full block ${
          currentStatus?.color || ""
        }`}
      ></span>
    </p>
  );
};

export default StatusBadge;
