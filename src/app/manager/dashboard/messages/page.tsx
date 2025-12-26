"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

const sampleConversations = [
  {
    id: "1",
    name: "Sarah Jonson",
    initial: "S",
    property: "Downtown Luxury Apartment",
    lastMessage: "Thank you for the property details. When ca...",
    date: "Jan 15",
    unread: true,
  },
  {
    id: "2",
    name: "Michel Chen",
    initial: "M",
    property: "Family Home with Garden",
    lastMessage: "I have some question about the lease terms...",
    date: "Jan 11",
    unread: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    initial: "E",
    property: "Family Home with Garden",
    lastMessage: "Perfect! I'll be there at 2 PM tomorrow",
    date: "Jan 11",
    unread: false,
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    initial: "E",
    property: "Family Home with Garden",
    lastMessage: "Perfect! I'll be there at 2 PM tomorrow",
    date: "Jan 11",
    unread: false,
  },
];

const chatMessages = [
  {
    id: "1",
    sender: "Sarah Jonson",
    message: "Hi, I'm interested in the Downtown Luxury Apartment. Could you provide more detail?",
    date: "Jan 15, 2024",
    isManager: false,
  },
  {
    id: "2",
    sender: "You",
    message: "Hello Sarah! I'd be happy to help. The apartment is a spacious 2-bedroom, 2-bathroom unit with a great downtown location. Would you like to schedule a visit?",
    date: "Jan 15, 2024",
    isManager: true,
  },
  {
    id: "3",
    sender: "Sarah Jonson",
    message: "That's sounds great. What's the availability and are there any fees?",
    date: "Jan 15, 2024",
    isManager: false,
  },
];

export default function ManagerMessagesPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(sampleConversations[0].id);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
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

  const currentConversation = sampleConversations.find(c => c.id === selectedConversation);

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-2xl font-bold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Messages
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Conversations with client and projects
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Archive</Button>
            <Button variant="primary">New Messages</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>3</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Unread messages</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>3</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Active Conversation</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-purple-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>1</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Archive</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-[#FF7700] ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF7700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>4</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Total Conversation</p>
          </div>
        </div>

        {/* Conversations Section */}
        <div className={`rounded-lg shadow-md overflow-hidden ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className={`font-semibold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Conversations
            </h3>
          </div>
          <div className="flex h-[600px]">
            {/* Left Panel - Conversation List */}
            <div className={`w-1/3 border-r ${
              effectiveTheme === "dark" ? "border-gray-700 bg-gray-800" : effectiveTheme === "ocean" ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
            }`}>
              <div className="p-4">
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search Conversation"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] text-sm ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-100 border-blue-300 text-blue-900 placeholder-blue-600"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    <svg
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                        effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className={`p-2 rounded-lg border ${
                    effectiveTheme === "dark" ? "border-gray-600 text-gray-300" : effectiveTheme === "ocean" ? "border-blue-300 text-blue-600" : "border-gray-300 text-gray-600"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[500px]">
                  {sampleConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? "bg-[#FF7700] text-white"
                          : effectiveTheme === "dark"
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-100 hover:bg-blue-200 text-blue-900"
                          : "bg-white hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          selectedConversation === conversation.id
                            ? "bg-white/20 text-white"
                            : effectiveTheme === "dark"
                            ? "bg-gray-600 text-gray-200"
                            : "bg-gray-200 text-gray-700"
                        }`}>
                          <span className="font-semibold">{conversation.initial}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-medium truncate ${
                              selectedConversation === conversation.id ? "text-white" : ""
                            }`}>{conversation.name}</p>
                            {conversation.unread && selectedConversation !== conversation.id && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                            )}
                          </div>
                          <p className={`text-sm font-medium truncate ${
                            selectedConversation === conversation.id
                              ? "text-white/90"
                              : effectiveTheme === "dark"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}>{conversation.property}</p>
                          <p className={`text-sm truncate mt-1 ${
                            selectedConversation === conversation.id
                              ? "text-white/80"
                              : effectiveTheme === "dark"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}>{conversation.lastMessage}</p>
                          <p className={`text-xs mt-1 ${
                            selectedConversation === conversation.id
                              ? "text-white/70"
                              : effectiveTheme === "dark"
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}>{conversation.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Chat Window */}
            <div className="flex-1 flex flex-col">
              {currentConversation && (
                <>
                  <div className={`p-4 border-b flex items-center justify-between ${
                    effectiveTheme === "dark" ? "border-gray-700 bg-gray-800" : effectiveTheme === "ocean" ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        effectiveTheme === "dark" ? "bg-gray-600 text-gray-200" : "bg-gray-200 text-gray-700"
                      }`}>
                        <span className="font-semibold">{currentConversation.initial}</span>
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                        }`}>
                          {currentConversation.name}
                        </h3>
                        <p className={`text-xs ${
                          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                        }`}>{currentConversation.property}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className={`p-2 rounded-lg ${
                        effectiveTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : effectiveTheme === "ocean" ? "text-blue-700 hover:bg-blue-200" : "text-gray-600 hover:bg-gray-100"
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                      <button className={`p-2 rounded-lg ${
                        effectiveTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : effectiveTheme === "ocean" ? "text-blue-700 hover:bg-blue-200" : "text-gray-600 hover:bg-gray-100"
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className={`p-2 rounded-lg ${
                        effectiveTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : effectiveTheme === "ocean" ? "text-blue-700 hover:bg-blue-200" : "text-gray-600 hover:bg-gray-100"
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isManager ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isManager
                            ? "bg-[#FF7700] text-white"
                            : effectiveTheme === "dark"
                            ? "bg-gray-700 text-gray-100"
                            : effectiveTheme === "ocean"
                            ? "bg-blue-200 text-blue-900"
                            : "bg-gray-100 text-gray-900"
                        }`}>
                          <p className="text-sm mb-1">{msg.message}</p>
                          <p className={`text-xs ${
                            msg.isManager
                              ? "text-white/70"
                              : effectiveTheme === "dark"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}>{msg.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 border-t ${
                    effectiveTheme === "dark" ? "border-gray-700 bg-gray-800" : effectiveTheme === "ocean" ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                  }`}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your Message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                          effectiveTheme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : effectiveTheme === "ocean"
                            ? "bg-blue-100 border-blue-300 text-blue-900 placeholder-blue-600"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                      <Button variant="primary" onClick={() => setMessageInput("")}>
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
