"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout, PropertyCard } from "@/components";
import { Button } from "@/components";

const savedProperties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    price: "$450k",
    title: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    beds: 2,
    bathrooms: 1,
    sqft: 1200,
    rating: 4.8,
    reviews: 24,
    listedDate: "2 weeks ago",
    propertyType: "Apartment",
    status: "Available" as const,
    savedDate: "Saved 1/1/2020",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    price: "$380k",
    title: "Cozy Family Home",
    address: "456 Oak Avenue",
    beds: 4,
    bathrooms: 3,
    sqft: 1800,
    rating: 4.6,
    reviews: 18,
    listedDate: "1 week ago",
    propertyType: "House",
    status: "Available" as const,
    savedDate: "Saved 1/5/2020",
  },
];

// Transparent SVG Icons
const HeartIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const LocationIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CalendarIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

type ViewMode = "list" | "map";

export default function FavoritesPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(savedProperties);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    beds: "",
    propertyType: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);
  }, [router]);

  useEffect(() => {
    let filtered = [...savedProperties];

    if (filters.minPrice) {
      const min = parseInt(filters.minPrice.replace(/[^0-9]/g, ""));
      filtered = filtered.filter((p) => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ""));
        return price >= min;
      });
    }

    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice.replace(/[^0-9]/g, ""));
      filtered = filtered.filter((p) => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ""));
        return price <= max;
      });
    }

    if (filters.beds) {
      filtered = filtered.filter((p) => p.beds >= parseInt(filters.beds));
    }

    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
    }

    setFilteredProperties(filtered);
  }, [filters]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      beds: "",
      propertyType: "",
    });
  };

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Saved Properties
        </h1>
        <p className="text-gray-600">
          Your favorite properties in one place
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center opacity-60">
              <HeartIcon className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{savedProperties.length}</p>
              <p className="text-sm text-gray-600">Total Saved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center opacity-60">
              <LocationIcon className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {savedProperties.length > 0
                  ? `$${Math.round(
                      savedProperties.reduce((sum, p) => {
                        const priceStr = p.price.replace(/[^0-9]/g, "");
                        const price = parseInt(priceStr) || 0;
                        return sum + price;
                      }, 0) / savedProperties.length
                    )}k`
                  : "$0k"}
              </p>
              <p className="text-sm text-gray-600">AVG. Price</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center opacity-60">
              <CalendarIcon className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Viewing Scheduled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Button 
            variant="outline" 
            className={`${viewMode === "list" ? "bg-[#FF7700] text-white border-[#FF7700]" : ""}`}
            onClick={() => setViewMode("list")}
          >
            {filteredProperties.length} properties
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-[#FF7700] text-white border-[#FF7700]" : ""}
          >
            Filter
          </Button>
          {showFilters && (
            <Button variant="outline" onClick={clearFilters} className="text-xs">
              Clear
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-[#FF7700] text-white border-[#FF7700]" : ""}
          >
            Short List
          </Button>
          <Button 
            variant="outline"
            onClick={() => setViewMode("map")}
            className={viewMode === "map" ? "bg-[#FF7700] text-white border-[#FF7700]" : ""}
          >
            Map View
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="text"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7700] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="text"
                placeholder="$1M"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7700] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beds
              </label>
              <select
                value={filters.beds}
                onChange={(e) => handleFilterChange("beds", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7700] focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7700] focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard
                id={property.id}
                image={property.image}
                price={property.price}
                title={property.title}
                address={property.address}
                beds={property.beds}
                bathrooms={property.bathrooms}
                sqft={property.sqft}
                rating={property.rating}
                reviews={property.reviews}
                listedDate={property.listedDate}
                propertyType={property.propertyType}
                status={property.status}
              />
              <p className="text-xs text-gray-500 mt-2 ml-1">{property.savedDate}</p>
            </div>
          ))}
          {filteredProperties.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">No properties match your filters.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: "600px" }}>
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <svg
                className="w-24 h-24 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Map View</h3>
              <p className="text-gray-500">
                Map integration coming soon. {filteredProperties.length} properties found.
              </p>
              <div className="mt-6 space-y-2">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-600">{property.address}</p>
                    <p className="text-sm font-semibold text-[#FF7700]">{property.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
