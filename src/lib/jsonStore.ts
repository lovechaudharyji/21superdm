/**
 * JSON data layer for frontend-only development.
 *
 * This module centralises all access to browser storage for "fake backend"
 * data.  Each collection has:
 * - a strongly typed TS model (User, Plan, Feature, etc.)
 * - a STORE_KEYS.* string used as the localStorage key
 * - a getInitial*() helper that seeds data from static mock-data
 *
 * To add a new collection:
 * 1. Add a mock array to `mock-data.ts`
 * 2. Export a type here using `typeof mockX[number]`
 * 3. Add a key to STORE_KEYS
 * 4. Add a `getInitialX()` helper using the mock array
 * 5. Use `loadData` / `saveData` in components with the new key + helper
 */

"use client";

import {
  mockUser,
  mockUsers,
  mockPlans,
  mockFeatures,
  mockAutomations,
  mockPayments,
  mockRoles,
} from "./mock-data";

// ---------- Types ----------

/** Subscription plan definition (Starter / Growth / Scale etc.) */
export type Plan = (typeof mockPlans)[number];

/** Feature flag / capability exposed in the UI and plans */
export type Feature = (typeof mockFeatures)[number];

/** Automation workflow configuration for Instagram DM/comment/story flows */
export type Automation = (typeof mockAutomations)[number];

/** Billing record used purely for local analytics/testing */
export type Payment = (typeof mockPayments)[number];

/** User record representing an account in the system */
export type User = (typeof mockUsers)[number];

/** Role and permission set for RBAC in the admin area */
export type Role = (typeof mockRoles)[number];

export type SocialAccount = {
  id: string;
  handle: string;
  followers: number;
  connected: boolean;
  platform: "instagram";
};

export type DashboardStats = {
  messagesSent: number;
  responseRate: number; // 0-100
  activeContacts: number;
  automationsRun: number;
};

export type AnalyticsPoint = {
  date: string; // ISO date or label like "15"
  messages: number;
  responses: number;
};

export type GeoStat = {
  country: string;
  percentage: number;
};

export type Post = {
  id: string;
  accountId: string;
  content: string;
  scheduledAt: string | null;
  imageUrl?: string | null;
  createdAt: string;
};

export type ActivityHeatmapRow = {
  day: string;
  hours: number[];
};

// Centralised keys for localStorage
export const STORE_KEYS = {
  currentUser: "suprdm_current_user",
  users: "suprdm_users",
  plans: "suprdm_plans",
  features: "suprdm_features",
  roles: "suprdm_roles",
  automations: "suprdm_automations",
  payments: "suprdm_payments",
  socialAccounts: "suprdm_social_accounts",
  dashboardStats: "suprdm_dashboard_stats",
  growthData: "suprdm_growth_data",
  geoData: "suprdm_geo_data",
  posts: "suprdm_posts",
  activityHeatmap: "suprdm_activity_heatmap",
} as const;

// ---------- Core helpers ----------

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadData<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveData<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Swallow errors – storage may be full or disabled
  }
}

/**
 * Get user-specific storage key
 */
export function getUserKey(userId: string, baseKey: string): string {
  return `${baseKey}_${userId}`;
}

/**
 * Load user-specific data
 */
export function loadUserData<T>(userId: string, baseKey: string, fallback: T): T {
  return loadData<T>(getUserKey(userId, baseKey), fallback);
}

/**
 * Save user-specific data
 */
export function saveUserData<T>(userId: string, baseKey: string, value: T): void {
  saveData<T>(getUserKey(userId, baseKey), value);
}

// ---------- Seed / factory helpers ----------

export function getInitialCurrentUser(): User {
  return mockUser;
}

export function getInitialUsers(): UserWithPassword[] {
  // Add default passwords to mock users for testing
  return mockUsers.map((user) => ({
    ...user,
    password: "password123", // Default password for all demo users
  }));
}

export function getInitialRoles(): Role[] {
  return mockRoles;
}

export function getInitialPlans(): Plan[] {
  return mockPlans;
}

export function getInitialFeatures(): Feature[] {
  return mockFeatures;
}

export function getInitialAutomations(): Automation[] {
  return mockAutomations;
}

export function getInitialPayments(): Payment[] {
  return mockPayments;
}

export function getInitialSocialAccounts(): SocialAccount[] {
  return [
    {
      id: "acc-1",
      handle: "@mybusiness",
      followers: 12500,
      connected: true,
      platform: "instagram",
    },
    {
      id: "acc-2",
      handle: "@shopofficial",
      followers: 8200,
      connected: true,
      platform: "instagram",
    },
  ];
}

export function getInitialDashboardStats(): DashboardStats {
  return {
    messagesSent: 2847,
    responseRate: 94.2,
    activeContacts: 1256,
    automationsRun: 458,
  };
}

export function getInitialGrowthData(): AnalyticsPoint[] {
  return [
    { date: "15", messages: 120, responses: 95 },
    { date: "16", messages: 150, responses: 120 },
    { date: "17", messages: 180, responses: 150 },
    { date: "18", messages: 140, responses: 110 },
    { date: "19", messages: 200, responses: 170 },
    { date: "20", messages: 220, responses: 190 },
    { date: "21", messages: 190, responses: 160 },
    { date: "22", messages: 250, responses: 210 },
    { date: "23", messages: 230, responses: 195 },
    { date: "24", messages: 270, responses: 230 },
    { date: "25", messages: 260, responses: 220 },
    { date: "26", messages: 290, responses: 250 },
  ];
}

export function getInitialGeoData(): GeoStat[] {
  return [
    { country: "India", percentage: 65 },
    { country: "UAE", percentage: 15 },
    { country: "USA", percentage: 10 },
    { country: "UK", percentage: 6 },
    { country: "Others", percentage: 4 },
  ];
}

export function getInitialPosts(): Post[] {
  return [];
}

export function getInitialActivityHeatmap(): ActivityHeatmapRow[] {
  return [
    { day: "Mon", hours: [3, 5, 7, 9, 8, 6, 7, 8, 9, 7, 5, 3] },
    { day: "Tue", hours: [2, 4, 6, 8, 9, 7, 8, 9, 8, 6, 4, 2] },
    { day: "Wed", hours: [4, 6, 8, 9, 8, 7, 6, 7, 8, 5, 3, 2] },
    { day: "Thu", hours: [3, 5, 7, 8, 9, 8, 7, 8, 7, 6, 4, 3] },
    { day: "Fri", hours: [2, 4, 5, 7, 8, 9, 8, 7, 6, 5, 4, 3] },
    { day: "Sat", hours: [5, 7, 8, 6, 5, 4, 5, 6, 7, 8, 6, 4] },
    { day: "Sun", hours: [6, 8, 7, 5, 4, 3, 4, 5, 6, 7, 5, 3] },
  ];
}

// ---------- User Management Helpers ----------

/**
 * Extended user type with password for authentication
 */
export type UserWithPassword = User & {
  password?: string; // Stored as plain text for JSON simplicity (not recommended for production)
};

/**
 * Find a user by email address
 */
export function findUserByEmail(email: string): UserWithPassword | null {
  const users = loadData<UserWithPassword[]>(STORE_KEYS.users, getInitialUsers());
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Create a new user and add to storage
 */
export function createUser(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName?: string;
}): User {
  const users = loadData<UserWithPassword[]>(STORE_KEYS.users, getInitialUsers());
  const roles = loadData<Role[]>(STORE_KEYS.roles, getInitialRoles());
  const plans = loadData<Plan[]>(STORE_KEYS.plans, getInitialPlans());

  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    throw new Error("User with this email already exists");
  }

  // Get default role and plan
  const defaultRole = roles.find((r) => r.id === "customer") || roles[0];
  const defaultPlan = plans.find((p) => p.id === "starter") || plans[0];

  const newUser: UserWithPassword = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email: userData.email.toLowerCase(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password, // Store password (plain text for JSON simplicity)
    profileImageUrl: null,
    roleId: defaultRole.id,
    planId: defaultPlan.id,
    status: "active",
    automationsCount: 0,
    messagesThisMonth: 0,
    lastMessageReset: new Date().toISOString(),
    companyName: userData.companyName || "",
    instagramHandle: `@${userData.firstName.toLowerCase()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  saveData(STORE_KEYS.users, updatedUsers);

  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

/**
 * Validate user credentials
 */
export function validateCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (!user || !user.password) {
    return null;
  }

  // Simple password comparison (plain text for JSON simplicity)
  if (user.password !== password) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Set the current logged-in user
 */
export function setCurrentUser(user: User): void {
  saveData(STORE_KEYS.currentUser, user);
}

/**
 * Clear the current user (logout)
 */
export function clearCurrentUser(): void {
  saveData(STORE_KEYS.currentUser, null);
}


