"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button } from "@/components";

const allApplicationsData = [
  {
    propertyName: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    price: "$450,000",
    appliedDate: "Applied 1/5/2025",
    status: "Under Review",
    progress: 60,
    nextStep: "Background check in",
    documents: ["ID copy", "Income Statement", "References"],
  },
  {
    propertyName: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: "$450,000",
    appliedDate: "Applied 1/5/2025",
    status: "Approved",
    progress: 100,
    nextStep: "Background check in",
    documents: ["ID copy", "Income Statement", "References"],
  },
  {
    propertyName: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: "$450,000",
    appliedDate: "Applied 1/5/2025",
    status: "Rejected",
    progress: 100,
    nextStep: "Background check in",
    documents: ["ID copy", "Income Statement", "References"],
  },
];

const statusTabs = [
  { name: "All Applications", count: 3, value: "all" },
  { name: "Under Review", count: 1, value: "under-review" },
  { name: "Approved", count: 1, value: "approved" },
  { name: "Rejected", count: 1, value: "rejected" },
];

export default function ApplicationsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
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

  const filteredApplications =
    activeTab === "all"
      ? allApplicationsData
      : allApplicationsData.filter((app) => {
          if (activeTab === "under-review") return app.status === "Under Review";
          if (activeTab === "approved") return app.status === "Approved";
          if (activeTab === "rejected") return app.status === "Rejected";
          return false;
        });

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-sm text-gray-600">
            Track Your property application status and progress
          </p>
        </div>
        {(activeTab === "rejected" || activeTab === "all") && (
          <Button variant="primary">New Application</Button>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">2</p>
              <p className="text-xs text-gray-600">Total Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">1</p>
              <p className="text-xs text-gray-600">Under Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">3</p>
              <p className="text-xs text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        {activeTab === "rejected" || activeTab === "all" ? (
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {statusTabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                isActive
                  ? "text-[#FF7700] border-[#FF7700]"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {tab.name} {tab.count > 0 && `(${tab.count})`}
            </button>
          );
        })}
      </div>

      {/* Application Cards */}
      <div className="space-y-4">
        {filteredApplications.map((app, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF7700]"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🏠</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    {app.propertyName}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">{app.address}</p>
                  <p className="text-lg font-bold text-gray-900 mb-2">{app.price}</p>
                  <p className="text-sm text-gray-600 mb-3">{app.appliedDate}</p>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Application Progress
                    </p>
                    <p className="text-sm text-gray-600">{app.nextStep}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {app.documents.map((doc, docIndex) => (
                      <button
                        key={docIndex}
                        className="text-sm text-[#FF7700] hover:text-[#F97316] underline"
                      >
                        {doc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {app.status === "Approved" && (
                      <span className="text-green-500 text-xl">✅</span>
                    )}
                    {app.status === "Rejected" && (
                      <span className="text-red-500 text-xl">❌</span>
                    )}
                    <p
                      className={`text-sm font-medium ${
                        app.status === "Approved"
                          ? "text-green-600"
                          : app.status === "Rejected"
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                    >
                      {app.status}
                    </p>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full ${
                        app.status === "Approved"
                          ? "bg-green-500"
                          : app.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-[#FF7700]"
                      }`}
                      style={{ width: `${app.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{app.progress}%</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-sm">
                      View Details
                    </Button>
                    <Button variant="outline" className="text-sm">
                      Download
                    </Button>
                    <Button variant="outline" className="text-sm">
                      Message
                    </Button>
                  </div>
                  {app.status === "Approved" && (
                    <Button variant="primary" className="w-full">
                      Schedule Signing
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
