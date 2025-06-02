import { DateStatus, DateStatusMap } from "@/shared/types/DateStatus";

const STATUS: DateStatusMap = {
  [DateStatus.Active]: {
    label: "common:inProgress",
    color: "bg-success",
  },
  [DateStatus.Warning]: {
    label: "common:expireSoon",
    color: "bg-warning",
  },
  [DateStatus.Expired]: {
    label: "common:expired",
    color: "bg-danger",
  },
};

const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const DATE = {
  TIME_FORMAT_OPTIONS,
  STATUS,
};

export { DATE };
