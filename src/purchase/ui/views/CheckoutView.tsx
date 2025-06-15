import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import PaymentCard from "@/purchase/ui/components/PaymentCard";

const CheckoutView = () => {
  const { cart } = usePurchaseStore();

  return cart ? <PaymentCard cart={cart} /> : <p>No cart available</p>;
};

export default CheckoutView;
