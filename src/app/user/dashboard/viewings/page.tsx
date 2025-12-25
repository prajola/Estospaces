"use client";

import React from "react";
import Link from "next/link";
import { mockApplications } from "@/lib/mockData";

export default function ViewingsPage() {
  const scheduledViewings = mockApplications.filter(app => app.status === "scheduled");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Viewings</h1>
          <p className="text-gray-500">Your upcoming property viewings</p>
        </div>
      </div>

      {scheduledViewings.length > 0 ? (
        <div className="space-y-4">
          {scheduledViewings.map((viewing) => (
            <div
              key={viewing.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start gap-6">
                <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={viewing.property.image}
                    alt={viewing.property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {viewing.property.title}
                  </h3>
                  <p className="text-sm text-gray-500">{viewing.property.location}</p>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Date</p>
                      <p className="text-sm font-medium text-gray-700">{viewing.viewingDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Next Step</p>
                      <p className="text-sm font-medium text-[#F97316]">{viewing.nextStep}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C]">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No scheduled viewings</h3>
          <p className="text-gray-500 mb-4">Apply to properties to schedule viewings</p>
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
