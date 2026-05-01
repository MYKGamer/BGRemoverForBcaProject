"use client";

import { CheckCircle2, Zap, Sparkles, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/use-razorpay";
import { useRouter } from "next/navigation";

interface LandingPricingProps {
  isLoggedIn: boolean;
}

const plans = [
  {
    name: "Free Plan",
    price: 1,
    credits: 2,
    features: ["2 Free Credits on Signup", "Standard AI Processing", "History Access"],
    icon: Zap,
    color: "blue",
  },
  {
    name: "Pro Plan",
    price: 9,
    credits: 5,
    features: ["5 High Quality Exports", "Priority Processing Speed", "API Access", "Premium Support"],
    icon: Sparkles,
    color: "purple",
    popular: true,
  }
];

export function LandingPricing({ isLoggedIn }: LandingPricingProps) {
  const { processPayment, loading } = useRazorpay();
  const router = useRouter();

  const handleAction = async (amount: number, credits: number) => {
    if (!isLoggedIn) {
      router.push("/auth");
      return;
    }
    
    await (processPayment as any)(amount, credits, (res: any) => {
      console.log("Payment Successful:", res);
      router.push("/dashboard");
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      {plans.map((plan) => {
        const Icon = plan.icon;
        return (
          <div 
            key={plan.name}
            className={`relative p-8 rounded-3xl flex flex-col transition-all duration-500 hover:-translate-y-2 ${
              plan.popular 
                ? "bg-[#09090b] border-2 border-[#2563eb] shadow-2xl shadow-blue-900/20" 
                : "bg-[#18181b] border border-[#27272a]"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-[#2563eb] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-white">₹{plan.price}</span>
              <span className="text-[#a1a1aa]">/monthly</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-[#e4e4e7]">
                  <CheckCircle2 className={`h-5 w-5 ${plan.popular ? "text-[#2563eb]" : "text-[#a1a1aa]"}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => handleAction(plan.price, plan.credits)}
              disabled={loading}
              className={`w-full rounded-full h-12 font-semibold transition-all ${
                plan.popular 
                  ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/20" 
                  : "bg-[#27272a] hover:bg-[#3f3f46] text-white"
              }`}
            >
              {loading ? "Processing..." : plan.popular ? "Upgrade to Pro" : "Get Started Free"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
