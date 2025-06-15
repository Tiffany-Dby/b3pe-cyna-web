import { Appearance, loadStripe, StripeElementLocale } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { postRequest } from "@/shared/tools/api";
import Loader from "@/shared/ui/components/Loader";
import CheckoutForm from "@/purchase/ui/components/CheckoutForm";
import useRequest from "@/shared/hooks/useRequest";
import { useTranslation } from "react-i18next";
import { API_ROUTES } from "@/shared/constants/routes";
import { Cart, NewIntent } from "@/purchase/types/Purchase";
import { useResolvedTheme } from "@/lib/hooks/useResolvedTheme";
import { useMemo } from "react";

type Props = {
  cart: Cart;
};

const PaymentCard = ({ cart }: Props) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY);
  const { i18n } = useTranslation();
  const locale = i18n.language as StripeElementLocale;

  const theme = useResolvedTheme();
  const isDark = theme === "dark";

  const appearance: Appearance = {
    variables: isDark
      ? {
          colorBackground: "hsl(258, 68%, 10%)",
          colorText: "hsl(210 20% 98%)",
          colorPrimary: "hsl(151, 100%, 42%)",
          colorTextSecondary: "hsl(210 20% 98%)",
        }
      : {
          colorBackground: "hsl(210 20% 98%)",
          colorText: "hsl(258, 68%, 10%)",
          colorPrimary: "hsl(262.1 83.3% 57.8%)",
          colorTextSecondary: "hsl(220 8.9% 46.1%)",
        },
  };

  const payload = useMemo(() => ({ orderId: cart.id }), [cart.id]);

  const { data, error, isLoading } = useRequest<NewIntent, { orderId: number }>(
    postRequest,
    API_ROUTES.PURCHASE_INTENT_NEW,
    payload
  );

  if (isLoading) return <Loader />;
  if (error || !data) {
    console.error("SetupIntent error:", error);

    return <div className="text-danger">Error initializing payment</div>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: data.clientSecret,
        appearance,
        locale,
      }}
    >
      <CheckoutForm orderId={cart.id} intentId={data.intentId} />
    </Elements>
  );
};

export default PaymentCard;
