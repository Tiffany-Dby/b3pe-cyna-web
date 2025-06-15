import { PaymentStatus, PaymentStatusMap } from "@/users/types/History";

const STATUS: PaymentStatusMap = {
  [PaymentStatus.pending]: {
    label: "history.status.pending",
    color: "bg-warning",
  },
  [PaymentStatus.failed]: {
    label: "history.status.failed",
    color: "bg-danger",
  },
  [PaymentStatus.canceled]: {
    label: "history.status.canceled",
    color: "bg-muted",
  },
  [PaymentStatus.refunded]: {
    label: "history.status.refunded",
    color: "bg-secondary",
  },
  [PaymentStatus.succeeded]: {
    label: "history.status.succeeded",
    color: "bg-success",
  },
};

const PAYMENT = {
  STATUS,
};

export { PAYMENT };
