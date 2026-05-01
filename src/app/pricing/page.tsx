"use client";

import Link from "next/link";
import { ArrowLeft, Check, HelpCircle, ShieldCheck, Zap, Star } from "lucide-react";
import { PricingView } from "../dashboard/views/pricing-view";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export const unstable_instant = true;

const faqs = [
  {
    q: "How do credits work?",
    a: "One credit is consumed for every image background removal. High-quality exports and previews are included in the same credit.",
  },
  {
    q: "Do credits expire?",
    a: "No, your purchased credits stay in your account forever until you use them.",
  },
  {
    q: "Can I use it for commercial projects?",
    a: "Yes, our Pro and Business plans include a full commercial license for all your edited images.",
  },
  {
    q: "Is there a refund policy?",
    a: "If you're not satisfied, contact our support within 7 days of purchase for a full refund (applicable if credits are unused).",
  },
];

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
      {/* 1. Advanced Background - Geometric Grid & Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2563eb]/15 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* 2. Premium Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-gradient-to-br from-[#2563eb] to-purple-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              B
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">BGRemover</span>
          </Link>
          <div className="flex items-center gap-6">
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-white text-black hover:bg-[#e4e4e7] rounded-full px-8 font-bold shadow-lg shadow-white/5 h-11">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth">
                  <Button variant="ghost" className="text-[#a1a1aa] hover:text-white font-bold h-11 px-6">Sign In</Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full px-8 font-bold shadow-lg shadow-blue-500/20 h-11">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-24 pb-32 relative z-10">
        {/* 3. Hero Section - Animated Typography */}
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-[11px] font-black uppercase tracking-[0.2em] backdrop-blur-sm"
          >
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            Join 10,000+ creators
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent leading-[0.9]"
          >
            Pricing Built <br /> for Speed.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[#a1a1aa] max-w-2xl mx-auto font-medium"
          >
            Professional AI background removal starting from zero. Scale as you grow with flexible monthly plans.
          </motion.p>
        </div>

        {/* 4. The Core Pricing Interface */}
        <div className="max-w-7xl mx-auto">
          <PricingView hideHeader={true} user={user} />
        </div>

        {/* 5. Interactive Trust Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Secure Checkout", desc: "Enterprise-grade encryption powered by Razorpay.", color: "text-green-400" },
            { icon: Zap, title: "Lightning Fast", desc: "Credits activate instantly. No waiting, just creating.", color: "text-yellow-400" },
            { icon: HelpCircle, title: "Priority Support", desc: "Dedicated team for our Pro and Business users.", color: "text-blue-400" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all group"
            >
              <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className={`h-7 w-7 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 6. FAQ Section - Refined Design */}
        <section className="mt-48 max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Got Questions?</h2>
            <p className="text-[#a1a1aa] font-medium text-lg">Everything you need to know about our plans and credits.</p>
          </div>
          
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-default group"
              >
                <h4 className="font-bold text-xl mb-4 text-white group-hover:text-[#2563eb] transition-colors">{faq.q}</h4>
                <p className="text-[#a1a1aa] leading-relaxed font-medium">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. Grand CTA */}
        <motion.section 
          whileHover={{ scale: 1.01 }}
          className="mt-40 p-1 bg-gradient-to-r from-[#2563eb] via-purple-600 to-[#2563eb] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          <div className="bg-[#09090b] rounded-[2.9rem] p-16 md:p-24 text-center space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#2563eb]/5 opacity-50" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#2563eb]/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
            
            <h2 className="text-5xl md:text-7xl font-black text-white relative z-10 leading-[0.9] tracking-tighter">
              Start Creating <br /> Magic Today.
            </h2>
            <p className="text-[#a1a1aa] max-w-xl mx-auto relative z-10 text-lg font-medium">
              Join thousands of users who are already saving hours of work with our AI Background Remover.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth">
                <Button size="lg" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full px-12 h-16 font-black text-xl shadow-xl shadow-blue-500/30">
                  Get Started for Free
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 text-white rounded-full px-12 h-16 font-black text-xl">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* 8. Footer - Minimal & Clean */}
      <footer className="border-t border-white/5 py-16 bg-[#09090b] relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 bg-[#2563eb] rounded-lg flex items-center justify-center font-black text-white text-xs">
                B
              </div>
              <span className="font-black text-xl tracking-tighter">BGRemover AI</span>
            </Link>
            <p className="text-sm text-[#71717a] font-medium">Built with precision for the next generation of creators.</p>
          </div>
          
          <div className="flex gap-12 text-sm font-black uppercase tracking-widest text-[#a1a1aa]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="/pricing" className="hover:text-white transition-colors text-white">Pricing</a>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
          
          <p className="text-xs text-[#52525b] font-bold uppercase tracking-widest">© 2026 BGRemover AI. Built by Antigravity.</p>
        </div>
      </footer>
    </div>
  );
}
