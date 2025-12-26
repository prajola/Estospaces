"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button } from "@/components";

const myReviews = [
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St Downtown",
    date: "1/10/2025",
    agent: "Sahara Johnson",
    status: "Published",
    rating: 5,
    review:
      "Excellent property and great service. The apartment exceeded my experiences. The location is perfect, and the amenities are top notch. Sarah was very helpful throughout the process.",
    helpfulCount: 12,
  },
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St Downtown",
    date: "1/10/2025",
    agent: "Sahara Johnson",
    status: "Published",
    rating: 5,
    review:
      "Excellent property and great service. The apartment exceeded my experiences. The location is perfect, and the amenities are top notch. Sarah was very helpful throughout the process.",
    helpfulCount: 12,
  },
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St Downtown",
    date: "1/10/2025",
    agent: "Sahara Johnson",
    status: "Published",
    rating: 5,
    review:
      "Excellent property and great service. The apartment exceeded my experiences. The location is perfect, and the amenities are top notch. Sarah was very helpful throughout the process.",
    helpfulCount: 12,
  },
];

const reviewsAboutMe = [
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St Downtown",
    date: "1/10/2025",
    agent: "Sahara Johnson",
    status: "Published",
    rating: 5,
    review:
      "Excellent property and great service. The apartment exceeded my experiences. The location is perfect, and the amenities are top notch. Sarah was very helpful throughout the process.",
    helpfulCount: 12,
  },
  {
    property: "Modern Downtown Apartment",
    address: "123 Main St Downtown",
    date: "1/10/2025",
    agent: "Sahara Johnson",
    status: "Published",
    rating: 5,
    review:
      "Excellent property and great service. The apartment exceeded my experiences. The location is perfect, and the amenities are top notch. Sarah was very helpful throughout the process.",
    helpfulCount: 12,
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"my-reviews" | "reviews-about-me">(
    "my-reviews"
  );

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);
  }, [router]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const currentReviews =
    activeTab === "my-reviews" ? myReviews : reviewsAboutMe;

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reviews and Ratings
        </h1>
        <p className="text-gray-600">
          Manage your property reviews and ratings
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Total applications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Under reviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("my-reviews")}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === "my-reviews"
              ? "text-[#FF7700] border-[#FF7700]"
              : "text-gray-600 border-transparent hover:text-gray-900"
          }`}
        >
          My Reviews ({myReviews.length})
        </button>
        <button
          onClick={() => setActiveTab("reviews-about-me")}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === "reviews-about-me"
              ? "text-[#FF7700] border-[#FF7700]"
              : "text-gray-600 border-transparent hover:text-gray-900"
          }`}
        >
          Reviews About Me ({reviewsAboutMe.length})
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {currentReviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {review.property}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{review.address}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 {review.date}</span>
                  <span>👤 {review.agent}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mb-3">
                  {review.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-3">{review.review}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {review.helpfulCount} people found this helpful
              </p>
              {activeTab === "my-reviews" && (
                <div className="flex gap-2">
                  <Button variant="outline" className="text-blue-600 border-blue-600">
                    Edit
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-600">
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
