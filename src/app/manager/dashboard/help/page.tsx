"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

const popularArticles = [
  {
    id: "1",
    title: "Getting Started",
    description: "Learn how to set up your account and manage your first property",
  },
  {
    id: "2",
    title: "Managing Properties",
    description: "Complete guide to adding, editing, and managing your properties",
  },
  {
    id: "3",
    title: "Billing & Payments",
    description: "Understanding billing cycles, payments, and financial reports",
  },
];

export default function ManagerHelpPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>
            Help & Support
          </h1>
          <div>
            <input
              type="date"
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 border-blue-300 text-blue-900"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className={`text-lg font-semibold ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>24/7 Support</p>
            </div>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>&lt;2h</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Avg. Response Time</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>95%</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Satisfaction Rate</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-orange-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>2</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Open Tickets</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="How can we help you?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <svg
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-4 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>
            Popular Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularArticles.map((article) => (
              <div
                key={article.id}
                className={`rounded-lg shadow-md p-6 border cursor-pointer transition-colors hover:border-[#FF7700] ${
                  effectiveTheme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : effectiveTheme === "ocean"
                    ? "bg-blue-100 border-blue-200 hover:bg-blue-200"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <h4 className={`font-semibold mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {article.title}
                </h4>
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  {article.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Buttons */}
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={() => router.push("/manager/dashboard/help/contact")}>
            Contact Support
          </Button>
          <Button variant="outline" onClick={() => router.push("/manager/dashboard/help/tickets")}>
            My Tickets
          </Button>
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
