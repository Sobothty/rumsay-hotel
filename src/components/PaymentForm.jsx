// PaymentForm.jsx
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Call your backend to create PaymentIntent
    axios
      .post(
        `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}/api/stripe/charge`,
        { amount: 5000 }
      ) // $50.00
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://your-frontend-url/payment-success",
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  if (!clientSecret) return <div>Loading payment...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
