import { AlertTriangle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/usePermissions";

interface LimitReachedBannerProps {
  onUpgrade?: () => void;
  onDismiss?: () => void;
  showDismiss?: boolean;
}

export function LimitReachedBanner({
  onUpgrade,
  onDismiss,
  showDismiss = false,
}: LimitReachedBannerProps) {
  const { getAutomationLimit, user } = usePermissions();
  const { current, max } = getAutomationLimit();

  if (current < max) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
      {showDismiss && onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-amber-200/50 transition-colors"
        >
          <X className="w-4 h-4 text-amber-600" />
        </button>
      )}
      
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-amber-900">
            Automation Limit Reached
          </h3>
          <p className="text-sm text-amber-700 mt-1">
            You've used all {max} automation{max !== 1 ? 's' : ''} on your{' '}
            <span className="font-medium capitalize">{user?.planId || 'Starter'}</span> plan.
            Upgrade to create more automations and unlock advanced features!
          </p>
          
          {onUpgrade && (
            <Button
              size="sm"
              className="mt-3 gap-2 bg-amber-600 hover:bg-amber-700"
              onClick={onUpgrade}
            >
              <Sparkles className="w-4 h-4" />
              Upgrade Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface UsageMeterProps {
  current: number;
  max: number;
  label: string;
  showUpgrade?: boolean;
  onUpgrade?: () => void;
}

export function UsageMeter({
  current,
  max,
  label,
  showUpgrade = true,
  onUpgrade,
}: UsageMeterProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const isNearLimit = percentage >= 80;
  const isAtLimit = current >= max;

  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className={`text-sm font-bold ${
          isAtLimit ? 'text-red-600' : isNearLimit ? 'text-amber-600' : 'text-foreground'
        }`}>
          {current} / {max}
        </span>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isAtLimit 
              ? 'bg-red-500' 
              : isNearLimit 
              ? 'bg-amber-500' 
              : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {isAtLimit && showUpgrade && onUpgrade && (
        <Button
          size="sm"
          variant="link"
          className="mt-2 p-0 h-auto text-primary"
          onClick={onUpgrade}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Upgrade for more
        </Button>
      )}
    </div>
  );
}
