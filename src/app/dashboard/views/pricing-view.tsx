"use client";

import { Check, Zap, Sparkles, CreditCard, Info } from "lucide-react";
import { useRazorpay } from "@/hooks/use-razorpay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Basic",
    price: 1,
    credits: 2,
    features: ["2 High Quality Exports", "Standard Processing", "Email Support"],
    icon: Zap,
    color: "blue",
  },
  {
    name: "Pro",
    price: 9,
    credits: 5,
    features: ["5 High Quality Exports", "Priority Processing", "24/7 Support", "Commercial License"],
    icon: Sparkles,
    color: "purple",
    popular: true,
  },
  {
    name: "Business",
    price: 39,
    credits: 10,
    features: ["10 High Quality Exports", "Ultra-Fast AI Engine", "Dedicated Account Manager", "Bulk Processing"],
    icon: CreditCard,
    color: "green",
  },
];

export function PricingView({ hideHeader = false, user = null }: { hideHeader?: boolean, user?: any }) {
  const { processPayment, loading } = useRazorpay();
  const router = useRouter();

  const handleSubscribe = async (amount: number, credits: number) => {
    if (!user) {
      router.push("/auth?next=/pricing");
      return;
    }

    await (processPayment as any)(amount, credits, (res: any) => {
      console.log("Payment Successful:", res);
      window.location.reload();
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {!hideHeader && (
        <div className="flex flex-col gap-3 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight text-white sm:text-5xl"
          >
            Pricing Plans
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#a1a1aa] max-w-2xl"
          >
            Choose the perfect plan for your creative needs. Upgrade anytime to unlock more features.
          </motion.p>
        </div>
      )}

      {/* Test Mode Note for Demo */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto md:mx-0"
      >
        <div className="bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-2xl p-5 flex items-start gap-4 backdrop-blur-sm shadow-xl shadow-blue-500/5">
          <div className="bg-[#2563eb]/20 p-2.5 rounded-xl">
            <Info className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-blue-400 font-bold text-sm tracking-tight">Demo / Test Mode Instructions</h4>
            <p className="text-blue-400/80 text-sm mt-1.5 leading-relaxed">
              To test the payment flow: Select a plan, and in the Razorpay popup, choose <b>Netbanking</b> &rarr; <b>Select any Bank</b> &rarr; click <b>Success</b>. 
              Real UPI/QR payments are disabled in this project demo mode.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={cn(
                "relative p-8 rounded-[2.5rem] bg-[#09090b] border flex flex-col h-full transition-all duration-500",
                plan.popular 
                  ? "border-[#2563eb] shadow-[0_0_60px_-15px_rgba(37,99,235,0.4)] ring-1 ring-[#2563eb]/30" 
                  : "border-[#27272a] hover:border-[#3f3f46] hover:shadow-2xl hover:shadow-white/5"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white text-[10px] font-black rounded-full uppercase tracking-[0.25em] shadow-xl shadow-blue-500/40">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <div className={cn(
                  "h-16 w-16 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-inner relative overflow-hidden group",
                  plan.color === "blue" && "bg-blue-500/10 text-blue-400",
                  plan.color === "purple" && "bg-purple-500/10 text-purple-400",
                  plan.color === "green" && "bg-green-500/10 text-green-400"
                )}>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="h-8 w-8 relative z-10" />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-black text-white tracking-tighter">₹{plan.price}</span>
                  <span className="text-[#a1a1aa] text-sm font-medium">
                    {plan.name === "Basic" ? "/ One-time" : "/monthly"}
                  </span>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", 
                    plan.color === "blue" && "bg-blue-400",
                    plan.color === "purple" && "bg-purple-400",
                    plan.color === "green" && "bg-green-400"
                  )} />
                  <span className="text-[11px] font-black text-white uppercase tracking-widest">
                    {plan.credits} AI Credits
                  </span>
                </div>
              </div>

              <div className="space-y-5 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4 group/item">
                    <div className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center transition-all group-hover/item:scale-110",
                      plan.popular ? "bg-[#2563eb]/20" : "bg-white/5"
                    )}>
                      <Check className={cn(
                        "h-3.5 w-3.5",
                        plan.popular ? "text-[#2563eb]" : "text-[#a1a1aa]"
                      )} />
                    </div>
                    <span className="text-[15px] text-[#a1a1aa] group-hover/item:text-white transition-colors font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSubscribe(plan.price, plan.credits)}
                disabled={loading}
                className={cn(
                  "w-full py-8 rounded-2xl font-black text-lg transition-all active:scale-[0.97] cursor-pointer",
                  plan.popular 
                    ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-2xl shadow-blue-500/30" 
                    : "bg-white text-black hover:bg-[#f4f4f5] shadow-2xl shadow-white/5"
                )}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 border-3 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Get ${plan.name}`
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
