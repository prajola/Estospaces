"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(
  () => import("./PropertiesMapClient"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  }
);

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  status: string;
  lat: number;
  lng: number;
  views?: number;
  inquiries?: number;
}

interface PropertiesMapProps {
  properties: Property[];
  onPropertyClick?: (propertyId: string) => void;
  className?: string;
}

export const PropertiesMap: React.FC<PropertiesMapProps> = ({
  properties,
  onPropertyClick,
  className = "",
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <MapComponent
        properties={properties}
        onPropertyClick={onPropertyClick}
      />
    </div>
  );
};
