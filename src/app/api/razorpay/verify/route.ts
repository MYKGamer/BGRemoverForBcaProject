import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { createClient } from "@/utils/supabase/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

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
      // 1. Fetch order to get notes (userId and credits)
      const order = await razorpay.orders.fetch(razorpay_order_id);
      const { userId, credits } = order.notes as any;

      if (userId && credits) {
        const supabase = await createClient();
        
        // 2. Update credits in users_data
        const { data: currentData } = await supabase
          .from('users_data')
          .select('credits')
          .eq('id', userId)
          .single();
          
        const newCredits = (currentData?.credits || 0) + Number(credits);
        
        await supabase
          .from('users_data')
          .update({ credits: newCredits })
          .eq('id', userId);
      }

      return NextResponse.json({ 
        message: "Payment verified and credits added successfully",
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
