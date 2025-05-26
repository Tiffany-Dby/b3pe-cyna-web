// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { API_ROUTES } from "@/shared/constants/routes";
// import { Button } from "@/lib/components/ui/button";
// import { useEffect, useState } from "react";

// // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY);

// function SubscriptionForm({
//   orderId,
//   billingAddressId,
//   recurrence,
//   onSuccess,
// }: {
//   orderId: number;
//   billingAddressId: number;
//   recurrence: number;
//   onSuccess: () => void;
// }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState<string>("");

//   useEffect(() => {
//     fetch(`${API_ROUTES.URL}/api/subscriptions`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         orderId,
//         billingAddressId,
//         paymentMethodId: 1,
//         recurrence,
//       }),
//     })
//       .then((r) => r.json())
//       .then(({ paymetIntent }) => {
//         setClientSecret(paymetIntent.client_secret);
//       })
//       .catch(console.error);
//   }, [orderId, billingAddressId, recurrence]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;

//     const cardEl = elements.getElement(CardElement);
//     if (!cardEl) return;

//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: { card: cardEl },
//       }
//     );

//     if (error) {
//       console.error("Payment failed", error);
//     } else if (paymentIntent?.status === "succeeded") {
//       onSuccess();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <CardElement options={{ hidePostalCode: true }} />
//       <Button type="submit" disabled={!stripe || !clientSecret}>
//         Pay {recurrence === 1 ? "monthly" : "yearly"}
//       </Button>
//     </form>
//   );
// }
