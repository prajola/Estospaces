"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

const sampleInvoices = [
  {
    id: "INV-2024-001",
    client: "Sarah Johnson",
    paymentMethod: "Credit Card",
    property: "Downtown Luxury Apartment",
    amount: "$2,500.00",
    dueDate: "Jan 15, 2024",
    issuedDate: "Issued Jan 1, 2024",
    status: "Paid",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "INV-2024-002",
    client: "Michel Chen",
    paymentMethod: "Bank Transfer",
    property: "Family Home with Garden",
    amount: "$3,200.00",
    dueDate: "Jan 20, 2024",
    issuedDate: "",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "INV-2024-003",
    client: "Emily Rodriguez",
    paymentMethod: "Check",
    property: "Modern Studio Loft",
    amount: "$1,800.00",
    dueDate: "Jan 18, 2024",
    issuedDate: "Issued Dec 5, 2023",
    status: "Overdue",
    statusColor: "bg-red-100 text-red-800",
  },
  {
    id: "INV-2024-004",
    client: "David Wilson",
    paymentMethod: "Credit Card",
    property: "Suburban Townhouse",
    amount: "$500.00",
    dueDate: "Jan 25, 2024",
    issuedDate: "Issued Dec 5, 2023",
    status: "",
    statusColor: "",
  },
];

export default function ManagerBillingPage() {
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
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-2xl font-bold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Billing & Payments
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Manage invoices, payments, and financial records
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Export</Button>
            <Button variant="primary">Create Invoice</Button>
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
            }`}>$2,500.00</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Total Revenue</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-yellow-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>$3,200.00</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Pending Payment</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-red-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>$1,800.00</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Overdue Amount</p>
            <p className={`text-xs mt-1 ${
              effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
            }`}>2 new overdue</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>4</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Total Invoices</p>
            <p className={`text-xs mt-1 ${
              effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
            }`}>This month</p>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className={`rounded-lg shadow-md p-6 mb-6 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Revenue overview
            </h3>
            <select className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] text-sm ${
              effectiveTheme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : effectiveTheme === "ocean"
                ? "bg-blue-50 border-blue-300 text-blue-900"
                : "bg-white border-gray-300 text-gray-900"
            }`}>
              <option>Current Month</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between gap-4">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-green-500 rounded-t mb-2" style={{ height: "60%" }}></div>
              <span className={`text-xs font-medium ${
                effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }`}>Collected</span>
              <span className={`text-xs ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
              }`}>$2,500.00</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-yellow-500 rounded-t mb-2" style={{ height: "80%" }}></div>
              <span className={`text-xs font-medium ${
                effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }`}>Pending</span>
              <span className={`text-xs ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
              }`}>$3,200.00</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-red-500 rounded-t mb-2" style={{ height: "45%" }}></div>
              <span className={`text-xs font-medium ${
                effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }`}>Overdue</span>
              <span className={`text-xs ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
              }`}>$1,800.00</span>
            </div>
          </div>
        </div>

        {/* Invoices Section */}
        <div className={`rounded-lg shadow-md overflow-hidden ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className={`font-semibold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Invoices (4)
            </h3>
            <div className="flex-1 max-w-xs ml-4 relative">
              <input
                type="text"
                placeholder="Search Invoices"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] text-sm ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : effectiveTheme === "ocean"
                    ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <svg
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${
                effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-200" : "bg-gray-50"
              }`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Invoice ID</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Client</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Property</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Amount</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Due date</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                effectiveTheme === "dark" ? "divide-gray-700" : effectiveTheme === "ocean" ? "divide-blue-200" : "divide-gray-200"
              }`}>
                {sampleInvoices.map((invoice) => (
                  <tr key={invoice.id} className={`hover:${
                    effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
                  }`}>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>{invoice.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-medium ${
                          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                        }`}>{invoice.client}</p>
                        <p className={`text-xs ${
                          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                        }`}>({invoice.paymentMethod})</p>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{invoice.property}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>{invoice.amount}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`text-sm ${
                          effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                        }`}>{invoice.dueDate}</p>
                        {invoice.issuedDate && (
                          <p className={`text-xs ${
                            effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                          }`}>{invoice.issuedDate}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {invoice.status && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.statusColor}`}>
                          {invoice.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className={`${
                          effectiveTheme === "dark" ? "text-gray-300 hover:text-white" : effectiveTheme === "ocean" ? "text-blue-700 hover:text-blue-900" : "text-gray-600 hover:text-gray-900"
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className={`${
                          effectiveTheme === "dark" ? "text-gray-300 hover:text-white" : effectiveTheme === "ocean" ? "text-blue-700 hover:text-blue-900" : "text-gray-600 hover:text-gray-900"
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <button className={`${
                          effectiveTheme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
