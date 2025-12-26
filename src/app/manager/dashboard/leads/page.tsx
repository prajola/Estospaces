"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

const sampleLeads = [
  {
    id: "1",
    name: "Sarah Jonson",
    email: "sarah.jonson@gmail.com",
    phone: "+1(555) 123-4567",
    propertyInterest: "Modern downtown apartment, Timeline 1-2 months",
    status: "Pending",
    statusColor: "bg-orange-100 text-orange-800",
    score: 95,
    budget: "$2000-$3000",
    lastContact: "01/15/2024",
  },
  {
    id: "2",
    name: "Michel Chen",
    email: "michel.chen@gmail.com",
    phone: "+1(555) 123-4567",
    propertyInterest: "Luxury Family Home, Timeline 1-2 months",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
    score: 78,
    budget: "$4000-$5000",
    lastContact: "01/04/2024",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@gmail.com",
    phone: "+1(555) 123-4567",
    propertyInterest: "Cozy Studio Loft, Timeline 1-2 months",
    status: "Cold",
    statusColor: "bg-purple-100 text-purple-800",
    score: 45,
    budget: "$1500-$2000",
    lastContact: "01/04/2024",
  },
];

export default function ManagerLeadsPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [router]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <ManagerDashboardLayout userEmail={userEmail}>
        <div className={`min-h-[60vh] flex flex-col items-center justify-center ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
        }`}>
          <div className="text-center mb-8">
            <svg className="w-64 h-64 mx-auto mb-4" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" fill="#E0F2FE"/>
              <rect x="20" y="140" width="40" height="40" fill="#EF4444" rx="4"/>
              <rect x="70" y="120" width="40" height="60" fill="#3B82F6" rx="4"/>
              <rect x="120" y="100" width="40" height="80" fill="#10B981" rx="4"/>
              <rect x="170" y="130" width="20" height="50" fill="#F59E0B" rx="4"/>
              <path d="M40 140 L60 120 L80 100 L100 90 L120 100 L140 120 L160 130" stroke="#3B82F6" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="110" r="8" fill="#3B82F6"/>
              <circle cx="100" cy="90" r="8" fill="#3B82F6"/>
              <circle cx="150" cy="100" r="8" fill="#3B82F6"/>
              <circle cx="80" cy="60" r="15" fill="#FBBF24"/>
              <path d="M60 50 Q80 40 100 50" stroke="#FBBF24" strokeWidth="2" fill="none"/>
            </svg>
            <p className={`text-lg ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Loading...
            </p>
            <div className="flex gap-1 justify-center mt-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </ManagerDashboardLayout>
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
              Leads & Clients
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Manage your leads and clients relationships.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar
            </Button>
            <Button variant="primary">
              Publish Property
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-red-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>1</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>New Leads</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-orange-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-6z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>2</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Warm Leads</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>1</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Hot Leads</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>4</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Total Leads</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Q Search Leads"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <svg
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
            effectiveTheme === "dark"
              ? "bg-gray-700 border-gray-600 text-gray-100"
              : effectiveTheme === "ocean"
              ? "bg-blue-50 border-blue-300 text-blue-900"
              : "bg-white border-gray-300 text-gray-900"
          }`}>
            <option>All States</option>
          </select>
          <Button variant="outline">More Filters</Button>
        </div>

        {/* Leads Overview Table */}
        <div className={`rounded-lg shadow-md overflow-hidden ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className={`font-semibold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Leads Overview
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
                  }`}>Leads</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Property Interest</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Score</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Budget</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Last Contact</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                effectiveTheme === "dark" ? "divide-gray-700" : effectiveTheme === "ocean" ? "divide-blue-200" : "divide-gray-200"
              }`}>
                {sampleLeads.map((lead) => (
                  <tr key={lead.id} className={`hover:${
                    effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
                  }`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-medium ${
                          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                        }`}>{lead.name}</p>
                        <p className={`text-sm ${
                          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                        }`}>{lead.email}</p>
                        <p className={`text-sm ${
                          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                        }`}>{lead.phone}</p>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{lead.propertyInterest}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.statusColor}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{lead.score}</td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{lead.budget}</td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{lead.lastContact}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className={`${
                          effectiveTheme === "dark" ? "text-gray-300 hover:text-white" : effectiveTheme === "ocean" ? "text-blue-700 hover:text-blue-900" : "text-gray-600 hover:text-gray-900"
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </button>
                        <button className={`${
                          effectiveTheme === "dark" ? "text-gray-300 hover:text-white" : effectiveTheme === "ocean" ? "text-blue-700 hover:text-blue-900" : "text-gray-600 hover:text-gray-900"
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
