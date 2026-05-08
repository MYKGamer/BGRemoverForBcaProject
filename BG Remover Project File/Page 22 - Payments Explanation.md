# MONETIZATION & PAYMENT SYSTEM

To make this a complete SaaS product, a robust payment and credit system is implemented using **Razorpay**, India's most widely used payment gateway.

### Payment Flow:

| Step | Action | Where It Happens |
| :--- | :--- | :--- |
| **1** | User selects a credit package on the Pricing page | Client (Browser) |
| **2** | Server creates a Razorpay `order_id` via API | Server (API Route) |
| **3** | Razorpay checkout modal opens (UPI / Card / Netbanking) | Client (Browser) |
| **4** | Payment is completed by the user | Razorpay Gateway |
| **5** | Razorpay returns `payment_id`, `order_id`, and `signature` | Client (Browser) |
| **6** | Client sends these three values to our server for verification | Server (API Route) |
| **7** | Server verifies the HMAC-SHA256 signature to confirm authenticity | Server (API Route) |
| **8** | If valid, credits are added to the user's account in the database | Server → Supabase DB |

### Security Mechanism:
The most critical step is **Step 7 — Signature Verification**. This prevents a malicious user from faking a successful payment and claiming credits. The verification uses an HMAC-SHA256 hash computed from the `order_id` and `payment_id` using the `RAZORPAY_KEY_SECRET` environment variable.

The full server-side cryptographic implementation of this verification function is documented in **Appendix A** at the end of this report.

### Order Creation — Code Snippet:
```typescript
// /api/create-order/route.ts — Server creates Razorpay order
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const order = await razorpay.orders.create({
  amount: planAmount * 100, // Amount in paise
  currency: 'INR',
  receipt: `receipt_${userId}_${Date.now()}`,
});

return NextResponse.json({ orderId: order.id });
```

