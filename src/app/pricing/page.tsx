"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { PricingView } from "../dashboard/views/pricing-view";
import { ArrowLeft, Check, HelpCircle, ShieldCheck, Zap, Star } from "lucide-react";

export default function PricingPage() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#2563eb]/30 relative overflow-x-hidden">
      {/* Background Decorative Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2563eb]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* 1. Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/60 backdrop-blur-xl">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-gradient-to-br from-[#2563eb] to-purple-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                B
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">BGRemover</span>
            </a>
            <div className="flex items-center gap-6">
              {user ? (
                <a href="/dashboard">
                  <button className="bg-white text-black hover:bg-[#e4e4e7] rounded-full px-8 font-bold shadow-lg shadow-white/5 h-11 transition-all">
                    Dashboard
                  </button>
                </a>
              ) : (
                <div className="flex items-center gap-2">
                  <a href="/auth">
                    <button className="text-[#a1a1aa] hover:text-white font-bold h-11 px-6 transition-all">Sign In</button>
                  </a>
                  <a href="/auth">
                    <button className="bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full px-8 font-bold shadow-lg shadow-blue-500/20 h-11 transition-all">
                      Get Started
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 2. Hero Section */}
        <main className="container mx-auto px-6 pt-24 pb-12 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent leading-[0.9]">
              Pricing Built <br /> for Speed.
            </h1>
            <p className="text-xl md:text-2xl text-[#a1a1aa] max-w-2xl mx-auto font-medium">
              Professional AI background removal starting from zero. Scale as you grow with flexible plans.
            </p>
          </motion.div>
        </main>

        {/* 3. Pricing Cards Section */}
        <section className="container mx-auto px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <PricingView hideHeader={true} user={user} />
          </div>
        </section>

        {/* 4. FAQ Section */}
        <section className="container mx-auto px-6 py-24 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Common Questions</h2>
            <p className="text-[#a1a1aa] font-medium">Everything you need to know about our plans.</p>
          </div>
          
          <div className="grid gap-6">
            {[
              { q: "How do credits work?", a: "One credit is used for each image background removal. They never expire!" },
              { q: "Is it secure?", a: "Yes, all payments are processed securely via Razorpay." },
              { q: "Can I upgrade later?", a: "Absolutely! You can purchase more credits anytime." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                <h4 className="font-bold text-xl mb-3 text-white">{faq.q}</h4>
                <p className="text-[#a1a1aa] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Footer */}
        <footer className="border-t border-white/5 py-12 bg-[#09090b]">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-[#71717a]">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-[#2563eb] rounded flex items-center justify-center font-black text-white text-[10px]">B</div>
              <span className="font-black text-lg tracking-tighter text-white">BGRemover</span>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/pricing" className="text-white">Pricing</a>
              <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase">© 2026 BGRemover AI</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
