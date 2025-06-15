import {
  SubscriptionStatus,
  SubscriptionStatusMap,
} from "@/users/types/Subscriptions";

const SUBSCRIPTION_STATUS: SubscriptionStatusMap = {
  [SubscriptionStatus.active]: {
    label: "subscriptions.status.active",
    color: "bg-success",
  },
  [SubscriptionStatus.canceled]: {
    label: "subscriptions.status.canceled",
    color: "bg-danger",
  },
  [SubscriptionStatus.incomplete]: {
    label: "subscriptions.status.incomplete",
    color: "bg-warning",
  },
  [SubscriptionStatus.incomplete_expired]: {
    label: "subscriptions.status.incompleteExpired",
    color: "bg-warning",
  },
  [SubscriptionStatus.past_due]: {
    label: "subscriptions.status.pastDue",
    color: "bg-warning",
  },
  [SubscriptionStatus.paused]: {
    label: "subscriptions.status.paused",
    color: "bg-accent",
  },
  [SubscriptionStatus.trialing]: {
    label: "subscriptions.status.trialing",
    color: "bg-secondary",
  },
  [SubscriptionStatus.unpaid]: {
    label: "subscriptions.status.unpaid",
    color: "bg-danger",
  },
};

export { SUBSCRIPTION_STATUS };
