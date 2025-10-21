"use client";

// import ProtectedRoute from "@/components/ProtectedRoute";

import ProtectedRoute from "@/app/components/protectedRoute";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
