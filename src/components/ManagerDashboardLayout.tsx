"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LakshmiChatbot } from "./LakshmiChatbot";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ManagerDashboardIcon,
  ManagerPropertiesIcon,
  LeadsClientsIcon,
  ApplicationIcon,
  AppointmentIcon,
  MessagesIcon,
  AnalyticIcon,
  BillingIcon,
  ServicesIcon,
  HelpSupportIcon,
  SignOutIcon,
} from "./ManagerDashboardIcons";

interface ManagerDashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
}

// Manager-specific navigation matching the design
const managerNavigation = [
  { name: "Dashboard", href: "/manager/dashboard", icon: ManagerDashboardIcon },
  { name: "Properties", href: "/manager/dashboard/properties", icon: ManagerPropertiesIcon },
  { name: "Leads & Clients", href: "/manager/dashboard/leads", icon: LeadsClientsIcon },
  { name: "Application", href: "/manager/dashboard/applications", icon: ApplicationIcon },
  { name: "Appointment", href: "/manager/dashboard/appointments", icon: AppointmentIcon },
  { name: "Messages", href: "/manager/dashboard/messages", icon: MessagesIcon },
  { name: "Analytic", href: "/manager/dashboard/analytics", icon: AnalyticIcon },
  { name: "Billing", href: "/manager/dashboard/billing", icon: BillingIcon },
  { name: "Services", href: "/manager/dashboard/services", icon: ServicesIcon },
];

export const ManagerDashboardLayout: React.FC<ManagerDashboardLayoutProps> = ({
  children,
  userEmail,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, effectiveTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("managerSidebarCollapsed");
      return saved === "true";
    }
    return false;
  });

  // Welcome greeting disabled - users can open chatbot manually
  const [showWelcome, setShowWelcome] = useState(false);

  const handleLogout = () => {
    const email = localStorage.getItem("userEmail");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
    
    if (email) {
      localStorage.removeItem(`profile_${email}`);
      localStorage.removeItem(`notifications_${email}`);
      localStorage.removeItem(`privacy_${email}`);
      localStorage.removeItem(`verifications_${email}`);
    }
    
    router.push("/manager/login");
    router.refresh();
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system" | "ocean") => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("managerSidebarCollapsed", String(newState));
    }
  };

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

  const displayEmail = userEmail || "manager@estospaces.com";
  const [loginTime, setLoginTime] = useState<string>("");
  const [loginDate, setLoginDate] = useState<string>("");

  useEffect(() => {
    // Get or set login time
    const loginKey = `loginTime_${displayEmail}`;
    const savedLoginTime = localStorage.getItem(loginKey);
    
    if (!savedLoginTime) {
      // First login - set current time
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      localStorage.setItem(loginKey, JSON.stringify({ time: timeString, date: dateString }));
      setLoginTime(timeString);
      setLoginDate(dateString);
    } else {
      // Use saved login time
      const loginData = JSON.parse(savedLoginTime);
      setLoginTime(loginData.time);
      setLoginDate(loginData.date);
    }
  }, [displayEmail]);

  // Format username with spacing (e.g., "annamudu prajol" from email)
  const formatUsername = (email: string) => {
    const username = email.split("@")[0];
    // Split by common separators and add space, handle camelCase
    return username
      .replace(/[._-]/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className={`min-h-screen flex ${
      effectiveTheme === "dark" ? "bg-gray-900" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
    }`}>
      {/* Sidebar */}
      <aside className={`hidden lg:flex lg:flex-col ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} border-r transition-all duration-300 ${
        effectiveTheme === "dark" ? "bg-gray-800 border-gray-700" : effectiveTheme === "ocean" ? "bg-blue-100 border-blue-200" : "bg-white border-gray-200"
      }`}>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Logo with House Icon */}
          <div className={`flex items-center flex-shrink-0 ${isSidebarCollapsed ? 'px-2 justify-center' : 'px-3'} mb-4`}>
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'}`}>
              <svg className="w-8 h-8 text-[#FF7700] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!isSidebarCollapsed && (
                <span className={`text-[#FF7700] font-semibold text-xl whitespace-nowrap ${
                  effectiveTheme === "dark" ? "text-[#FF7700]" : ""
                }`}>
                  Estospaces
                </span>
              )}
            </div>
            {!isSidebarCollapsed && (
              <button
                onClick={toggleSidebar}
                className="ml-auto p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Collapse sidebar"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
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
            )}
          </div>
          {isSidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="mx-auto mb-4 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Expand sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
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
          )}

          {/* User Info */}
          {!isSidebarCollapsed && (
            <div className={`px-3 mb-4 pb-4 border-b ${
              effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-200" : "border-gray-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF7700] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium text-sm ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {formatUsername(displayEmail)}
                  </p>
                  <p className={`text-xs ${
                    effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                  }`}>
                    Property Manager
                  </p>
                  {loginTime && loginDate && (
                    <p className={`text-xs mt-1 ${
                      effectiveTheme === "dark" ? "text-gray-500" : effectiveTheme === "ocean" ? "text-blue-500" : "text-gray-400"
                    }`}>
                      Logged in: {loginTime} • {loginDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className={`px-2 mb-4 pb-4 border-b flex justify-center ${
              effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-200" : "border-gray-200"
            }`}>
              <div className="w-10 h-10 bg-[#FF7700] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-0.5">
            {managerNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#FF7700] text-white"
                      : effectiveTheme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : effectiveTheme === "ocean"
                      ? "text-blue-900 hover:bg-blue-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={isSidebarCollapsed ? item.name : undefined}
                >
                  <item.icon
                  className={`${isSidebarCollapsed ? '' : 'mr-2'} flex-shrink-0 w-4 h-4`}
                />
                  {!isSidebarCollapsed && item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className={`px-2 mt-4 pt-4 border-t ${
            effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-200" : "border-gray-200"
          }`}>
            <Link
              href="/manager/dashboard/help"
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-xs font-medium rounded-lg transition-colors mb-1 ${
                effectiveTheme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : effectiveTheme === "ocean"
                  ? "text-blue-900 hover:bg-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              title={isSidebarCollapsed ? "Help & Support" : undefined}
            >
              <HelpSupportIcon className={`${isSidebarCollapsed ? '' : 'mr-2'} w-4 h-4 flex-shrink-0`} />
              {!isSidebarCollapsed && "Help & Support"}
            </Link>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-2 px-3'} py-2 rounded-lg transition-colors ${
                effectiveTheme === "dark"
                  ? "text-red-400 hover:bg-gray-700"
                  : effectiveTheme === "ocean"
                  ? "text-red-600 hover:bg-blue-200"
                  : "text-red-600 hover:bg-gray-100"
              }`}
              title={isSidebarCollapsed ? "Sign out" : undefined}
            >
              <SignOutIcon className="w-4 h-4 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="font-medium text-xs">Sign out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className={`sticky top-0 z-10 border-b ${
          effectiveTheme === "dark"
            ? "bg-gray-800 border-gray-700"
            : effectiveTheme === "ocean"
            ? "bg-blue-100 border-blue-200"
            : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Logo on left */}
            <div className="flex items-center gap-2">
              <span className={`text-[#FF7700] font-semibold text-xl ${
                effectiveTheme === "dark" ? "text-[#FF7700]" : ""
              }`}>
                Estospaces
              </span>
            </div>

            {/* Search Bar in center */}
            <div className="relative flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="Search, properties, application"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] text-sm ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : effectiveTheme === "ocean"
                    ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              {/* Lakshmi AI Chatbot */}
              <button
                onClick={() => setIsChatbotOpen(true)}
                className={`relative p-2 rounded-lg transition-colors ${
                  effectiveTheme === "dark"
                    ? "text-gray-300 hover:text-[#FF7700]"
                    : effectiveTheme === "ocean"
                    ? "text-blue-900 hover:text-[#FF7700]"
                    : "text-gray-600 hover:text-[#FF7700]"
                }`}
                title="Chat with Lakshmi AI"
              >
                <svg
                  className="w-6 h-6"
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

              {/* Notifications */}
              <button
                className={`relative p-2 rounded-lg transition-colors ${
                  effectiveTheme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : effectiveTheme === "ocean"
                    ? "text-blue-900 hover:bg-blue-200"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Theme Switcher */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    effectiveTheme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : effectiveTheme === "ocean"
                      ? "text-blue-900 hover:bg-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </button>
                {isThemeMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50 ${
                    effectiveTheme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                  }`}>
                    {(["light", "dark", "system", "ocean"] as const).map((themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => handleThemeChange(themeOption)}
                        className={`w-full text-left px-4 py-2 text-sm capitalize transition-colors ${
                          theme === themeOption
                            ? "bg-[#FF7700] text-white"
                            : effectiveTheme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {themeOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Icon */}
              <button
                onClick={() => router.push("/manager/dashboard/profile")}
                className={`p-2 rounded-lg transition-colors ${
                  effectiveTheme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : effectiveTheme === "ocean"
                    ? "text-blue-900 hover:bg-blue-200"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      
      {/* Lakshmi Chatbot */}
      <LakshmiChatbot
        isOpen={isChatbotOpen}
        onClose={() => {
          setIsChatbotOpen(false);
          setShowWelcome(false); // Reset welcome flag when closing
        }}
        dashboardType="manager"
        showWelcome={showWelcome}
      />
    </div>
  );
};

export default ManagerDashboardLayout;
