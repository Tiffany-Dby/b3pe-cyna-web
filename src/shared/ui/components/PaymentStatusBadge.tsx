import { PAYMENT } from "@/users/constants/paymentStatus";
import { PaymentStatus } from "@/users/types/History";
import { useTranslation } from "react-i18next";

type Props = {
  status: PaymentStatus;
};

const PaymentStatusBadge = ({ status }: Props) => {
  const { t } = useTranslation("account");
  const currentStatus = PAYMENT.STATUS[status];

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

export default PaymentStatusBadge;
