"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button } from "@/components";

const conversations = [
  {
    id: 1,
    agent: "Property Agent",
    property: "Modern Downtown Apartment",
    lastMessage: "Hi! I want to confirm your viewing appointment for the Modern Downtown Apartment.",
    time: "2 min ago",
    status: "Confirmed",
    unread: true,
  },
  {
    id: 2,
    agent: "Property Agent",
    property: "Luxury Condo with City View",
    lastMessage: "Your application has been reviewed. We'd like to schedule a viewing.",
    time: "1 hour ago",
    status: null,
    unread: false,
  },
  {
    id: 3,
    agent: "Property Agent",
    property: "Spacious Modern Villa",
    lastMessage: "Thank you for your interest! Would you like to schedule a viewing?",
    time: "3 hours ago",
    status: null,
    unread: false,
  },
];

const chatMessages = [
  {
    sender: "agent",
    message: "Hi! I want to confirm your viewing appointment for the Modern Downtown Apartment.",
    time: "2:00 PM",
  },
  {
    sender: "user",
    message: "Hi! I want to confirm your viewing appointment for the Modern Downtown Apartment.",
    time: "2:00 PM",
  },
  {
    sender: "agent",
    message: "Hi! I want to confirm your viewing appointment for the Modern Downtown Apartment.",
    time: "2:00 PM",
  },
  {
    sender: "user",
    message: "Hi! I want to confirm your viewing appointment for the Modern Downtown Apartment.",
    time: "2:00 PM",
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageInput, setMessageInput] = useState("");

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

  const activeConversation = conversations.find(
    (c) => c.id === selectedConversation
  );

  return (
    <DashboardLayout userEmail={userEmail}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">
            Your conversations with property managers
          </p>
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col lg:flex-row" style={{ minHeight: "600px" }}>
        {/* Left Panel - Conversations List */}
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7700]"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conv.id ? "bg-orange-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">👤</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {conv.agent}
                      </h3>
                      {conv.unread && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{conv.property}</p>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{conv.time}</span>
                      {conv.status && (
                        <span className="text-xs text-green-600 font-medium">
                          {conv.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="flex-1 flex flex-col">
          {activeConversation && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {activeConversation.agent}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {activeConversation.property}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-[#FF7700] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "user"
                            ? "text-orange-100"
                            : "text-gray-500"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7700]"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && messageInput.trim()) {
                        // Handle send message
                        setMessageInput("");
                      }
                    }}
                  />
                  <Button
                    variant="primary"
                    className="text-sm sm:text-base px-4 sm:px-6"
                    onClick={() => {
                      if (messageInput.trim()) {
                        // Handle send message
                        setMessageInput("");
                      }
                    }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
