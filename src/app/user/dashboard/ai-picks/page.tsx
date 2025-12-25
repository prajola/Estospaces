"use client";

import React, { useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import DashboardTabs from "@/components/DashboardTabs";
import { mockAIPicks } from "@/lib/mockData";

export default function AIPicksPage() {
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("match");

  const handleSave = (id: string) => {
    setSavedProperties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <DashboardTabs />

      {/* AI Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI-Powered Recommendations</h1>
            <p className="text-purple-100">
              Properties curated based on your preferences and browsing history
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Featured Properties</h2>
          <p className="text-gray-500">
            {mockAIPicks.length} AI-recommended properties found
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option value="match">Best Match</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <Link
            href="/user/dashboard/properties"
            className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#EA580C]"
          >
            View All Properties
          </Link>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockAIPicks.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSave={handleSave}
            isSaved={savedProperties.includes(property.id)}
          />
        ))}
      </div>

      {/* How AI Works */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">How Our AI Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Analyzes Your Preferences</h4>
              <p className="text-sm text-gray-500">We learn from your searches and saved properties</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Matches Your Needs</h4>
              <p className="text-sm text-gray-500">Finds properties that fit your budget and requirements</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Delivers Top Picks</h4>
              <p className="text-sm text-gray-500">Curates the best options just for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
