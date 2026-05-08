# APPENDIX A: CRYPTOGRAPHIC IMPLEMENTATION

## Razorpay HMAC-SHA256 Payment Verification

---

### Purpose

To prevent payment fraud, every successful Razorpay payment must be verified on the server before crediting a user's account. A malicious user could theoretically intercept the network response and send fake payment data to claim credits without actually paying.

The solution is **HMAC-SHA256 Signature Verification** — a cryptographic technique where Razorpay signs the payment data with a secret key. Our server independently computes the same hash and compares it. If they match, the payment is authentic.

### How HMAC-SHA256 Works:

1.  Razorpay computes: `HMAC-SHA256(order_id + "|" + payment_id, your_secret_key)` and sends it as `razorpay_signature`.
2.  Our server does the exact same computation independently.
3.  If our computed hash **equals** the received `razorpay_signature`, the payment is genuine.
4.  If they are **different**, the request is rejected — someone tried to fake the payment.

---

### Full Server-Side Implementation

```typescript
// File: /src/app/api/verify-payment/route.ts
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, creditsToAdd, userId } =
      await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // Step 1: Compute the expected signature on the server
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    // Step 2: Compare the computed signature with the one received from Razorpay
    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed. Invalid signature.' },
        { status: 400 }
      );
    }

    // Step 3: Signature is authentic — update credits in the database
    const supabase = await createClient();
    const { error } = await supabase
      .from('users_data')
      .update({ credits: creditsToAdd })
      .eq('id', userId);

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Database update failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
```

---

### PostgreSQL Credit Deduction RPC Function

To ensure that credit deduction during image processing is **atomic** (i.e., cannot be partially executed or double-decremented in concurrent requests), a PostgreSQL stored function is used instead of a direct UPDATE query.

```sql
-- SQL Function stored in Supabase
CREATE OR REPLACE FUNCTION public.decrement_credit(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.users_data
  SET credits = credits - 1
  WHERE id = p_user_id AND credits > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Why `SECURITY DEFINER`?**
This clause ensures the function runs with the privileges of the function's creator (the database owner), bypassing Row Level Security for this specific atomic operation — which is safe because the server code controls which `user_id` is passed to the function.

**Why not a direct UPDATE?**
A direct `UPDATE SET credits = credits - 1` could, in theory, result in a credit balance below zero if two requests arrive simultaneously. The `AND credits > 0` condition inside the function prevents this at the database level.
