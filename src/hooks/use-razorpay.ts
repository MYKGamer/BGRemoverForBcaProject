"use client";

import { useState } from "react";

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const processPayment = async (amount: number, onSuccess?: (res: any) => void) => {
    setLoading(true);
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    // 1. Create order on server
    const orderResponse = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    if (orderResponse.status === 401) {
      window.location.href = "/auth";
      return;
    }

    const orderData = await orderResponse.json();

    if (!orderData.id) {
      alert("Error creating order. Please try again.");
      setLoading(false);
      return;
    }

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "BGRemover AI",
      description: "Upgrade your credits",
      order_id: orderData.id,
      handler: async function (response: any) {
        // 3. Verify payment on server
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          alert("Payment Successful!");
          if (onSuccess) onSuccess(verifyData);
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
      },
      theme: {
        color: "#09090b",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return { processPayment, loading };
};
