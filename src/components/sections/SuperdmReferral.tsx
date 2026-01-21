"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, MousePointerClick, Users, Wallet, Clock } from "lucide-react";

export default function SuperdmReferral() {
  const router = useRouter();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Top Section */}
          <div className="text-center mb-12">
            <p className="text-sm md:text-base font-bold text-primary uppercase tracking-wider mb-2">
              EARN WITH Supr DM
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Supr DM Referral Program
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Refer your friends to Supr DM and earn 30% of the total revenue they spend on a paid subscription during their first year. It's our way of rewarding our most engaged users for helping to grow the community and share the value of our platform.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left Column */}
            <div className="bg-gray-50 rounded-2xl shadow-sm p-6 md:p-8">

              {/* Referral Link */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Referral Link
                </h3>

                <div
                  className="flex items-center gap-2 rounded-lg p-3 border"
                  style={{
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                    borderColor: "hsl(var(--primary) / 0.3)",
                  }}
                >
                  <input
                    type="text"
                    value="https://suprdm.com?via=@username"
                    readOnly
                    className="flex-1 bg-transparent text-sm font-mono outline-none"
                    style={{ color: "hsl(var(--primary))" }}
                  />

                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        "https://linkdm.com?via=@username"
                      )
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Quick Stats
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="p-2 rounded-lg bg-primary/10 inline-flex mb-2">
                      <MousePointerClick className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Clicks</p>
                    <p className="text-2xl font-bold text-gray-800">2,415</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="p-2 rounded-lg bg-primary/10 inline-flex mb-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      Converted Users
                    </p>
                    <p className="text-2xl font-bold text-gray-800">87</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="p-2 rounded-lg bg-primary/10 inline-flex mb-2">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      Commission (Total)
                    </p>
                    <p className="text-2xl font-bold text-gray-800">$1,345</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="p-2 rounded-lg bg-primary/10 inline-flex mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      Commission (Pending)
                    </p>
                    <p className="text-2xl font-bold text-gray-800">$522</p>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-between">

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  How It Works
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-gray-700">
                      Share your unique referral link
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-gray-700">
                      Earn 30% commission on every referral's subscription
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-gray-700">Get paid monthly</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Exclusive Access
                </h3>
                <p className="text-gray-700">
                  This program is available to Supr DM Pro users
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3"
                  onClick={() => router.push("/learn-more")}
                >
                  Learn more
                </Button>

                <Button
                  variant="outline"
                  className="border-gray-300 text-primary hover:bg-gray-50 px-6 py-3"
                  onClick={() => router.push("/faqs")}
                >
                  View FAQs
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
