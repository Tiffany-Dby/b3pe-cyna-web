import { DateStatus } from "@/shared/types/DateStatus";

const getDateStatus = (
  daysDiff: number,
  warningThresholdDays: number
): DateStatus => {
  return daysDiff < 0
    ? DateStatus.Expired
    : daysDiff <= warningThresholdDays
    ? DateStatus.Warning
    : DateStatus.Active;
};

const formatUnixTimestamp = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString();

const formatDate = (
  value: Date | string,
  locale?: string,
  options?: Intl.DateTimeFormatOptions
) => new Date(value).toLocaleDateString(locale, options);

export { getDateStatus, formatUnixTimestamp, formatDate };
