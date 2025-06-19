// CheckoutForm.tsx
import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const getTotalCartRoomPriceFromLocalStorage = () => {
  const value = localStorage.getItem("totalCartRoomPrice");
  console.log("Total cart room price from localStorage:", value);
  return value !== null ? Number(value) : 0;
};

const getRoomIdsFromLocalStorage = () => {
  const roomIds = localStorage.getItem("RoomIds");
  console.log("Room IDs from localStorage:", roomIds);
  return roomIds ? JSON.parse(roomIds) : [];
};

const getCheckInDateFromLocalStorage = () => {
  const checkInDate = localStorage.getItem("checkInDate") || "";
  console.log("Check-in date from localStorage:", checkInDate);
  return checkInDate;
};

const getCheckOutDateFromLocalStorage = () => {
  const checkOutDate = localStorage.getItem("checkOutDate") || "";
  console.log("Check-out date from localStorage:", checkOutDate);
  return checkOutDate;
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(50);
  const [roomIds, setRoomIds] = useState<number[]>([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Initializing checkout data...");

    const price = getTotalCartRoomPriceFromLocalStorage();
    setAmount(price);

    const ids = getRoomIdsFromLocalStorage();
    setRoomIds(ids);

    const inDate = getCheckInDateFromLocalStorage();
    setCheckInDate(inDate);

    const outDate = getCheckOutDateFromLocalStorage();
    setCheckOutDate(outDate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }

    console.log("Creating Stripe token...");
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Stripe token creation error:", error);
      alert(error.message);
      return;
    }

    console.log("Stripe token created:", token);

    try {
      console.log("Sending payment request...");
      const response = await axios.post(
        "https://api-hotel-production-ee3e.up.railway.app/api/stripe/charge",
        {
          amount,
          currency: "usd",
          token: token.id,
        }
      );

      console.log("Stripe payment response:", response.data);
      if (!response.data || !response.data.message) {
        throw new Error("Invalid response from payment API");
      }

      if (response.data.message === "Payment successful") {
        console.log("Payment was successful, sending booking request...");
        console.log({
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          room_ids: roomIds,
          payment_method: "credit_card",
          total_payment: amount,
          stripe_token: token.id,
        });

        try {
          const booking = await axios.post(
            "https://api-hotel-production-ee3e.up.railway.app/api/bookings",
            {
              check_in_date: checkInDate,
              check_out_date: checkOutDate,
              room_ids: roomIds,
              payment_method: "credit_card",
              total_payment: amount,
              stripe_token: "tok_visa",
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          console.log("Booking API response:", booking.data);
          
        } catch (bookingError: any) {
          console.error("Booking API error:", bookingError);
          alert(
            "Error booking: " +
              (bookingError.response?.data?.message || bookingError.message)
          );
        }
      } else {
        console.error("Payment failed:", response.data);
      }
    } catch (paymentError: any) {
      console.error("Stripe payment API error:", paymentError);
      alert(
        "Error processing payment: " +
          (paymentError.response?.data?.message || paymentError.message)
      );
    }

    localStorage.removeItem("checkIndate");
    localStorage.removeItem("checkOutdate");
    localStorage.removeItem("roomIds");
    localStorage.removeItem("amount");
    localStorage.removeItem("cartItems");

    navigate("/payment-success")
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Amount (USD):</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      <label>Card Details:</label>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
