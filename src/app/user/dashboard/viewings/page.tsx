"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button } from "@/components";

const viewings = [
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    date: "1/6/2025",
    time: "2:00 PM",
    status: "Confirmed",
    agent: "Agent Sarah Johnson",
    notes: "Bring ID and proof of income",
  },
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    date: "1/6/2025",
    time: "2:00 PM",
    status: "Pending",
    agent: "Agent Sarah Johnson",
    notes: "Bring ID and proof of income",
  },
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    date: "1/6/2025",
    time: "2:00 PM",
    status: "Completed",
    agent: "Agent Sarah Johnson",
    notes: "Bring ID and proof of income",
  },
];

export default function ViewingsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Property Viewings
          </h1>
          <p className="text-gray-600">
            Manage your scheduled property viewings
          </p>
        </div>
        <Button variant="primary">New Application</Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Total Viewings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Upcoming & Recent Viewings
        </h2>
      </div>

      {/* Viewing Cards */}
      <div className="space-y-4">
        {viewings.map((viewing, index) => {
          const statusColors = {
            Confirmed: "text-green-600 bg-green-100",
            Pending: "text-orange-600 bg-orange-100",
            Completed: "text-blue-600 bg-blue-100",
          };

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF7700]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {viewing.property}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{viewing.address}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>📅 {viewing.date}</span>
                    <span>🕐 {viewing.time}</span>
                  </div>
                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[viewing.status as keyof typeof statusColors]
                      }`}
                    >
                      {viewing.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      {viewing.agent}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{viewing.notes}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-sm">
                      Call
                    </Button>
                    <Button variant="outline" className="text-sm">
                      Email
                    </Button>
                  </div>
                  {viewing.status === "Pending" && (
                    <Button variant="primary" className="text-sm">
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
