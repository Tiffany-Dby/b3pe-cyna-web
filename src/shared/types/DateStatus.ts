enum DateStatus {
  Active = "active",
  Warning = "warning",
  Expired = "expired",
}

type DateStatusMap = Record<DateStatus, { label: string; color: string }>;

export type { DateStatusMap };
export { DateStatus };
