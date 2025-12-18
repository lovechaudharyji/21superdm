"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Check, 
  Crown, 
  Zap, 
  Rocket,
  Calendar,
  Clock,
  AlertCircle,
  Loader2,
  ArrowRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { mockPlans } from "@/lib/mock-data";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const planIcons: Record<string, any> = {
  starter: Zap,
  growth: Crown,
  scale: Rocket,
};

const planColors: Record<string, string> = {
  starter: "bg-gray-100 text-gray-700",
  growth: "bg-pink-100 text-pink-700",
  scale: "bg-purple-100 text-purple-700",
};

export default function Billing() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  const { data: plans = mockPlans, isLoading: plansLoading } = useQuery({
    queryKey: ["/api/plans"],
    queryFn: async () => {
      const res = await fetch("/api/plans");
      return res.json();
    },
  });

  const formatPrice = (paise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  };

  const getYearlySavings = (plan: typeof mockPlans[0]) => {
    const monthlyTotal = plan.priceMonthly * 12;
    const savings = monthlyTotal - plan.priceYearly;
    return savings > 0 ? Math.round((savings / monthlyTotal) * 100) : 0;
  };

  const handleUpgrade = async (planId: string) => {
    toast({
      title: "Payment Integration",
      description: "Payment processing will be available in production.",
    });
  };

  if (plansLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        </div>
      </DashboardLayout>
    );
  }

  const sortedPlans = [...plans].sort((a, b) => a.displayOrder - b.displayOrder);
  const currentPlan = plans.find(p => p.id === user?.planId);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-display">Billing & Plans</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription and upgrade your plan
          </p>
        </div>

        {/* Current Plan Summary */}
        <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentPlan && (
                  <div className={`p-2 rounded-lg ${planColors[currentPlan.id] || 'bg-gray-100'}`}>
                    {planIcons[currentPlan.id] ? 
                      (() => { const Icon = planIcons[currentPlan.id]; return <Icon className="h-5 w-5" />; })() :
                      <CreditCard className="h-5 w-5" />
                    }
                  </div>
                )}
                <div>
                  <CardTitle>
                    {currentPlan?.name || 'Starter'} Plan
                  </CardTitle>
                  <CardDescription>
                    {currentPlan?.description}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Check className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-pink-500" />
                <span><strong>{currentPlan?.maxAutomations || 1}</strong> Automations</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-pink-500" />
                <span><strong>{(currentPlan?.maxMessagesPerMonth || 100).toLocaleString()}</strong> Messages/month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center">
          <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as "monthly" | "yearly")}>
            <TabsList className="grid w-[300px] grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
                  Save up to 17%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedPlans.map((plan, index) => {
            const Icon = planIcons[plan.id] || CreditCard;
            const isCurrentPlan = plan.id === user?.planId;
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            const savings = getYearlySavings(plan);
            const isProcessing = processingPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`relative h-full flex flex-col ${
                    plan.isFeatured 
                      ? 'border-2 border-pink-400 shadow-lg shadow-pink-100' 
                      : isCurrentPlan 
                        ? 'border-2 border-green-400' 
                        : ''
                  }`}
                >
                  {plan.isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-pink-500 text-white px-3">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-green-500 text-white px-3">
                        Current Plan
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pt-8">
                    <div className={`mx-auto p-3 rounded-full w-fit ${planColors[plan.id] || 'bg-gray-100'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl mt-4">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">
                          {price === 0 ? 'Free' : formatPrice(price)}
                        </span>
                        {price > 0 && (
                          <span className="text-muted-foreground">
                            /{billingCycle === 'yearly' ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && savings > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          Save {savings}% compared to monthly
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span><strong>{plan.maxAutomations}</strong> Automation{plan.maxAutomations > 1 ? 's' : ''}</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span><strong>{plan.maxMessagesPerMonth.toLocaleString()}</strong> Messages/month</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span><strong>{plan.maxKeywordsPerAutomation}</strong> Keywords/automation</span>
                      </li>
                    </ul>
                  </CardContent>

                  <CardFooter>
                    {isCurrentPlan ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : price === 0 ? (
                      <Button variant="outline" className="w-full" disabled>
                        Free Forever
                      </Button>
                    ) : (
                      <Button 
                        className={`w-full ${plan.isFeatured ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Upgrade Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Payment Security Note */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span>Secure payments powered by Razorpay. Your payment information is encrypted and secure.</span>
        </div>
      </div>
    </DashboardLayout>
  );
}

