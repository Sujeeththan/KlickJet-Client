"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    // If specific roles are required, check if user has the right role
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect to their appropriate dashboard
      const redirectPath = getRoleRedirectPath(user.role);
      router.replace(redirectPath);
      return;
    }

    // Check for pending approval status
    if (user && (user.role === "seller" || user.role === "deliverer")) {
      if (user.status === "pending") {
        router.replace("/auth/pending-approval");
        return;
      }
      if (user.status === "rejected") {
        router.replace("/auth/rejected");
        return;
      }
    }
  }, [loading, isAuthenticated, user, allowedRoles, requireAuth, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and auth is required, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If user doesn't have the right role, don't render children
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

function getRoleRedirectPath(role: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "customer":
      return "/customer";
    case "seller":
      return "/seller";
    case "deliverer":
      return "/deliverer";
    default:
      return "/";
  }
}
