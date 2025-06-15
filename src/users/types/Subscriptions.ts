import { UserResponse } from "@/users/types/SignIn";
import { Address } from "@/users/types/Address";
import { CartItem, PaymentMethod, Recurring } from "@/purchase/types/Purchase";
import { ToastMsgs } from "@/shared/types/Toast";

enum SubscriptionStatus {
  active = "active",
  canceled = "canceled",
  incomplete = "incomplete",
  incomplete_expired = "incomplete_expired",
  past_due = "past_due",
  paused = "paused",
  trialing = "trialing",
  unpaid = "unpaid",
}

type SubscriptionStatusMap = Record<
  SubscriptionStatus,
  { label: string; color: string }
>;

type Subscription = {
  billingAddress: Address;
  defaultPaymentMethodId: string;
  id: number;
  items: SubscriptionItem[];
  orderId: number;
  paymentMethod: PaymentMethod;
  recurrence: Recurring;
  status: SubscriptionStatus;
  stripeSubscriptionId: string;
  user: UserResponse;
  createdAt: Date;
  lastInvoiceUrl: string;
};

type SubscriptionItem = {
  currentPeriodEnd: number;
  currentPeriodStart: number;
  id: number;
  orderItem: CartItem;
  priceId: string;
  stripeItemId: string;
  subscriptionId: number;
};

type SubscriptionsState = {
  subscriptions: Subscription[];
  isLoading: boolean;
  isCancelLoading: boolean;
  error: string | null;
  getSubscriptions: () => Promise<void>;
  updateStatus: (id: number, status: number) => Promise<void>;
  cancelSubscription: (
    selected: SubscriptionItem,
    toastMsgs: ToastMsgs
  ) => Promise<void>;
};

export type {
  SubscriptionStatusMap,
  Subscription,
  SubscriptionItem,
  SubscriptionsState,
};
export { SubscriptionStatus };
