"use client";

import Link from "next/link";
import { ArrowLeft, Check, HelpCircle, ShieldCheck, Zap } from "lucide-react";
import { PricingView } from "../dashboard/views/pricing-view";
import { Button } from "@/components/ui/button";

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

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#2563eb]/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2563eb]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-[#2563eb] rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-[#2563eb]/20 group-hover:scale-110 transition-transform">
              B
            </div>
            <span className="font-bold text-xl tracking-tight">BGRemover</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full px-6">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="text-[#a1a1aa] hover:text-white">Sign In</Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full px-6">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] text-xs font-bold uppercase tracking-widest animate-bounce">
            <Zap className="h-3 w-3 fill-current" />
            Limited Time Offer
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-[#a1a1aa] bg-clip-text text-transparent leading-tight">
            Simple, Transparent <br /> Pricing for Everyone
          </h1>
          <p className="text-xl text-[#a1a1aa]">
            Unlock the full power of AI-driven background removal. No hidden fees, just pure creativity.
          </p>
        </div>

        {/* Pricing Component Reuse */}
        <div className="max-w-6xl mx-auto">
          <PricingView hideHeader={true} />
        </div>

        {/* Trust Badges */}
        <div className="mt-32 pt-20 border-t border-[#27272a] grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 group">
            <div className="h-16 w-16 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-[#a1a1aa] text-sm">Powered by Razorpay. Your data is encrypted and 100% secure.</p>
          </div>
          <div className="space-y-4 group">
            <div className="h-16 w-16 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold">Instant Activation</h3>
            <p className="text-[#a1a1aa] text-sm">Credits are added to your account immediately after payment.</p>
          </div>
          <div className="space-y-4 group">
            <div className="h-16 w-16 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
              <HelpCircle className="h-8 w-8 text-[#2563eb]" />
            </div>
            <h3 className="text-xl font-bold">24/7 Priority Support</h3>
            <p className="text-[#a1a1aa] text-sm">Our team is always here to help you with any technical issues.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-40 max-w-4xl mx-auto space-y-12 mb-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-[#a1a1aa]">Everything you need to know about our plans and credits.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl bg-[#18181b]/50 border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-[#2563eb] to-purple-600 text-center space-y-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl font-bold text-white relative z-10">Ready to transform your images?</h2>
          <p className="text-white/80 max-w-xl mx-auto relative z-10">
            Join thousands of users who are already saving hours of work with our AI Background Remover.
          </p>
          <Link href="/auth" className="inline-block relative z-10">
            <Button size="lg" className="bg-white text-[#2563eb] hover:bg-white/90 rounded-full px-10 h-14 font-bold text-lg shadow-xl shadow-black/20">
              Get Started for Free
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-12 bg-[#09090b]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-[#2563eb] rounded flex items-center justify-center font-bold text-white text-xs">
              B
            </div>
            <span className="font-bold text-lg">BGRemover AI</span>
          </div>
          <div className="flex gap-8 text-sm text-[#a1a1aa]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-white transition-colors text-white">Pricing</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
          <p className="text-sm text-[#a1a1aa]">© 2026 BGRemover AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
