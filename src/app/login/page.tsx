// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { validateCredentials, setCurrentUser } from "@/lib/jsonStore";
// import { useToast } from "@/hooks/use-toast";

// export default function Login() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.email.trim() || !formData.password.trim()) {
//       toast({
//         title: "Validation Error",
//         description: "Please enter both email and password",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Validate credentials
//       const user = validateCredentials(formData.email, formData.password);

//       if (!user) {
//         setIsLoading(false);
//         toast({
//           title: "Login Failed",
//           description: "Invalid email or password. Please try again.",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Set as current user
//       setCurrentUser(user);

//       toast({
//         title: "Welcome back!",
//         description: `Logged in as ${user.firstName} ${user.lastName}`,
//       });

//       // Redirect to dashboard
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 500);
//     } catch (error: any) {
//       setIsLoading(false);
//       toast({
//         title: "Login Failed",
//         description: error.message || "An error occurred. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 bg-white">
//         <div className="mb-10">
//           <Link href="/" className="flex items-center gap-2 mb-8">
//             <Image src="/assets/generated_images/suprdm_logo.png" alt="Supr DM" width={40} height={40} className="object-contain" />
//             <span className="font-display font-bold text-2xl tracking-tight">Supr DM</span>
//           </Link>
//           <h1 className="font-display font-bold text-3xl md:text-4xl mb-3 text-foreground">Welcome back</h1>
//           <p className="text-muted-foreground">Enter your details to access your automation dashboard.</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email Address</Label>
//             <Input 
//               id="email" 
//               type="email" 
//               placeholder="name@company.com" 
//               className="h-12 rounded-lg" 
//               required 
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="password">Password</Label>
//               <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
//             </div>
//             <div className="relative">
//               <Input 
//                 id="password" 
//                 type={showPassword ? "text" : "password"} 
//                 className="h-12 rounded-lg pr-10" 
//                 required 
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               />
//               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <Checkbox id="remember" />
//             <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//               Remember me for 30 days
//             </label>
//           </div>

//           <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg shadow-primary/25" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </Button>

//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t border-slate-200" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
//             </div>
//           </div>

//           <Button variant="outline" type="button" className="w-full h-12 font-medium border-slate-200 hover:bg-slate-50">
//             <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
//               <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
//             </svg>
//             Sign in with Google
//           </Button>

//           <p className="text-center text-sm text-muted-foreground">
//             Don't have an account?{" "}
//             <Link href="/signup" className="font-bold text-primary hover:underline">Create an account</Link>
//           </p>
//         </form>
//       </div>

//       <div className="hidden lg:block relative bg-slate-900 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-slate-900/90 z-10" />
//         <Image src="/assets/generated_images/indian_entrepreneur_hero_image.png" alt="Login Background" fill className="object-cover opacity-60 mix-blend-overlay" />
//         <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white">
//           <div className="flex items-center gap-2 opacity-50">
//             <div className="h-1 w-1 rounded-full bg-white" />
//             <span className="text-xs font-medium uppercase tracking-widest">Enterprise Grade Security</span>
//           </div>
//           <div className="space-y-6">
//             <h2 className="font-display font-bold text-5xl leading-tight">
//               "Supr DM helped us scale to ₹1 Cr revenue in just 6 months."
//             </h2>
//             <div className="flex items-center gap-4">
//               <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center font-bold text-xl">R</div>
//               <div>
//                 <p className="font-bold text-lg">Rohan Mehta</p>
//                 <p className="text-white/60">Founder, The Bombay Shirt Co.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { validateCredentials, setCurrentUser } from "@/lib/jsonStore";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const user = validateCredentials(formData.email, formData.password);

      if (!user) {
        setIsLoading(false);
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setCurrentUser(user);

      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.firstName} ${user.lastName}`,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SECTION FORM */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 bg-white">
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Image 
              src="/assets/generated_images/suprdm_logo.png" 
              alt="Supr DM" 
              width={40} 
              height={40} 
              className="object-contain" 
            />
            <span className="font-display font-bold text-2xl tracking-tight">Supr DM</span>
          </Link>

          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3 text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Enter your details to access your automation dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="h-12 rounded-lg"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="h-12 rounded-lg pr-10"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm font-medium">
              Remember me for 30 days
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg shadow-primary/25"
            disabled={isLoading}
          >
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full h-12 font-medium border-slate-200 hover:bg-slate-50">
            <svg className="mr-2 h-5 w-5" aria-hidden="true" viewBox="0 0 488 512">
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504..."
              ></path>
            </svg>
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>


      {/* RIGHT SECTION IMAGE */}
      <div className="hidden lg:block relative bg-black overflow-hidden">
        {/* Softer gradient overlay for clarity */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-slate-900/75 to-black/90 z-10" />

        <Image
          src="/assets/generated_images/indian_entrepreneur_hero_image.png"
          alt="Login Background"
          fill
          className="object-cover opacity-80"
        />

        <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white">
          <div className="flex items-center gap-2 opacity-60">
            <div className="h-1 w-1 rounded-full bg-white" />
            <span className="text-xs font-medium uppercase tracking-widest">
              Enterprise Grade Security
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="font-display font-bold text-5xl leading-tight">
              "Supr DM helped us scale to ₹1 Cr revenue in just 6 months."
            </h2>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center font-bold text-xl">
                R
              </div>
              <div>
                <p className="font-bold text-lg">Rohan Mehta</p>
                <p className="text-white/60">Founder, The Bombay Shirt Co.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

