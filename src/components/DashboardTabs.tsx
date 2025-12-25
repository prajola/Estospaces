"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Overview", href: "/user/dashboard" },
  { name: "Favorites", href: "/user/dashboard/favorites" },
  { name: "Applications", href: "/user/dashboard/applications" },
  { name: "AI Picks", href: "/user/dashboard/ai-picks" },
  { name: "Analytics", href: "/user/dashboard/analytics" },
];

export const DashboardTabs: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/user/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive(tab.href)
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
};

export default DashboardTabs;
