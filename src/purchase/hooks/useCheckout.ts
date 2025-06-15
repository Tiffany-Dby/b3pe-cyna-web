import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import { postRequest } from "@/shared/tools/api";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentMethod } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { OrderStatus } from "@/purchase/types/Purchase";

type PaymentStep = {
  type: string;
  id: number;
  clientSecret: string;
};

type Payments = {
  payments: PaymentStep[];
};

type PaymentPayload = {
  orderId: number;
  paymentMethodId: string | PaymentMethod;
  paymentMethodType: string;
};

const useCheckout = (orderId: number) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethodType, setPaymentMethodType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { emptyCart } = usePurchaseStore();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setIsLoading(true);
      const { setupIntent, error: setupError } = await stripe.confirmSetup({
        elements,
        redirect: "if_required",
      });

      if (setupError || !setupIntent?.payment_method) {
        console.error("Setup failed:", setupError?.message);
        setIsLoading(false);

        return;
      }

      const paymentMethodId = setupIntent.payment_method;

      const { result, error: checkError } = await postRequest<
        Payments,
        PaymentPayload
      >(API_ROUTES.PURCHASE_CHECKOUT, {
        orderId,
        paymentMethodId,
        paymentMethodType,
      });

      if (checkError) {
        console.error("Backend error:", checkError);
        setIsLoading(false);

        return;
      }

      let isSuccess = false;
      for (const { clientSecret, type } of result.payments) {
        const confirm = await stripe.confirmPayment({
          clientSecret,
          redirect: "if_required",
        });

        if (confirm.error) {
          console.error(`${type} payment failed:`, confirm.error.message);
          setIsLoading(false);

          return;
        }

        isSuccess = confirm.paymentIntent.status === "succeeded";
      }

      if (isSuccess) emptyCart(orderId, OrderStatus.succeeded);
      navigate(APP_ROUTES.CHECKOUT_SUCCESS);
    },
    [stripe, elements, orderId, paymentMethodType, emptyCart, navigate]
  );

  return { handleSubmit, setPaymentMethodType, isLoading };
};

export default useCheckout;
