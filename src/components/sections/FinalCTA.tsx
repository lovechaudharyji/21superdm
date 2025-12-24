"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section
      className="py-24 text-white text-center"
      style={{ backgroundColor: "#FF4D7A" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Ready to grow your business?
        </h2>

        <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
          Join thousands of Indian entrepreneurs using Supr DM to automate sales and support.
        </p>

        <Button
          onClick={() => router.push("/signup")}
          className="bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-white/90 transition-colors shadow-lg"
        >
          Get Started for Free
        </Button>
      </div>
    </section>
  );
}
