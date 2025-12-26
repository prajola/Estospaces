"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout, PropertyCard } from "@/components";
import { Button } from "@/components";

const allProperties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    price: "$450k",
    title: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    city: "Downtown",
    location: "Downtown",
    beds: 3,
    bathrooms: 2,
    sqft: 1200,
    rating: 4.8,
    reviews: 24,
    listedDate: "2 weeks ago",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    price: "$380k",
    title: "Cozy Family Home",
    address: "456 Oak Avenue",
    city: "Midtown",
    location: "Midtown",
    beds: 4,
    bathrooms: 3,
    sqft: 1800,
    rating: 4.6,
    reviews: 18,
    listedDate: "1 week ago",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    price: "$520k",
    title: "Luxury Condo with City View",
    address: "789 Park Boulevard",
    city: "Uptown",
    location: "Uptown",
    beds: 2,
    bathrooms: 2,
    sqft: 1500,
    rating: 4.9,
    reviews: 32,
    listedDate: "3 days ago",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    price: "$295k",
    title: "Charming Starter Home",
    address: "321 Elm Street",
    city: "Downtown",
    location: "Downtown",
    beds: 3,
    bathrooms: 1,
    sqft: 1100,
    rating: 4.5,
    reviews: 15,
    listedDate: "5 days ago",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    price: "$650k",
    title: "Spacious Modern Villa",
    address: "555 Pine Road",
    city: "Suburbs",
    location: "Suburbs",
    beds: 5,
    bathrooms: 4,
    sqft: 2500,
    rating: 4.7,
    reviews: 28,
    listedDate: "1 week ago",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    price: "$420k",
    title: "Contemporary Townhouse",
    address: "777 Maple Drive",
    city: "Midtown",
    location: "Midtown",
    beds: 3,
    bathrooms: 2.5,
    sqft: 1600,
    rating: 4.6,
    reviews: 21,
    listedDate: "4 days ago",
  },
];

export default function BrowsePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);
  }, [router]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLocation]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Get unique locations
  const uniqueLocations = Array.from(
    new Set(allProperties.map((p) => p.location || p.city || "Unknown").filter(Boolean))
  ).sort();

  // Filter properties
  const filteredProperties = allProperties.filter((property) => {
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
        property.title || "",
        property.address || "",
        property.city || "",
        property.location || "",
        property.price || "",
        `${property.beds} bed`,
        `${property.bathrooms} bath`,
      ].join(" ").toLowerCase();
      
      return searchableText.includes(query);
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Browse Properties Banner */}
      <div 
        className="relative rounded-xl p-8 mb-6 text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#FF7700]/80"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Browse Properties</h2>
            <p className="text-white/90 mb-6">
              Discover your perfect home from our curated collection
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by name, address, location, price..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm sm:text-base border border-white/30 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/80"
                />
                <svg
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-white/30 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                style={{ 
                  color: 'white',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="all" style={{ color: 'black' }}>All Locations ({allProperties.length})</option>
                {uniqueLocations.map((location) => {
                  const count = allProperties.filter(
                    (p) => (p.location || p.city || "Unknown") === location
                  ).length;
                  return (
                    <option key={location} value={location} style={{ color: 'black' }}>
                      {location} ({count})
                    </option>
                  );
                })}
              </select>
              {(searchQuery || selectedLocation !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("all");
                  }}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm sm:text-base whitespace-nowrap"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Featured Properties
            </h3>
            <p className="text-gray-600 mt-1">
              Handpicked properties that match your preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Map View</Button>
            <Button variant="outline">Save Search</Button>
          </div>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {filteredProperties.length > 0 ? (
              <>
                Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length}
                {filteredProperties.length !== allProperties.length && (
                  <span className="ml-2 text-[#FF7700]">
                    (filtered from {allProperties.length} total)
                  </span>
                )}
              </>
            ) : (
              "No properties found matching your filters"
            )}
          </p>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="rounded-lg shadow-md p-12 text-center bg-white">
            <p className="text-lg mb-4 text-gray-500">
              No properties found matching your search criteria
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentProperties.map((property) => (
              <PropertyCard
                key={property.id || property.title}
                {...property}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "primary" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

