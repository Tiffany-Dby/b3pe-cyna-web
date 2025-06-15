import { Cart, PaymentMethod } from "@/purchase/types/Purchase";
import { Subscription } from "@/users/types/Subscriptions";

enum PaymentStatus {
  pending = 0,
  failed = 1,
  canceled = 2,
  refunded = 3,
  succeeded = 4,
}

type PaymentStatusMap = Record<PaymentStatus, { label: string; color: string }>;

type Payment = {
  id: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  order: Cart;
  subscription: Subscription;
  invoiceUrl: string;
  createdAt: string;
};

export type { Payment, PaymentStatusMap };
export { PaymentStatus };
