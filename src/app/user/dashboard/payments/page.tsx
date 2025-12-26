"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button } from "@/components";

const transactions = [
  {
    description: "Water Bill",
    date: "1/5/2025",
    status: "Paid",
    amount: "$45.20",
  },
  {
    description: "Water Bill",
    date: "1/5/2025",
    status: "Paid",
    amount: "$45.20",
  },
  {
    description: "Water Bill",
    date: "1/5/2025",
    status: "Paid",
    amount: "$45.20",
  },
  {
    description: "Water Bill",
    date: "1/5/2025",
    status: "Paid",
    amount: "$45.20",
  },
];

const paymentMethods = [
  {
    cardName: "Visa",
    expiresIn: "1/5/2025",
    cardNumber: "544 *** **** ****",
    isDefault: true,
  },
  {
    cardName: "Visa",
    expiresIn: "1/5/2025",
    cardNumber: "544 *** **** ****",
    isDefault: false,
  },
];

const filterTabs = [
  { name: "All", count: 3, value: "all" },
  { name: "Rent", count: 1, value: "rent" },
  { name: "Utilities", count: 1, value: "utilities" },
  { name: "Services", count: 1, value: "services" },
];

export default function PaymentsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

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

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Upcoming Payment Due Section */}
      <div 
        className="relative rounded-xl p-8 mb-6 text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#FF7700]/80"></div>
        <div className="relative mb-6">
          <p className="text-lg mb-4">
            Your rent for Skyline Apartments, Unit 4B is due in 3 days.
          </p>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-sm text-white/90 mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-red-200">$14,700.00</p>
            </div>
            <div>
              <p className="text-sm text-white/90 mb-1">Pending Bills</p>
              <p className="text-2xl font-bold text-blue-200">$2,450.00</p>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="w-full bg-white/20 rounded-full h-4">
                <div
                  className="bg-blue-200 h-4 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm text-white/90 mb-2">Amount Due</p>
            <p className="text-4xl font-bold">$2,450.00</p>
          </div>
          <Button variant="primary" className="bg-white text-[#FF7700] hover:bg-orange-50 border-white">
            Pay Now
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📄</span>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Transactions
              </h2>
            </div>
            <p className="text-gray-600">
              Track your latest transaction activity.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[#FF7700] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Transaction List */}
        <div className="space-y-3 mb-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-600">{transaction.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {transaction.status}
                </span>
                <span className="font-bold text-gray-900">
                  {transaction.amount}
                </span>
                <button className="p-2 text-gray-600 hover:text-gray-900">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="text-[#FF7700] hover:text-[#F97316] font-medium">
          View Full History →
        </button>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <button className="text-[#FF7700] hover:text-[#F97316] font-medium">
            Add New
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {method.cardName}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{method.cardName}</p>
                  <p className="text-sm text-gray-600">
                    Expires in {method.expiresIn}
                  </p>
                  <p className="text-sm text-gray-600">{method.cardNumber}</p>
                </div>
              </div>
              {method.isDefault && (
                <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                  Default
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

