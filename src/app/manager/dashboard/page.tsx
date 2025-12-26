"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { PropertiesMap } from "@/components/PropertiesMap";
import { useTheme } from "@/contexts/ThemeContext";

const sampleProperties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    title: "Modern Downtown Apartment",
    address: "123 Main St.Downtown",
    price: "$ 450,000.00",
    beds: 2,
    bathrooms: 2,
    sqft: 1200,
    rating: 4.8,
    reviews: 24,
    listedDate: "2 weeks ago",
    tags: ["Apartment", "Balcony", "Gym"],
    status: "Available",
    views: 245,
    inquiries: 12,
    lat: 40.7580,
    lng: -73.9855, // Times Square area, NYC
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    title: "Luxury condo with City",
    address: "456, High St.Midtown",
    price: "$ 3,500.00",
    beds: 3,
    bathrooms: 2,
    sqft: 1500,
    rating: 4.9,
    reviews: 18,
    listedDate: "1 weeks ago",
    tags: ["Condo", "Water view", "Conciongo"],
    status: "Available",
    views: 189,
    inquiries: 8,
    lat: 40.7505,
    lng: -73.9934, // Midtown Manhattan, NYC
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    title: "Spacious Penthouse",
    address: "321 sky, tower, Uptown",
    price: "$ 6,500.00",
    beds: 3,
    bathrooms: 3,
    sqft: 2200,
    rating: 4.9,
    reviews: 31,
    listedDate: "5 days ago",
    tags: ["Penthhouse", "Terrance", "City view"],
    status: "Available",
    views: 156,
    inquiries: 15,
    lat: 40.7831,
    lng: -73.9712, // Upper East Side, NYC
  },
];

const topPerformingProperties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: "$ 450,000.00",
    views: 245,
    inquiries: 12,
    status: "Available",
  },
  {
    id: "2",
    title: "Luxury Condo with city view",
    price: "$ 3,500.00",
    views: 189,
    inquiries: 8,
    status: "Available",
  },
  {
    id: "3",
    title: "Spacious Penthouse",
    price: "$ 6,500.00",
    views: 156,
    inquiries: 15,
    status: "Available",
  },
];

export default function ManagerDashboardPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "properties" | "leads" | "application" | "analytics">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

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

  const userName = userEmail.split("@")[0];
  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

  // Get unique locations from sample properties
  const uniqueLocations = Array.from(
    new Set(sampleProperties.map((p) => {
      // Extract location from address
      const address = p.address || "";
      if (address.includes("Downtown")) return "Downtown";
      if (address.includes("Midtown")) return "Midtown";
      if (address.includes("Uptown")) return "Uptown";
      return "Other";
    }))
  ).sort();

  // Filter properties for properties tab
  const filteredProperties = sampleProperties.filter((property) => {
    // Location filter
    if (selectedLocation !== "all") {
      const address = property.address || "";
      let propLocation = "Other";
      if (address.includes("Downtown")) propLocation = "Downtown";
      else if (address.includes("Midtown")) propLocation = "Midtown";
      else if (address.includes("Uptown")) propLocation = "Uptown";
      
      if (propLocation !== selectedLocation) {
        return false;
      }
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchableText = [
        property.title || "",
        property.address || "",
        property.price || "",
      ].join(" ").toLowerCase();
      
      return searchableText.includes(query);
    }
    
    return true;
  });

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className={`text-xl font-semibold mb-4 ${
          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
        }`}>
          Welcome {displayName}
        </h1>
        <div className="bg-[#FF7700] rounded-xl p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <p className="text-sm text-white/90 mb-4">
                Manage Your Properties, ideas, and grow your business with powerful insight
              </p>
              <div className="flex gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-xl font-semibold">3</p>
                    <p className="text-white/90 text-xs">Active Properties</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="text-xl font-semibold">6</p>
                    <p className="text-white/90 text-xs">Active Leads</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div>
                    <p className="text-xl font-semibold">6</p>
                    <p className="text-white/90 text-xs">Applications</p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => router.push("/manager/dashboard/properties/add")}
              className="bg-white text-black hover:bg-gray-100"
            >
              + Add Property
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Monthly Revenue */}
        <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+8.5%</span>
            </div>
          </div>
          <p className={`text-xl font-semibold mb-1 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>$15,000.00</p>
          <p className={`text-xs ${
            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
          }`}>Monthly Revenue</p>
        </div>

        {/* Active Listings */}
        <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+5%</span>
            </div>
          </div>
          <p className={`text-xl font-semibold mb-1 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>8</p>
          <p className={`text-sm ${
            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
          }`}>Active Listings</p>
        </div>

        {/* Total Views */}
        <div className={`rounded-lg shadow-md p-6 border-l-4 border-purple-500 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+15.2%</span>
            </div>
          </div>
          <p className={`text-xl font-semibold mb-1 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>2,450</p>
          <p className={`text-sm ${
            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
          }`}>Total Views</p>
        </div>

        {/* Conversion Rate */}
        <div className={`rounded-lg shadow-md p-6 border-l-4 border-[#FF7700] ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#FF7700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>+5%</span>
            </div>
          </div>
          <p className={`text-xl font-semibold mb-1 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>12.2%</p>
          <p className={`text-sm ${
            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
          }`}>Conversion Rate</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 mb-6 border-b ${
        effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-200" : "border-gray-200"
      }`}>
        {(["overview", "properties", "leads", "application", "analytics"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 capitalize flex items-center gap-2 ${
              activeTab === tab
                ? "text-[#FF7700] border-[#FF7700]"
                : effectiveTheme === "dark"
                ? "text-gray-400 border-transparent hover:text-gray-200"
                : effectiveTheme === "ocean"
                ? "text-blue-600 border-transparent hover:text-blue-900"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            {tab === "properties" && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            )}
            {tab === "leads" && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
            {tab === "application" && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            {tab === "analytics" && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Activity */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className={`text-lg font-semibold ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Recently Activity
              </h3>
            </div>
            <div className="space-y-4 mb-4">
              <div className={`flex items-start gap-3 p-4 rounded-lg ${
                effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
              }`}>
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-medium ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      New Application
                    </p>
                    <p className={`text-xs ${
                      effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                    }`}>
                      1/10/2025
                    </p>
                  </div>
                  <p className={`text-sm ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    Mike Wilson applied for Modern Downtown apartment
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-3 p-4 rounded-lg ${
                effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
              }`}>
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className={`font-medium mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    Viewing Scheduled
                  </p>
                  <p className={`text-sm ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    Sarah Johnson scheduled a viewing for tommorow
                  </p>
                </div>
              </div>
            </div>
            {/* Properties Map */}
            <div className="mt-4">
              <h4 className={`text-sm font-semibold mb-2 ${
                effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-700"
              }`}>
                Properties Location Map
              </h4>
              <div className="h-64 rounded-lg overflow-hidden border">
                <PropertiesMap
                  properties={sampleProperties.map(prop => ({
                    id: prop.id,
                    title: prop.title,
                    address: prop.address,
                    price: prop.price,
                    status: prop.status,
                    lat: prop.lat,
                    lng: prop.lng,
                    views: prop.views,
                    inquiries: prop.inquiries,
                  }))}
                  onPropertyClick={(propertyId) => {
                    router.push(`/manager/dashboard/properties/${propertyId}`);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Top Performing Properties */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#FF7700]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.538 1.118l-2.8-2.888a1 1 0 00-1.175 0l-2.8 2.888c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <h3 className={`text-lg font-semibold ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Top Performing properties
              </h3>
            </div>
            <div className="space-y-4">
              {topPerformingProperties.map((property) => (
                <div key={property.id} className={`p-4 rounded-lg border ${
                  effectiveTheme === "dark" ? "bg-gray-700 border-gray-600" : effectiveTheme === "ocean" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {property.title}
                    </h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {property.status}
                    </span>
                  </div>
                  <p className={`text-lg font-bold text-[#FF7700] mb-3`}>
                    {property.price}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className={`${
                        effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {property.views} view
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className={`${
                        effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {property.inquiries} {property.inquiries === 12 ? "Inquiries" : property.inquiries === 8 ? "Inquires" : "Inquires"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === "properties" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#FF7700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h2 className={`text-base font-semibold ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Your Properties
              </h2>
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={() => router.push("/manager/dashboard/properties/add")}
                className="text-black"
              >
                + Add Property
              </Button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className={`mb-6 p-4 rounded-lg ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          } shadow-md`}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search properties by name, address, or location..."
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

              {/* Location Filter */}
              <div className="sm:w-64">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : effectiveTheme === "ocean"
                      ? "bg-blue-50 border-blue-300 text-blue-900"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Properties Map - Full Width */}
          <div className={`mb-6 rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Properties Map View
              </h3>
              <p className={`text-sm ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }`}>
                {filteredProperties.length} properties on map
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden border">
              <PropertiesMap
                properties={filteredProperties.map(prop => ({
                  id: prop.id,
                  title: prop.title,
                  address: prop.address,
                  price: prop.price,
                  status: prop.status,
                  lat: prop.lat,
                  lng: prop.lng,
                  views: prop.views,
                  inquiries: prop.inquiries,
                }))}
                onPropertyClick={(propertyId) => {
                  router.push(`/manager/dashboard/properties/${propertyId}`);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length === 0 ? (
              <div className={`col-span-full rounded-lg shadow-md p-12 text-center ${
                effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
              }`}>
                <p className={`text-lg mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-500"
                }`}>
                  No properties found matching your filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                {filteredProperties.map((property) => (
                  <div
                key={property.id}
                className={`rounded-lg shadow-md overflow-hidden border ${
                  effectiveTheme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : effectiveTheme === "ocean"
                    ? "bg-blue-100 border-blue-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 right-3 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    {property.status}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {property.title}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    {property.address}
                  </p>
                  <div className={`flex items-center gap-4 text-sm mb-3 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {property.bathrooms} Bathroom
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {property.sqft} Sqft
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className={`font-medium ${
                        effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                      }`}>
                        {property.rating}
                      </span>
                      <span className={`${
                        effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                      }`}>
                        ({property.reviews})
                      </span>
                    </div>
                    <span className={`${
                      effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                    }`}>
                      Listed {property.listedDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs ${
                          effectiveTheme === "dark"
                            ? "bg-gray-700 text-gray-300"
                            : effectiveTheme === "ocean"
                            ? "bg-blue-200 text-blue-900"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/manager/dashboard/properties/${property.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {(activeTab === "leads" || activeTab === "application" || activeTab === "analytics") && (
        <div className={`rounded-lg shadow-md p-6 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <h3 className={`text-lg font-semibold ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>
            {activeTab === "leads" ? "Leads" : activeTab === "application" ? "Applications" : "Analytics"}
          </h3>
          <p className={`mt-2 text-sm ${
            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
          }`}>
            Navigate to the dedicated page for {activeTab} from the sidebar.
          </p>
        </div>
      )}
    </ManagerDashboardLayout>
  );
}
