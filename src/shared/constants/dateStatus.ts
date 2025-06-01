import { DateStatus, DateStatusMap } from "@/shared/types/DateStatus";

const DATE_STATUS: DateStatusMap = {
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

export { DATE_STATUS };
