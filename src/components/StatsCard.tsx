"use client";

import React from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  variant?: "default" | "banner";
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, variant = "default" }) => {
  if (variant === "banner") {
    return (
      <div className="flex items-center gap-3 bg-white/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-xl font-semibold text-white">{value}</p>
          <p className="text-xs text-orange-100">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
        <p className="text-xs text-gray-600">{label}</p>
      </div>
    </div>
  );
};

