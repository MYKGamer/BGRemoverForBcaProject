import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] p-8 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl text-[#fafafa]">
          AI Background <span className="text-[#2563eb]">Remover</span>
        </h1>
        <p className="mt-6 text-xl leading-8 text-[#a1a1aa] max-w-2xl mx-auto">
          Give your photos a professional look by removing backgrounds instantly. Simple, fast, and built for everyone—from students to creators.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href={user ? "/dashboard" : "/auth"}>
            <Button size="lg" className="px-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all active:translate-y-[1px]">
              Get Started
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-[#27272a] hover:bg-[#27272a] text-[#fafafa]">
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}
