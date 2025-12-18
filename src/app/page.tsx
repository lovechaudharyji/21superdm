"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Social Proof Strip */}
        <section className="py-12 bg-white border-y border-border/50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
              Trusted by 50,000+ Indian Businesses
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               <span className="text-2xl font-bold font-display text-slate-400">Lenskart</span>
               <span className="text-2xl font-bold font-display text-slate-400">Boat</span>
               <span className="text-2xl font-bold font-display text-slate-400">Mamaearth</span>
               <span className="text-2xl font-bold font-display text-slate-400">Sugar</span>
               <span className="text-2xl font-bold font-display text-slate-400">Zepto</span>
            </div>
          </div>
        </section>

        <Pricing />
        
        {/* Final CTA */}
        <section className="py-24 bg-primary text-white text-center">
           <div className="container mx-auto px-4">
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to grow your business?</h2>
             <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
               Join thousands of Indian entrepreneurs using Supr DM to automate sales and support.
             </p>
             <Button 
               onClick={() => router.push("/signup")}
               className="bg-accent text-accent-foreground px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-primary transition-colors shadow-lg"
             >
               Get Started for Free
             </Button>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
