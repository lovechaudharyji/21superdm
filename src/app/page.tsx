// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import Hero from "@/components/sections/Hero";
// import Features from "@/components/sections/Features";
// import Stages from "@/components/sections/Stages";
// import Pricing from "@/components/sections/Pricing";
// import Faq from "@/components/sections/Faq"
// import Footer from "@/components/sections/Footer";
// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
// import { Star, Inbox, MousePointerClick, MessageSquare, BadgeCheck, Copy, Users, Wallet, Clock, Download, Search, CheckCircle2 } from "lucide-react";
// import StatisticsSection from "@/components/sections/StatisticsSection";
// import LinkDMSection from "@/components/sections/LinkDMvSection";
// import Niches from "@/components/sections/Niches";
// import Badges from "@/components/sections/Badges";
// import Feature from "@/components/sections/Feature";
// import SocialProof from "@/components/sections/SocialProof";
// import SuperdmReferral from "@/components/sections/SuperdmReferral";
// import SuperdmPartner from "@/components/sections/SuperdmPartner";
// import FinalCTA from "@/components/sections/FinalCTA";
// import Brand from "@/components/sections/Brand";

// export default function Home() {
//   const router = useRouter();
//   const { isAuthenticated, isLoading } = useAuth();

//   useEffect(() => {
//     if (!isLoading && isAuthenticated) {
//       router.push("/dashboard");
//     }
//   }, [isAuthenticated, isLoading, router]);

//   return (
//     <div className="min-h-screen bg-background font-sans text-foreground">
//       <Navbar />
//       <main>
//         <Hero />
//         <StatisticsSection />
//         <LinkDMSection />
//         <Brand/>
//         <Niches />
//         <Features />
//         <Badges />
//         <Feature />
//         <SocialProof />
//         <SuperdmReferral />
//         <SuperdmPartner />
//         <Stages />
//         <Pricing />
//         <Faq />
//         <FinalCTA/>
//       </main>
//       <Footer />
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Stages from "@/components/sections/Stages";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import StatisticsSection from "@/components/sections/StatisticsSection";
import LinkDMSection from "@/components/sections/LinkDMvSection";
import Brand from "@/components/sections/Brand";
import Niches from "@/components/sections/Niches";
import Badges from "@/components/sections/Badges";
import Feature from "@/components/sections/Feature";
import SocialProof from "@/components/sections/SocialProof";
import SuperdmReferral from "@/components/sections/SuperdmReferral";
import SuperdmPartner from "@/components/sections/SuperdmPartner";
import FinalCTA from "@/components/sections/FinalCTA";

import { useAuth } from "@/hooks/useAuth";

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
       

        {/* 🔥 GRADIENT STARTS HERE */}
        <section className="bg-gradient-to-b from-white via-pink-100 to-white
">
   <StatisticsSection />
          <LinkDMSection />
         
          <Brand />
          <Niches />
        </section>
        {/* 🔥 GRADIENT ENDS HERE */}

        <Features />
        <Badges />
        <Feature />
        <SocialProof />
        <SuperdmReferral />
        <SuperdmPartner />
        <Stages />
        <Pricing />
        <Faq />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
