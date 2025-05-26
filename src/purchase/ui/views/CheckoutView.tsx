import { useEffect } from "react";
// import { Appearance } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { Button } from "@/lib/components/ui/button";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
// import { postRequest } from "@/shared/tools/api";
// import Loader from "@/shared/ui/components/Loader";
import BaseCard from "@/shared/ui/components/BaseCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import { Link } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY);

const CheckoutView = () => {
  const { cart } = usePurchaseStore();
  // const [clientSecret, setClientSecret] = useState<string>("");

  const handleCheckout = async () => {
    if (!cart) return;

    // const { result, error, status } = await postRequest<
    //   { paymetIntent: string },
    //   {
    //     orderId: number;
    //     paymentMethodId: number;
    //   }
    // >("/api/checking", {
    //   orderId: cart.id,
    //   paymentMethodId: 1,
    // });

    // if (error) {
    //   console.error("Error fetching PaymentIntent:", error, status);
    //   return;
    // }

    // console.log(result);
    // setClientSecret(result.paymetIntent);
  };

  useEffect(() => {
    handleCheckout();
  }, [cart]);

  // const appearance: Appearance = {
  //   theme: "stripe",
  //   variables: {
  //     colorBackground: "var(--background)",
  //     colorText: "var(--foreground)",
  //     colorPrimary: "var(--color-primary)",
  //     spacingUnit: "calc(var(--spacing) * 2)",
  //     borderRadius: "calc(var(--radius) - 2px)",
  //   },
  //   rules: {
  //     ".AccordionItem": {
  //       border: "none",
  //       boxShadow: "none",
  //     },
  //   },
  // };

  // if (!clientSecret) {
  //   return <Loader />;
  // }

  return (
    <>
      <CheckoutForm />
      {/* <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      </Elements> */}
    </>
  );
};

const CheckoutForm = () => {
  // const stripe = useStripe();
  // const elements = useElements();
  const { t } = useTranslation("purchase");

  const handleSubmit = async (/* e: React.FormEvent */) => {
    // e.preventDefault();
    // if (!stripe || !elements) return;
    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: window.location.origin + "/success",
    //   },
    // });
    // if (error) {
    //   console.error("Payment confirmation error:", error);
    // }
  };

  return (
    <div className="flex flex-col gap-6 grow">
      <div className="h-20">
        <h1>{t("step")} 3/3</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={APP_ROUTES.TO_CART}>{t("breadcrumb.cart")}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={APP_ROUTES.TO_ADDRESS}>{t("breadcrumb.address")}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("breadcrumb.payment")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BaseCard
        title={<h2>{t("checkout.title")}</h2>}
        content={
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* <PaymentElement />
          <div className="flex gap-4">
            <Button className="flex-1" variant="outline">
              Cancel
            </Button>
            <Button className="flex-2" type="submit" disabled={!stripe}>
              Pay Now
            </Button>
          </div> */}
          </form>
        }
      />
    </div>
  );
};

export default CheckoutView;
