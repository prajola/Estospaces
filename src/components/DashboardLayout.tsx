"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LakshmiChatbot } from "./LakshmiChatbot";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DashboardIcon,
  BrowseIcon,
  SavedIcon,
  ApplicationsIcon,
  ViewingsIcon,
  MessagesIcon,
  ReviewsIcon,
  ProfileIcon,
  PaymentsIcon,
  ServicesIcon,
  AIPicksIcon,
  AnalysisIcon,
  HelpIcon,
  SignOutIcon,
} from "./DashboardIcons";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
}

const navigation = [
  { name: "Dashboard", href: "/user/dashboard", icon: DashboardIcon },
  { name: "Browse Properties", href: "/user/dashboard/browse", icon: BrowseIcon },
  { name: "Saved Properties", href: "/user/dashboard/favorites", icon: SavedIcon },
  { name: "My Applications", href: "/user/dashboard/applications", icon: ApplicationsIcon },
  { name: "Viewings", href: "/user/dashboard/viewings", icon: ViewingsIcon },
  { name: "Messages", href: "/user/dashboard/messages", icon: MessagesIcon },
  { name: "Reviews", href: "/user/dashboard/reviews", icon: ReviewsIcon },
  { name: "Profile", href: "/user/dashboard/profile", icon: ProfileIcon },
  { name: "Payments", href: "/user/dashboard/payments", icon: PaymentsIcon },
  { name: "Services", href: "/user/dashboard/services", icon: ServicesIcon },
  { name: "AI Picks", href: "/user/dashboard/ai-picks", icon: AIPicksIcon },
  { name: "Analysis", href: "/user/dashboard/analysis", icon: AnalysisIcon },
  { name: "Help & Support", href: "/user/dashboard/help", icon: HelpIcon },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userEmail,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, effectiveTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved === "true";
    }
    return false;
  });

  // Welcome greeting disabled - users can open chatbot manually
  const [showWelcome, setShowWelcome] = useState(false);

  // Search keywords mapping
  const searchKeywords: Record<string, string> = {
    dashboard: "/user/dashboard",
    home: "/user/dashboard",
    browse: "/user/dashboard/browse",
    "browse properties": "/user/dashboard/browse",
    properties: "/user/dashboard/browse",
    saved: "/user/dashboard/favorites",
    "saved properties": "/user/dashboard/favorites",
    favorites: "/user/dashboard/favorites",
    applications: "/user/dashboard/applications",
    "my applications": "/user/dashboard/applications",
    application: "/user/dashboard/applications",
    viewings: "/user/dashboard/viewings",
    viewing: "/user/dashboard/viewings",
    messages: "/user/dashboard/messages",
    message: "/user/dashboard/messages",
    chat: "/user/dashboard/messages",
    reviews: "/user/dashboard/reviews",
    review: "/user/dashboard/reviews",
    profile: "/user/dashboard/profile",
    payments: "/user/dashboard/payments",
    payment: "/user/dashboard/payments",
    bills: "/user/dashboard/payments",
    services: "/user/dashboard/services",
    service: "/user/dashboard/services",
    "ai picks": "/user/dashboard/ai-picks",
    "ai pick": "/user/dashboard/ai-picks",
    analysis: "/user/dashboard/analysis",
    help: "/user/dashboard/help",
    support: "/user/dashboard/help",
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    
    // Direct match
    if (searchKeywords[query]) {
      router.push(searchKeywords[query]);
      setSearchQuery("");
      return;
    }

    // Partial match - find the first matching keyword
    for (const [keyword, route] of Object.entries(searchKeywords)) {
      if (keyword.includes(query) || query.includes(keyword)) {
        router.push(route);
        setSearchQuery("");
        return;
      }
    }

    // If no match found, you could show a message or do nothing
    // For now, we'll just clear the search
    setSearchQuery("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    // Get email before clearing it
    const email = localStorage.getItem("userEmail");
    
    // Clear all user-related data from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
    
    // Clear any profile data associated with the user
    if (email) {
      localStorage.removeItem(`profile_${email}`);
      localStorage.removeItem(`notifications_${email}`);
      localStorage.removeItem(`privacy_${email}`);
      localStorage.removeItem(`verifications_${email}`);
      localStorage.removeItem(`serviceRequests_${email}`);
    }
    
    // Redirect to main login page
    router.push("/user/login");
    router.refresh();
  };

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
    };

    if (isThemeMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isThemeMenuOpen]);

  const handleThemeChange = (newTheme: "light" | "dark" | "system" | "ocean") => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", String(newState));
    }
  };

  return (
    <div className={`min-h-screen flex ${
      effectiveTheme === "dark" 
        ? "bg-gray-900" 
        : effectiveTheme === "ocean"
        ? "bg-blue-50"
        : "bg-gray-50"
    }`}>
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} fixed h-screen overflow-y-auto transition-all duration-300 ${
        effectiveTheme === "dark"
          ? "bg-gray-800 border-r border-gray-700"
          : effectiveTheme === "ocean"
          ? "bg-blue-100 border-r border-blue-200"
          : "bg-white border-r border-gray-200"
      }`}>
        <div className={`p-4 ${isSidebarCollapsed ? 'px-2' : ''}`}>
          <div className="flex items-center gap-2 mb-6 justify-between">
            <div className={`flex items-center gap-2 ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-8 h-8 bg-[#FF7700] rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              {!isSidebarCollapsed && (
                <span className={`font-semibold whitespace-nowrap ${
                  effectiveTheme === "dark"
                    ? "text-gray-100"
                    : effectiveTheme === "ocean"
                    ? "text-blue-900"
                    : "text-gray-900"
                }`}>Viewer</span>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className={`p-1.5 rounded-md hover:bg-gray-100 ${effectiveTheme === "dark" ? "hover:bg-gray-700" : ""} transition-colors ${isSidebarCollapsed ? 'mx-auto' : ''}`}
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                className={`w-5 h-5 ${effectiveTheme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Sidebar collapse icon: rectangle with right chevron and vertical bar */}
                <rect x="3" y="6" width="13" height="12" rx="0.5" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 9l2 2-2 2" />
                <line x1="18" y1="6" x2="18" y2="18" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="space-y-0.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-2 px-3'} py-2 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-[#FF7700] text-white"
                      : effectiveTheme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : effectiveTheme === "ocean"
                      ? "text-blue-900 hover:bg-blue-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={isSidebarCollapsed ? item.name : undefined}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  {!isSidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-2 px-3'} py-2 rounded-lg transition-colors ${
                effectiveTheme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : effectiveTheme === "ocean"
                  ? "text-blue-900 hover:bg-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              title={isSidebarCollapsed ? "Sign Out" : undefined}
            >
              <SignOutIcon className="w-4 h-4 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="font-medium text-sm">Sign Out</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <header className={`sticky top-0 z-10 border-b ${
          effectiveTheme === "dark"
            ? "bg-gray-800 border-gray-700"
            : effectiveTheme === "ocean"
            ? "bg-blue-100 border-blue-200"
            : "bg-white border-gray-200"
        }`}>
          <div className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <span className="text-[#FF7700] font-semibold text-xl">Estospaces</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:flex-initial sm:w-48 md:w-64">
                  <input
                    type="text"
                    placeholder="Search: viewings, payments, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full px-4 py-2 pl-10 pr-10 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-transparent ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border border-gray-300"
                    }`}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-[#FF7700] hover:text-[#FF7700]"
                      title="Search"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Lakshmi AI Chatbot */}
                <button
                  onClick={() => setIsChatbotOpen(true)}
                  className={`relative p-2 flex-shrink-0 transition-colors ${
                    effectiveTheme === "dark"
                      ? "text-gray-300 hover:text-[#FF7700]"
                      : effectiveTheme === "ocean"
                      ? "text-blue-700 hover:text-[#FF7700]"
                      : "text-gray-600 hover:text-[#FF7700]"
                  }`}
                  title="Chat with Lakshmi AI"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>
                {/* Theme Switcher */}
                <div className="relative" ref={themeMenuRef}>
                  <button
                    onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                    className={`relative p-2 flex-shrink-0 transition-colors ${
                      effectiveTheme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : effectiveTheme === "ocean"
                        ? "text-blue-700 hover:text-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    title="Change Theme"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </button>
                  
                  {/* Theme Dropdown Menu */}
                  {isThemeMenuOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                      effectiveTheme === "dark"
                        ? "bg-gray-800 border border-gray-700"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-100 border border-blue-200"
                        : "bg-white border border-gray-200"
                    }`}>
                      <div className="py-1">
                        {(["light", "dark", "system", "ocean"] as const).map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => handleThemeChange(themeOption)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors capitalize ${
                              theme === themeOption
                                ? "bg-[#FF7700] text-white"
                                : effectiveTheme === "dark"
                                ? "text-gray-300 hover:bg-gray-700"
                                : effectiveTheme === "ocean"
                                ? "text-blue-900 hover:bg-blue-200"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {themeOption === "system" ? "System" : themeOption}
                            {theme === themeOption && (
                              <span className="ml-2">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Notifications */}
                <button className={`relative p-2 flex-shrink-0 transition-colors ${
                  effectiveTheme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : effectiveTheme === "ocean"
                    ? "text-blue-700 hover:text-blue-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                {/* Profile */}
                <button
                  onClick={() => router.push("/user/dashboard/profile")}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : effectiveTheme === "ocean"
                      ? "bg-blue-200 text-blue-900 hover:bg-blue-300"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  title="View Profile"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 relative">
          {children}
          {/* Lakshmi AI Chatbot - Embedded as Small Card */}
          <LakshmiChatbot
            isOpen={isChatbotOpen}
            onClose={() => {
              setIsChatbotOpen(false);
              setShowWelcome(false); // Reset welcome flag when closing
            }}
            dashboardType="user"
            showWelcome={showWelcome}
          />
        </main>
      </div>
    </div>
  );
};

