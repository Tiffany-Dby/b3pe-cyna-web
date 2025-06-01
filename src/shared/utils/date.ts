import { DateStatus } from "../types/DateStatus";

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

export { getDateStatus, formatUnixTimestamp };
