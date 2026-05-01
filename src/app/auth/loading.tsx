import { Loader2, ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center gap-3 animate-pulse">
        <div className="h-12 w-12 rounded-xl bg-[#2563eb] flex items-center justify-center shadow-lg shadow-blue-500/20">
          <ShieldCheck className="h-7 w-7 text-white" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">BG<span className="text-[#2563eb]">Remover</span></span>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className="h-6 w-6 text-[#2563eb] animate-spin" />
        <p className="text-[#a1a1aa] text-sm font-medium">Securing connection...</p>
      </div>
    </div>
  );
}
