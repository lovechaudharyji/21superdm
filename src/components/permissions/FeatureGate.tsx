import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FeatureGateProps {
  featureId: string;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgrade?: boolean;
  comingSoonLabel?: string;
}

export function FeatureGate({
  featureId,
  children,
  fallback,
  showUpgrade = true,
  comingSoonLabel = "Coming Soon",
}: FeatureGateProps) {
  const { hasFeature } = usePermissions();

  if (hasFeature(featureId)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showUpgrade) {
    return <UpgradePrompt featureId={featureId} comingSoonLabel={comingSoonLabel} />;
  }

  return null;
}

interface UpgradePromptProps {
  featureId: string;
  comingSoonLabel?: string;
}

function UpgradePrompt({ featureId, comingSoonLabel }: UpgradePromptProps) {
  return (
    <div className="relative p-4 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20">
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
        <div className="text-center p-4">
          <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {comingSoonLabel}
          </p>
          <Button size="sm" variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Upgrade to Unlock
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ComingSoonBadgeProps {
  label?: string;
  className?: string;
}

export function ComingSoonBadge({ label = "Coming Soon", className = "" }: ComingSoonBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 ${className}`}>
      <Sparkles className="w-3 h-3" />
      {label}
    </span>
  );
}

interface LockedFeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  isComingSoon?: boolean;
  onUpgrade?: () => void;
}

export function LockedFeatureCard({
  title,
  description,
  icon,
  isComingSoon = false,
  onUpgrade,
}: LockedFeatureCardProps) {
  return (
    <div className="relative p-6 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/10 opacity-75 hover:opacity-100 transition-opacity">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="p-2 rounded-lg bg-muted">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground/70">{title}</h3>
            {isComingSoon ? (
              <ComingSoonBadge />
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                <Lock className="w-3 h-3" />
                Pro
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {!isComingSoon && onUpgrade && (
        <Button 
          size="sm" 
          variant="outline" 
          className="mt-4 w-full gap-2"
          onClick={onUpgrade}
        >
          <Sparkles className="w-4 h-4" />
          Upgrade to Unlock
        </Button>
      )}
    </div>
  );
}
