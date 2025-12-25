"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardTabs from "@/components/DashboardTabs";
import { mockApplications } from "@/lib/mockData";

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "under_review":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "under_review":
        return "Under Review";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "scheduled":
        return "Viewing Scheduled";
      default:
        return "Pending";
    }
  };

  const filteredApplications = filter === "all" 
    ? mockApplications 
    : mockApplications.filter(app => app.status === filter);

  return (
    <div>
      <DashboardTabs />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Applications</h1>
          <p className="text-gray-500">Track your property applications and their status</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Status
          </button>
          <Link
            href="/user/dashboard/properties"
            className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#EA580C]"
          >
            + New Application
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {["all", "under_review", "scheduled", "approved", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-[#F97316] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status === "all" ? "All" : getStatusText(status)}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-6">
              {/* Property Image */}
              <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={application.property.image}
                  alt={application.property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Property Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {application.property.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {application.property.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {getStatusText(application.status)}
                  </span>
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Applied</p>
                    <p className="text-sm font-medium text-gray-700">{application.appliedDate}</p>
                  </div>
                  {application.status === "scheduled" && application.viewingDate && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Viewing</p>
                      <p className="text-sm font-medium text-gray-700">{application.viewingDate}</p>
                    </div>
                  )}
                  {application.nextStep && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Next Step</p>
                      <p className="text-sm font-medium text-[#F97316]">{application.nextStep}</p>
                    </div>
                  )}
                  <div className="col-span-1 flex justify-end items-end">
                    <Link
                      href={`/user/dashboard/properties/${application.property.id}`}
                      className="text-sm text-[#F97316] hover:text-[#EA580C] font-medium flex items-center gap-1"
                    >
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-500 mb-4">Start applying to properties you&apos;re interested in</p>
          <Link
            href="/user/dashboard/properties"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#EA580C]"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
}
