"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Indian Pricing 🇮🇳</h2>
          <p className="text-xl text-muted-foreground">
            Pay in Rupees. No international transaction fees. No hidden charges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-8 pb-4">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Perfect for new businesses just starting out.</p>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>1,000 Contacts</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Instagram Automation</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Basic Facebook Messenger</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-slate-300" />
                  <span>WhatsApp API (Add-on)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button variant="outline" className="w-full rounded-full h-12">Start for Free</Button>
            </CardFooter>
          </Card>

          {/* Pro Plan - Featured */}
          <MagicCard 
            className="border-2 border-primary shadow-xl relative scale-105 bg-white rounded-xl overflow-hidden"
            gradientColor="#ff5e86"
            gradientFrom="#ff5e86"
            gradientTo="#ff8fab"
            gradientOpacity={0.15}
          >
            <BorderBeam size={250} duration={12} delay={0} colorFrom="#ff5e86" colorTo="#ff8fab" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm z-10">
              Most Popular
            </div>
            <div className="p-8 pb-4">
              <h3 className="text-lg font-medium text-primary mb-2">Growth</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">₹999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">For growing businesses scaling their sales.</p>
            </div>
            <div className="p-8 pt-4 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Unlimited Contacts</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>WhatsApp Business API Access</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Remove Supr DM Branding</span>
                </li>
              </ul>
            </div>
            <div className="p-8 pt-0">
              <ShimmerButton 
                className="w-full h-12 text-lg font-semibold"
                shimmerColor="#ffffff"
                background="linear-gradient(135deg, #ff5e86 0%, #ff8fab 100%)"
              >
                Get Started
              </ShimmerButton>
            </div>
          </MagicCard>

          {/* Business Plan */}
          <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-8 pb-4">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">Scale</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">₹2,499</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">For agencies and large teams.</p>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Everything in Growth</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>5 Team Member Seats</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Priority Support (Hindi/English)</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Dedicated Account Manager</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button variant="outline" className="w-full rounded-full h-12">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
