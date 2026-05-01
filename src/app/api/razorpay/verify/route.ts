import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Yahan aap apni database update logic likh sakte hain
      // Maslan: user ke credits increase karna
      return NextResponse.json({ 
        message: "Payment verified successfully",
        success: true 
      });
    } else {
      return NextResponse.json({ 
        message: "Payment verification failed",
        success: false 
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 });
  }
}
