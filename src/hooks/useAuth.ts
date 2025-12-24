"use client";

import { useEffect, useState } from "react";
import {
  STORE_KEYS,
  User,
  getInitialCurrentUser,
  loadData,
  clearCurrentUser,
} from "@/lib/jsonStore";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = () => {
    const current = loadData<User | null>(
      STORE_KEYS.currentUser,
      getInitialCurrentUser()
    );
    setUser(current);
    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORE_KEYS.currentUser) {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    clearCurrentUser();
    setUser(null);
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event("storage"));
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };
}

