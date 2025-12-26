"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./Button";

interface PropertyCardProps {
  id?: string;
  image: string;
  price: string;
  title: string;
  address: string;
  beds: number;
  bathrooms: number;
  sqft: number;
  rating: number;
  reviews: number;
  listedDate: string;
  propertyType?: string;
  status?: "Available" | "Under review" | "Scheduled";
  showApplyButton?: boolean;
  onViewDetails?: () => void;
  onApply?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  price,
  title,
  address,
  beds,
  bathrooms,
  sqft,
  rating,
  reviews,
  listedDate,
  propertyType,
  status,
  showApplyButton = false,
  onViewDetails,
  onApply,
}) => {
  const router = useRouter();
  const { effectiveTheme } = useTheme();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else if (id) {
      // Check if we're in manager dashboard
      const pathname = window.location.pathname;
      if (pathname.includes('/manager/')) {
        router.push(`/manager/dashboard/properties/${id}`);
      } else {
        router.push(`/user/dashboard/properties/${id}`);
      }
    }
  };
  return (
    <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
      effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
    }`}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {propertyType && (
          <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium ${
            effectiveTheme === "dark" ? "bg-gray-700/90 text-gray-100" : "bg-white/90 text-gray-900"
          }`}>
            {propertyType}
          </span>
        )}
        {status && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {status}
          </span>
        )}
        <span className="absolute bottom-2 left-2 bg-[#FF7700] text-white px-3 py-1 rounded-lg text-sm font-bold">
          {price}
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-end items-start mb-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className={`text-sm font-medium ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-700"
            }`}>
              {rating} ({reviews})
            </span>
          </div>
        </div>
        <h3 className={`text-sm font-semibold mb-1 ${
          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
        }`}>{title}</h3>
        <p className={`text-sm mb-3 ${
          effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
        }`}>{address}</p>
        <div className={`flex items-center gap-4 text-sm mb-3 ${
          effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
        }`}>
          <span>{beds} Beds</span>
          <span>{bathrooms} Bathroom</span>
          <span>{sqft} Sqft</span>
        </div>
        <p className={`text-xs mb-4 ${
          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
        }`}>Listed {listedDate}</p>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={handleViewDetails}
            className="flex-1"
          >
            {showApplyButton ? "View Apply" : "View Details"}
          </Button>
          {showApplyButton && onApply && (
            <Button
              variant="outline"
              onClick={onApply}
              className="flex-1"
            >
              Apply
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

