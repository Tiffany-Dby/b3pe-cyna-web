import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import { postRequest } from "@/shared/tools/api";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentMethod } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";

type PaymentStep = {
  clientSecret: string;
  type: string;
};

type Payments = {
  payments: PaymentStep[];
};

type PaymentResponse = {
  orderId: number;
  paymentMethodId: string | PaymentMethod;
};

const useCheckout = (orderId: number) => {
  const stripe = useStripe();
  const elements = useElements();
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
        PaymentResponse
      >(API_ROUTES.PURCHASE_CHECKOUT, {
        orderId,
        paymentMethodId,
      });

      if (checkError) {
        console.error("Backend error:", checkError);
        setIsLoading(false);

        return;
      }

      for (const { clientSecret, type } of result.payments) {
        const { error: payError } = await stripe.confirmPayment({
          clientSecret,
          redirect: "if_required",
        });

        if (payError) {
          console.error(`${type} payment failed:`, payError.message);
          setIsLoading(false);

          return;
        }
      }

      emptyCart();
      navigate(APP_ROUTES.CHECKOUT_SUCCESS);
    },
    [stripe, elements, orderId]
  );

  return { handleSubmit, isLoading };
};

export default useCheckout;
