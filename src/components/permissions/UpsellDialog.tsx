import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import type { Plan } from "@shared/schema";

interface UpsellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  feature?: string;
  limitReached?: boolean;
}

export function UpsellDialog({
  open,
  onOpenChange,
  title = "Upgrade Your Plan",
  description = "Unlock more features and grow your business",
  feature,
  limitReached = false,
}: UpsellDialogProps) {
  const { getPlanId } = usePermissions();
  const currentPlan = getPlanId();

  const { data: plans = [] } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
  });

  const formatPrice = (paise: number) => {
    if (paise === 0) return "Free";
    return `₹${(paise / 100).toLocaleString('en-IN')}`;
  };

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'growth':
        return <Zap className="w-5 h-5" />;
      case 'scale':
        return <Crown className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {limitReached 
              ? "You've reached the limit on your current plan. Upgrade to continue growing!"
              : description
            }
            {feature && (
              <span className="block mt-2 font-medium text-foreground">
                Feature: <span className="text-primary">{feature}</span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {plans.filter(p => p.isActive).map((plan) => {
            const isCurrent = plan.id === currentPlan;
            const isUpgrade = ['growth', 'scale'].includes(plan.id) && plan.id !== currentPlan;

            return (
              <div
                key={plan.id}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  plan.isFeatured
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : isCurrent
                    ? 'border-green-500 bg-green-50'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {plan.isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-bold bg-primary text-white rounded-full">
                    POPULAR
                  </span>
                )}
                {isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-bold bg-green-500 text-white rounded-full">
                    CURRENT
                  </span>
                )}

                <div className="text-center mb-4">
                  <div className={`inline-flex p-2 rounded-full mb-2 ${
                    plan.isFeatured ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {getIcon(plan.id)}
                  </div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">
                      {formatPrice(plan.priceMonthly)}
                    </span>
                    {plan.priceMonthly > 0 && (
                      <span className="text-muted-foreground">/mo</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{plan.maxAutomations} Automation{plan.maxAutomations !== 1 ? 's' : ''}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{plan.maxMessagesPerMonth.toLocaleString()} messages/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{plan.maxKeywordsPerAutomation} keywords/automation</span>
                  </li>
                </ul>

                <Button
                  className="w-full"
                  variant={plan.isFeatured ? "default" : "outline"}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Current Plan' : isUpgrade ? 'Upgrade' : 'Select'}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          All prices in INR. Cancel anytime. No hidden fees.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export function useUpsellDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<Partial<UpsellDialogProps>>({});

  const openUpsell = (props?: Partial<UpsellDialogProps>) => {
    setDialogProps(props || {});
    setIsOpen(true);
  };

  const closeUpsell = () => {
    setIsOpen(false);
  };

  const UpsellDialogComponent = () => (
    <UpsellDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      {...dialogProps}
    />
  );

  return {
    openUpsell,
    closeUpsell,
    UpsellDialogComponent,
    isOpen,
  };
}
