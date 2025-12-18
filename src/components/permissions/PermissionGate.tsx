import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";

interface PermissionGateProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { hasPermission } = usePermissions();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

interface AdminGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminGate({ children, fallback = null }: AdminGateProps) {
  const { isAdmin } = usePermissions();

  if (isAdmin()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

interface PlanGateProps {
  requiredPlan: 'starter' | 'growth' | 'scale';
  children: ReactNode;
  fallback?: ReactNode;
}

const PLAN_LEVELS: Record<string, number> = {
  starter: 1,
  growth: 2,
  scale: 3,
};

export function PlanGate({ requiredPlan, children, fallback = null }: PlanGateProps) {
  const { getPlanId } = usePermissions();
  const currentPlan = getPlanId();

  const currentLevel = PLAN_LEVELS[currentPlan] || 1;
  const requiredLevel = PLAN_LEVELS[requiredPlan] || 1;

  if (currentLevel >= requiredLevel) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
