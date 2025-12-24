"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function SuperdmPartner() {
  const router = useRouter();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">

          {/* Top Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              LinkDM Partner Program
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Let your users access LinkDM Pro at no cost to them. Our partner program is designed for brands and affiliate platforms looking to boost user success with automated Instagram DMs—without any tech headaches.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left Column - Image */}
            <div className="relative">
              <img
                src="/assets/Sanjay.png"
                alt="LinkDM Partner Program Analytics"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Right Column - Benefits */}
            <div className="flex flex-col justify-center">

              {/* Partner Benefits */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Partner Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Complimentary Pro access for your users
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      No API or tech setup required
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Fast onboarding and rollout
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Custom DM branding (e.g. Powered by Your Brand)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Scales with your user base
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Flexible partner pricing
                    </span>
                  </li>
                </ul>
              </div>

              {/* Exclusive Benefits */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Exclusive Benefits
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  This program is built for brands that want to drive affiliate growth through DMs. No API needed. Custom branding options like "Powered by [Your Brand]" are available to make it your own.
                </p>
              </div>

              {/* CTA */}
              <div className="flex justify-end">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
                  onClick={() => router.push("/partner-program")}
                >
                  Learn more
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
