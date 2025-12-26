"use client";

import React, { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { mockSavedProperties } from "@/lib/mockData";

export default function SavedPropertiesPage() {
  const [savedProperties, setSavedProperties] = useState<string[]>(
    mockSavedProperties.map((p) => p.id)
  );

  const handleSave = (id: string) => {
    setSavedProperties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const filteredProperties = mockSavedProperties.filter((p) =>
    savedProperties.includes(p.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Saved Properties</h1>
        <p className="text-gray-500">Properties you&apos;ve saved for later</p>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSave={handleSave}
              isSaved={savedProperties.includes(property.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved properties</h3>
          <p className="text-gray-500">Start browsing and save properties you like</p>
        </div>
      )}
    </div>
  );
}
