"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

export default function ManagerInquiriesPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
  }, [router]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      <h1 className={`text-2xl font-bold mb-6 ${
        effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
      }`}>
        Inquiries
      </h1>
      <div className={`rounded-lg shadow-md p-12 text-center ${
        effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
      }`}>
        <p className={`text-lg ${
          effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-500"
        }`}>
          No inquiries found
        </p>
      </div>
    </ManagerDashboardLayout>
  );
}


