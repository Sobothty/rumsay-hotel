import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

export default function PaymentForm({
  amount,
  check_in_date,
  check_out_date,
  room_ids,
  total_payment,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Make booking API call
        const bookingResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/bookings`,
          {
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            room_ids: room_ids,
            payment_method: "credit_card",
            total_payment: total_payment || amount / 100,
            stripe_token: paymentIntent.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (bookingResponse.status === 200 || bookingResponse.status === 201) {
          toast.success("Booking successful!");
          // Update room statuses
          if (Array.isArray(room_ids)) {
            await Promise.all(
              room_ids.map((roomId) =>
                axios
                  .patch(
                    `${import.meta.env.VITE_API_URL}/api/rooms/${roomId}`,
                    { is_active: false },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "authToken"
                        )}`,
                      },
                    }
                  )
                  .catch(() => {})
              )
            );
          }
          // Redirect to success page
          window.location.href = "/booking-success";
        } else {
          throw new Error("Booking failed");
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6">
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-8 space-y-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            Payment Details
          </h2>
          <p className="text-gray-600 mb-2">Complete your booking below.</p>
          <div className="flex justify-between items-center bg-blue-50 rounded-lg px-4 py-3 mb-2">
            <span className="font-semibold text-blue-800">Total</span>
            <span className="text-xl font-bold text-blue-700">
              ${(amount / 100).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Stripe Element UI */}
        <PaymentElement />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : `Pay Now $${(amount / 100).toFixed(2)}`}
        </button>

        {message && <div className="text-red-500 text-sm mt-2">{message}</div>}
      </div>
    </form>
  );
}
