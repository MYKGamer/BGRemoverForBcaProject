import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
        AI Background <span className="text-primary">Remover</span>
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
        Professional-grade background removal for your college project. Secure, fast, and polished.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button size="lg" className="px-8">
          Get Started
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>
    </div>
  );
}
