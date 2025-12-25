"use client";

import React, { useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties, dashboardStats } from "@/lib/mockData";

export default function DashboardOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const handleSave = (id: string) => {
    setSavedProperties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discover Your Dream Home</h1>
            <p className="text-orange-100">
              Explore premium properties tailored just for you
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold">{dashboardStats.propertiesAvailable}</div>
            <div className="text-sm text-orange-100">Properties Available</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold">{dashboardStats.savedFavorites}</div>
            <div className="text-sm text-orange-100">Saved Favorites</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold">{dashboardStats.activeApplications}</div>
            <div className="text-sm text-orange-100">Active Applications</div>
          </div>
        </div>
      </div>

      {/* AI Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          AI-Powered Property Search
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tell us what you&apos;re looking for and let AI find your perfect match
        </p>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., 2 bedroom apartment near downtown with a gym and under $2500 per month"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#F97316]"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="px-6 py-3 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#EA580C] transition-colors">
            Search
          </button>
          <button className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Featured Properties */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Featured Properties</h2>
            <p className="text-sm text-gray-500">
              Handpicked properties that match your preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-[#F97316] hover:bg-orange-50 rounded-lg transition-colors">
              View
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Map View
            </button>
            <Link
              href="/user/dashboard/properties"
              className="px-4 py-2 text-sm font-medium text-[#F97316] border border-[#F97316] rounded-lg hover:bg-orange-50 transition-colors"
            >
              View All Properties
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.slice(0, 6).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSave={handleSave}
              isSaved={savedProperties.includes(property.id)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/user/dashboard/favorites"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#F97316] hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">Favorites</h3>
          <p className="text-sm text-gray-500">View saved properties</p>
        </Link>

        <Link
          href="/user/dashboard/applications"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#F97316] hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">Applications</h3>
          <p className="text-sm text-gray-500">Track your applications</p>
        </Link>

        <Link
          href="/user/dashboard/ai-picks"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#F97316] hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">AI Picks</h3>
          <p className="text-sm text-gray-500">Properties recommended for you</p>
        </Link>

        <Link
          href="/user/dashboard/analytics"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#F97316] hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">Analytics</h3>
          <p className="text-sm text-gray-500">View your activity</p>
        </Link>
      </div>
    </div>
  );
}
