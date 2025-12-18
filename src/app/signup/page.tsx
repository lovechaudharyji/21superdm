"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="order-2 lg:order-1 hidden lg:block relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        
        <div className="relative h-full flex flex-col justify-center p-16">
          <div className="max-w-md mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold border border-green-200">
               <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Trusted by 50,000+ businesses
            </div>
            
            <h2 className="font-display font-bold text-4xl text-slate-900">
              Join the fastest growing automation platform in India.
            </h2>
            
            <div className="space-y-4">
              {[
                "Unlimited Instagram & WhatsApp Automations",
                "Advanced Analytics Dashboard",
                "24/7 Hinglish Support",
                "Dedicated Account Manager for Scale Plan"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-slate-600 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Rated 4.9/5 by marketers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 bg-white py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Image src="/assets/generated_images/suprdm_logo.png" alt="Supr DM" width={40} height={40} className="object-contain" />
            <span className="font-display font-bold text-2xl tracking-tight">Supr DM</span>
          </Link>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3 text-foreground">Get started for free</h1>
          <p className="text-muted-foreground">No credit card required. Cancel anytime.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Aditya" className="h-11" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Kumar" className="h-11" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="name@company.com" className="h-11" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="Acme Inc." className="h-11" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} className="h-11 pr-10" placeholder="Must be at least 8 characters" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="terms" required className="mt-1" />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-snug">
              I agree to the <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>.
            </label>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg shadow-primary/25" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <Button variant="outline" type="button" className="w-full h-12 font-medium border-slate-200 hover:bg-slate-50">
            <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

