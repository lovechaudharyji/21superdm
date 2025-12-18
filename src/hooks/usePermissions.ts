"use client";

import { useAuth } from "./useAuth";

export const PERMISSIONS = {
  AUTOMATION_VIEW: 'automation:view',
  AUTOMATION_CREATE: 'automation:create',
  AUTOMATION_EDIT: 'automation:edit',
  AUTOMATION_DELETE: 'automation:delete',
  AUTOMATION_TOGGLE: 'automation:toggle',
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_EDIT: 'settings:edit',
  TEAM_VIEW: 'team:view',
  TEAM_INVITE: 'team:invite',
  TEAM_REMOVE: 'team:remove',
  TEAM_EDIT_ROLES: 'team:edit_roles',
  BILLING_VIEW: 'billing:view',
  BILLING_MANAGE: 'billing:manage',
  ADMIN_ACCESS: 'admin:access',
  ADMIN_USERS: 'admin:users',
  ADMIN_PLANS: 'admin:plans',
  ADMIN_FEATURES: 'admin:features',
  ADMIN_ANALYTICS: 'admin:analytics',
} as const;

export const FEATURE_IDS = {
  INSTAGRAM_DM: 'instagram_dm',
  WHATSAPP: 'whatsapp',
  MESSENGER: 'messenger',
  COMMENT_AUTOMATION: 'comment_automation',
  STORY_AUTOMATION: 'story_automation',
  DM_AUTOMATION: 'dm_automation',
  ANALYTICS_BASIC: 'analytics_basic',
  ANALYTICS_ADVANCED: 'analytics_advanced',
  CARD_MESSAGES: 'card_messages',
  MULTI_KEYWORD: 'multi_keyword',
  SCHEDULED_MESSAGES: 'scheduled_messages',
  AI_RESPONSES: 'ai_responses',
  TEAM_MEMBERS: 'team_members',
  API_ACCESS: 'api_access',
  PRIORITY_SUPPORT: 'priority_support',
} as const;

export function usePermissions() {
  const { user, isLoading } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user?.role?.permissions) return false;
    return user.role.permissions.includes(permission);
  };

  const hasFeature = (featureId: string): boolean => {
    if (!user?.planFeatures) return false;
    return user.planFeatures.includes(featureId);
  };

  const isFeatureComingSoon = (featureId: string): boolean => {
    return !hasFeature(featureId);
  };

  const canCreateAutomation = (): boolean => {
    if (!user?.plan) return false;
    return (user.automationsCount ?? 0) < (user.plan.maxAutomations ?? 1);
  };

  const getAutomationLimit = (): { current: number; max: number } => {
    return {
      current: user?.automationsCount ?? 0,
      max: user?.plan?.maxAutomations ?? 1,
    };
  };

  const isAdmin = (): boolean => {
    return hasPermission(PERMISSIONS.ADMIN_ACCESS);
  };

  const canManageUsers = (): boolean => {
    return hasPermission(PERMISSIONS.ADMIN_USERS);
  };

  const canManagePlans = (): boolean => {
    return hasPermission(PERMISSIONS.ADMIN_PLANS);
  };

  const canManageFeatures = (): boolean => {
    return hasPermission(PERMISSIONS.ADMIN_FEATURES);
  };

  const getPlanId = (): string => {
    return user?.planId ?? 'starter';
  };

  const getRoleId = (): string => {
    return user?.roleId ?? 'customer';
  };

  return {
    user,
    isLoading,
    hasPermission,
    hasFeature,
    isFeatureComingSoon,
    canCreateAutomation,
    getAutomationLimit,
    isAdmin,
    canManageUsers,
    canManagePlans,
    canManageFeatures,
    getPlanId,
    getRoleId,
    PERMISSIONS,
    FEATURE_IDS,
  };
}

