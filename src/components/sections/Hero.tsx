// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { ShimmerButton } from "@/components/ui/shimmer-button";
// import { SparklesText } from "@/components/ui/sparkles-text";
// import { motion } from "framer-motion";
// import { CheckCircle2 } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-white">
//       <div className="container mx-auto px-4">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="space-y-8"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground text-sm font-semibold border border-accent/20">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
//               </span>
//               #1 Chat Automation Tool for India 🇮🇳
//             </div>
            
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-foreground">
//               Automate your <br />
//               <SparklesText 
//                 className="text-primary"
//                 sparklesCount={8}
//               >
//                 Vyapar & Dukan
//               </SparklesText>
//               <br /> on WhatsApp.
//             </h1>
            
//             <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
//               Sell more, engage customers 24/7, and grow your audience with powerful automations for Instagram, WhatsApp, and Messenger. Built for Indian businesses.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <ShimmerButton 
//                 className="h-14 px-8 text-lg font-semibold shadow-lg"
//                 shimmerColor="#FF4D7A"
//                 background="linear-gradient(135deg, #FF4D7A 0%, #ff8fab 100%)"
//                 onClick={() => window.location.href = "/api/login"}
//               >
//                 Start for Free
//               </ShimmerButton>
//               <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-2">
//                 View Demo
//               </Button>
//             </div>

//             <div className="flex flex-col gap-3 text-sm text-muted-foreground">
//               <div className="flex items-center gap-6">
//                 <span className="flex items-center gap-1.5">
//                   <CheckCircle2 className="h-4 w-4 text-green-500" /> No credit card required
//                 </span>
//                 <span className="flex items-center gap-1.5">
//                   <CheckCircle2 className="h-4 w-4 text-green-500" /> ₹0/mo Plan Available
//                 </span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-white">
//               <img 
//                 src="/assets/generated_images/indian_entrepreneur_hero_image.png" 
//                 alt="Indian Entrepreneur Success" 
//                 className="w-full h-auto object-cover"
//               />
              
//               {/* Floating Cards */}
//               <motion.div 
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//                 className="absolute bottom-8 left-8 bg-white/95 backdrop-blur shadow-xl p-4 rounded-2xl border border-border max-w-xs"
//               >
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🛍️</div>
//                   <div>
//                     <p className="font-bold text-sm">New Order Received</p>
//                     <p className="text-xs text-muted-foreground">via WhatsApp Shop</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-muted-foreground">Amount</span>
//                   <span className="font-bold text-green-600">+ ₹2,499.00</span>
//                 </div>
//               </motion.div>

//               <motion.div 
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="absolute top-12 right-8 bg-white/95 backdrop-blur shadow-xl p-3 rounded-2xl border border-border"
//               >
//                  <div className="flex items-center gap-2">
//                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
//                    <span className="text-sm font-semibold">24/7 Active Bot</span>
//                  </div>
//               </motion.div>
//             </div>
            
//             {/* Background Decor */}
//             <div className="absolute -z-10 top-0 right-0 w-full h-full bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl transform translate-x-12 -translate-y-12 opacity-60" />
//             <div className="absolute -z-10 bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-bl from-secondary/20 to-primary/10 rounded-full blur-3xl transform -translate-x-12 translate-y-12 opacity-60" />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";


import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden
        pt-32 pb-16 md:pt-25 md:pb-15
        bg-cover bg-center bg-no-repeat
      "
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,182,193,0.25)), url('/assets/hero.png')",
      }}
    >
      {/* Background Blobs / Design */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/70 via-pink-100/50 to-white/60" />
        <div className="absolute top-[-15%] right-[-10%] w-[520px] h-[520px] bg-pink-300/30 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[480px] h-[480px] bg-pink-400/20 blur-[160px] rounded-full" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/50 text-pink-600 text-sm font-semibold border border-pink-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              #1 Chat Automation Tool for India 🇮🇳
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-gray-900">
              Automate your <br />
              <SparklesText className="text-primary" sparklesCount={8}>
                Vyapar & Dukan
              </SparklesText>
              <br /> on WhatsApp.
            </h1>

            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              Sell more, engage customers 24/7, and grow your audience with powerful automations for Instagram, WhatsApp, and Messenger. Built for Indian businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <ShimmerButton
                className="h-14 px-8 text-lg font-semibold shadow-lg"
                shimmerColor="#FF4D7A"
                background="linear-gradient(135deg, #FF4D7A 0%, #ff8fab 100%)"
                onClick={() => window.location.href = '/api/login'}
              >
                Start for Free
              </ShimmerButton>

              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-2">
                View Demo
              </Button>
            </div>

            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> ₹0/mo Plan Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE IMAGE with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-white/90 backdrop-blur-xl">
              <img
                src="/assets/generated_images/indian_entrepreneur_hero_image.png"
                alt="Indian Entrepreneur Success"
                className="w-full h-auto object-cover"
              />

              {/* Floating Notification Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 bg-white/95 backdrop-blur shadow-xl p-4 rounded-2xl border border-gray-200 max-w-xs"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🛍️</div>
                  <div>
                    <p className="font-bold text-sm">New Order Received</p>
                    <p className="text-xs text-gray-500">via WhatsApp Shop</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold text-green-600">+ ₹2,499.00</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
