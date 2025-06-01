import { DATE_STATUS } from "@/shared/constants/dateStatus";
import { getDateStatus } from "@/shared/utils/date";
import { useTranslation } from "react-i18next";

type Props = {
  expiryDate: string | Date;
  warningThresholdDays?: number;
};

const DateStatusBadge = ({ expiryDate, warningThresholdDays = 3 }: Props) => {
  const { t } = useTranslation();

  const currentDate = new Date();
  const exipredDate = new Date(expiryDate);
  const daysDiff =
    (exipredDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

  const status = getDateStatus(daysDiff, warningThresholdDays);
  const { label, color } = DATE_STATUS[status];

  return (
    <p className="flex items-center gap-2">
      {t(label)}
      <span className={`h-2.5 w-2.5 rounded-full block ${color}`}></span>
    </p>
  );
};

export default DateStatusBadge;
