import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { API_ROUTES } from "@/shared/constants/routes";
import { Button } from "@/lib/components/ui/button";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51RHl0nP3G6YqBCSln3FADBnkJN9na8kiqvsczrPWePhnqWXvfyA6FE9zat0QujYCYs5xl6mLqxcXEgOoTh6xQRP000Lfjyt5Bd"
);

// Embedded subscription form
function SubscriptionForm({
  orderId,
  billingAddressId,
  recurrence,
  onSuccess,
}: {
  orderId: number;
  billingAddressId: number;
  recurrence: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch(`${API_ROUTES.URL}/api/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        billingAddressId,
        paymentMethodId: 1, // or however you choose/store this
        recurrence,
      }),
    })
      .then((r) => r.json())
      .then(({ paymetIntent }) => {
        setClientSecret(paymetIntent.client_secret);
      })
      .catch(console.error);
  }, [orderId, billingAddressId, recurrence]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    // guard against null
    const cardEl = elements.getElement(CardElement);
    if (!cardEl) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: cardEl },
      }
    );

    if (error) {
      console.error("Payment failed", error);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <CardElement options={{ hidePostalCode: true }} />
      <Button type="submit" disabled={!stripe || !clientSecret}>
        Pay {recurrence === 1 ? "monthly" : "yearly"}
      </Button>
    </form>
  );
}
