
// StripeContainer.tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51RYpk34S1H8L2mkPZZV82wbyCJNcbQNHIahT1nAnTipsL1ucxFeXW5Rwt4xx1vratLUNVX4Tl3Xk6ZXrL3ortOx200MqBt9IOs');

const StripeContainer = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeContainer;

