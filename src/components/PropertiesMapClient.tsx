"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

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

interface PropertiesMapClientProps {
  properties: Property[];
  onPropertyClick?: (propertyId: string) => void;
}

// Component to fit map bounds to show all markers
function FitBounds({ properties }: { properties: Property[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0 && map) {
      const bounds = L.latLngBounds(
        properties.map((prop) => [prop.lat, prop.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, properties]);

  return null;
}

// Custom marker icon with property status color
const createCustomIcon = (status: string) => {
  const color = status === "Available" ? "#10B981" : status === "Rented" ? "#F59E0B" : "#EF4444";
  
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        <div style="
          transform: rotate(45deg);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: bold;
        ">🏠</div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

export default function PropertiesMapClient({
  properties,
  onPropertyClick,
}: PropertiesMapClientProps) {
  // Default center (NYC area) if no properties
  const defaultCenter: [number, number] = [40.7128, -74.006];
  const defaultZoom = 12;

  // Calculate center from properties if available
  const center: [number, number] =
    properties.length > 0
      ? [
          properties.reduce((sum, p) => sum + p.lat, 0) / properties.length,
          properties.reduce((sum, p) => sum + p.lng, 0) / properties.length,
        ]
      : defaultCenter;

  if (typeof window === "undefined") {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={properties.length === 0 ? defaultZoom : undefined}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {properties.length > 0 && <FitBounds properties={properties} />}
      
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.lat, property.lng]}
          icon={createCustomIcon(property.status)}
          eventHandlers={{
            click: () => {
              if (onPropertyClick) {
                onPropertyClick(property.id);
              }
            },
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-sm mb-1">{property.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{property.address}</p>
              <p className="text-sm font-semibold text-[#FF7700] mb-2">{property.price}</p>
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded-full ${
                  property.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : property.status === "Rented"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {property.status}
                </span>
                {property.views !== undefined && (
                  <span className="text-gray-600">{property.views} views</span>
                )}
              </div>
              {property.inquiries !== undefined && (
                <p className="text-xs text-gray-600 mt-1">{property.inquiries} inquiries</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}


