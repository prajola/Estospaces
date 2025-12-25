"use client";

import React from "react";

export default function MessagesPage() {
  const messages = [
    {
      id: "1",
      sender: "Property Manager",
      property: "Modern Downtown Apartment",
      message: "Thank you for your application. We would like to schedule a viewing...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      sender: "Support Team",
      property: null,
      message: "Welcome to Estospaces! Here are some tips to get started...",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500">Your conversations with property managers</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${message.unread ? "bg-orange-50" : ""}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {message.sender[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{message.sender}</h3>
                  <span className="text-sm text-gray-500">{message.time}</span>
                </div>
                {message.property && (
                  <p className="text-sm text-[#F97316] mb-1">{message.property}</p>
                )}
                <p className="text-sm text-gray-600 truncate">{message.message}</p>
              </div>
              {message.unread && (
                <div className="w-3 h-3 bg-[#F97316] rounded-full flex-shrink-0"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
