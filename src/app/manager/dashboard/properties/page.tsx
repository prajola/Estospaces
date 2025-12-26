"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

// Sample properties with locations for demo
const samplePropertiesWithLocation = [
  {
    id: "1",
    propertyTitle: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    city: "Downtown",
    location: "Downtown",
    price: "$ 450,000.00",
    status: "published",
    lat: 40.7580,
    lng: -73.9855,
  },
  {
    id: "2",
    propertyTitle: "Luxury condo with City",
    address: "456, High St.Midtown",
    city: "Midtown",
    location: "Midtown",
    price: "$ 3,500.00",
    status: "published",
    lat: 40.7505,
    lng: -73.9934,
  },
  {
    id: "3",
    propertyTitle: "Spacious Penthouse",
    address: "321 sky, tower, Uptown",
    city: "Uptown",
    location: "Uptown",
    price: "$ 6,500.00",
    status: "published",
    lat: 40.7831,
    lng: -73.9712,
  },
];

export default function ManagerPropertiesPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
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
    
    // Load properties from localStorage or use sample data
    const savedProperties = localStorage.getItem(`properties_${email}`);
    if (savedProperties) {
      const parsed = JSON.parse(savedProperties);
      // Add location data if missing
      const propertiesWithLocation = parsed.map((prop: any) => {
        if (!prop.location && prop.address) {
          // Extract location from address
          const parts = prop.address.split(/[.,]/);
          prop.city = parts[parts.length - 1]?.trim() || "Unknown";
          prop.location = prop.city;
        }
        return prop;
      });
      setProperties(propertiesWithLocation);
    } else {
      // Use sample properties for demo
      setProperties(samplePropertiesWithLocation);
    }
  }, [router]);

  // Get unique locations
  const uniqueLocations = Array.from(
    new Set(properties.map((p) => p.location || p.city || "Unknown").filter(Boolean))
  ).sort();

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    // Location filter
    if (selectedLocation !== "all") {
      const propLocation = property.location || property.city || "Unknown";
      if (propLocation !== selectedLocation) {
        return false;
      }
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchableText = [
        property.propertyTitle || "",
        property.address || "",
        property.city || "",
        property.location || "",
        property.price || "",
      ].join(" ").toLowerCase();
      
      return searchableText.includes(query);
    }
    
    return true;
  });

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${
          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
        }`}>
          Properties
        </h1>
        <Button
          variant="primary"
          onClick={() => router.push("/manager/dashboard/properties/add")}
        >
          + Add New Property
        </Button>
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
              <option value="all">All Locations ({properties.length})</option>
              {uniqueLocations.map((location) => {
                const count = properties.filter(
                  (p) => (p.location || p.city || "Unknown") === location
                ).length;
                return (
                  <option key={location} value={location}>
                    {location} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedLocation !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedLocation("all");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Results Count */}
        {filteredProperties.length !== properties.length && (
          <div className="mt-3">
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Showing {filteredProperties.length} of {properties.length} properties
            </p>
          </div>
        )}
      </div>

      {properties.length === 0 ? (
        <div className={`rounded-lg shadow-md p-12 text-center ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <p className={`text-lg mb-4 ${
            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-500"
          }`}>
            No properties found
          </p>
          <Button variant="primary" onClick={() => router.push("/manager/dashboard/properties/add")}>
            Add Your First Property
          </Button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className={`rounded-lg shadow-md p-12 text-center ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="p-4">
                <h3 className={`font-semibold mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {property.propertyTitle || "Untitled Property"}
                </h3>
                <p className={`text-xl font-bold text-[#FF7700] mb-2`}>
                  {property.price || "N/A"}
                </p>
                <p className={`text-sm mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-600"
                }`}>
                  📍 {property.address || property.location || "Location not specified"}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    property.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {property.status || "draft"}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/manager/dashboard/properties/${property.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ManagerDashboardLayout>
  );
}

