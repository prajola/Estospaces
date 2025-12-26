"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout, PropertyCard, StatsCard } from "@/components";
import { Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

const sampleProperties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    price: "$450k",
    title: "Modern Downtown Apartment",
    address: "123 Main St. Downtown",
    beds: 3,
    bathrooms: 2,
    sqft: 1200,
    rating: 4.8,
    reviews: 24,
    listedDate: "2 weeks ago",
    propertyType: "Apartment",
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
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    price: "$520k",
    title: "Luxury Condo with City View",
    address: "789 Park Boulevard",
    beds: 2,
    bathrooms: 2,
    sqft: 1500,
    rating: 4.9,
    reviews: 32,
    listedDate: "3 days ago",
    propertyType: "Condo",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    price: "$295k",
    title: "Charming Starter Home",
    address: "321 Elm Street",
    beds: 3,
    bathrooms: 1,
    sqft: 1100,
    rating: 4.5,
    reviews: 15,
    listedDate: "5 days ago",
    propertyType: "House",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    price: "$650k",
    title: "Spacious Modern Villa",
    address: "555 Pine Road",
    beds: 5,
    bathrooms: 4,
    sqft: 2500,
    rating: 4.7,
    reviews: 28,
    listedDate: "1 week ago",
    propertyType: "Villa",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    price: "$420k",
    title: "Contemporary Townhouse",
    address: "777 Maple Drive",
    beds: 3,
    bathrooms: 2.5,
    sqft: 1600,
    rating: 4.6,
    reviews: 21,
    listedDate: "4 days ago",
    propertyType: "Townhouse",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("Try to find me a modern 3 bedroom house under $500k with a garden near...");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);

    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [router]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Extract username from email (part before @)
  const username = userEmail.split("@")[0];

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Greeting Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-[#FF7700]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF7700] to-[#FF7700] rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {greeting}, {username}!
              </h2>
              <p className="text-sm text-gray-600 mt-1">{userEmail}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Your Dream Home Banner */}
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
          <div>
            <h2 className="text-xl font-semibold mb-2">Discover Your Dream Home</h2>
            <p className="text-sm text-white/90 mb-6">
              Explore premium properties tailored just for you
            </p>
            <div className="flex gap-6">
              <StatsCard
                label="Properties Available"
                value="2"
                icon="🏠"
                variant="banner"
              />
              <StatsCard
                label="Saved Favorites"
                value="3"
                icon="⭐"
                variant="banner"
              />
              <StatsCard
                label="Active Applications"
                value="3"
                icon="📝"
                variant="banner"
              />
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-5xl">🏠</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Property Search */}
      <div className={`rounded-lg shadow-md p-4 sm:p-6 mb-6 ${
        effectiveTheme === "dark"
          ? "bg-gray-800"
          : effectiveTheme === "ocean"
          ? "bg-blue-100"
          : "bg-white"
      }`}>
        <h3 className={`text-base font-semibold mb-4 ${
          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
        }`}>
          AI-Powered Property Search
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Try to find me a modern 3 bedroom house under $500k with a garden near..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm border-2 border-[#FF7700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 text-gray-100 placeholder-gray-400"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 text-blue-900 placeholder-blue-600"
                  : "bg-white text-gray-900"
              }`}
            />
            <svg
              className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
              }`}
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
          <div className="flex gap-2 sm:gap-3">
            <Button variant="primary" className="flex-1 sm:flex-initial text-sm">Search</Button>
            <Button variant="outline" className="flex-1 sm:flex-initial text-sm">Filters</Button>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Featured Properties
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Handpicked properties that match your preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Map View</Button>
            <Button variant="outline">+ Save Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProperties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
