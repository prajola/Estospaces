"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button } from "@/components";

// Mock property data - in production, this would come from an API
const propertyData: Record<string, any> = {
  "1": {
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
    description: "This stunning modern apartment offers the perfect blend of comfort and style. Located in the heart of downtown, you'll have easy access to restaurants, shopping, and entertainment. The open-concept living space features high ceilings, large windows, and modern finishes throughout.",
    features: [
      "Modern kitchen with stainless steel appliances",
      "Spacious living room with balcony",
      "Master bedroom with walk-in closet",
      "In-unit laundry",
      "Parking space included",
      "Pet-friendly",
      "24/7 security",
      "Fitness center access",
    ],
    amenities: [
      "Swimming Pool",
      "Gym",
      "Parking",
      "Security",
      "Elevator",
      "Balcony",
    ],
    yearBuilt: 2020,
    propertyTax: "$3,200/year",
    hoaFees: "$150/month",
  },
  "2": {
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
    description: "A beautiful family home in a quiet neighborhood. Perfect for families looking for space and comfort. The property features a large backyard, updated kitchen, and plenty of storage space.",
    features: [
      "Large backyard",
      "Updated kitchen",
      "Master suite",
      "Two-car garage",
      "Hardwood floors",
      "Central air conditioning",
      "Fireplace",
      "Storage shed",
    ],
    amenities: [
      "Backyard",
      "Garage",
      "Fireplace",
      "Storage",
    ],
    yearBuilt: 2015,
    propertyTax: "$2,800/year",
    hoaFees: "N/A",
  },
  "3": {
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
    description: "Experience luxury living in this stunning high-rise condo with breathtaking city views. The unit features premium finishes, floor-to-ceiling windows, and access to world-class amenities.",
    features: [
      "Floor-to-ceiling windows",
      "Premium finishes",
      "City views",
      "Modern kitchen",
      "Spa-like bathrooms",
      "Walk-in closets",
      "Smart home features",
      "Private balcony",
    ],
    amenities: [
      "Rooftop Pool",
      "Gym",
      "Concierge",
      "Parking",
      "Business Center",
      "Sky Lounge",
    ],
    yearBuilt: 2022,
    propertyTax: "$4,500/year",
    hoaFees: "$350/month",
  },
  "4": {
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
    description: "A charming starter home perfect for first-time buyers. This cozy property offers great value in a friendly neighborhood with excellent schools nearby.",
    features: [
      "Updated kitchen",
      "Hardwood floors",
      "Large windows",
      "Front porch",
      "Backyard",
      "Storage space",
      "Energy efficient",
      "Low maintenance",
    ],
    amenities: [
      "Backyard",
      "Porch",
      "Storage",
    ],
    yearBuilt: 2010,
    propertyTax: "$2,200/year",
    hoaFees: "N/A",
  },
  "5": {
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
    description: "Luxurious modern villa with expansive living spaces and premium finishes. Perfect for large families seeking elegance and comfort.",
    features: [
      "Open floor plan",
      "Gourmet kitchen",
      "Master suite with spa bathroom",
      "Home office",
      "Entertainment room",
      "Three-car garage",
      "Landscaped yard",
      "Smart home system",
    ],
    amenities: [
      "Pool",
      "Garage",
      "Garden",
      "Home Office",
    ],
    yearBuilt: 2021,
    propertyTax: "$5,800/year",
    hoaFees: "$200/month",
  },
  "6": {
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
    description: "Stylish contemporary townhouse with modern amenities and convenient location. Low-maintenance living with all the comforts of home.",
    features: [
      "Modern design",
      "Updated bathrooms",
      "Open kitchen",
      "Private patio",
      "Attached garage",
      "High ceilings",
      "Natural light",
      "Walk-in closets",
    ],
    amenities: [
      "Patio",
      "Garage",
      "Community Pool",
      "Fitness Center",
    ],
    yearBuilt: 2018,
    propertyTax: "$3,500/year",
    hoaFees: "$180/month",
  },
};

export default function PropertyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);

    // Get property ID from URL
    const propertyId = params?.id as string;
    if (propertyId && propertyData[propertyId]) {
      setProperty(propertyData[propertyId]);
    } else {
      // If property not found, you could redirect or show error
      console.log("Property not found");
    }
  }, [router, params]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <DashboardLayout userEmail={userEmail}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The property you're looking for doesn't exist.
          </p>
          <Button variant="primary" onClick={() => router.push("/user/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Back</span>
      </button>

      {/* Property Image */}
      <div className="mb-6">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-96 object-cover rounded-xl"
        />
      </div>

      {/* Property Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {property.propertyType}
              </span>
              {property.status && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {property.status}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{property.address}</p>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xl">⭐</span>
                <span className="text-lg font-medium text-gray-700">
                  {property.rating} ({property.reviews} reviews)
                </span>
              </div>
              <span className="text-gray-500">Listed {property.listedDate}</span>
            </div>
            <div className="text-4xl font-bold text-[#FF7700] mb-4">
              {property.price}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-[#FF7700]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Property Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Bedrooms</p>
                <p className="text-lg font-semibold text-gray-900">
                  {property.beds}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Bathrooms</p>
                <p className="text-lg font-semibold text-gray-900">
                  {property.bathrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Square Feet</p>
                <p className="text-lg font-semibold text-gray-900">
                  {property.sqft}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Year Built</p>
                <p className="text-lg font-semibold text-gray-900">
                  {property.yearBuilt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="text-3xl font-bold text-[#FF7700] mb-4">
              {property.price}
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Tax</span>
                <span className="font-medium">{property.propertyTax}</span>
              </div>
              {property.hoaFees !== "N/A" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">HOA Fees</span>
                  <span className="font-medium">{property.hoaFees}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Button variant="primary" className="w-full" onClick={() => router.push("/user/dashboard/applications")}>
                Apply Now
              </Button>
              <Button variant="outline" className="w-full">
                Schedule Viewing
              </Button>
              <Button variant="outline" className="w-full">
                Save Property
              </Button>
              <Button variant="outline" className="w-full">
                Share
              </Button>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
            <div className="space-y-2">
              {property.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-[#FF7700]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

