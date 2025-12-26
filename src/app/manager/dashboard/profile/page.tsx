"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Input, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

export default function ManagerProfilePage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
    setFormData((prev) => ({ ...prev, email }));
    
    // Load saved profile
    const savedProfile = localStorage.getItem(`managerProfile_${email}`);
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setFormData((prev) => ({ ...prev, ...profile }));
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;
    
    localStorage.setItem(`managerProfile_${userEmail}`, JSON.stringify(formData));
    alert("Profile updated successfully!");
  };

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
        Profile Settings
      </h1>
      <div className={`rounded-lg shadow-md p-6 ${
        effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
      }`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Company Name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </ManagerDashboardLayout>
  );
}


