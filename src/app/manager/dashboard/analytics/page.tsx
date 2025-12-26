"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { GanttChart } from "@/components/GanttChart";
import { PieChart } from "@/components/PieChart";
import { useTheme } from "@/contexts/ThemeContext";

const propertyPerformance = [
  {
    property: "Downtown Apartment",
    views: 245,
    inquiries: 34,
    applications: 12,
    conversionRate: 4.8,
  },
  {
    property: "Luxury family Home",
    views: 189,
    inquiries: 28,
    applications: 8,
    conversionRate: 4.3,
  },
  {
    property: "Studio loft",
    views: 156,
    inquiries: 19,
    applications: 6,
    conversionRate: 2.8,
  },
  {
    property: "Suburban Townhouse",
    views: 134,
    inquiries: 15,
    applications: 4,
    conversionRate: 3.6,
  },
];

// Gantt chart data
const ganttTasks = [
  {
    id: "1",
    name: "Property Listing",
    startDate: "2025-01-01",
    endDate: "2025-01-15",
    progress: 100,
    status: "completed" as const,
  },
  {
    id: "2",
    name: "Marketing Campaign",
    startDate: "2025-01-10",
    endDate: "2025-01-25",
    progress: 75,
    status: "in-progress" as const,
  },
  {
    id: "3",
    name: "Property Viewings",
    startDate: "2025-01-20",
    endDate: "2025-02-05",
    progress: 45,
    status: "in-progress" as const,
  },
  {
    id: "4",
    name: "Application Review",
    startDate: "2025-02-01",
    endDate: "2025-02-15",
    progress: 0,
    status: "pending" as const,
  },
  {
    id: "5",
    name: "Lease Signing",
    startDate: "2025-02-10",
    endDate: "2025-02-20",
    progress: 0,
    status: "pending" as const,
  },
];

// Pie chart data for property status distribution
const propertyStatusData = [
  { name: "Occupied", value: 18, color: "#10B981" },
  { name: "Vacant", value: 6, color: "#EF4444" },
  { name: "Under Maintenance", value: 3, color: "#F59E0B" },
  { name: "Pending", value: 2, color: "#6B7280" },
];

// Pie chart data for lead sources
const leadSourceData = [
  { name: "Website", value: 45, color: "#3B82F6" },
  { name: "Referrals", value: 30, color: "#8B5CF6" },
  { name: "Social Media", value: 15, color: "#EC4899" },
  { name: "Direct Contact", value: 10, color: "#F59E0B" },
];

// Pie chart data for revenue by property type
const revenueByTypeData = [
  { name: "Apartments", value: 40, color: "#FF7700" },
  { name: "Houses", value: 35, color: "#10B981" },
  { name: "Condos", value: 20, color: "#3B82F6" },
  { name: "Townhouses", value: 5, color: "#8B5CF6" },
];

export default function ManagerAnalyticsPage() {
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
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-2xl font-bold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Analytics
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Track your business performance and insight
            </p>
          </div>
          <div className="flex gap-3">
            <select className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
              effectiveTheme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : effectiveTheme === "ocean"
                ? "bg-blue-50 border-blue-300 text-blue-900"
                : "bg-white border-gray-300 text-gray-900"
            }`}>
              <option>Last 30 days</option>
            </select>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>12.5%</span>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>$45,600</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Total revenue</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>75%</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Occupancy Rate</p>
            <p className={`text-xs mt-1 ${
              effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
            }`}>12 active properties</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-purple-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>3.3%</span>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>14.7%</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Lead conversion</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-yellow-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>98.2%</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Approval Rate</p>
            <p className={`text-xs mt-1 ${
              effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
            }`}>3459 application</p>
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div className={`rounded-lg shadow-md p-6 mb-6 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>
            Monthly Revenue Trend
          </h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[
              { month: "Jan", value: 45000, height: 100 },
              { month: "Feb", value: 32000, height: 71 },
              { month: "Mar", value: 45000, height: 100 },
              { month: "Apr", value: 45000, height: 100 },
              { month: "May", value: 45000, height: 100 },
              { month: "Jun", value: 45000, height: 100 },
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-[#FF7700] rounded-t mb-2" style={{ height: `${item.height}%` }}></div>
                <span className={`text-xs ${
                  effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                }`}>
                  {item.month}
                </span>
                <span className={`text-xs font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  ${(item.value / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Performance */}
        <div className={`rounded-lg shadow-md overflow-hidden mb-6 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className={`font-semibold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Property Performance
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${
                effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-200" : "bg-gray-50"
              }`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Property</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Views</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Inquiries</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Application</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Conversation Rate</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                effectiveTheme === "dark" ? "divide-gray-700" : effectiveTheme === "ocean" ? "divide-blue-200" : "divide-gray-200"
              }`}>
                {propertyPerformance.map((property, index) => (
                  <tr key={index} className={`hover:${
                    effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
                  }`}>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>{property.property}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{property.views} view</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{property.inquiries}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{property.applications}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-[#FF7700] h-2 rounded-full"
                            style={{ width: `${property.conversionRate * 10}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm ${
                          effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                        }`}>{property.conversionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Analytic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Lead Analytic
            </h3>
            <div className="space-y-4">
              <div>
                <p className={`text-2xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>196</p>
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>Total Leads</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>33</p>
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>Converted</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>14.7%</p>
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>Conversation Rate</p>
              </div>
            </div>
          </div>
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Property Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className={`text-2xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>24</p>
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>Total Properties</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>18</p>
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>Occupied</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>6</p>
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>Vacant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gantt Chart */}
        <div className="mb-6">
          <GanttChart
            tasks={ganttTasks}
            startDate={new Date("2025-01-01")}
            endDate={new Date("2025-02-28")}
          />
        </div>

        {/* Pie Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <PieChart
            data={propertyStatusData}
            title="Property Status Distribution"
            height={300}
          />
          <PieChart
            data={leadSourceData}
            title="Lead Sources"
            height={300}
          />
          <PieChart
            data={revenueByTypeData}
            title="Revenue by Property Type"
            height={300}
          />
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
