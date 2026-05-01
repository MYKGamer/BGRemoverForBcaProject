import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-[#2563eb] animate-spin" />
        </div>
        <div className="absolute inset-0 h-16 w-16 bg-[#2563eb]/20 blur-xl animate-pulse rounded-full -z-10" />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <h2 className="text-white font-bold tracking-tight">Initializing Dashboard</h2>
        <p className="text-[#a1a1aa] text-xs font-medium animate-pulse">Warming up AI engines...</p>
      </div>
    </div>
  );
}
