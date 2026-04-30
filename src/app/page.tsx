import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { 
  ImageIcon, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  History, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  MonitorPlay,
  Wand2
} from "lucide-react";
import { BeforeAfterSlider } from "@/components/before-after-slider";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const authRoute = user ? "/dashboard" : "/auth";

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#2563eb]/30 font-sans">
      {/* 1. Glassmorphism Navigation (Sticky) */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#2563eb] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ImageIcon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">BG<span className="text-[#2563eb]">Remover</span> AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#a1a1aa]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all shadow-lg shadow-blue-500/20 rounded-full px-6">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="text-[#a1a1aa] hover:text-white hover:bg-[#18181b]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all shadow-lg shadow-blue-500/20 rounded-full px-6">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center w-full">
        {/* 2. The Hero Section */}
        <section className="w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="h-3 w-3" />
            <span>BG Remover 1.0 is live &rarr;</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#fafafa] mb-6 leading-tight">
            Pixel-Perfect Backgrounds. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#60a5fa]">
              Zero Effort.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl mb-10 leading-relaxed">
            Professional AI background removal for designers, developers, and e-commerce. Separate subjects from the noise in milliseconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link href={authRoute}>
              <Button size="lg" className="w-full sm:w-auto px-8 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all shadow-lg shadow-blue-500/20 rounded-full text-base font-semibold group">
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 border-[#27272a] hover:bg-[#18181b] text-white rounded-full text-base font-semibold">
                View Demo
              </Button>
            </a>
          </div>

          {/* MacOS-style Mockup Window */}
          <div id="how-it-works" className="mt-20 w-full rounded-2xl border border-[#27272a] bg-[#18181b] shadow-2xl overflow-hidden shadow-black/50">
            <div className="h-10 border-b border-[#27272a] bg-[#09090b] flex items-center px-4 gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
            </div>
            <BeforeAfterSlider />
          </div>
        </section>

        {/* 3. Bento-Grid Features Section */}
        <section id="features" className="w-full py-24 px-6 bg-[#09090b]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Everything you need to separate <br className="hidden md:block"/>
                the subject from the noise.
              </h2>
              <p className="text-[#a1a1aa] text-lg">Powerful tools packed into a beautiful, intuitive interface.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
              {/* Card 1 (Span 2) */}
              <div className="md:col-span-2 row-span-1 bg-[#18181b]/50 border border-[#27272a] rounded-3xl p-8 flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:border-[#2563eb]/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex-1 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-[#2563eb]/20 flex items-center justify-center mb-6 border border-[#2563eb]/30">
                    <Wand2 className="h-5 w-5 text-[#2563eb]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Clipdrop AI Engine</h3>
                  <p className="text-[#a1a1aa] leading-relaxed">Flawless edge detection even on complex subjects like hair, fur, and transparent objects. Industry-leading precision.</p>
                </div>
                <div className="hidden sm:flex flex-1 items-center justify-center relative z-10">
                  {/* Before/After visual representation */}
                  <div className="relative w-full h-32 bg-[#09090b] rounded-xl border border-[#27272a] overflow-hidden flex shadow-inner">
                    <div className="w-1/2 h-full border-r border-[#27272a] flex items-center justify-center bg-zinc-800/30">
                      <span className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest">Before</span>
                    </div>
                    <div className="w-1/2 h-full bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-zinc-900/50 flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">After</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-span-1 row-span-1 bg-[#18181b]/50 border border-[#27272a] rounded-3xl p-8 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-6 border border-yellow-500/30">
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-[#a1a1aa] leading-relaxed text-sm">Process high-resolution images in seconds, not minutes. Optimized for speed.</p>
              </div>

              {/* Card 3 */}
              <div className="col-span-1 row-span-1 bg-[#18181b]/50 border border-[#27272a] rounded-3xl p-8 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Secure Storage</h3>
                <p className="text-[#a1a1aa] leading-relaxed text-sm">Your original and transparent files are securely backed up in our Supabase cloud vaults.</p>
              </div>

              {/* Card 4 (Span 2) */}
              <div className="md:col-span-2 row-span-1 bg-[#18181b]/50 border border-[#27272a] rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                      <History className="h-5 w-5 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">History Dashboard</h3>
                    <p className="text-[#a1a1aa] leading-relaxed max-w-lg">Manage, review, and download your past creations with our lightning-fast Single Page Application interface.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Social Proof / Wall of Love */}
        <section id="testimonials" className="w-full py-24 px-6 border-t border-[#27272a] bg-[#09090b]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-16">
              Trusted by creators and students.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 text-left relative">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-[#e4e4e7] mb-6 font-medium leading-relaxed">"Saved me hours on my college presentation edits. The accuracy on hair is just insane."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-200 font-bold border border-blue-700">AK</div>
                  <div>
                    <p className="text-white text-sm font-bold">Aman Kumar</p>
                    <p className="text-[#a1a1aa] text-xs">BCA Student</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 text-left relative">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-[#e4e4e7] mb-6 font-medium leading-relaxed">"We use this for all our e-commerce product shots now. It's fast, reliable, and the SPA is so smooth."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center text-purple-200 font-bold border border-purple-700">SJ</div>
                  <div>
                    <p className="text-white text-sm font-bold">Sarah Jenkins</p>
                    <p className="text-[#a1a1aa] text-xs">E-com Owner</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 text-left relative">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-[#e4e4e7] mb-6 font-medium leading-relaxed">"The cleanest UI I've seen for a background remover. No ads, no nonsense. Just works."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-900 flex items-center justify-center text-green-200 font-bold border border-green-700">MR</div>
                  <div>
                    <p className="text-white text-sm font-bold">Markus R.</p>
                    <p className="text-[#a1a1aa] text-xs">Freelance Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Pricing Section */}
        <section id="pricing" className="w-full py-24 px-6 border-t border-[#27272a] bg-[#09090b]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Simple pricing. Start for free.
            </h2>
            <p className="text-[#a1a1aa] text-lg mb-16">No hidden fees, no credit card required to start.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Free Plan */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-8 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">₹0</span>
                  <span className="text-[#a1a1aa]">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-[#e4e4e7]">
                    <CheckCircle2 className="h-5 w-5 text-[#a1a1aa]" />
                    <span>6 Free Credits on Signup</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4e7]">
                    <CheckCircle2 className="h-5 w-5 text-[#a1a1aa]" />
                    <span>Standard AI Processing</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#e4e4e7]">
                    <CheckCircle2 className="h-5 w-5 text-[#a1a1aa]" />
                    <span>History Access</span>
                  </li>
                </ul>
                <Link href={authRoute} className="w-full">
                  <Button className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-full h-12 font-semibold">
                    Get Started Free
                  </Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-[#09090b] border-2 border-[#2563eb] rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-[#2563eb] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">₹499</span>
                  <span className="text-[#a1a1aa]">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 text-[#2563eb]" />
                    <span className="font-medium">Unlimited Background Removals</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 text-[#2563eb]" />
                    <span>Priority Processing Speed</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 text-[#2563eb]" />
                    <span>API Access</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 text-[#2563eb]" />
                    <span>Premium Support</span>
                  </li>
                </ul>
                <Link href={authRoute} className="w-full">
                  <Button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full h-12 font-semibold shadow-lg shadow-blue-500/20">
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="w-full bg-[#09090b] border-t border-[#27272a] pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded border border-[#27272a] bg-[#18181b] flex items-center justify-center">
                <ImageIcon className="h-3 w-3 text-[#2563eb]" />
              </div>
              <span className="font-bold text-white tracking-tight">BGRemover</span>
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed pr-4">
              Making professional image editing accessible to everyone through advanced AI technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#a1a1aa]">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-[#a1a1aa]">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#a1a1aa]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto pt-8 border-t border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-4 text-[#a1a1aa] text-sm">
          <p>© 2026 BGRemover AI. Built with precision for the Final Year Project.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
