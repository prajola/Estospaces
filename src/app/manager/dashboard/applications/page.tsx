"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getAllApplications,
  getApplicationsByStatus,
  type Application,
  type ApplicationStatus,
} from "@/lib/applications";

export default function ManagerApplicationsPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | "all">("all");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
    
    // Load applications
    const allApps = getAllApplications();
    setApplications(allApps);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [router]);

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    // Status filter
    if (filterStatus !== "all" && app.status !== filterStatus) {
      return false;
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        app.applicantName.toLowerCase().includes(query) ||
        app.applicantEmail.toLowerCase().includes(query) ||
        app.propertyName.toLowerCase().includes(query) ||
        app.propertyAddress.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Get status counts
  const statusCounts = {
    all: applications.length,
    Pending: getApplicationsByStatus("Pending").length,
    "Under Review": getApplicationsByStatus("Under Review").length,
    Shortlisted: getApplicationsByStatus("Shortlisted").length,
    "Info Requested": getApplicationsByStatus("Info Requested").length,
    Approved: getApplicationsByStatus("Approved").length,
    Rejected: getApplicationsByStatus("Rejected").length,
    Withdrawn: getApplicationsByStatus("Withdrawn").length,
    Completed: getApplicationsByStatus("Completed").length,
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Shortlisted":
        return "bg-blue-100 text-blue-800";
      case "Info Requested":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Withdrawn":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              Application
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Review and manage tenant application.
            </p>
          </div>
          <Button variant="primary">
            Export Requests
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-orange-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>{statusCounts.Pending}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Pending</p>
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
            }`}>{statusCounts["Info Requested"]}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Info Requested</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>{statusCounts.Approved}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Approved</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-red-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>{statusCounts.Rejected}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Rejected</p>
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
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | "all")}
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
              effectiveTheme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : effectiveTheme === "ocean"
                ? "bg-blue-50 border-blue-300 text-blue-900"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="all">All Status ({statusCounts.all})</option>
            <option value="Pending">Pending ({statusCounts.Pending})</option>
            <option value="Under Review">Under Review ({statusCounts["Under Review"]})</option>
            <option value="Shortlisted">Shortlisted ({statusCounts.Shortlisted})</option>
            <option value="Info Requested">Info Requested ({statusCounts["Info Requested"]})</option>
            <option value="Approved">Approved ({statusCounts.Approved})</option>
            <option value="Rejected">Rejected ({statusCounts.Rejected})</option>
            <option value="Withdrawn">Withdrawn ({statusCounts.Withdrawn})</option>
            <option value="Completed">Completed ({statusCounts.Completed})</option>
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
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={`px-6 py-8 text-center ${
                      effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className={`hover:${
                        effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
                      } cursor-pointer`}
                      onClick={() => router.push(`/manager/dashboard/applications/${app.id}`)}
                    >
                      <td className={`px-6 py-4 ${
                        effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                      }`}>
                        <p className="font-medium">{app.applicantName}</p>
                        <p className={`text-xs mt-1 ${
                          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                        }`}>
                          {app.applicantEmail}
                        </p>
                      </td>
                      <td className={`px-6 py-4 ${
                        effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {app.propertyName}
                        <p className={`text-xs mt-1 ${
                          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                        }`}>
                          {app.unitDetails}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${
                        effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {app.score || "N/A"}
                      </td>
                      <td className={`px-6 py-4 ${
                        effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {app.budget || app.rentAmount}
                      </td>
                      <td className={`px-6 py-4 ${
                        effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {app.lastContact || new Date(app.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/manager/dashboard/applications/${app.id}`)}
                            className={`${
                              effectiveTheme === "dark" ? "text-gray-300 hover:text-white" : effectiveTheme === "ocean" ? "text-blue-700 hover:text-blue-900" : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
