import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      alert("Payment successful! (Test mode)");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Premium Plan Payment</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Pay $9.99
        </button>
      </form>
    </div>
  );
}
