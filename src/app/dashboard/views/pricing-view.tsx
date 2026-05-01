"use client";

import { Check, Zap, Sparkles, CreditCard } from "lucide-react";
import { useRazorpay } from "@/hooks/use-razorpay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    price: 99,
    credits: 10,
    features: ["10 High Quality Exports", "Standard Processing", "Email Support"],
    icon: Zap,
    color: "blue",
  },
  {
    name: "Pro",
    price: 499,
    credits: 100,
    features: ["100 High Quality Exports", "Priority Processing", "24/7 Support", "Commercial License"],
    icon: Sparkles,
    color: "purple",
    popular: true,
  },
  {
    name: "Business",
    price: 999,
    credits: 500,
    features: ["500 High Quality Exports", "Ultra-Fast AI Engine", "Dedicated Account Manager", "Bulk Processing"],
    icon: CreditCard,
    color: "green",
  },
];

export function PricingView({ hideHeader = false }: { hideHeader?: boolean }) {
  const { processPayment, loading } = useRazorpay();

  const handleSubscribe = async (amount: number) => {
    await processPayment(amount, (res) => {
      console.log("Payment Successful:", res);
      // Yahan aap dashboard refresh kar sakte hain
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {!hideHeader && (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Pricing Plans</h1>
          <p className="text-[#a1a1aa]">Choose the perfect plan for your creative needs.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl bg-[#09090b] border ${
                plan.popular ? "border-[#2563eb] shadow-lg shadow-[#2563eb]/10" : "border-[#27272a]"
              } flex flex-col h-full hover:border-[#3f3f46] transition-all group`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2563eb] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                  plan.color === "blue" && "bg-blue-500/10",
                  plan.color === "purple" && "bg-purple-500/10",
                  plan.color === "green" && "bg-green-500/10"
                )}>
                  <Icon className={cn(
                    "h-6 w-6",
                    plan.color === "blue" && "text-blue-500",
                    plan.color === "purple" && "text-purple-500",
                    plan.color === "green" && "text-green-500"
                  )} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                  <span className="text-[#a1a1aa] text-sm">/one-time</span>
                </div>
                <p className="mt-2 text-sm text-[#a1a1aa]">{plan.credits} AI Credits</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#2563eb] shrink-0" />
                    <span className="text-sm text-[#a1a1aa]">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSubscribe(plan.price)}
                disabled={loading}
                className={`w-full py-6 rounded-xl font-bold ${
                  plan.popular ? "bg-[#2563eb] hover:bg-[#1d4ed8]" : "bg-white text-black hover:bg-white/90"
                } transition-all`}
              >
                {loading ? "Processing..." : `Get ${plan.name}`}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
