import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../Components/components/PaymentForm';
import { Box } from '@mui/material';

const stripePromise = loadStripe("pk_test_51RRqotI2BfJFoZSqrYdjm1rZ5txTfn8TC6N5iyIuvfqATFSlM6ZUflyfdXm3zDNhMEfzcIMtD1rYF53vXy1Douoq00VjYcFmbR"); // Your public Stripe key

export default function Subscription() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe', // or 'flat', 'night', 'none'
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
            <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
                <PaymentForm />
                <form action="https://banking.idram.am/Payment/GetPayment" method="POST">
                    <input type="hidden" name="EDP_LANGUAGE" value="EN"></input>
                    <input type="hidden" name="EDP_REC_ACCOUNT" value="691246334"></input>
                    <input type="hidden" name="EDP_DESCRIPTION" value="Payment for Order #123"></input>
                    <input type="hidden" name="EDP_AMOUNT" value="1000"></input>
                    <input type="hidden" name="EDP_BILL_NO" value="ORDER123"></input>
                    <input type="submit" value="Pay with Idram"></input>
                </form>

            </Box>
        </Elements>
      )}
    </div>
  );
}

